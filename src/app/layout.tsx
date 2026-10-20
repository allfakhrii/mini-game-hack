import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GameProvider } from "@/context/GameContext";
import TerminalNavbar from "@/components/TerminalNavbar";
import AmbientBackground from "@/components/AmbientBackground";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Teka-Teki Buat Caca: Secret Vault",
  description: "Tiga level teka-teki keamanan siber yang sengaja dibuat khusus buat Caca.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#090d16] text-slate-100 min-h-screen selection:bg-indigo-500 selection:text-white`}
      >
        <GameProvider>
          <AmbientBackground />
          <div className="relative z-10 flex flex-col min-h-screen">
            <TerminalNavbar />
            <main className="flex-1 flex flex-col">{children}</main>
            <footer className="py-6 border-t border-slate-800/60 text-center text-xs text-slate-500 font-sans">
              Dibuat khusus untuk Caca. Selesaikan misinya dan klaim hadiahmu ke aku.
            </footer>
          </div>
        </GameProvider>
      </body>
    </html>
  );
}
