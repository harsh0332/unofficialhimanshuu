"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// Custom inline brand SVGs for perfect compiler safety and lightweight footprint
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Founder() {
  const socials = [
    { icon: InstagramIcon, url: "https://instagram.com/unofficialhimanshu", label: "Instagram" },
    { icon: YoutubeIcon, url: "https://youtube.com/@unofficialhimanshu", label: "YouTube" },
    { icon: LinkedinIcon, url: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <section id="founder" className="relative w-full py-24 md:py-32 bg-brand-black overflow-hidden z-20 border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-crimson/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Premium Stylized B&W Portrait Placeholder */}
          <div className="lg:col-span-5 relative group overflow-hidden border border-white/10 aspect-[3/4] max-w-sm mx-auto lg:mx-0 w-full bg-brand-dark">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&h=800&fit=crop"
              alt="Himanshu Soni - Founder of The Unofficial Studios"
              fill
              sizes="(max-w-768px) 100vw, 33vw"
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            {/* Vignette on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-60 z-10" />
            
            {/* Followers Stat overlay */}
            <div className="absolute bottom-6 left-6 z-20 flex flex-col">
              <span className="font-syne font-extrabold text-3xl text-white">
                208K+
              </span>
              <span className="font-inter text-xxs uppercase tracking-wider text-brand-muted">
                Audience Reach
              </span>
            </div>

            <div className="absolute inset-0 border border-brand-crimson/0 group-hover:border-brand-crimson/40 transition-colors duration-500 pointer-events-none z-30" />
          </div>

          {/* Right Column: Narrative & Metrics */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <span className="font-syne font-bold text-xs uppercase tracking-widest text-brand-crimson">
              // The Founder
            </span>
            
            <h2 className="font-syne font-extrabold text-3xl md:text-5xl uppercase tracking-tight">
              HIMANSHU SONI
            </h2>

            <h3 className="font-syne font-bold text-sm md:text-md uppercase tracking-wider text-brand-muted">
              Bridging the gap between influencer channels & cinematic media networks.
            </h3>

            <p className="font-inter text-sm md:text-base text-white/70 leading-relaxed">
              Himanshu Soni is a prominent digital creator and media engineer based in Indore, India. Recognizing that scattered DMs and emails were stalling deep enterprise connections, Himanshu consolidated his extensive visual knowledge and reach to create **The Unofficial Studios**. 
            </p>
            
            <p className="font-inter text-xs md:text-sm text-brand-muted leading-relaxed">
              Today, the studio acts as the official creative pipeline producing raw celebrity dialogues, marketing strategies, and highly integrated multi-cam video podcasts for leading builders across the nation.
            </p>

            {/* Social Anchors Grid */}
            <div className="flex flex-wrap items-center gap-4 mt-4">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-white/10 hover:border-brand-crimson hover:bg-brand-crimson/5 px-4 py-2.5 font-syne font-bold text-xxs uppercase tracking-wider text-white transition-all duration-300 focus:outline-none"
                  >
                    <Icon width={14} height={14} className="text-brand-crimson" />
                    <span>{social.label}</span>
                  </a>
                );
              })}
            </div>

            <a
              href="https://instagram.com/unofficialhimanshu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-syne font-bold text-xs uppercase tracking-widest text-white hover:text-brand-crimson transition-colors duration-300 w-fit mt-4 group focus:outline-none"
            >
              <span>Follow Himanshu Soni</span>
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1 text-brand-crimson" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
