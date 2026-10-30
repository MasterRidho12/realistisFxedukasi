# Panduan Instalasi & Pengujian Strategy Tester MT5
## RealistisFx - Metode Baku Breakout & Key SnR v2.0 (10-Year Backtest Model)

File EA: `RealistisFx_MetodeBaku_EA.mq5`  
Lokasi: `mt5/RealistisFx_MetodeBaku_EA.mq5`

---

### 1. Apa yang Diperbarui di Versi 2.0? (Solusi Kenapa Sebelumnya 0 Trade)
Pada pengujian sebelumnya di Strategy Tester MT5, EA menghasilkan 0 trade karena 3 faktor teknis di MT5 Tester:
1. **Multi-Timeframe Lookback:** MT5 Strategy Tester pada rentang pendek (hanya beberapa hari) belum mensinkronisasi riwayat 40 bar H4. Versi 2.0 menggunakan `InpStructureTF = PERIOD_CURRENT` (otomatis mengikuti timeframe chart H1 Anda dengan lookback dinamis 20 bar).
2. **Order Filling Mode Broker:** Broker demo (seperti HF Markets) menolak eksekusi jika filling mode tidak cocok. Versi 2.0 dilengkapi `SetOptimalFillingType()` otomatis (FOK / IOC / Return).
3. **Filter Sesi & Spread:** Di versi 2.0, filter jam trading dinonaktifkan secara default untuk backtest (`InpUseSessionFilter = false`) agar tidak memblokir sinyal karena perbedaan jam server broker.

---

### 2. Cara Menguji di Strategy Tester MT5 (Agar Sinyal Muncul)
1. Buka **MetaEditor** (F4), buka [RealistisFx_MetodeBaku_EA.mq5](file:///c:/realistisfxedukas/mt5/RealistisFx_MetodeBaku_EA.mq5), lalu tekan **Compile (F7)**.
2. Kembali ke MT5, buka jendela **Penguji Strategi (Ctrl + R)**.
3. Di tab **Pengaturan (Settings)**:
   * **Pakar (EA):** Pilih `RealistisFx_MetodeBaku_EA`.
   * **Simbol:** `XAUUSD` (atau `EURUSD`).
   * **Rentang Waktu:** `H1`.
   * **Periode Uji:** Pilih rentang minimal **1 Bulan sampai 1 Tahun** (atau "Tahun Lalu") agar algoritma memiliki cukup data pergerakan tren & breakout SnR.
   * **Deposit:** 10,000 USD.
   * **Model Eksekusi:** `Setiap Tick` atau `Hanya Harga Pembukaan` (Open prices only - sangat cepat).
4. Klik tombol **Mulai (Start)**.
5. Anda bisa melihat proses eksekusi dan sinyal di tab **Jurnal** dan grafik pertumbuhan pips di tab **Grafik**.
