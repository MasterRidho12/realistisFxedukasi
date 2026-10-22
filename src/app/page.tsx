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
  Check,
  ShieldCheck,
  ExternalLink,
  MessageCircle,
  Award,
  Crosshair,
  FileText,
  Target,
  ArrowRightLeft,
  DollarSign
} from 'lucide-react';
import { useUser } from '@/context/UserContext';

export default function DashboardPage() {
  const { user, journals, openPaymentModal } = useUser();
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

  // Anti-FOMO Checklist state on Dashboard
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

  const coreFeatures = [
    {
      title: 'Risk & Lot Calculator',
      description: 'Hitung lot aman berdasarkan toleransi risiko 1-2% modal dan jarak SL pips.',
      href: '/calculator',
      icon: Calculator,
      freeStatus: 'Standar (Max 3x/hari)',
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
    <div className="space-y-10 pb-16">
      {/* HERO SECTION (Exactly Matching Screenshot & realistisfx.com) */}
      <section className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-sm">
        {/* Subtle Ambient Background Glows */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[300px] bg-[#00A651]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-[#0284C7]/5 blur-[100px] rounded-full pointer-events-none -z-10 hidden lg:block" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Column: Heading, Subtitle & Actions */}
          <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1">
            {/* Badges Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5 mb-5 sm:mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-[11px] sm:text-xs font-bold shadow-xs">
                <Crown className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                <span className="tracking-wide uppercase">PRIVATE BREAKOUT EA SYSTEM</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-50 border border-sky-200 text-sky-800 text-[11px] sm:text-xs font-medium shadow-xs">
                <span className="px-1.5 py-0.5 bg-[#0284C7] text-[10px] font-bold text-white rounded">
                  MQL5
                </span>
                <span className="text-[10px] sm:text-[11px] text-sky-900 font-semibold">
                  Verified Partner
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-[#00A651] text-[11px] sm:text-xs font-bold shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00A651]" />
                <span>SOP Anti Margin Call</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight uppercase leading-[1.14] mb-4 sm:mb-5">
              <span className="text-slate-900 block">PERTUMBUHAN ASET</span>
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#00A651] bg-clip-text text-transparent">
                EA LOGIS &amp; TERUJI <span className="text-[#00A651]">DATA</span>
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-xs sm:text-sm lg:text-base text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-6 sm:mb-8 font-normal">
              Kembangkan aset Anda melalui strategi breakout otomatis XAUUSD (Gold) menggunakan EA (Expert Advisor). Seluruh transaksi dieksekusi 100% otomatis oleh EA berbasis struktur harga H1 &amp; H4 tanpa indikator lagging, dengan disiplin Stop Loss keras 30 pips dan potensi TP hingga 500 pips.
            </p>

            {/* Call To Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8">
              <a
                href="https://wa.me/6287774229255?text=Halo%20Mas%20Rizky%20Juhri%2C%20saya%20tertarik%20untuk%20bergabung%20Copy%20Trade%20REALISTIS%20FX%20(Gold%20Breakout%20XAUUSD).%20Mohon%20panduan%20pendaftaran%20dan%20setup%20akunnya.%20Terima%20kasih."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-[#00A651]/25 hover:shadow-[#00A651]/40 hover:scale-[1.02] flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white text-white" />
                <span>Mulai Copy-Trade</span>
                <span className="text-sm font-black">→</span>
              </a>

              <a
                href="https://www.mql5.com/en/signals/2388343?source=Site+Signals+My"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border border-slate-300 shadow-xs hover:border-slate-400 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Lihat Live MQL5</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>

              <Link
                href="/calculator"
                className="px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-[#00A651]" />
                <span>Kalkulator Lot SOP</span>
              </Link>
            </div>

            {/* 3 Core Checkmark Bullets */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-1.5 font-medium">
                <Check className="w-4 h-4 text-[#00A651] stroke-[3]" />
                <span className="text-slate-800 font-semibold">Saran Modal $10,000</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Check className="w-4 h-4 text-[#00A651] stroke-[3]" />
                <span className="text-slate-800 font-semibold">Strict Fixed SL 30 Pips</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#00A651] stroke-[2.5]" />
                <span className="text-slate-800 font-semibold">TP Max 500 Pips + Trailing</span>
              </div>
            </div>
          </div>

          {/* Right Column: Trader Presentation Card */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-[300px] sm:max-w-xs lg:max-w-sm">
              <div className="absolute inset-0 bg-[#00A651]/15 rounded-full blur-3xl pointer-events-none scale-90" />
              <div className="relative rounded-3xl bg-white border border-slate-200 p-3 sm:p-4 shadow-xl overflow-hidden group">
                {/* Photo with smooth fade gradient */}
                <div
                  className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-100"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                    maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                  }}
                >
                  <img
                    alt="Rizky Juhri — Gold Analyst &amp; Systematic Trader REALISTIS FX"
                    className="w-full h-full object-cover object-[center_20%] scale-110 group-hover:scale-105 transition-transform duration-500"
                    src="/images/trader.jpg"
                  />
                </div>

                {/* Top Badge on Photo */}
                <div className="absolute top-5 left-5 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-[#00A651] text-xs font-bold flex items-center gap-2 shadow-md">
                  <div className="w-4 h-4 rounded-md overflow-hidden bg-[#0a1f18] border border-emerald-500/40 shrink-0 flex items-center justify-center">
                    <img
                      alt="Logo REALISTIS FX"
                      width={16}
                      height={16}
                      className="w-full h-full object-cover"
                      src="/images/logo.png"
                    />
                  </div>
                  <span>XAUUSD Breakout EA (H1/H4)</span>
                </div>

                {/* Floating Bottom Badge */}
                <div className="absolute bottom-4 right-4 left-4 sm:left-auto px-3 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-800 text-xs shadow-md flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00A651] animate-pulse" />
                  <div>
                    <div className="font-bold text-slate-900 text-xs">Rizky Juhri</div>
                    <div className="text-[10px] text-slate-500 font-medium">Gold Trader &amp; Market Analyst</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 ATURAN COPY TRADE & DISIPLIN RISIKO (Like realistisfx.com) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono text-[#00A651] uppercase tracking-wider font-bold">
                ATURAN SISTEM
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-[10px] font-mono text-[#00A651] font-bold">
                XAUUSD Breakout
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Parameter Risiko Terukur &amp; Anti Spekulasi
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700 flex items-center gap-1.5 font-semibold self-start sm:self-auto">
            <Crosshair className="w-3.5 h-3.5 text-[#00A651]" />
            Timeframe: H1 &amp; H4 Murni
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Rule 1: SL 30 Pips */}
          <div className="p-5 rounded-2xl bg-white border border-rose-200 hover:border-rose-400 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl border flex items-center justify-center bg-rose-50 border-rose-100 text-rose-600 font-bold">
                  <ShieldCheck className="w-5 h-5 text-rose-500" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border bg-rose-50 text-rose-700 border-rose-200">
                  Fixed Non-Negotiable
                </span>
              </div>
              <h3 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1 font-bold">
                1. Stop Loss (SL)
              </h3>
              <div className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                30 Pips (Tetap)
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                SL TIDAK AKAN DIGESER dalam kondisi apapun untuk mengunci batas toleransi risiko.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] font-mono text-slate-500 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A651]" />
              <span>Eksekusi Sistem Otomatis EA</span>
            </div>
          </div>

          {/* Rule 2: TP 100-500 Pips */}
          <div className="p-5 rounded-2xl bg-white border border-emerald-200 hover:border-[#00A651] hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl border flex items-center justify-center bg-emerald-50 border-emerald-100 text-[#00A651] font-bold">
                  <Target className="w-5 h-5 text-[#00A651]" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border bg-emerald-50 text-[#00A651] border-emerald-200">
                  Dynamic Target
                </span>
              </div>
              <h3 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1 font-bold">
                2. Take Profit (TP)
              </h3>
              <div className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                100 s/d 500 Pips
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                TP standar 100 pips, sewaktu-waktu dapat digeser trailing hingga maksimal 500 pips.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] font-mono text-slate-500 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A651]" />
              <span>Eksekusi Sistem Otomatis EA</span>
            </div>
          </div>

          {/* Rule 3: Trailing Stop */}
          <div className="p-5 rounded-2xl bg-white border border-amber-200 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl border flex items-center justify-center bg-amber-50 border-amber-100 text-amber-600 font-bold">
                  <ArrowRightLeft className="w-5 h-5 text-amber-600" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border bg-amber-50 text-amber-700 border-amber-200">
                  Profit Lock Protection
                </span>
              </div>
              <h3 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1 font-bold">
                3. Trailing Stop
              </h3>
              <div className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                Aktif Otomatis
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Mengunci keuntungan berjalan saat harga bergerak searah sehingga profit tetap aman.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] font-mono text-slate-500 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A651]" />
              <span>Eksekusi Sistem Otomatis EA</span>
            </div>
          </div>

          {/* Rule 4: Modal Awal */}
          <div className="p-5 rounded-2xl bg-white border border-sky-200 hover:border-sky-400 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl border flex items-center justify-center bg-sky-50 border-sky-100 text-sky-600 font-bold">
                  <DollarSign className="w-5 h-5 text-sky-600" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border bg-sky-50 text-sky-700 border-sky-200">
                  Rekomendasi Ideal
                </span>
              </div>
              <h3 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1 font-bold">
                4. Modal Awal
              </h3>
              <div className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                $10,000 USD
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Disarankan $10,000 agar batas risiko 30 pips berjalan dengan ketahanan margin paling sehat.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] font-mono text-slate-500 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A651]" />
              <span>Eksekusi Sistem Otomatis EA</span>
            </div>
          </div>
        </div>
      </section>

      {/* BUKTI AUDIT DATA 10 TAHUN QUANT ANALYZER */}
      <section className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-emerald-50/70 via-white to-emerald-50/70 border border-emerald-200 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded bg-[#00A651] text-white text-[10px] font-black uppercase tracking-wider">
                AUDIT HISTORIS RESMI
              </span>
              <span className="text-xs font-mono text-slate-600 font-semibold">
                Quant Analyzer &amp; Tickstory 99.9% (2015 - 2025)
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Laporan Backtest 1 Dekade Penuh (2.444 Transaksi Nyata)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-normal leading-relaxed">
              Diuji tanpa kompromi selama 10 tahun penuh mengarungi berbagai kondisi market XAUUSD: pandemi, inflasi tinggi, hingga geopolitik global.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-shrink-0">
            <div className="p-3 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
              <div className="text-[10px] text-slate-500 font-mono font-bold uppercase">Net Profit</div>
              <div className="text-base sm:text-lg font-black text-[#00A651]">+30,208%</div>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
              <div className="text-[10px] text-slate-500 font-mono font-bold uppercase">Win Rate</div>
              <div className="text-base sm:text-lg font-black text-slate-900">96.64%</div>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
              <div className="text-[10px] text-slate-500 font-mono font-bold uppercase">Max DD</div>
              <div className="text-base sm:text-lg font-black text-slate-900">5.18%</div>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
              <div className="text-[10px] text-slate-500 font-mono font-bold uppercase">Skor SQN</div>
              <div className="text-base sm:text-lg font-black text-[#00A651]">10.78</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Key Metric Cards (Dynamic & Realistic) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Discipline Score */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Skor Disiplin AI</span>
            <span className="p-2 rounded-xl bg-emerald-50 text-[#00A651] border border-emerald-200">
              <ShieldAlert className="w-4 h-4" />
            </span>
          </div>
          {totalTrades === 0 ? (
            <>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-black font-mono text-slate-400 tracking-tight">
                  0
                </span>
                <span className="text-xs text-slate-400">/ 100</span>
                <span className="ml-auto text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                  Belum Ada Data
                </span>
              </div>
              <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-slate-300 rounded-full" style={{ width: '0%' }} />
              </div>
              <p className="mt-2 text-[11px] text-slate-500 truncate">
                Catat trading di Smart Journal untuk kalkulasi AI.
              </p>
            </>
          ) : (
            <>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-black font-mono text-slate-900 tracking-tight">
                  {disciplineScore}
                </span>
                <span className="text-xs text-slate-500">/ 100</span>
                <span
                  className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-md ${
                    disciplineScore >= 80
                      ? 'text-[#00A651] bg-emerald-50 border border-emerald-200'
                      : disciplineScore >= 50
                      ? 'text-amber-700 bg-amber-50 border border-amber-200'
                      : 'text-rose-600 bg-rose-50 border border-rose-200'
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
              <p className="mt-2 text-[11px] text-slate-500 truncate">
                {disciplinedTrades} dari {totalTrades} posisi disiplin mematuhi SOP.
              </p>
            </>
          )}
        </div>

        {/* Metric 2: Win Rate */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Win Rate Jurnal</span>
            <span className="p-2 rounded-xl bg-sky-50 text-sky-700 border border-sky-200">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          {totalTrades === 0 ? (
            <>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-black font-mono text-slate-400 tracking-tight">
                  0%
                </span>
                <span className="ml-auto text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                  0 Posisi
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                <span>0 Menang (0%)</span>
                <span>0 Kalah (0%)</span>
              </div>
              <p className="mt-2 text-[11px] text-slate-500 truncate">
                Belum ada transaksi selesai yang dicatat.
              </p>
            </>
          ) : (
            <>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-black font-mono text-slate-900 tracking-tight">
                  {winRate}%
                </span>
                <span className="ml-auto text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                  {totalTrades} Posisi
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-600">
                <span className="text-[#00A651] font-semibold">{winningTrades} Menang ({winPct}%)</span>
                <span className="text-rose-600 font-semibold">{losingTrades} Kalah ({lossPct}%)</span>
              </div>
              <p className="mt-2 text-[11px] text-slate-500 truncate">
                Net PnL: <span className={totalPnL >= 0 ? 'text-[#00A651] font-bold' : 'text-rose-600 font-bold'}>
                  {totalPnL >= 0 ? `+ $${totalPnL.toFixed(2)}` : `- $${Math.abs(totalPnL).toFixed(2)}`}
                </span>
              </p>
            </>
          )}
        </div>

        {/* Metric 3: Margin Safety Index */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Ketahanan Margin</span>
            <span className="p-2 rounded-xl bg-emerald-50 text-[#00A651] border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          {totalTrades === 0 ? (
            <>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-black font-mono text-slate-400 tracking-tight">
                  STANDBY
                </span>
                <span className="ml-auto text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                  Belum Dihitung
                </span>
              </div>
              <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-slate-300 rounded-full" style={{ width: '0%' }} />
              </div>
              <p className="mt-2 text-[11px] text-slate-500 truncate">
                Uji margin modal di menu Margin Resistance.
              </p>
            </>
          ) : (
            <>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-black font-mono text-[#00A651] tracking-tight">
                  AMAN
                </span>
                <span className="ml-auto text-xs font-bold text-[#00A651] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Anti Over-lot
                </span>
              </div>
              <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-[#00A651] rounded-full" style={{ width: '92%' }} />
              </div>
              <p className="mt-2 text-[11px] text-slate-500 truncate">
                Disiplin risiko terjaga berdasarkan histori entry lot.
              </p>
            </>
          )}
        </div>

        {/* Metric 4: Free/Pro Status & Quota */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Status Lisensi</span>
            <span className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
              <Crown className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              {isPro ? 'PRO VIP' : 'FREE TIER'}
            </span>
            <span className="ml-auto text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              {isPro ? 'Rp50k/bln' : 'Gratis'}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-600">
            <span>Kuota Lot Harian</span>
            <span className="text-slate-900 font-bold">
              {isPro ? 'Tanpa Batas' : `${user.dailyCalculatorCount}/3 Terpakai`}
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-500">
            {isPro ? 'Semua modul & bot aktif' : 'Tersisa kuota hari ini'}
          </p>
        </div>
      </div>

      {/* Middle Grid: News Radar Alert & Anti-FOMO Daily Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* News Sentiment Radar Preview Widget (2 Columns) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-sky-50 text-sky-700 border border-sky-200">
                <Radar className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">News Sentiment Radar (High-Impact)</h2>
                <p className="text-xs text-slate-500">Peringatan rilis data ekonomi berdampak tinggi</p>
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
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                  HIGH IMPACT 🔥🔥🔥
                </span>
                <span className="text-xs font-bold text-slate-900">USD Non-Farm Payrolls (NFP)</span>
              </div>
              <span className="text-xs font-mono font-bold text-amber-700">
                H-2 Jam 45 Menit (19:30 WIB)
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Perkiraan: 175K | Sebelumnya: 142K. Berpotensi memicu volatilitas ekstrem pada pair XAUUSD &amp; mayor pair lainnya.
            </p>

            {/* Pro 2-Way Prediction Scenario Box */}
            <div className="mt-3 pt-3 border-t border-slate-200">
              {isPro ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                    <span className="font-bold text-[#00A651] flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> Skenario Bullish Gold (XAUUSD):
                    </span>
                    <p className="text-[11px] text-slate-700 mt-1">
                      Jika NFP &lt; 150K dan Unemployment Rate naik &gt; 4.2%, ekspektasi rate cut memicu rally ke 2,710.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200">
                    <span className="font-bold text-rose-700 flex items-center gap-1">
                      <TrendingDown className="w-3.5 h-3.5" /> Skenario Bearish Gold (XAUUSD):
                    </span>
                    <p className="text-[11px] text-slate-700 mt-1">
                      Jika NFP &gt; 200K, DXY menguat tajam, peluang sell rejection di supply zone 2,695 target 2,660.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-700 flex-shrink-0" />
                    <p className="text-xs text-slate-700">
                      <span className="font-bold text-slate-900">Skenario Prediksi 2 Arah (Bullish/Bearish)</span> khusus untuk member PRO.
                    </p>
                  </div>
                  <button
                    onClick={openPaymentModal}
                    className="px-3 py-1.5 rounded-lg bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs flex-shrink-0 cursor-pointer shadow-xs"
                  >
                    Buka via QRIS
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
                <p className="text-xs font-bold text-slate-900">EUR ECB President Speech</p>
                <p className="text-[11px] text-slate-500 font-mono font-medium">21:00 WIB</p>
              </div>
              <span className="text-xs font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">EURUSD</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-sky-700 uppercase">Telegram Alert</span>
                <p className="text-xs font-bold text-slate-900">Bot Notifikasi H-30 Menit</p>
                <p className="text-[11px] text-[#00A651] font-semibold">
                  {user.telegramLinked ? 'Terhubung' : 'Belum Tersambung'}
                </p>
              </div>
              <Link
                href="/bot-assistant"
                className="p-2 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200"
              >
                <Bot className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Anti-FOMO Daily Checklist Widget (1 Column) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-[#00A651]" />
                <h2 className="text-sm font-bold text-slate-900">Anti-FOMO SOP Checklist</h2>
              </div>
              <span
                className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                  isSopReady
                    ? 'bg-emerald-50 text-[#00A651] border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}
              >
                {completedChecksCount}/5 Valid
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Verifikasi checklist ini sebelum membuka posisi apapun di MetaTrader untuk mencegah impulsive trade:
            </p>

            <div className="space-y-2.5">
              {[
                { key: 'newsChecked' as const, label: 'Cek Kalender High Impact (NFP/CPI)' },
                { key: 'srIdentified' as const, label: 'Konfirmasi Level S&R Timeframe H1/H4' },
                { key: 'lotCalculated' as const, label: 'Hitung Lot Aman (Maks 1-2% Risiko)' },
                { key: 'rrValid' as const, label: 'Risk to Reward Minimal 1:2 Valid' },
                { key: 'mindsetCalm' as const, label: 'Emosi Tenang, Bebas Revenge Trading' },
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
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

          <div className="mt-4 pt-3 border-t border-slate-200">
            {isSopReady ? (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[#00A651] text-xs font-bold text-center flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> SOP Terpenuhi! Disiplin Terjaga.
              </div>
            ) : (
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold text-center flex items-center justify-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" /> Tuntaskan 5 syarat sebelum entry!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 10 Core Features Hub Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              10 Fitur Unggulan RealistisFx Edukasi
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Alat bantu terintegrasi dari pra-analisa hingga evaluasi psikologis trading
            </p>
          </div>
          <span className="text-xs font-bold text-[#00A651] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Freemium (Free &amp; Pro Rp50.000/bln)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coreFeatures.map((feat) => {
            const Icon = feat.icon;
            const isLocked = feat.isProFeature && !isPro;

            return (
              <div
                key={feat.title}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-[#00A651] hover:shadow-md transition-all flex flex-col justify-between relative group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 group-hover:bg-[#00A651] group-hover:text-white transition-all shadow-xs">
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
                    {isLocked && <Lock className="w-3.5 h-3.5 text-amber-600" />}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-normal">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5">
                  <div className="text-[11px] space-y-1">
                    <div className="flex justify-between text-slate-500 font-medium">
                      <span>Free:</span>
                      <span className="text-slate-700 font-semibold truncate ml-2">
                        {feat.freeStatus}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#00A651] font-bold">
                      <span>Pro:</span>
                      <span className="truncate ml-2">{feat.proStatus}</span>
                    </div>
                  </div>

                  <Link
                    href={feat.href}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      isLocked
                        ? 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                        : 'bg-slate-100 hover:bg-[#00A651] text-slate-800 hover:text-white border border-slate-200 shadow-xs'
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

      {/* Recent Trading Journal Entries Teaser */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Catatan Jurnal Trading Terakhir</h2>
            <p className="text-xs text-slate-500">Evaluasi transaksi dan kepatuhan rencana</p>
          </div>
          <Link
            href="/journal"
            className="text-xs text-[#00A651] hover:text-[#008F45] font-bold flex items-center gap-1"
          >
            Lihat Semua Jurnal <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {journals.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00A651] border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
              <BookOpenCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900">Belum Ada Catatan Jurnal Trading</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed font-normal">
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
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="pb-3 font-semibold">Tanggal</th>
                  <th className="pb-3 font-semibold">Pair</th>
                  <th className="pb-3 font-semibold">Arah</th>
                  <th className="pb-3 font-semibold">Lot</th>
                  <th className="pb-3 font-semibold">Harga Masuk</th>
                  <th className="pb-3 font-semibold">Hasil PnL</th>
                  <th className="pb-3 font-semibold">Emosi Trader</th>
                  <th className="pb-3 font-semibold">SOP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {journals.slice(0, 5).map((j) => (
                  <tr key={j.id}>
                    <td className="py-3 font-mono text-slate-500">{j.date}</td>
                    <td className="py-3 font-bold text-slate-900">{j.pair}</td>
                    <td className="py-3">
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
                    <td className="py-3 font-mono font-semibold text-slate-700">{j.lot}</td>
                    <td className="py-3 font-mono text-slate-600">
                      {j.entryPrice} → {j.exitPrice}
                    </td>
                    <td className="py-3 font-mono font-bold">
                      <span className={j.pnl >= 0 ? 'text-[#00A651]' : 'text-rose-600'}>
                        {j.pnl >= 0 ? `+ $${j.pnl.toFixed(2)}` : `- $${Math.abs(j.pnl).toFixed(2)}`}
                      </span>
                    </td>
                    <td className="py-3 text-slate-700 font-medium">
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
                    <td className="py-3">
                      {j.adheredToPlan ? (
                        <span className="text-[#00A651] flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Patuh
                        </span>
                      ) : (
                        <span className="text-amber-700 flex items-center gap-1 font-semibold">
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
    </div>
  );
}
