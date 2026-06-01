"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Sparkles, ChevronDown, Camera, Film } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// --- EDITABLE PORTFOLIO CONSTANTS (Zenagi Coffee Campaign) ---
const CASE_STUDY = {
  id: "work",
  brandName: "Zenagi Coffee",
  service: "Cinematic Brand Storytelling & Social Strategy",
  year: "2024",
  problem: "Zenagi Specialty Coffee needed to establish their identity as Indore's premium artisanal specialty roastery while competing against aggressive commercial cafe chains.",
  approach: "We produced a high-end cinematic documentary-style story covering their bean-to-cup philosophy, pairing it with atmospheric visual micro-reels highlighting the roasting process.",
  result: "The campaign delivered a +180% growth in cafe footfall and generated 450,000+ organic video views within 30 days of launch.",
  metric: "+180%",
  metricLabel: "Footfall Growth",
  secondaryMetric: "450K+",
  secondaryMetricLabel: "Organic Views",
  videoUrl: "/case1.mp4",
  posterUrl: "/case1-poster.jpg",
  stills: [
    { src: "/collab1.jpg", caption: "Atmospheric Lighting Setup" },
    { src: "/collab2.jpg", caption: "Macro Close-Up Roaster Capture" },
    { src: "/collab3.jpg", caption: "Behind-the-Scenes Monitoring" }
  ],
  backstage: {
    technicalBreakdown: "Shot entirely on location in Indore using RED Cine cameras & anamorphic prime lenses. Calibrated ambient warm lighting to sync cleanly with the roasting steam, preserving organic bean textures in a 60fps dynamic container.",
    designRationale: "We avoided generic product shots, focusing instead on macro roasting sensory cues and artisanal bean-to-cup movement to create an editorial, premium cafe aura.",
    challengesSolutions: "The cafe has mixed lighting. We controlled visual spill by flag-mounting diffuse key lights and color grading natively matching the brand's Ink & Bone aesthetic.",
  }
};

export default function CaseStudy() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Filter filled backstage sub-blocks dynamically to guarantee only active notes render
  const backstageBlocks = [
    { label: "Technical Breakdown", content: CASE_STUDY.backstage?.technicalBreakdown },
    { label: "Design Rationale", content: CASE_STUDY.backstage?.designRationale },
    { label: "Challenges & Solutions", content: CASE_STUDY.backstage?.challengesSolutions }
  ].filter(block => !!block.content);

  // IntersectionObserver to lazy-load video element only on viewport intersect
  useEffect(() => {
    const container = containerRef.current;
    if (!container || shouldReduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
        }
      },
      { threshold: 0.1, rootMargin: "200px" } // Preload 200px before reaching viewport
    );

    observer.observe(container);
    return () => {
      observer.unobserve(container);
    };
  }, [shouldReduceMotion]);

  // IntersectionObserver to autoplay/pause video during scroll
  useEffect(() => {
    if (!hasIntersected || shouldReduceMotion) return;
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch((err) => {
            console.log("Autoplay blocked or interrupted: ", err);
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 } // Autoplay when 25% of the video card is visible
    );

    observer.observe(video);
    return () => {
      observer.unobserve(video);
    };
  }, [hasIntersected, shouldReduceMotion]);

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative w-full py-24 md:py-32 bg-brand-surface border-b border-brand-border-hairline overflow-hidden z-20 font-inter"
    >
      {/* Background ambient ember spotlight */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-ember-glow rounded-full blur-[140px] pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 text-left mb-16">
          <div className="flex items-center gap-2">
            <Sparkles size={12} className="text-brand-ember animate-pulse" />
            <span className="font-inter font-bold text-xs uppercase tracking-widest text-brand-bone-secondary">
              FLAGSHIP CASE STUDY
            </span>
          </div>
          <h2 className="font-fraunces font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-brand-bone">
            PROVEN OUTCOMES
          </h2>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Case details & Text Content */}
          <div className="lg:col-span-7 flex flex-col gap-8 text-left">
            
            {/* Editorial Heading */}
            <div className="border-b border-brand-border-hairline pb-6">
              <h3 className="font-fraunces font-extrabold text-4xl md:text-6xl lg:text-7xl text-brand-bone uppercase leading-none tracking-tight mb-3">
                {CASE_STUDY.brandName}
              </h3>
              <p className="font-inter text-xs md:text-sm uppercase tracking-wider text-brand-ember font-bold">
                {CASE_STUDY.year} &bull; {CASE_STUDY.service}
              </p>
            </div>

            {/* Editorial Narrative Blocks */}
            <div className="flex flex-col gap-6">
              {/* Problem */}
              <div className="flex flex-col gap-2">
                <span className="font-inter font-bold text-[10px] uppercase tracking-widest text-brand-bone-muted">// The Problem</span>
                <p className="text-sm md:text-base text-brand-bone-secondary leading-relaxed font-inter">
                  {CASE_STUDY.problem}
                </p>
              </div>

              {/* Approach */}
              <div className="flex flex-col gap-2">
                <span className="font-inter font-bold text-[10px] uppercase tracking-widest text-brand-bone-muted">// The Approach</span>
                <p className="text-sm md:text-base text-brand-bone-secondary leading-relaxed font-inter">
                  {CASE_STUDY.approach}
                </p>
              </div>

              {/* Result */}
              <div className="flex flex-col gap-2">
                <span className="font-inter font-bold text-[10px] uppercase tracking-widest text-brand-bone-muted">// The Outcome</span>
                <p className="text-sm md:text-base text-brand-bone-secondary leading-relaxed font-inter">
                  {CASE_STUDY.result}
                </p>
              </div>
            </div>

            {/* Oversized Metrics Dashboard */}
            <div className="grid grid-cols-2 gap-4 border-t border-b border-brand-border-hairline py-6 my-2">
              <div className="flex flex-col">
                <span className="text-5xl md:text-7xl font-fraunces font-extrabold text-brand-ember tracking-tighter leading-none mb-1 drop-shadow-[0_0_20px_rgba(226,73,46,0.1)]">
                  {CASE_STUDY.metric}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-brand-bone-secondary font-semibold">
                  {CASE_STUDY.metricLabel}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-5xl md:text-7xl font-fraunces font-extrabold text-brand-ember tracking-tighter leading-none mb-1 drop-shadow-[0_0_20px_rgba(226,73,46,0.1)]">
                  {CASE_STUDY.secondaryMetric}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-brand-bone-secondary font-semibold">
                  {CASE_STUDY.secondaryMetricLabel}
                </span>
              </div>
            </div>

            {/* Backstage Collapsible Drawer */}
            <div className="border border-brand-border-hairline bg-brand-ink/40 p-5 rounded-none">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between font-inter font-bold text-[10px] uppercase tracking-widest text-brand-bone hover:text-brand-ember transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ember-bright cursor-pointer"
                aria-expanded={isOpen}
                aria-controls="backstage-content"
              >
                <span className="flex items-center gap-2">
                  <Camera size={12} className="text-brand-ember" />
                  Backstage — How we made this
                </span>
                <ChevronDown size={14} className={`transition-transform duration-500 ease-out text-brand-bone-secondary ${isOpen ? "rotate-180 text-brand-ember" : ""}`} />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id="backstage-content"
                    initial={shouldReduceMotion ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-5 flex flex-col gap-6 border-t border-brand-border-hairline mt-4">
                      
                      {/* Sub-blocks listed vertically, rendering only filled items */}
                      {backstageBlocks.length > 0 && (
                        <div className="flex flex-col gap-5">
                          {backstageBlocks.map((block, idx) => (
                            <div key={idx} className="flex flex-col gap-1.5 text-left border-l border-brand-border-accent pl-4">
                              <span className="font-mono text-[8px] uppercase tracking-widest text-brand-ember-bright font-bold">
                                // {block.label}
                              </span>
                              <p className="font-inter text-xs leading-relaxed text-brand-bone-secondary">
                                {block.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Behind the scenes stills */}
                      <div className="grid grid-cols-3 gap-3 border-t border-brand-border-hairline pt-5 mt-2">
                        {CASE_STUDY.stills.map((still, idx) => (
                          <div key={idx} className="flex flex-col gap-1.5 group">
                            <div className="relative aspect-[4/3] w-full overflow-hidden border border-brand-border-hairline bg-brand-card">
                              <Image
                                src={still.src}
                                alt={still.caption}
                                fill
                                sizes="(max-width: 768px) 30vw, 150px"
                                className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                              />
                            </div>
                            <span className="text-[7px] md:text-[8px] text-brand-bone-muted font-mono leading-none tracking-normal truncate">
                              {still.caption}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Right Column: 9:16 Smartphone Mockup Clip */}
          <div className="lg:col-span-5 flex justify-center items-center w-full">
            
            {/* Phone/Frame Wrapper container */}
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[9/16] bg-brand-ink border-4 border-brand-border-hairline rounded-[2.5rem] shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden group focus-within:ring-2 focus-within:ring-brand-ember transition-all duration-500">
              
              {/* Top Notch Speaker grill */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-brand-surface border-b border-brand-border-hairline rounded-b-2xl z-30 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-1 bg-brand-border-hairline rounded-full" />
              </div>

              {/* Dynamic Ember Glow bloom effect when hover */}
              <div className="absolute inset-0 bg-brand-ember-glow opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none z-20" />

              {/* Autoplay / Poster display safety panel */}
              <div className="relative w-full h-full">
                {shouldReduceMotion ? (
                  // Motion safe fallbacks: purely static poster
                  <Image
                    src={CASE_STUDY.posterUrl}
                    alt={`${CASE_STUDY.brandName} cinematic video mockup`}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover"
                  />
                ) : !hasIntersected ? (
                  // Lazy state: render only static poster image initially to protect bandwidth
                  <div className="relative w-full h-full bg-brand-card">
                    <Image
                      src={CASE_STUDY.posterUrl}
                      alt={`${CASE_STUDY.brandName} case study preview`}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-cover opacity-80"
                    />
                    {/* Play symbol hint */}
                    <div className="absolute inset-0 flex items-center justify-center bg-brand-ink/20">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-ember/90 border border-brand-border-accent text-brand-ink">
                        <Film size={18} className="text-brand-ink animate-pulse" />
                      </div>
                    </div>
                  </div>
                ) : (
                  // Intersection observer triggered: Mount video stream dynamically
                  <video
                    ref={videoRef}
                    poster={CASE_STUDY.posterUrl}
                    muted
                    playsInline
                    loop
                    preload="metadata"
                    className="w-full h-full object-cover relative z-10 transition-opacity duration-700 ease-in-out"
                  >
                    <source src={CASE_STUDY.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}

                {/* Vertical Overlay Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-transparent to-brand-ink/20 z-20 pointer-events-none" />

                {/* Meta Floating Tag bottom */}
                <div className="absolute bottom-6 left-6 right-6 z-25 flex flex-col items-start gap-1 pointer-events-none text-left">
                  <span className="font-inter font-bold text-[8px] uppercase tracking-widest text-brand-ember flex items-center gap-1">
                    <Film size={10} className="text-brand-ember" />
                    AUTOPLAY REEL
                  </span>
                  <h4 className="font-fraunces font-bold text-sm text-brand-bone leading-tight">
                    Behind the Brew &bull; Zenagi
                  </h4>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
