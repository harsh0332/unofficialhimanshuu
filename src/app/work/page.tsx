"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import MobileCTABar from "@/components/sections/MobileCTABar";
import { PROJECTS } from "@/lib/projects-data";
import { Sparkles, ArrowRight, Film } from "lucide-react";
import { motion } from "framer-motion";

export default function WorkIndex() {
  return (
    <div className="relative min-h-screen bg-brand-ink flex flex-col w-full text-brand-bone selection:bg-brand-ember selection:text-brand-ink">
      <Navbar />

      <main className="flex-1 flex flex-col w-full relative pt-28 md:pt-36 pb-24 font-inter">
        {/* Background radial spotlight */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-ember-glow rounded-full blur-[160px] pointer-events-none opacity-40 z-0" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
          {/* Header section */}
          <div className="flex flex-col gap-4 text-left mb-16 md:mb-24">
            <div className="flex items-center gap-2">
              <Sparkles size={12} className="text-brand-ember animate-pulse" />
              <span className="font-bold text-xs uppercase tracking-widest text-brand-bone-secondary">
                SELECTED ARCHIVES
              </span>
            </div>
            <h1 className="font-fraunces font-extrabold text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-brand-bone leading-none">
              PROVEN <span className="text-stroke-outline">OUTCOMES</span>
            </h1>
            <p className="max-w-xl text-sm sm:text-base text-brand-bone-secondary leading-relaxed mt-2">
              We don't sell vanity likes. We craft high-end corporate podcasts, viral vertical campaigns, and cinematic brand films that solve real business metrics in India's regional markets.
            </p>
          </div>

          {/* Dynamic Editorial Grid mapping the projects */}
          <div className="flex flex-col gap-16 md:gap-24">
            {PROJECTS.map((proj, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <section
                  key={proj.slug}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center border-b border-brand-border-hairline pb-16 md:pb-24 last:border-none`}
                >
                  {/* Text details column */}
                  <div
                    className={`lg:col-span-7 flex flex-col gap-6 text-left ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-brand-ember font-bold">
                        // Campaign {idx + 1}
                      </span>
                      <h2 className="font-fraunces font-extrabold text-3xl sm:text-5xl text-brand-bone uppercase leading-tight tracking-tight">
                        {proj.brandName}
                      </h2>
                      <p className="font-inter text-xs uppercase tracking-wider text-brand-bone-secondary/80 font-semibold mt-1">
                        {proj.year} &bull; {proj.service}
                      </p>
                    </div>

                    <p className="text-sm sm:text-base text-brand-bone-secondary leading-relaxed font-inter">
                      {proj.problem}
                    </p>

                    {/* Quick Metric highlight */}
                    <div className="grid grid-cols-2 gap-4 bg-brand-surface/40 border border-brand-border-hairline p-5 my-2">
                      <div className="flex flex-col text-left">
                        <span className="text-4xl sm:text-5xl font-fraunces font-extrabold text-brand-ember tracking-tighter leading-none mb-1">
                          {proj.metric}
                        </span>
                        <span className="text-[9px] uppercase tracking-widest text-brand-bone-secondary font-semibold">
                          {proj.metricLabel}
                        </span>
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-4xl sm:text-5xl font-fraunces font-extrabold text-brand-ember tracking-tighter leading-none mb-1">
                          {proj.secondaryMetric}
                        </span>
                        <span className="text-[9px] uppercase tracking-widest text-brand-bone-secondary font-semibold">
                          {proj.secondaryMetricLabel}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link
                        href={`/work/${proj.slug}`}
                        className="inline-flex items-center gap-2 group/btn font-inter font-bold text-xs uppercase tracking-widest text-brand-bone bg-brand-ember hover:bg-brand-ember-deep transition-all duration-300 py-3.5 px-6 rounded-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ember min-h-[44px]"
                      >
                        Explore Case Study
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* Thumbnail Preview column */}
                  <div
                    className={`lg:col-span-5 flex justify-center w-full ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <Link
                      href={`/work/${proj.slug}`}
                      className="relative w-full aspect-[16/10] bg-brand-card border border-brand-border-hairline overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ember transition-all duration-500"
                    >
                      <Image
                        src={proj.posterUrl}
                        alt={`${proj.brandName} Campaign Teaser`}
                        fill
                        sizes="(max-width: 768px) 100vw, 450px"
                        className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
                      />

                      {/* Accent glow on hover */}
                      <div className="absolute inset-0 bg-brand-ember-glow opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />

                      {/* Overlay Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-transparent to-brand-ink/30" />

                      <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                        <div className="flex flex-col items-start text-left gap-1">
                          <span className="font-mono text-[8px] uppercase tracking-widest text-brand-ember flex items-center gap-1 font-bold">
                            <Film size={10} className="text-brand-ember" />
                            VIEW PROJECT
                          </span>
                          <span className="font-fraunces font-bold text-sm text-brand-bone uppercase">
                            Behind the Craft
                          </span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-brand-bone/10 group-hover:bg-brand-ember group-hover:text-brand-ink flex items-center justify-center transition-colors text-brand-bone">
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </Link>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </main>

      <MobileCTABar />
      <Footer />
    </div>
  );
}
