'use client';

import React, { useState, useRef } from 'react';
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
  Pencil,
  Camera,
  Trash2,
  UserCheck,
} from 'lucide-react';
import { useUser } from '@/context/UserContext';

export default function DashboardOverviewPage() {
  const { user, journals, openPaymentModal, updateUserPasswordLocal, updateUserProfile, siteSettings } = useUser();
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

  // Edit Profile Modal State
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [profileName, setProfileName] = useState(user.name || '');
  const [profileWhatsapp, setProfileWhatsapp] = useState(user.whatsapp || '');
  const [profileAccountType, setProfileAccountType] = useState<'STANDARD' | 'CENT'>(user.accountType || 'STANDARD');
  const [profileAvatar, setProfileAvatar] = useState<string>(user.avatar || '');
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('');
  const [profileErrorMsg, setProfileErrorMsg] = useState('');
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Preset professional trader avatars
  const presetAvatars = [
    { label: 'Trader Pria', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces&q=80' },
    { label: 'Trader Wanita', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces&q=80' },
    { label: 'Analisa Pro', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces&q=80' },
    { label: 'Trader Modern', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=faces&q=80' },
    { label: 'Executive', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces&q=80' },
    { label: 'Gold Trader', url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=faces&q=80' },
  ];

  const handleOpenEditProfile = () => {
    setProfileName(user.name || '');
    setProfileWhatsapp(user.whatsapp || '');
    setProfileAccountType(user.accountType || 'STANDARD');
    setProfileAvatar(user.avatar || '');
    setProfileSuccessMsg('');
    setProfileErrorMsg('');
    setShowEditProfileModal(true);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setProfileErrorMsg('Harap pilih file gambar yang valid (JPG, PNG, WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setProfileErrorMsg('Ukuran file gambar maksimal 5 MB.');
      return;
    }

    setIsUploadingPhoto(true);
    setProfileErrorMsg('');

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setProfileAvatar(result);
      setIsUploadingPhoto(false);
    };
    reader.onerror = () => {
      setProfileErrorMsg('Gagal memproses file foto.');
      setIsUploadingPhoto(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileErrorMsg('');
    setProfileSuccessMsg('');

    if (!profileName.trim()) {
      setProfileErrorMsg('Nama lengkap tidak boleh kosong.');
      return;
    }

    updateUserProfile({
      name: profileName.trim(),
      whatsapp: profileWhatsapp.trim(),
      accountType: profileAccountType,
      avatar: profileAvatar || undefined,
    });

    setProfileSuccessMsg('✅ Profil akun Anda berhasil diperbarui!');
    setTimeout(() => {
      setShowEditProfileModal(false);
      setProfileSuccessMsg('');
    }, 1200);
  };

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
      description: 'Ubah Nama, Foto & Info',
      onClick: handleOpenEditProfile,
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

  // 6 Structured Saga & Season Highlights for Adventure Journey (20 Seasons Total)
  const educationModulesOverview = [
    {
      level: 'SAGA 1 (SEASON 1 - 4)',
      title: 'Sejarah Perjalanan Uang & Dasar Forex Modern',
      description: 'Membuka mindset awal: dari zaman barter purba, Bretton Woods, peran Bank Sentral & Retail Trader, hingga istilah pips, lot, dan leverage. (Season 1 & 2 Gratis).',
      duration: '4 Season • 40 Episode',
      isFree: true,
      href: '/academy?season=1',
    },
    {
      level: 'SAGA 2 (SEASON 5 - 8)',
      title: 'Galangan Kapal Broker & Kemudi MetaTrader 4/5',
      description: 'Membedakan broker legal vs scammer, liquidity provider, cara pasang SL/TP otomatis di MT4/MT5, dan memahami pergerakan harga.',
      duration: '4 Season • 46 Episode',
      isFree: false,
      href: '/academy?season=5',
    },
    {
      level: 'SAGA 3 (SEASON 9 - 14)',
      title: 'Ilmu Analisis Pasar, Candlestick & Price Action',
      description: 'Membaca arah pasar tanpa overload: Candlestick Pattern, S&R, Indikator (EMA/RSI), Smart Money Concept (BOS, CHOCH, FVG), dan 4 Sesi Trading.',
      duration: '6 Season • 60 Episode',
      isFree: false,
      href: '/academy?season=9',
    },
    {
      level: 'SAGA 4 (SEASON 15 - 18)',
      title: 'Perisai Anti-MC, SOP Money Management 1% & Gold',
      description: 'Benteng pertahanan wajib: Risk Management 1%, Fixed SL 30 Pips, strategi menaklukkan XAUUSD (Gold), serta membunuh iblis mental FOMO & Revenge Trading.',
      duration: '4 Season • 45 Episode',
      isFree: false,
      href: '/academy?season=15',
    },
    {
      level: 'SAGA 5 (SEASON 19 - 20)',
      title: 'Backtesting Poneglyph, Algoritma AI & Trader Mandiri',
      description: 'Membuktikan strategi dengan data 100 trade objektif, jurnal evaluasi, pengenalan EA & algoritma, hingga wisuda menjadi Trader Mandiri Realistis.',
      duration: '2 Season • 20 Episode',
      isFree: false,
      href: '/academy?season=19',
    },
    {
      level: 'SPESIAL XAUUSD & EMAS',
      title: 'Masterclass Emas XAUUSD & Sesi London-NY Overlap',
      description: 'Mengenal karakteristik emas spot, pengaruh korelasi Dolar AS & suku bunga, serta simulasi eksekusi disiplin di zona volatilitas tinggi.',
      duration: 'Season 17 • 10 Episode',
      isFree: false,
      href: '/academy?season=17',
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

            if (menu.onClick) {
              return (
                <button
                  key={menu.title}
                  type="button"
                  onClick={menu.onClick}
                  className="block h-full text-left w-full cursor-pointer"
                >
                  {content}
                </button>
              );
            }

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
                Serial Petualangan Edukasi Forex Realistis (20 Season • 211 Episode)
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
              Materi disusun berseri seperti petualangan per season (ala One Piece) yang terarah &amp; membuka mindset bisnis forex dari nol. Mulai dari sejarah uang purba hingga kemandirian merakit sistem trading bebas Margin Call.
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
            <div className="flex items-center gap-3.5">
              <div
                onClick={handleOpenEditProfile}
                className="relative group/avatar cursor-pointer shrink-0"
                title="Klik untuk ubah foto profil & nama"
              >
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00A651] to-emerald-800 text-white flex items-center justify-center font-black text-base shadow-md shadow-[#00A651]/20 overflow-hidden ring-2 ring-emerald-500/20 group-hover/avatar:ring-[#00A651] transition-all">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{user.name ? user.name.slice(0, 2).toUpperCase() : 'TR'}</span>
                  )}
                  {/* Hover Camera Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[9px] font-bold">
                    <Camera className="w-4 h-4 mb-0.5 text-emerald-300" />
                    <span>Ubah</span>
                  </div>
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 ring-2 ring-white flex items-center justify-center shadow-xs">
                  <Pencil className="w-2.5 h-2.5 text-white" />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight truncate">
                    {user.name}
                  </h2>
                  <button
                    type="button"
                    onClick={handleOpenEditProfile}
                    className="p-1 rounded-lg text-slate-400 hover:text-[#00A651] hover:bg-emerald-50 transition-colors cursor-pointer"
                    title="Ubah Nama & Profil"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
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
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={handleOpenEditProfile}
                  className="py-2 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#00A651] text-xs font-bold flex items-center justify-center gap-1 border border-emerald-200 transition-colors cursor-pointer shadow-2xs"
                  title="Ubah Nama, Foto Profil, & Kontak"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>Edit Profil</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowPasswordModal(true)}
                  className="py-2 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1 border border-slate-200 transition-colors cursor-pointer"
                  title="Perbarui Kata Sandi Akun"
                >
                  <KeyRound className="w-3.5 h-3.5 text-slate-500" />
                  <span>Password</span>
                </button>

                <a
                  href={`https://wa.me/${siteSettings?.adminWhatsAppNumber || '6287774229255'}?text=${encodeURIComponent(
                    `Halo Admin RealistisFx, saya ${user.name} (ID: ${user.id}). Saya ingin konsultasi materi edukasi / bantuan akun.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center gap-1 border border-slate-200 transition-colors cursor-pointer"
                  title="Hubungi Admin / CS via WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
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

      {/* Edit Profile Modal (Ubah Nama, Foto Profil & Info Akun) */}
      {showEditProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowEditProfileModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#00A651] border border-emerald-200 text-[10px] font-bold uppercase tracking-wider">
                <UserCheck className="w-3 h-3" />
                Pengaturan Akun Trader
              </div>
              <h3 className="text-lg font-black text-slate-900">Edit Profil Trader</h3>
              <p className="text-xs text-slate-500">Perbarui nama tampilan, foto profil, nomor kontak, dan spesifikasi akun Anda.</p>
            </div>

            {profileErrorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{profileErrorMsg}</span>
              </div>
            )}

            {profileSuccessMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[#00A651] text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{profileSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* SECTION: FOTO PROFIL */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-800">
                  Foto Profil (Avatar)
                </label>

                <div className="flex items-center gap-4">
                  {/* Avatar Preview */}
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00A651] to-emerald-800 text-white flex items-center justify-center font-black text-xl shadow-md shadow-[#00A651]/20 overflow-hidden ring-2 ring-emerald-500/20 shrink-0">
                    {profileAvatar ? (
                      <img
                        src={profileAvatar}
                        alt="Preview Foto"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{profileName ? profileName.slice(0, 2).toUpperCase() : 'TR'}</span>
                    )}
                  </div>

                  <div className="space-y-2 flex-1">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handlePhotoUpload}
                      accept="image/*"
                      className="hidden"
                    />

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploadingPhoto}
                        className="px-3 py-2 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>{isUploadingPhoto ? 'Memproses...' : 'Unggah Foto'}</span>
                      </button>

                      {profileAvatar && (
                        <button
                          type="button"
                          onClick={() => setProfileAvatar('')}
                          className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Hapus Foto</span>
                        </button>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Format: JPG, PNG, atau WEBP. Maks 5 MB.
                    </p>
                  </div>
                </div>

                {/* Preset Avatars Selector */}
                <div className="pt-2 border-t border-slate-200/60">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Atau Pilih Avatar Trader Profesional:
                  </span>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {presetAvatars.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setProfileAvatar(preset.url)}
                        className={`relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                          profileAvatar === preset.url
                            ? 'border-[#00A651] ring-2 ring-[#00A651]/30 scale-105'
                            : 'border-slate-200 hover:border-slate-400 opacity-80 hover:opacity-100'
                        }`}
                        title={preset.label}
                      >
                        <img
                          src={preset.url}
                          alt={preset.label}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION: NAMA LENGKAP */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Lengkap / Tampilan Trader
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    placeholder="Masukkan nama lengkap Anda"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:bg-white focus:border-[#00A651] focus:ring-1 focus:ring-[#00A651] outline-none"
                    required
                  />
                </div>
              </div>

              {/* SECTION: WHATSAPP */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nomor WhatsApp
                </label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={profileWhatsapp}
                    onChange={(e) => setProfileWhatsapp(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:bg-white focus:border-[#00A651] focus:ring-1 focus:ring-[#00A651] outline-none"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Untuk konfirmasi aktivasi paket edukasi &amp; konsultasi 1-on-1 via WhatsApp.
                </p>
              </div>

              {/* SECTION: TIPE AKUN TRADING */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Tipe Akun Trading Utama
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <label
                    onClick={() => setProfileAccountType('STANDARD')}
                    className={`p-3 rounded-xl border-2 flex items-center gap-2.5 cursor-pointer transition-all ${
                      profileAccountType === 'STANDARD'
                        ? 'border-[#00A651] bg-emerald-50/50 text-slate-900'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="accountType"
                      checked={profileAccountType === 'STANDARD'}
                      onChange={() => setProfileAccountType('STANDARD')}
                      className="hidden"
                    />
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300 flex items-center justify-center">
                      {profileAccountType === 'STANDARD' && (
                        <div className="w-2 h-2 rounded-full bg-[#00A651]" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold">STANDARD</div>
                      <div className="text-[10px] text-slate-400">Akun USD / IDRC</div>
                    </div>
                  </label>

                  <label
                    onClick={() => setProfileAccountType('CENT')}
                    className={`p-3 rounded-xl border-2 flex items-center gap-2.5 cursor-pointer transition-all ${
                      profileAccountType === 'CENT'
                        ? 'border-[#00A651] bg-emerald-50/50 text-slate-900'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="accountType"
                      checked={profileAccountType === 'CENT'}
                      onChange={() => setProfileAccountType('CENT')}
                      className="hidden"
                    />
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300 flex items-center justify-center">
                      {profileAccountType === 'CENT' && (
                        <div className="w-2 h-2 rounded-full bg-[#00A651]" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold">CENT</div>
                      <div className="text-[10px] text-slate-400">Akun Mikro Cent</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* READONLY ACCOUNT IDENTIFIERS */}
              <div className="p-3 rounded-xl bg-slate-100/70 border border-slate-200/80 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">ID Trader</span>
                  <span className="font-mono font-bold text-slate-800">{user.id}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Email Terdaftar</span>
                  <span className="text-slate-800 font-medium truncate block">{user.email}</span>
                </div>
              </div>

              {/* SUBMIT BUTTONS */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditProfileModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-extrabold text-xs shadow-md shadow-[#00A651]/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
