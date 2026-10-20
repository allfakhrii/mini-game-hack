"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useGame } from "@/context/GameContext";
import GlitchTransition from "@/components/GlitchTransition";
import {
  Download,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Code2,
  ChevronDown,
  ChevronUp,
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
      setSuccessMessage("Sandi benar! Pintu ke tantangan berikutnya terbuka.");
    } else {
      setErrorMessage("Sandi belum cocok. Coba cek lagi hasil pembacaan LSB di gambarmu.");
    }
  };

  const handleNextLevel = () => {
    playSound("click");
    setIsTransitioning(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12 flex-1 flex flex-col justify-center font-sans">
      {isTransitioning && (
        <GlitchTransition title="Sandi Diterima" nextRoute="/level-2" />
      )}

      {/* Intro Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-3">
          Tantangan 1 dari 2
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100">
          Ada pesan rahasia di foto ini
        </h1>
        <p className="text-slate-400 text-sm mt-2 leading-relaxed">
          Kelihatannya seperti foto biasa, tapi ada teks tersembunyi yang disisipkan ke dalam
          piksel gambar dengan teknik LSB (Least Significant Bit). Unduh fotonya dan temukan
          pesannya.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6">
        {/* Photo Display */}
        <div className="space-y-3">
          <div className="relative rounded-xl overflow-hidden bg-slate-950 aspect-[4/3] w-full border border-slate-800/80">
            <Image
              src="/stegano.png"
              alt="Foto tantangan steganografi"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
              priority
            />
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
            <div className="text-xs text-slate-400">
              Format: <span className="text-slate-300 font-medium">stegano.png</span> (11.5 MB)
            </div>

            <a
              href="/stegano.png"
              download="stegano.png"
              onClick={() => playSound("click")}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Foto Asli</span>
            </a>
          </div>
        </div>

        {/* Python Helper Box */}
        <div className="border border-slate-800/90 rounded-xl bg-slate-950/60 overflow-hidden text-xs">
          <button
            type="button"
            onClick={() => {
              playSound("click");
              setShowHint(!showHint);
            }}
            className="w-full flex items-center justify-between px-4 py-2.5 text-slate-300 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2 font-medium">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span>Petunjuk script Python</span>
            </span>
            {showHint ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {showHint && (
            <div className="px-4 pb-4 pt-1 border-t border-slate-800/60 text-slate-300 space-y-2">
              <p className="text-xs text-slate-400">
                Gunakan library <code className="text-indigo-300 font-mono">stegano</code> untuk
                membongkar pesan LSB dari gambar:
              </p>
              <pre className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-200 overflow-x-auto leading-relaxed select-all">
                <code>{`pip install stegano\npython -c "from stegano import lsb; print(lsb.reveal('stegano.png'))"`}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label
              htmlFor="stegano-password"
              className="block text-xs font-medium text-slate-300 mb-1.5"
            >
              Masukkan sandi yang kamu temukan
            </label>
            <input
              id="stegano-password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ketik sandi rahasia di sini..."
              className="w-full bg-slate-950 border border-slate-700/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-colors"
              disabled={loading || level1Completed}
            />
          </div>

          {errorMessage && (
            <div className="flex items-center gap-2 p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {(successMessage || level1Completed) && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-xs text-emerald-300">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                <span>{successMessage || "Level 1 selesai! Sandi cocok."}</span>
              </div>

              <button
                type="button"
                onClick={handleNextLevel}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg text-sm flex items-center justify-center gap-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
              >
                <span>Lanjut ke Level 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {!level1Completed && (
            <button
              type="submit"
              disabled={loading || !password.trim()}
              className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-slate-100 font-medium rounded-lg text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
            >
              {loading ? "Memverifikasi..." : "Verifikasi Sandi"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
