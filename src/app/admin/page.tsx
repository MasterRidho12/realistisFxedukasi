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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200">
              <Shield className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Dashboard Admin — Pengaturan Akses &amp; Verifikasi QRIS
            </h1>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl">
            Kelola aktivasi langganan PRO Rp50.000/bln, verifikasi bukti screenshot transfer bank/QRIS, dan setting hak akses akun trader.
          </p>
        </div>

        <Link
          href="/"
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-semibold text-xs flex items-center gap-1.5 transition-all shadow-xs"
        >
          <span>Kembali ke Web Trader</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Menunggu Verifikasi QRIS</span>
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-mono font-black text-amber-600">
            {pendingRequests.length}
          </div>
          <p className="text-[11px] text-slate-500">
            {pendingRequests.length > 0 ? 'Perlu tindakan konfirmasi admin' : 'Semua antrean tuntas'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Total Member PRO Aktif</span>
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
              <Crown className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-mono font-black text-[#00A651]">
            {totalProMembers}
          </div>
          <p className="text-[11px] text-slate-500">Akses penuh kalkulator &amp; bot</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Total Pengguna Terdaftar</span>
            <span className="p-2 rounded-xl bg-slate-100 text-slate-700 border border-slate-200">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-mono font-black text-slate-900">
            {allUsers.length}
          </div>
          <p className="text-[11px] text-slate-500">Database akun trader aktif</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Pendapatan Terverifikasi</span>
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
              <CreditCard className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-mono font-black text-[#00A651]">
            Rp {totalRevenue.toLocaleString('id-ID')}
          </div>
          <p className="text-[11px] text-slate-500">Total dari aktivasi PRO</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 max-w-lg">
        <button
          onClick={() => setActiveTab('REQUESTS')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'REQUESTS'
              ? 'bg-[#00A651] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Verifikasi QRIS ({pendingRequests.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('USERS')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'USERS'
              ? 'bg-[#00A651] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Kelola Akses Akun ({allUsers.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('SETTINGS')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'SETTINGS'
              ? 'bg-[#00A651] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
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
            <h2 className="text-sm font-bold text-slate-900">
              Daftar Permohonan Langganan PRO via QRIS
            </h2>
            <span className="text-xs text-slate-500">
              Total {subscriptionRequests.length} Transaksi Tercatat
            </span>
          </div>

          {subscriptionRequests.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center text-slate-500 text-xs border border-slate-200">
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
                    `Silakan login kembali atau refresh web di http://localhost:3000 untuk mengakses seluruh fitur premium (Kalkulator Emas XAUUSD, Bot Alert H-30, Analisis Anti-MC, dan Jurnal Unlimited).\n\n` +
                    `Selamat trading dengan SOP disiplin!`
                );
                const userWaUrl = `https://wa.me/${req.userPhone.replace(/^0/, '62')}?text=${confirmWaMsg}`;

                return (
                  <div
                    key={req.id}
                    className={`rounded-2xl p-5 border transition-all ${
                      isPending
                        ? 'border-amber-300 bg-amber-50/50 shadow-xs'
                        : isApproved
                        ? 'border-slate-200 bg-white shadow-xs'
                        : 'border-slate-200 bg-slate-50 opacity-70'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Left: Trader & Order Info */}
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-extrabold text-sm text-slate-900">
                            {req.userName}
                          </span>
                          <span className="text-xs font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                            ID: {req.userId}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                              isPending
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : isApproved
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : 'bg-rose-100 text-rose-800 border border-rose-200'
                            }`}
                          >
                            {req.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-700">
                          <div>
                            <span className="text-[10px] text-slate-500 block">Paket:</span>
                            <span className="font-bold text-emerald-700">{req.planName}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 block">Nominal:</span>
                            <span className="font-mono font-bold text-slate-900">
                              Rp {req.amount.toLocaleString('id-ID')}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 block">No. WhatsApp:</span>
                            <span className="font-mono text-slate-800">{req.userPhone}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 block">Waktu Bayar:</span>
                            <span className="font-mono text-slate-500 text-[11px]">{req.createdAt}</span>
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-500">
                          Email: <span className="text-slate-800">{req.userEmail}</span> | Catatan: <span className="text-slate-800">{req.notes || '-'}</span>
                        </p>
                      </div>

                      {/* Right: Proof & Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
                        {/* View Proof Button */}
                        {req.proofScreenshot && (
                          <button
                            type="button"
                            onClick={() => setSelectedProofImg(req.proofScreenshot || null)}
                            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 border border-slate-200 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-blue-600" />
                            <span>Lihat Bukti Transfer</span>
                          </button>
                        )}

                        {/* WhatsApp User Button */}
                        <a
                          href={userWaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
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
                              className="px-4 py-2 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs shadow-xs active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Setujui &amp; Jadikan PRO</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleReject(req.id, req.userName)}
                              className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Tolak</span>
                            </button>
                          </>
                        )}

                        {isApproved && (
                          <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Akun PRO Aktif
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
            <h2 className="text-sm font-bold text-slate-900">
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
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-600 bg-slate-50 font-semibold">
                    <th className="p-3.5">ID Akun</th>
                    <th className="p-3.5">Nama Trader</th>
                    <th className="p-3.5">Email &amp; No WA</th>
                    <th className="p-3.5">Tipe Akun</th>
                    <th className="p-3.5">Tier Saat Ini</th>
                    <th className="p-3.5">Kuota Lot</th>
                    <th className="p-3.5">Skor Disiplin</th>
                    <th className="p-3.5 text-right">Aksi Setting Akses</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map((u) => {
                    const isProUser = u.tier === 'PRO';

                    return (
                      <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 font-mono text-slate-500 font-bold">{u.id}</td>
                        <td className="p-3.5 font-extrabold text-slate-900">
                          {u.name}
                          {u.role === 'ADMIN' && (
                            <span className="ml-1 text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded border border-amber-300 font-bold">
                              ADMIN
                            </span>
                          )}
                        </td>
                        <td className="p-3.5">
                          <div className="text-slate-800">{u.email}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{u.whatsapp}</div>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-slate-100 text-slate-700 border border-slate-200">
                            {u.accountType}
                          </span>
                        </td>
                        <td className="p-3.5">
                          {isProUser ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                              <Crown className="w-3 h-3 text-emerald-600" /> PRO MEMBER
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                              FREE TIER
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 font-mono text-slate-700">
                          {isProUser ? 'Unlimited' : `${u.dailyCalculatorCount}/3`}
                        </td>
                        <td className="p-3.5 font-mono font-bold text-emerald-700">
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
                                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold border border-slate-200 cursor-pointer"
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
                                className="px-2.5 py-1 rounded-lg bg-[#00A651] hover:bg-[#008F45] text-white text-[11px] font-bold cursor-pointer"
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
                              className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100 cursor-pointer"
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
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm max-w-2xl space-y-5">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            Konfigurasi Pembayaran QRIS &amp; Kontak Admin
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nomor WhatsApp Admin untuk Menerima Konfirmasi
              </label>
              <input
                type="text"
                defaultValue="6282199887700"
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
              <p className="text-[10px] text-slate-500 mt-1">
                Format nomor internasional tanpa tanda plus (Contoh: 6282199887700).
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nama Merchant QRIS Resmi
              </label>
              <input
                type="text"
                defaultValue="REALISTISFX EDUKASI SAAS"
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                NMID / Kode Merchant QRIS
              </label>
              <input
                type="text"
                defaultValue="ID102439281729"
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Harga Langganan PRO Bulanan (IDR)
              </label>
              <input
                type="number"
                defaultValue={50000}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={() => showNotification('Konfigurasi QRIS berhasil disimpan!')}
              className="py-2.5 px-4 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs cursor-pointer shadow-xs"
            >
              Simpan Perubahan
            </button>
          </div>
        </div>
      )}

      {/* Proof Image Viewer Modal */}
      {selectedProofImg && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 max-w-md w-full relative space-y-3 shadow-2xl">
            <button
              onClick={() => setSelectedProofImg(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Pratinjau Bukti Pembayaran QRIS
            </h3>
            <div className="rounded-xl overflow-hidden border border-slate-200 max-h-80 flex items-center justify-center bg-slate-50">
              <img
                src={selectedProofImg}
                alt="Bukti Transfer"
                className="object-contain max-h-80 w-full"
              />
            </div>
            <button
              onClick={() => setSelectedProofImg(null)}
              className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
            >
              Tutup Pratinjau
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
