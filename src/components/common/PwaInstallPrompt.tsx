'use client';

import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X, CheckCircle2, Share } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);

  useEffect(() => {
    // Check if already running in standalone mode (PWA installed)
    const isInStandaloneMode =
      window.matchMedia('(display-mode: standalone)').matches ||
      ('standalone' in window.navigator && (window.navigator as unknown as { standalone: boolean }).standalone === true);
    setIsStandalone(isInStandaloneMode);

    // Check if iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    // Check if previously dismissed in this session
    const dismissed = sessionStorage.getItem('realistisfx_pwa_dismissed');
    if (dismissed) {
      setIsDismissed(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsStandalone(true);
      }
      setDeferredPrompt(null);
    } else if (isIos) {
      setShowIosGuide(true);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      sessionStorage.setItem('realistisfx_pwa_dismissed', 'true');
    } catch {
      // ignore
    }
  };

  // If already installed or dismissed, do not show banner
  if (isStandalone || isDismissed) {
    return null;
  }

  // Only show if prompt is ready or on iOS Safari
  if (!deferredPrompt && !isIos) {
    return null;
  }

  return (
    <>
      {/* Floating Bottom PWA Install Bar */}
      <div className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-5 sm:max-w-md z-40 animate-in slide-in-from-bottom-5 duration-300">
        <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-[#00472B] via-[#005A36] to-[#00472B] text-white shadow-2xl border border-emerald-400/30 flex items-center justify-between gap-3 backdrop-blur-md">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0 text-white">
              <Smartphone className="w-5 h-5 text-[#4ADE80]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xs sm:text-sm text-white truncate">
                  Aplikasi RealistisFx
                </span>
                <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-[#4ADE80] text-[#00472B]">
                  PWA
                </span>
              </div>
              <p className="text-[11px] text-emerald-100 truncate">
                Pasang di HP / Desktop untuk akses instan &amp; cepat
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleInstallClick}
              className="px-3 py-2 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white text-xs font-black shadow-md shadow-black/20 flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Pasang App</span>
            </button>

            <button
              onClick={handleDismiss}
              className="p-1.5 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              title="Tutup Notifikasi"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* iOS Safari Guide Modal */}
      {showIosGuide && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 sm:p-6 text-slate-900 space-y-4 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-[#00A651]" />
                <h3 className="font-black text-sm sm:text-base text-slate-900">
                  Pasang di iPhone / iPad
                </h3>
              </div>
              <button
                onClick={() => setShowIosGuide(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Untuk menginstal RealistisFx sebagai aplikasi di perangkat Apple (iOS / Safari), ikuti 2 langkah mudah:
            </p>

            <div className="space-y-2.5 text-xs text-slate-800">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#00A651] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  Ketuk tombol <strong>Bagikan (Share)</strong>{' '}
                  <Share className="w-3.5 h-3.5 inline mx-0.5 text-sky-600" /> di bilah bawah browser Safari Anda.
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#00A651] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  Gulir ke bawah dan pilih <strong>&quot;Tambahkan ke Layar Utama&quot; (Add to Home Screen)</strong>.
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowIosGuide(false)}
              className="w-full py-2.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-extrabold text-xs transition-colors shadow-sm"
            >
              Saya Mengerti
            </button>
          </div>
        </div>
      )}
    </>
  );
}
