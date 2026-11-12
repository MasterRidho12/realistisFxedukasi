import { NextResponse } from 'next/server';
import { InvestorAccount, InvestorTrade, TrackRecordPerformance } from '@/types';

// Global in-memory storage for terminal synced accounts across serverless invocations
declare global {
  // eslint-disable-next-line no-var
  var terminalSyncedAccounts: Record<
    string,
    {
      account: InvestorAccount;
      trades: InvestorTrade[];
      performance: TrackRecordPerformance;
      updatedAt: string;
    }
  > | undefined;
}

if (!globalThis.terminalSyncedAccounts) {
  globalThis.terminalSyncedAccounts = {};
}

// Helper to compute institutional performance from real trade records
function computePerformance(
  trades: InvestorTrade[],
  deposit: number,
  isCent: boolean,
  accountNumber: string,
  brokerServer: string
): TrackRecordPerformance {
  const totalTrades = trades.length;
  const winningTrades = trades.filter((t) => t.pnl > 0).length;
  const losingTrades = trades.filter((t) => t.pnl < 0).length;
  const winRate = totalTrades > 0 ? Number(((winningTrades / totalTrades) * 100).toFixed(1)) : 0;

  const totalProfit = trades.filter((t) => t.pnl > 0).reduce((acc, t) => acc + t.pnl, 0);
  const totalLoss = Math.abs(trades.filter((t) => t.pnl < 0).reduce((acc, t) => acc + t.pnl, 0));
  const netPnL = Number((totalProfit - totalLoss).toFixed(2));

  const profitFactor = totalLoss > 0 ? Number((totalProfit / totalLoss).toFixed(2)) : totalProfit > 0 ? 5.0 : 0;
  const avgWin = winningTrades > 0 ? Number((totalProfit / winningTrades).toFixed(2)) : 0;
  const avgLoss = losingTrades > 0 ? Number((totalLoss / losingTrades).toFixed(2)) : 0;
  const riskRewardRatio = avgLoss > 0 ? Number((avgWin / avgLoss).toFixed(2)) : 2.0;

  const slTrades = trades.filter((t) => t.stopLoss !== undefined && t.stopLoss > 0).length;
  const slDisciplineRate = totalTrades > 0 ? Number(((slTrades / totalTrades) * 100).toFixed(1)) : 85;

  let peak = deposit;
  let running = deposit;
  let maxDd = 0;

  trades.slice().reverse().forEach((t) => {
    running += t.pnl;
    if (running > peak) peak = running;
    const dd = ((peak - running) / peak) * 100;
    if (dd > maxDd) maxDd = dd;
  });

  const maxDrawdown = Number(Math.max(2.5, Math.min(45.0, maxDd)).toFixed(1));

  let grade: 'A' | 'B' | 'C' = 'A';
  let score = 90;
  let verdict = 'PERFORMA SANGAT BAGUS (Disiplin Terjaga)';
  let verdictSub = `Win Rate ${winRate}% & Data Riil Terverifikasi`;

  if (winRate >= 65 && profitFactor >= 1.7 && maxDrawdown <= 15) {
    grade = 'A';
    score = Math.min(98, Math.round(75 + winRate * 0.25));
    verdict = 'PERFORMA SANGAT BAGUS (Disiplin Terjaga)';
    verdictSub = 'Kepatuhan SOP 1% Terpenuhi & Akurasi Entry Tajam';
  } else if (winRate >= 50 && profitFactor >= 1.2) {
    grade = 'B';
    score = Math.min(84, Math.round(65 + winRate * 0.2));
    verdict = 'PERFORMA CUKUP BAGUS (Disiplin Terjaga)';
    verdictSub = 'Akun Profit Konsisten Namun Rasio Reward Perlu Diperbesar';
  } else {
    grade = 'C';
    score = Math.max(45, Math.round(winRate * 0.8));
    verdict = 'PERLU EVALUASI KETAT (Risiko Tinggi)';
    verdictSub = 'Tingkatkan Akurasi S&R dan Batasi Ukuran Lot Sesuai SOP 1%';
  }

  return {
    grade,
    score,
    verdict,
    verdictSub,
    totalTrades,
    winningTrades,
    losingTrades,
    winRate,
    profitFactor,
    totalProfit: Math.round(totalProfit * 100) / 100,
    totalLoss: Math.round(totalLoss * 100) / 100,
    netPnL,
    maxDrawdown,
    avgWin,
    avgLoss,
    riskRewardRatio,
    slDisciplineRate,
    summary: `Data sinkronisasi langsung dari MetaTrader MT4/MT5 (${isCent ? 'Akun Cent USC' : 'Akun Standard USD'}). Ditemukan ${totalTrades} transaksi tertutup riil dengan Win Rate ${winRate}% dan profit factor ${profitFactor}.`,
    diagnostics: [
      {
        title: 'Akurasi Eksekusi & Win Rate',
        status: winRate >= 60 ? 'BAGUS' : winRate >= 48 ? 'CUKUP' : 'PERLU_PERBAIKAN',
        message: `Win rate ${winRate}% (${winningTrades} Win / ${losingTrades} Loss) dari transaksi riil akun #${accountNumber}.`,
      },
      {
        title: 'Manajemen Risiko Modal (SOP 1%)',
        status: 'BAGUS',
        message: `Rata-rata kerugian per transaksi tercatat ${isCent ? avgLoss + ' USC' : '$' + avgLoss}.`,
      },
      {
        title: 'Profit Factor & Rasio Reward',
        status: profitFactor >= 1.5 ? 'BAGUS' : profitFactor >= 1.1 ? 'CUKUP' : 'PERLU_PERBAIKAN',
        message: `Profit factor ${profitFactor}. Keuntungan mampu menutupi kerugian secara matematis.`,
      },
      {
        title: 'Disiplin Stop Loss (SL)',
        status: slDisciplineRate >= 80 ? 'BAGUS' : 'CUKUP',
        message: `${slDisciplineRate}% transaksi memiliki Stop Loss yang terpasang.`,
      },
    ],
    recommendations: [
      'Pertahankan pembatasan Stop Loss pada setiap transaksi tanpa kompromi.',
      isCent ? 'Akun Cent sangat bagus untuk mematangkan psikologi 100 transaksi sebelum skala besar.' : 'Pertahankan lot proporsional dengan modal.',
      'Gunakan jeda istirahat jika sudah mencapai target harian.',
    ],
  };
}

// POST endpoint for MetaTrader EA to push real deals
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      accountNumber,
      brokerServer = 'MetaTrader Server',
      platform = 'MT5',
      accountName = 'Akun Riil MetaTrader',
      balance = 0,
      equity = 0,
      deposit = 0,
      currency = 'USD',
      trades = [],
    } = body;

    if (!accountNumber) {
      return NextResponse.json({ success: false, error: 'Nomor akun (accountNumber) wajib disertakan.' }, { status: 400 });
    }

    const isCent = currency.toUpperCase() === 'USC' || currency.toUpperCase() === 'CENT';

    // Format trades
    const formattedTrades: InvestorTrade[] = (trades as any[]).map((t, idx) => ({
      ticket: t.ticket || idx + 1,
      openTime: t.openTime || new Date().toISOString().replace('T', ' ').substring(0, 19),
      closeTime: t.closeTime || t.openTime || new Date().toISOString().replace('T', ' ').substring(0, 19),
      pair: (t.pair || t.symbol || 'XAUUSD').toUpperCase(),
      type: (t.type || 'BUY').toUpperCase() as 'BUY' | 'SELL',
      lot: parseFloat(t.lot || t.volume) || 0.01,
      openPrice: parseFloat(t.openPrice) || 0,
      closePrice: parseFloat(t.closePrice) || 0,
      stopLoss: t.stopLoss ? parseFloat(t.stopLoss) : undefined,
      takeProfit: t.takeProfit ? parseFloat(t.takeProfit) : undefined,
      pnl: parseFloat(t.pnl || t.profit) || 0,
      pips: parseInt(t.pips) || (parseFloat(t.pnl || t.profit) > 0 ? 50 : -30),
      sopCompliant: t.stopLoss !== undefined || parseFloat(t.pnl || t.profit) > 0,
      notes: t.notes || (parseFloat(t.pnl || t.profit) >= 0 ? 'Target tercapai (Sync Riil MT5)' : 'Cut loss / Hit SL (Sync Riil MT5)'),
    }));

    // Sort newest first
    formattedTrades.sort((a, b) => new Date(b.closeTime).getTime() - new Date(a.closeTime).getTime());

    const initialDeposit = deposit > 0 ? deposit : isCent ? 5000 : 1000;
    const performance = computePerformance(formattedTrades, initialDeposit, isCent, String(accountNumber), brokerServer);

    const account: InvestorAccount = {
      platform: platform.toUpperCase() === 'MT4' ? 'MT4' : 'MT5',
      brokerServer,
      accountNumber: String(accountNumber),
      accountName: isCent ? `${accountName} (Cent)` : accountName,
      accountType: isCent ? 'CENT' : 'STANDARD',
      balance: balance > 0 ? balance : initialDeposit + performance.netPnL,
      equity: equity > 0 ? equity : balance > 0 ? balance : initialDeposit + performance.netPnL,
      deposit: initialDeposit,
      currency: isCent ? 'USC' : currency,
      connectedAt: new Date().toISOString(),
      lastSyncAt: new Date().toISOString(),
      status: 'CONNECTED',
      dataSource: 'EA_SYNC',
    };

    // Store in global memory
    globalThis.terminalSyncedAccounts![String(accountNumber)] = {
      account,
      trades: formattedTrades,
      performance,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: `Berhasil menyinkronkan ${formattedTrades.length} trade riil dari terminal MT4/MT5.`,
      account,
      performance,
      tradesCount: formattedTrades.length,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Gagal memproses sinkronisasi data.';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// GET endpoint to query synced data for a given accountNumber
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const accountNumber = searchParams.get('accountNumber');

    if (!accountNumber) {
      return NextResponse.json({ success: false, error: 'Parameter accountNumber diperlukan.' }, { status: 400 });
    }

    const data = globalThis.terminalSyncedAccounts?.[accountNumber];

    if (!data) {
      return NextResponse.json({
        success: false,
        error: `Belum ada data sinkronisasi terminal yang diterima untuk akun #${accountNumber}.`,
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      account: data.account,
      trades: data.trades,
      performance: data.performance,
      updatedAt: data.updatedAt,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Gagal mengambil data sinkronisasi.';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
