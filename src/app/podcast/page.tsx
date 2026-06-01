"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import MobileCTABar from "@/components/sections/MobileCTABar";
import { Sparkles, Play, Code, Radio } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

// Custom inline YouTube SVG icon for total type safety and build guarantees
const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.54a29 29 0 0 0 .46 5.12 2.78 2.78 0 0 0 1.95 1.96C5.12 19.08 12 19.08 12 19.08s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 11.54a29 29 0 0 0-.46-5.12z" />
    <polygon points="9.75 15.02 15.5 11.54 9.75 8.06 9.75 15.02" />
  </svg>
);


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

export default function PodcastHub() {
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
    {
      id: 7,
      title: "Tier-2 Digital Ecosystems & Startup Curation with Local Indore Founders",
      guest: "Indore Founder Network",
      role: "SaaS & D2C Builders",
      thumbnail: "https://img.youtube.com/vi/usALSHOTDKQ/hqdefault.jpg",
      duration: "42 Mins",
      tag: "Local Economy",
      youtubeId: "usALSHOTDKQ",
      embedHint: "Hover cursor to preview video live silently in card",
    },
    {
      id: 8,
      title: "The Future of Audio Engineering, Foley Sound & Acoustic Design",
      guest: "Acoustic Craft Studios",
      role: "Senior Foley Engineers",
      thumbnail: "https://img.youtube.com/vi/oGiTvl1vv8E/hqdefault.jpg",
      duration: "38 Mins",
      tag: "Production Craft",
      youtubeId: "oGiTvl1vv8E",
      embedHint: "Hover cursor to preview video live silently in card",
    },
    {
      id: 9,
      title: "Creator Burnout, Mental Health & The Algorithmic Chase",
      guest: "Creative Minds India",
      role: "Digital Creators Collective",
      thumbnail: "https://img.youtube.com/vi/5M0K5Mdlnqo/hqdefault.jpg",
      duration: "45 Mins",
      tag: "Creator Realities",
      youtubeId: "5M0K5Mdlnqo",
      embedHint: "Hover cursor to preview video live silently in card",
    }
  ];

  return (
    <div className="relative min-h-screen bg-brand-ink flex flex-col w-full text-brand-bone selection:bg-brand-ember selection:text-brand-ink">
      <Navbar />

      <main className="flex-1 flex flex-col w-full relative pt-28 md:pt-36 pb-24 font-inter">
        {/* Ambient background radial glow */}
        <div className="absolute top-1/4 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-ember-glow rounded-full blur-[140px] pointer-events-none opacity-30 z-0" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
          
          {/* Header section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-brand-border-hairline pb-12 text-left">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Sparkles size={12} className="text-brand-ember animate-pulse" />
                <span className="font-bold text-xs uppercase tracking-widest text-brand-bone-secondary">
                  THE UNOFFICIAL TALKS
                </span>
              </div>
              <h1 className="font-fraunces font-extrabold text-4xl sm:text-6xl uppercase tracking-tight text-brand-bone">
                EPISODE <span className="text-stroke-outline">ARCHIVE</span>
              </h1>
              <p className="max-w-xl text-xs sm:text-sm uppercase tracking-wider text-brand-ember font-bold mt-1">
                Real Stories &bull; Raw Conversations &bull; Central India's Voice
              </p>
            </div>

            {/* Spotify, Apple, RSS badges */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://youtube.com/@theunofficialtalks"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-surface border border-brand-border-hairline py-2 px-4 text-xs font-bold uppercase tracking-wider text-brand-bone hover:text-brand-ember hover:border-brand-ember/30 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-ember min-h-[44px]"
              >
                <YoutubeIcon className="w-3.5 h-3.5 text-brand-ember shrink-0" />
                YouTube Channel
              </a>
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-surface border border-brand-border-hairline py-2 px-4 text-xs font-bold uppercase tracking-wider text-brand-bone hover:text-brand-ember hover:border-brand-ember/30 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-ember min-h-[44px]"
              >
                <Radio size={14} className="text-brand-ember" />
                Spotify Podcasts
              </a>
              <Link
                href="/podcast/feed.xml"
                className="inline-flex items-center gap-2 bg-brand-surface border border-brand-border-hairline py-2 px-4 text-xs font-bold uppercase tracking-wider text-brand-bone hover:text-brand-ember hover:border-brand-ember/30 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-ember min-h-[44px]"
              >
                <Radio size={14} className="text-brand-ember" />
                RSS XML Feed
              </Link>
            </div>
          </div>

          {/* Hero Featured Episode block */}
          <section className="mb-20 w-full bg-brand-surface border border-brand-border-hairline p-6 md:p-10 text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Featured embedded responsive player */}
              <div className="lg:col-span-7 w-full aspect-video relative overflow-hidden bg-brand-card border border-brand-border-hairline">
                <iframe
                  src="https://www.youtube.com/embed/eYiMwCQ85Kg?modestbranding=1&rel=0&playsinline=1"
                  title="Featured Podcast - Dr. Priyanka Vedi"
                  className="absolute inset-0 w-full h-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Text metadata */}
              <div className="lg:col-span-5 flex flex-col gap-5">
                <span className="font-mono text-[9px] uppercase tracking-widest text-brand-ember font-bold">
                  // LATEST FEATURED EPISODE
                </span>
                <h2 className="font-fraunces font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-brand-bone leading-tight">
                  Dr. Priyanka Vedi On Garbh Sanskar Sciences & Maternity Health
                </h2>
                <p className="text-xs sm:text-sm text-brand-bone-secondary leading-relaxed font-inter">
                  Dr. Priyanka Vedi explains the ancient Ayurveda philosophy of Garbh Sanskar, breaking down how maternal micro-habits, cognitive health, and environmental cues shape fetal growth, and debunks commercial maternity myths in Indore.
                </p>
                <div className="flex flex-wrap gap-4 items-center mt-2 border-t border-brand-border-hairline pt-4">
                  <div className="flex flex-col">
                    <span className="text-xxs uppercase tracking-widest text-brand-bone-muted font-bold font-mono">GUEST</span>
                    <span className="text-xs text-brand-bone font-semibold">Dr. Priyanka Vedi</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xxs uppercase tracking-widest text-brand-bone-muted font-bold font-mono">DURATION</span>
                    <span className="text-xs text-brand-bone font-semibold">55 Mins</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xxs uppercase tracking-widest text-brand-bone-muted font-bold font-mono">TAG</span>
                    <span className="text-xs text-brand-ember font-semibold">Sciences & Health</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Episode Grid Title */}
          <div className="flex justify-start mb-8 text-left">
            <h3 className="font-fraunces font-extrabold text-lg md:text-xl uppercase tracking-wide text-brand-bone">
              ALL ARCHIVED CONVERSATIONS
            </h3>
          </div>

          {/* 9 Episode Cards Grid */}
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
                        alt={`Thumbnail for ${ep.title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Visual Vignette Overlay */}
                      <div className="absolute inset-0 bg-brand-ink/40 group-hover:bg-brand-ink/65 transition-all duration-500 flex items-center justify-center z-10">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-ember text-brand-ink opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-350 cursor-pointer">
                          <Play size={18} className="fill-current text-brand-ink ml-0.5" />
                        </div>
                      </div>
                    </>
                  )}

                  {/* EXPLICIT HOVER PLAYER MARKUP FLAG */}
                  <div className="absolute top-3 left-3 z-20 bg-brand-ink/90 border border-brand-border-accent px-2 py-1 flex items-center gap-1.5 pointer-events-none">
                    <Code size={10} className="text-brand-ember shrink-0" />
                    <span className="font-mono text-[8px] text-brand-bone font-bold uppercase tracking-widest leading-none">
                      {hoveredEpisodeId === ep.id ? "PLAYING PREVIEW" : "LIVE HOVER PLAYER"}
                    </span>
                  </div>

                  {/* Duration Label */}
                  <span className="absolute bottom-3 right-3 z-20 bg-brand-ink/85 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-brand-bone border border-brand-border-hairline">
                    {ep.duration}
                  </span>

                  {/* Tag Overlay */}
                  <span className="absolute top-3 right-3 z-20 bg-brand-ember px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-brand-ink">
                    {ep.tag}
                  </span>
                </div>

                {/* Text Caption details */}
                <div className="p-6 flex flex-col flex-1 justify-between gap-6 text-left">
                  <div className="flex flex-col gap-2">
                    <span className="font-bold text-[10px] uppercase tracking-widest text-brand-ember font-mono">
                      {ep.guest} — {ep.role}
                    </span>
                    <h4 className="font-fraunces font-extrabold text-md md:text-lg uppercase tracking-wider text-brand-bone leading-snug group-hover:text-brand-ember transition-colors duration-300">
                      {ep.title.includes("Kyu") ? (
                        <>
                          <span lang="hi">5G Kyu Slow Lagta Hai?</span> | Lease Line vs Normal Internet
                        </>
                      ) : (
                        ep.title
                      )}
                    </h4>
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
                    className="font-inter text-xs font-bold uppercase tracking-widest text-brand-bone-secondary hover:text-brand-ember transition-colors duration-300 w-fit underline decoration-brand-ember underline-offset-4 decoration-2 focus:outline-none min-h-[44px] flex items-center"
                  >
                    Watch Full Episode
                  </a>
                </div>

                {/* Hover outline overlay */}
                <div className="absolute inset-0 border border-brand-ember/0 group-hover:border-brand-ember/25 transition-colors duration-500 pointer-events-none z-20" />
              </article>
            ))}
          </div>

        </div>
      </main>

      <MobileCTABar />
      <Footer />
    </div>
  );
}
