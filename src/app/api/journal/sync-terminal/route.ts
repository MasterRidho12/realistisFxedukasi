import { NextResponse } from 'next/server';
import { InvestorTrade } from '@/types';

// WebHook endpoint for MetaTrader EA or terminal direct push
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { accountNumber, brokerServer, trades = [] } = body;

    if (!accountNumber) {
      return NextResponse.json({ success: false, error: 'Nomor akun diperlukan.' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `Berhasil menerima ${trades.length} data closed trades dari terminal MT4/MT5.`,
      syncedAt: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Gagal memproses sinkronisasi.';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
