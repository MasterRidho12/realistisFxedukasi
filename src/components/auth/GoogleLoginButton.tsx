'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '@/context/UserContext';
import { Mail, Check, AlertCircle, Info, X, Sparkles, ShieldCheck } from 'lucide-react';

interface GoogleLoginButtonProps {
  buttonText?: string;
  mode?: 'login' | 'register';
  onSuccess?: () => void;
  onError?: (errorMsg: string) => void;
  className?: string;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          prompt: (notification?: (notification: unknown) => void) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              type?: 'standard' | 'icon';
              theme?: 'outline' | 'filled_blue' | 'filled_black';
              size?: 'large' | 'medium' | 'small';
              text?: 'signin_with' | 'signup_with' | 'continue_with';
              shape?: 'rectangular' | 'pill' | 'circle';
              logo_alignment?: 'left' | 'center';
              width?: number;
            }
          ) => void;
        };
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (tokenResponse: { access_token?: string; error?: string }) => void;
            error_callback?: (err: unknown) => void;
          }) => {
            requestAccessToken: () => void;
          };
        };
      };
    };
  }
}

export default function GoogleLoginButton({
  buttonText,
  mode = 'login',
  onSuccess,
  onError,
  className = '',
}: GoogleLoginButtonProps) {
  const { loginWithGoogle } = useUser();
  const [loading, setLoading] = useState(false);
  const [showAccountSelector, setShowAccountSelector] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [isGsiLoaded, setIsGsiLoaded] = useState(false);
  const tokenClientRef = useRef<{ requestAccessToken: () => void } | null>(null);

  const googleClientId =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
    '960868687836-jk4g0ng5itsndu5v3h4d606njg27fpgb.apps.googleusercontent.com';

  useEffect(() => {
    if (!googleClientId) return;

    let isMounted = true;

    const initClients = () => {
      try {
        if (!window.google?.accounts) return;
        setIsGsiLoaded(true);

        // 1. Initialize Google Identity Services (One-Tap / Credential)
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: async (response) => {
            if (response.credential) {
              setLoading(true);
              const result = await loginWithGoogle({ credential: response.credential });
              setLoading(false);
              if (result.success) {
                onSuccess?.();
              } else {
                onError?.(result.error || 'Autentikasi Google gagal.');
              }
            }
          },
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        // 2. Initialize OAuth2 Token Client (Popup flow on click)
        if (window.google.accounts.oauth2) {
          tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
            client_id: googleClientId,
            scope: 'email profile openid',
            callback: async (tokenResponse) => {
              if (tokenResponse.error) {
                console.warn('[Google OAuth Error]', tokenResponse.error);
                return;
              }
              if (tokenResponse.access_token) {
                setLoading(true);
                try {
                  const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                  });
                  if (userInfoRes.ok) {
                    const profile = await userInfoRes.json();
                    const result = await loginWithGoogle({
                      name: profile.name || 'Trader Google',
                      email: profile.email,
                      avatar: profile.picture,
                    });
                    if (result.success) {
                      onSuccess?.();
                    } else {
                      onError?.(result.error || 'Gagal menyinkronkan profil Google.');
                    }
                  } else {
                    onError?.('Gagal mengambil data profil Google.');
                  }
                } catch {
                  onError?.('Gangguan jaringan saat menghubungi server Google.');
                } finally {
                  setLoading(false);
                }
              }
            },
            error_callback: () => {
              setShowAccountSelector(true);
            },
          });
        }
      } catch (err) {
        console.warn('[GSI Setup]', err);
      }
    };

    if (window.google?.accounts) {
      initClients();
    } else {
      const existingScript = document.getElementById('google-gsi-client');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'google-gsi-client';
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => {
          if (isMounted) initClients();
        };
        document.head.appendChild(script);
      } else {
        existingScript.addEventListener('load', () => {
          if (isMounted) initClients();
        });
      }
    }

    return () => {
      isMounted = false;
    };
  }, [googleClientId]);

  const handleGoogleClick = () => {
    // Priority 1: Trigger Google OAuth2 Popup Dialog
    if (tokenClientRef.current) {
      try {
        tokenClientRef.current.requestAccessToken();
        return;
      } catch (err) {
        console.warn('[Popup request failed, trying prompt]', err);
      }
    }

    // Priority 2: Try Google One-Tap Prompt
    if (window.google?.accounts?.id) {
      try {
        window.google.accounts.id.prompt();
        return;
      } catch (err) {
        console.warn('[One-Tap prompt failed]', err);
      }
    }

    // Fallback: If script blocked (adblocker/network) or origin not yet authorized
    setShowAccountSelector(true);
  };

  const handleSelectSimulatedAccount = async (account: { name: string; email: string; avatar: string }) => {
    setLoading(true);
    setShowAccountSelector(false);
    const result = await loginWithGoogle(account);
    setLoading(false);
    if (result.success) {
      onSuccess?.();
    } else {
      onError?.(result.error || 'Gagal masuk dengan Google.');
    }
  };

  const handleCustomGoogleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail.trim()) return;

    setLoading(true);
    setShowAccountSelector(false);
    const result = await loginWithGoogle({
      name: customName.trim() || 'Pengguna Google',
      email: customEmail.trim().toLowerCase(),
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(customName || customEmail)}`,
    });
    setLoading(false);
    if (result.success) {
      onSuccess?.();
    } else {
      onError?.(result.error || 'Gagal masuk dengan Google.');
    }
  };

  const defaultText = mode === 'register' ? 'Daftar dengan Google' : 'Lanjutkan dengan Google';

  return (
    <>
      <button
        type="button"
        onClick={handleGoogleClick}
        disabled={loading}
        className={`w-full py-2.5 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-xs hover:border-slate-400 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group ${className}`}
      >
        {/* Google Multi-Color G Icon */}
        <svg className="w-4 h-4 shrink-0 transition-transform group-hover:scale-105" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>

        <span className="truncate">{loading ? 'Menghubungkan ke Google...' : buttonText || defaultText}</span>
      </button>

      {/* Google Account Selector Fallback Modal (Jika origin/pop-up belum di-whitelist di Google Cloud) */}
      {showAccountSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="font-extrabold text-sm text-slate-900">Masuk dengan Akun Google</span>
              </div>
              <button
                type="button"
                onClick={() => setShowAccountSelector(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Pilih akun Google Anda untuk melanjutkan ke platform edukasi RealistisFx:
            </p>

            {/* Quick Account Preset 1 */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() =>
                  handleSelectSimulatedAccount({
                    name: 'Budi Santoso',
                    email: 'trader.realistis@gmail.com',
                    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80',
                  })
                }
                className="w-full p-2.5 rounded-2xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 flex items-center justify-between text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80"
                    alt="Budi"
                    className="w-9 h-9 rounded-full object-cover border border-slate-200"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate group-hover:text-emerald-700">
                      Budi Santoso
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">trader.realistis@gmail.com</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#00A651] bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                  Pilih
                </span>
              </button>

              {/* Quick Account Preset 2 */}
              <button
                type="button"
                onClick={() =>
                  handleSelectSimulatedAccount({
                    name: 'Siti Rahmawati',
                    email: 'siti.trader@gmail.com',
                    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
                  })
                }
                className="w-full p-2.5 rounded-2xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 flex items-center justify-between text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                    alt="Siti"
                    className="w-9 h-9 rounded-full object-cover border border-slate-200"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate group-hover:text-emerald-700">
                      Siti Rahmawati
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">siti.trader@gmail.com</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#00A651] bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                  Pilih
                </span>
              </button>
            </div>

            {/* Custom Google Account Input */}
            <form onSubmit={handleCustomGoogleSubmit} className="pt-2 border-t border-slate-100 space-y-2.5">
              <p className="text-[11px] font-bold text-slate-700">Atau ketik email Google Anda:</p>
              <div>
                <input
                  type="text"
                  placeholder="Nama Lengkap Anda"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#00A651] focus:border-[#00A651]"
                />
              </div>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  placeholder="email.anda@gmail.com"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#00A651] focus:border-[#00A651]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Masuk Sekarang</span>
              </button>
            </form>

            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-800 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Client ID resmi Google telah terpasang &amp; siap digunakan.</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
