'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
  Compass
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

export default function WatchlistPage() {
  const { user, openPaymentModal } = useUser();
  const isPro = user.tier === 'PRO';

  // Selected pair for active chart and deep-dive S&R inspection
  const [selectedSymbol, setSelectedSymbol] = useState<string>('XAUUSD');
  const [marketData, setMarketData] = useState<SnrMarketData[]>(INITIAL_PAIRS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedText, setLastRefreshedText] = useState('Baru saja');

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

  return (
    <div className="space-y-6 pb-20">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-[#00A651] border border-emerald-200">
              <LineChart className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Analisa Market &amp; Live Area S&amp;R (TradingView)
            </h1>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl font-normal">
            Peta level harga kunci harian (Support, Pivot, Resistance) dan area Supply-Demand objektif tersinkronisasi live langsung dari TradingView.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {/* Live indicator button */}
          <button
            type="button"
            onClick={fetchLiveSnr}
            disabled={isRefreshing}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-2 shadow-2xs transition-all cursor-pointer"
            title="Klik untuk segarkan data sekarang"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A651] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A651]" />
            </span>
            <span className="font-mono text-[11px]">{lastRefreshedText}</span>
            <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isRefreshing ? 'animate-spin text-[#00A651]' : ''}`} />
          </button>

          {!isPro ? (
            <button
              onClick={() => openPaymentModal('EDUKASI')}
              className="px-4 py-2 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#00A651]/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Crown className="w-3.5 h-3.5" /> Buka Akses PRO
            </button>
          ) : (
            <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[#00A651] text-xs font-bold flex items-center gap-1.5">
              <Crown className="w-4 h-4 text-[#00A651]" /> SEMUA ZONA PRO TERBUKA
            </div>
          )}
        </div>
      </div>

      {/* Free Tier Notice */}
      {!isPro && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-xs text-slate-700">
              Anda sedang menggunakan mode <strong className="text-slate-900">Edukasi Dasar (Free)</strong>. Buka Paket Edukasi Realistis (Promo Rp 250.000/bln) untuk akses tanpa batas ke live S&amp;R <strong className="text-emerald-800">Emas (XAUUSD), EURUSD, GBPUSD, dan USDJPY</strong>.
            </p>
          </div>
          <button
            onClick={() => openPaymentModal('EDUKASI')}
            className="px-3.5 py-1.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white text-xs font-bold whitespace-nowrap cursor-pointer shadow-sm shadow-[#00A651]/20 shrink-0"
          >
            Aktivasi Edukasi (Rp 250k)
          </button>
        </div>
      )}

      {/* 2. Pair Selector Tabs (Clean Traders Family Style) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {marketData.map((pair) => {
          const isSelected = selectedSymbol === pair.symbol;
          const isLocked = pair.proOnly && !isPro;

          return (
            <button
              key={pair.symbol}
              type="button"
              onClick={() => setSelectedSymbol(pair.symbol)}
              className={`px-4 py-2.5 rounded-2xl border font-bold text-xs flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'bg-gradient-to-r from-[#00472B] to-[#005A36] text-white border-transparent shadow-md shadow-[#00472B]/20'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <span>{pair.symbol}</span>
              <span
                className={`font-mono text-[11px] ${
                  isSelected ? 'text-emerald-200' : pair.change24h >= 0 ? 'text-[#00A651]' : 'text-rose-600'
                }`}
              >
                {fmt(pair.price, pair.digits)}
              </span>
              {pair.proOnly ? (
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded font-extrabold uppercase ${
                    isSelected
                      ? 'bg-emerald-800 text-emerald-100'
                      : isPro
                      ? 'bg-emerald-50 text-[#00A651] border border-emerald-200'
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}
                >
                  PRO
                </span>
              ) : (
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                    isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  FREE
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Main Active Pair Workspace (Interactive Live TradingView Chart + Real-Time S&R Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Live TradingView Chart (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#00A651] border border-emerald-200 flex items-center justify-center font-black text-xs">
                  TV
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <span>{activePair.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-slate-100 text-slate-700">
                      {activePair.tvSymbol}
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Live Candlestick Chart dengan indikator Pivot Point S&amp;R TradingView bawaan.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-mono font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 ${
                    activePair.change24h >= 0
                      ? 'bg-emerald-50 text-[#00A651] border border-emerald-200'
                      : 'bg-rose-50 text-rose-600 border border-rose-200'
                  }`}
                >
                  {activePair.change24h >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  <span>{activePair.change24h >= 0 ? `+${activePair.change24h}%` : `${activePair.change24h}%`}</span>
                </span>
              </div>
            </div>

            {/* TradingView Chart Container */}
            {isPairLocked ? (
              <div className="relative h-[480px] rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center p-6 text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                  <Lock className="w-7 h-7" />
                </div>
                <h4 className="text-base font-extrabold text-slate-900">
                  Chart Live &amp; S&amp;R {activePair.symbol} Khusus Akun PRO
                </h4>
                <p className="text-xs text-slate-600 max-w-sm leading-relaxed">
                  Pasangan mata uang dan emas spot memerlukan aktivasi Paket Edukasi Realistis untuk melihat grafik interaktif serta peta level S&amp;R live.
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
              <TradingViewChart symbol={activePair.tvSymbol} height={480} />
            )}

            <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 px-1">
              <span>💡 Gunakan tombol timeframe di atas chart (1h, 4h, D) untuk membaca tren bertahap.</span>
              <span className="font-semibold text-slate-700">SOP: Disiplin Fixed SL 30 Pips</span>
            </div>
          </div>

          {/* TradingView Technical Analysis Gauge Widget */}
          {!isPairLocked && (
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Activity className="w-4 h-4 text-[#00A651]" />
                <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                  Oscillator &amp; Moving Average Speedometer (TradingView)
                </h3>
              </div>
              <TradingViewTechnicalAnalysis symbol={activePair.tvSymbol} height={420} />
            </div>
          )}
        </div>

        {/* Right: Live S&R Area & Zones Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
            {/* Header / Current Live Price */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Harga Real-Time Live
                </span>
                <div className="text-3xl font-black font-mono text-slate-900 tracking-tight flex items-center gap-2">
                  <span>{fmt(activePair.price, activePair.digits)}</span>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black uppercase ${
                    activePair.bias === 'BULLISH'
                      ? 'bg-emerald-50 text-[#00A651] border border-emerald-200'
                      : activePair.bias === 'BEARISH'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>BIAS: {activePair.bias}</span>
                </span>
                <span className="text-[10px] text-slate-400 block mt-1 font-mono">
                  Range: {fmt(activePair.low, activePair.digits)} - {fmt(activePair.high, activePair.digits)}
                </span>
              </div>
            </div>

            {/* Smart Money Concept Execution Zones */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-4 h-4 text-[#00A651]" />
                <span>Rekomendasi Zona Eksekusi Objektif</span>
              </h4>

              {/* Buy Demand Zone */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-[#005A36] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#00A651]" />
                    <span>🎯 Area Beli (Demand Zone S1-S2)</span>
                  </span>
                  <span className="font-mono font-bold text-[#00A651] text-xs">BUY AREA</span>
                </div>
                <div className="text-base font-black font-mono text-slate-900">
                  {activePair.buyZone}
                </div>
                <p className="text-[11px] text-slate-600 font-normal leading-relaxed">
                  Zona pantulan buyer valid. Tunggu candle rejection (pinbar / engulfing) di area ini sebelum open BUY.
                </p>
              </div>

              {/* Sell Supply Zone */}
              <div className="p-3.5 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-rose-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-600" />
                    <span>🛑 Area Jual (Supply Zone R1-R2)</span>
                  </span>
                  <span className="font-mono font-bold text-rose-700 text-xs">SELL AREA</span>
                </div>
                <div className="text-base font-black font-mono text-slate-900">
                  {activePair.sellZone}
                </div>
                <p className="text-[11px] text-slate-600 font-normal leading-relaxed">
                  Zona batas atas penjual. Peluang sell rasional saat harga gagal menembus resistance kunci.
                </p>
              </div>
            </div>

            {/* Complete 7-Tier S&R Breakdown Table */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#00A651]" />
                  <span>Level Support &amp; Resistance Live</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Formula: Classic Pivot</span>
              </div>

              <div className="space-y-1 font-mono text-xs">
                {/* R3 */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 font-bold text-[11px]">R3 (Batas Ekstrem Atas)</span>
                  <span className="font-bold text-rose-600">{fmt(activePair.r3, activePair.digits)}</span>
                </div>
                {/* R2 */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-rose-50/40 border border-rose-100">
                  <span className="text-rose-700 font-bold text-[11px]">R2 (Strong Supply Resistance)</span>
                  <span className="font-bold text-rose-700">{fmt(activePair.r2, activePair.digits)}</span>
                </div>
                {/* R1 */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-rose-50/70 border border-rose-200">
                  <span className="text-rose-800 font-bold text-[11px]">R1 (Resistance Kunci Harian)</span>
                  <span className="font-extrabold text-rose-800">{fmt(activePair.r1, activePair.digits)}</span>
                </div>

                {/* PIVOT POINT */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50 border border-amber-300 shadow-2xs my-1">
                  <span className="text-amber-900 font-black text-xs flex items-center gap-1">
                    <span>⚖️ PIVOT POINT TENGAH (PP)</span>
                  </span>
                  <span className="font-black text-amber-900 text-sm">{fmt(activePair.pivot, activePair.digits)}</span>
                </div>

                {/* S1 */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50/70 border border-emerald-200">
                  <span className="text-[#005A36] font-bold text-[11px]">S1 (Support Kunci Harian)</span>
                  <span className="font-extrabold text-[#00A651]">{fmt(activePair.s1, activePair.digits)}</span>
                </div>
                {/* S2 */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50/40 border border-emerald-100">
                  <span className="text-[#005A36] font-bold text-[11px]">S2 (Strong Demand Support)</span>
                  <span className="font-bold text-[#005A36]">{fmt(activePair.s2, activePair.digits)}</span>
                </div>
                {/* S3 */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 font-bold text-[11px]">S3 (Batas Ekstrem Bawah)</span>
                  <span className="font-bold text-slate-700">{fmt(activePair.s3, activePair.digits)}</span>
                </div>
              </div>
            </div>

            {/* SOP Rule Reminder Card */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-[#00A651]" />
                <span>SOP Realistis: Jangan Entry di Tengah!</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                Hindari open posisi sembarangan saat harga berada di antara S1 dan R1 tanpa zona valid. Selalu gunakan kalkulator lot aman dan pasang batasan <strong>Stop Loss 30 Pips</strong> untuk memproteksi modal dari kerugian fatal.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Complete Market Watchlist Grid (All Monitored Pairs Overview) */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Ringkasan Live S&amp;R Seluruh Pair Monitor
            </h3>
            <p className="text-xs text-slate-500">
              Peta komparasi level support &amp; resistance untuk pasangan forex mayor dan komoditas emas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {marketData.map((item) => {
            const isLocked = item.proOnly && !isPro;
            const isCurrent = item.symbol === selectedSymbol;

            return (
              <div
                key={item.symbol}
                onClick={() => setSelectedSymbol(item.symbol)}
                className={`bg-white rounded-3xl p-5 border relative overflow-hidden flex flex-col justify-between shadow-xs transition-all cursor-pointer ${
                  isCurrent
                    ? 'border-[#00A651] ring-2 ring-[#00A651]/20 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-base font-extrabold text-slate-900">{item.symbol}</h4>
                        {isCurrent && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded font-bold bg-[#00A651] text-white">
                            AKTIF
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
                        className={`text-[10px] font-mono font-bold ${
                          item.change24h >= 0 ? 'text-[#00A651]' : 'text-rose-600'
                        }`}
                      >
                        {item.change24h >= 0 ? `+${item.change24h}%` : `${item.change24h}%`}
                      </span>
                    </div>
                  </div>

                  {/* S&R Mini Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3 font-mono">
                    <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                      <span className="text-[#005A36] text-[10px] block font-bold">Support 1 (S1)</span>
                      <span className="font-bold text-[#00A651]">{fmt(item.s1, item.digits)}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-rose-50/60 border border-rose-100">
                      <span className="text-rose-700 text-[10px] block font-bold">Resistance 1 (R1)</span>
                      <span className="font-bold text-rose-600">{fmt(item.r1, item.digits)}</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1 mb-2 font-mono">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-sans">⚖️ Pivot:</span>
                      <span className="font-bold text-slate-900">{fmt(item.pivot, item.digits)}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#005A36] font-sans font-bold">🎯 Buy Zone:</span>
                      <span className="font-semibold text-slate-800">{item.buyZone}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-rose-700 font-sans font-bold">🛑 Sell Zone:</span>
                      <span className="font-semibold text-slate-800">{item.sellZone}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                    {item.biasDescription}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#00A651]">
                  <span>Lihat Grafik TradingView</span>
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
