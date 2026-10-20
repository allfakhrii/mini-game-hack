"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useGame } from "@/context/GameContext";
import GlitchTransition from "@/components/GlitchTransition";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Download,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Code2,
  ChevronDown,
  BookOpen,
} from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";
import ScrambleText from "@/components/ScrambleText";

export default function Level1Page() {
  const container = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const { verifyLevel1, level1Completed, playSound } = useGame();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Smooth GSAP Entrance Animation
  useGSAP(
    () => {
      gsap.fromTo(
        ".anim-header",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", clearProps: "all" }
      );
      gsap.fromTo(
        ".anim-left",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 0.12, ease: "power2.out", clearProps: "all" }
      );
      gsap.fromTo(
        ".anim-right",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 0.22, ease: "power2.out", clearProps: "all" }
      );
    },
    { scope: container }
  );

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
      setSuccessMessage("Pintar banget! Sandi cocok. Mengalihkan ke Level 2...");
      if (inputRef.current) {
        gsap.fromTo(
          inputRef.current,
          { scale: 1.02, borderColor: "#10b981" },
          { scale: 1, duration: 0.4, ease: "power2.out" }
        );
      }
      setIsTransitioning(true);
    } else {
      setErrorMessage("Sandi belum cocok nih. Coba periksa kembali hasil pembacaan LSB di fotomu ya.");
      if (inputRef.current) {
        gsap
          .timeline()
          .to(inputRef.current, { x: -8, duration: 0.05 })
          .to(inputRef.current, { x: 8, duration: 0.05 })
          .to(inputRef.current, { x: -6, duration: 0.05 })
          .to(inputRef.current, { x: 6, duration: 0.05 })
          .to(inputRef.current, { x: 0, duration: 0.05 });
      }
    }
  };

  const toggleHint = () => {
    playSound("click");
    setShowHint((prev) => !prev);
  };

  const handleNextLevel = () => {
    playSound("click");
    setIsTransitioning(true);
  };

  return (
    <div
      ref={container}
      className="max-w-5xl mx-auto px-4 pt-20 sm:pt-24 pb-12 flex-1 flex flex-col justify-center font-sans"
    >
      {isTransitioning && (
        <GlitchTransition title="Sandi Cocok, Lanjut Level 2" nextRoute="/level-2" />
      )}

      {/* Top Header - Full Width */}
      <div className="mb-8 anim-header">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-3">
          <ScrambleText text="Level 1 buat Caca: Steganografi LSB" speed={25} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100">
          Seni Menyembunyikan Pesan di Tempat Terbuka
        </h1>
      </div>

      {/* Balanced 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Story & Insight + Script Helper */}
        <div className="lg:col-span-7 space-y-5 anim-left">
          {/* Story Card */}
          <SpotlightCard className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6 text-slate-300 text-sm leading-relaxed space-y-3.5 shadow-sm">
            <div className="flex items-center gap-2 text-indigo-400 font-medium text-xs border-b border-slate-800/80 pb-2">
              <BookOpen className="w-4 h-4" />
              <span>CATATAN & PETUNJUK LEVEL 1</span>
            </div>

            <p>
              Sejak tahun 440 Sebelum Masehi, para intelijen sadar bahwa keamanan terhebat bukanlah
              membuat brankas yang tebal, melainkan menyembunyikan fakta bahwa brankas itu ada.
              Teknik kuno ini sekarang berevolusi ke dunia digital.
            </p>

            <p>
              Mata manusia mungkin melihat file foto ini sangat normal. Tapi secara matematis,
              aku sudah memanipulasi angka biner di bagian paling ujung (Least Significant Bit) dari
              susunan warna RGB-nya. Ada teknik Steganografi yang menyelimuti sebuah pesan rahasia
              di dalam piksel gambar ini.
            </p>

            <div className="pt-1 text-slate-200 font-medium">
              <span className="text-indigo-300 font-semibold">Misi buat kamu:</span> Foto di
              samping kelihatan biasa saja kan? Padahal di dalamnya sudah aku sisipkan sebuah kalimat
              rahasia. Gunakan tool online atau script Python LSB yang aku sertakan di bawah untuk
              mengekstrak isinya. Kalau sudah dapat kalimatnya, masukkan ke kolom verifikasi ya!
            </div>
          </SpotlightCard>

          {/* Python Helper Box */}
          <div className="border border-slate-800/90 rounded-2xl bg-slate-900/40 overflow-hidden text-xs shadow-sm">
            <button
              type="button"
              onClick={toggleHint}
              className="w-full flex items-center justify-between p-4 text-slate-300 hover:text-white transition-colors"
            >
              <span className="flex items-center gap-2 font-medium">
                <Code2 className="w-4 h-4 text-indigo-400" />
                <span>Petunjuk script Python (LSB Decode)</span>
              </span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                  showHint ? "rotate-180 text-indigo-400" : ""
                }`}
              />
            </button>

            <div
              ref={accordionRef}
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                showHint ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-4 pb-4 border-t border-slate-800/60 text-slate-300 space-y-2">
                <p className="text-xs text-slate-400 pt-2">
                  Kamu bisa menggunakan library <code className="text-indigo-300 font-mono">stegano</code> untuk
                  membaca pesan LSB:
                </p>
                <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-200 overflow-x-auto leading-relaxed select-all">
                  <code>{`pip install stegano\npython -c "from stegano import lsb; print(lsb.reveal('stegano.png'))"`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Photo Target + Action & Input Form */}
        <SpotlightCard className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5 anim-right">
          {/* Photo Display with Natural Frame */}
          <div className="space-y-3">
            <div className="relative rounded-xl overflow-hidden bg-slate-950 aspect-[4/3] w-full border border-slate-800 group">
              <Image
                src="/stegano.png"
                alt="Foto target steganografi LSB"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="(max-width: 1024px) 100vw, 420px"
                priority
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-0.5">
              <span>Berkas: <strong className="text-slate-200 font-mono">stegano.png</strong></span>
              <span>Ukuran: 11.5 MB</span>
            </div>

            <a
              href="/stegano.png"
              download="stegano.png"
              onClick={() => playSound("click")}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition-all duration-200 hover:shadow-md hover:shadow-indigo-600/20 active:scale-98 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Foto Asli (Raw .PNG)</span>
            </a>
          </div>

          <div className="h-px bg-slate-800/80" />

          {/* Validation Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label
                htmlFor="stegano-password"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Masukkan kalimat rahasia yang kamu temukan
              </label>
              <input
                ref={inputRef}
                id="stegano-password"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ketik kalimat rahasia hasil decode foto..."
                className="w-full bg-slate-950 border border-slate-700/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 outline-none transition-colors"
                disabled={loading || level1Completed}
              />
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-lg text-xs text-rose-300">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {(successMessage || level1Completed) && (
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-xs text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                  <span>{successMessage || "Level 1 selesai! Sandi cocok."}</span>
                </div>

                <button
                  type="button"
                  onClick={handleNextLevel}
                  className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg text-xs flex items-center justify-center gap-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
                >
                  <span>Lanjut ke Level 2: Hash Cracking</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {!level1Completed && (
              <button
                type="submit"
                disabled={loading || !password.trim()}
                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-slate-100 font-medium rounded-lg text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
              >
                {loading ? "Memverifikasi..." : "Verifikasi Sandi"}
              </button>
            )}
          </form>
        </SpotlightCard>
      </div>
    </div>
  );
}
