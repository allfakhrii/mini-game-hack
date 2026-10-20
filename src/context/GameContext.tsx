"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { sound } from "@/lib/audio";

interface GameState {
  level1Completed: boolean;
  level2Completed: boolean;
  level3Completed: boolean;
  soundEnabled: boolean;
  isLoaded: boolean;
  toggleSound: () => void;
  verifyLevel1: (password: string) => Promise<{ success: boolean; message: string }>;
  verifyLevel2: (word: string) => Promise<{ success: boolean; message: string }>;
  verifyLevel3: (flag: string) => Promise<{ success: boolean; message: string }>;
  resetGame: () => void;
  playSound: (type: "click" | "success" | "error" | "glitch" | "victory") => void;
}

const GameContext = createContext<GameState | undefined>(undefined);

const STORAGE_KEY = "ctf_challenge_progress_v2";
const SOUND_KEY = "ctf_challenge_sound_v1";

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [level1Completed, setLevel1Completed] = useState<boolean>(false);
  const [level2Completed, setLevel2Completed] = useState<boolean>(false);
  const [level3Completed, setLevel3Completed] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load from sessionStorage on mount
  useEffect(() => {
    try {
      const storedProgress = sessionStorage.getItem(STORAGE_KEY);
      if (storedProgress) {
        const parsed = JSON.parse(storedProgress);
        setLevel1Completed(Boolean(parsed.level1Completed));
        setLevel2Completed(Boolean(parsed.level2Completed));
        setLevel3Completed(Boolean(parsed.level3Completed));
      }

      const storedSound = localStorage.getItem(SOUND_KEY);
      if (storedSound !== null) {
        const enabled = storedSound === "true";
        setSoundEnabled(enabled);
        sound.enabled = enabled;
      }
    } catch {
      // ignore storage errors
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveProgress = (l1: boolean, l2: boolean, l3: boolean) => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ level1Completed: l1, level2Completed: l2, level3Completed: l3 })
      );
    } catch {
      // ignore
    }
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    try {
      localStorage.setItem(SOUND_KEY, String(next));
    } catch {
      // ignore
    }
  };

  const playSound = (type: "click" | "success" | "error" | "glitch" | "victory") => {
    switch (type) {
      case "click":
        sound.playClick();
        break;
      case "success":
        sound.playSuccess();
        break;
      case "error":
        sound.playError();
        break;
      case "glitch":
        sound.playGlitch();
        break;
      case "victory":
        sound.playVictory();
        break;
    }
  };

  // Level 1: Steganography
  const verifyLevel1 = async (password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch("/api/verify-level-1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (data.success) {
        setLevel1Completed(true);
        saveProgress(true, level2Completed, level3Completed);
        playSound("success");
        return { success: true, message: data.message };
      } else {
        playSound("error");
        return { success: false, message: data.message || "Akses ditolak!" };
      }
    } catch {
      playSound("error");
      return { success: false, message: "Gagal menghubungkan ke server verifikasi." };
    }
  };

  // Level 2: Hash Cracking
  const verifyLevel2 = async (word: string): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch("/api/verify-level-2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word }),
      });
      const data = await res.json();

      if (data.success) {
        setLevel2Completed(true);
        saveProgress(level1Completed, true, level3Completed);
        playSound("success");
        return { success: true, message: data.message };
      } else {
        playSound("error");
        return { success: false, message: data.message || "Kata sandi hash tidak cocok!" };
      }
    } catch {
      playSound("error");
      return { success: false, message: "Gagal menghubungkan ke server verifikasi." };
    }
  };

  // Level 3: Fernet AES Cryptography
  const verifyLevel3 = async (flag: string): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch("/api/verify-level-3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flag }),
      });
      const data = await res.json();

      if (data.success) {
        setLevel3Completed(true);
        saveProgress(level1Completed, level2Completed, true);
        playSound("victory");
        return { success: true, message: data.message };
      } else {
        playSound("error");
        return { success: false, message: data.message || "Teks dekripsi tidak valid!" };
      }
    } catch {
      playSound("error");
      return { success: false, message: "Gagal menghubungkan ke server verifikasi." };
    }
  };

  const resetGame = () => {
    setLevel1Completed(false);
    setLevel2Completed(false);
    setLevel3Completed(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <GameContext.Provider
      value={{
        level1Completed,
        level2Completed,
        level3Completed,
        soundEnabled,
        isLoaded,
        toggleSound,
        verifyLevel1,
        verifyLevel2,
        verifyLevel3,
        resetGame,
        playSound,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
