'use client';

import React, { useState } from 'react';
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
  Coins
} from 'lucide-react';
import { useUser } from '@/context/UserContext';

interface AcademyModule {
  id: string;
  level: number;
  title: string;
  duration: string;
  summary: string;
  isCompleted: boolean;
  proOnly: boolean;
  lessons: string[];
}

const MODULES: AcademyModule[] = [
  {
    id: 'm0',
    level: 0,
    title: 'Dasar-Dasar Forex untuk Pemula',
    duration: '35 Menit',
    summary: 'Pengenalan pasar forex, cara kerja transaksi mata uang, istilah pips, lot, leverage, dan membaca candlestick.',
    isCompleted: false,
    proOnly: false, // GRATIS UNTUK SEMUA TRADER
    lessons: [
      'Pelajaran 1: Apa itu Pasar Forex & Cara Kerja Transaksi Pasangan Mata Uang',
      'Pelajaran 2: Memahami Istilah Wajib (Pips, Spread, Lot, dan Leverage)',
      'Pelajaran 3: Cara Membaca Candlestick, Trend Bullish & Bearish',
      'Pelajaran 4: Manajemen Akun & Mengenal Software Trading (MT5 & TradingView)',
    ],
  },
  {
    id: 'm1',
    level: 1,
    title: 'Fondasi Money Management & Aturan 1-2% Modal',
    duration: '45 Menit',
    summary: 'Memahami cara kerja leverage broker, margin, dan kenapa 90% retail trader bangkrut karena over-lot.',
    isCompleted: false,
    proOnly: true, // Paket Edukasi 100k
    lessons: [
      'Pelajaran 1: Mengapa Over-lot Membunuh Akun Anda',
      'Pelajaran 2: Menghitung Nilai Pips dan Leverage Nyata',
      'Pelajaran 3: Menghindari Margin Call dengan SOP 1% Modal',
    ],
  },
  {
    id: 'm2',
    level: 2,
    title: 'Struktur Market & Key Level Support / Resistance',
    duration: '60 Menit',
    summary: 'Mengidentifikasi area pantulan probabilitas tinggi pada timeframe H1 dan H4 tanpa indikator berlebih.',
    isCompleted: false,
    proOnly: true,
    lessons: [
      'Pelajaran 1: Membaca Market Structure (Higher High & Lower Low)',
      'Pelajaran 2: Menggambar Supply & Demand Zone yang Valid',
      'Pelajaran 3: Teknik Breakout Retest Konfirmasi Candle',
    ],
  },
  {
    id: 'm3',
    level: 3,
    title: 'Psikologi Anti-FOMO & Melawan Revenge Trading',
    duration: '50 Menit',
    summary: 'Membangun disiplin trading layaknya robot eksekusi, bebas dari ketakutan rugi dan keserakahan.',
    isCompleted: false,
    proOnly: true,
    lessons: [
      'Pelajaran 1: Mengapa Otak Manusia Rentan Terhadap FOMO',
      'Pelajaran 2: Menghentikan Siklus Dendam (Revenge Trading)',
      'Pelajaran 3: SOP Evaluasi Jurnal Psikologis Harian',
    ],
  },
  {
    id: 'm4',
    level: 4,
    title: 'Strategi Menghadapi Berita Volatil (NFP & CPI)',
    duration: '75 Menit',
    summary: 'Cara membaca skenario 2 arah rilis data ekonomi berdampak tinggi tanpa terseret false breakout.',
    isCompleted: false,
    proOnly: true,
    lessons: [
      'Pelajaran 1: Anatomi Volatilitas News High-Impact',
      'Pelajaran 2: Eksekusi Skenario Bullish vs Bearish',
      'Pelajaran 3: Menghindari Slippage dan Spread Melebar',
    ],
  },
  {
    id: 'm5',
    level: 5,
    title: 'Master Realistis Trader & Sertifikasi Disiplin',
    duration: '90 Menit',
    summary: 'Rencana jangka panjang menuju konsistensi profit, compounding modal, dan manajemen penarikan profit.',
    isCompleted: false,
    proOnly: true,
    lessons: [
      'Pelajaran 1: Rencana Compounding 12 Bulan Terukur',
      'Pelajaran 2: Manajemen Penarikan (Withdrawal Routine)',
      'Pelajaran 3: Ujian Akhir SOP & Sertifikat Kelulusan RealistisFx',
    ],
  },
];

export default function AcademyPage() {
  const { user, openPaymentModal } = useUser();
  const isPro = user.tier === 'PRO';
  const hasAcademyAccess = isPro || Boolean(user.hasAcademyAccess);

  const [activeModule, setActiveModule] = useState<AcademyModule>(MODULES[0]);
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  const completedCount = completedModules.length;
  const progressPercent = Math.round((completedCount / MODULES.length) * 100);

  const handleToggleComplete = (modId: string) => {
    const mod = MODULES.find((m) => m.id === modId);
    if (mod?.proOnly && !hasAcademyAccess) {
      openPaymentModal('EDUKASI');
      return;
    }
    setCompletedModules((prev) =>
      prev.includes(modId) ? prev.filter((id) => id !== modId) : [...prev, modId]
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200">
              <GraduationCap className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Gamified Academy — Kurikulum Trader Realistis
            </h1>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl">
            Modul Dasar-Dasar Forex Gratis untuk pemula &amp; Modul Lanjutan Level 1-5 SOP Anti-MC untuk trader mandiri.
          </p>
        </div>

        {!hasAcademyAccess ? (
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => openPaymentModal('EDUKASI')}
              className="px-4 py-2.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-extrabold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" /> Beli Paket Edukasi Lengkap (Rp 100.000)
            </button>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-[#00A651]" />
            <span>Akses Edukasi Terbuka Penuh</span>
          </div>
        )}
      </div>

      {/* Notice Banner */}
      {!hasAcademyAccess && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-[#00A651] text-white shadow-sm shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-black uppercase text-emerald-950 tracking-wider">
                  Modul Dasar Forex Gratis • Modul Lanjutan Level 1-5 (Rp 100.000)
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 border border-emerald-300">
                  SEKALI BAYAR SEUMUR HIDUP
                </span>
              </div>
              <p className="text-xs text-slate-700 mt-1 max-w-2xl leading-relaxed">
                Anda dapat mempelajari materi <strong>Dasar-Dasar Forex gratis</strong>. Untuk membuka seluruh 5 modul lanjutan (SOP Money Management 1%, Fixed SL 30 Pips, Supply-Demand Zone, dan Ujian Sertifikasi), aktifkan Paket Edukasi Realistis hanya Rp 100.000 via QRIS.
              </p>
            </div>
          </div>
          <button
            onClick={() => openPaymentModal('EDUKASI')}
            className="shrink-0 px-4 py-2.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#00A651]/20 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" /> Beli Akses Edukasi (Rp 100k)
          </button>
        </div>
      )}

      {/* Progress Bar Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs text-slate-500">Kemajuan Belajar Anda:</div>
          <div className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>{completedCount} dari 5 Modul Selesai ({progressPercent}%)</span>
            {completedCount >= 1 && (
              <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                Level {completedCount} Lulus
              </span>
            )}
          </div>
        </div>

        <div className="w-full sm:w-64 bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
          <div
            className="h-full bg-[#00A651] rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Modules List & Active Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Module Nav Cards (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          {MODULES.map((mod) => {
            const isLocked = mod.proOnly && !hasAcademyAccess;
            const isSelected = activeModule.id === mod.id;
            const isDone = completedModules.includes(mod.id);

            return (
              <div
                key={mod.id}
                onClick={() => {
                  setActiveModule(mod);
                  if (isLocked) {
                    openPaymentModal('EDUKASI');
                  }
                }}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                    : isLocked
                    ? 'border-slate-200 bg-slate-50/80 hover:border-amber-300'
                    : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      LEVEL {mod.level}
                    </span>
                    <span className="text-xs text-slate-500">{mod.duration}</span>
                  </div>

                  {isDone ? (
                    <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
                    </span>
                  ) : !mod.proOnly ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
                      GRATIS (TERBUKA)
                    </span>
                  ) : isLocked ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> EDUKASI (Rp 100K)
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
                      TERBUKA
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-900 mb-1">{mod.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{mod.summary}</p>

                {isLocked && (
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-700 font-semibold">
                    <Lock className="w-3.5 h-3.5 shrink-0" />
                    <span>Terkunci — Butuh Paket Edukasi Rp 100.000 (Sekali Bayar)</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Active Module Lesson Viewer (5 Cols) */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm sticky top-24 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
              <BookOpen className="w-4 h-4" /> Detail Materi Modul
            </div>

            <h2 className="text-base font-extrabold text-slate-900">{activeModule.title}</h2>
            <p className="text-xs text-slate-600 leading-relaxed">{activeModule.summary}</p>

            {/* Paywall Container if Locked */}
            {activeModule.proOnly && !hasAcademyAccess ? (
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900">Materi Edukasi Lanjutan Terkunci</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Modul Level 1 sampai 5 (SOP Anti-Margin Call &amp; Ujian Sertifikasi) memerlukan <strong className="text-slate-900">Paket Edukasi Realistis (Rp 100.000 sekali bayar seumur hidup)</strong>. Buka akses instan melalui QRIS.
                  </p>
                </div>
                <div className="pt-1">
                  <button
                    onClick={() => openPaymentModal('EDUKASI')}
                    className="w-full py-3 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#00A651]/20 cursor-pointer transition-all"
                  >
                    <Sparkles className="w-4 h-4" /> Buka Akses Edukasi (Rp 100.000)
                  </button>
                </div>
              </div>
            ) : null}

            {/* Lesson list */}
            <div className="border-t border-slate-100 pt-4 space-y-2.5">
              <span className="text-xs font-semibold text-slate-500 block">Daftar Materi:</span>
              {activeModule.lessons.map((lesson, idx) => {
                const isLessonLocked = activeModule.proOnly && !hasAcademyAccess;
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs transition-colors ${
                      isLessonLocked
                        ? 'bg-slate-50 border-slate-200 text-slate-500'
                        : 'bg-slate-50 hover:bg-emerald-50/50 border-slate-200 text-slate-800'
                    }`}
                  >
                    {isLessonLocked ? (
                      <Lock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    ) : (
                      <PlayCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    )}
                    <span className="flex-1">{lesson}</span>
                  </div>
                );
              })}
            </div>

            {hasAcademyAccess && (
              <div className="pt-2 space-y-2">
                <button className="w-full py-2.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm hover:shadow transition-all cursor-pointer">
                  <PlayCircle className="w-4 h-4" /> Mulai Pelajari Modul
                </button>
                <button
                  onClick={() => handleToggleComplete(activeModule.id)}
                  className={`w-full py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    completedModules.includes(activeModule.id)
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>
                    {completedModules.includes(activeModule.id)
                      ? 'Tandai Belum Selesai'
                      : 'Tandai Modul Selesai'}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
