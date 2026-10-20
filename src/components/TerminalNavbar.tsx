"use client";

import React, { useRef } from "react";
import { Volume2, VolumeX, RotateCcw, Check, Sparkles, Heart } from "lucide-react";
import { useGame } from "@/context/GameContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function DynamicIslandNavbar() {
  const islandRef = useRef<HTMLDivElement>(null);
  const {
    soundEnabled,
    toggleSound,
    level1Completed,
    level2Completed,
    level3Completed,
    resetGame,
    playSound,
  } = useGame();
  const pathname = usePathname();

  // Smooth entrance animation for the Dynamic Island (Must run before any early return)
  useGSAP(
    () => {
      if (pathname === "/" || !islandRef.current) return;

      gsap.fromTo(
        islandRef.current,
        { y: -30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          clearProps: "transform,opacity",
        }
      );
    },
    { scope: islandRef, dependencies: [pathname] }
  );

  // Hide Dynamic Island on landing page
  if (pathname === "/") {
    return null;
  }

  const handleReset = () => {
    playSound("click");
    if (confirm("Mulai ulang dari awal?")) {
      resetGame();
      window.location.href = "/";
    }
  };

  const getActiveStageName = () => {
    if (pathname === "/level-1") return "1. Foto";
    if (pathname === "/level-2") return "2. Hash";
    if (pathname === "/level-3") return "3. Berkas";
    if (pathname === "/victory") return "Brankas";
    return "";
  };

  return (
    <div
      ref={islandRef}
      className="fixed top-3.5 left-1/2 -translate-x-1/2 z-50 max-w-[calc(100vw-1.5rem)] w-auto font-sans"
    >
      <nav
        aria-label="Dynamic Island Navigation"
        className="relative group flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-slate-950/90 backdrop-blur-2xl border border-slate-800/90 shadow-[0_16px_36px_rgba(0,0,0,0.65)] hover:border-slate-700/80 transition-all duration-300"
      >
        {/* Left: Brand & Status Dot */}
        <Link
          href="/"
          onClick={() => playSound("click")}
          className="flex items-center gap-2 pl-1 pr-1.5 py-1 text-slate-300 hover:text-white transition-colors group/brand"
          title="Kembali ke halaman awal"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
          </span>
          <span className="font-semibold text-xs tracking-tight text-slate-200 hidden md:inline">
            Mini Hacking Game
          </span>
          <span className="text-[11px] font-mono text-indigo-400 md:hidden font-medium">
            {getActiveStageName()}
          </span>
        </Link>

        {/* Divider */}
        <div className="h-3.5 w-px bg-slate-800/80" aria-hidden="true" />

        {/* Center: Stage Step Pills */}
        <div className="flex items-center gap-1 text-xs">
          {/* Step 1: Foto */}
          <Link
            href="/level-1"
            onClick={() => playSound("click")}
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all flex items-center gap-1.5 ${
              pathname === "/level-1"
                ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-[0_0_12px_rgba(99,102,241,0.25)] font-semibold"
                : level1Completed
                ? "text-emerald-400 hover:bg-slate-900/60"
                : "text-slate-500 hover:text-slate-400"
            }`}
          >
            {level1Completed ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600 hidden sm:inline" />
            )}
            <span className="hidden sm:inline">1. Foto</span>
            <span className="sm:hidden">1</span>
          </Link>

          {/* Step 2: Hash */}
          <Link
            href={level1Completed ? "/level-2" : "#"}
            onClick={() => level1Completed && playSound("click")}
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all flex items-center gap-1.5 ${
              pathname === "/level-2"
                ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-[0_0_12px_rgba(99,102,241,0.25)] font-semibold"
                : level2Completed
                ? "text-emerald-400 hover:bg-slate-900/60"
                : level1Completed
                ? "text-slate-400 hover:text-slate-200"
                : "text-slate-600 cursor-not-allowed"
            }`}
          >
            {level2Completed ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600 hidden sm:inline" />
            )}
            <span className="hidden sm:inline">2. Hash</span>
            <span className="sm:hidden">2</span>
          </Link>

          {/* Step 3: Berkas */}
          <Link
            href={level2Completed ? "/level-3" : "#"}
            onClick={() => level2Completed && playSound("click")}
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all flex items-center gap-1.5 ${
              pathname === "/level-3"
                ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-[0_0_12px_rgba(99,102,241,0.25)] font-semibold"
                : level3Completed
                ? "text-emerald-400 hover:bg-slate-900/60"
                : level2Completed
                ? "text-slate-400 hover:text-slate-200"
                : "text-slate-600 cursor-not-allowed"
            }`}
          >
            {level3Completed ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600 hidden sm:inline" />
            )}
            <span className="hidden sm:inline">3. Berkas</span>
            <span className="sm:hidden">3</span>
          </Link>

          {/* Step 4: Hadiah */}
          <Link
            href={level3Completed ? "/victory" : "#"}
            onClick={() => level3Completed && playSound("click")}
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all flex items-center gap-1 ${
              pathname === "/victory"
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_12px_rgba(244,63,94,0.3)] font-semibold"
                : level3Completed
                ? "text-rose-400 hover:text-rose-300"
                : "text-slate-600 cursor-not-allowed"
            }`}
          >
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400/50" />
            <span className="hidden sm:inline">Hadiah</span>
          </Link>
        </div>

        {/* Divider */}
        <div className="h-3.5 w-px bg-slate-800/80" aria-hidden="true" />

        {/* Right: Quick Controls */}
        <div className="flex items-center gap-1">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={soundEnabled ? "Matikan suara efek" : "Nyalakan suara efek"}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-100 hover:bg-slate-900/80 active:scale-90 transition-all"
            title={soundEnabled ? "Efek suara aktif" : "Efek suara mati"}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-slate-300" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
            )}
          </button>

          {/* Reset / Replay */}
          {(level1Completed || level2Completed || level3Completed) && (
            <button
              type="button"
              onClick={handleReset}
              aria-label="Mulai ulang progress tantangan"
              className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-100 hover:bg-slate-900/80 active:scale-90 transition-all"
              title="Mulai ulang tantangan dari awal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
