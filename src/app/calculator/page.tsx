'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calculator,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Crown,
  Sparkles,
  Lock,
  ArrowRight,
  RotateCcw,
  Info,
  CheckCircle2,
  Copy,
  Smartphone,
  HelpCircle,
  TrendingDown,
  TrendingUp,
  Percent,
  Check,
  Zap,
  ArrowDown
} from 'lucide-react';
import { useUser } from '@/context/UserContext';

interface PairConfig {
  symbol: string;
  name: string;
  description: string;
  pipValueStandard: number; // per 1 standard lot for 1 pip
  pipDecimals: number;
  proOnly?: boolean;
}

const PAIRS: PairConfig[] = [
  { symbol: 'XAUUSD', name: 'Gold / Emas (USD)', description: 'Volatilitas tinggi, pergerakan cepat', pipValueStandard: 10, pipDecimals: 2, proOnly: true },
  { symbol: 'EURUSD', name: 'Euro / US Dollar', description: 'Pair terpopuler, spread terendah', pipValueStandard: 10, pipDecimals: 4 },
  { symbol: 'GBPUSD', name: 'Pound / US Dollar', description: 'Volatilitas aktif sesi London', pipValueStandard: 10, pipDecimals: 4 },
  { symbol: 'USDJPY', name: 'US Dollar / Japanese Yen', description: 'Tren stabil sesi Asia & NY', pipValueStandard: 6.8, pipDecimals: 2 },
  { symbol: 'AUDUSD', name: 'Aussie / US Dollar', description: 'Komoditas & sesi Pasifik', pipValueStandard: 10, pipDecimals: 4 },
  { symbol: 'NZDUSD', name: 'Kiwi / US Dollar', description: 'Pergerakan stabil & tenang', pipValueStandard: 10, pipDecimals: 4 },
];

interface CalculationResult {
  safeLot: number;
  moneyAtRisk: number;
  moneyAtRiskIDR: number;
  balanceRemaining: number;
  tradesToMarginCall: number;
  selectedPair: string;
  accountType: 'STANDARD' | 'CENT';
  balance: number;
  slPips: number;
  riskPercent: number;
  badLot: string;
  badLoss: string;
  badLossPercent: string;
}

export default function CalculatorPage() {
  const { user, openPaymentModal, incrementCalculatorUsage, marketPrice } = useUser();
  const isPro = user.tier === 'PRO';

  // Calculator inputs
  const [accountType, setAccountType] = useState<'STANDARD' | 'CENT'>('STANDARD');
  const [balance, setBalance] = useState<number>(1000);
  const [riskPercent, setRiskPercent] = useState<number>(1.5);
  const [selectedPair, setSelectedPair] = useState<string>('EURUSD');
  const [slPips, setSlPips] = useState<number>(30);

  // Calculation State: Results appear ONLY after clicking the button!
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // Copy status & quota error
  const [copied, setCopied] = useState<boolean>(false);
  const [quotaExceeded, setQuotaExceeded] = useState<boolean>(false);

  // Current pair configuration
  const currentPairConfig = PAIRS.find((p) => p.symbol === selectedPair) || PAIRS[1];
  const isSelectedPairLocked = currentPairConfig.proOnly && !isPro;

  // Anti-FOMO Strict Mode Check:
  const isBlockedByStrictSop = isPro && user.strictModeEnabled && !user.isChecklistPassed;

  // Triggered ONLY when clicking "Hitung Lot & Validasi SOP"
  const handleCalculate = () => {
    if (isBlockedByStrictSop) return;
    if (isSelectedPairLocked) {
      openPaymentModal();
      return;
    }

    const allowed = incrementCalculatorUsage();
    if (!allowed) {
      setQuotaExceeded(true);
      return;
    }
    setQuotaExceeded(false);
    setIsCalculating(true);

    setTimeout(() => {
      const isCent = accountType === 'CENT';
      const effectiveBalanceUSD = isCent ? balance / 100 : balance;
      const riskAmountUSD = effectiveBalanceUSD * (riskPercent / 100);
      const pipValue = currentPairConfig.pipValueStandard;

      let calculatedLot = slPips > 0 ? riskAmountUSD / (slPips * pipValue) : 0;
      if (isCent) {
        calculatedLot = calculatedLot * 100; // Cent lots
      }
      const safeLot = Math.max(0.01, Math.round(calculatedLot * 100) / 100);

      const moneyAtRisk = Math.round(riskAmountUSD * 100) / 100;
      const moneyAtRiskIDR = Math.round(riskAmountUSD * 16200);
      const balanceRemaining = Math.max(0, effectiveBalanceUSD - moneyAtRisk);
      const tradesToMarginCall = moneyAtRisk > 0 ? Math.floor(effectiveBalanceUSD / moneyAtRisk) : 100;

      const badLot = (safeLot * 10).toFixed(2);
      const badLoss = (moneyAtRisk * 10).toFixed(2);
      const badLossPercent = (riskPercent * 10).toFixed(1);

      setCalculationResult({
        safeLot,
        moneyAtRisk,
        moneyAtRiskIDR,
        balanceRemaining,
        tradesToMarginCall,
        selectedPair,
        accountType,
        balance,
        slPips,
        riskPercent,
        badLot,
        badLoss,
        badLossPercent,
      });
      setIsCalculating(false);
    }, 250);
  };

  const handleReset = () => {
    setBalance(1000);
    setRiskPercent(1.5);
    setSlPips(30);
    setSelectedPair('EURUSD');
    setAccountType('STANDARD');
    setCalculationResult(null);
  };

  const handleCopyLot = () => {
    if (!calculationResult) return;
    navigator.clipboard.writeText(calculationResult.safeLot.toFixed(2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSelectPair = (symbol: string) => {
    const pair = PAIRS.find((p) => p.symbol === symbol);
    if (pair?.proOnly && !isPro) {
      setSelectedPair(symbol);
      return;
    }
    setSelectedPair(symbol);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Educational Banner: Why This Calculator Exists */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950/80 via-slate-900/95 to-emerald-950/70 border border-blue-500/30 p-6 md:p-8 shadow-2xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Sabuk Pengaman Anti Margin Call</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              Kalkulator Lot: Hitung Ukuran Entry yang Aman Sebelum Masuk Pasar
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Kenapa kalkulator ini ada?</strong> 90% trader pemula bangkrut bukan karena salah arah analisa, melainkan karena <strong className="text-rose-400">salah menentukan angka LOT</strong> (terlalu besar/over-lot). 
              Alat ini menghitungkan angka LOT yang tepat, sehingga jika analisa Anda salah dan terkena Stop Loss, modal Anda <span className="text-emerald-400 font-bold">hanya berkurang 1-2%</span>. Anda tetap tenang dan akun Anda anti bangkrut!
            </p>
          </div>

          {/* 3 Step Visual Quick Guide */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 flex-shrink-0 bg-slate-950/70 p-4 rounded-2xl border border-white/10 text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px]">1</span>
              <span>Pilih Modal, Pair, & Stop Loss</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center text-[10px]">2</span>
              <span className="font-bold text-white">Klik &quot;Hitung Lot &amp; Validasi SOP&quot;</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-500 text-slate-950 font-bold flex items-center justify-center text-[10px]">3</span>
              <span className="font-bold text-emerald-300">Ketik Angka Lot Hasil di MetaTrader!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quota Banner for Free Tier */}
      {!isPro ? (
        <div className="glass-panel p-4 rounded-2xl border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-slate-300">
                <span className="font-bold text-white">Status Kuota Harian Free:</span> Tersisa {Math.max(0, 3 - user.dailyCalculatorCount)} dari 3 kalkulasi hari ini.
              </p>
              <p className="text-[11px] text-slate-400">
                Upgrade ke PRO Rp50.000/bln untuk hitung tanpa batas + buka akses kalkulasi Emas (XAUUSD) & Akun Cent.
              </p>
            </div>
          </div>
          <button
            onClick={openPaymentModal}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs whitespace-nowrap shadow-md shadow-emerald-500/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            Upgrade PRO Rp50k via QRIS
          </button>
        </div>
      ) : (
        <div className="px-4 py-2.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-emerald-400" />
            <span>Akun PRO Aktif: Akses Kalkulator Unlimited, Pair Emas (XAUUSD), dan Akun Cent Terbuka.</span>
          </span>
          <span className="font-bold text-emerald-400">VIP</span>
        </div>
      )}

      {/* Strict Anti-FOMO Warning Banner if enabled */}
      {isBlockedByStrictSop && (
        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-amber-400 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-white">
                Mode Ketat Anti-FOMO Sedang Aktif!
              </h4>
              <p className="text-[11px] text-slate-300">
                Kalkulator lot terkunci karena Anda belum menyelesaikan verifikasi 5 SOP di menu Anti-FOMO Checklist hari ini.
              </p>
            </div>
          </div>
          <Link
            href="/checklist"
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold whitespace-nowrap flex items-center gap-1 cursor-pointer"
          >
            Buka Checklist SOP <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Quota Exceeded Modal / Alert */}
      {quotaExceeded && !isPro && (
        <div className="p-4 rounded-2xl bg-rose-950/50 border border-rose-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-rose-400 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-white">Kuota Harian (3x) Telah Habis!</h4>
              <p className="text-[11px] text-slate-300">
                Tingkatkan ke Pro hanya Rp50.000/bulan untuk kalkulasi unlimited + pair XAUUSD & akun Cent.
              </p>
            </div>
          </div>
          <button
            onClick={openPaymentModal}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer"
          >
            Bayar Langganan via QRIS
          </button>
        </div>
      )}

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 4-Step Form (7 Columns) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center text-xs">⚙️</span>
              <span>Formulir Parameter Risiko Trading</span>
            </h2>
            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Standar SOP</span>
            </button>
          </div>

          {/* STEP 1: Modal Trading & Tipe Akun */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-500 text-slate-950 font-black flex items-center justify-center text-[10px]">1</span>
                <span>Modal Trading Anda di Broker</span>
              </label>
              <span className="text-xs text-slate-400 font-mono">
                Estimasi: <strong className="text-emerald-400">Rp {(balance * (accountType === 'STANDARD' ? 16200 : 162)).toLocaleString('id-ID')}</strong>
              </span>
            </div>

            {/* Account Type Selector */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setAccountType('STANDARD')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                  accountType === 'STANDARD'
                    ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                    : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                Akun Standard (USD $)
              </button>
              <button
                type="button"
                disabled={!isPro}
                onClick={() => isPro && setAccountType('CENT')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  accountType === 'CENT'
                    ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-md'
                    : !isPro
                    ? 'bg-slate-900/30 border-white/5 text-slate-600 cursor-not-allowed'
                    : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-white cursor-pointer'
                }`}
              >
                {!isPro && <Lock className="w-3 h-3 text-amber-400" />}
                Akun Cent (IDRC) {!isPro && '(PRO)'}
              </button>
            </div>

            {/* Balance Input & Quick Buttons */}
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-slate-400 font-bold text-sm">$</span>
              <input
                type="number"
                min="10"
                step="50"
                value={balance}
                onChange={(e) => setBalance(Math.max(1, Number(e.target.value) || 0))}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-mono font-bold text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Contoh: 1000"
              />
            </div>
            <div className="flex flex-wrap gap-2 pt-0.5">
              {[50, 100, 500, 1000, 5000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setBalance(amt)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    balance === amt
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>
          </div>

          {/* STEP 2: Pilih Pasangan Mata Uang / Pair */}
          <div className="space-y-3 pt-2 border-t border-white/5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-500 text-slate-950 font-black flex items-center justify-center text-[10px]">2</span>
                <span>Pilih Pasangan Mata Uang (Pair)</span>
              </label>
              <span className="text-[11px] text-slate-400">Pilih aset yang ingin di-trade</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {PAIRS.map((pair) => {
                const isLocked = pair.proOnly && !isPro;
                const isSelected = selectedPair === pair.symbol;

                return (
                  <button
                    key={pair.symbol}
                    type="button"
                    onClick={() => handleSelectPair(pair.symbol)}
                    className={`p-3 rounded-2xl border text-left transition-all relative cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                        : isLocked
                        ? 'bg-slate-900/40 border-white/5 text-slate-500'
                        : 'bg-slate-900/70 border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-sm text-white">{pair.symbol}</span>
                      {pair.proOnly && (
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase ${
                            isPro ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          PRO
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 line-clamp-1">{pair.name}</p>
                  </button>
                );
              })}
            </div>

            {isSelectedPairLocked && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between gap-3">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Kalkulasi Pair Emas (XAUUSD) khusus untuk member PRO.</span>
                </span>
                <button
                  onClick={openPaymentModal}
                  className="font-bold underline text-amber-400 hover:text-white cursor-pointer whitespace-nowrap"
                >
                  Buka via QRIS Rp50k
                </button>
              </div>
            )}
          </div>

          {/* STEP 3: Jarak Stop Loss (Pips) */}
          <div className="space-y-3 pt-2 border-t border-white/5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-500 text-slate-950 font-black flex items-center justify-center text-[10px]">3</span>
                <span>Jarak Stop Loss (Pips dari Analisa Chart Anda)</span>
              </label>
              <span className="text-[11px] text-slate-400 font-mono font-semibold">
                {slPips} Pips
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Berapa jarak dari harga entry Anda ke titik batas Stop Loss? Semakin jauh jarak Stop Loss, semakin kecil ukuran lot yang diizinkan agar saldo Anda tetap aman.
            </p>

            <div className="relative">
              <input
                type="number"
                min="5"
                max="300"
                value={slPips}
                onChange={(e) => setSlPips(Math.max(1, Number(e.target.value) || 0))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-mono font-bold text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="30"
              />
              <span className="absolute right-3.5 top-3 text-slate-400 text-xs font-bold">PIPS</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { p: 15, label: '15 pips (Scalping Cepat)' },
                { p: 30, label: '30 pips (SOP Standar)' },
                { p: 50, label: '50 pips (Swing Harian)' },
                { p: 100, label: '100 pips (Jarak Lebar)' },
              ].map((item) => (
                <button
                  key={item.p}
                  type="button"
                  onClick={() => setSlPips(item.p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                    slPips === item.p
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* STEP 4: Toleransi Risiko (% Modal) */}
          <div className="space-y-3 pt-2 border-t border-white/5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-500 text-slate-950 font-black flex items-center justify-center text-[10px]">4</span>
                <span>Toleransi Risiko Maksimal per Transaksi</span>
              </label>
              <span
                className={`font-mono font-bold text-xs px-2.5 py-0.5 rounded-md ${
                  riskPercent <= 2
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}
              >
                {riskPercent}% Modal ({riskPercent <= 2 ? 'SOP Disiplin Aman' : 'Bahaya Terlalu Agresif!'})
              </span>
            </div>

            <p className="text-[11px] text-slate-400">
              Prinsip RealistisFx: <strong className="text-emerald-400">Maksimal 1% - 2% modal</strong> yang boleh dipertaruhkan per transaksi. Jangan pernah mengambil risiko di atas 2% jika ingin selamat dari margin call!
            </p>

            <input
              type="range"
              min="0.5"
              max="5"
              step="0.5"
              value={riskPercent}
              onChange={(e) => setRiskPercent(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer h-2"
            />

            <div className="flex justify-between text-[11px] text-slate-400">
              <span className="text-blue-400">0.5% (Sangat Hati-hati)</span>
              <span className="text-emerald-400 font-bold">1% - 2% (Standar Trader Profesional)</span>
              <span className="text-rose-400 font-bold">5% (Rawan Bangkrut)</span>
            </div>
          </div>

          {/* THE CALCULATION BUTTON - USER MUST CLICK THIS TO GENERATE RESULT */}
          <div className="pt-3 border-t border-white/10">
            <button
              id="btn-hitung-lot"
              type="button"
              disabled={isBlockedByStrictSop || isCalculating}
              onClick={handleCalculate}
              className={`w-full py-4 rounded-2xl font-black text-sm tracking-wide shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isBlockedByStrictSop
                  ? 'bg-slate-800 text-slate-500 border border-white/5 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:brightness-110 active:scale-98 text-slate-950 shadow-emerald-500/30'
              }`}
            >
              {isBlockedByStrictSop ? (
                <>
                  <Lock className="w-5 h-5 text-amber-400" />
                  <span>Kalkulator Terkunci oleh SOP Checklist</span>
                </>
              ) : isCalculating ? (
                <>
                  <RotateCcw className="w-5 h-5 animate-spin" />
                  <span>Memvalidasi SOP & Menghitung Lot Aman...</span>
                </>
              ) : (
                <>
                  <Calculator className="w-5 h-5" />
                  <span>Hitung Lot &amp; Validasi SOP</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-2">
              Tekan tombol di atas untuk memvalidasi parameter dan menampilkan hasil ukuran lot di panel sebelah kanan.
            </p>
          </div>
        </div>

        {/* Right Column: Visual MetaTrader Result & Simulation (5 Columns) */}
        <div className="lg:col-span-5 space-y-5">
          {!calculationResult ? (
            /* STANDBY / PROMPT CARD: SHOWN BEFORE USER CLICKS THE BUTTON */
            <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-white/10 text-center space-y-5 flex flex-col items-center justify-center min-h-[460px] bg-gradient-to-b from-slate-900/60 to-[#0B0F19]">
              <div className="relative">
                <div className="w-20 h-20 rounded-3xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-xl shadow-blue-500/10">
                  <Calculator className="w-10 h-10 animate-pulse" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black shadow-lg">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-2 max-w-sm">
                <h3 className="text-base sm:text-lg font-black text-white">
                  Siap Menghitung Lot Aman
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Isi modal, pair, dan jarak Stop Loss Anda di sebelah kiri, kemudian tekan tombol:
                </p>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-400 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md">
                  <Calculator className="w-4 h-4" />
                  <span>&quot;Hitung Lot &amp; Validasi SOP&quot;</span>
                </div>
                <p className="text-[11px] text-slate-500 pt-1">
                  Hasil ukuran lot yang wajib diketik di MetaTrader akan muncul di sini secara instan.
                </p>
              </div>

              <div className="w-full pt-4 border-t border-white/5 text-left text-xs text-slate-400 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Mencegah modal hangus akibat over-lot</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Toleransi risiko terukur maksimal 1-2%</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Tersedia tombol salin lot instan</span>
                </div>
              </div>
            </div>
          ) : (
            /* ACTIVE CALCULATION RESULT CARD: SHOWN ONLY AFTER BUTTON IS CLICKED */
            <div
              id="hasil-kalkulasi-lot"
              className="glass-panel rounded-3xl p-6 border border-emerald-500/40 relative overflow-hidden shadow-2xl bg-gradient-to-b from-slate-900/95 to-[#0B0F19] space-y-5 animate-in fade-in duration-300"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-black text-white uppercase tracking-wider">
                    Hasil Validasi SOP MetaTrader
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {calculationResult.selectedPair}
                </span>
              </div>

              {/* Huge Lot Display Box */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 text-center relative space-y-2 shadow-inner">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>SOP Terverifikasi Aman</span>
                </div>

                <div className="text-5xl sm:text-6xl font-black font-mono text-emerald-400 tracking-tight flex items-center justify-center gap-2">
                  <span>{calculationResult.safeLot.toFixed(2)}</span>
                </div>

                <p className="text-xs text-slate-300 font-medium">
                  {calculationResult.accountType === 'STANDARD' ? 'Ketik angka ini di kolom Volume Standard MetaTrader' : 'Ketik angka ini di kolom Volume Cent MetaTrader'}
                </p>

                <button
                  type="button"
                  onClick={handleCopyLot}
                  className="mt-2 w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Angka Lot Berhasil Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Salin Angka Lot ({calculationResult.safeLot.toFixed(2)})</span>
                    </>
                  )}
                </button>
              </div>

              {/* Explanation: Apa yang Terjadi Jika Kena Stop Loss? */}
              <div className="space-y-3 pt-1 border-t border-white/10">
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-blue-400" />
                  <span>Simulasi Jika Analisa Salah (Kena Stop Loss):</span>
                </h3>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/20">
                    <span className="text-[10px] text-slate-400 block mb-0.5">Maksimal Uang Hilang:</span>
                    <span className="font-mono font-black text-rose-400 text-sm block">
                      - ${calculationResult.moneyAtRisk.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      ≈ Rp {calculationResult.moneyAtRiskIDR.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-white/10">
                    <span className="text-[10px] text-slate-400 block mb-0.5">Sisa Saldo Aman:</span>
                    <span className="font-mono font-black text-emerald-400 text-sm block">
                      ${calculationResult.balanceRemaining.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Modal {(100 - calculationResult.riskPercent).toFixed(1)}% masih utuh
                    </span>
                  </div>
                </div>

                {/* Ketahanan Margin Call Card */}
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-3">
                  <ShieldCheck className="w-7 h-7 text-emerald-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-white">
                      Ketahanan Modal: <span className="text-emerald-400">{calculationResult.tradesToMarginCall} Kali Salah Beruntun</span>
                    </p>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Dengan lot <strong className="text-emerald-300 font-mono">{calculationResult.safeLot.toFixed(2)}</strong>, Anda baru bisa bangkrut jika analisa Anda salah <strong>{calculationResult.tradesToMarginCall} kali berturut-turut</strong> tanpa sekalipun menang. Akun Anda sangat terlindungi!
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Link to Journal */}
              <div className="pt-2 border-t border-white/5">
                <Link
                  href="/journal"
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Catat Rencana Trade ini ke Jurnal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Comparison Card: Safe Lot vs Over-Lot Danger */}
          {calculationResult && (
            <div className="glass-panel rounded-3xl p-5 border border-rose-500/30 space-y-3 bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950/20">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Bahaya Jika Asal Memasukkan Lot (Over-Lot)
                </h4>
              </div>

              <p className="text-[11px] text-slate-300 leading-relaxed">
                Bandingkan jika Anda nekat memakai lot asal tebak misalnya <strong>Lot {calculationResult.badLot}</strong> (10x lebih besar):
              </p>

              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-300 space-y-1">
                <div className="flex justify-between font-bold">
                  <span>Rugi Sekali Kena SL:</span>
                  <span className="font-mono text-rose-400 font-black">- ${calculationResult.badLoss} ({calculationResult.badLossPercent}% Modal)</span>
                </div>
                <p className="text-[10px] text-slate-400">
                  Hanya butuh 3-5 kali salah, seluruh uang tabungan Anda langsung lenyap terbakar Margin Call!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Educational Accordion / FAQ Section */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
        <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
          <HelpCircle className="w-5 h-5 text-blue-400" />
          <h2 className="text-base font-bold text-white">
            Panduan & Tanya Jawab Kalkulator Lot untuk Pemula
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
            <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
              <span>❓ Apa itu LOT dalam trading?</span>
            </h4>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              LOT adalah ukuran volume transaksi Anda di pasar keuangan. Semakin besar lot yang Anda pasang, semakin besar nilai keuntungan per pips, <strong>tapi juga semakin cepat modal Anda ludes</strong> jika harga berbalik arah.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
            <h4 className="font-bold text-blue-400 flex items-center gap-1.5">
              <span>❓ Di mana mengetik angka Lot di MetaTrader?</span>
            </h4>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Buka aplikasi MetaTrader (MT4/MT5) di HP Anda, pilih menu <strong>New Order</strong>. Di bagian tengah atas terdapat kotak angka (misal: 0.01 atau 0.10). <strong>Gantilah angka tersebut dengan angka Safe Lot dari kalkulator ini</strong> sebelum menekan tombol BUY atau SELL.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
            <h4 className="font-bold text-amber-400 flex items-center gap-1.5">
              <span>❓ Kenapa harus pasang Stop Loss (SL)?</span>
            </h4>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Stop Loss adalah perintah otomatis untuk menutup posisi ketika kerugian mencapai batas toleransi yang sudah dihitung. Tanpa Stop Loss, pasar yang mendadak bergerak kencang saat ada berita rilis dapat menghabiskan saldo akun Anda sampai $0.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
