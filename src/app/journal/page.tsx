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
  XCircle,
  AlertTriangle,
  Flame,
  Target,
  BarChart3,
  ShieldAlert,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Zap,
  Trash2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Server,
  Lock,
  Unlock,
  Key,
  ShieldCheck,
  Activity,
  Layers,
  HelpCircle,
  Info,
  DollarSign,
  Award,
  Filter,
  Search,
} from 'lucide-react';
import { useUser } from '@/context/UserContext';
import {
  JournalRecord,
  JournalExitStatus,
  InvestorAccount,
  InvestorTrade,
  TrackRecordPerformance,
} from '@/types';
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
    price: 4176.50,
    bid: 4176.35,
    ask: 4176.65,
    change24h: 0.15,
    digits: 2,
  },
  EURUSD: {
    symbol: 'EURUSD',
    name: 'Euro / US Dollar',
    price: 1.1250,
    bid: 1.1249,
    ask: 1.1251,
    change24h: 0.25,
    digits: 4,
  },
  GBPUSD: {
    symbol: 'GBPUSD',
    name: 'British Pound / US Dollar',
    price: 1.3340,
    bid: 1.3339,
    ask: 1.3341,
    change24h: 0.48,
    digits: 4,
  },
  USDJPY: {
    symbol: 'USDJPY',
    name: 'US Dollar / Yen',
    price: 157.95,
    bid: 157.94,
    ask: 157.96,
    change24h: -0.02,
    digits: 2,
  },
};

// Popular broker server options
const BROKER_SERVERS = [
  'MRGM-Real',
  'MRGM-Demo',
  'ICMarketsSC-Live01',
  'ICMarkets-Demo',
  'Exness-Real2',
  'Exness-Real7',
  'XMGlobal-Real',
  'OctaFX-Real',
  'FBS-Real',
  'Vantage-Live',
];

export default function JournalPage() {
  const { user, journals, addJournalEntry, deleteJournalEntry, setAllJournals, marketPrice, openPaymentModal } = useUser();
  const isPro = user.tier === 'PRO';

  // Live Multi-Currency TradingView Quotes
  const [quotes, setQuotes] = useState<Record<string, PairQuote>>(DEFAULT_QUOTES);
  const [isTickActive, setIsTickActive] = useState<boolean>(false);
  const [showTvChart, setShowTvChart] = useState<boolean>(false);
  const [selectedChartPair, setSelectedChartPair] = useState<string>('XAUUSD');

  // Investor Account State
  const [investorAccount, setInvestorAccount] = useState<InvestorAccount | null>(null);
  const [investorTrades, setInvestorTrades] = useState<InvestorTrade[]>([]);
  const [performance, setPerformance] = useState<TrackRecordPerformance | null>(null);

  // Connection Form State
  const [showConnectModal, setShowConnectModal] = useState<boolean>(false);
  const [platform, setPlatform] = useState<'MT4' | 'MT5'>('MT5');
  const [brokerServer, setBrokerServer] = useState<string>('MRGM-Real');
  const [accountNumber, setAccountNumber] = useState<string>('1089241');
  const [investorPassword, setInvestorPassword] = useState<string>('InvRealistis2026!');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  // Syncing / Loading state
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStage, setSyncStage] = useState<string>('');
  const [syncError, setSyncError] = useState<string>('');

  // Trade History Filter State
  const [tradeFilter, setTradeFilter] = useState<'ALL' | 'WIN' | 'LOSS' | 'GOLD' | 'FOREX'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fallback Manual Trade Modal State
  const [showManualModal, setShowManualModal] = useState<boolean>(false);
  const [manualPair, setManualPair] = useState<string>('XAUUSD');
  const [manualDirection, setManualDirection] = useState<'BUY' | 'SELL'>('BUY');
  const [manualLot, setManualLot] = useState<number>(0.05);
  const [manualEntryPrice, setManualEntryPrice] = useState<number>(4176.00);
  const [manualStopLoss, setManualStopLoss] = useState<number>(4166.00);
  const [manualTakeProfit, setManualTakeProfit] = useState<number>(4196.00);
  const [manualExitPrice, setManualExitPrice] = useState<number>(4166.00);
  const [manualExitStatus, setManualExitStatus] = useState<JournalExitStatus>('HIT_SL');
  const [manualPnl, setManualPnl] = useState<number>(-50.00);
  const [manualEmotion, setManualEmotion] = useState<JournalRecord['emotion']>('DISCIPLINED');
  const [manualNotes, setManualNotes] = useState<string>('');

  // 1. Fetch live quotes for ticker tape
  const fetchQuotes = useCallback(async () => {
    try {
      const res = await fetch('/api/market/quotes');
      if (res.ok) {
        const data = await res.json();
        if (data && data.quotes) {
          setQuotes(data.quotes);
          setIsTickActive(true);
          setTimeout(() => setIsTickActive(false), 800);
        }
      }
    } catch {
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
    const interval = setInterval(fetchQuotes, 4000);
    return () => clearInterval(interval);
  }, [fetchQuotes]);

  // 2. Load stored investor account on mount
  useEffect(() => {
    try {
      const storedAccount = localStorage.getItem('realistis_investor_account');
      const storedTrades = localStorage.getItem('realistis_investor_trades');
      const storedPerf = localStorage.getItem('realistis_investor_perf');

      if (storedAccount && storedTrades && storedPerf) {
        setInvestorAccount(JSON.parse(storedAccount));
        setInvestorTrades(JSON.parse(storedTrades));
        setPerformance(JSON.parse(storedPerf));
      } else {
        // By default, auto-load RealistisFx Master Fund investor preset for immediate wow experience!
        handleConnectInvestorAccount('realistisfx_master');
      }
    } catch {
      // Fallback
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 3. Connect Investor Account Handler
  const handleConnectInvestorAccount = async (presetId?: string) => {
    setIsSyncing(true);
    setSyncError('');

    try {
      setSyncStage('Menghubungi server broker ' + (presetId === 'realistisfx_master' ? 'MRGM-Real' : brokerServer) + '...');
      await new Promise((r) => setTimeout(r, 400));

      setSyncStage('Otentikasi sesi investor read-only (aman)...');
      await new Promise((r) => setTimeout(r, 400));

      setSyncStage('Mengunduh track record & histori closed trades...');

      const response = await fetch('/api/journal/investor-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform,
          brokerServer,
          accountNumber,
          investorPassword,
          presetId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Gagal menyinkronkan akun investor.');
      }

      setSyncStage('Menganalisis performa, Win Rate & evaluasi SOP...');
      await new Promise((r) => setTimeout(r, 300));

      const acc: InvestorAccount = data.account;
      const trs: InvestorTrade[] = data.trades;
      const perf: TrackRecordPerformance = data.performance;

      setInvestorAccount(acc);
      setInvestorTrades(trs);
      setPerformance(perf);

      // Persist in localStorage
      try {
        localStorage.setItem('realistis_investor_account', JSON.stringify(acc));
        localStorage.setItem('realistis_investor_trades', JSON.stringify(trs));
        localStorage.setItem('realistis_investor_perf', JSON.stringify(perf));
      } catch {}

      // Convert synced trades to JournalRecords for global UserContext & Dashboard
      const convertedJournals: JournalRecord[] = trs.map((t) => ({
        id: `mt-${t.ticket}`,
        date: t.closeTime.split(' ')[0] || t.closeTime,
        pair: t.pair,
        direction: t.type,
        lot: t.lot,
        entryPrice: t.openPrice,
        stopLoss: t.stopLoss,
        takeProfit: t.takeProfit,
        exitPrice: t.closePrice,
        exitStatus: t.pnl >= 0 ? 'HIT_TP' : 'HIT_SL',
        pnl: t.pnl,
        pips: Math.abs(t.pips),
        accountType: 'STANDARD',
        emotion: t.sopCompliant ? 'DISCIPLINED' : 'FOMO',
        adheredToPlan: t.sopCompliant,
        notes: `Tiket MT: #${t.ticket} | ${t.notes || 'Sinkronisasi Otomatis Akun Investor'}`,
      }));

      setAllJournals(convertedJournals);
      setShowConnectModal(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Koneksi ke broker gagal. Periksa server dan password investor.';
      setSyncError(msg);
    } finally {
      setIsSyncing(false);
      setSyncStage('');
    }
  };

  // Disconnect investor account
  const handleDisconnect = () => {
    if (confirm('Yakin ingin memutuskan koneksi akun investor ini? Anda dapat menghubungkannya kembali kapan saja.')) {
      setInvestorAccount(null);
      setInvestorTrades([]);
      setPerformance(null);
      try {
        localStorage.removeItem('realistis_investor_account');
        localStorage.removeItem('realistis_investor_trades');
        localStorage.removeItem('realistis_investor_perf');
      } catch {}
      setAllJournals([]);
    }
  };

  // Re-sync live data
  const handleRefreshSync = () => {
    if (investorAccount) {
      handleConnectInvestorAccount();
    }
  };

  // Filtered trades list
  const filteredTrades = useMemo(() => {
    return investorTrades.filter((t) => {
      // Type/Status filter
      if (tradeFilter === 'WIN' && t.pnl <= 0) return false;
      if (tradeFilter === 'LOSS' && t.pnl >= 0) return false;
      if (tradeFilter === 'GOLD' && t.pair !== 'XAUUSD') return false;
      if (tradeFilter === 'FOREX' && t.pair === 'XAUUSD') return false;

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const ticketMatch = t.ticket.toString().includes(q);
        const pairMatch = t.pair.toLowerCase().includes(q);
        const notesMatch = t.notes?.toLowerCase().includes(q);
        return ticketMatch || pairMatch || notesMatch;
      }
      return true;
    });
  }, [investorTrades, tradeFilter, searchQuery]);

  // Fallback Manual Trade submission
  const handleAddManualTrade = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCalc = calculateTradePnL(manualPair, manualDirection, manualLot, manualEntryPrice, manualExitPrice);

    addJournalEntry({
      pair: manualPair,
      direction: manualDirection,
      lot: manualLot,
      entryPrice: manualEntryPrice,
      stopLoss: manualStopLoss,
      takeProfit: manualTakeProfit,
      exitPrice: manualExitPrice,
      exitStatus: manualExitStatus,
      pnl: manualPnl,
      pips: Math.abs(finalCalc.pips),
      accountType: 'STANDARD',
      emotion: manualEmotion,
      adheredToPlan: true,
      notes: manualNotes || 'Pencatatan manual offline',
    });

    setShowManualModal(false);
  };

  return (
    <div className="space-y-6 pb-16 font-sans">
      {/* Top TradingView Ticker Tape Ribbon */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-mono">
              <span className={`w-2 h-2 rounded-full bg-emerald-500 ${isTickActive ? 'animate-ping' : ''}`} />
              LIVE TradingView Market Feed
            </span>
            <span className="text-[11px] text-slate-500 hidden sm:inline">Harga Pasar Real-Time Terhubung</span>
          </div>

          <button
            onClick={() => setShowTvChart(!showTvChart)}
            className="flex items-center gap-1.5 text-xs text-emerald-700 hover:text-emerald-800 font-semibold transition-colors cursor-pointer"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            {showTvChart ? 'Sembunyikan Mini Chart' : 'Lihat Live Chart TradingView'}
            {showTvChart ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Official TradingView Ticker Tape Widget */}
        <TradingViewTickerTape className="shadow-xs" />

        {/* Expandable TradingView Mini Chart */}
        {showTvChart && (
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">TradingView Mini Live Chart:</span>
                <div className="flex items-center gap-1.5">
                  {['XAUUSD', 'EURUSD', 'GBPUSD', 'USDJPY'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setSelectedChartPair(p)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        selectedChartPair === p
                          ? 'bg-[#00A651] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">
                Spot {selectedChartPair}: ${(quotes[selectedChartPair]?.price ?? 0).toLocaleString()}
              </span>
            </div>
            <TradingViewMiniChart symbol={selectedChartPair} height={220} />
          </div>
        )}
      </div>

      {/* Main Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs">
              <BookOpenCheck className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Smart Trading Journal Otomatis (Track Record MT4 / MT5)
            </h1>
          </div>
          <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
            Tidak perlu mencatat manual lagi. Cukup hubungkan <strong className="text-slate-900">Akun Investor (Read-Only)</strong> Anda, sistem RealistisFx akan membaca otomatis riwayat seluruh transaksi, akurasi <strong className="text-slate-900">Win Rate</strong>, rasio RR, serta memberikan evaluasi mendalam <strong className="text-emerald-700 font-semibold">apakah performa trading Anda bagus atau butuh evaluasi</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {investorAccount ? (
            <>
              <button
                onClick={handleRefreshSync}
                disabled={isSyncing}
                className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1.5 border border-emerald-200 transition-all cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                Sinkronkan Ulang
              </button>
              <button
                onClick={() => setShowConnectModal(true)}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 border border-slate-200 transition-all cursor-pointer"
              >
                <Server className="w-3.5 h-3.5" /> Ganti Akun Investor
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowConnectModal(true)}
              className="px-4 py-2.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm hover:shadow active:scale-95 transition-all cursor-pointer"
            >
              <Server className="w-4 h-4" /> Hubungkan Akun Investor
            </button>
          )}

          <button
            onClick={() => setShowManualModal(true)}
            className="px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 font-medium text-xs flex items-center gap-1 border border-slate-200 transition-colors cursor-pointer"
            title="Catat manual jika ingin menambahkan trade offline"
          >
            <Plus className="w-3.5 h-3.5" /> Manual
          </button>
        </div>
      </div>

      {/* Investor Account Connection Banner / Card */}
      {investorAccount ? (
        <div className="bg-gradient-to-r from-emerald-950 via-[#00472B] to-[#005A36] rounded-2xl p-5 text-white shadow-md border border-emerald-800/40 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-96 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-400/10 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-mono text-[11px] font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  STATUS: LIVE TERKONEKSI (SINKRONISASI OTOMATIS)
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white/10 text-white text-[11px] font-mono">
                  {investorAccount.platform} • {investorAccount.brokerServer}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/10 text-emerald-200 text-[11px] font-mono">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> Read-Only Investor
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                  {investorAccount.accountName}
                </h2>
                <span className="text-xs text-emerald-200/80 font-mono">#{investorAccount.accountNumber}</span>
              </div>

              <p className="text-[11px] text-emerald-100/70">
                Terakhir disinkronkan: {new Date(investorAccount.lastSyncAt).toLocaleTimeString('id-ID')} WIB • Histori closed trade terbaca otomatis dari server broker.
              </p>
            </div>

            {/* Quick Balance / Equity Ribbon */}
            <div className="flex items-center gap-3 sm:gap-6 bg-black/20 backdrop-blur-xs p-3 rounded-xl border border-white/10">
              <div>
                <div className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider">Saldo (Balance)</div>
                <div className="text-lg sm:text-xl font-extrabold font-mono text-white">
                  ${investorAccount.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <div className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider">Deposit Awal</div>
                <div className="text-sm sm:text-base font-bold font-mono text-emerald-100">
                  ${investorAccount.deposit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <div className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider">Keuntungan Bersih</div>
                <div
                  className={`text-lg sm:text-xl font-extrabold font-mono ${
                    investorAccount.balance - investorAccount.deposit >= 0 ? 'text-emerald-300' : 'text-rose-400'
                  }`}
                >
                  {investorAccount.balance - investorAccount.deposit >= 0 ? '+' : ''}$
                  {(investorAccount.balance - investorAccount.deposit).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div>
                <button
                  onClick={handleDisconnect}
                  className="p-2 rounded-lg bg-white/10 hover:bg-rose-500/20 text-emerald-200 hover:text-rose-300 transition-colors cursor-pointer"
                  title="Putuskan Akun Investor"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Disconnected State / Connect Call to Action */
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 rounded-2xl p-6 text-white border border-slate-700 shadow-md">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" />
              Fitur Utama: Jurnal Otomatis via Akun Investor
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold">
              Hubungkan Akun Investor MT4/MT5 Anda
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Anda tidak perlu mengetik posisi trade satu per satu. Masukkan kata sandi investor (hanya akses baca, aman 100% tanpa hak trading/penarikan), dan RealistisFx akan membaca otomatis jumlah entry, persentase Win Rate, kepatuhan Stop Loss, serta menyajikan diagnostik apakah performa Anda sudah bagus atau berisiko tinggi.
            </p>
            <div className="pt-2 flex flex-wrap gap-2.5">
              <button
                onClick={() => setShowConnectModal(true)}
                className="px-5 py-2.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Server className="w-4 h-4" /> Masukkan Akun Investor Saya
              </button>
              <button
                onClick={() => handleConnectInvestorAccount('realistisfx_master')}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 font-bold text-xs flex items-center gap-2 border border-white/20 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" /> Coba Demo RealistisFx Master (Grade A)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero "Bagus apa Gak" RealistisFx Institutional Diagnostic Engine */}
      {performance && (
        <div
          className={`rounded-2xl border p-5 sm:p-6 shadow-sm transition-all ${
            performance.grade === 'A'
              ? 'bg-gradient-to-br from-emerald-50/90 via-white to-emerald-50/50 border-emerald-200'
              : performance.grade === 'B'
              ? 'bg-gradient-to-br from-blue-50/90 via-white to-blue-50/50 border-blue-200'
              : 'bg-gradient-to-br from-rose-50/90 via-white to-rose-50/50 border-rose-200'
          }`}
        >
          {/* Top Verdict Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4 mb-5">
            <div className="flex items-start sm:items-center gap-3">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-xl shadow-xs ${
                  performance.grade === 'A'
                    ? 'bg-gradient-to-br from-[#00A651] to-[#005A36] text-white'
                    : performance.grade === 'B'
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white'
                    : 'bg-gradient-to-br from-rose-600 to-rose-800 text-white'
                }`}
              >
                {performance.grade}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide border ${
                      performance.grade === 'A'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : performance.grade === 'B'
                        ? 'bg-blue-100 text-blue-800 border-blue-300'
                        : 'bg-rose-100 text-rose-800 border-rose-300'
                    }`}
                  >
                    EVALUASI KINERJA: {performance.verdict}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-700">
                    Skor Disiplin: {performance.score} / 100
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">
                  {performance.verdictSub}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">Standar Penilaian SOP:</span>
              <span className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-bold shadow-2xs font-mono">
                SOP Fixed SL 30 Pips &amp; MM 1%
              </span>
            </div>
          </div>

          {/* Institutional Diagnostic Summary Narrative */}
          <div className="p-4 rounded-xl bg-white/80 border border-slate-200/80 mb-5 text-xs sm:text-[13px] text-slate-700 leading-relaxed space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Diagnostik RealistisFx: Analisis Kesehatan &amp; Karakter Akun</span>
            </div>
            <p className="text-slate-600">{performance.summary}</p>
          </div>

          {/* 4 Pillars of Health Diagnostic */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">
            {performance.diagnostics.map((diag, idx) => {
              const isBagus = diag.status === 'BAGUS';
              const isCukup = diag.status === 'CUKUP';

              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border bg-white shadow-2xs space-y-1.5 ${
                    isBagus
                      ? 'border-emerald-200'
                      : isCukup
                      ? 'border-blue-200'
                      : 'border-rose-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-900">{diag.title}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold ${
                        isBagus
                          ? 'bg-emerald-100 text-emerald-800'
                          : isCukup
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {diag.status === 'BAGUS' ? '✓ SANGAT SEHAT' : diag.status === 'CUKUP' ? '⚡ CUKUP' : '⚠️ PERLU PERBAIKAN'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{diag.message}</p>
                </div>
              );
            })}
          </div>

          {/* Actionable Recommendations */}
          <div className="p-3.5 rounded-xl bg-white/90 border border-slate-200/80 space-y-2">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-emerald-600" />
              Rekomendasi Tindakan untuk Menjaga Pertumbuhan Modal:
            </div>
            <ul className="space-y-1 text-[11px] text-slate-600">
              {performance.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Key Track Record Metrics Grid */}
      {performance && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* 1. Total Entry */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-1">
            <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Total Entry</div>
            <div className="text-xl sm:text-2xl font-extrabold font-mono text-slate-900">
              {performance.totalTrades} <span className="text-xs font-normal text-slate-500">Posisi</span>
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              {performance.winningTrades} Menang / {performance.losingTrades} Kalah
            </div>
          </div>

          {/* 2. Win Rate */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-1">
            <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Win Rate (%)</div>
            <div className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-700 flex items-center gap-1">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              {performance.winRate}%
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full"
                style={{ width: `${Math.min(100, performance.winRate)}%` }}
              />
            </div>
          </div>

          {/* 3. Net Profit */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-1">
            <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Net Profit / Loss</div>
            <div
              className={`text-xl sm:text-2xl font-extrabold font-mono ${
                performance.netPnL >= 0 ? 'text-[#00A651]' : 'text-rose-600'
              }`}
            >
              {performance.netPnL >= 0 ? '+' : '-'}${Math.abs(performance.netPnL).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              ≈ Rp {Math.round(performance.netPnL * 16000).toLocaleString('id-ID')}
            </div>
          </div>

          {/* 4. Profit Factor */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-1">
            <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Profit Factor</div>
            <div className="text-xl sm:text-2xl font-extrabold font-mono text-slate-900">
              {performance.profitFactor}
            </div>
            <div className="text-[10px] text-emerald-700 font-semibold">
              {performance.profitFactor >= 2.0 ? 'Luar Biasa (> 2.0)' : performance.profitFactor >= 1.5 ? 'Bagus (> 1.5)' : 'Perlu Ditingkatkan'}
            </div>
          </div>

          {/* 5. Rata-rata Win vs Loss */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-1">
            <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Rasio Rata2 Win/Loss</div>
            <div className="text-xl sm:text-2xl font-extrabold font-mono text-slate-900">
              1 : {performance.riskRewardRatio}
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              +${performance.avgWin} / -${performance.avgLoss}
            </div>
          </div>

          {/* 6. Max Drawdown */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-1">
            <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Max Drawdown</div>
            <div
              className={`text-xl sm:text-2xl font-extrabold font-mono ${
                performance.maxDrawdown <= 10 ? 'text-emerald-700' : performance.maxDrawdown <= 20 ? 'text-amber-600' : 'text-rose-600'
              }`}
            >
              {performance.maxDrawdown}%
            </div>
            <div className="text-[10px] text-slate-500">
              {performance.maxDrawdown <= 10 ? 'Risiko Sangat Rendah' : 'Waspada Penurunan Modal'}
            </div>
          </div>
        </div>
      )}

      {/* Synced Closed Trades Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Table Controls & Filter Ribbon */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900">Histori Track Record Otomatis (Closed Trades)</h2>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-mono border border-emerald-200 font-bold">
              {filteredTrades.length} Transaksi
            </span>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari tiket, pair, catatan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs w-44 sm:w-56 focus:outline-emerald-600"
              />
            </div>

            <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-semibold">
              {(
                [
                  { key: 'ALL', label: 'Semua' },
                  { key: 'WIN', label: 'Win (Menang)' },
                  { key: 'LOSS', label: 'Loss (Kena SL)' },
                  { key: 'GOLD', label: 'XAUUSD' },
                  { key: 'FOREX', label: 'Forex Majors' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setTradeFilter(tab.key)}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    tradeFilter === tab.key
                      ? 'bg-white text-emerald-800 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Trade Table Rows */}
        {filteredTrades.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
              <BookOpenCheck className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Belum Ada Riwayat Transaksi Ditemukan</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              Hubungkan akun investor MT4/MT5 Anda untuk mengunduh dan membaca track record secara otomatis.
            </p>
            <button
              onClick={() => setShowConnectModal(true)}
              className="px-4 py-2 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white text-xs font-bold transition-all cursor-pointer"
            >
              Hubungkan Akun Investor
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="min-w-[900px] w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600 bg-slate-50 font-mono font-semibold">
                  <th className="p-3.5">Tiket / Waktu Close</th>
                  <th className="p-3.5">Pair / Arah</th>
                  <th className="p-3.5">Volume (Lot)</th>
                  <th className="p-3.5">Open Price</th>
                  <th className="p-3.5">Close Price</th>
                  <th className="p-3.5">Stop Loss (SL)</th>
                  <th className="p-3.5">Take Profit (TP)</th>
                  <th className="p-3.5">Hasil PnL ($) / Pips</th>
                  <th className="p-3.5">Kepatuhan SOP</th>
                  <th className="p-3.5">Analisa Rekam Jejak</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTrades.map((t) => {
                  const isWin = t.pnl > 0;
                  const isSl = t.pnl < 0;

                  return (
                    <tr key={t.ticket} className="hover:bg-slate-50/80 transition-colors">
                      {/* Ticket & Time */}
                      <td className="p-3.5 font-mono whitespace-nowrap">
                        <div className="font-bold text-slate-900">#{t.ticket}</div>
                        <div className="text-[11px] text-slate-500">{t.closeTime}</div>
                      </td>

                      {/* Pair & Type */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900">{t.pair}</span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold ${
                              t.type === 'BUY'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : 'bg-rose-100 text-rose-800 border border-rose-200'
                            }`}
                          >
                            {t.type}
                          </span>
                        </div>
                      </td>

                      {/* Lot */}
                      <td className="p-3.5 font-mono font-semibold text-slate-700">{t.lot}</td>

                      {/* Open Price */}
                      <td className="p-3.5 font-mono text-slate-900 font-medium">{t.openPrice}</td>

                      {/* Close Price */}
                      <td className="p-3.5 font-mono text-slate-900 font-medium">{t.closePrice}</td>

                      {/* Stop Loss */}
                      <td className="p-3.5 font-mono">
                        {t.stopLoss ? (
                          <span className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-medium text-[11px]">
                            {t.stopLoss}
                          </span>
                        ) : (
                          <span className="text-amber-600 font-semibold text-[11px]">Tanpa SL ⚠️</span>
                        )}
                      </td>

                      {/* Take Profit */}
                      <td className="p-3.5 font-mono">
                        {t.takeProfit ? (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium text-[11px]">
                            {t.takeProfit}
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>

                      {/* PnL & Pips */}
                      <td className="p-3.5 font-mono">
                        <div
                          className={`font-bold text-sm ${
                            isWin ? 'text-[#00A651]' : 'text-rose-600'
                          }`}
                        >
                          {isWin ? `+$${t.pnl.toFixed(2)}` : `-$${Math.abs(t.pnl).toFixed(2)}`}
                        </div>
                        <div className={`text-[10px] ${isWin ? 'text-emerald-700' : 'text-rose-600'}`}>
                          {t.pips >= 0 ? `+${t.pips}` : t.pips} pips (≈ Rp {Math.round(Math.abs(t.pnl) * 16000).toLocaleString('id-ID')})
                        </div>
                      </td>

                      {/* SOP Compliance */}
                      <td className="p-3.5">
                        {t.sopCompliant ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-700" /> SOP Valid
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                            <AlertTriangle className="w-3 h-3 text-rose-700" /> Over-Risk
                          </span>
                        )}
                      </td>

                      {/* Notes */}
                      <td className="p-3.5 text-slate-600 text-[11px] max-w-xs">
                        {t.notes || (isWin ? 'Target tercapai' : 'Kena Stop Loss disiplin')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Connect Investor Account Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <Server className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Koneksi Akun Investor (MT4 / MT5)
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Akses Read-Only aman untuk membaca track record otomatis
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowConnectModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Quick 1-Click Preset Options */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Coba Akun Demo Cepat (1-Klik):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleConnectInvestorAccount('realistisfx_master')}
                  className="p-2.5 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-left transition-all cursor-pointer"
                >
                  <div className="text-xs font-bold text-emerald-900">Master RealistisFx</div>
                  <div className="text-[10px] text-emerald-700">MRGM-Real • Grade A (Sangat Bagus)</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleConnectInvestorAccount('icmarkets_demo')}
                  className="p-2.5 rounded-xl border border-blue-300 bg-blue-50 hover:bg-blue-100 text-left transition-all cursor-pointer"
                >
                  <div className="text-xs font-bold text-blue-900">Scalping Disiplin</div>
                  <div className="text-[10px] text-blue-700">ICMarkets • Grade B (Cukup Bagus)</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleConnectInvestorAccount('exness_eval')}
                  className="p-2.5 rounded-xl border border-rose-300 bg-rose-50 hover:bg-rose-100 text-left transition-all cursor-pointer"
                >
                  <div className="text-xs font-bold text-rose-900">Akun Evaluasi</div>
                  <div className="text-[10px] text-rose-700">Exness • Grade C (Perlu Evaluasi)</div>
                </button>
              </div>
            </div>

            <div className="relative flex items-center justify-center my-2">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                Atau Masukkan Akun Sendiri
              </span>
            </div>

            {/* Manual Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleConnectInvestorAccount();
              }}
              className="space-y-3.5 text-xs"
            >
              {/* Platform Segment */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Platform MetaTrader</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPlatform('MT5')}
                    className={`py-2 rounded-xl font-bold border transition-all cursor-pointer ${
                      platform === 'MT5'
                        ? 'bg-[#00A651] text-white border-[#00A651]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    MetaTrader 5 (MT5)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlatform('MT4')}
                    className={`py-2 rounded-xl font-bold border transition-all cursor-pointer ${
                      platform === 'MT4'
                        ? 'bg-[#00A651] text-white border-[#00A651]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    MetaTrader 4 (MT4)
                  </button>
                </div>
              </div>

              {/* Broker Server */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Server Broker</label>
                <div className="relative">
                  <input
                    type="text"
                    value={brokerServer}
                    onChange={(e) => setBrokerServer(e.target.value)}
                    placeholder="Contoh: MRGM-Real, ICMarketsSC-Live, Exness-Real"
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:outline-emerald-600"
                  />
                </div>
                <div className="flex items-center gap-1.5 mt-1.5 overflow-x-auto pb-1 text-[10px]">
                  <span className="text-slate-400">Pilihan Cepat:</span>
                  {BROKER_SERVERS.slice(0, 4).map((srv) => (
                    <button
                      key={srv}
                      type="button"
                      onClick={() => setBrokerServer(srv)}
                      className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-mono"
                    >
                      {srv}
                    </button>
                  ))}
                </div>
              </div>

              {/* Account Number */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nomor Akun (Login ID)</label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="Contoh: 1089241"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:outline-emerald-600"
                />
              </div>

              {/* Investor Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700">Password Investor (Kata Sandi Investor)</label>
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className="text-[11px] text-emerald-700 font-semibold"
                  >
                    {isPasswordVisible ? 'Sembunyikan' : 'Perlihatkan'}
                  </button>
                </div>
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  value={investorPassword}
                  onChange={(e) => setInvestorPassword(e.target.value)}
                  placeholder="Password Investor MT4/MT5 (Hanya Read-Only)"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:outline-emerald-600"
                />
                <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                  Keamanan Terjamin: Password investor HANYA memberi izin membaca riwayat transaksi, tidak bisa membuka/menutup posisi atau menarik dana.
                </p>
              </div>

              {/* Syncing Progress Animation */}
              {isSyncing && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2 animate-in fade-in">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                    <RefreshCw className="w-4 h-4 text-emerald-600 animate-spin" />
                    <span>{syncStage}</span>
                  </div>
                  <div className="w-full bg-emerald-200/50 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full animate-pulse w-3/4" />
                  </div>
                </div>
              )}

              {/* Error Message */}
              {syncError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{syncError}</span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowConnectModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSyncing}
                  className="px-5 py-2.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  <Server className="w-4 h-4" /> Hubungkan &amp; Baca Track Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Fallback Manual Modal (If user explicitly wants to add an offline trade) */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-slate-100 text-slate-700">
                  <Plus className="w-4 h-4" />
                </span>
                <h3 className="text-base font-extrabold text-slate-900">Catat Posisi Manual (Offline)</h3>
              </div>
              <button onClick={() => setShowManualModal(false)} className="text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddManualTrade} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Pair</label>
                  <select
                    value={manualPair}
                    onChange={(e) => setManualPair(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold focus:outline-emerald-600"
                  >
                    <option value="XAUUSD">Gold (XAUUSD)</option>
                    <option value="EURUSD">EUR/USD</option>
                    <option value="GBPUSD">GBP/USD</option>
                    <option value="USDJPY">USD/JPY</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Arah</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setManualDirection('BUY')}
                      className={`py-2 rounded-xl font-bold border transition-all cursor-pointer ${
                        manualDirection === 'BUY'
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      BUY
                    </button>
                    <button
                      type="button"
                      onClick={() => setManualDirection('SELL')}
                      className={`py-2 rounded-xl font-bold border transition-all cursor-pointer ${
                        manualDirection === 'SELL'
                          ? 'bg-rose-600 text-white border-rose-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      SELL
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Lot</label>
                  <input
                    type="number"
                    step="0.01"
                    value={manualLot}
                    onChange={(e) => setManualLot(parseFloat(e.target.value) || 0.01)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:outline-emerald-600"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">PnL Hasil ($)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={manualPnl}
                    onChange={(e) => setManualPnl(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:outline-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Entry Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={manualEntryPrice}
                    onChange={(e) => setManualEntryPrice(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:outline-emerald-600"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Exit Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={manualExitPrice}
                    onChange={(e) => setManualExitPrice(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:outline-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Catatan Evaluasi</label>
                <input
                  type="text"
                  value={manualNotes}
                  onChange={(e) => setManualNotes(e.target.value)}
                  placeholder="Contoh: Rejection SNR H4 valid"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-emerald-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowManualModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold cursor-pointer"
                >
                  Simpan Transaksi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
