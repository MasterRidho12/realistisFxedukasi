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
  ArrowRight,
  CheckCircle2,
  Lock,
  ChevronRight,
  TrendingDown,
  Info,
  Check,
  X,
  Radio,
  ExternalLink,
  MessageCircle,
  HelpCircle,
  Users,
  Target,
  Zap,
  ChevronDown,
  ChevronUp,
  LogIn,
  UserPlus
} from 'lucide-react';
import { useUser } from '@/context/UserContext';

interface LandingPageProps {
  onOpenAuth?: (initialMode?: 'login' | 'register') => void;
}

export default function LandingPage({ onOpenAuth }: LandingPageProps) {
  const { user, login, register, marketPrice } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  // Auth Modal State for on-page login/register
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authWhatsapp, setAuthWhatsapp] = useState('');
  const [authAccountType, setAuthAccountType] = useState<'STANDARD' | 'CENT'>('STANDARD');
  const [authError, setAuthError] = useState('');

  const openAuth = (mode: 'login' | 'register') => {
    if (onOpenAuth) {
      onOpenAuth(mode);
    } else {
      setAuthMode(mode);
      setAuthError('');
      setShowAuthModal(true);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (authMode === 'login') {
      if (!authEmail.trim() || !authPassword) {
        setAuthError('Masukkan email dan kata sandi Anda.');
        return;
      }
      const success = login(authEmail.trim().toLowerCase(), authPassword);
      if (!success) {
        setAuthError('Email atau kata sandi tidak valid. Silakan periksa kembali.');
        return;
      }
      setShowAuthModal(false);
    } else {
      if (!authName.trim() || !authEmail.trim() || !authWhatsapp.trim()) {
        setAuthError('Harap lengkapi semua kolom: Nama, Email, dan WhatsApp.');
        return;
      }
      if (!authPassword || authPassword.length < 6) {
        setAuthError('Kata sandi minimal 6 karakter.');
        return;
      }
      register({
        name: authName.trim(),
        email: authEmail.trim().toLowerCase(),
        whatsapp: authWhatsapp.trim(),
        password: authPassword,
        accountType: authAccountType,
        tier: 'FREE',
      });
      setShowAuthModal(false);
    }
  };

  const toggleFaq = (index: number) => {
    setFaqOpenIndex(faqOpenIndex === index ? null : index);
  };

  const benefits = [
    {
      title: 'Stop Margin Call & Over-Lot',
      desc: 'Hitung ukuran lot aman otomatis berdasarkan 1-2% modal akun Anda dan jarak Stop Loss, mencegah kebangkrutan akun.',
      icon: ShieldAlert,
      badge: 'Proteksi Akun',
    },
    {
      title: 'Validasi SOP Bebas FOMO',
      desc: 'Checklist disiplin 6 poin yang wajib divalidasi sebelum klik open order di MetaTrader. Mode Ketat mengunci kalkulator jika belum lulus.',
      icon: CheckCircle2,
      badge: 'Disiplin Mental',
    },
    {
      title: 'Radar Berita Skenario 2 Arah',
      desc: 'Antisipasi rilis data High-Impact (NFP, CPI, suku bunga) dengan skenario terukur Bullish & Bearish tanpa terjebak lonjakan spread.',
      icon: Radar,
      badge: 'Fundamental',
    },
    {
      title: 'Smart Journal & Evaluasi AI',
      desc: 'Pencatatan trade otomatis dengan live ticker spot harga TradingView, evaluasi emosi psikologis, dan kalkulasi rasio Win Rate akun.',
      icon: BookOpenCheck,
      badge: 'AI Psikologi',
    },
  ];

  const features = [
    {
      title: 'Risk & Lot Calculator',
      desc: 'Kalkulator lot aman otomatis sesuai modal, jarak SL pips, dan toleransi risiko. Mendukung Akun Standard USD dan Akun Cent IDRC.',
      icon: Calculator,
      free: 'Maks 3x hitung / hari',
      pro: 'UNLIMITED + XAUUSD & Akun Cent',
    },
    {
      title: 'News Sentiment Radar',
      desc: 'Kalender ekonomi live dengan countdown rilis berita dan skenario prediksi 2 arah Bullish / Bearish pada pair Emas (XAUUSD).',
      icon: Radar,
      free: 'Kalender Standar',
      pro: 'Skenario 2 Arah NFP & CPI',
    },
    {
      title: 'Smart Trading Journal',
      desc: 'Catat histori entry, Stop Loss, Take Profit, evaluasi emosi trading (Disiplin, FOMO, Balas Dendam), serta skor kepatuhan SOP.',
      icon: BookOpenCheck,
      free: 'Maks 10 input / bulan',
      pro: 'UNLIMITED + AI Analitik Emosi',
    },
    {
      title: 'Anti-FOMO SOP Checklist',
      desc: 'Checklist interaktif pra-eksekusi order dengan Mode Ketat (Strict Lock) untuk mengunci kalkulator jika 6 aturan belum terpenuhi.',
      icon: ShieldAlert,
      free: 'Mode Standar',
      pro: 'Mode Ketat (Strict Lock Otomatis)',
    },
    {
      title: 'Margin Resistance (Anti-MC)',
      desc: 'Simulasi harga persis di level berapa akun Anda akan terkena Margin Call jika posisi floating minus, untuk mitigasi cepat.',
      icon: AlertTriangle,
      free: 'Terkunci',
      pro: 'Simulasi Titik MC Realtime',
    },
    {
      title: 'Daily Watchlist (S&R)',
      desc: 'Peta level kunci Support, Resistance, dan zona Buy/Sell harian pada timeframe H1 dan H4 untuk XAUUSD, EURUSD, dan GBPUSD.',
      icon: LineChart,
      free: '1 Pair Acak',
      pro: 'XAUUSD + Major Pairs Lengkap',
    },
    {
      title: 'Recovery & Compounding',
      desc: 'Planner pertumbuhan bunga berbunga modal dan kalkulator pemulihan drawdown yang terhubung langsung dengan jurnal trading.',
      icon: TrendingUp,
      free: 'Terkunci',
      pro: 'Akses Penuh Planner Equity Curve',
    },
    {
      title: 'Gamified Academy',
      desc: 'Kurikulum trading realistis langkah demi langkah (Level 1 hingga Level 5) untuk membangun mental dan kebiasaan trader profesional.',
      icon: GraduationCap,
      free: 'Modul Level 1 Dasar',
      pro: 'Semua Modul Lvl 1-5 + Sertifikat',
    },
    {
      title: 'Bot Assistant (Telegram)',
      desc: 'Webhook notifikasi otomatis ke ponsel Telegram Anda H-30 menit sebelum rilis berita ekonomi berdampak tinggi.',
      icon: Bot,
      free: 'Terkunci',
      pro: 'Notifikasi H-30 Menit Aktif',
    },
    {
      title: 'Discipline Score AI',
      desc: 'Evaluasi skor kepatuhan psikologis 0-100 secara otomatis dari histori transaksi jurnal dan nasihat AI yang objektif.',
      icon: Sparkles,
      free: 'Skor Dasar',
      pro: 'Evaluasi Detail & Rekomendasi AI',
    },
  ];

  const comparisonRows = [
    { name: 'Kalkulator Lot Aman (Risk Calculator)', free: 'Maks 3x hitung/hari', pro: 'Tanpa Batas (Unlimited)' },
    { name: 'Dukungan Pair Emas (XAUUSD)', free: 'Terkunci', pro: 'Tersedia Penuh (Aktif)' },
    { name: 'Dukungan Akun Cent (IDRC)', free: 'Terkunci', pro: 'Tersedia Penuh (Aktif)' },
    { name: 'Kalender Berita Ekonomi', free: 'Kalender Standar', pro: 'Kalender Live + Countdown' },
    { name: 'Skenario 2 Arah (Bullish/Bearish NFP)', free: 'Terkunci', pro: 'Tersedia Penuh' },
    { name: 'Smart Trading Journal', free: 'Maks 10 catatan/bulan', pro: 'Tanpa Batas (Unlimited)' },
    { name: 'Analitik Emosi & AI Review Transaksi', free: 'Dasar', pro: 'Analisa Mendalam & Nasihat AI' },
    { name: 'Anti-FOMO Mode Ketat (Strict Lock)', free: 'Manual', pro: 'Terkunci Otomatis (Anti-Impulsif)' },
    { name: 'Kalkulator Margin Resistance (Anti-MC)', free: 'Terkunci', pro: 'Simulasi Titik MC Realtime' },
    { name: 'Compounding & Drawdown Recovery', free: 'Terkunci', pro: 'Akses Penuh + Planner Target' },
    { name: 'Bot Telegram Alert H-30 Menit', free: 'Terkunci', pro: 'Webhook Notifikasi Otomatis' },
    { name: 'Kurikulum Gamified Academy', free: 'Level 1 Dasar', pro: 'Semua Level 1-5 + Sertifikat' },
    { name: 'Dukungan Konsultasi SOP via WhatsApp', free: 'Komunitas', pro: 'Prioritas Admin RealistisFx' },
  ];

  const faqs = [
    {
      q: 'Apa itu RealistisFx Edukasi?',
      a: 'RealistisFx Edukasi adalah platform trading tools dan edukasi freemium yang dirancang untuk melindungi retail trader Indonesia dari Margin Call (MC). Kami mengutamakan manajemen risiko matematis, kedisiplinan SOP sebelum entry, dan evaluasi emosi psikologis.',
    },
    {
      q: 'Apakah platform ini menjanjikan profit pasti atau cepat kaya?',
      a: 'Sama sekali tidak. Trading forex dan komoditas adalah probabilitas dengan risiko tinggi. RealistisFx berfokus pada ketahanan modal jangka panjang: bagaimana Anda tidak pernah bangkrut karena over-lot, membatasi risiko maksimal 1-2% per trade, dan patuh pada SOP.',
    },
    {
      q: 'Bagaimana cara mendaftar akun Free dan apa saja batasannya?',
      a: 'Pendaftaran akun Free 100% gratis tanpa memerlukan kartu kredit. Anda langsung dapat menggunakan kalkulator lot standar (3x/hari), mencatat 10 trade per bulan di Smart Journal, dan membaca modul Level 1 Academy.',
    },
    {
      q: 'Berapa biaya langganan PRO dan bagaimana cara pembayarannya?',
      a: 'Biaya langganan PRO sangat terjangkau yaitu Rp50.000 / bulan (atau opsi diskon 3 bulan Rp135.000 dan 1 tahun Rp499.000). Pembayaran dilakukan dengan scan kode QRIS resmi (mendukung BCA, Mandiri, BRI, BNI, GoPay, OVO, Dana, ShopeePay, dll).',
    },
    {
      q: 'Apakah ada notifikasi otomatis sebelum berita besar rilis?',
      a: 'Ya, bagi pengguna PRO, Anda dapat menghubungkan akun ke Bot Telegram Assistant yang akan mengirimkan notifikasi pengingat otomatis H-30 menit sebelum rilis berita High-Impact seperti NFP, CPI, atau FOMC.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-[#00A651] selection:text-white">
      {/* 1. Header / Navbar Landing Page */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 select-none">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-emerald-500/40 shadow-xs bg-[#0a1f18] flex items-center justify-center shrink-0">
              <img
                alt="REALISTIS FX Logo"
                width={36}
                height={36}
                className="w-full h-full object-cover"
                src="/images/logo.png"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900">
                  REALISTIS<span className="text-[#00A651]"> FX</span>
                </span>
                <span className="text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-50 text-[#00A651] border border-emerald-200 uppercase">
                  Edukasi
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#about" className="hover:text-[#00A651] transition-colors">
              Tentang Kami
            </a>
            <a href="#benefits" className="hover:text-[#00A651] transition-colors">
              Benefit
            </a>
            <a href="#features" className="hover:text-[#00A651] transition-colors">
              10 Fitur Tools
            </a>
            <a href="#pricing" className="hover:text-[#00A651] transition-colors">
              Free vs PRO
            </a>
            <a href="#faq" className="hover:text-[#00A651] transition-colors">
              FAQ
            </a>
          </nav>

          {/* Live Ticker & Auth CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Realtime Spot Ticker */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <Radio className="w-3 h-3 text-[#00A651] animate-pulse" />
              <span className="font-bold text-amber-700 text-[11px]">XAU:</span>
              <span className="font-mono font-bold text-slate-900 text-xs">
                {(marketPrice?.price ?? 4176.50).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            {/* Auth Buttons */}
            {user.isAuthenticated ? (
              <Link
                href="/"
                className="px-3.5 py-1.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs shadow-md shadow-[#00A651]/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Buka Dashboard</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => openAuth('login')}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Masuk
                </button>
                <button
                  type="button"
                  onClick={() => openAuth('register')}
                  className="px-3.5 py-1.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs shadow-md shadow-[#00A651]/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                >
                  Daftar Gratis
                </button>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 md:hidden cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 shadow-lg">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-semibold text-slate-700 hover:text-[#00A651]"
            >
              Tentang Kami
            </a>
            <a
              href="#benefits"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-semibold text-slate-700 hover:text-[#00A651]"
            >
              Benefit
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-semibold text-slate-700 hover:text-[#00A651]"
            >
              10 Fitur Tools
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-semibold text-slate-700 hover:text-[#00A651]"
            >
              Free vs PRO
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-semibold text-slate-700 hover:text-[#00A651]"
            >
              FAQ
            </a>
            <div className="pt-2 border-t border-slate-100 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuth('login');
                }}
                className="w-1/2 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-800 text-center cursor-pointer"
              >
                Masuk
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuth('register');
                }}
                className="w-1/2 py-2 rounded-xl text-xs font-bold bg-[#00A651] text-white text-center cursor-pointer shadow-xs"
              >
                Daftar Gratis
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-200/80 bg-gradient-to-b from-white via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#00A651] text-xs font-bold shadow-xs">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>EKOSISTEM EDUKASI TRADING &amp; TOOLS ANTI MARGIN CALL #1</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Trading Realistis, Kuasai{' '}
              <span className="text-[#00A651]">Risk Management</span> &amp; Selamatkan Modal Anda.
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Platform tools trading dan edukasi komprehensif bagi retail trader Indonesia. Hitung lot aman otomatis, antisipasi berita High-Impact dengan skenario 2 arah, kunci emosi FOMO dengan SOP ketat, dan catat jurnal trading berbasis data objektif.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => openAuth('register')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-sm shadow-lg shadow-[#00A651]/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Mulai Gratis Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => openAuth('login')}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-xs hover:border-slate-400 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-slate-600" />
                <span>Sudah Punya Akun? Masuk</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase">PRINSIP #1</span>
                <p className="text-xs font-bold text-slate-900 mt-0.5">100% Anti Over-Lot</p>
                <p className="text-[10px] text-slate-500">Maksimal risiko 1-2% modal</p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase">FEED REAL-TIME</span>
                <p className="text-xs font-bold text-slate-900 mt-0.5">XAUUSD &amp; Forex Spot</p>
                <p className="text-[10px] text-slate-500">Kalkulasi harga terkini</p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase">DISIPLIN SOP</span>
                <p className="text-xs font-bold text-slate-900 mt-0.5">Anti-FOMO Strict Lock</p>
                <p className="text-[10px] text-slate-500">Kunci kalkulator pra-entry</p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase">TERJANGKAU</span>
                <p className="text-xs font-bold text-slate-900 mt-0.5">Free &amp; PRO Rp50k/bln</p>
                <p className="text-[10px] text-slate-500">Aktivasi instan via QRIS</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Tentang Website Kita (Filosofi & Realitas Trading) */}
      <section id="about" className="py-16 md:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left Description */}
            <div className="space-y-4">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-[#00A651] border border-emerald-200">
                TENTANG REALISTIS FX EDUKASI
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Dibangun Karena 90% Retail Trader Mengalami Margin Call.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Di internet, trading sering digambarkan sebagai cara cepat kaya semalam. Faktanya, mayoritas trader kehilangan modal karena kesalahan yang sama:
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-50/60 border border-rose-200 text-xs text-slate-700">
                  <X className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-slate-900">Over-Lot &amp; Greedy:</strong> Membuka lot terlalu besar tanpa memperhitungkan jarak Stop Loss dan batas ketahanan modal.
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-50/60 border border-rose-200 text-xs text-slate-700">
                  <X className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-slate-900">FOMO &amp; Revenge Trading:</strong> Membuka posisi tergesa-gesa saat candle melesat atau ingin membalas kekalahan sebelumnya secara impulsif.
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-50/60 border border-rose-200 text-xs text-slate-700">
                  <X className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-slate-900">Trading Buta saat Berita:</strong> Terjebak lonjakan spread dan slippage berita High Impact (NFP, CPI, Fed Rate).
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Solusi RealistisFx */}
            <div className="rounded-3xl p-6 sm:p-8 bg-slate-50 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 text-[#00A651]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Solusi Berbasis Sistem &amp; Matematika</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                RealistisFx Edukasi menyediakan <strong className="text-slate-900">sistem pertahanan otomatis</strong> agar Anda tidak lagi trading berdasarkan firasat atau nafsu serakah:
              </p>

              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#00A651] mt-0.5 shrink-0" />
                  <p className="text-xs text-slate-700">
                    <strong>Kalkulasi Risiko Otomatis:</strong> Masukkan modal dan jarak pips, lot terhitung presisi hingga 2 digit desimal.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#00A651] mt-0.5 shrink-0" />
                  <p className="text-xs text-slate-700">
                    <strong>Skenario 2 Arah:</strong> Analisa fundamental terukur Bullish &amp; Bearish untuk mengantisipasi gejolak NFP / CPI.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#00A651] mt-0.5 shrink-0" />
                  <p className="text-xs text-slate-700">
                    <strong>Filter SOP Ketat:</strong> Validasi 6 aturan wajib sebelum entry agar tidak ada order impulsif.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#00A651] mt-0.5 shrink-0" />
                  <p className="text-xs text-slate-700">
                    <strong>Jurnal Berbasis AI Emosi:</strong> Lacak rasio Win Rate dan deteksi kelemahan psikologis Anda.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openAuth('register')}
                  className="w-full py-2.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs text-center transition-all cursor-pointer shadow-xs"
                >
                  Coba Semua Fitur Gratis Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Benefit Utama */}
      <section id="benefits" className="py-16 md:py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-[#00A651] border border-emerald-200">
              BENEFIT UNTUK TRADER
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              4 Keuntungan Nyata Menggunakan RealistisFx Edukasi
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Membangun konsistensi dan ketahanan psikologis trading dari hari pertama.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="rounded-2xl p-6 bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-xl bg-emerald-50 text-[#00A651] border border-emerald-100">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-[#00A651] border border-emerald-200">
                        {b.badge}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900">{b.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. 10 Fitur Trading Tools Lengkap */}
      <section id="features" className="py-16 md:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-[#00A651] border border-emerald-200">
              TOOLKIT TRADING LENGKAP
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              10 Fitur Unggulan RealistisFx Edukasi
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Dari kalkulasi pra-analisa, pemetaan level Support &amp; Resistance, hingga evaluasi psikologis otomatis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="rounded-2xl p-5 bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-xl bg-emerald-50 text-[#00A651] border border-emerald-100">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400">
                        #0{index + 1}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{feat.title}</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-[11px]">
                    <div className="flex justify-between text-slate-500">
                      <span>Free Tier:</span>
                      <span className="text-slate-700 font-medium truncate ml-2">{feat.free}</span>
                    </div>
                    <div className="flex justify-between text-[#00A651] font-semibold">
                      <span>PRO Member:</span>
                      <span className="truncate ml-2">{feat.pro}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Perbandingan Paket: FREE vs PRO */}
      <section id="pricing" className="py-16 md:py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-[#00A651] border border-emerald-200">
              TRANSPARAN TANPA BIAYA TERSEMBUNYI
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Pilih Paket Sesuai Kebutuhan Anda
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Mulai gratis selamanya atau upgrade ke PRO hanya Rp50.000/bulan via scan QRIS resmi.
            </p>
          </div>

          {/* 2 Main Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* FREE TIER CARD */}
            <div className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    FREE TIER
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                    GRATIS SELAMANYA
                  </span>
                </div>

                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-900">Rp 0</span>
                    <span className="text-xs text-slate-500">/ gratis</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Sangat cocok untuk pemula yang ingin belajar SOP dasar dan mencoba kalkulator lot.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <Check className="w-4 h-4 text-[#00A651] shrink-0" />
                    <span>Risk &amp; Lot Calculator (3x hitung/hari)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <Check className="w-4 h-4 text-[#00A651] shrink-0" />
                    <span>Dukungan Pair Forex Mayor</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <Check className="w-4 h-4 text-[#00A651] shrink-0" />
                    <span>Kalender Berita Ekonomi Dasar</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <Check className="w-4 h-4 text-[#00A651] shrink-0" />
                    <span>Smart Trading Journal (10 trade/bulan)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <Check className="w-4 h-4 text-[#00A651] shrink-0" />
                    <span>Checklist SOP Mode Standar</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <Check className="w-4 h-4 text-[#00A651] shrink-0" />
                    <span>Gamified Academy Modul Level 1</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => openAuth('register')}
                  className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs text-center transition-all cursor-pointer border border-slate-200"
                >
                  Daftar Akun Gratis Sekarang
                </button>
              </div>
            </div>

            {/* PRO VIP CARD */}
            <div className="rounded-3xl p-6 sm:p-8 bg-white border-2 border-[#00A651] shadow-xl relative flex flex-col justify-between">
              <div className="absolute -top-3.5 right-6 px-3 py-0.5 rounded-full bg-[#00A651] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                PALING POPULER &amp; REKOMENDASI
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Crown className="w-4 h-4 text-[#00A651]" />
                    <span className="text-xs font-bold text-[#00A651] uppercase tracking-wider">
                      PRO MEMBER VIP
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-[#00A651] border border-emerald-200">
                    AKSES LENGKAP
                  </span>
                </div>

                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-900">Rp 50.000</span>
                    <span className="text-xs text-slate-500">/ bulan (Scan QRIS)</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Untuk trader aktif yang ingin proteksi modal penuh, pair Emas XAUUSD, dan skenario berita.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-slate-800 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#00A651] shrink-0" />
                    <span><strong>UNLIMITED</strong> Risk &amp; Lot Calculator</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-800 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#00A651] shrink-0" />
                    <span><strong>Pair Emas (XAUUSD)</strong> &amp; Akun Cent (IDRC)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-800 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#00A651] shrink-0" />
                    <span><strong>Skenario 2 Arah</strong> (Bullish/Bearish NFP &amp; CPI)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-800 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#00A651] shrink-0" />
                    <span><strong>Bot Assistant Telegram</strong> Alert H-30 Menit</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-800 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#00A651] shrink-0" />
                    <span><strong>Unlimited Journal</strong> + Evaluasi AI Emosi</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-800 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#00A651] shrink-0" />
                    <span><strong>Margin Resistance (Anti-MC)</strong> Simulator</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-800 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#00A651] shrink-0" />
                    <span><strong>Mode Ketat Anti-FOMO</strong> (Strict Lock)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-800 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#00A651] shrink-0" />
                    <span>Semua Modul Academy Lvl 1-5 + Sertifikat</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => openAuth('register')}
                  className="w-full py-3 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs text-center transition-all cursor-pointer shadow-md shadow-[#00A651]/20 hover:scale-[1.01] active:scale-95"
                >
                  Daftar &amp; Aktifkan PRO via QRIS (Rp50k)
                </button>
              </div>
            </div>
          </div>

          {/* Full Comparison Table */}
          <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs max-w-4xl mx-auto">
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Tabel Komparasi Lengkap Fitur</h3>
                <p className="text-xs text-slate-500">Perbandingan detail antara Akun Free dan Member PRO</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-600 bg-slate-50/50">
                    <th className="p-3.5 font-bold">Fitur &amp; Kemampuan</th>
                    <th className="p-3.5 font-bold w-40 text-center">Free Tier</th>
                    <th className="p-3.5 font-bold w-52 text-center text-[#00A651]">PRO Member (Rp50k)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonRows.map((row) => (
                    <tr key={row.name} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-3.5 font-medium text-slate-800">{row.name}</td>
                      <td className="p-3.5 text-center text-slate-500">{row.free}</td>
                      <td className="p-3.5 text-center font-bold text-[#00A651] bg-emerald-50/30">
                        {row.pro}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section id="faq" className="py-16 md:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-[#00A651] border border-emerald-200">
              PERTANYAAN UMUM
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Semua hal yang perlu Anda ketahui tentang RealistisFx Edukasi.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = faqOpenIndex === index;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/80 transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-900">{faq.q}</span>
                    <span className="p-1 rounded-lg bg-slate-100 text-slate-600 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Call to Action Banner */}
      <section className="py-14 md:py-16 bg-[#00A651] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
            Mulai Trading Realistis Hari Ini, Selamatkan Akun Anda.
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
            Bergabunglah dengan ribuan trader yang telah meninggalkan kebiasaan over-lot dan menerapkan SOP disiplin ketat.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => openAuth('register')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-[#00A651] font-extrabold text-xs shadow-md hover:bg-emerald-50 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            >
              Daftar Akun Gratis Sekarang
            </button>
            <button
              type="button"
              onClick={() => openAuth('login')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-800/60 hover:bg-emerald-800 text-white font-bold text-xs border border-emerald-400/30 transition-all cursor-pointer"
            >
              Masuk ke Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl overflow-hidden border border-emerald-500/40 bg-[#0a1f18] flex items-center justify-center shrink-0">
                <img
                  alt="REALISTIS FX Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                  src="/images/logo.png"
                />
              </div>
              <span className="font-extrabold text-sm text-slate-900">
                REALISTIS<span className="text-[#00A651]"> FX</span> EDUKASI
              </span>
            </div>

            <p className="text-[11px] text-slate-500 max-w-xl leading-relaxed">
              <strong>Peringatan Risiko:</strong> Perdagangan valuta asing (Forex) dan komoditas (Gold/XAUUSD) mengandung tingkat risiko tinggi dan tidak cocok untuk semua investor. Pastikan Anda memahami risikonya dan menerapkan manajemen lot dengan bijak.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
            <p>&copy; 2026 RealistisFx Edukasi. Hak Cipta Dilindungi Undang-Undang.</p>
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/6287774229255?text=Halo%20Admin%20RealistisFx%2C%20saya%20ingin%20bertanya%20seputar%20platform%20edukasi."
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#00A651] flex items-center gap-1 font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Admin</span>
              </a>
              <a
                href="https://www.mql5.com/en/signals/2388343?source=Site+Signals+My"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#00A651] flex items-center gap-1 font-semibold"
              >
                <span>Live MQL5</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal for Login & Register */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 w-full max-w-md shadow-2xl relative my-auto">
            {/* Close Modal */}
            <button
              type="button"
              onClick={() => setShowAuthModal(false)}
              className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Brand */}
            <div className="text-center mb-5">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl overflow-hidden border border-emerald-500/40 shadow-xs bg-[#0a1f18] mb-2">
                <img
                  alt="REALISTIS FX Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                  src="/images/logo.png"
                />
              </div>
              <h2 className="text-lg font-black text-slate-900">
                REALISTIS<span className="text-[#00A651]"> FX</span> EDUKASI
              </h2>
              <p className="text-xs text-slate-500">
                {authMode === 'login' ? 'Masuk ke akun trader Anda' : 'Buat akun Free baru'}
              </p>
            </div>

            {/* Mode Switch Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl mb-4 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setAuthError('');
                }}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  authMode === 'login'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Masuk Akun
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('register');
                  setAuthError('');
                }}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  authMode === 'register'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Daftar Baru
              </button>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{authError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="space-y-3.5 text-left">
              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A651]"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Email</label>
                <input
                  type="email"
                  required
                  placeholder="trader@gmail.com"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A651]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kata Sandi</label>
                <input
                  type="password"
                  required
                  placeholder="Minimal 6 karakter"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A651]"
                />
              </div>

              {authMode === 'register' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">No. WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="081234567890"
                      value={authWhatsapp}
                      onChange={(e) => setAuthWhatsapp(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A651]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Tipe Akun Broker</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setAuthAccountType('STANDARD')}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                          authAccountType === 'STANDARD'
                            ? 'bg-emerald-50 border-[#00A651] text-[#00A651]'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        Standard (USD $)
                      </button>
                      <button
                        type="button"
                        onClick={() => setAuthAccountType('CENT')}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                          authAccountType === 'CENT'
                            ? 'bg-emerald-50 border-[#00A651] text-[#00A651]'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        Cent (IDRC)
                      </button>
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs shadow-md shadow-[#00A651]/20 transition-all cursor-pointer mt-2"
              >
                {authMode === 'login' ? 'Masuk ke Dashboard' : 'Daftar Akun Gratis'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
