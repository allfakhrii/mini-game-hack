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
          <span>Mini Games Khusus Buat Caca</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        </div>
      </div>

      {/* Main Headline */}
      <h1 className="hero-title text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100 max-w-2xl mx-auto leading-tight sm:leading-tight">
        Brankas Ini Sengaja Aku Bikin Khusus Buat Kamu, Caca.
      </h1>

      {/* Subtitle / Narrative */}
      <p className="hero-desc text-slate-400 text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed">
        Di web ini ada 3 level teka-teki keamanan siber yang harus kamu pecahkan satu per satu.
        Setiap level menyimpan petunjuk untuk membuka brankas rahasia di akhir. Kalau kamu berhasil
        menembus semuanya, kamu berhak klaim hadiah langsung ke aku. Siap, sayang?
      </p>

      {/* 3 Mission Cards Preview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-10 text-left">
        {/* Stage 1 */}
        <div className="mission-card bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-sm hover:border-slate-700 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
            <Eye className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider block mb-1">
            Level 01
          </span>
          <h2 className="text-slate-200 font-semibold text-sm mb-1.5">
            Steganografi Foto
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Aku menyembunyikan pesan rahasia di dalam piksel foto tanpa mengubah tampilannya. Coba
            temukan pesan itu.
          </p>
        </div>

        {/* Stage 2 */}
        <div className="mission-card bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-sm hover:border-slate-700 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
            <Binary className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider block mb-1">
            Level 02
          </span>
          <h2 className="text-slate-200 font-semibold text-sm mb-1.5">
            Hash Cracking
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Sandi target aku kunci pakai rumus satu arah MD5. Gunakan script dan daftar kata yang aku
            sediakan untuk membongkarnya.
          </p>
        </div>

        {/* Stage 3 */}
        <div className="mission-card bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-sm hover:border-slate-700 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
            <Lock className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider block mb-1">
            Level 03
          </span>
          <h2 className="text-slate-200 font-semibold text-sm mb-1.5">
            Kriptografi Fernet AES
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Dokumen rahasia yang aku kunci pakai cipher AES-128. Buka kuncinya menggunakan kunci
            simetris yang sudah aku bocorkan.
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
          Tenang aja, di setiap level aku sudah siapin petunjuk script Python yang bisa kamu pakai.
        </p>
      </div>
    </div>
  );
}
