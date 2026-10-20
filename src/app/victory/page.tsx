"use client";

import React, { useEffect, useRef, useState } from "react";
import RouteGuard from "@/components/RouteGuard";
import { useGame } from "@/context/GameContext";
import confetti from "canvas-confetti";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Utensils,
  IceCream,
  Compass,
  Sparkles,
  MessageCircle,
  RotateCcw,
  CheckCircle2,
  Heart,
  Send,
} from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";
import ScrambleText from "@/components/ScrambleText";

export default function VictoryPage() {
  const container = useRef<HTMLDivElement>(null);
  const { playSound, resetGame } = useGame();
  const [selectedReward, setSelectedReward] = useState<string | null>(null);
  const [customText, setCustomText] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Smooth GSAP Entrance Animation
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".anim-header", {
        y: 20,
        opacity: 0,
        duration: 0.7,
      })
        .from(
          ".anim-letter",
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.35"
        )
        .from(
          ".anim-reward-heading",
          {
            y: 15,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.3"
        )
        .from(
          ".anim-reward-card",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.09,
          },
          "-=0.2"
        );
    },
    { scope: container }
  );

  useEffect(() => {
    playSound("victory");

    // Gentle confetti celebration
    const count = 120;
    confetti({
      origin: { y: 0.6 },
      zIndex: 9999,
      particleCount: count,
      spread: 70,
      colors: ["#f43f5e", "#ec4899", "#818cf8", "#38bdf8"],
    });
  }, [playSound]);

  const handleClaimWhatsApp = async (
    type: "makan" | "eskrim" | "main" | "request",
    customInputText?: string
  ) => {
    playSound("click");
    setSelectedReward(type);

    try {
      const res = await fetch("/api/claim-reward", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reward: type,
          customText: customInputText || customText,
        }),
      });
      const data = await res.json();

      if (data.whatsappUrl) {
        window.open(data.whatsappUrl, "_blank");
        return;
      }
    } catch {
      // Fallback direct URL if fetch fails
    }

    const TARGET_PHONE = "6285869018682";
    let message = "";
    if (type === "makan") {
      message =
        "Hai sayang! Aku sudah berhasil menyelesaikan semua tantangan CTF buatanmu. Sesuai janji reward di brankas, aku mau klaim hadiah: MAKAN ENAK bareng kamu ya! Kapan kita berangkat?";
    } else if (type === "eskrim") {
      message =
        "Hai sayang! Tantangan CTF kamu resmi selesai aku pecahkan. Sekarang waktunya nagih janji: JAJAN ES KRIM! Kapan kita jalan?";
    } else if (type === "main") {
      message =
        "Hai sayang! Teka-teki CTF kamu berhasil aku selesaikan sampai tuntas. Hadiah yang aku pilih: JALAN-JALAN MAIN berdua! Kapan kita berangkat?";
    } else if (type === "request") {
      const trimmed = (customInputText || customText).trim();
      if (trimmed) {
        message = `Hai sayang! Teka-teki CTF kamu berhasil aku selesaikan sampai tuntas. Untuk hadiahnya, aku mau REQUEST SENDIRI nih: "${trimmed}"! Bisa kan?`;
      } else {
        message =
          "Hai sayang! Teka-teki CTF kamu berhasil aku selesaikan sampai tuntas. Untuk hadiahnya, aku mau REQUEST SENDIRI nih! Nanti aku kasih tahu detailnya ya hehe.";
      }
    }

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${TARGET_PHONE}?text=${encoded}`, "_blank");
  };

  const handleReplay = () => {
    playSound("click");
    if (confirm("Mulai ulang dari awal?")) {
      resetGame();
      window.location.href = "/";
    }
  };

  return (
    <RouteGuard requiredLevel="victory">
      <div
        ref={container}
        className="max-w-3xl mx-auto px-4 py-8 sm:py-12 flex-1 flex flex-col justify-center font-sans"
      >
        {/* Header */}
        <div className="text-center mb-8 anim-header">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 text-rose-300 rounded-full text-xs font-medium mb-3">
            <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
            <ScrambleText text="Spesial Buat Caca" speed={25} />
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-100">
            Keren banget, kamu berhasil Caca!
          </h1>
          <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto leading-relaxed">
            Semua pertahanan brankas berhasil kamu tembus. Sekarang waktunya kamu nagih janji hadiah ke aku.
          </p>
        </div>

        {/* Decrypted Letter Card with Spotlight */}
        <SpotlightCard className="anim-letter bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-sm mb-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 text-xs">
            <span className="font-semibold text-slate-300">Pesan dari Dalam Brankas</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Terdekripsi</span>
            </span>
          </div>

          <div className="space-y-3.5 text-sm text-slate-200 leading-relaxed">
            <p className="font-mono text-xs font-semibold text-indigo-300 tracking-wider">
              <ScrambleText text="ACCESS GRANTED!" speed={25} />
            </p>

            <p>
              Selamat sayang, kamu berhasil nembus pertahanan brankas ini! Udah valid lah ya sekarang
              gelar hacker-nya wkwk. Keren banget kamu bisa mecahin teka-tekinya sampai titik akhir
              (meskipun agak curiga nih kamu pakai bantuan AI apa nggak hehe). Terlepas dari itu, aku
              jujur bangga banget sama kamu.
            </p>

            <p className="text-slate-300">
              Karena kamu udah berhasil nyelesaiin misinya, sekarang waktunya reward. Kamu bebas
              pilih mau hadiah apa: <strong>makan enak</strong>, <strong>jajan es krim</strong>,{" "}
              <strong>jalan-jalan main</strong>, atau <strong>request sendiri</strong>? You name it,
              kasih tau aja ya.
            </p>

            <p className="pt-2 text-right text-xs text-rose-300 font-medium">
              Once again, you did a great job and I&apos;m so proud of you, Caca!
            </p>
          </div>
        </SpotlightCard>

        {/* Rewards Section */}
        <div className="space-y-4 mb-8">
          <div className="anim-reward-heading">
            <h2 className="text-base font-semibold text-slate-100">Klaim Hadiah Kamu</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Pilih salah satu reward di bawah ini untuk langsung kirim pesan WhatsApp ke aku:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* 1. Makan Enak */}
            <SpotlightCard className="anim-reward-card bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 hover:-translate-y-1">
              <div>
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2.5">
                  <Utensils className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-slate-200 text-xs sm:text-sm mb-1">Makan Enak</h3>
                <p className="text-[11px] text-slate-400 mb-3 leading-normal">
                  Kulineran makanan favoritmu.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowCustomInput(false);
                  handleClaimWhatsApp("makan");
                }}
                className="w-full py-2 px-2.5 bg-slate-800 hover:bg-slate-700 active:scale-98 text-slate-100 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Klaim Makan</span>
              </button>
            </SpotlightCard>

            {/* 2. Jajan Es Krim */}
            <SpotlightCard className="anim-reward-card bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 hover:-translate-y-1">
              <div>
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center mb-2.5">
                  <IceCream className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-slate-200 text-xs sm:text-sm mb-1">Jajan Es Krim</h3>
                <p className="text-[11px] text-slate-400 mb-3 leading-normal">
                  Gelato, McFlurry, atau dessert manis.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowCustomInput(false);
                  handleClaimWhatsApp("eskrim");
                }}
                className="w-full py-2 px-2.5 bg-slate-800 hover:bg-slate-700 active:scale-98 text-slate-100 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Klaim Es Krim</span>
              </button>
            </SpotlightCard>

            {/* 3. Jalan-Jalan */}
            <SpotlightCard className="anim-reward-card bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 hover:-translate-y-1">
              <div>
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-2.5">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-slate-200 text-xs sm:text-sm mb-1">Jalan-Jalan</h3>
                <p className="text-[11px] text-slate-400 mb-3 leading-normal">
                  Bioskop, arcade date, atau jalan sore.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowCustomInput(false);
                  handleClaimWhatsApp("main");
                }}
                className="w-full py-2 px-2.5 bg-slate-800 hover:bg-slate-700 active:scale-98 text-slate-100 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Klaim Jalan</span>
              </button>
            </SpotlightCard>

            {/* 4. Request Sendiri */}
            <SpotlightCard
              className={`anim-reward-card bg-slate-900/60 border rounded-xl p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                showCustomInput ? "border-purple-500/50 bg-purple-950/20" : "border-slate-800 hover:border-slate-700"
              }`}
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-2.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-slate-200 text-xs sm:text-sm mb-1">Request Sendiri</h3>
                <p className="text-[11px] text-slate-400 mb-3 leading-normal">
                  Punya ide lain? Tulis sesukamu!
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowCustomInput(!showCustomInput);
                  setSelectedReward("request");
                  playSound("click");
                }}
                className="w-full py-2 px-2.5 bg-purple-600/80 hover:bg-purple-600 active:scale-98 text-white text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-500"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{showCustomInput ? "Tutup Form" : "Pilih Request"}</span>
              </button>
            </SpotlightCard>
          </div>

          {/* Custom Request Input Box (Expandable) */}
          {showCustomInput && (
            <div className="p-4 bg-slate-900/80 border border-purple-500/30 rounded-xl space-y-2.5 animate-fade-in shadow-sm">
              <label
                htmlFor="custom-request-input"
                className="block text-xs font-medium text-slate-200"
              >
                Tulis permintaan hadiahmu (bebas request apa aja ya!):
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  id="custom-request-input"
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Contoh: Dimasakin makan malam, beliin buku, nonton konser, dll..."
                  className="flex-1 bg-slate-950 border border-slate-700 focus:border-purple-500 rounded-lg px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-500 outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleClaimWhatsApp("request", customText);
                    }
                  }}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => handleClaimWhatsApp("request", customText)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-500"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim ke WA</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                Pesan ini akan otomatis terisi di chat WhatsApp kamu ke aku.
              </p>
            </div>
          )}

          {selectedReward && (
            <p className="text-xs text-slate-400 text-center">
              Pilihan tersimpan. WhatsApp dibuka di tab baru.
            </p>
          )}
        </div>

        {/* Footer Action */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs text-slate-500">
          <span>Tantangan 3/3 Selesai</span>
          <button
            type="button"
            onClick={handleReplay}
            className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Main Ulang</span>
          </button>
        </div>
      </div>
    </RouteGuard>
  );
}
