'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  BookOpenCheck,
  Plus,
  Crown,
  Sparkles,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Lock,
  Smile,
  AlertOctagon,
  Flame,
  Target,
  BarChart3,
  Calendar,
  ShieldAlert,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Radio,
  Zap,
  Trash2,
  ExternalLink,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { JournalRecord, JournalExitStatus } from '@/types';
import { calculateTradePnL, calculateRiskRewardRatio } from '@/utils/tradeCalculator';
import TradingViewTickerTape from '@/components/tradingview/TradingViewTickerTape';
import TradingViewMiniChart from '@/components/tradingview/TradingViewMiniChart';

interface PairQuote {
  symbol: string;
  name: string;
  price: number;
  bid: number;
  ask: number;
  change24h: number;
  digits: number;
}

const DEFAULT_QUOTES: Record<string, PairQuote> = {
  XAUUSD: {
    symbol: 'XAUUSD',
    name: 'Gold vs US Dollar',
    price: 2684.50,
    bid: 2684.35,
    ask: 2684.65,
    change24h: 0.84,
    digits: 2,
  },
  EURUSD: {
    symbol: 'EURUSD',
    name: 'Euro / US Dollar',
    price: 1.0872,
    bid: 1.0871,
    ask: 1.0873,
    change24h: -0.12,
    digits: 4,
  },
  GBPUSD: {
    symbol: 'GBPUSD',
    name: 'British Pound / US Dollar',
    price: 1.2985,
    bid: 1.2984,
    ask: 1.2987,
    change24h: 0.25,
    digits: 4,
  },
  USDJPY: {
    symbol: 'USDJPY',
    name: 'US Dollar / Yen',
    price: 152.45,
    bid: 152.43,
    ask: 152.47,
    change24h: 0.42,
    digits: 2,
  },
};

export default function JournalPage() {
  const { user, journals, addJournalEntry, deleteJournalEntry, setTier, marketPrice } = useUser();
  const isPro = user.tier === 'PRO';

  // Live Multi-Currency TradingView Quotes
  const [quotes, setQuotes] = useState<Record<string, PairQuote>>(DEFAULT_QUOTES);
  const [lastQuoteUpdate, setLastQuoteUpdate] = useState<string>('Live');
  const [isTickActive, setIsTickActive] = useState<boolean>(false);
  const [showTvChart, setShowTvChart] = useState<boolean>(false);
  const [selectedChartPair, setSelectedChartPair] = useState<string>('XAUUSD');

  // Modal State
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Form input state
  const [pair, setPair] = useState<string>('XAUUSD');
  const [direction, setDirection] = useState<'BUY' | 'SELL'>('BUY');
  const [lot, setLot] = useState<number>(0.05);
  const [entryPrice, setEntryPrice] = useState<number>(2680.00);
  const [stopLoss, setStopLoss] = useState<number>(2670.00);
  const [takeProfit, setTakeProfit] = useState<number>(2700.00);
  const [exitPrice, setExitPrice] = useState<number>(2670.00);
  const [exitStatus, setExitStatus] = useState<JournalExitStatus>('HIT_SL');
  const [pnl, setPnl] = useState<number>(-50.00);
  const [emotion, setEmotion] = useState<JournalRecord['emotion']>('DISCIPLINED');
  const [adheredToPlan, setAdheredToPlan] = useState<boolean>(true);
  const [notes, setNotes] = useState<string>('');
  const [autoPnlNotice, setAutoPnlNotice] = useState<string>('PnL otomatis terisi dari perhitungan Stop Loss (SL)');

  // Fetch real-time quotes from API
  const fetchQuotes = useCallback(async () => {
    try {
      const res = await fetch('/api/market/quotes');
      if (res.ok) {
        const data = await res.json();
        if (data && data.quotes) {
          setQuotes(data.quotes);
          setLastQuoteUpdate(new Date().toLocaleTimeString('id-ID'));
          setIsTickActive(true);
          setTimeout(() => setIsTickActive(false), 800);
        }
      }
    } catch {
      // Fallback: update XAUUSD from marketPrice context
      if (marketPrice?.price) {
        setQuotes((prev) => ({
          ...prev,
          XAUUSD: {
            ...prev.XAUUSD,
            price: marketPrice.price,
            bid: marketPrice.bid || marketPrice.price - 0.2,
            ask: marketPrice.ask || marketPrice.price + 0.2,
            change24h: marketPrice.change24h || 0.84,
          },
        }));
      }
    }
  }, [marketPrice]);

  useEffect(() => {
    fetchQuotes();
    const interval = setInterval(fetchQuotes, 3500);
    return () => clearInterval(interval);
  }, [fetchQuotes]);

  // Current active live spot price for selected pair
  const currentLiveQuote = quotes[pair] || DEFAULT_QUOTES[pair] || DEFAULT_QUOTES.XAUUSD;
  const currentLivePrice = currentLiveQuote.price;

  // Real-time calculation helpers for form
  const slCalc = useMemo(() => {
    return calculateTradePnL(pair, direction, lot, entryPrice, stopLoss);
  }, [pair, direction, lot, entryPrice, stopLoss]);

  const tpCalc = useMemo(() => {
    return calculateTradePnL(pair, direction, lot, entryPrice, takeProfit);
  }, [pair, direction, lot, entryPrice, takeProfit]);

  const rrRatio = useMemo(() => {
    return calculateRiskRewardRatio(direction, entryPrice, stopLoss, takeProfit);
  }, [direction, entryPrice, stopLoss, takeProfit]);

  // Handle pair change in modal: set sensible defaults
  const handlePairChange = (newPair: string) => {
    setPair(newPair);
    const quote = quotes[newPair] || DEFAULT_QUOTES[newPair];
    const live = quote ? quote.price : 2684.50;

    if (newPair === 'XAUUSD') {
      setLot(0.05);
      setEntryPrice(live);
      if (direction === 'BUY') {
        setStopLoss(Math.round((live - 10) * 100) / 100);
        setTakeProfit(Math.round((live + 20) * 100) / 100);
      } else {
        setStopLoss(Math.round((live + 10) * 100) / 100);
        setTakeProfit(Math.round((live - 20) * 100) / 100);
      }
    } else if (newPair === 'USDJPY') {
      setLot(0.10);
      setEntryPrice(live);
      if (direction === 'BUY') {
        setStopLoss(Math.round((live - 0.50) * 100) / 100);
        setTakeProfit(Math.round((live + 1.00) * 100) / 100);
      } else {
        setStopLoss(Math.round((live + 0.50) * 100) / 100);
        setTakeProfit(Math.round((live - 1.00) * 100) / 100);
      }
    } else {
      // EURUSD / GBPUSD
      setLot(0.10);
      setEntryPrice(live);
      if (direction === 'BUY') {
        setStopLoss(Math.round((live - 0.0030) * 10000) / 10000);
        setTakeProfit(Math.round((live + 0.0060) * 10000) / 10000);
      } else {
        setStopLoss(Math.round((live + 0.0030) * 10000) / 10000);
        setTakeProfit(Math.round((live - 0.0060) * 10000) / 10000);
      }
    }

    // Auto-fill exit price to SL if default exitStatus is HIT_SL
    if (exitStatus === 'HIT_SL') {
      const defaultSl = direction === 'BUY' ? live - 10 : live + 10;
      setExitPrice(Math.round(defaultSl * 100) / 100);
      const res = calculateTradePnL(newPair, direction, 0.05, live, defaultSl);
      setPnl(res.pnl);
    }
  };

  // Quick Action Handler for Outcome Status
  const handleSelectOutcome = (status: JournalExitStatus) => {
    setExitStatus(status);
    if (status === 'HIT_SL') {
      setExitPrice(stopLoss);
      const res = calculateTradePnL(pair, direction, lot, entryPrice, stopLoss);
      setPnl(res.pnl);
      setAutoPnlNotice(`✅ PnL otomatis terisi: Kena SL ($${stopLoss}) → -$${Math.abs(res.pnl).toFixed(2)} (${res.pips} pips)`);
    } else if (status === 'HIT_TP') {
      setExitPrice(takeProfit);
      const res = calculateTradePnL(pair, direction, lot, entryPrice, takeProfit);
      setPnl(res.pnl);
      setAutoPnlNotice(`✅ PnL otomatis terisi: Kena TP ($${takeProfit}) → +$${res.pnl.toFixed(2)} (+${res.pips} pips)`);
    } else if (status === 'REALTIME_CLOSE') {
      setExitPrice(currentLivePrice);
      const res = calculateTradePnL(pair, direction, lot, entryPrice, currentLivePrice);
      setPnl(res.pnl);
      setAutoPnlNotice(`⚡ PnL terisi dari harga Real-Time TradingView ($${currentLivePrice}) → ${res.pnl >= 0 ? '+' : ''}$${res.pnl.toFixed(2)}`);
    } else if (status === 'RUNNING') {
      setExitPrice(currentLivePrice);
      const res = calculateTradePnL(pair, direction, lot, entryPrice, currentLivePrice);
      setPnl(res.pnl);
      setAutoPnlNotice(`🔄 Posisi Running: Floating PnL dihitung otomatis dari live spot TradingView ($${currentLivePrice})`);
    } else {
      // MANUAL_CLOSE
      setAutoPnlNotice('✏️ Mode manual: Anda dapat mengedit harga exit atau PnL sesuka Anda');
    }
  };

  // Re-sync PnL if user changes Stop Loss while status is HIT_SL
  const handleStopLossChange = (newSl: number) => {
    setStopLoss(newSl);
    if (exitStatus === 'HIT_SL') {
      setExitPrice(newSl);
      const res = calculateTradePnL(pair, direction, lot, entryPrice, newSl);
      setPnl(res.pnl);
      setAutoPnlNotice(`⚡ PnL diperbarui otomatis sesuai perubahan SL: -$${Math.abs(res.pnl).toFixed(2)}`);
    }
  };

  // Re-sync PnL if user changes Take Profit while status is HIT_TP
  const handleTakeProfitChange = (newTp: number) => {
    setTakeProfit(newTp);
    if (exitStatus === 'HIT_TP') {
      setExitPrice(newTp);
      const res = calculateTradePnL(pair, direction, lot, entryPrice, newTp);
      setPnl(res.pnl);
      setAutoPnlNotice(`⚡ PnL diperbarui otomatis sesuai perubahan TP: +$${res.pnl.toFixed(2)}`);
    }
  };

  // Copy Real-time TradingView price to Entry
  const handleUseRealTimeEntry = () => {
    setEntryPrice(currentLivePrice);
    if (exitStatus === 'HIT_SL') {
      const res = calculateTradePnL(pair, direction, lot, currentLivePrice, stopLoss);
      setPnl(res.pnl);
    }
  };

  // Statistics
  const totalTrades = journals.length;
  const winningTrades = journals.filter((j) => j.pnl > 0).length;
  const losingTrades = journals.filter((j) => j.pnl < 0).length;
  const hitSlTrades = journals.filter((j) => j.exitStatus === 'HIT_SL' || j.pnl < 0).length;
  const hitTpTrades = journals.filter((j) => j.exitStatus === 'HIT_TP' || j.pnl > 0).length;
  const totalProfit = journals.filter((j) => j.pnl > 0).reduce((acc, curr) => acc + curr.pnl, 0);
  const totalLoss = Math.abs(journals.filter((j) => j.pnl < 0).reduce((acc, curr) => acc + curr.pnl, 0));
  const winRate = totalTrades > 0 ? Number(((winningTrades / totalTrades) * 100).toFixed(1)) : 0;
  const disciplinedTrades = journals.filter((j) => j.adheredToPlan && j.emotion !== 'REVENGE_TRADING').length;
  const disciplineScore = totalTrades > 0 ? Math.round((disciplinedTrades / totalTrades) * 100) : 0;

  // Free Tier limitation: max 10 inputs/month
  const maxFreeEntries = 10;
  const currentEntriesCount = journals.length;
  const isQuotaFull = !isPro && currentEntriesCount >= maxFreeEntries;

  const handleAddTrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (isQuotaFull) return;

    // Calculate final pips
    const finalCalc = calculateTradePnL(pair, direction, lot, entryPrice, exitPrice);

    addJournalEntry({
      pair,
      direction,
      lot,
      entryPrice,
      stopLoss,
      takeProfit,
      exitPrice,
      exitStatus,
      pnl,
      pips: Math.abs(finalCalc.pips),
      accountType: 'STANDARD',
      emotion,
      adheredToPlan,
      notes: notes || (exitStatus === 'HIT_SL' ? 'Kena Stop Loss disiplin SOP RealistisFx' : 'Pencatatan disiplin SOP RealistisFx'),
    });

    setShowAddModal(false);
  };

  const emotionLabels = {
    DISCIPLINED: { label: '🎯 Disiplin Ikut SOP', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    CALM_CONFIDENT: { label: '🧘 Tenang & Percaya Diri', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
    FOMO: { label: '⚡ FOMO Takut Tertinggal', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    ANXIOUS_GREEDY: { label: '😬 Cemas / Serakah', color: 'text-orange-400 bg-orange-500/10 border-orange-500/20' },
    REVENGE_TRADING: { label: '😡 Balas Dendam (Revenge)', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top TradingView Ticker Tape Ribbon */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono">
              <span className={`w-2 h-2 rounded-full bg-emerald-400 ${isTickActive ? 'animate-ping' : ''}`} />
              LIVE TradingView Feed
            </span>
            <span className="text-[11px] text-slate-500 hidden sm:inline">Sinkronisasi Harga Real-Time Otomatis</span>
          </div>

          <button
            onClick={() => setShowTvChart(!showTvChart)}
            className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors cursor-pointer"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            {showTvChart ? 'Sembunyikan Mini Chart' : 'Lihat Live Chart TradingView'}
            {showTvChart ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Official TradingView Ticker Tape Widget */}
        <TradingViewTickerTape className="shadow-lg" />

        {/* Expandable TradingView Mini Chart */}
        {showTvChart && (
          <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">TradingView Mini Live Chart:</span>
                <div className="flex items-center gap-1.5">
                  {['XAUUSD', 'EURUSD', 'GBPUSD', 'USDJPY'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setSelectedChartPair(p)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        selectedChartPair === p
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                Spot {selectedChartPair}: ${(quotes[selectedChartPair]?.price ?? 0).toLocaleString()}
              </span>
            </div>
            <TradingViewMiniChart symbol={selectedChartPair} height={220} />
          </div>
        )}
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <BookOpenCheck className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Smart Trading Journal & Evaluasi Disiplin
            </h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Catat posisi lengkap dengan <strong className="text-slate-200">Stop Loss (SL)</strong>,{' '}
            <strong className="text-slate-200">Take Profit (TP)</strong>, dan harga real-time TradingView. PnL otomatis terisi seketika saat menyentuh SL atau TP.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              // Open modal with fresh state
              handlePairChange('XAUUSD');
              setExitStatus('HIT_SL');
              setShowAddModal(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Catat Transaksi Baru
          </button>
        </div>
      </div>

      {/* Quota Progress Bar for Free Tier */}
      {!isPro ? (
        <div className="glass-panel rounded-2xl p-4 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-slate-300">
              Kuota Jurnal Free: <span className="text-white font-mono">{currentEntriesCount} / {maxFreeEntries}</span> Posisi Bulan Ini
            </div>
            <div className="w-64 bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full"
                style={{ width: `${(currentEntriesCount / maxFreeEntries) * 100}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => setTier('PRO')}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 cursor-pointer"
          >
            <Crown className="w-3.5 h-3.5" /> Buka Akses Unlimited Jurnal (PRO Rp50k)
          </button>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
          <span className="flex items-center gap-1.5">
            <Crown className="w-4 h-4 text-emerald-400" />
            Akun PRO: Jurnal Unlimited & Integrasi Real-Time TradingView Aktif
          </span>
          <span className="font-bold">Aktif</span>
        </div>
      )}

      {/* AI Discipline & Trading Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-4 border border-white/10 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Skor Disiplin AI</span>
            <Target className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-emerald-400">
            {totalTrades === 0 ? '0' : disciplineScore}/100
          </div>
          <p className="text-[11px] text-slate-400">
            {totalTrades === 0
              ? 'Belum ada transaksi. Catat transaksi dengan SL untuk aktifkan skor.'
              : `${disciplinedTrades} dari ${totalTrades} posisi disiplin mematuhi batas Stop Loss SOP.`}
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-white/10 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Win Rate & Rasio</span>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-blue-400">
            {winRate}%
          </div>
          <p className="text-[11px] text-slate-400 font-mono">
            {winningTrades}W / {losingTrades}L (Total {totalTrades} Posisi)
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-white/10 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Net Profit / Loss</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div
            className={`text-2xl font-extrabold font-mono ${
              totalProfit - totalLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {totalTrades === 0
              ? '$0.00'
              : `${totalProfit - totalLoss >= 0 ? '+' : '-'}$${Math.abs(totalProfit - totalLoss).toFixed(2)}`}
          </div>
          <p className="text-[11px] text-slate-400 font-mono">
            Profit: +${totalProfit.toFixed(2)} | Loss: -${totalLoss.toFixed(2)}
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-white/10 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Statistik Stop Loss (SL)</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-slate-200">
            {hitSlTrades} <span className="text-xs text-rose-400 font-normal">Kena SL</span> / {hitTpTrades} <span className="text-xs text-emerald-400 font-normal">Kena TP</span>
          </div>
          <p className="text-[11px] text-slate-400">
            {hitSlTrades > 0
              ? 'SL membatasi kerugian modal sesuai SOP ketahanan akun.'
              : 'Belum ada rekaman eksekusi SL tercatat.'}
          </p>
        </div>
      </div>

      {/* Journal Table */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-white">Histori Jurnal & Eksekusi SL/TP</h2>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[11px] font-mono">
              {journals.length} Catatan
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-400"></span> Kena SL: Auto PnL Terisi
            </span>
            <span className="flex items-center gap-1 ml-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Kena TP
            </span>
          </div>
        </div>

        {journals.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center mx-auto">
              <BookOpenCheck className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white">Belum Ada Catatan Jurnal Trading</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Catat posisi pertama Anda dengan Stop Loss (SL), Take Profit (TP), dan harga real-time TradingView. Klik tombol &quot;Catat Transaksi Baru&quot; di atas.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 bg-slate-900/60 font-mono">
                  <th className="p-3.5 font-semibold">Tanggal</th>
                  <th className="p-3.5 font-semibold">Pair / Arah</th>
                  <th className="p-3.5 font-semibold">Lot</th>
                  <th className="p-3.5 font-semibold">Entry Price</th>
                  <th className="p-3.5 font-semibold">Stop Loss (SL)</th>
                  <th className="p-3.5 font-semibold">Take Profit (TP)</th>
                  <th className="p-3.5 font-semibold">Exit / Status</th>
                  <th className="p-3.5 font-semibold">PnL ($) / Pips</th>
                  <th className="p-3.5 font-semibold">Emosi & SOP</th>
                  <th className="p-3.5 font-semibold">Catatan Evaluasi</th>
                  <th className="p-3.5 font-semibold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {journals.map((j) => {
                  const itemRr = calculateRiskRewardRatio(j.direction, j.entryPrice, j.stopLoss, j.takeProfit);
                  const isHitSl = j.exitStatus === 'HIT_SL' || (j.stopLoss && Math.abs(j.exitPrice - j.stopLoss) < 0.05);
                  const isHitTp = j.exitStatus === 'HIT_TP' || (j.takeProfit && Math.abs(j.exitPrice - j.takeProfit) < 0.05);

                  return (
                    <tr key={j.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-3.5 font-mono text-slate-400 whitespace-nowrap">{j.date}</td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-white">{j.pair}</span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold ${
                              j.direction === 'BUY'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            }`}
                          >
                            {j.direction}
                          </span>
                        </div>
                      </td>
                      <td className="p-3.5 font-mono font-medium text-slate-300">{j.lot}</td>
                      <td className="p-3.5 font-mono text-slate-200 font-semibold">{j.entryPrice}</td>
                      <td className="p-3.5 font-mono">
                        {j.stopLoss ? (
                          <div className="space-y-0.5">
                            <span className="px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-semibold text-[11px]">
                              {j.stopLoss}
                            </span>
                            <div className="text-[10px] text-rose-400/80">
                              -{Math.abs(Math.round((j.entryPrice - j.stopLoss) * (j.pair === 'XAUUSD' ? 10 : 10000)))} pips
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-500 italic">Tanpa SL ⚠️</span>
                        )}
                      </td>
                      <td className="p-3.5 font-mono">
                        {j.takeProfit ? (
                          <div className="space-y-0.5">
                            <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold text-[11px]">
                              {j.takeProfit}
                            </span>
                            {itemRr && (
                              <div className="text-[10px] text-emerald-400/80">
                                RR {itemRr}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                      <td className="p-3.5">
                        <div className="space-y-1">
                          <div className="font-mono text-slate-300">{j.exitPrice}</div>
                          {isHitSl && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                              🛑 Kena SL
                            </span>
                          )}
                          {isHitTp && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              🎯 Kena TP
                            </span>
                          )}
                          {j.exitStatus === 'REALTIME_CLOSE' && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                              ⚡ Real-Time Exit
                            </span>
                          )}
                          {j.exitStatus === 'RUNNING' && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
                              🏃 Running
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3.5 font-mono">
                        <div className="space-y-0.5">
                          <span
                            className={`font-bold text-sm ${
                              j.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'
                            }`}
                          >
                            {j.pnl >= 0 ? `+ $${j.pnl.toFixed(2)}` : `- $${Math.abs(j.pnl).toFixed(2)}`}
                          </span>
                          <div className="text-[10px] text-slate-400">
                            {j.pips} pips
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <div className="space-y-1">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium border ${
                              emotionLabels[j.emotion]?.color || 'text-slate-300 bg-slate-800'
                            }`}
                          >
                            {emotionLabels[j.emotion]?.label || j.emotion}
                          </span>
                          {j.adheredToPlan && (
                            <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                              <CheckCircle2 className="w-3 h-3" /> SOP Patuh
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-3.5 text-slate-300 max-w-xs truncate" title={j.notes}>
                        {j.notes}
                      </td>
                      <td className="p-3.5 text-center">
                        <button
                          onClick={() => deleteJournalEntry(j.id)}
                          title="Hapus Catatan"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Trade Modal with Real-Time TradingView & Auto-Fill Stop Loss */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-white/10 w-full max-w-xl shadow-2xl relative my-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <BookOpenCheck className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">Catat Jurnal & Auto-Fill Stop Loss (SL)</h3>
                  <p className="text-[11px] text-slate-400">Terhubung langsung ke feed harga real-time TradingView</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Real-time TradingView Spot Price Banner inside Modal */}
            <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-slate-900 to-slate-950 border border-blue-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400 block absolute inset-0 animate-ping opacity-75" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
                    <span>TradingView Real-Time Spot:</span>
                    <span className="text-white font-mono">{pair}</span>
                  </div>
                  <div className="text-base font-mono font-extrabold text-emerald-400">
                    ${currentLivePrice.toLocaleString('en-US', { minimumFractionDigits: currentLiveQuote.digits })}
                    <span className="text-[11px] font-normal text-slate-400 ml-2 font-sans">
                      (Bid: {currentLiveQuote.bid} / Ask: {currentLiveQuote.ask})
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleUseRealTimeEntry}
                title="Gunakan harga live TradingView sebagai harga entry"
                className="px-2.5 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-300 text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer active:scale-95"
              >
                <Zap className="w-3 h-3 text-amber-400" /> Salin ke Entry
              </button>
            </div>

            <form onSubmit={handleAddTrade} className="space-y-4 mt-4">
              {/* Pair & Direction */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Pilih Pair Trading
                  </label>
                  <select
                    value={pair}
                    onChange={(e) => handlePairChange(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-medium focus:border-blue-500 focus:outline-none"
                  >
                    <option value="XAUUSD">XAUUSD (Gold vs US Dollar)</option>
                    <option value="EURUSD">EURUSD (Euro vs US Dollar)</option>
                    <option value="GBPUSD">GBPUSD (British Pound vs US Dollar)</option>
                    <option value="USDJPY">USDJPY (US Dollar vs Japanese Yen)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Arah Posisi Eksekusi
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setDirection('BUY');
                        if (exitStatus === 'HIT_SL') {
                          const newSl = Math.round((entryPrice - (pair === 'XAUUSD' ? 10 : 0.003)) * 100) / 100;
                          setStopLoss(newSl);
                          setExitPrice(newSl);
                          const res = calculateTradePnL(pair, 'BUY', lot, entryPrice, newSl);
                          setPnl(res.pnl);
                        }
                      }}
                      className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                        direction === 'BUY'
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                          : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4" /> BUY (Long)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDirection('SELL');
                        if (exitStatus === 'HIT_SL') {
                          const newSl = Math.round((entryPrice + (pair === 'XAUUSD' ? 10 : 0.003)) * 100) / 100;
                          setStopLoss(newSl);
                          setExitPrice(newSl);
                          const res = calculateTradePnL(pair, 'SELL', lot, entryPrice, newSl);
                          setPnl(res.pnl);
                        }
                      }}
                      className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                        direction === 'SELL'
                          ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                          : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      <ArrowDownRight className="w-4 h-4" /> SELL (Short)
                    </button>
                  </div>
                </div>
              </div>

              {/* Lot & Entry Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Lot Size
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    max="100"
                    value={lot}
                    onChange={(e) => {
                      const newLot = Number(e.target.value);
                      setLot(newLot);
                      if (exitStatus === 'HIT_SL') {
                        const res = calculateTradePnL(pair, direction, newLot, entryPrice, stopLoss);
                        setPnl(res.pnl);
                      }
                    }}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono focus:border-blue-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    {pair === 'XAUUSD' ? '1 Lot = 100 oz emas ($10/pip)' : 'Standard lot FX ($10/pip)'}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-300">
                      Harga Entry
                    </label>
                    <button
                      type="button"
                      onClick={handleUseRealTimeEntry}
                      className="text-[10px] text-blue-400 hover:underline flex items-center gap-0.5"
                    >
                      Ambil Spot TV ({currentLivePrice})
                    </button>
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    value={entryPrice}
                    onChange={(e) => {
                      const newEntry = Number(e.target.value);
                      setEntryPrice(newEntry);
                      if (exitStatus === 'HIT_SL') {
                        const res = calculateTradePnL(pair, direction, lot, newEntry, stopLoss);
                        setPnl(res.pnl);
                      }
                    }}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Stop Loss (SL) & Take Profit (TP) Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/10">
                {/* Stop Loss Input */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-rose-400 flex items-center gap-1">
                      🛑 Stop Loss (SL)
                    </label>
                    <span className="text-[10px] font-mono text-rose-400 font-semibold">
                      {slCalc.pnl < 0 ? `-$${Math.abs(slCalc.pnl).toFixed(2)}` : '$0.00'}
                    </span>
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    value={stopLoss}
                    onChange={(e) => handleStopLossChange(Number(e.target.value))}
                    placeholder="Harga Stop Loss"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-rose-500/40 text-white text-xs font-mono focus:border-rose-400 focus:outline-none font-bold"
                  />
                  <div className="flex items-center justify-between text-[10px] text-rose-400/90 pt-0.5">
                    <span>Jarak: {Math.abs(slCalc.pips)} pips</span>
                    <button
                      type="button"
                      onClick={() => handleSelectOutcome('HIT_SL')}
                      className="text-rose-300 font-bold hover:underline bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20"
                    >
                      Set Kena SL
                    </button>
                  </div>
                </div>

                {/* Take Profit Input */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-emerald-400 flex items-center gap-1">
                      🎯 Take Profit (TP)
                    </label>
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                      {tpCalc.pnl > 0 ? `+$${tpCalc.pnl.toFixed(2)}` : '$0.00'}
                    </span>
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    value={takeProfit}
                    onChange={(e) => handleTakeProfitChange(Number(e.target.value))}
                    placeholder="Harga Take Profit"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-emerald-500/40 text-white text-xs font-mono focus:border-emerald-400 focus:outline-none font-bold"
                  />
                  <div className="flex items-center justify-between text-[10px] text-emerald-400/90 pt-0.5">
                    <span>Jarak: +{tpCalc.pips} pips</span>
                    {rrRatio && <span className="font-semibold text-blue-400">RR {rrRatio}</span>}
                  </div>
                </div>
              </div>

              {/* Quick Status Buttons: Hit SL, Hit TP, Real-Time TV, Running */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Hasil Status Eksekusi (Klik untuk Auto-Isi PnL):</span>
                  <span className="text-[11px] text-amber-400 font-normal">
                    *Pilih &quot;Kena Stop Loss&quot; agar PnL terisi otomatis
                  </span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => handleSelectOutcome('HIT_SL')}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-left ${
                      exitStatus === 'HIT_SL'
                        ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-md shadow-rose-500/20'
                        : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span>🛑</span>
                      <span>Kena SL</span>
                    </div>
                    <div className="text-[10px] font-mono text-rose-400 mt-0.5">
                      -${Math.abs(slCalc.pnl).toFixed(2)}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectOutcome('HIT_TP')}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-left ${
                      exitStatus === 'HIT_TP'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span>🎯</span>
                      <span>Kena TP</span>
                    </div>
                    <div className="text-[10px] font-mono text-emerald-400 mt-0.5">
                      +${tpCalc.pnl.toFixed(2)}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectOutcome('REALTIME_CLOSE')}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-left ${
                      exitStatus === 'REALTIME_CLOSE'
                        ? 'bg-blue-500/20 border-blue-500 text-blue-300 shadow-md shadow-blue-500/20'
                        : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span>⚡</span>
                      <span>Exit Real-Time TV</span>
                    </div>
                    <div className="text-[10px] font-mono text-blue-400 mt-0.5">
                      Spot ${currentLivePrice}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectOutcome('RUNNING')}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-left ${
                      exitStatus === 'RUNNING'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md shadow-amber-500/20'
                        : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span>🏃</span>
                      <span>Posisi Running</span>
                    </div>
                    <div className="text-[10px] text-amber-400 mt-0.5">
                      Floating Live
                    </div>
                  </button>
                </div>

                {/* Auto PnL Notification Banner */}
                {autoPnlNotice && (
                  <div className="mt-2 px-3 py-1.5 rounded-lg bg-blue-950/40 border border-blue-500/20 text-[11px] text-blue-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{autoPnlNotice}</span>
                  </div>
                )}
              </div>

              {/* Exit Price & PnL Hasil ($) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Harga Exit Transaksi
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={exitPrice}
                    onChange={(e) => {
                      const newExit = Number(e.target.value);
                      setExitPrice(newExit);
                      setExitStatus('MANUAL_CLOSE');
                      const res = calculateTradePnL(pair, direction, lot, entryPrice, newExit);
                      setPnl(res.pnl);
                    }}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono focus:border-blue-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    {exitStatus === 'HIT_SL' && 'Sesuai level Stop Loss'}
                    {exitStatus === 'HIT_TP' && 'Sesuai level Take Profit'}
                    {exitStatus === 'REALTIME_CLOSE' && 'Sesuai harga live TradingView'}
                    {exitStatus === 'RUNNING' && 'Posisi saat ini masih running'}
                    {exitStatus === 'MANUAL_CLOSE' && 'Input harga exit manual'}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-white flex items-center gap-1">
                      <span>PnL Hasil ($)</span>
                      <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-normal">
                        Auto-Calculated
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => handleSelectOutcome('HIT_SL')}
                      className="text-[10px] text-rose-400 hover:underline font-bold"
                    >
                      Isi Otomatis dari SL
                    </button>
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    value={pnl}
                    onChange={(e) => {
                      setPnl(Number(e.target.value));
                      setExitStatus('MANUAL_CLOSE');
                    }}
                    className={`w-full p-2.5 rounded-xl bg-slate-900 border text-sm font-mono font-extrabold focus:outline-none ${
                      pnl >= 0
                        ? 'border-emerald-500/50 text-emerald-400'
                        : 'border-rose-500/50 text-rose-400'
                    }`}
                  />
                  <div className="flex items-center justify-between text-[10px] mt-0.5">
                    <span className={pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      {pnl >= 0 ? `+ $${pnl.toFixed(2)} (Profit)` : `- $${Math.abs(pnl).toFixed(2)} (Loss)`}
                    </span>
                    <span className="text-slate-400 font-mono">
                      {Math.abs(calculateTradePnL(pair, direction, lot, entryPrice, exitPrice).pips)} pips
                    </span>
                  </div>
                </div>
              </div>

              {/* Psychology Emotion Condition */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Kondisi Emosi & Psikologi Saat Eksekusi
                </label>
                <select
                  value={emotion}
                  onChange={(e) => setEmotion(e.target.value as JournalRecord['emotion'])}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:border-blue-500 focus:outline-none"
                >
                  <option value="DISCIPLINED">🎯 Disiplin Ikut Rencana SOP RealistisFx</option>
                  <option value="CALM_CONFIDENT">🧘 Tenang & Percaya Diri (Trading Santai)</option>
                  <option value="FOMO">⚡ FOMO Takut Tertinggal Pergerakan Harga</option>
                  <option value="ANXIOUS_GREEDY">😬 Cemas & Serakah (Geser SL / Over-lot)</option>
                  <option value="REVENGE_TRADING">😡 Balas Dendam (Revenge Trading Setelah Loss)</option>
                </select>
              </div>

              {/* Evaluation Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Catatan Evaluasi Trade
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: Entry reject SnR H1, pasang SL ketat di swing low. Kena SL karena berita inflasi tapi risiko tetap aman 1%..."
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs h-20 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Strict SOP Compliance Checkbox */}
              <label className="flex items-center gap-2 p-3 rounded-xl bg-slate-900/40 border border-white/5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={adheredToPlan}
                  onChange={(e) => setAdheredToPlan(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-500 focus:ring-0 bg-slate-800 border-white/20"
                />
                <span className="text-xs text-slate-300 font-medium">
                  Saya mematuhi SOP (selalu pasang Stop Loss & risiko modal maksimal 2%)
                </span>
              </label>

              {/* Modal Buttons */}
              <div className="flex justify-end gap-2.5 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  Simpan ke Jurnal Disiplin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
