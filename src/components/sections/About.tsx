"use client";

import React from "react";
import Image from "next/image";

export default function About() {
  const stats = [
    { value: "208K+", label: "Verified Followers" },
    { value: "200M+", label: "Organic Content Views" },
    { value: "100+", label: "Episodes Released" },
    { value: "50+", label: "Brand Partnerships" },
  ];

  return (
    <section id="about" className="relative w-full py-24 md:py-32 bg-brand-obsidian overflow-hidden z-20">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-brand-gold/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Creator Verified Card */}
          <div className="lg:col-span-5 flex flex-col gap-8 text-left">
            <div className="flex flex-col gap-3">
              <span className="font-inter font-bold text-xs uppercase tracking-widest text-brand-gold">
                // The Proof
              </span>
              <h2 className="font-fraunces font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-brand-ivory">
                CREATOR LED, <br />
                STUDIO POWERED
              </h2>
            </div>
            
            <p className="font-inter text-sm md:text-base text-brand-muted leading-relaxed">
              Founded by Himanshu Soni, <strong className="font-bold text-brand-ivory">The Unofficial Studios</strong> is Indore's raw creative pipeline. We don't just record sessions; we engineer high-octane content networks that capture digital attention and build authority.
            </p>

            {/* Himanshu Soni verified profile showcase card */}
            <div className="bg-brand-surface border border-brand-border p-6 flex items-center gap-4 relative overflow-hidden group max-w-sm">
              {/* Highlight bar */}
              <div className="absolute left-0 inset-y-0 w-[3px] bg-brand-gold" />
              
              {/* Profile Image Clip */}
              <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border border-brand-border bg-brand-card">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&fit=crop"
                  alt="Himanshu Soni Profile Picture"
                  fill
                  sizes="56px"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Profile Stats */}
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-fraunces font-bold text-sm text-brand-ivory">Himanshu Soni</span>
                  {/* Verified Tick Badge */}
                  <svg className="w-4 h-4 text-brand-gold fill-current" viewBox="0 0 24 24" aria-label="Verified creator tag">
                    <path d="M12.002 2.005c-5.522 0-10 4.478-10 10s4.478 10 10 10 10-4.478 10-10-4.478-10-10-10zm4.5 7.5l-5.5 5.5-2.5-2.5c-.387-.387-.387-1.013 0-1.4s1.013-.387 1.4 0l1.1 1.1 4.1-4.1c.387-.387 1.013-.387 1.4 0s.387 1.013 0 1.4z" />
                  </svg>
                </div>
                <a
                  href="https://instagram.com/unofficialhimanshu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-inter text-xxs text-brand-muted hover:text-brand-gold transition-colors"
                >
                  @unofficialhimanshu
                </a>
                <span className="font-inter font-bold text-xs text-brand-gold uppercase tracking-wider mt-1.5">
                  208K Verified Followers
                </span>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-6 mt-2">
              {stats.slice(1).map((stat, index) => (
                <div key={index} className="border-l-2 border-brand-border-accent pl-4 py-1">
                  <div className="font-fraunces font-extrabold text-2xl text-brand-ivory">
                    {stat.value}
                  </div>
                  <div className="font-inter text-xxs text-brand-muted uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Pull Quote Styling */}
          <div className="lg:col-span-7 flex flex-col justify-center h-full bg-brand-surface border border-brand-border p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-[40px] pointer-events-none" />
            
            <span className="font-fraunces text-7xl md:text-9xl text-brand-gold/5 absolute -top-6 -left-2 select-none">
              “
            </span>

            <blockquote className="relative z-10 text-left">
              <p className="font-fraunces font-bold text-lg md:text-2xl lg:text-3xl text-brand-ivory leading-snug tracking-wide uppercase italic">
                Hum videos nahi banate, hum stories produce karte hain. Content should connect natively. The Unofficial Studios is our move from simple influencer feeds to a full-fledged cinematic broadcasting headquarters.
              </p>
              
              <footer className="mt-8 flex items-center gap-4">
                <div className="w-10 h-[1px] bg-brand-gold" />
                <div>
                  <cite className="not-italic font-fraunces font-extrabold text-xs uppercase tracking-wider text-brand-ivory flex items-center gap-1.5">
                    <span>Himanshu Soni</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                  </cite>
                  <span className="block font-inter text-[10px] text-brand-muted uppercase tracking-widest mt-0.5">
                    Founder, Creator & Director
                  </span>
                </div>
              </footer>
            </blockquote>
          </div>

        </div>
      </div>
    </section>
  );
}
