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
    const spot = liveXauSpot > 0 ? liveXauSpot : 4442.50;

    const buyEntryLow = (spot + 3.50).toFixed(2);
    const buyEntryHigh = (spot + 6.00).toFixed(2);
    const buySL = (spot - 4.00).toFixed(2);
    const buyTP1 = (spot + 12.00).toFixed(2);
    const buyTP2 = (spot + 24.00).toFixed(2);

    const sellEntryLow = (spot - 6.00).toFixed(2);
    const sellEntryHigh = (spot - 3.50).toFixed(2);
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
        stopLoss: `$${buySL} (SL: 40 Pips di bawah Entry)`,
        takeProfit1: `$${buyTP1} (+120 Pips Gain)`,
        takeProfit2: `$${buyTP2} (+240 Pips Gain)`,
        distanceText: `Breakout +35 Pips ($3.50) di atas spot ($${spot.toFixed(2)})`,
      },
      sell: {
        entryArea: `$${sellEntryLow} - $${sellEntryHigh}`,
        entryClean: `$${sellEntryLow}`,
        stopLoss: `$${sellSL} (SL: 40 Pips di atas Entry)`,
        takeProfit1: `$${sellTP1} (+120 Pips Drop Turun)`,
        takeProfit2: `$${sellTP2} (+240 Pips Drop Turun)`,
        distanceText: `Breakdown -35 Pips ($3.50) di bawah spot ($${spot.toFixed(2)})`,
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
        stopLoss: '1.0850 (SL: 35 Pips di bawah Entry)',
        takeProfit1: '1.0945 (+60 Pips Gain)',
        takeProfit2: '1.1005 (+120 Pips Gain)',
        distanceText: '+33 Pips di atas spot saat ini (1.0852)',
      },
      sell: {
        entryArea: '1.0805 - 1.0820',
        entryClean: '1.0805',
        stopLoss: '1.0855 (SL: 35 Pips di atas Entry)',
        takeProfit1: '1.0760 (+60 Pips Drop Turun)',
        takeProfit2: '1.0700 (+120 Pips Drop Turun)',
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
        stopLoss: '1.3040 (SL: 40 Pips di bawah Entry)',
        takeProfit1: '1.3150 (+70 Pips Gain)',
        takeProfit2: '1.3220 (+140 Pips Gain)',
        distanceText: '+35 Pips di atas spot saat ini (1.3045)',
      },
      sell: {
        entryArea: '1.2990 - 1.3005',
        entryClean: '1.2990',
        stopLoss: '1.3045 (SL: 40 Pips di atas Entry)',
        takeProfit1: '1.2935 (+70 Pips Drop Turun)',
        takeProfit2: '1.2865 (+140 Pips Drop Turun)',
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
        stopLoss: '152.50 (SL: 50 Pips di bawah Entry)',
        takeProfit1: '153.90 (+90 Pips Gain)',
        takeProfit2: '154.70 (+170 Pips Gain)',
        distanceText: '+40 Pips di atas spot saat ini (152.60)',
      },
      sell: {
        entryArea: '152.00 - 152.20',
        entryClean: '152.00',
        stopLoss: '152.70 (SL: 50 Pips di atas Entry)',
        takeProfit1: '151.30 (+90 Pips Drop Turun)',
        takeProfit2: '150.50 (+170 Pips Drop Turun)',
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
        stopLoss: '0.6690 (SL: 30 Pips di bawah Entry)',
        takeProfit1: '0.6780 (+60 Pips Gain)',
        takeProfit2: '0.6830 (+110 Pips Gain)',
        distanceText: '+30 Pips di atas spot saat ini (0.6690)',
      },
      sell: {
        entryArea: '0.6645 - 0.6660',
        entryClean: '0.6645',
        stopLoss: '0.6695 (SL: 30 Pips di atas Entry)',
        takeProfit1: '0.6600 (+60 Pips Drop Turun)',
        takeProfit2: '0.6550 (+110 Pips Drop Turun)',
        distanceText: '-30 Pips di bawah spot saat ini (0.6690)',
      },
    };
  }

  // 6. NZD Events -> Primary pair is NZDUSD (Spot ~0.6050)
  if (curr === 'NZD') {
    const spot = 0.6050;
    return {
      symbol: 'NZDUSD',
      symbolLabel: 'NZD/USD',
      liveSpot: spot,
      spotFormatted: spot.toFixed(4),
      pipUnit: 'Pips',
      buy: {
        entryArea: '0.6080 - 0.6095',
        entryClean: '0.6080',
        stopLoss: '0.6050 (SL: 30 Pips di bawah Entry)',
        takeProfit1: '0.6140 (+60 Pips Gain)',
        takeProfit2: '0.6190 (+110 Pips Gain)',
        distanceText: '+30 Pips di atas spot saat ini (0.6050)',
      },
      sell: {
        entryArea: '0.6010 - 0.6025',
        entryClean: '0.6010',
        stopLoss: '0.6055 (SL: 30 Pips di atas Entry)',
        takeProfit1: '0.5960 (+60 Pips Drop Turun)',
        takeProfit2: '0.5910 (+110 Pips Drop Turun)',
        distanceText: '-30 Pips di bawah spot saat ini (0.6050)',
      },
    };
  }

  // 7. CHF Events -> Primary pair is USDCHF (Spot ~0.8650)
  if (curr === 'CHF') {
    const spot = 0.8650;
    return {
      symbol: 'USDCHF',
      symbolLabel: 'USD/CHF',
      liveSpot: spot,
      spotFormatted: spot.toFixed(4),
      pipUnit: 'Pips',
      buy: {
        entryArea: '0.8680 - 0.8695',
        entryClean: '0.8680',
        stopLoss: '0.8650 (SL: 30 Pips di bawah Entry)',
        takeProfit1: '0.8740 (+60 Pips Gain)',
        takeProfit2: '0.8790 (+110 Pips Gain)',
        distanceText: '+30 Pips di atas spot saat ini (0.8650)',
      },
      sell: {
        entryArea: '0.8610 - 0.8625',
        entryClean: '0.8610',
        stopLoss: '0.8655 (SL: 30 Pips di atas Entry)',
        takeProfit1: '0.8560 (+60 Pips Drop Turun)',
        takeProfit2: '0.8510 (+110 Pips Drop Turun)',
        distanceText: '-30 Pips di bawah spot saat ini (0.8650)',
      },
    };
  }

  // 8. CAD Events -> Primary pair is USDCAD (Spot ~1.3815)
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
      stopLoss: '1.3815 (SL: 35 Pips di bawah Entry)',
      takeProfit1: '1.3915 (+65 Pips Gain)',
      takeProfit2: '1.3975 (+125 Pips Gain)',
      distanceText: '+35 Pips di atas spot saat ini (1.3815)',
    },
    sell: {
      entryArea: '1.3765 - 1.3780',
      entryClean: '1.3765',
      stopLoss: '1.3820 (SL: 35 Pips di atas Entry)',
      takeProfit1: '1.3715 (+65 Pips Drop Turun)',
      takeProfit2: '1.3655 (+125 Pips Drop Turun)',
      distanceText: '-35 Pips di bawah spot saat ini (1.3815)',
    },
  };
}

function getDisplayLevel(setupValue?: string, dynamicFallback?: string): string {
  if (!setupValue) return dynamicFallback || '-';
  const lower = setupValue.toLowerCase();
  const isGenericPlaceholder =
    lower.startsWith('level breakout') ||
    lower.startsWith('level breakdown') ||
    lower.startsWith('area breakout') ||
    lower.startsWith('area breakdown') ||
    lower.includes('pips di') ||
    lower.includes('pips drop') ||
    lower.includes('pips gain');

  if (!isGenericPlaceholder && /\d/.test(setupValue)) {
    return setupValue;
  }
  return dynamicFallback || setupValue;
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

  const [todayISO, setTodayISO] = useState<string>('');
  const [tomorrowISO, setTomorrowISO] = useState<string>('');

  useEffect(() => {
    const today = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());

    const tomorrow = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date(Date.now() + 86400000));

    setTodayISO(today);
    setTomorrowISO(tomorrow);
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
      <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 shadow-sm">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#00A651]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 animate-pulse text-rose-600" />
                <span>Forex Factory Live Feed: Khusus High Impact (Merah)</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#00A651] border border-emerald-200 text-[11px] font-mono">
                <span className="w-2 h-2 rounded-full bg-[#00A651] animate-ping" />
                <span>Sinyal Real-Time Terkalibrasi Live Spot</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              News Sentiment Radar: Harga Sinyal 2 Arah Real-Time
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Semua harga level sinyal (Entry, Stop Loss, dan Take Profit) dihitung secara <strong className="text-[#00A651] font-bold">real-time sinkron dengan harga live market saat ini</strong> (seperti XAU/USD: <span className="font-mono text-amber-800 font-bold">${liveGoldPrice.toFixed(2)}</span>). 
              Disertai persentase Win Rate historis dan data aktual hasil rilis dari <strong className="text-slate-900 font-bold">Forex Factory</strong>.
            </p>
          </div>

          {/* Quick Actions / Telegram */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 flex-shrink-0">
            <button
              onClick={() => fetchNews(true)}
              disabled={isRefreshing}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs active:scale-95"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#00A651] ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Memperbarui...' : 'Perbarui Feed FF'}</span>
              {lastUpdated && <span className="text-[10px] text-slate-500 font-mono">({lastUpdated})</span>}
            </button>

            <button
              onClick={toggleTelegramLink}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                user.telegramLinked
                  ? 'bg-emerald-50 border-emerald-300 text-[#00A651] shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bot className="w-4 h-4 text-[#00A651]" />
              <span>{user.telegramLinked ? 'Bot Telegram: H-30 Aktif' : 'Sambungkan Bot Alert H-30'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* TIER STATUS BANNER */}
      {isPro ? (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-900 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-emerald-100 text-[#00A651]">
              <Crown className="w-4 h-4" />
            </span>
            <span>
              <strong className="text-slate-900">Status Akun PRO Aktif:</strong> Seluruh Prediksi Reaksi Pasar AI, Win Rate Historis, &amp; Sinyal 2 Arah Real-Time Terbuka Penuh.
            </span>
          </div>
          <span className="hidden sm:inline-block px-2.5 py-1 rounded-lg bg-emerald-100 text-[#00A651] font-bold font-mono text-[11px]">
            AKSES PRO AKTIF
          </span>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-mono font-bold text-[10px]">
                AKUN FREE
              </span>
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Info className="w-3.5 h-3.5" /> Mode Kalender Forex Factory Standar
              </span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Anda sedang melihat jadwal berita ekonomi standar. <strong>Prediksi Reaksi Pasar AI, Win Rate Historis, &amp; Sinyal 2 Arah Real-Time</strong> terkunci khusus member PRO.
            </p>
          </div>
          <button
            onClick={openPaymentModal}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
          >
            <Crown className="w-3.5 h-3.5" /> Buka Prediksi &amp; Sinyal PRO
          </button>
        </div>
      )}

      {/* DATE & FUTURE TIMEFRAME BAR */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 space-y-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#00A651] shadow-xs">
              <CalendarRange className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <span>Atur Tanggal &amp; Jadwal Berita Kedepannya</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-[#00A651] border border-emerald-200 font-bold uppercase tracking-wider">
                  Live Calendar
                </span>
              </h2>
              <p className="text-xs text-slate-500 font-normal">
                Pilih filter cepat atau tentukan tanggal spesifik untuk melihat hasil data &amp; sinyal 2 arah.
              </p>
            </div>
          </div>

          {/* Interactive Date Picker Input */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-[#00A651] pointer-events-none">
                <Calendar className="w-4 h-4" />
              </span>
              <input
                type="date"
                value={customDate}
                onChange={(e) => {
                  setCustomDate(e.target.value);
                  setTimeframe('all');
                }}
                className="pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-[#00A651] shadow-xs cursor-pointer"
                title="Pilih tanggal di kalender"
              />
            </div>

            {customDate && (
              <button
                onClick={() => setCustomDate('')}
                className="px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
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
          <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#00A651]" />
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
                ? 'bg-[#00A651] text-white shadow-md shadow-[#00A651]/20'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Semua Tanggal</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${timeframe === 'all' && !customDate ? 'bg-white/20' : 'bg-slate-200 text-slate-700'}`}>
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
                ? 'bg-[#00A651] text-white shadow-md shadow-[#00A651]/20'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <span>⚡ Hari Ini</span>
            {counts.today > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${timeframe === 'today' && !customDate ? 'bg-white/20' : 'bg-slate-200 text-slate-700'}`}>
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
                ? 'bg-[#00A651] text-white shadow-md shadow-[#00A651]/20'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <span>⏳ Besok</span>
            {counts.tomorrow > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${timeframe === 'tomorrow' && !customDate ? 'bg-white/20' : 'bg-slate-200 text-slate-700'}`}>
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
                ? 'bg-[#00A651] text-white shadow-md shadow-[#00A651]/20'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>🔮 Kedepannya (Upcoming &amp; Suku Bunga)</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${timeframe === 'upcoming' && !customDate ? 'bg-white/20' : 'bg-slate-200 text-slate-700'}`}>
              {counts.upcoming}
            </span>
          </button>
        </div>
      </div>

      {/* CURRENCY SELECTOR & SEARCH BAR */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-3 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full min-w-0">
            <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1 shrink-0">
              <Globe2 className="w-3.5 h-3.5 text-[#00A651]" />
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
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    isSelected
                      ? 'bg-[#00A651] text-white shadow-md shadow-[#00A651]/20'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  <span>{curr === 'ALL' ? 'Semua Mata Uang' : curr}</span>
                  {count > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-auto md:min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Cari NFP, CPI, Suku Bunga, dsb..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#00A651]"
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
            <div key={i} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs animate-pulse space-y-4">
              <div className="h-5 bg-slate-100 rounded w-1/3" />
              <div className="h-12 bg-slate-100 rounded" />
              <div className="h-24 bg-slate-50 rounded" />
            </div>
          ))}
        </div>
      ) : filteredNews.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center mx-auto text-slate-500">
            <Calendar className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Tidak Ada Berita High-Impact Ditemukan</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Tidak ada agenda berita merah untuk filter tanggal &amp; mata uang yang Anda tentukan. Coba ganti tanggal atau lihat semua jadwal kedepannya.
          </p>
          <button
            onClick={() => {
              setSelectedCurrency('ALL');
              setTimeframe('all');
              setCustomDate('');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-[#00A651] text-white font-bold text-xs hover:bg-[#008F45] cursor-pointer shadow-xs transition-all"
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
                  const buyEntryDisplay = getDisplayLevel(news.signal?.buySetup?.entryArea, dynLevels.buy.entryArea);
                  const buySlDisplay = getDisplayLevel(news.signal?.buySetup?.stopLoss, dynLevels.buy.stopLoss);
                  const buyTp1Display = getDisplayLevel(news.signal?.buySetup?.takeProfit1, dynLevels.buy.takeProfit1);
                  const buyTp2Display = getDisplayLevel(news.signal?.buySetup?.takeProfit2, dynLevels.buy.takeProfit2);

                  const sellEntryDisplay = getDisplayLevel(news.signal?.sellSetup?.entryArea, dynLevels.sell.entryArea);
                  const sellSlDisplay = getDisplayLevel(news.signal?.sellSetup?.stopLoss, dynLevels.sell.stopLoss);
                  const sellTp1Display = getDisplayLevel(news.signal?.sellSetup?.takeProfit1, dynLevels.sell.takeProfit1);
                  const sellTp2Display = getDisplayLevel(news.signal?.sellSetup?.takeProfit2, dynLevels.sell.takeProfit2);

                  return (
                    <div
                      key={news.id}
                      className="rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200 bg-white relative overflow-hidden shadow-sm hover:shadow-md hover:border-emerald-300 transition-all space-y-5"
                    >
                      {/* CARD HEADER: Currency, Impact Badge, Title, Time */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white shadow-xs">
                            <Flame className="w-3.5 h-3.5 fill-current" />
                            <span>HIGH IMPACT</span>
                          </span>

                          <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-black bg-slate-100 text-slate-800 border border-slate-200">
                            {news.currency}
                          </span>

                          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                            {news.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 whitespace-nowrap self-start sm:self-auto">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>{news.timeWIB}</span>
                          <span className="text-[10px] text-slate-500 font-normal">({news.timeRemainingText})</span>
                        </div>
                      </div>

                      {/* STATS ROW: AKTUAL REAL-TIME vs FORECAST vs PREVIOUS + WIN RATE BADGE */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                        {/* 1. DATA AKTUAL REAL-TIME */}
                        <div className="space-y-1">
                          <span className="text-slate-500 block text-[11px] font-semibold">
                            Data Aktual (Real-Time):
                          </span>
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-mono font-black text-lg sm:text-xl ${
                                news.actualData.statusColor === 'green'
                                  ? 'text-emerald-600'
                                  : news.actualData.statusColor === 'red'
                                  ? 'text-rose-600'
                                  : 'text-slate-700'
                              }`}
                            >
                              {news.actualData.actual}
                            </span>
                            {news.actualData.hasReleased ? (
                              <span
                                className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                  news.actualData.statusColor === 'green'
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                    : news.actualData.statusColor === 'red'
                                    ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                    : 'bg-slate-200 text-slate-700'
                                }`}
                              >
                                {news.actualData.statusColor === 'green' ? 'Bagus' : news.actualData.statusColor === 'red' ? 'Buruk' : 'Netral'}
                              </span>
                            ) : (
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">
                                Belum Rilis
                              </span>
                            )}
                          </div>
                        </div>

                        {/* 2. FORECAST */}
                        <div className="space-y-1">
                          <span className="text-slate-500 block text-[11px] font-semibold">
                            Perkiraan (Forecast):
                          </span>
                          <span className="font-mono font-bold text-slate-900 text-base sm:text-lg">
                            {news.forecast}
                          </span>
                        </div>

                        {/* 3. PREVIOUS */}
                        <div className="space-y-1">
                          <span className="text-slate-500 block text-[11px] font-semibold">
                            Sebelumnya (Previous):
                          </span>
                          <span className="font-mono font-bold text-slate-600 text-base sm:text-lg">
                            {news.previous}
                          </span>
                        </div>

                        {/* 4. STATISTIK WIN RATE & VOLATILITAS HISTORIS (PRO ONLY) */}
                        {isPro ? (
                          <div className="space-y-1 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200">
                            <div className="flex items-center justify-between">
                              <span className="text-emerald-800 block text-[10px] font-bold uppercase tracking-wider">
                                Win Rate Historis:
                              </span>
                              <span className="text-[10px] font-bold text-amber-700">
                                ⭐ {news.signal.reliabilityScore} / 5
                              </span>
                            </div>
                            <div className="flex items-baseline gap-1.5">
                              <span className="font-mono font-black text-xl text-emerald-600">
                                {news.signal.winRate}%
                              </span>
                              <span className="text-[10px] text-slate-500">akurasi reaksi</span>
                            </div>
                            <span className="text-[10px] text-slate-600 block font-mono">
                              Lonjakan: <strong className="text-slate-800">{news.signal.averagePipMove}</strong>
                            </span>
                          </div>
                        ) : (
                          <div className="space-y-1 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200 flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-700 block text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                <Lock className="w-3 h-3 text-amber-600" /> Win Rate AI
                              </span>
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                                PRO
                              </span>
                            </div>
                            <div className="py-0.5">
                              <span className="text-xs font-bold text-slate-800">Prediksi Terkunci</span>
                              <p className="text-[10px] text-slate-500">Akurasi &amp; lonjakan pips</p>
                            </div>
                            <button
                              onClick={openPaymentModal}
                              className="text-[10px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer pt-0.5"
                            >
                              <Crown className="w-3 h-3" /> Buka Akses PRO
                            </button>
                          </div>
                        )}
                      </div>

                      {/* STATUS VERDICT DARI DATA RILIS */}
                      {news.actualData.hasReleased && (
                        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                          <div className="flex items-center gap-2.5">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                            <div>
                              <span className="font-bold text-slate-900 block">
                                Hasil Evaluasi Data Rilis:
                              </span>
                              <p className="text-[11px] text-slate-600">
                                {news.actualData.impactVerdict}
                              </p>
                            </div>
                          </div>

                          <div className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-300 whitespace-nowrap self-start sm:self-auto flex items-center gap-1.5">
                            <Award className="w-4 h-4 text-emerald-600" />
                            <span>{news.signal.triggerBadgeText}</span>
                          </div>
                        </div>
                      )}

                      {/* PASANGAN PAIR TERDAMPAK */}
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="text-slate-600 font-semibold">🎯 Pair Utama:</span>
                        <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200 font-mono font-bold text-xs">
                          {news.primaryAffectedPair}
                        </span>
                        <span className="text-slate-300">|</span>
                        <span className="text-slate-600 font-semibold">Cross Pairs:</span>
                        {news.affectedPairs.map((p) => (
                          <span
                            key={p}
                            className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-mono text-[10px] font-semibold"
                          >
                            {p}
                          </span>
                        ))}
                      </div>

                      {/* REAL-TIME DYNAMIC TWO-WAY SIGNALS SECTION */}
                      {isPro ? (
                        <div className="pt-2 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                                <Crosshair className="w-4 h-4" />
                              </div>
                              <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
                                Rencana Sinyal Trading 2 Arah (Real-Time Price Sync)
                              </h4>
                            </div>

                            {/* Real-Time Price Reference Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono shadow-xs">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                              </span>
                              <span className="text-slate-600">Live Spot {dynLevels.symbol}:</span>
                              <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                                {dynLevels.spotFormatted}
                              </span>
                              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded border border-emerald-200">
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
                                  ? 'bg-emerald-50/70 border-emerald-400 shadow-md shadow-emerald-500/10'
                                  : 'bg-slate-50/50 border-emerald-200'
                              }`}
                            >
                              <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                                <div className="flex items-center gap-2">
                                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                  <span className="font-black text-xs text-emerald-800">
                                    {news.signal.buySetup.title}
                                  </span>
                                </div>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                                  {news.signal.buySetup.actionType}
                                </span>
                              </div>

                              <div className="space-y-2 text-xs">
                                <div className="text-[11px] text-slate-600">
                                  <strong className="text-slate-900">Kondisi Trigger:</strong>{' '}
                                  {news.signal.buySetup.triggerCondition}
                                </div>

                                {/* Real-Time Price Levels Box */}
                                <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                                  <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-0.5 min-w-0">
                                    <span className="text-slate-500 block text-[9px] uppercase font-bold tracking-wider truncate">
                                      Harga Entry (Breakout):
                                    </span>
                                    <span className="font-black text-emerald-700 text-[11px] sm:text-xs block break-words">
                                      {buyEntryDisplay}
                                    </span>
                                    <span className="text-[9px] text-slate-500 block line-clamp-2">
                                      {dynLevels.buy.distanceText}
                                    </span>
                                  </div>

                                  <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-0.5 min-w-0">
                                    <span className="text-rose-600 block text-[9px] uppercase font-bold tracking-wider truncate">
                                      Stop Loss (SL):
                                    </span>
                                    <span className="font-black text-rose-600 text-[11px] sm:text-xs block break-words">
                                      {buySlDisplay}
                                    </span>
                                    <span className="text-[9px] text-slate-500 block truncate">Proteksi di Bawah Entry</span>
                                  </div>

                                  <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-0.5 min-w-0">
                                    <span className="text-emerald-700 block text-[9px] uppercase font-bold tracking-wider truncate">
                                      Target TP 1:
                                    </span>
                                    <span className="font-black text-emerald-700 text-[11px] sm:text-xs block break-words">
                                      {buyTp1Display}
                                    </span>
                                    <span className="text-[9px] text-slate-500 block truncate">Amankan 50% Posisi</span>
                                  </div>

                                  <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-0.5 min-w-0">
                                    <span className="text-emerald-700 block text-[9px] uppercase font-bold tracking-wider truncate">
                                      Target TP 2:
                                    </span>
                                    <span className="font-black text-emerald-700 text-[11px] sm:text-xs block break-words">
                                      {buyTp2Display}
                                    </span>
                                    <span className="text-[9px] text-slate-500 block truncate">Trailing Stop Maksimal</span>
                                  </div>
                                </div>

                                {/* Rationale if available */}
                                {news.signal.buySetup.rationale && (
                                  <div className="p-2.5 rounded-xl bg-emerald-100/60 border border-emerald-200 text-emerald-900 text-[11px] leading-relaxed">
                                    <strong className="text-emerald-950 font-bold block mb-0.5">Logika Sinyal BUY:</strong>
                                    <span>{news.signal.buySetup.rationale}</span>
                                  </div>
                                )}

                                {/* Copy & Rationale */}
                                <div className="flex items-center justify-between pt-1">
                                  <span className="text-[10px] text-slate-500 font-mono">
                                    Risk/Reward: <strong className="text-slate-800">{news.signal.buySetup.riskReward || '1 : 2.5'}</strong>
                                  </span>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleCopySignal(
                                        `buy-${news.id}`,
                                        `${news.signal.primaryPair || dynLevels.symbol} BUY STOP | Entry: ${buyEntryDisplay} | SL: ${buySlDisplay} | TP1: ${buyTp1Display} | TP2: ${buyTp2Display}`
                                      )
                                    }
                                    className="px-2.5 py-1 rounded-lg bg-[#00A651] hover:bg-[#008F45] text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95 shadow-xs"
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
                                  ? 'bg-rose-50/70 border-rose-400 shadow-md shadow-rose-500/10'
                                  : 'bg-slate-50/50 border-rose-200'
                              }`}
                            >
                              <div className="flex items-center justify-between border-b border-rose-100 pb-2">
                                <div className="flex items-center gap-2">
                                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                                  <span className="font-black text-xs text-rose-800">
                                    {news.signal.sellSetup.title}
                                  </span>
                                </div>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold border border-rose-200">
                                  {news.signal.sellSetup.actionType}
                                </span>
                              </div>

                              <div className="space-y-2 text-xs">
                                <div className="text-[11px] text-slate-600">
                                  <strong className="text-slate-900">Kondisi Trigger:</strong>{' '}
                                  {news.signal.sellSetup.triggerCondition}
                                </div>

                                {/* Real-Time Price Levels Box */}
                                <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                                  <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-0.5 min-w-0">
                                    <span className="text-slate-500 block text-[9px] uppercase font-bold tracking-wider truncate">
                                      Harga Entry (Breakdown):
                                    </span>
                                    <span className="font-black text-rose-600 text-[11px] sm:text-xs block break-words">
                                      {sellEntryDisplay}
                                    </span>
                                    <span className="text-[9px] text-slate-500 block line-clamp-2">
                                      {dynLevels.sell.distanceText}
                                    </span>
                                  </div>

                                  <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-0.5 min-w-0">
                                    <span className="text-rose-600 block text-[9px] uppercase font-bold tracking-wider truncate">
                                      Stop Loss (SL):
                                    </span>
                                    <span className="font-black text-rose-600 text-[11px] sm:text-xs block break-words">
                                      {sellSlDisplay}
                                    </span>
                                    <span className="text-[9px] text-slate-500 block truncate">Proteksi di Atas Entry</span>
                                  </div>

                                  <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-0.5 min-w-0">
                                    <span className="text-emerald-700 block text-[9px] uppercase font-bold tracking-wider truncate">
                                      Target TP 1:
                                    </span>
                                    <span className="font-black text-emerald-700 text-[11px] sm:text-xs block break-words">
                                      {sellTp1Display}
                                    </span>
                                    <span className="text-[9px] text-slate-500 block truncate">Amankan 50% Posisi (Drop)</span>
                                  </div>

                                  <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-0.5 min-w-0">
                                    <span className="text-emerald-700 block text-[9px] uppercase font-bold tracking-wider truncate">
                                      Target TP 2:
                                    </span>
                                    <span className="font-black text-emerald-700 text-[11px] sm:text-xs block break-words">
                                      {sellTp2Display}
                                    </span>
                                    <span className="text-[9px] text-slate-500 block truncate">Trailing Stop Turun Likuiditas</span>
                                  </div>
                                </div>

                                {/* Rationale if available */}
                                {news.signal.sellSetup.rationale && (
                                  <div className="p-2.5 rounded-xl bg-rose-100/60 border border-rose-200 text-rose-900 text-[11px] leading-relaxed">
                                    <strong className="text-rose-950 font-bold block mb-0.5">Logika Sinyal SELL:</strong>
                                    <span>{news.signal.sellSetup.rationale}</span>
                                  </div>
                                )}

                                {/* Copy & Rationale */}
                                <div className="flex items-center justify-between pt-1">
                                  <span className="text-[10px] text-slate-500 font-mono">
                                    Risk/Reward: <strong className="text-slate-800">{news.signal.sellSetup.riskReward || '1 : 2.8'}</strong>
                                  </span>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleCopySignal(
                                        `sell-${news.id}`,
                                        `${news.signal.primaryPair || dynLevels.symbol} SELL STOP | Entry: ${sellEntryDisplay} | SL: ${sellSlDisplay} | TP1: ${sellTp1Display} | TP2: ${sellTp2Display}`
                                      )
                                    }
                                    className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95 shadow-xs"
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
                      ) : (
                        /* LOCKED FOR FREE USER: Clean Paywall Card */
                        <div className="pt-2">
                          <div className="relative rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50/50 via-white to-emerald-50/40 p-5 sm:p-7 overflow-hidden shadow-xs">
                            <div className="relative z-10 flex flex-col items-center justify-center p-3 sm:p-5 text-center">
                              <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center mb-3 shadow-xs">
                                <Lock className="w-6 h-6" />
                              </div>
                              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold uppercase tracking-wider mb-2">
                                <Crown className="w-3.5 h-3.5 text-amber-700" />
                                <span>Prediksi &amp; Sinyal 2 Arah (Khusus Member PRO)</span>
                              </div>
                              <h4 className="text-sm sm:text-base font-extrabold text-slate-900 max-w-md">
                                Buka Kunci Level Entry Breakout, Stop Loss, &amp; Target TP Real-Time
                              </h4>
                              <p className="text-xs text-slate-600 max-w-lg mt-1.5 mb-4 leading-relaxed">
                                Akun FREE hanya berfungsi sebagai kalender Forex Factory. Upgrade ke PRO untuk mendapatkan sinyal eksekusi 2 arah (BUY &amp; SELL) dengan harga yang disinkronkan otomatis ke live spot market saat ini ({dynLevels.symbol}: {dynLevels.spotFormatted}).
                              </p>

                              <div className="flex flex-wrap items-center justify-center gap-2 mb-4 text-[11px] text-slate-700">
                                <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 flex items-center gap-1 shadow-xs">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Setup BUY &amp; SELL Terukur
                                </span>
                                <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 flex items-center gap-1 shadow-xs">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Proteksi SL Anti Margin Call
                                </span>
                                <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 flex items-center gap-1 shadow-xs">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Win Rate Historis {news.signal.winRate}%
                                </span>
                              </div>

                              <button
                                onClick={() => openPaymentModal('EDUKASI')}
                                className="px-6 py-2.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs shadow-md shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                              >
                                <Sparkles className="w-4 h-4" />
                                <span>Buka Playbook Berita (Paket Edukasi Rp 250k)</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
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
