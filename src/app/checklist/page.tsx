'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Unlock,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  Crown,
  Sparkles
} from 'lucide-react';
import { useUser } from '@/context/UserContext';

export default function ChecklistPage() {
  const { user, setTier, toggleStrictMode, setChecklistPassed } = useUser();
  const isPro = user.tier === 'PRO';

  const [checks, setChecks] = useState({
    news: false,
    sr: false,
    lot: false,
    rr: false,
    emotion: false,
    spread: false,
  });

  const toggleCheck = (key: keyof typeof checks) => {
    const nextChecks = { ...checks, [key]: !checks[key] };
    setChecks(nextChecks);

    const allCompleted = Object.values(nextChecks).every(Boolean);
    setChecklistPassed(allCompleted);
  };

  const handleReset = () => {
    const resetState = {
      news: false,
      sr: false,
      lot: false,
      rr: false,
      emotion: false,
      spread: false,
    };
    setChecks(resetState);
    setChecklistPassed(false);
  };

  const completedCount = Object.values(checks).filter(Boolean).length;
  const isFullyPassed = completedCount === 6;

  const sopItems = [
    {
      key: 'news' as const,
      title: '1. Pengecekan Berita High-Impact (NFP / CPI / FOMC)',
      desc: 'Pastikan tidak ada berita berdampak tinggi dalam rentang 30 menit sebelum atau sesudah entry yang dapat memicu slippage parah.',
    },
    {
      key: 'sr' as const,
      title: '2. Konfirmasi Level Support & Resistance (Timeframe H1 / H4)',
      desc: 'Hanya lakukan entry di area pantulan atau breakout retest yang terkonfirmasi, jangan pernah masuk di tengah-tengah rentang sideways.',
    },
    {
      key: 'lot' as const,
      title: '3. Perhitungan Lot Aman (Maksimal 1% - 2% Risiko Modal)',
      desc: 'Gunakan Risk & Lot Calculator. Jangan pernah menggunakan lot berdasarkan intuisi atau ingin cepat melipatgandakan saldo.',
    },
    {
      key: 'rr' as const,
      title: '4. Rasio Risk to Reward (Minimal 1:2)',
      desc: 'Jika potensi profit lebih kecil dari jarak Stop Loss, batalkan setup tersebut. Pertahankan expectancy positif.',
    },
    {
      key: 'emotion' as const,
      title: '5. Kontrol Psikologis Bebas FOMO & Revenge Trading',
      desc: 'Kondisi pikiran tenang, tidak sedang terburu-buru mengejar candle yang sudah melesat, dan tidak sedang ingin membalas kekalahan sebelumnya.',
    },
    {
      key: 'spread' as const,
      title: '6. Evaluasi Spread Broker & Waktu Sesi Pasar',
      desc: 'Hindari open posisi saat pergantian hari (rollover 04:00 - 05:00 WIB) saat spread melebar secara tidak wajar.',
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Anti-FOMO SOP Checklist
            </h1>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl">
            Prosedur standar operasional (SOP) pra-eksekusi order untuk memproteksi trader dari jebakan impulsif.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset SOP Harian
        </button>
      </div>

      {/* Strict Mode Toggle Box (Pro Feature) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Mode Ketat Anti-FOMO (Strict Lock)
            </h3>
            {isPro ? (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                PRO FITUR
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                KHUSUS PRO
              </span>
            )}
          </div>
          <p className="text-xs text-slate-600 max-w-xl">
            Jika diaktifkan, kalkulator lot di menu utama akan <span className="text-amber-700 font-semibold">terkunci otomatis</span> jika 6 poin checklist di bawah ini belum dicentang secara lengkap.
          </p>
        </div>

        {isPro ? (
          <button
            onClick={toggleStrictMode}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
              user.strictModeEnabled
                ? 'bg-[#00A651] text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            {user.strictModeEnabled ? (
              <>
                <Lock className="w-4 h-4" /> Mode Ketat AKTIF
              </>
            ) : (
              <>
                <Unlock className="w-4 h-4" /> Mode Ketat NONAKTIF
              </>
            )}
          </button>
        ) : (
          <button
            onClick={() => setTier('PRO')}
            className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-300 flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Crown className="w-4 h-4 text-amber-600" /> Buka Mode Ketat (PRO)
          </button>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <span className="text-xs text-slate-500">Status Validasi SOP Anda:</span>
          <div className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 flex-wrap">
            <span>{completedCount} dari 6 Aturan Terverifikasi</span>
            {isFullyPassed && (
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                100% Lulus SOP
              </span>
            )}
          </div>
        </div>

        <div className="w-full sm:w-48 bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              isFullyPassed ? 'bg-[#00A651]' : 'bg-emerald-400'
            }`}
            style={{ width: `${(completedCount / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* Checklist SOP Cards */}
      <div className="space-y-3">
        {sopItems.map((item) => {
          const isDone = checks[item.key];
          return (
            <div
              key={item.key}
              onClick={() => toggleCheck(item.key)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                isDone
                  ? 'border-emerald-400 bg-emerald-50/60 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-xs'
              }`}
            >
              <div className="mt-0.5">
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => toggleCheck(item.key)}
                  className="w-5 h-5 rounded text-[#00A651] border-slate-300 focus:ring-emerald-500 cursor-pointer accent-[#00A651]"
                />
              </div>

              <div className="space-y-1 flex-1">
                <h3
                  className={`text-sm font-bold ${
                    isDone ? 'text-emerald-800' : 'text-slate-900'
                  }`}
                >
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>

              {isDone && (
                <span className="text-emerald-700 font-bold text-xs flex items-center gap-1 flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Lulus
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom CTA to Calculator */}
      <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-xs text-slate-500">
          Disiplin adalah satu-satunya pelindung modal retail trader di pasar forex.
        </p>

        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm hover:shadow transition-all w-fit"
        >
          Lanjut ke Beranda &amp; EA Breakout <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
