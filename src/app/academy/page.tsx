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
  ChevronRight
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
    id: 'm1',
    level: 1,
    title: 'Fondasi Money Management & Aturan 1-2% Modal',
    duration: '45 Menit',
    summary: 'Memahami cara kerja leverage broker, margin, dan kenapa 90% retail trader bangkrut karena over-lot.',
    isCompleted: true,
    proOnly: false, // Free tier module
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
  const { user, setTier, openPaymentModal } = useUser();
  const isPro = user.tier === 'PRO';

  const [activeModule, setActiveModule] = useState<AcademyModule>(MODULES[0]);

  const completedCount = MODULES.filter((m) => m.isCompleted).length;
  const progressPercent = Math.round((completedCount / MODULES.length) * 100);

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
            Modul edukasi terstruktur dari dasar hingga mahir untuk membentuk pola pikir trader mandiri bebas MC.
          </p>
        </div>

        {!isPro && (
          <button
            onClick={openPaymentModal}
            className="px-3.5 py-2 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
          >
            <Crown className="w-3.5 h-3.5" /> Buka Semua Modul (PRO VIP Rp500k)
          </button>
        )}
      </div>

      {/* Progress Bar Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs text-slate-500">Kemajuan Belajar Anda:</div>
          <div className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>{completedCount} dari 5 Modul Selesai ({progressPercent}%)</span>
            {completedCount >= 1 && (
              <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                Level 1 Lulus
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
            const isLocked = mod.proOnly && !isPro;
            const isSelected = activeModule.id === mod.id;

            return (
              <div
                key={mod.id}
                onClick={() => !isLocked && setActiveModule(mod)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                    : isLocked
                    ? 'border-slate-200 bg-slate-50 opacity-75'
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

                  {mod.isCompleted ? (
                    <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
                    </span>
                  ) : mod.proOnly ? (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        isPro ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {isPro ? 'PRO' : 'PRO ONLY'}
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      FREE TIER
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-900 mb-1">{mod.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{mod.summary}</p>

                {isLocked && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-amber-700 font-semibold">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Terkunci untuk Akun Free (Upgrade ke PRO VIP Rp500k)</span>
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

            <div className="border-t border-slate-100 pt-4 space-y-2.5">
              <span className="text-xs font-semibold text-slate-500 block">Daftar Materi:</span>
              {activeModule.lessons.map((lesson, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 text-xs text-slate-800"
                >
                  <PlayCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{lesson}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button className="w-full py-2.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm hover:shadow transition-all cursor-pointer">
                <PlayCircle className="w-4 h-4" /> Mulai Pelajari Modul
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
