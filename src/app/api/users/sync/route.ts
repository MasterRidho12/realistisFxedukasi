import { NextResponse } from 'next/server';
import { UserState, SubscriptionRequest } from '@/types';
import prisma from '@/lib/prisma';
import {
  getServerUsers,
  setServerUsers,
  getServerRequests,
  setServerRequests,
} from '@/lib/serverUserStore';

async function getDatabaseUsers(): Promise<UserState[] | null> {
  const hasDbUrl = Boolean(
    process.env.DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL
  );

  if (!hasDbUrl) return null;

  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });

    if (!users || users.length === 0) return null;

    return users.map((u) => ({
      id: u.id,
      name: u.name || 'Trader RealistisFx',
      email: u.email,
      whatsapp: u.whatsapp || '',
      accountType: u.accountType === 'CENT' ? 'CENT' : 'STANDARD',
      tier: (u.tier as 'FREE' | 'PRO') || 'FREE',
      role: (u.role as 'USER' | 'ADMIN') || 'USER',
      isAuthenticated: false,
      telegramLinked: u.telegramLinked ?? false,
      dailyCalculatorCount: u.dailyCalculatorCount ?? 0,
      disciplineScore: u.disciplineScore ?? 0,
      winRate: 0,
      totalTrades: 0,
      strictModeEnabled: true,
      isChecklistPassed: false,
      subscriptionStatus: u.tier === 'PRO' ? 'ACTIVE' : 'NONE',
      hasAcademyAccess: u.tier === 'PRO',
    }));
  } catch (err) {
    console.warn('[Sync API] Prisma DB read fallback:', err);
    return null;
  }
}

export async function GET() {
  const dbUsers = await getDatabaseUsers();
  const isDatabaseConnected = dbUsers !== null;

  let mergedUsers = [...getServerUsers()];
  if (dbUsers && dbUsers.length > 0) {
    dbUsers.forEach((du) => {
      const idx = mergedUsers.findIndex((su) => su.email.toLowerCase() === du.email.toLowerCase());
      if (idx >= 0) {
        mergedUsers[idx] = { ...mergedUsers[idx], ...du };
      } else {
        mergedUsers.push(du);
      }
    });
  }

  return NextResponse.json({
    users: mergedUsers,
    requests: getServerRequests(),
    isDatabaseConnected,
    databaseEngine: isDatabaseConnected ? 'Vercel Postgres (Neon Cloud)' : 'Serverless Cache & In-Memory',
    userCount: mergedUsers.length,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, user, request, userId, targetEmail, newTier, requestId, updatedRequests, updatedUsers } = body;

    const hasDbUrl = Boolean(
      process.env.DATABASE_URL ||
      process.env.POSTGRES_PRISMA_URL ||
      process.env.POSTGRES_URL
    );

    let currentUsers = [...getServerUsers()];
    let currentRequests = [...getServerRequests()];

    if (action === 'REGISTER_USER' && user) {
      const exists = currentUsers.find((u) => u.email.toLowerCase() === user.email.toLowerCase());
      if (!exists) {
        currentUsers.push(user);
      } else {
        currentUsers = currentUsers.map((u) =>
          u.email.toLowerCase() === user.email.toLowerCase() ? { ...u, ...user } : u
        );
      }
      setServerUsers(currentUsers);

      if (hasDbUrl) {
        try {
          await prisma.user.upsert({
            where: { email: user.email.toLowerCase() },
            update: {
              name: user.name,
              whatsapp: user.whatsapp,
              accountType: user.accountType === 'CENT' ? 'CENT' : 'STANDARD',
              tier: user.tier === 'PRO' ? 'PRO' : 'FREE',
            },
            create: {
              id: user.id || `usr-${Date.now()}`,
              name: user.name,
              email: user.email.toLowerCase(),
              password: user.password || 'trader123',
              whatsapp: user.whatsapp || '',
              accountType: user.accountType === 'CENT' ? 'CENT' : 'STANDARD',
              role: 'USER',
              tier: 'FREE',
              dailyCalculatorCount: 0,
              disciplineScore: 0,
            },
          });
        } catch (dbErr) {
          console.warn('[Sync API] DB write user error:', dbErr);
        }
      }
    } else if (action === 'CREATE_REQUEST' && request) {
      const exists = currentRequests.find((r) => r.id === request.id);
      if (!exists) {
        currentRequests.unshift(request);
        setServerRequests(currentRequests);
      }
    } else if (action === 'UPDATE_PROFILE' && user) {
      currentUsers = currentUsers.map((u) =>
        u.id === user.id || (u.email && user.email && u.email.toLowerCase() === user.email.toLowerCase())
          ? { ...u, ...user }
          : u
      );
      setServerUsers(currentUsers);

      if (hasDbUrl && user.email) {
        try {
          await prisma.user.updateMany({
            where: { email: user.email.toLowerCase() },
            data: {
              name: user.name,
              whatsapp: user.whatsapp,
              accountType: user.accountType === 'CENT' ? 'CENT' : 'STANDARD',
            },
          });
        } catch (dbErr) {
          console.warn('[Sync API] DB update user profile warning:', dbErr);
        }
      }
    } else if (action === 'UPDATE_USER_TIER' && (userId || targetEmail) && newTier) {
      const idx = currentUsers.findIndex((u) =>
        (userId && u.id === userId) ||
        (targetEmail && u.email.toLowerCase() === targetEmail.toLowerCase())
      );
      if (idx >= 0) {
        currentUsers[idx] = {
          ...currentUsers[idx],
          tier: newTier,
          subscriptionStatus: newTier === 'PRO' ? 'ACTIVE' : 'NONE',
          proExpiryDate: newTier === 'PRO' ? '16 Nov 2026' : undefined,
          hasAcademyAccess: newTier === 'PRO',
        };
      } else if (targetEmail) {
        currentUsers.push({
          id: userId || `usr-${Date.now().toString().slice(-6)}`,
          name: 'Trader RealistisFx',
          email: targetEmail.toLowerCase(),
          whatsapp: '',
          accountType: 'STANDARD',
          tier: newTier,
          role: 'USER',
          isAuthenticated: false,
          telegramLinked: false,
          dailyCalculatorCount: 0,
          disciplineScore: 0,
          winRate: 0,
          totalTrades: 0,
          strictModeEnabled: true,
          isChecklistPassed: false,
          subscriptionStatus: newTier === 'PRO' ? 'ACTIVE' : 'NONE',
          proExpiryDate: newTier === 'PRO' ? '16 Nov 2026' : undefined,
          hasAcademyAccess: newTier === 'PRO',
        });
      }
      setServerUsers(currentUsers);

      if (hasDbUrl) {
        try {
          if (userId) {
            await prisma.user.updateMany({
              where: { id: userId },
              data: {
                tier: newTier === 'PRO' ? 'PRO' : 'FREE',
              },
            });
          }
          if (targetEmail) {
            await prisma.user.updateMany({
              where: { email: targetEmail.toLowerCase() },
              data: {
                tier: newTier === 'PRO' ? 'PRO' : 'FREE',
              },
            });
          }
        } catch (dbErr) {
          console.warn('[Sync API] DB update tier error:', dbErr);
        }
      }
    } else if (action === 'APPROVE_SUBSCRIPTION' && requestId) {
      currentRequests = currentRequests.map((r) =>
        r.id === requestId ? { ...r, status: 'APPROVED' as const } : r
      );
      setServerRequests(currentRequests);

      const reqItem = currentRequests.find((r) => r.id === requestId);
      if (reqItem) {
        currentUsers = currentUsers.map((u) => {
          if (u.id === reqItem.userId || u.email.toLowerCase() === reqItem.userEmail.toLowerCase()) {
            return {
              ...u,
              tier: 'PRO' as const,
              subscriptionStatus: 'ACTIVE' as const,
              proExpiryDate: '16 Nov 2026',
              hasAcademyAccess: true,
            };
          }
          return u;
        });
        setServerUsers(currentUsers);

        if (hasDbUrl) {
          try {
            await prisma.user.updateMany({
              where: { email: reqItem.userEmail.toLowerCase() },
              data: {
                tier: 'PRO',
              },
            });
          } catch (dbErr) {
            console.warn('[Sync API] DB approve error:', dbErr);
          }
        }
      }
    } else if (action === 'SYNC_ALL') {
      if (Array.isArray(updatedUsers) && updatedUsers.length > 0) {
        updatedUsers.forEach((u: UserState) => {
          const idx = currentUsers.findIndex((su) => su.email.toLowerCase() === u.email.toLowerCase());
          if (idx >= 0) {
            if (u.tier === 'PRO' || currentUsers[idx].tier === 'PRO') {
              currentUsers[idx] = { ...currentUsers[idx], ...u, tier: 'PRO', subscriptionStatus: 'ACTIVE', hasAcademyAccess: true };
            } else {
              currentUsers[idx] = { ...currentUsers[idx], ...u };
            }
          } else {
            currentUsers.push(u);
          }
        });
        setServerUsers(currentUsers);
      }
      if (Array.isArray(updatedRequests) && updatedRequests.length > 0) {
        setServerRequests(updatedRequests);
      }
    }

    return NextResponse.json({
      success: true,
      users: getServerUsers(),
      requests: getServerRequests(),
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
