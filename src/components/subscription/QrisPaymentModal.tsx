'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Crown,
  Sparkles,
  Upload,
  CheckCircle2,
  Copy,
  Check,
  MessageCircle,
  AlertTriangle,
  QrCode,
  ShieldCheck,
  CreditCard,
  Building2,
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  User,
  LogIn,
  UserPlus,
  Lock,
  Mail,
  Phone,
  Eye,
  EyeOff,
  Zap,
} from 'lucide-react';
import { useUser, PaymentPlanKey } from '@/context/UserContext';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';

export default function QrisPaymentModal() {
  const {
    user,
    login,
    register,
    logout,
    isPaymentModalOpen,
    setIsPaymentModalOpen,
    submitPaymentRequest,
    selectedPaymentPlan,
    setSelectedPaymentPlan,
    siteSettings,
  } = useUser();

  // Step state: 1: Akun Trader (Auth), 2: Pilih Paket, 3: Scan QRIS, 4: Kirim Bukti
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Auth form states (when not logged in)
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regWhatsapp, setRegWhatsapp] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regError, setRegError] = useState('');

  // Trader Profile & Plan States
  const [accountId, setAccountId] = useState(user.id || '');
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState(user.whatsapp || '');
  const [planDuration, setPlanDuration] = useState<PaymentPlanKey>(selectedPaymentPlan || 'EDUKASI');

  // Proof screenshot & state
  const [proofFile, setProofFile] = useState<string | null>(null);
  const [copiedNominal, setCopiedNominal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Sync state whenever modal opens or user authentication changes
  useEffect(() => {
    if (user.isAuthenticated) {
      setAccountId(user.id);
      setName(user.name);
      setEmail(user.email);
      if (user.whatsapp) setPhone(user.whatsapp);
      // If user is already authenticated when opening, or just logged in on Step 1, advance to Step 2
      if (step === 1) {
        setStep(2);
      }
    } else {
      setStep(1);
    }
  }, [user.isAuthenticated, user.id, user.name, user.email, user.whatsapp, isPaymentModalOpen]);

  useEffect(() => {
    if (selectedPaymentPlan) {
      setPlanDuration(selectedPaymentPlan);
    }
  }, [selectedPaymentPlan, isPaymentModalOpen]);

  if (!isPaymentModalOpen) return null;

  const planPricing: Record<
    PaymentPlanKey,
    {
      name: string;
      amount: number;
      label: string;
      badge: string;
      desc: string;
      features: string[];
      savings?: string;
    }
  > = {
    EDUKASI: {
      name: 'Paket Edukasi Trader Realistis (Modul Lengkap Lvl 1-5)',
      amount: 100000,
      label: 'Rp 100.000',
      badge: 'Sekali Bayar • Akses Selamanya',
      desc: 'Akses penuh selamanya ke seluruh 5 modul Gamified Academy, SOP Money Management 1%, dan Analisis Teknikal Baku.',
      features: [
        '5 Modul Edukasi Lengkap (Pondasi MM 1%, Key Level S&R, Anti-FOMO, News, Teknikal & MM)',
        'SOP Baku Money Management 1% & Aturan Ketat Anti-Margin Call',
        'Metode Baku Fixed Stop Loss 30 Pips & Risk Reward 1:2',
        'Kalkulator Lot Unlimited (Semua Pair Forex & XAUUSD Gold)',
        'Checklist SOP Anti-FOMO & Jurnal Trading Interaktif',
        'Ujian Akhir SOP (Evaluasi Pemahaman Analisis Teknikal & Money Management)',
        'Akses materi selamanya tanpa biaya bulanan (Lifetime)',
      ],
    },
    '1_MONTH': {
      name: 'Paket Edukasi Trader Realistis (Modul Lengkap Lvl 1-5)',
      amount: 100000,
      label: 'Rp 100.000',
      badge: 'Sekali Bayar • Akses Selamanya',
      desc: 'Akses penuh ke seluruh modul edukasi dan kalkulator.',
      features: [
        '5 Modul Edukasi Lengkap (Lvl 1-5)',
        'SOP Baku Anti-Margin Call',
        'Kalkulator Lot Unlimited Seluruh Pair',
      ],
    },
    '3_MONTHS': {
      name: 'Paket Edukasi Trader Realistis',
      amount: 100000,
      label: 'Rp 100.000',
      badge: 'Sekali Bayar',
      desc: 'Akses seluruh modul edukasi.',
      features: ['5 Modul Edukasi Lengkap'],
    },
    '1_YEAR': {
      name: 'Paket Edukasi Trader Realistis',
      amount: 100000,
      label: 'Rp 100.000',
      badge: 'Sekali Bayar',
      desc: 'Akses seluruh modul edukasi.',
      features: ['5 Modul Edukasi Lengkap'],
    },
  };

  const currentPlan = planPricing['EDUKASI'];
  const adminWhatsAppNumber = siteSettings?.adminWhatsAppNumber || '6287774229255';

  const handleCopyNominal = () => {
    navigator.clipboard.writeText(currentPlan.amount.toString());
    setCopiedNominal(true);
    setTimeout(() => setCopiedNominal(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Inline Login Handler in Step 1
  const handleInlineLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginEmail.trim() || !loginPassword) {
      setLoginError('Harap masukkan email dan kata sandi Anda.');
      return;
    }
    const success = login(loginEmail.trim(), loginPassword);
    if (!success) {
      setLoginError('Email atau kata sandi tidak cocok. Silakan periksa kembali.');
      return;
    }
    // Advance to Step 2 smoothly
    setStep(2);
  };

  // Demo Login Helper
  const handleDemoLogin = () => {
    setLoginError('');
    const success = login('trader@realistisfx.com', 'trader123');
    if (success) {
      setStep(2);
    }
  };

  // Inline Register Handler in Step 1
  const handleInlineRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    if (!regName.trim() || !regEmail.trim() || !regWhatsapp.trim()) {
      setRegError('Semua kolom wajib diisi: Nama, Email, dan WhatsApp.');
      return;
    }
    if (!regPassword || regPassword.length < 6) {
      setRegError('Kata sandi minimal 6 karakter.');
      return;
    }
    register({
      name: regName.trim(),
      email: regEmail.trim(),
      whatsapp: regWhatsapp.trim(),
      password: regPassword,
      accountType: 'STANDARD',
      tier: 'FREE',
    });
    // Advance to Step 2 smoothly
    setStep(2);
  };

  // Pre-filled WhatsApp message
  const waMessage = encodeURIComponent(
    `Halo Admin RealistisFx Edukasi! 👋\n` +
      `Saya telah melakukan pembayaran via QRIS.\n\n` +
      `📌 ID Akun Trader: ${user.id || accountId}\n` +
      `👤 Nama: ${user.name || name}\n` +
      `📧 Email: ${user.email || email}\n` +
      `📱 No. WhatsApp: ${phone || user.whatsapp}\n` +
      `💳 Paket: ${currentPlan.name} (${currentPlan.label})\n` +
      `🧾 Nominal Transfer: Rp ${currentPlan.amount.toLocaleString('id-ID')}\n` +
      `🏦 Metode: Scan QRIS RealistisFx\n\n` +
      `Bukti transfer sudah saya simpan. Mohon bantuan aktivasi akun saya. Terima kasih!`
  );

  const waUrl = `https://wa.me/${adminWhatsAppNumber}?text=${waMessage}`;

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    submitPaymentRequest({
      accountId: user.id || accountId,
      name: user.name || name,
      email: user.email || email,
      phone: phone || user.whatsapp || '081234567890',
      planName: currentPlan.name,
      amount: currentPlan.amount,
      proofScreenshot: proofFile || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80',
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-5 sm:p-7 md:p-8 lg:p-9 border border-slate-200 w-full max-w-2xl md:max-w-4xl lg:max-w-5xl shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto transition-all">
        {/* Close Button */}
        <button
          onClick={() => {
            setIsPaymentModalOpen(false);
            setSubmitted(false);
          }}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer z-10"
          title="Tutup Modal Pembayaran"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-6">
            {/* 4-Step Progress Stepper Indicator (Executive Desktop & Mobile) */}
            <div className="border-b border-slate-100 pb-5">
              <div className="flex items-center justify-between max-w-3xl mx-auto">
                {/* Step 1: Akun */}
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={`flex items-center gap-2.5 group cursor-pointer transition-all ${
                    step === 1 ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                      user.isAuthenticated
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : step === 1
                        ? 'bg-[#00A651] text-white ring-4 ring-emerald-100 shadow-xs'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {user.isAuthenticated ? <Check className="w-4 h-4 stroke-[3]" /> : '1'}
                  </div>
                  <div className="text-left hidden sm:block">
                    <span
                      className={`block text-xs font-bold leading-none ${
                        step === 1 ? 'text-[#00A651]' : 'text-slate-800'
                      }`}
                    >
                      1. Akun Trader
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">Verifikasi Data</span>
                  </div>
                  <span
                    className={`sm:hidden text-[11px] font-bold ${
                      step === 1 ? 'text-[#00A651]' : 'text-slate-600'
                    }`}
                  >
                    1. Akun
                  </span>
                </button>

                <div
                  className={`h-0.5 flex-1 mx-2 sm:mx-4 transition-colors ${
                    step >= 2 ? 'bg-[#00A651]' : 'bg-slate-200'
                  }`}
                />

                {/* Step 2: Pilih Paket */}
                <button
                  type="button"
                  disabled={!user.isAuthenticated}
                  onClick={() => user.isAuthenticated && setStep(2)}
                  className={`flex items-center gap-2.5 group transition-all ${
                    !user.isAuthenticated
                      ? 'opacity-40 cursor-not-allowed'
                      : step === 2
                      ? 'opacity-100 cursor-pointer'
                      : 'opacity-70 hover:opacity-100 cursor-pointer'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                      step > 2
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : step === 2
                        ? 'bg-[#00A651] text-white ring-4 ring-emerald-100 shadow-xs'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {step > 2 ? <Check className="w-4 h-4 stroke-[3]" /> : '2'}
                  </div>
                  <div className="text-left hidden sm:block">
                    <span
                      className={`block text-xs font-bold leading-none ${
                        step === 2 ? 'text-[#00A651]' : 'text-slate-800'
                      }`}
                    >
                      2. Pilihan Paket
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">Edukasi &amp; VIP</span>
                  </div>
                  <span
                    className={`sm:hidden text-[11px] font-bold ${
                      step === 2 ? 'text-[#00A651]' : 'text-slate-600'
                    }`}
                  >
                    2. Paket
                  </span>
                </button>

                <div
                  className={`h-0.5 flex-1 mx-2 sm:mx-4 transition-colors ${
                    step >= 3 ? 'bg-[#00A651]' : 'bg-slate-200'
                  }`}
                />

                {/* Step 3: Scan QRIS */}
                <button
                  type="button"
                  disabled={!user.isAuthenticated}
                  onClick={() => user.isAuthenticated && setStep(3)}
                  className={`flex items-center gap-2.5 group transition-all ${
                    !user.isAuthenticated
                      ? 'opacity-40 cursor-not-allowed'
                      : step === 3
                      ? 'opacity-100 cursor-pointer'
                      : 'opacity-70 hover:opacity-100 cursor-pointer'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                      step > 3
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : step === 3
                        ? 'bg-[#00A651] text-white ring-4 ring-emerald-100 shadow-xs'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {step > 3 ? <Check className="w-4 h-4 stroke-[3]" /> : '3'}
                  </div>
                  <div className="text-left hidden sm:block">
                    <span
                      className={`block text-xs font-bold leading-none ${
                        step === 3 ? 'text-[#00A651]' : 'text-slate-800'
                      }`}
                    >
                      3. Scan QRIS
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">Pembayaran Instan</span>
                  </div>
                  <span
                    className={`sm:hidden text-[11px] font-bold ${
                      step === 3 ? 'text-[#00A651]' : 'text-slate-600'
                    }`}
                  >
                    3. QRIS
                  </span>
                </button>

                <div
                  className={`h-0.5 flex-1 mx-2 sm:mx-4 transition-colors ${
                    step >= 4 ? 'bg-[#00A651]' : 'bg-slate-200'
                  }`}
                />

                {/* Step 4: Kirim Bukti */}
                <button
                  type="button"
                  disabled={!user.isAuthenticated}
                  onClick={() => user.isAuthenticated && setStep(4)}
                  className={`flex items-center gap-2.5 group transition-all ${
                    !user.isAuthenticated
                      ? 'opacity-40 cursor-not-allowed'
                      : step === 4
                      ? 'opacity-100 cursor-pointer'
                      : 'opacity-70 hover:opacity-100 cursor-pointer'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                      step === 4
                        ? 'bg-[#00A651] text-white ring-4 ring-emerald-100 shadow-xs'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    4
                  </div>
                  <div className="text-left hidden sm:block">
                    <span
                      className={`block text-xs font-bold leading-none ${
                        step === 4 ? 'text-[#00A651]' : 'text-slate-800'
                      }`}
                    >
                      4. Konfirmasi
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">Upload Bukti</span>
                  </div>
                  <span
                    className={`sm:hidden text-[11px] font-bold ${
                      step === 4 ? 'text-[#00A651]' : 'text-slate-600'
                    }`}
                  >
                    4. Bukti
                  </span>
                </button>
              </div>
            </div>

            {/* =========================================================================
                SLIDE 1: AKUN TRADER & AUTENTIKASI (CLEAN 2-COLUMN ON DESKTOP)
               ========================================================================= */}
            {step === 1 && (
              <div className="animate-in fade-in duration-150">
                {!user.isAuthenticated ? (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                    {/* Left Column (Desktop): Security & Benefit Info */}
                    <div className="md:col-span-5 bg-gradient-to-br from-emerald-50 via-slate-50 to-emerald-50/40 rounded-2xl p-5 sm:p-6 border border-emerald-200/80 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-100 text-[#00A651] text-[11px] font-extrabold">
                          <Lock className="w-3.5 h-3.5" />
                          <span>AUTENTIKASI TRADER</span>
                        </div>
                        <h4 className="font-black text-slate-900 text-base leading-snug">
                          Masuk atau Buat Akun Sebelum Membayar
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Akses kurikulum modul Level 1-5, SOP Money Management, dan Sinyal AI akan langsung terikat otomatis ke akun Anda setelah diverifikasi.
                        </p>

                        {/* Selected Plan Highlight */}
                        <div className="p-3 rounded-xl bg-white border border-emerald-200 shadow-2xs space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">
                            Paket yang Akan Dibeli:
                          </span>
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-xs text-slate-900 truncate">
                              {currentPlan.name}
                            </span>
                            <span className="font-black font-mono text-xs text-[#00A651] shrink-0 ml-2">
                              {currentPlan.label}
                            </span>
                          </div>
                        </div>

                        {/* Guarantees */}
                        <div className="space-y-2 pt-2 text-[11px] text-slate-600">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-[#00A651] shrink-0" />
                            <span>100% Data aman &amp; bebas dari grup spam</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#00A651] shrink-0" />
                            <span>Akses modul permanen seumur hidup</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                            <span>Aktivasi kilat admin 5-15 menit via QRIS</span>
                          </div>
                        </div>
                      </div>

                      {/* Demo Login Button */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={handleDemoLogin}
                          className="w-full py-2 px-3 rounded-xl bg-white border border-emerald-300 text-[11px] font-bold text-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                        >
                          <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span>Klik Cepat: Akun Contoh (trader@realistisfx.com)</span>
                        </button>
                      </div>
                    </div>

                    {/* Right Column (Desktop): Forms (Login / Register) */}
                    <div className="md:col-span-7 space-y-4">
                      {/* Mode Tabs Switcher */}
                      <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200">
                        <button
                          type="button"
                          onClick={() => {
                            setAuthTab('login');
                            setLoginError('');
                          }}
                          className={`flex-1 py-2.5 rounded-lg text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            authTab === 'login'
                              ? 'bg-[#00A651] text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <LogIn className="w-3.5 h-3.5" />
                          <span>Sudah Ada Akun (Masuk)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setAuthTab('register');
                            setRegError('');
                          }}
                          className={`flex-1 py-2.5 rounded-lg text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            authTab === 'register'
                              ? 'bg-[#00A651] text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <UserPlus className="w-3.5 h-3.5" />
                          <span>Daftar Akun Baru</span>
                        </button>
                      </div>

                      {/* TAB: LOGIN */}
                      {authTab === 'login' && (
                        <form onSubmit={handleInlineLogin} className="space-y-3.5">
                          {loginError && (
                            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 shrink-0" />
                              <span>{loginError}</span>
                            </div>
                          )}

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              Alamat Email Akun Anda
                            </label>
                            <div className="relative">
                              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                              <input
                                type="email"
                                required
                                placeholder="nama@email.com"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#00A651] focus:border-[#00A651] outline-hidden transition-all text-slate-900"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              Kata Sandi
                            </label>
                            <div className="relative">
                              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                              <input
                                type={showLoginPassword ? 'text' : 'password'}
                                required
                                placeholder="Ketik kata sandi"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#00A651] focus:border-[#00A651] outline-hidden transition-all text-slate-900"
                              />
                              <button
                                type="button"
                                onClick={() => setShowLoginPassword(!showLoginPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer transition-colors"
                              >
                                {showLoginPassword ? (
                                  <EyeOff className="w-4 h-4 text-slate-600" />
                                ) : (
                                  <Eye className="w-4 h-4 text-slate-400" />
                                )}
                              </button>
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="w-full py-3.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-black text-xs shadow-md shadow-[#00A651]/20 hover:scale-[1.01] active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                          >
                            <span>Masuk &amp; Lanjut ke Pilihan Paket</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>

                          <div className="relative my-2.5">
                            <div className="absolute inset-0 flex items-center">
                              <div className="w-full border-t border-slate-200" />
                            </div>
                            <div className="relative flex justify-center text-[10px] uppercase">
                              <span className="bg-white px-2 text-slate-400 font-bold tracking-wider">
                                atau masuk dengan
                              </span>
                            </div>
                          </div>

                          <GoogleLoginButton
                            mode="login"
                            buttonText="Masuk dengan Google"
                            onSuccess={() => setStep(2)}
                            onError={(err) => setLoginError(err)}
                          />
                        </form>
                      )}

                      {/* TAB: REGISTER */}
                      {authTab === 'register' && (
                        <form onSubmit={handleInlineRegister} className="space-y-3">
                          {regError && (
                            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 shrink-0" />
                              <span>{regError}</span>
                            </div>
                          )}

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                Nama Lengkap Trader
                              </label>
                              <div className="relative">
                                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                                <input
                                  type="text"
                                  required
                                  placeholder="Contoh: Budi Santoso"
                                  value={regName}
                                  onChange={(e) => setRegName(e.target.value)}
                                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#00A651] focus:border-[#00A651] outline-hidden transition-all text-slate-900"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                No. WhatsApp (Aktif)
                              </label>
                              <div className="relative">
                                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                                <input
                                  type="tel"
                                  required
                                  placeholder="081234567890"
                                  value={regWhatsapp}
                                  onChange={(e) => setRegWhatsapp(e.target.value)}
                                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#00A651] focus:border-[#00A651] outline-hidden transition-all text-slate-900 font-mono"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                Alamat Email Aktif
                              </label>
                              <div className="relative">
                                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                                <input
                                  type="email"
                                  required
                                  placeholder="nama@email.com"
                                  value={regEmail}
                                  onChange={(e) => setRegEmail(e.target.value)}
                                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#00A651] focus:border-[#00A651] outline-hidden transition-all text-slate-900"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                Kata Sandi Baru
                              </label>
                              <div className="relative">
                                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                                <input
                                  type={showRegPassword ? 'text' : 'password'}
                                  required
                                  placeholder="Min. 6 karakter"
                                  value={regPassword}
                                  onChange={(e) => setRegPassword(e.target.value)}
                                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#00A651] focus:border-[#00A651] outline-hidden transition-all text-slate-900"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowRegPassword(!showRegPassword)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer transition-colors"
                                >
                                  {showRegPassword ? (
                                    <EyeOff className="w-4 h-4 text-slate-600" />
                                  ) : (
                                    <Eye className="w-4 h-4 text-slate-400" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="w-full py-3.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-black text-xs shadow-md shadow-[#00A651]/20 hover:scale-[1.01] active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                          >
                            <span>Daftar Akun &amp; Lanjut ke Pilihan Paket</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>

                          <div className="relative my-2.5">
                            <div className="absolute inset-0 flex items-center">
                              <div className="w-full border-t border-slate-200" />
                            </div>
                            <div className="relative flex justify-center text-[10px] uppercase">
                              <span className="bg-white px-2 text-slate-400 font-bold tracking-wider">
                                atau daftar dengan
                              </span>
                            </div>
                          </div>

                          <GoogleLoginButton
                            mode="register"
                            buttonText="Daftar dengan Google"
                            onSuccess={() => setStep(2)}
                            onError={(err) => setRegError(err)}
                          />
                        </form>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Tampilan Terautentikasi (User Sudah Login) — Desktop 2-Column Clean Layout */
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-7 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-[#00A651] text-white font-black flex items-center justify-center text-base shadow-sm">
                            {user.name ? user.name.slice(0, 2).toUpperCase() : 'TR'}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h4 className="font-black text-sm text-slate-900">{user.name}</h4>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Akun Terverifikasi
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 font-mono">{user.email}</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setStep(1);
                          }}
                          className="text-xs font-bold text-rose-600 hover:text-rose-800 hover:underline cursor-pointer"
                        >
                          Ganti Akun
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">
                            ID Akun Trader
                          </label>
                          <input
                            type="text"
                            readOnly
                            value={user.id}
                            className="w-full p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-bold cursor-not-allowed"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">
                            Nomor WhatsApp Notifikasi
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="Contoh: 081234567890"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-mono font-bold focus:ring-2 focus:ring-[#00A651] focus:border-[#00A651] outline-hidden transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-5 p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-4 text-center md:text-left">
                      <div className="space-y-1">
                        <span className="text-[10px] text-emerald-700 font-extrabold uppercase tracking-wider block">
                          PAKET YANG TERPILIH SAAT INI:
                        </span>
                        <h4 className="font-black text-slate-900 text-base">
                          {currentPlan.name}
                        </h4>
                        <div className="font-black font-mono text-lg text-[#00A651]">
                          {currentPlan.label}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="w-full py-3.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-black text-xs shadow-md shadow-[#00A651]/20 hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Lanjut ke Pilihan Paket Langganan</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* =========================================================================
                SLIDE 2: PILIH PAKET EDUKASI (FOKUS EDUKASI 100K & GRATIS DASAR FOREX)
               ========================================================================= */}
            {step === 2 && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-[#00A651] border border-emerald-200 text-[11px] font-bold">
                    <Sparkles className="w-3.5 h-3.5" /> LANGKAH 2: PILIH PAKET EDUKASI
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-slate-900">
                    Pilihan Paket Edukasi RealistisFx
                  </h3>
                  <p className="text-xs text-slate-600">
                    Akses paket akan otomatis aktif ke akun trader{' '}
                    <strong className="text-slate-900 font-mono">{user.name || name}</strong> (ID: {user.id || accountId}).
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Card 1: Edukasi Gratis (Dasar-dasar Forex) */}
                  <div className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-slate-200 text-slate-600 flex items-center justify-center shrink-0">
                            <GraduationCap className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-extrabold text-sm text-slate-900">
                              Edukasi Dasar Forex (Gratis)
                            </h4>
                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider mt-1 bg-slate-200 text-slate-700">
                              Gratis untuk Pemula
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                          Aktif
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Materi pengenalan dasar forex untuk trader pemula yang baru memulai trading.
                      </p>

                      <div className="space-y-1 text-[11px] text-slate-700 pt-1">
                        <div className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <span className="leading-tight">Modul Dasar: Pengenalan Pasar Forex</span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <span className="leading-tight">Memahami Pips, Spread, Lot, dan Leverage</span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <span className="leading-tight">Dasar Baca Candlestick & Trend Pasar</span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <span className="leading-tight">Kalkulator Lot Dasar (Maks. 3x/hari)</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-baseline justify-between">
                      <div className="text-base font-black font-mono text-slate-700">
                        Rp 0 (Gratis)
                      </div>
                      <span className="text-[11px] font-bold text-slate-500">
                        Tersedia Bebas
                      </span>
                    </div>
                  </div>

                  {/* Card 2: Paket Edukasi Realistis Rp 100.000 (Rekomendasi Utama) */}
                  <div className="p-5 rounded-2xl border-2 border-[#00A651] bg-emerald-50/70 shadow-md ring-2 ring-[#00A651]/20 flex flex-col justify-between space-y-4 relative">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-[#00A651] text-white flex items-center justify-center shrink-0 shadow-xs">
                            <Sparkles className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-extrabold text-sm text-slate-900">
                              Paket Edukasi Lengkap Realistis
                            </h4>
                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider mt-1 bg-[#00A651] text-white">
                              Sekali Bayar • Akses Selamanya
                            </span>
                          </div>
                        </div>

                        <div className="w-5 h-5 rounded-full border-2 border-[#00A651] bg-[#00A651] text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Kurikulum lengkap SOP Anti Margin Call, Money Management 1%, dan seluruh tools trading tanpa batas.
                      </p>

                      <div className="space-y-1 text-[11px] text-slate-800 pt-1 font-medium">
                        <div className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#00A651] shrink-0 mt-0.5" />
                          <span className="leading-tight">Akses Penuh Seluruh Modul Lvl 1 - 5</span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#00A651] shrink-0 mt-0.5" />
                          <span className="leading-tight">SOP Baku Money Management 1% &amp; Fixed SL 30 Pips</span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#00A651] shrink-0 mt-0.5" />
                          <span className="leading-tight">Kalkulator Lot Unlimited (Semua Pair + XAUUSD)</span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#00A651] shrink-0 mt-0.5" />
                          <span className="leading-tight">Checklist SOP Anti-FOMO &amp; Jurnal Interaktif</span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#00A651] shrink-0 mt-0.5" />
                          <span className="leading-tight">Ujian Akhir SOP (Evaluasi Pemahaman Teknikal &amp; MM)</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-emerald-200 flex items-baseline justify-between">
                      <div>
                        <div className="text-xl font-black font-mono text-[#00A651]">
                          Rp 100.000
                        </div>
                        <span className="text-[10px] text-emerald-800 font-extrabold block">
                          Sekali bayar seumur hidup (Tanpa iuran bulanan)
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-[#00A651] bg-white px-2 py-0.5 rounded-full border border-emerald-300">
                        Terpilih ✓
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Navigation Buttons */}
                <div className="flex gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Kembali ke Akun</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 py-3.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-black text-xs shadow-md shadow-[#00A651]/20 hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Lanjut ke Scan QRIS (Rp 100.000)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* =========================================================================
                SLIDE 3: SCAN QRIS RESMI (CLEAN 2-COLUMN DESKTOP SPLIT)
               ========================================================================= */}
            {step === 3 && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-[#00A651] border border-emerald-200 text-[11px] font-bold">
                    <QrCode className="w-3.5 h-3.5" /> LANGKAH 3: SCAN QRIS RESMI
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-slate-900">
                    Scan QRIS RealistisFx untuk Pembayaran Otomatis
                  </h3>
                  <p className="text-xs text-slate-600">
                    Mendukung seluruh Mobile Banking (BCA, Mandiri, BRI, BNI) dan E-Wallet (GoPay, OVO, Dana, ShopeePay).
                  </p>
                </div>

                {/* 2-Column Desktop Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Left Column: Authentic Official QR Code Card */}
                  <div className="md:col-span-5 bg-white rounded-2xl p-5 text-slate-900 shadow-xl border-2 border-slate-300 max-w-sm mx-auto w-full">
                    {/* Top Bar QRIS */}
                    <div className="flex items-center justify-between border-b pb-2.5 mb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="bg-red-600 text-white font-black text-xs px-2 py-0.5 rounded tracking-tighter">
                          QRIS
                        </div>
                        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                          Standar Nasional
                        </span>
                      </div>
                      <span className="text-[9px] font-bold text-slate-600 uppercase">
                        GPN / ASPI
                      </span>
                    </div>

                    {/* Merchant Details */}
                    <div className="text-center mb-2.5">
                      <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 uppercase tracking-tight">
                        {siteSettings?.qrisMerchantName || 'REALISTISFX EDUKASI SAAS'}
                      </h3>
                      <p className="text-[10px] text-slate-500 font-mono">
                        NMID: {siteSettings?.qrisNmid || 'ID102439281729'}
                      </p>
                    </div>

                    {/* High Quality Crisp QR Code SVG */}
                    <div className="flex justify-center p-3 bg-slate-50 rounded-xl border border-slate-200 w-48 h-48 sm:w-52 sm:h-52 mx-auto relative group">
                      <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900" fill="currentColor">
                        <rect x="5" y="5" width="26" height="26" fill="black" />
                        <rect x="8" y="8" width="20" height="20" fill="white" />
                        <rect x="11" y="11" width="14" height="14" fill="black" />

                        <rect x="69" y="5" width="26" height="26" fill="black" />
                        <rect x="72" y="8" width="20" height="20" fill="white" />
                        <rect x="75" y="11" width="14" height="14" fill="black" />

                        <rect x="5" y="69" width="26" height="26" fill="black" />
                        <rect x="8" y="72" width="20" height="20" fill="white" />
                        <rect x="11" y="75" width="14" height="14" fill="black" />

                        {/* Pattern dots */}
                        <rect x="35" y="8" width="5" height="5" />
                        <rect x="45" y="8" width="5" height="5" />
                        <rect x="55" y="8" width="5" height="5" />
                        <rect x="35" y="18" width="5" height="5" />
                        <rect x="48" y="18" width="8" height="5" />
                        <rect x="60" y="18" width="5" height="5" />

                        <rect x="8" y="35" width="5" height="5" />
                        <rect x="18" y="35" width="8" height="5" />
                        <rect x="35" y="35" width="6" height="6" />
                        <rect x="45" y="35" width="5" height="5" />
                        <rect x="55" y="35" width="8" height="8" />
                        <rect x="68" y="35" width="5" height="5" />
                        <rect x="78" y="35" width="8" height="5" />

                        <rect x="8" y="48" width="8" height="5" />
                        <rect x="20" y="48" width="5" height="5" />
                        <rect x="32" y="48" width="8" height="5" />
                        <rect x="45" y="48" width="10" height="10" />
                        <rect x="60" y="48" width="5" height="5" />
                        <rect x="72" y="48" width="8" height="8" />
                        <rect x="85" y="48" width="5" height="5" />

                        <rect x="8" y="58" width="5" height="5" />
                        <rect x="22" y="58" width="5" height="5" />
                        <rect x="35" y="58" width="5" height="5" />
                        <rect x="60" y="58" width="8" height="5" />
                        <rect x="75" y="58" width="5" height="5" />
                        <rect x="85" y="58" width="6" height="6" />

                        <rect x="35" y="69" width="8" height="5" />
                        <rect x="48" y="69" width="5" height="5" />
                        <rect x="60" y="69" width="5" height="5" />
                        <rect x="72" y="69" width="8" height="5" />
                        <rect x="85" y="69" width="5" height="5" />

                        <rect x="35" y="78" width="5" height="5" />
                        <rect x="45" y="78" width="10" height="8" />
                        <rect x="60" y="78" width="6" height="6" />
                        <rect x="75" y="78" width="8" height="5" />

                        <rect x="35" y="88" width="8" height="5" />
                        <rect x="48" y="88" width="5" height="5" />
                        <rect x="60" y="88" width="12" height="5" />
                        <rect x="78" y="88" width="5" height="5" />
                      </svg>

                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-8 h-8 rounded-lg bg-[#00A651] text-white font-black text-xs flex items-center justify-center shadow-lg border-2 border-white">
                          RFX
                        </div>
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-500 text-center mt-3 leading-tight">
                      Mendukung seluruh Mobile Banking &amp; E-Wallet Indonesia
                    </div>
                  </div>

                  {/* Right Column: Nominal, Copy Button, Instructions & Guide */}
                  <div className="md:col-span-7 space-y-4">
                    {/* Big Nominal Highlight Card */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <span className="text-[10px] text-slate-500 uppercase font-black tracking-wider block">
                        TOTAL NOMINAL TRANSFER TEPAT:
                      </span>
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">
                          Rp {currentPlan.amount.toLocaleString('id-ID')}
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyNominal}
                          className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors shrink-0"
                        >
                          {copiedNominal ? (
                            <>
                              <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                              <span className="text-emerald-700">Tersalin ✓</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span>Salin Rp</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Transfer dengan nominal tepat di atas untuk memastikan verifikasi otomatis berjalan cepat tanpa kendala.
                      </p>
                    </div>

                    {/* Step-by-Step Payment Instructions */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2.5 text-xs text-slate-700">
                      <h4 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-[#00A651]" />
                        <span>Panduan Pembayaran 3 Langkah Cepat:</span>
                      </h4>
                      <ol className="space-y-1.5 list-decimal list-inside text-[11px] leading-relaxed text-slate-600">
                        <li>
                          Buka aplikasi <strong>BCA, Mandiri, BRI, BNI, GoPay, OVO, atau Dana</strong>.
                        </li>
                        <li>
                          Pilih menu <strong>Scan / Bayar QRIS</strong>, lalu arahkan kamera ke barcode di samping.
                        </li>
                        <li>
                          Pastikan nama penerima <strong>{siteSettings?.qrisMerchantName || 'REALISTISFX EDUKASI SAAS'}</strong>, selesaikan pembayaran, dan simpan screenshot resi.
                        </li>
                      </ol>
                    </div>

                    {/* Bottom Navigation Buttons */}
                    <div className="flex gap-2 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Ganti Paket</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(4)}
                        className="flex-1 py-3.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-black text-xs shadow-md shadow-[#00A651]/20 hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Saya Sudah Transfer, Upload Bukti</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                SLIDE 4: UPLOAD BUKTI & KONFIRMASI (CLEAN 2-COLUMN DESKTOP SPLIT)
               ========================================================================= */}
            {step === 4 && (
              <form onSubmit={handleSubmitProof} className="space-y-5 animate-in fade-in duration-150">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-[#00A651] border border-emerald-200 text-[11px] font-bold">
                    <Upload className="w-3.5 h-3.5" /> LANGKAH 4: KIRIM BUKTI &amp; AKTIVASI
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-slate-900">
                    Upload Screenshot Bukti Transfer QRIS Anda
                  </h3>
                  <p className="text-xs text-slate-600">
                    Sistem kami akan memvalidasi bukti Anda. Akun trader akan diaktifkan secara instan oleh admin.
                  </p>
                </div>

                {/* 2-Column Desktop Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Left Column: File Upload Dropzone */}
                  <div className="md:col-span-6 space-y-3">
                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <span className="text-xs font-bold text-slate-900 block">
                        Pilih Screenshot Resi Pembayaran QRIS:
                      </span>

                      <label className="border-2 border-dashed border-slate-300 hover:border-[#00A651] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-white group text-center">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00A651] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                          <Upload className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-slate-800">
                          Klik untuk Pilih File Bukti Transfer
                        </span>
                        <span className="text-[10px] text-slate-500 mt-1">
                          Format PNG, JPG, JPEG (Maksimal 5MB)
                        </span>
                        <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                      </label>

                      {proofFile && (
                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#00A651]" />
                            <span className="text-xs text-slate-800 font-bold">Screenshot Siap Dikirim</span>
                          </div>
                          <span className="text-[11px] text-[#00A651] font-bold">Terlampir ✓</span>
                        </div>
                      )}

                      <p className="text-[10px] text-slate-500 leading-relaxed">
                        Pastikan screenshot bukti transfer menampilkan jam, tanggal, nominal, dan nomor referensi transaksi.
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Invoice Summary & Direct WA Admin CTA */}
                  <div className="md:col-span-6 space-y-4">
                    {/* Invoice Recap */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
                      <h4 className="font-extrabold text-slate-900 text-xs border-b border-slate-200 pb-2">
                        Ringkasan Pesanan Anda
                      </h4>
                      <div className="flex justify-between">
                        <span className="text-slate-500">ID Akun Trader:</span>
                        <span className="font-mono text-slate-900 font-bold">{user.id || accountId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Nama Trader:</span>
                        <span className="font-bold text-slate-900">{user.name || name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Nomor WhatsApp:</span>
                        <span className="font-mono text-slate-900 font-bold">{phone || user.whatsapp}</span>
                      </div>
                      <div className="flex justify-between border-t border-slate-200 pt-2">
                        <span className="text-slate-500">Paket:</span>
                        <span className="font-bold text-[#00A651]">{currentPlan.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Total Nominal:</span>
                        <span className="font-mono font-black text-slate-900 text-base text-[#00A651]">
                          Rp {currentPlan.amount.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>

                    {/* Direct WhatsApp Admin Banner */}
                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
                        <MessageCircle className="w-4 h-4 text-[#00A651]" />
                        <span>Aktivasi Prioritas via WhatsApp Admin (5-15 Menit):</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Kirimkan bukti pembayaran langsung ke nomor WhatsApp admin untuk konfirmasi cepat:
                      </p>
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#00A651] hover:underline pt-1"
                      >
                        <span>Hubungi WhatsApp Admin ({adminWhatsAppNumber}) →</span>
                      </a>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-2 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="py-3.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Kembali ke QRIS</span>
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-black text-xs shadow-md shadow-[#00A651]/20 hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Konfirmasi Pembayaran Saya</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* =========================================================================
              SUBMISSION SUCCESS STATE (EXECUTIVE CONFIRMATION)
             ========================================================================= */
          <div className="text-center py-6 sm:py-8 space-y-6 animate-in zoom-in-95 duration-200 max-w-lg mx-auto">
            <div className="inline-flex items-center justify-center w-18 h-18 rounded-full bg-emerald-50 text-[#00A651] border-2 border-emerald-200 shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Bukti Pembayaran QRIS Berhasil Dikirim!
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Permohonan aktivasi paket untuk akun trader{' '}
                <strong className="text-[#00A651] font-mono">{user.name || name}</strong> (ID:{' '}
                <span className="font-mono">{user.id || accountId}</span>) telah tercatat di sistem kami.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Status Pembayaran:</span>
                <span className="font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  ⏳ Menunggu Verifikasi Admin (5-15 Menit)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Paket Dipilih:</span>
                <span className="font-bold text-slate-900">{currentPlan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nominal Transfer:</span>
                <span className="font-mono font-bold text-emerald-700">
                  Rp {currentPlan.amount.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">WhatsApp Notifikasi:</span>
                <span className="font-mono font-bold text-slate-900">{phone || user.whatsapp}</span>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-4 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#00A651]/25 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white text-white" />
                <span>Kirim Bukti ke WhatsApp Admin Sekarang</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setIsPaymentModalOpen(false);
                  setSubmitted(false);
                  setStep(1);
                }}
                className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-colors"
              >
                Tutup &amp; Kembali ke Halaman Utama
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
