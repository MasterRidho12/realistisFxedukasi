'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Menu,
  Crown,
  ShieldCheck,
  Send,
  Sparkles,
  Globe,
  TrendingUp,
  TrendingDown,
  LogOut,
  Radio,
  Shield,
  CreditCard
} from 'lucide-react';
import { useUser } from '@/context/UserContext';

export default function Navbar() {
  const {
    user,
    setIsSidebarOpen,
    logout,
    openPaymentModal,
    marketPrice,
    priceTickDirection,
  } = useUser();
  const isPro = user.tier === 'PRO';
  const isPending = user.subscriptionStatus === 'PENDING';

  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Asia/Jakarta',
        }) + ' WIB'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-8 border-b border-white/10 bg-[#0B0F19]/85 backdrop-blur-xl">
      {/* Left: Mobile Toggle & Market Session */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/5 lg:hidden focus:outline-none"
          aria-label="Buka Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-300">
          <Globe className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-slate-400">Sesi:</span>
          <span className="font-semibold text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            London / NY
          </span>
          <span className="text-slate-600">|</span>
          <span className="font-mono text-slate-300 text-[11px]">{currentTime || '00:00:00 WIB'}</span>
        </div>

        {/* Real-Time Live XAU/USD Spot Ticker */}
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all duration-300 ${
            priceTickDirection === 'up'
              ? 'bg-emerald-500/20 border-emerald-500/50 shadow-md shadow-emerald-500/20'
              : priceTickDirection === 'down'
              ? 'bg-rose-500/20 border-rose-500/50 shadow-md shadow-rose-500/20'
              : 'bg-slate-900/60 border-white/10'
          }`}
          title="Harga Real-Time XAU/USD Live Feed"
        >
          <div className="flex items-center gap-1.5">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span className="font-bold text-amber-300">XAU/USD:</span>
          </div>

          <span
            className={`font-mono font-extrabold transition-colors duration-200 ${
              priceTickDirection === 'up'
                ? 'text-emerald-300 font-black'
                : priceTickDirection === 'down'
                ? 'text-rose-400 font-black'
                : 'text-white'
            }`}
          >
            {(marketPrice?.price ?? 2684.50).toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>

          <span
            className={`hidden md:inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded ${
              (marketPrice?.change24h ?? 0.82) >= 0
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-rose-500/20 text-rose-400'
            }`}
          >
            {(marketPrice?.change24h ?? 0.82) >= 0 ? (
              <TrendingUp className="w-2.5 h-2.5" />
            ) : (
              <TrendingDown className="w-2.5 h-2.5" />
            )}
            +{(marketPrice?.change24h ?? 0.82)}%
          </span>
        </div>
      </div>

      {/* Right: Role Status & Payment Button */}
      <div className="flex items-center gap-2 sm:gap-3">

        {/* Upgrade / Active Badge */}
        {!isPro ? (
          <button
            onClick={openPaymentModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isPending
                ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20 hover:brightness-110 active:scale-95'
            }`}
          >
            {isPending ? (
              <>
                <CreditCard className="w-3.5 h-3.5" />
                <span>QRIS Pending</span>
              </>
            ) : (
              <>
                <Crown className="w-3.5 h-3.5" />
                <span>Bayar PRO Rp50k</span>
              </>
            )}
          </button>
        ) : (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Crown className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">PRO</span> VIP
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={logout}
          className="p-2 text-slate-400 hover:text-rose-400 rounded-xl hover:bg-rose-500/10 transition-colors cursor-pointer"
          title="Keluar Akun"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
