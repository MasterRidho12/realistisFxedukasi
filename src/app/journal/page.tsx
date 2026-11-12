'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
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
  Calendar,
  Clock,
  Compass,
  AlertOctagon,
  Percent,
  Upload,
  FileText,
  FileSpreadsheet,
  Coins,
  Download,
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
import { parseMetaTraderStatement } from '@/utils/statementParser';
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

const POPULAR_BROKERS = [
  'Exness-Real',
  'Exness-Standard Cent',
  'ICMarketsSC-Live01',
  'MRGM-Real',
  'XMGlobal-Real',
  'FBS-Cent',
  'OctaFX-Real',
];

type SummaryTimeframe = '1D' | '1W' | '1M' | '1Y';
type SyncMethodTab = 'UPLOAD_STATEMENT' | 'INVESTOR_CREDENTIALS' | 'TERMINAL_EA';

export default function JournalPage() {
  const { user, journals, addJournalEntry, deleteJournalEntry, setAllJournals, marketPrice, openPaymentModal } = useUser();
  const isPro = user.tier === 'PRO';

  // Live Multi-Currency TradingView Quotes
  const [quotes, setQuotes] = useState<Record<string, PairQuote>>(DEFAULT_QUOTES);
  const [isTickActive, setIsTickActive] = useState<boolean>(false);
  const [showTvChart, setShowTvChart] = useState<boolean>(false);
  const [selectedChartPair, setSelectedChartPair] = useState<string>('XAUUSD');

  // Connected Investor Account State
  const [investorAccount, setInvestorAccount] = useState<InvestorAccount | null>(null);
  const [investorTrades, setInvestorTrades] = useState<InvestorTrade[]>([]);
  const [performance, setPerformance] = useState<TrackRecordPerformance | null>(null);

  // Cent Display Unit Switcher: 'USC' (Cent) vs 'USD' (Converted to Dollar)
  const [centUnitDisplay, setCentUnitDisplay] = useState<'USC' | 'USD'>('USC');

  // Timeframe Summary Filter: '1D' | '1W' | '1M' | '1Y'
  const [timeframe, setTimeframe] = useState<SummaryTimeframe>('1M');

  // Connection Method Tab: 'UPLOAD_STATEMENT' (100% exact all brokers) vs 'INVESTOR_CREDENTIALS'
  const [syncMethod, setSyncMethod] = useState<SyncMethodTab>('UPLOAD_STATEMENT');

  // File Upload State
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isParsingFile, setIsParsingFile] = useState<boolean>(false);
  const [fileError, setFileError] = useState<string>('');

  // Connection Form State (User's own credentials)
  const [platform, setPlatform] = useState<'MT4' | 'MT5'>('MT5');
  const [accountType, setAccountType] = useState<'STANDARD' | 'CENT'>('CENT'); // default Cent based on user need
  const [pairFocus, setPairFocus] = useState<'GOLD_ONLY' | 'ALL_PAIRS'>('GOLD_ONLY'); // default Gold Only to prevent unwanted forex pairs
  const [brokerServer, setBrokerServer] = useState<string>('Exness-Real');
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [investorPassword, setInvestorPassword] = useState<string>('');
  const [depositAmount, setDepositAmount] = useState<string>('5000'); // 5000 Cent or 5000 USD
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [showChangeAccountModal, setShowChangeAccountModal] = useState<boolean>(false);

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

  // 2. Load stored investor account on mount (ONLY if user previously saved their account)
  useEffect(() => {
    try {
      const storedAccount = localStorage.getItem('realistis_investor_account');
      const storedTrades = localStorage.getItem('realistis_investor_trades');
      const storedPerf = localStorage.getItem('realistis_investor_perf');

      if (storedAccount && storedTrades && storedPerf) {
        setInvestorAccount(JSON.parse(storedAccount));
        setInvestorTrades(JSON.parse(storedTrades));
        setPerformance(JSON.parse(storedPerf));
      }
      // Never auto-connect demo account by default! User requested to use their own account.
    } catch {
      // Fallback
    }
  }, []);

  // 3. File Upload Handler (100% exact real data for ANY broker in MT4/MT5)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsingFile(true);
    setFileError('');

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        if (!content || content.length < 20) {
          throw new Error('File laporan kosong atau tidak terbaca.');
        }

        const parsed = parseMetaTraderStatement(content, file.name);

        if (!parsed.trades || parsed.trades.length === 0) {
          throw new Error(
            'Tidak ditemukan data transaksi tertutup (closed trades) di dalam file ini. Pastikan Anda mengklik kanan tab History di MT4/MT5 -> pilih Report -> simpan sebagai HTML atau CSV.'
          );
        }

        setInvestorAccount(parsed.account);
        setInvestorTrades(parsed.trades);
        setPerformance(parsed.performance);

        // Persist in localStorage
        try {
          localStorage.setItem('realistis_investor_account', JSON.stringify(parsed.account));
          localStorage.setItem('realistis_investor_trades', JSON.stringify(parsed.trades));
          localStorage.setItem('realistis_investor_perf', JSON.stringify(parsed.performance));
        } catch {}

        // Convert to journals for UserContext
        const convertedJournals: JournalRecord[] = parsed.trades.map((t) => ({
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
          accountType: parsed.account.accountType || 'STANDARD',
          emotion: t.sopCompliant ? 'DISCIPLINED' : 'FOMO',
          adheredToPlan: t.sopCompliant,
          notes: `Tiket MT: #${t.ticket} | ${t.notes || 'Impor Laporan Riil MT4/MT5'}`,
        }));

        setAllJournals(convertedJournals);
        setShowChangeAccountModal(false);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Gagal memproses file laporan MT4/MT5.';
        setFileError(msg);
      } finally {
        setIsParsingFile(false);
      }
    };

    reader.onerror = () => {
      setFileError('Gagal membaca file dari perangkat Anda.');
      setIsParsingFile(false);
    };

    reader.readAsText(file);
  };

  // 4. Connect Investor Account Handler via Credentials
  const handleConnectInvestorAccount = async (targetPresetId?: string) => {
    if (!targetPresetId && (!accountNumber.trim() || !brokerServer.trim())) {
      setSyncError('Harap masukkan nama server broker dan nomor akun investor Anda.');
      return;
    }

    setIsSyncing(true);
    setSyncError('');

    try {
      const targetServer = targetPresetId === 'realistisfx_master' ? 'MRGM-Real' : brokerServer;
      setSyncStage(`Menghubungi server broker ${targetServer}...`);
      await new Promise((r) => setTimeout(r, 400));

      setSyncStage(`Otentikasi sesi investor ${accountType === 'CENT' ? 'Akun Cent' : 'Akun Standard'}...`);
      await new Promise((r) => setTimeout(r, 400));

      setSyncStage('Mengunduh riwayat transaksi tertutup (closed trades)...');

      const response = await fetch('/api/journal/investor-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform,
          brokerServer,
          accountNumber,
          investorPassword,
          accountType,
          deposit: depositAmount,
          presetId: targetPresetId,
          pairFocus,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Gagal menyinkronkan akun investor.');
      }

      setSyncStage('Menghitung ringkasan & Analisis Evaluasi...');
      await new Promise((r) => setTimeout(r, 300));

      const acc: InvestorAccount = data.account;
      const trs: InvestorTrade[] = data.trades;
      const perf: TrackRecordPerformance = data.performance;

      setInvestorAccount(acc);
      setInvestorTrades(trs);
      setPerformance(perf);

      try {
        localStorage.setItem('realistis_investor_account', JSON.stringify(acc));
        localStorage.setItem('realistis_investor_trades', JSON.stringify(trs));
        localStorage.setItem('realistis_investor_perf', JSON.stringify(perf));
      } catch {}

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
        accountType: acc.accountType || 'STANDARD',
        emotion: t.sopCompliant ? 'DISCIPLINED' : 'FOMO',
        adheredToPlan: t.sopCompliant,
        notes: `Tiket MT: #${t.ticket} | ${t.notes || 'Sinkronisasi Otomatis Akun Investor'}`,
      }));

      setAllJournals(convertedJournals);
      setShowChangeAccountModal(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Koneksi ke broker gagal. Periksa server dan password investor.';
      setSyncError(msg);
    } finally {
      setIsSyncing(false);
      setSyncStage('');
    }
  };

  // 5. Connect / Check Real-Time MT5 EA Sync
  const handleSyncFromTerminalEA = async () => {
    if (!accountNumber.trim()) {
      setSyncError('Harap masukkan nomor akun login MT5 Anda terlebih dahulu.');
      return;
    }
    setIsSyncing(true);
    setSyncError('');
    setSyncStage('Memeriksa riwayat push dari terminal MT5...');

    try {
      const res = await fetch(`/api/journal/sync-terminal?accountNumber=${encodeURIComponent(accountNumber.trim())}`);
      const data = await res.json();

      if (!res.ok || !data.success || !data.account) {
        throw new Error(
          data.error ||
            'Belum ada data transaksi yang diterima dari EA terminal MT5 untuk nomor akun ini. Pastikan file RealistisFx_Sync_EA.mq5 sudah terpasang di MT5 dan WebRequest diaktifkan.'
        );
      }

      const acc: InvestorAccount = data.account;
      const trs: InvestorTrade[] = data.trades || [];
      const perf: TrackRecordPerformance = data.performance;

      setInvestorAccount(acc);
      setInvestorTrades(trs);
      setPerformance(perf);

      try {
        localStorage.setItem('realistis_investor_account', JSON.stringify(acc));
        localStorage.setItem('realistis_investor_trades', JSON.stringify(trs));
        localStorage.setItem('realistis_investor_perf', JSON.stringify(perf));
      } catch {}

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
        accountType: acc.accountType || (accountType === 'CENT' ? 'CENT' : 'STANDARD'),
        emotion: t.sopCompliant ? 'DISCIPLINED' : 'FOMO',
        adheredToPlan: t.sopCompliant,
        notes: `Tiket MT: #${t.ticket} | Live Push EA Terminal MT5`,
      }));

      setAllJournals(convertedJournals);
      setShowChangeAccountModal(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal mengambil data dari EA Terminal.';
      setSyncError(msg);
    } finally {
      setIsSyncing(false);
      setSyncStage('');
    }
  };

  // Disconnect investor account
  const handleDisconnect = () => {
    if (confirm('Yakin ingin memutuskan koneksi akun investor ini? Anda dapat memasukkan kembali akun Anda kapan saja.')) {
      setInvestorAccount(null);
      setInvestorTrades([]);
      setPerformance(null);
      setAccountNumber('');
      setInvestorPassword('');
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

  // =========================================================================
  // DYNAMIC TIMEFRAME SUMMARY CALCULATION (1 Hari, 1 Minggu, 1 Bulan, 1 Tahun)
  // =========================================================================
  const isCentAccount = investorAccount?.accountType === 'CENT' || investorAccount?.currency === 'USC';

  const timeframeTrades = useMemo(() => {
    if (!investorTrades || investorTrades.length === 0) return [];

    const now = Date.now();
    let thresholdMs = 30 * 24 * 3600 * 1000; // default 1M (30 days)

    if (timeframe === '1D') {
      thresholdMs = 24 * 3600 * 1000;
    } else if (timeframe === '1W') {
      thresholdMs = 7 * 24 * 3600 * 1000;
    } else if (timeframe === '1M') {
      thresholdMs = 30 * 24 * 3600 * 1000;
    } else if (timeframe === '1Y') {
      thresholdMs = 365 * 24 * 3600 * 1000;
    }

    return investorTrades.filter((t) => {
      const tradeDate = new Date(t.closeTime).getTime();
      return !isNaN(tradeDate) && now - tradeDate <= thresholdMs;
    });
  }, [investorTrades, timeframe]);

  // Compute metrics for selected timeframe
  const timeframeMetrics = useMemo(() => {
    const list = timeframeTrades;
    const total = list.length;
    if (total === 0) {
      return {
        totalTrades: 0,
        winningTrades: 0,
        losingTrades: 0,
        winRate: 0,
        netPnL: 0,
        totalProfit: 0,
        totalLoss: 0,
        profitFactor: 0,
        avgWin: 0,
        avgLoss: 0,
        riskRewardRatio: 0,
        slDisciplineRate: 0,
      };
    }

    const winning = list.filter((t) => t.pnl > 0);
    const losing = list.filter((t) => t.pnl < 0);
    const totalProfit = winning.reduce((acc, t) => acc + t.pnl, 0);
    const totalLoss = Math.abs(losing.reduce((acc, t) => acc + t.pnl, 0));
    const netPnL = Number((totalProfit - totalLoss).toFixed(2));
    const winRate = Number(((winning.length / total) * 100).toFixed(1));
    const profitFactor = totalLoss > 0 ? Number((totalProfit / totalLoss).toFixed(2)) : totalProfit > 0 ? 4.5 : 0;
    const avgWin = winning.length > 0 ? Number((totalProfit / winning.length).toFixed(2)) : 0;
    const avgLoss = losing.length > 0 ? Number((totalLoss / losing.length).toFixed(2)) : 0;
    const riskRewardRatio = avgLoss > 0 ? Number((avgWin / avgLoss).toFixed(2)) : 2.0;

    const slCompliant = list.filter((t) => t.stopLoss !== undefined && t.sopCompliant).length;
    const slDisciplineRate = Number(((slCompliant / total) * 100).toFixed(1));

    return {
      totalTrades: total,
      winningTrades: winning.length,
      losingTrades: losing.length,
      winRate,
      netPnL,
      totalProfit: Math.round(totalProfit * 100) / 100,
      totalLoss: Math.round(totalLoss * 100) / 100,
      profitFactor,
      avgWin,
      avgLoss,
      riskRewardRatio,
      slDisciplineRate,
    };
  }, [timeframeTrades]);

  // Breakdown per Currency Pair to identify Best vs Worst pair
  const pairBreakdown = useMemo(() => {
    const map: Record<string, { total: number; win: number; loss: number; pnl: number }> = {};

    timeframeTrades.forEach((t) => {
      if (!map[t.pair]) {
        map[t.pair] = { total: 0, win: 0, loss: 0, pnl: 0 };
      }
      map[t.pair].total++;
      if (t.pnl > 0) map[t.pair].win++;
      if (t.pnl < 0) map[t.pair].loss++;
      map[t.pair].pnl += t.pnl;
    });

    return Object.entries(map).map(([pair, stats]) => ({
      pair,
      total: stats.total,
      winRate: stats.total > 0 ? Math.round((stats.win / stats.total) * 100) : 0,
      pnl: Math.round(stats.pnl * 100) / 100,
      isProfit: stats.pnl >= 0,
    })).sort((a, b) => b.pnl - a.pnl);
  }, [timeframeTrades]);

  // Filtered trades list for table display
  const filteredTrades = useMemo(() => {
    return timeframeTrades.filter((t) => {
      if (tradeFilter === 'WIN' && t.pnl <= 0) return false;
      if (tradeFilter === 'LOSS' && t.pnl >= 0) return false;
      if (tradeFilter === 'GOLD' && !t.pair.startsWith('XAU')) return false;
      if (tradeFilter === 'FOREX' && t.pair.startsWith('XAU')) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const ticketMatch = t.ticket.toString().includes(q);
        const pairMatch = t.pair.toLowerCase().includes(q);
        const notesMatch = t.notes?.toLowerCase().includes(q);
        return ticketMatch || pairMatch || notesMatch;
      }
      return true;
    });
  }, [timeframeTrades, tradeFilter, searchQuery]);

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
      accountType: isCentAccount ? 'CENT' : 'STANDARD',
      emotion: manualEmotion,
      adheredToPlan: true,
      notes: manualNotes || 'Pencatatan manual offline',
    });

    setShowManualModal(false);
  };

  const timeframeLabels: Record<SummaryTimeframe, string> = {
    '1D': 'Hari Ini (1 Hari / 24 Jam)',
    '1W': 'Minggu Ini (1 Minggu / 7 Hari)',
    '1M': 'Bulan Ini (1 Bulan / 30 Hari)',
    '1Y': 'Tahun Ini (1 Tahun / 365 Hari)',
  };

  // Helper format for currency (Cent vs Standard)
  const formatAmount = (val: number) => {
    if (isCentAccount) {
      if (centUnitDisplay === 'USD') {
        const usdVal = val / 100;
        return `$${usdVal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
      }
      return `${val.toLocaleString('en-US', { minimumFractionDigits: 2 })} USC`;
    }
    return `$${val.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
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
              Smart Trading Journal Otomatis (Semua Broker &amp; Akun Cent / Standard)
            </h1>
          </div>
          <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
            Mendukung penuh <strong className="text-slate-900">Akun Cent (USC)</strong> dan <strong className="text-slate-900">Akun Standard (USD)</strong> di seluruh broker (Exness, ICMarkets, MRG, FBS, XM, dll). Tarik riwayat transaksi 100% akurat tanpa pencatatan manual, ringkas <strong className="text-slate-900">1 Hari, 1 Minggu, 1 Bulan, 1 Tahun</strong>, dan evaluasi apakah trading Anda sudah bagus atau perlu perbaikan.
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
                onClick={() => setShowChangeAccountModal(true)}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 border border-slate-200 transition-all cursor-pointer"
              >
                <Server className="w-3.5 h-3.5" /> Ganti / Impor Akun
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                const el = document.getElementById('connect-form-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm hover:shadow active:scale-95 transition-all cursor-pointer"
            >
              <Server className="w-4 h-4" /> Masukkan Akun Saya
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

      {/* ===================================================================== */}
      {/* 1. KONEKSI AKUN SAYA: DUKUNGAN AKUN CENT & UNGGAH LAPORAN SEMUA BROKER  */}
      {/* ===================================================================== */}
      {!investorAccount ? (
        <div id="connect-form-section" className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Dukungan 100% Semua Broker (Exness, ICMarkets, MRG, FBS, XM, dll)
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                Pilih Cara Menghubungkan Data Transaksi Akun Anda
              </h2>
              <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                Mendukung <strong className="text-emerald-800">Akun Cent (USC)</strong> dan <strong className="text-slate-900">Akun Standard (USD)</strong>. Anda bisa langsung mengunggah file laporan MT4/MT5 untuk data 100% identik dengan terminal Anda, atau memasukkan kredensial investor.
              </p>
            </div>

            {/* Method Segment: Upload vs Credentials vs Terminal EA */}
            <div className="flex items-center flex-wrap gap-1 rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setSyncMethod('UPLOAD_STATEMENT')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  syncMethod === 'UPLOAD_STATEMENT'
                    ? 'bg-[#00A651] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Unggah Laporan MT4/MT5 (100% Persis)</span>
              </button>
              <button
                type="button"
                onClick={() => setSyncMethod('INVESTOR_CREDENTIALS')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  syncMethod === 'INVESTOR_CREDENTIALS'
                    ? 'bg-[#00A651] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Server className="w-3.5 h-3.5" />
                <span>Akun Investor MT4/MT5</span>
              </button>
              <button
                type="button"
                onClick={() => setSyncMethod('TERMINAL_EA')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  syncMethod === 'TERMINAL_EA'
                    ? 'bg-[#00A651] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Script Live EA MT5</span>
              </button>
            </div>
          </div>

          {/* METHOD 1: UPLOAD REAL STATEMENT (100% EXACT ALL BROKERS) */}
          {syncMethod === 'UPLOAD_STATEMENT' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/30 hover:bg-emerald-50/60 transition-all rounded-3xl p-8 text-center cursor-pointer space-y-3"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".htm,.html,.csv,.xml,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                  <Upload className={`w-7 h-7 ${isParsingFile ? 'animate-bounce' : ''}`} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-900">
                    {isParsingFile ? 'Menganalisis file laporan MT4/MT5...' : 'Klik atau Tarik File Laporan MT4 / MT5 ke Sini'}
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Mendukung format file <strong className="text-slate-800">.html / .htm / .csv / .xml</strong> dari semua broker (Exness Cent, ICMarkets, XM, FBS, dll).
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-emerald-200 text-[11px] font-bold text-emerald-800 shadow-2xs">
                  ✓ 100% Sesuai Data Riil Akun Anda • Termasuk Akun Cent (USC)
                </div>
              </div>

              {/* 3-Step Simple Tutorial */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-600">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] flex items-center justify-center font-bold">1</span>
                    Buka MT4 / MT5
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Buka terminal MT4 atau MT5 Anda di PC/Laptop, lalu buka tab <strong className="text-slate-800">History (Riwayat)</strong>.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] flex items-center justify-center font-bold">2</span>
                    Simpan Laporan (Report)
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Klik kanan di area transaksi -&gt; pilih <strong className="text-slate-800">Report</strong> -&gt; Simpan sebagai <strong className="text-slate-800">HTML</strong> atau <strong className="text-slate-800">Open XML (Excel)</strong>.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] flex items-center justify-center font-bold">3</span>
                    Unggah ke Sini
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Tarik file laporan tadi ke kotak di atas. Seluruh tiket, lot, pips, dan PnL riil akun Anda akan langsung terbaca otomatis!
                  </p>
                </div>
              </div>

              {fileError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{fileError}</span>
                </div>
              )}
            </div>
          )}

          {/* METHOD 2: INVESTOR ACCOUNT FORM (WITH CENT ACCOUNT SUPPORT) */}
          {syncMethod === 'INVESTOR_CREDENTIALS' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleConnectInvestorAccount();
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs animate-in fade-in duration-200"
            >
              {/* Jenis Akun: Cent vs Standard */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">Jenis Akun Trading</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAccountType('CENT');
                      if (depositAmount === '5000') setDepositAmount('5000'); // 5,000 Cent
                    }}
                    className={`py-2.5 rounded-xl font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      accountType === 'CENT'
                        ? 'bg-[#00A651] text-white border-[#00A651] shadow-2xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Coins className="w-4 h-4" />
                    <span>Akun Cent (USC ¢)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAccountType('STANDARD');
                    }}
                    className={`py-2.5 rounded-xl font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      accountType === 'STANDARD'
                        ? 'bg-[#00A651] text-white border-[#00A651] shadow-2xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <DollarSign className="w-4 h-4" />
                    <span>Akun Standard ($ USD)</span>
                  </button>
                </div>
              </div>

              {/* Platform MT4 vs MT5 */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">Platform Trading</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPlatform('MT5')}
                    className={`py-2.5 rounded-xl font-bold border transition-all cursor-pointer ${
                      platform === 'MT5'
                        ? 'bg-[#00A651] text-white border-[#00A651] shadow-2xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    MetaTrader 5 (MT5)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlatform('MT4')}
                    className={`py-2.5 rounded-xl font-bold border transition-all cursor-pointer ${
                      platform === 'MT4'
                        ? 'bg-[#00A651] text-white border-[#00A651] shadow-2xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    MetaTrader 4 (MT4)
                  </button>
                </div>
              </div>

              {/* Fokus Pair Trading: Hanya Gold vs Semua Pair */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="font-bold text-slate-700 block flex items-center justify-between">
                  <span>Fokus Instrumen Trading (Pair yang Anda Tradingkan)</span>
                  <span className="text-[11px] font-normal text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Mencegah munculnya transaksi pair yang tidak Anda buka
                  </span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPairFocus('GOLD_ONLY')}
                    className={`p-3 rounded-xl font-bold border transition-all cursor-pointer text-left flex items-start gap-2.5 ${
                      pairFocus === 'GOLD_ONLY'
                        ? 'bg-emerald-50/80 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20 shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg mt-0.5 ${pairFocus === 'GOLD_ONLY' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
                      <Flame className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs">Hanya Gold (XAUUSD / XAUUSDc)</span>
                        <span className="text-[10px] bg-emerald-600 text-white font-bold px-1.5 py-0.2 rounded">Rekomendasi</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-normal mt-0.5 leading-tight">
                        Hanya membaca riwayat transaksi Gold. Tidak akan ada pair Forex lain (EUR, GBP, JPY) yang muncul.
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPairFocus('ALL_PAIRS')}
                    className={`p-3 rounded-xl font-bold border transition-all cursor-pointer text-left flex items-start gap-2.5 ${
                      pairFocus === 'ALL_PAIRS'
                        ? 'bg-emerald-50/80 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20 shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg mt-0.5 ${pairFocus === 'ALL_PAIRS' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-xs block">Semua Pair (Gold &amp; Forex)</span>
                      <p className="text-[11px] text-slate-500 font-normal mt-0.5 leading-tight">
                        Membaca riwayat multi-pair (XAUUSD, EURUSD, GBPUSD, USDJPY, dll).
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Server Broker */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">Nama Server Broker</label>
                <input
                  type="text"
                  value={brokerServer}
                  onChange={(e) => setBrokerServer(e.target.value)}
                  placeholder="Contoh: Exness-Real, Exness-Standard Cent, ICMarketsSC-Live"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:outline-emerald-600 bg-white"
                />
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[10px]">
                  <span className="text-slate-400 font-medium">Pilihan Cepat:</span>
                  {POPULAR_BROKERS.slice(0, 4).map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBrokerServer(b)}
                      className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono border border-slate-200 cursor-pointer"
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Account Number */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">Nomor Akun (Login ID)</label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="Masukkan Nomor Login Akun Anda"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:outline-emerald-600 bg-white"
                />
              </div>

              {/* Investor Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-700">Password Investor (Read-Only)</label>
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className="text-[11px] text-emerald-700 font-semibold cursor-pointer"
                  >
                    {isPasswordVisible ? 'Sembunyikan' : 'Lihat'}
                  </button>
                </div>
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  value={investorPassword}
                  onChange={(e) => setInvestorPassword(e.target.value)}
                  placeholder="Kata Sandi Investor (Aman, Tanpa Izin Buka/Tarik)"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:outline-emerald-600 bg-white"
                />
              </div>

              {/* Initial Deposit in Cent or USD */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">
                  Modal Awal / Deposit ({accountType === 'CENT' ? 'Cent USC ¢' : '$ USD'})
                </label>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder={accountType === 'CENT' ? 'Contoh: 5000 Cent ($50)' : 'Contoh: 5000 USD'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:outline-emerald-600 bg-white"
                />
                <span className="text-[10px] text-slate-400">
                  {accountType === 'CENT' ? '1 USD = 100 Cent (Misal: $50 = 5,000 Cent)' : 'Saldo dalam satuan US Dollar ($)'}
                </span>
              </div>

              {/* Syncing Progress */}
              {isSyncing && (
                <div className="md:col-span-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 animate-in fade-in">
                  <div className="flex items-center gap-2.5 text-xs font-bold text-emerald-900">
                    <RefreshCw className="w-4 h-4 text-emerald-600 animate-spin" />
                    <span>{syncStage}</span>
                  </div>
                  <div className="w-full bg-emerald-200/50 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full animate-pulse w-3/4" />
                  </div>
                </div>
              )}

              {syncError && (
                <div className="md:col-span-2 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{syncError}</span>
                </div>
              )}

              <div className="md:col-span-2 pt-2 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={isSyncing}
                  className="px-6 py-3 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  <Server className="w-4 h-4" /> Hubungkan Akun &amp; Baca Riwayat
                </button>
              </div>
            </form>
          )}

          {/* METHOD 3: LIVE TERMINAL MT5 PUSH EA */}
          {syncMethod === 'TERMINAL_EA' && (
            <div className="space-y-5 animate-in fade-in duration-200 text-xs">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-emerald-600 text-white font-mono text-[10px] font-bold">EA MT5</span>
                    <h3 className="font-bold text-slate-900 text-sm">RealistisFx Sync Connector EA (MQL5)</h3>
                  </div>
                  <p className="text-slate-600 text-[11px] max-w-xl">
                    Kirim otomatis riwayat closed trades dari terminal MetaTrader 5 ke Smart Trading Journal secara real-time setiap kali Anda closing posisi!
                  </p>
                </div>
                <a
                  href="/mt5/RealistisFx_Sync_EA.mq5"
                  download="RealistisFx_Sync_EA.mq5"
                  className="px-4 py-2.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold flex items-center justify-center gap-2 shadow-xs transition-all shrink-0 cursor-pointer text-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh File EA (.mq5)</span>
                </a>
              </div>

              {/* 4 Steps Tutorial */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] flex items-center justify-center font-bold">1</span>
                    Unduh File EA
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Klik tombol hijau di atas untuk mengunduh <code className="text-emerald-800 bg-emerald-100 px-1 rounded">RealistisFx_Sync_EA.mq5</code>.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] flex items-center justify-center font-bold">2</span>
                    Pasang di MT5
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Di MT5: Klik <strong>File &gt; Open Data Folder</strong>, buka folder <strong>MQL5 &gt; Experts</strong>, paste file tadi.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] flex items-center justify-center font-bold">3</span>
                    Aktifkan WebRequest
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Di MT5: <strong>Tools &gt; Options &gt; Expert Advisors</strong>, centang <em>Allow WebRequest</em> dan masukkan URL web ini.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] flex items-center justify-center font-bold">4</span>
                    Attach ke Chart
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Tarik EA ke sembarang chart (misal Gold H1). EA akan otomatis push closed trades ke database!
                  </p>
                </div>
              </div>

              {/* Form to pull synced data */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
                <div className="font-bold text-slate-800">
                  Ambil Data Transaksi dari Terminal MT5 Anda
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 block">Nomor Akun Login MT5</label>
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="Masukkan Nomor Login MT5 Anda"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:outline-emerald-600"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      disabled={isSyncing}
                      onClick={handleSyncFromTerminalEA}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                      <span>{isSyncing ? 'Memeriksa...' : 'Cek & Ambil Data Riil'}</span>
                    </button>
                  </div>
                </div>

                {isSyncing && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-emerald-600 animate-spin shrink-0" />
                    <span>{syncStage}</span>
                  </div>
                )}

                {syncError && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{syncError}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ===================================================================== */
        /* CONNECTED STATE HEADER CARD (WITH CENT DISPLAY SWITCHER)              */
        /* ===================================================================== */
        <div className="bg-gradient-to-r from-emerald-950 via-[#00472B] to-[#005A36] rounded-2xl p-5 text-white shadow-md border border-emerald-800/40 relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-mono text-[11px] font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  STATUS: LIVE TERKONEKSI ({investorAccount.dataSource === 'STATEMENT_UPLOAD' ? 'LAPORAN RIIL 100% SESUAI' : 'SINKRONISASI OTOMATIS'})
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white/10 text-white text-[11px] font-mono">
                  {investorAccount.platform} • {investorAccount.brokerServer}
                </span>
                {isCentAccount && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-400/20 border border-amber-300/30 text-amber-300 text-[11px] font-mono font-bold">
                    <Coins className="w-3 h-3 text-amber-400" /> Akun Cent (USC ¢)
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-2">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                  {investorAccount.accountName}
                </h2>
                <span className="text-xs text-emerald-200/80 font-mono">#{investorAccount.accountNumber}</span>
              </div>

              <p className="text-[11px] text-emerald-100/70">
                Terakhir disinkronkan: {new Date(investorAccount.lastSyncAt).toLocaleTimeString('id-ID')} WIB • {investorTrades.length} Transaksi Tertutup Terbaca
              </p>
            </div>

            {/* Quick Balance Ribbon + Cent/USD Toggle */}
            <div className="flex items-center gap-3 sm:gap-6 bg-black/20 backdrop-blur-xs p-3 rounded-xl border border-white/10 flex-wrap">
              {isCentAccount && (
                <div className="flex items-center gap-1 bg-white/10 p-1 rounded-lg text-[10px] font-bold">
                  <button
                    onClick={() => setCentUnitDisplay('USC')}
                    className={`px-2 py-0.5 rounded ${centUnitDisplay === 'USC' ? 'bg-[#00A651] text-white' : 'text-emerald-200'}`}
                  >
                    Cent (USC)
                  </button>
                  <button
                    onClick={() => setCentUnitDisplay('USD')}
                    className={`px-2 py-0.5 rounded ${centUnitDisplay === 'USD' ? 'bg-[#00A651] text-white' : 'text-emerald-200'}`}
                  >
                    Dollar ($)
                  </button>
                </div>
              )}

              <div>
                <div className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider">Saldo (Balance)</div>
                <div className="text-lg sm:text-xl font-extrabold font-mono text-white">
                  {formatAmount(investorAccount.balance)}
                </div>
                {isCentAccount && centUnitDisplay === 'USC' && (
                  <div className="text-[10px] text-emerald-300 font-mono">
                    ≈ ${(investorAccount.balance / 100).toFixed(2)} USD
                  </div>
                )}
              </div>

              <div className="h-8 w-px bg-white/10 hidden sm:block" />

              <div>
                <div className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider">Deposit Awal</div>
                <div className="text-sm sm:text-base font-bold font-mono text-emerald-100">
                  {formatAmount(investorAccount.deposit)}
                </div>
              </div>

              <div className="h-8 w-px bg-white/10 hidden sm:block" />

              <div>
                <div className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider">Hasil Akun</div>
                <div
                  className={`text-lg sm:text-xl font-extrabold font-mono ${
                    investorAccount.balance - investorAccount.deposit >= 0 ? 'text-emerald-300' : 'text-rose-400'
                  }`}
                >
                  {investorAccount.balance - investorAccount.deposit >= 0 ? '+' : ''}
                  {formatAmount(investorAccount.balance - investorAccount.deposit)}
                </div>
              </div>

              <div>
                <button
                  onClick={handleDisconnect}
                  className="p-2 rounded-lg bg-white/10 hover:bg-rose-500/20 text-emerald-200 hover:text-rose-300 transition-colors cursor-pointer"
                  title="Putuskan Akun"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. TIMEFRAME SELECTOR RIBBON (1 Hari, 1 Minggu, 1 Bulan, 1 Tahun)     */}
      {/* ===================================================================== */}
      {investorAccount && (
        <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <Calendar className="w-4 h-4" />
            </span>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Pilih Rentang Waktu Ringkasan:</span>
              <span className="text-[11px] text-slate-500 font-mono">
                Menampilkan data: <strong className="text-emerald-800 font-semibold">{timeframeLabels[timeframe]}</strong>
              </span>
            </div>
          </div>

          {/* 4 Segmented Period Tabs */}
          <div className="grid grid-cols-4 sm:flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            {(
              [
                { key: '1D', label: '1 Hari' },
                { key: '1W', label: '1 Minggu' },
                { key: '1M', label: '1 Bulan' },
                { key: '1Y', label: '1 Tahun' },
              ] as const
            ).map((t) => (
              <button
                key={t.key}
                onClick={() => setTimeframe(t.key)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer text-center ${
                  timeframe === t.key
                    ? 'bg-[#00A651] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 3. DYNAMIC METRICS FOR SELECTED TIMEFRAME (1D / 1W / 1M / 1Y)        */}
      {/* ===================================================================== */}
      {investorAccount && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Total Entry */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-1">
            <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Total Entry ({timeframe})</div>
            <div className="text-xl sm:text-2xl font-extrabold font-mono text-slate-900">
              {timeframeMetrics.totalTrades} <span className="text-xs font-normal text-slate-500">Posisi</span>
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              {timeframeMetrics.winningTrades} Menang / {timeframeMetrics.losingTrades} Kalah
            </div>
          </div>

          {/* Win Rate */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-1">
            <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Win Rate ({timeframe})</div>
            <div className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-700 flex items-center gap-1">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              {timeframeMetrics.winRate}%
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full"
                style={{ width: `${Math.min(100, timeframeMetrics.winRate)}%` }}
              />
            </div>
          </div>

          {/* Net Profit / Loss */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-1">
            <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Net PnL ({timeframe})</div>
            <div
              className={`text-xl sm:text-2xl font-extrabold font-mono ${
                timeframeMetrics.netPnL >= 0 ? 'text-[#00A651]' : 'text-rose-600'
              }`}
            >
              {timeframeMetrics.netPnL >= 0 ? '+' : ''}{formatAmount(timeframeMetrics.netPnL)}
            </div>
            {isCentAccount && centUnitDisplay === 'USC' && (
              <div className="text-[10px] text-slate-500 font-mono">
                ≈ ${(timeframeMetrics.netPnL / 100).toFixed(2)} USD
              </div>
            )}
          </div>

          {/* Profit Factor */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-1">
            <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Profit Factor ({timeframe})</div>
            <div className="text-xl sm:text-2xl font-extrabold font-mono text-slate-900">
              {timeframeMetrics.profitFactor}
            </div>
            <div className="text-[10px] text-emerald-700 font-semibold">
              {timeframeMetrics.profitFactor >= 2.0 ? 'Luar Biasa (> 2.0)' : timeframeMetrics.profitFactor >= 1.5 ? 'Bagus (> 1.5)' : 'Perlu Diperbaiki'}
            </div>
          </div>

          {/* Risk to Reward Realisasi */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-1">
            <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Rata-rata Win / Loss</div>
            <div className="text-xl sm:text-2xl font-extrabold font-mono text-slate-900">
              1 : {timeframeMetrics.riskRewardRatio}
            </div>
            <div className="text-[10px] text-slate-500 font-mono truncate">
              +{formatAmount(timeframeMetrics.avgWin)} / -{formatAmount(timeframeMetrics.avgLoss)}
            </div>
          </div>

          {/* Disiplin Stop Loss */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-1">
            <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Disiplin SL ({timeframe})</div>
            <div
              className={`text-xl sm:text-2xl font-extrabold font-mono ${
                timeframeMetrics.slDisciplineRate >= 80 ? 'text-emerald-700' : 'text-rose-600'
              }`}
            >
              {timeframeMetrics.slDisciplineRate}%
            </div>
            <div className="text-[10px] text-slate-500">
              {timeframeMetrics.slDisciplineRate >= 85 ? 'SOP Terpenuhi' : 'Waspada Trade Tanpa SL'}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 4. POIN KRITIS YANG HARUS DIEVALUASI & ANALISIS WIN RATE               */}
      {/* ===================================================================== */}
      {investorAccount && (
        <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                  <AlertOctagon className="w-5 h-5" />
                </span>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                  Evaluasi Kritis Kinerja &amp; Performa Win Rate ({timeframeLabels[timeframe]})
                </h2>
              </div>
              <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                Hasil audit otomatis RealistisFx terhadap riwayat transaksi riil akun Anda. Berikut adalah poin-poin <strong className="text-rose-700">yang harus dievaluasi</strong> dan diperbaiki untuk menjaga pertumbuhan modal.
              </p>
            </div>

            {/* Win Rate Status Pill */}
            <div className="flex items-center gap-2.5">
              <div className="text-right">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Standar Target SOP</div>
                <div className="text-xs font-bold text-slate-800">Minimal 60% Win Rate</div>
              </div>
              <div
                className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 border shadow-2xs ${
                  timeframeMetrics.winRate >= 65
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : timeframeMetrics.winRate >= 50
                    ? 'bg-blue-50 text-blue-800 border-blue-300'
                    : 'bg-rose-50 text-rose-800 border-rose-300'
                }`}
              >
                {timeframeMetrics.winRate >= 65 ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Akurasi Sangat Bagus ({timeframeMetrics.winRate}%)</span>
                  </>
                ) : timeframeMetrics.winRate >= 50 ? (
                  <>
                    <Activity className="w-4 h-4 text-blue-600" />
                    <span>Akurasi Cukup ({timeframeMetrics.winRate}%)</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Perlu Evaluasi Ketat ({timeframeMetrics.winRate}%)</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 4 Poin Kritis yang Harus Dievaluasi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Evaluasi Disiplin Stop Loss */}
            <div
              className={`p-4 rounded-2xl border space-y-2 ${
                timeframeMetrics.slDisciplineRate >= 85
                  ? 'bg-emerald-50/40 border-emerald-200'
                  : 'bg-rose-50/50 border-rose-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>1. Evaluasi Kedisiplinan Stop Loss (SL)</span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                    timeframeMetrics.slDisciplineRate >= 85
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {timeframeMetrics.slDisciplineRate >= 85 ? '✓ LULUS SOP' : '⚠️ HARUS DIEVALUASI'}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {timeframeMetrics.slDisciplineRate >= 85
                  ? `Sangat baik! ${timeframeMetrics.slDisciplineRate}% transaksi dalam periode ${timeframe} ini dipasangi batasan Stop Loss. Kerugian per transaksi terkendali.`
                  : `PERHATIAN: Ditemukan transaksi yang tidak memasang Stop Loss atau floating loss dibiarkan berlarut-larut. Jangan pernah menahan posisi minus dengan harapan harga akan balik arah (hoping).`}
              </p>
              <div className="text-[10px] text-slate-500 font-mono">
                Catatan SOP: Pasang Stop Loss baku 30 pips seketika saat order dibuka.
              </div>
            </div>

            {/* 2. Evaluasi Rasio Risk to Reward (Taking Profit) */}
            <div
              className={`p-4 rounded-2xl border space-y-2 ${
                timeframeMetrics.riskRewardRatio >= 1.5
                  ? 'bg-emerald-50/40 border-emerald-200'
                  : 'bg-amber-50/50 border-amber-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                  <Target className="w-4 h-4 text-emerald-600" />
                  <span>2. Evaluasi Rasio Risk to Reward (RR)</span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                    timeframeMetrics.riskRewardRatio >= 1.5
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {timeframeMetrics.riskRewardRatio >= 1.5 ? '✓ SEHAT (1:2+)' : '⚡ HARUS DIEVALUASI'}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {timeframeMetrics.riskRewardRatio >= 1.5
                  ? `Rasio reward Anda 1 : ${timeframeMetrics.riskRewardRatio}. Rata-rata kemenangan (${formatAmount(timeframeMetrics.avgWin)}) melampaui rata-rata kerugian (${formatAmount(timeframeMetrics.avgLoss)}).`
                  : `Rata-rata profit (${formatAmount(timeframeMetrics.avgWin)}) hampir sama dengan rata-rata loss (${formatAmount(timeframeMetrics.avgLoss)}). Waspada kebiasaan 'cut profit terlalu dini tapi nahan loss berhari-hari'.`}
              </p>
              <div className="text-[10px] text-slate-500 font-mono">
                Rata-rata Menang: +{formatAmount(timeframeMetrics.avgWin)} | Rata-rata Kalah: -{formatAmount(timeframeMetrics.avgLoss)}
              </div>
            </div>

            {/* 3. Evaluasi Over-Trading & Frekuensi Transaksi */}
            <div
              className={`p-4 rounded-2xl border space-y-2 ${
                (timeframe === '1D' && timeframeMetrics.totalTrades <= 3) ||
                (timeframe === '1W' && timeframeMetrics.totalTrades <= 15) ||
                timeframe === '1M' || timeframe === '1Y'
                  ? 'bg-emerald-50/40 border-emerald-200'
                  : 'bg-rose-50/50 border-rose-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span>3. Evaluasi Frekuensi Transaksi (Over-Trading)</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-slate-100 text-slate-800">
                  {timeframeMetrics.totalTrades} Transaksi
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {timeframe === '1D' && timeframeMetrics.totalTrades > 3
                  ? 'PERINGATAN: Anda membuka lebih dari 3 trade hari ini. Terlalu sering menatap chart memicu kelelahan psikologis dan eksekusi balas dendam (revenge trading).'
                  : `Frekuensi trading terkontrol. Disiplin menunggu setup pantulan Support & Resistance yang benar-benar valid terbukti menghasilkan probabilitas lebih tinggi.`}
              </p>
              <div className="text-[10px] text-slate-500 font-mono">
                Batas SOP Realistis: Maksimal 2 - 3 entry berkualitas tinggi per hari.
              </div>
            </div>

            {/* 4. Evaluasi Pasangan Mata Uang (Pair Terbaik vs Terburuk) */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                  <BarChart3 className="w-4 h-4 text-purple-600" />
                  <span>4. Evaluasi Pasangan Mata Uang (Pair)</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">Breakdown Instrumen</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {pairBreakdown.slice(0, 4).map((p) => (
                  <div key={p.pair} className="bg-white p-2 rounded-xl border border-slate-200 text-center">
                    <div className="font-bold text-slate-900 text-[11px]">{p.pair}</div>
                    <div className={`text-xs font-extrabold font-mono ${p.isProfit ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {p.isProfit ? '+' : ''}{formatAmount(p.pnl)}
                    </div>
                    <div className="text-[9px] text-slate-400 font-mono">Win Rate: {p.winRate}%</div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 italic">
                Saran: Fokuslah pada pair yang memiliki Win Rate tertinggi, dan kurangi trading pada pair yang sering memberi kekalahan.
              </p>
            </div>
          </div>

          {/* Action Plan */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-white to-emerald-50/30 border border-emerald-200 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Compass className="w-4 h-4 text-emerald-700" />
              <span>Rencana Tindakan Koreksi untuk Sesi Berikutnya:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-slate-700">
              <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-2xs space-y-1">
                <div className="font-bold text-emerald-900">1. Kunci Stop Loss 30 Pips</div>
                <p className="text-slate-500">Pasang SL sebelum entry. Jangan pernah memindahkan SL menjauh saat floating minus.</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-2xs space-y-1">
                <div className="font-bold text-emerald-900">2. Target TP Minimal 1:2</div>
                <p className="text-slate-500">Biarkan posisi menyentuh level TP yang sudah direncanakan. Jangan cut profit terburu-buru.</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-2xs space-y-1">
                <div className="font-bold text-emerald-900">3. Disiplin Ukuran Lot ({isCentAccount ? 'Lot Cent' : 'Lot Standard'})</div>
                <p className="text-slate-500">
                  {isCentAccount
                    ? 'Pada akun cent, gunakan 0.01 - 0.10 cent lot agar risiko per trade tetap di bawah 1% modal.'
                    : 'Gunakan Kalkulator Lot Aman agar risiko per trade maksimal 1% modal.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 5. TABEL HISTORI CLOSED TRADES (SESUAI PERIODE 1D / 1W / 1M / 1Y)       */}
      {/* ===================================================================== */}
      {investorAccount && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          {/* Table Controls */}
          <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">Histori Transaksi Riil ({timeframeLabels[timeframe]})</h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-mono border border-emerald-200 font-bold">
                {filteredTrades.length} Posisi
              </span>
            </div>

            {/* Filter Buttons & Search */}
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
                    { key: 'GOLD', label: 'Gold (XAU)' },
                    { key: 'FOREX', label: 'Forex' },
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
              <h3 className="text-sm font-bold text-slate-900">Tidak Ada Transaksi pada Periode Ini</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Tidak ada transaksi yang selesai dalam rentang waktu {timeframeLabels[timeframe]}. Pilih periode 1 Bulan atau 1 Tahun di atas.
              </p>
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
                    <th className="p-3.5">Hasil PnL / Pips</th>
                    <th className="p-3.5">Kepatuhan SOP</th>
                    <th className="p-3.5">Analisa Rekam Jejak</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTrades.map((t) => {
                    const isWin = t.pnl > 0;

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
                        <td className="p-3.5 font-mono text-slate-900 font-medium">{t.openPrice || '-'}</td>

                        {/* Close Price */}
                        <td className="p-3.5 font-mono text-slate-900 font-medium">{t.closePrice || '-'}</td>

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
                            {isWin ? '+' : ''}{formatAmount(t.pnl)}
                          </div>
                          <div className={`text-[10px] ${isWin ? 'text-emerald-700' : 'text-rose-600'}`}>
                            {t.pips >= 0 ? `+${t.pips}` : t.pips} pips
                            {isCentAccount && centUnitDisplay === 'USC' && ` (≈ $${(t.pnl / 100).toFixed(2)})`}
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
      )}

      {/* Change / Reconnect Modal */}
      {showChangeAccountModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <Server className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Ganti / Impor Akun Baru</h3>
                  <p className="text-[11px] text-slate-500">Mendukung Akun Cent &amp; Standard Semua Broker</p>
                </div>
              </div>
              <button
                onClick={() => setShowChangeAccountModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Option 1: File Statement Upload */}
              <div
                onClick={() => {
                  fileInputRef.current?.click();
                }}
                className="p-4 rounded-xl border border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/40 text-center cursor-pointer transition-all space-y-1.5"
              >
                <Upload className="w-6 h-6 text-emerald-700 mx-auto" />
                <div className="text-xs font-bold text-slate-900">Unggah File Laporan Riil (.html / .csv)</div>
                <div className="text-[11px] text-slate-500">100% Cocok Dengan MT4/MT5 Anda Tanpa Selisih</div>
              </div>

              <div className="text-center text-xs text-slate-400 font-semibold">— ATAU MASUKKAN KREDENSIAL —</div>

              {/* Option 2: Credentials Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleConnectInvestorAccount();
                }}
                className="space-y-3 text-xs"
              >
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Tipe Akun</label>
                    <select
                      value={accountType}
                      onChange={(e) => setAccountType(e.target.value as 'STANDARD' | 'CENT')}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold focus:outline-emerald-600"
                    >
                      <option value="CENT">Akun Cent (USC ¢)</option>
                      <option value="STANDARD">Akun Standard ($ USD)</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Platform</label>
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value as 'MT4' | 'MT5')}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold focus:outline-emerald-600"
                    >
                      <option value="MT5">MetaTrader 5 (MT5)</option>
                      <option value="MT4">MetaTrader 4 (MT4)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Fokus Pair Trading</label>
                  <select
                    value={pairFocus}
                    onChange={(e) => setPairFocus(e.target.value as 'GOLD_ONLY' | 'ALL_PAIRS')}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold focus:outline-emerald-600"
                  >
                    <option value="GOLD_ONLY">⭐ Hanya Gold (XAUUSD / XAUUSDc) - Rekomendasi</option>
                    <option value="ALL_PAIRS">Semua Pair (Forex &amp; Gold)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Server Broker</label>
                  <input
                    type="text"
                    value={brokerServer}
                    onChange={(e) => setBrokerServer(e.target.value)}
                    placeholder="Contoh: Exness-Real, ICMarketsSC-Live, MRGM-Real"
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:outline-emerald-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nomor Akun (Login)</label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Nomor Akun Trading Anda"
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:outline-emerald-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Password Investor</label>
                  <input
                    type="password"
                    value={investorPassword}
                    onChange={(e) => setInvestorPassword(e.target.value)}
                    placeholder="Password Investor (Read-Only)"
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:outline-emerald-600"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowChangeAccountModal(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSyncing}
                    className="px-5 py-2 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold cursor-pointer disabled:opacity-50"
                  >
                    Hubungkan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Fallback Manual Modal */}
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
                  <label className="font-bold text-slate-700 block mb-1">
                    PnL Hasil ({isCentAccount ? 'USC' : '$'})
                  </label>
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
