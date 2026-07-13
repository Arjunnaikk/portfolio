"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";

interface GlowCardProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  glowColor?: "sky" | "emerald" | "white";
}

export default function GlowCard({
  children,
  href,
  className = "",
  glowColor = "sky",
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Select glow color
  const glowStyles = {
    sky: "rgba(56, 189, 248, 0.08)",
    emerald: "rgba(16, 185, 129, 0.08)",
    white: "rgba(255, 255, 255, 0.05)",
  };

  const borderGlowStyles = {
    sky: "rgba(56, 189, 248, 0.15)",
    emerald: "rgba(16, 185, 129, 0.15)",
    white: "rgba(255, 255, 255, 0.08)",
  };

  const currentGlow = glowStyles[glowColor];
  const currentBorderGlow = borderGlowStyles[glowColor];

  const cardContent = (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all duration-300 hover:border-zinc-700/60 shadow-[0_0_0_1px_rgba(255,255,255,0.01)] ${className}`}
    >
      {/* Glow Background Overlay */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${coords.x}px ${coords.y}px, ${currentGlow}, transparent 80%)`,
          }}
        />
      )}

      {/* Glow Border Overlay */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, ${currentBorderGlow}, transparent 70%)`,
            maskImage: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskImage: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            padding: "1px",
          }}
        />
      )}

      {/* Inner Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="group block no-underline">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
