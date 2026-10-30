import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import AppShell from '@/components/layout/AppShell';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'RealistisFx — Akademi Edukasi Bisnis Trading Forex dari Nol & SOP Anti-MC',
  description:
    'Edukasi bisnis trading forex dari 0 secara bertahap, terarah, dan terkonsep untuk membuka mindset awal memahami bisnis trading forex. Kuasai SOP Money Management 1%, analisis teknikal supply-demand, dan tools manajemen risiko anti-Margin Call.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#F8FAFC] text-slate-900 flex flex-col selection:bg-[#00A651] selection:text-white">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
