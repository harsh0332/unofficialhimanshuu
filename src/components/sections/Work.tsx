"use client";

import React from "react";
import Image from "next/image";
import { Play, Code } from "lucide-react";
import { motion } from "framer-motion";

interface PortfolioItem {
  id: number;
  title: string;
  client: string;
  category: string;
  views: string;
  thumbnail: string;
  embedHint: string;
}

export default function Work() {
  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: "Scale Storytelling Commercial",
      client: "OPPO India",
      category: "Vertical Video Production",
      views: "1.2M+ Views",
      thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600&h=400&fit=crop",
      embedHint: "Replace with Instagram Reel Iframe / Embed",
    },
    {
      id: 2,
      title: "Hasselblad Optics Showcase Still",
      client: "Hasselblad",
      category: "Cinematography Still",
      views: "800K+ Views",
      thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=600&h=400&fit=crop",
      embedHint: "Replace with YouTube Video Iframe",
    },
    {
      id: 3,
      title: "Creator Economy Talk Ep. 4",
      client: "Ranveer Allahbadia",
      category: "Podcast Production Still",
      views: "2.4M+ Views",
      thumbnail: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=600&h=400&fit=crop",
      embedHint: "Replace with YouTube Iframe / Spotify Embed",
    },
    {
      id: 4,
      title: "The Indore Tech Summit Highlight",
      client: "Indore Tech Syndicate",
      category: "Event Coverage / Recap",
      views: "450K+ Views",
      thumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=600&h=400&fit=crop",
      embedHint: "Replace with Instagram Reel / Video Iframe",
    },
    {
      id: 5,
      title: "Commercial Product Promo Reel",
      client: "UrbanFit",
      category: "Commercial Ad Production",
      views: "1.6M+ Views",
      thumbnail: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&h=400&fit=crop",
      embedHint: "Replace with Instagram Reel Iframe / Embed",
    },
    {
      id: 6,
      title: "High-Aesthetic Brand Spotlight Still",
      client: "Zenith Apparel",
      category: "Social Media Campaign Reel",
      views: "900K+ Views",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=600&h=400&fit=crop",
      embedHint: "Replace with YouTube Short / Reels Embed",
    },
  ];

  return (
    <section id="work" className="relative w-full py-24 md:py-32 bg-brand-obsidian overflow-hidden z-20">
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-gold/4 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="flex flex-col gap-3 text-left">
            <span className="font-inter font-bold text-xs uppercase tracking-widest text-brand-gold">
              // Portfolio
            </span>
            <h2 className="font-fraunces font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-brand-ivory">
              FEATURED WORK
            </h2>
          </div>
          <p className="max-w-md font-inter text-sm text-brand-muted leading-relaxed text-left">
            Take a look at what we've engineered. All slots are configured as easily-replaceable embed placeholders ready to host your YouTube and Instagram reels!
          </p>
        </div>

        {/* 6-Card Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="group relative bg-brand-surface border border-brand-border overflow-hidden flex flex-col h-full"
            >
              {/* Media Embed Placeholder Slot */}
              <div className="relative aspect-video w-full overflow-hidden bg-brand-card flex items-center justify-center">
                {/* Image background placeholder */}
                <Image
                  src={item.thumbnail}
                  alt={`${item.title} - ${item.client}`}
                  fill
                  sizes="(max-w-768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Film grain vignette overlay */}
                <div className="absolute inset-0 bg-brand-obsidian/45 group-hover:bg-brand-obsidian/65 transition-colors duration-500 z-10" />

                {/* Play Overlay Vector */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-gold text-brand-obsidian opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-350 cursor-pointer"
                  >
                    <Play size={18} className="fill-current text-brand-obsidian ml-0.5" />
                  </motion.div>
                </div>

                {/* EXPLICIT EDITABLE PLACEHOLDER MARKUP FLAG */}
                <div className="absolute top-3 left-3 z-20 bg-brand-obsidian/85 border border-brand-gold/30 px-2 py-1 rounded-none flex items-center gap-1.5 pointer-events-none">
                  <Code size={10} className="text-brand-gold shrink-0" />
                  <span className="font-inter text-[8px] text-brand-ivory font-bold uppercase tracking-widest leading-none">
                    EDITABLE EMBED SLOT
                  </span>
                </div>

                {/* View Badge */}
                <span className="absolute bottom-3 right-3 z-20 bg-brand-obsidian/80 border border-brand-border px-2 py-1 text-[9px] font-inter font-bold uppercase tracking-wider text-brand-ivory">
                  {item.views}
                </span>
              </div>

              {/* Text Caption details */}
              <div className="p-6 flex flex-col flex-1 justify-between gap-6 text-left relative z-20 bg-brand-surface">
                <div className="flex flex-col gap-1.5">
                  <span className="font-inter font-bold text-[10px] uppercase tracking-widest text-brand-gold">
                    {item.client} — {item.category}
                  </span>
                  <h3 className="font-fraunces font-extrabold text-md md:text-lg uppercase tracking-wider text-brand-ivory leading-snug group-hover:text-brand-gold transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>

                {/* Code hints detail for code-level visual feedback */}
                <div className="bg-brand-obsidian border border-brand-border p-3 font-mono text-[9px] text-brand-muted select-none text-left rounded-none">
                  <span className="text-brand-muted/40 block mb-1">// Code implementation hint:</span>
                  &lt;iframe src="..." /&gt; <span className="block mt-0.5 text-brand-gold/60">{item.embedHint}</span>
                </div>
              </div>

              {/* Hover highlight border */}
              <div className="absolute inset-0 border border-brand-gold/0 group-hover:border-brand-gold/35 transition-colors duration-500 pointer-events-none z-30" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
