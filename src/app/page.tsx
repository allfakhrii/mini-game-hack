"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useGame } from "@/context/GameContext";
import GlitchTransition from "@/components/GlitchTransition";
import {
  Download,
  Terminal,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Code2,
  HelpCircle,
  Eye,
  FileSearch,
} from "lucide-react";

export default function Level1Page() {
  const { verifyLevel1, level1Completed, playSound } = useGame();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    playSound("click");

    const result = await verifyLevel1(password);
    setLoading(false);

    if (result.success) {
      setSuccessMessage(result.message);
    } else {
      setErrorMessage(result.message);
    }
  };

  const handleNextLevel = () => {
    playSound("glitch");
    setIsTransitioning(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 flex-1 flex flex-col justify-center">
      {isTransitioning && (
        <GlitchTransition
          title="BYPASSING KERNEL MEMORY // HEADING TO LEVEL 2"
          nextRoute="/level-2"
        />
      )}

      {/* Top Banner / System Log */}
      <div className="flex items-center justify-between border-b border-emerald-900/60 pb-3 mb-8 text-xs text-emerald-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-500 animate-pulse" />
          <span className="tracking-widest">[MISSION 01]: PROTOKOL STEGANOGRAFI</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-500">
          <span>SECURITY LEVEL: NORMAL</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping" />
        </div>
      </div>

      {/* Mission Title */}
      <div className="text-center mb-8">
        <div className="inline-block px-3 py-1 bg-emerald-950/60 border border-emerald-700/50 rounded-full text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
          Level 1: Pintu Masuk Brankas
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight glow-green">
          Bongkar Pesan Tersembunyi (LSB)
        </h1>
        <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-2xl mx-auto leading-relaxed">
          Seseorang telah menyembunyikan sandi rahasia di dalam piksel foto ini.
          Unduh gambar target, bedah menggunakan terminal, dan temukan kuncinya!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left: Image Card & Download */}
        <div className="md:col-span-6 bg-zinc-900/70 border border-zinc-800 rounded-xl p-5 shadow-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-zinc-400 pb-3 mb-3 border-b border-zinc-800">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <FileSearch className="w-3.5 h-3.5" /> TARGET: stegano.png
            </span>
            <span className="bg-zinc-800 px-2 py-0.5 rounded text-[10px] text-zinc-400">
              11.5 MB // PNG
            </span>
          </div>

          {/* Photo Container */}
          <div className="relative rounded-lg overflow-hidden border border-zinc-800 bg-black aspect-[4/3] flex items-center justify-center">
            <Image
              src="/stegano.png"
              alt="Target Steganografi"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-100"
              sizes="(max-width: 768px) 100vw, 500px"
              priority
            />
            {/* Visual reticle HUD */}
            <div className="absolute inset-0 border border-emerald-500/20 pointer-events-none flex flex-col justify-between p-2">
              <div className="flex justify-between text-[9px] text-emerald-500/70">
                <span>[SCANNER_ACTIVE]</span>
                <span>RGB_CHANNEL: 24-BIT</span>
              </div>
              <div className="flex justify-between text-[9px] text-emerald-500/70">
                <span>LSB_ENCODED</span>
                <span>TARGET_LOCKED</span>
              </div>
            </div>
          </div>

          {/* Action Download Button */}
          <div className="mt-4 flex flex-col gap-2">
            <a
              href="/stegano.png"
              download="stegano.png"
              onClick={() => playSound("click")}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-black font-bold rounded-lg text-xs md:text-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Foto Target (stegano.png)</span>
            </a>
            <p className="text-[11px] text-zinc-500 text-center">
              ⚠️ Penting: Jangan re-compress atau screenshot agar bit LSB tidak rusak!
            </p>
          </div>
        </div>

        {/* Right: Insight & Terminal Input */}
        <div className="md:col-span-6 flex flex-col gap-6">
          {/* Steganography Insight Box */}
          <div className="bg-[#0b1017] border border-zinc-800 rounded-xl p-5 text-xs text-zinc-300 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold border-b border-zinc-800 pb-2">
              <Eye className="w-4 h-4 text-emerald-500" />
              <span>INSIGHT TEKNIS: STEGANOGRAFI LSB</span>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              <strong className="text-emerald-300">Steganografi</strong> adalah teknik
              menyembunyikan informasi rahasia ke dalam berkas media (seperti gambar) tanpa mengubah
              tampilan luarnya secara kasat mata.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Metode <strong className="text-emerald-300">LSB (Least Significant Bit)</strong>{" "}
              mengubah bit terendah pada komponen warna merah, hijau, dan biru (RGB) di setiap
              piksel. Perubahan nilai 1-bit ini tidak terdeteksi oleh mata manusia, namun script
              Python dapat membaca kembali runtunan bit tersebut menjadi string password asli!
            </p>
          </div>

          {/* Terminal Input Form */}
          <div className="bg-black/80 border border-emerald-900/80 rounded-xl p-5 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
            <div className="flex items-center justify-between text-xs text-emerald-400 font-mono pb-3 mb-3 border-b border-zinc-900">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-500" />
                <span>TERMINAL://VALIDASI_LSB</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  playSound("click");
                  setShowHint(!showHint);
                }}
                className="text-[11px] text-zinc-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
              >
                <HelpCircle className="w-3 h-3" />
                <span>{showHint ? "Tutup Petunjuk" : "Petunjuk Python"}</span>
              </button>
            </div>

            {/* Hint Box (Collapsible) */}
            {showHint && (
              <div className="mb-4 p-3 bg-zinc-950 border border-zinc-800 rounded text-[11px] font-mono text-zinc-300 space-y-2">
                <div className="flex items-center gap-1.5 text-yellow-400 font-semibold">
                  <Code2 className="w-3.5 h-3.5" /> Cheat Sheet Terminal:
                </div>
                <div className="bg-black p-2 rounded border border-zinc-900 text-emerald-400 select-all overflow-x-auto">
                  <code>pip install stegano</code>
                  <br />
                  <code>
                    python -c &quot;from stegano import lsb; print(lsb.reveal(&apos;stegano.png&apos;))&quot;
                  </code>
                </div>
                <p className="text-[10px] text-zinc-500">
                  Jalankan perintah di atas di folder tempat kamu menyimpan foto tadi.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-zinc-400 font-mono mb-1.5">
                  root@ctf-target:~# ./masukkan_sandi_lsb
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ketik password hasil decode di sini..."
                    className="w-full bg-zinc-950 border border-zinc-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg px-4 py-2.5 text-sm text-emerald-300 font-mono placeholder:text-zinc-600 outline-none transition-all"
                    disabled={loading || level1Completed}
                  />
                  <span className="absolute right-3 top-3 text-emerald-500/70 text-xs animate-terminal-blink pointer-events-none">
                    _
                  </span>
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="flex items-center gap-2 p-3 bg-red-950/50 border border-red-700/60 rounded text-xs text-red-400 font-mono animate-shake">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 text-red-500" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Success Message */}
              {(successMessage || level1Completed) && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-3 bg-emerald-950/50 border border-emerald-600/60 rounded text-xs text-emerald-300 font-mono">
                    <ShieldCheck className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                    <span>
                      {successMessage || "Akses Level 1 sudah diverifikasi! Sandi cocok."}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextLevel}
                    className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-extrabold rounded-lg text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)]"
                  >
                    <span>AKSES LEVEL 2: JANTUNG PERTAHANAN</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Submit Button (if not completed) */}
              {!level1Completed && (
                <button
                  type="submit"
                  disabled={loading || !password.trim()}
                  className="w-full py-2.5 px-4 bg-zinc-800 hover:bg-emerald-600 hover:text-black text-zinc-200 font-bold rounded-lg text-xs md:text-sm font-mono transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>MEMERIKSA HASH BIT...</span>
                  ) : (
                    <>
                      <span>[EXECUTE] VERIFIKASI SANDI</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
