'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileQuestion, ArrowLeft } from 'lucide-react';
import { UserProvider, useUser } from '@/context/UserContext';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import LandingPage from '@/components/landing/LandingPage';
import QrisPaymentModal from '@/components/subscription/QrisPaymentModal';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminAuthScreen from '@/components/admin/AdminAuthScreen';

function ShellContent({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const pathname = usePathname();
  const [hasSecretAdminKey, setHasSecretAdminKey] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const key = params.get('key') || params.get('secret');
      if (key === 'master-rf-2026' || key === 'rf-admin-vault') {
        setHasSecretAdminKey(true);
      }
    }
  }, [pathname]);

  // Standalone Landing Page Route
  if (pathname === '/landing') {
    return <LandingPage />;
  }

  // STEALTH CLOAKED ADMIN ROUTE:
  // Normal users & visitors see standard 404 (Page Not Found).
  // Only authenticated ADMIN or authorized personnel with secret key gateway can access.
  if (pathname.startsWith('/admin')) {
    // 1. Authorized logged-in ADMIN has full access
    if (user.isAuthenticated && user.role === 'ADMIN') {
      return <AdminLayout>{children}</AdminLayout>;
    }

    // 2. Secret Gateway key unlocks the dedicated Admin Authentication Portal
    if (hasSecretAdminKey) {
      return <AdminAuthScreen />;
    }

    // 3. For all normal users & unauthorized visitors: Show completely generic 404
    // User has zero indication that an admin route even exists!
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex items-center justify-center p-4">
        <div className="p-8 sm:p-10 rounded-3xl max-w-md w-full text-center border border-slate-200 space-y-5 shadow-xl bg-white">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-500 border border-slate-200 flex items-center justify-center mx-auto shadow-xs">
            <FileQuestion className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[11px] font-black tracking-widest text-slate-400 uppercase bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              Error 404
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-2">
              Halaman Tidak Ditemukan
            </h2>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Halaman yang Anda tuju tidak tersedia, telah dihapus, atau alamat URL yang Anda masukkan salah. Silakan periksa kembali tautan Anda.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Beranda Utama</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If visitor is not authenticated, show Landing Page first (with on-page login & registration)
  if (!user.isAuthenticated) {
    return <LandingPage />;
  }

  // Regular Trader Layout
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex">
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
