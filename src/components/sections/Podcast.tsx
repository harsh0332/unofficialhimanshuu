"use client";

import React from "react";
import { Play } from "lucide-react";
import Image from "next/image";
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

export default function Podcast() {
  const episodes: Episode[] = [
    {
      id: 1,
      title: "Building a 100 Crore Tech Startup from Central India",
      guest: "Rajesh Sharma",
      role: "Founder, Indore Logistics",
      thumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=600&h=400&fit=crop",
      duration: "58 Mins",
      tag: "Tech & Business",
    },
    {
      id: 2,
      title: "The Ultimate Future of Creator Economy in India",
      guest: "Ranveer Allahbadia",
      role: "Broadcaster & Creator",
      thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=600&h=400&fit=crop",
      duration: "74 Mins",
      tag: "Creator Systems",
    },
    {
      id: 3,
      title: "Behind the Scenes of High-End Cinema & Filmmaking",
      guest: "Vipin Malhotra",
      role: "Award-Winning Director",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&h=400&fit=crop",
      duration: "45 Mins",
      tag: "Filmmaking",
    },
    {
      id: 4,
      title: "Inside the Mind of India's Elite Video Strategist",
      guest: "Himanshu Soni",
      role: "Solo Broadcaster Special",
      thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600&h=400&fit=crop",
      duration: "32 Mins",
      tag: "Creator Mindset",
    },
    {
      id: 5,
      title: "Scaling Vertical Video Operations to 200M+ Organic Views",
      guest: "Sneha Patel",
      role: "Head of Content, GrowthHub",
      thumbnail: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?q=80&w=600&h=400&fit=crop",
      duration: "52 Mins",
      tag: "Short Form Scale",
    },
    {
      id: 6,
      title: "Editorial Brand Positioning in the Next Digital Era",
      guest: "Aarav Mehta",
      role: "Creative Director, Studio Zenith",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=600&h=400&fit=crop",
      duration: "61 Mins",
      tag: "Brand Identity",
    },
  ];

  return (
    <section id="podcast" className="relative w-full py-24 md:py-32 bg-brand-black overflow-hidden z-20">
      {/* Cinematic overlay light on right */}
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-brand-crimson/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="flex flex-col gap-3">
            <span className="font-syne font-bold text-xs uppercase tracking-widest text-brand-crimson">
              // The Broadcast
            </span>
            <h2 className="font-syne font-extrabold text-3xl md:text-5xl uppercase tracking-tight">
              FEATURED EPISODES
            </h2>
          </div>
          <p className="max-w-md font-inter text-sm text-brand-muted leading-relaxed">
            Tune in to deep-dive conversations with founders, directors, and top-tier creators on design, scaling operations, and media mastery.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {episodes.map((ep) => (
            <article
              key={ep.id}
              className="group relative bg-brand-dark/40 border border-white/5 overflow-hidden flex flex-col h-full"
            >
              {/* Image Block */}
              <div className="relative aspect-video w-full overflow-hidden bg-brand-dark">
                <Image
                  src={ep.thumbnail}
                  alt={`Thumbnail for ${ep.title} with guest ${ep.guest}`}
                  fill
                  sizes="(max-w-768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Black Overlay with Play Hover */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-crimson text-white opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-350 cursor-pointer"
                  >
                    <Play size={18} className="fill-current text-white ml-0.5" />
                  </motion.div>
                </div>

                {/* Duration Tag */}
                <span className="absolute bottom-3 right-3 bg-brand-black/80 px-2.5 py-1 text-[10px] font-syne font-bold uppercase tracking-wider text-white border border-white/5">
                  {ep.duration}
                </span>

                {/* Tag Overlay */}
                <span className="absolute top-3 left-3 bg-brand-crimson px-2.5 py-1 text-[10px] font-syne font-bold uppercase tracking-wider text-white">
                  {ep.tag}
                </span>
              </div>

              {/* Text Block */}
              <div className="p-6 flex flex-col flex-1 justify-between gap-6">
                <div className="flex flex-col gap-2">
                  <span className="font-syne font-bold text-[10px] uppercase tracking-widest text-brand-crimson">
                    {ep.guest} — {ep.role}
                  </span>
                  <h3 className="font-syne font-extrabold text-md md:text-lg uppercase tracking-wider text-white leading-snug group-hover:text-brand-crimson transition-colors duration-300">
                    {ep.title}
                  </h3>
                </div>

                <a
                  href="#contact"
                  className="font-inter text-xs font-semibold text-white/50 group-hover:text-white transition-colors duration-300 w-fit underline decoration-brand-crimson underline-offset-4 decoration-2"
                >
                  Listen Now
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* See All Episodes CTA */}
        <div className="mt-16 text-center">
          <Button href="https://youtube.com/@unofficialhimanshu" variant="outline" className="px-10">
            See All Episodes
          </Button>
        </div>

      </div>
    </section>
  );
}
