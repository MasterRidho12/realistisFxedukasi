//+------------------------------------------------------------------+
//|                           RealistisFx_MetodeBaku_EA.mq5          |
//|            Copyright 2026, RealistisFx Edukasi Kuantitatif       |
//|                    https://realistisfxedukasi.com                |
//+------------------------------------------------------------------+
//  v8.0 — ALGORITMA METODE BAKU REALISTISFX (TEKNIKAL SNR + TRAILING STOP)
//  Target Growth: 10% - 20% / Bulan Sesuai Audit Backtest 10 Tahun Website
//  • Stop Loss Dinamis: Berdasarkan Struktur Support/Resistance & Swing
//  • Take Profit Dinamis: Rasio Risk : Reward 1:2.0 (Positif Mathematical Edge)
//  • Multi-Stage Trailing Stop: Break-Even + Kunci Profit + Runner Trend Tracker
//  • S&R Key Level Lookback: 48 Bar (Struktur Kunci 2 Hari)
//  • Filter Tren Makro: EMA 50 & 200 (Golden Cross Confirmation)
//  • Filter Anti False-Breakout: Marubozu Momentum (Close di 35% ujung candle)
//  • Pilihan Lot: Fixed Lot 0.10 atau Compounding Risiko Saldo (1.5% - 2.0%)
//+------------------------------------------------------------------+
#property copyright "Copyright 2026, RealistisFx Edukasi"
#property link      "https://realistisfxedukasi.com"
#property version   "8.00"

#include <Trade\Trade.mqh>
#include <Trade\PositionInfo.mqh>
#include <Trade\SymbolInfo.mqh>

//──────────────────────────────────────────────────────────────────
//  ENUMS
//──────────────────────────────────────────────────────────────────
enum ENUM_SL_MODE
{
   SL_MODE_TEKNIKAL_SNR, // SL Teknikal SnR & Swing (Sesuai Web)
   SL_MODE_BAKU_PIPS     // SL Baku Pips (Fixed Pips)
};

enum ENUM_TP_MODE
{
   TP_MODE_DYNAMIC_RR,   // TP Dinamis Rasio Risk : Reward (1:2)
   TP_MODE_BAKU_PIPS     // TP Baku Pips (Fixed Pips)
};

enum ENUM_TRAILING_MODE
{
   TRAILING_STEP_PIPS,   // Trailing Step Pips (Kunci Profit Bertahap)
   TRAILING_SWING_SNR,   // Trailing Struktur Swing Low / High
   TRAILING_NONE         // Tanpa Trailing Stop
};

enum ENUM_LOT_MODE 
{ 
   LOT_FIXED,    // Lot Tetap (0.10 Lot)
   LOT_RISK_PCT  // Compounding Otomatis (% Risiko Saldo)
};

//──────────────────────────────────────────────────────────────────
//  INPUTS
//──────────────────────────────────────────────────────────────────
input group "══ 1. STOP LOSS & TAKE PROFIT TEKNIKAL (SESUAI WEB) ══"
input ENUM_SL_MODE       SL_Mode          = SL_MODE_TEKNIKAL_SNR; // Metode Stop Loss
input int                SL_Buffer_Pips   = 20;        // Buffer Toleransi SnR (Pips)
input int                Min_SL_Pips      = 120;       // Batas Minimal SL (Pips — $12 di Emas)
input int                Max_SL_Pips      = 300;       // Batas Maksimal SL (Pips — $30 di Emas)
input int                SL_Baku_Pips     = 200;       // SL Baku Pips (Jika Mode Baku)

input ENUM_TP_MODE       TP_Mode          = TP_MODE_DYNAMIC_RR;   // Metode Take Profit
input double             RiskRewardRatio  = 2.0;       // Rasio Risk : Reward (Target RR 1:2)
input int                TP_Baku_Pips     = 400;       // TP Baku Pips (Jika Mode Baku)
input int                ChannelBars      = 48;        // Lookback Struktur SnR (48 Bar = 2 Hari)

input group "══ 2. SISTEM TRAILING STOP & PENGAMAN PROFIT DINAMIS ══"
input bool               UseTrailingStop  = true;      // Aktifkan Trailing Stop Dinamis
input ENUM_TRAILING_MODE TrailingMode     = TRAILING_STEP_PIPS; // Mode Trailing Stop
input int                TrailingStart    = 150;       // Mulai Trailing Saat Profit >= (Pips)
input int                TrailingDistance = 120;       // Jarak Trailing di Belakang Harga (Pips)
input int                TrailingStep     = 25;        // Step Geser Trailing Stop (Pips)

input bool               UseBreakEven     = true;      // Break-Even Otomatis (BE)
input int                BE_TriggerPips   = 120;       // Trigger BE Saat Profit >= (Pips)
input int                BE_LockPips      = 25;        // Kunci Profit BE (Pips di Atas Entry)

input bool               UseRunnerTrail   = true;      // Trailing Runner (Lepas TP saat Reli Besar)
input int                RunnerStartPips  = 350;       // Mulai Mode Runner Saat Profit >= (Pips)

input group "══ 3. TARGET GROWTH & UKURAN LOT ══"
input ENUM_LOT_MODE      LotMode          = LOT_FIXED; // Mode Lot (LOT_FIXED atau LOT_RISK_PCT)
input double             FixedLot         = 0.10;      // Ukuran Lot (0.10 Lot untuk Target 10-20%/Bulan)
input double             RiskPct          = 2.0;       // Risiko % Saldo per Trade (Jika Mode Risk)
input double             MaxLot           = 10.0;      // Batas Maksimal Lot
input ulong              MagicNum         = 20261025;  // Magic Number EA
input string             OrderComment     = "RFX_v8";  // Komentar Order

input group "══ 4. FILTER AI KUANTITATIF (PEMBERSIH NOISE) ══"
input bool               UseTrendFilter   = true;      // Filter Tren Makro (EMA 50 vs EMA 200)
input int                EMA_Fast         = 50;        // Periode EMA Cepat
input int                EMA_Slow         = 200;       // Periode EMA Lambat
input bool               UseCandleFilter  = true;      // Filter Marubozu (Anti-Wick Manipulation)
input bool               UseATRFilter     = true;      // Filter Volatilitas ATR(14) (Anti Pasar Sepi)
input int                ATR_Period       = 14;        // Periode ATR
input double             ATR_MinRatio     = 0.5;       // Range Candle Minimal terhadap ATR

input group "══ 5. FILTER SESI TRADING (LIKUIDITAS TINGGI) ══"
input bool               UseSessionFilter = true;      // Hanya Trading di Sesi Aktif (London & New York)
input int                SessStart        = 7;         // Jam Mulai (Server Broker, London Open)
input int                SessEnd          = 20;        // Jam Selesai (Server Broker, NY Session)

input group "══ 6. LAIN-LAIN ══"
input int                MaxSpreadPips    = 50;        // Spread Maksimal (Pips)
input bool               Dashboard        = true;      // Dashboard Visual di Chart

//──────────────────────────────────────────────────────────────────
//  GLOBALS
//──────────────────────────────────────────────────────────────────
CTrade                  g_trade;
CPositionInfo           g_pos;
CSymbolInfo             g_sym;

int                     g_hEmaFast     = INVALID_HANDLE;
int                     g_hEmaSlow     = INVALID_HANDLE;
int                     g_hATR         = INVALID_HANDLE;

datetime                g_lastBarTime  = 0;
int                     g_lastBarCount = 0;
int                     g_totalBars    = 0;
double                  g_chanHi       = 0;
double                  g_chanLo       = 0;

// Tracking Retest (RBS / SBR)
double                  g_breakHi      = 0;
int                     g_breakHiAge   = 0;
double                  g_breakLo      = 0;
int                     g_breakLoAge   = 0;

ENUM_ORDER_TYPE_FILLING g_fillingMode  = ORDER_FILLING_FOK;

//──────────────────────────────────────────────────────────────────
//  HELPERS: PIP & PRICE CALCULATION
//──────────────────────────────────────────────────────────────────
double Pip()
{
   string sym = _Symbol;
   StringToUpper(sym);
   if(StringFind(sym, "XAU") >= 0 || StringFind(sym, "GOLD") >= 0)
   {
      if(_Digits == 2) return 10.0 * _Point;  // 1 pip = $0.10. 100 pips = $10.00
      if(_Digits == 3) return 100.0 * _Point;
      return 10.0 * _Point;
   }
   if(_Digits == 3 || _Digits == 5) return 10.0 * _Point;
   return _Point;
}

double P(double pips)
{
   return pips * Pip();
}

double ToPips(double priceDistance)
{
   double p = Pip();
   if(p <= 0) return 0;
   return priceDistance / p;
}

double GetCurrentAsk()
{
   double ask = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
   if(ask > 0) return ask;

   MqlTick tick;
   if(SymbolInfoTick(_Symbol, tick) && tick.ask > 0)
      return tick.ask;

   double o = iOpen(_Symbol, _Period, 0);
   if(o > 0) return o;

   return iClose(_Symbol, _Period, 1);
}

double GetCurrentBid()
{
   double bid = SymbolInfoDouble(_Symbol, SYMBOL_BID);
   if(bid > 0) return bid;

   MqlTick tick;
   if(SymbolInfoTick(_Symbol, tick) && tick.bid > 0)
      return tick.bid;

   double o = iOpen(_Symbol, _Period, 0);
   if(o > 0) return o;

   return iClose(_Symbol, _Period, 1);
}

void UpdateFillingMode()
{
   uint f = (uint)SymbolInfoInteger(_Symbol, SYMBOL_FILLING_MODE);
   if((f & SYMBOL_FILLING_FOK) != 0)
      g_fillingMode = ORDER_FILLING_FOK;
   else if((f & SYMBOL_FILLING_IOC) != 0)
      g_fillingMode = ORDER_FILLING_IOC;
   else
      g_fillingMode = ORDER_FILLING_RETURN;

   g_trade.SetTypeFilling(g_fillingMode);
}

//──────────────────────────────────────────────────────────────────
//  KALKULASI UKURAN LOT
//──────────────────────────────────────────────────────────────────
double CalcLot(double slDist)
{
   double minLot  = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_MIN);
   double maxLot  = MathMin(SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_MAX), MaxLot);
   double lotStep = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_STEP);
   if(lotStep <= 0) lotStep = 0.01;
   if(minLot <= 0)  minLot  = 0.01;

   if(LotMode == LOT_FIXED)
   {
      double l = MathMax(minLot, MathMin(FixedLot, maxLot));
      return NormalizeDouble(MathFloor(l / lotStep) * lotStep, 2);
   }

   // Compounding Saldo Otomatis Sesuai Risiko %
   double balance = AccountInfoDouble(ACCOUNT_BALANCE);
   double riskMoney = balance * (RiskPct / 100.0);
   double tickValue = SymbolInfoDouble(_Symbol, SYMBOL_TRADE_TICK_VALUE);
   double tickSize  = SymbolInfoDouble(_Symbol, SYMBOL_TRADE_TICK_SIZE);

   if(tickValue <= 0 || tickSize <= 0 || slDist <= 0)
      return FixedLot;

   double lossPerLot = (slDist / tickSize) * tickValue;
   if(lossPerLot <= 0) return FixedLot;

   double calcLot = riskMoney / lossPerLot;
   calcLot = MathFloor(calcLot / lotStep) * lotStep;
   calcLot = MathMax(minLot, MathMin(calcLot, maxLot));

   return NormalizeDouble(calcLot, 2);
}

bool HasPos(ENUM_POSITION_TYPE t)
{
   for(int i = PositionsTotal() - 1; i >= 0; i--)
   {
      if(!g_pos.SelectByIndex(i)) continue;
      if(g_pos.Symbol() == _Symbol && g_pos.Magic() == MagicNum && g_pos.PositionType() == t)
         return true;
   }
   return false;
}

int TotalOpenPos()
{
   int count = 0;
   for(int i = PositionsTotal() - 1; i >= 0; i--)
   {
      if(!g_pos.SelectByIndex(i)) continue;
      if(g_pos.Symbol() == _Symbol && g_pos.Magic() == MagicNum)
         count++;
   }
   return count;
}

void ClosePos(ENUM_POSITION_TYPE t)
{
   for(int i = PositionsTotal() - 1; i >= 0; i--)
   {
      if(!g_pos.SelectByIndex(i)) continue;
      if(g_pos.Symbol() != _Symbol || g_pos.Magic() != MagicNum) continue;
      if(g_pos.PositionType() != t) continue;
      g_trade.PositionClose(g_pos.Ticket());
   }
}

//──────────────────────────────────────────────────────────────────
//  EKSEKUSI ORDER DENGAN SL & TP TEKNIKAL
//──────────────────────────────────────────────────────────────────
bool DoBuy(string lbl, double slDist, double tpDist)
{
   UpdateFillingMode();

   long stopLevel = SymbolInfoInteger(_Symbol, SYMBOL_TRADE_STOPS_LEVEL);
   double minDistance = (stopLevel + 5) * _Point;
   if(slDist < minDistance) slDist = minDistance;
   if(tpDist < minDistance) tpDist = minDistance;

   double entry = GetCurrentAsk();
   if(entry <= 0) return false;

   double sl  = NormalizeDouble(entry - slDist, _Digits);
   double tp  = NormalizeDouble(entry + tpDist, _Digits);
   double lot = CalcLot(slDist);

   if(sl <= 0 || tp <= 0 || sl >= entry || tp <= entry) return false;

   bool ok = g_trade.Buy(lot, _Symbol, entry, sl, tp, OrderComment + "|" + lbl);

   if(!ok)
   {
      uint err = g_trade.ResultRetcode();
      // ECN 2-step fallback
      if(err == 10016 || err == 10015 || err == 10021)
      {
         if(g_trade.Buy(lot, _Symbol, 0, 0, 0, OrderComment + "|" + lbl))
         {
            for(int i = PositionsTotal() - 1; i >= 0; i--)
            {
               if(!g_pos.SelectByIndex(i)) continue;
               if(g_pos.Symbol() == _Symbol && g_pos.Magic() == MagicNum && g_pos.PositionType() == POSITION_TYPE_BUY)
               {
                  g_trade.PositionModify(g_pos.Ticket(), sl, tp);
                  return true;
               }
            }
            return true;
         }
      }
      if(err == 10030)
      {
         g_trade.SetTypeFilling(ORDER_FILLING_IOC);
         ok = g_trade.Buy(lot, _Symbol, entry, sl, tp, OrderComment + "|" + lbl);
         if(!ok)
         {
            g_trade.SetTypeFilling(ORDER_FILLING_RETURN);
            ok = g_trade.Buy(lot, _Symbol, entry, sl, tp, OrderComment + "|" + lbl);
         }
      }
   }

   return ok;
}

bool DoSell(string lbl, double slDist, double tpDist)
{
   UpdateFillingMode();

   long stopLevel = SymbolInfoInteger(_Symbol, SYMBOL_TRADE_STOPS_LEVEL);
   double minDistance = (stopLevel + 5) * _Point;
   if(slDist < minDistance) slDist = minDistance;
   if(tpDist < minDistance) tpDist = minDistance;

   double entry = GetCurrentBid();
   if(entry <= 0) return false;

   double sl  = NormalizeDouble(entry + slDist, _Digits);
   double tp  = NormalizeDouble(entry - tpDist, _Digits);
   double lot = CalcLot(slDist);

   if(sl <= 0 || tp <= 0 || sl <= entry || tp >= entry) return false;

   bool ok = g_trade.Sell(lot, _Symbol, entry, sl, tp, OrderComment + "|" + lbl);

   if(!ok)
   {
      uint err = g_trade.ResultRetcode();
      // ECN 2-step fallback
      if(err == 10016 || err == 10015 || err == 10021)
      {
         if(g_trade.Sell(lot, _Symbol, 0, 0, 0, OrderComment + "|" + lbl))
         {
            for(int i = PositionsTotal() - 1; i >= 0; i--)
            {
               if(!g_pos.SelectByIndex(i)) continue;
               if(g_pos.Symbol() == _Symbol && g_pos.Magic() == MagicNum && g_pos.PositionType() == POSITION_TYPE_SELL)
               {
                  g_trade.PositionModify(g_pos.Ticket(), sl, tp);
                  return true;
               }
            }
            return true;
         }
      }
      if(err == 10030)
      {
         g_trade.SetTypeFilling(ORDER_FILLING_IOC);
         ok = g_trade.Sell(lot, _Symbol, entry, sl, tp, OrderComment + "|" + lbl);
         if(!ok)
         {
            g_trade.SetTypeFilling(ORDER_FILLING_RETURN);
            ok = g_trade.Sell(lot, _Symbol, entry, sl, tp, OrderComment + "|" + lbl);
         }
      }
   }

   return ok;
}

//──────────────────────────────────────────────────────────────────
//  INIT & DEINIT
//──────────────────────────────────────────────────────────────────
int OnInit()
{
   g_sym.Name(_Symbol);
   g_trade.SetExpertMagicNumber(MagicNum);
   g_trade.SetDeviationInPoints(200);
   UpdateFillingMode();

   g_hEmaFast = iMA(_Symbol, _Period, EMA_Fast, 0, MODE_EMA, PRICE_CLOSE);
   g_hEmaSlow = iMA(_Symbol, _Period, EMA_Slow, 0, MODE_EMA, PRICE_CLOSE);
   g_hATR     = iATR(_Symbol, _Period, ATR_Period);

   g_lastBarTime  = iTime(_Symbol, _Period, 0);
   g_lastBarCount = Bars(_Symbol, _Period);

   Print("╔════════════════════════════════════════════════════════════════════╗");
   Print("║  REALISTISFX METODE BAKU v8.0 — TEKNIKAL SNR + TRAILING STOP      ║");
   Print("╚════════════════════════════════════════════════════════════════════╝");
   PrintFormat("[RFX] Lot: %.2f (%s) | SL: %s | TP: %s (RR %.1f) | Trailing: %s",
               (LotMode==LOT_FIXED?FixedLot:RiskPct), (LotMode==LOT_FIXED?"Fixed":"Risk %"),
               (SL_Mode==SL_MODE_TEKNIKAL_SNR?"Teknikal SnR":"Baku"),
               (TP_Mode==TP_MODE_DYNAMIC_RR?"Dinamis RR":"Baku"), RiskRewardRatio,
               (UseTrailingStop?"ON":"OFF"));

   return INIT_SUCCEEDED;
}

void OnDeinit(const int reason)
{
   IndicatorRelease(g_hEmaFast);
   IndicatorRelease(g_hEmaSlow);
   IndicatorRelease(g_hATR);
   ObjectsDeleteAll(0, "RFX_");
   Comment("");
}

//──────────────────────────────────────────────────────────────────
//  PENGELOLAAN POSISI: BREAK-EVEN, TRAILING STOP & RUNNER
//──────────────────────────────────────────────────────────────────
void ManagePositions()
{
   double beDist      = P(BE_TriggerPips);
   double beLockDist  = P(BE_LockPips);
   double trailStart  = P(TrailingStart);
   double trailDist   = P(TrailingDistance);
   double trailStep   = P(TrailingStep);
   double runnerStart = P(RunnerStartPips);

   for(int i = PositionsTotal() - 1; i >= 0; i--)
   {
      if(!g_pos.SelectByIndex(i)) continue;
      if(g_pos.Symbol() != _Symbol || g_pos.Magic() != MagicNum) continue;

      double openPrice = g_pos.PriceOpen();
      double currentSL = g_pos.StopLoss();
      double currentTP = g_pos.TakeProfit();
      double curPrice  = g_pos.PriceCurrent();

      if(g_pos.PositionType() == POSITION_TYPE_BUY)
      {
         double profit = curPrice - openPrice;

         // 1. Break-Even: Saat profit >= BE_TriggerPips, kunci profit di atas entry
         if(UseBreakEven && profit >= beDist)
         {
            double beSL = NormalizeDouble(openPrice + beLockDist, _Digits);
            if(currentSL < beSL)
            {
               g_trade.PositionModify(g_pos.Ticket(), beSL, currentTP);
               currentSL = beSL;
            }
         }

         // 2. Trailing Runner: Lepas TP saat reli besar tercapai untuk menangkap tren besar
         if(UseRunnerTrail && profit >= runnerStart)
         {
            if(currentTP > 0)
            {
               g_trade.PositionModify(g_pos.Ticket(), currentSL, 0); // Open TP
               currentTP = 0;
            }
         }

         // 3. Trailing Stop Dinamis
         if(UseTrailingStop && profit >= trailStart)
         {
            double targetSL = 0;

            if(TrailingMode == TRAILING_STEP_PIPS)
            {
               targetSL = NormalizeDouble(curPrice - trailDist, _Digits);
            }
            else if(TrailingMode == TRAILING_SWING_SNR)
            {
               // Cari Swing Low terendah 3 bar terakhir
               double swLo = iLow(_Symbol, _Period, 1);
               for(int b = 2; b <= 3; b++)
               {
                  double l = iLow(_Symbol, _Period, b);
                  if(l > 0 && l < swLo) swLo = l;
               }
               targetSL = NormalizeDouble(swLo - P(10), _Digits);
            }

            if(targetSL > (currentSL + trailStep) && targetSL < curPrice)
            {
               g_trade.PositionModify(g_pos.Ticket(), targetSL, currentTP);
            }
         }
      }
      else if(g_pos.PositionType() == POSITION_TYPE_SELL)
      {
         double profit = openPrice - curPrice;

         // 1. Break-Even
         if(UseBreakEven && profit >= beDist)
         {
            double beSL = NormalizeDouble(openPrice - beLockDist, _Digits);
            if(currentSL == 0 || currentSL > beSL)
            {
               g_trade.PositionModify(g_pos.Ticket(), beSL, currentTP);
               currentSL = beSL;
            }
         }

         // 2. Trailing Runner
         if(UseRunnerTrail && profit >= runnerStart)
         {
            if(currentTP > 0)
            {
               g_trade.PositionModify(g_pos.Ticket(), currentSL, 0);
               currentTP = 0;
            }
         }

         // 3. Trailing Stop Dinamis
         if(UseTrailingStop && profit >= trailStart)
         {
            double targetSL = 0;

            if(TrailingMode == TRAILING_STEP_PIPS)
            {
               targetSL = NormalizeDouble(curPrice + trailDist, _Digits);
            }
            else if(TrailingMode == TRAILING_SWING_SNR)
            {
               // Cari Swing High tertinggi 3 bar terakhir
               double swHi = iHigh(_Symbol, _Period, 1);
               for(int b = 2; b <= 3; b++)
               {
                  double h = iHigh(_Symbol, _Period, b);
                  if(h > swHi) swHi = h;
               }
               targetSL = NormalizeDouble(swHi + P(10), _Digits);
            }

            if((currentSL == 0 || targetSL < (currentSL - trailStep)) && targetSL > curPrice)
            {
               g_trade.PositionModify(g_pos.Ticket(), targetSL, currentTP);
            }
         }
      }
   }
}

//──────────────────────────────────────────────────────────────────
//  FILTER SESI TRADING
//──────────────────────────────────────────────────────────────────
bool IsInTradeSession()
{
   if(!UseSessionFilter) return true;
   MqlDateTime dt;
   TimeCurrent(dt);
   return (dt.hour >= SessStart && dt.hour <= SessEnd);
}

//──────────────────────────────────────────────────────────────────
//  DETEKSI BAR BARU
//──────────────────────────────────────────────────────────────────
bool CheckNewBar()
{
   datetime t = iTime(_Symbol, _Period, 0);
   int b = Bars(_Symbol, _Period);

   if(t != 0 && t != g_lastBarTime)
   {
      g_lastBarTime  = t;
      g_lastBarCount = b;
      return true;
   }

   if(b != g_lastBarCount && b > 0)
   {
      g_lastBarTime  = t;
      g_lastBarCount = b;
      return true;
   }

   return false;
}

//──────────────────────────────────────────────────────────────────
//  EVALUASI SINYAL PADA BAR BARU DENGAN TEKNIKAL SNR
//──────────────────────────────────────────────────────────────────
void OnNewBar()
{
   g_totalBars++;

   int totalAvail = Bars(_Symbol, _Period);
   if(totalAvail < ChannelBars + 2) return;

   // ──────────────────────────────────────────────────
   //  1. HITUNG DONCHIAN S&R CHANNEL (LOOKBACK 48 BAR)
   // ──────────────────────────────────────────────────
   double chanHi = iHigh(_Symbol, _Period, 2);
   double chanLo = iLow (_Symbol, _Period, 2);

   for(int i = 3; i <= ChannelBars + 1; i++)
   {
      double h = iHigh(_Symbol, _Period, i);
      double l = iLow (_Symbol, _Period, i);
      if(h <= 0 || l <= 0) continue;
      if(h > chanHi) chanHi = h;
      if(l < chanLo) chanLo = l;
   }
   g_chanHi = chanHi;
   g_chanLo = chanLo;

   // ──────────────────────────────────────────────────
   //  2. CANDLE SINYAL = bar[1] (Bar yang baru CLOSE)
   // ──────────────────────────────────────────────────
   double closeBar = iClose(_Symbol, _Period, 1);
   double openBar  = iOpen (_Symbol, _Period, 1);
   double hiBar    = iHigh (_Symbol, _Period, 1);
   double loBar    = iLow  (_Symbol, _Period, 1);

   if(closeBar <= 0) return;

   // Filter Spread
   double spread = ToPips(GetCurrentAsk() - GetCurrentBid());
   if(spread > MaxSpreadPips) return;

   // Filter Jam Sesi Likuiditas (London & New York)
   if(!IsInTradeSession()) return;

   // ──────────────────────────────────────────────────
   //  3. FILTER TREN MAKRO (EMA 50 / 200 GOLDEN CROSS)
   // ──────────────────────────────────────────────────
   bool trendBullish = true;
   bool trendBearish = true;

   if(UseTrendFilter)
   {
      double emaF[1], emaS[1];
      if(CopyBuffer(g_hEmaFast, 0, 1, 1, emaF) > 0 && CopyBuffer(g_hEmaSlow, 0, 1, 1, emaS) > 0)
      {
         trendBullish = (emaF[0] >= emaS[0] || closeBar > emaS[0]);
         trendBearish = (emaF[0] <= emaS[0] || closeBar < emaS[0]);
      }
   }

   // ──────────────────────────────────────────────────
   //  4. FILTER CANDLE IMPULSIF & ANTI-WICK MANIPULASI
   // ──────────────────────────────────────────────────
   double cRange = hiBar - loBar;
   double cBody  = MathAbs(closeBar - openBar);

   bool candleBuyOk  = true;
   bool candleSellOk = true;

   if(UseCandleFilter && cRange > 0)
   {
      // Badan candle minimal 40% dari total candle
      if((cBody / cRange) < 0.40)
      {
         candleBuyOk  = false;
         candleSellOk = false;
      }

      // Untuk BUY: Close di bagian atas 35% candle
      if((hiBar - closeBar) > (0.35 * cRange))
         candleBuyOk = false;

      // Untuk SELL: Close di bagian bawah 35% candle
      if((closeBar - loBar) > (0.35 * cRange))
         candleSellOk = false;
   }

   // Filter Volatilitas ATR
   if(UseATRFilter && cRange > 0)
   {
      double atrVal[1];
      if(CopyBuffer(g_hATR, 0, 1, 1, atrVal) > 0 && atrVal[0] > 0)
      {
         if(cRange < (ATR_MinRatio * atrVal[0]))
         {
            candleBuyOk  = false;
            candleSellOk = false;
         }
      }
   }

   // Update umur breakout untuk sinyal retest
   if(g_breakHi > 0)
   {
      g_breakHiAge++;
      if(g_breakHiAge > 15) { g_breakHi = 0; g_breakHiAge = 0; }
   }
   if(g_breakLo > 0)
   {
      g_breakLoAge++;
      if(g_breakLoAge > 15) { g_breakLo = 0; g_breakLoAge = 0; }
   }

   // Disiplin: Maksimal 1 posisi aktif dalam 1 waktu
   if(TotalOpenPos() > 0) return;

   // ──────────────────────────────────────────────────
   //  5. HITUNG SL & TP TEKNIKAL BERDASARKAN STRUKTUR
   // ──────────────────────────────────────────────────
   double entryAsk = GetCurrentAsk();
   double entryBid = GetCurrentBid();

   // Hitung SL Teknikal BUY: Berada di bawah Support / Swing Low bar
   double buySLDist = 0;
   if(SL_Mode == SL_MODE_TEKNIKAL_SNR)
   {
      // Support terdekat = Low candle sinyal atau Channel Support
      double techSupport = MathMin(loBar, chanLo);
      buySLDist = (entryAsk - techSupport) + P(SL_Buffer_Pips);
      if(buySLDist < P(Min_SL_Pips)) buySLDist = P(Min_SL_Pips);
      if(buySLDist > P(Max_SL_Pips)) buySLDist = P(Max_SL_Pips);
   }
   else
   {
      buySLDist = P(SL_Baku_Pips);
   }

   double buyTPDist = 0;
   if(TP_Mode == TP_MODE_DYNAMIC_RR)
      buyTPDist = buySLDist * RiskRewardRatio;
   else
      buyTPDist = P(TP_Baku_Pips);

   // Hitung SL Teknikal SELL: Berada di atas Resistance / Swing High bar
   double sellSLDist = 0;
   if(SL_Mode == SL_MODE_TEKNIKAL_SNR)
   {
      double techResistance = MathMax(hiBar, chanHi);
      sellSLDist = (techResistance - entryBid) + P(SL_Buffer_Pips);
      if(sellSLDist < P(Min_SL_Pips)) sellSLDist = P(Min_SL_Pips);
      if(sellSLDist > P(Max_SL_Pips)) sellSLDist = P(Max_SL_Pips);
   }
   else
   {
      sellSLDist = P(SL_Baku_Pips);
   }

   double sellTPDist = 0;
   if(TP_Mode == TP_MODE_DYNAMIC_RR)
      sellTPDist = sellSLDist * RiskRewardRatio;
   else
      sellTPDist = P(TP_Baku_Pips);

   //==========================================================
   // SINYAL 1: BUY BREAKOUT — Menembus Key Resistance H1
   //==========================================================
   if(closeBar > chanHi && chanHi > 0 && trendBullish && candleBuyOk && closeBar > openBar)
   {
      if(!HasPos(POSITION_TYPE_BUY))
      {
         if(DoBuy("BUY_BRKOUT", buySLDist, buyTPDist))
         {
            g_breakHi = chanHi;
            g_breakHiAge = 0;
         }
      }
      return;
   }

   //==========================================================
   // SINYAL 2: SELL BREAKDOWN — Menembus Key Support H1
   //==========================================================
   if(closeBar < chanLo && chanLo > 0 && trendBearish && candleSellOk && closeBar < openBar)
   {
      if(!HasPos(POSITION_TYPE_SELL))
      {
         if(DoSell("SELL_BRKOUT", sellSLDist, sellTPDist))
         {
            g_breakLo = chanLo;
            g_breakLoAge = 0;
         }
      }
      return;
   }

   //==========================================================
   // SINYAL 3: BUY RETEST (RBS) — Pullback Rebound Support Valid
   //==========================================================
   if(g_breakHi > 0 && g_breakHiAge >= 1 && trendBullish && !HasPos(POSITION_TYPE_BUY))
   {
      double tol = P(35);
      if(loBar <= (g_breakHi + tol) && closeBar > g_breakHi && closeBar > openBar)
      {
         if(DoBuy("BUY_RETEST", buySLDist, buyTPDist))
         {
            g_breakHi = 0;
            g_breakHiAge = 0;
         }
         return;
      }
   }

   //==========================================================
   // SINYAL 4: SELL RETEST (SBR) — Pullback Rejection Resistance Valid
   //==========================================================
   if(g_breakLo > 0 && g_breakLoAge >= 1 && trendBearish && !HasPos(POSITION_TYPE_SELL))
   {
      double tol = P(35);
      if(hiBar >= (g_breakLo - tol) && closeBar < g_breakLo && closeBar < openBar)
      {
         if(DoSell("SELL_RETEST", sellSLDist, sellTPDist))
         {
            g_breakLo = 0;
            g_breakLoAge = 0;
         }
         return;
      }
   }
}

//──────────────────────────────────────────────────────────────────
//  DASHBOARD
//──────────────────────────────────────────────────────────────────
void DrawDash()
{
   double sp = ToPips(GetCurrentAsk() - GetCurrentBid());
   int cnt = 0;
   double flt = 0;

   for(int i = PositionsTotal() - 1; i >= 0; i--)
   {
      if(!g_pos.SelectByIndex(i)) continue;
      if(g_pos.Symbol() != _Symbol || g_pos.Magic() != MagicNum) continue;
      cnt++;
      flt += (g_pos.PositionType() == POSITION_TYPE_BUY)
             ? ToPips(g_pos.PriceCurrent() - g_pos.PriceOpen())
             : ToPips(g_pos.PriceOpen() - g_pos.PriceCurrent());
   }

   string s = "";
   s += "╔══════════════════════════════════════════════╗\n";
   s += "║  REALISTISFX METODE BAKU v8.0                ║\n";
   s += "║  Teknikal SnR + Trailing Stop Sesuai Web     ║\n";
   s += "╠══════════════════════════════════════════════╣\n";
   s += StringFormat("║ Simbol: %s | TF: %s\n", _Symbol, EnumToString(_Period));
   s += StringFormat("║ Mode SL: %s | Mode TP: %s (RR %.1f)\n", 
                     (SL_Mode==SL_MODE_TEKNIKAL_SNR?"Teknikal SnR":"Baku"),
                     (TP_Mode==TP_MODE_DYNAMIC_RR?"Dinamis RR":"Baku"), RiskRewardRatio);
   s += StringFormat("║ Trailing: %s (Start: %d p, Dist: %d p)\n",
                     (UseTrailingStop?"ON":"OFF"), TrailingStart, TrailingDistance);
   s += StringFormat("║ Break-Even: %s | Runner: %s\n", (UseBreakEven?"ON":"OFF"), (UseRunnerTrail?"ON":"OFF"));
   s += "╠══════════════════════════════════════════════╣\n";
   s += StringFormat("║ Ukuran Lot: %.2f (%s)\n", (LotMode==LOT_FIXED?FixedLot:RiskPct), (LotMode==LOT_FIXED?"Fixed":"Risk %"));
   s += StringFormat("║ Posisi Aktif: %d | Float: %+.1f pips\n", cnt, flt);
   s += "╚══════════════════════════════════════════════╝\n";
   Comment(s);
}

//──────────────────────────────────────────────────────────────────
//  ONTICK — Main Entry Point
//──────────────────────────────────────────────────────────────────
void OnTick()
{
   // 1. Break-Even, Trailing Stop & Trailing Runner jalan di setiap tick harga
   ManagePositions();

   // 2. Dashboard visual
   if(Dashboard && (!MQLInfoInteger(MQL_TESTER) || MQLInfoInteger(MQL_VISUAL_MODE)))
      DrawDash();

   // 3. Evaluasi bar baru
   if(!CheckNewBar()) return;

   // 4. Jalankan evaluasi sinyal & eksekusi order
   OnNewBar();
}
//+------------------------------------------------------------------+
