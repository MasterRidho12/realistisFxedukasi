'use client';

import React, { useState } from 'react';
import {
  Bot,
  Send,
  Crown,
  Lock,
  CheckCircle2,
  Sparkles,
  Bell,
  MessageSquare,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useUser } from '@/context/UserContext';

export default function BotAssistantPage() {
  const { user, setTier, toggleTelegramLink } = useUser();
  const isPro = user.tier === 'PRO';

  const [chatId, setChatId] = useState(user.telegramChatId || '@trader_budi');
  const [notifyH30, setNotifyH30] = useState(true);
  const [notifyNFP, setNotifyNFP] = useState(true);
  const [notifyCPI, setNotifyCPI] = useState(true);
  const [testSent, setTestSent] = useState(false);

  const handleTestAlert = () => {
    setTestSent(true);
    setTimeout(() => setTestSent(false), 4000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Bot className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Bot Assistant (Telegram Webhooks Integration)
            </h1>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Koneksikan akun Anda dengan Bot Telegram RealistisFx untuk menerima sinyal kewaspadaan H-30 menit sebelum berita High Impact rilis.
          </p>
        </div>

        {!isPro ? (
          <button
            onClick={() => setTier('PRO')}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Crown className="w-3.5 h-3.5" /> Buka Fitur Bot PRO (Rp50k)
          </button>
        ) : (
          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
            <Crown className="w-4 h-4" /> BOT WEBHOOK PRO AKTIF
          </div>
        )}
      </div>

      {/* Pro Locked Overlay if Free */}
      {!isPro ? (
        <div className="glass-panel rounded-2xl p-8 border border-amber-500/30 text-center max-w-xl mx-auto space-y-4 my-8">
          <div className="inline-flex p-4 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-white">
            Fitur Bot Notifikasi Otomatis Khusus Member PRO
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Jangan sampai lupa ada jadwal rilis berita NFP atau CPI saat sedang floating posisi. Bot Telegram kami akan mengingatkan Anda tepat 30 menit sebelumnya langsung di smartphone Anda.
          </p>
          <button
            onClick={() => setTier('PRO')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            Upgrade ke PRO Rp50k Sekarang
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Settings Panel (7 Cols) */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-white/10 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="text-sm font-bold text-white">Konfigurasi Webhook Telegram</h2>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  user.telegramLinked
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {user.telegramLinked ? 'STATUS: TERHUBUNG' : 'STATUS: BELUM AKTIF'}
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                Username / Chat ID Telegram Anda
              </label>
              <div className="relative">
                <Send className="w-4 h-4 text-blue-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={chatId}
                  onChange={(e) => setChatId(e.target.value)}
                  placeholder="@username_telegram"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-mono text-xs"
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                Kirim pesan <code className="text-blue-400">/start</code> ke bot resmi kami di Telegram: <b>@RealistisFxAlertBot</b>
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold text-slate-300 block">
                Pengaturan Peringatan Otomatis:
              </span>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5 cursor-pointer">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-white block">
                    Peringatan H-30 Menit Berita High Impact
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Kirim pesan waspada 30 menit sebelum NFP, CPI, atau FOMC dirilis.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={notifyH30}
                  onChange={(e) => setNotifyH30(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-500 bg-slate-800 border-white/10 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5 cursor-pointer">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-white block">
                    Skenario 2 Arah (Bullish / Bearish)
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Sertakan level kunci support & resistance pada pesan notifikasi Telegram.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={notifyNFP}
                  onChange={(e) => setNotifyNFP(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-500 bg-slate-800 border-white/10 cursor-pointer"
                />
              </label>
            </div>

            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={toggleTelegramLink}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 cursor-pointer transition-all"
              >
                {user.telegramLinked ? 'Simpan & Perbarui Webhook' : 'Hubungkan Akun Telegram'}
              </button>

              <button
                type="button"
                onClick={handleTestAlert}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-white/10 cursor-pointer"
              >
                Uji Coba Notifikasi
              </button>
            </div>

            {testSent && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Tes pesan notifikasi simulasi berhasil dikirim ke {chatId}!</span>
              </div>
            )}
          </div>

          {/* Telegram Message Preview Simulation (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
                <MessageSquare className="w-4 h-4" /> Simulasi Notifikasi Telegram
              </div>

              {/* Telegram Phone Bubble Mockup */}
              <div className="p-4 rounded-2xl bg-[#17212B] border border-white/10 text-slate-100 text-xs space-y-2 shadow-2xl font-sans">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="font-bold text-blue-400 flex items-center gap-1">
                    <Bot className="w-3.5 h-3.5" /> RealistisFx Alert Bot
                  </span>
                  <span className="text-[10px] text-slate-400">19:00 WIB</span>
                </div>

                <div className="space-y-1.5 leading-relaxed">
                  <p className="font-bold text-amber-300">
                    🚨 PERINGATAN H-30 MENIT: HIGH IMPACT NEWS!
                  </p>
                  <p>
                    <b>Event:</b> USD Non-Farm Payrolls (NFP)<br />
                    <b>Waktu Rilis:</b> 19:30 WIB (Tersisa 30 menit)<br />
                    <b>Pair Terdampak:</b> XAUUSD, EURUSD, GBPUSD
                  </p>
                  <div className="p-2 rounded bg-slate-900/80 border border-white/5 text-[11px] text-slate-300">
                    <p className="font-semibold text-emerald-400">SOP Realistis:</p>
                    <p>1. Periksa batasan Stop Loss akun Anda.</p>
                    <p>2. Waspadai pelebaran spread & lonjakan slippage.</p>
                    <p>3. Dilarang open posisi agresif sebelum data rilis.</p>
                  </div>
                </div>

                <div className="pt-1 text-[10px] text-slate-500 text-right">
                  RealistisFx Webhook Engine v1.0
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
