"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Button from "../ui/Button";
import HeroVideo from "../ui/HeroVideo";
import { getWhatsAppLink } from "@/lib/whatsapp";

// --- EDITABLE HERO CONSTANTS ---
const HERO_H1 = "India's brand stories, told cinematically — from Indore.";
const HERO_SUBHEAD = "A production studio for founders, D2C brands and agencies who want podcasts, reels and films that actually convert. Built by a 207K-creator who knows what travels.";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Entrance animations that respect prefers-reduced-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 22 },
    },
  } as const;

  const imageVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.97 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  } as const;

  // WhatsApp click-to-chat link
  const whatsappUrl = getWhatsAppLink("Hi, I'd like to discuss a project with The Unofficial Studios.");

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen min-h-[100svh] flex items-center justify-center bg-brand-ink overflow-hidden pt-24 md:pt-32 pb-16 z-20 border-b border-brand-border-hairline"
    >
      {/* Cinematic Studio B-Roll Video Backdrop */}
      <HeroVideo />

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Studio Copy & CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-8 flex flex-col gap-6 md:gap-8 text-left items-start"
          >
            {/* Trust Pill / Supporting Credibility */}
            <motion.div
              variants={textVariants}
              className="flex flex-wrap items-center gap-3 border border-brand-border-accent bg-brand-ember/5 px-4 py-1.5 rounded-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-ember animate-pulse" />
              <span className="font-inter font-bold text-[9px] uppercase tracking-widest text-brand-ember">
                The Unofficial Studios
              </span>
              <span className="text-white/20 font-inter text-[9px]">|</span>
              <a
                href="https://instagram.com/unofficialhimanshu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-inter font-bold text-[9px] uppercase tracking-widest text-brand-bone hover:text-brand-ember transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-ember"
              >
                <span>@unofficialhimanshu</span>
                <span className="font-inter text-brand-ember font-extrabold flex items-center gap-1">
                  207K+ creator audience
                  <svg className="w-3 h-3 text-brand-ember fill-current inline-block" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.002 2.005c-5.522 0-10 4.478-10 10s4.478 10 10 10 10-4.478 10-10-4.478-10-10-10zm4.5 7.5l-5.5 5.5-2.5-2.5c-.387-.387-.387-1.013 0-1.4s1.013-.387 1.4 0l1.1 1.1 4.1-4.1c.387-.387 1.013-.387 1.4 0s.387 1.013 0 1.4z" />
                  </svg>
                </span>
              </a>
            </motion.div>

            {/* Outcome-Led Main Title H1 - One clean mask reveal */}
            <h1 
              className="font-fraunces font-extrabold text-3xl xs:text-4xl md:text-5xl lg:text-[48px] xl:text-[62px] tracking-tight uppercase leading-[1.08] text-brand-bone text-left select-none relative overflow-hidden"
              style={{
                clipPath: shouldReduceMotion ? "none" : "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              }}
            >
              <motion.span
                initial={shouldReduceMotion ? {} : { y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
                className="block"
              >
                India's brand stories, <br />
                told <span className="text-brand-ember italic font-black lowercase tracking-tighter">cinematically</span> — <br />
                from Indore.
              </motion.span>
            </h1>

            {/* Confident Outcome-Led Subhead */}
            <motion.p
              variants={textVariants}
              className="font-inter text-sm sm:text-base md:text-[17px] xl:text-[18px] text-brand-bone-secondary leading-relaxed border-l-2 border-brand-ember pl-4 max-w-[62ch] text-left"
            >
              {HERO_SUBHEAD}
            </motion.p>

            {/* Dual CTAs (>= 44px tap target height) */}
            <motion.div
              variants={textVariants}
              className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto"
            >
              <Button href="#inquiry" variant="primary" className="w-full sm:w-auto min-h-[44px]">
                Hire the Studio
              </Button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[44px] h-11 px-6 border border-brand-border-hairline hover:border-brand-ember bg-transparent hover:bg-brand-ember/5 text-brand-bone font-inter font-bold text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ember focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink"
                aria-label="Book a Call on WhatsApp"
              >
                <svg className="w-3.5 h-3.5 fill-current text-brand-ember shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Book a Call on WhatsApp</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Supporting Side Portrait with soft fade-in */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-4 relative w-full aspect-[4/5] max-w-[285px] lg:max-w-none mx-auto border border-brand-border-hairline bg-brand-surface p-2.5 transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(226,73,46,0.08)] cursor-pointer"
          >
            {/* Gold-ember hairline highlight border shadow */}
            <div className="absolute inset-0 border border-brand-ember/20 -translate-x-2.5 translate-y-2.5 -z-10 pointer-events-none" />

            {/* Ambient Radial Ember Glow behind portrait card */}
            <div className="absolute -inset-8 bg-brand-ember-glow rounded-full blur-[60px] opacity-20 pointer-events-none -z-20" />

            <div className="relative w-full h-full overflow-hidden bg-brand-card">
              <div className="relative w-full h-full">
                <Image
                  src="/himanshu.jpg"
                  alt="Himanshu Soni Portrait"
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  priority
                  fetchPriority="high"
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-103"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
