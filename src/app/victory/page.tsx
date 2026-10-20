"use client";

import React, { useEffect, useState } from "react";
import RouteGuard from "@/components/RouteGuard";
import { useGame } from "@/context/GameContext";
import confetti from "canvas-confetti";
import {
  Trophy,
  Heart,
  Sparkles,
  Utensils,
  IceCream,
  Compass,
  Send,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Terminal,
} from "lucide-react";

export default function VictoryPage() {
  const { playSound, resetGame } = useGame();
  const [selectedReward, setSelectedReward] = useState<string | null>(null);

  useEffect(() => {
    playSound("victory");

    // Launch initial confetti bursts
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ["#ec4899", "#f43f5e", "#fbbf24"],
    });
    fire(0.2, {
      spread: 60,
      colors: ["#10b981", "#06b6d4", "#a855f7"],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ["#f43f5e", "#fda4af"],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });

    // Secondary interval for celebratory fireworks
    const interval = setInterval(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#f43f5e", "#ec4899", "#fbbf24", "#10b981"],
        zIndex: 9999,
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#f43f5e", "#ec4899", "#06b6d4", "#a855f7"],
        zIndex: 9999,
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [playSound]);

  const handleClaimWhatsApp = (type: "makan" | "eskrim" | "main") => {
    playSound("click");
    setSelectedReward(type);

    let message = "";
    if (type === "makan") {
      message =
        "Hai sayang! 🔓 Aku udah berhasil nembus semua level CTF buatanmu sampai tuntas! Sesuai janji reward di brankas, aku mau klaim hadiah: MAKAN ENAK bareng kamu ya! 🍜😋 Kapan kita makan?";
    } else if (type === "eskrim") {
      message =
        "Hai sayang! 🍦 Sistem brankas CTF kamu resmi aku jebol 100%! Sekarang waktunya nagih janji reward: JAJAN ES KRIM! Let's go! 🥰🍧";
    } else if (type === "main") {
      message =
        "Hai sayang! 🎡 Brankas rahasiamu berhasil aku retas! Hadiah yang aku pilih: JALAN-JALAN MAIN berdua! Kapan kita jalan? 🤩✨";
    }

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  const handleReplay = () => {
    playSound("click");
    if (confirm("Mulai ulang dari Level 1 untuk main lagi?")) {
      resetGame();
      window.location.href = "/";
    }
  };

  return (
    <RouteGuard requiredLevel="victory">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 flex-1 flex flex-col justify-center relative">
        {/* Ambient Romantic Cyber Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-pink-500/10 via-rose-500/10 to-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Victory Header Badge */}
        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-rose-950/80 to-pink-950/80 border border-rose-500/50 rounded-full text-rose-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-[0_0_20px_rgba(244,63,94,0.3)]">
            <Sparkles className="w-4 h-4 text-rose-400" />
            <span>MISSION ACCOMPLISHED // SYSTEM OVERRIDE 100%</span>
            <Sparkles className="w-4 h-4 text-rose-400" />
          </div>

          <div className="flex items-center justify-center gap-3 mb-3">
            <Trophy className="w-10 h-10 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)] animate-bounce" />
            <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-rose-400 to-pink-500 tracking-tight glow-pink">
              SELAMAT, HACKER KESAYANGAN!
            </h1>
            <Heart className="w-10 h-10 text-rose-500 fill-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.6)] animate-pulse" />
          </div>

          <p className="text-zinc-300 text-sm md:text-base max-w-xl mx-auto font-sans leading-relaxed">
            Semua firewall telah ditembus, bit LSB terbongkar, dan brankas Fernet AES resmi dibuka.
            Gelar <span className="text-rose-400 font-bold">Elite Cyber-Hacker</span> resmi milikmu!
          </p>
        </div>

        {/* Decrypted Vault Love Letter */}
        <div className="relative z-10 bg-gradient-to-b from-[#140b12] to-[#0d0914] border-2 border-rose-500/60 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(244,63,94,0.25)] mb-10">
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-rose-900/50 text-xs">
            <div className="flex items-center gap-2 text-rose-400 font-bold">
              <Terminal className="w-4 h-4" />
              <span>[DECRYPTED_PAYLOAD]: ISI BRANKAS RAHASIA</span>
            </div>
            <span className="flex items-center gap-1 text-emerald-400 font-mono text-[11px] bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
              <ShieldCheck className="w-3.5 h-3.5" /> STATUS: DECRYPTED
            </span>
          </div>

          <div className="space-y-4 font-sans text-sm md:text-base leading-relaxed text-zinc-200">
            <div className="flex items-center gap-2 text-rose-400 font-mono font-bold text-base md:text-lg">
              <span>ACCESS GRANTED! 🔓</span>
            </div>

            <p>
              Selamat sayang, kamu berhasil nembus pertahanan brankas ini! Udah valid lah ya sekarang
              gelar hacker-nya wkwk. Keren banget kamu bisa mecahin teka-tekinya sampai titik akhir
              (meskipun agak curiga nih pakai bantuan AI apa nggak 😜). Terlepas dari itu, aku jujur
              bangga banget ngeliat kamu bisa sampai sejauh ini.
            </p>

            <p className="text-rose-200 font-medium">
              Karena kamu udah berhasil nyelesaiin misinya, sekarang waktunya reward. Kamu bebas pilih
              mau hadiah apa: <strong className="text-yellow-300">makan enak</strong>,{" "}
              <strong className="text-cyan-300">jajan es krim</strong>, atau{" "}
              <strong className="text-emerald-300">jalan-jalan main</strong>? You name it, kasih tau
              aja ya.
            </p>

            <div className="pt-2 text-right">
              <span className="italic text-rose-400 font-semibold text-sm">
                — Once again, you did a great job and I&apos;m so proud of you babe! ❤️
              </span>
            </div>
          </div>
        </div>

        {/* Claim Rewards Section */}
        <div className="relative z-10 mb-10">
          <div className="text-center mb-6">
            <h2 className="text-lg md:text-xl font-bold text-white flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span>KLAIM REWARD KAMU SEKARANG</span>
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </h2>
            <p className="text-xs md:text-sm text-zinc-400 mt-1">
              Pilih salah satu hadiah di bawah ini untuk langsung kirim pesan WhatsApp ke aku:
            </p>
            {selectedReward && (
              <div className="mt-2 inline-block px-3 py-1 bg-emerald-950/80 border border-emerald-600 rounded text-xs text-emerald-300 font-mono">
                ✓ Pilihan {selectedReward.toUpperCase()} tersimpan! Menghubungkan ke WhatsApp...
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Reward 1: Makan Enak */}
            <div className="bg-zinc-900/80 border border-yellow-900/60 hover:border-yellow-500/80 rounded-xl p-5 flex flex-col justify-between transition-all hover:scale-[1.02] shadow-lg group">
              <div>
                <div className="w-10 h-10 rounded-lg bg-yellow-950/60 border border-yellow-700/50 flex items-center justify-center mb-3 text-yellow-400 group-hover:scale-110 transition-transform">
                  <Utensils className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base mb-1">Makan Enak 🍜</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  Dimsum, Sushi, Ramen, Steak, All You Can Eat, atau kuliner favorit yang lagi kamu
                  pengen.
                </p>
              </div>

              <button
                onClick={() => handleClaimWhatsApp("makan")}
                className="w-full py-2.5 px-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Klaim Makan Enak 💬</span>
              </button>
            </div>

            {/* Reward 2: Jajan Es Krim */}
            <div className="bg-zinc-900/80 border border-rose-900/60 hover:border-rose-500/80 rounded-xl p-5 flex flex-col justify-between transition-all hover:scale-[1.02] shadow-lg group">
              <div>
                <div className="w-10 h-10 rounded-lg bg-rose-950/60 border border-rose-700/50 flex items-center justify-center mb-3 text-rose-400 group-hover:scale-110 transition-transform">
                  <IceCream className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base mb-1">Jajan Es Krim 🍦</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  Gelato premium, Mixue, McFlurry, dessert manis, atau waffle dingin kesukaanmu.
                </p>
              </div>

              <button
                onClick={() => handleClaimWhatsApp("eskrim")}
                className="w-full py-2.5 px-3 bg-rose-500 hover:bg-rose-400 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(244,63,94,0.3)]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Klaim Jajan Es Krim 💬</span>
              </button>
            </div>

            {/* Reward 3: Jalan-Jalan / Main */}
            <div className="bg-zinc-900/80 border border-cyan-900/60 hover:border-cyan-500/80 rounded-xl p-5 flex flex-col justify-between transition-all hover:scale-[1.02] shadow-lg group">
              <div>
                <div className="w-10 h-10 rounded-lg bg-cyan-950/60 border border-cyan-700/50 flex items-center justify-center mb-3 text-cyan-400 group-hover:scale-110 transition-transform">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base mb-1">Jalan-Jalan / Main 🎡</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  Arcade time, bioskop date, museum date, jalan sore keliling kota, atau holiday trip.
                </p>
              </div>

              <button
                onClick={() => handleClaimWhatsApp("main")}
                className="w-full py-2.5 px-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Klaim Jalan-Jalan 💬</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hacker Stats & Replay Button */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-zinc-950/80 border border-zinc-800 rounded-xl text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>
              TOTAL MISSION: <strong className="text-emerald-400">2/2 COMPLETED</strong> | RANK:{" "}
              <strong className="text-yellow-400">ELITE CYBER-GIRLFRIEND ⭐</strong>
            </span>
          </div>

          <button
            onClick={handleReplay}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-500 text-zinc-300 rounded text-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Main Ulang CTF</span>
          </button>
        </div>
      </div>
    </RouteGuard>
  );
}
