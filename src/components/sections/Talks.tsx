"use client";

import React from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../ui/Button";

interface Episode {
  id: number;
  title: string;
  guest: string;
  role: string;
  thumbnail: string;
  duration: string;
  tag: string;
}

export default function Talks() {
  const featuredEpisodes: Episode[] = [
    {
      id: 1,
      title: "Building a 100 Crore Tech Startup from Central India",
      guest: "Rajesh Sharma",
      role: "CEO, Indore Logistics",
      thumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=600&h=400&fit=crop",
      duration: "58 Mins",
      tag: "Business Mastery",
    },
    {
      id: 2,
      title: "The Ultimate Future of Creator Economy in India",
      guest: "Ranveer Allahbadia",
      role: "Digital Broadcaster",
      thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=600&h=400&fit=crop",
      duration: "74 Mins",
      tag: "Creator Systems",
    },
    {
      id: 3,
      title: "Behind the Scenes of High-End Cinema & Filmmaking",
      guest: "Vipin Malhotra",
      role: "Cinematographer & Director",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&h=400&fit=crop",
      duration: "45 Mins",
      tag: "Cinematics",
    },
  ];

  return (
    <section id="talks" className="relative w-full py-24 md:py-32 bg-brand-obsidian overflow-hidden z-20 border-t border-brand-border">
      {/* Cinematic overlay light on right */}
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-brand-gold/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="flex flex-col gap-3 text-left">
            <span className="font-inter font-bold text-xs uppercase tracking-widest text-brand-gold">
              // Flagship Show
            </span>
            <h2 className="font-fraunces font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-brand-ivory">
              THE UNOFFICIAL TALKS
            </h2>
            <p className="font-fraunces font-bold text-sm md:text-md uppercase tracking-wider text-brand-muted mt-1">
              Celebrity Dialogues, Real Stories, and Unfiltered Insights.
            </p>
          </div>
          <p className="max-w-md font-inter text-sm text-brand-muted leading-relaxed text-left">
            Our signature podcast where Himanshu Soni sits down with industry giants, builders, and elite creators to explore what goes on behind their public feeds.
          </p>
        </div>

        {/* Featured Episode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEpisodes.map((ep) => (
            <article
              key={ep.id}
              className="group relative bg-brand-surface border border-brand-border overflow-hidden flex flex-col h-full"
            >
              {/* Image Thumbnail Block */}
              <div className="relative aspect-video w-full overflow-hidden bg-brand-card">
                <Image
                  src={ep.thumbnail}
                  alt={`Thumbnail for ${ep.title} with guest ${ep.guest}`}
                  fill
                  sizes="(max-w-768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Visual Vignette Overlay */}
                <div className="absolute inset-0 bg-brand-obsidian/40 group-hover:bg-brand-obsidian/60 transition-all duration-500 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-gold text-brand-obsidian opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-350 cursor-pointer"
                  >
                    <Play size={18} className="fill-current text-brand-obsidian ml-0.5" />
                  </motion.div>
                </div>

                {/* Duration Label */}
                <span className="absolute bottom-3 right-3 bg-brand-obsidian/85 px-2.5 py-1 text-[10px] font-inter font-bold uppercase tracking-wider text-brand-ivory border border-brand-border">
                  {ep.duration}
                </span>

                {/* Tag Overlay */}
                <span className="absolute top-3 left-3 bg-brand-gold px-2.5 py-1 text-[10px] font-inter font-bold uppercase tracking-wider text-brand-obsidian">
                  {ep.tag}
                </span>
              </div>

              {/* Text Caption details */}
              <div className="p-6 flex flex-col flex-1 justify-between gap-6 text-left">
                <div className="flex flex-col gap-2">
                  <span className="font-inter font-bold text-[10px] uppercase tracking-widest text-brand-gold">
                    {ep.guest} — {ep.role}
                  </span>
                  <h3 className="font-fraunces font-extrabold text-md md:text-lg uppercase tracking-wider text-brand-ivory leading-snug group-hover:text-brand-gold transition-colors duration-300">
                    {ep.title}
                  </h3>
                </div>

                <a
                  href="#contact"
                  className="font-inter text-xs font-semibold text-brand-muted group-hover:text-brand-gold transition-colors duration-300 w-fit underline decoration-brand-gold underline-offset-4 decoration-2"
                >
                  Listen Now
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Section watch CTA */}
        <div className="mt-16 text-center">
          <Button href="https://youtube.com/@unofficialhimanshu" variant="outline" className="px-10">
            See All Episodes
          </Button>
        </div>

      </div>
    </section>
  );
}
