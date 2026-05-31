"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import { Play } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  } as const;

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-brand-obsidian pt-20">
      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 cinematic-vignette z-10" />

      {/* Champagne Pulse Spotlight Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/8 rounded-full blur-[120px] pointer-events-none animate-pulse-glow z-0" />

      {/* Grid texture for production look */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] z-0" />

      <div className="relative z-20 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Tagline hook label */}
          <motion.div
            variants={itemVariants}
            className="border border-brand-gold/30 bg-brand-gold/5 px-4 py-1.5 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-ping" />
            <span className="font-inter font-bold text-[9px] uppercase tracking-widest text-brand-gold">
              The Unofficial Studios
            </span>
          </motion.div>

          {/* Tagline Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-fraunces font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-none text-brand-ivory"
          >
            WHERE STORIES <br className="hidden md:block" />
            <span className="text-brand-gold relative inline-block italic font-extrabold lowercase tracking-tighter">
              get real.
              <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-[4px] md:h-[8px] bg-brand-gold/15 -z-10" />
            </span>
          </motion.h1>

          {/* Supporting Statement */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl font-inter text-sm sm:text-base text-brand-muted leading-relaxed"
          >
            Indore's premier broadcasting and media production network. We engineer high-impact celebrity interviews, sponsored vertical campaigns, and cinematic brand assets that command massive attention.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full sm:w-auto"
          >
            <Button href="#contact" variant="primary" className="w-full sm:w-auto">
              Get In Touch
            </Button>
            <Button href="#talks" variant="outline" className="w-full sm:w-auto">
              <Play size={14} className="fill-current text-brand-gold mr-1" />
              Watch The Unofficial Talks
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:block">
        <motion.a
          href="#about"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 cursor-pointer focus:outline-none"
        >
          <span className="font-inter text-[9px] uppercase tracking-widest text-brand-muted hover:text-brand-ivory transition-colors duration-300">
            Scroll to Explore
          </span>
          <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-brand-gold animate-[marquee_2s_linear_infinite]" />
          </div>
        </motion.a>
      </div>
    </section>
  );
}
