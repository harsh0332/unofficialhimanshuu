"use client";

import React from "react";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  company: string;
}

export default function Testimonials() {
  const reviews: Testimonial[] = [
    {
      id: 1,
      quote: "The multi-cam podcast production was unreal. The cinematic aesthetics completely transformed how brands view our interviews, immediately boosting our deal-flow.",
      name: "Vicky Malhotra",
      role: "Founder",
      company: "GrowthLabs",
    },
    {
      id: 2,
      quote: "Himanshu and his team matched our brand design language immediately. The sponsored vertical reels campaign generated over 2M organic views within 2 weeks.",
      name: "Sneha Patel",
      role: "Brand Marketing Director",
      company: "OPPO India",
    },
    {
      id: 3,
      quote: "The Unofficial Studios provides hands-down the best video broadcasting capabilities in Central India. Edgy, high-contrast assets that convert passive eyes.",
      name: "Aarav Mehta",
      role: "Creative Director",
      company: "Indore Summit Network",
    },
  ];

  return (
    <section id="testimonials" className="relative w-full py-24 md:py-32 bg-brand-obsidian overflow-hidden z-20">
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-brand-gold/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-16 items-center">
          <span className="font-inter font-bold text-xs uppercase tracking-widest text-brand-gold">
            // Dialogue Reviews
          </span>
          <h2 className="font-fraunces font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-brand-ivory">
            WHAT THEY SAY
          </h2>
          <div className="w-12 h-[1px] bg-brand-gold mt-2" />
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {reviews.map((rev) => (
            <motion.div
              key={rev.id}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-brand-surface border border-brand-border p-8 flex flex-col justify-between text-left relative group overflow-hidden"
            >
              {/* Soft decorative highlight */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-brand-gold/10 rounded-full blur-xl group-hover:bg-brand-gold/20 transition-colors pointer-events-none" />

              <Quote size={24} className="text-brand-gold/40 mb-6 shrink-0" />

              <p className="font-inter text-xs md:text-sm text-brand-muted leading-relaxed italic mb-8 relative z-10">
                "{rev.quote}"
              </p>

              <div>
                <div className="w-6 h-[1px] bg-brand-gold mb-4" />
                <h3 className="font-fraunces font-extrabold text-sm uppercase tracking-wider text-brand-ivory">
                  {rev.name}
                </h3>
                <span className="font-inter text-[10px] text-brand-muted uppercase tracking-widest block mt-0.5">
                  {rev.role} — <span className="text-brand-ivory/60">{rev.company}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
