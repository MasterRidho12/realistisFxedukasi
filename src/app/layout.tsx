import type { Metadata, Viewport } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import './globals.css';
import AppShell from '@/components/layout/AppShell';
import PwaInstallPrompt from '@/components/common/PwaInstallPrompt';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: '#005A36',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'RealistisFx — Edukasi Bisnis Trading Forex Bertahap, Terarah & Terkonsep',
  description:
    'Bukan perjudian cepat kaya. Bangun fondasi dari nol dengan SOP Money Management 1%, metode baku Fixed SL 30 Pips, pemetaan zona supply-demand valid, dan psikologi eksekusi tenang untuk mencetak trader mandiri bebas Margin Call.',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'RealistisFx',
  },
  icons: {
    icon: '/images/logo-green.svg',
    apple: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#F8FAFC] text-slate-900 flex flex-col selection:bg-[#00A651] selection:text-white">
        <AppShell>{children}</AppShell>
        <PwaInstallPrompt />
      </body>
    </html>
  );
}
