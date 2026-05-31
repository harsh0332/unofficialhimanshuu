"use client";

import React from "react";
import { Sparkles, Code } from "lucide-react";

export default function Clients() {
  const brandsList = [
    { name: "OPPO India", category: "Mobile Tech", style: "border-brand-gold/20 text-brand-ivory" },
    { name: "Hasselblad", category: "Optics & Camera", style: "border-brand-border text-brand-ivory" },
    { name: "UrbanFit", category: "Fitness Apparel", style: "border-brand-border text-brand-ivory" },
    { name: "CreatorCo", category: "Influencer Agency", style: "border-brand-border text-brand-ivory" },
  ];

  return (
    <section id="clients" className="relative w-full py-16 bg-brand-surface border-y border-brand-border overflow-hidden z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-10">
        
        {/* Title */}
        <div className="flex items-center gap-2 justify-center">
          <Sparkles size={12} className="text-brand-gold animate-pulse" />
          <span className="font-inter font-bold text-[10px] md:text-xs uppercase tracking-widest text-brand-muted">
            TRUSTED BY INDUSTRY LEADING BRAND HOUSES
          </span>
          <Sparkles size={12} className="text-brand-gold animate-pulse" />
        </div>

        {/* Logo Slots */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl items-center justify-center">
          {brandsList.map((brand, idx) => (
            <div
              key={idx}
              className={`relative bg-brand-obsidian border ${brand.style} py-6 px-4 flex flex-col items-center justify-center group overflow-hidden`}
            >
              {/* Highlight background lines */}
              <div className="absolute inset-0 bg-brand-gold/0 group-hover:bg-brand-gold/5 transition-colors duration-300 pointer-events-none" />

              {/* Editable Indicator */}
              <div className="absolute top-1.5 left-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                <Code size={8} className="text-brand-gold" />
                <span className="font-mono text-[6px] text-brand-muted uppercase tracking-widest">EDITABLE</span>
              </div>

              {/* Styled Placeholder text matching premium editorial layout */}
              <span className="font-fraunces font-extrabold text-md md:text-lg tracking-wider uppercase transition-colors duration-300 group-hover:text-brand-gold">
                {brand.name}
              </span>
              <span className="font-inter text-[8px] text-brand-muted uppercase tracking-wider mt-1">
                {brand.category}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
