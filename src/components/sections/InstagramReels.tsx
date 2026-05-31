"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Play, Code, Heart, MessageCircle, ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Button from "../ui/Button";

interface Reel {
  id: number;
  title: string;
  topic: string;
  views: string;
  likes: string;
  comments: string;
  thumbnail: string;       // Local cover path e.g. /reel1-cover.jpg
  videoUrl: string;        // Local video path e.g. /reel1-preview.mp4
  instagramUrl: string;    // Direct Instagram profile or post link
  captionHint: string;
}

// Inline Instagram SVG component for compiler safety and lightweight load footprint
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function InstagramReels() {
  const [hoveredReelId, setHoveredReelId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Detect mobile viewport to fully disable canvas loops and video loads
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Exactly 3 Premium local Reels mapped to the /public directory preview files
  const featuredReels: Reel[] = [
    {
      id: 1,
      title: "Indore Traffic Realities: The Unfiltered Truth",
      topic: "Civic Consciousness",
      views: "1.4M",
      likes: "165K",
      comments: "2.1K",
      thumbnail: "/reel1-cover.jpg",
      videoUrl: "/reel1-preview.mp4",
      instagramUrl: "https://www.instagram.com/reel/DR7w6yRjpIQ/",
      captionHint: "Click to watch actual Reel / Hover to watch traffic setup details",
    },
    {
      id: 2,
      title: "Reflecting on Indore's Cultural Identity & Pride",
      topic: "Indore Culture",
      views: "980K",
      likes: "108K",
      comments: "1.2K",
      thumbnail: "/reel2-cover.jpg",
      videoUrl: "/reel2-preview.mp4",
      instagramUrl: "https://www.instagram.com/reel/DSLNzrhjjHE/",
      captionHint: "Click to watch actual Reel / Hover to watch storytelling setups",
    },
    {
      id: 3,
      title: "Raw Entrepreneurship Lessons & Personal Milestones",
      topic: "Founder Mindset",
      views: "1.8M",
      likes: "210K",
      comments: "3.4K",
      thumbnail: "/reel3-cover.jpg",
      videoUrl: "/reel3-preview.mp4",
      instagramUrl: "https://www.instagram.com/reel/DYxZKusy5cM/",
      captionHint: "Click to watch actual Reel / Hover to view milestone metrics",
    },
  ];

  return (
    <section
      id="instagram"
      className="relative w-full py-24 md:py-32 bg-brand-surface overflow-hidden z-20 border-b border-brand-border-hairline"
    >
      {/* Background Cinematic Spot Glow */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-brand-ember-glow rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="flex flex-col gap-3 text-left">
            <span className="font-inter font-bold text-xs uppercase tracking-widest text-brand-ember flex items-center gap-2">
              <InstagramIcon className="w-3.5 h-3.5 text-brand-ember animate-pulse" />
              // Short-Form Dominance
            </span>
            <h2 className="font-fraunces font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-brand-bone">
              POPULAR REELS HUB
            </h2>
            <p className="font-fraunces font-bold text-sm md:text-md uppercase tracking-wider text-brand-bone-secondary mt-1">
              Short-form visual stingers that command absolute digital reach.
            </p>
          </div>
          <p className="max-w-xl font-inter text-sm text-brand-bone-secondary leading-relaxed text-left">
            Explore Himanshu Soni's viral vertical asset engine. Hosted locally for 100% stable, high-definition playbacks, these vertical cuts are engineered to capture real-time storytelling authority without any third-party cookie restrictions.
          </p>
        </div>

        {/* 3 Reels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredReels.map((reel) => (
            <article
              key={reel.id}
              className="group relative bg-brand-surface border border-brand-border-hairline overflow-hidden flex flex-col h-full hover:border-brand-ember/40 transition-colors duration-500"
            >
              {/* Image Cover Block / Hover MP4 Video */}
              <a
                href={reel.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block aspect-[9/16] w-full overflow-hidden bg-brand-card cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ember"
                onMouseEnter={() => setHoveredReelId(reel.id)}
                onMouseLeave={() => setHoveredReelId(null)}
              >
                {hoveredReelId === reel.id && !shouldReduceMotion && !isMobile ? (
                  <video
                    src={reel.videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster={reel.thumbnail}
                    className="absolute inset-0 w-full h-full object-cover z-10 scale-105 transition-transform duration-500"
                  />
                ) : (
                  <>
                    <div className="relative w-full h-full">
                      <Image
                        src={reel.thumbnail}
                        alt={`Instagram Reel Cover: ${reel.title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    {/* Dark Vignette and Hover Action Node */}
                    <div className="absolute inset-0 bg-brand-ink/40 group-hover:bg-brand-ink/65 transition-all duration-500 flex items-center justify-center z-10">
                      <motion.div
                        whileHover={isMobile ? {} : { scale: 1.1 }}
                        className={`w-12 h-12 flex items-center justify-center rounded-full bg-brand-ember text-brand-ink transition-all duration-350 cursor-pointer ${
                          isMobile
                            ? "opacity-90 scale-100"
                            : "opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                        }`}
                      >
                        <Play size={18} className="fill-current text-brand-ink ml-0.5" />
                      </motion.div>
                    </div>
                  </>
                )}

                {/* Live Flag / Tag Overlays - HIDE ON MOBILE */}
                <div className="absolute top-4 left-4 z-20 bg-brand-ink/90 border border-brand-border-accent px-2 py-1 md:flex hidden items-center gap-1.5 pointer-events-none">
                  <Code size={10} className="text-brand-ember shrink-0" />
                  <span className="font-inter text-[8px] text-brand-bone font-bold uppercase tracking-widest leading-none">
                    {hoveredReelId === reel.id && !shouldReduceMotion ? "PLAYING LOCAL CLIP" : "INSTA HOVER LIVE"}
                  </span>
                </div>

                {/* View Metrics Bubble */}
                <span className="absolute bottom-4 right-4 z-20 bg-brand-ink/85 px-2.5 py-1 text-[10px] font-inter font-bold uppercase tracking-wider text-brand-bone border border-brand-border-hairline flex items-center gap-1">
                  <Heart size={10} className="text-brand-ember fill-current" />
                  {reel.views} Views
                </span>

                {/* Custom Category Tag */}
                <span className="absolute top-4 right-4 z-20 bg-brand-ember px-2.5 py-1 text-[10px] font-inter font-bold uppercase tracking-wider text-brand-ink">
                  {reel.topic}
                </span>
              </a>

              {/* Reel Text & Actions Block */}
              <div className="p-6 flex flex-col flex-1 justify-between gap-6 text-left">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-4 text-xxs font-mono text-brand-bone-muted">
                    <span className="flex items-center gap-1">
                      <Heart size={10} className="text-brand-ember" /> {reel.likes} Likes
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={10} className="text-brand-ember" /> {reel.comments} Comments
                    </span>
                  </div>
                  <h3 className="font-fraunces font-extrabold text-md md:text-lg uppercase tracking-wider text-brand-bone leading-snug group-hover:text-brand-ember transition-colors duration-300">
                    {reel.title}
                  </h3>
                </div>

                {/* Simulated interactive help box */}
                <div className="bg-brand-ink border border-brand-border-hairline p-3 font-mono text-[9px] text-brand-bone-secondary select-none">
                  <span className="text-brand-bone-muted block mb-1">
                    {isMobile ? "// Touch Action:" : "// Interactive Action:"}
                  </span>
                  <span className="block mt-0.5 text-brand-ember/90">
                    {isMobile ? "Tap card to watch full Reel on Instagram" : reel.captionHint}
                  </span>
                </div>

                {/* Dedicated Instagram Redirect Action Button */}
                <a
                  href={reel.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-inter text-xs font-bold uppercase tracking-widest text-brand-ink bg-brand-ember hover:bg-brand-ember-deep p-3 text-center transition-all duration-300 w-full flex items-center justify-center gap-2"
                >
                  <InstagramIcon className="w-4 h-4 text-brand-ink shrink-0" />
                  Watch Reel on Instagram
                  <ExternalLink size={12} className="text-brand-ink shrink-0" />
                </a>
              </div>

              {/* Hover overlay border */}
              <div className="absolute inset-0 border border-brand-ember/0 group-hover:border-brand-ember/25 transition-colors duration-500 pointer-events-none z-20" />
            </article>
          ))}
        </div>

        {/* Section CTA */}
        <div className="mt-16 text-center">
          <Button href="https://www.instagram.com/unofficialhimanshu/" target="_blank" variant="outline" className="px-10">
            <InstagramIcon className="w-4 h-4 mr-2 shrink-0 text-brand-ember inline-block" />
            Follow @unofficialhimanshu
          </Button>
        </div>
      </div>
    </section>
  );
}
