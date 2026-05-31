"use client";

import React from "react";
import Image from "next/image";
import { Play, Code } from "lucide-react";
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
  embedHint: string;
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
      embedHint: "Replace with Instagram Reel / YouTube Embed Iframe",
    },
    {
      id: 2,
      title: "The Ultimate Future of Creator Economy in India",
      guest: "Ranveer Allahbadia",
      role: "Digital Broadcaster",
      thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=600&h=400&fit=crop",
      duration: "74 Mins",
      tag: "Creator Systems",
      embedHint: "Replace with Ranveer Allahbadia Episode Embed Iframe",
    },
    {
      id: 3,
      title: "Behind the Scenes of High-End Cinema & Filmmaking",
      guest: "Vipin Malhotra",
      role: "Cinematographer & Director",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&h=400&fit=crop",
      duration: "45 Mins",
      tag: "Cinematics",
      embedHint: "Replace with Cinema Interview Episode Embed Iframe",
    },
    {
      id: 4,
      title: "Scale-up Secrets of D2C Brand Builders",
      guest: "Aditi Sen",
      role: "Founder, OrganicSkin",
      thumbnail: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&h=400&fit=crop",
      duration: "52 Mins",
      tag: "E-Commerce",
      embedHint: "Replace with D2C Founder Episode Embed Iframe",
    },
    {
      id: 5,
      title: "Indore's Rise as the Cleanest Tech Hub in Asia",
      guest: "Swapnil Jain",
      role: "CTO, Indore Syndicate",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=600&h=400&fit=crop",
      duration: "61 Mins",
      tag: "Regional Growth",
      embedHint: "Replace with Tech Hub Episode Embed Iframe",
    },
    {
      id: 6,
      title: "Mastering High-Aesthetic Cinematic Visual Feeds",
      guest: "Rohan Kapoor",
      role: "Creative Producer",
      thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600&h=400&fit=crop",
      duration: "50 Mins",
      tag: "Production Aesthetics",
      embedHint: "Replace with Creative Producer Episode Embed Iframe",
    },
  ];

  return (
    <section
      id="podcast"
      className="relative w-full py-24 md:py-32 bg-brand-ink overflow-hidden z-20 border-b border-brand-border-hairline"
    >
      {/* Cinematic overlay light on right */}
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-brand-ember-glow rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="flex flex-col gap-3 text-left">
            <span className="font-inter font-bold text-xs uppercase tracking-widest text-brand-ember">
              // Flagship Show
            </span>
            <h2 className="font-fraunces font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-brand-bone">
              THE UNOFFICIAL TALKS
            </h2>
            <p className="font-fraunces font-bold text-sm md:text-md uppercase tracking-wider text-brand-bone-secondary mt-1">
              Celebrity Dialogues, Real Stories, and Unfiltered Insights.
            </p>
          </div>
          <p className="max-w-md font-inter text-sm text-brand-bone-secondary leading-relaxed text-left">
            Our signature podcast where Himanshu Soni sits down with industry giants, builders, and elite creators to explore what goes on behind their public feeds.
          </p>
        </div>

        {/* 6 Episode Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEpisodes.map((ep) => (
            <article
              key={ep.id}
              className="group relative bg-brand-surface border border-brand-border-hairline overflow-hidden flex flex-col h-full hover:border-brand-ember/40 transition-colors duration-500"
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
                <div className="absolute inset-0 bg-brand-ink/40 group-hover:bg-brand-ink/65 transition-all duration-500 flex items-center justify-center z-10">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-ember text-brand-ink opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-350 cursor-pointer"
                  >
                    <Play size={18} className="fill-current text-brand-ink ml-0.5" />
                  </motion.div>
                </div>

                {/* EXPLICIT EDITABLE PLACEHOLDER MARKUP FLAG */}
                <div className="absolute top-3 left-3 z-20 bg-brand-ink/90 border border-brand-border-accent px-2 py-1 flex items-center gap-1.5 pointer-events-none">
                  <Code size={10} className="text-brand-ember shrink-0" />
                  <span className="font-inter text-[8px] text-brand-bone font-bold uppercase tracking-widest leading-none">
                    EDITABLE EMBED
                  </span>
                </div>

                {/* Duration Label */}
                <span className="absolute bottom-3 right-3 z-20 bg-brand-ink/85 px-2.5 py-1 text-[10px] font-inter font-bold uppercase tracking-wider text-brand-bone border border-brand-border-hairline">
                  {ep.duration}
                </span>

                {/* Tag Overlay */}
                <span className="absolute top-3 right-3 z-20 bg-brand-ember px-2.5 py-1 text-[10px] font-inter font-bold uppercase tracking-wider text-brand-ink">
                  {ep.tag}
                </span>
              </div>

              {/* Text Caption details */}
              <div className="p-6 flex flex-col flex-1 justify-between gap-6 text-left">
                <div className="flex flex-col gap-2">
                  <span className="font-inter font-bold text-[10px] uppercase tracking-widest text-brand-ember">
                    {ep.guest} — {ep.role}
                  </span>
                  <h3 className="font-fraunces font-extrabold text-md md:text-lg uppercase tracking-wider text-brand-bone leading-snug group-hover:text-brand-ember transition-colors duration-300">
                    {ep.title}
                  </h3>
                </div>

                {/* Code hints detail for code-level visual feedback */}
                <div className="bg-brand-ink border border-brand-border-hairline p-3 font-mono text-[9px] text-brand-bone-secondary select-none">
                  <span className="text-brand-bone-muted block mb-1">// Code implementation:</span>
                  &lt;iframe src="..." /&gt; <span className="block mt-0.5 text-brand-ember/70">{ep.embedHint}</span>
                </div>

                <a
                  href="#contact"
                  className="font-inter text-xs font-bold uppercase tracking-widest text-brand-bone-secondary hover:text-brand-ember transition-colors duration-300 w-fit underline decoration-brand-ember underline-offset-4 decoration-2"
                >
                  Watch Episode
                </a>
              </div>

              {/* Hover outline overlay */}
              <div className="absolute inset-0 border border-brand-ember/0 group-hover:border-brand-ember/25 transition-colors duration-500 pointer-events-none z-20" />
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
