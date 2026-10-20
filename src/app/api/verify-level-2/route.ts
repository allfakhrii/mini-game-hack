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

    // Verification check:
    // 1. Matches or includes "access granted"
    // 2. Matches or includes "selamat sayang"
    // 3. Matches or includes "nembus pertahanan" or "gelar hacker"
    // 4. Matches blueprint flag "ctf{hacker_sejati_telah_lahir}" or "hacker_sejati"
    // 5. Matches "you did a great job" or "proud of you"
    const isMatch =
      cleanInput.includes("access granted") ||
      cleanInput.includes("selamat sayang") ||
      cleanInput.includes("nembus pertahanan") ||
      cleanInput.includes("gelar hacker") ||
      cleanInput.includes("ctf{hacker_sejati_telah_lahir}") ||
      cleanInput.includes("hacker_sejati") ||
      cleanInput.includes("proud of you") ||
      cleanInput.includes("babe");

    if (isMatch) {
      return NextResponse.json({
        success: true,
        message: "ROOT PRIVILEGES OBTAINED! Brankas terenkripsi telah terbuka 100%.",
        victory: true,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message:
            "AKSES DITOLAK! Teks tidak cocok dengan dekripsi brankas. Pastikan Anda menjalankan decryptor Fernet dengan benar.",
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
