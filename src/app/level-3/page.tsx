"use client";

import React, { useRef, useState } from "react";
import RouteGuard from "@/components/RouteGuard";
import { useGame } from "@/context/GameContext";
import GlitchTransition from "@/components/GlitchTransition";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Download,
  Key,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Code2,
  ChevronDown,
  FileText,
  Lock,
} from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";
import ScrambleText from "@/components/ScrambleText";

export default function Level3CryptoPage() {
  const container = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const copyKeyBtnRef = useRef<HTMLButtonElement>(null);
  const { verifyLevel3, level3Completed, playSound } = useGame();
  const [flagInput, setFlagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [copiedKey, setCopiedKey] = useState(false);
  const [showHelper, setShowHelper] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const FERNET_KEY = "qneLqT91Aw6ztBlrYkabmsWzoa6Aa2G7PDxqgta9YZ4=";

  // Smooth GSAP Entrance Animation
  useGSAP(
    () => {
      gsap.from(".anim-header", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.from(".anim-left", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        delay: 0.12,
        ease: "power2.out",
      });
      gsap.from(".anim-right", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        delay: 0.22,
        ease: "power2.out",
      });
    },
    { scope: container }
  );

  const handleCopyKey = () => {
    playSound("click");
    navigator.clipboard.writeText(FERNET_KEY);
    setCopiedKey(true);
    if (copyKeyBtnRef.current) {
      gsap.fromTo(
        copyKeyBtnRef.current,
        { scale: 0.95 },
        { scale: 1, duration: 0.3, ease: "back.out(2)" }
      );
    }
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!flagInput.trim()) return;

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    playSound("click");

    const result = await verifyLevel3(flagInput);
    setLoading(false);

    if (result.success) {
      setSuccessMessage("Keren banget Caca! Dekripsi valid. Membuka brankas hadiah...");
      if (textareaRef.current) {
        gsap.fromTo(
          textareaRef.current,
          { scale: 1.02, borderColor: "#10b981" },
          { scale: 1, duration: 0.4, ease: "power2.out" }
        );
      }
      setIsTransitioning(true);
    } else {
      setErrorMessage("Teks belum cocok nih. Pastikan kamu menjalankan script dekripsi Fernet dengan benar ya.");
      if (textareaRef.current) {
        gsap
          .timeline()
          .to(textareaRef.current, { x: -8, duration: 0.05 })
          .to(textareaRef.current, { x: 8, duration: 0.05 })
          .to(textareaRef.current, { x: -6, duration: 0.05 })
          .to(textareaRef.current, { x: 6, duration: 0.05 })
          .to(textareaRef.current, { x: 0, duration: 0.05 });
      }
    }
  };

  const handleGoToVictory = () => {
    playSound("click");
    setIsTransitioning(true);
  };

  return (
    <RouteGuard requiredLevel={3}>
      <div
        ref={container}
        className="max-w-5xl mx-auto px-4 py-8 sm:py-12 flex-1 flex flex-col justify-center font-sans"
      >
        {isTransitioning && (
          <GlitchTransition title="Dekripsi Berhasil, Menuju Hadiah" nextRoute="/victory" />
        )}

        {/* Top Header - Full Width */}
        <div className="mb-8 anim-header">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-3">
            <ScrambleText text="Level 3 (Final) buat Caca: Kriptografi Fernet AES" speed={25} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100">
            Ketika Matematika Menjadi Brankas Tak Tertembus
          </h1>
        </div>

        {/* Balanced 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Insight & Python Helper */}
          <div className="lg:col-span-7 space-y-5 anim-left">
            {/* Story Card */}
            <SpotlightCard className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6 text-slate-300 text-sm leading-relaxed space-y-3.5 shadow-sm">
              <div className="flex items-center gap-2 text-indigo-400 font-medium text-xs border-b border-slate-800/80 pb-2">
                <Lock className="w-4 h-4" />
                <span>CATATAN & PETUNJUK LEVEL 3</span>
              </div>

              <p>
                Jika Steganografi adalah seni menyembunyikan keberadaan brankas, Kriptografi adalah
                kebalikannya: brankas dan seluruh isinya boleh ditaruh tepat di hadapan mata dunia,
                namun tak seorang pun dapat membacanya tanpa rumus matematika yang sah.
              </p>

              <p>
                Pada tahun 1883, Auguste Kerckhoffs merumuskan prinsip legendaris dalam keamanan
                sistem: keamanan sebuah sistem sandi tidak boleh bergantung pada kerahasiaan
                algoritmanya, melainkan semata-mata pada kerahasiaan kuncinya (Kerckhoffs&apos;s
                Principle). Berkas <code className="text-indigo-300 font-mono text-xs">hadiah.txt</code>{" "}
                di samping dikunci menggunakan algoritma simetris Fernet, yang mengombinasikan
                enkripsi AES-128 standar industri dengan tanda tangan digital HMAC-SHA256.
              </p>

              <div className="pt-1 text-slate-200 font-medium">
                <span className="text-indigo-300 font-semibold">Misi buat kamu:</span> Ini level
                terakhir sebelum kamu bisa membuka brankas hadiah utama! Berkas hadiah.txt sudah aku
                enkripsi rapat. Tapi khusus buat kamu, kunci simetrisnya sudah aku kasih di panel
                samping. Jalankan script Python di bawah untuk mendekripsi isi berkasnya, lalu masukkan
                teks hasil dekripsinya ke kolom verifikasi ya!
              </div>
            </SpotlightCard>

            {/* Python Script Accordion */}
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
                  <span>Template script dekripsi Python</span>
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
                    Jalankan script berikut di terminal di direktori berkas yang kamu unduh:
                  </p>
                  <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-200 overflow-x-auto leading-relaxed select-all">
                    <code>{`from cryptography.fernet import Fernet\n\nkunci = b"${FERNET_KEY}"\ncipher = Fernet(kunci)\n\nwith open("hadiah.txt", "rb") as f:\n    hasil = cipher.decrypt(f.read())\n    print(hasil.decode())`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Encrypted File, Key, & Input Form */}
          <SpotlightCard className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5 anim-right">
            {/* Download File */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-semibold">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  <span>Berkas Terenkripsi</span>
                </span>
                <span className="text-slate-400 font-mono text-[11px]">hadiah.txt</span>
              </div>

              <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400">
                <p className="truncate text-indigo-300/80">
                  gAAAAABq1tdZnT2zhmhyKjlgIjIBKwo1GjJRrs5EufPOCuxj...
                </p>
              </div>

              <a
                href="/hadiah.txt"
                download="hadiah.txt"
                onClick={() => playSound("click")}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white text-xs font-medium rounded-lg transition-all duration-200 hover:shadow-md hover:shadow-indigo-600/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh hadiah.txt</span>
              </a>
            </div>

            {/* Secret Key Card */}
            <div className="space-y-2.5 pt-1 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-xs text-slate-300 pt-2">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Key className="w-4 h-4 text-amber-400" />
                  <span>Kunci Fernet AES</span>
                </span>
                <span className="text-[10px] text-slate-500">AES-128</span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <code className="text-xs font-mono text-indigo-300 block truncate select-all tracking-wider">
                  <ScrambleText text={FERNET_KEY} speed={16} />
                </code>
              </div>

              <button
                ref={copyKeyBtnRef}
                type="button"
                onClick={handleCopyKey}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 active:scale-98 text-slate-200 text-xs font-medium rounded-lg transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
              >
                {copiedKey ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Tersalin ke Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Kunci</span>
                  </>
                )}
              </button>
            </div>

            <div className="h-px bg-slate-800/80" />

            {/* Form Input */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label
                  htmlFor="decrypted-result"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  Tempel teks hasil dekripsi hadiah.txt
                </label>
                <textarea
                  id="decrypted-result"
                  rows={3}
                  value={flagInput}
                  onChange={(e) => setFlagInput(e.target.value)}
                  placeholder="Ketik atau tempel teks hasil dekripsi script..."
                  className="w-full bg-slate-950 border border-slate-700/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 outline-none transition-colors resize-none"
                  disabled={loading || level3Completed}
                />
              </div>

              {errorMessage && (
                <div className="flex items-center gap-2 p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-lg text-xs text-rose-300">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {(successMessage || level3Completed) && (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-xs text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                    <span>{successMessage || "Dekripsi cocok! Misimu selesai."}</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoToVictory}
                    className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-500 text-white font-medium rounded-lg text-xs flex items-center justify-center gap-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-500"
                  >
                    <span>Buka Pesan Kemenangan</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {!level3Completed && (
                <button
                  type="submit"
                  disabled={loading || !flagInput.trim()}
                  className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-slate-100 font-medium rounded-lg text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
                >
                  {loading ? "Memverifikasi teks..." : "Kirim Jawaban"}
                </button>
              )}
            </form>
          </SpotlightCard>
        </div>
      </div>
    </RouteGuard>
  );
}
