"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import MobileCTABar from "@/components/sections/MobileCTABar";
import InquiryRouter from "@/components/sections/InquiryRouter";
import { Sparkles, Mail, Phone, Clock, MapPin, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [hoveredPin, setHoveredPin] = useState(false);

  // LocalBusiness Structured Data JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://unofficialstudios.com/#localbusiness",
    "name": "The Unofficial Studios",
    "image": "https://unofficialstudios.com/himanshu.jpg",
    "telephone": "+918827736537",
    "url": "https://unofficialstudios.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Sarafa Bazaar / 56 Dukan District",
      "addressLocality": "Indore",
      "addressRegion": "Madhya Pradesh",
      "postalCode": "452001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 22.7196,
      "longitude": 75.8577
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "10:00",
      "closes": "19:00"
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-ink flex flex-col w-full text-brand-bone selection:bg-brand-ember selection:text-brand-ink">
      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <Navbar />

      <main className="flex-1 flex flex-col w-full relative pt-28 md:pt-36 pb-24 font-inter">
        {/* Background ambient spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-ember-glow rounded-full blur-[150px] pointer-events-none opacity-30 z-0" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
          {/* Header section */}
          <div className="flex flex-col gap-3 text-left mb-16">
            <div className="flex items-center gap-2">
              <Sparkles size={12} className="text-brand-ember animate-pulse" />
              <span className="font-bold text-xs uppercase tracking-widest text-brand-bone-secondary">
                GET IN TOUCH
              </span>
            </div>
            <h1 className="font-fraunces font-extrabold text-4xl sm:text-6xl uppercase tracking-tight text-brand-bone">
              START A <span className="text-stroke-outline">PROJECT</span>
            </h1>
            <p className="max-w-xl text-xs sm:text-sm uppercase tracking-wider text-brand-ember font-bold mt-1">
              No forms bloat. Just direct path to Indore's premium creators.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Smart Inquiry Router Container */}
            <div className="lg:col-span-7 bg-brand-surface border border-brand-border-hairline p-1 rounded-none shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <div className="p-3 border border-brand-border-hairline bg-brand-ink/40">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-brand-ember font-bold mb-4 text-left border-b border-brand-border-hairline pb-2">
                  // SECURE LEAD DISPATCH ROUTER
                </span>
                <InquiryRouter />
              </div>
            </div>

            {/* Right Column: Dynamic vector Map & details */}
            <div className="lg:col-span-5 flex flex-col gap-10">
              
              {/* Studio Details Dashboard */}
              <div className="bg-brand-surface border border-brand-border-hairline p-6 flex flex-col gap-6 text-left">
                <h2 className="font-fraunces font-extrabold text-xl uppercase tracking-wider text-brand-bone">
                  STUDIO HEADQUARTERS
                </h2>
                
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-brand-ember shrink-0 mt-0.5" size={16} />
                    <div className="flex flex-col">
                      <span className="text-xxs uppercase tracking-widest text-brand-bone-muted font-bold font-mono">ADDRESS</span>
                      <p className="text-sm text-brand-bone-secondary font-medium mt-0.5 leading-relaxed">
                        Sarafa Bazaar / 56 Dukan District,<br />
                        Indore, Madhya Pradesh 452001, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 border-t border-brand-border-hairline pt-4">
                    <Mail className="text-brand-ember shrink-0 mt-0.5" size={16} />
                    <div className="flex flex-col">
                      <span className="text-xxs uppercase tracking-widest text-brand-bone-muted font-bold font-mono">DIRECT INQUIRIES</span>
                      <a
                        href="mailto:work.unofficialhimanshu@gmail.com"
                        className="text-sm text-brand-bone hover:text-brand-ember transition-colors font-medium mt-0.5 break-all"
                      >
                        work.unofficialhimanshu@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 border-t border-brand-border-hairline pt-4">
                    <Clock className="text-brand-ember shrink-0 mt-0.5" size={16} />
                    <div className="flex flex-col">
                      <span className="text-xxs uppercase tracking-widest text-brand-bone-muted font-bold font-mono">OPERATIONAL HOURS</span>
                      <p className="text-sm text-brand-bone-secondary font-medium mt-0.5">
                        Mon - Sat: 10:00 AM - 07:00 PM IST
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cinematic Vector Map component */}
              <div className="relative w-full aspect-[4/3] bg-brand-surface border border-brand-border-hairline p-6 flex flex-col justify-between overflow-hidden shadow-inner group">
                <div className="absolute inset-0 bg-brand-ember-glow opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />

                {/* Styled Absolute Dark SVG Map of Indore / MP representation */}
                <svg
                  viewBox="0 0 400 300"
                  fill="none"
                  className="absolute inset-0 w-full h-full opacity-35 group-hover:opacity-50 transition-opacity duration-500 z-0 p-8"
                  aria-hidden="true"
                >
                  {/* Concentric radar locator rings */}
                  <circle cx="200" cy="150" r="120" stroke="rgba(226, 73, 46, 0.04)" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="200" cy="150" r="80" stroke="rgba(226, 73, 46, 0.08)" strokeWidth="1" />
                  <circle cx="200" cy="150" r="40" stroke="rgba(226, 73, 46, 0.12)" strokeWidth="1" />
                  
                  {/* MP / Central India stylized vector paths */}
                  <path
                    d="M 50,80 Q 120,40 180,70 T 320,50 T 350,130 T 330,220 T 250,260 T 150,220 T 60,180 Z"
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="1.5"
                    fill="rgba(255, 255, 255, 0.01)"
                  />
                  <path
                    d="M 120,110 L 150,130 L 200,150 L 230,120 L 270,170"
                    stroke="rgba(255, 255, 255, 0.03)"
                    strokeWidth="1"
                  />
                </svg>

                {/* Pulsating neon-glow pins centered on Indore */}
                <button
                  onMouseEnter={() => setHoveredPin(true)}
                  onMouseLeave={() => setHoveredPin(false)}
                  onClick={() => window.open("https://maps.google.com/?q=Indore+Madhya+Pradesh", "_blank")}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 p-4 focus:outline-none cursor-pointer"
                  aria-label="Locator pin centered on Indore headquarters"
                >
                  <span className="relative flex h-6 w-6 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-ember opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-ember border border-brand-bone/20"></span>
                  </span>
                </button>

                {/* Tooltip callouts */}
                <div className="relative z-10 flex flex-col justify-between h-full pointer-events-none text-left">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-brand-ember font-bold bg-brand-ink/90 border border-brand-border-accent px-2 py-1 w-fit">
                    // INDORE LOCATOR
                  </span>

                  <AnimatePresence>
                    {(hoveredPin || true) && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="bg-brand-ink/95 border border-brand-border-hairline p-3 text-left w-full mt-auto"
                      >
                        <span className="block font-mono text-[7px] uppercase tracking-widest text-brand-ember font-bold leading-none mb-1">
                          ACTIVE PIN COORDINATES
                        </span>
                        <p className="font-fraunces font-bold text-xs text-brand-bone uppercase leading-tight mb-0.5">
                          The Unofficial Studios HQ &bull; Central India
                        </p>
                        <span className="text-[9px] text-brand-bone-secondary block">
                          22.7196&deg; N, 75.8577&deg; E &bull; Sarafa District
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>

      <MobileCTABar />
      <Footer />
    </div>
  );
}
