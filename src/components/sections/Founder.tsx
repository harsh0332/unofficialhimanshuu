"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

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
    <section id="founder" className="relative w-full py-24 md:py-32 bg-brand-ink overflow-hidden z-20 border-t border-brand-border-hairline">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-ember-glow rounded-full blur-[120px] pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Premium Portrait Image */}
          <div className="lg:col-span-5 relative group overflow-hidden border border-brand-border-hairline aspect-[3/4] max-w-sm mx-auto lg:mx-0 w-full bg-brand-card">
            <Image
              src="/himanshu.jpg"
              alt="Himanshu Soni - Founder of The Unofficial Studios"
              fill
              sizes="(max-w-768px) 100vw, 33vw"
              className="object-cover filter grayscale hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            {/* Vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/10 to-transparent opacity-75 z-10" />
            
            {/* Followers Stat overlay */}
            <div className="absolute bottom-6 left-6 z-20 flex flex-col text-left">
              <span className="font-fraunces font-extrabold text-3xl text-brand-bone">
                207K+
              </span>
              <span className="font-inter text-[9px] uppercase tracking-wider text-brand-bone-secondary font-bold">
                Audience Network
              </span>
            </div>

            <div className="absolute inset-0 border border-brand-ember/0 group-hover:border-brand-ember/40 transition-colors duration-500 pointer-events-none z-30" />
          </div>

          {/* Right Column: Narrative & Metrics */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left font-inter">
            <span className="font-inter font-bold text-xs uppercase tracking-widest text-brand-ember">
              // The Founder
            </span>
            
            <h2 className="font-fraunces font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-brand-bone">
              HIMANSHU SONI
            </h2>

            <h3 className="font-inter font-bold text-sm md:text-md uppercase tracking-wider text-brand-bone-secondary">
              Bridging the gap between influencer channels & cinematic media networks.
            </h3>

            <p className="text-sm md:text-base text-brand-bone-secondary leading-relaxed">
              Himanshu Soni is a prominent digital creator and media engineer based in Indore, India. His personal creator network of **207K+ organic followers** serves as a real-time testing ground for brand algorithms, viewer retention analytics, and digital engagement models.
            </p>
            
            <p className="text-xs md:text-sm text-brand-bone-secondary leading-relaxed">
              Today, this organic distribution loop acts as a powerful supporting signal for **The Unofficial Studios**, verifying content hooks and distribution playbooks before launching flagship campaigns for national D2C brands, podcast sponsors, and local enterprise networks.
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
                    className="inline-flex items-center gap-2 border border-brand-border-hairline hover:border-brand-ember hover:bg-brand-ember/5 px-4 py-2.5 font-inter font-bold text-[10px] uppercase tracking-wider text-brand-bone transition-all duration-300 focus:outline-none min-h-[44px]"
                  >
                    <Icon width={14} height={14} className="text-brand-ember" />
                    <span>{social.label}</span>
                  </a>
                );
              })}
            </div>

            <a
              href="https://instagram.com/unofficialhimanshu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-inter font-bold text-xs uppercase tracking-widest text-brand-bone hover:text-brand-ember transition-colors duration-300 w-fit mt-4 group focus:outline-none min-h-[44px]"
            >
              <span>Follow Himanshu Soni</span>
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1 text-brand-ember" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
