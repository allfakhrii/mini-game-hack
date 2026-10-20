import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { success: false, message: "Payload sandi tidak ditemukan atau kosong." },
        { status: 400 }
      );
    }

    const cleanInput = password.trim().toLowerCase();
    
    // Valid answers:
    // 1. "alsayangsamacaca" (the actual secret extracted from stegano.png)
    // 2. "sayangkupintar" (example mentioned in the blueprint doc)
    const validPasswords = ["alsayangsamacaca", "sayangkupintar"];

    if (validPasswords.includes(cleanInput)) {
      return NextResponse.json({
        success: true,
        message: "AKSES DITERIMA! Bit LSB berhasil didekode. Pintu Level 2 terbuka buat kamu!",
        level: 2,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Sandi belum cocok nih. Coba periksa lagi hasil pembacaan LSB di fotonya ya.",
        },
        { status: 401 }
      );
    }
  } catch {
    return NextResponse.json(
      { success: false, message: "Kesalahan server saat memproses verifikasi." },
      { status: 500 }
    );
  }
}
