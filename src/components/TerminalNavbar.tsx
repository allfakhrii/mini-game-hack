"use client";

import React from "react";
import { Volume2, VolumeX, RotateCcw, Check } from "lucide-react";
import { useGame } from "@/context/GameContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TerminalNavbar() {
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

  const handleReset = () => {
    playSound("click");
    if (confirm("Mulai ulang dari awal?")) {
      resetGame();
      window.location.href = "/";
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-800/80 bg-[#090d16]/85 backdrop-blur-md px-4 py-3 text-xs font-sans">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        {/* Brand / Title */}
        <Link
          href="/"
          onClick={() => playSound("click")}
          className="font-medium text-slate-200 hover:text-white transition-colors flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />
          <span className="tracking-tight text-sm font-semibold">Teka-Teki Buat Caca</span>
        </Link>

        {/* Level Steps */}
        <nav aria-label="Progress tantangan" className="flex items-center gap-1 sm:gap-2">
          <Link
            href={pathname === "/" ? "#" : "/level-1"}
            className={`px-2 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
              pathname === "/level-1"
                ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/30"
                : level1Completed
                ? "text-emerald-400 hover:text-emerald-300"
                : "text-slate-500"
            }`}
          >
            {level1Completed && <Check className="w-3.5 h-3.5" />}
            <span>1. Foto</span>
          </Link>

          <span className="text-slate-700">/</span>

          <Link
            href={level1Completed ? "/level-2" : "#"}
            className={`px-2 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
              pathname === "/level-2"
                ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/30"
                : level2Completed
                ? "text-emerald-400 hover:text-emerald-300"
                : "text-slate-500"
            }`}
          >
            {level2Completed && <Check className="w-3.5 h-3.5" />}
            <span>2. Hash</span>
          </Link>

          <span className="text-slate-700">/</span>

          <Link
            href={level2Completed ? "/level-3" : "#"}
            className={`px-2 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
              pathname === "/level-3"
                ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/30"
                : level3Completed
                ? "text-emerald-400 hover:text-emerald-300"
                : "text-slate-500"
            }`}
          >
            {level3Completed && <Check className="w-3.5 h-3.5" />}
            <span>3. Berkas</span>
          </Link>

          <span className="text-slate-700">/</span>

          <Link
            href={level3Completed ? "/victory" : "#"}
            className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
              pathname === "/victory"
                ? "bg-rose-500/10 text-rose-300 border border-rose-500/30"
                : level3Completed
                ? "text-rose-400 hover:text-rose-300"
                : "text-slate-500"
            }`}
          >
            <span>Hadiah</span>
          </Link>
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            aria-label={soundEnabled ? "Matikan suara efek" : "Nyalakan suara efek"}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-slate-300" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {(level1Completed || level2Completed || level3Completed) && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ulangi</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
