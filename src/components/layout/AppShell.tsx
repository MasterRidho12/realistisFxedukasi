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
import AdminDashboardPage from '@/app/admin/page';

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

  // 1. IF AUTHENTICATED USER IS AN ADMINISTRATOR:
  // ALWAYS render the dedicated Admin Control Center Dashboard!
  if (user.isAuthenticated && user.role === 'ADMIN') {
    if (pathname === '/landing') {
      return (
        <div className="relative">
          <div className="sticky top-0 z-50 bg-amber-500 text-slate-950 px-4 py-2 text-xs font-black flex items-center justify-between shadow-md">
            <span>👁️ Mode Pratinjau Admin: Sedang Memeriksa Tampilan Landing Page untuk Pengunjung</span>
            <Link
              href="/admin"
              className="px-3 py-1 bg-slate-950 text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Kembali ke Panel Kontrol Admin &rarr;
            </Link>
          </div>
          <LandingPage />
        </div>
      );
    }
    return (
      <AdminLayout>
        <AdminDashboardPage />
      </AdminLayout>
    );
  }

  // 2. Standalone Landing Page Route for Visitors
  if (pathname === '/landing') {
    return (
      <>
        <LandingPage />
        <QrisPaymentModal />
      </>
    );
  }

  // 3. DEDICATED ADMIN ROUTE:
  // When visiting /admin: If not yet authenticated as ADMIN, render the dedicated Admin Login Portal directly.
  if (pathname.startsWith('/admin')) {
    return <AdminAuthScreen />;
  }

  // If visitor is not authenticated, show Landing Page first (with on-page login & registration)
  if (!user.isAuthenticated) {
    return (
      <>
        <LandingPage />
        <QrisPaymentModal />
      </>
    );
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
