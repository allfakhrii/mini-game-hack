"use client";

import React, { useEffect, useState, useRef } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  speed?: number; // ms per tick
  scrambleChars?: string;
  trigger?: boolean;
}

const DEFAULT_CHARS = "01ABCDEFabcdef!@#$%^&*<>~+=";

export default function ScrambleText({
  text,
  className = "",
  speed = 30,
  scrambleChars = DEFAULT_CHARS,
  trigger = true,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!trigger) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const maxIterations = text.length;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join("")
      );

      iteration += 1 / 2;

      if (iteration >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
      }
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, speed, scrambleChars, trigger]);

  return <span className={className}>{displayText}</span>;
}
