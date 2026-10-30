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
  Clock,
  Globe
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
    badge: 'Rp 100k',
    badgeColor: 'amber',
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
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 max-w-[85vw] flex flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header / Brand */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-200 bg-white">
          <Link href="/" className="flex items-center gap-2.5 group min-w-0">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl overflow-hidden border border-emerald-500/40 shadow-sm group-hover:scale-105 group-hover:border-[#00A651] transition-all bg-[#0a1f18] shrink-0">
              <img
                alt="REALISTIS FX Logo"
                width={36}
                height={36}
                className="w-full h-full object-cover"
                src="/images/logo.png"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-black text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-[#00A651] transition-colors">
                  REALISTIS<span className="text-[#00A651]"> FX</span>
                </span>
                <span className="text-[9px] font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-50 text-[#00A651] border border-emerald-200 uppercase">
                  Edukasi
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium truncate">SOP &amp; Anti Margin Call</p>
            </div>
          </Link>

          {/* Close button for mobile */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 lg:hidden cursor-pointer shrink-0"
            aria-label="Tutup Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tier Status Widget */}
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">Status Akun:</span>
            {isPro ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-[#00A651] border border-emerald-200">
                <Crown className="w-3 h-3 text-[#00A651]" /> PRO MEMBER
              </span>
            ) : isPending ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                <Clock className="w-3 h-3 text-amber-600 animate-spin" /> Menunggu Konfirmasi
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-200 text-slate-700 border border-slate-300">
                FREE TIER
              </span>
            )}
          </div>

          {!isPro ? (
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] text-slate-600">
                <span>Kuota Lot Calculator Hari Ini</span>
                <span className="text-slate-900 font-bold">{user.dailyCalculatorCount}/3</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#00A651] rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((user.dailyCalculatorCount / 3) * 100, 100)}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-500">
                {isPending
                  ? 'Bukti bayar sedang diverifikasi admin via WA'
                  : 'Upgrade VIP Rp500.000/bln untuk akses tanpa batas'}
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between text-[11px] text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
              <span className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#00A651]" />
                Semua Fitur Terbuka
              </span>
              <span className="font-bold text-[#00A651]">Aktif</span>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex-1 px-3 py-3 overflow-y-auto space-y-1 bg-white">
          <div className="px-3 py-1.5 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Fitur &amp; Trading Tools
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
                    ? 'bg-emerald-50 text-[#00A651] border border-emerald-200 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`p-1.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#00A651] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-500 group-hover:text-slate-900 group-hover:bg-slate-200'
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
                          ? 'bg-emerald-50 text-[#00A651] border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {isPro ? 'PRO' : 'PRO ONLY'}
                    </span>
                  ) : item.badge ? (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                        item.badgeColor === 'green'
                          ? 'bg-emerald-50 text-[#00A651] border border-emerald-200'
                          : item.badgeColor === 'amber'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-sky-50 text-sky-800 border border-sky-200'
                      }`}
                    >
                      {item.badge}
                    </span>
                  ) : null}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#00A651]" />}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Upgrade Callout Card (visible when Free) */}
        {!isPro ? (
          <div className="p-3 m-3 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 border border-emerald-200 relative overflow-hidden shadow-sm">
            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-md bg-emerald-100 text-[#00A651]">
                  <Crown className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-900 tracking-wide">RealistisFx VIP</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Hanya <span className="text-[#00A651] font-bold">Rp500.000</span>/bln via QRIS. Buka Sinyal AI XAUUSD, Playbook Berita, &amp; VIP Telegram.
              </p>
              <button
                type="button"
                onClick={openPaymentModal}
                className="w-full py-2 px-3 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs shadow-md shadow-[#00A651]/20 transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isPending ? 'Lihat Bukti QRIS' : 'Aktivasi VIP (Rp500k)'}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-3 m-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
            <p className="text-xs font-bold text-emerald-800">Akun Anda: PRO ACTIVE</p>
            <p className="text-[11px] text-slate-600 mt-0.5">Semua kalkulator &amp; bot aktif</p>
          </div>
        )}

        {/* User Footer Profile */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-8 h-8 rounded-full bg-[#00A651] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-xs overflow-hidden">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || 'User Avatar'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{user.name ? user.name.slice(0, 2).toUpperCase() : 'TR'}</span>
              )}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
              <p className="text-[10px] text-slate-500 truncate">{user.id || user.email}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
