'use client';

import React, { useState } from 'react';
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
  Sparkles,
  ChevronRight,
  ChevronDown,
  X,
  Clock,
  User,
  MessageCircle,
  ExternalLink,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';
import { useUser } from '@/context/UserContext';

export default function Sidebar() {
  const pathname = usePathname();
  const { user, isSidebarOpen, setIsSidebarOpen, openPaymentModal, siteSettings } = useUser();

  const isPro = user.tier === 'PRO';
  const isPending = user.subscriptionStatus === 'PENDING';

  // Collapsible dropdown for "Edukasi Trader" (ala TF Education)
  const [educationOpen, setEducationOpen] = useState(true);

  const educationModules = [
    {
      level: 'Season 1',
      title: 'Sejarah Perjalanan Uang (Gratis)',
      href: '/academy?season=1',
      isFree: true,
    },
    {
      level: 'Season 2',
      title: 'Dunia Forex Modern (Gratis)',
      href: '/academy?season=2',
      isFree: true,
    },
    {
      level: 'Season 3',
      title: 'Mata Uang & Pasangan Trading',
      href: '/academy?season=3',
      isFree: false,
    },
    {
      level: 'Season 4',
      title: 'Harga, Pip, Lot & Leverage',
      href: '/academy?season=4',
      isFree: false,
    },
    {
      level: 'Season 9',
      title: 'Dasar Analisis Teknikal',
      href: '/academy?season=9',
      isFree: false,
    },
    {
      level: 'Season 12',
      title: 'Price Action & Smart Money',
      href: '/academy?season=12',
      isFree: false,
    },
    {
      level: 'Season 15',
      title: 'SOP Money Management 1%',
      href: '/academy?season=15',
      isFree: false,
    },
    {
      level: 'Season 17',
      title: 'Gold Trading XAUUSD',
      href: '/academy?season=17',
      isFree: false,
    },
    {
      level: 'Season 18',
      title: 'Psikologi Trading Anti-FOMO',
      href: '/academy?season=18',
      isFree: false,
    },
    {
      level: 'Season 20',
      title: 'EA, AI & Trader Mandiri',
      href: '/academy?season=20',
      isFree: false,
    },
  ];

  const toolNavigationItems = [
    {
      name: 'Risk & Lot Calculator',
      href: '/calculator',
      icon: Calculator,
      badge: 'Core SOP',
      badgeColor: 'green',
    },
    {
      name: 'Analisa Market (S&R)',
      href: '/watchlist',
      icon: LineChart,
      badge: 'XAU & Forex',
    },
    {
      name: 'News Sentiment Radar',
      href: '/news-radar',
      icon: Radar,
      badge: 'NFP & CPI',
      badgeColor: 'blue',
    },
    {
      name: 'Anti-FOMO Checklist',
      href: '/checklist',
      icon: ShieldAlert,
      badge: 'Strict Mode',
      badgeColor: 'green',
    },
    {
      name: 'Smart Trading Journal',
      href: '/journal',
      icon: BookOpenCheck,
      badge: 'Evaluasi',
      badgeColor: 'amber',
    },
    {
      name: 'Ketahanan Margin (Anti-MC)',
      href: '/margin-resistance',
      icon: AlertTriangle,
      badge: 'PRO',
      proOnly: true,
    },
    {
      name: 'Recovery & Compounding',
      href: '/compounding',
      icon: TrendingUp,
      badge: 'PRO',
      proOnly: true,
    },
    {
      name: 'Bot Telegram Webhook',
      href: '/bot-assistant',
      icon: Bot,
      badge: 'Alert H-30',
      proOnly: true,
    },
  ];

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
        {/* Header: User Profile Terminal Header (ala Traders Family) */}
        <div className="p-4 border-b border-slate-200 bg-gradient-to-b from-slate-900 to-slate-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-[#00A651] to-emerald-800 flex items-center justify-center font-black text-sm text-white shadow-md shadow-[#00A651]/30 shrink-0">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || 'User'}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <span>{user.name ? user.name.slice(0, 2).toUpperCase() : 'TR'}</span>
              )}
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
            </div>

            <div className="min-w-0">
              <h3 className="font-extrabold text-xs sm:text-sm text-white truncate">
                {user.name || 'Trader Realistis'}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-[11px] font-semibold text-emerald-300">Online</span>
                <span className="text-slate-500">•</span>
                <span className="text-[10px] font-mono text-slate-300 truncate">
                  {user.accountType || 'Standard'}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 lg:hidden cursor-pointer shrink-0"
            aria-label="Tutup Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tier Status Widget */}
        <div className="px-4 py-3 border-b border-slate-200 bg-emerald-50/50">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500">Status Edukasi:</span>
            {isPro ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-[#00A651] text-white shadow-xs">
                <CheckCircle2 className="w-3 h-3 text-white" /> EDUKASI PRO (AKTIF)
              </span>
            ) : isPending ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                <Clock className="w-3 h-3 text-amber-600 animate-spin" /> Verifikasi QRIS
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-200 text-slate-700 border border-slate-300">
                EDUKASI DASAR (FREE)
              </span>
            )}
          </div>

          {!isPro ? (
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-[10px] text-slate-600">
                <span>Kuota Lot Calculator Hari Ini</span>
                <span className="font-bold text-slate-900">{user.dailyCalculatorCount}/3</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#00A651] rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((user.dailyCalculatorCount / 3) * 100, 100)}%` }}
                />
              </div>
            </div>
          ) : null}
        </div>

        {/* Navigation Links Scrollable Area */}
        <div className="flex-1 px-3 py-3 overflow-y-auto space-y-3 bg-white">
          {/* Main Top Nav */}
          <div className="space-y-1">
            <Link
              href="/"
              onClick={() => setIsSidebarOpen(false)}
              className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                pathname === '/'
                  ? 'bg-emerald-50 text-[#00A651] border border-emerald-200 font-bold shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`p-1.5 rounded-lg ${
                    pathname === '/' ? 'bg-[#00A651] text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                </div>
                <span>Beranda (Dashboard)</span>
              </div>
              {pathname === '/' && <ChevronRight className="w-3.5 h-3.5 text-[#00A651]" />}
            </Link>

            <Link
              href="/#profile"
              onClick={() => setIsSidebarOpen(false)}
              className="group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-slate-200">
                  <User className="w-4 h-4" />
                </div>
                <span>Profil Trader</span>
              </div>
            </Link>
          </div>

          {/* EDUKASI TRADER DROPDOWN (Gaya "TF Education" di Traders Family) */}
          <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-b from-emerald-50/70 to-white overflow-hidden shadow-xs">
            <button
              type="button"
              onClick={() => setEducationOpen(!educationOpen)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 bg-[#00A651] text-white font-extrabold text-xs cursor-pointer hover:bg-[#008F45] transition-colors"
            >
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>EDUKASI TRADER</span>
              </div>
              {educationOpen ? (
                <ChevronDown className="w-4 h-4 transition-transform" />
              ) : (
                <ChevronRight className="w-4 h-4 transition-transform" />
              )}
            </button>

            {educationOpen && (
              <div className="p-1.5 space-y-0.5">
                <Link
                  href="/academy"
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-colors ${
                    pathname === '/academy'
                      ? 'bg-emerald-100 text-emerald-900 font-bold'
                      : 'text-slate-800 hover:bg-emerald-50/80 font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#00A651]" />
                    <span>Semua Modul Video</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#00A651]">Buka →</span>
                </Link>

                <div className="pt-1 border-t border-emerald-100/60 space-y-0.5">
                  {educationModules.map((mod) => (
                    <Link
                      key={mod.level}
                      href={mod.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] text-slate-600 hover:text-slate-900 hover:bg-white transition-all group"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-mono font-bold text-[#00A651] shrink-0 text-[10px]">
                          {mod.level}:
                        </span>
                        <span className="truncate group-hover:text-[#00A651]">{mod.title}</span>
                      </div>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-bold shrink-0 ${
                          mod.isFree
                            ? 'bg-emerald-100 text-[#00A651]'
                            : isPro
                            ? 'bg-emerald-50 text-[#00A651]'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {mod.isFree ? 'Gratis' : isPro ? 'Aktif' : 'Pro'}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* TRADING TOOLS & ANALISA SECTION */}
          <div className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-black tracking-wider text-slate-400 uppercase">
              Trading Tools &amp; Analisa
            </div>

            {toolNavigationItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-[#00A651] border border-emerald-200 font-bold shadow-xs'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`p-1.5 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-[#00A651] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-800'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="truncate">{item.name}</span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {item.proOnly ? (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                          isPro
                            ? 'bg-emerald-50 text-[#00A651] border border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {isPro ? 'PRO' : 'PRO ONLY'}
                      </span>
                    ) : item.badge ? (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${
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

          {/* BANTUAN & KOMUNITAS */}
          <div className="space-y-1 pt-2 border-t border-slate-100">
            <div className="px-3 py-1 text-[10px] font-black tracking-wider text-slate-400 uppercase">
              Bantuan &amp; Konsultasi
            </div>

            <a
              href={`https://wa.me/${siteSettings?.adminWhatsAppNumber || '6287774229255'}?text=${encodeURIComponent(
                `Halo Admin RealistisFx, saya ${user.name} (ID: ${user.id}). Saya ingin konsultasi materi edukasi / bantuan akun.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-[#00A651] hover:bg-emerald-50/50 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-emerald-50 text-[#00A651]">
                  <MessageCircle className="w-3.5 h-3.5" />
                </div>
                <span>Tanya Jawab WhatsApp</span>
              </div>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <a
              href="https://www.mql5.com/en/signals/2388343?source=Site+Signals+My"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-slate-100 text-slate-500">
                  <LineChart className="w-3.5 h-3.5" />
                </div>
                <span>Live MQL5 Signal</span>
              </div>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Upgrade Callout Card (visible when Free) */}
        {!isPro ? (
          <div className="p-3 m-3 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-emerald-50 border border-emerald-200 relative overflow-hidden shadow-xs">
            <div className="relative z-10 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900 tracking-wide">Paket Edukasi Lengkap</span>
                <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-rose-50 text-rose-600 border border-rose-200">
                  Hemat 69%
                </span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[11px] line-through text-slate-400 font-semibold decoration-rose-500">
                  Rp 800.000
                </span>
                <span className="text-sm font-black text-[#00A651]">
                  Rp 250.000
                </span>
                <span className="text-[10px] text-slate-500 font-medium">/bln</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Akses seluruh video Level 1-5, SOP Money Management 1%, &amp; kalkulator lot tanpa batas.
              </p>
              <button
                type="button"
                onClick={() => openPaymentModal('EDUKASI')}
                className="w-full py-2 px-3 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs shadow-md shadow-[#00A651]/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isPending ? 'Lihat Bukti QRIS' : 'Aktivasi Edukasi (Rp 250k)'}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-3 m-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
            <p className="text-xs font-bold text-emerald-800">AKUN EDUKASI LENGKAP AKTIF</p>
            <p className="text-[10px] text-slate-600 mt-0.5">Seluruh kurikulum &amp; kalkulator terbuka</p>
          </div>
        )}
      </aside>
    </>
  );
}
