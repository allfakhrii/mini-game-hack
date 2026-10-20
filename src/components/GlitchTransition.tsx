"use client";

import React, { useRef } from "react";
import { Check } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";

interface GlitchTransitionProps {
  title: string;
  nextRoute: string;
}

export default function GlitchTransition({ title, nextRoute }: GlitchTransitionProps) {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Entrance
    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    ).fromTo(
      cardRef.current,
      { scale: 0.9, y: 15, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.5)" },
      "-=0.15"
    );

    // Progress bar fill
    tl.fromTo(
      progressRef.current,
      { width: "0%" },
      {
        width: "100%",
        duration: 0.65,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.25,
            ease: "power2.in",
            onComplete: () => {
              router.push(nextRoute);
            },
          });
        },
      }
    );
  }, [nextRoute, router]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-[#090d16]/85 backdrop-blur-md flex items-center justify-center p-4 font-sans"
    >
      <div
        ref={cardRef}
        className="max-w-sm w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center shadow-2xl relative overflow-hidden"
      >
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
          <Check className="w-6 h-6" />
        </div>
        <h2 className="text-base font-semibold text-slate-100 mb-1">{title}</h2>
        <p className="text-xs text-slate-400 mb-4">Mengalihkan ke level berikutnya...</p>

        {/* Smooth loading bar */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
