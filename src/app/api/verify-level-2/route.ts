import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { word } = body;

    if (!word || typeof word !== "string") {
      return NextResponse.json(
        { success: false, message: "Payload kata sandi tidak ditemukan atau kosong." },
        { status: 400 }
      );
    }

    const cleanInput = word.trim().toLowerCase();

    // The target hash: a0095443fbfe1b3ebf4225636a1f86b8 (MD5)
    // Decodes from password.txt: "makan bergizi gratis"
    const validAnswers = ["makan bergizi gratis", "mbg"];

    if (validAnswers.includes(cleanInput)) {
      return NextResponse.json({
        success: true,
        message: "HASH TERPECAHKAN! Kata sandi cocok dengan hash target. Pintu Level 3 terbuka.",
        level: 3,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message:
            "Kata sandi belum cocok. Pastikan hash MD5 dari kata yang kamu masukkan menghasilkan a0095443fbfe1b3ebf4225636a1f86b8.",
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
