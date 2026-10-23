'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Menu,
  Crown,
  Globe,
  LogOut,
  CreditCard,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { useUser } from '@/context/UserContext';

export default function Navbar() {
  const {
    user,
    setIsSidebarOpen,
    logout,
    openPaymentModal,
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
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-3 sm:px-4 md:px-6 lg:px-8 border-b border-slate-200/90 bg-white/95 backdrop-blur-md shadow-xs">
      {/* Left: Mobile Toggle & Brand (on Mobile) & Market Session */}
      <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 lg:hidden focus:outline-none cursor-pointer shrink-0"
          aria-label="Buka Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile Brand Logo */}
        <Link href="/" className="flex lg:hidden items-center gap-1.5 select-none shrink-0">
          <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-emerald-500/40 shadow-xs bg-[#0a1f18] flex items-center justify-center shrink-0">
            <img
              alt="REALISTIS FX Logo"
              width={32}
              height={32}
              className="w-full h-full object-cover"
              src="/images/logo.png"
            />
          </div>
          <span className="font-extrabold text-xs sm:text-sm tracking-wider text-slate-900">
            REALISTIS<span className="text-[#00A651]"> FX</span>
          </span>
        </Link>

        {/* Market Session Pill */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 shadow-xs shrink-0">
          <Globe className="w-3.5 h-3.5 text-sky-600" />
          <span className="text-slate-500 font-medium">Sesi:</span>
          <span className="font-semibold text-[#00A651] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A651] animate-pulse" />
            London / NY
          </span>
          <span className="text-slate-300">|</span>
          <span className="font-mono text-slate-700 text-[11px] font-semibold">{currentTime || '00:00:00 WIB'}</span>
        </div>

      </div>

      {/* Right: Quick Action Buttons & Status */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* Live MQL5 Link Button (like realistisfx.com) */}
        <a
          href="https://www.mql5.com/en/signals/2388343?source=Site+Signals+My"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-200 transition-colors"
          title="Lihat Verifikasi Sinyal Live MQL5"
        >
          <span>Live MQL5</span>
          <ExternalLink className="w-3 h-3 text-slate-500" />
        </a>

        {/* Copy-Trade WhatsApp Button */}
        <a
          href="https://wa.me/6287774229255?text=Halo%20Mas%20Rizky%20Juhri%2C%20saya%20tertarik%20untuk%20bergabung%20Copy%20Trade%20REALISTIS%20FX%20(Gold%20Breakout%20XAUUSD).%20Mohon%20panduan%20pendaftaran%20dan%20setup%20akunnya.%20Terima%20kasih."
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs shadow-md shadow-[#00A651]/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-white text-white" />
          <span>Mulai Copy-Trade</span>
        </a>

        {/* Upgrade / Active Badge */}
        {!isPro ? (
          <button
            onClick={openPaymentModal}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isPending
                ? 'bg-amber-50 border border-amber-300 text-amber-800'
                : 'bg-[#00A651] hover:bg-[#008F45] text-white shadow-md shadow-[#00A651]/20 hover:scale-[1.02] active:scale-95'
            }`}
          >
            {isPending ? (
              <>
                <CreditCard className="w-3.5 h-3.5" />
                <span>Pending</span>
              </>
            ) : (
              <>
                <Crown className="w-3.5 h-3.5" />
                <span>Upgrade VIP</span>
              </>
            )}
          </button>
        ) : (
          <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[#00A651] text-xs font-bold">
            <Crown className="w-3.5 h-3.5 text-[#00A651]" />
            <span>PRO VIP</span>
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={logout}
          className="p-1.5 sm:p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
          title="Keluar Akun"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
