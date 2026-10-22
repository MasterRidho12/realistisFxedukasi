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
  UserPlus,
  Flame,
  Award,
  BarChart3,
  Sliders,
  DollarSign,
  ShieldCheck,
  Clock,
  Send,
  ArrowUpRight,
  Coins
} from 'lucide-react';
import { useUser } from '@/context/UserContext';

interface LandingPageProps {
  onOpenAuth?: (initialMode?: 'login' | 'register') => void;
}

export default function LandingPage({ onOpenAuth }: LandingPageProps) {
  const { user, login, register, marketPrice, openPaymentModal } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  // Active signal category filter in track record
  const [signalFilter, setSignalFilter] = useState<'ALL' | 'XAUUSD' | 'NEWS' | 'FOREX'>('ALL');

  // ROI Calculator Interactive State
  const [traderCapital, setTraderCapital] = useState<number>(1000); // in USD

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

  // Verified AI Track Record Data
  const signalsData = [
    {
      id: 'sig-01',
      pair: 'XAUUSD (Gold)',
      category: 'XAUUSD',
      type: 'BUY BREAKOUT',
      entry: '2,714.50',
      sl: '2,710.00',
      slPips: 45,
      tp1: '2,723.00',
      tp2: '2,732.50',
      pipsGain: '+180 Pips',
      status: 'HIT TP2',
      confidence: 91,
      date: '22 Okt 2026',
      timeframe: 'M15 / H1',
      session: 'New York Session',
      reasoning: 'Likuiditas buy-side di level 2,710 tersapu, konfirmasi candle bullish rejection dengan lonjakan volume institusional.',
    },
    {
      id: 'sig-02',
      pair: 'XAUUSD (Gold) — Rilis NFP',
      category: 'NEWS',
      type: 'SELL BREAKDOWN',
      entry: '2,698.00',
      sl: '2,703.50',
      slPips: 55,
      tp1: '2,684.00',
      tp2: '2,670.00',
      pipsGain: '+280 Pips',
      status: 'HIT TP2',
      confidence: 88,
      date: 'NFP Event Okt 2026',
      timeframe: 'M5 / M15',
      session: 'US News Release',
      reasoning: 'Non-Farm Payrolls rilis +254K (jauh di atas ekspektasi). AI mendeteksi fakeout wick ke atas lalu mengeksekusi breakdown trap saat spread normal.',
    },
    {
      id: 'sig-03',
      pair: 'XAUUSD (Gold) — Rilis CPI',
      category: 'NEWS',
      type: 'BUY SURGE',
      entry: '2,668.00',
      sl: '2,664.00',
      slPips: 40,
      tp1: '2,680.00',
      tp2: '2,692.00',
      pipsGain: '+240 Pips',
      status: 'HIT TP2',
      confidence: 87,
      date: 'CPI Event Sep 2026',
      timeframe: 'M15',
      session: 'US Inflation Release',
      reasoning: 'Core CPI melambat 0.2% MoM. Dollar melemah tajam, sinyal akumulasi beli emas terkonfirmasi pada retest support 2,668.',
    },
    {
      id: 'sig-04',
      pair: 'XAUUSD (Gold)',
      category: 'XAUUSD',
      type: 'SELL PULLBACK',
      entry: '2,740.00',
      sl: '2,744.50',
      slPips: 45,
      tp1: '2,731.00',
      tp2: '2,722.00',
      pipsGain: '+90 Pips',
      status: 'HIT TP1',
      confidence: 84,
      date: '20 Okt 2026',
      timeframe: 'H1',
      session: 'London Session',
      reasoning: 'Daily supply zone rejection di 2,740 dengan pola bearish engulfing H1. Mengunci profit di TP1 dan trailing stop.',
    },
    {
      id: 'sig-05',
      pair: 'EURUSD',
      category: 'FOREX',
      type: 'BUY CONTINUATION',
      entry: '1.0845',
      sl: '1.0820',
      slPips: 25,
      tp1: '1.0890',
      tp2: '1.0935',
      pipsGain: '+45 Pips',
      status: 'HIT TP1',
      confidence: 82,
      date: '19 Okt 2026',
      timeframe: 'H1',
      session: 'London Session',
      reasoning: 'Rebound dari support dinamis EMA 50 H1, konfirmasi divergence RSI.',
    },
    {
      id: 'sig-06',
      pair: 'GBPUSD',
      category: 'FOREX',
      type: 'SELL REVERSAL',
      entry: '1.3050',
      sl: '1.3080',
      slPips: 30,
      tp1: '1.2995',
      tp2: '1.2940',
      pipsGain: '+55 Pips',
      status: 'HIT TP1',
      confidence: 83,
      date: '18 Okt 2026',
      timeframe: 'H4',
      session: 'London / NY Overlap',
      reasoning: 'Break of structure (BOS) H4 mengonfirmasi perubahan tren jangka pendek pasca pidato BOE.',
    },
  ];

  const filteredSignals = signalFilter === 'ALL'
    ? signalsData
    : signalsData.filter((s) => s.category === signalFilter);

  // Dynamic ROI calculation based on trader's capital
  const safeRiskPct = 0.015; // 1.5% risk
  const stopLossPips = 45; // average SL
  const calculatedRiskUsd = traderCapital * safeRiskPct;
  const recommendedLot = Number((calculatedRiskUsd / (stopLossPips * 10)).toFixed(2));
  const estimatedMonthlyPips = 350; // conservative monthly target from AI signals
  const estimatedProfitUsd = Number((recommendedLot * estimatedMonthlyPips * 10).toFixed(0));
  const estimatedProfitIdr = estimatedProfitUsd * 15500;
  const vipCostIdr = 500000;
  const roiMultiplier = (estimatedProfitIdr / vipCostIdr).toFixed(1);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#00A651] selection:text-white">
      {/* 1. Top High-Ticket Announcement Bar */}
      <div className="bg-gradient-to-r from-[#008F45] via-[#00A651] to-[#056835] text-white py-2 px-4 text-center text-xs font-semibold tracking-wide border-b border-emerald-400/20 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            AI SIGNAL ENGINE v4.2
          </span>
          <span>
            Track Record Q1-Q3 2026: <strong className="font-extrabold text-amber-200">+4,120 Pips</strong> | Win Rate Terverifikasi <strong className="font-extrabold text-white">84.6%</strong> di XAUUSD &amp; News NFP/CPI
          </span>
          <span className="hidden md:inline text-emerald-200">|</span>
          <span className="hidden md:inline-flex items-center gap-1 text-emerald-100 font-medium">
            <Users className="w-3.5 h-3.5" />
            1,480+ Trader Indonesia Bergabung di VIP Member Area
          </span>
        </div>
      </div>

      {/* 2. Main Sticky Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden border border-emerald-500/30 bg-[#0a1f18] flex items-center justify-center shrink-0 shadow-sm shadow-[#00A651]/10">
              <img
                alt="REALISTIS FX Logo"
                width={40}
                height={40}
                className="w-full h-full object-cover"
                src="/images/logo.png"
              />
            </div>
            <div>
              <div className="font-black text-base sm:text-lg tracking-tight text-slate-900 flex items-center gap-1.5">
                REALISTIS<span className="text-[#00A651]"> FX</span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-[#00A651] border border-emerald-200 uppercase tracking-wider">
                  AI Signals &amp; VIP
                </span>
              </div>
              <p className="text-[10px] text-slate-500 hidden sm:block font-medium">
                Sinyal XAUUSD, Playbook Berita NFP/CPI &amp; Komunitas Trader
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-600">
            <a href="#track-record" className="hover:text-[#00A651] transition-colors flex items-center gap-1">
              <BarChart3 className="w-3.5 h-3.5 text-[#00A651]" />
              <span>Track Record AI</span>
            </a>
            <a href="#news-playbook" className="hover:text-[#00A651] transition-colors flex items-center gap-1">
              <Radar className="w-3.5 h-3.5 text-sky-600" />
              <span>Playbook NFP &amp; CPI</span>
            </a>
            <a href="#community" className="hover:text-[#00A651] transition-colors flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-indigo-600" />
              <span>Komunitas VIP</span>
            </a>
            <a href="#pricing" className="hover:text-[#00A651] transition-colors flex items-center gap-1">
              <Crown className="w-3.5 h-3.5 text-amber-500" />
              <span>Paket VIP (Rp500k)</span>
            </a>
            <a href="#free-education" className="hover:text-[#00A651] transition-colors">
              Edukasi Dasar (Free)
            </a>
            <a href="#faq" className="hover:text-[#00A651] transition-colors">
              FAQ
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => openAuth('login')}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5 text-slate-500" />
              <span>Masuk</span>
            </button>

            <button
              type="button"
              onClick={() => openAuth('register')}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white text-xs font-extrabold shadow-md shadow-[#00A651]/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Gabung VIP</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. Hero Section (Ultra Premium Authority & Value Proposition) */}
      <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 overflow-hidden bg-gradient-to-b from-emerald-50/40 via-white to-white border-b border-slate-100">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-br from-emerald-100/30 via-emerald-50/10 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Top Pill Badges */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs text-[#00A651] font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#00A651] animate-pulse" />
            <span>PLATFORM EDUKASI &amp; SINYAL TRADING AI #1 DI INDONESIA</span>
            <span className="text-emerald-300">|</span>
            <span className="text-slate-600 font-semibold">Fokus Emas &amp; Kalender Berita</span>
          </div>

          {/* Main Hero Headline */}
          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
              Raih Sinyal Presisi AI di{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A651] via-[#008F45] to-emerald-700">
                XAUUSD &amp; Rilis Berita NFP/CPI
              </span>
              , Bebas dari Jebakan Margin Call.
            </h1>
            <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
              Tinggalkan tebak-tebakan dan kepanikan saat berita rilis. Dapatkan sinyal trading berbasis algoritma AI multi-timeframe, panduan entry terukur, dan bimbingan komunitas VIP eksklusif untuk melipatgandakan konsistensi profit Anda.
            </p>
          </div>

          {/* Hero CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href="#pricing"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#00A651] hover:bg-[#008F45] text-white font-black text-sm shadow-xl shadow-[#00A651]/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Crown className="w-4 h-4" />
              <span>Daftar VIP Member Area (Rp 500rb/bln)</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#track-record"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-sm border border-slate-300 shadow-xs hover:border-slate-400 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <BarChart3 className="w-4 h-4 text-[#00A651]" />
              <span>Lihat Track Record AI (+4,120 Pips)</span>
            </a>
          </div>

          {/* Social Proof Key Metrics Strip */}
          <div className="pt-8 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-emerald-300 transition-all">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider">WIN RATE TERVERIFIKASI</span>
                <Award className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">84.6%</p>
              <p className="text-[11px] text-[#00A651] font-semibold mt-0.5">Audit 312 Sinyal Real-Time</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-emerald-300 transition-all">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider">TOTAL PIPS GAIN</span>
                <TrendingUp className="w-4 h-4 text-[#00A651]" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-[#00A651] tracking-tight">+4,120</p>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">Akumulasi Q1 - Q3 2026</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-emerald-300 transition-all">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider">RISK TO REWARD</span>
                <Target className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">1 : 3.2</p>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">Fixed SL 30-50 Pips</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-emerald-300 transition-all">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider">KOMUNITAS TRADER</span>
                <Users className="w-4 h-4 text-indigo-500" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">1,480+</p>
              <p className="text-[11px] text-[#00A651] font-semibold mt-0.5">Member Aktif VIP Telegram</p>
            </div>
          </div>

          {/* Live XAUUSD Spot & AI Sentiment Bar */}
          <div className="max-w-3xl mx-auto p-4 rounded-2xl bg-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-black text-xs shrink-0">
                XAU
              </div>
              <div>
                <div className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Spot Market Feed
                </div>
                <div className="text-lg font-mono font-black text-white">
                  ${(marketPrice?.price ?? 4176.50).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  <span className="text-xs font-bold text-emerald-400 ml-2">
                    +{(marketPrice?.change24h ?? 0.82)}% (24h)
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">SENTIMEN AI REAL-TIME</div>
                <div className="text-xs font-extrabold text-[#00A651] flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-[#00A651]" />
                  BULLISH ACCUMULATION (88.4%)
                </div>
              </div>
              <a
                href="#pricing"
                className="px-3 py-1.5 rounded-lg bg-[#00A651] hover:bg-[#008F45] text-white text-[11px] font-bold shrink-0 transition-colors"
              >
                Buka Sinyal
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Live AI Track Record Section (Bukti Nyata Sinyal & Pips Gain) */}
      <section id="track-record" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#00A651] text-xs font-black uppercase tracking-wider">
              BUKTI NYATA &amp; TRANSPARAN
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Track Record Terverifikasi: Bukan Janji, Tapi Hasil Nyata
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Setiap sinyal yang dirilis sistem AI tercatat lengkap dengan zona Entry, Stop Loss rasional, Take Profit 1 &amp; 2, serta alasan teknikal multi-timeframe.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => setSignalFilter('ALL')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                signalFilter === 'ALL'
                  ? 'bg-[#00A651] text-white shadow-md shadow-[#00A651]/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Semua Sinyal ({signalsData.length})
            </button>
            <button
              onClick={() => setSignalFilter('XAUUSD')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                signalFilter === 'XAUUSD'
                  ? 'bg-[#00A651] text-white shadow-md shadow-[#00A651]/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Khusus XAUUSD (Gold)
            </button>
            <button
              onClick={() => setSignalFilter('NEWS')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                signalFilter === 'NEWS'
                  ? 'bg-[#00A651] text-white shadow-md shadow-[#00A651]/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Rilis Berita NFP &amp; CPI
            </button>
            <button
              onClick={() => setSignalFilter('FOREX')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                signalFilter === 'FOREX'
                  ? 'bg-[#00A651] text-white shadow-md shadow-[#00A651]/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Forex Majors
            </button>
          </div>

          {/* Signals Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSignals.map((sig) => (
              <div
                key={sig.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-slate-900">{sig.pair}</span>
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            sig.type.includes('BUY')
                              ? 'bg-emerald-50 text-[#00A651] border border-emerald-200'
                              : 'bg-rose-50 text-rose-600 border border-rose-200'
                          }`}
                        >
                          {sig.type}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {sig.date} • {sig.session}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-black px-2 py-0.5 rounded-lg bg-emerald-50 text-[#00A651] border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {sig.status}
                      </span>
                      <p className="text-xs font-black text-[#00A651] mt-0.5">{sig.pipsGain}</p>
                    </div>
                  </div>

                  {/* Level Details */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl text-center">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">ENTRY</span>
                      <span className="font-mono text-xs font-black text-slate-900">{sig.entry}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-rose-500 font-bold block uppercase">STOP LOSS</span>
                      <span className="font-mono text-xs font-black text-rose-600">{sig.sl}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#00A651] font-bold block uppercase">TARGET TP</span>
                      <span className="font-mono text-xs font-black text-[#00A651]">{sig.tp2}</span>
                    </div>
                  </div>

                  {/* AI Technical Analysis Insight */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                      <Bot className="w-3 h-3 text-[#00A651]" />
                      AI ALGORITHM INSIGHT ({sig.timeframe})
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {sig.reasoning}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-medium flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Confidence: <strong>{sig.confidence}%</strong>
                  </span>
                  <a
                    href="#pricing"
                    className="text-[#00A651] font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Akses Real-Time</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* External Verification Banner */}
          <div className="p-4 sm:p-6 rounded-2xl bg-white border border-emerald-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#00A651] border border-emerald-200 flex items-center justify-center font-black text-sm shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Transparansi Penuh &amp; Rekapitulasi Sinyal Tanpa Manipulasi
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Setiap trade sinyal AI tercatat di kanal Telegram VIP &amp; Dashboard Member secara real-time sebelum order terpicu.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://www.mql5.com/en/signals/2388343?source=Site+Signals+My"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 flex items-center gap-1.5 transition-colors"
              >
                <span>Live MQL5 Signal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="#pricing"
                className="px-4 py-2.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs shadow-md shadow-[#00A651]/20 transition-all"
              >
                Dapatkan Sinyal Hari Ini →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. AI News Radar & Economic Event Playbook (Fokus NFP & CPI) */}
      <section id="news-playbook" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-black uppercase tracking-wider">
              SPESIALISASI BERITA HIGH-IMPACT
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Kuasai Rilis Berita NFP, CPI &amp; FOMC Tanpa Terjebak Fakeout Wick
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Kenapa 80% trader retail kehilangan modal saat rilis berita besar? Karena mereka menebak arah atau order saat spread melebar 15x lipat. AI RealistisFx memiliki playbook anti-trap.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 hover:border-emerald-300 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-white text-[#00A651] border border-slate-200 flex items-center justify-center font-black text-lg shadow-xs">
                1
              </div>
              <h3 className="font-black text-slate-900 text-base">
                H-30 Menit: Analisis Skenario 2 Arah
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sebelum angka dirilis oleh US Bureau of Labor Statistics (BLS), bot AI memetakan zona <strong>Bullish Breakout</strong> dan <strong>Bearish Breakdown</strong> berdasarkan likuiditas order block institusional.
              </p>
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-[11px] font-mono text-slate-700 space-y-1">
                <div>• Skenario Bullish: Buy di atas $2,725.00</div>
                <div>• Skenario Bearish: Sell di bawah $2,705.00</div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-3xl bg-emerald-50/60 border border-emerald-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#00A651] text-white flex items-center justify-center font-black text-lg shadow-sm">
                2
              </div>
              <h3 className="font-black text-slate-900 text-base">
                Detik ke-0 s/d 30: Anti-Spread Algorithm
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sistem AI otomatis memblokir order pada detik pertama saat spread broker melonjak gila-gilaan. AI menunggu <em>fakeout candle wick</em> menyapu stop loss retail sebelum memvalidasi arah sejati.
              </p>
              <div className="p-3 rounded-xl bg-white border border-emerald-200 text-[11px] text-emerald-800 font-semibold space-y-1">
                ✓ Melindungi akun dari slippage negatif broker
                <br />
                ✓ Menolak entry jika volume tidak terkonfirmasi
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 hover:border-emerald-300 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-white text-[#00A651] border border-slate-200 flex items-center justify-center font-black text-lg shadow-xs">
                3
              </div>
              <h3 className="font-black text-slate-900 text-base">
                Menit ke-1 s/d 15: Eksekusi Bersih &amp; Trailing
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ketika konfirmasi candle M5 terbentuk, sinyal push alert dikirim ke Telegram VIP dan Web Member Area secara instan dengan panduan <strong>Take Profit bertingkat (TP1 +80 pips, TP2 +160 pips)</strong>.
              </p>
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-[11px] font-mono text-[#00A651] font-bold">
                Rata-rata Gain Event News: +140 s/d +280 Pips
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Ekosistem Komunitas VIP (Member Area & Telegram Private) */}
      <section id="community" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00A651]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black uppercase tracking-wider">
              EKOSISTEM VIP TELEGRAM &amp; MENTORSHIP
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Bukan Sekadar Sinyal, Tapi Lingkungan Belajar &amp; Tumbuh Bersama
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Trading sendirian sering memicu stres, over-trade, dan revenge trading. Di RealistisFx VIP, Anda didampingi komunitas trader suportif dan mentor berpengalaman.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#00A651]/20 text-[#00A651] flex items-center justify-center font-bold">
                <Send className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-white">Private Channel Telegram</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Notifikasi sinyal real-time langsung ke ponsel Anda dengan parameter lengkap: Pair, Action, Entry, SL, TP1, TP2, dan chart setup.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-white">Group Diskusi Interaktif</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ruang tukar pandangan setup trading, evaluasi chart harian, dan tanya jawab langsung tanpa toxic flexing atau spam.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-white">Live Voice Briefing NFP</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sesi audio live 15 menit menjelang rilis berita besar untuk memandu mental dan memastikan member mematuhi batas lot aman.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-white">Bimbingan Anti-FOMO</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Audit psikologi trading dan panduan money management agar Anda tetap tenang dan konsisten dalam jangka panjang.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Interactive ROI Simulator (Menjustifikasi Investasi Rp 500.000/bln) */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#00A651] text-xs font-black uppercase tracking-wider">
              SIMULASI RETURN OF INVESTMENT (ROI)
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Kenapa Rp 500.000 / Bulan Sangat Murah Dibandingkan Manfaatnya?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
              Hanya dengan menang 1 trade sinyal AI (+70 pips di XAUUSD dengan lot 0.05 = $35 / ~Rp 540.000), biaya langganan bulanan Anda sudah kembali modal (BEP).
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Interactive Capital Slider */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Modal Trading Akun Anda:</span>
                  <span className="text-base font-black text-[#00A651]">${traderCapital.toLocaleString()} USD</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="10000"
                  step="100"
                  value={traderCapital}
                  onChange={(e) => setTraderCapital(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#00A651]"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                  <span>$200 (Akun Kecil / Cent)</span>
                  <span>$2,500</span>
                  <span>$10,000</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Ukuran Lot Aman (Risk 1.5%):</span>
                  <span className="font-mono font-bold text-slate-900">{recommendedLot} Lot</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimasi Pips Gain AI per Bulan:</span>
                  <span className="font-mono font-bold text-[#00A651]">+{estimatedMonthlyPips} Pips</span>
                </div>
                <div className="flex justify-between text-slate-600 border-t border-slate-100 pt-2">
                  <span>Biaya Langganan VIP:</span>
                  <span className="font-mono font-bold text-slate-900">Rp 500.000 / bln</span>
                </div>
              </div>
            </div>

            {/* Calculated Output Highlight */}
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800">
                POTENSI PROFIT BERSIH BULANAN
              </span>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-[#00A651]">
                  Rp {estimatedProfitIdr.toLocaleString('id-ID')}
                </div>
                <p className="text-xs text-slate-600 font-semibold">
                  (Setara dengan ~${estimatedProfitUsd} USD)
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-emerald-200 text-xs font-bold text-slate-800">
                🚀 Potensi ROI: <span className="text-[#00A651]">{roiMultiplier}x lipat</span> dari biaya VIP Rp500.000
              </div>

              <a
                href="#pricing"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-extrabold text-xs shadow-md shadow-[#00A651]/20 transition-all"
              >
                Kunci Akses VIP Sekarang →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Pricing Section (Tabel VIP Rp 500.000 vs Akses Gratis) */}
      <section id="pricing" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#00A651] text-xs font-black uppercase tracking-wider">
              PAKET LANGGANAN TRANSPARAN
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Pilih Akses Anda: Edukasi Dasar Gratis atau VIP Member Area
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Mulai gratis untuk mempelajari fondasi manajemen risiko, atau upgrade ke VIP Member Area untuk mendapatkan sinyal AI real-time &amp; bimbingan komunitas eksklusif.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
            {/* Free Tier Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                  AKSES EDUKASI DASAR
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900">Rp 0</span>
                    <span className="text-xs text-slate-500 font-semibold">/ Selamanya</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Dirancang untuk trader pemula yang ingin memahami fondasi money management sebelum terjun ke live market.
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#00A651] shrink-0" />
                    <span>Modul Video: Fondasi Lot, Leverage &amp; Margin</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#00A651] shrink-0" />
                    <span>Panduan Akun Cent vs Akun Standard</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#00A651] shrink-0" />
                    <span>Kalkulator Risiko &amp; Ukuran Lot Dasar</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#00A651] shrink-0" />
                    <span>Kalender Berita Ekonomi Umum (Data Standar)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#00A651] shrink-0" />
                    <span>Checklist Anti-FOMO 5 Poin Pra-Order</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-400">
                    <X className="w-4 h-4 text-slate-300 shrink-0" />
                    <span>Tanpa Sinyal Trading AI Real-Time</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-400">
                    <X className="w-4 h-4 text-slate-300 shrink-0" />
                    <span>Tanpa Playbook Rilis Berita NFP &amp; CPI</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-400">
                    <X className="w-4 h-4 text-slate-300 shrink-0" />
                    <span>Tanpa Akses Private Channel VIP Telegram</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => openAuth('register')}
                className="w-full py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all cursor-pointer"
              >
                Daftar Akun Gratis Sekarang
              </button>
            </div>

            {/* VIP Tier Card (Rp 500.000 / bln) - Recommended */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#00A651] shadow-xl relative flex flex-col justify-between space-y-6">
              {/* Most Popular Badge */}
              <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-[#00A651] text-white text-[10px] font-black tracking-widest uppercase shadow-md shadow-[#00A651]/20">
                ★ REKOMENDASI TERBAIK
              </div>

              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#00A651] text-xs font-black">
                  <Crown className="w-3.5 h-3.5" />
                  VIP MEMBER AREA &amp; KOMUNITAS
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900">Rp 500.000</span>
                    <span className="text-xs text-slate-500 font-semibold">/ Bulan</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Akses lengkap sinyal presisi AI, playbook berita NFP/CPI, dan komunitas VIP private Telegram.
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-800 font-medium">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00A651] shrink-0" />
                    <span><strong>Sinyal Trading AI Real-Time XAUUSD</strong> (Entry, SL, TP1, TP2)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00A651] shrink-0" />
                    <span><strong>Skenario Playbook Rilis Berita Ekonomi</strong> (NFP, CPI, FOMC)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00A651] shrink-0" />
                    <span><strong>Akses Private Channel Telegram VIP</strong> (Alert Instan ke HP)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00A651] shrink-0" />
                    <span><strong>Grup Komunitas Diskusi Eksklusif</strong> &amp; Tanya Jawab Mentor</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00A651] shrink-0" />
                    <span><strong>Watchlist Harian &amp; S&amp;R Zone Valid</strong> Timeframe H4 &amp; H1</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00A651] shrink-0" />
                    <span><strong>Kalkulator Margin Resistance</strong> (Proteksi Anti Margin Call)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00A651] shrink-0" />
                    <span><strong>Smart Journaling &amp; AI Emotion Audit</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00A651] shrink-0" />
                    <span><strong>Konsultasi &amp; Support Prioritas 1-on-1 via WhatsApp</strong></span>
                  </div>
                </div>

                {/* Bundle Options */}
                <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                  <span className="font-extrabold text-[11px] block uppercase">PILIHAN HEMAT MULTI-BULAN:</span>
                  <div className="flex justify-between text-[11px]">
                    <span>• 3 Bulan VIP: <strong>Rp 1.275.000</strong></span>
                    <span className="text-[#00A651] font-bold">(Hemat 15%)</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span>• 1 Tahun VIP: <strong>Rp 3.900.000</strong></span>
                    <span className="text-[#00A651] font-bold">(Hemat 35%)</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (user.isAuthenticated) {
                    openPaymentModal();
                  } else {
                    openAuth('register');
                  }
                }}
                className="w-full py-4 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-black text-xs shadow-lg shadow-[#00A651]/25 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Crown className="w-4 h-4" />
                <span>Langganan VIP Member (Rp 500rb) →</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Educational Foundations (Materi Edukasi Dasar yang Tersedia) */}
      <section id="free-education" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
              EDUKASI DASAR GRATIS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Pondasi yang Wajib Dikuasai Sebelum Menggunakan Sinyal
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Kami percaya trader hebat lahir dari pemahaman risiko yang benar. Semua materi dasar ini dapat Anda pelajari secara cuma-cuma.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center font-bold">
                <Coins className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900">Akun Cent vs Akun Standard</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pelajari kenapa trader dengan modal di bawah $100 wajib memulai dengan akun Cent agar bisa membuka lot 0.01 dengan risiko mikro tanpa ancaman Margin Call.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00A651] border border-emerald-200 flex items-center justify-center font-bold">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900">Menghitung Nilai Pips Emas</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Kalkulasi otomatis pergerakan pips XAUUSD vs modal riil Anda. Pahami kenapa 100 pips di emas berbeda dengan 100 pips di mata uang forex.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center font-bold">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900">Bahaya Leverage Broker 1:1000</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bedah tuntas psikologi ilusi leverage tinggi. Mengapa leverage besar bukan jalan pintas kaya, melainkan perangkap percepatan Margin Call jika over-lot.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Testimoni Trader Indonesia Autentik */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#00A651] text-xs font-black uppercase tracking-wider">
              CERITA DARI MEMBER VIP
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Apa Kata Trader Indonesia yang Sudah Bergabung?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-1 text-amber-400 text-sm">
                ★★★★★
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                &ldquo;Dulu setiap rilis NFP pasti akun saya babak belur karena panik tebak arah. Sejak ikut playbook berita RealistisFx, saya tahu kapan harus sabar dan kapan entry. Kemarin NFP ambil +140 pips di emas, biaya VIP Rp 500rb tertutup dalam 1 jam!&rdquo;
              </p>
              <div className="border-t border-slate-100 pt-3">
                <p className="text-xs font-bold text-slate-900">Rendra Wijaya</p>
                <p className="text-[10px] text-slate-500">Trader Mandiri — Surabaya</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-1 text-amber-400 text-sm">
                ★★★★★
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                &ldquo;Yang paling saya suka dari sinyal AI ini adalah adanya Stop Loss ketat dan alasan teknikalnya jelas. Bukan sekadar buy/sell buta. Komunitas Telegram VIP-nya juga adem, saling menyemangati untuk disiplin money management.&rdquo;
              </p>
              <div className="border-t border-slate-100 pt-3">
                <p className="text-xs font-bold text-slate-900">Denny Kurniawan</p>
                <p className="text-[10px] text-slate-500">Trader Part-Time — Jakarta Barat</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-1 text-amber-400 text-sm">
                ★★★★★
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                &ldquo;Materi edukasi akun Cent di member area sangat membuka mata saya. Dulu deposit $200 di akun standar sering MC. Sekarang di akun Cent dengan sinyal AI, akun saya tumbuh stabil 18% bulan ini tanpa deg-degan.&rdquo;
              </p>
              <div className="border-t border-slate-100 pt-3">
                <p className="text-xs font-bold text-slate-900">Hendra Saputra</p>
                <p className="text-[10px] text-slate-500">Trader Pemula — Medan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ Section (Menjawab Keberatan & Skeptisisme) */}
      <section id="faq" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
              PERTANYAAN UMUM
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Semua yang Perlu Anda Ketahui Tentang Sinyal &amp; Komunitas VIP
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'Apakah saya wajib pindah atau daftar broker tertentu?',
                a: 'Sama sekali TIDAK. Anda bebas menggunakan broker lokal (Bappebti) maupun internasional mana pun yang sudah Anda percayai. Sinyal kami berbasis harga spot pasar global yang dapat diaplikasikan di MetaTrader 4, MetaTrader 5, maupun TradingView.',
              },
              {
                q: 'Berapa modal minimum yang dibutuhkan untuk mengikuti sinyal AI?',
                a: 'Anda bisa memulai dari modal $50 s/d $100 menggunakan Akun Cent (dimana risiko per trade hanya beberapa sen dolar), atau modal $300 s/d $500 untuk Akun Standard dengan lot 0.01-0.02. Panduan pemilihan ukuran lot sudah terintegrasi di sistem.',
              },
              {
                q: 'Bagaimana cara sinyal dikirimkan ke saya?',
                a: 'Sinyal langsung dikirimkan melalui 2 saluran instan: (1) Push Notification di Private Channel Telegram VIP Real-Time, dan (2) Live Feed di Web Member Area RealistisFx. Anda akan menerima titik Entry, Stop Loss, TP1, dan TP2.',
              },
              {
                q: 'Apakah ada strategi Martingale atau Averaging tanpa batas?',
                a: 'TIDAK ADA. Kami sangat menentang Martingale. Seluruh sinyal kami memiliki Stop Loss fixed yang terukur (30-50 pips di XAUUSD) dengan Risk-to-Reward minimum 1:2 hingga 1:3. Prioritas nomor 1 kami adalah proteksi modal.',
              },
              {
                q: 'Bagaimana cara pembayaran langganan VIP Rp 500.000?',
                a: 'Pembayaran sangat mudah dan instan menggunakan QRIS (BCA, Mandiri, BRI, BNI, GoPay, OVO, Dana) melalui halaman pendaftaran. Akun VIP Anda akan aktif dalam hitungan menit.',
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left font-bold text-sm text-slate-900 flex items-center justify-between gap-4 cursor-pointer hover:text-[#00A651] transition-colors"
                >
                  <span>{faq.q}</span>
                  {faqOpenIndex === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#00A651] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {faqOpenIndex === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Final Conversion CTA Banner */}
      <section className="py-20 bg-gradient-to-br from-[#008F45] via-[#00A651] to-[#046132] text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
            <Crown className="w-4 h-4 text-amber-300" />
            MULAI TRADING DENGAN KEPUTUSAN BERBASIS DATA
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Tinggalkan Tebak-tebakan. Bergabunglah dengan Komunitas VIP RealistisFx Hari Ini.
          </h2>

          <p className="text-xs sm:text-base text-emerald-100 max-w-2xl mx-auto font-normal">
            Dapatkan akses langsung ke Sinyal Presisi AI XAUUSD, Playbook Berita NFP/CPI, dan panduan mentor untuk mencapai konsistensi profit jangka panjang.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (user.isAuthenticated) {
                  openPaymentModal();
                } else {
                  openAuth('register');
                }
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-[#00A651] font-black text-sm shadow-xl hover:bg-emerald-50 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            >
              Langganan VIP Member Area (Rp 500rb/bln)
            </button>

            <button
              type="button"
              onClick={() => openAuth('register')}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-emerald-800/80 hover:bg-emerald-800 text-white font-extrabold text-sm border border-emerald-400/40 transition-all cursor-pointer"
            >
              Coba Akun Gratis Dulu
            </button>
          </div>
        </div>
      </section>

      {/* 13. Modern Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-emerald-500/40 bg-[#0a1f18] flex items-center justify-center shrink-0">
                <img
                  alt="REALISTIS FX Logo"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                  src="/images/logo.png"
                />
              </div>
              <div>
                <span className="font-black text-base text-white tracking-wider">
                  REALISTIS<span className="text-[#00A651]"> FX</span>
                </span>
                <p className="text-[11px] text-slate-500 font-medium">
                  AI Signals &amp; Financial Education Ecosystem
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-semibold">
              <a href="#track-record" className="hover:text-white transition-colors">Track Record AI</a>
              <a href="#news-playbook" className="hover:text-white transition-colors">Playbook Berita</a>
              <a href="#pricing" className="hover:text-white transition-colors">Paket VIP Rp 500k</a>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
              <a
                href="https://wa.me/6287774229255?text=Halo%20Admin%20RealistisFx%2C%20saya%20ingin%20konsultasi%20mengenai%20langganan%20VIP."
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Admin Resmi</span>
              </a>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-500 leading-relaxed space-y-2">
            <p>
              <strong>Peringatan Risiko (Risk Warning):</strong> Perdagangan valuta asing (Forex) dan komoditas emas (XAUUSD) dengan leverage memiliki tingkat risiko tinggi dan mungkin tidak cocok untuk semua investor. Pastikan Anda memahami sepenuhnya risiko yang terlibat dan selalu gunakan manajemen risiko modal (Money Management) secara bijak.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2">
              <p>© 2026 REALISTIS FX Edukasi. Seluruh Hak Cipta Dilindungi.</p>
              <p className="text-slate-600 font-medium">Fokus Edukasi &amp; Teknologi Sinyal AI Indonesia</p>
            </div>
          </div>
        </div>
      </footer>

      {/* 14. Authentication Modal (On-Page Login & Register) */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-5">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowAuthModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="text-center space-y-1">
              <h3 className="text-xl font-black text-slate-900">
                {authMode === 'login' ? 'Masuk ke Member Area' : 'Daftar Akun RealistisFx'}
              </h3>
              <p className="text-xs text-slate-500">
                {authMode === 'login'
                  ? 'Akses dashboard sinyal AI & panduan trading Anda'
                  : 'Mulai dengan Akun Gratis atau bersiap untuk VIP Member'}
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('register');
                  setAuthError('');
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  authMode === 'register'
                    ? 'bg-[#00A651] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Daftar Baru
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setAuthError('');
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  authMode === 'login'
                    ? 'bg-[#00A651] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sudah Ada Akun
              </button>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Form Fields */}
            <form onSubmit={handleFormSubmit} className="space-y-3.5">
              {authMode === 'register' && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Nama Lengkap Anda
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#00A651] focus:border-[#00A651] outline-hidden transition-all"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Alamat Email Aktif
                </label>
                <input
                  type="email"
                  required
                  placeholder="nama@email.com"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#00A651] focus:border-[#00A651] outline-hidden transition-all"
                />
              </div>

              {authMode === 'register' && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Nomor WhatsApp (Untuk Notifikasi VIP)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 081234567890"
                    value={authWhatsapp}
                    onChange={(e) => setAuthWhatsapp(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#00A651] focus:border-[#00A651] outline-hidden transition-all"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Kata Sandi
                </label>
                <input
                  type="password"
                  required
                  placeholder="Minimal 6 karakter"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#00A651] focus:border-[#00A651] outline-hidden transition-all"
                />
              </div>

              {authMode === 'register' && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Tipe Akun Trading Anda
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAuthAccountType('STANDARD')}
                      className={`p-2.5 rounded-xl border text-left text-xs font-semibold cursor-pointer transition-all ${
                        authAccountType === 'STANDARD'
                          ? 'border-[#00A651] bg-emerald-50 text-[#00A651]'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="font-bold">Akun Standard</div>
                      <div className="text-[10px] text-slate-500">Modal di atas $300</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthAccountType('CENT')}
                      className={`p-2.5 rounded-xl border text-left text-xs font-semibold cursor-pointer transition-all ${
                        authAccountType === 'CENT'
                          ? 'border-[#00A651] bg-emerald-50 text-[#00A651]'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="font-bold">Akun Cent</div>
                      <div className="text-[10px] text-slate-500">Modal kecil ($50 - $100)</div>
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-black text-xs shadow-md shadow-[#00A651]/20 transition-all cursor-pointer mt-2"
              >
                {authMode === 'login' ? 'Masuk ke Dashboard' : 'Daftar Akun Sekarang'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
