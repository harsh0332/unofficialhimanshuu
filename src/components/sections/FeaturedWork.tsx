"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface WorkItem {
  id: number;
  title: string;
  category: string;
  image: string;
  gridClass: string;
}

export default function FeaturedWork() {
  const items: WorkItem[] = [
    {
      id: 1,
      title: "Directing the Spotlight",
      category: "Cinematography",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600&h=800&fit=crop",
      gridClass: "md:col-span-1 md:row-span-2 aspect-[3/4]",
    },
    {
      id: 2,
      title: "Multi-Camera Podcast Rigging",
      category: "Production Setup",
      image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800&h=550&fit=crop",
      gridClass: "md:col-span-2 md:row-span-1 aspect-[16/10]",
    },
    {
      id: 3,
      title: "Darkroom Post-Production Suite",
      category: "Creative Direction",
      image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=800&h=550&fit=crop",
      gridClass: "md:col-span-2 md:row-span-1 aspect-[16/10]",
    },
    {
      id: 4,
      title: "Mastering the Interview Desk",
      category: "Broadcast Studio",
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=600&h=800&fit=crop",
      gridClass: "md:col-span-1 md:row-span-2 aspect-[3/4]",
    },
  ];

  return (
    <section id="work" className="relative w-full py-24 md:py-32 bg-brand-black overflow-hidden z-20">
      {/* Background soft glow on bottom left */}
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-crimson/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="flex flex-col gap-3">
            <span className="font-syne font-bold text-xs uppercase tracking-widest text-brand-crimson">
              // Spotlight Grid
            </span>
            <h2 className="font-syne font-extrabold text-3xl md:text-5xl uppercase tracking-tight">
              FEATURED WORK & GUESTS
            </h2>
          </div>
          <p className="max-w-md font-inter text-sm text-brand-muted leading-relaxed">
            A window into the high-contrast, editorial aesthetics we curate for ourselves and the brands that step into our orbit.
          </p>
        </div>

        {/* Asymmetric Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden bg-brand-dark border border-white/5 cursor-pointer ${item.gridClass}`}
            >
              {/* Full-size Image */}
              <Image
                src={item.image}
                alt={`${item.title} - ${item.category}`}
                fill
                sizes="(max-w-768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-500 z-10" />

              {/* Text Caption Overlay on Hover */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 flex flex-col gap-1.5 text-left">
                <span className="font-syne font-bold text-[9px] uppercase tracking-widest text-brand-crimson">
                  {item.category}
                </span>
                <h3 className="font-syne font-extrabold text-lg md:text-xl uppercase tracking-wide text-white leading-tight">
                  {item.title}
                </h3>
                <span className="font-inter text-xxs text-white/40 group-hover:text-white/60 transition-colors duration-300">
                  Click to inquire about bookings
                </span>
              </div>

              {/* Premium red outline effect on hover */}
              <div className="absolute inset-0 border border-brand-crimson/0 group-hover:border-brand-crimson/35 transition-colors duration-500 pointer-events-none z-30" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
