"use client";

import React, { useEffect, useState } from "react";
import { Terminal, CheckCircle2 } from "lucide-react";

interface GlitchTransitionProps {
  title: string;
  nextRoute: string;
  onFinish?: () => void;
}

export default function GlitchTransition({ title, nextRoute }: GlitchTransitionProps) {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const sequence = [
      "[INFO] Payload hash matches target checksum...",
      "[AUTH] Handshake verified with kernel node 0x7F...",
      "[INJECT] Injecting bypass token into memory space...",
      "[OVERRIDE] Disabling firewall rule 403_FORBIDDEN...",
      "[SUCCESS] ACCESS GRANTED! Redirecting to target buffer...",
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < sequence.length) {
        setLogs((prev) => [...prev, sequence[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          window.location.href = nextRoute;
        }, 500);
      }
    }, 350);

    return () => clearInterval(interval);
  }, [nextRoute]);

  return (
    <div className="fixed inset-0 z-50 bg-[#070a0f]/95 backdrop-blur-md flex items-center justify-center p-4 font-mono">
      <div className="max-w-lg w-full bg-[#0d1117] border border-emerald-500/80 rounded-lg p-6 shadow-[0_0_50px_rgba(16,185,129,0.35)]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-emerald-950 text-xs text-emerald-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="font-bold tracking-wider">{title}</span>
          </div>
          <span className="text-[10px] text-emerald-500/70">STATUS: OVERRIDING</span>
        </div>

        {/* Streaming Logs */}
        <div className="space-y-2 mb-6 font-mono text-xs">
          {logs.map((log, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 ${
                index === logs.length - 1 ? "text-emerald-300 font-bold" : "text-emerald-500/80"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>{log}</span>
            </div>
          ))}
          <div className="text-emerald-400 animate-terminal-blink">_</div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-zinc-900 rounded-full h-2 overflow-hidden border border-emerald-900">
          <div
            className="h-full bg-emerald-400 transition-all duration-300 shadow-[0_0_10px_#10b981]"
            style={{ width: `${Math.min(100, logs.length * 20)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
