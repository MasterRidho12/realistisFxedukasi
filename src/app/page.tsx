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
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Lock,
  ChevronRight,
  TrendingDown,
  Info,
  Check,
  User,
  KeyRound,
  ShieldCheck,
  Smartphone,
  Mail,
  Activity,
  MessageCircle,
  Copy,
  X,
  CreditCard,
  Zap,
  PlayCircle,
  BookOpen,
  Award,
  HelpCircle,
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

  // 8 Quick Access Grid ala Traders Family (Image 2)
  const quickAccessMenus = [
    {
      title: 'Profil',
      href: '#profile',
      icon: User,
      description: 'Detail Akun Trader',
    },
    {
      title: 'Edukasi Video',
      href: '/academy',
      icon: PlayCircle,
      description: 'Kurikulum Lvl 0 - 5',
    },
    {
      title: 'Analisa Market',
      href: '/watchlist',
      icon: LineChart,
      description: 'Peta S&R Harian',
    },
    {
      title: 'Kalkulator Lot',
      href: '/calculator',
      icon: Calculator,
      description: 'SOP Risiko 1%',
    },
    {
      title: 'News & Event',
      href: '/news-radar',
      icon: Radar,
      description: 'Kalender NFP & CPI',
    },
    {
      title: 'Jurnal Trading',
      href: '/journal',
      icon: BookOpenCheck,
      description: 'Evaluasi & Win Rate',
    },
    {
      title: 'Checklist SOP',
      href: '/checklist',
      icon: ShieldAlert,
      description: 'Validasi Anti-FOMO',
    },
    {
      title: 'Bantuan CS',
      href: `https://wa.me/${siteSettings?.adminWhatsAppNumber || '6287774229255'}?text=${encodeURIComponent(
        `Halo Admin RealistisFx, saya ${user.name} (ID: ${user.id}). Saya ingin konsultasi materi edukasi bisnis forex.`
      )}`,
      icon: MessageCircle,
      description: 'Tanya Jawab WhatsApp',
      isExternal: true,
    },
  ];

  // 6 Structured Education Modules for Mindset & Business
  const educationModulesOverview = [
    {
      level: 'LEVEL 0',
      title: 'Dasar-Dasar Bisnis Forex untuk Pemula',
      description: 'Membuka mindset awal: pasar uang, cara kerja spread/lot/pips, leverage, dan menghindari ilusi cepat kaya.',
      duration: '35 Menit',
      isFree: true,
      href: '/academy?modul=0',
    },
    {
      level: 'LEVEL 1',
      title: 'Fondasi Baku Money Management 1% & Anti-MC',
      description: 'Aturan mutlak proteksi modal: alokasi toleransi risiko 1% per posisi dan simulasi skenario drawdown.',
      duration: '45 Menit',
      isFree: false,
      href: '/academy?modul=1',
    },
    {
      level: 'LEVEL 2',
      title: 'Struktur Market H1/H4 & Supply-Demand Zone',
      description: 'Menemukan area likuiditas institusional yang valid dan teknik entry di titik harga terkonfirmasi.',
      duration: '50 Menit',
      isFree: false,
      href: '/academy?modul=2',
    },
    {
      level: 'LEVEL 3',
      title: 'Psikologi Trading Anti-FOMO & Disiplin Eksekusi',
      description: 'Melawan nafsu revenge trading, mengendalikan stres saat floating loss, dan menjaga ketenangan mental.',
      duration: '40 Menit',
      isFree: false,
      href: '/academy?modul=3',
    },
    {
      level: 'LEVEL 4',
      title: 'Menghadapi Volatilitas Berita Besar (NFP/CPI)',
      description: 'Playbook 3 fase rilis berita: menghindari slippage detik awal dan menyaring fakeout wick candle.',
      duration: '45 Menit',
      isFree: false,
      href: '/academy?modul=4',
    },
    {
      level: 'LEVEL 5',
      title: 'Analisis Teknikal Lanjutan & Simulasi MM Baku',
      description: 'Integrasi sistematis seluruh SOP: dari jurnal transaksi terarah hingga evaluasi compounding jangka panjang.',
      duration: '60 Menit',
      isFree: false,
      href: '/academy?modul=5',
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      {/* ======================================================== */}
      {/* 1. TOP GREEN VERIFIED STATUS BANNER (ALA TRADERS FAMILY) */}
      {/* ======================================================== */}
      <div className="space-y-3">
        {/* Banner 1: Green Verified Card (Persis TF Image 2) */}
        <div className="rounded-2xl bg-[#005a36] text-white p-4 sm:p-5 shadow-sm flex items-start gap-3 sm:gap-4 border border-[#00472b]">
          <div className="p-1 rounded-full bg-emerald-400/20 text-emerald-300 shrink-0 mt-0.5">
            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
              Akun RealistisFx Edukasi Anda Aktif!
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/95 mt-1 leading-relaxed">
              Selamat datang, <strong className="text-white">{user.name}</strong>! Akun Anda siap digunakan untuk mempelajari bisnis trading forex dari 0 secara bertahap, terarah, &amp; terkonsep untuk membuka mindset awal memahami bisnis trading forex yang sesungguhnya.
            </p>
          </div>
        </div>

        {/* Banner 2: Secondary Announcement / Promo Edukasi (Persis TF Image 2) */}
        <div className="rounded-2xl bg-[#007043] text-white p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-[#005a36]">
          <div className="flex items-start gap-3">
            <div className="p-1 rounded-full bg-emerald-300/20 text-emerald-200 shrink-0 mt-0.5">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white">
                Kurikulum Edukasi Bisnis Forex Level 0 - 5
              </h3>
              <p className="text-xs text-emerald-100 mt-0.5">
                Buka seluruh modul masterclass video, analisis teknikal, &amp; SOP Money Management 1% Anti-MC.
              </p>
            </div>
          </div>
          <Link
            href="/academy"
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white text-[#007043] hover:bg-emerald-50 text-xs font-black shadow-xs shrink-0 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>Buka Akademi Video</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Banner 3: Hubungi WhatsApp Admin untuk Bantuan Edukasi */}
        <div className="rounded-2xl bg-white border border-slate-200 p-3.5 sm:p-4 text-xs text-slate-700 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-[#00A651] shrink-0" />
            <span>
              Butuh konsultasi materi atau verifikasi akun?{' '}
              <strong className="text-slate-900">Admin RealistisFx siap membantu 1-on-1.</strong>
            </span>
          </div>
          <a
            href={`https://wa.me/${siteSettings?.adminWhatsAppNumber || '6287774229255'}?text=${encodeURIComponent(
              `Halo Admin RealistisFx, saya ${user.name} (ID: ${user.id}). Saya ingin konsultasi materi edukasi bisnis trading forex.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-extrabold text-[#00A651] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Chat WhatsApp Resmi</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. 8 QUICK ACCESS GRID ALA TRADERS FAMILY (IMAGE 2)      */}
      {/* ======================================================== */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
            Menu Akses Cepat Platform
          </h3>
          <span className="text-[11px] text-slate-500 font-medium">Edukasi &amp; Tools Terarah</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {quickAccessMenus.map((menu) => {
            const Icon = menu.icon;
            const content = (
              <div className="h-full rounded-2xl bg-white border border-slate-200/90 p-4 sm:p-5 flex flex-col items-center justify-center text-center gap-2 hover:border-[#00A651] hover:shadow-md transition-all group cursor-pointer shadow-xs">
                <div className="w-12 h-12 rounded-2xl border-2 border-slate-200 group-hover:border-[#00A651] flex items-center justify-center text-slate-700 group-hover:text-[#00A651] group-hover:bg-emerald-50/50 transition-all">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div className="min-w-0">
                  <span className="font-extrabold text-xs sm:text-sm text-slate-900 group-hover:text-[#00A651] transition-colors block truncate">
                    {menu.title}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 block truncate mt-0.5">
                    {menu.description}
                  </span>
                </div>
              </div>
            );

            if (menu.isExternal) {
              return (
                <a
                  key={menu.title}
                  href={menu.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  {content}
                </a>
              );
            }

            return (
              <Link key={menu.title} href={menu.href} className="block h-full">
                {content}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. KURIKULUM EDUKASI BISNIS FOREX DARI 0 (LEVEL 0 - 5)   */}
      {/* ======================================================== */}
      <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-50 text-[#00A651] border border-emerald-100">
                <GraduationCap className="w-5 h-5" />
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Kurikulum Edukasi Bisnis Forex Realistis (Level 0 - 5)
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
              Materi disusun bertahap, terarah, &amp; terkonsep untuk membuka mindset awal memahami bisnis trading forex. Mulai dari pemahaman dasar hingga penerapan SOP Money Management ketat.
            </p>
          </div>

          <Link
            href="/academy"
            className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white text-xs font-bold shadow-md shadow-[#00A651]/20 flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
          >
            <span>Buka Kelas Video Lengkap</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {educationModulesOverview.map((mod) => (
            <Link
              key={mod.level}
              href={mod.href}
              className="p-4 rounded-2xl border border-slate-200 hover:border-[#00A651] bg-slate-50/50 hover:bg-white transition-all space-y-2 group shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-[#00A651] border border-emerald-200">
                    {mod.level}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      mod.isFree
                        ? 'bg-emerald-100 text-[#00A651]'
                        : isPro
                        ? 'bg-emerald-50 text-[#00A651]'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {mod.isFree ? 'Gratis (Terbuka)' : isPro ? 'Akses Aktif' : 'Member Pro'}
                  </span>
                </div>

                <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#00A651] transition-colors leading-snug">
                  {mod.title}
                </h3>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed line-clamp-2">
                  {mod.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                <span>Durasi: {mod.duration}</span>
                <span className="text-[#00A651] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                  Pelajari <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. DETAIL PROFIL TRADER & STATUS AKUN (#profile)          */}
      {/* ======================================================== */}
      <div id="profile" className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden scroll-mt-20">
        <div className="px-4 sm:px-6 py-3.5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00A651] animate-pulse ring-4 ring-[#00A651]/20" />
            <span className="font-mono text-xs font-bold tracking-wider uppercase text-slate-200">
              Profil Trader &amp; Status Akun RealistisFx
            </span>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="text-[11px] text-slate-400 hidden sm:inline font-mono">
              Gateway: Edukasi Bisnis Forex
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              SOP Anti-MC
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {/* Column 1: Trader Identity */}
          <div className="space-y-3 pt-2 md:pt-0">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00A651] to-emerald-800 text-white flex items-center justify-center font-black text-base shadow-md shadow-[#00A651]/20 flex-shrink-0">
                {user.name ? user.name.slice(0, 2).toUpperCase() : 'TR'}
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-white" />
              </div>
              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight truncate">
                  {user.name}
                </h2>
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
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00A651]" />
                  <span>EDUKASI PRO (AKTIF)</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">
                  <BookOpen className="w-3.5 h-3.5 text-slate-600" />
                  <span>EDUKASI DASAR (FREE)</span>
                </span>
              )}

              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                Tipe: {user.accountType}
              </span>
            </div>
          </div>

          {/* Column 2: Account Specifications */}
          <div className="space-y-2.5 pt-4 md:pt-0 md:pl-6 text-xs text-slate-700">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              Spesifikasi Akun &amp; Kuota Tools
            </span>

            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Tipe Akun</span>
                <span className="font-bold text-slate-900 mt-0.5 block">{user.accountType} (USD/IDRC)</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Status Edukasi</span>
                <span className="font-bold text-[#00A651] mt-0.5 block">
                  {isPro ? user.proExpiryDate || 'Aktif Selamanya' : 'Dasar Gratis'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block">SOP Money Management</span>
                <span className="font-bold text-slate-900 mt-0.5 block font-mono">Maks 1-2% Modal</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Kuota Lot Calculator</span>
                <span className="font-bold text-slate-900 mt-0.5 block font-mono">
                  {isPro ? 'Unlimited' : `${user.dailyCalculatorCount}/${siteSettings?.freeDailyCalculatorLimit ?? 3} Hari Ini`}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50/70 border border-emerald-200 text-[11px] text-emerald-900">
              <span className="flex items-center gap-1.5 font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#00A651]" />
                Aturan Ketat SOP:
              </span>
              <span className="font-bold text-[#00A651]">Anti-Overlot &amp; Anti-MC</span>
            </div>
          </div>

          {/* Column 3: Live Performance & Quick Actions */}
          <div className="space-y-3 pt-4 md:pt-0 md:pl-6">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              Evaluasi Disiplin Trading
            </span>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Skor Disiplin SOP</span>
                <span className="text-base font-black font-mono text-[#00A651]">{disciplineScore}/100</span>
              </div>

              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Win Rate Jurnal</span>
                <span className="text-base font-black font-mono text-slate-900">{winRate}%</span>
              </div>
            </div>

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
                    `Halo Admin RealistisFx, saya ${user.name} (ID: ${user.id}). Saya ingin konsultasi materi edukasi / bantuan akun.`
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
                  onClick={() => openPaymentModal('EDUKASI')}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white text-xs font-extrabold shadow-md shadow-[#00A651]/20 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Aktivasi Paket Edukasi (Rp 250.000 / Bln)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. 4 KEY METRICS: DISIPLIN, WIN RATE, MARGIN, KUOTA      */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="rounded-2xl p-5 bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Skor Disiplin SOP</span>
            <span className="p-2 rounded-xl bg-emerald-50 text-[#00A651] border border-emerald-100">
              <ShieldAlert className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-slate-900">{disciplineScore}</span>
            <span className="text-xs text-slate-500">/ 100</span>
            <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-[#00A651] border border-emerald-200">
              {disciplineScore >= 75 ? 'SOP Terjaga' : 'Perlu Evaluasi'}
            </span>
          </div>
          <p className="mt-2.5 text-[11px] text-slate-500">
            {totalTrades > 0 ? `${disciplinedTrades} dari ${totalTrades} posisi disiplin SOP` : 'Catat di Smart Journal untuk kalkulasi skor'}
          </p>
        </div>

        {/* Metric 2 */}
        <div className="rounded-2xl p-5 bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Win Rate Jurnal</span>
            <span className="p-2 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-slate-900">{winRate}%</span>
            <span className="ml-auto text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
              {totalTrades} Posisi
            </span>
          </div>
          <p className="mt-2.5 text-[11px] text-slate-500">
            {totalTrades > 0 ? `${winningTrades} Win / ${losingTrades} Loss` : 'Belum ada transaksi selesai'}
          </p>
        </div>

        {/* Metric 3 */}
        <div className="rounded-2xl p-5 bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Ketahanan Margin</span>
            <span className="p-2 rounded-xl bg-emerald-50 text-[#00A651] border border-emerald-100">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold font-mono text-[#00A651]">AMAN</span>
            <span className="ml-auto text-xs font-bold text-[#00A651] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              Anti Over-Lot
            </span>
          </div>
          <p className="mt-2.5 text-[11px] text-slate-500">
            Terapkan batas 1% per posisi di menu Calculator
          </p>
        </div>

        {/* Metric 4 */}
        <div className="rounded-2xl p-5 bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Status Lisensi</span>
            <span className="p-2 rounded-xl bg-emerald-50 text-[#00A651] border border-emerald-200">
              <GraduationCap className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-slate-900">
              {isPro ? 'EDUKASI PRO' : 'EDUKASI DASAR'}
            </span>
            <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-[#00A651] border border-emerald-200">
              {isPro ? 'Aktif' : 'Gratis'}
            </span>
          </div>
          <p className="mt-2.5 text-[11px] text-slate-500">
            {isPro ? 'Seluruh modul video & tools terbuka' : `Sisa kuota: ${user.dailyCalculatorCount}/${siteSettings?.freeDailyCalculatorLimit ?? 3} hari ini`}
          </p>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 6. NEWS RADAR PREVIEW & ANTI-FOMO SOP CHECKLIST          */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* News Radar Preview */}
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

          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" />
                  HIGH IMPACT 🔥
                </span>
                <span className="text-xs font-bold text-slate-900">
                  USD Non-Farm Payrolls (NFP)
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Kalender Bulanan BLS
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              Fokus edukasi berita: <strong>Jangan entry pada detik ke-0 saat spread melebar 15x</strong>. Tunggu konfirmasi arah candle M5 untuk melindungi akun dari fakeout wick.
            </p>

            <div className="mt-3 pt-3 border-t border-rose-200/60">
              {isPro ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-emerald-50/90 border border-emerald-200 text-slate-800">
                    <span className="font-bold text-[#00A651] flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5" /> Skenario Bullish Gold (XAUUSD):
                    </span>
                    <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                      Jika NFP &lt; 150K dan Unemployment Rate naik, peluang buy akumulasi setelah fakeout wick selesai.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-50/90 border border-rose-200 text-slate-800">
                    <span className="font-bold text-rose-600 flex items-center gap-1.5">
                      <TrendingDown className="w-3.5 h-3.5" /> Skenario Bearish Gold (XAUUSD):
                    </span>
                    <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                      Jika NFP &gt; 200K, DXY menguat tajam, peluang sell rejection di supply zone H1 terdekat.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-white border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-600 shrink-0" />
                    <p className="text-xs text-slate-700">
                      <span className="font-bold text-slate-900">Skenario Prediksi 2 Arah</span> terbuka khusus untuk Member Pro Edukasi.
                    </p>
                  </div>
                  <button
                    onClick={() => openPaymentModal('EDUKASI')}
                    className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs shrink-0 cursor-pointer shadow-xs text-center"
                  >
                    Buka Edukasi Lengkap (Rp 250k)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Anti-FOMO Daily Checklist Widget */}
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
                { key: 'lotCalculated' as const, label: 'Hitung Lot Aman (Maks 1% Risiko)' },
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

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xl space-y-4">
            <button
              type="button"
              onClick={() => setShowPasswordModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-slate-900">Perbarui Kata Sandi Akun</h3>
              <p className="text-xs text-slate-500">Buat kata sandi baru untuk login ke member area RealistisFx.</p>
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
                <label className="block text-xs font-bold text-slate-700 mb-1">Kata Sandi Baru</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-[#00A651] focus:ring-1 focus:ring-[#00A651] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Konfirmasi Kata Sandi</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ketik ulang kata sandi baru"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-[#00A651] focus:ring-1 focus:ring-[#00A651] outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-extrabold text-xs shadow-md shadow-[#00A651]/20 transition-all cursor-pointer"
              >
                Simpan Kata Sandi Baru
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
