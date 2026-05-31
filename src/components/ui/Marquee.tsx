"use client";

import React from "react";

interface MarqueeProps {
  items: string[];
  speed?: "slow" | "medium" | "fast";
  className?: string;
}

export default function Marquee({ items, speed = "medium", className = "" }: MarqueeProps) {
  const speedClass = {
    slow: "[animation-duration:45s]",
    medium: "[animation-duration:30s]",
    fast: "[animation-duration:15s]",
  };

  // We duplicate the list to ensure there is enough content to fill the screen and transition seamlessly
  const doubledItems = [...items, ...items, ...items, ...items];

  return (
    <div className={`relative w-full overflow-hidden py-5 bg-brand-black border-y border-white/5 flex select-none ${className}`}>
      {/* Absolute overlay fade left & right for deep cinema blending */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-brand-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-brand-black to-transparent z-10 pointer-events-none" />

      <div className={`flex gap-12 whitespace-nowrap animate-marquee hover:[animation-play-state:paused] ${speedClass[speed]}`}>
        {doubledItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-6">
            <span className="font-syne font-extrabold text-2xl md:text-4xl tracking-wider text-white select-none">
              {item}
            </span>
            <span className="text-brand-crimson font-syne font-extrabold text-xl md:text-3xl select-none">
              //
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
