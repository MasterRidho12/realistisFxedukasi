'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Shield,
  CheckCircle2,
  XCircle,
  MessageCircle,
  Crown,
  Users,
  CreditCard,
  Clock,
  ExternalLink,
  Search,
  Filter,
  Eye,
  RotateCcw,
  Sparkles,
  ArrowUpRight,
  AlertTriangle,
  Database,
  Server,
  KeyRound,
  X,
  Sliders,
  ToggleLeft,
  ToggleRight,
  Save,
  Radio,
  Send,
  Lock,
  Unlock,
  Check,
  Smartphone,
  Layers,
  ChevronRight,
  PhoneCall
} from 'lucide-react';
import { useUser, AdminSiteSettings } from '@/context/UserContext';

type AdminTab = 'USERS' | 'VIP_FREE_MENU' | 'LANDING_PAGE' | 'REQUESTS';

export default function AdminDashboardPage() {
  const searchParams = useSearchParams();
  const {
    allUsers,
    subscriptionRequests,
    approveSubscription,
    rejectSubscription,
    updateUserTierManually,
    resetUserCalculatorCount,
    adminResetPassword,
    siteSettings,
    updateSiteSettings,
  } = useUser();

  // Tab State: Users | VIP & Free Menu | Landing Page | Requests
  const [activeTab, setActiveTab] = useState<AdminTab>('USERS');

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'users') setActiveTab('USERS');
    else if (tabParam === 'vip-free') setActiveTab('VIP_FREE_MENU');
    else if (tabParam === 'landing') setActiveTab('LANDING_PAGE');
    else if (tabParam === 'requests') setActiveTab('REQUESTS');
  }, [searchParams]);

  // Search & Filter State for Users Tab
  const [searchQuery, setSearchQuery] = useState('');
  const [userTierFilter, setUserTierFilter] = useState<'ALL' | 'PRO' | 'FREE'>('ALL');
  const [accountTypeFilter, setAccountTypeFilter] = useState<'ALL' | 'STANDARD' | 'CENT'>('ALL');

  // Modal & Notification States
  const [selectedProofImg, setSelectedProofImg] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [dbStatus, setDbStatus] = useState<{ isConnected: boolean; engine: string; userCount?: number } | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Admin User Password Reset Modal State
  const [resetModalUser, setResetModalUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [customNewPassword, setCustomNewPassword] = useState('');
  const [isResettingPw, setIsResettingPw] = useState(false);

  // Form State for VIP & Free Menu Configuration
  const [menuForm, setMenuForm] = useState({
    freeDailyCalculatorLimit: siteSettings.freeDailyCalculatorLimit ?? 3,
    vipMonthlyPrice: siteSettings.vipMonthlyPrice ?? 500000,
    academyPrice: siteSettings.academyPrice ?? 100000,
    botAssistantVipOnly: siteSettings.botAssistantVipOnly ?? true,
    newsScenarioVipOnly: siteSettings.newsScenarioVipOnly ?? true,
    marginResistanceVipOnly: siteSettings.marginResistanceVipOnly ?? true,
    compoundingVipOnly: siteSettings.compoundingVipOnly ?? true,
    qrisMerchantName: siteSettings.qrisMerchantName ?? 'REALISTISFX EDUKASI SAAS',
    qrisNmid: siteSettings.qrisNmid ?? 'ID102439281729',
  });

  // Form State for Landing Page Configuration
  const [landingForm, setLandingForm] = useState({
    landingAnnouncement: siteSettings.landingAnnouncement ?? '🔥 Pendaftaran VIP PRO Edukasi RealistisFx Dibuka — Dapatkan Akses Sinyal AI & SOP Anti Margin Call',
    isAnnouncementActive: siteSettings.isAnnouncementActive ?? true,
    adminWhatsAppNumber: siteSettings.adminWhatsAppNumber ?? '6287774229255',
    copyTradeWaMessage: siteSettings.copyTradeWaMessage ?? 'Halo Admin RealistisFx, saya tertarik bergabung Copy-Trade & VIP Member Area.',
    vipRegistrationOpen: siteSettings.vipRegistrationOpen ?? true,
  });

  // Keep forms synced if siteSettings change
  useEffect(() => {
    setMenuForm({
      freeDailyCalculatorLimit: siteSettings.freeDailyCalculatorLimit ?? 3,
      vipMonthlyPrice: siteSettings.vipMonthlyPrice ?? 500000,
      academyPrice: siteSettings.academyPrice ?? 100000,
      botAssistantVipOnly: siteSettings.botAssistantVipOnly ?? true,
      newsScenarioVipOnly: siteSettings.newsScenarioVipOnly ?? true,
      marginResistanceVipOnly: siteSettings.marginResistanceVipOnly ?? true,
      compoundingVipOnly: siteSettings.compoundingVipOnly ?? true,
      qrisMerchantName: siteSettings.qrisMerchantName ?? 'REALISTISFX EDUKASI SAAS',
      qrisNmid: siteSettings.qrisNmid ?? 'ID102439281729',
    });
    setLandingForm({
      landingAnnouncement: siteSettings.landingAnnouncement ?? '🔥 Pendaftaran VIP PRO Edukasi RealistisFx Dibuka — Dapatkan Akses Sinyal AI & SOP Anti Margin Call',
      isAnnouncementActive: siteSettings.isAnnouncementActive ?? true,
      adminWhatsAppNumber: siteSettings.adminWhatsAppNumber ?? '6287774229255',
      copyTradeWaMessage: siteSettings.copyTradeWaMessage ?? 'Halo Admin RealistisFx, saya tertarik bergabung Copy-Trade & VIP Member Area.',
      vipRegistrationOpen: siteSettings.vipRegistrationOpen ?? true,
    });
  }, [siteSettings]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSaveMenuSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings({
      freeDailyCalculatorLimit: Number(menuForm.freeDailyCalculatorLimit),
      vipMonthlyPrice: Number(menuForm.vipMonthlyPrice),
      academyPrice: Number(menuForm.academyPrice),
      botAssistantVipOnly: menuForm.botAssistantVipOnly,
      newsScenarioVipOnly: menuForm.newsScenarioVipOnly,
      marginResistanceVipOnly: menuForm.marginResistanceVipOnly,
      compoundingVipOnly: menuForm.compoundingVipOnly,
      qrisMerchantName: menuForm.qrisMerchantName,
      qrisNmid: menuForm.qrisNmid,
    });
    showNotification('✅ Konfigurasi Menu VIP & Gratis Berhasil Disimpan!');
  };

  const handleSaveLandingSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings({
      landingAnnouncement: landingForm.landingAnnouncement,
      isAnnouncementActive: landingForm.isAnnouncementActive,
      adminWhatsAppNumber: landingForm.adminWhatsAppNumber.trim(),
      copyTradeWaMessage: landingForm.copyTradeWaMessage,
      vipRegistrationOpen: landingForm.vipRegistrationOpen,
    });
    showNotification('✅ Konfigurasi Landing Page Berhasil Disimpan & Langsung Aktif!');
  };

  const handleAdminResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetModalUser) return;
    if (!customNewPassword || customNewPassword.length < 6) {
      showNotification('⚠️ Password baru minimal 6 karakter.');
      return;
    }
    setIsResettingPw(true);
    const success = await adminResetPassword(resetModalUser.email, customNewPassword);
    setIsResettingPw(false);
    if (success) {
      showNotification(`✅ Password ${resetModalUser.name} berhasil diubah ke: ${customNewPassword}`);
      setResetModalUser(null);
      setCustomNewPassword('');
    } else {
      showNotification('❌ Gagal mereset password trader.');
    }
  };

  const fetchDbStatus = () => {
    setIsRefreshing(true);
    fetch('/api/users/sync')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setDbStatus({
            isConnected: Boolean(data.isDatabaseConnected),
            engine: data.databaseEngine || 'Serverless Cache & In-Memory',
            userCount: data.userCount,
          });
        }
      })
      .catch(() => {})
      .finally(() => {
        setTimeout(() => setIsRefreshing(false), 500);
      });
  };

  useEffect(() => {
    fetchDbStatus();
  }, []);

  const pendingRequests = subscriptionRequests.filter((r) => r.status === 'PENDING');
  const approvedRequests = subscriptionRequests.filter((r) => r.status === 'APPROVED');
  const totalProMembers = allUsers.filter((u) => u.tier === 'PRO').length;
  const totalFreeMembers = allUsers.filter((u) => u.tier === 'FREE').length;
  const totalRevenue = approvedRequests.length * (siteSettings.vipMonthlyPrice || 500000);

  const handleApprove = (requestId: string, userName: string) => {
    approveSubscription(requestId);
    showNotification(`✅ Sukses! Akun ${userName} berhasil diaktifkan menjadi VIP PRO.`);
  };

  const handleReject = (requestId: string, userName: string) => {
    rejectSubscription(requestId, 'Bukti pembayaran tidak sesuai');
    showNotification(`❌ Permohonan ${userName} telah ditolak.`);
  };

  // Filtered Users
  const filteredUsers = allUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.whatsapp.includes(searchQuery) ||
      u.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTier = userTierFilter === 'ALL' || u.tier === userTierFilter;
    const matchesType = accountTypeFilter === 'ALL' || u.accountType === accountTypeFilter;

    return matchesSearch && matchesTier && matchesType;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce border-2 border-white">
          <CheckCircle2 className="w-5 h-5" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="p-2 rounded-xl bg-emerald-50 text-[#00A651] border border-emerald-200">
              <Shield className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Pusat Kontrol Super Administrator
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
              RealistisFx
            </span>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl">
            Kelola landing page, atur batasan menu VIP dan Gratis, verifikasi transfer QRIS, serta pantau seluruh akun trader yang terdaftar.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/landing"
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-sm cursor-pointer"
          >
            <span>👁️ Pratinjau Landing Page</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
          </Link>
        </div>
      </div>

      {/* Database Connection Status Bar */}
      <div className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs ${
        dbStatus?.isConnected
          ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
          : 'bg-amber-50/80 border-amber-300 text-amber-950'
      }`}>
        <div className="flex items-start sm:items-center gap-3">
          <div className={`p-2.5 rounded-xl ${dbStatus?.isConnected ? 'bg-emerald-100 text-[#00A651]' : 'bg-amber-100 text-amber-700'}`}>
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-sm text-slate-900">
                Status Penyimpanan Cloud Database:
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                dbStatus?.isConnected
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-amber-100 text-amber-900 border border-amber-300'
              }`}>
                {dbStatus?.isConnected ? '🟢 Vercel Postgres Terhubung' : '🟡 Serverless Standalone Mode'}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Mesin: <strong className="text-slate-900 font-mono">{dbStatus?.engine || 'Cloud Storage'}</strong> — Semua akun baru otomatis tersimpan permanen.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={fetchDbStatus}
            disabled={isRefreshing}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-95"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#00A651]' : ''}`} />
            <span>{isRefreshing ? 'Sinkronisasi...' : 'Sinkronkan Data'}</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Akun */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Total Akun Terdaftar</span>
            <span className="p-2 rounded-xl bg-slate-100 text-slate-700 border border-slate-200">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-black text-slate-900">
            {allUsers.length}
          </div>
          <p className="text-[11px] text-slate-500">Seluruh akun trader aktif</p>
        </div>

        {/* Member VIP PRO */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Akun PRO VIP Aktif</span>
            <span className="p-2 rounded-xl bg-emerald-50 text-[#00A651] border border-emerald-200">
              <Crown className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-black text-[#00A651]">
            {totalProMembers}
          </div>
          <p className="text-[11px] text-slate-500">Akses penuh kalkulator &amp; sinyal</p>
        </div>

        {/* Akun FREE */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Akun FREE Tier</span>
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
              <Sparkles className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-black text-blue-600">
            {totalFreeMembers}
          </div>
          <p className="text-[11px] text-slate-500">Batas {siteSettings.freeDailyCalculatorLimit}x kalkulator/hari</p>
        </div>

        {/* Antrean QRIS */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Verifikasi QRIS</span>
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-black text-amber-600">
            {pendingRequests.length}
          </div>
          <p className="text-[11px] text-slate-500">
            {pendingRequests.length > 0 ? 'Menunggu konfirmasi admin' : 'Semua antrean tuntas'}
          </p>
        </div>
      </div>

      {/* 4 Core Admin Tabs Navigation */}
      <div className="flex flex-wrap rounded-2xl bg-slate-100 p-1.5 border border-slate-200 gap-1">
        <button
          onClick={() => setActiveTab('USERS')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'USERS'
              ? 'bg-[#00A651] text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Pantau Akun VIP &amp; FREE ({allUsers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('VIP_FREE_MENU')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'VIP_FREE_MENU'
              ? 'bg-[#00A651] text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Kontrol Menu VIP &amp; Gratis</span>
        </button>

        <button
          onClick={() => setActiveTab('LANDING_PAGE')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'LANDING_PAGE'
              ? 'bg-[#00A651] text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <ExternalLink className="w-4 h-4" />
          <span>Kontrol Landing Page</span>
        </button>

        <button
          onClick={() => setActiveTab('REQUESTS')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'REQUESTS'
              ? 'bg-[#00A651] text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Verifikasi Bukti QRIS ({pendingRequests.length})</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: PANTAU AKUN TERDAFTAR (VIP & FREE)                 */}
      {/* ======================================================== */}
      {activeTab === 'USERS' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          {/* Filters & Search Toolbar */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Filter Chips: All, VIP PRO, FREE */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => setUserTierFilter('ALL')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  userTierFilter === 'ALL'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Semua Akun ({allUsers.length})
              </button>

              <button
                type="button"
                onClick={() => setUserTierFilter('PRO')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  userTierFilter === 'PRO'
                    ? 'bg-[#00A651] text-white shadow-sm'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                <Crown className="w-3 h-3" />
                <span>Akun VIP PRO ({totalProMembers})</span>
              </button>

              <button
                type="button"
                onClick={() => setUserTierFilter('FREE')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  userTierFilter === 'FREE'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200'
                }`}
              >
                <span>Akun FREE ({totalFreeMembers})</span>
              </button>
            </div>

            {/* Live Search */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Cari nama, email, WA, ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:bg-white focus:border-[#00A651] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-600 bg-slate-50 font-bold">
                    <th className="p-3.5">ID Akun</th>
                    <th className="p-3.5">Nama Trader</th>
                    <th className="p-3.5">Email &amp; No. WhatsApp</th>
                    <th className="p-3.5">Tipe Akun</th>
                    <th className="p-3.5">Status Lisensi</th>
                    <th className="p-3.5">Kuota Kalkulator</th>
                    <th className="p-3.5">Disiplin</th>
                    <th className="p-3.5 text-right">Aksi Kontrol Akun</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-slate-500 text-xs">
                        Tidak ada akun trader yang sesuai dengan kriteria pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => {
                      const isProUser = u.tier === 'PRO';
                      const cleanPhone = u.whatsapp ? u.whatsapp.replace(/^0/, '62') : '';
                      const waChatUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                        `Halo ${u.name}! 👋\nSaya Admin RealistisFx Edukasi. Apakah ada yang bisa kami bantu terkait akun Anda?`
                      )}`;

                      return (
                        <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3.5 font-mono text-slate-500 font-bold">{u.id}</td>
                          <td className="p-3.5">
                            <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                              <span>{u.name}</span>
                              {u.role === 'ADMIN' && (
                                <span className="text-[9px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded border border-amber-300 font-black">
                                  SUPER ADMIN
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-3.5">
                            <div className="text-slate-900 font-medium">{u.email}</div>
                            <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                              <Smartphone className="w-3 h-3 text-slate-400" />
                              <span>{u.whatsapp || '-'}</span>
                            </div>
                          </td>
                          <td className="p-3.5">
                            <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                              {u.accountType}
                            </span>
                          </td>
                          <td className="p-3.5">
                            {isProUser ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs">
                                <Crown className="w-3 h-3 text-[#00A651]" /> PRO VIP
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                                FREE TIER
                              </span>
                            )}
                          </td>
                          <td className="p-3.5 font-mono text-slate-700">
                            {isProUser ? (
                              <span className="text-emerald-700 font-bold">Tanpa Batas</span>
                            ) : (
                              <span>
                                {u.dailyCalculatorCount}/{siteSettings.freeDailyCalculatorLimit ?? 3}
                              </span>
                            )}
                          </td>
                          <td className="p-3.5 font-mono font-bold text-emerald-700">
                            {u.disciplineScore}/100
                          </td>
                          <td className="p-3.5 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              {/* 1-Click WhatsApp Chat */}
                              {u.whatsapp && (
                                <a
                                  href={waChatUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 border border-emerald-200 transition-colors"
                                  title="Chat WhatsApp Trader"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </a>
                              )}

                              {/* Toggle VIP / FREE */}
                              {isProUser ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    updateUserTierManually(u.id, 'FREE');
                                    showNotification(`Akun ${u.name} diturunkan ke status FREE.`);
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold border border-slate-200 cursor-pointer transition-colors"
                                  title="Turunkan ke akun Free Tier"
                                >
                                  Set ke FREE
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => {
                                    updateUserTierManually(u.id, 'PRO');
                                    showNotification(`Akun ${u.name} berhasil diaktifkan menjadi VIP PRO!`);
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-[#00A651] hover:bg-[#008F45] text-white text-[10px] font-bold shadow-xs cursor-pointer transition-colors"
                                  title="Upgrade langsung ke VIP PRO"
                                >
                                  Jadikan VIP
                                </button>
                              )}

                              {/* Reset Calculation Quota */}
                              <button
                                type="button"
                                onClick={() => {
                                  resetUserCalculatorCount(u.id);
                                  showNotification(`Kuota kalkulator harian ${u.name} direset ke 0.`);
                                }}
                                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 border border-slate-200 cursor-pointer"
                                title="Reset Kuota Hitung Harian ke 0"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                              </button>

                              {/* Reset / Set Password */}
                              <button
                                type="button"
                                onClick={() => {
                                  setResetModalUser({ id: u.id, name: u.name, email: u.email });
                                  setCustomNewPassword('trader123');
                                }}
                                className="p-1.5 text-slate-400 hover:text-amber-700 rounded-lg hover:bg-amber-50 border border-slate-200 cursor-pointer"
                                title="Reset Kata Sandi Trader Ini"
                              >
                                <KeyRound className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: KONTROL MENU VIP & GRATIS                          */}
      {/* ======================================================== */}
      {activeTab === 'VIP_FREE_MENU' && (
        <form onSubmit={handleSaveMenuSettings} className="space-y-5 animate-in fade-in duration-150 max-w-4xl">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-[#00A651]" />
                  <span>Pengaturan Batasan Menu VIP vs FREE</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tentukan berapa kali user gratis boleh menghitung, harga VIP, dan modul mana yang dikunci khusus VIP.
                </p>
              </div>

              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-extrabold text-xs shadow-md shadow-[#00A651]/20 flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Pengaturan</span>
              </button>
            </div>

            {/* 1. Limit & Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Daily Limit */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-slate-800">
                  Kuota Kalkulator Harian Akun FREE
                </label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  required
                  value={menuForm.freeDailyCalculatorLimit}
                  onChange={(e) => setMenuForm({ ...menuForm, freeDailyCalculatorLimit: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold text-sm focus:border-[#00A651] focus:outline-none"
                />
                <p className="text-[11px] text-slate-500">
                  Maksimal <strong className="text-slate-800">{menuForm.freeDailyCalculatorLimit}x</strong> kalkulasi/hari.
                </p>
              </div>

              {/* VIP Price */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-slate-800">
                  Harga Langganan Bulanan VIP (IDR)
                </label>
                <input
                  type="number"
                  step={10000}
                  required
                  value={menuForm.vipMonthlyPrice}
                  onChange={(e) => setMenuForm({ ...menuForm, vipMonthlyPrice: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold text-sm focus:border-[#00A651] focus:outline-none"
                />
                <p className="text-[11px] text-slate-500">
                  Tampil: <strong className="text-emerald-700 font-mono">Rp {Number(menuForm.vipMonthlyPrice).toLocaleString('id-ID')} / Bulan</strong>
                </p>
              </div>

              {/* Academy Price */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-slate-800">
                  Harga Paket Edukasi Permanen (IDR)
                </label>
                <input
                  type="number"
                  step={5000}
                  required
                  value={menuForm.academyPrice}
                  onChange={(e) => setMenuForm({ ...menuForm, academyPrice: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold text-sm focus:border-[#00A651] focus:outline-none"
                />
                <p className="text-[11px] text-slate-500">
                  Tampil: <strong className="text-emerald-700 font-mono">Rp {Number(menuForm.academyPrice).toLocaleString('id-ID')} (Sekali Bayar)</strong>
                </p>
              </div>
            </div>

            {/* 2. Feature Gating Toggles */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Kunci Hak Akses Modul Fitur (VIP-Only vs Terbuka Gratis)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Bot Assistant */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">Bot Assistant AI &amp; Alert H-30</span>
                    <span className="text-[11px] text-slate-500">
                      {menuForm.botAssistantVipOnly ? '🔒 Khusus Member VIP PRO' : '🔓 Terbuka untuk Akun FREE'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMenuForm({ ...menuForm, botAssistantVipOnly: !menuForm.botAssistantVipOnly })}
                    className="p-1 cursor-pointer"
                  >
                    {menuForm.botAssistantVipOnly ? (
                      <ToggleRight className="w-8 h-8 text-[#00A651]" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-slate-400" />
                    )}
                  </button>
                </div>

                {/* News Sentiment Radar */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">News Sentiment Radar &amp; Scenarios</span>
                    <span className="text-[11px] text-slate-500">
                      {menuForm.newsScenarioVipOnly ? '🔒 Khusus Member VIP PRO' : '🔓 Terbuka untuk Akun FREE'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMenuForm({ ...menuForm, newsScenarioVipOnly: !menuForm.newsScenarioVipOnly })}
                    className="p-1 cursor-pointer"
                  >
                    {menuForm.newsScenarioVipOnly ? (
                      <ToggleRight className="w-8 h-8 text-[#00A651]" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-slate-400" />
                    )}
                  </button>
                </div>

                {/* Margin Resistance Calculator */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">Kalkulator Ketahanan Margin</span>
                    <span className="text-[11px] text-slate-500">
                      {menuForm.marginResistanceVipOnly ? '🔒 Khusus Member VIP PRO' : '🔓 Terbuka untuk Akun FREE'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMenuForm({ ...menuForm, marginResistanceVipOnly: !menuForm.marginResistanceVipOnly })}
                    className="p-1 cursor-pointer"
                  >
                    {menuForm.marginResistanceVipOnly ? (
                      <ToggleRight className="w-8 h-8 text-[#00A651]" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-slate-400" />
                    )}
                  </button>
                </div>

                {/* Compounding Matrix */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">Compounding Growth Matrix</span>
                    <span className="text-[11px] text-slate-500">
                      {menuForm.compoundingVipOnly ? '🔒 Khusus Member VIP PRO' : '🔓 Terbuka untuk Akun FREE'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMenuForm({ ...menuForm, compoundingVipOnly: !menuForm.compoundingVipOnly })}
                    className="p-1 cursor-pointer"
                  >
                    {menuForm.compoundingVipOnly ? (
                      <ToggleRight className="w-8 h-8 text-[#00A651]" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Official QRIS Details */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Informasi Merchant QRIS Resmi RealistisFx
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Merchant QRIS (Tampil di Scan)
                  </label>
                  <input
                    type="text"
                    value={menuForm.qrisMerchantName}
                    onChange={(e) => setMenuForm({ ...menuForm, qrisMerchantName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    NMID / Kode Merchant QRIS
                  </label>
                  <input
                    type="text"
                    value={menuForm.qrisNmid}
                    onChange={(e) => setMenuForm({ ...menuForm, qrisNmid: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-extrabold text-xs shadow-md shadow-[#00A651]/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Seluruh Pengaturan Menu VIP &amp; Gratis</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ======================================================== */}
      {/* TAB 3: KONTROL LANDING PAGE                               */}
      {/* ======================================================== */}
      {activeTab === 'LANDING_PAGE' && (
        <form onSubmit={handleSaveLandingSettings} className="space-y-5 animate-in fade-in duration-150 max-w-4xl">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <ExternalLink className="w-5 h-5 text-sky-600" />
                  <span>Pengaturan Landing Page Publik</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ubah pengumuman banner berjalan, kontak WhatsApp CS admin, dan status pendaftaran VIP publik.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/landing"
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>👁️ Lihat Landing Page</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-extrabold text-xs shadow-md shadow-[#00A651]/20 flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Landing Page</span>
                </button>
              </div>
            </div>

            {/* 1. Running Ticker Announcement */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Banner Ticker Pengumuman di Atas Header
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Teks ini tampil berjalan di bagian paling atas seluruh landing page untuk pengunjung.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setLandingForm({ ...landingForm, isAnnouncementActive: !landingForm.isAnnouncementActive })}
                  className="p-1 cursor-pointer flex items-center gap-2"
                >
                  <span className="text-xs font-bold text-slate-600">
                    {landingForm.isAnnouncementActive ? '🟢 Aktif' : '⚪ Nonaktif'}
                  </span>
                  {landingForm.isAnnouncementActive ? (
                    <ToggleRight className="w-8 h-8 text-[#00A651]" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-slate-400" />
                  )}
                </button>
              </div>

              <div>
                <textarea
                  rows={2}
                  required
                  value={landingForm.landingAnnouncement}
                  onChange={(e) => setLandingForm({ ...landingForm, landingAnnouncement: e.target.value })}
                  placeholder="Ketik pengumuman penting, promo, atau info rilis sinyal..."
                  className="w-full p-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-medium focus:border-[#00A651] focus:outline-none"
                />
              </div>

              {landingForm.isAnnouncementActive && (
                <div className="p-2.5 rounded-xl bg-gradient-to-r from-[#008F45] via-[#00A651] to-[#046132] text-white text-[11px] font-semibold flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
                  <span className="truncate">Pratinjau Langsung: {landingForm.landingAnnouncement}</span>
                </div>
              )}
            </div>

            {/* 2. Official WhatsApp CS Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-slate-800">
                  Nomor WhatsApp CS Resmi Admin (Format: 628...)
                </label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={landingForm.adminWhatsAppNumber}
                    onChange={(e) => setLandingForm({ ...landingForm, adminWhatsAppNumber: e.target.value })}
                    placeholder="6287774229255"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold text-xs focus:border-[#00A651] focus:outline-none"
                  />
                </div>
                <p className="text-[10px] text-slate-500">
                  Semua tombol WhatsApp di Landing Page (Copy-Trade, Tanya CS, Kirim Bukti Transfer) akan otomatis terhubung ke nomor ini.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-slate-800">
                  Status Pembukaan Pendaftaran VIP
                </label>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-300">
                  <div>
                    <span className="text-xs font-extrabold text-slate-900 block">
                      {landingForm.vipRegistrationOpen ? '🟢 Pendaftaran Terbuka' : '🔴 Pendaftaran Ditutup Sementara'}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {landingForm.vipRegistrationOpen
                        ? 'Pengunjung dapat mendaftar dan melakukan upgrade'
                        : 'Tombol pendaftaran akan menampilkan status penuh'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLandingForm({ ...landingForm, vipRegistrationOpen: !landingForm.vipRegistrationOpen })}
                    className="p-1 cursor-pointer"
                  >
                    {landingForm.vipRegistrationOpen ? (
                      <ToggleRight className="w-8 h-8 text-[#00A651]" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Pre-filled WhatsApp CTA Template */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                Pesan Default Tombol WhatsApp &quot;Mulai Copy-Trade&quot;
              </label>
              <textarea
                rows={2}
                value={landingForm.copyTradeWaMessage}
                onChange={(e) => setLandingForm({ ...landingForm, copyTradeWaMessage: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-medium focus:border-[#00A651] focus:outline-none"
              />
              <p className="text-[10px] text-slate-500">
                Pesan otomatis yang langsung terisi di aplikasi WhatsApp calon member saat mengklik tombol Copy-Trade.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-extrabold text-xs shadow-md shadow-[#00A651]/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan Landing Page &amp; Terapkan Langsung</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ======================================================== */}
      {/* TAB 4: VERIFIKASI PEMBAYARAN QRIS                         */}
      {/* ======================================================== */}
      {activeTab === 'REQUESTS' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">
              Daftar Permohonan Langganan PRO via QRIS
            </h2>
            <span className="text-xs text-slate-500">
              Total {subscriptionRequests.length} Transaksi Tercatat
            </span>
          </div>

          {subscriptionRequests.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center text-slate-500 text-xs border border-slate-200">
              Belum ada permohonan pembayaran yang masuk.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {subscriptionRequests.map((req) => {
                const isPending = req.status === 'PENDING';
                const isApproved = req.status === 'APPROVED';

                // WhatsApp confirmation message to user
                const confirmWaMsg = encodeURIComponent(
                  `Halo ${req.userName}! 👋\n` +
                    `Pembayaran QRIS langganan ${req.planName} (Rp ${req.amount.toLocaleString('id-ID')}) telah diverifikasi oleh Admin RealistisFx Edukasi.\n\n` +
                    `✅ Akun Anda sekarang telah AKTIF sebagai MEMBER PRO (30 Hari)!\n` +
                    `Silakan login kembali atau refresh web di https://realistisfxedukasi.vercel.app untuk mengakses seluruh fitur premium (Kalkulator Emas XAUUSD, Bot Alert H-30, Analisis Anti-MC, dan Jurnal Unlimited).\n\n` +
                    `Selamat trading dengan SOP disiplin!`
                );
                const userWaUrl = `https://wa.me/${req.userPhone.replace(/^0/, '62')}?text=${confirmWaMsg}`;

                return (
                  <div
                    key={req.id}
                    className={`rounded-2xl p-5 border transition-all ${
                      isPending
                        ? 'border-amber-300 bg-amber-50/50 shadow-xs'
                        : isApproved
                        ? 'border-slate-200 bg-white shadow-xs'
                        : 'border-slate-200 bg-slate-50 opacity-70'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Left: Trader & Order Info */}
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-extrabold text-sm text-slate-900">
                            {req.userName}
                          </span>
                          <span className="text-xs font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                            ID: {req.userId}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                              isPending
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : isApproved
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : 'bg-rose-100 text-rose-800 border border-rose-200'
                            }`}
                          >
                            {req.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-700">
                          <div>
                            <span className="text-[10px] text-slate-500 block">Paket:</span>
                            <span className="font-bold text-emerald-700">{req.planName}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 block">Nominal:</span>
                            <span className="font-mono font-bold text-slate-900">
                              Rp {req.amount.toLocaleString('id-ID')}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 block">No. WhatsApp:</span>
                            <span className="font-mono text-slate-800">{req.userPhone}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 block">Waktu Bayar:</span>
                            <span className="font-mono text-slate-500 text-[11px]">{req.createdAt}</span>
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-500">
                          Email: <span className="text-slate-800">{req.userEmail}</span> | Catatan: <span className="text-slate-800">{req.notes || '-'}</span>
                        </p>
                      </div>

                      {/* Right: Proof & Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
                        {/* View Proof Button */}
                        {req.proofScreenshot && (
                          <button
                            type="button"
                            onClick={() => setSelectedProofImg(req.proofScreenshot || null)}
                            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 border border-slate-200 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-blue-600" />
                            <span>Lihat Bukti Transfer</span>
                          </button>
                        )}

                        {/* WhatsApp User Button */}
                        <a
                          href={userWaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                          title="Kirim pesan konfirmasi langsung ke WA user"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Chat WA User</span>
                        </a>

                        {isPending && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleApprove(req.id, req.userName)}
                              className="px-4 py-2 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs shadow-xs active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Setujui &amp; Jadikan PRO</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleReject(req.id, req.userName)}
                              className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Tolak</span>
                            </button>
                          </>
                        )}

                        {isApproved && (
                          <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Akun PRO Aktif
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Proof Image Viewer Modal */}
      {selectedProofImg && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 max-w-md w-full relative space-y-3 shadow-2xl">
            <button
              onClick={() => setSelectedProofImg(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Pratinjau Bukti Pembayaran QRIS
            </h3>
            <div className="rounded-xl overflow-hidden border border-slate-200 max-h-80 flex items-center justify-center bg-slate-50">
              <img
                src={selectedProofImg}
                alt="Bukti Transfer"
                className="object-contain max-h-80 w-full"
              />
            </div>
            <button
              onClick={() => setSelectedProofImg(null)}
              className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
            >
              Tutup Pratinjau
            </button>
          </div>
        </div>
      )}

      {/* Admin Reset User Password Modal */}
      {resetModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">Ubah Password Trader</h3>
                  <p className="text-[10px] text-slate-500 font-mono truncate max-w-[190px]">{resetModalUser.email}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setResetModalUser(null);
                  setCustomNewPassword('');
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAdminResetPassword} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kata Sandi Baru untuk {resetModalUser.name}
                </label>
                <input
                  type="text"
                  required
                  value={customNewPassword}
                  onChange={(e) => setCustomNewPassword(e.target.value)}
                  placeholder="Ketik password baru (min 6 karakter)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:border-[#00A651] outline-hidden bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCustomNewPassword(`rf${Math.floor(100000 + Math.random() * 900000)}`)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[10px] font-bold text-slate-700 border border-slate-200 cursor-pointer"
                >
                  ⚡ Buat Password Acak
                </button>
                <span className="text-[10px] text-slate-400">Minimal 6 karakter</span>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  disabled={isResettingPw}
                  className="flex-1 py-2.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {isResettingPw ? 'Menyimpan...' : 'Simpan Password Baru'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setResetModalUser(null);
                    setCustomNewPassword('');
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs cursor-pointer hover:bg-slate-200"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
