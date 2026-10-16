'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield,
  Clock,
  Users,
  CreditCard,
  ArrowLeft,
  LogOut,
  Bell,
  CheckCircle2,
  ExternalLink,
  Zap
} from 'lucide-react';
import { useUser } from '@/context/UserContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout, subscriptionRequests, allUsers } = useUser();

  const pendingCount = subscriptionRequests.filter((r) => r.status === 'PENDING').length;

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col lg:flex-row">
      {/* Dedicated Admin Sidebar */}
      <aside className="w-full lg:w-72 bg-[#0B0F19] border-r border-amber-500/20 flex flex-col flex-shrink-0">
        {/* Admin Brand Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black">
              <Shield className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white">
                  Realistis<span className="text-amber-400">Admin</span>
                </span>
                <span className="text-[9px] font-black tracking-widest px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                  Portal
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Pusat Kendali Sistem</p>
            </div>
          </div>
        </div>

        {/* Admin Stats Widget */}
        <div className="p-4 mx-3 my-3 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Antrean Verifikasi:</span>
            <span className="font-bold text-amber-400 font-mono">
              {pendingCount} Pending
            </span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-amber-400 h-full rounded-full transition-all"
              style={{ width: pendingCount > 0 ? '60%' : '100%' }}
            />
          </div>
          <p className="text-[10px] text-slate-400">
            {pendingCount > 0
              ? 'Ada bukti pembayaran QRIS perlu dicek'
              : 'Semua verifikasi telah tuntas'}
          </p>
        </div>

        {/* Admin Navigation */}
        <div className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          <div className="px-3 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
            Menu Manajemen Admin
          </div>

          <Link
            href="/admin"
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              pathname === '/admin'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/10'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Verifikasi Bukti QRIS</span>
            </div>
            {pendingCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-slate-950 animate-pulse">
                {pendingCount}
              </span>
            )}
          </Link>

          <Link
            href="/admin#users"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-blue-400" />
              <span>Kelola Akun Trader</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              {allUsers.length} User
            </span>
          </Link>

          <Link
            href="/admin#settings"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span>Pengaturan QRIS & WA</span>
            </div>
          </Link>

          <div className="pt-4 border-t border-white/10 mt-4">
            <Link
              href="/"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-white/10 transition-all"
            >
              <div className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 text-emerald-400" />
                <span>Ke Halaman Web Trader</span>
              </div>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </Link>
          </div>
        </div>

        {/* Admin Footer */}
        <div className="p-4 border-t border-white/10 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs">
              AD
            </div>
            <div>
              <p className="text-xs font-bold text-white">Super Administrator</p>
              <p className="text-[10px] text-amber-400 font-mono">Hak Akses Penuh</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
            title="Keluar dari Admin"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar Admin */}
        <header className="h-16 px-6 border-b border-amber-500/20 bg-[#0B0F19]/90 backdrop-blur-xl flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <h1 className="text-sm font-bold text-white tracking-tight">
                Panel Administrasi RealistisFx Edukasi
              </h1>
            </div>
            <span className="text-[11px] text-slate-500 hidden sm:inline">|</span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Otoritas Verifikasi Pembayaran & Akses PRO
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-emerald-400" />
              <span>Lihat Tampilan Trader</span>
            </Link>

            <button
              onClick={logout}
              className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Admin Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
