"use client";

import { usePathname } from "next/navigation";

export default function TerminalFooter() {
  const pathname = usePathname();

  // Hide footer on landing page
  if (pathname === "/") {
    return null;
  }

  return (
    <footer className="py-6 border-t border-slate-800/60 text-center text-xs text-slate-500 font-sans">
      Dibuat khusus untuk Caca. Selesaikan misinya dan klaim hadiahmu ke aku.
    </footer>
  );
}
