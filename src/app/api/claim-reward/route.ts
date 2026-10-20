import { NextResponse } from "next/server";

const TARGET_PHONE_NUMBER = "6285869018682"; // 085869018682 in international format

const REWARD_MESSAGES: Record<string, string> = {
  makan:
    "Hai sayang! Aku sudah berhasil menyelesaikan semua tantangan CTF buatanmu. Sesuai janji reward di brankas, aku mau klaim hadiah: MAKAN ENAK bareng kamu ya! Kapan kita berangkat?",
  eskrim:
    "Hai sayang! Tantangan CTF kamu resmi selesai aku pecahkan. Sekarang waktunya nagih janji: JAJAN ES KRIM! Kapan kita jalan?",
  main:
    "Hai sayang! Teka-teki CTF kamu berhasil aku selesaikan sampai tuntas. Hadiah yang aku pilih: JALAN-JALAN MAIN berdua! Kapan kita berangkat?",
  request:
    "Hai sayang! Teka-teki CTF kamu berhasil aku selesaikan sampai tuntas. Untuk hadiahnya, aku mau REQUEST SENDIRI nih! Nanti aku kasih tahu detailnya ya hehe.",
};

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const rewardType = (body.reward || "makan").toLowerCase();

    let message = body.customMessage;

    if (!message) {
      if (rewardType === "request" && body.customText && body.customText.trim()) {
        message = `Hai sayang! Teka-teki CTF kamu berhasil aku selesaikan sampai tuntas. Untuk hadiahnya, aku mau REQUEST SENDIRI nih: "${body.customText.trim()}"! Bisa kan?`;
      } else {
        message = REWARD_MESSAGES[rewardType] || REWARD_MESSAGES.makan;
      }
    }

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${TARGET_PHONE_NUMBER}?text=${encodedText}`;

    return NextResponse.json({
      success: true,
      reward: rewardType,
      phoneNumber: TARGET_PHONE_NUMBER,
      message,
      whatsappUrl,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan saat memproses klaim hadiah." },
      { status: 500 }
    );
  }
}

// GET support for direct link redirection: /api/claim-reward?reward=request
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rewardType = (searchParams.get("reward") || "makan").toLowerCase();
  const customText = searchParams.get("text");

  let message = REWARD_MESSAGES[rewardType] || REWARD_MESSAGES.makan;
  if (rewardType === "request" && customText && customText.trim()) {
    message = `Hai sayang! Teka-teki CTF kamu berhasil aku selesaikan sampai tuntas. Untuk hadiahnya, aku mau REQUEST SENDIRI nih: "${customText.trim()}"! Bisa kan?`;
  }

  const encodedText = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${TARGET_PHONE_NUMBER}?text=${encodedText}`;

  return NextResponse.redirect(whatsappUrl, 307);
}
