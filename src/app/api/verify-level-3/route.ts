import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { flag } = body;

    if (!flag || typeof flag !== "string") {
      return NextResponse.json(
        { success: false, message: "Payload hasil dekripsi / flag tidak ditemukan." },
        { status: 400 }
      );
    }

    const cleanInput = flag.trim().toLowerCase();

    // Verification check for the final decrypted text:
    const isMatch =
      cleanInput.includes("cacapendek");

    if (isMatch) {
      return NextResponse.json({
        success: true,
        message: "BRANKAS TERBUKA PENUH! Semua tantangan telah kamu taklukkan.",
        victory: true,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message:
            "Teks tidak cocok dengan dekripsi brankas. Pastikan kamu menjalankan decryptor Fernet dengan benar.",
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
