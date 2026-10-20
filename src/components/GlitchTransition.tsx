"use client";

import React, { useEffect } from "react";
import { Check } from "lucide-react";

interface GlitchTransitionProps {
  title: string;
  nextRoute: string;
}

export default function GlitchTransition({ title, nextRoute }: GlitchTransitionProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = nextRoute;
    }, 1200);

    return () => clearTimeout(timer);
  }, [nextRoute]);

  return (
    <div className="fixed inset-0 z-50 bg-[#090d16]/80 backdrop-blur-sm flex items-center justify-center p-4 font-sans animate-fade-in">
      <div className="max-w-sm w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center shadow-2xl">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
          <Check className="w-6 h-6" />
        </div>
        <h2 className="text-base font-semibold text-slate-100 mb-1">{title}</h2>
        <p className="text-xs text-slate-400">Menyiapkan halaman berikutnya...</p>
      </div>
    </div>
  );
}
