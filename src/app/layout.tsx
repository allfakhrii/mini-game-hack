import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GameProvider } from "@/context/GameContext";
import TerminalNavbar from "@/components/TerminalNavbar";
import CyberGrid from "@/components/CyberGrid";

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
  title: "CTF // OPERATION SECRET VAULT",
  description: "Interactive Cybersecurity Challenge: Steganography LSB & Fernet AES Cryptography",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-mono bg-[#070a0f] text-zinc-100 min-h-screen selection:bg-emerald-500 selection:text-black scanlines`}
      >
        <GameProvider>
          <CyberGrid />
          <div className="relative z-10 flex flex-col min-h-screen">
            <TerminalNavbar />
            <main className="flex-1 flex flex-col">{children}</main>
            <footer className="py-4 border-t border-zinc-900 text-center text-[11px] text-zinc-500 font-mono">
              OPERATION SECRET VAULT // AUTHORIZED ACCESS ONLY // BUILT FOR MY FAVORITE HACKER ❤️
            </footer>
          </div>
        </GameProvider>
      </body>
    </html>
  );
}
