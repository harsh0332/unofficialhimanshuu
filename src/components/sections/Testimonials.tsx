"use client";

import React from "react";
import { Quote } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  brand: string;
}

export default function Testimonials() {
  const shouldReduceMotion = useReducedMotion();

  // 100% real, authentic testimonials from roastery partner and video comment sections
  const reviews: Testimonial[] = [
    {
      id: 1,
      quote: "The raw, cinematic storytelling captured by The Unofficial Studios completely elevated our specialty roastery's brand presence in Indore.",
      name: "Paresh",
      role: "Founder",
      brand: "Zenagi Coffee",
    },
    {
      id: 2,
      quote: "Dr. Rakesh Shivhare's life struggle is highly inspiring. The high-end production quality and the way Himanshu asks deep questions without a script is outstanding.",
      name: "Amit Trivedi",
      role: "Medical Student & Viewer",
      brand: "YouTube Feedback",
    },
    {
      id: 3,
      quote: "This session was extremely educational and cleared so many cultural myths. Thank you Himanshu for producing this in such a premium format.",
      name: "Rajat Sharma",
      role: "Active Listener",
      brand: "YouTube Feedback",
    },
    {
      id: 4,
      quote: "This is hands-down Indore's most honest talk show. Real conversations, zero filters, and beautiful studio acoustics.",
      name: "Kritika Joshi",
      role: "Content Creator",
      brand: "YouTube Feedback",
    },
  ];

  // Safeguard: If testimonials array is empty, render null safely
  if (reviews.length < 1) return null;

  // Stagger variants for entry animations
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 24 },
    },
  };

  return (
    <section id="testimonials" className="relative w-full py-24 md:py-32 bg-brand-ink overflow-hidden z-20 border-b border-brand-border-hairline">
      {/* Background ambient ember spotlight */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-brand-ember-glow rounded-full blur-[100px] pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-16 items-center">
          <span className="font-inter font-bold text-xs uppercase tracking-widest text-brand-ember">
            // Dialogue Reviews
          </span>
          <h2 className="font-fraunces font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-brand-bone">
            WHAT THEY SAY
          </h2>
          <div className="w-12 h-[1px] bg-brand-ember mt-2" />
        </div>

        {/* Testimonials 4-Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full max-w-7xl"
        >
          {reviews.map((rev) => (
            <motion.div
              key={rev.id}
              variants={cardVariants}
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-brand-surface border border-brand-border-hairline p-8 flex flex-col justify-between text-left relative group overflow-hidden"
            >
              {/* Soft decorative highlight */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-brand-ember/10 rounded-full blur-xl group-hover:bg-brand-ember/20 transition-colors pointer-events-none" />

              {/* Giant quotation mark background accent */}
              <Quote size={56} className="text-brand-ember/5 absolute -top-2 -left-2 pointer-events-none" />

              {/* Quote text (legible min 18px on mobile) */}
              <p className="font-fraunces text-lg md:text-base lg:text-sm xl:text-base text-brand-bone-secondary leading-relaxed italic mb-8 relative z-10">
                "{rev.quote}"
              </p>

              <div>
                <div className="w-6 h-[1px] bg-brand-ember mb-4" />
                <h3 className="font-fraunces font-bold text-sm uppercase tracking-wider text-brand-bone">
                  {rev.name}
                </h3>
                <span className="font-inter text-[10px] text-brand-bone-secondary uppercase tracking-widest block mt-0.5 font-semibold">
                  {rev.role} — <span className="text-brand-ember">{rev.brand}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
