'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  AlertTriangle,
  Crown,
  Sparkles,
  Calculator,
  Lock,
  ArrowRight,
  ShieldAlert,
  Percent
} from 'lucide-react';
import { useUser } from '@/context/UserContext';

export default function CompoundingPage() {
  const { user, setTier } = useUser();
  const isPro = user.tier === 'PRO';

  // Compounding parameters
  const [initialCapital, setInitialCapital] = useState(1000);
  const [monthlyGrowthRate, setMonthlyGrowthRate] = useState(6);
  const [durationMonths, setDurationMonths] = useState(12);

  // Recovery drawdown input
  const [drawdownLossPercent, setDrawdownLossPercent] = useState(20);

  // Recovery Math: Required Gain = (Loss / (100 - Loss)) * 100
  const requiredGain =
    drawdownLossPercent < 100
      ? (drawdownLossPercent / (100 - drawdownLossPercent)) * 100
      : 9999;

  // Monthly Compounding Projections
  const projections = [];
  let currentBalance = initialCapital;
  for (let m = 1; m <= durationMonths; m++) {
    const profit = currentBalance * (monthlyGrowthRate / 100);
    currentBalance += profit;
    projections.push({
      month: m,
      profit: Math.round(profit * 100) / 100,
      balance: Math.round(currentBalance * 100) / 100,
    });
  }

  const finalBalance = Math.round(currentBalance * 100) / 100;
  const netProfit = Math.round((finalBalance - initialCapital) * 100) / 100;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Recovery & Compounding Calculator (Kalkulator Pemulihan & Pertumbuhan)
            </h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Simulasi matematis target profit realistis dan fakta psikologis pemulihan kerugian (Drawdown Math).
          </p>
        </div>

        {!isPro ? (
          <button
            onClick={() => setTier('PRO')}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs flex items-center gap-1.5"
          >
            <Crown className="w-3.5 h-3.5" /> Buka Akses PRO
          </button>
        ) : (
          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
            <Crown className="w-4 h-4" /> PRO PLANNER AKTIF
          </div>
        )}
      </div>

      {/* Part 1: Drawdown Recovery Reality Check */}
      <div className="glass-panel rounded-2xl p-6 border border-rose-500/30 bg-rose-950/10 space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Fakta Matematika Kerugian (Drawdown Recovery Reality)
          </h2>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          Banyak trader retail tidak menyadari bahwa semakin besar akun mengalami minus (floating loss), semakin mustahil secara psikologis dan matematis untuk kembali modal. Itulah alasan <span className="text-rose-400 font-bold">Stop Loss</span> wajib dipasang!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-semibold">Tingkat Kerugian Akun (Drawdown):</span>
              <span className="font-mono font-bold text-rose-400">{drawdownLossPercent}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="90"
              step="5"
              value={drawdownLossPercent}
              onChange={(e) => setDrawdownLossPercent(Number(e.target.value))}
              className="w-full accent-rose-500 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>10% Loss</span>
              <span>50% Loss</span>
              <span>90% Loss</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 flex flex-col justify-center">
            <span className="text-[11px] text-slate-400 font-semibold mb-1">
              PROFIT YANG DIBUTUHKAN UNTUK KEMBALI BALIK MODAL:
            </span>
            <div className="text-3xl font-black font-mono text-amber-400">
              +{requiredGain.toFixed(1)}%
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {drawdownLossPercent <= 20
                ? 'Zona Terkendali: Modal masih mudah dipulihkan dengan SOP lot aman.'
                : drawdownLossPercent <= 50
                ? 'Zona Bahaya: Butuh profit 100% hanya untuk balik ke titik impas modal.'
                : 'Zona Kritis / Margin Call: Secara psikologis akun hampir mustahil diselamatkan tanpa deposit baru.'}
            </p>
          </div>
        </div>
      </div>

      {/* Part 2: Compounding Realistic Growth Planner */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Simulasi Compounding Realistis (Bunga Berbunga)
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">Target: 5% - 8% / Bulan</span>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Modal Awal ($ USD)
            </label>
            <input
              type="number"
              value={initialCapital}
              onChange={(e) => setInitialCapital(Number(e.target.value) || 0)}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-mono font-bold text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Target Profit Realistis / Bulan (%)
            </label>
            <input
              type="number"
              step="0.5"
              value={monthlyGrowthRate}
              onChange={(e) => setMonthlyGrowthRate(Number(e.target.value) || 0)}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-mono font-bold text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Jangka Waktu (Bulan)
            </label>
            <input
              type="number"
              min="1"
              max="36"
              value={durationMonths}
              onChange={(e) => setDurationMonths(Number(e.target.value) || 1)}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-mono font-bold text-sm"
            />
          </div>
        </div>

        {/* Summary Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950/60 border border-white/5 text-center">
          <div>
            <span className="text-[11px] text-slate-400">Modal Awal</span>
            <div className="text-lg font-bold font-mono text-white">${initialCapital}</div>
          </div>
          <div>
            <span className="text-[11px] text-slate-400">Total Keuntungan Bersih</span>
            <div className="text-lg font-bold font-mono text-emerald-400">+${netProfit}</div>
          </div>
          <div>
            <span className="text-[11px] text-slate-400">Estimasi Saldo Akhir</span>
            <div className="text-xl font-black font-mono text-emerald-400">${finalBalance}</div>
          </div>
        </div>

        {/* Projections Table */}
        <div className="overflow-x-auto max-h-72 overflow-y-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 bg-slate-900/60 sticky top-0">
                <th className="p-3">Bulan ke-</th>
                <th className="p-3">Pertumbuhan Profit Bulan Ini</th>
                <th className="p-3">Akumulasi Saldo Akhir</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projections.map((p) => (
                <tr key={p.month} className="hover:bg-white/5 font-mono">
                  <td className="p-3 text-slate-300">Bulan #{p.month}</td>
                  <td className="p-3 text-emerald-400">+${p.profit}</td>
                  <td className="p-3 font-bold text-white">${p.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
