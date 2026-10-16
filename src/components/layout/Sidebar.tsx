'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Calculator,
  Radar,
  BookOpenCheck,
  ShieldAlert,
  TrendingUp,
  LineChart,
  AlertTriangle,
  GraduationCap,
  Bot,
  Crown,
  Sparkles,
  ChevronRight,
  Zap,
  X,
  Shield,
  Clock
} from 'lucide-react';
import { useUser } from '@/context/UserContext';

const navigationItems = [
  {
    name: 'Dashboard Overview',
    href: '/',
    icon: LayoutDashboard,
    badge: 'Live',
    badgeColor: 'blue',
  },
  {
    name: 'Risk & Lot Calculator',
    href: '/calculator',
    icon: Calculator,
    badge: 'Core SOP',
    badgeColor: 'green',
  },
  {
    name: 'News Sentiment Radar',
    href: '/news-radar',
    icon: Radar,
    badge: 'NFP & CPI',
    badgeColor: 'blue',
  },
  {
    name: 'Smart Trading Journal',
    href: '/journal',
    icon: BookOpenCheck,
    badge: 'AI Review',
    badgeColor: 'amber',
  },
  {
    name: 'Anti-FOMO Checklist',
    href: '/checklist',
    icon: ShieldAlert,
    badge: 'Strict Mode',
    badgeColor: 'green',
  },
  {
    name: 'Recovery & Compounding',
    href: '/compounding',
    icon: TrendingUp,
    badge: 'PRO',
    proOnly: true,
  },
  {
    name: 'Daily Watchlist (S&R)',
    href: '/watchlist',
    icon: LineChart,
    badge: 'XAU & Forex',
  },
  {
    name: 'Margin Resistance (Anti-MC)',
    href: '/margin-resistance',
    icon: AlertTriangle,
    badge: 'PRO',
    proOnly: true,
  },
  {
    name: 'Gamified Academy',
    href: '/academy',
    icon: GraduationCap,
    badge: 'Lvl 1-5',
  },
  {
    name: 'Bot Assistant (Telegram)',
    href: '/bot-assistant',
    icon: Bot,
    badge: 'H-30 Alert',
    proOnly: true,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, isSidebarOpen, setIsSidebarOpen, openPaymentModal } = useUser();

  const isPro = user.tier === 'PRO';
  const isPending = user.subscriptionStatus === 'PENDING';

  return (
    <>
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 flex flex-col border-r border-white/10 bg-[#0B0F19]/95 backdrop-blur-xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header / Brand */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-emerald-500 shadow-lg shadow-blue-500/20 group-hover:shadow-emerald-500/30 transition-all duration-300">
              <Zap className="w-5 h-5 text-white" />
              <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  Realistis<span className="text-emerald-400">Fx</span>
                </span>
                <span className="text-[10px] font-bold tracking-widest px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase">
                  Edukasi
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">SOP & Anti Margin Call</p>
            </div>
          </Link>

          {/* Close button for mobile */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 lg:hidden"
            aria-label="Tutup Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tier Status Widget */}
        <div className="px-5 py-4 border-b border-white/5 bg-slate-900/40">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400">Status Akun:</span>
            {isPro ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Crown className="w-3 h-3 text-emerald-400" /> PRO MEMBER
              </span>
            ) : isPending ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Clock className="w-3 h-3 text-amber-400 animate-spin" /> Menunggu Konfirmasi
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                FREE TIER
              </span>
            )}
          </div>

          {!isPro ? (
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Kuota Lot Calculator Hari Ini</span>
                <span className="text-white font-medium">{user.dailyCalculatorCount}/3</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((user.dailyCalculatorCount / 3) * 100, 100)}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400">
                {isPending
                  ? 'Bukti bayar sedang diverifikasi admin via WA'
                  : 'Upgrade Rp50.000/bln untuk akses tanpa batas'}
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between text-[11px] text-emerald-400/90 bg-emerald-950/30 px-2.5 py-1.5 rounded-lg border border-emerald-500/20">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Semua Fitur Terbuka
              </span>
              <span className="font-semibold">Aktif</span>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex-1 px-3 py-3 overflow-y-auto space-y-1">
          <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Fitur & Trading Tools
          </div>

          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600/20 text-white border border-blue-500/40 shadow-lg shadow-blue-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`p-1.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-800/80 text-slate-400 group-hover:text-blue-400 group-hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="truncate">{item.name}</span>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {item.proOnly ? (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                        isPro
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {isPro ? 'PRO' : 'PRO ONLY'}
                    </span>
                  ) : item.badge ? (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                        item.badgeColor === 'green'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : item.badgeColor === 'amber'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}
                    >
                      {item.badge}
                    </span>
                  ) : null}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-400" />}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Upgrade Callout Card (visible when Free) */}
        {!isPro ? (
          <div className="p-3 m-3 rounded-2xl bg-gradient-to-b from-blue-950/60 via-slate-900/80 to-slate-950/90 border border-blue-500/30 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
                  <Crown className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-white tracking-wide">RealistisFx PRO</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Hanya <span className="text-emerald-400 font-bold">Rp50.000</span>/bln via scan QRIS. Buka XAUUSD, bot H-30, & analisa MC.
              </p>
              <button
                type="button"
                onClick={openPaymentModal}
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isPending ? 'Lihat Bukti QRIS' : 'Bayar via QRIS (Rp50k)'}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-3 m-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center">
            <p className="text-xs font-semibold text-emerald-300">Akun Anda: PRO ACTIVE</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Semua kalkulator & bot aktif</p>
          </div>
        )}

        {/* User Footer Profile */}
        <div className="p-4 border-t border-white/10 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-400 flex items-center justify-center font-bold text-xs text-slate-950 flex-shrink-0">
              {user.name ? user.name.slice(0, 2).toUpperCase() : 'TR'}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0B0F19]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user.name}</p>
              <p className="text-[10px] text-slate-400 truncate">{user.id}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
