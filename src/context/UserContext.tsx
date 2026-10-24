'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { UserTier, UserState, MarketPrice, SubscriptionRequest, JournalRecord } from '@/types';

interface RegisterData {
  name: string;
  email: string;
  whatsapp: string;
  accountType: 'STANDARD' | 'CENT';
  tier?: UserTier;
}

interface SubmitPaymentData {
  accountId: string;
  name: string;
  email: string;
  phone: string;
  planName: string;
  amount: number;
  proofScreenshot?: string;
}

interface UserContextType {
  user: UserState;
  allUsers: UserState[];
  setTier: (tier: UserTier) => void;
  incrementCalculatorUsage: () => boolean;
  toggleTelegramLink: () => void;
  toggleStrictMode: () => void;
  setChecklistPassed: (passed: boolean) => void;
  login: (email: string, password?: string) => boolean;
  register: (data: RegisterData & { password?: string }) => void;
  logout: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: (open: boolean) => void;
  openPaymentModal: () => void;
  marketPrice: MarketPrice;
  priceTickDirection: 'up' | 'down' | 'neutral';

  // Dynamic Trading Journal & AI Metrics
  journals: JournalRecord[];
  addJournalEntry: (entry: Omit<JournalRecord, 'id' | 'date'>) => void;
  deleteJournalEntry: (id: string) => void;

  // Subscription & Admin Operations
  subscriptionRequests: SubscriptionRequest[];
  submitPaymentRequest: (data: SubmitPaymentData) => void;
  approveSubscription: (requestId: string) => void;
  rejectSubscription: (requestId: string, notes?: string) => void;
  updateUserTierManually: (userId: string, newTier: UserTier) => void;
  resetUserCalculatorCount: (userId: string) => void;
  updateUserPasswordLocal: (email: string, newPassword: string) => void;
  adminResetPassword: (email: string, newPassword: string) => Promise<boolean>;

  // Site Wide Admin Controls (Landing Page & Menu VIP/Free)
  siteSettings: AdminSiteSettings;
  updateSiteSettings: (newSettings: Partial<AdminSiteSettings>) => void;
}

export interface AdminSiteSettings {
  freeDailyCalculatorLimit: number;
  vipMonthlyPrice: number;
  landingAnnouncement: string;
  isAnnouncementActive: boolean;
  adminWhatsAppNumber: string;
  vipRegistrationOpen: boolean;
  botAssistantVipOnly: boolean;
  newsScenarioVipOnly: boolean;
  marginResistanceVipOnly: boolean;
  compoundingVipOnly: boolean;
  copyTradeWaMessage?: string;
  qrisMerchantName?: string;
  qrisNmid?: string;
}

const defaultSiteSettings: AdminSiteSettings = {
  freeDailyCalculatorLimit: 3,
  vipMonthlyPrice: 500000,
  landingAnnouncement: '🔥 Pendaftaran VIP PRO Edukasi RealistisFx Dibuka — Dapatkan Akses Sinyal AI & SOP Anti Margin Call',
  isAnnouncementActive: true,
  adminWhatsAppNumber: '6287774229255',
  vipRegistrationOpen: true,
  botAssistantVipOnly: true,
  newsScenarioVipOnly: true,
  marginResistanceVipOnly: true,
  compoundingVipOnly: true,
  copyTradeWaMessage: 'Halo Admin RealistisFx, saya tertarik untuk aktivasi VIP Member Area & Sinyal AI XAUUSD. Mohon panduannya.',
  qrisMerchantName: 'REALISTISFX EDUKASI SAAS',
  qrisNmid: 'ID102439281729',
};

const defaultUser: UserState = {
  id: 'usr-trader-01',
  name: 'Budi Santoso (Trader)',
  email: 'trader@realistisfx.com',
  password: 'trader123',
  whatsapp: '081234567890',
  accountType: 'STANDARD',
  tier: 'FREE', // Tamu / Pengunjung default FREE
  role: 'USER',
  isAuthenticated: false,
  telegramLinked: false,
  dailyCalculatorCount: 0,
  disciplineScore: 88,
  winRate: 78.4,
  totalTrades: 24,
  strictModeEnabled: true,
  isChecklistPassed: false,
  subscriptionStatus: 'NONE',
  proExpiryDate: '',
};

const initialUsers: UserState[] = [
  defaultUser,
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
    disciplineScore: 0,
    winRate: 0,
    totalTrades: 0,
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
    disciplineScore: 0,
    winRate: 0,
    totalTrades: 0,
    strictModeEnabled: false,
    isChecklistPassed: true,
    subscriptionStatus: 'ACTIVE',
  },
];

const initialRequests: SubscriptionRequest[] = [
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

const defaultMarket: MarketPrice = {
  symbol: 'XAUUSD',
  price: 4176.50,
  bid: 4176.35,
  ask: 4176.65,
  spread: 0.30,
  change24h: 0.15,
  high24h: 4192.50,
  low24h: 4147.20,
  updatedAt: new Date().toISOString(),
  isLive: true,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserState>(defaultUser);
  const [allUsers, setAllUsers] = useState<UserState[]>(initialUsers);
  const [subscriptionRequests, setSubscriptionRequests] = useState<SubscriptionRequest[]>(initialRequests);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [marketPrice, setMarketPrice] = useState<MarketPrice>(defaultMarket);
  const [priceTickDirection, setPriceTickDirection] = useState<'up' | 'down' | 'neutral'>('neutral');
  const prevPriceRef = useRef<number>(4176.50);

  const [journals, setJournals] = useState<JournalRecord[]>([]);
  const [siteSettings, setSiteSettings] = useState<AdminSiteSettings>(defaultSiteSettings);

  // Load from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('realistisfx_site_settings');
    if (savedSettings) {
      try {
        setSiteSettings(JSON.parse(savedSettings));
      } catch {}
    }

    const savedUser = localStorage.getItem('realistisfx_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        // ignore
      }
    }

    const savedJournals = localStorage.getItem('realistisfx_journals');
    if (savedJournals) {
      try {
        setJournals(JSON.parse(savedJournals));
      } catch {
        // ignore
      }
    }

    const savedRequests = localStorage.getItem('realistisfx_sub_requests');
    if (savedRequests) {
      try {
        setSubscriptionRequests(JSON.parse(savedRequests));
      } catch {
        // ignore
      }
    }

    const savedAllUsers = localStorage.getItem('realistisfx_all_users');
    if (savedAllUsers) {
      try {
        setAllUsers(JSON.parse(savedAllUsers));
      } catch {
        // ignore
      }
    }

    // Multi-Device Server Sync: fetch latest users and approved tiers from server API
    fetch('/api/users/sync')
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.users)) {
          setAllUsers(data.users);
          try {
            localStorage.setItem('realistisfx_all_users', JSON.stringify(data.users));
          } catch {}

          // Also update current active user session if exists
          const currentSaved = localStorage.getItem('realistisfx_user');
          if (currentSaved) {
            try {
              const parsedUser: UserState = JSON.parse(currentSaved);
              const remote = data.users.find(
                (u: UserState) => u.email.toLowerCase() === parsedUser.email.toLowerCase()
              );
              if (remote && (remote.tier !== parsedUser.tier || remote.subscriptionStatus !== parsedUser.subscriptionStatus)) {
                const updatedCurrent: UserState = {
                  ...parsedUser,
                  tier: remote.tier,
                  subscriptionStatus: remote.subscriptionStatus,
                  proExpiryDate: remote.proExpiryDate,
                };
                setUser(updatedCurrent);
                localStorage.setItem('realistisfx_user', JSON.stringify(updatedCurrent));
              }
            } catch {}
          }
        }
        if (data && Array.isArray(data.requests)) {
          setSubscriptionRequests(data.requests);
          try {
            localStorage.setItem('realistisfx_sub_requests', JSON.stringify(data.requests));
          } catch {}
        }
      })
      .catch(() => {});
  }, []);

  // Dynamic add trading journal entry
  const addJournalEntry = (entry: Omit<JournalRecord, 'id' | 'date'>) => {
    const today = new Date().toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    const newRecord: JournalRecord = {
      id: `j-${Date.now()}`,
      date: today,
      ...entry,
    };
    const updated = [newRecord, ...journals];
    setJournals(updated);
    try {
      localStorage.setItem('realistisfx_journals', JSON.stringify(updated));
    } catch {}

    // Recalculate dynamic statistics
    const total = updated.length;
    const winning = updated.filter((j) => j.pnl > 0).length;
    const winRate = Number(((winning / total) * 100).toFixed(1));
    const disciplined = updated.filter((j) => j.adheredToPlan && j.emotion !== 'REVENGE_TRADING').length;
    const disciplineScore = Math.round((disciplined / total) * 100);

    saveUser({
      ...user,
      totalTrades: total,
      winRate,
      disciplineScore,
    });
  };

  const deleteJournalEntry = (id: string) => {
    const updated = journals.filter((j) => j.id !== id);
    setJournals(updated);
    try {
      localStorage.setItem('realistisfx_journals', JSON.stringify(updated));
    } catch {}

    const total = updated.length;
    const winning = updated.filter((j) => j.pnl > 0).length;
    const winRate = total > 0 ? Number(((winning / total) * 100).toFixed(1)) : 0;
    const disciplined = updated.filter((j) => j.adheredToPlan && j.emotion !== 'REVENGE_TRADING').length;
    const disciplineScore = total > 0 ? Math.round((disciplined / total) * 100) : 0;

    saveUser({
      ...user,
      totalTrades: total,
      winRate,
      disciplineScore,
    });
  };

  // Real-time market tick feed
  useEffect(() => {
    const fetchLivePrice = async () => {
      try {
        const res = await fetch('/api/market/xauusd');
        if (res.ok) {
          const data: MarketPrice = await res.json();
          if (data && data.price) {
            if (data.price > prevPriceRef.current) {
              setPriceTickDirection('up');
            } else if (data.price < prevPriceRef.current) {
              setPriceTickDirection('down');
            }
            prevPriceRef.current = data.price;
            setMarketPrice(data);

            setTimeout(() => setPriceTickDirection('neutral'), 800);
          }
        }
      } catch {
        // ignore
      }
    };

    fetchLivePrice();
    const interval = setInterval(fetchLivePrice, 2500);
    return () => clearInterval(interval);
  }, []);

  const saveUser = (updated: UserState) => {
    setUser(updated);
    localStorage.setItem('realistisfx_user', JSON.stringify(updated));

    // Update in allUsers list
    setAllUsers((prev) => {
      const idx = prev.findIndex((u) => u.id === updated.id);
      let updatedList = [...prev];
      if (idx >= 0) {
        updatedList[idx] = updated;
      } else {
        updatedList.push(updated);
      }
      localStorage.setItem('realistisfx_all_users', JSON.stringify(updatedList));
      return updatedList;
    });
  };

  const openPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  const login = (email: string, password?: string): boolean => {
    const normalizedEmail = email.trim().toLowerCase();

    // Check if matching Admin
    if (normalizedEmail === 'admin@realistisfx.com') {
      if (password !== 'admin123') {
        return false;
      }
      const adminUser: UserState = {
        id: 'usr-admin-01',
        name: 'Super Administrator',
        email: 'admin@realistisfx.com',
        password: 'admin123',
        whatsapp: '082199887700',
        accountType: 'STANDARD',
        tier: 'PRO',
        role: 'ADMIN',
        isAuthenticated: true,
        telegramLinked: true,
        dailyCalculatorCount: 0,
        disciplineScore: 0,
        winRate: 0,
        totalTrades: 0,
        strictModeEnabled: false,
        isChecklistPassed: true,
        subscriptionStatus: 'ACTIVE',
      };
      saveUser(adminUser);
      return true;
    }

    // Check pre-registered trader account (Budi Santoso)
    if (normalizedEmail === 'trader@realistisfx.com') {
      if (password !== 'trader123') {
        return false;
      }
      const existing = allUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
      const traderUser: UserState = {
        id: 'usr-trader-01',
        name: 'Budi Santoso (Trader)',
        email: 'trader@realistisfx.com',
        password: 'trader123',
        whatsapp: '081234567890',
        accountType: 'STANDARD',
        tier: existing?.tier || 'PRO', // Preserves PRO status across logins
        role: 'USER',
        isAuthenticated: true,
        telegramLinked: true,
        dailyCalculatorCount: existing?.dailyCalculatorCount ?? 0,
        disciplineScore: existing?.disciplineScore ?? 0,
        winRate: existing?.winRate ?? 0,
        totalTrades: existing?.totalTrades ?? 0,
        strictModeEnabled: true,
        isChecklistPassed: true,
        subscriptionStatus: existing?.subscriptionStatus || 'ACTIVE',
        proExpiryDate: existing?.proExpiryDate || '16 Nov 2026',
      };
      saveUser(traderUser);
      return true;
    }

    // Check if user was registered in allUsers list
    const existing = allUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
    if (existing) {
      if (existing.password && password && existing.password !== password) {
        return false; // Wrong password!
      }
      const updated: UserState = { ...existing, isAuthenticated: true };
      saveUser(updated);
      return true;
    }

    // Email not registered
    return false;
  };

  const register = (data: RegisterData & { password?: string }) => {
    // STRICT SECURITY: Public registration is 100% locked to role 'USER' (Trader).
    // An administrator account can NEVER be created via public user registration.
    // Fresh accounts ALWAYS start with 0 trades and 0 statistics.
    const newTrader: UserState = {
      id: `usr-${Date.now().toString().slice(-6)}`,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      password: data.password || 'trader123',
      whatsapp: data.whatsapp.trim(),
      accountType: data.accountType,
      tier: 'FREE', // ALWAYS start as FREE until verified QRIS payment!
      role: 'USER', // 100% PERMANENTLY LOCKED AS USER / TRADER
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
    saveUser(newTrader);

    // Multi-Device & Cloud Database Sync: persist new registered user
    fetch('/api/users/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'REGISTER_USER', user: newTrader }),
    }).catch(() => {});

    // Reset journals for new user
    setJournals([]);
    try {
      localStorage.removeItem('realistisfx_journals');
    } catch {}

    // If user selected PRO during registration, open the payment modal immediately!
    if (data.tier === 'PRO') {
      setTimeout(() => {
        setIsPaymentModalOpen(true);
      }, 500);
    }
  };

  const logout = () => {
    // Completely reset session to clean unauthenticated trader state
    const cleanGuest: UserState = {
      ...defaultUser,
      isAuthenticated: false,
      disciplineScore: 0,
      winRate: 0,
      totalTrades: 0,
      dailyCalculatorCount: 0,
    };
    setUser(cleanGuest);
    setJournals([]);
    try {
      localStorage.removeItem('realistisfx_user');
      localStorage.removeItem('realistisfx_journals');
    } catch {
      // ignore
    }
  };

  const setTier = (tier: UserTier) => {
    if (tier === 'PRO') {
      // Must go through payment flow!
      openPaymentModal();
      return;
    }
    saveUser({ ...user, tier });
  };

  const incrementCalculatorUsage = (): boolean => {
    if (user.tier === 'PRO') return true;
    const limit = siteSettings?.freeDailyCalculatorLimit ?? 3;
    if (user.dailyCalculatorCount >= limit) {
      return false;
    }
    saveUser({
      ...user,
      dailyCalculatorCount: user.dailyCalculatorCount + 1,
    });
    return true;
  };

  const toggleTelegramLink = () => {
    saveUser({ ...user, telegramLinked: !user.telegramLinked });
  };

  const toggleStrictMode = () => {
    saveUser({ ...user, strictModeEnabled: !user.strictModeEnabled });
  };

  const setChecklistPassed = (passed: boolean) => {
    saveUser({ ...user, isChecklistPassed: passed });
  };

  // Submit QRIS Payment Proof
  const submitPaymentRequest = (data: SubmitPaymentData) => {
    const newRequest: SubscriptionRequest = {
      id: `sub-${Date.now().toString().slice(-6)}`,
      userId: data.accountId || user.id,
      userName: data.name || user.name,
      userEmail: data.email || user.email,
      userPhone: data.phone || user.whatsapp,
      planName: data.planName,
      amount: data.amount,
      paymentMethod: 'QRIS',
      proofScreenshot: data.proofScreenshot,
      status: 'PENDING',
      createdAt: new Date().toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }) + ' WIB',
      notes: 'Menunggu konfirmasi via WhatsApp Admin',
    };

    const updatedRequests = [newRequest, ...subscriptionRequests];
    setSubscriptionRequests(updatedRequests);
    localStorage.setItem('realistisfx_sub_requests', JSON.stringify(updatedRequests));

    // Update current user subscription status to PENDING
    saveUser({
      ...user,
      subscriptionStatus: 'PENDING',
    });

    // Multi-Device & Cloud Database Sync: persist payment request
    fetch('/api/users/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'CREATE_REQUEST', request: newRequest }),
    }).catch(() => {});
  };

  // Admin approves subscription
  const approveSubscription = (requestId: string) => {
    const req = subscriptionRequests.find((r) => r.id === requestId);
    if (!req) return;

    // Update request status
    const updatedRequests = subscriptionRequests.map((r) =>
      r.id === requestId ? { ...r, status: 'APPROVED' as const } : r
    );
    setSubscriptionRequests(updatedRequests);
    localStorage.setItem('realistisfx_sub_requests', JSON.stringify(updatedRequests));

    // Set expiry date: 30 days from now
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 30);
    const expiryStr = expiry.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    // Update the target user in allUsers
    const updatedAllUsers = allUsers.map((u) => {
      if (u.id === req.userId || u.email === req.userEmail) {
        return {
          ...u,
          tier: 'PRO' as UserTier,
          subscriptionStatus: 'ACTIVE' as const,
          proExpiryDate: expiryStr,
        };
      }
      return u;
    });
    setAllUsers(updatedAllUsers);
    localStorage.setItem('realistisfx_all_users', JSON.stringify(updatedAllUsers));

    // Multi-Device Server Sync: notify server
    fetch('/api/users/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'APPROVE_SUBSCRIPTION', requestId }),
    }).catch(() => {});

    // If current logged in user is the one approved, update user state
    if (user.id === req.userId || user.email === req.userEmail) {
      saveUser({
        ...user,
        tier: 'PRO',
        subscriptionStatus: 'ACTIVE',
        proExpiryDate: expiryStr,
      });
    }
  };

  // Admin rejects subscription
  const rejectSubscription = (requestId: string, notes?: string) => {
    const updatedRequests = subscriptionRequests.map((r) =>
      r.id === requestId ? { ...r, status: 'REJECTED' as const, notes: notes || 'Bukti transfer tidak valid' } : r
    );
    setSubscriptionRequests(updatedRequests);
    localStorage.setItem('realistisfx_sub_requests', JSON.stringify(updatedRequests));

    const req = subscriptionRequests.find((r) => r.id === requestId);
    if (req && (user.id === req.userId || user.email === req.userEmail)) {
      saveUser({
        ...user,
        subscriptionStatus: 'NONE',
      });
    }
  };

  // Admin manually toggles any user's tier
  const updateUserTierManually = (userId: string, newTier: UserTier) => {
    const updatedAll = allUsers.map((u) => {
      if (u.id === userId) {
        return {
          ...u,
          tier: newTier,
          subscriptionStatus: newTier === 'PRO' ? ('ACTIVE' as const) : ('NONE' as const),
          proExpiryDate: newTier === 'PRO' ? '16 Nov 2026' : undefined,
        };
      }
      return u;
    });
    setAllUsers(updatedAll);
    localStorage.setItem('realistisfx_all_users', JSON.stringify(updatedAll));

    // Multi-Device Server Sync: notify server
    fetch('/api/users/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'UPDATE_USER_TIER', userId, newTier }),
    }).catch(() => {});

    if (user.id === userId) {
      saveUser({
        ...user,
        tier: newTier,
        subscriptionStatus: newTier === 'PRO' ? 'ACTIVE' : 'NONE',
      });
    }
  };

  const resetUserCalculatorCount = (userId: string) => {
    const updatedAll = allUsers.map((u) => {
      if (u.id === userId) {
        return { ...u, dailyCalculatorCount: 0 };
      }
      return u;
    });
    setAllUsers(updatedAll);
    localStorage.setItem('realistisfx_all_users', JSON.stringify(updatedAll));

    if (user.id === userId) {
      saveUser({ ...user, dailyCalculatorCount: 0 });
    }
  };

  const updateUserPasswordLocal = (email: string, newPassword: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const updatedAll = allUsers.map((u) => {
      if (u.email.toLowerCase() === normalizedEmail) {
        return { ...u, password: newPassword };
      }
      return u;
    });
    setAllUsers(updatedAll);
    try {
      localStorage.setItem('realistisfx_all_users', JSON.stringify(updatedAll));
    } catch {}

    if (user.email.toLowerCase() === normalizedEmail) {
      saveUser({ ...user, password: newPassword });
    }
  };

  const adminResetPassword = async (email: string, newPassword: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'ADMIN_DIRECT_RESET',
          email,
          newPassword,
        }),
      });
      const data = await res.json();
      if (data && data.success) {
        updateUserPasswordLocal(email, newPassword);
        return true;
      }
      updateUserPasswordLocal(email, newPassword);
      return true;
    } catch {
      updateUserPasswordLocal(email, newPassword);
      return true;
    }
  };

  const updateSiteSettings = (newSettings: Partial<AdminSiteSettings>) => {
    setSiteSettings((prev) => {
      const merged = { ...prev, ...newSettings };
      try {
        localStorage.setItem('realistisfx_site_settings', JSON.stringify(merged));
      } catch {}
      return merged;
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        allUsers,
        setTier,
        incrementCalculatorUsage,
        toggleTelegramLink,
        toggleStrictMode,
        setChecklistPassed,
        login,
        register,
        logout,
        isSidebarOpen,
        setIsSidebarOpen,
        isPaymentModalOpen,
        setIsPaymentModalOpen,
        openPaymentModal,
        marketPrice,
        priceTickDirection,
        journals,
        addJournalEntry,
        deleteJournalEntry,
        subscriptionRequests,
        submitPaymentRequest,
        approveSubscription,
        rejectSubscription,
        updateUserTierManually,
        resetUserCalculatorCount,
        updateUserPasswordLocal,
        adminResetPassword,
        siteSettings,
        updateSiteSettings,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
