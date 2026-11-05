'use client';

import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Zap, ShieldAlert, BarChart3, Activity } from 'lucide-react';

interface NewsImpactChartProps {
  pair: string;
  eventName: string;
  impact: 'High' | 'Medium' | 'Low' | string;
  actual?: string;
  forecast?: string;
  previous?: string;
  pipsGain?: string;
  direction?: 'BUY' | 'SELL' | 'BULLISH' | 'BEARISH';
  dateStr?: string;
}

export default function NewsImpactChart({
  pair = 'XAUUSD',
  eventName = 'US Non-Farm Payrolls (NFP)',
  impact = 'High',
  actual = '254K',
  forecast = '180K',
  previous = '150K',
  pipsGain = '+185 Pips',
  direction = 'SELL',
  dateStr = 'Rilis Resmi',
}: NewsImpactChartProps) {
  const [chartView, setChartView] = useState<'candle' | 'deviation'>('candle');

  const isSell = direction === 'SELL' || direction === 'BEARISH';
  const strokeColor = isSell ? '#EF4444' : '#00A651';
  const fillColor = isSell ? 'rgba(239, 68, 68, 0.12)' : 'rgba(0, 166, 81, 0.12)';

  return (
    <div className="w-full rounded-2xl bg-slate-950 text-white p-3 sm:p-4 border border-slate-800 shadow-inner space-y-3 select-none">
      {/* Top Header of Chart */}
      <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-emerald-500/20 text-[#4ADE80]">
            <Activity className="w-3.5 h-3.5" />
          </span>
          <div>
            <span className="font-mono font-bold text-slate-300">{pair}</span>
            <span className="text-[10px] text-slate-500 ml-1.5 hidden sm:inline">Grafik Reaksi Berita</span>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-[10px]">
          <button
            onClick={() => setChartView('candle')}
            className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
              chartView === 'candle'
                ? 'bg-[#00A651] text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Grafik Reaksi M5
          </button>
          <button
            onClick={() => setChartView('deviation')}
            className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
              chartView === 'deviation'
                ? 'bg-[#00A651] text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Bar Deviasi Data
          </button>
        </div>
      </div>

      {chartView === 'candle' ? (
        /* Visual Price Reaction SVG Chart */
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center">
          {/* Background Grid */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-3 divide-x divide-y divide-slate-800/40 pointer-events-none" />

          {/* SVG Price Line & Candlestick Spikes */}
          <svg className="w-full h-full" viewBox="0 0 420 180" preserveAspectRatio="none">
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={strokeColor} stopOpacity="0.35" />
                <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Pre-News Consolidation Area */}
            <rect x="20" y="80" width="100" height="30" fill="#334155" fillOpacity="0.2" rx="4" />
            <text x="30" y="72" fill="#94A3B8" fontSize="8" fontFamily="monospace">Pre-News Consolidation</text>

            {/* Entry Level Dashed Line */}
            <line x1="20" y1="95" x2="400" y2="95" stroke="#4ADE80" strokeWidth="1" strokeDasharray="3 3" />
            <text x="320" y="90" fill="#4ADE80" fontSize="8" fontFamily="monospace">ENTRY LEVEL</text>

            {/* Stop Loss Line */}
            <line x1="20" y1={isSell ? "60" : "130"} x2="400" y2={isSell ? "60" : "130"} stroke="#EF4444" strokeWidth="1" strokeDasharray="2 2" />
            <text x="330" y={isSell ? "55" : "140"} fill="#EF4444" fontSize="8" fontFamily="monospace">SL FIXED 30 PIPS</text>

            {/* Price Movement Wave Path */}
            {isSell ? (
              <>
                {/* Bearish Spike Path */}
                <path
                  d="M 20,95 Q 60,92 110,95 T 140,85 L 150,150 L 190,135 L 260,155 L 340,165 L 400,160"
                  fill="url(#areaGrad)"
                  stroke={strokeColor}
                  strokeWidth="2.5"
                />
                {/* News Spike Candle */}
                <line x1="150" y1="65" x2="150" y2="160" stroke="#EF4444" strokeWidth="1.5" />
                <rect x="146" y="85" width="8" height="65" fill="#EF4444" rx="1" />
              </>
            ) : (
              <>
                {/* Bullish Spike Path */}
                <path
                  d="M 20,95 Q 60,98 110,95 T 140,105 L 150,35 L 190,50 L 260,30 L 340,20 L 400,25"
                  fill="url(#areaGrad)"
                  stroke={strokeColor}
                  strokeWidth="2.5"
                />
                {/* News Spike Candle */}
                <line x1="150" y1="20" x2="150" y2="115" stroke="#00A651" strokeWidth="1.5" />
                <rect x="146" y="35" width="8" height="65" fill="#00A651" rx="1" />
              </>
            )}

            {/* Release Trigger Point Tag */}
            <circle cx="150" cy={isSell ? "85" : "105"} r="4" fill="#F59E0B" />
            <text x="160" y="45" fill="#F59E0B" fontSize="9" fontWeight="bold">
              Rilis Berita ⚡
            </text>

            {/* TP Hit Target Marker */}
            <circle cx="340" cy={isSell ? "165" : "20"} r="4" fill="#00A651" />
            <text x="270" y={isSell ? "150" : "15"} fill="#4ADE80" fontSize="9" fontWeight="bold">
              TP HIT ({pipsGain}) ✓
            </text>
          </svg>

          {/* Bottom Indicators in Chart */}
          <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[9px] font-mono text-slate-400">
            <span>H-15 Mins</span>
            <span className="text-amber-400 font-bold">Detik Rilis (Spike)</span>
            <span>+30 Mins Retest</span>
            <span className="text-[#4ADE80] font-bold">Target Profit</span>
          </div>
        </div>
      ) : (
        /* Deviation Bar Chart */
        <div className="space-y-2 py-2">
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>Komparasi Data Makro:</span>
            <span className="text-[#4ADE80] font-mono font-bold">{pipsGain} Reaksi Pasar</span>
          </div>

          <div className="space-y-1.5 text-xs font-mono">
            {/* Previous Bar */}
            <div className="flex items-center gap-2">
              <span className="w-16 text-[10px] text-slate-400 uppercase">Previous</span>
              <div className="flex-1 bg-slate-800 h-4 rounded-md overflow-hidden relative">
                <div className="h-full bg-slate-500 rounded-md" style={{ width: '45%' }} />
                <span className="absolute left-2 top-0 text-[10px] text-white leading-4 font-bold">{previous}</span>
              </div>
            </div>

            {/* Forecast Bar */}
            <div className="flex items-center gap-2">
              <span className="w-16 text-[10px] text-slate-400 uppercase">Forecast</span>
              <div className="flex-1 bg-slate-800 h-4 rounded-md overflow-hidden relative">
                <div className="h-full bg-sky-600 rounded-md" style={{ width: '60%' }} />
                <span className="absolute left-2 top-0 text-[10px] text-white leading-4 font-bold">{forecast}</span>
              </div>
            </div>

            {/* Actual Bar */}
            <div className="flex items-center gap-2">
              <span className="w-16 text-[10px] text-[#4ADE80] uppercase font-bold">Actual</span>
              <div className="flex-1 bg-slate-800 h-5 rounded-md overflow-hidden relative border border-[#00A651]/40">
                <div
                  className={`h-full rounded-md ${isSell ? 'bg-rose-500' : 'bg-[#00A651]'}`}
                  style={{ width: '85%' }}
                />
                <span className="absolute left-2 top-0 text-[11px] text-white leading-5 font-black">
                  {actual} (Dirilis)
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Pill of Chart */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-800/80">
        <span className="flex items-center gap-1">
          <ShieldAlert className="w-3 h-3 text-amber-400" />
          <span>Aturan SOP: Hindari entry 5 detik pertama</span>
        </span>
        <span className="text-[#4ADE80] font-bold">
          Gain: {pipsGain}
        </span>
      </div>
    </div>
  );
}
