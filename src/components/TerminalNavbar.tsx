"use client";

import React from "react";
import { Volume2, VolumeX, Shield, RotateCcw } from "lucide-react";
import { useGame } from "@/context/GameContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TerminalNavbar() {
  const { soundEnabled, toggleSound, level1Completed, level2Completed, resetGame, playSound } =
    useGame();
  const pathname = usePathname();

  const handleReset = () => {
    playSound("click");
    if (confirm("Reset ulang progres CTF dan mulai dari Level 1?")) {
      resetGame();
      window.location.href = "/";
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-emerald-950/80 bg-[#070a0f]/90 backdrop-blur-md px-4 py-3 text-xs font-mono">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Terminal Window Dots & Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          </div>
          <div className="h-4 w-px bg-zinc-800" />
          <Link
            href="/"
            onClick={() => playSound("click")}
            className="flex items-center gap-2 text-emerald-400 font-bold hover:text-emerald-300 transition-colors"
          >
            <Shield className="w-4 h-4 text-emerald-500" />
            <span className="tracking-wider">SECRET_VAULT://CTF-CHALLENGE</span>
          </Link>
        </div>

        {/* Level Progress Pills */}
        <div className="hidden sm:flex items-center gap-2">
          <div
            className={`px-2.5 py-1 rounded border text-[11px] transition-all ${
              pathname === "/"
                ? "bg-emerald-950/70 border-emerald-500/60 text-emerald-300 font-bold shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                : level1Completed
                ? "bg-zinc-900 border-zinc-700 text-emerald-500"
                : "bg-zinc-950 border-zinc-800 text-zinc-500"
            }`}
          >
            LVL 1: STEGANO {level1Completed && "✓"}
          </div>

          <span className="text-zinc-600">→</span>

          <div
            className={`px-2.5 py-1 rounded border text-[11px] transition-all ${
              pathname === "/level-2"
                ? "bg-cyan-950/70 border-cyan-500/60 text-cyan-300 font-bold shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                : level2Completed
                ? "bg-zinc-900 border-zinc-700 text-cyan-500"
                : "bg-zinc-950 border-zinc-800 text-zinc-500"
            }`}
          >
            LVL 2: FERNET-AES {level2Completed && "✓"}
          </div>

          <span className="text-zinc-600">→</span>

          <div
            className={`px-2.5 py-1 rounded border text-[11px] transition-all ${
              pathname === "/victory"
                ? "bg-pink-950/70 border-pink-500/60 text-pink-300 font-bold shadow-[0_0_10px_rgba(244,63,94,0.4)]"
                : level2Completed
                ? "bg-zinc-900 border-zinc-700 text-pink-400"
                : "bg-zinc-950 border-zinc-800 text-zinc-500"
            }`}
          >
            VICTORY 🏆
          </div>
        </div>

        {/* Action Controls: Sound & Reset */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            title={soundEnabled ? "Mute Hacker Sound" : "Enable Hacker Sound"}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-emerald-400 transition-colors"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="text-[10px] hidden md:inline">AUDIO: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                <span className="text-[10px] hidden md:inline">AUDIO: MUTED</span>
              </>
            )}
          </button>

          {(level1Completed || level2Completed) && (
            <button
              onClick={handleReset}
              title="Reset Progres"
              className="flex items-center gap-1 px-2 py-1 rounded border border-zinc-800 bg-zinc-900/60 hover:bg-red-950/40 hover:border-red-800/60 text-zinc-400 hover:text-red-400 transition-colors text-[11px]"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden md:inline">RESET</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
