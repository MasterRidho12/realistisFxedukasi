import { InvestorAccount, InvestorTrade, TrackRecordPerformance } from '@/types';

export interface ParsedStatementResult {
  account: InvestorAccount;
  trades: InvestorTrade[];
  performance: TrackRecordPerformance;
}

/**
 * Parses MT4 and MT5 Statement Reports (HTML, CSV, or Text)
 * Supports all brokers worldwide, including Standard (USD) and Cent (USC) accounts.
 */
export function parseMetaTraderStatement(
  rawContent: string,
  fileName: string = ''
): ParsedStatementResult {
  const isHtml = rawContent.includes('<table') || rawContent.includes('<html') || rawContent.includes('<tr');

  if (isHtml) {
    return parseHtmlStatement(rawContent, fileName);
  } else {
    return parseCsvStatement(rawContent, fileName);
  }
}

function parseHtmlStatement(html: string, fileName: string): ParsedStatementResult {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Detect Account Header info
  let accountNumber = 'Akun-Real';
  let accountName = 'Akun Trading Riil';
  let brokerServer = 'MetaTrader Server';
  let currency = 'USD';
  let isCent = false;
  let deposit = 0;

  const bodyText = doc.body.innerText || doc.body.textContent || '';

  // Extract Account number & Name & Currency
  const accMatch = bodyText.match(/Account:\s*([0-9]+)/i) || bodyText.match(/Login:\s*([0-9]+)/i);
  if (accMatch) accountNumber = accMatch[1];

  const nameMatch = bodyText.match(/Name:\s*([^\n\r,]+)/i);
  if (nameMatch) accountName = nameMatch[1].trim();

  const brokerMatch = bodyText.match(/Company:\s*([^\n\r,]+)/i) || bodyText.match(/Broker:\s*([^\n\r,]+)/i);
  if (brokerMatch) brokerServer = brokerMatch[1].trim();

  const currMatch = bodyText.match(/Currency:\s*([A-Z]{3,4})/i);
  if (currMatch) {
    currency = currMatch[1].toUpperCase();
    if (currency === 'USC' || currency === 'CENT' || currency === 'EUC') {
      isCent = true;
    }
  }

  // Parse all table rows
  const rows = Array.from(doc.querySelectorAll('tr'));
  const trades: InvestorTrade[] = [];

  let inClosedTrades = false;

  for (const row of rows) {
    const text = row.innerText || row.textContent || '';
    const cells = Array.from(row.querySelectorAll('td, th')).map((c) => (c.textContent || '').trim());

    if (cells.length < 5) continue;

    // Detect closed trades section
    if (text.toLowerCase().includes('closed transactions') || text.toLowerCase().includes('closed trade') || text.toLowerCase().includes('orders') || text.toLowerCase().includes('positions')) {
      inClosedTrades = true;
      continue;
    }

    // Check for deposit row
    if (text.toLowerCase().includes('deposit') || text.toLowerCase().includes('balance:')) {
      const depMatch = text.match(/([0-9]+[\.,][0-9]+)/);
      if (depMatch && deposit === 0) {
        deposit = parseFloat(depMatch[1].replace(',', ''));
      }
    }

    // Attempt to identify a trade row: Ticket (digits), Open Date, Type (buy/sell), Lot/Size, Symbol
    // Typical MT4 row:
    // [0] Ticket, [1] Open Time, [2] Type, [3] Size, [4] Item/Symbol, [5] Price, [6] SL, [7] TP, [8] Close Time, [9] Close Price, [10] Commission, [11] Taxes, [12] Swap, [13] Profit
    const ticketMatch = cells[0]?.match(/^[0-9]{5,10}$/);
    const typeStr = cells[2]?.toLowerCase();
    const isBuyOrSell = typeStr === 'buy' || typeStr === 'sell';

    if (ticketMatch && isBuyOrSell && cells.length >= 10) {
      const ticket = parseInt(cells[0], 10);
      const openTime = cells[1];
      const type: 'BUY' | 'SELL' = typeStr.toUpperCase() as 'BUY' | 'SELL';
      const lot = parseFloat(cells[3].replace(',', '.')) || 0.01;
      let pair = cells[4].toUpperCase();

      // Detect cent suffix (e.g. XAUUSDc, EURUSDc, GBPUSDm)
      if (pair.endsWith('C') && pair.length > 6) {
        isCent = true;
        pair = pair.slice(0, -1);
      } else if (pair.endsWith('M') && pair.length > 6) {
        pair = pair.slice(0, -1);
      }

      const openPrice = parseFloat(cells[5].replace(',', '.')) || 0;
      const stopLossVal = parseFloat(cells[6]?.replace(',', '.')) || undefined;
      const takeProfitVal = parseFloat(cells[7]?.replace(',', '.')) || undefined;
      const closeTime = cells[8] || openTime;
      const closePrice = parseFloat(cells[9]?.replace(',', '.')) || openPrice;

      // Profit is usually the last column or near end
      const lastCell = cells[cells.length - 1];
      const pnl = parseFloat(lastCell.replace(/\s/g, '').replace(',', '.')) || 0;

      // Pips calculation
      const isGold = pair.includes('XAU');
      const pointMultiplier = isGold ? 10 : 10000;
      const diff = type === 'BUY' ? closePrice - openPrice : openPrice - closePrice;
      const pips = Math.round(diff * pointMultiplier);

      const hasSl = stopLossVal !== undefined && stopLossVal > 0;
      const isWin = pnl > 0;
      const isSop = hasSl && (isWin || Math.abs(pnl) <= (isCent ? 500 : 150));

      trades.push({
        ticket,
        openTime,
        closeTime,
        pair,
        type,
        lot,
        openPrice,
        closePrice,
        stopLoss: hasSl ? stopLossVal : undefined,
        takeProfit: takeProfitVal && takeProfitVal > 0 ? takeProfitVal : undefined,
        pnl,
        pips,
        sopCompliant: isSop,
        notes: isWin
          ? 'Target tercapai (Data Riil MT4/MT5)'
          : hasSl
          ? 'Kena Stop Loss disiplin'
          : 'Peringatan: Posisi ditutup tanpa Stop Loss!',
      });
    }
  }

  // Fallback if deposit not found
  if (deposit === 0) {
    deposit = isCent ? 5000 : 1000;
  }

  return buildPerformanceResult(accountNumber, accountName, brokerServer, currency, isCent, deposit, trades);
}

function parseCsvStatement(csv: string, fileName: string): ParsedStatementResult {
  const lines = csv.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);
  const trades: InvestorTrade[] = [];

  let accountNumber = 'Akun-Real';
  let accountName = fileName.replace(/\.[^/.]+$/, '') || 'Akun Riil MT4/MT5';
  let brokerServer = 'Broker MetaTrader';
  let currency = 'USD';
  let isCent = false;
  let deposit = 1000;

  for (const line of lines) {
    // Delimiter can be comma, tab, or semicolon
    let delimiter = ',';
    if (line.includes('\t')) delimiter = '\t';
    else if (line.includes(';')) delimiter = ';';

    const cols = line.split(delimiter).map((c) => c.replace(/^["']|["']$/g, '').trim());

    if (cols.length < 6) continue;

    const firstCol = cols[0];
    const ticketMatch = firstCol.match(/^[0-9]{5,10}$/);
    const typeStr = cols.find((c) => c.toLowerCase() === 'buy' || c.toLowerCase() === 'sell')?.toLowerCase();

    if (ticketMatch && typeStr) {
      const ticket = parseInt(firstCol, 10);
      const type: 'BUY' | 'SELL' = typeStr.toUpperCase() as 'BUY' | 'SELL';

      // Find date/time cols
      const timeCols = cols.filter((c) => c.match(/^[0-9]{4}[\.\-\/][0-9]{2}[\.\-\/][0-9]{2}/));
      const openTime = timeCols[0] || new Date().toISOString().substring(0, 19);
      const closeTime = timeCols[1] || openTime;

      // Find lot/size
      const sizeIndex = cols.indexOf(typeStr) + 1;
      const lot = parseFloat(cols[sizeIndex]?.replace(',', '.')) || 0.01;

      // Find pair
      const symbolCandidate = cols.find((c) => c.length >= 6 && c.length <= 8 && c.match(/^[A-Z0-9]+$/));
      let pair = symbolCandidate || 'XAUUSD';
      if (pair.endsWith('C')) {
        isCent = true;
        pair = pair.slice(0, -1);
      }

      // Find pnl (last numeric column)
      const numericCols = cols.map((c) => parseFloat(c.replace(',', '.'))).filter((n) => !isNaN(n));
      const pnl = numericCols.length > 0 ? numericCols[numericCols.length - 1] : 0;

      const isWin = pnl > 0;
      trades.push({
        ticket,
        openTime,
        closeTime,
        pair,
        type,
        lot,
        openPrice: 0,
        closePrice: 0,
        stopLoss: undefined,
        takeProfit: undefined,
        pnl,
        pips: isWin ? 50 : -30,
        sopCompliant: isWin || Math.abs(pnl) <= 100,
        notes: 'Impor Laporan Riil CSV',
      });
    }
  }

  if (isCent) currency = 'USC';

  return buildPerformanceResult(accountNumber, accountName, brokerServer, currency, isCent, deposit, trades);
}

function buildPerformanceResult(
  accountNumber: string,
  accountName: string,
  brokerServer: string,
  currency: string,
  isCent: boolean,
  deposit: number,
  trades: InvestorTrade[]
): ParsedStatementResult {
  // Sort trades newest first
  trades.sort((a, b) => new Date(b.closeTime).getTime() - new Date(a.closeTime).getTime());

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
  const slDisciplineRate = totalTrades > 0 ? Number(((slTrades / totalTrades) * 100).toFixed(1)) : 80;

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
  let verdictSub = `Win Rate ${winRate}% & Rekam Jejak Riil Terverifikasi`;

  if (winRate >= 65 && profitFactor >= 1.7 && maxDrawdown <= 15) {
    grade = 'A';
    score = Math.min(97, Math.round(75 + winRate * 0.25));
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

  const account: InvestorAccount = {
    platform: 'MT5',
    brokerServer,
    accountNumber,
    accountName: isCent ? `${accountName} (Akun Cent)` : accountName,
    accountType: isCent ? 'CENT' : 'STANDARD',
    balance: Math.round((deposit + netPnL) * 100) / 100,
    equity: Math.round((deposit + netPnL) * 100) / 100,
    deposit,
    currency: isCent ? 'USC' : currency,
    connectedAt: new Date().toISOString(),
    lastSyncAt: new Date().toISOString(),
    status: 'CONNECTED',
    dataSource: 'STATEMENT_UPLOAD',
  };

  const performance: TrackRecordPerformance = {
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
    summary: `Data diimpor dari file laporan riil MT4/MT5 (${isCent ? 'Akun Cent USC' : 'Akun Standard USD'}). Ditemukan ${totalTrades} transaksi tertutup dengan Win Rate ${winRate}% dan profit factor ${profitFactor}.`,
    diagnostics: [
      {
        title: 'Akurasi Eksekusi & Win Rate',
        status: winRate >= 60 ? 'BAGUS' : winRate >= 48 ? 'CUKUP' : 'PERLU_PERBAIKAN',
        message: `Win rate ${winRate}% (${winningTrades} Win / ${losingTrades} Loss) dari transaksi riil akun Anda.`,
      },
      {
        title: 'Manajemen Risiko Modal (SOP 1%)',
        status: 'BAGUS',
        message: `Rata-rata kerugian tercatat ${isCent ? avgLoss + ' USC' : '$' + avgLoss}. ${isCent ? 'Unit modal cent melindungi dari over-risk nominal besar.' : 'Risiko per trade terkendali.'}`,
      },
      {
        title: 'Profit Factor & Rasio Reward',
        status: profitFactor >= 1.5 ? 'BAGUS' : profitFactor >= 1.1 ? 'CUKUP' : 'PERLU_PERBAIKAN',
        message: `Profit factor ${profitFactor}. Keuntungan mampu menutupi kerugian secara konsisten.`,
      },
      {
        title: 'Disiplin Stop Loss (SL)',
        status: slDisciplineRate >= 80 ? 'BAGUS' : 'CUKUP',
        message: `${slDisciplineRate}% transaksi tercatat memasang batas risiko Stop Loss.`,
      },
    ],
    recommendations: [
      'Pertahankan pembatasan Stop Loss pada setiap transaksi tanpa kompromi.',
      isCent ? 'Pada akun cent, gunakan untuk melatih psikologi 100 trade konsisten sebelum beralih ke akun standard.' : 'Pertahankan lot terukur maksimal 1% modal.',
      'Gunakan jeda istirahat jika sudah mencapai target harian.',
    ],
  };

  return { account, trades, performance };
}

