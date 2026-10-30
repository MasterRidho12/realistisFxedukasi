import { NextResponse } from 'next/server';
import { UserState, SubscriptionRequest } from '@/types';
import prisma from '@/lib/prisma';

// In-Memory fallback cache (persists within serverless instance or when DB not yet linked)
let serverUsers: UserState[] = [
  {
    id: 'usr-trader-01',
    name: 'Budi Santoso (Trader)',
    email: 'trader@realistisfx.com',
    password: 'trader123',
    whatsapp: '081234567890',
    accountType: 'STANDARD',
    tier: 'PRO',
    role: 'USER',
    isAuthenticated: false,
    telegramLinked: true,
    dailyCalculatorCount: 0,
    disciplineScore: 85,
    winRate: 75,
    totalTrades: 12,
    strictModeEnabled: true,
    isChecklistPassed: true,
    subscriptionStatus: 'ACTIVE',
    proExpiryDate: '16 Nov 2026',
  },
  {
    id: 'usr-trader-02',
    name: 'Siti Rahmawati',
    email: 'siti.trader@gmail.com',
    password: 'trader123',
    whatsapp: '081399887766',
    accountType: 'STANDARD',
    tier: 'PRO',
    role: 'USER',
    isAuthenticated: false,
    telegramLinked: true,
    dailyCalculatorCount: 0,
    disciplineScore: 90,
    winRate: 80,
    totalTrades: 20,
    strictModeEnabled: true,
    isChecklistPassed: true,
    subscriptionStatus: 'ACTIVE',
    proExpiryDate: '15 Nov 2026',
  },
  {
    id: 'usr-admin-01',
    name: 'Super Administrator',
    email: 'admin@realistisfx.com',
    password: 'admin123',
    whatsapp: '082199887700',
    accountType: 'STANDARD',
    tier: 'PRO',
    role: 'ADMIN',
    isAuthenticated: false,
    telegramLinked: true,
    dailyCalculatorCount: 0,
    disciplineScore: 100,
    winRate: 100,
    totalTrades: 0,
    strictModeEnabled: false,
    isChecklistPassed: true,
    subscriptionStatus: 'ACTIVE',
  },
];

let serverRequests: SubscriptionRequest[] = [
  {
    id: 'sub-req-100',
    userId: 'usr-trader-01',
    userName: 'Budi Santoso (Trader)',
    userEmail: 'trader@realistisfx.com',
    userPhone: '081234567890',
    planName: 'Paket Edukasi Realistis',
    amount: 250000,
    paymentMethod: 'QRIS',
    proofScreenshot: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80',
    status: 'APPROVED',
    createdAt: '16 Okt 2026, 18.39 WIB',
    notes: 'Disetujui Admin - Status Edukasi Lengkap Aktif',
  },
  {
    id: 'sub-req-101',
    userId: 'usr-trader-03',
    userName: 'Dimas Wahyu',
    userEmail: 'dimas.forex@gmail.com',
    userPhone: '081234567899',
    planName: 'Paket Edukasi Realistis',
    amount: 250000,
    paymentMethod: 'QRIS',
    proofScreenshot: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80',
    status: 'PENDING',
    createdAt: '16 Okt 2026, 12:45 WIB',
    notes: 'Transfer via BCA Mobile ke QRIS RealistisFx',
  },
];

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
    }));
  } catch (err) {
    console.warn('[Sync API] Prisma DB read fallback:', err);
    return null;
  }
}

export async function GET() {
  const dbUsers = await getDatabaseUsers();
  const isDatabaseConnected = dbUsers !== null;

  let mergedUsers = [...serverUsers];
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
    requests: serverRequests,
    isDatabaseConnected,
    databaseEngine: isDatabaseConnected ? 'Vercel Postgres (Neon Cloud)' : 'Serverless Cache & In-Memory',
    userCount: mergedUsers.length,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, user, request, userId, newTier, requestId, updatedRequests, updatedUsers } = body;

    const hasDbUrl = Boolean(
      process.env.DATABASE_URL ||
      process.env.POSTGRES_PRISMA_URL ||
      process.env.POSTGRES_URL
    );

    if (action === 'REGISTER_USER' && user) {
      // 1. Update in-memory cache
      const exists = serverUsers.find((u) => u.email.toLowerCase() === user.email.toLowerCase());
      if (!exists) {
        serverUsers.push(user);
      } else {
        serverUsers = serverUsers.map((u) =>
          u.email.toLowerCase() === user.email.toLowerCase() ? { ...u, ...user } : u
        );
      }

      // 2. Persist to Vercel Postgres if connected
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
      const exists = serverRequests.find((r) => r.id === request.id);
      if (!exists) {
        serverRequests.unshift(request);
      }
    } else if (action === 'UPDATE_PROFILE' && user) {
      serverUsers = serverUsers.map((u) =>
        u.id === user.id || (u.email && user.email && u.email.toLowerCase() === user.email.toLowerCase())
          ? { ...u, ...user }
          : u
      );
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
    } else if (action === 'UPDATE_USER_TIER' && userId && newTier) {
      serverUsers = serverUsers.map((u) => {
        if (u.id === userId) {
          return {
            ...u,
            tier: newTier,
            subscriptionStatus: newTier === 'PRO' ? 'ACTIVE' : 'NONE',
            proExpiryDate: newTier === 'PRO' ? '16 Nov 2026' : undefined,
          };
        }
        return u;
      });

      if (hasDbUrl) {
        try {
          await prisma.user.updateMany({
            where: { id: userId },
            data: {
              tier: newTier === 'PRO' ? 'PRO' : 'FREE',
            },
          });
        } catch (dbErr) {
          console.warn('[Sync API] DB update tier error:', dbErr);
        }
      }
    } else if (action === 'APPROVE_SUBSCRIPTION' && requestId) {
      serverRequests = serverRequests.map((r) =>
        r.id === requestId ? { ...r, status: 'APPROVED' } : r
      );
      const reqItem = serverRequests.find((r) => r.id === requestId);
      if (reqItem) {
        serverUsers = serverUsers.map((u) => {
          if (u.id === reqItem.userId || u.email.toLowerCase() === reqItem.userEmail.toLowerCase()) {
            return {
              ...u,
              tier: 'PRO',
              subscriptionStatus: 'ACTIVE',
              proExpiryDate: '16 Nov 2026',
            };
          }
          return u;
        });

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
          const idx = serverUsers.findIndex((su) => su.email.toLowerCase() === u.email.toLowerCase());
          if (idx >= 0) {
            if (u.tier === 'PRO' || serverUsers[idx].tier === 'PRO') {
              serverUsers[idx] = { ...serverUsers[idx], ...u, tier: 'PRO', subscriptionStatus: 'ACTIVE' };
            } else {
              serverUsers[idx] = { ...serverUsers[idx], ...u };
            }
          } else {
            serverUsers.push(u);
          }
        });
      }
      if (Array.isArray(updatedRequests) && updatedRequests.length > 0) {
        serverRequests = updatedRequests;
      }
    }

    return NextResponse.json({
      success: true,
      users: serverUsers,
      requests: serverRequests,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
