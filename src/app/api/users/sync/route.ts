import { NextResponse } from 'next/server';
import { UserState, SubscriptionRequest } from '@/types';

// Global server-side state (persists across devices within server instance)
let serverUsers: UserState[] = [
  {
    id: 'usr-trader-01',
    name: 'Budi Santoso (Trader)',
    email: 'trader@realistisfx.com',
    password: 'trader123',
    whatsapp: '081234567890',
    accountType: 'STANDARD',
    tier: 'PRO', // Active PRO default for multi-device sync
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
    accountType: 'CENT',
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
    planName: '1 Bulan PRO',
    amount: 50000,
    paymentMethod: 'QRIS',
    proofScreenshot: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80',
    status: 'APPROVED',
    createdAt: '16 Okt 2026, 18.39 WIB',
    notes: 'Disetujui Admin - Status PRO Aktif',
  },
  {
    id: 'sub-req-101',
    userId: 'usr-trader-03',
    userName: 'Dimas Wahyu',
    userEmail: 'dimas.forex@gmail.com',
    userPhone: '081234567899',
    planName: '1 Bulan PRO',
    amount: 50000,
    paymentMethod: 'QRIS',
    proofScreenshot: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80',
    status: 'PENDING',
    createdAt: '16 Okt 2026, 12:45 WIB',
    notes: 'Transfer via BCA Mobile ke QRIS RealistisFx',
  },
];

export async function GET() {
  return NextResponse.json({
    users: serverUsers,
    requests: serverRequests,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, user, request, userId, newTier, requestId, updatedRequests, updatedUsers } = body;

    if (action === 'UPDATE_USER_TIER' && userId && newTier) {
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
    } else if (action === 'APPROVE_SUBSCRIPTION' && requestId) {
      serverRequests = serverRequests.map((r) =>
        r.id === requestId ? { ...r, status: 'APPROVED' } : r
      );
      const reqItem = serverRequests.find((r) => r.id === requestId);
      if (reqItem) {
        serverUsers = serverUsers.map((u) => {
          if (u.id === reqItem.userId || u.email === reqItem.userEmail) {
            return {
              ...u,
              tier: 'PRO',
              subscriptionStatus: 'ACTIVE',
              proExpiryDate: '16 Nov 2026',
            };
          }
          return u;
        });
      }
    } else if (action === 'REGISTER_USER' && user) {
      const exists = serverUsers.find((u) => u.email.toLowerCase() === user.email.toLowerCase());
      if (!exists) {
        serverUsers.push(user);
      }
    } else if (action === 'SYNC_ALL') {
      if (Array.isArray(updatedUsers) && updatedUsers.length > 0) {
        // Merge users
        updatedUsers.forEach((u: UserState) => {
          const idx = serverUsers.findIndex((su) => su.email.toLowerCase() === u.email.toLowerCase());
          if (idx >= 0) {
            // Keep PRO if either side is PRO
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
