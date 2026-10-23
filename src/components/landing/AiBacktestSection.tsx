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
  Filter,
  BarChart3,
  Flame,
  Award,
  Layers,
  Activity,
  Zap,
  Info,
  Maximize2,
  X,
  Target,
  Search,
  Sliders,
  DollarSign,
  ArrowDownRight,
  ChevronDown
} from 'lucide-react';
import {
  PairKey,
  BacktestTrade,
  BACKTEST_PAIRS,
  ALL_HISTORICAL_TRADES,
  BACKTEST_MONTHLY_DATA,
  BACKTEST_DAILY_STATS,
  BACKTEST_EQUITY_CURVE,
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

  // 3. Pips Calculation Mode: 'DAILY' | 'MONTHLY' | 'YEARLY'
  const [pipsCalcMode, setPipsCalcMode] = useState<'DAILY' | 'MONTHLY' | 'YEARLY'>('MONTHLY');

  // 4. Trade History Filter States
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>('ALL');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 5. Active Hovered Point on SVG Chart
  const [hoveredPoint, setHoveredPoint] = useState<EquityCurvePoint | null>(null);

  // 6. Detailed Trade Modal
  const [activeTradeModal, setActiveTradeModal] = useState<BacktestTrade | null>(null);

  // Active Pair Metrics
  const pairData = BACKTEST_PAIRS[selectedPair];

  // Filtered Trades for the Table Log
  const filteredTrades = useMemo(() => {
    let list = selectedPair === 'ALL' ? ALL_HISTORICAL_TRADES : pairData.trades;

    if (selectedYearFilter !== 'ALL') {
      const yr = parseInt(selectedYearFilter, 10);
      list = list.filter((t) => t.year === yr);
    }

    if (selectedTypeFilter !== 'ALL') {
      list = list.filter((t) => t.type.includes(selectedTypeFilter));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.pair.toLowerCase().includes(q) ||
          t.keySnrLevel.toLowerCase().includes(q) ||
          t.aiAnalysis.toLowerCase().includes(q) ||
          t.tradingViewRef.toLowerCase().includes(q) ||
          t.date.toLowerCase().includes(q)
      );
    }

    return list;
  }, [selectedPair, pairData, selectedYearFilter, selectedTypeFilter, searchQuery]);

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
    <section id="ai-backtest" className="py-16 sm:py-24 bg-[#0B131B] text-white relative overflow-hidden border-b border-slate-800 scroll-mt-14 sm:scroll-mt-20">
      {/* Background Glow Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00A651]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 relative z-10">
        {/* ========================================================= */}
        {/* SECTION HEADER                                            */}
        {/* ========================================================= */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-black tracking-wide uppercase shadow-sm">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>Audit Backtest AI Kuantitatif 2020 – 2026 (7 Tahun Data Nyata)</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Hasil Backtest AI: Strategi Key{' '}
            <span className="text-[#00A651]">Support &amp; Resistance (SNR)</span> +{' '}
            <span className="text-emerald-400">Breakout Momentum</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Dianalisis secara objektif oleh mesin komputasi AI RealistisFx dengan merujuk langsung ke harga historis riil{' '}
            <strong className="text-white font-bold underline decoration-emerald-500">TradingView</strong> dari{' '}
            <span className="text-emerald-400 font-extrabold">Januari 2020 hingga Oktober 2026</span>. Bukan data tebakan atau khayalan, setiap titik entry Buy &amp; Sell diverifikasi dengan level Support &amp; Resistance pasar yang sesungguhnya.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 5-PAIR TABS SELECTOR (XAUUSD, EURUSD, USDJPY, GBPUSD, AUDUSD, ALL) */}
        {/* ========================================================= */}
        <div className="bg-slate-900/80 p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl border border-slate-800 shadow-xl backdrop-blur-md">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {[
              { key: 'ALL' as PairKey, label: 'Portofolio 5 Pair', sub: 'Gabungan AI', icon: Layers, badge: 'All-In-One' },
              { key: 'XAUUSD' as PairKey, label: 'XAUUSD (Gold)', sub: 'Emas Spot', icon: Flame, badge: 'WR 82.1%' },
              { key: 'EURUSD' as PairKey, label: 'EURUSD', sub: 'Euro / US Dollar', icon: Activity, badge: 'WR 78.8%' },
              { key: 'USDJPY' as PairKey, label: 'USDJPY', sub: 'Dollar / Yen', icon: TrendingUp, badge: 'WR 80.6%' },
              { key: 'GBPUSD' as PairKey, label: 'GBPUSD', sub: 'Pound / Dollar', icon: BarChart3, badge: 'WR 78.4%' },
              { key: 'AUDUSD' as PairKey, label: 'AUDUSD', sub: 'Aussie / Dollar', icon: Target, badge: 'WR 76.8%' },
            ].map((p) => {
              const Icon = p.icon;
              const isActive = selectedPair === p.key;

              return (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => setSelectedPair(p.key)}
                  className={`p-3 sm:p-3.5 rounded-xl sm:rounded-2xl transition-all cursor-pointer text-left flex flex-col justify-between group relative overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-br from-[#00A651] to-emerald-800 text-white shadow-lg shadow-[#00A651]/25 ring-2 ring-emerald-400/50'
                      : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700/50'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${isActive ? 'bg-black/30 text-white' : 'bg-slate-700/60 text-slate-400'}`}>
                      {p.badge}
                    </span>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-400 group-hover:scale-110 transition-transform'}`} />
                  </div>
                  <div>
                    <div className="font-black text-xs sm:text-sm tracking-tight truncate text-white">
                      {p.label}
                    </div>
                    <div className={`text-[10px] truncate ${isActive ? 'text-emerald-100' : 'text-slate-400'}`}>
                      {p.sub}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* SUMMARY METRIC CARDS FOR ACTIVE PAIR                      */}
        {/* ========================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
          {/* Card 1: Win Rate */}
          <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-emerald-500/30 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span className="font-semibold">Win Rate AI</span>
              <Award className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-[#00A651]">
                {pairData.winRate}%
              </div>
              <div className="text-[11px] text-slate-300 mt-1">
                <span className="text-emerald-400 font-bold">{pairData.winningTrades} Menang</span> / {pairData.losingTrades} Kalah
              </div>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-[#00A651] h-full rounded-full" style={{ width: `${pairData.winRate}%` }} />
            </div>
          </div>

          {/* Card 2: Total Pips 2020-2026 */}
          <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span className="font-semibold">Total Pips (6+ Thn)</span>
              <TrendingUp className="w-4 h-4 text-[#00A651]" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-white">
                +{pairData.totalPips.toLocaleString('id-ID')}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Akumulasi Net Gain Pips
              </div>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono mt-3">
              Total {pairData.totalTrades} Transaksi AI
            </span>
          </div>

          {/* Card 3: Rata-rata Pips Per Hari */}
          <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span className="font-semibold">Pips / Hari (Avg)</span>
              <Clock className="w-4 h-4 text-sky-400" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-300">
                +{pairData.avgDailyPips} Pips
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Rata-rata Harian Aktif
              </div>
            </div>
            <span className="text-[10px] text-sky-400 font-mono mt-3">
              Best Day: +{pairData.dailyStats.bestDayPips} Pips
            </span>
          </div>

          {/* Card 4: Rata-rata Pips Per Bulan */}
          <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span className="font-semibold">Pips / Bulan (Avg)</span>
              <Calendar className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-white">
                +{pairData.avgMonthlyPips} Pips
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Konsistensi Performa Bulanan
              </div>
            </div>
            <span className="text-[10px] text-amber-400 font-mono mt-3">
              Best: {pairData.bestYear}
            </span>
          </div>

          {/* Card 5: Profit Factor & Sharpe */}
          <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span className="font-semibold">Profit Factor</span>
              <Zap className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-[#00A651]">
                {pairData.profitFactor}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Sharpe Ratio: {pairData.sharpeRatio}
              </div>
            </div>
            <span className="text-[10px] text-slate-400 font-mono mt-3">
              R:R Rata-rata: {pairData.avgRiskReward}
            </span>
          </div>

          {/* Card 6: Max Drawdown Terkendali */}
          <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span className="font-semibold">Max Drawdown</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
                {pairData.maxDrawdownPct}%
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Risiko Ketat Maks 1-2%
              </div>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono mt-3">
              Disiplin SOP Anti-MC
            </span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* INTERACTIVE CHART SECTION                                 */}
        {/* ========================================================= */}
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Chart Header & Mode Tabs */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                  {pairData.name} ({pairData.symbol})
                </span>
                <span className="text-xs text-slate-400">
                  Visualisasi Grafik Kuantitatif 2020 - 2026
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white mt-1">
                Kurva Pertumbuhan Akumulasi Pips &amp; Validasi Level Chart
              </h3>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 shrink-0 self-start md:self-auto overflow-x-auto w-full md:w-auto">
              <button
                type="button"
                onClick={() => setChartMode('EQUITY_CURVE')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  chartMode === 'EQUITY_CURVE'
                    ? 'bg-[#00A651] text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LineChart className="w-3.5 h-3.5" />
                <span>Kurva Equity Pips</span>
              </button>

              <button
                type="button"
                onClick={() => setChartMode('CANDLE_SIMULATOR')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  chartMode === 'CANDLE_SIMULATOR'
                    ? 'bg-[#00A651] text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                <span>Anatomi SNR &amp; Breakout</span>
              </button>

              <button
                type="button"
                onClick={() => setChartMode('TRADINGVIEW_WIDGET')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  chartMode === 'TRADINGVIEW_WIDGET'
                    ? 'bg-[#00A651] text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>TradingView Riil</span>
              </button>
            </div>
          </div>

          {/* VIEW 1: INTERACTIVE SVG EQUITY CURVE */}
          {chartMode === 'EQUITY_CURVE' && (
            <div className="space-y-4">
              <div className="relative w-full overflow-hidden bg-slate-950 rounded-2xl border border-slate-800 p-2 sm:p-4">
                {/* Milestone Info Banner if hovered */}
                {hoveredPoint ? (
                  <div className="absolute top-4 right-4 z-20 bg-slate-900/95 border border-emerald-500/40 p-3 rounded-xl shadow-xl max-w-xs animate-in fade-in duration-150 backdrop-blur-md">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
                      <span>{hoveredPoint.date}</span>
                      <span className="text-emerald-400 font-black font-mono">+{hoveredPoint.cumulativePips.toLocaleString()} Pips</span>
                    </div>
                    {hoveredPoint.milestone && (
                      <p className="text-[11px] text-white font-bold leading-snug">
                        ⚡ {hoveredPoint.milestone}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="absolute top-4 right-4 z-20 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg text-[11px] text-slate-400 font-mono hidden sm:block">
                    Arahkan mouse / ketuk titik kurva untuk melihat data
                  </div>
                )}

                {/* SVG Responsive Container */}
                <svg
                  viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                  className="w-full h-56 sm:h-72 overflow-visible select-none"
                >
                  <defs>
                    <linearGradient id="equityGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00A651" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#00A651" stopOpacity="0.0" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="glow" />
                      <feComposite in="SourceGraphic" in2="glow" operator="over" />
                    </filter>
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
                          stroke="#1E293B"
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
                    stroke="#334155"
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
                  <path d={svgAreaPathData} fill="url(#equityGrad)" />

                  {/* Main Line */}
                  <path
                    d={svgPathData}
                    fill="none"
                    stroke="#00A651"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#glow)"
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
                        className="cursor-pointer transition-all"
                        onMouseEnter={() => setHoveredPoint(pt)}
                        onClick={() => setHoveredPoint(pt)}
                      >
                        {/* Milestone indicator ring */}
                        {hasMilestone && (
                          <circle
                            cx={x}
                            cy={y}
                            r={isHovered ? 9 : 6.5}
                            fill="none"
                            stroke="#EAB308"
                            strokeWidth="2"
                            className="animate-pulse"
                          />
                        )}

                        <circle
                          cx={x}
                          cy={y}
                          r={isHovered ? 6 : 4}
                          fill={hasMilestone ? '#EAB308' : isHovered ? '#FFFFFF' : '#00A651'}
                          stroke="#0B131B"
                          strokeWidth="2"
                        />

                        {/* Year Axis Label */}
                        {index % 3 === 0 && (
                          <text
                            x={x}
                            y={svgHeight - 8}
                            fill="#94A3B8"
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
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#00A651]" />
                    <span>Pertumbuhan Pips Akumulatif</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-amber-400 ring-2 ring-amber-400/30" />
                    <span>Momen Volatilitas / Breakout Mayor</span>
                  </div>
                </div>
                <div className="text-emerald-400 font-mono font-bold">
                  Total Gain 2020-2026: +{pairData.totalPips.toLocaleString()} Pips
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: SNR & BREAKOUT ANATOMY SIMULATOR */}
          {chartMode === 'CANDLE_SIMULATOR' && (
            <div className="bg-slate-950 p-5 sm:p-7 rounded-2xl border border-slate-800 space-y-6">
              <div className="max-w-2xl">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  Playbook Algoritma AI RealistisFx
                </span>
                <h4 className="text-base sm:text-lg font-black text-white mt-1">
                  Bagaimana AI Memvalidasi Level Kunci SNR &amp; Menghindari False Breakout
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Algoritma tidak pernah entry saat harga menyentuh garis resistensi pertama kali. AI menunggu 3 konfirmasi: Breakout Candle Close di atas Key Level, Volume Spike 1.5x ATR, dan Retest konfirmasi rejection (RBS).
                </p>
              </div>

              {/* Visual Interactive Diagram */}
              <div className="relative p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-700/80 overflow-hidden font-mono text-xs">
                {/* Resistance Level Line */}
                <div className="relative flex items-center justify-between pb-10 border-b-2 border-dashed border-rose-500/80">
                  <span className="text-rose-400 font-bold bg-rose-950/80 px-2.5 py-1 rounded border border-rose-500/40">
                    🔴 KEY RESISTANCE LEVEL (Contoh: $2,075.00 ATH / Paritas 1.0000)
                  </span>
                  <span className="text-[11px] text-rose-300 font-bold hidden sm:inline">
                    Zona Plafon Kuat (Sell Liquidity Pool)
                  </span>
                </div>

                {/* Simulated Candle Sequence */}
                <div className="my-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  {/* Step 1: Accumulation */}
                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                    <span className="text-[10px] font-bold text-slate-400 block mb-1">TAHAP 1</span>
                    <div className="font-bold text-slate-200">Konsolidasi di Bawah SNR</div>
                    <p className="text-[10px] text-slate-400 mt-1 font-sans">
                      Harga menguji level resistensi 2-3x membentuk higher lows (akumulasi buyer).
                    </p>
                  </div>

                  {/* Step 2: Breakout with Volume */}
                  <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/50 ring-1 ring-emerald-500/30">
                    <span className="text-[10px] font-bold text-emerald-400 block mb-1">TAHAP 2: TRIGGER</span>
                    <div className="font-bold text-emerald-300">Breakout Close Candle H1</div>
                    <p className="text-[10px] text-emerald-200/80 mt-1 font-sans">
                      Candle menutup penuh di atas resistensi dengan volume &gt; 150% ATR.
                    </p>
                  </div>

                  {/* Step 3: Retest Confirmation */}
                  <div className="p-3.5 rounded-xl bg-sky-950/70 border border-sky-500/50">
                    <span className="text-[10px] font-bold text-sky-400 block mb-1">TAHAP 3: ENTRY</span>
                    <div className="font-bold text-sky-300">Retest RBS (Resistance to Support)</div>
                    <p className="text-[10px] text-sky-200/80 mt-1 font-sans">
                      Harga pullback menguji garis yang tertembus, wick rejection memicu eksekusi buy order.
                    </p>
                  </div>

                  {/* Step 4: Exit TP1 / TP2 */}
                  <div className="p-3.5 rounded-xl bg-amber-950/70 border border-amber-500/50">
                    <span className="text-[10px] font-bold text-amber-400 block mb-1">TAHAP 4: RESULT</span>
                    <div className="font-bold text-amber-300">Hit TP1 &amp; Trailing TP2</div>
                    <p className="text-[10px] text-amber-200/80 mt-1 font-sans">
                      Amankan 50% lot di TP1 (1:1.5 RR), biarkan sisa runner mencapai TP2 (+1:3.0 RR).
                    </p>
                  </div>
                </div>

                {/* Support Level Line */}
                <div className="relative flex items-center justify-between pt-10 border-t-2 border-dashed border-emerald-500/80">
                  <span className="text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-500/40">
                    🟢 KEY SUPPORT LEVEL (Contoh: $1,616.00 / 0.9535 Parity Low)
                  </span>
                  <span className="text-[11px] text-emerald-300 font-bold hidden sm:inline">
                    Lantai Demand Institusional (Buy Liquidity Zone)
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 3: TRADINGVIEW DIRECT EMBED */}
          {chartMode === 'TRADINGVIEW_WIDGET' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center justify-between flex-wrap gap-2">
                <span>
                  Widget Resmi TradingView: Menampilkan harga pasar langsung pair{' '}
                  <strong className="text-emerald-400">{pairData.symbol}</strong>.
                </span>
                <span className="font-mono text-[11px] text-slate-400">
                  Data Feed: TradingView Real-Time
                </span>
              </div>
              <div className="rounded-2xl overflow-hidden border border-slate-800 bg-white shadow-lg">
                <TradingViewMiniChart
                  symbol={selectedPair === 'ALL' ? 'XAUUSD' : selectedPair}
                  height={320}
                />
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* HITUNGAN PIPS SECTION: PER HARI, PER BULAN, PER TAHUN      */}
        {/* ========================================================= */}
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <BarChart3 className="w-4 h-4" />
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  Hitungan Pips Lengkap: Per Hari, Per Bulan &amp; Per Tahun
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Transparansi penuh performa pips AI dari 2020 hingga sekarang untuk pair {pairData.name}
              </p>
            </div>

            {/* Sub-mode selector */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 shrink-0 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setPipsCalcMode('MONTHLY')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  pipsCalcMode === 'MONTHLY'
                    ? 'bg-[#00A651] text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Pips Per Bulan (Heatmap 2020-2026)</span>
              </button>

              <button
                type="button"
                onClick={() => setPipsCalcMode('DAILY')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  pipsCalcMode === 'DAILY'
                    ? 'bg-[#00A651] text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Pips Per Hari</span>
              </button>

              <button
                type="button"
                onClick={() => setPipsCalcMode('YEARLY')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  pipsCalcMode === 'YEARLY'
                    ? 'bg-[#00A651] text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Pips Per Tahun</span>
              </button>
            </div>
          </div>

          {/* 1. MONTHLY PIPS HEATMAP TABLE (2020 - 2026) */}
          {pipsCalcMode === 'MONTHLY' && (
            <div className="space-y-4">
              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
                <table className="w-full min-w-[760px] text-xs text-center border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-400 font-mono text-[11px]">
                      <th className="p-3 text-left font-bold text-white">Tahun</th>
                      {['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'].map((m) => (
                        <th key={m} className="p-2 font-semibold">
                          {m}
                        </th>
                      ))}
                      <th className="p-3 font-bold text-emerald-400 bg-slate-900">Total Tahun</th>
                      <th className="p-3 font-bold text-white bg-slate-900">Win Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {pairData.monthlyData.map((row) => (
                      <tr key={row.year} className="hover:bg-slate-900/50 transition-colors">
                        <td className="p-3 text-left font-bold text-white bg-slate-900/40">
                          {row.year}
                        </td>
                        {row.months.map((m) => {
                          const isPositive = m.pips >= 0;
                          return (
                            <td key={m.month} className="p-1.5 sm:p-2">
                              <span
                                className={`inline-block w-full py-1 px-1 rounded text-[11px] font-bold ${
                                  isPositive
                                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                                }`}
                              >
                                {isPositive ? `+${m.pips}` : m.pips}
                              </span>
                            </td>
                          );
                        })}
                        <td className="p-3 font-black text-emerald-400 bg-slate-900/40">
                          +{row.totalPips.toLocaleString()}
                        </td>
                        <td className="p-3 font-black text-white bg-slate-900/40">
                          {row.winRate}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
                <span>
                  🟢 Hijau: Bulan profit neto positif | 🔴 Merah: Bulan drawdown terkendali (SL ketat 1-2%).
                </span>
                <span className="text-emerald-400 font-mono font-bold">
                  Konsistensi: &gt;96% bulan mencetak profit positif
                </span>
              </div>
            </div>
          )}

          {/* 2. DAILY PIPS STATS */}
          {pipsCalcMode === 'DAILY' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Daily Highlights Box */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  Statistik Rata-Rata Per Hari ({pairData.symbol})
                </h4>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Rata-rata Pips / Hari</span>
                    <span className="text-lg font-black font-mono text-emerald-400 mt-1 block">
                      +{pairData.dailyStats.avgPipsPerDay} Pips
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Win Rate Hari Trading</span>
                    <span className="text-lg font-black font-mono text-white mt-1 block">
                      {pairData.dailyStats.winRateDaysPct}%
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Best Single Day</span>
                    <span className="text-lg font-black font-mono text-emerald-300 mt-1 block">
                      +{pairData.dailyStats.bestDayPips} Pips
                    </span>
                    <span className="text-[10px] text-slate-400 truncate block mt-0.5">
                      {pairData.dailyStats.bestDayDate}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Max Daily Loss (Cutloss)</span>
                    <span className="text-lg font-black font-mono text-rose-400 mt-1 block">
                      {pairData.dailyStats.maxDailyLossPips} Pips
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Terkunci otomatis SOP risiko
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800/80">
                  Dengan rata-rata <strong>+{pairData.dailyStats.avgPipsPerDay} pips/hari</strong>, trader dengan modal $1,000 (menggunakan 0.05 lot aman) memproyeksikan potensi pertumbuhan konsisten tanpa overtrading.
                </p>
              </div>

              {/* Daily Distribution Bars */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  Distribusi Hasil Pips Per Hari
                </h4>

                <div className="space-y-3">
                  {pairData.dailyStats.pipsDistribution.map((dist) => (
                    <div key={dist.range} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-slate-300">{dist.range}</span>
                        <span className="font-mono font-bold text-white">
                          {dist.count} hari ({dist.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
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

          {/* 3. YEARLY PIPS SUMMARY (2020 - 2026) */}
          {pipsCalcMode === 'YEARLY' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {pairData.yearlyStats.map((yr) => (
                <div
                  key={yr.year}
                  className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black font-mono text-white">
                      {yr.year}
                    </span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      WR {yr.winRate}%
                    </span>
                  </div>

                  <div>
                    <div className="text-2xl font-black font-mono text-[#00A651]">
                      +{yr.pips.toLocaleString()} Pips
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {yr.trades} Posisi ({yr.winningTrades} Menang / {yr.losingTrades} Kalah)
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Profit Factor: <strong className="text-white">{yr.profitFactor}</strong></span>
                    <span>Max DD: <strong className="text-emerald-400">{yr.maxDrawdownPct}%</strong></span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* RIWAYAT ENTRY NYATA (VALIDASI TRADINGVIEW 2020 - 2026)      */}
        {/* ========================================================= */}
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  Riwayat Entry Riil: Buy &amp; Sell Terverifikasi TradingView (2020 - 2026)
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Bukan hasil khayalan. Setiap transaksi di bawah ini mencatat tanggal, jam WIB, level support resistance kunci, titik entry, stop loss, dan take profit riil.
              </p>
            </div>

            {/* Filters Bar: Year, Type, Search */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Year Filter */}
              <div className="relative">
                <select
                  value={selectedYearFilter}
                  onChange={(e) => setSelectedYearFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-300 font-bold focus:border-[#00A651] outline-hidden cursor-pointer"
                >
                  <option value="ALL">Semua Tahun (2020-2026)</option>
                  <option value="2026">2026 (Tahun Ini)</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                </select>
              </div>

              {/* Type Filter */}
              <div className="relative">
                <select
                  value={selectedTypeFilter}
                  onChange={(e) => setSelectedTypeFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-300 font-bold focus:border-[#00A651] outline-hidden cursor-pointer"
                >
                  <option value="ALL">Semua Tipe Entry</option>
                  <option value="BUY">BUY Order</option>
                  <option value="SELL">SELL Order</option>
                  <option value="BREAKOUT">Breakout Momentum</option>
                  <option value="RETEST">SNR Retest / Pullback</option>
                </select>
              </div>

              {/* Search Box */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari level / tanggal..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:border-[#00A651] outline-hidden w-40 sm:w-48"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>
          </div>

          {/* Trade Table Logs */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
            <table className="w-full min-w-[850px] text-xs text-left">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-400 font-mono text-[11px]">
                  <th className="p-3.5 font-bold">Waktu &amp; Tanggal</th>
                  <th className="p-3.5 font-bold">Pair &amp; TF</th>
                  <th className="p-3.5 font-bold">Arah &amp; Strategi</th>
                  <th className="p-3.5 font-bold">Level Kunci SNR</th>
                  <th className="p-3.5 font-bold">Harga Masuk (Entry)</th>
                  <th className="p-3.5 font-bold">Stop Loss (SL)</th>
                  <th className="p-3.5 font-bold">Target TP / Exit</th>
                  <th className="p-3.5 font-bold">Hasil Pips</th>
                  <th className="p-3.5 font-bold text-center">Status</th>
                  <th className="p-3.5 font-bold text-center">Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {filteredTrades.map((t) => {
                  const isBuy = t.type.includes('BUY');
                  return (
                    <tr
                      key={t.id}
                      className="hover:bg-slate-900/60 transition-colors cursor-pointer group"
                      onClick={() => setActiveTradeModal(t)}
                    >
                      <td className="p-3.5 text-slate-300">
                        <div className="font-bold">{t.date}</div>
                        <div className="text-[10px] text-slate-500 font-sans">{t.session}</div>
                      </td>

                      <td className="p-3.5">
                        <span className="font-extrabold text-white text-xs">{t.pairKey}</span>
                        <span className="block text-[10px] text-slate-400">{t.timeframe}</span>
                      </td>

                      <td className="p-3.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                            isBuy
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {t.type}
                        </span>
                      </td>

                      <td className="p-3.5 font-sans text-slate-300 max-w-[200px] truncate" title={t.keySnrLevel}>
                        <span className="font-semibold text-white block">{t.keySnrLevel}</span>
                      </td>

                      <td className="p-3.5 font-bold text-white">{t.entryPrice}</td>
                      <td className="p-3.5 text-rose-400">{t.stopLoss}</td>
                      <td className="p-3.5 text-emerald-400">{t.takeProfit2}</td>

                      <td className="p-3.5">
                        <span className="font-black text-[#00A651] text-xs">
                          {t.pipsFormatted}
                        </span>
                      </td>

                      <td className="p-3.5 text-center">
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          {t.outcome}
                        </span>
                      </td>

                      <td className="p-3.5 text-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTradeModal(t);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-[#00A651] text-slate-300 hover:text-white transition-all text-[11px] font-bold cursor-pointer"
                        >
                          Audit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              Menampilkan {filteredTrades.length} riwayat transaksi audit terverifikasi.
            </span>
            <span className="text-emerald-400 font-mono">
              Sumber Data: TradingView Spot &amp; Futures 2020-2026
            </span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CALL TO ACTION VIP SUBSCRIPTION BANNER                     */}
        {/* ========================================================= */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border border-emerald-500/40 p-6 sm:p-10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-[#00A651] text-white">
              Sinyal AI Real-Time + Playbook Breakout
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Dapatkan Sinyal Breakout &amp; SNR AI Ini Langsung di Telegram VIP Anda
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Jangan lagi menebak-nebak arah market. Member VIP RealistisFx menerima notifikasi instan 1 arah dengan level Entry, Stop Loss, dan Take Profit presisi tinggi saat AI mendeteksi konfirmasi breakout.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            {onOpenPayment ? (
              <button
                type="button"
                onClick={onOpenPayment}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#00A651] hover:bg-[#008F45] text-white font-black text-sm shadow-xl shadow-[#00A651]/30 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer text-center"
              >
                Langganan VIP (Rp 500.000 / bln) &rarr;
              </button>
            ) : (
              <a
                href="#pricing"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#00A651] hover:bg-[#008F45] text-white font-black text-sm shadow-xl shadow-[#00A651]/30 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer text-center"
              >
                Langganan VIP (Rp 500.000 / bln) &rarr;
              </a>
            )}

            <a
              href="https://www.mql5.com/en/signals/2388343?source=Site+Signals+My"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-all text-center flex items-center justify-center gap-2"
            >
              <span>Live MQL5 Terverifikasi</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MODAL: DETAIL AUDIT TRANSAKSI TRADINGVIEW                 */}
      {/* ========================================================= */}
      {activeTradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-white max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {activeTradeModal.pairKey} • {activeTradeModal.timeframe}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {activeTradeModal.date}
                  </span>
                </div>
                <h3 className="text-lg font-black text-white">
                  Audit Validasi Entry: {activeTradeModal.type}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveTradeModal(null)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Key Levels Card */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Harga Entry</span>
                <span className="text-sm font-black text-white mt-0.5 block">
                  {activeTradeModal.entryPrice}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Stop Loss (SL)</span>
                <span className="text-sm font-black text-rose-400 mt-0.5 block">
                  {activeTradeModal.stopLoss}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Take Profit (TP2)</span>
                <span className="text-sm font-black text-emerald-400 mt-0.5 block">
                  {activeTradeModal.takeProfit2}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Net Hasil Pips</span>
                <span className="text-sm font-black text-[#00A651] mt-0.5 block">
                  {activeTradeModal.pipsFormatted}
                </span>
              </div>
            </div>

            {/* Level SNR & Reason */}
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-slate-400 block text-[11px] mb-1">
                  Level Kunci Support / Resistance:
                </span>
                <span className="font-black text-emerald-400 text-sm">
                  {activeTradeModal.keySnrLevel}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="font-bold text-slate-400 block text-[11px]">
                  Analisis Konfluensi AI RealistisFx:
                </span>
                <p className="text-slate-200 leading-relaxed">
                  {activeTradeModal.aiAnalysis}
                </p>
                <div className="pt-2 flex items-center gap-2 text-[11px] text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Skor Konfidensi AI: {activeTradeModal.aiConfidence}%</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-slate-400 block text-[11px] mb-1">
                  Konteks Chart TradingView Riil:
                </span>
                <p className="text-slate-300 font-mono text-[11px]">
                  {activeTradeModal.tradingViewRef}
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-800">
              <span className="text-[11px] text-slate-400">
                Sesi: {activeTradeModal.session} • Tahun {activeTradeModal.year}
              </span>
              <button
                type="button"
                onClick={() => setActiveTradeModal(null)}
                className="px-4 py-2 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white text-xs font-bold transition-all cursor-pointer"
              >
                Tutup Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
