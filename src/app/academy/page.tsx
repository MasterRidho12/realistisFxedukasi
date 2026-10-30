'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  GraduationCap,
  Crown,
  Lock,
  CheckCircle2,
  PlayCircle,
  Sparkles,
  BookOpen,
  Award,
  ChevronRight,
  ShieldCheck,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  RotateCw,
  Download,
  FileText,
  Clock,
  Tv,
  MonitorPlay,
  Check,
  TrendingUp,
  AlertCircle,
  Film,
} from 'lucide-react';
import { useUser } from '@/context/UserContext';

interface LessonItem {
  id: string;
  title: string;
  duration: string;
  durationSec: number;
  description: string;
  keyPoints: string[];
}

interface AcademyModule {
  id: string;
  level: number;
  title: string;
  duration: string;
  summary: string;
  isCompleted: boolean;
  proOnly: boolean;
  lessons: LessonItem[];
}

const MODULES: AcademyModule[] = [
  {
    id: 'm0',
    level: 0,
    title: 'Dasar-Dasar Forex untuk Pemula',
    duration: '52 Menit',
    summary: 'Pengenalan pasar forex, cara kerja transaksi mata uang, istilah pips, lot, leverage, dan membaca candlestick.',
    isCompleted: false,
    proOnly: false, // GRATIS UNTUK SEMUA TRADER
    lessons: [
      {
        id: 'm0_l1',
        title: 'Pelajaran 1: Apa itu Pasar Forex & Cara Kerja Transaksi Mata Uang',
        duration: '10:20',
        durationSec: 620,
        description: 'Memahami struktur pasar keuangan terbesar di dunia dengan perputaran $7.5 Triliun per hari, sesi perdagangan utama (Asia, London, New York), dan mekanisme trading 2 arah (Buy & Sell).',
        keyPoints: [
          'Perbedaan pasar forex vs pasar saham tradisional',
          'Karakteristik 3 sesi trading: Tokyo, London, dan New York',
          'Mekanisme Buy (Long) saat harga diprediksi naik & Sell (Short) saat diprediksi turun',
        ],
      },
      {
        id: 'm0_l2',
        title: 'Pelajaran 2: Memahami Istilah Wajib (Pips, Spread, Lot, dan Leverage)',
        duration: '12:45',
        durationSec: 765,
        description: 'Bedah tuntas arti 1 pip pada pair mata uang dan emas (XAUUSD), pengaruh spread broker, perbedaan micro lot (0.01) vs standard lot (1.00), serta pedang bermata dua leverage.',
        keyPoints: [
          'Cara hitung nilai 1 pip pada EURUSD dan XAUUSD secara matematis',
          'Dampak spread terhadap biaya transaksi harian trader',
          'Konsep dasar leverage dan margin required agar tidak salah paham risiko',
        ],
      },
      {
        id: 'm0_l3',
        title: 'Pelajaran 3: Cara Membaca Candlestick, Trend Bullish & Bearish',
        duration: '15:30',
        durationSec: 930,
        description: 'Anatomi candlestick (Open, High, Low, Close), mengenali momentum buyer vs seller, dan cara menentukan arah trend pasar secara objektif tanpa indikator rumit.',
        keyPoints: [
          'Pola candle konfirmasi: Pinbar Rejection, Engulfing, dan Marubozu',
          'Mengenali Higher High (HH), Higher Low (HL), Lower High (LH), dan Lower Low (LL)',
          'Membedakan kondisi pasar trending kuat vs pasar sideways/ranging',
        ],
      },
      {
        id: 'm0_l4',
        title: 'Pelajaran 4: Manajemen Akun & Mengenal Software Trading (MT5 & TradingView)',
        duration: '14:10',
        durationSec: 850,
        description: 'Panduan setup workspace MetaTrader 5 dan TradingView yang bersih, cara pasang Pending Order (Buy/Sell Limit & Stop), serta simulasi akun demo tanpa risiko kerugian.',
        keyPoints: [
          'Setup layout grafik profesional tanpa indikator menumpuk',
          'Eksekusi Market Order vs Pending Limit Order di MT5',
          'Pentingnya disiplin eksekusi di akun demo sebelum beralih ke real',
        ],
      },
    ],
  },
  {
    id: 'm1',
    level: 1,
    title: 'Fondasi Money Management & Aturan 1-2% Modal',
    duration: '57 Menit',
    summary: 'Memahami cara kerja leverage broker, margin, dan kenapa 90% retail trader bangkrut karena over-lot.',
    isCompleted: false,
    proOnly: true, // Paket Edukasi 100k
    lessons: [
      {
        id: 'm1_l1',
        title: 'Pelajaran 1: Mengapa Over-lot Membunuh Akun Anda & Bukti Margin Call',
        duration: '16:30',
        durationSec: 990,
        description: 'Membongkar alasan matematis kenapa 90% trader retail kehilangan modal dalam 90 hari pertama akibat ukuran lot yang tidak proporsional dengan modal.',
        keyPoints: [
          'Tabel probabilitas keruntuhan modal (Risk of Ruin Table)',
          'Jebakan psikologis menahan floating minus dengan lot besar',
          'Simulasi perbandingan akun agresif vs akun disiplin dalam 100 trade',
        ],
      },
      {
        id: 'm1_l2',
        title: 'Pelajaran 2: Menghitung Nilai Pips dan Leverage Nyata',
        duration: '18:40',
        durationSec: 1120,
        description: 'Simulasi perhitungan risiko matematis presisi sebelum menekan tombol Buy/Sell pada chart XAUUSD dan Major Pairs.',
        keyPoints: [
          'Formula otomatis ukuran lot berdasarkan batas dollar risk ($10-$20)',
          'Menghitung Stop Out level sebelum akun menyentuh Margin Call',
          'Pengaruh leverage tinggi terhadap psikologi ketahanan floating',
        ],
      },
      {
        id: 'm1_l3',
        title: 'Pelajaran 3: Menghindari Margin Call dengan SOP 1% Modal',
        duration: '22:15',
        durationSec: 1335,
        description: 'Prosedur operasional baku membatasi kerugian maksimal 1% dari modal per trade dengan Risk to Reward minimal 1:2.',
        keyPoints: [
          'Batas maksimal 2 posisi per hari untuk menghindari overtrading',
          'Aturan Cut Loss tanpa kompromi jika setup analisa terbukti invalid',
          'Pencatatan risiko di Risk Calculator sebelum entry',
        ],
      },
    ],
  },
  {
    id: 'm2',
    level: 2,
    title: 'Struktur Market & Key Level Support / Resistance',
    duration: '64 Menit',
    summary: 'Mengidentifikasi area pantulan probabilitas tinggi pada timeframe H1 dan H4 tanpa indikator berlebih.',
    isCompleted: false,
    proOnly: true,
    lessons: [
      {
        id: 'm2_l1',
        title: 'Pelajaran 1: Membaca Market Structure (Higher High & Lower Low)',
        duration: '20:10',
        durationSec: 1210,
        description: 'Mengidentifikasi perubahan arah trend melalui Break of Structure (BOS) dan Change of Character (CHoCH) pada timeframe H1 dan H4.',
        keyPoints: [
          'Membedakan Valid Breakout vs False Breakout (Liquidity Sweep)',
          'Menandai Swing High dan Swing Low utama sebagai batas area aman',
          'Memetakan bias harian sebelum pasar sesi London & New York buka',
        ],
      },
      {
        id: 'm2_l2',
        title: 'Pelajaran 2: Menggambar Supply & Demand Zone yang Valid',
        duration: '24:35',
        durationSec: 1475,
        description: 'Aturan menggambar Drop-Base-Rally (DBR) dan Rally-Base-Drop (RBD) dengan kekuatan candle imbalance tinggi.',
        keyPoints: [
          'Karakteristik candle imbalance (Fair Value Gap)',
          'Perbedaan Zona Fresh yang belum pernah disentuh vs Zona yang sudah lemah',
          'Konfirmasi time-frame kecil M15 saat harga memasuki area zona',
        ],
      },
      {
        id: 'm2_l3',
        title: 'Pelajaran 3: Teknik Breakout Retest Konfirmasi Candle',
        duration: '19:20',
        durationSec: 1160,
        description: 'Cara aman entry saat harga memantul kembali ke level support/resistance yang baru saja ditembus secara valid.',
        keyPoints: [
          'Menghindari mengejar candle panjang (Chasing the Move)',
          'Mencari konfirmasi rejection pinbar di area retest',
          'Penempatan Stop Loss fixed 30 pips di balik zona aman',
        ],
      },
    ],
  },
  {
    id: 'm3',
    level: 3,
    title: 'Psikologi Anti-FOMO & Melawan Revenge Trading',
    duration: '57 Menit',
    summary: 'Membangun disiplin trading layaknya robot eksekusi, bebas dari ketakutan rugi dan keserakahan.',
    isCompleted: false,
    proOnly: true,
    lessons: [
      {
        id: 'm3_l1',
        title: 'Pelajaran 1: Mengapa Otak Manusia Rentan Terhadap FOMO',
        duration: '17:50',
        durationSec: 1070,
        description: 'Penjelasan ilmiah bias kognitif trader, pelepasan hormon dopamin saat melihat candle bergerak agresif, dan cara memprogram ulang respon emosional.',
        keyPoints: [
          'Siklus emosi destruktif: Greed -> Hope -> Fear -> Regret',
          'Menghindari trigger FOMO dari media sosial dan grup sinyal',
          'Menanamkan mindset bahwa pasar forex akan selalu buka esok hari',
        ],
      },
      {
        id: 'm3_l2',
        title: 'Pelajaran 2: Menghentikan Siklus Dendam (Revenge Trading)',
        duration: '21:00',
        durationSec: 1260,
        description: 'Aturan Circuit Breaker otomatis: berhenti trading hari ini jika menyentuh batas rugi harian, matikan grafik, dan tinggalkan komputer.',
        keyPoints: [
          'Protokol darurat saat mengalami 2 kerugian beruntun',
          'Bahaya fatal melipatgandakan ukuran lot (Martingale) saat emosi panas',
          'Latihan pernapasan dan reset mental 15 menit sebelum menyentuh chart lagi',
        ],
      },
      {
        id: 'm3_l3',
        title: 'Pelajaran 3: SOP Evaluasi Jurnal Psikologis Harian',
        duration: '18:15',
        durationSec: 1095,
        description: 'Cara mendokumentasikan setiap keputusan entry dalam Smart Trading Journal untuk mengukur skor kepatuhan psikologis secara objektif.',
        keyPoints: [
          'Audit emosi sebelum dan sesudah eksekusi trade',
          'Mencatat apakah posisi trading mematuhi checklist SOP 5 poin',
          'Review mingguan untuk mengeliminasi kesalahan trading berulang',
        ],
      },
    ],
  },
  {
    id: 'm4',
    level: 4,
    title: 'Strategi Menghadapi Berita Volatil (NFP & CPI)',
    duration: '68 Menit',
    summary: 'Cara membaca skenario 2 arah rilis data ekonomi berdampak tinggi tanpa terseret false breakout.',
    isCompleted: false,
    proOnly: true,
    lessons: [
      {
        id: 'm4_l1',
        title: 'Pelajaran 1: Anatomi Volatilitas News High-Impact (NFP, CPI, FOMC)',
        duration: '25:30',
        durationSec: 1530,
        description: 'Mengenal rilis data ekonomi krusial Amerika Serikat dan pola pergerakan harga emas (XAUUSD) saat berita dirilis.',
        keyPoints: [
          'Perbedaan Data Actual vs Forecast vs Previous',
          'Mengapa 15 menit pertama rilis news adalah area perang spekulan',
          'Aturan aman tidak membuka posisi sembarangan tepat detik rilis',
        ],
      },
      {
        id: 'm4_l2',
        title: 'Pelajaran 2: Eksekusi Skenario 2 Arah Bullish vs Bearish',
        duration: '26:10',
        durationSec: 1570,
        description: 'Peta strategi 2 arah menggunakan News Sentiment Radar untuk entry setelah arah trend pasca-berita terkonfirmasi jelas.',
        keyPoints: [
          'SOP menunggu candle H1 pasca-news menutup (closing candle)',
          'Entry pada retest level kunci setelah debu volatilitas mereda',
          'Mengamankan profit dengan Partial Taking Profit dan memindahkan SL ke Breakeven',
        ],
      },
      {
        id: 'm4_l3',
        title: 'Pelajaran 3: Menghindari Slippage dan Spread Melebar',
        duration: '16:45',
        durationSec: 1005,
        description: 'Bagaimana likuiditas broker bekerja saat event besar, risiko slippage eksekusi, dan jam paling aman untuk entry posisi.',
        keyPoints: [
          'Mengapa spread broker bisa melebar hingga 5-10 pips saat rilis data',
          'Bahaya Stop Order yang meloncat di harga yang jauh lebih buruk',
          'Waktu ideal masuk market: 30-45 menit setelah rilis berita',
        ],
      },
    ],
  },
  {
    id: 'm5',
    level: 5,
    title: 'Master Analisis Teknikal & Ujian Akhir SOP',
    duration: '90 Menit',
    summary: 'Penguasaan analisis teknikal multi-timeframe, eksekusi entry baku, evaluasi pemahaman SOP 1%, dan compounding modal.',
    isCompleted: false,
    proOnly: true,
    lessons: [
      {
        id: 'm5_l1',
        title: 'Pelajaran 1: Rencana Compounding Modal & Manajemen Penarikan Profit (Withdrawal Routine)',
        duration: '28:00',
        durationSec: 1680,
        description: 'Roadmap compounding terukur selama 12 bulan dan aturan wajib menarik profit (WD rutin) setiap minggu agar hasil trading terasa nyata di kehidupan sehari-hari.',
        keyPoints: [
          'Tabel proyeksi pertumbuhan modal realistis 5-10% per bulan',
          'SOP penarikan 50% profit masuk rekening dan 50% compounding modal',
          'Menjaga modal pokok tetap aman dari godaan over-confidence',
        ],
      },
      {
        id: 'm5_l2',
        title: 'Pelajaran 2: Integrasi Multi-Timeframe (H4 Trend, H1 Area SND, M15 Entry Trigger)',
        duration: '32:40',
        durationSec: 1960,
        description: 'Sinergi analisis tingkat master: H4 menentukan arah arus besar, H1 menemukan area value terbaik, dan M15 memberikan trigger presisi dengan Stop Loss minimal.',
        keyPoints: [
          'Filter Top-Down Analysis 3 layer sebelum buka posisi',
          'Konfirmasi rejection di M15 dengan Fixed Stop Loss 30 pips',
          'Mencapai Risk to Reward 1:2 hingga 1:3 yang konsisten',
        ],
      },
      {
        id: 'm5_l3',
        title: 'Pelajaran 3: Ujian Akhir SOP (Evaluasi Pemahaman Analisis Teknikal & Money Management)',
        duration: '30:00',
        durationSec: 1800,
        description: 'Studi kasus live review 10 setup chart historis untuk menguji ketelitian trader dalam menyaring setup layak vs setup sampah.',
        keyPoints: [
          'Bedah 10 contoh chart acak dengan parameter SOP RealistisFx',
          'Skor kelulusan disiplin mandiri minimal 80%',
          'Komitmen tertulis kepatuhan SOP Baku Trader Realistis',
        ],
      },
    ],
  },
];

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export default function AcademyPage() {
  const { user, openPaymentModal } = useUser();
  const isPro = user.tier === 'PRO';
  const hasAcademyAccess = isPro || Boolean(user.hasAcademyAccess);

  const [activeModule, setActiveModule] = useState<AcademyModule>(MODULES[0]);
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  // Dummy Video Player States
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'notes' | 'keypoints' | 'playlist'>('notes');
  const [downloadNotice, setDownloadNotice] = useState<string>('');

  const currentLesson = activeModule.lessons[activeLessonIndex] || activeModule.lessons[0];
  const isModuleLocked = activeModule.proOnly && !hasAcademyAccess;
  const lessonKey = `${activeModule.id}_${currentLesson.id}`;
  const isLessonDone = completedLessons.includes(lessonKey);

  const completedCount = completedModules.length;
  const progressPercent = Math.round((completedCount / MODULES.length) * 100);

  // Video playback timer ticker
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !isModuleLocked) {
      interval = setInterval(() => {
        setCurrentTimeSec((prev) => {
          const maxSec = currentLesson.durationSec || 600;
          if (prev >= maxSec) {
            setIsPlaying(false);
            return maxSec;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isModuleLocked, playbackSpeed, currentLesson.durationSec]);

  // Reset lesson player when changing module
  const handleSelectModule = (mod: AcademyModule) => {
    setActiveModule(mod);
    setActiveLessonIndex(0);
    setCurrentTimeSec(0);
    setIsPlaying(false);
  };

  // Switch active lesson within module
  const handleSelectLesson = (idx: number) => {
    setActiveLessonIndex(idx);
    setCurrentTimeSec(0);
    setIsPlaying(false);
  };

  // Toggle play/pause
  const handleTogglePlay = () => {
    if (isModuleLocked) {
      openPaymentModal('EDUKASI');
      return;
    }
    setIsPlaying((prev) => !prev);
  };

  // Seek bar click
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isModuleLocked) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    setCurrentTimeSec(Math.round(pct * currentLesson.durationSec));
  };

  // Skip +/- 10s
  const handleSkip = (seconds: number) => {
    if (isModuleLocked) return;
    setCurrentTimeSec((prev) =>
      Math.max(0, Math.min(currentLesson.durationSec, prev + seconds))
    );
  };

  // Toggle lesson complete
  const handleToggleLessonDone = () => {
    if (isModuleLocked) {
      openPaymentModal('EDUKASI');
      return;
    }
    setCompletedLessons((prev) =>
      prev.includes(lessonKey)
        ? prev.filter((k) => k !== lessonKey)
        : [...prev, lessonKey]
    );
  };

  // Toggle entire module complete
  const handleToggleModuleComplete = (modId: string) => {
    const mod = MODULES.find((m) => m.id === modId);
    if (mod?.proOnly && !hasAcademyAccess) {
      openPaymentModal('EDUKASI');
      return;
    }
    setCompletedModules((prev) =>
      prev.includes(modId) ? prev.filter((id) => id !== modId) : [...prev, modId]
    );
  };

  // Next lesson
  const handleNextLesson = () => {
    if (activeLessonIndex < activeModule.lessons.length - 1) {
      handleSelectLesson(activeLessonIndex + 1);
    } else {
      const currentModIdx = MODULES.findIndex((m) => m.id === activeModule.id);
      if (currentModIdx < MODULES.length - 1) {
        handleSelectModule(MODULES[currentModIdx + 1]);
      }
    }
  };

  // Dummy PDF download
  const handleDownloadDummySop = () => {
    setDownloadNotice(`Sedang mengunduh dokumen SOP: "${currentLesson.title}.pdf" (File Demo)...`);
    setTimeout(() => {
      setDownloadNotice('✓ Berhasil diunduh! Dokumen ringkasan SOP materi telah tersimpan.');
      setTimeout(() => setDownloadNotice(''), 3500);
    }, 1200);
  };

  const progressVideoPct = currentLesson.durationSec > 0
    ? Math.min(100, (currentTimeSec / currentLesson.durationSec) * 100)
    : 0;

  return (
    <div className="space-y-4 pb-12">
      {/* Top Header & Compact Progress */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200">
              <GraduationCap className="w-5 h-5" />
            </span>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              Modul Edukasi Video Trader Realistis
            </h1>
            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-[#00A651] border border-emerald-200">
              Level 0 - 5
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Dasar Forex Gratis untuk pemula &amp; Video Modul Lanjutan Level 1-5 SOP Anti-Margin Call (Rp 100.000 sekali bayar).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0">
          {/* Progress Indicator */}
          <div className="space-y-1 min-w-[160px] sm:min-w-[180px]">
            <div className="flex items-center justify-between text-xs text-slate-600 font-semibold">
              <span>Kemajuan Belajar</span>
              <span className="text-[#00A651] font-bold">{completedCount}/{MODULES.length} Selesai</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-[#00A651] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {!hasAcademyAccess ? (
            <button
              onClick={() => openPaymentModal('EDUKASI')}
              className="px-4 py-2 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-extrabold text-xs flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#00A651]/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" /> Buka Edukasi Lvl 1-5 (Rp 100k)
            </button>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-[#00A651]" />
              <span>Akses Penuh Terbuka</span>
            </div>
          )}
        </div>
      </div>

      {/* Slim Notice Pill for Unpaid Users */}
      {!hasAcademyAccess && (
        <div className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50/50 to-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex flex-wrap items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00A651] animate-pulse" />
            <span>
              <strong>Video Modul Level 0 Gratis untuk Anda.</strong> Buka seluruh Video Modul Lanjutan Level 1-5 &amp; SOP Anti-MC hanya <strong>Rp 100.000</strong> (sekali bayar seumur hidup).
            </span>
          </div>
          <button
            onClick={() => openPaymentModal('EDUKASI')}
            className="font-extrabold text-[#00A651] hover:text-[#008F45] hover:underline cursor-pointer flex items-center gap-1 shrink-0 ml-auto"
          >
            <span>Beli Rp 100k via QRIS</span>
            <Sparkles className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Download Toast Notification */}
      {downloadNotice && (
        <div className="p-3 rounded-xl bg-emerald-900 text-white text-xs font-semibold flex items-center justify-between shadow-lg transition-all animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{downloadNotice}</span>
          </div>
          <span className="text-[10px] text-emerald-300 font-mono">RealistisFx LMS</span>
        </div>
      )}

      {/* MAIN LAYOUT: Left (Module List 4 Cols) & Right (Video Player + Lesson Notes 8 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ======================================================== */}
        {/* LEFT COLUMN: MODULE LIST (Level 0 - 5)                   */}
        {/* ======================================================== */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-black uppercase text-slate-500 tracking-wider">
              Kurikulum Modul Video
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              6 Level • 19 Video
            </span>
          </div>

          <div className="space-y-2.5">
            {MODULES.map((mod) => {
              const isLocked = mod.proOnly && !hasAcademyAccess;
              const isSelected = activeModule.id === mod.id;
              const isDone = completedModules.includes(mod.id);

              return (
                <div
                  key={mod.id}
                  onClick={() => handleSelectModule(mod)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/60 shadow-sm ring-1 ring-emerald-500/30'
                      : isLocked
                      ? 'border-slate-200 bg-slate-50/70 hover:border-amber-300'
                      : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                        isSelected
                          ? 'bg-[#00A651] text-white'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        LEVEL {mod.level}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">{mod.duration}</span>
                    </div>

                    {isDone ? (
                      <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1 bg-emerald-100/80 px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3 text-[#00A651]" /> Lulus
                      </span>
                    ) : !mod.proOnly ? (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
                        GRATIS
                      </span>
                    ) : isLocked ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Rp 100K
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
                        TERBUKA
                      </span>
                    )}
                  </div>

                  <h3 className={`text-xs font-bold leading-snug ${isSelected ? 'text-emerald-950 font-extrabold' : 'text-slate-900'}`}>
                    {mod.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                    {mod.summary}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Film className="w-3 h-3 text-slate-400" />
                      {mod.lessons.length} Video Pelajaran
                    </span>
                    <span className="font-semibold text-emerald-700 flex items-center gap-0.5">
                      Lihat Materi <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: DUMMY VIDEO PLAYER & LESSON DETAILS (8 Cols)*/}
        {/* ======================================================== */}
        <div className="lg:col-span-8 space-y-4">
          {/* VIDEO PLAYER CONTAINER */}
          <div className="bg-slate-950 rounded-2xl overflow-hidden shadow-xl border border-slate-800 relative">
            {/* 16:9 Aspect Ratio Video Frame */}
            <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden select-none">
              {/* Animated/Simulated Candlestick & Trading Chart Background */}
              <div className="absolute inset-0 opacity-40 pointer-events-none">
                {/* Grid Lines */}
                <div className="w-full h-full grid grid-cols-6 grid-rows-4 divide-x divide-y divide-slate-800/60" />
                {/* Candlestick Wave Graphic Simulation */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 400">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00A651" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#00A651" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* EMA Line */}
                  <path
                    d="M 0,280 Q 200,120 400,240 T 800,140"
                    fill="none"
                    stroke="#00A651"
                    strokeWidth="2.5"
                    strokeDasharray={isPlaying ? 'none' : '4 4'}
                    className={isPlaying ? 'animate-pulse' : ''}
                  />
                  {/* Candlestick bodies */}
                  <g opacity="0.8">
                    {/* Bullish candles */}
                    <rect x="80" y="220" width="12" height="40" fill="#00A651" rx="1" />
                    <line x1="86" y1="210" x2="86" y2="270" stroke="#00A651" strokeWidth="1.5" />

                    <rect x="140" y="180" width="12" height="55" fill="#00A651" rx="1" />
                    <line x1="146" y1="170" x2="146" y2="245" stroke="#00A651" strokeWidth="1.5" />

                    {/* Bearish candle */}
                    <rect x="220" y="190" width="12" height="45" fill="#ef4444" rx="1" />
                    <line x1="226" y1="180" x2="226" y2="245" stroke="#ef4444" strokeWidth="1.5" />

                    {/* Bullish candles */}
                    <rect x="320" y="150" width="12" height="60" fill="#00A651" rx="1" />
                    <line x1="326" y1="140" x2="326" y2="220" stroke="#00A651" strokeWidth="1.5" />

                    <rect x="420" y="200" width="12" height="40" fill="#ef4444" rx="1" />
                    <line x1="426" y1="190" x2="426" y2="250" stroke="#ef4444" strokeWidth="1.5" />

                    <rect x="520" y="130" width="12" height="75" fill="#00A651" rx="1" />
                    <line x1="526" y1="120" x2="526" y2="215" stroke="#00A651" strokeWidth="1.5" />

                    <rect x="620" y="110" width="12" height="50" fill="#00A651" rx="1" />
                    <line x1="626" y1="95" x2="626" y2="170" stroke="#00A651" strokeWidth="1.5" />

                    <rect x="710" y="80" width="12" height="65" fill="#00A651" rx="1" />
                    <line x1="716" y1="70" x2="716" y2="155" stroke="#00A651" strokeWidth="1.5" />
                  </g>
                </svg>
              </div>

              {/* Top Watermark & Video Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] text-white/70 font-mono z-10 pointer-events-none">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A651] animate-ping" />
                  <span className="font-bold text-white tracking-wider">REALISTIS FX LMS</span>
                  <span className="text-white/40">|</span>
                  <span className="text-emerald-300">Level {activeModule.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/10 text-slate-300">
                    ID: {user.name ? user.name.toUpperCase() : 'TRADER'}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                    1080p HD
                  </span>
                </div>
              </div>

              {/* OVERLAY 1: IF MODULE IS LOCKED (User hasn't bought Rp 100k yet) */}
              {isModuleLocked ? (
                <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20 space-y-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/30 text-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/10 animate-bounce">
                    <Lock className="w-7 h-7" />
                  </div>

                  <div className="max-w-md space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                      ★ VIDEO MATERI EKSKLUSIF BERBAYAR
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white pt-1">
                      {currentLesson.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Video modul Level {activeModule.level} ({currentLesson.duration} Menit) dilengkapi studi kasus grafik live MT5 &amp; SOP Baku Anti-MC. Buka akses instan melalui QRIS.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
                    <button
                      onClick={() => openPaymentModal('EDUKASI')}
                      className="px-5 py-2.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-[#00A651]/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Buka Akses Video (Rp 100.000 Sekali Bayar)</span>
                    </button>
                    <span className="text-[11px] text-slate-400 font-medium">
                      ✓ Akses Seumur Hidup
                    </span>
                  </div>
                </div>
              ) : (
                /* OVERLAY 2: IF UNLOCKED OR LEVEL 0 (Active Video Player) */
                <div
                  onClick={handleTogglePlay}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                >
                  {/* Big Play Button in Center when paused or on hover */}
                  <div
                    className={`w-16 h-16 rounded-full bg-[#00A651]/90 hover:bg-[#00A651] text-white flex items-center justify-center shadow-2xl transition-all duration-200 transform ${
                      isPlaying
                        ? 'opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100'
                        : 'opacity-100 scale-100 hover:scale-110'
                    }`}
                  >
                    {isPlaying ? (
                      <Pause className="w-7 h-7 fill-white" />
                    ) : (
                      <Play className="w-7 h-7 fill-white ml-1" />
                    )}
                  </div>

                  {/* Playing Pulse Indicator in Bottom Left */}
                  {isPlaying && (
                    <div className="absolute bottom-16 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white text-xs">
                      <span className="w-2 h-2 rounded-full bg-[#00A651] animate-ping" />
                      <span className="font-semibold text-[11px]">Video Sedang Berputar (Dummy Demo)</span>
                    </div>
                  )}
                </div>
              )}

              {/* BOTTOM VIDEO CONTROL BAR */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-30 space-y-2">
                {/* Scrubbable Progress Bar */}
                <div
                  onClick={handleSeek}
                  className="relative w-full h-1.5 hover:h-2.5 bg-white/20 rounded-full cursor-pointer transition-all overflow-hidden group/bar"
                >
                  <div
                    className="h-full bg-[#00A651] rounded-full transition-all duration-150 relative"
                    style={{ width: `${progressVideoPct}%` }}
                  >
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Control Icons & Time */}
                <div className="flex items-center justify-between text-white text-xs">
                  {/* Left Controls: Play, Skip, Time */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleTogglePlay}
                      className="p-1 hover:text-[#00A651] transition-colors cursor-pointer"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>

                    <button
                      onClick={() => handleSkip(-10)}
                      className="p-1 hover:text-[#00A651] transition-colors cursor-pointer hidden sm:block"
                      title="Mundur 10 Detik"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleSkip(10)}
                      className="p-1 hover:text-[#00A651] transition-colors cursor-pointer hidden sm:block"
                      title="Maju 10 Detik"
                    >
                      <RotateCw className="w-4 h-4" />
                    </button>

                    {/* Time Counter */}
                    <div className="font-mono text-[11px] text-slate-300">
                      <span className="text-white font-bold">{formatTime(currentTimeSec)}</span>
                      <span className="text-slate-500 mx-1">/</span>
                      <span>{currentLesson.duration}</span>
                    </div>
                  </div>

                  {/* Right Controls: Speed, Volume, Fullscreen */}
                  <div className="flex items-center gap-2.5">
                    {/* Playback Speed Selector */}
                    <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded text-[11px] font-mono">
                      {[1, 1.25, 1.5, 2].map((spd) => (
                        <button
                          key={spd}
                          onClick={() => setPlaybackSpeed(spd)}
                          className={`px-1 rounded transition-colors cursor-pointer ${
                            playbackSpeed === spd ? 'text-[#00A651] font-bold underline' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>

                    {/* Volume Mute Toggle */}
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    {/* Fullscreen Toggle */}
                    <button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="p-1 text-slate-300 hover:text-white transition-colors cursor-pointer hidden sm:block"
                      title="Layar Penuh"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Title Bar under video player */}
            <div className="px-4 py-3 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00A651]" />
                <span className="text-slate-300 font-medium">Sedang Memutar:</span>
                <span className="text-white font-bold">{currentLesson.title}</span>
              </div>
              <span className="text-slate-400 text-[11px] font-mono">
                Pelajaran {activeLessonIndex + 1} dari {activeModule.lessons.length}
              </span>
            </div>
          </div>

          {/* LESSON DETAILS & ACTION CONTROLS */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
            {/* Top Row: Title, Duration & Complete Check */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-50 text-[#00A651] border border-emerald-200">
                    LEVEL {activeModule.level}
                  </span>
                  <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> {currentLesson.duration} Menit
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  {currentLesson.title}
                </h2>
              </div>

              {/* Action Buttons: Mark Done & Next */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleToggleLessonDone}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                    isLessonDone
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isLessonDone ? 'text-[#00A651]' : 'text-slate-400'}`} />
                  <span>{isLessonDone ? 'Telah Selesai ✓' : 'Tandai Selesai'}</span>
                </button>

                <button
                  onClick={handleNextLesson}
                  className="px-3.5 py-2 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                >
                  <span>Lanjut Video</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Interactive Tabs: Notes / Key Points / Playlist */}
            <div className="flex border-b border-slate-200 gap-4 text-xs font-bold">
              <button
                onClick={() => setActiveTab('notes')}
                className={`pb-2 transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'notes'
                    ? 'border-[#00A651] text-[#00A651]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Ringkasan Materi</span>
              </button>

              <button
                onClick={() => setActiveTab('keypoints')}
                className={`pb-2 transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'keypoints'
                    ? 'border-[#00A651] text-[#00A651]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Poin Penting SOP ({currentLesson.keyPoints.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('playlist')}
                className={`pb-2 transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'playlist'
                    ? 'border-[#00A651] text-[#00A651]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>Daftar Video Modul ({activeModule.lessons.length})</span>
              </button>
            </div>

            {/* TAB 1: NOTES */}
            {activeTab === 'notes' && (
              <div className="space-y-3.5 pt-1">
                <p className="text-xs text-slate-700 leading-relaxed">
                  {currentLesson.description}
                </p>

                {/* Download SOP button */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-emerald-100 text-[#00A651]">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        Rangkuman SOP &amp; Lembar Praktik PDF
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Dokumen panduan teknikal &amp; checklist entry sesuai video ini
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleDownloadDummySop}
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-[#00A651]" />
                    <span>Download SOP PDF</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: KEY POINTS */}
            {activeTab === 'keypoints' && (
              <div className="space-y-2 pt-1">
                <span className="text-xs font-semibold text-slate-500 block mb-1">
                  Poin Kunci &amp; Aturan yang Wajib Diingat:
                </span>
                {currentLesson.keyPoints.map((point, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#00A651] shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-medium">{point}</span>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: PLAYLIST */}
            {activeTab === 'playlist' && (
              <div className="space-y-2 pt-1">
                {activeModule.lessons.map((les, lIdx) => {
                  const isCurrent = lIdx === activeLessonIndex;
                  const isLocked = activeModule.proOnly && !hasAcademyAccess;
                  const isDone = completedLessons.includes(`${activeModule.id}_${les.id}`);

                  return (
                    <div
                      key={les.id}
                      onClick={() => handleSelectLesson(lIdx)}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {isLocked ? (
                          <Lock className="w-4 h-4 text-amber-600 shrink-0" />
                        ) : isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-[#00A651] shrink-0" />
                        ) : (
                          <PlayCircle className={`w-4 h-4 shrink-0 ${isCurrent ? 'text-[#00A651]' : 'text-slate-400'}`} />
                        )}
                        <span className="truncate">{les.title}</span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 text-slate-500 font-mono text-[11px]">
                        <span>{les.duration}</span>
                        {isCurrent && (
                          <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-[#00A651] text-white">
                            Aktif
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
