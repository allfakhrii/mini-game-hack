"use client";

import React, { useState } from "react";
import RouteGuard from "@/components/RouteGuard";
import { useGame } from "@/context/GameContext";
import GlitchTransition from "@/components/GlitchTransition";
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
  ChevronUp,
  FileText,
} from "lucide-react";

export default function Level2Page() {
  const { verifyLevel2, level2Completed, playSound } = useGame();
  const [flagInput, setFlagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [copiedKey, setCopiedKey] = useState(false);
  const [showHelper, setShowHelper] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const FERNET_KEY = "qneLqT91Aw6ztBlrYkabmsWzoa6Aa2G7PDxqgta9YZ4=";

  const handleCopyKey = () => {
    playSound("click");
    navigator.clipboard.writeText(FERNET_KEY);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!flagInput.trim()) return;

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    playSound("click");

    const result = await verifyLevel2(flagInput);
    setLoading(false);

    if (result.success) {
      setSuccessMessage("Dekripsi terverifikasi! Hadiahmu siap dibuka.");
    } else {
      setErrorMessage("Teks belum cocok. Pastikan kamu menjalankan dekripsi Fernet dengan benar.");
    }
  };

  const handleGoToVictory = () => {
    playSound("click");
    setIsTransitioning(true);
  };

  return (
    <RouteGuard requiredLevel={2}>
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12 flex-1 flex flex-col justify-center font-sans">
        {isTransitioning && (
          <GlitchTransition title="Dekripsi Berhasil" nextRoute="/victory" />
        )}

        {/* Intro Header */}
        <div className="mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-3">
            Tantangan 2 dari 2
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100">
            Dekripsi berkas hadiah.txt
          </h1>
          <p className="text-slate-400 text-sm mt-2 leading-relaxed">
            Berkas <code className="text-slate-200 font-mono text-xs bg-slate-800 px-1.5 py-0.5 rounded">hadiah.txt</code>{" "}
            dikunci menggunakan algoritma simetris Fernet (AES). Salin kunci di bawah, jalankan
            dekripsi dengan Python, dan masukkan pesan yang kamu dapatkan.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6">
          {/* File & Key Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Download File */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300 mb-1">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  <span>Berkas Terenkripsi</span>
                </div>
                <p className="text-xs text-slate-400 mb-3">
                  Berisi ciphertext yang harus kamu dekripsi.
                </p>
              </div>

              <a
                href="/hadiah.txt"
                download="hadiah.txt"
                onClick={() => playSound("click")}
                className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh hadiah.txt</span>
              </a>
            </div>

            {/* Secret Key */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300 mb-1">
                  <Key className="w-4 h-4 text-amber-400" />
                  <span>Kunci Fernet AES</span>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800 mb-3">
                  <code className="text-[11px] font-mono text-slate-300 block truncate select-all">
                    {FERNET_KEY}
                  </code>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyKey}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
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
          </div>

          {/* Python Helper Box */}
          <div className="border border-slate-800/90 rounded-xl bg-slate-950/60 overflow-hidden text-xs">
            <button
              type="button"
              onClick={() => {
                playSound("click");
                setShowHelper(!showHelper);
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 text-slate-300 hover:text-white transition-colors"
            >
              <span className="flex items-center gap-2 font-medium">
                <Code2 className="w-4 h-4 text-indigo-400" />
                <span>Template script dekripsi</span>
              </span>
              {showHelper ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {showHelper && (
              <div className="px-4 pb-4 pt-1 border-t border-slate-800/60 text-slate-300 space-y-2">
                <p className="text-xs text-slate-400">
                  Kamu bisa menjalankan script ini di folder tempat kamu mengunduh berkas:
                </p>
                <pre className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-200 overflow-x-auto leading-relaxed select-all">
                  <code>{`from cryptography.fernet import Fernet\n\nkunci = b"${FERNET_KEY}"\ncipher = Fernet(kunci)\n\nwith open("hadiah.txt", "rb") as f:\n    hasil = cipher.decrypt(f.read())\n    print(hasil.decode())`}</code>
                </pre>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label
                htmlFor="decrypted-result"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Tempel teks hasil dekripsi di sini
              </label>
              <textarea
                id="decrypted-result"
                rows={3}
                value={flagInput}
                onChange={(e) => setFlagInput(e.target.value)}
                placeholder="Tempel teks atau baris pertama hasil dekripsi..."
                className="w-full bg-slate-950 border border-slate-700/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 outline-none transition-colors resize-none"
                disabled={loading || level2Completed}
              />
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-xs text-rose-300">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {(successMessage || level2Completed) && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-xs text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                  <span>{successMessage || "Dekripsi cocok! Misimu selesai."}</span>
                </div>

                <button
                  type="button"
                  onClick={handleGoToVictory}
                  className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-500 text-white font-medium rounded-lg text-sm flex items-center justify-center gap-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-500"
                >
                  <span>Buka Pesan Kemenangan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {!level2Completed && (
              <button
                type="submit"
                disabled={loading || !flagInput.trim()}
                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-slate-100 font-medium rounded-lg text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
              >
                {loading ? "Memverifikasi teks..." : "Kirim Jawaban"}
              </button>
            )}
          </form>
        </div>
      </div>
    </RouteGuard>
  );
}
