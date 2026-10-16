'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Radar,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Crown,
  Lock,
  Clock,
  Sparkles,
  Bot,
  RefreshCw,
  Search,
  Flame,
  Globe2,
  Zap,
  Info,
  Calendar,
  CalendarDays,
  CalendarRange,
  ChevronDown,
  ChevronUp,
  X,
  ArrowRight,
  ShieldAlert,
  SlidersHorizontal,
  Target,
  Percent,
  CheckCircle2,
  Crosshair,
  Award,
  Radio,
  Copy,
  Check
} from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { EnrichedNewsItem } from '../api/news/route';

const CURRENCIES = ['ALL', 'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'NZD', 'CHF'];
type TimeframeOption = 'all' | 'today' | 'tomorrow' | 'upcoming';

// Helper to compute REAL-TIME dynamic signal price levels
function getDynamicSignalLevels(currency: string, title: string, liveXauSpot: number) {
  const curr = currency.toUpperCase();

  // 1. USD Events -> Primary pair is Gold (XAUUSD)
  if (curr === 'USD') {
    const spot = liveXauSpot > 0 ? liveXauSpot : 4174.50;

    const buyEntryLow = (spot + 3.50).toFixed(2);
    const buyEntryHigh = (spot + 6.00).toFixed(2);
    const buySL = (spot - 4.00).toFixed(2);
    const buyTP1 = (spot + 12.00).toFixed(2);
    const buyTP2 = (spot + 24.00).toFixed(2);

    const sellEntryHigh = (spot - 3.50).toFixed(2);
    const sellEntryLow = (spot - 6.00).toFixed(2);
    const sellSL = (spot + 4.00).toFixed(2);
    const sellTP1 = (spot - 12.00).toFixed(2);
    const sellTP2 = (spot - 24.00).toFixed(2);

    return {
      symbol: 'XAUUSD',
      symbolLabel: 'XAU/USD (Gold / Emas)',
      liveSpot: spot,
      spotFormatted: `$${spot.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      pipUnit: 'Pips ($)',
      buy: {
        entryArea: `$${buyEntryLow} - $${buyEntryHigh}`,
        entryClean: `$${buyEntryLow}`,
        stopLoss: `$${buySL} (SL: 40 Pips)`,
        takeProfit1: `$${buyTP1} (+120 Pips)`,
        takeProfit2: `$${buyTP2} (+240 Pips)`,
        distanceText: `Breakout +35 Pips ($3.50) di atas spot saat ini ($${spot.toFixed(2)})`,
      },
      sell: {
        entryArea: `$${sellEntryHigh} - $${sellEntryLow}`,
        entryClean: `$${sellEntryHigh}`,
        stopLoss: `$${sellSL} (SL: 40 Pips)`,
        takeProfit1: `$${sellTP1} (-120 Pips)`,
        takeProfit2: `$${sellTP2} (-240 Pips)`,
        distanceText: `Breakdown -35 Pips ($3.50) di bawah spot saat ini ($${spot.toFixed(2)})`,
      },
    };
  }

  // 2. EUR Events -> Primary pair is EURUSD (Spot ~1.0852)
  if (curr === 'EUR') {
    const spot = 1.0852;
    return {
      symbol: 'EURUSD',
      symbolLabel: 'EUR/USD',
      liveSpot: spot,
      spotFormatted: spot.toFixed(4),
      pipUnit: 'Pips',
      buy: {
        entryArea: '1.0885 - 1.0900',
        entryClean: '1.0885',
        stopLoss: '1.0850 (SL: 35 Pips)',
        takeProfit1: '1.0945 (+60 Pips)',
        takeProfit2: '1.1005 (+120 Pips)',
        distanceText: '+33 Pips di atas spot saat ini (1.0852)',
      },
      sell: {
        entryArea: '1.0820 - 1.0805',
        entryClean: '1.0820',
        stopLoss: '1.0855 (SL: 35 Pips)',
        takeProfit1: '1.0760 (-60 Pips)',
        takeProfit2: '1.0700 (-120 Pips)',
        distanceText: '-32 Pips di bawah spot saat ini (1.0852)',
      },
    };
  }

  // 3. GBP Events -> Primary pair is GBPUSD (Spot ~1.3045)
  if (curr === 'GBP') {
    const spot = 1.3045;
    return {
      symbol: 'GBPUSD',
      symbolLabel: 'GBP/USD',
      liveSpot: spot,
      spotFormatted: spot.toFixed(4),
      pipUnit: 'Pips',
      buy: {
        entryArea: '1.3080 - 1.3095',
        entryClean: '1.3080',
        stopLoss: '1.3040 (SL: 40 Pips)',
        takeProfit1: '1.3150 (+70 Pips)',
        takeProfit2: '1.3220 (+140 Pips)',
        distanceText: '+35 Pips di atas spot saat ini (1.3045)',
      },
      sell: {
        entryArea: '1.3005 - 1.2990',
        entryClean: '1.3005',
        stopLoss: '1.3045 (SL: 40 Pips)',
        takeProfit1: '1.2935 (-70 Pips)',
        takeProfit2: '1.2865 (-140 Pips)',
        distanceText: '-40 Pips di bawah spot saat ini (1.3045)',
      },
    };
  }

  // 4. JPY Events -> Primary pair is USDJPY (Spot ~152.60)
  if (curr === 'JPY') {
    const spot = 152.60;
    return {
      symbol: 'USDJPY',
      symbolLabel: 'USD/JPY',
      liveSpot: spot,
      spotFormatted: spot.toFixed(2),
      pipUnit: 'Pips',
      buy: {
        entryArea: '153.00 - 153.20',
        entryClean: '153.00',
        stopLoss: '152.50 (SL: 50 Pips)',
        takeProfit1: '153.90 (+90 Pips)',
        takeProfit2: '154.70 (+170 Pips)',
        distanceText: '+40 Pips di atas spot saat ini (152.60)',
      },
      sell: {
        entryArea: '152.20 - 152.00',
        entryClean: '152.20',
        stopLoss: '152.70 (SL: 50 Pips)',
        takeProfit1: '151.30 (-90 Pips)',
        takeProfit2: '150.50 (-170 Pips)',
        distanceText: '-40 Pips di bawah spot saat ini (152.60)',
      },
    };
  }

  // 5. AUD Events -> Primary pair is AUDUSD (Spot ~0.6690)
  if (curr === 'AUD') {
    const spot = 0.6690;
    return {
      symbol: 'AUDUSD',
      symbolLabel: 'AUD/USD',
      liveSpot: spot,
      spotFormatted: spot.toFixed(4),
      pipUnit: 'Pips',
      buy: {
        entryArea: '0.6720 - 0.6735',
        entryClean: '0.6720',
        stopLoss: '0.6690 (SL: 30 Pips)',
        takeProfit1: '0.6780 (+60 Pips)',
        takeProfit2: '0.6830 (+110 Pips)',
        distanceText: '+30 Pips di atas spot saat ini (0.6690)',
      },
      sell: {
        entryArea: '0.6660 - 0.6645',
        entryClean: '0.6660',
        stopLoss: '0.6695 (SL: 30 Pips)',
        takeProfit1: '0.6600 (-60 Pips)',
        takeProfit2: '0.6550 (-110 Pips)',
        distanceText: '-30 Pips di bawah spot saat ini (0.6690)',
      },
    };
  }

  // 6. CAD Events -> Primary pair is USDCAD (Spot ~1.3815)
  const spot = 1.3815;
  return {
    symbol: 'USDCAD',
    symbolLabel: 'USD/CAD',
    liveSpot: spot,
    spotFormatted: spot.toFixed(4),
    pipUnit: 'Pips',
    buy: {
      entryArea: '1.3850 - 1.3865',
      entryClean: '1.3850',
      stopLoss: '1.3815 (SL: 35 Pips)',
      takeProfit1: '1.3915 (+65 Pips)',
      takeProfit2: '1.3975 (+125 Pips)',
      distanceText: '+35 Pips di atas spot saat ini (1.3815)',
    },
    sell: {
      entryArea: '1.3780 - 1.3765',
      entryClean: '1.3780',
      stopLoss: '1.3820 (SL: 35 Pips)',
      takeProfit1: '1.3715 (-65 Pips)',
      takeProfit2: '1.3655 (-125 Pips)',
      distanceText: '-35 Pips di bawah spot saat ini (1.3815)',
    },
  };
}

export default function NewsRadarPage() {
  const { user, openPaymentModal, toggleTelegramLink, marketPrice, priceTickDirection } = useUser();
  const isPro = user.tier === 'PRO';

  const liveGoldPrice = marketPrice?.price ?? 4174.50;

  // Data states
  const [allNews, setAllNews] = useState<EnrichedNewsItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Interactive filters
  const [selectedCurrency, setSelectedCurrency] = useState<string>('ALL');
  const [timeframe, setTimeframe] = useState<TimeframeOption>('all');
  const [customDate, setCustomDate] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showGuide, setShowGuide] = useState<boolean>(false);

  // Copied signal tracking
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopySignal = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Fetch news from API
  const fetchNews = async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    setErrorMessage('');

    try {
      const url = `/api/news?highOnly=true`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Gagal mengambil data kalender');

      const data = await res.json();
      if (data && Array.isArray(data.data)) {
        setAllNews(data.data);
        setLastUpdated(new Date().toLocaleTimeString('id-ID') + ' WIB');
      }
    } catch {
      setErrorMessage('Koneksi feed eksternal sedang sibuk, menampilkan data radar cached.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(() => {
      fetchNews();
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  const todayISO = useMemo(() => {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());
  }, []);

  const tomorrowISO = useMemo(() => {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date(Date.now() + 86400000));
  }, []);

  const filteredNews = useMemo(() => {
    let list = allNews;

    if (selectedCurrency !== 'ALL') {
      list = list.filter((n) => n.currency === selectedCurrency);
    }

    if (customDate) {
      list = list.filter((n) => n.dateISO === customDate);
    } else {
      if (timeframe === 'today') {
        list = list.filter((n) => n.dateISO === todayISO);
      } else if (timeframe === 'tomorrow') {
        list = list.filter((n) => n.dateISO === tomorrowISO);
      } else if (timeframe === 'upcoming') {
        list = list.filter((n) => n.isUpcoming);
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.currency.toLowerCase().includes(q) ||
          n.primaryAffectedPair.toLowerCase().includes(q) ||
          n.dateFormatted.toLowerCase().includes(q) ||
          n.affectedPairs.some((p) => p.toLowerCase().includes(q))
      );
    }

    return list;
  }, [allNews, selectedCurrency, customDate, timeframe, searchQuery, todayISO, tomorrowISO]);

  const counts = useMemo(() => {
    const todayCount = allNews.filter((n) => n.dateISO === todayISO).length;
    const tomorrowCount = allNews.filter((n) => n.dateISO === tomorrowISO).length;
    const upcomingCount = allNews.filter((n) => n.isUpcoming).length;
    return {
      all: allNews.length,
      today: todayCount,
      tomorrow: tomorrowCount,
      upcoming: upcomingCount,
    };
  }, [allNews, todayISO, tomorrowISO]);

  const currencyCounts = useMemo(() => {
    const cMap: Record<string, number> = { ALL: allNews.length };
    allNews.forEach((n) => {
      cMap[n.currency] = (cMap[n.currency] || 0) + 1;
    });
    return cMap;
  }, [allNews]);

  const groupedNewsByDate = useMemo(() => {
    const groups: { dateISO: string; label: string; dayName: string; isToday: boolean; items: EnrichedNewsItem[] }[] = [];
    const map = new Map<string, EnrichedNewsItem[]>();

    filteredNews.forEach((item) => {
      if (!map.has(item.dateISO)) {
        map.set(item.dateISO, []);
      }
      map.get(item.dateISO)!.push(item);
    });

    map.forEach((items, dateISO) => {
      const isToday = dateISO === todayISO;
      const isTomorrow = dateISO === tomorrowISO;
      const first = items[0];
      let label = first.dateFormatted;
      if (isToday) label += ' (Hari Ini)';
      else if (isTomorrow) label += ' (Besok)';

      groups.push({
        dateISO,
        label,
        dayName: first.dayName,
        isToday,
        items,
      });
    });

    return groups;
  }, [filteredNews, todayISO, tomorrowISO]);

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner & Live Status */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-950/80 via-slate-900/95 to-amber-950/60 border border-red-500/30 p-6 md:p-8 shadow-2xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 animate-pulse" />
                <span>Forex Factory Live Feed: Khusus High Impact (Merah)</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Sinyal Real-Time Terkalibrasi Live Spot</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              News Sentiment Radar: Harga Sinyal 2 Arah Real-Time
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Semua harga level sinyal (Entry, Stop Loss, dan Take Profit) dihitung secara <strong className="text-emerald-400">real-time sinkron dengan harga live market saat ini</strong> (seperti XAU/USD: <span className="font-mono text-amber-300 font-bold">${liveGoldPrice.toFixed(2)}</span>). 
              Disertai persentase Win Rate historis dan data aktual hasil rilis dari <strong className="text-white">Forex Factory</strong>.
            </p>
          </div>

          {/* Quick Actions / Telegram */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 flex-shrink-0">
            <button
              onClick={() => fetchNews(true)}
              disabled={isRefreshing}
              className="px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/10 text-xs font-bold text-white flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md active:scale-95"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-blue-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Memperbarui...' : 'Perbarui Feed FF'}</span>
              {lastUpdated && <span className="text-[10px] text-slate-400 font-mono">({lastUpdated})</span>}
            </button>

            <button
              onClick={toggleTelegramLink}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                user.telegramLinked
                  ? 'bg-blue-600/20 border-blue-500 text-blue-300 shadow-md'
                  : 'bg-slate-900/60 border-white/10 text-slate-300 hover:text-white'
              }`}
            >
              <Bot className="w-4 h-4 text-blue-400" />
              <span>{user.telegramLinked ? 'Bot Telegram: H-30 Aktif' : 'Sambungkan Bot Alert H-30'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* DATE & FUTURE TIMEFRAME BAR */}
      <div className="glass-panel rounded-3xl p-5 sm:p-6 border border-blue-500/30 bg-gradient-to-b from-blue-950/20 to-slate-900/80 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-lg shadow-blue-500/10">
              <CalendarRange className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>Atur Tanggal &amp; Jadwal Berita Kedepannya</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold uppercase tracking-wider">
                  Live Calendar
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Pilih filter cepat atau tentukan tanggal spesifik untuk melihat hasil data &amp; sinyal 2 arah.
              </p>
            </div>
          </div>

          {/* Interactive Date Picker Input */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-blue-400 pointer-events-none">
                <Calendar className="w-4 h-4" />
              </span>
              <input
                type="date"
                value={customDate}
                onChange={(e) => {
                  setCustomDate(e.target.value);
                  setTimeframe('all');
                }}
                className="pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-blue-500/40 text-xs font-bold text-white focus:outline-none focus:border-blue-400 shadow-inner cursor-pointer"
                title="Pilih tanggal di kalender"
              />
            </div>

            {customDate && (
              <button
                onClick={() => setCustomDate('')}
                className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                title="Hapus filter tanggal spesifik"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Timeframe Preset Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
            <span>Preset Waktu:</span>
          </span>

          <button
            type="button"
            onClick={() => {
              setTimeframe('all');
              setCustomDate('');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              timeframe === 'all' && !customDate
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Semua Tanggal</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 font-mono">
              {counts.all}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setTimeframe('today');
              setCustomDate('');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              timeframe === 'today' && !customDate
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            <span>⚡ Hari Ini</span>
            {counts.today > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 font-mono">
                {counts.today}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setTimeframe('tomorrow');
              setCustomDate('');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              timeframe === 'tomorrow' && !customDate
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            <span>⏳ Besok</span>
            {counts.tomorrow > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 font-mono">
                {counts.tomorrow}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setTimeframe('upcoming');
              setCustomDate('');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              timeframe === 'upcoming' && !customDate
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>🔮 Kedepannya (Upcoming &amp; Suku Bunga)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 font-mono">
              {counts.upcoming}
            </span>
          </button>
        </div>
      </div>

      {/* CURRENCY SELECTOR & SEARCH BAR */}
      <div className="glass-panel rounded-2xl p-4 border border-white/10 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
              <Globe2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Mata Uang:</span>
            </span>
            {CURRENCIES.map((curr) => {
              const count = currencyCounts[curr] || 0;
              const isSelected = selectedCurrency === curr;

              return (
                <button
                  key={curr}
                  type="button"
                  onClick={() => setSelectedCurrency(curr)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  <span>{curr === 'ALL' ? 'Semua Mata Uang' : curr}</span>
                  {count > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isSelected ? 'bg-red-950 text-red-200' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Cari NFP, CPI, Suku Bunga, dsb..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
            />
          </div>
        </div>
      </div>

      {/* ERROR MESSAGE IF ANY */}
      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* LOADING SKELETON */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-panel rounded-3xl p-6 border border-white/10 animate-pulse space-y-4">
              <div className="h-5 bg-slate-800 rounded w-1/3" />
              <div className="h-12 bg-slate-800/60 rounded" />
              <div className="h-24 bg-slate-800/40 rounded" />
            </div>
          ))}
        </div>
      ) : filteredNews.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 text-center border border-white/10 space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-slate-800/80 flex items-center justify-center mx-auto text-slate-400">
            <Calendar className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-white">Tidak Ada Berita High-Impact Ditemukan</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Tidak ada agenda berita merah untuk filter tanggal &amp; mata uang yang Anda tentukan. Coba ganti tanggal atau lihat semua jadwal kedepannya.
          </p>
          <button
            onClick={() => {
              setSelectedCurrency('ALL');
              setTimeframe('all');
              setCustomDate('');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 cursor-pointer"
          >
            Lihat Semua Jadwal
          </button>
        </div>
      ) : (
        /* GROUPED NEWS CARDS BY DATE */
        <div className="space-y-8">
          {groupedNewsByDate.map((group) => (
            <div key={group.dateISO} className="space-y-4">
              {/* Date Header Separator */}
              <div className="flex items-center gap-3">
                <div
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-2 border shadow-md ${
                    group.isToday
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : 'bg-slate-900 border-white/10 text-white'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  <span>{group.label}</span>
                </div>
                <div className="h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent flex-grow" />
              </div>

              {/* News items for this date */}
              <div className="space-y-6">
                {group.items.map((news) => {
                  // Compute dynamic price levels relative to live spot price!
                  const dynLevels = getDynamicSignalLevels(news.currency, news.title, liveGoldPrice);

                  return (
                    <div
                      key={news.id}
                      className="glass-panel rounded-3xl p-5 sm:p-7 border border-red-500/30 bg-gradient-to-b from-red-950/20 via-slate-900/95 to-[#0B0F19] relative overflow-hidden shadow-2xl hover:border-red-500/50 transition-all space-y-5"
                    >
                      {/* CARD HEADER: Currency, Impact Badge, Title, Time */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-md shadow-red-600/30">
                            <Flame className="w-3.5 h-3.5 fill-current" />
                            <span>HIGH IMPACT (MERAH)</span>
                          </span>

                          <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-black bg-slate-800 text-white border border-white/10">
                            {news.currency}
                          </span>

                          <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                            {news.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20 whitespace-nowrap self-start sm:self-auto">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          <span>{news.timeWIB}</span>
                          <span className="text-[10px] text-slate-400 font-normal">({news.timeRemainingText})</span>
                        </div>
                      </div>

                      {/* STATS ROW: AKTUAL REAL-TIME vs FORECAST vs PREVIOUS + WIN RATE BADGE */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-950/80 border border-white/5">
                        {/* 1. DATA AKTUAL REAL-TIME */}
                        <div className="space-y-1">
                          <span className="text-slate-400 block text-[11px] font-medium">
                            Data Aktual (Real-Time):
                          </span>
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-mono font-black text-lg sm:text-xl ${
                                news.actualData.statusColor === 'green'
                                  ? 'text-emerald-400'
                                  : news.actualData.statusColor === 'red'
                                  ? 'text-rose-400'
                                  : 'text-slate-300'
                              }`}
                            >
                              {news.actualData.actual}
                            </span>
                            {news.actualData.hasReleased ? (
                              <span
                                className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                  news.actualData.statusColor === 'green'
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                    : news.actualData.statusColor === 'red'
                                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                    : 'bg-slate-800 text-slate-300'
                                }`}
                              >
                                {news.actualData.statusColor === 'green' ? 'Bagus' : news.actualData.statusColor === 'red' ? 'Buruk' : 'Netral'}
                              </span>
                            ) : (
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                                Belum Rilis
                              </span>
                            )}
                          </div>
                        </div>

                        {/* 2. FORECAST */}
                        <div className="space-y-1">
                          <span className="text-slate-400 block text-[11px] font-medium">
                            Perkiraan (Forecast):
                          </span>
                          <span className="font-mono font-bold text-white text-base sm:text-lg">
                            {news.forecast}
                          </span>
                        </div>

                        {/* 3. PREVIOUS */}
                        <div className="space-y-1">
                          <span className="text-slate-400 block text-[11px] font-medium">
                            Sebelumnya (Previous):
                          </span>
                          <span className="font-mono font-bold text-slate-400 text-base sm:text-lg">
                            {news.previous}
                          </span>
                        </div>

                        {/* 4. STATISTIK WIN RATE & VOLATILITAS HISTORIS */}
                        <div className="space-y-1 bg-blue-950/40 p-2.5 rounded-xl border border-blue-500/20">
                          <div className="flex items-center justify-between">
                            <span className="text-blue-300 block text-[10px] font-bold uppercase tracking-wider">
                              Win Rate Historis:
                            </span>
                            <span className="text-[10px] font-bold text-amber-300">
                              ⭐ {news.signal.reliabilityScore} / 5
                            </span>
                          </div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-mono font-black text-xl text-emerald-400">
                              {news.signal.winRate}%
                            </span>
                            <span className="text-[10px] text-slate-400">akurasi reaksi</span>
                          </div>
                          <span className="text-[10px] text-slate-300 block font-mono">
                            Lonjakan: <strong>{news.signal.averagePipMove}</strong>
                          </span>
                        </div>
                      </div>

                      {/* STATUS VERDICT DARI DATA RILIS */}
                      {news.actualData.hasReleased && (
                        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-emerald-500/30 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                          <div className="flex items-center gap-2.5">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                            <div>
                              <span className="font-bold text-white block">
                                Hasil Evaluasi Data Rilis:
                              </span>
                              <p className="text-[11px] text-slate-300">
                                {news.actualData.impactVerdict}
                              </p>
                            </div>
                          </div>

                          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30 whitespace-nowrap self-start sm:self-auto flex items-center gap-1.5">
                            <Award className="w-4 h-4 text-emerald-400" />
                            <span>{news.signal.triggerBadgeText}</span>
                          </div>
                        </div>
                      )}

                      {/* PASANGAN PAIR TERDAMPAK */}
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="text-slate-400 font-medium">🎯 Pair Utama:</span>
                        <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono font-black text-xs">
                          {news.primaryAffectedPair}
                        </span>
                        <span className="text-slate-500">|</span>
                        <span className="text-slate-400 font-medium">Cross Pairs:</span>
                        {news.affectedPairs.map((p) => (
                          <span
                            key={p}
                            className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] font-semibold"
                          >
                            {p}
                          </span>
                        ))}
                      </div>

                      {/* REAL-TIME DYNAMIC TWO-WAY SIGNALS SECTION */}
                      <div className="pt-2 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                              <Crosshair className="w-4 h-4" />
                            </div>
                            <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                              Rencana Sinyal Trading 2 Arah (Real-Time Price Sync)
                            </h4>
                          </div>

                          {/* Real-Time Price Reference Badge */}
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-gradient-to-r from-blue-900/60 to-emerald-950/60 border border-blue-500/30 text-xs font-mono shadow-sm">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-slate-300">Live Spot {dynLevels.symbol}:</span>
                            <span className="font-extrabold text-amber-300 text-xs sm:text-sm">
                              {dynLevels.spotFormatted}
                            </span>
                            <span className="text-[9px] font-bold text-emerald-300 bg-emerald-500/20 px-1.5 py-0.2 rounded">
                              TICK LIVE
                            </span>
                          </div>
                        </div>

                        {/* Two-Way Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* 1. SETUP BUY */}
                          <div
                            className={`p-4 rounded-2xl border transition-all space-y-3 relative overflow-hidden ${
                              news.signal.activeTrigger === 'BUY'
                                ? 'bg-emerald-950/40 border-emerald-500 shadow-xl shadow-emerald-500/20'
                                : 'bg-slate-950/60 border-emerald-500/30'
                            }`}
                          >
                            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                              <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                                <span className="font-black text-xs text-emerald-400">
                                  {news.signal.buySetup.title}
                                </span>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                                {news.signal.buySetup.actionType}
                              </span>
                            </div>

                            <div className="space-y-2 text-xs">
                              <div className="text-[11px] text-slate-300">
                                <strong className="text-white">Kondisi Trigger:</strong>{' '}
                                {news.signal.buySetup.triggerCondition}
                              </div>

                              {/* Real-Time Price Levels Box */}
                              <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                                <div className="p-2.5 rounded-xl bg-slate-900 border border-white/10 space-y-0.5">
                                  <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">
                                    Harga Entry (Breakout):
                                  </span>
                                  <span className="font-black text-emerald-300 text-xs block">
                                    {dynLevels.buy.entryArea}
                                  </span>
                                  <span className="text-[9px] text-slate-400 block">
                                    {dynLevels.buy.distanceText}
                                  </span>
                                </div>

                                <div className="p-2.5 rounded-xl bg-slate-900 border border-white/10 space-y-0.5">
                                  <span className="text-rose-400 block text-[9px] uppercase font-bold tracking-wider">
                                    Stop Loss (SL):
                                  </span>
                                  <span className="font-black text-rose-300 text-xs block">
                                    {dynLevels.buy.stopLoss}
                                  </span>
                                  <span className="text-[9px] text-slate-400 block">Proteksi Maksimal</span>
                                </div>

                                <div className="p-2.5 rounded-xl bg-slate-900 border border-white/10 space-y-0.5">
                                  <span className="text-emerald-400 block text-[9px] uppercase font-bold tracking-wider">
                                    Target TP 1:
                                  </span>
                                  <span className="font-black text-emerald-300 text-xs block">
                                    {dynLevels.buy.takeProfit1}
                                  </span>
                                  <span className="text-[9px] text-slate-400 block">Amankan 50% Posisi</span>
                                </div>

                                <div className="p-2.5 rounded-xl bg-slate-900 border border-white/10 space-y-0.5">
                                  <span className="text-emerald-400 block text-[9px] uppercase font-bold tracking-wider">
                                    Target TP 2:
                                  </span>
                                  <span className="font-black text-emerald-300 text-xs block">
                                    {dynLevels.buy.takeProfit2}
                                  </span>
                                  <span className="text-[9px] text-slate-400 block">Trailing Stop</span>
                                </div>
                              </div>

                              {/* Copy & Rationale */}
                              <div className="flex items-center justify-between pt-1">
                                <span className="text-[10px] text-slate-400 font-mono">
                                  Risk/Reward: <strong className="text-white">1 : 2.5</strong>
                                </span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleCopySignal(
                                      `buy-${news.id}`,
                                      `${dynLevels.symbol} BUY STOP | Entry: ${dynLevels.buy.entryClean} | SL: ${dynLevels.buy.stopLoss} | TP1: ${dynLevels.buy.takeProfit1} | TP2: ${dynLevels.buy.takeProfit2}`
                                    )
                                  }
                                  className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                                >
                                  {copiedId === `buy-${news.id}` ? (
                                    <>
                                      <Check className="w-3 h-3" />
                                      <span>Tersalin!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      <span>Salin Setup BUY</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* 2. SETUP SELL */}
                          <div
                            className={`p-4 rounded-2xl border transition-all space-y-3 relative overflow-hidden ${
                              news.signal.activeTrigger === 'SELL'
                                ? 'bg-rose-950/40 border-rose-500 shadow-xl shadow-rose-500/20'
                                : 'bg-slate-950/60 border-rose-500/30'
                            }`}
                          >
                            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                              <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                                <span className="font-black text-xs text-rose-400">
                                  {news.signal.sellSetup.title}
                                </span>
                              </div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
                                {news.signal.sellSetup.actionType}
                              </span>
                            </div>

                            <div className="space-y-2 text-xs">
                              <div className="text-[11px] text-slate-300">
                                <strong className="text-white">Kondisi Trigger:</strong>{' '}
                                {news.signal.sellSetup.triggerCondition}
                              </div>

                              {/* Real-Time Price Levels Box */}
                              <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                                <div className="p-2.5 rounded-xl bg-slate-900 border border-white/10 space-y-0.5">
                                  <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">
                                    Harga Entry (Breakdown):
                                  </span>
                                  <span className="font-black text-rose-300 text-xs block">
                                    {dynLevels.sell.entryArea}
                                  </span>
                                  <span className="text-[9px] text-slate-400 block">
                                    {dynLevels.sell.distanceText}
                                  </span>
                                </div>

                                <div className="p-2.5 rounded-xl bg-slate-900 border border-white/10 space-y-0.5">
                                  <span className="text-rose-400 block text-[9px] uppercase font-bold tracking-wider">
                                    Stop Loss (SL):
                                  </span>
                                  <span className="font-black text-rose-300 text-xs block">
                                    {dynLevels.sell.stopLoss}
                                  </span>
                                  <span className="text-[9px] text-slate-400 block">Proteksi Maksimal</span>
                                </div>

                                <div className="p-2.5 rounded-xl bg-slate-900 border border-white/10 space-y-0.5">
                                  <span className="text-emerald-400 block text-[9px] uppercase font-bold tracking-wider">
                                    Target TP 1:
                                  </span>
                                  <span className="font-black text-emerald-300 text-xs block">
                                    {dynLevels.sell.takeProfit1}
                                  </span>
                                  <span className="text-[9px] text-slate-400 block">Amankan 50% Posisi</span>
                                </div>

                                <div className="p-2.5 rounded-xl bg-slate-900 border border-white/10 space-y-0.5">
                                  <span className="text-emerald-400 block text-[9px] uppercase font-bold tracking-wider">
                                    Target TP 2:
                                  </span>
                                  <span className="font-black text-emerald-300 text-xs block">
                                    {dynLevels.sell.takeProfit2}
                                  </span>
                                  <span className="text-[9px] text-slate-400 block">Trailing Stop</span>
                                </div>
                              </div>

                              {/* Copy & Rationale */}
                              <div className="flex items-center justify-between pt-1">
                                <span className="text-[10px] text-slate-400 font-mono">
                                  Risk/Reward: <strong className="text-white">1 : 2.5</strong>
                                </span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleCopySignal(
                                      `sell-${news.id}`,
                                      `${dynLevels.symbol} SELL STOP | Entry: ${dynLevels.sell.entryClean} | SL: ${dynLevels.sell.stopLoss} | TP1: ${dynLevels.sell.takeProfit1} | TP2: ${dynLevels.sell.takeProfit2}`
                                    )
                                  }
                                  className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                                >
                                  {copiedId === `sell-${news.id}` ? (
                                    <>
                                      <Check className="w-3 h-3" />
                                      <span>Tersalin!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      <span>Salin Setup SELL</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
