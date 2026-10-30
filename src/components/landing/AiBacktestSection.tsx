'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  LineChart,
  ShieldCheck,
  Calendar,
  Clock,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Lock,
  ChevronRight,
  BarChart3,
  Flame,
  Award,
  Layers,
  Activity,
  Zap,
  Info,
  Maximize2,
  Target,
  Crown
} from 'lucide-react';
import {
  PairKey,
  BACKTEST_PAIRS,
  EquityCurvePoint
} from '@/data/backtestData';
import TradingViewMiniChart from '@/components/tradingview/TradingViewMiniChart';

interface AiBacktestSectionProps {
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onOpenPayment?: () => void;
}

export default function AiBacktestSection({ onOpenAuth, onOpenPayment }: AiBacktestSectionProps) {
  // 1. Active Pair Selector
  const [selectedPair, setSelectedPair] = useState<PairKey>('ALL');

  // 2. Chart Mode: 'EQUITY_CURVE' | 'CANDLE_SIMULATOR' | 'TRADINGVIEW_WIDGET'
  const [chartMode, setChartMode] = useState<'EQUITY_CURVE' | 'CANDLE_SIMULATOR' | 'TRADINGVIEW_WIDGET'>('EQUITY_CURVE');

  // 3. Pips Calculation Mode: 'MONTHLY' | 'DAILY' | 'YEARLY'
  const [pipsCalcMode, setPipsCalcMode] = useState<'MONTHLY' | 'DAILY' | 'YEARLY'>('MONTHLY');

  // 4. Active Hovered Point on SVG Chart
  const [hoveredPoint, setHoveredPoint] = useState<EquityCurvePoint | null>(null);

  // Active Pair Metrics
  const pairData = BACKTEST_PAIRS[selectedPair];

  // SVG Chart Geometry Calculations
  const chartPoints = pairData.equityCurve;
  const maxPips = Math.max(...chartPoints.map((p) => p.cumulativePips), 1000);
  const minPips = 0;
  const svgWidth = 800;
  const svgHeight = 280;
  const paddingX = 40;
  const paddingY = 30;
  const usableWidth = svgWidth - paddingX * 2;
  const usableHeight = svgHeight - paddingY * 2;

  // Generate SVG Path
  const svgPathData = useMemo(() => {
    if (chartPoints.length === 0) return '';
    return chartPoints
      .map((pt, index) => {
        const x = paddingX + (index / (chartPoints.length - 1)) * usableWidth;
        const y = svgHeight - paddingY - ((pt.cumulativePips - minPips) / (maxPips - minPips)) * usableHeight;
        return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  }, [chartPoints, usableWidth, usableHeight, maxPips, minPips]);

  // Gradient Area Fill Path
  const svgAreaPathData = useMemo(() => {
    if (!svgPathData) return '';
    const lastX = paddingX + usableWidth;
    const baseY = svgHeight - paddingY;
    return `${svgPathData} L ${lastX.toFixed(1)} ${baseY} L ${paddingX} ${baseY} Z`;
  }, [svgPathData, usableWidth]);

  return (
    <section id="ai-backtest" className="py-14 sm:py-20 bg-[#F8FAFC] text-slate-900 relative overflow-hidden border-b border-slate-200 scroll-mt-14 sm:scroll-mt-20">
      {/* Subtle Ambient Background Highlights */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-50/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7 sm:space-y-9 relative z-10">
        {/* ========================================================= */}
        {/* SECTION HEADER                                            */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#00A651] text-xs font-black uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#00A651]" />
            <span>Audit Backtest AI Kuantitatif 2015 – 2026 (Metode Baku • 10+ Tahun)</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug">
            Hasil Backtest AI: Strategi{' '}
            <span className="text-[#00A651]">Metode Baku Breakout &amp; SnR</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Dianalisis secara objektif oleh algoritma AI RealistisFx merujuk langsung ke harga historis riil{' '}
            <strong className="text-slate-900 font-bold underline decoration-[#00A651]">TradingView (2015 – 2026 / 10+ Tahun)</strong> di 5 pair utama dengan formula parameter baku: <strong>Timeframe H1 &amp; H4</strong>, <strong>Stop Loss 200 Pips</strong>, <strong>Take Profit 400 Pips</strong>, dan <strong>Risk-to-Reward 1 : 2</strong>.
          </p>
        </div>

        {/* ========================================================= */}
        {/* FORMULA PARAMETER METODE BAKU (HIGHLIGHT BAR)             */}
        {/* ========================================================= */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xs p-3.5 sm:p-5">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00A651] animate-pulse" />
              <span className="text-xs font-black text-slate-900 uppercase tracking-wide">
                Konfigurasi Parameter Metode Baku (Disiplin Tanpa Emosi)
              </span>
            </div>
            <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              Formula Baku • Fixed RR 1 : 2
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {/* Box 1: Metode Baku */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Metode Baku</span>
              <div className="text-xs sm:text-sm font-black text-slate-900 mt-1">
                Breakout &amp; SnR
              </div>
              <span className="text-[10px] text-slate-500 mt-1">
                Support &amp; Resistance
              </span>
            </div>

            {/* Box 2: Timeframe */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Timeframe (TF)</span>
              <div className="text-xs sm:text-sm font-black text-[#00A651] font-mono mt-1">
                H1 &amp; H4
              </div>
              <span className="text-[10px] text-slate-500 mt-1">
                Struktur &amp; Eksekusi
              </span>
            </div>

            {/* Box 3: Stop Loss */}
            <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">Stop Loss (SL)</span>
              <div className="text-xs sm:text-sm font-black text-rose-700 font-mono mt-1">
                Baku 200 Pips
              </div>
              <span className="text-[10px] text-rose-600/80 mt-1">
                Batas Proteksi Modal
              </span>
            </div>

            {/* Box 4: Take Profit */}
            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Take Profit (TP)</span>
              <div className="text-xs sm:text-sm font-black text-[#00A651] font-mono mt-1">
                Baku 400 Pips
              </div>
              <span className="text-[10px] text-emerald-700/80 mt-1">
                Sasaran Target Profit
              </span>
            </div>

            {/* Box 5: Risk to Reward */}
            <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-amber-50/70 border border-amber-200 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Risk : Reward (RR)</span>
              <div className="text-xs sm:text-sm font-black text-amber-800 font-mono mt-1">
                1 : 2.0 (Tetap)
              </div>
              <span className="text-[10px] text-amber-700/80 mt-1">
                Positive Mathematical Edge
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 5-PAIR SELECTOR (XAUUSD, EURUSD, USDJPY, GBPUSD, AUDUSD, ALL) */}
        {/* ========================================================= */}
        <div className="bg-white p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xs">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {[
              { key: 'ALL' as PairKey, label: 'Portofolio 5 Pair', sub: 'Gabungan AI', icon: Layers, badge: 'All-In-One' },
              { key: 'XAUUSD' as PairKey, label: 'XAUUSD (Gold)', sub: 'Emas Spot', icon: Flame, badge: 'WR 82.1%' },
              { key: 'EURUSD' as PairKey, label: 'EURUSD', sub: 'Euro / USD', icon: Activity, badge: 'WR 78.8%' },
              { key: 'USDJPY' as PairKey, label: 'USDJPY', sub: 'USD / Yen', icon: TrendingUp, badge: 'WR 80.6%' },
              { key: 'GBPUSD' as PairKey, label: 'GBPUSD', sub: 'Pound / USD', icon: BarChart3, badge: 'WR 78.4%' },
              { key: 'AUDUSD' as PairKey, label: 'AUDUSD', sub: 'Aussie / USD', icon: Target, badge: 'WR 76.8%' },
            ].map((p) => {
              const Icon = p.icon;
              const isActive = selectedPair === p.key;

              return (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => setSelectedPair(p.key)}
                  className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl transition-all cursor-pointer text-left flex flex-col justify-between group min-w-0 ${
                    isActive
                      ? 'bg-[#00A651] text-white shadow-md shadow-[#00A651]/20 ring-2 ring-[#00A651]/30'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded truncate ${isActive ? 'bg-black/20 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>
                      {p.badge}
                    </span>
                    <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#00A651]'}`} />
                  </div>
                  <div className="min-w-0">
                    <div className={`font-black text-xs sm:text-sm tracking-tight truncate ${isActive ? 'text-white' : 'text-slate-900'}`}>
                      {p.label}
                    </div>
                    <div className={`text-[10px] truncate ${isActive ? 'text-emerald-100' : 'text-slate-500'}`}>
                      {p.sub}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Pair SOP Strategy Banner */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
          <div className="p-2 rounded-xl bg-emerald-50 text-[#00A651] border border-emerald-200 shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-2 flex-wrap">
              <span>SOP Metode Baku {pairData.name} ({pairData.symbol})</span>
              <span className="text-[10px] font-mono font-bold text-[#00A651] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                TF: H1 &amp; H4 • SL: 200 Pips • TP: 400 Pips (RR 1 : 2)
              </span>
            </div>
            <p className="text-slate-600 mt-1 leading-relaxed">
              {pairData.strategySummary}
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SUMMARY METRIC CARDS FOR ACTIVE PAIR                      */}
        {/* ========================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-2.5 sm:gap-4">
          {/* Card 1: Win Rate */}
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between min-w-0">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span className="font-semibold truncate">Win Rate AI</span>
              <Award className="w-3.5 h-3.5 text-[#00A651] shrink-0" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-black font-mono text-[#00A651] truncate">
                {pairData.winRate}%
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 truncate">
                <span className="text-[#00A651] font-bold">{pairData.winningTrades} W</span> / {pairData.losingTrades} L
              </div>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div className="bg-[#00A651] h-full rounded-full" style={{ width: `${pairData.winRate}%` }} />
            </div>
          </div>

          {/* Card 2: Total Pips 2015-2026 */}
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between min-w-0">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span className="font-semibold truncate">Total Pips (10+ Thn)</span>
              <TrendingUp className="w-3.5 h-3.5 text-[#00A651] shrink-0" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-black font-mono text-slate-900 truncate">
                +{pairData.totalPips.toLocaleString('id-ID')}
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 truncate">
                Akumulasi Net Gain
              </div>
            </div>
            <span className="text-[10px] text-[#00A651] font-mono font-bold mt-2 truncate">
              {pairData.totalTrades} Transaksi
            </span>
          </div>

          {/* Card 3: Rata-rata Pips Per Hari */}
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between min-w-0">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span className="font-semibold truncate">Pips / Hari (Avg)</span>
              <Clock className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-black font-mono text-sky-700 truncate">
                +{pairData.avgDailyPips}
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 truncate">
                Pips / Hari Aktif
              </div>
            </div>
            <span className="text-[10px] text-sky-600 font-mono font-bold mt-2 truncate">
              Best: +{pairData.dailyStats.bestDayPips} Pips
            </span>
          </div>

          {/* Card 4: Rata-rata Pips Per Bulan */}
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between min-w-0">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span className="font-semibold truncate">Pips / Bulan (Avg)</span>
              <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-black font-mono text-slate-900 truncate">
                +{pairData.avgMonthlyPips}
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 truncate">
                Rata-rata Konsisten
              </div>
            </div>
            <span className="text-[10px] text-amber-700 font-mono font-bold mt-2 truncate">
              Best: {pairData.bestYear}
            </span>
          </div>

          {/* Card 5: Risk to Reward & Profit Factor */}
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between min-w-0">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span className="font-semibold truncate">Risk : Reward (Baku)</span>
              <Zap className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-black font-mono text-[#00A651] truncate">
                1 : 2.0
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-600 font-bold mt-0.5 truncate">
                SL 200 / TP 400 Pips
              </div>
            </div>
            <span className="text-[10px] text-slate-600 font-mono font-bold mt-2 truncate">
              PF: {pairData.profitFactor} • Sharpe {pairData.sharpeRatio}
            </span>
          </div>

          {/* Card 6: Max Drawdown */}
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between min-w-0">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span className="font-semibold truncate">Max Drawdown</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-black font-mono text-emerald-700 truncate">
                {pairData.maxDrawdownPct}%
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 truncate">
                Risiko 1-2% Terkontrol
              </div>
            </div>
            <span className="text-[10px] text-[#00A651] font-mono font-bold mt-2 truncate">
              SOP Anti-MC
            </span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* INTERACTIVE CHART SECTION (LIGHT THEME)                   */}
        {/* ========================================================= */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Chart Header & Mode Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-[#00A651] bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                  {pairData.name} ({pairData.symbol})
                </span>
                <span className="text-xs text-slate-500">
                  Visualisasi Grafik Kuantitatif 2015 – 2026 (10+ Tahun)
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                Grafik Pertumbuhan Akumulasi Pips &amp; Validasi Level Chart
              </h3>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0 self-start sm:self-auto overflow-x-auto max-w-full">
              <button
                type="button"
                onClick={() => setChartMode('EQUITY_CURVE')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  chartMode === 'EQUITY_CURVE'
                    ? 'bg-[#00A651] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LineChart className="w-3.5 h-3.5" />
                <span>Kurva Equity Pips</span>
              </button>

              <button
                type="button"
                onClick={() => setChartMode('CANDLE_SIMULATOR')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  chartMode === 'CANDLE_SIMULATOR'
                    ? 'bg-[#00A651] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                <span>Anatomi SNR &amp; Breakout</span>
              </button>

              <button
                type="button"
                onClick={() => setChartMode('TRADINGVIEW_WIDGET')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  chartMode === 'TRADINGVIEW_WIDGET'
                    ? 'bg-[#00A651] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>TradingView Riil</span>
              </button>
            </div>
          </div>

          {/* VIEW 1: LIGHT SVG EQUITY CURVE */}
          {chartMode === 'EQUITY_CURVE' && (
            <div className="space-y-3">
              <div className="relative w-full overflow-hidden bg-slate-50/70 rounded-2xl border border-slate-200 p-2 sm:p-4">
                {/* Milestone Info Banner if hovered */}
                {hoveredPoint ? (
                  <div className="absolute top-3 right-3 z-20 bg-white/95 border border-emerald-300 p-2.5 rounded-xl shadow-md max-w-xs animate-in fade-in duration-150 backdrop-blur-xs text-xs">
                    <div className="flex items-center justify-between font-mono mb-1 gap-2">
                      <span className="text-slate-500 font-bold">{hoveredPoint.date}</span>
                      <span className="text-[#00A651] font-black">+{hoveredPoint.cumulativePips.toLocaleString()} Pips</span>
                    </div>
                    {hoveredPoint.milestone && (
                      <p className="text-[11px] text-slate-800 font-bold leading-snug">
                        ⚡ {hoveredPoint.milestone}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="absolute top-3 right-3 z-20 bg-white/90 border border-slate-200 px-2.5 py-1 rounded-lg text-[10px] text-slate-500 font-mono hidden sm:block">
                    Arahkan mouse / ketuk titik kurva untuk melihat rincian
                  </div>
                )}

                {/* SVG Responsive Container */}
                <svg
                  viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                  className="w-full h-52 sm:h-64 lg:h-72 overflow-visible select-none"
                >
                  <defs>
                    <linearGradient id="equityGradLight" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00A651" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#00A651" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  {[0.25, 0.5, 0.75, 1.0].map((ratio) => {
                    const y = svgHeight - paddingY - ratio * usableHeight;
                    const pipsLabel = Math.round(minPips + ratio * (maxPips - minPips));
                    return (
                      <g key={ratio}>
                        <line
                          x1={paddingX}
                          y1={y}
                          x2={svgWidth - paddingX}
                          y2={y}
                          stroke="#E2E8F0"
                          strokeDasharray="4 4"
                          strokeWidth="1"
                        />
                        <text
                          x={paddingX - 8}
                          y={y + 4}
                          fill="#64748B"
                          fontSize="9"
                          textAnchor="end"
                          fontFamily="monospace"
                        >
                          +{pipsLabel.toLocaleString()}
                        </text>
                      </g>
                    );
                  })}

                  {/* Baseline (0 pips) */}
                  <line
                    x1={paddingX}
                    y1={svgHeight - paddingY}
                    x2={svgWidth - paddingX}
                    y2={svgHeight - paddingY}
                    stroke="#CBD5E1"
                    strokeWidth="1.5"
                  />
                  <text
                    x={paddingX - 8}
                    y={svgHeight - paddingY + 4}
                    fill="#64748B"
                    fontSize="9"
                    textAnchor="end"
                    fontFamily="monospace"
                  >
                    0
                  </text>

                  {/* Area fill */}
                  <path d={svgAreaPathData} fill="url(#equityGradLight)" />

                  {/* Main Line */}
                  <path
                    d={svgPathData}
                    fill="none"
                    stroke="#00A651"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Points on line */}
                  {chartPoints.map((pt, index) => {
                    const x = paddingX + (index / (chartPoints.length - 1)) * usableWidth;
                    const y = svgHeight - paddingY - ((pt.cumulativePips - minPips) / (maxPips - minPips)) * usableHeight;
                    const isHovered = hoveredPoint?.timestamp === pt.timestamp;
                    const hasMilestone = Boolean(pt.milestone);

                    return (
                      <g
                        key={pt.timestamp}
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredPoint(pt)}
                        onClick={() => setHoveredPoint(pt)}
                        onTouchStart={() => setHoveredPoint(pt)}
                      >
                        {/* Milestone indicator ring */}
                        {hasMilestone && (
                          <circle
                            cx={x}
                            cy={y}
                            r={isHovered ? 8 : 6}
                            fill="none"
                            stroke="#EAB308"
                            strokeWidth="2"
                          />
                        )}

                        <circle
                          cx={x}
                          cy={y}
                          r={isHovered ? 5.5 : 3.5}
                          fill={hasMilestone ? '#EAB308' : isHovered ? '#008F45' : '#00A651'}
                          stroke="#FFFFFF"
                          strokeWidth="2"
                        />

                        {/* Year Axis Label */}
                        {index % 3 === 0 && (
                          <text
                            x={x}
                            y={svgHeight - 8}
                            fill="#64748B"
                            fontSize="9"
                            textAnchor="middle"
                            fontFamily="monospace"
                          >
                            {pt.date}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Chart Footer Highlights */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 pt-1">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00A651]" />
                    <span>Akumulasi Pips Konsisten</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-amber-200" />
                    <span>Momen Breakout Mayor</span>
                  </div>
                </div>
                <div className="text-[#00A651] font-mono font-bold">
                  Total Gain 2015-2026 (10+ Thn): +{pairData.totalPips.toLocaleString('id-ID')} Pips
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: SNR & BREAKOUT ANATOMY SIMULATOR (LIGHT THEME) */}
          {chartMode === 'CANDLE_SIMULATOR' && (
            <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200 space-y-6">
              <div className="max-w-3xl">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00A651] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Playbook SOP Metode Baku RealistisFx
                </span>
                <h4 className="text-sm sm:text-base font-black text-slate-900 mt-1">
                  Anatomi Setup Metode Baku: Breakout &amp; Key SnR (TF H1 &amp; H4 • SL 200 Pips • TP 400 Pips)
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Metode baku tanpa keraguan emosional: Algoritma AI memetakan area Support &amp; Resistance pada <strong>Timeframe H4</strong> (struktur mayor) dan <strong>H1</strong> (konfirmasi), menunggu Candle Close Breakout di luar zona, entry saat Retest (RBS / SBR), dengan batasan risiko baku <strong>Stop Loss 200 Pips</strong> dan target pasti <strong>Take Profit 400 Pips (Rasio 1 : 2)</strong>.
                </p>
              </div>

              {/* Visual Interactive Diagram in Light Theme */}
              <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5">
                {/* Visual Target TP Line */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00A651] animate-pulse" />
                    <span className="text-[#00A651] font-mono font-black text-xs sm:text-sm">
                      🎯 TARGET TAKE PROFIT (TP) BAKU: +400 PIPS
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Rasio 1 : 2 Penuh (+400 Pips)
                  </span>
                </div>

                {/* Resistance Level Line */}
                <div className="relative flex items-center justify-between py-2 border-b-2 border-dashed border-rose-400">
                  <span className="text-rose-700 font-bold bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200 text-[11px] sm:text-xs">
                    🔴 KEY RESISTANCE LEVEL (TF H1 &amp; H4)
                  </span>
                  <span className="text-[10px] text-rose-600 font-bold hidden sm:inline">
                    Plafon Likuiditas Penjual (Sebelum Breakout)
                  </span>
                </div>

                {/* 4 Step Workflow Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-center">
                  {/* Step 1 */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-left flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono font-bold text-slate-500">TAHAP 1</span>
                        <span className="text-[10px] font-mono font-bold bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">TF H4 &amp; H1</span>
                      </div>
                      <div className="font-black text-slate-900 text-xs">Pemetaan Level SnR</div>
                      <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                        AI mendeteksi level Support &amp; Resistance horizontal kunci yang diuji berulang kali pada timeframe H4 &amp; H1.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-500 mt-2 block">
                      Validasi Key Zone
                    </span>
                  </div>

                  {/* Step 2 */}
                  <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-300 ring-1 ring-emerald-200 text-left flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono font-bold text-[#00A651]">TAHAP 2: TRIGGER</span>
                        <span className="text-[10px] font-mono font-bold bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded">Candle Close</span>
                      </div>
                      <div className="font-black text-emerald-950 text-xs">Breakout Candle H1/H4</div>
                      <p className="text-[11px] text-emerald-800 mt-1 leading-snug">
                        Body candle H1 / H4 ditutup penuh menembus level SnR dengan momentum kuat. Bukan sekadar ekor/shadow tipuan (anti-fakeout).
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#00A651] mt-2 block">
                      Konfirmasi Breakout
                    </span>
                  </div>

                  {/* Step 3 */}
                  <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-300 text-left flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono font-bold text-sky-700">TAHAP 3: ENTRY</span>
                        <span className="text-[10px] font-mono font-bold bg-sky-200 text-sky-900 px-1.5 py-0.5 rounded">RBS / SBR</span>
                      </div>
                      <div className="font-black text-sky-950 text-xs">Retest Pullback SnR</div>
                      <p className="text-[11px] text-sky-800 mt-1 leading-snug">
                        Harga koreksi pullback menguji kembali garis SnR tertembus (Resistance Become Support). Konfirmasi rejection memicu entry order.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-sky-700 mt-2 block">
                      Eksekusi Order Masuk
                    </span>
                  </div>

                  {/* Step 4 */}
                  <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-300 text-left flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono font-bold text-amber-800">TAHAP 4: RESULT</span>
                        <span className="text-[10px] font-mono font-bold bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded">RR 1 : 2</span>
                      </div>
                      <div className="font-black text-amber-950 text-xs">SL 200 &amp; TP 400 Pips</div>
                      <p className="text-[11px] text-amber-800 mt-1 leading-snug">
                        Batas baku otomatis: Stop Loss 200 pips terkunci aman dan Take Profit 400 pips dieksekusi tanpa gangguan psikologis trader.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-amber-800 mt-2 block">
                      Disiplin Baku 1 : 2
                    </span>
                  </div>
                </div>

                {/* Visual Support Level Line */}
                <div className="relative flex items-center justify-between py-2 border-t-2 border-dashed border-emerald-400">
                  <span className="text-[#00A651] font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 text-[11px] sm:text-xs">
                    🟢 KEY SUPPORT LEVEL (TF H1 &amp; H4)
                  </span>
                  <span className="text-[10px] text-[#00A651] font-bold hidden sm:inline">
                    Lantai Likuiditas Pembeli (Demand Base)
                  </span>
                </div>

                {/* Visual Protective Stop Loss Line */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-rose-50 border border-rose-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                    <span className="text-rose-700 font-mono font-black text-xs sm:text-sm">
                      🛑 BATAS STOP LOSS (SL) BAKU: -200 PIPS
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full border border-rose-200">
                    Batas Risiko Baku Anti-Floating
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 3: TRADINGVIEW DIRECT EMBED (LIGHT THEME) */}
          {chartMode === 'TRADINGVIEW_WIDGET' && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between flex-wrap gap-2">
                <span>
                  Widget Resmi TradingView: Menampilkan chart pasar langsung pair{' '}
                  <strong className="text-[#00A651]">{pairData.symbol}</strong>.
                </span>
                <span className="font-mono text-[11px] text-slate-500 font-bold">
                  Data Feed: TradingView Real-Time
                </span>
              </div>
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs">
                <TradingViewMiniChart
                  symbol={selectedPair === 'ALL' ? 'XAUUSD' : selectedPair}
                  height={320}
                />
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* HITUNGAN PIPS LENGKAP: PER HARI, PER BULAN, PER TAHUN      */}
        {/* ========================================================= */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-50 text-[#00A651] border border-emerald-200">
                  <BarChart3 className="w-4 h-4" />
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  Hitungan Pips: Per Hari, Per Bulan &amp; Per Tahun
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Rincian matriks perolehan pips algoritma AI dari 2015 sampai 2026 (10+ Tahun) untuk {pairData.name}
              </p>
            </div>

            {/* Sub-mode selector */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0 self-start sm:self-auto overflow-x-auto max-w-full">
              <button
                type="button"
                onClick={() => setPipsCalcMode('MONTHLY')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  pipsCalcMode === 'MONTHLY'
                    ? 'bg-[#00A651] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Pips Per Bulan (2015-2026)</span>
              </button>

              <button
                type="button"
                onClick={() => setPipsCalcMode('DAILY')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  pipsCalcMode === 'DAILY'
                    ? 'bg-[#00A651] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Pips Per Hari</span>
              </button>

              <button
                type="button"
                onClick={() => setPipsCalcMode('YEARLY')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  pipsCalcMode === 'YEARLY'
                    ? 'bg-[#00A651] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Pips Per Tahun</span>
              </button>
            </div>
          </div>

          {/* 1. MONTHLY PIPS HEATMAP TABLE (LIGHT THEME) */}
          {pipsCalcMode === 'MONTHLY' && (
            <div className="space-y-3">
              <div className="w-full max-w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs overscroll-x-contain">
                <table className="w-full min-w-[720px] text-xs text-center border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-mono text-[11px]">
                      <th className="p-3 text-left font-bold text-slate-900">Tahun</th>
                      {['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'].map((m) => (
                        <th key={m} className="p-2 font-semibold">
                          {m}
                        </th>
                      ))}
                      <th className="p-3 font-bold text-[#00A651] bg-emerald-50/50">Total Thn</th>
                      <th className="p-3 font-bold text-slate-900 bg-slate-100">Win Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {pairData.monthlyData.map((row) => (
                      <tr key={row.year} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 text-left font-bold text-slate-900 bg-slate-50/40">
                          {row.year}
                        </td>
                        {row.months.map((m) => {
                          const isPositive = m.pips >= 0;
                          return (
                            <td key={m.month} className="p-1 sm:p-1.5">
                              <span
                                className={`inline-block w-full py-1 px-1 rounded text-[11px] font-bold ${
                                  isPositive
                                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                                }`}
                              >
                                {isPositive ? `+${m.pips}` : m.pips}
                              </span>
                            </td>
                          );
                        })}
                        <td className="p-3 font-black text-[#00A651] bg-emerald-50/40">
                          +{row.totalPips.toLocaleString()}
                        </td>
                        <td className="p-3 font-black text-slate-900 bg-slate-50/40">
                          {row.winRate}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 flex-wrap gap-2 pt-1">
                <span>
                  🟢 Hijau: Bulan profit neto | 🔴 Merah: Bulan drawdown terkendali (SOP SL baku 200 pips).
                </span>
                <span className="text-[#00A651] font-mono font-bold">
                  Konsistensi: &gt;96% bulan profit positif
                </span>
              </div>
            </div>
          )}

          {/* 2. DAILY PIPS STATS (LIGHT THEME) */}
          {pipsCalcMode === 'DAILY' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Daily Highlights Box */}
              <div className="p-4 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#00A651]" />
                  Statistik Rata-Rata Harian ({pairData.symbol})
                </h4>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                    <span className="text-slate-500 block text-[11px]">Rata-rata Pips / Hari</span>
                    <span className="text-lg font-black font-mono text-[#00A651] mt-0.5 block">
                      +{pairData.dailyStats.avgPipsPerDay} Pips
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                    <span className="text-slate-500 block text-[11px]">Win Rate Hari Trading</span>
                    <span className="text-lg font-black font-mono text-slate-900 mt-0.5 block">
                      {pairData.dailyStats.winRateDaysPct}%
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                    <span className="text-slate-500 block text-[11px]">Best Single Day</span>
                    <span className="text-lg font-black font-mono text-emerald-700 mt-0.5 block">
                      +{pairData.dailyStats.bestDayPips} Pips
                    </span>
                    <span className="text-[10px] text-slate-400 truncate block mt-0.5">
                      {pairData.dailyStats.bestDayDate}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                    <span className="text-slate-500 block text-[11px]">Max Daily Loss (Cutloss)</span>
                    <span className="text-lg font-black font-mono text-rose-600 mt-0.5 block">
                      {pairData.dailyStats.maxDailyLossPips} Pips
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Terkunci SOP baku SL 200 pips
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-200">
                  Dengan rata-rata <strong>+{pairData.dailyStats.avgPipsPerDay} pips/hari</strong>, trader dengan modal $1,000 (menggunakan 0.05 lot aman) memproyeksikan potensi pertumbuhan konsisten tanpa overtrading.
                </p>
              </div>

              {/* Daily Distribution Bars */}
              <div className="p-4 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#00A651]" />
                  Distribusi Hasil Pips Per Hari
                </h4>

                <div className="space-y-3">
                  {pairData.dailyStats.pipsDistribution.map((dist) => (
                    <div key={dist.range} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-slate-700 font-medium">{dist.range}</span>
                        <span className="font-mono font-bold text-slate-900">
                          {dist.count} hari ({dist.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            dist.range.includes('>') || dist.range.includes('+50') || dist.range.includes('+30') || dist.range.includes('+15')
                              ? 'bg-[#00A651]'
                              : dist.range.includes('0 s/d')
                              ? 'bg-sky-500'
                              : 'bg-rose-500'
                          }`}
                          style={{ width: `${dist.percentage * 2}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. YEARLY PIPS SUMMARY (LIGHT THEME) */}
          {pipsCalcMode === 'YEARLY' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {pairData.yearlyStats.map((yr) => (
                <div
                  key={yr.year}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base sm:text-lg font-black font-mono text-slate-900">
                      {yr.year}
                    </span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-[#00A651] border border-emerald-200">
                      WR {yr.winRate}%
                    </span>
                  </div>

                  <div>
                    <div className="text-xl sm:text-2xl font-black font-mono text-[#00A651]">
                      +{yr.pips.toLocaleString()} Pips
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {yr.trades} Posisi ({yr.winningTrades} W / {yr.losingTrades} L)
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Profit Factor: <strong className="text-slate-900">{yr.profitFactor}</strong></span>
                    <span>Max DD: <strong className="text-emerald-700">{yr.maxDrawdownPct}%</strong></span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* CALL TO ACTION VIP SUBSCRIPTION BANNER                     */}
        {/* ========================================================= */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-[#00A651] to-emerald-800 text-white p-6 sm:p-10 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-white/20 text-white backdrop-blur-xs">
              Platform Sinyal Harian, Sinyal News &amp; Tools AI Terintegrasi Website
            </span>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
              Dapatkan Sinyal Harian, Sinyal News &amp; Analisis SNR AI Langsung di Website Ini
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Website RealistisFx menyediakan seluruh kebutuhan trading Anda secara terintegrasi: pantau sinyal harian 5 pair, panduan sinyal berita high-impact (NFP, CPI, FOMC), peta watchlist Support &amp; Resistance realtime, kalkulator lot aman anti-MC, serta evaluasi Smart Journal AI langsung di dashboard website ini.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 shrink-0 w-full sm:w-auto">
            <a
              href="#pricing"
              onClick={(e) => {
                const el = document.getElementById('pricing');
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-[#00A651] font-black text-xs sm:text-sm shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer text-center flex items-center justify-center gap-1.5"
            >
              <Crown className="w-4 h-4 text-amber-500" />
              <span>Akses Sinyal &amp; Fitur VIP di Website &rarr;</span>
            </a>

            {onOpenPayment && (
              <button
                type="button"
                onClick={onOpenPayment}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900 text-white font-extrabold text-xs sm:text-sm border border-emerald-400/40 shadow-xs hover:scale-[1.02] active:scale-95 transition-all cursor-pointer text-center flex items-center justify-center gap-1.5"
              >
                <span>Bayar Langsung via QRIS</span>
              </button>
            )}

            <a
              href="https://www.mql5.com/en/signals/2388343?source=Site+Signals+My"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-black/20 hover:bg-black/30 text-white font-bold text-xs border border-white/20 transition-all text-center flex items-center justify-center gap-2"
            >
              <span>Live MQL5 Terverifikasi</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
