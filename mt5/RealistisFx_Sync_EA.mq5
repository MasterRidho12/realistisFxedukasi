//+------------------------------------------------------------------+
//|                                         RealistisFx_Sync_EA.mq5  |
//|               RealistisFx Smart Journal Real-Time Connector      |
//|                             https://realistisfxedukasi.vercel.app |
//+------------------------------------------------------------------+
#property copyright "RealistisFx Edukasi Bisnis Forex"
#property link      "https://realistisfxedukasi.vercel.app"
#property version   "1.00"
#property description "Konektor Otomatis Riwayat Transaksi MT5 ke Smart Trading Journal RealistisFx"
#property strict

//--- Input parameters
input string   InpWebhookUrl        = "https://realistisfxedukasi.vercel.app/api/journal/sync-terminal"; // URL API RealistisFx
input int      InpSyncIntervalSec   = 30;     // Interval Sinkronisasi Otomatis (Detik)
input bool     InpSaveLocalReport   = true;   // Simpan Laporan CSV di MQL5/Files

//--- Global Variables
datetime g_lastSyncTime = 0;
int      g_lastDealsCount = 0;

//+------------------------------------------------------------------+
//| Expert initialization function                                   |
//+------------------------------------------------------------------+
int OnInit()
{
   Print(">>> [RealistisFx Sync EA] Memulai inisialisasi konektor...");
   Print(">>> Akun Login: ", AccountInfoInteger(ACCOUNT_LOGIN), " | Server: ", AccountInfoString(ACCOUNT_SERVER));
   Print(">>> Mata Uang: ", AccountInfoString(ACCOUNT_CURRENCY), " | Saldo: ", AccountInfoDouble(ACCOUNT_BALANCE));

   // Jalankan sinkronisasi pertama kali
   EventSetTimer(InpSyncIntervalSec);
   SyncClosedTradesToWeb();

   return(INIT_SUCCEEDED);
}

//+------------------------------------------------------------------+
//| Expert deinitialization function                                 |
//+------------------------------------------------------------------+
void OnDeinit(const int reason)
{
   EventKillTimer();
   Print(">>> [RealistisFx Sync EA] Konektor dimatikan.");
}

//+------------------------------------------------------------------+
//| Timer function: sync periodically                                |
//+------------------------------------------------------------------+
void OnTimer()
{
   SyncClosedTradesToWeb();
}

//+------------------------------------------------------------------+
//| Trade Transaction function: sync immediately when trade closes   |
//+------------------------------------------------------------------+
void OnTradeTransaction(const MqlTradeTransaction& trans,
                        const MqlTradeRequest& request,
                        const MqlTradeResult& result)
{
   if(trans.type == TRADE_TRANSACTION_DEAL_ADD)
   {
      // Ada transaksi baru selesai, segera sinkronkan
      SyncClosedTradesToWeb();
   }
}

//+------------------------------------------------------------------+
//| Fungsi Membaca Transaksi Riil & Mengirim ke RealistisFx Web      |
//+------------------------------------------------------------------+
void SyncClosedTradesToWeb()
{
   // Pilih seluruh riwayat dari awal akun hingga sekarang
   datetime fromDate = 0;
   datetime toDate = TimeCurrent();

   if(!HistorySelect(fromDate, toDate))
   {
      Print(">>> [RealistisFx Sync] Gagal memilih histori transaksi.");
      return;
   }

   int totalDeals = HistoryDealsTotal();
   if(totalDeals <= 0)
   {
      Print(">>> [RealistisFx Sync] Belum ada closed deals di akun ini.");
      return;
   }

   // Format data akun
   long   loginNumber  = AccountInfoInteger(ACCOUNT_LOGIN);
   string brokerServer = AccountInfoString(ACCOUNT_SERVER);
   string accountName  = AccountInfoString(ACCOUNT_NAME);
   double balance      = AccountInfoDouble(ACCOUNT_BALANCE);
   double equity       = AccountInfoDouble(ACCOUNT_EQUITY);
   string currency     = AccountInfoString(ACCOUNT_CURRENCY);

   // Bangun JSON string manual (kompatibel MT5 murni tanpa library eksternal)
   string jsonTrades = "[";
   int validTradeCount = 0;

   for(int i = 0; i < totalDeals; i++)
   {
      ulong ticket = HistoryDealGetTicket(i);
      if(ticket <= 0) continue;

      ENUM_DEAL_ENTRY dealEntry = (ENUM_DEAL_ENTRY)HistoryDealGetInteger(ticket, DEAL_ENTRY);
      // Hanya ambil transaksi penutupan (DEAL_ENTRY_OUT / DEAL_ENTRY_INOUT) atau transaksi selesai
      if(dealEntry != DEAL_ENTRY_OUT && dealEntry != DEAL_ENTRY_INOUT) continue;

      string symbol = HistoryDealGetString(ticket, DEAL_SYMBOL);
      if(StringLen(symbol) == 0) continue;

      ENUM_DEAL_TYPE dealType = (ENUM_DEAL_TYPE)HistoryDealGetInteger(ticket, DEAL_TYPE);
      string typeStr = (dealType == DEAL_TYPE_BUY) ? "BUY" : "SELL";

      double volume     = HistoryDealGetDouble(ticket, DEAL_VOLUME);
      double price      = HistoryDealGetDouble(ticket, DEAL_PRICE);
      double profit     = HistoryDealGetDouble(ticket, DEAL_PROFIT);
      datetime time     = (datetime)HistoryDealGetInteger(ticket, DEAL_TIME);
      string timeStr    = TimeToString(time, TIME_DATE|TIME_SECONDS);

      // Hitung pips
      long digits = SymbolInfoInteger(symbol, SYMBOL_DIGITS);
      double point = SymbolInfoDouble(symbol, SYMBOL_POINT);
      int pips = (point > 0) ? (int)(profit / (volume * 10)) : 0;

      if(validTradeCount > 0) jsonTrades += ",";

      jsonTrades += "{";
      jsonTrades += "\"ticket\":" + IntegerToString((long)ticket) + ",";
      jsonTrades += "\"pair\":\"" + symbol + "\",";
      jsonTrades += "\"type\":\"" + typeStr + "\",";
      jsonTrades += "\"lot\":" + DoubleToString(volume, 2) + ",";
      jsonTrades += "\"closePrice\":" + DoubleToString(price, (int)digits) + ",";
      jsonTrades += "\"pnl\":" + DoubleToString(profit, 2) + ",";
      jsonTrades += "\"closeTime\":\"" + timeStr + "\",";
      jsonTrades += "\"pips\":" + IntegerToString(pips);
      jsonTrades += "}";

      validTradeCount++;
   }

   jsonTrades += "]";

   // Gabungkan ke payload lengkap
   string payload = "{";
   payload += "\"accountNumber\":\"" + IntegerToString(loginNumber) + "\",";
   payload += "\"brokerServer\":\"" + brokerServer + "\",";
   payload += "\"accountName\":\"" + accountName + "\",";
   payload += "\"platform\":\"MT5\",";
   payload += "\"balance\":" + DoubleToString(balance, 2) + ",";
   payload += "\"equity\":" + DoubleToString(equity, 2) + ",";
   payload += "\"currency\":\"" + currency + "\",";
   payload += "\"trades\":" + jsonTrades;
   payload += "}";

   // Kirim ke Webhook RealistisFx via WebRequest
   char postData[];
   char resultData[];
   string resultHeaders;
   StringToCharArray(payload, postData, 0, WHOLE_ARRAY, CP_UTF8);

   // Hapus null terminator di akhir char array
   int dataSize = ArraySize(postData);
   if(dataSize > 0 && postData[dataSize - 1] == 0) ArrayResize(postData, dataSize - 1);

   string headers = "Content-Type: application/json\r\n";
   int res = WebRequest("POST", InpWebhookUrl, headers, 5000, postData, resultData, resultHeaders);

   if(res == 200 || res == 201)
   {
      Print(">>> [RealistisFx Sync] SUKSES! ", validTradeCount, " trade riil berhasil dikirim ke web RealistisFx.");
      g_lastSyncTime = TimeCurrent();
      g_lastDealsCount = validTradeCount;
   }
   else if(res == -1)
   {
      int err = GetLastError();
      Print(">>> [RealistisFx Sync] WebRequest diblokir MT5 (Error ", err, ").");
      Print(">>> SOLUSI: Buka MT5 -> Tools -> Options -> tab 'Expert Advisors' -> Centang 'Allow WebRequest for listed URL' -> Tambahkan URL: https://realistisfxedukasi.vercel.app");
   }
   else
   {
      Print(">>> [RealistisFx Sync] Server merespon kode: ", res);
   }

   // Opsi simpan CSV lokal
   if(InpSaveLocalReport)
   {
      int handle = FileOpen("RealistisFx_History_Export.csv", FILE_WRITE|FILE_CSV|FILE_ANSI, ',');
      if(handle != INVALID_HANDLE)
      {
         FileWrite(handle, "Ticket", "CloseTime", "Symbol", "Type", "Volume", "Price", "Profit");
         for(int i = 0; i < totalDeals; i++)
         {
            ulong t = HistoryDealGetTicket(i);
            if(t <= 0) continue;
            ENUM_DEAL_ENTRY entry = (ENUM_DEAL_ENTRY)HistoryDealGetInteger(t, DEAL_ENTRY);
            if(entry != DEAL_ENTRY_OUT && entry != DEAL_ENTRY_INOUT) continue;
            string s = HistoryDealGetString(t, DEAL_SYMBOL);
            if(StringLen(s) == 0) continue;
            string typ = (HistoryDealGetInteger(t, DEAL_TYPE) == DEAL_TYPE_BUY) ? "BUY" : "SELL";
            FileWrite(handle,
               IntegerToString((long)t),
               TimeToString((datetime)HistoryDealGetInteger(t, DEAL_TIME), TIME_DATE|TIME_SECONDS),
               s,
               typ,
               DoubleToString(HistoryDealGetDouble(t, DEAL_VOLUME), 2),
               DoubleToString(HistoryDealGetDouble(t, DEAL_PRICE), 5),
               DoubleToString(HistoryDealGetDouble(t, DEAL_PROFIT), 2)
            );
         }
         FileClose(handle);
      }
   }
}
//+------------------------------------------------------------------+
