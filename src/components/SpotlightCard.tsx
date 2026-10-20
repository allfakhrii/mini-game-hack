"use client";

import React, { useRef } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(99, 102, 241, 0.12)",
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
    cardRef.current.style.setProperty("--spotlight-opacity", "1");
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--spotlight-opacity", "0");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={
        {
          "--mouse-x": "-999px",
          "--mouse-y": "-999px",
          "--spotlight-opacity": "0",
        } as React.CSSProperties
      }
      {...props}
    >
      {/* Dynamic Cursor Spotlight Overlay via CSS variables (zero React re-renders) */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: "var(--spotlight-opacity, 0)",
          background: `radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), ${spotlightColor}, transparent 80%)`,
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
