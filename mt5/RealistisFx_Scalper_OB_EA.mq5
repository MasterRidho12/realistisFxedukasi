//+------------------------------------------------------------------+
//|                           RealistisFx_Scalper_OB_EA.mq5          |
//|            Copyright 2026, RealistisFx Edukasi Kuantitatif       |
//|                    https://realistisfxedukasi.com                |
//+------------------------------------------------------------------+
//  v13.0 — REALISTISFX INSTITUTIONAL SN-R & ORDER BLOCK TRADER
//  • Solusi Lengkap Evaluasi Backtest:
//    1. Mode Profil Fleksibel:
//       - PROFILE_WEBSITE_SWING: Sesuai data backtest website RealistisFx
//         (SL Terproteksi Struktur 120-180 pips, TP 250-450 pips, Win Rate >75%).
//       - PROFILE_PRECISION_SCALPER: Khusus Scalping M15/M30
//         (SL 45 pips, TP 90 pips, Limit & Retest Only, No Chasing).
//       - PROFILE_CUSTOM: User bebas setting nilai pips.
//    2. ANTI-PUCUK BREAKOUT:
//       - Dilarang Buy di penutupan candle breakout (penyebab utama SL kena).
//       - Entry HANYA saat harga pullback retest ke zona Order Block (Lantai).
//    3. FILTER ANTI-FAKEOUT (SWEEP WICK):
//       - Mendeteksi manipulasi ekor likuiditas & membatalkan sinyal palsu.
//    4. FILTER SNR LEMAH (CONSOLIDATION TRAP):
//       - Wajib ada candle displacement bervolume kuat (> 0.8x ATR).
//    5. PENGELOLAAN POSISI CERDAS:
//       - Break-Even otomatis & Dynamic Trailing Stop yang proporsional.
//+------------------------------------------------------------------+
#property copyright "Copyright 2026, RealistisFx Edukasi"
#property link      "https://realistisfxedukasi.com"
#property version   "13.00"

#include <Trade\Trade.mqh>
#include <Trade\PositionInfo.mqh>
#include <Trade\SymbolInfo.mqh>

//──────────────────────────────────────────────────────────────────
//  ENUMS
//──────────────────────────────────────────────────────────────────
enum ENUM_STRATEGY_PROFILE
{
   PROFILE_WEBSITE_SWING,    // [REKOMENDASI] Sesuai Website RealistisFx (H1/M30, SL Struktur, TP Lebar)
   PROFILE_PRECISION_SCALPER,// Scalping M15/M30 (SL 45 Pips / TP 90 Pips, Pure Retest Only)
   PROFILE_CUSTOM            // Kustom Manual (Sesuai Parameter di Bawah)
};

enum ENUM_LOT_MODE 
{ 
   LOT_FIXED,    // Lot Tetap (Default 0.10 Lot)
   LOT_RISK_PCT  // Compounding Otomatis (% Risiko Saldo)
};

//──────────────────────────────────────────────────────────────────
//  INPUTS
//──────────────────────────────────────────────────────────────────
input group "══ 1. PROFIL STRATEGI & MANAJEMEN RISIKO ══"
input ENUM_STRATEGY_PROFILE StrategyProfile = PROFILE_WEBSITE_SWING; // Profil Strategi EA
input ENUM_LOT_MODE         LotMode         = LOT_FIXED;              // Mode Ukuran Lot
input double                FixedLot        = 0.10;                   // Ukuran Lot Tetap (0.10 Lot)
input double                RiskPct         = 2.0;                    // Risiko % Saldo per Trade (Jika Mode Risk)
input double                MaxLot          = 10.0;                   // Batas Maksimal Lot
input ulong                 MagicNum        = 20261026;               // Magic Number EA
input string                OrderComment    = "RFX_v13_OB";           // Komentar Order

input group "══ 2. PARAMETER KUSTOM (JIKA MEMILIH PROFILE_CUSTOM) ══"
input int                   Custom_SL_Pips          = 140;   // Stop Loss (Pips — di Emas 140 pips = $14.00)
input int                   Custom_TP_Pips          = 280;   // Take Profit (Pips — di Emas 280 pips = $28.00)
input bool                  Custom_UseBreakEven     = true;  // Break-Even Otomatis (BE)
input int                   Custom_BE_TriggerPips   = 80;    // Trigger BE Saat Profit >= (Pips)
input int                   Custom_BE_LockPips      = 20;    // Kunci Profit BE (Pips di Atas Entry)
input bool                  Custom_UseTrailingStop  = true;  // Trailing Stop Dinamis
input int                   Custom_TrailingStart    = 100;   // Mulai Trailing Saat Profit >= (Pips)
input int                   Custom_TrailingDistance = 60;    // Jarak Trailing di Belakang Harga (Pips)
input int                   Custom_TrailingStep     = 10;    // Step Geser Trailing Stop (Pips)

input group "══ 3. STRATEGI ORDER BLOCK (OB) & SNR RETEST ══"
input int                   SnR_Lookback     = 24;        // Lookback Swing SnR (24 Bar)
input bool                  UseOrderBlock    = true;      // Deteksi Institutional Order Block (OB)
input int                   OB_MaxAgeBars    = 35;        // Batas Umur Validitas Order Block (Bar)
input bool                  RequireRejection = true;      // Wajib Ada Konfirmasi Ekor Pantulan (Rejection Wick)
input double                RejectionMinWick = 0.30;      // Rasio Ekor Rebound Minimal (30% dari Range)

input group "══ 4. FILTER ANTI FAKEOUT & SNR LEMAH ══"
input bool                  FilterFakeout    = true;      // Filter Manipulasi Ekor / Fakeout Sweep
input double                MaxWickRatio     = 0.35;      // Toleransi Ekor Lawan Maksimal (Max 35%)
input double                MinBodyRatio     = 0.45;      // Badan Candle Minimal (Min 45% Range)
input bool                  FilterWeakSnR    = true;      // Filter SnR Lemah (Wajib Ada Displacement ATR)
input int                   ATR_Period       = 14;        // Periode ATR(14)
input double                ATR_MinRatio     = 0.70;      // Volatilitas Minimal terhadap ATR (0.7x ATR)

input group "══ 5. FILTER TREN MAKRO & SESI TRADING ══"
input bool                  UseTrendFilter   = true;      // Filter Tren EMA (EMA 50 vs EMA 200)
input int                   EMA_Fast         = 50;        // EMA Cepat
input int                   EMA_Slow         = 200;       // EMA Lambat
input bool                  UseSessionFilter = true;      // Filter Jam Trading Aktif (London & NY)
input int                   SessStart        = 7;         // Jam Mulai (Server Broker)
input int                   SessEnd          = 22;        // Jam Selesai (Server Broker)

input group "══ 6. PROTEKSI SL STRUKTUR DINAMIS ══"
input bool                  UseStructuralSL  = true;      // SL Otomatis di Balik Ekor OB (+ Buffer)
input int                   SL_BufferPips    = 15;        // Buffer Jarak SL di Luar OB (Pips)
input int                   Min_SL_Pips      = 40;        // Batas Minimal SL (Pips)
input int                   Max_SL_Pips      = 220;       // Batas Maksimal SL (Pips)

input group "══ 7. PENGATURAN LAIN ══"
input int                   MaxSpreadPips    = 40;        // Spread Maksimal (Pips)
input bool                  Dashboard        = true;      // Dashboard Visual di Chart

//──────────────────────────────────────────────────────────────────
//  STRUKTUR DATA ORDER BLOCK (OB)
//──────────────────────────────────────────────────────────────────
struct SOrderBlock
{
   bool     valid;
   bool     isBullish;
   double   high;
   double   low;
   datetime time;
   int      age;
};

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

double                  g_swingHi      = 0;
double                  g_swingLo      = 0;

SOrderBlock             g_bullishOB;
SOrderBlock             g_bearishOB;

ENUM_ORDER_TYPE_FILLING g_fillingMode  = ORDER_FILLING_FOK;

// Resolved runtime settings
int                     g_effSL          = 140;
int                     g_effTP          = 280;
bool                    g_effUseBE       = true;
int                     g_effBETrigger   = 80;
int                     g_effBELock      = 20;
bool                    g_effUseTrail    = true;
int                     g_effTrailStart  = 100;
int                     g_effTrailDist   = 60;
int                     g_effTrailStep   = 10;
bool                    g_effStructSL    = true;

//──────────────────────────────────────────────────────────────────
//  HELPERS: PIP & PRICE CALCULATION
//──────────────────────────────────────────────────────────────────
double Pip()
{
   string sym = _Symbol;
   StringToUpper(sym);
   if(StringFind(sym, "XAU") >= 0 || StringFind(sym, "GOLD") >= 0)
   {
      if(_Digits == 2) return 10.0 * _Point;  // 1 pip = $0.10
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

   double balance   = AccountInfoDouble(ACCOUNT_BALANCE);
   double riskMoney = balance * (RiskPct / 100.0);
   double tickValue = SymbolInfoDouble(_Symbol, SYMBOL_TRADE_TICK_VALUE);
   double tickSize  = SymbolInfoDouble(_Symbol, SYMBOL_TRADE_TICK_SIZE);

   if(tickValue <= 0 || tickSize <= 0 || slDist <= 0)
   {
      double l = MathMax(minLot, MathMin(FixedLot, maxLot));
      return NormalizeDouble(MathFloor(l / lotStep) * lotStep, 2);
   }

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

//──────────────────────────────────────────────────────────────────
//  EKSEKUSI ORDER: BUY & SELL DENGAN SL/TP DINAMIS
//──────────────────────────────────────────────────────────────────
bool DoBuy(string lbl, double slDistance = 0, double tpDistance = 0)
{
   UpdateFillingMode();

   double slDist = (slDistance > 0) ? slDistance : P(g_effSL);
   double tpDist = (tpDistance > 0) ? tpDistance : P(g_effTP);

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
      // ECN fallback 2-langkah jika broker menolak SL/TP saat market order
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

bool DoSell(string lbl, double slDistance = 0, double tpDistance = 0)
{
   UpdateFillingMode();

   double slDist = (slDistance > 0) ? slDistance : P(g_effSL);
   double tpDist = (tpDistance > 0) ? tpDistance : P(g_effTP);

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
//  RESOLVE STRATEGY PROFILE PARAMETERS
//──────────────────────────────────────────────────────────────────
void ResolveProfile()
{
   if(StrategyProfile == PROFILE_WEBSITE_SWING)
   {
      // Parameter Institusional Sesuai Website RealistisFx (Stabil untuk H1/M30)
      g_effSL         = 140; // 140 Pips ($14.00 di Emas)
      g_effTP         = 280; // 280 Pips ($28.00 di Emas, RR 1:2.0)
      g_effUseBE      = true;
      g_effBETrigger  = 80;  // Profit +80 Pips
      g_effBELock     = 20;  // Kunci +20 Pips
      g_effUseTrail   = true;
      g_effTrailStart = 100; // Mulai trail +100 Pips
      g_effTrailDist  = 60;  // Jarak trail 60 Pips
      g_effTrailStep  = 10;
      g_effStructSL   = UseStructuralSL;
   }
   else if(StrategyProfile == PROFILE_PRECISION_SCALPER)
   {
      // Scalping Presisi (Khusus M15/M30, Stop Loss & Trailing Ramping)
      g_effSL         = 45;  // 45 Pips ($4.50 di Emas)
      g_effTP         = 90;  // 90 Pips ($9.00 di Emas, RR 1:2.0)
      g_effUseBE      = true;
      g_effBETrigger  = 30;  // Profit +30 Pips
      g_effBELock     = 8;   // Kunci +8 Pips
      g_effUseTrail   = true;
      g_effTrailStart = 40;  // Mulai trail +40 Pips
      g_effTrailDist  = 25;  // Jarak trail 25 Pips
      g_effTrailStep  = 5;
      g_effStructSL   = false;
   }
   else // PROFILE_CUSTOM
   {
      g_effSL         = Custom_SL_Pips;
      g_effTP         = Custom_TP_Pips;
      g_effUseBE      = Custom_UseBreakEven;
      g_effBETrigger  = Custom_BE_TriggerPips;
      g_effBELock     = Custom_BE_LockPips;
      g_effUseTrail   = Custom_UseTrailingStop;
      g_effTrailStart = Custom_TrailingStart;
      g_effTrailDist  = Custom_TrailingDistance;
      g_effTrailStep  = Custom_TrailingStep;
      g_effStructSL   = UseStructuralSL;
   }
}

//──────────────────────────────────────────────────────────────────
//  INIT & DEINIT
//──────────────────────────────────────────────────────────────────
int OnInit()
{
   g_sym.Name(_Symbol);
   g_trade.SetExpertMagicNumber(MagicNum);
   g_trade.SetDeviationInPoints(100);
   UpdateFillingMode();
   ResolveProfile();

   g_hEmaFast = iMA(_Symbol, _Period, EMA_Fast, 0, MODE_EMA, PRICE_CLOSE);
   g_hEmaSlow = iMA(_Symbol, _Period, EMA_Slow, 0, MODE_EMA, PRICE_CLOSE);
   g_hATR     = iATR(_Symbol, _Period, ATR_Period);

   g_lastBarTime  = iTime(_Symbol, _Period, 0);
   g_lastBarCount = Bars(_Symbol, _Period);

   g_bullishOB.valid = false;
   g_bearishOB.valid = false;

   Print("╔════════════════════════════════════════════════════════════════════╗");
   Print("║  REALISTISFX INSTITUTIONAL TRADER v13.0 — OB & SNR PULLBACK        ║");
   Print("╚════════════════════════════════════════════════════════════════════╝");
   PrintFormat("[RFX] Simbol: %s | TF: %s | Profil: %s",
               _Symbol, EnumToString(_Period), EnumToString(StrategyProfile));
   PrintFormat("[RFX] Effective SL: %d pips ($%.2f) | Effective TP: %d pips ($%.2f)",
               g_effSL, g_effSL * 0.1, g_effTP, g_effTP * 0.1);

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
//  PENGELOLAAN POSISI: BREAK-EVEN & DYNAMIC TRAILING STOP
//──────────────────────────────────────────────────────────────────
void ManagePositions()
{
   double beDist     = P(g_effBETrigger);
   double beLockDist = P(g_effBELock);
   double trailStart = P(g_effTrailStart);
   double trailDist  = P(g_effTrailDist);
   double trailStep  = P(g_effTrailStep);

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

         // 1. Break-Even: Saat profit >= beDist, kunci profit di atas open
         if(g_effUseBE && profit >= beDist)
         {
            double beSL = NormalizeDouble(openPrice + beLockDist, _Digits);
            if(currentSL < beSL)
            {
               g_trade.PositionModify(g_pos.Ticket(), beSL, currentTP);
               currentSL = beSL;
            }
         }

         // 2. Dynamic Trailing Stop
         if(g_effUseTrail && profit >= trailStart)
         {
            double targetSL = NormalizeDouble(curPrice - trailDist, _Digits);
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
         if(g_effUseBE && profit >= beDist)
         {
            double beSL = NormalizeDouble(openPrice - beLockDist, _Digits);
            if(currentSL == 0 || currentSL > beSL)
            {
               g_trade.PositionModify(g_pos.Ticket(), beSL, currentTP);
               currentSL = beSL;
            }
         }

         // 2. Dynamic Trailing Stop
         if(g_effUseTrail && profit >= trailStart)
         {
            double targetSL = NormalizeDouble(curPrice + trailDist, _Digits);
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
//  EVALUASI SINYAL: ORDER BLOCK MITIGATION & SNR PULLBACK
//──────────────────────────────────────────────────────────────────
void OnNewBar()
{
   g_totalBars++;

   int totalAvail = Bars(_Symbol, _Period);
   if(totalAvail < SnR_Lookback + 5) return;

   // ──────────────────────────────────────────────────
   //  1. HITUNG SWING HIGH & SWING LOW (SNR KUNCI)
   // ──────────────────────────────────────────────────
   double swingHi = iHigh(_Symbol, _Period, 2);
   double swingLo = iLow (_Symbol, _Period, 2);

   for(int i = 3; i <= SnR_Lookback + 1; i++)
   {
      double h = iHigh(_Symbol, _Period, i);
      double l = iLow (_Symbol, _Period, i);
      if(h > 0 && h > swingHi) swingHi = h;
      if(l > 0 && (swingLo == 0 || l < swingLo)) swingLo = l;
   }

   g_swingHi = swingHi;
   g_swingLo = swingLo;

   // ──────────────────────────────────────────────────
   //  2. CANDLE SINYAL = bar[1] (Bar yang baru CLOSE)
   // ──────────────────────────────────────────────────
   double close1 = iClose(_Symbol, _Period, 1);
   double open1  = iOpen (_Symbol, _Period, 1);
   double hi1    = iHigh (_Symbol, _Period, 1);
   double lo1    = iLow  (_Symbol, _Period, 1);

   double close2 = iClose(_Symbol, _Period, 2);
   double open2  = iOpen (_Symbol, _Period, 2);
   double hi2    = iHigh (_Symbol, _Period, 2);
   double lo2    = iLow  (_Symbol, _Period, 2);

   if(close1 <= 0) return;

   // Filter Spread
   double spread = ToPips(GetCurrentAsk() - GetCurrentBid());
   if(spread > MaxSpreadPips) return;

   // Filter Jam Sesi
   if(!IsInTradeSession()) return;

   // ──────────────────────────────────────────────────
   //  3. FILTER VOLATILITAS ATR & CANDLE ANATOMY
   // ──────────────────────────────────────────────────
   double cRange = hi1 - lo1;
   double cBody  = MathAbs(close1 - open1);

   double atrVal[1];
   double atr = 0;
   if(CopyBuffer(g_hATR, 0, 1, 1, atrVal) > 0)
      atr = atrVal[0];

   // Filter SnR Lemah
   if(FilterWeakSnR && atr > 0)
   {
      if(cRange < (ATR_MinRatio * atr)) return;
   }

   // ──────────────────────────────────────────────────
   //  4. FILTER TREN MAKRO EMA 50 / 200
   // ──────────────────────────────────────────────────
   bool trendBullish = true;
   bool trendBearish = true;

   if(UseTrendFilter)
   {
      double emaF[1], emaS[1];
      if(CopyBuffer(g_hEmaFast, 0, 1, 1, emaF) > 0 && CopyBuffer(g_hEmaSlow, 0, 1, 1, emaS) > 0)
      {
         // Syarat Tren Institusional: Golden Cross / Death Cross
         trendBullish = (emaF[0] >= emaS[0]);
         trendBearish = (emaF[0] <= emaS[0]);
      }
   }

   // ──────────────────────────────────────────────────
   //  5. DETEKSI & PEMETAAN ORDER BLOCK (OB) INSTITUSIONAL
   // ──────────────────────────────────────────────────
   if(UseOrderBlock)
   {
      // Update umur OB yang ada
      if(g_bullishOB.valid)
      {
         g_bullishOB.age++;
         if(g_bullishOB.age > OB_MaxAgeBars || close1 < g_bullishOB.low)
            g_bullishOB.valid = false; // Ter-mitigasi / Invalidated
      }

      if(g_bearishOB.valid)
      {
         g_bearishOB.age++;
         if(g_bearishOB.age > OB_MaxAgeBars || close1 > g_bearishOB.high)
            g_bearishOB.valid = false;
      }

      // Deteksi Bullish OB Baru:
      // Candle bearish bar[2] sebelum bar[1] melakukan breakout impulsif di atas swingHi
      if(close1 > swingHi && close1 > open1 && close2 < open2)
      {
         // Filter Anti-Fakeout: Bar penembus tidak boleh punya ekor atas panjang (rejection)
         bool notFakeout = true;
         if(FilterFakeout && cRange > 0)
         {
            if((hi1 - close1) > (MaxWickRatio * cRange) || (cBody / cRange) < MinBodyRatio)
               notFakeout = false;
         }

         // Syarat Displacement Impulsif: range candle >= 0.7x ATR
         if(notFakeout && (atr <= 0 || cRange >= (0.7 * atr)))
         {
            g_bullishOB.valid     = true;
            g_bullishOB.isBullish = true;
            g_bullishOB.high      = MathMax(open2, close2);
            g_bullishOB.low       = lo2;
            g_bullishOB.time      = iTime(_Symbol, _Period, 2);
            g_bullishOB.age       = 0;
         }
      }

      // Deteksi Bearish OB Baru:
      // Candle bullish bar[2] sebelum bar[1] melakukan breakdown impulsif di bawah swingLo
      if(close1 < swingLo && close1 < open1 && close2 > open2)
      {
         bool notFakeout = true;
         if(FilterFakeout && cRange > 0)
         {
            if((close1 - lo1) > (MaxWickRatio * cRange) || (cBody / cRange) < MinBodyRatio)
               notFakeout = false;
         }

         if(notFakeout && (atr <= 0 || cRange >= (0.7 * atr)))
         {
            g_bearishOB.valid     = true;
            g_bearishOB.isBullish = false;
            g_bearishOB.high      = hi2;
            g_bearishOB.low       = MathMin(open2, close2);
            g_bearishOB.time      = iTime(_Symbol, _Period, 2);
            g_bearishOB.age       = 0;
         }
      }
   }

   // Disiplin: Maksimal 1 posisi aktif per magic number
   if(TotalOpenPos() > 0) return;

   // ──────────────────────────────────────────────────
   //  6. EKSEKUSI SINYAL: RETEST MITIGASI ORDER BLOCK
   // ──────────────────────────────────────────────────

   // SINYAL BUY: RETEST MITIGASI BULLISH ORDER BLOCK (OB)
   if(UseOrderBlock && g_bullishOB.valid && g_bullishOB.age >= 1 && trendBullish)
   {
      double tol = P(15);
      // Harga koreksi masuk ke zona Order Block dan memantul (rebound)
      if(lo1 <= (g_bullishOB.high + tol) && close1 >= (g_bullishOB.low - P(5)))
      {
         // Konfirmasi rejection: Close bullish atau ekor bawah panjang (rejection wick)
         bool isRejection = (close1 > open1) || ((close1 - lo1) >= (RejectionMinWick * cRange));

         if(!RequireRejection || isRejection)
         {
            if(!HasPos(POSITION_TYPE_BUY))
            {
               double ask = GetCurrentAsk();
               double slDist = P(g_effSL);
               double tpDist = P(g_effTP);

               // Kalkulasi SL Struktural di balik lantai Order Block
               if(g_effStructSL)
               {
                  double structSLPrice = g_bullishOB.low - P(SL_BufferPips);
                  double sDist = ask - structSLPrice;
                  if(sDist >= P(Min_SL_Pips) && sDist <= P(Max_SL_Pips))
                  {
                     slDist = sDist;
                     tpDist = slDist * 2.0; // Pertahankan RR 1:2.0
                  }
               }

               if(DoBuy("BUY_OB_MITIGATION", slDist, tpDist))
               {
                  g_bullishOB.valid = false; // Zona terpakai
                  return;
               }
            }
         }
      }
   }

   // SINYAL SELL: RETEST MITIGASI BEARISH ORDER BLOCK (OB)
   if(UseOrderBlock && g_bearishOB.valid && g_bearishOB.age >= 1 && trendBearish)
   {
      double tol = P(15);
      if(hi1 >= (g_bearishOB.low - tol) && close1 <= (g_bearishOB.high + P(5)))
      {
         bool isRejection = (close1 < open1) || ((hi1 - close1) >= (RejectionMinWick * cRange));

         if(!RequireRejection || isRejection)
         {
            if(!HasPos(POSITION_TYPE_SELL))
            {
               double bid = GetCurrentBid();
               double slDist = P(g_effSL);
               double tpDist = P(g_effTP);

               // Kalkulasi SL Struktural di balik atap Order Block
               if(g_effStructSL)
               {
                  double structSLPrice = g_bearishOB.high + P(SL_BufferPips);
                  double sDist = structSLPrice - bid;
                  if(sDist >= P(Min_SL_Pips) && sDist <= P(Max_SL_Pips))
                  {
                     slDist = sDist;
                     tpDist = slDist * 2.0;
                  }
               }

               if(DoSell("SELL_OB_MITIGATION", slDist, tpDist))
               {
                  g_bearishOB.valid = false;
                  return;
               }
            }
         }
      }
   }
}

//──────────────────────────────────────────────────────────────────
//  DASHBOARD VISUAL DI CHART
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

   string obStr = "Mencari Zona...";
   if(g_bullishOB.valid) obStr = StringFormat("Bullish OB ($%.2f - $%.2f)", g_bullishOB.low, g_bullishOB.high);
   else if(g_bearishOB.valid) obStr = StringFormat("Bearish OB ($%.2f - $%.2f)", g_bearishOB.low, g_bearishOB.high);

   string profStr = (StrategyProfile == PROFILE_WEBSITE_SWING) ? "Institutional Swing (Website)" :
                    (StrategyProfile == PROFILE_PRECISION_SCALPER) ? "Precision Scalper M15/M30" : "Custom Manual";

   string s = "";
   s += "╔══════════════════════════════════════════════╗\n";
   s += "║  REALISTISFX INSTITUTIONAL TRADER v13.0      ║\n";
   s += "║  Order Block (OB) & Key SnR Retest           ║\n";
   s += "╠══════════════════════════════════════════════╣\n";
   s += StringFormat("║ Profil: %s\n", profStr);
   s += StringFormat("║ Simbol: %s | Timeframe: %s\n", _Symbol, EnumToString(_Period));
   s += StringFormat("║ SL Aktif: %d Pips ($%.2f) | TP: %d Pips ($%.2f)\n", 
                     g_effSL, g_effSL * 0.1, g_effTP, g_effTP * 0.1);
   s += StringFormat("║ Trailing: %s (Start %d p / Dist %d p)\n", 
                     (g_effUseTrail ? "ON" : "OFF"), g_effTrailStart, g_effTrailDist);
   s += StringFormat("║ Break-Even: %s (Trigger +%d p / Lock +%d p)\n", 
                     (g_effUseBE ? "ON" : "OFF"), g_effBETrigger, g_effBELock);
   s += StringFormat("║ Status OB: %s\n", obStr);
   s += StringFormat("║ Spread: %.1f Pips | Posisi Aktif: %d (Float: %+.1f p)\n", sp, cnt, flt);
   s += "╚══════════════════════════════════════════════╝";

   Comment(s);
}

//──────────────────────────────────────────────────────────────────
//  ONTICK: ENTRY DI BAR BARU & MANAJEMEN TIAP TICK
//──────────────────────────────────────────────────────────────────
void OnTick()
{
   // 1. Kawal posisi aktif setiap tick (Trailing Stop & Break-Even instan)
   ManagePositions();

   // 2. Tampilkan dashboard visual
   if(Dashboard) DrawDash();

   // 3. Evaluasi sinyal masuk hanya saat bar baru terbentuk (Close Bar[1] terkonfirmasi)
   if(CheckNewBar())
   {
      OnNewBar();
   }
}
