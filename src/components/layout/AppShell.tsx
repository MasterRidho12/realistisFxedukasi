'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { UserProvider, useUser } from '@/context/UserContext';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import AuthScreen from '@/components/auth/AuthScreen';
import QrisPaymentModal from '@/components/subscription/QrisPaymentModal';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminAuthScreen from '@/components/admin/AdminAuthScreen';

function ShellContent({ children }: { children: React.ReactNode }) {
  const { user, logout } = useUser();
  const pathname = usePathname();

  // If user is accessing /admin route, use dedicated Admin Portal with strict role verification
  if (pathname.startsWith('/admin')) {
    // If not authenticated, require dedicated Admin login
    if (!user.isAuthenticated) {
      return <AdminAuthScreen />;
    }

    // STRICT ROLE PROTECTION: Only users with role === 'ADMIN' are allowed into the Admin Panel!
    if (user.role !== 'ADMIN') {
      return (
        <div className="min-h-screen bg-[#070A12] text-slate-100 flex items-center justify-center p-4">
          <div className="glass-panel p-8 sm:p-10 rounded-3xl max-w-md w-full text-center border border-rose-500/40 space-y-5 shadow-2xl bg-[#0B0F19]/95">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center mx-auto shadow-lg shadow-rose-500/20">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-black tracking-widest text-rose-400 uppercase bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                Akses Ilegal Dicegah
              </span>
              <h2 className="text-xl font-extrabold text-white mt-2">
                403 — Akses Ditolak
              </h2>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Akun Anda saat ini terdeteksi sebagai <span className="text-amber-400 font-bold">Akun Trader ({user.name})</span>. Halaman Dashboard Admin diproteksi ketat dan hanya dapat dibuka oleh Administrator Resmi RealistisFx.
            </p>
            <div className="pt-2 flex flex-col gap-2.5">
              <Link
                href="/"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali ke Halaman Web Trader</span>
              </Link>
              <button
                type="button"
                onClick={logout}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs border border-white/10 transition-all cursor-pointer"
              >
                <span>Logout dari Akun Trader</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return <AdminLayout>{children}</AdminLayout>;
  }

  // If trader is not authenticated, require registration/login first
  if (!user.isAuthenticated) {
    return <AuthScreen />;
  }

  // Regular Trader Layout
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex">
      {/* Fixed Left Navigation Sidebar for Traders */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Top Sticky Header */}
        <Navbar />

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Global QRIS Subscription Payment Modal */}
      <QrisPaymentModal />
    </div>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <ShellContent>{children}</ShellContent>
    </UserProvider>
  );
}
