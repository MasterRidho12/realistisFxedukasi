import { NextResponse } from 'next/server';
import { UserState } from '@/types';
import prisma from '@/lib/prisma';

// Helper to decode Base64Url JWT from Google Identity Services
function decodeGoogleJwt(token: string): { email?: string; name?: string; picture?: string; sub?: string } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = Buffer.from(parts[1], 'base64url').toString('utf-8');
    return JSON.parse(payload);
  } catch (err) {
    console.warn('[Google Auth] Failed to decode Google JWT:', err);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { email, name, avatar, credential, googleId } = body;

    // If Google ID Token credential was sent from Google GSI
    if (credential && (!email || !name)) {
      const decoded = decodeGoogleJwt(credential);
      if (decoded && decoded.email) {
        email = decoded.email;
        name = name || decoded.name;
        avatar = avatar || decoded.picture;
        googleId = googleId || decoded.sub;
      }
    }

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Email Google tidak ditemukan atau tidak valid.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const finalName = (name && typeof name === 'string' && name.trim()) ? name.trim() : 'Trader Google';
    const finalAvatar = (avatar && typeof avatar === 'string') ? avatar : undefined;

    const hasDbUrl = Boolean(
      process.env.DATABASE_URL ||
      process.env.POSTGRES_PRISMA_URL ||
      process.env.POSTGRES_URL
    );

    let userState: UserState;

    if (hasDbUrl) {
      try {
        // Upsert into PostgreSQL via Prisma
        const existingUser = await prisma.user.findUnique({
          where: { email: normalizedEmail },
        });

        if (existingUser) {
          // If avatar updated from Google, update it
          if (finalAvatar && existingUser.avatar !== finalAvatar) {
            await prisma.user.update({
              where: { email: normalizedEmail },
              data: { avatar: finalAvatar },
            }).catch(() => {});
          }

          userState = {
            id: existingUser.id,
            name: existingUser.name || finalName,
            email: existingUser.email,
            avatar: finalAvatar || existingUser.avatar || undefined,
            whatsapp: existingUser.whatsapp || '',
            accountType: existingUser.accountType === 'CENT' ? 'CENT' : 'STANDARD',
            tier: (existingUser.tier as 'FREE' | 'PRO') || 'FREE',
            role: (existingUser.role as 'USER' | 'ADMIN') || (normalizedEmail === 'admin@realistisfx.com' ? 'ADMIN' : 'USER'),
            isAuthenticated: true,
            telegramLinked: existingUser.telegramLinked ?? false,
            dailyCalculatorCount: existingUser.dailyCalculatorCount ?? 0,
            disciplineScore: existingUser.disciplineScore ?? 0,
            winRate: 0,
            totalTrades: 0,
            strictModeEnabled: true,
            isChecklistPassed: false,
            subscriptionStatus: existingUser.tier === 'PRO' ? 'ACTIVE' : 'NONE',
          };
        } else {
          // Create new user in Prisma
          const newUser = await prisma.user.create({
            data: {
              id: `usr-g-${Date.now().toString().slice(-6)}`,
              name: finalName,
              email: normalizedEmail,
              avatar: finalAvatar,
              whatsapp: '',
              accountType: 'STANDARD',
              role: normalizedEmail === 'admin@realistisfx.com' ? 'ADMIN' : 'USER',
              tier: 'FREE',
              dailyCalculatorCount: 0,
              disciplineScore: 0,
            },
          });

          userState = {
            id: newUser.id,
            name: newUser.name || finalName,
            email: newUser.email,
            avatar: finalAvatar,
            whatsapp: '',
            accountType: 'STANDARD',
            tier: 'FREE',
            role: newUser.role as 'USER' | 'ADMIN',
            isAuthenticated: true,
            telegramLinked: false,
            dailyCalculatorCount: 0,
            disciplineScore: 0,
            winRate: 0,
            totalTrades: 0,
            strictModeEnabled: true,
            isChecklistPassed: false,
            subscriptionStatus: 'NONE',
          };
        }
      } catch (dbErr) {
        console.warn('[Google Auth] Prisma DB operation error, falling back:', dbErr);
        userState = {
          id: `usr-g-${Date.now().toString().slice(-6)}`,
          name: finalName,
          email: normalizedEmail,
          avatar: finalAvatar,
          whatsapp: '',
          accountType: 'STANDARD',
          tier: 'FREE',
          role: normalizedEmail === 'admin@realistisfx.com' ? 'ADMIN' : 'USER',
          isAuthenticated: true,
          telegramLinked: false,
          dailyCalculatorCount: 0,
          disciplineScore: 0,
          winRate: 0,
          totalTrades: 0,
          strictModeEnabled: true,
          isChecklistPassed: false,
          subscriptionStatus: 'NONE',
        };
      }
    } else {
      // In-Memory / Serverless Fallback
      userState = {
        id: `usr-g-${Date.now().toString().slice(-6)}`,
        name: finalName,
        email: normalizedEmail,
        avatar: finalAvatar,
        whatsapp: '',
        accountType: 'STANDARD',
        tier: 'FREE',
        role: normalizedEmail === 'admin@realistisfx.com' ? 'ADMIN' : 'USER',
        isAuthenticated: true,
        telegramLinked: false,
        dailyCalculatorCount: 0,
        disciplineScore: 0,
        winRate: 0,
        totalTrades: 0,
        strictModeEnabled: true,
        isChecklistPassed: false,
        subscriptionStatus: 'NONE',
      };
    }

    return NextResponse.json({
      success: true,
      user: userState,
      message: 'Login Google berhasil.',
    });
  } catch (error) {
    console.error('[Google Auth] Error handling request:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan sistem saat memproses login Google.' },
      { status: 500 }
    );
  }
}

