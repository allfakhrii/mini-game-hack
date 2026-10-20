"use client";

import React, { useEffect, useState } from "react";
import RouteGuard from "@/components/RouteGuard";
import { useGame } from "@/context/GameContext";
import confetti from "canvas-confetti";
import {
  Utensils,
  IceCream,
  Compass,
  MessageCircle,
  RotateCcw,
  CheckCircle2,
  Heart,
} from "lucide-react";

export default function VictoryPage() {
  const { playSound, resetGame } = useGame();
  const [selectedReward, setSelectedReward] = useState<string | null>(null);

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

  const handleClaimWhatsApp = async (type: "makan" | "eskrim" | "main") => {
    playSound("click");
    setSelectedReward(type);

    try {
      const res = await fetch("/api/claim-reward", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reward: type }),
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
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12 flex-1 flex flex-col justify-center font-sans">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 text-rose-300 rounded-full text-xs font-medium mb-3">
            <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
            <span>Semua Tantangan Selesai</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-100">
            Keren banget, kamu berhasil!
          </h1>
          <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto leading-relaxed">
            Foto sudah terbongkar, berkas sudah terdekripsi, dan isi brankas resmi terbuka buat kamu.
          </p>
        </div>

        {/* Decrypted Letter Card */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-sm mb-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 text-xs">
            <span className="font-semibold text-slate-300">Pesan dari Dalam Brankas</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Terdekripsi</span>
            </span>
          </div>

          <div className="space-y-3.5 text-sm text-slate-200 leading-relaxed">
            <p className="font-mono text-xs font-semibold text-indigo-300">
              ACCESS GRANTED!
            </p>

            <p>
              Selamat sayang, kamu berhasil nembus pertahanan brankas ini! Udah valid lah ya sekarang
              gelar hacker-nya wkwk. Keren banget kamu bisa mecahin teka-tekinya sampai titik akhir
              (meskipun agak curiga nih pakai bantuan AI apa nggak). Terlepas dari itu, aku jujur
              bangga banget ngeliat kamu bisa sampai sejauh ini.
            </p>

            <p className="text-slate-300">
              Karena kamu udah berhasil nyelesaiin misinya, sekarang waktunya reward. Kamu bebas
              pilih mau hadiah apa: <strong>makan enak</strong>, <strong>jajan es krim</strong>, atau{" "}
              <strong>jalan-jalan main</strong>? You name it, kasih tau aja ya.
            </p>

            <p className="pt-2 text-right text-xs text-rose-300 font-medium">
              Once again, you did a great job and I&apos;m so proud of you babe!
            </p>
          </div>
        </div>

        {/* Rewards Section */}
        <div className="space-y-4 mb-8">
          <div>
            <h2 className="text-base font-semibold text-slate-100">Klaim Hadiah Kamu</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Pilih salah satu reward di bawah ini untuk langsung kirim pesan WhatsApp ke aku:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Makan Enak */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors">
              <div>
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                  <Utensils className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-slate-200 text-sm mb-1">Makan Enak</h3>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  Dimsum, Sushi, Ramen, All-You-Can-Eat, atau makanan favoritmu.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleClaimWhatsApp("makan")}
                className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Klaim Makan</span>
              </button>
            </div>

            {/* Jajan Es Krim */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors">
              <div>
                <div className="w-9 h-9 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center mb-3">
                  <IceCream className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-slate-200 text-sm mb-1">Jajan Es Krim</h3>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  Gelato, Mixue, McFlurry, dessert manis, atau waffle dingin.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleClaimWhatsApp("eskrim")}
                className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Klaim Es Krim</span>
              </button>
            </div>

            {/* Jalan-Jalan */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors">
              <div>
                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-slate-200 text-sm mb-1">Jalan-Jalan</h3>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  Arcade, nonton bioskop, museum date, atau jalan sore berdua.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleClaimWhatsApp("main")}
                className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Klaim Jalan</span>
              </button>
            </div>
          </div>

          {selectedReward && (
            <p className="text-xs text-slate-400 text-center">
              Pilihan tersimpan. WhatsApp dibuka di tab baru.
            </p>
          )}
        </div>

        {/* Footer Action */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs text-slate-500">
          <span>Tantangan 2/2 Selesai</span>
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
