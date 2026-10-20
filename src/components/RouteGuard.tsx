"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/context/GameContext";
import { Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface RouteGuardProps {
  requiredLevel: 2 | "victory";
  children: React.ReactNode;
}

export default function RouteGuard({ requiredLevel, children }: RouteGuardProps) {
  const router = useRouter();
  const { level1Completed, level2Completed, isLoaded, playSound } = useGame();
  const [isDenied, setIsDenied] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    let allowed = false;
    if (requiredLevel === 2) {
      allowed = level1Completed;
    } else if (requiredLevel === "victory") {
      allowed = level1Completed && level2Completed;
    }

    if (!allowed) {
      setIsDenied(true);
      playSound("error");
      const timer = setTimeout(() => {
        router.push("/");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, level1Completed, level2Completed, requiredLevel, router, playSound]);

  if (!isLoaded) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-400 font-sans text-sm">
        <span>Memuat status tantangan...</span>
      </div>
    );
  }

  if (isDenied) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="max-w-sm w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="text-base font-semibold text-slate-100 mb-2">
            Halaman ini belum terbuka
          </h1>
          <p className="text-xs text-slate-400 mb-5 leading-relaxed">
            Selesaikan tantangan di level sebelumnya dulu ya. Kamu akan dialihkan ke halaman utama
            sebentar lagi.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors w-full"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Halaman Utama</span>
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
