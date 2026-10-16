'use client';

import React from 'react';
import {
  LineChart,
  Crown,
  Lock,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Target,
  ArrowRight
} from 'lucide-react';
import { useUser } from '@/context/UserContext';

const WATCHLIST_DATA = [
  {
    pair: 'XAUUSD (Gold)',
    bias: 'BULLISH CONTINUATION',
    support: '2,668.00 - 2,672.00',
    resistance: '2,710.00 - 2,715.00',
    buyZone: '2,674.00 - 2,678.00 (Retest Area Demand H4)',
    sellZone: '2,708.00 - 2,712.00 (Strong Daily Supply)',
    analysis:
      'Trend H4 didominasi struktur higher highs. Pantau konfirmasi rejection di area buy zone 2,675 dengan target take profit 2,705.',
    proOnly: true,
  },
  {
    pair: 'EURUSD',
    bias: 'SIDEWAYS BEARISH',
    support: '1.0830 - 1.0850',
    resistance: '1.0930 - 1.0960',
    buyZone: '1.0840 (Key Support H1)',
    sellZone: '1.0925 - 1.0940 (Trendline Resistance Retest)',
    analysis:
      'Tekanan jual masih dominan menjelang rilis data ECB. Pertimbangkan sell on strength di sell zone.',
    proOnly: true,
  },
  {
    pair: 'GBPUSD',
    bias: 'BULLISH REVERSAL',
    support: '1.2980 - 1.3000',
    resistance: '1.3120 - 1.3150',
    buyZone: '1.3020 - 1.3040',
    sellZone: '1.3140',
    analysis:
      'Poundsterling bertahan kuat di atas level psikologis 1.3000. Setup peluang buy dengan SL di bawah 1.2970.',
    proOnly: true,
  },
  {
    pair: 'AUDUSD',
    bias: 'NEUTRAL / RANGING',
    support: '0.6650',
    resistance: '0.6730',
    buyZone: '0.6660',
    sellZone: '0.6725',
    analysis:
      'Pergerakan terbatas di antara level support dan resistance kunci H1. Tunggu sinyal konfirmasi candle rejection.',
    proOnly: false, // Free available pair
  },
];

export default function WatchlistPage() {
  const { user, setTier } = useUser();
  const isPro = user.tier === 'PRO';

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <LineChart className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Daily Watchlist & Zona Support / Resistance
            </h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Peta level harga kunci harian untuk merencanakan entry objektif, bebas tebak-tebakan.
          </p>
        </div>

        {!isPro ? (
          <button
            onClick={() => setTier('PRO')}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Crown className="w-3.5 h-3.5" /> Buka Pair Emas (XAUUSD) & Mayor (PRO)
          </button>
        ) : (
          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
            <Crown className="w-4 h-4" /> SEMUA ZONA PRO TERBUKA
          </div>
        )}
      </div>

      {/* Free tier notice */}
      {!isPro && (
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <p className="text-xs text-slate-300">
              Anda berada di <span className="font-bold text-white">Free Tier</span> (hanya menampilkan 1 pair acak AUDUSD). Upgrade ke Pro Rp50k untuk membuka analisa lengkap <span className="text-amber-400 font-bold">XAUUSD, EURUSD, dan GBPUSD</span>.
            </p>
          </div>
          <button
            onClick={() => setTier('PRO')}
            className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold whitespace-nowrap cursor-pointer"
          >
            Upgrade Pro
          </button>
        </div>
      )}

      {/* Watchlist Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {WATCHLIST_DATA.map((item) => {
          const isLocked = item.proOnly && !isPro;

          return (
            <div
              key={item.pair}
              className={`glass-panel rounded-2xl p-5 border relative overflow-hidden flex flex-col justify-between ${
                isLocked
                  ? 'border-white/5 opacity-80'
                  : 'border-white/10 hover:border-blue-500/30'
              }`}
            >
              {isLocked && (
                <div className="absolute inset-0 bg-[#0B0F19]/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6 text-center space-y-3">
                  <div className="p-3 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-white">
                    Analisa Zona {item.pair} Terkunci
                  </h3>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Khusus member PRO RealistisFx Rp50.000/bln untuk mendapatkan Buy/Sell Zone presisi.
                  </p>
                  <button
                    onClick={() => setTier('PRO')}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer shadow-lg shadow-emerald-500/20"
                  >
                    Buka Akses Pair Ini
                  </button>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                  <div>
                    <h3 className="text-base font-extrabold text-white">{item.pair}</h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.bias.includes('BULLISH')
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-rose-500/10 text-rose-400'
                      }`}
                    >
                      {item.bias}
                    </span>
                  </div>

                  {item.proOnly ? (
                    <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      PRO
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      FREE
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5">
                    <span className="text-slate-400 text-[10px] block">Level Support Kunci</span>
                    <span className="font-mono font-bold text-emerald-400">{item.support}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5">
                    <span className="text-slate-400 text-[10px] block">Level Resistance Kunci</span>
                    <span className="font-mono font-bold text-rose-400">{item.resistance}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                    <span className="font-bold text-emerald-400 text-[11px] block">
                      🎯 Rekomendasi Buy Zone:
                    </span>
                    <span className="text-slate-200 font-mono text-[11px]">{item.buyZone}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-rose-950/20 border border-rose-500/20">
                    <span className="font-bold text-rose-400 text-[11px] block">
                      🛑 Rekomendasi Sell Zone:
                    </span>
                    <span className="text-slate-200 font-mono text-[11px]">{item.sellZone}</span>
                  </div>
                </div>

                <p className="mt-3 text-xs text-slate-400 leading-relaxed border-t border-white/5 pt-2">
                  {item.analysis}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
