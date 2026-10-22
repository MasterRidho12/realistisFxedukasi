'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShieldAlert,
  Zap,
  Lock,
  Mail,
  User as UserIcon,
  Phone,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';
import { useUser } from '@/context/UserContext';

export default function AuthScreen() {
  const router = useRouter();
  const { register, login } = useUser();
  const [mode, setMode] = useState<'register' | 'login'>('register');

  // Register state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [accountType, setAccountType] = useState<'STANDARD' | 'CENT'>('STANDARD');
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !whatsapp.trim()) {
      setErrorMsg('Harap lengkapi semua kolom: Nama, Email, dan No. WhatsApp.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMsg('Kata sandi minimal 6 karakter.');
      return;
    }

    setErrorMsg('');
    register({
      name,
      email,
      whatsapp,
      password,
      accountType,
      tier: 'FREE',
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMsg('Masukkan email dan kata sandi Anda.');
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const success = login(normalizedEmail, password);
    if (!success) {
      setErrorMsg('Email atau kata sandi tidak valid. Silakan periksa kembali.');
      return;
    }

    setErrorMsg('');
    // If logging in with the authorized Admin email, route to /admin
    if (normalizedEmail === 'admin@realistisfx.com') {
      router.push('/admin');
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[350px] bg-[#00A651]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-[#0284C7]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl overflow-hidden border border-emerald-500/40 shadow-md bg-[#0a1f18] mb-3">
            <img
              alt="REALISTIS FX Logo"
              width={56}
              height={56}
              className="w-full h-full object-cover"
              src="/images/logo.png"
            />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center justify-center gap-1.5">
            REALISTIS<span className="text-[#00A651]"> FX</span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-[#00A651] border border-emerald-200 uppercase tracking-widest font-bold">
              Edukasi
            </span>
          </h1>
          <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto font-medium">
            Platform Edukasi &amp; Trading Tools Freemium untuk Menyelamatkan Retail Trader dari Margin Call
          </p>

          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold">
              ★ SOP Teruji Data
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#00A651] text-[10px] font-bold">
              ● Fixed SL 30 Pips
            </span>
          </div>
        </div>

        {/* Auth Card Clean White */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl relative">

          {/* Tabs: Register / Login */}
          <div className="flex rounded-xl bg-slate-100 p-1 mb-6 border border-slate-200">
            <button
              onClick={() => {
                setMode('register');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === 'register'
                  ? 'bg-[#00A651] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Daftar Akun Baru
            </button>
            <button
              onClick={() => {
                setMode('login');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-[#00A651] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Masuk (Login)
            </button>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {mode === 'register' ? (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nama Lengkap Trader
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#00A651] focus:ring-1 focus:ring-[#00A651] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Alamat Email Aktif
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama.trader@gmail.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#00A651] focus:ring-1 focus:ring-[#00A651] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nomor WhatsApp (Untuk Notifikasi Berita &amp; Konfirmasi)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="081234567890"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#00A651] focus:ring-1 focus:ring-[#00A651] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Kata Sandi Akun
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#00A651] focus:ring-1 focus:ring-[#00A651] transition-all"
                  />
                </div>
              </div>

              {/* Account Type Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Tipe Akun Trading Broker
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAccountType('STANDARD')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                      accountType === 'STANDARD'
                        ? 'bg-emerald-50 border-[#00A651] text-[#00A651] shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Akun Standard (USD)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAccountType('CENT')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                      accountType === 'CENT'
                        ? 'bg-emerald-50 border-[#00A651] text-[#00A651] shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Akun Cent (IDRC)
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-extrabold text-xs tracking-wide shadow-md shadow-[#00A651]/20 hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Daftar Akun Trader</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Terdaftar
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@gmail.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#00A651] focus:ring-1 focus:ring-[#00A651] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Kata Sandi
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#00A651] focus:ring-1 focus:ring-[#00A651] transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-extrabold text-xs tracking-wide shadow-md shadow-[#00A651]/20 hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Masuk ke Akun</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Anti-MC Security Note */}
        <div className="mt-4 flex items-center justify-center gap-2 text-center text-[11px] text-slate-500 font-medium">
          <ShieldAlert className="w-3.5 h-3.5 text-[#00A651]" />
          <span>RealistisFx: Zero Risk SOP &amp; Edukasi Anti Margin Call</span>
        </div>
      </div>
    </div>
  );
}
