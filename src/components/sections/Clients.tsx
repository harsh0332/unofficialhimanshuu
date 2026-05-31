"use client";

import React from "react";
import { Sparkles } from "lucide-react";

// Inline SVG components for absolute currentColor inheritance and interactive transitions
const OppoLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M45 30C45 20.61 52.61 13 62 13C71.39 13 79 20.61 79 30C79 39.39 71.39 47 62 47C52.61 47 45 39.39 45 30ZM49 30C49 37.18 54.82 43 62 43C69.18 43 75 37.18 75 30C75 22.82 69.18 17 62 17C54.82 17 49 22.82 49 30Z" fill="currentColor"/>
    <path d="M85 30C85 20.61 92.61 13 102 13C111.39 13 119 20.61 119 30C119 39.39 111.39 47 102 47C92.61 47 85 39.39 85 30ZM89 30C89 37.18 94.82 43 102 43C109.18 43 115 37.18 115 30C115 22.82 109.18 17 102 17C94.82 17 89 22.82 89 30Z" fill="currentColor"/>
    <path d="M125 14V46H129V32C129 23.71 134.82 17 142 17C149.18 17 155 22.82 155 30C155 37.18 149.18 43 142 43C138.5 43 134.5 41.5 132 39.5L129 42.5V46H125ZM132 30C132 37.18 136.5 43 142 43C147.5 43 151 37.18 151 30C151 22.82 147.5 17 142 17C136.5 17 132 22.82 132 30Z" fill="currentColor"/>
    <path d="M165 14V46H169V32C169 23.71 174.82 17 182 17C189.18 17 195 22.82 195 30C195 37.18 189.18 43 182 43C178.5 43 174.5 41.5 172 39.5L169 42.5V46H165ZM172 30C172 37.18 176.5 43 182 43C187.5 43 191 37.18 191 30C191 22.82 187.5 17 182 17C176.5 17 172 22.82 172 30Z" fill="currentColor"/>
  </svg>
);

const HasselbladLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <text x="10" y="42" fontFamily="'Fraunces', serif" fontWeight="900" fontSize="24" fill="currentColor" letterSpacing="1.5">HASSELBLAD</text>
  </svg>
);

export default function Clients() {
  const sponsors = [
    { name: "OPPO India", component: OppoLogo },
    { name: "Hasselblad", component: HasselbladLogo },
    { name: "OPPO India Clone", component: OppoLogo },
    { name: "Hasselblad Clone", component: HasselbladLogo },
    { name: "OPPO India Double", component: OppoLogo },
    { name: "Hasselblad Double", component: HasselbladLogo },
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
              {sponsors.map((brand, idx) => {
                const Logo = brand.component;
                return (
                  <div
                    key={`first-${idx}`}
                    className="flex items-center justify-center text-brand-bone-secondary hover:text-brand-ember opacity-60 hover:opacity-100 transition-all duration-500 shrink-0 cursor-pointer"
                    style={{ minWidth: "160px" }}
                  >
                    <Logo className="h-8 w-auto object-contain" />
                  </div>
                );
              })}
            </div>

            {/* Second identical sequence for seamless loop */}
            <div className="flex justify-around items-center w-1/2 gap-12">
              {sponsors.map((brand, idx) => {
                const Logo = brand.component;
                return (
                  <div
                    key={`second-${idx}`}
                    className="flex items-center justify-center text-brand-bone-secondary hover:text-brand-ember opacity-60 hover:opacity-100 transition-all duration-500 shrink-0 cursor-pointer"
                    style={{ minWidth: "160px" }}
                  >
                    <Logo className="h-8 w-auto object-contain" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
