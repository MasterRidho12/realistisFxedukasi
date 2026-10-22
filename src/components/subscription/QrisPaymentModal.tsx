'use client';

import React, { useState } from 'react';
import {
  X,
  Crown,
  Sparkles,
  Upload,
  CheckCircle2,
  Copy,
  Check,
  Send,
  MessageCircle,
  AlertTriangle,
  QrCode,
  ShieldCheck,
  CreditCard,
  Building2
} from 'lucide-react';
import { useUser } from '@/context/UserContext';

export default function QrisPaymentModal() {
  const {
    user,
    isPaymentModalOpen,
    setIsPaymentModalOpen,
    submitPaymentRequest,
  } = useUser();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form states
  const [accountId, setAccountId] = useState(user.id || 'usr-trader-01');
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState(user.whatsapp || '081234567890');
  const [planDuration, setPlanDuration] = useState<'1_MONTH' | '3_MONTHS' | '1_YEAR'>('1_MONTH');

  // Proof screenshot
  const [proofFile, setProofFile] = useState<string | null>(null);
  const [copiedNominal, setCopiedNominal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isPaymentModalOpen) return null;

  const planPricing = {
    '1_MONTH': { name: '1 Bulan PRO', amount: 50000, label: 'Rp 50.000' },
    '3_MONTHS': { name: '3 Bulan PRO', amount: 135000, label: 'Rp 135.000 (Diskon 10%)' },
    '1_YEAR': { name: '1 Tahun PRO', amount: 499000, label: 'Rp 499.000 (Diskon 17%)' },
  };

  const currentPlan = planPricing[planDuration];
  const adminWhatsAppNumber = '6282199887700'; // Admin WhatsApp official

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

  // WhatsApp Link with pre-filled message
  const waMessage = encodeURIComponent(
    `Halo Admin RealistisFx Edukasi! 👋\n` +
      `Saya telah melakukan pembayaran langganan PRO via QRIS.\n\n` +
      `📌 ID Akun: ${accountId}\n` +
      `👤 Nama: ${name}\n` +
      `📧 Email: ${email}\n` +
      `📱 No. WhatsApp: ${phone}\n` +
      `💳 Paket: ${currentPlan.name} (${currentPlan.label})\n` +
      `🧾 Metode: Scan QRIS RealistisFx\n\n` +
      `Bukti transfer sudah saya simpan. Mohon bantuan konfirmasi dan aktivasi akun PRO saya. Terima kasih!`
  );

  const waUrl = `https://wa.me/${adminWhatsAppNumber}?text=${waMessage}`;

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    submitPaymentRequest({
      accountId,
      name,
      email,
      phone,
      planName: currentPlan.name,
      amount: currentPlan.amount,
      proofScreenshot: proofFile || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80',
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 w-full max-w-xl shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            setIsPaymentModalOpen(false);
            setSubmitted(false);
          }}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-5">
            {/* Modal Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-[#00A651] border border-emerald-200 text-[11px] font-bold mb-2">
                <Crown className="w-3.5 h-3.5" /> LANGGANAN REALISTISFX PRO
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Aktivasi Fitur PRO Rp50.000 / Bulan
              </h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Ikuti 3 langkah mudah: Isi data akun, scan kode QRIS resmi, upload bukti pembayaran, dan konfirmasi ke WhatsApp Admin.
              </p>
            </div>

            {/* Stepper Navigation */}
            <div className="grid grid-cols-3 gap-2 border-b border-slate-200 pb-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                  step === 1
                    ? 'bg-[#00A651] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                1. Data Akun
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                  step === 2
                    ? 'bg-[#00A651] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                2. Scan QRIS
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                  step === 3
                    ? 'bg-[#00A651] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                3. Kirim Bukti
              </button>
            </div>

            {/* STEP 1: Isi Data Akun & Pilih Paket */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Pilih Paket Langganan:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: '1_MONTH' as const, label: '1 Bulan', price: 'Rp 50.000', badge: 'Standar' },
                      { key: '3_MONTHS' as const, label: '3 Bulan', price: 'Rp 135.000', badge: 'Hemat 10%' },
                      { key: '1_YEAR' as const, label: '1 Tahun', price: 'Rp 499.000', badge: 'VIP Hemat' },
                    ].map((p) => (
                      <button
                        key={p.key}
                        type="button"
                        onClick={() => setPlanDuration(p.key)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          planDuration === p.key
                            ? 'bg-emerald-50 border-[#00A651] text-[#00A651] shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-[10px] font-bold block uppercase">
                          {p.badge}
                        </span>
                        <span className="text-xs font-extrabold block text-slate-900 mt-0.5">
                          {p.label}
                        </span>
                        <span className="text-[11px] font-mono text-slate-600">{p.price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      ID Akun Anda (Otomatis)
                    </label>
                    <input
                      type="text"
                      value={accountId}
                      onChange={(e) => setAccountId(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nama Lengkap Trader
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nama Anda"
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:border-[#00A651] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nomor WhatsApp Aktif (Wajib untuk Konfirmasi)
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="081234567890"
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:bg-white focus:border-[#00A651] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Terdaftar
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@gmail.com"
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:border-[#00A651] focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-extrabold text-xs tracking-wide shadow-md shadow-[#00A651]/20 hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                >
                  <span>Lanjut ke Scan QRIS ({currentPlan.label})</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 2: Tampilan Scan QRIS Resmi */}
            {step === 2 && (
              <div className="space-y-4">
                {/* QRIS Card Visual */}
                <div className="bg-white rounded-2xl p-5 text-slate-900 shadow-2xl relative overflow-hidden border-2 border-slate-300">
                  {/* Top Bar QRIS */}
                  <div className="flex items-center justify-between border-b pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="bg-red-600 text-white font-black text-xs px-2 py-0.5 rounded tracking-tighter">
                        QRIS
                      </div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                        Quick Response Code Indonesian Standard
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 uppercase">
                      GPN / ASPI
                    </span>
                  </div>

                  {/* Merchant Details */}
                  <div className="text-center mb-3">
                    <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-tight">
                      REALISTISFX EDUKASI SAAS
                    </h3>
                    <p className="text-[10px] text-slate-500 font-mono">NMID: ID102439281729</p>
                  </div>

                  {/* High Quality Authentic QR Code SVG Representation */}
                  <div className="flex justify-center p-3 bg-slate-50 rounded-xl border border-slate-200 w-52 h-52 mx-auto relative group">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full text-slate-900"
                      fill="currentColor"
                    >
                      {/* Standard Position Detection Patterns */}
                      <rect x="5" y="5" width="26" height="26" fill="black" />
                      <rect x="8" y="8" width="20" height="20" fill="white" />
                      <rect x="11" y="11" width="14" height="14" fill="black" />

                      <rect x="69" y="5" width="26" height="26" fill="black" />
                      <rect x="72" y="8" width="20" height="20" fill="white" />
                      <rect x="75" y="11" width="14" height="14" fill="black" />

                      <rect x="5" y="69" width="26" height="26" fill="black" />
                      <rect x="8" y="72" width="20" height="20" fill="white" />
                      <rect x="11" y="75" width="14" height="14" fill="black" />

                      {/* Data dots matrix */}
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

                    {/* Shield icon overlay in center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center shadow-lg border-2 border-white">
                        RFX
                      </div>
                    </div>
                  </div>

                  {/* Nominal Display */}
                  <div className="mt-3 p-2.5 rounded-xl bg-slate-100 flex items-center justify-between border border-slate-200">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-bold">
                        Total Bayar:
                      </span>
                      <div className="text-base font-extrabold text-emerald-600 font-mono">
                        {currentPlan.label}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyNominal}
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedNominal ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" /> Tersalin
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Salin Rp
                        </>
                      )}
                    </button>
                  </div>

                  {/* Supported Banks / Apps */}
                  <div className="text-[9px] text-slate-400 text-center mt-2.5 leading-tight font-medium">
                    Mendukung: BCA, Mandiri, BRI, BNI, GoPay, OVO, Dana, ShopeePay, LinkAja & Seluruh Mobile Banking Indonesia.
                  </div>
                </div>

                {/* Next Buttons */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Kembali
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 py-2.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs shadow-md shadow-[#00A651]/20 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                  >
                    <span>Sudah Bayar? Upload Bukti Screenshot</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Upload Bukti & Hubungi WA Admin */}
            {step === 3 && (
              <form onSubmit={handleSubmitProof} className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <span className="text-xs font-bold text-slate-900 block">
                    Upload Screenshot Bukti Transfer / Scan QRIS:
                  </span>

                  <label className="border-2 border-dashed border-slate-300 hover:border-[#00A651] rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-white">
                    <Upload className="w-8 h-8 text-[#00A651] mb-2" />
                    <span className="text-xs font-semibold text-slate-800">
                      Klik untuk Upload Screenshot Bukti Transfer
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5">
                      Format PNG, JPG, JPEG (Maks. 5MB)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  {proofFile && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#00A651]" />
                        <span className="text-xs text-slate-800 font-medium">Screenshot Bukti Siap Dikirim</span>
                      </div>
                      <span className="text-[10px] text-[#00A651] font-bold">Terlampir</span>
                    </div>
                  )}
                </div>

                {/* WhatsApp Admin Direct Link Button */}
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                    <MessageCircle className="w-4 h-4 text-[#00A651]" />
                    Konfirmasi Cepat via WhatsApp Admin:
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                    Kirim pesan otomatis langsung ke Admin RealistisFx untuk verifikasi prioritas dalam 5-15 menit:
                  </p>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#00A651]/20 transition-all cursor-pointer active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-white" />
                    <span>Kirim Bukti ke WhatsApp Admin ({adminWhatsAppNumber})</span>
                  </a>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Kembali
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs shadow-md shadow-[#00A651]/20 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Konfirmasi Pembayaran Saya</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Submission Success State */
          <div className="text-center py-6 space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-[#00A651] border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Bukti Pembayaran QRIS Telah Diterima!
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 max-w-sm mx-auto leading-relaxed">
                Permohonan aktivasi akun PRO Anda dengan ID <b className="text-[#00A651] font-mono">{accountId}</b> telah masuk ke antrean verifikasi Admin RealistisFx.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Status Akun:</span>
                <span className="font-bold text-amber-700">⏳ Menunggu Konfirmasi Admin</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Paket Dipilih:</span>
                <span className="font-mono text-slate-900 font-bold">{currentPlan.name} ({currentPlan.label})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nomor WhatsApp:</span>
                <span className="font-mono text-slate-900 font-bold">{phone}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#00A651]/20 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white text-white" />
                <span>Kirim Bukti Pembayaran ke WhatsApp Admin Sekarang</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setIsPaymentModalOpen(false);
                  setSubmitted(false);
                }}
                className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs cursor-pointer transition-colors"
              >
                Tutup &amp; Kembali ke Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
