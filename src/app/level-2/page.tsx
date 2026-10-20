"use client";

import React, { useState } from "react";
import RouteGuard from "@/components/RouteGuard";
import { useGame } from "@/context/GameContext";
import GlitchTransition from "@/components/GlitchTransition";
import {
  Download,
  Terminal,
  Key,
  Copy,
  Check,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Code2,
  Lock,
  Unlock,
  HelpCircle,
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
      setSuccessMessage(result.message);
    } else {
      setErrorMessage(result.message);
    }
  };

  const handleGoToVictory = () => {
    playSound("glitch");
    setIsTransitioning(true);
  };

  return (
    <RouteGuard requiredLevel={2}>
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 flex-1 flex flex-col justify-center">
        {isTransitioning && (
          <GlitchTransition
            title="CRACKING ROOT ENCRYPTION // BREACHING FINAL VAULT"
            nextRoute="/victory"
          />
        )}

        {/* Top Terminal Status Header */}
        <div className="flex items-center justify-between border-b border-cyan-900/60 pb-3 mb-8 text-xs text-cyan-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="tracking-widest">[LOG]: AKSES DIBERIKAN // NODE: INNER_SANCTUM</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400 font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block animate-ping" />
            <span>AES-128 ENCRYPTION ACTIVE</span>
          </div>
        </div>

        {/* Level Title */}
        <div className="text-center mb-8">
          <div className="inline-block px-3 py-1 bg-cyan-950/60 border border-cyan-700/50 rounded-full text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Level 2: Jantung Pertahanan
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight glow-cyan">
            Brankas Kriptografi Fernet (AES)
          </h1>
          <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-2xl mx-auto leading-relaxed">
            Dokumen rahasia <code className="text-cyan-300 bg-zinc-900 px-1.5 py-0.5 rounded">hadiah.txt</code>{" "}
            telah disandera dengan algoritma simetris Fernet. Kunci enkripsi berhasil disadap di bawah
            ini. Tugasmu: bongkar isinya menggunakan Python!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cipher File & Key */}
          <div className="md:col-span-6 space-y-6">
            {/* Download File Card */}
            <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-5 shadow-xl">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                  <FileText className="w-3.5 h-3.5" /> DOKUMEN ENKRIPSI
                </span>
                <span className="bg-zinc-800 px-2 py-0.5 rounded text-[10px] text-zinc-400">
                  hadiah.txt
                </span>
              </div>

              <div className="p-3 bg-black/60 border border-zinc-800/80 rounded-lg text-xs text-zinc-400 font-mono mb-4">
                <p className="text-zinc-500 mb-1">[CIPHERTEXT PREVIEW]:</p>
                <div className="text-cyan-400/80 truncate">
                  gAAAAABq1tdZnT2zhmhyKjlgIjIBKwo1GjJRrs5EufPOCuxjNekkiuXYcneqV-6r1MGHyByMMNWyF4PhMD9F...
                </div>
              </div>

              <a
                href="/hadiah.txt"
                download="hadiah.txt"
                onClick={() => playSound("click")}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-cyan-600 hover:bg-cyan-500 text-black font-bold rounded-lg text-xs md:text-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]"
              >
                <Download className="w-4 h-4" />
                <span>Unduh File Enkripsi (hadiah.txt)</span>
              </a>
            </div>

            {/* Secret Key Card */}
            <div className="bg-zinc-900/70 border border-cyan-900/50 rounded-xl p-5 shadow-xl">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800 text-xs text-cyan-400">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Key className="w-3.5 h-3.5" /> KUNCI SIMETRIS FERNET (SADAP)
                </span>
                <span className="text-[10px] text-zinc-500">AES-128 / BASE64</span>
              </div>

              <p className="text-xs text-zinc-400 mb-2">
                Kunci ini disalin langsung dari memori sistem:
              </p>

              <div className="flex items-center gap-2 bg-black border border-cyan-900/80 rounded-lg p-2.5">
                <code className="text-cyan-300 text-xs font-mono flex-1 overflow-x-auto select-all">
                  {FERNET_KEY}
                </code>
                <button
                  onClick={handleCopyKey}
                  className={`p-2 rounded border text-xs flex items-center gap-1 transition-all flex-shrink-0 ${
                    copiedKey
                      ? "bg-emerald-950 border-emerald-500 text-emerald-400"
                      : "bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-200"
                  }`}
                  title="Salin Kunci ke Clipboard"
                >
                  {copiedKey ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[10px]">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[10px]">Salin</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Theory, Python Script Helper & Terminal Input */}
          <div className="md:col-span-6 space-y-6">
            {/* Fernet Theory Box */}
            <div className="bg-[#091017] border border-zinc-800 rounded-xl p-5 text-xs text-zinc-300 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold border-b border-zinc-800 pb-2">
                <Lock className="w-4 h-4 text-cyan-400" />
                <span>TEORI KRIPTOGRAFI: ALGORITMA FERNET</span>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                <strong className="text-cyan-300">Fernet</strong> adalah implementasi kriptografi
                simetris dengan standar keamanan tinggi dari library Python{" "}
                <code className="text-cyan-300">cryptography</code>.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                Di bawah tenda, Fernet menggunakan <strong className="text-cyan-300">AES-128 dalam mode CBC</strong>{" "}
                dengan padding PKCS7, dan menandatangani pesan dengan{" "}
                <strong className="text-cyan-300">HMAC-SHA256</strong> untuk mencegah modifikasi
                data. Karena bersifat simetris, kunci yang sama digunakan untuk mengunci dan membuka
                brankas.
              </p>
            </div>

            {/* Terminal Exploit Input Form */}
            <div className="bg-black/80 border border-cyan-900/80 rounded-xl p-5 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
              <div className="flex items-center justify-between text-xs text-cyan-400 font-mono pb-3 mb-3 border-b border-zinc-900">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>TERMINAL://INJEKSI_HASIL_DEKRIPSI</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    playSound("click");
                    setShowHelper(!showHelper);
                  }}
                  className="text-[11px] text-zinc-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>{showHelper ? "Tutup Script" : "Script Dekripsi"}</span>
                </button>
              </div>

              {/* Script Helper Accordion */}
              {showHelper && (
                <div className="mb-4 p-3 bg-zinc-950 border border-zinc-800 rounded text-[11px] font-mono text-zinc-300 space-y-2">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                    <Code2 className="w-3.5 h-3.5" /> Template Script Python Target:
                  </div>
                  <div className="bg-black p-2.5 rounded border border-zinc-900 text-cyan-300 select-all overflow-x-auto text-[10.5px] leading-relaxed">
                    <p className="text-zinc-500"># Install library:</p>
                    <p className="text-yellow-300">pip install cryptography</p>
                    <p className="text-zinc-500 mt-2"># Script dekripsi:</p>
                    <p>from cryptography.fernet import Fernet</p>
                    <p>kunci = b&quot;{FERNET_KEY}&quot;</p>
                    <p>fernet = Fernet(kunci)</p>
                    <p>with open(&apos;hadiah.txt&apos;, &apos;rb&apos;) as f:</p>
                    <p className="pl-4">pesan = fernet.decrypt(f.read())</p>
                    <p className="pl-4">print(pesan.decode())</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs text-zinc-400 font-mono mb-1.5">
                    root@sanctum:~# paste_decrypted_vault_payload
                  </label>
                  <textarea
                    rows={3}
                    value={flagInput}
                    onChange={(e) => setFlagInput(e.target.value)}
                    placeholder="Paste teks hasil dekripsi atau kode brankas di sini..."
                    className="w-full bg-zinc-950 border border-zinc-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-lg px-4 py-2.5 text-xs text-cyan-300 font-mono placeholder:text-zinc-600 outline-none transition-all resize-none"
                    disabled={loading || level2Completed}
                  />
                </div>

                {/* Error Message */}
                {errorMessage && (
                  <div className="flex items-center gap-2 p-3 bg-red-950/50 border border-red-700/60 rounded text-xs text-red-400 font-mono animate-shake">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 text-red-500" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Success Message & Next Button */}
                {(successMessage || level2Completed) && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-cyan-950/50 border border-cyan-600/60 rounded text-xs text-cyan-300 font-mono">
                      <ShieldCheck className="w-4 h-4 flex-shrink-0 text-cyan-400" />
                      <span>
                        {successMessage || "Dekripsi Terverifikasi! Brankas telah terbuka lebar."}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleGoToVictory}
                      className="w-full py-3.5 px-4 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 hover:from-pink-400 hover:to-amber-300 text-black font-extrabold rounded-lg text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(244,63,94,0.5)] animate-pulse"
                    >
                      <Unlock className="w-4 h-4" />
                      <span>BUKA BRANKAS KEMENANGAN (VICTORY) →</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Submit Exploit Button */}
                {!level2Completed && (
                  <button
                    type="submit"
                    disabled={loading || !flagInput.trim()}
                    className="w-full py-3 px-4 bg-zinc-800 hover:bg-cyan-500 hover:text-black text-zinc-200 font-bold rounded-lg text-xs md:text-sm font-mono transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span>MENDEKRIPSI ROOT VAULT...</span>
                    ) : (
                      <>
                        <Unlock className="w-4 h-4" />
                        <span>[EXECUTE] RETAS SISTEM AKHIR</span>
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
    </RouteGuard>
  );
}
