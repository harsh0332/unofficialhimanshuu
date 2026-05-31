"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Button from "../ui/Button";
import { Play } from "lucide-react";
import RotatingWord from "../ui/RotatingWord";
import CountUp from "../ui/CountUp";

interface JourneyBeat {
  id: number;
  title: string;
  subtitle: string;
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Journey beats data array
  const journeyBeats: JourneyBeat[] = [
    {
      id: 1,
      title: "The Indore Origin",
      subtitle: "Reclaiming raw connection in India's creator boom by refusing canned PR and repetitive templates."
    },
    {
      id: 2,
      title: "208K Strong Community",
      subtitle: "Forging a verified footprint of highly active, intellectual minds who demand unscripted digital authority."
    },
    {
      id: 3,
      title: "Flagship Hot Seat",
      subtitle: "Engineering 'The Unofficial Talks' podcast to extract raw, defining narratives from elite disruptors."
    }
  ];

  // 3D mouse-tilt settings
  const xMV = useMotionValue(0);
  const yMV = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 22 };
  const xSpring = useSpring(xMV, springConfig);
  const ySpring = useSpring(yMV, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Max 6 degrees of rotation
    const rY = (mouseX / (width / 2)) * 6;
    const rX = -(mouseY / (height / 2)) * 6;

    xMV.set(rY);
    yMV.set(rX);
  };

  const handleMouseLeave = () => {
    xMV.set(0);
    yMV.set(0);
  };

  // Scroll parallax settings
  const { scrollY } = useScroll();
  const yTransform = useTransform(scrollY, [0, 500], [0, 50]);
  const yParallax = shouldReduceMotion ? 0 : yTransform;

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
            className="lg:col-span-7 flex flex-col gap-8 text-left items-start"
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

            {/* Founder Display Name - Clip-Path Mask Reveal */}
            <h1 className="font-fraunces font-bold text-5xl sm:text-7xl lg:text-8xl tracking-tight uppercase leading-none text-brand-bone select-none">
              <span className="block overflow-hidden relative pb-1">
                <motion.span
                  initial={{ y: shouldReduceMotion ? 0 : "100%" }}
                  animate={{ y: 0 }}
                  transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.15 }}
                  className="block"
                >
                  HIMANSHU
                </motion.span>
              </span>
              <span className="block overflow-hidden relative">
                <motion.span
                  initial={{ y: shouldReduceMotion ? 0 : "100%" }}
                  animate={{ y: 0 }}
                  transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.28 }}
                  className="block text-brand-ember italic font-extrabold lowercase tracking-tighter"
                >
                  soni.
                </motion.span>
              </span>
            </h1>

            {/* Positioning Statement with Kinetic Rotating Word */}
            <motion.h2
              variants={textVariants}
              className="font-fraunces font-extrabold text-lg sm:text-xl md:text-2xl uppercase tracking-wider text-brand-bone flex flex-wrap items-center gap-x-3 gap-y-1.5 border-l-2 border-brand-ember pl-4 h-[1.3em] overflow-hidden"
            >
              <span className="text-brand-bone-secondary font-light uppercase tracking-widest text-xs md:text-sm mr-1 shrink-0 font-inter">// Brand Profile:</span>
              <RotatingWord words={["Creator.", "Host.", "Storyteller.", "Founder."]} />
            </motion.h2>

            {/* Storytelling Timeline Journey */}
            <div className="relative flex flex-col gap-6 text-left pl-6 border-l border-brand-border-hairline mt-2 max-w-[58ch]">
              {/* Vertical Timeline Line Slider Accent */}
              {!shouldReduceMotion && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
                  className="absolute left-[-1px] top-0 w-[2px] bg-gradient-to-b from-brand-ember to-transparent origin-top"
                />
              )}

              {journeyBeats.map((beat, idx) => (
                <motion.div
                  key={beat.id}
                  variants={shouldReduceMotion ? {} : {
                    hidden: { opacity: 0, x: -12 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 16 }}
                  className="relative flex flex-col gap-1 text-left select-none group"
                >
                  {/* Timeline Active Node Bubble */}
                  {!shouldReduceMotion && (
                    <motion.div
                      initial={{ scale: 0, backgroundColor: "#6F6B63" }}
                      animate={{ scale: 1, backgroundColor: "#E2492E" }}
                      transition={{ delay: 0.4 + idx * 0.25, duration: 0.3 }}
                      className="absolute left-[-31px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-brand-ink z-10"
                    />
                  )}

                  <h3 className="font-fraunces font-bold text-sm uppercase tracking-wide text-brand-bone group-hover:text-brand-ember transition-colors duration-300">
                    {idx + 1}. {beat.title}
                  </h3>
                  <p className="font-inter text-xs text-brand-bone-secondary leading-relaxed">
                    {beat.subtitle}
                  </p>
                </motion.div>
              ))}
            </div>

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

          {/* Right Column: High-Class Portrait with 3D Tilt & Parallax */}
          <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            style={{
              rotateY: xSpring,
              rotateX: ySpring,
              perspective: 1000,
              transformStyle: "preserve-3d"
            }}
            className="lg:col-span-5 relative w-full aspect-[4/5] max-w-sm lg:max-w-none mx-auto border border-brand-border-hairline bg-brand-surface p-3 transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(226,73,46,0.1)] cursor-pointer"
          >
            {/* Absolute positioning element for parallax gold-ember hairline highlight border */}
            <div className="absolute inset-0 border border-brand-ember/25 -translate-x-3 translate-y-3 -z-10 pointer-events-none" />

            {/* Ambient Radial Ember Glow behind portrait card */}
            <div className="absolute -inset-10 bg-brand-ember-glow rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-20" />

            <div className="relative w-full h-full overflow-hidden bg-brand-card">
              <motion.div
                style={{ y: yParallax }}
                className="relative w-full h-full"
              >
                <Image
                  src="/himanshu.jpg"
                  alt="Himanshu Soni Portrait"
                  fill
                  sizes="(max-w-768px) 100vw, 400px"
                  priority
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating follower tag card */}
            <div className="absolute bottom-6 left-6 right-6 z-20 bg-brand-ink/90 border border-brand-border-accent p-4 text-left backdrop-blur-md">
              <span className="block font-fraunces font-extrabold text-lg text-brand-ember uppercase leading-none">
                <CountUp to={208000} duration={2.0} suffix="+" />
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
