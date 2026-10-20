"use client";

import React, { useRef, useState } from "react";
import RouteGuard from "@/components/RouteGuard";
import { useGame } from "@/context/GameContext";
import GlitchTransition from "@/components/GlitchTransition";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Download,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Code2,
  ChevronDown,
  FileText,
  Hash,
  Binary,
} from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";
import ScrambleText from "@/components/ScrambleText";

export default function Level2HashPage() {
  const container = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const copyBtnRef = useRef<HTMLButtonElement>(null);
  const { verifyLevel2, level2Completed, playSound } = useGame();
  const [wordInput, setWordInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [copiedHash, setCopiedHash] = useState(false);
  const [showHelper, setShowHelper] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const TARGET_HASH = "a0095443fbfe1b3ebf4225636a1f86b8";

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

  const handleCopyHash = () => {
    playSound("click");
    navigator.clipboard.writeText(TARGET_HASH);
    setCopiedHash(true);
    if (copyBtnRef.current) {
      gsap.fromTo(
        copyBtnRef.current,
        { scale: 0.95 },
        { scale: 1, duration: 0.3, ease: "back.out(2)" }
      );
    }
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wordInput.trim()) return;

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    playSound("click");

    const result = await verifyLevel2(wordInput);
    setLoading(false);

    if (result.success) {
      setSuccessMessage("Pintar! Hash MD5 berhasil dipecahkan. Mengalihkan ke Level 3...");
      if (inputRef.current) {
        gsap.fromTo(
          inputRef.current,
          { scale: 1.02, borderColor: "#10b981" },
          { scale: 1, duration: 0.4, ease: "power2.out" }
        );
      }
      setIsTransitioning(true);
    } else {
      setErrorMessage(
        "Kata sandi belum cocok nih. Pastikan hash MD5 dari kata tersebut sama persis dengan target ya."
      );
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

  const handleNextLevel = () => {
    playSound("click");
    setIsTransitioning(true);
  };

  return (
    <RouteGuard requiredLevel={2}>
      <div
        ref={container}
        className="max-w-5xl mx-auto px-4 pt-20 sm:pt-24 pb-12 flex-1 flex flex-col justify-center font-sans"
      >
        {isTransitioning && (
          <GlitchTransition title="Hash Terpecahkan, Lanjut Level 3" nextRoute="/level-3" />
        )}

        {/* Top Header - Full Width */}
        <div className="mb-8 anim-header">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-3">
            <ScrambleText text="Level 2 buat Caca: Hash Cracking" speed={25} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100">
            Membongkar Sidik Jari Digital Satu Arah
          </h1>
        </div>

        {/* Balanced 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Insight & Python Helper */}
          <div className="lg:col-span-7 space-y-5 anim-left">
            {/* Story Card */}
            <SpotlightCard className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6 text-slate-300 text-sm leading-relaxed space-y-3.5 shadow-sm">
              <div className="flex items-center gap-2 text-indigo-400 font-medium text-xs border-b border-slate-800/80 pb-2">
                <Binary className="w-4 h-4" />
                <span>CATATAN & PETUNJUK LEVEL 2</span>
              </div>

              <p>
                Berbeda dengan enkripsi yang bisa dibuka kembali menggunakan kunci, fungsi Hash
                Kriptografi (seperti MD5 dan SHA-256) dirancang secara matematis sebagai fungsi satu
                arah (One-Way Function). Bayangkan seperti memanggang kue: sangat mudah mencampur telur
                dan tepung menjadi kue, tetapi mustahil memisahkan kue yang sudah matang kembali menjadi
                sebutir telur mentah.
              </p>

              <p>
                Namun peretas punya trik: jika kita tidak bisa membalikkan rumus hash tersebut dari
                belakang, kita bisa menguji ribuan kata sandi potensial dari depan dengan kecepatan
                tinggi. Teknik ini dikenal sebagai <strong>Dictionary Attack</strong> (Serangan
                Kamus).
              </p>

              <div className="pt-1 text-slate-200 font-medium">
                <span className="text-indigo-300 font-semibold">Misi buat kamu:</span> Di panel
                samping, aku pasang hash MD5 target. Aku juga sudah sediakan file wordlist.txt yang
                berisi daftar kata calon kuncinya. Tugas kamu: jalankan script Python yang sudah aku
                buatkan di petunjuk bawah untuk mencari kata mana yang menghasilkan hash tersebut.
                Kalau sudah ketemu katanya, masukkan ke kolom verifikasi ya!
              </div>
            </SpotlightCard>

            {/* Python Helper Box */}
            <div className="border border-slate-800/90 rounded-2xl bg-slate-900/40 overflow-hidden text-xs shadow-sm">
              <button
                type="button"
                onClick={() => {
                  playSound("click");
                  setShowHelper(!showHelper);
                }}
                className="w-full flex items-center justify-between p-4 text-slate-300 hover:text-white transition-colors"
              >
                <span className="flex items-center gap-2 font-medium">
                  <Code2 className="w-4 h-4 text-indigo-400" />
                  <span>Petunjuk script Python (Dictionary Attack)</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                    showHelper ? "rotate-180 text-indigo-400" : ""
                  }`}
                />
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  showHelper ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 pb-4 border-t border-slate-800/60 text-slate-300 space-y-2">
                  <p className="text-xs text-slate-400 pt-2">
                    Jalankan script Python sederhana ini di folder tempat kamu menyimpan wordlist:
                  </p>
                  <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-200 overflow-x-auto leading-relaxed select-all">
                    <code>{`import hashlib\n\ntarget_hash = "${TARGET_HASH}"\n\nwith open("wordlist.txt", "r") as file:\n    for line in file:\n        kata = line.strip()\n        if hashlib.md5(kata.encode()).hexdigest() == target_hash:\n            print(f"Password ditemukan: {kata}")\n            break`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hash Target, Wordlist, & Input Form */}
          <SpotlightCard className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5 anim-right">
            {/* Target Hash Card */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Hash className="w-4 h-4 text-indigo-400" />
                  <span>Target Hash MD5</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">128-BIT HASH</span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <code className="text-xs font-mono text-indigo-300 block truncate select-all tracking-wider">
                  <ScrambleText
                    text={TARGET_HASH}
                    speed={18}
                    scrambleChars="0123456789abcdef"
                  />
                </code>
              </div>

              <button
                ref={copyBtnRef}
                type="button"
                onClick={handleCopyHash}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 active:scale-98 text-slate-200 text-xs font-medium rounded-lg transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
              >
                {copiedHash ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Tersalin ke Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Target Hash</span>
                  </>
                )}
              </button>
            </div>

            {/* Wordlist Card */}
            <div className="space-y-2.5 pt-1 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-xs text-slate-300 pt-2">
                <span className="flex items-center gap-1.5 font-semibold">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Daftar Kata (Wordlist)</span>
                </span>
                <span className="text-slate-400 font-mono text-[11px]">wordlist.txt</span>
              </div>

              <p className="text-xs text-slate-400">
                Unduh berkas kamus kata ini untuk dicocokkan dengan script:
              </p>

              <a
                href="/wordlist.txt"
                download="wordlist.txt"
                onClick={() => playSound("click")}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white text-xs font-medium rounded-lg transition-all duration-200 hover:shadow-md hover:shadow-indigo-600/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh wordlist.txt</span>
              </a>
            </div>

            <div className="h-px bg-slate-800/80" />

            {/* Form Input */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label
                  htmlFor="cracked-word"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  Masukkan kata yang menghasilkan hash target
                </label>
                <input
                  ref={inputRef}
                  id="cracked-word"
                  type="text"
                  value={wordInput}
                  onChange={(e) => setWordInput(e.target.value)}
                  placeholder="Ketik kata yang kamu temukan dari wordlist..."
                  className="w-full bg-slate-950 border border-slate-700/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 outline-none transition-colors"
                  disabled={loading || level2Completed}
                />
              </div>

              {errorMessage && (
                <div className="flex items-center gap-2 p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-lg text-xs text-rose-300">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {(successMessage || level2Completed) && (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-xs text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                    <span>{successMessage || "Level 2 selesai! Hash cocok."}</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextLevel}
                    className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg text-xs flex items-center justify-center gap-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
                  >
                    <span>Lanjut ke Level 3: Kriptografi</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {!level2Completed && (
                <button
                  type="submit"
                  disabled={loading || !wordInput.trim()}
                  className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-slate-100 font-medium rounded-lg text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
                >
                  {loading ? "Mencocokkan hash..." : "Verifikasi Hash"}
                </button>
              )}
            </form>
          </SpotlightCard>
        </div>
      </div>
    </RouteGuard>
  );
}
