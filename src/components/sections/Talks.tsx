"use client";

import React, { useState } from "react";
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
  youtubeId: string;
  embedHint: string;
}

export default function Talks() {
  const [hoveredEpisodeId, setHoveredEpisodeId] = useState<number | null>(null);

  const featuredEpisodes: Episode[] = [
    {
      id: 1,
      title: "Garbh Sanskar Explained by Dr. Priyanka Vedi | Full Podcast",
      guest: "Dr. Priyanka Vedi",
      role: "Ayurveda & Garbh Sanskar Expert",
      thumbnail: "https://img.youtube.com/vi/eYiMwCQ85Kg/hqdefault.jpg",
      duration: "55 Mins",
      tag: "Sciences & Health",
      youtubeId: "eYiMwCQ85Kg",
      embedHint: "Hover cursor to preview video live silently in card",
    },
    {
      id: 2,
      title: "Inside the Mind of a Surgeon | Dr. Rakesh Shivhare Podcast Part 1",
      guest: "Dr. Rakesh Shivhare",
      role: "GI & Laparoscopic Surgeon",
      thumbnail: "https://img.youtube.com/vi/oGiTvl1vv8E/hqdefault.jpg",
      duration: "48 Mins",
      tag: "Medical Realities",
      youtubeId: "oGiTvl1vv8E",
      embedHint: "Hover cursor to preview video live silently in card",
    },
    {
      id: 3,
      title: "Reality of Medical Profession in India | Dr. Rakesh Shivhare Podcast Part 2",
      guest: "Dr. Rakesh Shivhare",
      role: "GI & Laparoscopic Surgeon",
      thumbnail: "https://img.youtube.com/vi/5M0K5Mdlnqo/hqdefault.jpg",
      duration: "50 Mins",
      tag: "Medical Ethics",
      youtubeId: "5M0K5Mdlnqo",
      embedHint: "Hover cursor to preview video live silently in card",
    },
    {
      id: 4,
      title: "5G Kyu Slow Lagta Hai? | Lease Line vs Normal Internet",
      guest: "Aditya Singh Sengar",
      role: "Co-Founder, Green Wed Solutions",
      thumbnail: "https://img.youtube.com/vi/usALSHOTDKQ/hqdefault.jpg",
      duration: "36 Mins",
      tag: "Tech Infrastructure",
      youtubeId: "usALSHOTDKQ",
      embedHint: "Hover cursor to preview video live silently in card",
    },
    {
      id: 5,
      title: "Nayab Midha Loves Indore Food? Fun Conversation at Sarafa & 56 Dukan",
      guest: "Nayab Midha",
      role: "Spoken Word Poet & Artist",
      thumbnail: "https://img.youtube.com/vi/nYIfXqh8_14/hqdefault.jpg",
      duration: "25 Mins",
      tag: "Indore Culture",
      youtubeId: "nYIfXqh8_14",
      embedHint: "Hover cursor to preview video live silently in card",
    },
    {
      id: 6,
      title: "NEET UG 2026 Cancelled | Paper Leak Shock | 22 Lakh Students Affected",
      guest: "Indore Students Community",
      role: "NEET UG Aspirants",
      thumbnail: "https://img.youtube.com/vi/v2gzlQSdjHc/hqdefault.jpg",
      duration: "30 Mins",
      tag: "Ground Reality",
      youtubeId: "v2gzlQSdjHc",
      embedHint: "Hover cursor to preview video live silently in card",
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
          <p className="max-w-xl font-inter text-sm text-brand-bone-secondary leading-relaxed text-left">
            Our signature podcast, "The Unofficial Talks," isn't just about view-counts. It is Indore's most honest hot seat. We sit down with leaders, medical experts, tech founders, and community builders to extract the raw, unscripted truths that other media outlets edit out. We dissect real challenges, celebrate genuine grit, and build a lasting archive of Central India's intellectual landscape.
          </p>
        </div>

        {/* 6 Episode Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEpisodes.map((ep) => (
            <article
              key={ep.id}
              className="group relative bg-brand-surface border border-brand-border-hairline overflow-hidden flex flex-col h-full hover:border-brand-ember/40 transition-colors duration-500"
            >
              {/* Image Thumbnail Block with Hover Trigger to Autoplay */}
              <div
                className="relative aspect-video w-full overflow-hidden bg-brand-card cursor-pointer"
                onMouseEnter={() => setHoveredEpisodeId(ep.id)}
                onMouseLeave={() => setHoveredEpisodeId(null)}
              >
                {hoveredEpisodeId === ep.id ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${ep.youtubeId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&playsinline=1&loop=1&playlist=${ep.youtubeId}`}
                    title={ep.title}
                    className="absolute inset-0 w-full h-full border-none z-10 scale-105 transition-transform pointer-events-none"
                    allow="autoplay; encrypted-media"
                  />
                ) : (
                  <>
                    <Image
                      src={ep.thumbnail}
                      alt={`Thumbnail for ${ep.title} with guest ${ep.guest}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                  </>
                )}

                {/* EXPLICIT HOVER PLAYER MARKUP FLAG */}
                <div className="absolute top-3 left-3 z-20 bg-brand-ink/90 border border-brand-border-accent px-2 py-1 flex items-center gap-1.5 pointer-events-none">
                  <Code size={10} className="text-brand-ember shrink-0" />
                  <span className="font-inter text-[8px] text-brand-bone font-bold uppercase tracking-widest leading-none">
                    {hoveredEpisodeId === ep.id ? "PLAYING PREVIEW" : "LIVE HOVER PLAYER"}
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

                {/* Info detail for hover feedback */}
                <div className="bg-brand-ink border border-brand-border-hairline p-3 font-mono text-[9px] text-brand-bone-secondary select-none">
                  <span className="text-brand-bone-muted block mb-1">// Interactive Action:</span>
                  <span className="block mt-0.5 text-brand-ember/90">{ep.embedHint}</span>
                </div>

                <a
                  href={`https://www.youtube.com/watch?v=${ep.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
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
          <Button href="https://youtube.com/@theunofficialtalks" target="_blank" variant="outline" className="px-10">
            See All Episodes
          </Button>
        </div>
      </div>
    </section>
  );
}
