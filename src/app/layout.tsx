import type { Metadata, Viewport } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import './globals.css';
import AppShell from '@/components/layout/AppShell';

// Inter — matches Traders Family clean typography
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
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'RealistisFx — Edukasi Bisnis Trading Forex dari Nol & SOP Anti-MC',
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
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#F8FAFC] text-slate-900 flex flex-col selection:bg-[#00A651] selection:text-white">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
