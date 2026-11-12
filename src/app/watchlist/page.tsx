'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  LineChart,
  Crown,
  Lock,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Target,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Zap,
  Layers,
  Activity,
  AlertTriangle,
  Compass,
  Copy,
  Check,
  Clock,
  ChevronRight,
  ExternalLink,
  SlidersHorizontal,
  Flame,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { TradingViewChart } from '@/components/tradingview/TradingViewChart';
import { TradingViewTechnicalAnalysis } from '@/components/tradingview/TradingViewTechnicalAnalysis';
import type { SnrMarketData } from '@/app/api/market/snr/route';

const INITIAL_PAIRS: SnrMarketData[] = [
  {
    symbol: 'XAUUSD',
    tvSymbol: 'OANDA:XAUUSD',
    name: 'Gold Spot / US Dollar',
    price: 4098.50,
    open: 4061.89,
    high: 4134.10,
    low: 4054.40,
    change24h: 0.69,
    pivot: 3991.16,
    s1: 3754.80,
    s2: 3633.95,
    s3: 3276.75,
    r1: 4112.00,
    r2: 4348.40,
    r3: 4705.60,
    buyZone: '3,754.80 - 3,633.95',
    sellZone: '4,112.00 - 4,348.40',
    bias: 'BULLISH',
    biasDescription: 'Emas bertahan kuat di atas Pivot Point H4. Pantau konfirmasi rejection di area demand S1.',
    digits: 2,
    pipMultiplier: 10,
    proOnly: true,
    lastUpdated: new Date().toISOString(),
  },
  {
    symbol: 'EURUSD',
    tvSymbol: 'FX:EURUSD',
    name: 'Euro / US Dollar',
    price: 1.1166,
    open: 1.1135,
    high: 1.1168,
    low: 1.1134,
    change24h: 0.26,
    pivot: 1.1199,
    s1: 1.1062,
    s2: 1.0967,
    s3: 1.0734,
    r1: 1.1295,
    r2: 1.1432,
    r3: 1.1664,
    buyZone: '1.1062 - 1.0967',
    sellZone: '1.1295 - 1.1432',
    bias: 'BEARISH',
    biasDescription: 'Euro berada di bawah level Pivot harian. Peluang sell on strength jika menguji Resistance R1.',
    digits: 4,
    pipMultiplier: 10000,
    proOnly: true,
    lastUpdated: new Date().toISOString(),
  },
  {
    symbol: 'GBPUSD',
    tvSymbol: 'FX:GBPUSD',
    name: 'British Pound / US Dollar',
    price: 1.3387,
    open: 1.3341,
    high: 1.3388,
    low: 1.3340,
    change24h: 0.30,
    pivot: 1.3319,
    s1: 1.3205,
    s2: 1.3022,
    s3: 1.2726,
    r1: 1.3501,
    r2: 1.3616,
    r3: 1.3913,
    buyZone: '1.3205 - 1.3022',
    sellZone: '1.3501 - 1.3616',
    bias: 'BULLISH',
    biasDescription: 'Poundsterling bertahan di atas Pivot 1.3319. Struktur akumulasi buyer masih terjaga.',
    digits: 4,
    pipMultiplier: 10000,
    proOnly: true,
    lastUpdated: new Date().toISOString(),
  },
  {
    symbol: 'AUDUSD',
    tvSymbol: 'FX:AUDUSD',
    name: 'Australian Dollar / US Dollar',
    price: 0.6883,
    open: 0.6864,
    high: 0.6902,
    low: 0.6854,
    change24h: 0.29,
    pivot: 0.6997,
    s1: 0.6927,
    s2: 0.6823,
    s3: 0.6649,
    r1: 0.7101,
    r2: 0.7171,
    r3: 0.7345,
    buyZone: '0.6927 - 0.6823',
    sellZone: '0.7101 - 0.7171',
    bias: 'NEUTRAL',
    biasDescription: 'Pergerakan harga berada di zona konsolidasi antara S1 dan S2. Tunggu konfirmasi breakout.',
    digits: 4,
    pipMultiplier: 10000,
    proOnly: false,
    lastUpdated: new Date().toISOString(),
  },
  {
    symbol: 'USDJPY',
    tvSymbol: 'FX:USDJPY',
    name: 'US Dollar / Japanese Yen',
    price: 158.05,
    open: 158.34,
    high: 158.53,
    low: 158.03,
    change24h: -0.30,
    pivot: 157.53,
    s1: 156.11,
    s2: 154.65,
    s3: 151.78,
    r1: 158.99,
    r2: 160.41,
    r3: 163.28,
    buyZone: '156.11 - 154.65',
    sellZone: '158.99 - 160.41',
    bias: 'BULLISH',
    biasDescription: 'Yen melemah, US Dollar berkonsolidasi di atas Pivot 157.53 mendekati resistance R1.',
    digits: 2,
    pipMultiplier: 100,
    proOnly: true,
    lastUpdated: new Date().toISOString(),
  },
];

const TIMEFRAME_OPTIONS = [
  { id: '15', label: '15M (Scalping)' },
  { id: '60', label: '1H (SOP Baku)' },
  { id: '240', label: '4H (Struktur)' },
  { id: 'D', label: 'Daily (S&R)' },
];

export default function WatchlistPage() {
  const { user, openPaymentModal } = useUser();
  const isPro = user.tier === 'PRO';

  // Selected pair and timeframe for chart
  const [selectedSymbol, setSelectedSymbol] = useState<string>('XAUUSD');
  const [selectedInterval, setSelectedInterval] = useState<string>('60');
  const [marketData, setMarketData] = useState<SnrMarketData[]>(INITIAL_PAIRS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedText, setLastRefreshedText] = useState('Baru saja');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Fetch real-time live S&R from API
  const fetchLiveSnr = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/market/snr', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          setMarketData(json.data);
          const now = new Date();
          setLastRefreshedText(
            now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB'
          );
        }
      }
    } catch {
      // Keep existing data on error
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Polling every 12 seconds
  useEffect(() => {
    fetchLiveSnr();
    const interval = setInterval(fetchLiveSnr, 12000);
    return () => clearInterval(interval);
  }, [fetchLiveSnr]);

  // Active pair data
  const activePair = marketData.find((p) => p.symbol === selectedSymbol) || marketData[0];
  const isPairLocked = activePair.proOnly && !isPro;

  // Format price helper
  const fmt = (val: number, digits: number) => {
    return val.toLocaleString('en-US', {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
  };

  // Copy to clipboard helper
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Distance calculations relative to current price
  const diffToR1 = activePair.r1 - activePair.price;
  const diffToS1 = activePair.price - activePair.s1;
  const diffToPivot = activePair.price - activePair.pivot;

  // Visual position gauge (percentage between S1 and R1)
  const rangeSpan = Math.max(0.0001, activePair.r1 - activePair.s1);
  const positionPct = Math.min(100, Math.max(0, ((activePair.price - activePair.s1) / rangeSpan) * 100));

  // Determine current market condition
  let marketLocationText = 'Zona Konsolidasi Netral (Di Antara S1 & R1)';
  let marketLocationBadge = 'bg-amber-50 text-amber-800 border-amber-200';
  if (activePair.price >= activePair.r1) {
    marketLocationText = 'Menguji / Di Dalam Supply Resistance (Zona Waspada Sell)';
    marketLocationBadge = 'bg-rose-50 text-rose-700 border-rose-200';
  } else if (activePair.price <= activePair.s1) {
    marketLocationText = 'Menguji / Di Dalam Demand Support (Zona Akumulasi Buy)';
    marketLocationBadge = 'bg-emerald-50 text-[#00A651] border-emerald-200';
  }

  return (
    <div className="space-y-6 pb-24 max-w-7xl mx-auto">
      {/* ======================================================== */}
      {/* 1. HERO TERMINAL TOP BAR                                 */}
      {/* ======================================================== */}
      <div className="rounded-3xl bg-gradient-to-br from-[#003B23] via-[#004D2E] to-[#005A36] text-white p-5 sm:p-7 shadow-lg shadow-[#004D2E]/15 border border-emerald-900/30 relative overflow-hidden">
        {/* Glow ambient background effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00A651]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-emerald-300/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-400/25 text-emerald-300 text-[11px] font-bold uppercase tracking-wider backdrop-blur-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A651] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A651]" />
              </span>
              <span>LIVE FEED TRADINGVIEW PRO ENGINE</span>
              <span className="text-emerald-400/50">•</span>
              <span>SESI LONDON / NEW YORK (WIB)</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Analisa Market &amp; Live Area S&amp;R
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-3xl leading-relaxed font-normal">
              Peta level harga kunci harian (Support, Pivot Point, Resistance) dan zona Supply-Demand objektif tersinkronisasi langsung dari server scanner TradingView secara live.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Live refresh button */}
            <button
              type="button"
              onClick={fetchLiveSnr}
              disabled={isRefreshing}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-semibold flex items-center gap-2 backdrop-blur-xs transition-all cursor-pointer shadow-xs active:scale-95"
              title="Klik untuk segarkan data live sekarang"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-300 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="font-mono text-[11px]">{lastRefreshedText}</span>
            </button>

            <Link
              href={`/calculator?pair=${activePair.symbol}&sl=30`}
              className="px-4 py-2 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#00A651]/30 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <span>Hitung Lot Aman</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {!isPro ? (
              <button
                onClick={() => openPaymentModal('EDUKASI')}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
              >
                <Crown className="w-3.5 h-3.5" /> Buka Akses PRO
              </button>
            ) : (
              <div className="px-3.5 py-1.5 rounded-xl bg-emerald-900/80 border border-emerald-400/40 text-emerald-200 text-xs font-bold flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-amber-300" />
                <span>AKUN PRO AKTIF</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Free Tier Notice Banner */}
      {!isPro && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">
                Akses Terbuka: AUDUSD (Free). Pair Emas (XAUUSD) &amp; Mayor Khusus PRO.
              </h4>
              <p className="text-[11px] text-slate-600">
                Upgrade ke Paket Edukasi Realistis (Rp 250k/bln) untuk akses penuh ke seluruh chart interaktif &amp; zona eksekusi emas dan mata uang mayor.
              </p>
            </div>
          </div>
          <button
            onClick={() => openPaymentModal('EDUKASI')}
            className="px-4 py-2 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white text-xs font-bold whitespace-nowrap cursor-pointer shadow-sm shadow-[#00A651]/20 shrink-0"
          >
            Aktivasi PRO (Rp 250k)
          </button>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. PAIR SELECTOR TABS (CLEAN TRADERS FAMILY STYLE)       */}
      {/* ======================================================== */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1 text-xs">
          <span className="font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Flame className="w-4 h-4 text-[#00A651]" />
            <span>Pilih Pasangan Aset Trading:</span>
          </span>
          <span className="text-slate-400 text-[11px]">Klik tab untuk mengganti chart &amp; S&amp;R</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {marketData.map((pair) => {
            const isSelected = selectedSymbol === pair.symbol;
            const isUp = pair.change24h >= 0;

            return (
              <button
                key={pair.symbol}
                type="button"
                onClick={() => setSelectedSymbol(pair.symbol)}
                className={`p-3 rounded-2xl border text-left transition-all relative cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#00472B] to-[#005A36] text-white border-[#00472B] shadow-md shadow-[#00472B]/20 scale-[1.01]'
                    : 'bg-white hover:bg-slate-50/80 border-slate-200 text-slate-700 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm tracking-tight">
                      {pair.symbol}
                    </span>
                  </div>

                  {pair.proOnly ? (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-md font-extrabold uppercase ${
                        isSelected
                          ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-700'
                          : isPro
                          ? 'bg-emerald-50 text-[#00A651] border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      PRO
                    </span>
                  ) : (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold uppercase ${
                        isSelected ? 'bg-emerald-900 text-emerald-200' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      FREE
                    </span>
                  )}
                </div>

                <div className="flex items-baseline justify-between gap-1">
                  <span className={`font-mono font-black text-sm ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {fmt(pair.price, pair.digits)}
                  </span>
                  <span
                    className={`font-mono text-[10px] font-bold flex items-center ${
                      isSelected
                        ? isUp
                          ? 'text-emerald-300'
                          : 'text-rose-300'
                        : isUp
                        ? 'text-[#00A651]'
                        : 'text-rose-600'
                    }`}
                  >
                    {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    <span>{isUp ? `+${pair.change24h}%` : `${pair.change24h}%`}</span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. ACTIVE PAIR REAL-TIME STATS RIBBON                    */}
      {/* ======================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Metric 1: Live Price */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wider">
            <span>Harga Live {activePair.symbol}</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A651] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A651]" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 tracking-tight">
            {fmt(activePair.price, activePair.digits)}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <span
              className={`font-mono text-[11px] px-1.5 py-0.5 rounded flex items-center gap-0.5 ${
                activePair.change24h >= 0
                  ? 'bg-emerald-50 text-[#00A651] border border-emerald-200'
                  : 'bg-rose-50 text-rose-600 border border-rose-200'
              }`}
            >
              {activePair.change24h >= 0 ? '+' : ''}
              {activePair.change24h}%
            </span>
            <span className="text-[11px] text-slate-400 font-mono">Open: {fmt(activePair.open, activePair.digits)}</span>
          </div>
        </div>

        {/* Metric 2: Pivot Point */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-1">
          <span className="text-[11px] text-amber-800 font-bold uppercase tracking-wider block">
            ⚖️ Pivot Point Tengah (PP)
          </span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-amber-900 tracking-tight">
            {fmt(activePair.pivot, activePair.digits)}
          </div>
          <p className="text-[11px] text-slate-500 font-normal">
            Garis netral pemisah tren buyer &amp; seller hari ini.
          </p>
        </div>

        {/* Metric 3: Today's Range (Low to High with progress bar) */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wider">
            <span>Range Hari Ini</span>
            <span className="font-mono text-slate-600">
              {(activePair.high - activePair.low).toFixed(activePair.digits)} Poin
            </span>
          </div>
          <div className="flex items-center justify-between font-mono text-xs font-bold text-slate-700">
            <span className="text-rose-600">L: {fmt(activePair.low, activePair.digits)}</span>
            <span className="text-[#00A651]">H: {fmt(activePair.high, activePair.digits)}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-[#00A651] rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(
                  100,
                  Math.max(
                    5,
                    ((activePair.price - activePair.low) / Math.max(0.0001, activePair.high - activePair.low)) * 100
                  )
                )}%`,
              }}
            />
          </div>
        </div>

        {/* Metric 4: Live Bias / Market Sentiment */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-1">
          <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
            Bias Sentimen &amp; Arah
          </span>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-black uppercase ${
                activePair.bias === 'BULLISH'
                  ? 'bg-emerald-50 text-[#00A651] border border-emerald-200'
                  : activePair.bias === 'BEARISH'
                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                  : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{activePair.bias} BIAS</span>
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-normal leading-relaxed line-clamp-1">
            {activePair.price >= activePair.pivot ? 'Harga di atas Pivot Point' : 'Harga di bawah Pivot Point'}
          </p>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. MAIN WORKSPACE (CHART & LIVE SNR PANELS)               */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Live TradingView Chart (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-xs space-y-3">
            {/* Chart Toolbar Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base text-slate-900 tracking-tight flex items-center gap-2">
                    <span>{activePair.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded font-mono font-bold bg-slate-100 text-slate-700">
                      {activePair.tvSymbol}
                    </span>
                  </h3>
                </div>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  Chart candlestick real-time dilengkapi otomatis indikator Pivot Points S&amp;R.
                </p>
              </div>

              {/* Timeframe Presets */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
                {TIMEFRAME_OPTIONS.map((tf) => (
                  <button
                    key={tf.id}
                    type="button"
                    onClick={() => setSelectedInterval(tf.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedInterval === tf.id
                        ? 'bg-[#00A651] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>
            </div>

            {/* TradingView Chart Frame */}
            {isPairLocked ? (
              <div className="relative h-[540px] rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center p-6 text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shadow-xs">
                  <Lock className="w-7 h-7" />
                </div>
                <h4 className="text-base font-extrabold text-slate-900">
                  Grafik Interaktif &amp; S&amp;R {activePair.symbol} Khusus Akun PRO
                </h4>
                <p className="text-xs text-slate-600 max-w-sm leading-relaxed">
                  Aktivasi Paket Edukasi Realistis (Promo Rp 250.000/bln) untuk membuka grafik TradingView Pro dan seluruh zona S&amp;R presisi.
                </p>
                <button
                  type="button"
                  onClick={() => openPaymentModal('EDUKASI')}
                  className="px-5 py-2.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs cursor-pointer shadow-md shadow-[#00A651]/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Buka Akses Edukasi PRO (Rp 250k)
                </button>
              </div>
            ) : (
              <TradingViewChart
                symbol={activePair.tvSymbol}
                interval={selectedInterval}
                height={540}
              />
            )}

            {/* Chart Footer Indicator Status */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-100 px-1">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#00A651]" />
                <span>Indikator Otomatis: Pivot Points Standard (S&amp;R Lines)</span>
              </span>
              <span className="font-semibold text-slate-700">
                SOP Realistis: Fixed SL 30 Pips • Risk 1% Modal
              </span>
            </div>
          </div>

          {/* Technical Analysis Speedometer Widget */}
          {!isPairLocked && (
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#00A651]" />
                  <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                    Speedometer Sentimen Teknikal TradingView
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">Timeframe: 1H</span>
              </div>
              <TradingViewTechnicalAnalysis symbol={activePair.tvSymbol} height={420} />
            </div>
          )}
        </div>

        {/* Right Column: LIVE AREA SNR MASTER PANEL (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-5">
            {/* Panel Title & Current Location Indicator */}
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-[#00A651]" />
                  <span>Peta Level S&amp;R &amp; Zona Eksekusi</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
                  LIVE WIB
                </span>
              </div>

              {/* Real-time Position Thermometer Card */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Status Posisi Harga:</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${marketLocationBadge}`}>
                    {marketLocationText}
                  </span>
                </div>

                {/* Progress bar S1 to R1 */}
                <div className="space-y-1">
                  <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-r from-[#00A651] via-amber-400 to-rose-500 rounded-full transition-all duration-300"
                      style={{ width: `${positionPct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono font-bold text-slate-500">
                    <span className="text-[#00A651]">S1: {fmt(activePair.s1, activePair.digits)}</span>
                    <span className="text-amber-800">PP: {fmt(activePair.pivot, activePair.digits)}</span>
                    <span className="text-rose-600">R1: {fmt(activePair.r1, activePair.digits)}</span>
                  </div>
                </div>

                {/* Distances */}
                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-mono">
                  <div className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 flex items-center justify-between">
                    <span>Jarak ke R1:</span>
                    <span className={`font-bold ${diffToR1 >= 0 ? 'text-rose-600' : 'text-slate-400'}`}>
                      {diffToR1 >= 0 ? `+${diffToR1.toFixed(activePair.digits)}` : 'Tembus'}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 flex items-center justify-between">
                    <span>Jarak ke S1:</span>
                    <span className={`font-bold ${diffToS1 >= 0 ? 'text-[#00A651]' : 'text-slate-400'}`}>
                      {diffToS1 >= 0 ? `-${diffToS1.toFixed(activePair.digits)}` : 'Tembus'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Smart Money Concept Execution Zones */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#00A651]" />
                <span>Zona Eksekusi Objektif (Smart Money Concept)</span>
              </h4>

              {/* Buy Demand Zone (S1 - S2) */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/90 to-emerald-100/50 border border-emerald-300/80 space-y-2 relative overflow-hidden shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00A651] animate-pulse" />
                    <span className="font-black text-xs text-[#00472B] uppercase tracking-wider">
                      🎯 Area Beli (Demand Zone S1 - S2)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(activePair.buyZone, 'buyZone')}
                    className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-emerald-800 text-[11px] font-bold border border-emerald-200 flex items-center gap-1 shadow-2xs cursor-pointer transition-all active:scale-95"
                    title="Salin rentang harga buy"
                  >
                    {copiedKey === 'buyZone' ? <Check className="w-3.5 h-3.5 text-[#00A651]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'buyZone' ? 'Tersalin' : 'Salin'}</span>
                  </button>
                </div>

                <div className="text-xl font-black font-mono text-slate-900 tracking-tight">
                  {activePair.buyZone}
                </div>

                <p className="text-[11px] text-slate-600 font-normal leading-relaxed">
                  Zona akumulasi buyer institusional. <strong>Aturan SOP:</strong> Tunggu formasi candle rejection (Pinbar / Bullish Engulfing) di area ini sebelum menekan tombol BUY.
                </p>
              </div>

              {/* Sell Supply Zone (R1 - R2) */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-50/90 to-rose-100/50 border border-rose-300/80 space-y-2 relative overflow-hidden shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" />
                    <span className="font-black text-xs text-rose-900 uppercase tracking-wider">
                      🛑 Area Jual (Supply Zone R1 - R2)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(activePair.sellZone, 'sellZone')}
                    className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-rose-800 text-[11px] font-bold border border-rose-200 flex items-center gap-1 shadow-2xs cursor-pointer transition-all active:scale-95"
                    title="Salin rentang harga sell"
                  >
                    {copiedKey === 'sellZone' ? <Check className="w-3.5 h-3.5 text-[#00A651]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'sellZone' ? 'Tersalin' : 'Salin'}</span>
                  </button>
                </div>

                <div className="text-xl font-black font-mono text-slate-900 tracking-tight">
                  {activePair.sellZone}
                </div>

                <p className="text-[11px] text-slate-600 font-normal leading-relaxed">
                  Zona pertahanan batas atas seller. <strong>Aturan SOP:</strong> Antisipasi penolakan harga atas (Shooting Star / Bearish Engulfing) sebelum membuka posisi SELL.
                </p>
              </div>
            </div>

            {/* Structured 7-Tier S&R Matrix Table */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#00A651]" />
                  <span>Matriks Level S&amp;R Lengkap</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Classic Floor Pivot</span>
              </div>

              <div className="space-y-1 font-mono text-xs">
                {/* R3 */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/60 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-6 text-[10px] font-bold text-rose-600">R3</span>
                    <span className="text-slate-500 font-sans text-[11px]">Batas Ekstrem Atas</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(String(activePair.r3), 'R3')}
                    className="font-bold text-rose-600 hover:underline flex items-center gap-1"
                  >
                    <span>{fmt(activePair.r3, activePair.digits)}</span>
                    {copiedKey === 'R3' && <Check className="w-3 h-3 text-[#00A651]" />}
                  </button>
                </div>

                {/* R2 */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-rose-50/40 border border-rose-100 hover:bg-rose-50/70 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-6 text-[10px] font-bold text-rose-700">R2</span>
                    <span className="text-slate-600 font-sans text-[11px]">Strong Supply Zone</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(String(activePair.r2), 'R2')}
                    className="font-bold text-rose-700 hover:underline flex items-center gap-1"
                  >
                    <span>{fmt(activePair.r2, activePair.digits)}</span>
                    {copiedKey === 'R2' && <Check className="w-3 h-3 text-[#00A651]" />}
                  </button>
                </div>

                {/* R1 */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-rose-50/70 border border-rose-200 hover:bg-rose-100/60 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-6 text-[10px] font-black text-rose-800">R1</span>
                    <span className="text-rose-900 font-sans font-semibold text-[11px]">Resistance Kunci Harian</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(String(activePair.r1), 'R1')}
                    className="font-black text-rose-800 hover:underline flex items-center gap-1"
                  >
                    <span>{fmt(activePair.r1, activePair.digits)}</span>
                    {copiedKey === 'R1' && <Check className="w-3 h-3 text-[#00A651]" />}
                  </button>
                </div>

                {/* PIVOT POINT (PROMINENT GOLD ROW) */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100/70 border border-amber-300 shadow-2xs my-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 text-xs font-black text-amber-900">PP</span>
                    <span className="text-amber-900 font-sans font-black text-xs">PIVOT POINT KESEIMBANGAN</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(String(activePair.pivot), 'PP')}
                    className="font-black text-amber-950 text-sm hover:underline flex items-center gap-1"
                  >
                    <span>{fmt(activePair.pivot, activePair.digits)}</span>
                    {copiedKey === 'PP' && <Check className="w-3.5 h-3.5 text-[#00A651]" />}
                  </button>
                </div>

                {/* S1 */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50/70 border border-emerald-200 hover:bg-emerald-100/60 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-6 text-[10px] font-black text-[#005A36]">S1</span>
                    <span className="text-[#005A36] font-sans font-semibold text-[11px]">Support Kunci Harian</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(String(activePair.s1), 'S1')}
                    className="font-black text-[#00A651] hover:underline flex items-center gap-1"
                  >
                    <span>{fmt(activePair.s1, activePair.digits)}</span>
                    {copiedKey === 'S1' && <Check className="w-3 h-3 text-[#00A651]" />}
                  </button>
                </div>

                {/* S2 */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50/40 border border-emerald-100 hover:bg-emerald-50/70 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-6 text-[10px] font-bold text-[#005A36]">S2</span>
                    <span className="text-slate-600 font-sans text-[11px]">Strong Demand Zone</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(String(activePair.s2), 'S2')}
                    className="font-bold text-[#005A36] hover:underline flex items-center gap-1"
                  >
                    <span>{fmt(activePair.s2, activePair.digits)}</span>
                    {copiedKey === 'S2' && <Check className="w-3 h-3 text-[#00A651]" />}
                  </button>
                </div>

                {/* S3 */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/60 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-6 text-[10px] font-bold text-slate-600">S3</span>
                    <span className="text-slate-500 font-sans text-[11px]">Batas Ekstrem Bawah</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(String(activePair.s3), 'S3')}
                    className="font-bold text-slate-700 hover:underline flex items-center gap-1"
                  >
                    <span>{fmt(activePair.s3, activePair.digits)}</span>
                    {copiedKey === 'S3' && <Check className="w-3 h-3 text-[#00A651]" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Action Button to Calculator */}
            <Link
              href={`/calculator?pair=${activePair.symbol}&sl=30`}
              className="w-full py-3 px-4 rounded-2xl bg-[#00A651] hover:bg-[#008F45] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#00A651]/20 transition-all hover:scale-[1.01] active:scale-98 cursor-pointer"
            >
              <span>Hitung Ukuran Lot untuk {activePair.symbol}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* SOP Rule Reminder Card */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-[#00A651]" />
                <span>Aturan SOP: Dilarang Entry di Tengah!</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                Bila harga berada di antara S1 dan R1 tanpa sinyal konfirmasi valid, jangan buka posisi karena rawan terjebak whipsaw. Selalu gunakan batasan <strong>Stop Loss 30 Pips</strong> untuk memproteksi modal trading dari kehancuran Margin Call.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. COMPLETE MARKET WATCHLIST (ALL MONITORED PAIRS)       */}
      {/* ======================================================== */}
      <div className="space-y-4 pt-6 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Peta Komparasi S&amp;R Seluruh Pair Monitor
            </h3>
            <p className="text-xs text-slate-500 font-normal">
              Perbandingan level harga kunci dan zona eksekusi di seluruh mata uang mayor dan emas.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">Total {marketData.length} Aset Live</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {marketData.map((item) => {
            const isCurrent = item.symbol === selectedSymbol;
            const isUp = item.change24h >= 0;

            return (
              <div
                key={item.symbol}
                onClick={() => setSelectedSymbol(item.symbol)}
                className={`bg-white rounded-3xl p-5 border relative overflow-hidden flex flex-col justify-between shadow-xs transition-all cursor-pointer ${
                  isCurrent
                    ? 'border-[#00A651] ring-2 ring-[#00A651]/20 shadow-md scale-[1.01]'
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-base font-extrabold text-slate-900">{item.symbol}</h4>
                        {isCurrent && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded font-bold bg-[#00A651] text-white">
                            AKTIF
                          </span>
                        )}
                        {item.proOnly && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded font-extrabold bg-amber-50 text-amber-800 border border-amber-200">
                            PRO
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 line-clamp-1">{item.name}</span>
                    </div>

                    <div className="text-right">
                      <span className="font-mono font-black text-sm text-slate-900 block">
                        {fmt(item.price, item.digits)}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold flex items-center justify-end ${
                          isUp ? 'text-[#00A651]' : 'text-rose-600'
                        }`}
                      >
                        {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        <span>{isUp ? `+${item.change24h}%` : `${item.change24h}%`}</span>
                      </span>
                    </div>
                  </div>

                  {/* S&R Mini Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3 font-mono">
                    <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
                      <span className="text-[#005A36] text-[10px] block font-bold">Support 1 (S1)</span>
                      <span className="font-bold text-[#00A651]">{fmt(item.s1, item.digits)}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200">
                      <span className="text-rose-800 text-[10px] block font-bold">Resistance 1 (R1)</span>
                      <span className="font-bold text-rose-700">{fmt(item.r1, item.digits)}</span>
                    </div>
                  </div>

                  {/* Zones */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 mb-3 font-mono">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-amber-800 font-sans font-bold">⚖️ Pivot Point:</span>
                      <span className="font-bold text-slate-900">{fmt(item.pivot, item.digits)}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#005A36] font-sans font-bold">🎯 Buy Zone:</span>
                      <span className="font-bold text-slate-800">{item.buyZone}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-rose-800 font-sans font-bold">🛑 Sell Zone:</span>
                      <span className="font-bold text-slate-800">{item.sellZone}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                    {item.biasDescription}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#00A651]">
                  <span>Buka di Chart TradingView</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
