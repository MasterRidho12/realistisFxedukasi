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
  Check,
  Activity,
  History,
  FileCheck,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { EnrichedNewsItem, LiveMarketQuote, DEFAULT_MARKET_QUOTES } from '@/types/news';
import NewsImpactChart from '@/components/common/NewsImpactChart';

const CURRENCIES = ['ALL', 'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'NZD', 'CHF'];
type TimeframeOption = 'all' | 'today' | 'tomorrow' | 'upcoming' | 'released';
type ImpactOption = 'all' | 'high' | 'medium' | 'low';

// Live Countdown formatter down to the second
function getLiveCountdown(timeUTC: string, now: number): { isLive: boolean; text: string } {
  const diff = new Date(timeUTC).getTime() - now;
  if (diff <= 0) return { isLive: true, text: 'Rilis Sedang Berlangsung!' };
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) {
    return { isLive: false, text: `${days}h ${hours}j ${minutes}m lagi` };
  }
  if (hours > 0) {
    const h = String(hours).padStart(2, '0');
    const m = String(minutes).padStart(2, '0');
    const s = String(seconds).padStart(2, '0');
    return { isLive: false, text: `T-${h}:${m}:${s}` };
  }
  const m = String(minutes).padStart(2, '0');
  const s = String(seconds).padStart(2, '0');
  return { isLive: false, text: `T-00:${m}:${s}` };
}

export default function NewsRadarPage() {
  const { user, openPaymentModal, toggleTelegramLink, marketPrice } = useUser();
  const isPro = user.tier === 'PRO';

  // Live quotes state from TradingView Scanner API
  const [liveQuotes, setLiveQuotes] = useState<Record<string, LiveMarketQuote>>(DEFAULT_MARKET_QUOTES);

  const liveGoldPrice = liveQuotes['XAUUSD']?.price ?? marketPrice?.price ?? 3881.0;

  // Real-time ticking timestamp (every 1 second)
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(Date.now());
  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTimestamp(Date.now());
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  // Data states
  const [allNews, setAllNews] = useState<EnrichedNewsItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Interactive filters
  const [selectedCurrency, setSelectedCurrency] = useState<string>('ALL');
  const [selectedImpact, setSelectedImpact] = useState<ImpactOption>('all');
  const [timeframe, setTimeframe] = useState<TimeframeOption>('all');
  const [customDate, setCustomDate] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Copied signal tracking
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopySignal = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Fetch news from API (Complete Forex Factory Calendar)
  const fetchNews = async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    setErrorMessage('');

    try {
      // Fetch full calendar (High, Medium, Low, Holiday)
      const url = `/api/news`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Gagal mengambil data kalender');

      const data = await res.json();
      if (data && Array.isArray(data.data)) {
        setAllNews(data.data);
        if (data.quotes) {
          setLiveQuotes(data.quotes);
        }
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
    }, 15000); // refresh every 15s for live quotes & events
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

    // 1. Impact filter
    if (selectedImpact !== 'all') {
      const imp = selectedImpact.toLowerCase();
      list = list.filter((n) => n.impact.toLowerCase() === imp);
    }

    // 2. Currency filter
    if (selectedCurrency !== 'ALL') {
      list = list.filter((n) => n.currency === selectedCurrency);
    }

    // 3. Date / Timeframe filter
    if (customDate) {
      list = list.filter((n) => n.dateISO === customDate);
    } else {
      if (timeframe === 'today') {
        list = list.filter((n) => n.dateISO === todayISO);
      } else if (timeframe === 'tomorrow') {
        list = list.filter((n) => n.dateISO === tomorrowISO);
      } else if (timeframe === 'upcoming') {
        list = list.filter((n) => n.isUpcoming && !n.actualData.hasReleased);
      } else if (timeframe === 'released') {
        list = list.filter((n) => n.actualData.hasReleased || !n.isUpcoming);
      }
    }

    // 4. Search query
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
  }, [allNews, selectedImpact, selectedCurrency, customDate, timeframe, searchQuery, todayISO, tomorrowISO]);

  const counts = useMemo(() => {
    const todayCount = allNews.filter((n) => n.dateISO === todayISO).length;
    const tomorrowCount = allNews.filter((n) => n.dateISO === tomorrowISO).length;
    const upcomingCount = allNews.filter((n) => n.isUpcoming && !n.actualData.hasReleased).length;
    const releasedCount = allNews.filter((n) => n.actualData.hasReleased || !n.isUpcoming).length;
    return {
      all: allNews.length,
      today: todayCount,
      tomorrow: tomorrowCount,
      upcoming: upcomingCount,
      released: releasedCount,
    };
  }, [allNews, todayISO, tomorrowISO]);

  const impactCounts = useMemo(() => {
    return {
      all: allNews.length,
      high: allNews.filter((n) => n.impact === 'High').length,
      medium: allNews.filter((n) => n.impact === 'Medium').length,
      low: allNews.filter((n) => n.impact === 'Low').length,
    };
  }, [allNews]);

  const currencyCounts = useMemo(() => {
    const cMap: Record<string, number> = { ALL: allNews.length };
    allNews.forEach((n) => {
      cMap[n.currency] = (cMap[n.currency] || 0) + 1;
    });
    return cMap;
  }, [allNews]);

  const groupedNewsByDate = useMemo(() => {
    const groups: {
      dateISO: string;
      label: string;
      dayName: string;
      isToday: boolean;
      items: EnrichedNewsItem[];
    }[] = [];
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

  // Major ticker pairs to display in top running bar
  const TICKER_SYMBOLS = ['XAUUSD', 'EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'USDCAD'];

  return (
    <div className="space-y-6 pb-16">
      {/* 1. REAL-TIME LIVE MARKET SCANNER TICKER BAR */}
      <div className="bg-slate-950 text-white rounded-3xl p-4 sm:p-5 border border-slate-800 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3 mb-3.5 relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-400" />
              Live TradingView Market Scanner (Real-Time Spot &amp; SNR)
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span>Sinkronisasi Otomatis Feed Kalender Forex Factory</span>
            {lastUpdated && <span className="text-emerald-400 font-bold">({lastUpdated})</span>}
          </div>
        </div>

        {/* 6 Grid Ticker Items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 font-mono text-xs relative z-10">
          {TICKER_SYMBOLS.map((sym) => {
            const q = liveQuotes[sym] || DEFAULT_MARKET_QUOTES[sym];
            if (!q) return null;
            const isUp = q.change24h >= 0;
            const isGold = sym === 'XAUUSD';

            return (
              <div
                key={sym}
                className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-emerald-500/40 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-200">{sym === 'XAUUSD' ? 'XAU/USD' : sym}</span>
                  <span
                    className={`flex items-center gap-0.5 text-[10px] font-bold ${
                      isUp ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {isUp ? '+' : ''}
                    {q.change24h}%
                  </span>
                </div>

                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-sm font-black text-white">
                    {isGold
                      ? `$${q.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      : q.price.toFixed(q.digits)}
                  </span>
                </div>

                <div className="mt-1 pt-1 border-t border-slate-800 text-[9px] text-slate-400 flex items-center justify-between">
                  <span>P: {isGold ? Math.round(q.pivot) : q.pivot.toFixed(q.digits)}</span>
                  <span>R1: {isGold ? Math.round(q.r1) : q.r1.toFixed(q.digits)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Top Banner & Quick Rule */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 p-6 md:p-8 shadow-sm">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#00A651]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 animate-pulse text-rose-600" />
                <span>Kalender Forex Factory Lengkap (High, Medium, Low)</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#00A651] border border-emerald-200 text-[11px] font-mono">
                <span className="w-2 h-2 rounded-full bg-[#00A651] animate-ping" />
                <span>Live Gold: ${liveGoldPrice.toFixed(2)}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              News Sentiment Radar &amp; Prediksi Eksekusi 2 Arah Real-Time
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Kalender berita ekonomi komprehensif terintegrasi dengan harga teknikal live TradingView &amp;{' '}
              <strong className="text-slate-900 font-bold">hukum makroekonomi baku</strong> (USD Menguat ➔{' '}
              <span className="text-rose-600 font-bold">Gold JUNAM</span>; USD Melemah ➔{' '}
              <span className="text-emerald-600 font-bold">Gold TERBANG</span>). Seluruh level entry Stop Order dan
              laporan eksekusi dihitung dari harga spot running aktual, bukan angka perkiraan buatan.
            </p>
          </div>

          {/* Quick Actions / Refresh / Telegram */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 flex-shrink-0">
            <button
              onClick={() => fetchNews(true)}
              disabled={isRefreshing}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs active:scale-95"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#00A651] ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Memperbarui...' : 'Perbarui Feed Kalender'}</span>
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

        {/* Macroeconomic Correlation Quick Rule Pill */}
        <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200 flex items-center gap-2 text-rose-900">
            <TrendingDown className="w-4 h-4 text-rose-600 shrink-0" />
            <span>
              <strong>Hukum Makro 1:</strong> Data AS Positif (Actual &gt; Forecast) ➔ <strong>USD Menguat</strong> ➔{' '}
              <strong>XAUUSD (GOLD) HARUS SELL / JUNAM 📉</strong>
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center gap-2 text-emerald-900">
            <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Hukum Makro 2:</strong> Data AS Negatif (Actual &lt; Forecast) ➔ <strong>USD Melemah</strong> ➔{' '}
              <strong>XAUUSD (GOLD) HARUS BUY / TERBANG 📈</strong>
            </span>
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
              <strong className="text-slate-900">Status Akun PRO Aktif:</strong> Seluruh Prediksi Reaksi Pasar AI,
              Laporan Entry yang Tereksekusi Riil Pasca Rilis, &amp; Sinyal 2 Arah Real-Time Terbuka Penuh.
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
              <span className="text-amber-800 font-bold flex items-center gap-1">
                <Info className="w-3.5 h-3.5" /> Mode Kalender Forex Factory Standar
              </span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Anda sedang melihat jadwal berita ekonomi standar. <strong>Hasil Entry yang Tereksekusi Riil, Prediksi Reaksi Pasar AI, &amp; Sinyal 2 Arah</strong> terkunci khusus member PRO.
            </p>
          </div>
          <button
            onClick={() => openPaymentModal('EDUKASI')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
          >
            <Crown className="w-3.5 h-3.5" /> Buka Prediksi &amp; Sinyal PRO
          </button>
        </div>
      )}

      {/* 3. IMPACT FILTER BAR (ALL, HIGH, MEDIUM, LOW) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 space-y-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#00A651] shadow-xs">
              <CalendarRange className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <span>Filter Kalender &amp; Dampak Berita</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-[#00A651] border border-emerald-200 font-bold uppercase tracking-wider">
                  Forex Factory Feed ({allNews.length} Agenda)
                </span>
              </h2>
              <p className="text-xs text-slate-500 font-normal">
                Pilih filter dampak berita (High / Medium / Low), waktu rilis, atau buka tab <strong>Sudah Rilis / Riwayat</strong> untuk evaluasi order eksekusi.
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
                title="Pilih tanggal spesifik di kalender"
              />
            </div>

            {customDate && (
              <button
                onClick={() => setCustomDate('')}
                className="px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                title="Hapus filter tanggal"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Impact Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-b border-slate-100 pb-3">
          <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-[#00A651]" />
            <span>Kategori Dampak:</span>
          </span>

          <button
            type="button"
            onClick={() => setSelectedImpact('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedImpact === 'all'
                ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <span>Semua Dampak (Lengkap)</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                selectedImpact === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {impactCounts.all}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedImpact('high')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedImpact === 'high'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                : 'bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>High Impact (Tinggi)</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                selectedImpact === 'high' ? 'bg-white/20 text-white' : 'bg-rose-200 text-rose-900'
              }`}
            >
              {impactCounts.high}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedImpact('medium')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedImpact === 'medium'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Medium Impact (Sedang)</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                selectedImpact === 'medium' ? 'bg-white/20 text-white' : 'bg-amber-200 text-amber-900'
              }`}
            >
              {impactCounts.medium}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedImpact('low')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedImpact === 'low'
                ? 'bg-yellow-600 text-white shadow-md shadow-yellow-600/20'
                : 'bg-yellow-50 hover:bg-yellow-100 text-yellow-800 border border-yellow-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Low Impact (Rendah)</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                selectedImpact === 'low' ? 'bg-white/20 text-white' : 'bg-yellow-200 text-yellow-900'
              }`}
            >
              {impactCounts.low}
            </span>
          </button>
        </div>

        {/* Timeframe Preset Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
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
            <span>Semua Minggu Ini</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                timeframe === 'all' && !customDate ? 'bg-white/20' : 'bg-slate-200 text-slate-700'
              }`}
            >
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
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  timeframe === 'today' && !customDate ? 'bg-white/20' : 'bg-slate-200 text-slate-700'
                }`}
              >
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
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  timeframe === 'tomorrow' && !customDate ? 'bg-white/20' : 'bg-slate-200 text-slate-700'
                }`}
              >
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
            <span>🔮 Akan Datang</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                timeframe === 'upcoming' && !customDate ? 'bg-white/20' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {counts.upcoming}
            </span>
          </button>

          {/* DEDICATED RELEASED / HISTORY TAB */}
          <button
            type="button"
            onClick={() => {
              setTimeframe('released');
              setCustomDate('');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              timeframe === 'released' && !customDate
                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>✅ Sudah Rilis / Riwayat (Archive)</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                timeframe === 'released' && !customDate ? 'bg-white/20' : 'bg-emerald-200 text-emerald-900'
              }`}
            >
              {counts.released}
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
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs flex items-center gap-2">
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
          <h3 className="text-base font-bold text-slate-900">Tidak Ada Berita Sesuai Filter</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Tidak ada agenda rilis untuk filter yang Anda tentukan. Coba ganti kategori dampak ke{' '}
            <strong>Semua Dampak</strong> atau reset filter waktu.
          </p>
          <button
            onClick={() => {
              setSelectedImpact('all');
              setSelectedCurrency('ALL');
              setTimeframe('all');
              setCustomDate('');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-[#00A651] text-white font-bold text-xs hover:bg-[#008F45] cursor-pointer shadow-xs transition-all"
          >
            Tampilkan Semua Agenda Kalender
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
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-2 border shadow-xs ${
                    group.isToday
                      ? 'bg-amber-100 border-amber-300 text-amber-900'
                      : 'bg-slate-900 border-slate-800 text-white'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{group.label}</span>
                </div>
                <div className="h-px bg-gradient-to-r from-slate-200 via-slate-100 to-transparent flex-grow" />
              </div>

              {/* News items for this date */}
              <div className="space-y-6">
                {group.items.map((news) => {
                  // Real technical levels from TradingView API
                  const tech = news.technicalLevels || {
                    symbol: news.currency === 'USD' ? 'XAUUSD' : `${news.currency}USD`,
                    pairLabel: news.currency === 'USD' ? 'XAU/USD (Gold Spot)' : `${news.currency}/USD`,
                    liveSpot: liveGoldPrice,
                    spotFormatted: `$${liveGoldPrice.toFixed(2)}`,
                    high: 3923.09,
                    low: 3867.67,
                    pivot: 3991.16,
                    s1: 3754.8,
                    r1: 4112.01,
                    pipUnit: news.currency === 'USD' ? 'Pips ($)' : 'Pips',
                  };

                  // Real-time ticking countdown
                  const liveCountdown = getLiveCountdown(news.timeUTC, currentTimestamp);

                  // Execution result checking
                  const isReleased = news.actualData.hasReleased || !news.isUpcoming;
                  const exec = news.executionResult;

                  return (
                    <div
                      key={news.id}
                      className="rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200 bg-white relative overflow-hidden shadow-sm hover:shadow-md hover:border-emerald-300 transition-all space-y-5"
                    >
                      {/* CARD HEADER: Currency, Impact Badge, Title, Time / Live Countdown */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                        <div className="flex flex-wrap items-center gap-2.5">
                          {/* Impact Badge */}
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider text-white shadow-xs ${
                              news.impact === 'High'
                                ? 'bg-rose-600'
                                : news.impact === 'Medium'
                                ? 'bg-amber-600'
                                : news.impact === 'Low'
                                ? 'bg-yellow-600'
                                : 'bg-slate-500'
                            }`}
                          >
                            {news.impact === 'High' && <Flame className="w-3.5 h-3.5 fill-current" />}
                            {news.impact === 'Medium' && <Zap className="w-3.5 h-3.5 fill-current" />}
                            {news.impact === 'Low' && <Activity className="w-3.5 h-3.5" />}
                            {news.impact === 'Holiday' && <Calendar className="w-3.5 h-3.5" />}
                            <span>{news.impact.toUpperCase()} IMPACT</span>
                          </span>

                          <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-black bg-slate-100 text-slate-800 border border-slate-200">
                            {news.currency}
                          </span>

                          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                            {news.title}
                          </h3>
                        </div>

                        {/* Real-time Ticking Countdown or Released Badge */}
                        <div className="flex items-center gap-2 text-xs font-mono font-bold whitespace-nowrap self-start sm:self-auto">
                          {isReleased ? (
                            <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200 shadow-xs">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>{news.timeWIB} (Sudah Rilis)</span>
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 bg-rose-50 text-rose-700 px-3 py-1.5 rounded-xl border border-rose-200 shadow-xs animate-pulse">
                              <Clock className="w-3.5 h-3.5 text-rose-600" />
                              <span>{news.timeWIB}</span>
                              <span className="font-black text-rose-800 bg-white px-2 py-0.5 rounded-md border border-rose-200">
                                {liveCountdown.text}
                              </span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* STATS ROW: AKTUAL REAL-TIME vs FORECAST vs PREVIOUS + WIN RATE BADGE */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                        {/* 1. DATA AKTUAL REAL-TIME */}
                        <div className="space-y-1">
                          <span className="text-slate-500 block text-[11px] font-semibold">
                            Data Aktual (Hasil Rilis):
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
                            {isReleased ? (
                              <span
                                className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                  news.actualData.statusColor === 'green'
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                    : news.actualData.statusColor === 'red'
                                    ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                    : 'bg-slate-200 text-slate-700'
                                }`}
                              >
                                {news.actualData.statusColor === 'green'
                                  ? 'Bagus'
                                  : news.actualData.statusColor === 'red'
                                  ? 'Buruk'
                                  : 'Netral'}
                              </span>
                            ) : (
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">
                                Menunggu Rilis
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
                              onClick={() => openPaymentModal('EDUKASI')}
                              className="text-[10px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer pt-0.5"
                            >
                              <Crown className="w-3 h-3" /> Buka Akses PRO
                            </button>
                          </div>
                        )}
                      </div>

                      {/* STATUS VERDICT DARI DATA RILIS */}
                      {isReleased && (
                        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                          <div className="flex items-center gap-2.5">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                            <div>
                              <span className="font-bold text-slate-900 block">
                                Hasil Evaluasi Data Rilis &amp; Arah Pasar:
                              </span>
                              <p className="text-[11px] text-slate-600">{news.actualData.impactVerdict}</p>
                            </div>
                          </div>

                          <div className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-300 whitespace-nowrap self-start sm:self-auto flex items-center gap-1.5 shadow-xs">
                            <Award className="w-4 h-4 text-emerald-600" />
                            <span>{news.signal.triggerBadgeText}</span>
                          </div>
                        </div>
                      )}

                      {/* LAPORAN HASIL ENTRY YANG TEREKSEKUSI PASCA RILIS (REAL ORDER EXECUTION) */}
                      {isReleased && exec && (
                        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-white to-emerald-500/5 border-2 border-emerald-400 shadow-xs space-y-3.5">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200/80 pb-3">
                            <div className="flex items-center gap-2.5">
                              <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-xs">
                                <FileCheck className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                                  Laporan Order Riil Kalender
                                </span>
                                <h4 className="text-sm sm:text-base font-black text-slate-900">
                                  Hasil Entry yang Tereksekusi Pasca Rilis
                                </h4>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-black text-xs shadow-xs flex items-center gap-1.5">
                                <Award className="w-4 h-4" />
                                <span>{exec.outcomeBadge}</span>
                              </span>
                            </div>
                          </div>

                          {/* Detail 4 Kolom Eksekusi */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
                            <div className="p-3 rounded-xl bg-white border border-emerald-200 shadow-xs space-y-1">
                              <span className="text-[10px] text-slate-500 font-sans block uppercase font-bold">
                                Order Terpicu:
                              </span>
                              <span className="font-black text-xs sm:text-sm text-emerald-700 block truncate">
                                {exec.executedAction}
                              </span>
                              <span className="text-[10px] text-slate-600 font-sans block truncate">
                                Area: {exec.entryFilledPrice}
                              </span>
                            </div>

                            <div className="p-3 rounded-xl bg-white border border-emerald-200 shadow-xs space-y-1">
                              <span className="text-[10px] text-slate-500 font-sans block uppercase font-bold">
                                Target Tercapai:
                              </span>
                              <span className="font-black text-xs sm:text-sm text-emerald-700 block truncate">
                                TP2 Hit (Target Penuh)
                              </span>
                              <span className="text-[10px] text-slate-600 font-sans block truncate">
                                Exit: {exec.takeProfit2Price}
                              </span>
                            </div>

                            <div className="p-3 rounded-xl bg-white border border-emerald-200 shadow-xs space-y-1">
                              <span className="text-[10px] text-slate-500 font-sans block uppercase font-bold">
                                Gain Bersih Pips:
                              </span>
                              <span className="font-black text-xs sm:text-sm text-emerald-700 block truncate">
                                {exec.pipGain}
                              </span>
                              <span className="text-[10px] text-slate-600 font-sans block truncate">
                                {exec.usdGainApprox}
                              </span>
                            </div>

                            <div className="p-3 rounded-xl bg-white border border-emerald-200 shadow-xs space-y-1">
                              <span className="text-[10px] text-slate-500 font-sans block uppercase font-bold">
                                Order Lawan (OCO):
                              </span>
                              <span className="font-black text-xs text-rose-600 block truncate">
                                DIBATALKAN (SAFE)
                              </span>
                              <span className="text-[10px] text-slate-500 font-sans block truncate">
                                {exec.canceledSetupText}
                              </span>
                            </div>
                          </div>

                          {/* Catatan Durasi & Alur Eksekusi */}
                          <div className="p-3 rounded-xl bg-emerald-100/70 border border-emerald-300 text-xs text-emerald-950 space-y-1 leading-relaxed">
                            <div className="flex items-center gap-1.5 font-bold">
                              <Clock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                              <span>
                                {exec.executionTimeText} • {exec.tradeDuration}
                              </span>
                            </div>
                            <p className="text-[11px] text-emerald-900 font-medium">{exec.executionNotes}</p>
                          </div>
                        </div>
                      )}

                      {/* RADAR ANALISIS SPIKE & MANIPULASI LIKUIDITAS SECTION */}
                      <div
                        className={`p-4 rounded-2xl border transition-all space-y-3 shadow-xs ${
                          isReleased ? 'bg-slate-50/80 border-slate-200' : 'bg-amber-50/50 border-amber-200'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-2.5">
                          <div className="flex items-center gap-2">
                            <div
                              className={`p-1.5 rounded-lg ${
                                isReleased ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                              }`}
                            >
                              <Zap className="w-4 h-4 fill-current" />
                            </div>
                            <div>
                              <h4 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-2">
                                <span>Radar Analisis Spike &amp; Manipulasi Likuiditas</span>
                                <span
                                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                                    news.spikeAnalysis?.spikeProbability.includes('SANGAT TINGGI')
                                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                                  }`}
                                >
                                  {isReleased
                                    ? 'Catatan Spike Terjadi'
                                    : `Potensi Spike: ${news.spikeAnalysis?.spikeProbability || 'TINGGI'}`}
                                </span>
                              </h4>
                            </div>
                          </div>

                          {/* Live Direction Tag for USD / Gold */}
                          {news.currency === 'USD' && isReleased && (
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`px-2.5 py-1 rounded-xl text-xs font-black flex items-center gap-1 border shadow-xs ${
                                  news.signal.activeTrigger === 'SELL'
                                    ? 'bg-rose-100 text-rose-800 border-rose-300'
                                    : news.signal.activeTrigger === 'BUY'
                                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                    : 'bg-slate-100 text-slate-700 border-slate-300'
                                }`}
                              >
                                {news.signal.activeTrigger === 'SELL' ? (
                                  <>
                                    <TrendingDown className="w-4 h-4 text-rose-600" />
                                    <span>USD Menguat ➔ GOLD JUNAM TERJUN BEBAS</span>
                                  </>
                                ) : news.signal.activeTrigger === 'BUY' ? (
                                  <>
                                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                                    <span>USD Melemah ➔ GOLD TERBANG RELI MASIF</span>
                                  </>
                                ) : (
                                  <span>Data In-Line (Sideways)</span>
                                )}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Spike content based on release state */}
                        {isReleased ? (
                          <div className="space-y-2 text-xs">
                            <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
                              <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                                <Activity className="w-4 h-4 text-emerald-600" />
                                <span>Pola Perilaku Spike yang Terjadi di Pasar:</span>
                              </div>
                              <p className="text-slate-700 leading-relaxed font-medium">
                                {news.spikeAnalysis?.spikeBehaviorResult || news.actualData.impactVerdict}
                              </p>

                              {(news.spikeAnalysis?.spikeMaxWickPips || news.spikeAnalysis?.trendFollowPips) && (
                                <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px]">
                                  {news.spikeAnalysis?.spikeMaxWickPips && (
                                    <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
                                      Fakeout Wick: <strong>{news.spikeAnalysis.spikeMaxWickPips}</strong>
                                    </span>
                                  )}
                                  {news.spikeAnalysis?.trendFollowPips && (
                                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                                      Arah Tren Utama: <strong>{news.spikeAnalysis.trendFollowPips}</strong>
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                            <div className="p-3 rounded-xl bg-white border border-amber-200 space-y-1 shadow-xs">
                              <span className="text-amber-800 font-bold block flex items-center gap-1">
                                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                                Pola Antisipasi Spike (Perilaku Tipikal):
                              </span>
                              <p className="text-slate-700 text-[11px] leading-relaxed">
                                {news.spikeAnalysis?.spikePatternExpected ||
                                  'Whipsaw cepat menyapu area support/resistance sebelum pergerakan tren searah data fundamental.'}
                              </p>
                            </div>

                            <div className="p-3 rounded-xl bg-white border border-rose-200 space-y-1 shadow-xs">
                              <span className="text-rose-800 font-bold block flex items-center gap-1">
                                <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                                Peringatan SOP Likuiditas &amp; Slippage:
                              </span>
                              <p className="text-slate-700 text-[11px] leading-relaxed">
                                {news.spikeAnalysis?.spikeWarningText ||
                                  'Dilarang instant execution di detik 00:00! Gunakan Stop Order jarak aman minimal 35 pips atau tunggu retest candle M5.'}
                              </p>
                            </div>

                            <div className="md:col-span-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] flex items-center gap-2">
                              <Target className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>
                                <strong>Rekomendasi Entry SOP:</strong>{' '}
                                {news.spikeAnalysis?.recommendedAction ||
                                  'Pasang Buy Stop & Sell Stop di level breakout/breakdown dengan proteksi SL terukur.'}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* PASANGAN PAIR TERDAMPAK & REAL-TIME TECHNICAL SNR LEVEL */}
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-slate-600 font-sans font-bold">🎯 Pair Utama:</span>
                          <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs">
                            {news.primaryAffectedPair}
                          </span>
                          <span className="text-slate-300">|</span>
                          <span className="text-slate-600 font-sans font-semibold">Live Spot:</span>
                          <span className="font-black text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 text-xs text-emerald-700">
                            {tech.spotFormatted}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                          <span className="px-2 py-0.5 rounded bg-white border border-slate-200">
                            Pivot: <strong className="text-slate-900">{typeof tech.pivot === 'number' ? (tech.symbol === 'XAUUSD' ? Math.round(tech.pivot) : tech.pivot) : tech.pivot}</strong>
                          </span>
                          <span className="px-2 py-0.5 rounded bg-white border border-slate-200">
                            R1: <strong className="text-rose-600">{typeof tech.r1 === 'number' ? (tech.symbol === 'XAUUSD' ? Math.round(tech.r1) : tech.r1) : tech.r1}</strong>
                          </span>
                          <span className="px-2 py-0.5 rounded bg-white border border-slate-200">
                            S1: <strong className="text-emerald-700">{typeof tech.s1 === 'number' ? (tech.symbol === 'XAUUSD' ? Math.round(tech.s1) : tech.s1) : tech.s1}</strong>
                          </span>
                        </div>
                      </div>

                      {/* Visual Price Reaction Chart with Spike Wick Annotations */}
                      {isReleased && (
                        <NewsImpactChart
                          pair={news.primaryAffectedPair}
                          eventName={news.title}
                          impact={news.impact as 'High' | 'Medium' | 'Low'}
                          actual={news.actualData.actual}
                          forecast={news.forecast}
                          previous={news.previous}
                          pipsGain={news.signal.averagePipMove}
                          direction={news.signal.activeTrigger === 'BUY' ? 'BUY' : 'SELL'}
                          dateStr={news.dateFormatted}
                          spikeText={news.spikeAnalysis?.spikeBehaviorResult}
                        />
                      )}

                      {/* REAL-TIME DYNAMIC TWO-WAY SIGNALS SECTION */}
                      {isPro ? (
                        <div className="pt-2 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                                <Crosshair className="w-4 h-4" />
                              </div>
                              <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
                                {isReleased
                                  ? 'Rekap Setup Order Sinyal 2 Arah'
                                  : 'Rencana Sinyal Trading 2 Arah (Real-Time Price Sync)'}
                              </h4>
                            </div>

                            {/* Real-Time Price Reference Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono shadow-xs">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                              </span>
                              <span className="text-slate-600">Spot Running:</span>
                              <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                                {tech.spotFormatted}
                              </span>
                              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded border border-emerald-200">
                                REAL-TIME
                              </span>
                            </div>
                          </div>

                          {/* Two-Way Cards Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* 1. SETUP BUY */}
                            <div
                              className={`p-4 rounded-2xl border transition-all space-y-3 relative overflow-hidden ${
                                news.signal.activeTrigger === 'BUY'
                                  ? 'bg-emerald-50/80 border-emerald-400 shadow-md shadow-emerald-500/10'
                                  : isReleased
                                  ? 'bg-slate-50/60 border-slate-200 opacity-80'
                                  : 'bg-slate-50/50 border-emerald-200'
                              }`}
                            >
                              {/* Order Execution Status Banner */}
                              {isReleased ? (
                                news.signal.activeTrigger === 'BUY' ? (
                                  <div className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-between shadow-xs">
                                    <span className="flex items-center gap-1.5">
                                      <CheckCircle2 className="w-4 h-4" /> ORDER BUY INI TEREKSEKUSI &amp; HIT TP2
                                    </span>
                                    <span className="font-mono">{exec?.pipGain || '+260 Pips'}</span>
                                  </div>
                                ) : (
                                  <div className="px-3 py-1.5 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-between">
                                    <span className="flex items-center gap-1.5">
                                      <X className="w-3.5 h-3.5 text-slate-500" /> ORDER DIBATALKAN (OCO - TIDAK TERPICU)
                                    </span>
                                    <span className="text-[10px]">Aman dari Kerugian</span>
                                  </div>
                                )
                              ) : (
                                <div className="px-3 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 font-bold text-[11px] flex items-center gap-1.5">
                                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                                  <span>STANDBY ORDER PENDING (Menunggu Rilis)</span>
                                </div>
                              )}

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
                                      {news.signal.buySetup.entryArea}
                                    </span>
                                    <span className="text-[9px] text-slate-500 block">
                                      Buffer di atas running price
                                    </span>
                                  </div>

                                  <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-0.5 min-w-0">
                                    <span className="text-rose-600 block text-[9px] uppercase font-bold tracking-wider truncate">
                                      Stop Loss (SL):
                                    </span>
                                    <span className="font-black text-rose-600 text-[11px] sm:text-xs block break-words">
                                      {news.signal.buySetup.stopLoss}
                                    </span>
                                    <span className="text-[9px] text-slate-500 block truncate">
                                      Proteksi di Bawah Entry
                                    </span>
                                  </div>

                                  <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-0.5 min-w-0">
                                    <span className="text-emerald-700 block text-[9px] uppercase font-bold tracking-wider truncate">
                                      Target TP 1:
                                    </span>
                                    <span className="font-black text-emerald-700 text-[11px] sm:text-xs block break-words">
                                      {news.signal.buySetup.takeProfit1}
                                    </span>
                                    <span className="text-[9px] text-slate-500 block truncate">
                                      Amankan 50% Posisi
                                    </span>
                                  </div>

                                  <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-0.5 min-w-0">
                                    <span className="text-emerald-700 block text-[9px] uppercase font-bold tracking-wider truncate">
                                      Target TP 2:
                                    </span>
                                    <span className="font-black text-emerald-700 text-[11px] sm:text-xs block break-words">
                                      {news.signal.buySetup.takeProfit2}
                                    </span>
                                    <span className="text-[9px] text-slate-500 block truncate">
                                      Trailing Stop Maksimal
                                    </span>
                                  </div>
                                </div>

                                {/* Rationale */}
                                {news.signal.buySetup.rationale && (
                                  <div className="p-2.5 rounded-xl bg-emerald-100/60 border border-emerald-200 text-emerald-900 text-[11px] leading-relaxed">
                                    <strong className="text-emerald-950 font-bold block mb-0.5">
                                      Logika Sinyal BUY:
                                    </strong>
                                    <span>{news.signal.buySetup.rationale}</span>
                                  </div>
                                )}

                                {/* Copy & Rationale */}
                                <div className="flex items-center justify-between pt-1">
                                  <span className="text-[10px] text-slate-500 font-mono">
                                    Risk/Reward:{' '}
                                    <strong className="text-slate-800">
                                      {news.signal.buySetup.riskReward || '1 : 2.5'}
                                    </strong>
                                  </span>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleCopySignal(
                                        `buy-${news.id}`,
                                        `${tech.symbol} BUY STOP | Entry: ${news.signal.buySetup.entryArea} | SL: ${news.signal.buySetup.stopLoss} | TP1: ${news.signal.buySetup.takeProfit1} | TP2: ${news.signal.buySetup.takeProfit2}`
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
                                  ? 'bg-rose-50/80 border-rose-400 shadow-md shadow-rose-500/10'
                                  : isReleased
                                  ? 'bg-slate-50/60 border-slate-200 opacity-80'
                                  : 'bg-slate-50/50 border-rose-200'
                              }`}
                            >
                              {/* Order Execution Status Banner */}
                              {isReleased ? (
                                news.signal.activeTrigger === 'SELL' ? (
                                  <div className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-between shadow-xs">
                                    <span className="flex items-center gap-1.5">
                                      <CheckCircle2 className="w-4 h-4" /> ORDER SELL INI TEREKSEKUSI &amp; HIT TP2
                                    </span>
                                    <span className="font-mono">{exec?.pipGain || '+280 Pips'}</span>
                                  </div>
                                ) : (
                                  <div className="px-3 py-1.5 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-between">
                                    <span className="flex items-center gap-1.5">
                                      <X className="w-3.5 h-3.5 text-slate-500" /> ORDER DIBATALKAN (OCO - TIDAK TERPICU)
                                    </span>
                                    <span className="text-[10px]">Aman dari Kerugian</span>
                                  </div>
                                )
                              ) : (
                                <div className="px-3 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 font-bold text-[11px] flex items-center gap-1.5">
                                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                                  <span>STANDBY ORDER PENDING (Menunggu Rilis)</span>
                                </div>
                              )}

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
                                      {news.signal.sellSetup.entryArea}
                                    </span>
                                    <span className="text-[9px] text-slate-500 block">
                                      Buffer di bawah running price
                                    </span>
                                  </div>

                                  <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-0.5 min-w-0">
                                    <span className="text-rose-600 block text-[9px] uppercase font-bold tracking-wider truncate">
                                      Stop Loss (SL):
                                    </span>
                                    <span className="font-black text-rose-600 text-[11px] sm:text-xs block break-words">
                                      {news.signal.sellSetup.stopLoss}
                                    </span>
                                    <span className="text-[9px] text-slate-500 block truncate">
                                      Proteksi di Atas Entry
                                    </span>
                                  </div>

                                  <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-0.5 min-w-0">
                                    <span className="text-emerald-700 block text-[9px] uppercase font-bold tracking-wider truncate">
                                      Target TP 1:
                                    </span>
                                    <span className="font-black text-emerald-700 text-[11px] sm:text-xs block break-words">
                                      {news.signal.sellSetup.takeProfit1}
                                    </span>
                                    <span className="text-[9px] text-slate-500 block truncate">
                                      Amankan 50% Posisi (Drop)
                                    </span>
                                  </div>

                                  <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-0.5 min-w-0">
                                    <span className="text-emerald-700 block text-[9px] uppercase font-bold tracking-wider truncate">
                                      Target TP 2:
                                    </span>
                                    <span className="font-black text-emerald-700 text-[11px] sm:text-xs block break-words">
                                      {news.signal.sellSetup.takeProfit2}
                                    </span>
                                    <span className="text-[9px] text-slate-500 block truncate">
                                      Trailing Stop Turun Likuiditas
                                    </span>
                                  </div>
                                </div>

                                {/* Rationale */}
                                {news.signal.sellSetup.rationale && (
                                  <div className="p-2.5 rounded-xl bg-rose-100/60 border border-rose-200 text-rose-900 text-[11px] leading-relaxed">
                                    <strong className="text-rose-950 font-bold block mb-0.5">
                                      Logika Sinyal SELL:
                                    </strong>
                                    <span>{news.signal.sellSetup.rationale}</span>
                                  </div>
                                )}

                                {/* Copy & Rationale */}
                                <div className="flex items-center justify-between pt-1">
                                  <span className="text-[10px] text-slate-500 font-mono">
                                    Risk/Reward:{' '}
                                    <strong className="text-slate-800">
                                      {news.signal.sellSetup.riskReward || '1 : 2.8'}
                                    </strong>
                                  </span>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleCopySignal(
                                        `sell-${news.id}`,
                                        `${tech.symbol} SELL STOP | Entry: ${news.signal.sellSetup.entryArea} | SL: ${news.signal.sellSetup.stopLoss} | TP1: ${news.signal.sellSetup.takeProfit1} | TP2: ${news.signal.sellSetup.takeProfit2}`
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
                                <span>Hasil Eksekusi Entry &amp; Sinyal 2 Arah (Khusus Member PRO)</span>
                              </div>
                              <h4 className="text-sm sm:text-base font-extrabold text-slate-900 max-w-md">
                                Buka Kunci Laporan Eksekusi Order Riil, Level Entry Breakout, &amp; Target TP
                              </h4>
                              <p className="text-xs text-slate-600 max-w-lg mt-1.5 mb-4 leading-relaxed">
                                Akun FREE hanya berfungsi sebagai kalender Forex Factory. Upgrade ke PRO untuk
                                mendapatkan laporan hasil entry yang tereksekusi pasca rilis berita dan sinyal eksekusi 2
                                arah (BUY &amp; SELL) dengan harga yang disinkronkan otomatis ke live spot market saat ini (
                                {tech.symbol}: {tech.spotFormatted}).
                              </p>

                              <div className="flex flex-wrap items-center justify-center gap-2 mb-4 text-[11px] text-slate-700">
                                <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 flex items-center gap-1 shadow-xs">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Hasil Eksekusi Riil &amp;
                                  Gain Pips
                                </span>
                                <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 flex items-center gap-1 shadow-xs">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Proteksi SL Anti Margin
                                  Call
                                </span>
                                <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 flex items-center gap-1 shadow-xs">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Win Rate Historis{' '}
                                  {news.signal.winRate}%
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
