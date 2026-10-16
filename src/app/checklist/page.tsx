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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Anti-FOMO SOP Checklist
            </h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Prosedur standar operasional (SOP) pra-eksekusi order untuk memproteksi trader dari jebakan impulsif.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset SOP Harian
        </button>
      </div>

      {/* Strict Mode Toggle Box (Pro Feature) */}
      <div className="glass-panel rounded-2xl p-5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Mode Ketat Anti-FOMO (Strict Lock)
            </h3>
            {isPro ? (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                PRO FITUR
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                KHUSUS PRO
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 max-w-xl">
            Jika diaktifkan, kalkulator lot di menu utama akan <span className="text-amber-400 font-semibold">terkunci otomatis</span> jika 6 poin checklist di bawah ini belum dicentang secara lengkap.
          </p>
        </div>

        {isPro ? (
          <button
            onClick={toggleStrictMode}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
              user.strictModeEnabled
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-800 text-slate-400'
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
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold border border-amber-500/30 flex items-center gap-1.5 cursor-pointer"
          >
            <Crown className="w-4 h-4 text-emerald-400" /> Buka Mode Ketat (PRO)
          </button>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="glass-panel rounded-2xl p-5 border border-white/10 flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs text-slate-400">Status Validasi SOP Anda:</span>
          <div className="text-lg font-bold text-white flex items-center gap-2">
            <span>{completedCount} dari 6 Aturan Terverifikasi</span>
            {isFullyPassed && (
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                100% Lulus SOP
              </span>
            )}
          </div>
        </div>

        <div className="w-48 bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              isFullyPassed ? 'bg-emerald-400' : 'bg-blue-500'
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
              className={`glass-panel p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                isDone
                  ? 'border-emerald-500/40 bg-emerald-950/15'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className="mt-0.5">
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => toggleCheck(item.key)}
                  className="w-5 h-5 rounded text-emerald-500 bg-slate-900 border-white/20 focus:ring-0 cursor-pointer"
                />
              </div>

              <div className="space-y-1 flex-1">
                <h3
                  className={`text-sm font-bold ${
                    isDone ? 'text-emerald-300' : 'text-white'
                  }`}
                >
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>

              {isDone && (
                <span className="text-emerald-400 font-bold text-xs flex items-center gap-1 flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4" /> Lulus
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom CTA to Calculator */}
      <div className="pt-4 flex justify-between items-center">
        <p className="text-xs text-slate-400">
          Disiplin adalah satu-satunya pelindung modal retail trader di pasar forex.
        </p>

        <Link
          href="/calculator"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
        >
          Lanjut ke Kalkulator Lot Aman <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
