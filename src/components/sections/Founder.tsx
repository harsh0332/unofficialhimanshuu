"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Quote } from "lucide-react";
import Button from "../ui/Button";

export default function Founder() {
  const proofPoints = [
    {
      title: "207K+ Engaged Audience",
      description: "Our live, active sandboxed playground to test content hook algorithms, visual pacing, and regional distribution patterns before launching your brand campaigns.",
    },
    {
      title: "Hindi-First Storytelling",
      description: "We communicate in the native narrative syntax of middle India. No superficial translations—we build cultural resonance directly into the creative treatment.",
    },
    {
      title: "Tier-2 Insight, Metro-Grade Craft",
      description: "Combining raw, authentic regional cultural insights from Indore with elite, high-fidelity RED cinema camera setups and high-end post-production engineering.",
    },
  ];

  return (
    <section id="founder" className="relative w-full py-24 md:py-32 bg-brand-ink overflow-hidden z-20 border-t border-brand-border-hairline">
      {/* Premium ambient ember backlight */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-ember-glow rounded-full blur-[140px] pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Supporting Portrait Image Frame */}
          <div className="lg:col-span-5 relative group overflow-hidden border border-brand-border-hairline bg-brand-surface p-2.5 max-w-sm mx-auto lg:mx-0 w-full transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(226,73,46,0.06)]">
            {/* Soft decorative offset frame */}
            <div className="absolute inset-0 border border-brand-ember/15 -translate-x-2 translate-y-2 -z-10 pointer-events-none" />

            <div className="relative aspect-[3/4] w-full overflow-hidden bg-brand-card">
              <Image
                src="/himanshu.jpg"
                alt="Himanshu Soni - Founder and Creative Director of The Unofficial Studios"
                fill
                sizes="(max-w-768px) 100vw, 33vw"
                className="object-cover filter grayscale hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-103"
                loading="lazy"
              />
              {/* Soft visual vignette blend */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-transparent to-transparent opacity-60 pointer-events-none z-10" />
            </div>

            {/* Static credibility label overlay inside card */}
            <div className="absolute bottom-6 left-6 z-20 flex flex-col text-left">
              <span className="font-fraunces font-extrabold text-2xl text-brand-bone tracking-tight">
                Himanshu Soni
              </span>
              <span className="font-inter text-[8px] uppercase tracking-widest text-brand-ember font-bold">
                Founder & Creative Director
              </span>
            </div>
            
            <div className="absolute inset-0 border border-brand-ember/0 group-hover:border-brand-ember/25 transition-colors duration-500 pointer-events-none z-30" />
          </div>

          {/* Right Column: Strategic Copy & Proof Points */}
          <div className="lg:col-span-7 flex flex-col gap-8 text-left font-inter">
            <div className="flex flex-col gap-3">
              <span className="font-inter font-bold text-xs uppercase tracking-widest text-brand-ember">
                // Studio Credibility
              </span>
              <h2 className="font-fraunces font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-brand-bone leading-[1.1] max-w-[20ch]">
                Led by a creator who understands what India watches.
              </h2>
            </div>

            {/* Quote Block from Himanshu */}
            <div className="relative bg-brand-surface/40 border-l-2 border-brand-ember p-6 md:p-8 my-2">
              <Quote className="absolute top-4 right-4 text-brand-ember/15 w-12 h-12 pointer-events-none" />
              <p className="font-fraunces italic text-base md:text-lg text-brand-bone-secondary leading-relaxed relative z-10">
                &ldquo;Traditional production houses hand you a beautiful video and walk away. We do the opposite. Because we run a live creator network, we know the exact hooks, visual pacing, and regional narratives that make audiences stop scrolling.&rdquo;
              </p>
            </div>

            {/* Core Proof Points Grid */}
            <div className="flex flex-col gap-6">
              {proofPoints.map((point, index) => (
                <div key={index} className="flex gap-4 items-start border-b border-brand-border-hairline pb-4 last:border-0 last:pb-0">
                  <span className="font-mono text-xs text-brand-ember/80 font-bold mt-1 shrink-0 select-none">
                    0{index + 1}.
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h4 className="font-inter font-bold text-sm md:text-base uppercase tracking-wider text-brand-bone">
                      {point.title}
                    </h4>
                    <p className="text-xs md:text-sm text-brand-bone-muted leading-relaxed max-w-[62ch]">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Unified Action CTA (>= 44px tap target height) */}
            <div className="mt-4 pt-2">
              <Button href="#inquiry" variant="primary" className="inline-flex items-center gap-2 min-h-[44px] px-8">
                <span>Start a Project</span>
                <ArrowRight size={14} className="text-brand-ink" />
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
