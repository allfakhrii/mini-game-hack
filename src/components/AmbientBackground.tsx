"use client";

import React from "react";

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Soft, calm ambient radial lighting */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[400px] bg-sky-500/[0.04] rounded-full blur-[120px]" />
      <div className="absolute -bottom-32 right-1/4 w-[500px] h-[350px] bg-indigo-500/[0.03] rounded-full blur-[100px]" />
    </div>
  );
}
