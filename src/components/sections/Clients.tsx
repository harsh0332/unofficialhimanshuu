"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import Image from "next/image";

// Inline Instagram SVG component for compiler safety and lightweight load footprint
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// --- CONFIGURATION BLOCK ---
// Define real client logos here. If empty, the component falls back to the collab thumbnails.
// Each logo: { name: string, component: React.ComponentType<React.SVGProps<SVGSVGElement>> }
export const clientLogos: Array<{
  name: string;
  component: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}> = [];

// Define collab thumbnails for the fallback variant here.
// Each collab: { imageUrl: string, instagramUrl: string, title: string, subtitle?: string }
export const collabThumbnails = [
  {
    imageUrl: "/collab1.jpg",
    instagramUrl: "https://www.instagram.com/reel/DR7w6yRjpIQ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    title: "Cinematic Vision with OPPO S26",
    subtitle: "Featured Reel • 120K Views"
  },
  {
    imageUrl: "/collab2.jpg",
    instagramUrl: "https://www.instagram.com/reel/DSLNzrhjjHE/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    title: "B-Roll Capture Techniques",
    subtitle: "Behind the Lens • 85K Views"
  },
  {
    imageUrl: "/collab3.jpg",
    instagramUrl: "https://www.instagram.com/reel/DYxZKusy5cM/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    title: "The Unofficial Podcast Setup",
    subtitle: "Ember Studio Vibe • 140K Views"
  }
];

// Master toggle to hide the entire section if needed
export const SHOW_SECTION = true;

export default function Clients() {
  if (!SHOW_SECTION) return null;

  const hasRealLogos = clientLogos.length >= 3;
  const hasCollabs = collabThumbnails.length >= 3;

  if (!hasRealLogos && !hasCollabs) return null;

  return (
    <section
      id="clients"
      className="relative w-full py-16 bg-brand-surface border-b border-brand-border-hairline overflow-hidden z-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-8">
        
        {hasRealLogos ? (
          <>
            {/* Title Badge / Honest Label */}
            <div className="flex items-center gap-2 justify-center">
              <Sparkles size={12} className="text-brand-ember animate-pulse" />
              <span className="font-inter font-bold text-[10px] md:text-xs uppercase tracking-widest text-brand-bone-secondary">
                Trusted by
              </span>
              <Sparkles size={12} className="text-brand-ember animate-pulse" />
            </div>

            {/* Infinite Logo Marquee Strip */}
            <div className="relative w-full overflow-hidden py-4 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-brand-surface before:to-transparent before:content-[''] after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-brand-surface after:to-transparent after:content-['']">
              <div className="flex w-[200%] gap-12 motion-safe:animate-[marquee_25s_linear_infinite] motion-safe:hover:[animation-play-state:paused] motion-reduce:flex-wrap motion-reduce:w-full motion-reduce:justify-center motion-reduce:gap-8">
                {/* First sequence */}
                <div className="flex justify-around items-center w-1/2 gap-12 motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-8">
                  {clientLogos.map((brand, idx) => {
                    const Logo = brand.component;
                    return (
                      <div
                        key={`first-${idx}`}
                        className="flex items-center justify-center text-brand-bone-secondary/60 hover:text-brand-ember grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 shrink-0 cursor-pointer"
                        style={{ minWidth: "160px" }}
                      >
                        <Logo className="h-8 w-auto min-h-[24px] object-contain" />
                      </div>
                    );
                  })}
                </div>

                {/* Second identical sequence for seamless loop */}
                <div className="flex justify-around items-center w-1/2 gap-12 motion-reduce:hidden">
                  {clientLogos.map((brand, idx) => {
                    const Logo = brand.component;
                    return (
                      <div
                        key={`second-${idx}`}
                        className="flex items-center justify-center text-brand-bone-secondary/60 hover:text-brand-ember grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 shrink-0 cursor-pointer"
                        style={{ minWidth: "160px" }}
                      >
                        <Logo className="h-8 w-auto min-h-[24px] object-contain" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Title Badge / Honest Label for Fallback */}
            <div className="flex items-center gap-2 justify-center">
              <Sparkles size={12} className="text-brand-ember animate-pulse" />
              <span className="font-inter font-bold text-[10px] md:text-xs uppercase tracking-widest text-brand-bone-secondary">
                Featured in Himanshu's content
              </span>
              <Sparkles size={12} className="text-brand-ember animate-pulse" />
            </div>

            {/* 3 Collab Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto w-full pt-4">
              {collabThumbnails.map((collab, idx) => (
                <a
                  key={idx}
                  href={collab.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-xl border border-brand-border-hairline bg-brand-card aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ember focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink transition-all duration-500 hover:border-brand-border-accent hover:shadow-[0_0_20px_rgba(226,73,46,0.1)]"
                  aria-label={`View post: ${collab.title}`}
                >
                  {/* Thumbnail Image */}
                  <div className="relative w-full h-full">
                    <Image
                      src={collab.imageUrl}
                      alt={collab.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-80"
                    />
                    
                    {/* Bottom Cinematic Gradient Mask */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                    
                    {/* Top Subtle Ember Overlay Glow */}
                    <div className="absolute inset-0 bg-brand-ember-glow opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-start text-left gap-2">
                      <span className="font-inter font-bold text-[9px] uppercase tracking-widest text-brand-ember flex items-center gap-1.5">
                        <InstagramIcon className="w-3 h-3 shrink-0" />
                        {collab.subtitle || "Instagram Collaboration"}
                      </span>
                      <h3 className="font-fraunces font-bold text-lg md:text-xl text-brand-bone leading-tight group-hover:text-brand-ember transition-colors duration-300">
                        {collab.title}
                      </h3>
                      
                      {/* Subtle Interactive Trigger Link */}
                      <span className="font-inter text-[10px] font-semibold text-brand-bone-secondary group-hover:text-brand-bone flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                        Watch Reel →
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}

      </div>
    </section>
  );
}
