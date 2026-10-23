'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  Calculator,
  Radar,
  BookOpenCheck,
  TrendingUp,
  LineChart,
  AlertTriangle,
  GraduationCap,
  Bot,
  Crown,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Lock,
  ChevronRight,
  TrendingDown,
  Info,
  Sliders,
  Check,
  User,
  KeyRound,
  ShieldCheck,
  Smartphone,
  Mail,
  Server,
  Activity,
  MessageCircle,
  Copy,
  X,
  CreditCard,
  Zap,
} from 'lucide-react';
import { useUser } from '@/context/UserContext';

export default function DashboardOverviewPage() {
  const { user, journals, openPaymentModal, updateUserPasswordLocal, siteSettings } = useUser();
  const isPro = user.tier === 'PRO';

  // Dynamic statistics from user's real journals
  const totalTrades = journals.length;
  const winningTrades = journals.filter((j) => j.pnl > 0).length;
  const losingTrades = journals.filter((j) => j.pnl < 0).length;
  const winRate = totalTrades > 0 ? Number(((winningTrades / totalTrades) * 100).toFixed(1)) : 0;
  const disciplinedTrades = journals.filter((j) => j.adheredToPlan && j.emotion !== 'REVENGE_TRADING').length;
  const disciplineScore = totalTrades > 0 ? Math.round((disciplinedTrades / totalTrades) * 100) : 0;
  const totalPnL = journals.reduce((acc, curr) => acc + curr.pnl, 0);
  const winPct = totalTrades > 0 ? Math.round((winningTrades / totalTrades) * 100) : 0;
  const lossPct = totalTrades > 0 ? Math.round((losingTrades / totalTrades) * 100) : 0;

  // Password Change Modal State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwSuccessMsg, setPwSuccessMsg] = useState('');
  const [pwErrorMsg, setPwErrorMsg] = useState('');
  const [copiedId, setCopiedId] = useState(false);

  // Anti-FOMO Checklist state on Dashboard Overview
  const [sopChecks, setSopChecks] = useState({
    newsChecked: true,
    srIdentified: true,
    lotCalculated: false,
    rrValid: false,
    mindsetCalm: true,
  });

  const toggleSop = (key: keyof typeof sopChecks) => {
    setSopChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const completedChecksCount = Object.values(sopChecks).filter(Boolean).length;
  const isSopReady = completedChecksCount === 5;

  const handleCopyAccountId = () => {
    navigator.clipboard.writeText(user.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPwErrorMsg('');
    setPwSuccessMsg('');

    if (newPassword.length < 6) {
      setPwErrorMsg('Kata sandi baru minimal 6 karakter.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwErrorMsg('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    updateUserPasswordLocal(user.email, newPassword);
    setPwSuccessMsg('✅ Kata sandi berhasil diperbarui!');
    setTimeout(() => {
      setShowPasswordModal(false);
      setNewPassword('');
      setConfirmPassword('');
      setPwSuccessMsg('');
    }, 1500);
  };

  const coreFeatures = [
    {
      title: 'Risk & Lot Calculator',
      description: 'Hitung lot aman otomatis berdasarkan toleransi risiko 1-2% modal dan jarak SL pips.',
      href: '/calculator',
      icon: Calculator,
      freeStatus: `Standar (Max ${siteSettings?.freeDailyCalculatorLimit ?? 3}x/hari)`,
      proStatus: 'Unlimited + Akun Cent (IDRC) + XAUUSD',
      isProFeature: false,
      badge: 'Core SOP',
      badgeColor: 'green',
    },
    {
      title: 'News Sentiment Radar',
      description: 'Pantau kalender ekonomi & prediksi skenario 2 arah berita High-Impact.',
      href: '/news-radar',
      icon: Radar,
      freeStatus: 'Kalender Standar',
      proStatus: 'Skenario 2 Arah (Bullish/Bearish) NFP & CPI',
      isProFeature: false,
      badge: 'High Impact',
      badgeColor: 'blue',
    },
    {
      title: 'Smart Trading Journal',
      description: 'Catat trade, evaluasi emosi psikologis (FOMO/Disiplin), dan pantau Win Rate.',
      href: '/journal',
      icon: BookOpenCheck,
      freeStatus: 'Max 10 input/bulan',
      proStatus: 'Unlimited + AI Analitik Emosi',
      isProFeature: false,
      badge: 'AI Review',
      badgeColor: 'amber',
    },
    {
      title: 'Bot Assistant (Telegram)',
      description: 'Notifikasi otomatis H-30 menit sebelum rilis berita berdampak tinggi via Telegram webhook.',
      href: '/bot-assistant',
      icon: Bot,
      freeStatus: 'Terkunci',
      proStatus: 'Aktif Notifikasi H-30 Menit',
      isProFeature: true,
      badge: 'PRO Webhook',
      badgeColor: 'blue',
    },
    {
      title: 'Anti-FOMO Checklist',
      description: 'Validasi SOP trading sebelum entry. Mode ketat mengunci kalkulator jika belum diverifikasi.',
      href: '/checklist',
      icon: ShieldAlert,
      freeStatus: 'Mode Standar',
      proStatus: 'Mode Ketat (Strict Lock)',
      isProFeature: false,
      badge: 'Disiplin',
      badgeColor: 'green',
    },
    {
      title: 'Recovery & Compounding',
      description: 'Hitung target pemulihan drawdown dan proyeksi bunga berbunga modal yang terhubung jurnal.',
      href: '/compounding',
      icon: TrendingUp,
      freeStatus: 'Terkunci',
      proStatus: 'Akses Penuh + Target Planner',
      isProFeature: true,
      badge: 'PRO Planner',
      badgeColor: 'blue',
    },
    {
      title: 'Daily Watchlist (S&R)',
      description: 'Peta level kunci Support, Resistance, serta Buy & Sell zone harian terupdate.',
      href: '/watchlist',
      icon: LineChart,
      freeStatus: '1 Pair Acak',
      proStatus: 'XAUUSD, EURUSD, GBPUSD Lengkap',
      isProFeature: false,
      badge: 'Live Map',
      badgeColor: 'blue',
    },
    {
      title: 'Margin Resistance Calculator',
      description: 'Hitung di harga persis berapa akun Anda akan terkena Margin Call (MC) untuk tindakan mitigasi.',
      href: '/margin-resistance',
      icon: AlertTriangle,
      freeStatus: 'Terkunci',
      proStatus: 'Simulasi Titik MC Realtime',
      isProFeature: true,
      badge: 'Anti-MC',
      badgeColor: 'amber',
    },
    {
      title: 'Gamified Academy',
      description: 'Kurikulum trading realistis langkah demi langkah untuk membangun mental trader profesional.',
      href: '/academy',
      icon: GraduationCap,
      freeStatus: 'Modul Level 1',
      proStatus: 'Semua Modul Lvl 1-5 + Sertifikat',
      isProFeature: false,
      badge: 'Academy',
      badgeColor: 'green',
    },
    {
      title: 'Discipline Score AI',
      description: 'Evaluasi skor psikologis 1-100 secara otomatis dari histori jurnal & nasihat AI objektif.',
      href: '/journal#discipline',
      icon: Sparkles,
      freeStatus: 'Skor Dasar',
      proStatus: 'Evaluasi Detail & Rekomendasi AI',
      isProFeature: false,
      badge: 'AI Engine',
      badgeColor: 'green',
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      {/* ======================================================== */}
      {/* 1. DEDICATED TRADING ACCOUNT PROFILE TERMINAL (NEW)       */}
      {/* ======================================================== */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Profile Card Terminal Top Header */}
        <div className="px-4 sm:px-6 py-3.5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00A651] animate-pulse ring-4 ring-[#00A651]/20" />
            <span className="font-mono text-xs font-bold tracking-wider uppercase text-slate-200">
              Terminal Trading Profile &amp; Account Status
            </span>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="text-[11px] text-slate-400 hidden sm:inline font-mono">
              Server: RealistisFx Gateway MT5
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-emerald-300 border border-white/10">
              Low Latency 14ms
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              SOP Realistis
            </span>
          </div>
        </div>

        {/* Profile Card Body: 3 Responsive Columns */}
        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {/* Column 1: Trader Identity & License */}
          <div className="space-y-3 pt-2 md:pt-0">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00A651] to-emerald-800 text-white flex items-center justify-center font-black text-base shadow-md shadow-[#00A651]/20 flex-shrink-0">
                {user.name ? user.name.slice(0, 2).toUpperCase() : 'TR'}
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight truncate">
                    {user.name}
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {user.id}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyAccountId}
                    className="p-1 text-slate-400 hover:text-slate-700 rounded cursor-pointer"
                    title="Salin ID Akun"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5 text-[#00A651]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 pt-1">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span className="font-mono">{user.whatsapp || '-'}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 flex-wrap">
              {isPro ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs">
                  <Crown className="w-3.5 h-3.5 text-[#00A651]" />
                  <span>VIP PRO ACTIVE</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  <Zap className="w-3.5 h-3.5 text-blue-600" />
                  <span>FREE TIER</span>
                </span>
              )}

              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                Akun: {user.accountType}
              </span>
            </div>
          </div>

          {/* Column 2: Account Specifications & Limits */}
          <div className="space-y-2.5 pt-4 md:pt-0 md:pl-6 text-xs text-slate-700">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              Spesifikasi Akun &amp; Batasan SOP
            </span>

            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Tipe Akun</span>
                <span className="font-bold text-slate-900 mt-0.5 block">{user.accountType} (USD/IDRC)</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Masa Aktif Lisensi</span>
                <span className="font-bold text-[#00A651] mt-0.5 block">
                  {isPro ? user.proExpiryDate || '30 Hari Aktif' : 'Permanen Free'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Leverage Maks</span>
                <span className="font-bold text-slate-900 mt-0.5 block font-mono">1:500 (Dinamis)</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Kuota Kalkulator</span>
                <span className="font-bold text-slate-900 mt-0.5 block font-mono">
                  {isPro ? 'Unlimited' : `${user.dailyCalculatorCount}/${siteSettings?.freeDailyCalculatorLimit ?? 3} Hari Ini`}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50/70 border border-emerald-200 text-[11px] text-emerald-900">
              <span className="flex items-center gap-1.5 font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#00A651]" />
                Strict Mode SOP:
              </span>
              <span className="font-bold text-[#00A651]">Aktif (Proteksi Over-Risk)</span>
            </div>
          </div>

          {/* Column 3: Live Performance Metrics & Quick Action Buttons */}
          <div className="space-y-3 pt-4 md:pt-0 md:pl-6">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              Ringkasan Performa Trader
            </span>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Skor Disiplin AI</span>
                <span className="text-base font-black font-mono text-[#00A651]">{disciplineScore}/100</span>
              </div>

              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Win Rate Jurnal</span>
                <span className="text-base font-black font-mono text-slate-900">{winRate}%</span>
              </div>
            </div>

            {/* Quick Action Profile Buttons */}
            <div className="space-y-1.5 pt-1">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(true)}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-200 transition-colors cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5 text-slate-500" />
                  <span>Ganti Password</span>
                </button>

                <a
                  href={`https://wa.me/${siteSettings?.adminWhatsAppNumber || '6287774229255'}?text=${encodeURIComponent(
                    `Halo Admin RealistisFx, saya ${user.name} (ID: ${user.id}). Saya ingin konsultasi seputar akun saya.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#00A651] text-xs font-bold flex items-center justify-center gap-1.5 border border-emerald-200 transition-colors cursor-pointer"
                  title="Hubungi Admin / CS via WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>CS WA</span>
                </a>
              </div>

              {!isPro && (
                <button
                  type="button"
                  onClick={openPaymentModal}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white text-xs font-extrabold shadow-md shadow-[#00A651]/20 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                >
                  <Crown className="w-3.5 h-3.5" />
                  <span>Upgrade VIP PRO (Rp 500.000 / Bln)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. TOP COMMITMENT & MOTIVATION BANNER                     */}
      {/* ======================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 p-4 sm:p-6 md:p-8 shadow-xs border-l-4 border-l-[#00A651]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-[#00A651] border border-emerald-200">
                SOP Realistis FX
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Prinsip #1 Retail Trader Indonesia
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Selamat Datang, {user.name}!{' '}
              <span className="text-[#00A651]">Lindungi Modal, Disiplin Trading.</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Trading realistis bukan tentang cepat kaya semalam, melainkan menjaga{' '}
              <strong className="text-slate-900 font-semibold">Risk Management</strong>, konsistensi
              lot, dan menjauh dari jebakan emosi FOMO. Gunakan alat di bawah untuk memvalidasi
              setiap keputusan pasar Anda.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0">
            <Link
              href="/calculator"
              className="w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs shadow-md shadow-[#00A651]/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 cursor-pointer text-center"
            >
              <Calculator className="w-4 h-4" />
              <span>Hitung Lot Aman Sekarang</span>
            </Link>

            {!isPro && (
              <button
                onClick={openPaymentModal}
                className="w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-300 transition-all flex items-center gap-2 cursor-pointer text-center"
              >
                <Crown className="w-4 h-4 text-amber-500" />
                <span>Upgrade VIP (Rp500k/bln)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. 4 KEY REAL-TIME METRICS CARDS                          */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Skor Disiplin AI */}
        <div className="rounded-2xl p-5 bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Skor Disiplin AI</span>
            <span className="p-2 rounded-xl bg-emerald-50 text-[#00A651] border border-emerald-100">
              <ShieldAlert className="w-4 h-4" />
            </span>
          </div>

          {totalTrades === 0 ? (
            <>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono text-slate-400">0</span>
                <span className="text-xs text-slate-400">/ 100</span>
                <span className="ml-auto text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                  Belum Ada Data
                </span>
              </div>
              <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-slate-300 rounded-full" style={{ width: '0%' }} />
              </div>
              <p className="mt-2.5 text-[11px] text-slate-500">
                Catat trading di Smart Journal untuk kalkulasi skor AI.
              </p>
            </>
          ) : (
            <>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono text-slate-900">
                  {disciplineScore}
                </span>
                <span className="text-xs text-slate-500">/ 100</span>
                <span
                  className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-md ${
                    disciplineScore >= 80
                      ? 'text-[#00A651] bg-emerald-50 border border-emerald-200'
                      : disciplineScore >= 50
                      ? 'text-amber-800 bg-amber-50 border border-amber-200'
                      : 'text-rose-800 bg-rose-50 border border-rose-200'
                  }`}
                >
                  {disciplineScore >= 80
                    ? 'Sangat Disiplin'
                    : disciplineScore >= 50
                    ? 'Cukup Disiplin'
                    : 'Perlu Evaluasi'}
                </span>
              </div>
              <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    disciplineScore >= 80
                      ? 'bg-[#00A651]'
                      : disciplineScore >= 50
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${disciplineScore}%` }}
                />
              </div>
              <p className="mt-2.5 text-[11px] text-slate-600">
                <strong className="text-slate-900">{disciplinedTrades}</strong> dari {totalTrades} posisi disiplin mematuhi SOP.
              </p>
            </>
          )}
        </div>

        {/* Metric 2: Win Rate Jurnal */}
        <div className="rounded-2xl p-5 bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Win Rate Jurnal</span>
            <span className="p-2 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>

          {totalTrades === 0 ? (
            <>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono text-slate-400">0%</span>
                <span className="ml-auto text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                  0 Posisi
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                <span>0 Menang (0%)</span>
                <span>0 Kalah (0%)</span>
              </div>
              <p className="mt-2.5 text-[11px] text-slate-500">
                Belum ada transaksi selesai yang dicatat.
              </p>
            </>
          ) : (
            <>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono text-slate-900">{winRate}%</span>
                <span className="ml-auto text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                  {totalTrades} Posisi
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px]">
                <span className="text-[#00A651] font-semibold">{winningTrades} Menang ({winPct}%)</span>
                <span className="text-rose-600 font-semibold">{losingTrades} Kalah ({lossPct}%)</span>
              </div>
              <p className="mt-2.5 text-[11px] text-slate-600">
                Net PnL:{' '}
                <span
                  className={
                    totalPnL >= 0 ? 'text-[#00A651] font-bold' : 'text-rose-600 font-bold'
                  }
                >
                  {totalPnL >= 0 ? `+ $${totalPnL.toFixed(2)}` : `- $${Math.abs(totalPnL).toFixed(2)}`}
                </span>
              </p>
            </>
          )}
        </div>

        {/* Metric 3: Ketahanan Margin */}
        <div className="rounded-2xl p-5 bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Ketahanan Margin</span>
            <span className="p-2 rounded-xl bg-emerald-50 text-[#00A651] border border-emerald-100">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>

          {totalTrades === 0 ? (
            <>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold font-mono text-slate-700">STANDBY</span>
                <span className="ml-auto text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                  Belum Dihitung
                </span>
              </div>
              <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-slate-300 rounded-full" style={{ width: '0%' }} />
              </div>
              <p className="mt-2.5 text-[11px] text-slate-500">
                Uji margin modal di menu Margin Resistance.
              </p>
            </>
          ) : (
            <>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono text-[#00A651]">AMAN</span>
                <span className="ml-auto text-xs font-bold text-[#00A651] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Anti Over-lot
                </span>
              </div>
              <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-[#00A651] rounded-full" style={{ width: '92%' }} />
              </div>
              <p className="mt-2.5 text-[11px] text-slate-600">
                Disiplin risiko terjaga berdasarkan histori entry lot.
              </p>
            </>
          )}
        </div>

        {/* Metric 4: Status Lisensi & Kuota */}
        <div className="rounded-2xl p-5 bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Status Lisensi</span>
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
              <Crown className="w-4 h-4" />
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">
              {isPro ? 'PRO VIP' : 'FREE TIER'}
            </span>
            <span
              className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-md ${
                isPro
                  ? 'text-[#00A651] bg-emerald-50 border border-emerald-200'
                  : 'text-amber-800 bg-amber-50 border border-amber-200'
              }`}
            >
              {isPro ? 'Rp500k/bln' : 'Gratis'}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-600">
            <span>Kuota Lot Harian</span>
            <span className="text-slate-900 font-bold">
              {isPro ? 'Tanpa Batas' : `${user.dailyCalculatorCount}/${siteSettings?.freeDailyCalculatorLimit ?? 3} Terpakai`}
            </span>
          </div>

          <p className="mt-2.5 text-[11px] text-slate-500">
            {isPro ? 'Semua modul & webhook bot aktif' : 'Tersisa kuota perhitungan hari ini'}
          </p>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. MIDDLE GRID: NEWS RADAR & ANTI-FOMO CHECKLIST          */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* News Sentiment Radar Preview Widget (2 Columns) */}
        <div className="lg:col-span-2 rounded-3xl p-4 sm:p-6 bg-white border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-[#00A651] border border-emerald-100">
                <Radar className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  News Sentiment Radar (High-Impact)
                </h2>
                <p className="text-xs text-slate-500">
                  Peringatan rilis data ekonomi berdampak tinggi &amp; skenario 2 arah
                </p>
              </div>
            </div>
            <Link
              href="/news-radar"
              className="text-xs text-[#00A651] hover:text-[#008F45] font-bold flex items-center gap-1"
            >
              Buka Radar Lengkap <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Featured Upcoming News Alert */}
          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" />
                  HIGH IMPACT 🔥🔥🔥
                </span>
                <span className="text-xs font-bold text-slate-900">
                  USD Non-Farm Payrolls (NFP)
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                H-2 Jam 45 Menit (19:30 WIB)
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              Perkiraan: <strong>175K</strong> | Sebelumnya: <strong>142K</strong>. Berpotensi memicu
              volatilitas tajam pada pair <strong>XAUUSD</strong> &amp; mayor pair USD.
            </p>

            {/* Pro 2-Way Prediction Scenario Box */}
            <div className="mt-3 pt-3 border-t border-rose-200/60">
              {isPro ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-emerald-50/90 border border-emerald-200 text-slate-800">
                    <span className="font-bold text-[#00A651] flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5" /> Skenario Bullish Gold (XAUUSD):
                    </span>
                    <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                      Jika NFP &lt; 150K dan Unemployment Rate naik &gt; 4.2%, ekspektasi rate cut memicu rally ke 2,710.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-50/90 border border-rose-200 text-slate-800">
                    <span className="font-bold text-rose-600 flex items-center gap-1.5">
                      <TrendingDown className="w-3.5 h-3.5" /> Skenario Bearish Gold (XAUUSD):
                    </span>
                    <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                      Jika NFP &gt; 200K, DXY menguat tajam, peluang sell rejection di supply zone 2,695 target 2,660.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-white border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-600 shrink-0" />
                    <p className="text-xs text-slate-700">
                      <span className="font-bold text-slate-900">Skenario Prediksi 2 Arah (Bullish/Bearish)</span> terbuka khusus untuk member PRO VIP.
                    </p>
                  </div>
                  <button
                    onClick={openPaymentModal}
                    className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs shrink-0 cursor-pointer shadow-xs text-center"
                  >
                    Buka PRO via QRIS
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Secondary News Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-700 uppercase">Medium Impact</span>
                <p className="text-xs font-semibold text-slate-900">EUR ECB President Speech</p>
                <p className="text-[11px] text-slate-500 font-mono">21:00 WIB</p>
              </div>
              <span className="text-xs font-bold text-slate-600 px-2 py-0.5 rounded bg-white border border-slate-200">
                EURUSD
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-sky-700 uppercase">Telegram Alert</span>
                <p className="text-xs font-semibold text-slate-900">Bot Notifikasi H-30 Menit</p>
                <p className="text-[11px] text-[#00A651] font-bold">
                  {user.telegramLinked ? 'Terhubung (Aktif)' : 'Belum Tersambung'}
                </p>
              </div>
              <Link
                href="/bot-assistant"
                className="p-2 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 transition-colors"
                title="Atur Bot Telegram"
              >
                <Bot className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Anti-FOMO Daily Checklist Widget (1 Column) */}
        <div className="rounded-3xl p-4 sm:p-6 bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-[#00A651]" />
                <h2 className="text-sm font-bold text-slate-900">Anti-FOMO SOP Checklist</h2>
              </div>
              <span
                className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                  isSopReady
                    ? 'bg-emerald-50 text-[#00A651] border border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                {completedChecksCount}/5 Valid
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Verifikasi checklist ini sebelum membuka posisi apapun di MetaTrader untuk mencegah entry impulsif:
            </p>

            <div className="space-y-2">
              {[
                { key: 'newsChecked' as const, label: 'Cek Kalender High Impact (NFP/CPI)' },
                { key: 'srIdentified' as const, label: 'Konfirmasi Level S&R Timeframe H1/H4' },
                { key: 'lotCalculated' as const, label: 'Hitung Lot Aman (Maks 1-2% Risiko)' },
                { key: 'rrValid' as const, label: 'Risk to Reward Minimal 1:2 Valid' },
                { key: 'mindsetCalm' as const, label: 'Emosi Tenang, Bebas Revenge Trading' },
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-200"
                >
                  <input
                    type="checkbox"
                    checked={sopChecks[item.key]}
                    onChange={() => toggleSop(item.key)}
                    className="mt-0.5 w-4 h-4 rounded text-[#00A651] bg-white border-slate-300 focus:ring-[#00A651] cursor-pointer"
                  />
                  <span
                    className={`text-xs ${
                      sopChecks[item.key]
                        ? 'line-through text-slate-400'
                        : 'text-slate-700 font-medium'
                    }`}
                  >
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            {isSopReady ? (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[#00A651] text-xs font-bold text-center flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> SOP Terpenuhi! Disiplin Terjaga.
              </div>
            ) : (
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold text-center flex items-center justify-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> Tuntaskan 5 syarat sebelum entry!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. 10 CORE FEATURES HUB GRID                             */}
      {/* ======================================================== */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              10 Fitur Unggulan RealistisFx Edukasi
            </h2>
            <p className="text-xs text-slate-500">
              Alat bantu komprehensif dari kalkulasi risiko, peta S&amp;R, hingga evaluasi psikologis trading
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 self-start sm:self-auto">
            Freemium (Free &amp; PRO VIP Rp500.000/bln)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coreFeatures.map((feat) => {
            const Icon = feat.icon;
            const isLocked = feat.isProFeature && !isPro;

            return (
              <div
                key={feat.title}
                className="rounded-2xl p-5 bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-[#00A651] border border-emerald-100 group-hover:bg-[#00A651] group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        feat.badgeColor === 'green'
                          ? 'bg-emerald-50 text-[#00A651] border border-emerald-200'
                          : feat.badgeColor === 'amber'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-sky-50 text-sky-800 border border-sky-200'
                      }`}
                    >
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#00A651] transition-colors flex items-center gap-1.5">
                    {feat.title}
                    {isLocked && <Lock className="w-3.5 h-3.5 text-amber-500" />}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5">
                  <div className="text-[11px] space-y-1">
                    <div className="flex justify-between text-slate-500">
                      <span>Free:</span>
                      <span className="text-slate-700 font-medium truncate ml-2">
                        {feat.freeStatus}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#00A651] font-semibold">
                      <span>Pro:</span>
                      <span className="truncate ml-2">{feat.proStatus}</span>
                    </div>
                  </div>

                  <Link
                    href={feat.href}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      isLocked
                        ? 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                        : 'bg-slate-50 hover:bg-[#00A651] text-slate-800 hover:text-white border border-slate-200 hover:border-[#00A651]'
                    }`}
                  >
                    {isLocked ? (
                      <>
                        <Lock className="w-3.5 h-3.5" /> Buka dengan PRO
                      </>
                    ) : (
                      <>
                        Gunakan Fitur <ArrowUpRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 6. RECENT TRADING JOURNAL ENTRIES                         */}
      {/* ======================================================== */}
      <div className="rounded-3xl p-4 sm:p-6 bg-white border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Catatan Jurnal Trading Terakhir</h2>
            <p className="text-xs text-slate-500">Evaluasi transaksi dan kepatuhan rencana SOP</p>
          </div>
          <Link
            href="/journal"
            className="text-xs text-[#00A651] hover:text-[#008F45] font-bold flex items-center gap-1"
          >
            Lihat Semua Jurnal <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {journals.length === 0 ? (
          <div className="p-6 sm:p-8 text-center rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00A651] border border-emerald-200 flex items-center justify-center mx-auto">
              <BookOpenCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900">Belum Ada Catatan Jurnal Trading</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Akun Anda masih baru dan belum memiliki riwayat transaksi. Disiplin trading dibangun dengan mencatat setiap entry, target TP, dan batas risiko SL.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/journal"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs shadow-md shadow-[#00A651]/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <span>Catat Transaksi Pertama di Jurnal</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto w-full rounded-2xl border border-slate-200">
            <table className="min-w-[650px] w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 bg-slate-50">
                  <th className="p-3 font-semibold">Tanggal</th>
                  <th className="p-3 font-semibold">Pair</th>
                  <th className="p-3 font-semibold">Arah</th>
                  <th className="p-3 font-semibold">Lot</th>
                  <th className="p-3 font-semibold">Harga Masuk</th>
                  <th className="p-3 font-semibold">Hasil PnL</th>
                  <th className="p-3 font-semibold">Emosi Trader</th>
                  <th className="p-3 font-semibold">SOP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {journals.slice(0, 5).map((j) => (
                  <tr key={j.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3 font-mono text-slate-600">{j.date}</td>
                    <td className="p-3 font-bold text-slate-900">{j.pair}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded font-bold ${
                          j.direction === 'BUY'
                            ? 'bg-emerald-50 text-[#00A651] border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {j.direction}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-800">{j.lot}</td>
                    <td className="p-3 font-mono text-slate-600">
                      {j.entryPrice} → {j.exitPrice}
                    </td>
                    <td className="p-3 font-mono font-bold">
                      <span className={j.pnl >= 0 ? 'text-[#00A651]' : 'text-rose-600'}>
                        {j.pnl >= 0 ? `+ $${j.pnl.toFixed(2)}` : `- $${Math.abs(j.pnl).toFixed(2)}`}
                      </span>
                    </td>
                    <td className="p-3 text-slate-700">
                      {j.emotion === 'DISCIPLINED'
                        ? '🎯 Disiplin'
                        : j.emotion === 'CALM_CONFIDENT'
                        ? '🧘 Tenang'
                        : j.emotion === 'FOMO'
                        ? '⚡ FOMO'
                        : j.emotion === 'ANXIOUS_GREEDY'
                        ? '😬 Cemas'
                        : '😡 Balas Dendam'}
                    </td>
                    <td className="p-3">
                      {j.adheredToPlan ? (
                        <span className="text-[#00A651] flex items-center gap-1 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Patuh
                        </span>
                      ) : (
                        <span className="text-amber-700 flex items-center gap-1 font-bold">
                          Melanggar
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* MODAL: UBAH KATA SANDI TRADER                            */}
      {/* ======================================================== */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-50 text-[#00A651] border border-emerald-200">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">Ubah Kata Sandi Akun</h3>
                  <p className="text-[10px] text-slate-500 font-mono truncate">{user.email}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowPasswordModal(false);
                  setNewPassword('');
                  setConfirmPassword('');
                  setPwErrorMsg('');
                  setPwSuccessMsg('');
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {pwErrorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {pwErrorMsg}
              </div>
            )}

            {pwSuccessMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[#00A651] text-xs font-bold">
                {pwSuccessMsg}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kata Sandi Baru (Min. 6 Karakter)
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Ketik kata sandi baru"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#00A651] outline-hidden bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Konfirmasi Kata Sandi Baru
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi kata sandi baru"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#00A651] outline-hidden bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs shadow-xs cursor-pointer active:scale-95 transition-all"
                >
                  Simpan Kata Sandi
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setNewPassword('');
                    setConfirmPassword('');
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
