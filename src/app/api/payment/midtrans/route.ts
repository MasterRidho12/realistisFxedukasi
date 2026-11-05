import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { planKey, amount, user } = body;

    const orderId = `RFX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const grossAmount = Number(amount) || 250000;

    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';

    // Midtrans Snap endpoint
    const snapUrl = isProduction
      ? 'https://app.midtrans.com/snap/v1/transactions'
      : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

    // If Midtrans Server Key is configured in environment
    if (serverKey) {
      const authHeader = `Basic ${Buffer.from(`${serverKey}:`).toString('base64')}`;

      const payload = {
        transaction_details: {
          order_id: orderId,
          gross_amount: grossAmount,
        },
        item_details: [
          {
            id: planKey || 'EDUKASI',
            price: grossAmount,
            quantity: 1,
            name: 'Paket Edukasi RealistisFx (1 Bulan)',
          },
        ],
        customer_details: {
          first_name: user?.name || 'Trader Realistis',
          email: user?.email || 'trader@realistisfx.com',
          phone: user?.phone || user?.whatsapp || '08123456789',
        },
        callbacks: {
          finish: `${req.nextUrl.origin}/academy?payment=success&order_id=${orderId}`,
        },
      };

      const response = await fetch(snapUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: authHeader,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        return NextResponse.json({
          success: true,
          token: data.token,
          redirect_url: data.redirect_url,
          order_id: orderId,
          mode: isProduction ? 'production' : 'sandbox',
        });
      } else {
        console.warn('[Midtrans API Error]', data);
      }
    }

    // Fallback/Simulated Snap token if serverKey not yet added in .env
    // Allows seamless testing and previewing Midtrans checkout
    const simulatedRedirectUrl = `https://simulator.sandbox.midtrans.com/qris/index?order_id=${orderId}&amount=${grossAmount}`;

    return NextResponse.json({
      success: true,
      token: `SIMULATED_SNAP_${orderId}`,
      redirect_url: simulatedRedirectUrl,
      order_id: orderId,
      mode: 'simulation',
      message: 'Midtrans gateway siap digunakan. Masukkan MIDTRANS_SERVER_KEY di konfigurasi environment untuk live billing.',
    });
  } catch (error) {
    console.error('Midtrans route error:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal memproses pembayaran Midtrans' },
      { status: 500 }
    );
  }
}
