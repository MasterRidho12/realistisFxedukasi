/**
 * Trade calculations for PnL, Pips, and Risk-Reward ratio
 */

export interface PnLCalculationResult {
  pnl: number;
  pips: number;
  isProfit: boolean;
}

export function calculateTradePnL(
  pair: string,
  direction: 'BUY' | 'SELL',
  lot: number,
  entryPrice: number,
  exitPrice: number
): PnLCalculationResult {
  if (!entryPrice || !exitPrice || !lot) {
    return { pnl: 0, pips: 0, isProfit: false };
  }

  const isBuy = direction === 'BUY';
  const priceDiff = isBuy ? exitPrice - entryPrice : entryPrice - exitPrice;

  if (pair === 'XAUUSD') {
    // 1 standard lot = 100 oz
    // 1.00 move = 10 pips = $100 per 1.0 lot
    const pnl = priceDiff * lot * 100;
    const pips = Math.round(priceDiff * 10 * 10) / 10;
    return {
      pnl: Math.round(pnl * 100) / 100,
      pips,
      isProfit: pnl >= 0,
    };
  }

  if (pair === 'USDJPY') {
    // 1 pip = 0.01 JPY
    const pips = Math.round((priceDiff / 0.01) * 10) / 10;
    const rate = exitPrice > 0 ? exitPrice : 152.0;
    const pnl = (priceDiff / rate) * 100000 * lot;
    return {
      pnl: Math.round(pnl * 100) / 100,
      pips,
      isProfit: pnl >= 0,
    };
  }

  // Standard Forex (EURUSD, GBPUSD, etc.)
  // 1 standard lot = 100,000 units
  // 1 pip = 0.0001
  const pnl = priceDiff * lot * 100000;
  const pips = Math.round((priceDiff / 0.0001) * 10) / 10;
  return {
    pnl: Math.round(pnl * 100) / 100,
    pips,
    isProfit: pnl >= 0,
  };
}

export function calculateRiskRewardRatio(
  direction: 'BUY' | 'SELL',
  entryPrice: number,
  stopLoss?: number,
  takeProfit?: number
): string | null {
  if (!entryPrice || !stopLoss || !takeProfit) return null;

  const isBuy = direction === 'BUY';
  const risk = isBuy ? entryPrice - stopLoss : stopLoss - entryPrice;
  const reward = isBuy ? takeProfit - entryPrice : entryPrice - takeProfit;

  if (risk <= 0 || reward <= 0) return null;

  const ratio = (reward / risk).toFixed(1);
  return `1:${ratio}`;
}
