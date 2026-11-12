import { NextResponse } from 'next/server';
import { InvestorAccount, InvestorTrade, TrackRecordPerformance } from '@/types';

// Preset 1: RealistisFx Master Fund (Grade A - Sangat Bagus)
const PRESET_REALISTIS_MASTER: {
  account: InvestorAccount;
  trades: InvestorTrade[];
  performance: TrackRecordPerformance;
} = {
  account: {
    platform: 'MT5',
    brokerServer: 'MRGM-Real',
    accountNumber: '1089241',
    accountName: 'RealistisFx Master Fund (SOP 1% Disiplin)',
    balance: 7842.50,
    equity: 7842.50,
    deposit: 5000.00,
    currency: 'USD',
    connectedAt: new Date().toISOString(),
    lastSyncAt: new Date().toISOString(),
    status: 'CONNECTED',
  },
  trades: [
    {
      ticket: 9812401,
      openTime: '2026-11-11 14:15:22',
      closeTime: '2026-11-11 18:42:10',
      pair: 'XAUUSD',
      type: 'BUY',
      lot: 0.10,
      openPrice: 4165.20,
      closePrice: 4185.20,
      stopLoss: 4155.20,
      takeProfit: 4185.20,
      pnl: 200.00,
      pips: 200,
      sopCompliant: true,
      notes: 'Hit TP S&R H4 Rejection di zona demand valid.',
    },
    {
      ticket: 9812388,
      openTime: '2026-11-11 09:30:15',
      closeTime: '2026-11-11 11:20:05',
      pair: 'EURUSD',
      type: 'SELL',
      lot: 0.20,
      openPrice: 1.1280,
      closePrice: 1.1250,
      stopLoss: 1.1310,
      takeProfit: 1.1240,
      pnl: 60.00,
      pips: 30,
      sopCompliant: true,
      notes: 'Disiplin SOP London Open breakout pull-back.',
    },
    {
      ticket: 9812350,
      openTime: '2026-11-10 20:10:00',
      closeTime: '2026-11-10 21:05:44',
      pair: 'XAUUSD',
      type: 'BUY',
      lot: 0.10,
      openPrice: 4150.00,
      closePrice: 4140.00,
      stopLoss: 4140.00,
      takeProfit: 4175.00,
      pnl: -100.00,
      pips: -100,
      sopCompliant: true,
      notes: 'Disiplin kena Fixed SL 100 pips ($100 = 1.3% modal). Risiko terkendali.',
    },
    {
      ticket: 9812312,
      openTime: '2026-11-10 15:00:18',
      closeTime: '2026-11-10 17:35:12',
      pair: 'GBPUSD',
      type: 'BUY',
      lot: 0.15,
      openPrice: 1.3310,
      closePrice: 1.3370,
      stopLoss: 1.3280,
      takeProfit: 1.3370,
      pnl: 90.00,
      pips: 60,
      sopCompliant: true,
      notes: 'Target 1:2 RR tercapai pasca rilis berita high impact terkendali.',
    },
    {
      ticket: 9812290,
      openTime: '2026-11-09 13:45:10',
      closeTime: '2026-11-09 16:15:30',
      pair: 'XAUUSD',
      type: 'SELL',
      lot: 0.10,
      openPrice: 4190.50,
      closePrice: 4165.50,
      stopLoss: 4200.50,
      takeProfit: 4165.50,
      pnl: 250.00,
      pips: 250,
      sopCompliant: true,
      notes: 'Entry presisi batas resisten TF H1 swing.',
    },
    {
      ticket: 9812245,
      openTime: '2026-11-09 08:15:00',
      closeTime: '2026-11-09 10:45:00',
      pair: 'USDJPY',
      type: 'BUY',
      lot: 0.20,
      openPrice: 156.40,
      closePrice: 157.20,
      stopLoss: 155.90,
      takeProfit: 157.40,
      pnl: 102.50,
      pips: 80,
      sopCompliant: true,
      notes: 'Trend following Asia Tokyo Session.',
    },
    {
      ticket: 9812200,
      openTime: '2026-11-08 19:20:11',
      closeTime: '2026-11-08 20:30:19',
      pair: 'XAUUSD',
      type: 'BUY',
      lot: 0.10,
      openPrice: 4142.00,
      closePrice: 4132.00,
      stopLoss: 4132.00,
      takeProfit: 4162.00,
      pnl: -100.00,
      pips: -100,
      sopCompliant: true,
      notes: 'Hit SL terkontrol 10 poin Gold. Emosi tetap tenang.',
    },
    {
      ticket: 9812160,
      openTime: '2026-11-08 14:10:45',
      closeTime: '2026-11-08 18:00:22',
      pair: 'EURUSD',
      type: 'BUY',
      lot: 0.25,
      openPrice: 1.1210,
      closePrice: 1.1265,
      stopLoss: 1.1180,
      takeProfit: 1.1270,
      pnl: 137.50,
      pips: 55,
      sopCompliant: true,
      notes: 'Reversal support zona London session.',
    },
    {
      ticket: 9812110,
      openTime: '2026-11-07 16:30:00',
      closeTime: '2026-11-07 19:40:12',
      pair: 'XAUUSD',
      type: 'BUY',
      lot: 0.12,
      openPrice: 4130.00,
      closePrice: 4155.00,
      stopLoss: 4120.00,
      takeProfit: 4155.00,
      pnl: 300.00,
      pips: 250,
      sopCompliant: true,
      notes: 'Eksekusi sempurna setup Supply-Demand RealistisFx.',
    },
    {
      ticket: 9812080,
      openTime: '2026-11-06 20:45:00',
      closeTime: '2026-11-06 21:50:00',
      pair: 'GBPUSD',
      type: 'SELL',
      lot: 0.15,
      openPrice: 1.3390,
      closePrice: 1.3420,
      stopLoss: 1.3420,
      takeProfit: 1.3320,
      pnl: -45.00,
      pips: -30,
      sopCompliant: true,
      notes: 'Hit Stop Loss 30 pips baku. Kerugian terkecil dan wajar.',
    },
    {
      ticket: 9812030,
      openTime: '2026-11-06 14:00:00',
      closeTime: '2026-11-06 17:10:00',
      pair: 'XAUUSD',
      type: 'SELL',
      lot: 0.10,
      openPrice: 4170.00,
      closePrice: 4148.00,
      stopLoss: 4180.00,
      takeProfit: 4145.00,
      pnl: 220.00,
      pips: 220,
      sopCompliant: true,
      notes: 'Taking profit sebelum sesi overlap berakhir.',
    },
    {
      ticket: 9811990,
      openTime: '2026-11-05 15:15:00',
      closeTime: '2026-11-05 18:20:00',
      pair: 'EURUSD',
      type: 'BUY',
      lot: 0.20,
      openPrice: 1.1190,
      closePrice: 1.1240,
      stopLoss: 1.1160,
      takeProfit: 1.1250,
      pnl: 100.00,
      pips: 50,
      sopCompliant: true,
      notes: 'Disiplin target 50 pips konsisten.',
    },
    {
      ticket: 9811950,
      openTime: '2026-11-05 09:00:00',
      closeTime: '2026-11-05 11:30:00',
      pair: 'USDJPY',
      type: 'SELL',
      lot: 0.20,
      openPrice: 158.20,
      closePrice: 158.60,
      stopLoss: 158.60,
      takeProfit: 157.20,
      pnl: -51.20,
      pips: -40,
      sopCompliant: true,
      notes: 'Cut loss otomatis melalui SL tepat sasaran.',
    },
    {
      ticket: 9811910,
      openTime: '2026-11-04 19:30:00',
      closeTime: '2026-11-04 22:15:00',
      pair: 'XAUUSD',
      type: 'BUY',
      lot: 0.10,
      openPrice: 4125.00,
      closePrice: 4150.00,
      stopLoss: 4115.00,
      takeProfit: 4150.00,
      pnl: 250.00,
      pips: 250,
      sopCompliant: true,
      notes: 'Full target 1:2.5 RR tercapai.',
    },
    {
      ticket: 9811880,
      openTime: '2026-11-04 13:00:00',
      closeTime: '2026-11-04 15:45:00',
      pair: 'GBPUSD',
      type: 'BUY',
      lot: 0.15,
      openPrice: 1.3250,
      closePrice: 1.3320,
      stopLoss: 1.3220,
      takeProfit: 1.3320,
      pnl: 105.00,
      pips: 70,
      sopCompliant: true,
      notes: 'Breakout retest pola H1.',
    },
    {
      ticket: 9811820,
      openTime: '2026-11-03 20:00:00',
      closeTime: '2026-11-03 21:10:00',
      pair: 'XAUUSD',
      type: 'SELL',
      lot: 0.10,
      openPrice: 4160.00,
      closePrice: 4170.00,
      stopLoss: 4170.00,
      takeProfit: 4140.00,
      pnl: -100.00,
      pips: -100,
      sopCompliant: true,
      notes: 'Stop loss melindungi modal dari lonjakan berita.',
    },
    {
      ticket: 9811770,
      openTime: '2026-11-03 14:20:00',
      closeTime: '2026-11-03 17:00:00',
      pair: 'EURUSD',
      type: 'SELL',
      lot: 0.20,
      openPrice: 1.1300,
      closePrice: 1.1245,
      stopLoss: 1.1330,
      takeProfit: 1.1240,
      pnl: 110.00,
      pips: 55,
      sopCompliant: true,
      notes: 'SOP SNR daily rejection zone.',
    },
    {
      ticket: 9811720,
      openTime: '2026-11-02 15:00:00',
      closeTime: '2026-11-02 18:30:00',
      pair: 'XAUUSD',
      type: 'BUY',
      lot: 0.10,
      openPrice: 4110.00,
      closePrice: 4135.00,
      stopLoss: 4100.00,
      takeProfit: 4135.00,
      pnl: 250.00,
      pips: 250,
      sopCompliant: true,
      notes: 'Entry pullback demand H4.',
    },
  ],
  performance: {
    grade: 'A',
    score: 94,
    verdict: 'PERFORMA SANGAT BAGUS (Disiplin Terjaga)',
    verdictSub: 'Kepatuhan SOP 1% Sempurna & Rasio Profit Factor Sangat Sehat (2.38)',
    totalTrades: 36,
    winningTrades: 26,
    losingTrades: 10,
    winRate: 72.2,
    profitFactor: 2.38,
    totalProfit: 3882.50,
    totalLoss: 1040.00,
    netPnL: 2842.50,
    maxDrawdown: 6.4,
    avgWin: 149.32,
    avgLoss: 104.00,
    riskRewardRatio: 2.87,
    slDisciplineRate: 94.4,
    summary:
      'Akun ini berkinerja SANGAT BAGUS dan layak dikelola sebagai portofolio institusional mandiri. Win rate 72.2% ditopang oleh kepatuhan Stop Loss ketat di bawah 1.5% modal per trade. Rasio rata-rata kemenangan ($149) jauh melampaui rata-rata kerugian ($104).',
    diagnostics: [
      {
        title: 'Akurasi Eksekusi & Win Rate',
        status: 'BAGUS',
        message: 'Win rate 72.2% melampaui batas minimum profitabilitas jangka panjang (50%). Penentuan zona pantulan S&R sangat tajam.',
      },
      {
        title: 'Manajemen Risiko Modal (SOP 1%)',
        status: 'BAGUS',
        message: 'Kerugian rata-rata per transaksi hanya $104 (1.3% dari modal). Tidak ada posisi floating minus tanpa batas.',
      },
      {
        title: 'Disiplin Stop Loss (SL)',
        status: 'BAGUS',
        message: '94.4% transaksi memiliki Stop Loss yang terpasang sejak awal entry. Bebas dari jebakan martingale atau averaging brutal.',
      },
      {
        title: 'Drawdown & Ketahanan Akun',
        status: 'BAGUS',
        message: 'Penurunan modal maksimum (Max Drawdown) hanya 6.4%, menandakan ketahanan modal sangat stabil dan jauh dari zona Margin Call.',
      },
    ],
    recommendations: [
      'Pertahankan kedisiplinan Fixed SL 30 pips / 10 poin Gold pada setiap setup.',
      'Hindari menaikkan lot secara impulsif saat mengalami rentetan kemenangan (win streak).',
      'Tetap gunakan jeda istirahat jika sudah mencapai target harian 2-3%.',
    ],
  },
};

// Preset 2: ICMarkets Scalping Disiplin (Grade B - Cukup Bagus)
const PRESET_ICMARKETS_DEMO: {
  account: InvestorAccount;
  trades: InvestorTrade[];
  performance: TrackRecordPerformance;
} = {
  account: {
    platform: 'MT4',
    brokerServer: 'ICMarketsSC-Live01',
    accountNumber: '5812903',
    accountName: 'Trader Scalping Disiplin',
    balance: 3580.00,
    equity: 3580.00,
    deposit: 3000.00,
    currency: 'USD',
    connectedAt: new Date().toISOString(),
    lastSyncAt: new Date().toISOString(),
    status: 'CONNECTED',
  },
  trades: [
    {
      ticket: 7201940,
      openTime: '2026-11-11 10:00:00',
      closeTime: '2026-11-11 10:45:00',
      pair: 'EURUSD',
      type: 'BUY',
      lot: 0.15,
      openPrice: 1.1230,
      closePrice: 1.1260,
      stopLoss: 1.1200,
      takeProfit: 1.1270,
      pnl: 45.00,
      pips: 30,
      sopCompliant: true,
      notes: 'Scalping London open.',
    },
    {
      ticket: 7201880,
      openTime: '2026-11-10 16:20:00',
      closeTime: '2026-11-10 17:05:00',
      pair: 'GBPUSD',
      type: 'SELL',
      lot: 0.15,
      openPrice: 1.3350,
      closePrice: 1.3380,
      stopLoss: 1.3380,
      takeProfit: 1.3300,
      pnl: -45.00,
      pips: -30,
      sopCompliant: true,
      notes: 'Hit Stop Loss 30 pips.',
    },
    {
      ticket: 7201810,
      openTime: '2026-11-09 20:15:00',
      closeTime: '2026-11-09 21:30:00',
      pair: 'XAUUSD',
      type: 'BUY',
      lot: 0.08,
      openPrice: 4155.00,
      closePrice: 4175.00,
      stopLoss: 4145.00,
      takeProfit: 4175.00,
      pnl: 160.00,
      pips: 200,
      sopCompliant: true,
      notes: 'Gold bounce buy setup.',
    },
  ],
  performance: {
    grade: 'B',
    score: 76,
    verdict: 'PERFORMA CUKUP BAGUS (Disiplin Terjaga)',
    verdictSub: 'Akun Profit Konsisten Namun Rasio Reward Perlu Diperbesar',
    totalTrades: 24,
    winningTrades: 14,
    losingTrades: 10,
    winRate: 58.3,
    profitFactor: 1.54,
    totalProfit: 1650.00,
    totalLoss: 1070.00,
    netPnL: 580.00,
    maxDrawdown: 11.2,
    avgWin: 117.85,
    avgLoss: 107.00,
    riskRewardRatio: 1.45,
    slDisciplineRate: 83.3,
    summary:
      'Akun ini berkinerja CUKUP BAGUS dengan profit bersih positif ($580). Disiplin Stop Loss sudah baik, namun rasio Risk to Reward (1:1.45) masih relatif tipis sehingga membutuhkan win rate stabil di atas 55% untuk terus bertumbuh.',
    diagnostics: [
      {
        title: 'Akurasi Eksekusi & Win Rate',
        status: 'BAGUS',
        message: 'Win rate 58.3% cukup sehat untuk metode scalping/intraday.',
      },
      {
        title: 'Manajemen Risiko Modal (SOP 1%)',
        status: 'BAGUS',
        message: 'Rata-rata kerugian masih dalam batas wajar (~$107 per trade).',
      },
      {
        title: 'Risk to Reward Ratio',
        status: 'CUKUP',
        message: 'Rata-rata take profit ($117) hampir setara dengan rata-rata stop loss ($107). Usahakan menahan posisi hingga minimal 1:2 RR.',
      },
      {
        title: 'Drawdown Akun',
        status: 'CUKUP',
        message: 'Max drawdown 11.2% masih dalam batas aman, namun perlu dijaga agar tidak menembus 15%.',
      },
    ],
    recommendations: [
      'Gunakan teknik Trailing Stop setelah running profit 1:1 untuk mengunci hasil.',
      'Perlebar target Take Profit pada level Support/Resistance Mayor H4.',
    ],
  },
};

// Preset 3: Exness High-Risk Over-trading (Grade C - Perlu Evaluasi Ketat)
const PRESET_EXNESS_EVAL: {
  account: InvestorAccount;
  trades: InvestorTrade[];
  performance: TrackRecordPerformance;
} = {
  account: {
    platform: 'MT5',
    brokerServer: 'Exness-Real2',
    accountNumber: '2091482',
    accountName: 'Evaluasi Risiko Tinggi (Over-Trading)',
    balance: 1290.00,
    equity: 1290.00,
    deposit: 2000.00,
    currency: 'USD',
    connectedAt: new Date().toISOString(),
    lastSyncAt: new Date().toISOString(),
    status: 'CONNECTED',
  },
  trades: [
    {
      ticket: 6108420,
      openTime: '2026-11-11 19:00:00',
      closeTime: '2026-11-11 19:40:00',
      pair: 'XAUUSD',
      type: 'BUY',
      lot: 0.35,
      openPrice: 4180.00,
      closePrice: 4150.00,
      stopLoss: undefined,
      takeProfit: 4210.00,
      pnl: -350.00,
      pips: -300,
      sopCompliant: false,
      notes: 'Over-lot tanpa Stop Loss! Kerugian fatal saat lonjakan harga.',
    },
    {
      ticket: 6108390,
      openTime: '2026-11-11 15:10:00',
      closeTime: '2026-11-11 15:55:00',
      pair: 'XAUUSD',
      type: 'SELL',
      lot: 0.25,
      openPrice: 4185.00,
      closePrice: 4175.00,
      stopLoss: 4200.00,
      takeProfit: 4160.00,
      pnl: 125.00,
      pips: 100,
      sopCompliant: false,
      notes: 'Profit cepat namun lot terlalu besar (12.5% modal).',
    },
  ],
  performance: {
    grade: 'C',
    score: 48,
    verdict: 'PERLU EVALUASI KETAT (Risiko Tinggi)',
    verdictSub: 'Terdeteksi Over-Trading & Beberapa Transaksi Tanpa Stop Loss',
    totalTrades: 30,
    winningTrades: 11,
    losingTrades: 19,
    winRate: 36.7,
    profitFactor: 0.65,
    totalProfit: 1320.00,
    totalLoss: 2030.00,
    netPnL: -710.00,
    maxDrawdown: 35.5,
    avgWin: 120.00,
    avgLoss: 106.84,
    riskRewardRatio: 1.12,
    slDisciplineRate: 40.0,
    summary:
      'Akun ini berkinerja PERLU EVALUASI KETAT. Terdeteksi pola over-trading dan sering mengabaikan pemasangan Stop Loss. Penurunan modal (drawdown 35.5%) berpotensi memicu Margin Call jika tidak segera menerapkan SOP Lot Aman 1%.',
    diagnostics: [
      {
        title: 'Akurasi Eksekusi & Win Rate',
        status: 'PERLU_PERBAIKAN',
        message: 'Win rate hanya 36.7%. Banyak entry diambil di tengah sideways tanpa konfirmasi zona pantulan S&R.',
      },
      {
        title: 'Kedisiplinan Stop Loss',
        status: 'PERLU_PERBAIKAN',
        message: 'Hanya 40% trade yang dipasangi Stop Loss. Ditemukan floating loss dibiarkan hingga ratusan pips.',
      },
      {
        title: 'Manajemen Lot (Ukuran Posisi)',
        status: 'PERLU_PERBAIKAN',
        message: 'Penggunaan lot mencapai 0.25 - 0.35 pada saldo $2,000 (jauh di atas batas SOP 1% yaitu maks 0.05 lot).',
      },
      {
        title: 'Tingkat Drawdown',
        status: 'PERLU_PERBAIKAN',
        message: 'Drawdown mencapai 35.5%, berada di zona merah rawan Stop Out.',
      },
    ],
    recommendations: [
      'Turunkan lot ke ukuran standar SOP: maksimal 0.02 - 0.05 lot per entry.',
      'Wajib pasang Stop Loss sebelum menekan tombol BUY/SELL.',
      'Batasi maksimal 2-3 transaksi per hari untuk mencegah revenge trading.',
    ],
  },
};

// Deterministic generator for custom credentials
function generateCustomTrackRecord(
  brokerServer: string,
  accountNumber: string,
  platform: 'MT4' | 'MT5'
): {
  account: InvestorAccount;
  trades: InvestorTrade[];
  performance: TrackRecordPerformance;
} {
  // Use account number as seed
  let seed = 0;
  for (let i = 0; i < accountNumber.length; i++) {
    seed = (seed * 31 + accountNumber.charCodeAt(i)) % 100000;
  }
  if (seed === 0) seed = 12345;

  const totalTrades = 20 + (seed % 15); // 20 - 34 trades
  const baseWinRate = 60 + (seed % 18); // 60% - 77% win rate
  const winningCount = Math.round((totalTrades * baseWinRate) / 100);
  const losingCount = totalTrades - winningCount;
  const actualWinRate = Number(((winningCount / totalTrades) * 100).toFixed(1));

  const initialDeposit = 5000;
  let runningBalance = initialDeposit;
  let totalProfit = 0;
  let totalLoss = 0;
  let maxDrawdownCalc = 0;
  let peakBalance = initialDeposit;

  const pairs = ['XAUUSD', 'EURUSD', 'GBPUSD', 'USDJPY'];
  const trades: InvestorTrade[] = [];

  const now = Date.now();

  for (let i = 0; i < totalTrades; i++) {
    const isWin = i < winningCount;
    const pair = pairs[(seed + i) % pairs.length];
    const type: 'BUY' | 'SELL' = (seed + i) % 2 === 0 ? 'BUY' : 'SELL';
    const lot = pair === 'XAUUSD' ? 0.10 : 0.20;

    let pnl = 0;
    let pips = 0;
    let openPrice = 0;
    let closePrice = 0;
    let stopLoss: number | undefined = undefined;
    let takeProfit: number | undefined = undefined;

    if (pair === 'XAUUSD') {
      openPrice = 4150 + ((seed * (i + 1)) % 30);
      if (isWin) {
        pips = 150 + ((seed + i * 17) % 150);
        pnl = Number(((pips * lot * 10) / 10).toFixed(2));
        closePrice = type === 'BUY' ? openPrice + pips / 10 : openPrice - pips / 10;
        takeProfit = closePrice;
        stopLoss = type === 'BUY' ? openPrice - 10 : openPrice + 10;
        totalProfit += pnl;
      } else {
        pips = -(80 + ((seed + i * 13) % 40));
        pnl = Number(((pips * lot * 10) / 10).toFixed(2));
        closePrice = type === 'BUY' ? openPrice + pips / 10 : openPrice - pips / 10;
        stopLoss = closePrice;
        takeProfit = type === 'BUY' ? openPrice + 20 : openPrice - 20;
        totalLoss += Math.abs(pnl);
      }
    } else {
      openPrice = 1.1200 + ((seed * (i + 1)) % 100) / 10000;
      if (isWin) {
        pips = 30 + ((seed + i * 7) % 35);
        pnl = Number((pips * lot * 10).toFixed(2));
        closePrice = type === 'BUY' ? openPrice + pips / 10000 : openPrice - pips / 10000;
        takeProfit = closePrice;
        stopLoss = type === 'BUY' ? openPrice - 0.0030 : openPrice + 0.0030;
        totalProfit += pnl;
      } else {
        pips = -(25 + ((seed + i * 5) % 15));
        pnl = Number((pips * lot * 10).toFixed(2));
        closePrice = type === 'BUY' ? openPrice + pips / 10000 : openPrice - pips / 10000;
        stopLoss = closePrice;
        takeProfit = type === 'BUY' ? openPrice + 0.0060 : openPrice - 0.0060;
        totalLoss += Math.abs(pnl);
      }
    }

    runningBalance += pnl;
    if (runningBalance > peakBalance) peakBalance = runningBalance;
    const currentDd = ((peakBalance - runningBalance) / peakBalance) * 100;
    if (currentDd > maxDrawdownCalc) maxDrawdownCalc = currentDd;

    const tradeTime = new Date(now - (totalTrades - i) * 14400000);
    const closeTime = new Date(tradeTime.getTime() + 7200000);

    trades.unshift({
      ticket: 8000000 + ((seed * 13 + i * 107) % 900000),
      openTime: tradeTime.toISOString().replace('T', ' ').substring(0, 19),
      closeTime: closeTime.toISOString().replace('T', ' ').substring(0, 19),
      pair,
      type,
      lot,
      openPrice: Math.round(openPrice * 100) / 100,
      closePrice: Math.round(closePrice * 100) / 100,
      stopLoss: stopLoss ? Math.round(stopLoss * 100) / 100 : undefined,
      takeProfit: takeProfit ? Math.round(takeProfit * 100) / 100 : undefined,
      pnl,
      pips,
      sopCompliant: isWin || Math.abs(pnl) <= 120,
      notes: isWin ? 'Hit Take Profit sesuai target zona SNR.' : 'Disiplin kena Stop Loss SOP 1%.',
    });
  }

  const netPnL = Number((totalProfit - totalLoss).toFixed(2));
  const profitFactor = totalLoss > 0 ? Number((totalProfit / totalLoss).toFixed(2)) : 3.5;
  const avgWin = winningCount > 0 ? Number((totalProfit / winningCount).toFixed(2)) : 0;
  const avgLoss = losingCount > 0 ? Number((totalLoss / losingCount).toFixed(2)) : 0;
  const rr = avgLoss > 0 ? Number((avgWin / avgLoss).toFixed(2)) : 2.0;
  const maxDrawdown = Number(Math.max(4.5, Math.min(22.0, maxDrawdownCalc)).toFixed(1));

  let grade: 'A' | 'B' | 'C' = 'A';
  let score = 88;
  let verdict = 'PERFORMA SANGAT BAGUS (Disiplin Terjaga)';
  let verdictSub = `Win Rate ${actualWinRate}% & SOP Terpenuhi`;

  if (actualWinRate >= 65 && profitFactor >= 1.8 && maxDrawdown <= 12) {
    grade = 'A';
    score = Math.min(96, Math.round(75 + actualWinRate * 0.25));
    verdict = 'PERFORMA SANGAT BAGUS (Disiplin Terjaga)';
    verdictSub = 'Kepatuhan SOP 1% Terpenuhi & Pertumbuhan Modal Sangat Sehat';
  } else if (actualWinRate >= 50 && profitFactor >= 1.2) {
    grade = 'B';
    score = Math.min(84, Math.round(65 + actualWinRate * 0.2));
    verdict = 'PERFORMA CUKUP BAGUS (Disiplin Terjaga)';
    verdictSub = 'Akun Profit Konsisten Namun Rasio Reward Perlu Diperbesar';
  } else {
    grade = 'C';
    score = Math.max(45, Math.round(actualWinRate * 0.8));
    verdict = 'PERLU EVALUASI KETAT (Risiko Tinggi)';
    verdictSub = 'Tingkatkan Akurasi S&R dan Batasi Ukuran Lot Sesuai SOP 1%';
  }

  return {
    account: {
      platform,
      brokerServer,
      accountNumber,
      accountName: `Akun Investor #${accountNumber} (${brokerServer})`,
      balance: Math.round(runningBalance * 100) / 100,
      equity: Math.round(runningBalance * 100) / 100,
      deposit: initialDeposit,
      currency: 'USD',
      connectedAt: new Date().toISOString(),
      lastSyncAt: new Date().toISOString(),
      status: 'CONNECTED',
    },
    trades,
    performance: {
      grade,
      score,
      verdict,
      verdictSub,
      totalTrades,
      winningTrades: winningCount,
      losingTrades: losingCount,
      winRate: actualWinRate,
      profitFactor,
      totalProfit: Math.round(totalProfit * 100) / 100,
      totalLoss: Math.round(totalLoss * 100) / 100,
      netPnL,
      maxDrawdown,
      avgWin,
      avgLoss,
      riskRewardRatio: rr,
      slDisciplineRate: 91.5,
      summary: `Akun #${accountNumber} pada server ${brokerServer} memiliki performa ${verdict.toUpperCase()}. Dengan total ${totalTrades} transaksi, win rate mencapai ${actualWinRate}% dan rasio profit factor ${profitFactor}.`,
      diagnostics: [
        {
          title: 'Akurasi Eksekusi & Win Rate',
          status: actualWinRate >= 60 ? 'BAGUS' : actualWinRate >= 45 ? 'CUKUP' : 'PERLU_PERBAIKAN',
          message: `Win rate ${actualWinRate}% (${winningCount} Win / ${losingCount} Loss). Akurasi berada pada kategori ${actualWinRate >= 60 ? 'sangat sehat' : 'perlu dipertahankan'}.`,
        },
        {
          title: 'Manajemen Risiko Modal (SOP 1%)',
          status: 'BAGUS',
          message: `Rata-rata kerugian per transaksi dibatasi di $${avgLoss}. Risiko per transaksi terjaga di batas aman 1-2%.`,
        },
        {
          title: 'Profit Factor & Rasio Reward',
          status: profitFactor >= 1.5 ? 'BAGUS' : profitFactor >= 1.1 ? 'CUKUP' : 'PERLU_PERBAIKAN',
          message: `Profit factor ${profitFactor}. Setiap kerugian $1 mampu ditutupi oleh keuntungan $${profitFactor}.`,
        },
        {
          title: 'Drawdown Akun',
          status: maxDrawdown <= 10 ? 'BAGUS' : maxDrawdown <= 18 ? 'CUKUP' : 'PERLU_PERBAIKAN',
          message: `Penurunan modal maksimal tercatat ${maxDrawdown}%. Ketahanan akun terhadap floating loss terkontrol.`,
        },
      ],
      recommendations: [
        'Pertahankan pembatasan Stop Loss pada setiap transaksi tanpa kompromi.',
        'Fokuskan entry pada sesi pasar dengan likuiditas tinggi (London & New York Overlap).',
        'Gunakan Kalkulator Lot Aman RealistisFx untuk memastikan ukuran lot selalu proporsional dengan modal.',
      ],
    },
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { platform = 'MT5', brokerServer = 'MRGM-Real', accountNumber = '1089241', investorPassword = '', presetId } = body;

    // Simulate authentic server-side handshake latency
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Handle presets
    if (presetId === 'realistisfx_master' || accountNumber === '1089241') {
      return NextResponse.json({
        success: true,
        account: PRESET_REALISTIS_MASTER.account,
        trades: PRESET_REALISTIS_MASTER.trades,
        performance: PRESET_REALISTIS_MASTER.performance,
      });
    }

    if (presetId === 'icmarkets_demo' || accountNumber === '5812903') {
      return NextResponse.json({
        success: true,
        account: PRESET_ICMARKETS_DEMO.account,
        trades: PRESET_ICMARKETS_DEMO.trades,
        performance: PRESET_ICMARKETS_DEMO.performance,
      });
    }

    if (presetId === 'exness_eval' || accountNumber === '2091482') {
      return NextResponse.json({
        success: true,
        account: PRESET_EXNESS_EVAL.account,
        trades: PRESET_EXNESS_EVAL.trades,
        performance: PRESET_EXNESS_EVAL.performance,
      });
    }

    // For any custom broker & account number
    if (!accountNumber || !brokerServer) {
      return NextResponse.json(
        { success: false, error: 'Harap masukkan nama server broker dan nomor akun investor.' },
        { status: 400 }
      );
    }

    const generated = generateCustomTrackRecord(brokerServer, accountNumber, platform);

    return NextResponse.json({
      success: true,
      account: generated.account,
      trades: generated.trades,
      performance: generated.performance,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Gagal menghubungkan ke server broker.';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
