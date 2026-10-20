"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/context/GameContext";
import { ShieldAlert, Terminal } from "lucide-react";

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
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, level1Completed, level2Completed, requiredLevel, router, playSound]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#070a0f] flex items-center justify-center text-emerald-400 font-mono">
        <div className="flex items-center gap-3">
          <Terminal className="animate-spin h-5 w-5 text-emerald-500" />
          <span>[SYSTEM]: INITIALIZING SECURITY PERMISSIONS...</span>
        </div>
      </div>
    );
  }

  if (isDenied) {
    return (
      <div className="min-h-screen bg-[#0d0202] text-red-500 flex flex-col items-center justify-center p-6 font-mono text-center">
        <div className="max-w-md w-full bg-red-950/40 border border-red-600/60 rounded-lg p-6 shadow-[0_0_30px_rgba(239,68,68,0.3)] animate-pulse">
          <ShieldAlert className="w-14 h-14 mx-auto mb-4 text-red-500" />
          <h1 className="text-xl font-bold tracking-wider mb-2">
            ⚠️ [SECURITY ALERT]: AKSES ILEGAL
          </h1>
          <p className="text-sm text-red-300 mb-4 leading-relaxed">
            Percobaan bypass URL terdeteksi! Kamu programmer nakal ya wkwk 😜. Kamu harus
            menyelesaikan tantangan level sebelumnya dulu sebelum mengakses protokol ini.
          </p>
          <div className="text-xs text-red-400/80 bg-black/60 p-3 rounded font-mono border border-red-900/50">
            [SYS_ERR]: PERMISSION_DENIED (ROUTE_GUARD_BLOCK)
            <br />
            Mengarahkan kembali ke Root System (Level 1)...
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
