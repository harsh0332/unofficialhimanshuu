"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Button from "../ui/Button";
import { Play } from "lucide-react";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Entrance animations that respect prefers-reduced-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  } as const;

  const imageVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  } as const;

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center bg-brand-ink overflow-hidden pt-24 md:pt-32 pb-16 z-20 border-b border-brand-border-hairline"
    >
      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 cinematic-vignette z-10" />

      {/* Ember Spotlight Radial Glow Background Bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-brand-ember-glow rounded-full blur-[130px] pointer-events-none animate-pulse-glow z-0" />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.012] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] z-0" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Personal Brand Typography & CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col gap-6 text-left items-start"
          >
            {/* Creator Badge & IG Metric Hook */}
            <motion.div
              variants={textVariants}
              className="flex flex-wrap items-center gap-3 border border-brand-border-accent bg-brand-ember/5 px-4 py-1.5 rounded-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-ember animate-pulse" />
              <span className="font-inter font-bold text-[9px] uppercase tracking-widest text-brand-ember">
                The Unofficial Studios
              </span>
              <span className="text-white/20 font-inter text-[9px]">|</span>
              {/* Instagram tag & metrics */}
              <a
                href="https://instagram.com/unofficialhimanshu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-inter font-bold text-[9px] uppercase tracking-widest text-brand-bone hover:text-brand-ember transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-ember"
              >
                <span>@unofficialhimanshu</span>
                <span className="font-inter text-brand-ember font-extrabold flex items-center gap-1">
                  208K Verified
                  <svg className="w-3 h-3 text-brand-ember fill-current inline-block" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.002 2.005c-5.522 0-10 4.478-10 10s4.478 10 10 10 10-4.478 10-10-4.478-10-10-10zm4.5 7.5l-5.5 5.5-2.5-2.5c-.387-.387-.387-1.013 0-1.4s1.013-.387 1.4 0l1.1 1.1 4.1-4.1c.387-.387 1.013-.387 1.4 0s.387 1.013 0 1.4z" />
                  </svg>
                </span>
              </a>
            </motion.div>

            {/* Founder Display Name */}
            <motion.h1
              variants={textVariants}
              className="font-fraunces font-bold text-5xl sm:text-7xl lg:text-8xl tracking-tight uppercase leading-none text-brand-bone"
            >
              HIMANSHU <br />
              <span className="text-brand-ember italic font-extrabold lowercase tracking-tighter">
                soni.
              </span>
            </motion.h1>

            {/* Positioning Statement taglines */}
            <motion.h2
              variants={textVariants}
              className="font-fraunces font-extrabold text-lg sm:text-xl md:text-2xl uppercase tracking-wider text-brand-bone flex flex-wrap items-center gap-x-3 gap-y-1.5 border-l-2 border-brand-ember pl-4"
            >
              <span>Creator.</span>
              <span className="text-brand-bone-secondary font-light">/</span>
              <span>Host.</span>
              <span className="text-brand-bone-secondary font-light">/</span>
              <span>Storyteller.</span>
            </motion.h2>

            {/* Tagline Narrative paragraph */}
            <motion.p
              variants={textVariants}
              className="max-w-[55ch] font-inter text-sm sm:text-base text-brand-bone-secondary leading-relaxed"
            >
              Founder of <strong className="font-bold text-brand-bone">The Unofficial Studios</strong> Indore. We translate raw celebrity narratives, scaled brand campaigns, and high-impact podcast sessions into premium broadcast-grade assets that command absolute authority.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={textVariants}
              className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto"
            >
              <Button href="#contact" variant="primary" className="w-full sm:w-auto">
                Work With Us
              </Button>
              <Button href="#podcast" variant="outline" className="w-full sm:w-auto">
                <Play size={14} className="fill-current text-brand-ember mr-1 shrink-0" />
                Watch The Unofficial Talks
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column: High-Class Portrait Placeholder & Bloom */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 relative w-full aspect-[4/5] max-w-sm lg:max-w-none mx-auto border border-brand-border-hairline bg-brand-surface p-3"
          >
            {/* Absolute positioning element for parallax gold-ember hairline highlight border */}
            <div className="absolute inset-0 border border-brand-ember/25 -translate-x-3 translate-y-3 -z-10 pointer-events-none" />

            <div className="relative w-full h-full overflow-hidden bg-brand-card">
              <Image
                src="/himanshu.jpg"
                alt="Himanshu Soni Portrait"
                fill
                sizes="(max-w-768px) 100vw, 400px"
                priority
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating follower tag card */}
            <div className="absolute bottom-6 left-6 right-6 z-20 bg-brand-ink/90 border border-brand-border-accent p-4 text-left backdrop-blur-md">
              <span className="block font-fraunces font-extrabold text-lg text-brand-bone uppercase leading-none">
                208,000+
              </span>
              <span className="block font-inter text-[8px] text-brand-bone-secondary uppercase tracking-widest mt-1">
                Verified Instagram Creator Followers
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
