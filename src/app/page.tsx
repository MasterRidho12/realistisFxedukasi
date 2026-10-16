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
  Info
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
    <div className="space-y-8 pb-12">
      {/* Top Banner Alert: Anti Margin Call Commitment */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950/80 via-slate-900/90 to-emerald-950/60 border border-blue-500/20 p-5 md:p-6 shadow-2xl">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                SOP Realistis
              </span>
              <span className="text-xs text-slate-400">Prinsip #1 Retail Trader Indonesia</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Selamat Datang, {user.name}! Lindungi Modal, Lawan Margin Call.
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Trading realistis bukan tentang cepat kaya semalam, melainkan menjaga <span className="text-emerald-400 font-semibold">Risk Management</span>, disiplin lot, dan menjauh dari jebakan emosi FOMO.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/calculator"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-1.5"
            >
              <Calculator className="w-4 h-4" />
              Hitung Lot Aman Sekarang
            </Link>
            {!isPro && (
              <button
                onClick={openPaymentModal}
                className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-white font-medium text-xs border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Crown className="w-4 h-4 text-emerald-400" />
                Bayar QRIS Rp50k
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4 Key Metric Cards (Dynamic & Realistic) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Discipline Score */}
        <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Skor Disiplin AI</span>
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldAlert className="w-4 h-4" />
            </span>
          </div>
          {totalTrades === 0 ? (
            <>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono text-slate-500 tracking-tight">
                  0
                </span>
                <span className="text-xs text-slate-500">/ 100</span>
                <span className="ml-auto text-[11px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md border border-white/5">
                  Belum Ada Data
                </span>
              </div>
              <div className="mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="h-full bg-slate-700 rounded-full" style={{ width: '0%' }} />
              </div>
              <p className="mt-2 text-[11px] text-slate-400 truncate">
                Catat trading di Smart Journal untuk kalkulasi AI.
              </p>
            </>
          ) : (
            <>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono text-white tracking-tight">
                  {disciplineScore}
                </span>
                <span className="text-xs text-slate-400">/ 100</span>
                <span
                  className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-md ${
                    disciplineScore >= 80
                      ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                      : disciplineScore >= 50
                      ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                      : 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
                  }`}
                >
                  {disciplineScore >= 80
                    ? 'Sangat Disiplin'
                    : disciplineScore >= 50
                    ? 'Cukup Disiplin'
                    : 'Perlu Evaluasi'}
                </span>
              </div>
              <div className="mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    disciplineScore >= 80
                      ? 'bg-emerald-400'
                      : disciplineScore >= 50
                      ? 'bg-amber-400'
                      : 'bg-rose-400'
                  }`}
                  style={{ width: `${disciplineScore}%` }}
                />
              </div>
              <p className="mt-2 text-[11px] text-slate-400 truncate">
                {disciplinedTrades} dari {totalTrades} posisi disiplin mematuhi SOP.
              </p>
            </>
          )}
        </div>

        {/* Metric 2: Win Rate */}
        <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Win Rate Jurnal</span>
            <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          {totalTrades === 0 ? (
            <>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono text-slate-500 tracking-tight">
                  0%
                </span>
                <span className="ml-auto text-[11px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md border border-white/5">
                  0 Posisi
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                <span>0 Menang (0%)</span>
                <span>0 Kalah (0%)</span>
              </div>
              <p className="mt-2 text-[11px] text-slate-400 truncate">
                Belum ada transaksi selesai yang dicatat.
              </p>
            </>
          ) : (
            <>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono text-white tracking-tight">
                  {winRate}%
                </span>
                <span className="ml-auto text-xs font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">
                  {totalTrades} Posisi
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-300">
                <span className="text-emerald-400">{winningTrades} Menang ({winPct}%)</span>
                <span className="text-rose-400">{losingTrades} Kalah ({lossPct}%)</span>
              </div>
              <p className="mt-2 text-[11px] text-slate-400 truncate">
                Net PnL: <span className={totalPnL >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                  {totalPnL >= 0 ? `+ $${totalPnL.toFixed(2)}` : `- $${Math.abs(totalPnL).toFixed(2)}`}
                </span>
              </p>
            </>
          )}
        </div>

        {/* Metric 3: Margin Safety Index */}
        <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Ketahanan Margin</span>
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          {totalTrades === 0 ? (
            <>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold font-mono text-slate-400 tracking-tight">
                  STANDBY
                </span>
                <span className="ml-auto text-[11px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md border border-white/5">
                  Belum Dihitung
                </span>
              </div>
              <div className="mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="h-full bg-slate-700 rounded-full" style={{ width: '0%' }} />
              </div>
              <p className="mt-2 text-[11px] text-slate-400 truncate">
                Uji margin modal di menu Margin Resistance.
              </p>
            </>
          ) : (
            <>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono text-emerald-400 tracking-tight">
                  AMAN
                </span>
                <span className="ml-auto text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  Anti Over-lot
                </span>
              </div>
              <div className="mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: '92%' }} />
              </div>
              <p className="mt-2 text-[11px] text-slate-400 truncate">
                Disiplin risiko terjaga berdasarkan histori entry lot.
              </p>
            </>
          )}
        </div>

        {/* Metric 4: Free/Pro Status & Quota */}
        <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Status Lisensi</span>
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Crown className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white tracking-tight">
              {isPro ? 'PRO VIP' : 'FREE TIER'}
            </span>
            <span className="ml-auto text-xs font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
              {isPro ? 'Rp50k/bln' : 'Gratis'}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
            <span>Kuota Lot Harian</span>
            <span className="text-white font-medium">
              {isPro ? 'Tanpa Batas' : `${user.dailyCalculatorCount}/3 Terpakai`}
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            {isPro ? 'Semua modul & bot aktif' : 'Tersisa kuota hari ini'}
          </p>
        </div>
      </div>

      {/* Middle Grid: News Radar Alert & Anti-FOMO Daily Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* News Sentiment Radar Preview Widget (2 Columns) */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Radar className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">News Sentiment Radar (High-Impact)</h2>
                <p className="text-xs text-slate-400">Peringatan rilis data ekonomi berdampak tinggi</p>
              </div>
            </div>
            <Link
              href="/news-radar"
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
            >
              Buka Radar Lengkap <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Featured Upcoming News Alert */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/40 via-slate-900/60 to-slate-900/60 border border-red-500/30">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  HIGH IMPACT 🔥🔥🔥
                </span>
                <span className="text-xs font-bold text-white">USD Non-Farm Payrolls (NFP)</span>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400">
                H-2 Jam 45 Menit (19:30 WIB)
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Perkiraan: 175K | Sebelumnya: 142K. Berpotensi memicu volatilitas ekstrem pada pair XAUUSD & mayor pair lainnya.
            </p>

            {/* Pro 2-Way Prediction Scenario Box */}
            <div className="mt-3 pt-3 border-t border-white/10">
              {isPro ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20">
                    <span className="font-bold text-emerald-400 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> Skenario Bullish Gold (XAUUSD):
                    </span>
                    <p className="text-[11px] text-slate-300 mt-1">
                      Jika NFP &lt; 150K dan Unemployment Rate naik &gt; 4.2%, ekspektasi rate cut memicu rally ke 2,710.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-500/20">
                    <span className="font-bold text-rose-400 flex items-center gap-1">
                      <TrendingDown className="w-3.5 h-3.5" /> Skenario Bearish Gold (XAUUSD):
                    </span>
                    <p className="text-[11px] text-slate-300 mt-1">
                      Jika NFP &gt; 200K, DXY menguat tajam, peluang sell rejection di supply zone 2,695 target 2,660.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-slate-900/80 border border-amber-500/30 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <p className="text-xs text-slate-300">
                      <span className="font-bold text-white">Skenario Prediksi 2 Arah (Bullish/Bearish)</span> khusus untuk member PRO.
                    </p>
                  </div>
                  <button
                    onClick={openPaymentModal}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex-shrink-0 cursor-pointer"
                  >
                    Buka via QRIS
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Secondary News Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/40 border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase">Medium Impact</span>
                <p className="text-xs font-semibold text-white">EUR ECB President Speech</p>
                <p className="text-[11px] text-slate-400 font-mono">21:00 WIB</p>
              </div>
              <span className="text-xs font-medium text-slate-400">EURUSD</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/40 border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-blue-400 uppercase">Telegram Alert</span>
                <p className="text-xs font-semibold text-white">Bot Notifikasi H-30 Menit</p>
                <p className="text-[11px] text-emerald-400 font-medium">
                  {user.telegramLinked ? 'Terhubung' : 'Belum Tersambung'}
                </p>
              </div>
              <Link
                href="/bot-assistant"
                className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
              >
                <Bot className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Anti-FOMO Daily Checklist Widget (1 Column) */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-emerald-400" />
                <h2 className="text-sm font-bold text-white">Anti-FOMO SOP Checklist</h2>
              </div>
              <span
                className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                  isSopReady
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}
              >
                {completedChecksCount}/5 Valid
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
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
                  className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={sopChecks[item.key]}
                    onChange={() => toggleSop(item.key)}
                    className="mt-0.5 w-4 h-4 rounded text-emerald-500 bg-slate-900 border-white/20 focus:ring-emerald-500 focus:ring-offset-0 cursor-pointer"
                  />
                  <span
                    className={`text-xs ${
                      sopChecks[item.key]
                        ? 'text-slate-200 line-through text-slate-400'
                        : 'text-slate-300 font-medium'
                    }`}
                  >
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10">
            {isSopReady ? (
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold text-center flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> SOP Terpenuhi! Disiplin Terjaga.
              </div>
            ) : (
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs text-center flex items-center justify-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> Tuntaskan 5 syarat sebelum entry!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 10 Core Features Hub Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              10 Fitur Unggulan RealistisFx Edukasi
            </h2>
            <p className="text-xs text-slate-400">
              Alat bantu terintegrasi dari pra-analisa hingga evaluasi psikologis trading
            </p>
          </div>
          <span className="text-xs font-medium text-slate-400">
            Freemium (Free & Pro Rp50.000/bln)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coreFeatures.map((feat) => {
            const Icon = feat.icon;
            const isLocked = feat.isProFeature && !isPro;

            return (
              <div
                key={feat.title}
                className="glass-panel glass-panel-hover rounded-2xl p-5 border border-white/10 flex flex-col justify-between relative group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-800/80 text-emerald-400 border border-white/5 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        feat.badgeColor === 'green'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : feat.badgeColor === 'amber'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}
                    >
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors flex items-center gap-1.5">
                    {feat.title}
                    {isLocked && <Lock className="w-3.5 h-3.5 text-amber-400" />}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 space-y-2.5">
                  <div className="text-[11px] space-y-1">
                    <div className="flex justify-between text-slate-400">
                      <span>Free:</span>
                      <span className="text-slate-300 font-medium truncate ml-2">
                        {feat.freeStatus}
                      </span>
                    </div>
                    <div className="flex justify-between text-emerald-400/90 font-medium">
                      <span>Pro:</span>
                      <span className="truncate ml-2">{feat.proStatus}</span>
                    </div>
                  </div>

                  <Link
                    href={feat.href}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      isLocked
                        ? 'bg-slate-800/60 text-amber-300 hover:bg-amber-500/20 border border-amber-500/30'
                        : 'bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30'
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
      <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-base font-bold text-white">Catatan Jurnal Trading Terakhir</h2>
            <p className="text-xs text-slate-400">Evaluasi transaksi dan kepatuhan rencana</p>
          </div>
          <Link
            href="/journal"
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
          >
            Lihat Semua Jurnal <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {journals.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-white/5 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center mx-auto">
              <BookOpenCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white">Belum Ada Catatan Jurnal Trading</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Akun Anda masih baru dan belum memiliki riwayat transaksi. Disiplin trading dibangun dengan mencatat setiap entry, target TP, dan batas risiko SL.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/journal"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
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
                <tr className="border-b border-white/10 text-slate-400">
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
              <tbody className="divide-y divide-white/5">
                {journals.slice(0, 5).map((j) => (
                  <tr key={j.id}>
                    <td className="py-3 font-mono text-slate-400">{j.date}</td>
                    <td className="py-3 font-bold text-white">{j.pair}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 rounded font-bold ${
                          j.direction === 'BUY'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}
                      >
                        {j.direction}
                      </span>
                    </td>
                    <td className="py-3 font-mono">{j.lot}</td>
                    <td className="py-3 font-mono text-slate-300">
                      {j.entryPrice} → {j.exitPrice}
                    </td>
                    <td className="py-3 font-mono font-bold">
                      <span className={j.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                        {j.pnl >= 0 ? `+ $${j.pnl.toFixed(2)}` : `- $${Math.abs(j.pnl).toFixed(2)}`}
                      </span>
                    </td>
                    <td className="py-3 text-slate-300">
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
                        <span className="text-emerald-400 flex items-center gap-1 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Patuh
                        </span>
                      ) : (
                        <span className="text-amber-400 flex items-center gap-1 font-medium">
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
