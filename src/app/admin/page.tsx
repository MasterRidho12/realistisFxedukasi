'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Shield,
  CheckCircle2,
  XCircle,
  MessageCircle,
  Crown,
  Users,
  CreditCard,
  Clock,
  ExternalLink,
  Search,
  Filter,
  Eye,
  RotateCcw,
  Sparkles,
  ArrowUpRight,
  AlertTriangle
} from 'lucide-react';
import { useUser } from '@/context/UserContext';

export default function AdminDashboardPage() {
  const {
    allUsers,
    subscriptionRequests,
    approveSubscription,
    rejectSubscription,
    updateUserTierManually,
    resetUserCalculatorCount,
  } = useUser();

  const [activeTab, setActiveTab] = useState<'REQUESTS' | 'USERS' | 'SETTINGS'>('REQUESTS');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProofImg, setSelectedProofImg] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const pendingRequests = subscriptionRequests.filter((r) => r.status === 'PENDING');
  const approvedRequests = subscriptionRequests.filter((r) => r.status === 'APPROVED');

  const totalProMembers = allUsers.filter((u) => u.tier === 'PRO').length;
  const totalRevenue = approvedRequests.length * 50000;

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleApprove = (requestId: string, userName: string) => {
    approveSubscription(requestId);
    showNotification(`✅ Sukses! Akun ${userName} berhasil diaktifkan menjadi PRO.`);
  };

  const handleReject = (requestId: string, userName: string) => {
    rejectSubscription(requestId, 'Bukti pembayaran tidak sesuai');
    showNotification(`❌ Permohonan ${userName} telah ditolak.`);
  };

  const filteredUsers = allUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Shield className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Dashboard Admin — Pengaturan Akses & Verifikasi QRIS
            </h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Kelola aktivasi langganan PRO Rp50.000/bln, verifikasi bukti screenshot transfer bank/QRIS, dan setting hak akses akun trader.
          </p>
        </div>

        <Link
          href="/"
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-all"
        >
          <span>Kembali ke Web Trader</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-5 border border-amber-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">Menunggu Verifikasi QRIS</span>
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-mono font-black text-amber-400">
            {pendingRequests.length}
          </div>
          <p className="text-[11px] text-slate-400">
            {pendingRequests.length > 0 ? 'Perlu tindakan konfirmasi admin' : 'Semua antrean tuntas'}
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-emerald-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">Total Member PRO Aktif</span>
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Crown className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-mono font-black text-emerald-400">
            {totalProMembers}
          </div>
          <p className="text-[11px] text-slate-400">Akses penuh kalkulator & bot</p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-blue-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">Total Pengguna Terdaftar</span>
            <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-mono font-black text-white">
            {allUsers.length}
          </div>
          <p className="text-[11px] text-slate-400">Database akun trader aktif</p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">Pendapatan Terverifikasi</span>
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <CreditCard className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-mono font-black text-emerald-400">
            Rp {totalRevenue.toLocaleString('id-ID')}
          </div>
          <p className="text-[11px] text-slate-400">Total dari aktivasi PRO</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex rounded-xl bg-slate-900/80 p-1 border border-white/10 max-w-lg">
        <button
          onClick={() => setActiveTab('REQUESTS')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'REQUESTS'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Verifikasi QRIS ({pendingRequests.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('USERS')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'USERS'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Kelola Akses Akun ({allUsers.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('SETTINGS')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'SETTINGS'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Setting QRIS</span>
        </button>
      </div>

      {/* TAB 1: Antrean Verifikasi Pembayaran QRIS */}
      {activeTab === 'REQUESTS' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">
              Daftar Permohonan Langganan PRO via QRIS
            </h2>
            <span className="text-xs text-slate-400">
              Total {subscriptionRequests.length} Transaksi Tercatat
            </span>
          </div>

          {subscriptionRequests.length === 0 ? (
            <div className="glass-panel rounded-2xl p-8 text-center text-slate-400 text-xs">
              Belum ada permohonan pembayaran yang masuk.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {subscriptionRequests.map((req) => {
                const isPending = req.status === 'PENDING';
                const isApproved = req.status === 'APPROVED';

                // WhatsApp confirmation message to user
                const confirmWaMsg = encodeURIComponent(
                  `Halo ${req.userName}! 👋\n` +
                    `Pembayaran QRIS langganan ${req.planName} (Rp ${req.amount.toLocaleString('id-ID')}) telah berhasil dikonfirmasi dan diverifikasi oleh Admin RealistisFx Edukasi.\n\n` +
                    `✅ Akun Anda sekarang telah AKTIF sebagai MEMBER PRO (30 Hari)!\n` +
                    `Silakan login kembali atau refresh web di http://localhost:3001 untuk mengakses seluruh fitur premium (Kalkulator Emas XAUUSD, Bot Alert H-30, Analisis Anti-MC, dan Jurnal Unlimited).\n\n` +
                    `Selamat trading dengan SOP disiplin!`
                );
                const userWaUrl = `https://wa.me/${req.userPhone.replace(/^0/, '62')}?text=${confirmWaMsg}`;

                return (
                  <div
                    key={req.id}
                    className={`glass-panel rounded-2xl p-5 border transition-all ${
                      isPending
                        ? 'border-amber-500/40 bg-amber-950/10'
                        : isApproved
                        ? 'border-emerald-500/30'
                        : 'border-white/10 opacity-70'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Left: Trader & Order Info */}
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-extrabold text-sm text-white">
                            {req.userName}
                          </span>
                          <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-white/10">
                            ID: {req.userId}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                              isPending
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : isApproved
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            }`}
                          >
                            {req.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300">
                          <div>
                            <span className="text-[10px] text-slate-500 block">Paket:</span>
                            <span className="font-bold text-emerald-400">{req.planName}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 block">Nominal:</span>
                            <span className="font-mono font-bold text-white">
                              Rp {req.amount.toLocaleString('id-ID')}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 block">No. WhatsApp:</span>
                            <span className="font-mono text-slate-200">{req.userPhone}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 block">Waktu Bayar:</span>
                            <span className="font-mono text-slate-400 text-[11px]">{req.createdAt}</span>
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-400">
                          Email: <span className="text-slate-300">{req.userEmail}</span> | Catatan: <span className="text-slate-300">{req.notes || '-'}</span>
                        </p>
                      </div>

                      {/* Right: Proof & Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
                        {/* View Proof Button */}
                        {req.proofScreenshot && (
                          <button
                            type="button"
                            onClick={() => setSelectedProofImg(req.proofScreenshot || null)}
                            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-white/10 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-blue-400" />
                            <span>Lihat Bukti Transfer</span>
                          </button>
                        )}

                        {/* WhatsApp User Button */}
                        <a
                          href={userWaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[#25D366] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                          title="Kirim pesan konfirmasi langsung ke WA user"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Chat WA User</span>
                        </a>

                        {isPending && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleApprove(req.id, req.userName)}
                              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs shadow-md shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Setujui & Jadikan PRO</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleReject(req.id, req.userName)}
                              className="px-3 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Tolak</span>
                            </button>
                          </>
                        )}

                        {isApproved && (
                          <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Akun PRO Aktif
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Kelola Akses Semua Akun Pengguna */}
      {activeTab === 'USERS' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-sm font-bold text-white">
              Daftar Seluruh Akun Pengguna RealistisFx
            </h2>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Cari nama / email / ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 bg-slate-900/60">
                    <th className="p-3.5">ID Akun</th>
                    <th className="p-3.5">Nama Trader</th>
                    <th className="p-3.5">Email & No WA</th>
                    <th className="p-3.5">Tipe Akun</th>
                    <th className="p-3.5">Tier Saat Ini</th>
                    <th className="p-3.5">Kuota Lot</th>
                    <th className="p-3.5">Skor Disiplin</th>
                    <th className="p-3.5 text-right">Aksi Setting Akses</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredUsers.map((u) => {
                    const isProUser = u.tier === 'PRO';

                    return (
                      <tr key={u.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3.5 font-mono text-slate-400 font-bold">{u.id}</td>
                        <td className="p-3.5 font-extrabold text-white">
                          {u.name}
                          {u.role === 'ADMIN' && (
                            <span className="ml-1 text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30">
                              ADMIN
                            </span>
                          )}
                        </td>
                        <td className="p-3.5">
                          <div className="text-slate-200">{u.email}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{u.whatsapp}</div>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-slate-800 text-slate-300">
                            {u.accountType}
                          </span>
                        </td>
                        <td className="p-3.5">
                          {isProUser ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              <Crown className="w-3 h-3" /> PRO MEMBER
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                              FREE TIER
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 font-mono text-slate-300">
                          {isProUser ? 'Unlimited' : `${u.dailyCalculatorCount}/3`}
                        </td>
                        <td className="p-3.5 font-mono font-bold text-emerald-400">
                          {u.disciplineScore}/100
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            {/* Toggle Pro / Free */}
                            {isProUser ? (
                              <button
                                type="button"
                                onClick={() => {
                                  updateUserTierManually(u.id, 'FREE');
                                  showNotification(`Akun ${u.name} diubah ke FREE.`);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold border border-white/10 cursor-pointer"
                              >
                                Set ke FREE
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  updateUserTierManually(u.id, 'PRO');
                                  showNotification(`Akun ${u.name} berhasil diaktifkan ke PRO!`);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[11px] font-bold cursor-pointer"
                              >
                                Aktifkan PRO
                              </button>
                            )}

                            {/* Reset Quota */}
                            <button
                              type="button"
                              onClick={() => {
                                resetUserCalculatorCount(u.id);
                                showNotification(`Kuota kalkulator ${u.name} direset ke 0/3.`);
                              }}
                              className="p-1 text-slate-400 hover:text-white rounded hover:bg-white/10"
                              title="Reset Kuota Kalkulator Harian"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Pengaturan QRIS & Admin Profile */}
      {activeTab === 'SETTINGS' && (
        <div className="glass-panel rounded-2xl p-6 border border-white/10 max-w-2xl space-y-5">
          <h2 className="text-sm font-bold text-white border-b border-white/10 pb-3">
            Konfigurasi Pembayaran QRIS & Kontak Admin
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Nomor WhatsApp Admin untuk Menerima Konfirmasi
              </label>
              <input
                type="text"
                defaultValue="6282199887700"
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
              />
              <p className="text-[10px] text-slate-500 mt-1">
                Format nomor internasional tanpa tanda plus (Contoh: 6282199887700).
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Nama Merchant QRIS Resmi
              </label>
              <input
                type="text"
                defaultValue="REALISTISFX EDUKASI SAAS"
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                NMID / Kode Merchant QRIS
              </label>
              <input
                type="text"
                defaultValue="ID102439281729"
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Harga Langganan PRO Bulanan (IDR)
              </label>
              <input
                type="number"
                defaultValue={50000}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
              />
            </div>

            <button
              type="button"
              onClick={() => showNotification('Konfigurasi QRIS berhasil disimpan!')}
              className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer shadow-lg shadow-blue-500/20"
            >
              Simpan Perubahan
            </button>
          </div>
        </div>
      )}

      {/* Proof Image Viewer Modal */}
      {selectedProofImg && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel rounded-2xl p-5 border border-white/10 max-w-md w-full relative space-y-3">
            <button
              onClick={() => setSelectedProofImg(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Pratinjau Bukti Pembayaran QRIS
            </h3>
            <div className="rounded-xl overflow-hidden border border-white/10 max-h-80 flex items-center justify-center bg-slate-950">
              <img
                src={selectedProofImg}
                alt="Bukti Transfer"
                className="object-contain max-h-80 w-full"
              />
            </div>
            <button
              onClick={() => setSelectedProofImg(null)}
              className="w-full py-2 rounded-xl bg-slate-800 text-xs font-semibold text-white"
            >
              Tutup Pratinjau
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
