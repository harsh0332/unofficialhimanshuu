"use client";

import React from "react";
import { Mic, Video, Share2, Flame, TrendingUp, Camera, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Services() {
  const servicesList = [
    {
      icon: Mic,
      title: "Podcast Production",
      description: "Broadcasting-grade setup, raw sound engineering, multicar 4K visuals, and full-pipeline audio/video distribution.",
      ctaLink: "#contact",
      ctaText: "Launch Your Show",
    },
    {
      icon: Video,
      title: "Reel & Short-Video Production",
      description: "High-octane short-form vertical content packed with visual hooks and fast-paced edits designed for virality.",
      ctaLink: "#contact",
      ctaText: "Scale Your Feeds",
    },
    {
      icon: Share2,
      title: "Brand Collaborations / Sponsored Content",
      description: "Native integrations, sponsored storytelling, and creator-brand matching that converts audiences naturally.",
      ctaLink: "#contact",
      ctaText: "Partner With Us",
    },
    {
      icon: Flame,
      title: "Celebrity Interviews & Roasts",
      description: "Unfiltered, high-impact celebrity dialogues and engaging roasts crafted to command conversational spikes.",
      ctaLink: "#contact",
      ctaText: "Book A Session",
    },
    {
      icon: TrendingUp,
      title: "Social Media Management",
      description: "Engineering digital positioning, distribution algorithms, design languages, and audience hooks.",
      ctaLink: "#contact",
      ctaText: "Outsource Growth",
    },
    {
      icon: Camera,
      title: "Event Coverage / On-Ground Content",
      description: "On-ground content capture, professional cinematics, flash recaps, and live broadcasting hooks.",
      ctaLink: "#contact",
      ctaText: "Cover Your Event",
    },
  ];

  return (
    <section id="services" className="relative w-full py-24 md:py-32 bg-brand-surface border-y border-brand-border overflow-hidden z-20">
      {/* Background spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="flex flex-col gap-3 text-left">
            <span className="font-inter font-bold text-xs uppercase tracking-widest text-brand-gold">
              // The Arsenal
            </span>
            <h2 className="font-fraunces font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-brand-ivory">
              OUR SERVICES
            </h2>
          </div>
          <p className="max-w-md font-inter text-sm text-brand-muted leading-relaxed text-left">
            We provide full-spectrum broadcasting and marketing engines engineered to convert passive audiences into raw brand advocates.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative bg-brand-card border border-brand-border p-8 hover:border-brand-gold/40 transition-colors duration-500 overflow-hidden flex flex-col justify-between"
              >
                {/* Dynamic Border highlight on hover */}
                <div className="absolute top-0 left-0 w-[2px] h-0 bg-brand-gold group-hover:h-full transition-all duration-500 ease-out" />
                
                <div>
                  {/* Icon Block */}
                  <div className="w-10 h-10 flex items-center justify-center bg-brand-gold/5 border border-brand-gold/15 text-brand-gold mb-8 group-hover:bg-brand-gold group-hover:text-brand-obsidian transition-all duration-500">
                    <Icon size={18} className="transition-transform duration-500 group-hover:scale-110" />
                  </div>

                  <h3 className="font-fraunces font-extrabold text-lg uppercase tracking-wider text-brand-ivory mb-4">
                    {service.title}
                  </h3>

                  <p className="font-inter text-xs text-brand-muted leading-relaxed mb-8">
                    {service.description}
                  </p>
                </div>

                <a
                  href={service.ctaLink}
                  className="inline-flex items-center gap-1.5 font-inter font-bold text-[9px] uppercase tracking-widest text-brand-muted group-hover:text-brand-gold transition-colors duration-300 w-fit focus:outline-none"
                >
                  <span>{service.ctaText}</span>
                  <ArrowUpRight size={12} className="text-brand-gold" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
