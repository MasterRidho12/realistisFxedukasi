'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Shield,
  Lock,
  Mail,
  ArrowRight,
  AlertTriangle,
  ArrowLeft,
  KeyRound,
  ShieldCheck
} from 'lucide-react';
import { useUser } from '@/context/UserContext';

export default function AdminAuthScreen() {
  const router = useRouter();
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    const normalizedEmail = email.trim().toLowerCase();

    // Security Verification: Admin portal only accepts authorized administrator email
    if (normalizedEmail !== 'admin@realistisfx.com') {
      setErrorMsg('Akses Ditolak: Email tidak terdaftar dalam daftar Administrator Resmi RealistisFx.');
      setIsLoading(false);
      return;
    }

    const success = login(email, password);
    setIsLoading(false);

    if (!success) {
      setErrorMsg('Kata sandi Administrator salah. Upaya akses tidak sah akan dicatat.');
      return;
    }

    // Success: Admin logged in, refresh/redirect to /admin
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background High Security Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Security Badge Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 shadow-xl shadow-amber-500/20 text-slate-950 mb-3 border border-amber-400/40">
            <Shield className="w-8 h-8" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[11px] font-black tracking-widest text-amber-400 uppercase">
              Restricted Area — Authorized Personnel Only
            </span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Portal Administrator
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            Pusat kendali, verifikasi bukti pembayaran QRIS, & hak akses sistem RealistisFx Edukasi
          </p>
        </div>

        {/* High Security Login Box */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl relative bg-[#0B0F19]/90 backdrop-blur-2xl">
          <div className="flex items-center gap-2 mb-5 pb-3 border-b border-white/10 text-xs font-bold text-slate-300">
            <KeyRound className="w-4 h-4 text-amber-400" />
            <span>Otentikasi Kredensial Administrator</span>
          </div>

          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-400" />
              <span className="leading-relaxed">{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email Administrator
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@realistisfx.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Kata Sandi Administrator
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:brightness-110 text-slate-950 font-black text-xs tracking-wider uppercase shadow-lg shadow-amber-500/25 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer mt-3 disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isLoading ? 'Memverifikasi...' : 'Masuk ke Dashboard Admin'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 pt-4 border-t border-white/5 text-center">
            <p className="text-[10px] text-slate-500 leading-relaxed">
              ⚠️ Peringatan: Halaman ini hanya untuk otoritas internal. Pendaftaran akun umum tidak diizinkan di portal ini.
            </p>
          </div>
        </div>

        {/* Back to Trader Button */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Website Trader RealistisFx</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
