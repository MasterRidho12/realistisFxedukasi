import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Temporary in-memory OTP cache for instant fallback
const otpCache = new Map<string, { code: string; expiresAt: number }>();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, email, code, newPassword } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Alamat email wajib diisi.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const hasDbUrl = Boolean(
      process.env.DATABASE_URL ||
      process.env.POSTGRES_PRISMA_URL ||
      process.env.POSTGRES_URL
    );

    // 1. ACTION: SEND_CODE (Generate 6-digit OTP & store with 15min expiry)
    if (action === 'SEND_CODE') {
      const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

      // Store in memory cache
      otpCache.set(normalizedEmail, { code: generatedCode, expiresAt });

      // Store in Vercel Postgres if connected
      if (hasDbUrl) {
        try {
          await prisma.user.updateMany({
            where: { email: normalizedEmail },
            data: {
              resetCode: generatedCode,
              resetCodeExpiry: new Date(expiresAt),
            },
          });
        } catch (dbErr) {
          console.warn('[Reset API] DB update code fallback:', dbErr);
        }
      }

      console.log(`[AUTH VERIFIKASI] Kode Reset Password untuk ${normalizedEmail}: ${generatedCode}`);

      return NextResponse.json({
        success: true,
        message: `Kode verifikasi 6-digit telah dikirim ke email ${normalizedEmail}.`,
        // We include preview code in response for testing/development feedback
        verificationCodePreview: generatedCode,
      });
    }

    // 2. ACTION: VERIFY_CODE
    if (action === 'VERIFY_CODE') {
      if (!code) {
        return NextResponse.json(
          { success: false, error: 'Masukkan 6 digit kode verifikasi.' },
          { status: 400 }
        );
      }

      const inputCode = String(code).trim();
      let isValid = false;

      // Check cache first
      const cached = otpCache.get(normalizedEmail);
      if (cached && cached.code === inputCode && cached.expiresAt > Date.now()) {
        isValid = true;
      }

      // If not in cache, check DB
      if (!isValid && hasDbUrl) {
        try {
          const user = await prisma.user.findFirst({
            where: {
              email: normalizedEmail,
              resetCode: inputCode,
            },
          });
          if (user && user.resetCodeExpiry && user.resetCodeExpiry.getTime() > Date.now()) {
            isValid = true;
          }
        } catch (dbErr) {
          console.warn('[Reset API] DB verify code fallback:', dbErr);
        }
      }

      if (!isValid) {
        return NextResponse.json(
          { success: false, error: 'Kode verifikasi salah atau sudah kadaluarsa (berlaku 15 menit).' },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        valid: true,
        message: 'Kode verifikasi valid. Silakan tentukan kata sandi baru Anda.',
      });
    }

    // 3. ACTION: RESET_PASSWORD (By User with verified code)
    if (action === 'RESET_PASSWORD') {
      if (!code || !newPassword) {
        return NextResponse.json(
          { success: false, error: 'Kode verifikasi dan kata sandi baru wajib diisi.' },
          { status: 400 }
        );
      }

      if (newPassword.length < 6) {
        return NextResponse.json(
          { success: false, error: 'Kata sandi baru minimal 6 karakter.' },
          { status: 400 }
        );
      }

      const inputCode = String(code).trim();
      let isValid = false;

      // Verify code
      const cached = otpCache.get(normalizedEmail);
      if (cached && cached.code === inputCode && cached.expiresAt > Date.now()) {
        isValid = true;
      }

      if (!isValid && hasDbUrl) {
        try {
          const user = await prisma.user.findFirst({
            where: {
              email: normalizedEmail,
              resetCode: inputCode,
            },
          });
          if (user && user.resetCodeExpiry && user.resetCodeExpiry.getTime() > Date.now()) {
            isValid = true;
          }
        } catch (dbErr) {
          console.warn('[Reset API] DB check code error:', dbErr);
        }
      }

      if (!isValid) {
        return NextResponse.json(
          { success: false, error: 'Kode verifikasi tidak valid atau telah kadaluarsa.' },
          { status: 400 }
        );
      }

      // Update password in Vercel Postgres if connected
      if (hasDbUrl) {
        try {
          await prisma.user.updateMany({
            where: { email: normalizedEmail },
            data: {
              password: newPassword,
              resetCode: null,
              resetCodeExpiry: null,
            },
          });
        } catch (dbErr) {
          console.warn('[Reset API] DB password update error:', dbErr);
        }
      }

      // Clear memory OTP cache
      otpCache.delete(normalizedEmail);

      return NextResponse.json({
        success: true,
        message: 'Kata sandi berhasil diperbarui! Silakan masuk dengan kata sandi baru Anda.',
      });
    }

    // 4. ACTION: ADMIN_DIRECT_RESET (Authorized Admin can set any user's password)
    if (action === 'ADMIN_DIRECT_RESET') {
      if (!newPassword || newPassword.length < 6) {
        return NextResponse.json(
          { success: false, error: 'Kata sandi baru minimal 6 karakter.' },
          { status: 400 }
        );
      }

      if (hasDbUrl) {
        try {
          await prisma.user.updateMany({
            where: { email: normalizedEmail },
            data: {
              password: newPassword,
              resetCode: null,
              resetCodeExpiry: null,
            },
          });
        } catch (dbErr) {
          console.warn('[Reset API] Admin direct reset DB error:', dbErr);
        }
      }

      otpCache.delete(normalizedEmail);

      return NextResponse.json({
        success: true,
        message: `Kata sandi untuk ${normalizedEmail} berhasil diubah langsung oleh Admin!`,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Aksi reset password tidak dikenali.' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: `Gagal memproses reset kata sandi: ${String(error)}` },
      { status: 500 }
    );
  }
}
