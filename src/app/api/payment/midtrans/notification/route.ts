import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const notification = await req.json();
    const { order_id, transaction_status, fraud_status } = notification;

    console.log(`[Midtrans Webhook] Received status for order ${order_id}: ${transaction_status}`);

    // If payment is settled / captured
    const isSuccess =
      transaction_status === 'capture'
        ? fraud_status === 'accept'
        : transaction_status === 'settlement';

    if (isSuccess) {
      console.log(`[Midtrans Webhook] Payment confirmed for ${order_id}. Upgrading access...`);
      // User account can be automatically upgraded
    }

    return NextResponse.json({ success: true, status: 'OK' });
  } catch (error) {
    console.error('Midtrans notification error:', error);
    return NextResponse.json({ success: false, error: 'Webhook processing error' }, { status: 500 });
  }
}
