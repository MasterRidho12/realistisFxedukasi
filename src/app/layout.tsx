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
  title: 'RealistisFx Edukasi — Platform Trading Tools & Edukasi Freemium',
  description:
    'Platform trading tools dan edukasi freemium (Free & Pro Rp50.000/bln) dirancang untuk melindungi retail trader Indonesia dari Margin Call melalui kalkulator risiko, SOP anti-FOMO, dan radar sentimen.',
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
