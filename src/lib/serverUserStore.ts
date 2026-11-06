import { UserState, SubscriptionRequest } from '@/types';

// Global cache on globalThis to persist across API route invocations in the same Node process/serverless instance
const globalForStore = globalThis as unknown as {
  serverUsers?: UserState[];
  serverRequests?: SubscriptionRequest[];
};

export const defaultTraderUser: UserState = {
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
  disciplineScore: 88,
  winRate: 78.4,
  totalTrades: 24,
  strictModeEnabled: true,
  isChecklistPassed: true,
  hasAcademyAccess: true,
  subscriptionStatus: 'ACTIVE',
  proExpiryDate: '16 Nov 2026',
};

export const initialServerUsers: UserState[] = [
  defaultTraderUser,
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
    hasAcademyAccess: true,
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
    hasAcademyAccess: true,
    subscriptionStatus: 'ACTIVE',
  },
];

export const initialServerRequests: SubscriptionRequest[] = [
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

if (!globalForStore.serverUsers) {
  globalForStore.serverUsers = [...initialServerUsers];
}

if (!globalForStore.serverRequests) {
  globalForStore.serverRequests = [...initialServerRequests];
}

export function getServerUsers(): UserState[] {
  if (!globalForStore.serverUsers) {
    globalForStore.serverUsers = [...initialServerUsers];
  }
  return globalForStore.serverUsers;
}

export function setServerUsers(users: UserState[]): void {
  globalForStore.serverUsers = users;
}

export function getServerRequests(): SubscriptionRequest[] {
  if (!globalForStore.serverRequests) {
    globalForStore.serverRequests = [...initialServerRequests];
  }
  return globalForStore.serverRequests;
}

export function setServerRequests(requests: SubscriptionRequest[]): void {
  globalForStore.serverRequests = requests;
}
