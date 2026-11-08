import type { Metadata, Viewport } from 'next';
import './globals.css';
import AppShell from '@/components/layout/AppShell';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'RealistisFx — Edukasi Bisnis Trading Forex dari Nol & SOP Anti-MC',
  description:
    'Edukasi bisnis trading forex dari 0 secara bertahap dan terarah untuk membuka mindset awal memahami bisnis trading forex. Kuasai SOP Money Management 1%, analisis teknikal supply-demand, dan tools manajemen risiko anti-Margin Call.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Inter:wght@300;400;500;600;700;800;900&family=Geist+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col font-sans text-slate-800 antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
