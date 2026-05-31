"use client";

import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function Clients() {
  const sponsors = [
    { name: "OPPO India", src: "/sponsors/oppo.svg", width: 130, height: 40 },
    { name: "Hasselblad", src: "/sponsors/hasselblad.svg", width: 160, height: 40 },
    { name: "OPPO India Clone", src: "/sponsors/oppo.svg", width: 130, height: 40 },
    { name: "Hasselblad Clone", src: "/sponsors/hasselblad.svg", width: 160, height: 40 },
    { name: "OPPO India Double", src: "/sponsors/oppo.svg", width: 130, height: 40 },
    { name: "Hasselblad Double", src: "/sponsors/hasselblad.svg", width: 160, height: 40 },
  ];

  return (
    <section
      id="clients"
      className="relative w-full py-16 bg-brand-surface border-b border-brand-border-hairline overflow-hidden z-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-8">
        
        {/* Title Badge */}
        <div className="flex items-center gap-2 justify-center">
          <Sparkles size={12} className="text-brand-ember animate-pulse" />
          <span className="font-inter font-bold text-[10px] md:text-xs uppercase tracking-widest text-brand-bone-secondary">
            OFFICIAL SHOW SPONSORS & TRUSTED PARTNERS
          </span>
          <Sparkles size={12} className="text-brand-ember animate-pulse" />
        </div>

        {/* Infinite Logo Marquee Strip */}
        <div className="relative w-full overflow-hidden py-4 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-brand-surface before:to-transparent before:content-[''] after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-brand-surface after:to-transparent after:content-['']">
          <div className="flex w-[200%] gap-12 animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
            {/* First sequence */}
            <div className="flex justify-around items-center w-1/2 gap-12">
              {sponsors.map((brand, idx) => (
                <div
                  key={`first-${idx}`}
                  className="flex items-center justify-center filter grayscale opacity-40 hover:grayscale-0 hover:opacity-100 hover:text-brand-ember transition-all duration-500 shrink-0 cursor-pointer text-brand-bone"
                  style={{ minWidth: "160px" }}
                >
                  <Image
                    src={brand.src}
                    alt={`${brand.name} logo`}
                    width={brand.width}
                    height={brand.height}
                    className="object-contain h-8 w-auto"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* Second identical sequence for seamless loop */}
            <div className="flex justify-around items-center w-1/2 gap-12">
              {sponsors.map((brand, idx) => (
                <div
                  key={`second-${idx}`}
                  className="flex items-center justify-center filter grayscale opacity-40 hover:grayscale-0 hover:opacity-100 hover:text-brand-ember transition-all duration-500 shrink-0 cursor-pointer text-brand-bone"
                  style={{ minWidth: "160px" }}
                >
                  <Image
                    src={brand.src}
                    alt={`${brand.name} logo`}
                    width={brand.width}
                    height={brand.height}
                    className="object-contain h-8 w-auto"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
