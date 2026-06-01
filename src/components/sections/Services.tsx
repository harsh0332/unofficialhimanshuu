"use client";

import React from "react";
import { Mic, Video, Camera, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Services() {
  const servicesList = [
    {
      icon: Mic,
      title: "Podcast Production",
      description: "Broadcasting-grade multi-cam setup, sound engineering, and end-to-end publishing.",
      projectType: "Podcast",
    },
    {
      icon: Video,
      title: "Brand Reels & Short-Form",
      description: "High-retention vertical videos, custom hooks, and fast-paced edits built to trigger algorithms.",
      projectType: "Reels",
    },
    {
      icon: Camera,
      title: "Studio + Event Filming",
      description: "Premium physical set rentals, Indore camera crew packages, and cinematic event coverage.",
      projectType: "Event Coverage",
    },
  ];

  // Dynamic pre-selection event dispatcher to Inquiry Router
  const handleStartProject = (projectType: string) => {
    const event = new CustomEvent("unofficial-inquiry-trigger", {
      detail: { intent: "hire", projectType }
    });
    window.dispatchEvent(event);

    const el = document.getElementById("inquiry");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="relative w-full py-24 md:py-32 bg-brand-surface border-y border-brand-border-hairline overflow-hidden z-20">
      {/* Background spotlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-ember-glow rounded-full blur-[140px] pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="flex flex-col gap-3 text-left">
            <span className="font-inter font-bold text-xs uppercase tracking-widest text-brand-ember">
              // Purchasable Offerings
            </span>
            <h2 className="font-fraunces font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-brand-bone">
              OUR SERVICES
            </h2>
          </div>
          <p className="max-w-md font-inter text-sm text-brand-bone-secondary leading-relaxed text-left">
            We provide full-spectrum broadcasting and marketing engines engineered to convert passive audiences into raw brand advocates.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative bg-brand-ink border border-brand-border-hairline p-8 hover:border-brand-ember/40 transition-colors duration-500 overflow-hidden flex flex-col justify-between"
              >
                {/* Dynamic Border highlight on hover */}
                <div className="absolute top-0 left-0 w-[2px] h-0 bg-brand-ember group-hover:h-full transition-all duration-500 ease-out" />
                
                <div className="flex flex-col text-left">
                  {/* Icon Block */}
                  <div className="w-10 h-10 flex items-center justify-center bg-brand-ember/5 border border-brand-ember/20 text-brand-ember mb-8 group-hover:bg-brand-ember group-hover:text-brand-ink transition-all duration-500">
                    <Icon size={18} className="transition-transform duration-500 group-hover:scale-110" />
                  </div>

                  <h3 className="font-fraunces font-bold text-xl uppercase tracking-wide text-brand-bone mb-4 leading-tight">
                    {service.title}
                  </h3>

                  <p className="font-inter text-xs text-brand-bone-secondary leading-relaxed mb-8">
                    {service.description}
                  </p>
                </div>

                {/* Conversion Trigger button (satisfies min-h-44px target) */}
                <button
                  onClick={() => handleStartProject(service.projectType)}
                  className="inline-flex items-center gap-1.5 font-inter font-bold text-[9px] uppercase tracking-widest text-brand-bone-secondary group-hover:text-brand-ember transition-colors duration-300 w-fit focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-ember py-2 min-h-[44px] cursor-pointer"
                >
                  <span>Start a project</span>
                  <ArrowRight size={12} className="text-brand-ember group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
