"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/context/GameContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Eye, Binary, Lock, ArrowRight, Shield, Sparkles } from "lucide-react";

export default function StartPage() {
  const router = useRouter();
  const container = useRef<HTMLDivElement>(null);
  const { playSound } = useGame();

  // Buttery Smooth GSAP Entrance Animation
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", {
        y: -15,
        opacity: 0,
        duration: 0.6,
      })
        .from(
          ".hero-title",
          {
            y: 25,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.3"
        )
        .from(
          ".hero-desc",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.4"
        )
        .from(
          ".mission-card",
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.12,
          },
          "-=0.3"
        )
        .from(
          ".cta-section",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.2"
        );
    },
    { scope: container }
  );

  const handleStartMission = () => {
    playSound("click");

    // Smooth exit animation before page navigation
    gsap.to(container.current, {
      y: -20,
      opacity: 0,
      duration: 0.45,
      ease: "power2.in",
      onComplete: () => {
        router.push("/level-1");
      },
    });
  };

  return (
    <div
      ref={container}
      className="max-w-4xl mx-auto px-4 py-12 sm:py-20 flex-1 flex flex-col justify-center font-sans text-center"
    >
      {/* Top Badge */}
      <div className="hero-badge mb-5 flex justify-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-medium">
          <Shield className="w-3.5 h-3.5 text-indigo-400" />
          <span>Misi Khusus: Secret Vault Challenge</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        </div>
      </div>

      {/* Main Headline */}
      <h1 className="hero-title text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100 max-w-2xl mx-auto leading-tight sm:leading-tight">
        Bisakah Kamu Membuka Brankas Rahasia Ini?
      </h1>

      {/* Subtitle / Narrative */}
      <p className="hero-desc text-slate-400 text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed">
        Sebuah teka-teki keamanan siber interaktif yang dirancang khusus untuk menguji ketelitian
        dan kemampuan decoding-mu. Pecahkan tiga lapis pertahanan untuk membuka pesan rahasia dan
        mengklaim hadiahmu.
      </p>

      {/* 3 Mission Cards Preview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-10 text-left">
        {/* Stage 1 */}
        <div className="mission-card bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-sm hover:border-slate-700 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
            <Eye className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider block mb-1">
            Tahap 01
          </span>
          <h2 className="text-slate-200 font-semibold text-sm mb-1.5">
            Steganografi Citra
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Membongkar pesan biner yang disembunyikan di balik piksel foto tanpa merusak
            tampilannya.
          </p>
        </div>

        {/* Stage 2 */}
        <div className="mission-card bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-sm hover:border-slate-700 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
            <Binary className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider block mb-1">
            Tahap 02
          </span>
          <h2 className="text-slate-200 font-semibold text-sm mb-1.5">
            Hash Cracking
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Menembus sidik jari digital satu arah MD5 menggunakan teknik serangan kamus (Dictionary
            Attack).
          </p>
        </div>

        {/* Stage 3 */}
        <div className="mission-card bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-sm hover:border-slate-700 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
            <Lock className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider block mb-1">
            Tahap 03
          </span>
          <h2 className="text-slate-200 font-semibold text-sm mb-1.5">
            Kriptografi Fernet AES
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Mendekripsi berkas berstandar militer AES-128 untuk membuka surat rahasia dan hadiah
            akhir.
          </p>
        </div>
      </div>

      {/* Start Button CTA */}
      <div className="cta-section flex flex-col items-center justify-center gap-3">
        <button
          onClick={handleStartMission}
          className="group px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl transition-all duration-300 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 flex items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 active:scale-95"
        >
          <span>Mulai Tantangan Sekarang</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-xs text-slate-500 mt-2">
          Siapkan terminal dan Python-mu. Permainan dimulai dari Level 1.
        </p>
      </div>
    </div>
  );
}
