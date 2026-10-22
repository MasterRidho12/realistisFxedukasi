'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldCheck,
  Crown,
  Sparkles,
  Lock,
  ArrowRight,
  Calculator,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';
import { useUser } from '@/context/UserContext';

export default function MarginResistancePage() {
  const { user, openPaymentModal, marketPrice } = useUser();
  const isPro = user.tier === 'PRO';

  // Calculator inputs
  const [equity, setEquity] = useState<number>(500);
  const [activeLots, setActiveLots] = useState<number>(0.20);
  const [currentPrice, setCurrentPrice] = useState<number>(marketPrice?.price ?? 4176.50);
  const [positionDirection, setPositionDirection] = useState<'BUY' | 'SELL'>('BUY');
  const [leverage, setLeverage] = useState<number>(100);

  // Math logic:
  // Margin per lot = (Contract Size * Price) / Leverage
  // Standard gold lot contract size = 100 oz
  // 1 pip on 1 standard lot = $10. On 0.20 lot = $2.00 per pip.
  // Pips to MC = Equity / (activeLots * $10)
  const pipValue = activeLots * 10;
  const pipsToMarginCall = pipValue > 0 ? Math.round(equity / pipValue) : 9999;

  // Price at MC:
  // For BUY: MC happens when price drops by (pipsToMarginCall * 0.10)
  // For SELL: MC happens when price rises by (pipsToMarginCall * 0.10)
  const priceMoveToMC = pipsToMarginCall * 0.10;
  const mcPrice =
    positionDirection === 'BUY'
      ? Math.max(0, Math.round((currentPrice - priceMoveToMC) * 100) / 100)
      : Math.round((currentPrice + priceMoveToMC) * 100) / 100;

  // Danger rating
  let statusColor = 'text-[#00A651] bg-emerald-50 border-emerald-200';
  let statusText = 'ZONA AMAN (Ketahanan Modal Baik)';
  if (pipsToMarginCall < 150) {
    statusColor = 'text-rose-700 bg-rose-50 border-rose-200';
    statusText = 'BAHAYA KRITIS! POTENSI MARGIN CALL SANGAT TINGGI';
  } else if (pipsToMarginCall < 300) {
    statusColor = 'text-amber-800 bg-amber-50 border-amber-200';
    statusText = 'ZONA WASPADA (Over-lot Ringan)';
  }

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-rose-50 text-rose-600 border border-rose-200">
              <AlertTriangle className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Margin Resistance Calculator (Anti-MC Defense)
            </h1>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl font-normal">
            Hitung di harga persis berapa akun Anda akan terkena Margin Call (MC) otomatis oleh broker saat floating minus.
          </p>
        </div>

        {!isPro ? (
          <button
            onClick={openPaymentModal}
            className="px-4 py-2.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#00A651]/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Crown className="w-3.5 h-3.5" /> Buka Fitur Anti-MC (PRO)
          </button>
        ) : (
          <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[#00A651] text-xs font-bold flex items-center gap-1.5">
            <Crown className="w-4 h-4 text-[#00A651]" /> SIMULATOR MC PRO AKTIF
          </div>
        )}
      </div>

      {/* Pro Lock Overlay if Free */}
      {!isPro ? (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center max-w-xl mx-auto space-y-4 my-8 shadow-sm">
          <div className="inline-flex p-4 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Kalkulator Ketahanan Margin (Anti-MC) Khusus Member PRO
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            Mengetahui titik harga pasti likuidasi Margin Call menyelamatkan ribuan trader dari kehancuran modal akun. Upgrade ke PRO hanya <span className="text-[#00A651] font-bold">Rp50.000 / bulan</span>.
          </p>
          <button
            onClick={openPaymentModal}
            className="px-5 py-3 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs shadow-md shadow-[#00A651]/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            Upgrade ke PRO Rp50k Sekarang
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Input Panel (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Parameter Posisi Aktif Saat Ini
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Arah Posisi Floating
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPositionDirection('BUY')}
                    className={`py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                      positionDirection === 'BUY'
                        ? 'bg-[#00A651] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    BUY (Long)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPositionDirection('SELL')}
                    className={`py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                      positionDirection === 'SELL'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    SELL (Short)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Total Lot Terbuka
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={activeLots}
                  onChange={(e) => setActiveLots(Number(e.target.value) || 0.01)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono font-bold text-sm focus:bg-white focus:border-[#00A651] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Sisa Modal / Equity ($ USD)
              </label>
              <input
                type="number"
                value={equity}
                onChange={(e) => setEquity(Number(e.target.value) || 0)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono font-bold text-sm focus:bg-white focus:border-[#00A651] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Harga Posisi Entry / Pasar Saat Ini (XAU/USD)
              </label>
              <input
                type="number"
                step="0.10"
                value={currentPrice}
                onChange={(e) => setCurrentPrice(Number(e.target.value) || 0)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono font-bold text-sm focus:bg-white focus:border-[#00A651] focus:outline-none"
              />
            </div>
          </div>

          {/* Results Panel (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 relative overflow-hidden shadow-xs">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block mb-2">
                HASIL PREDIKSI TITIK MARGIN CALL
              </span>

              {/* MC Price Large Display */}
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-center my-3">
                <span className="text-[11px] text-slate-600 font-medium block mb-1">
                  AKUN AKAN MARGIN CALL (MC) DI HARGA:
                </span>
                <div className="text-4xl font-black font-mono text-rose-600 tracking-tight">
                  {mcPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <span className="text-xs text-slate-600 mt-1 block font-mono font-semibold">
                  Ketahanan: {pipsToMarginCall} Pips Floating
                </span>
              </div>

              {/* Status Indicator */}
              <div className={`p-3 rounded-xl border text-xs font-bold text-center ${statusColor}`}>
                {statusText}
              </div>

              {/* Advice */}
              <div className="mt-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 font-normal">
                <p>
                  Jika pergerakan harga melawan arah sebesar <span className="font-mono font-bold text-amber-700">{priceMoveToMC.toFixed(2)} poin</span>, broker akan melakukan stop-out paksa. Segera pasang batasan Stop Loss rasional sebelum terlambat!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
