"use client";

import React from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";

// CLS-safe visual placeholders matching actual section dimensions and design tokens
const SectionPlaceholder = ({ height, className = "" }: { height: string; className?: string }) => (
  <div 
    style={{ minHeight: height }} 
    className={`w-full bg-brand-ink flex items-center justify-center border-b border-brand-border-hairline relative ${className}`}
  >
    {/* Cinematic minimal ember load loader */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-ember-glow rounded-full blur-[40px] pointer-events-none opacity-40" />
    <div className="w-6 h-6 border-2 border-brand-ember/25 border-t-brand-ember rounded-full animate-spin relative z-10" />
  </div>
);

// Lazy below-the-fold client-side only component loads (ssr: false, CLS-safe placeholders)
const Clients = dynamic(() => import("@/components/sections/Clients"), {
  ssr: false,
  loading: () => <SectionPlaceholder height="120px" />,
});

const Services = dynamic(() => import("@/components/sections/Services"), {
  ssr: false,
  loading: () => <SectionPlaceholder height="450px" />,
});

const CaseStudy = dynamic(() => import("@/components/sections/CaseStudy"), {
  ssr: false,
  loading: () => <SectionPlaceholder height="700px" />,
});

const Talks = dynamic(() => import("@/components/sections/Talks"), {
  ssr: false,
  loading: () => <SectionPlaceholder height="600px" />,
});

const InstagramReels = dynamic(() => import("@/components/sections/InstagramReels"), {
  ssr: false,
  loading: () => <SectionPlaceholder height="600px" />,
});

const Founder = dynamic(() => import("@/components/sections/Founder"), {
  ssr: false,
  loading: () => <SectionPlaceholder height="550px" />,
});

const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), {
  ssr: false,
  loading: () => <SectionPlaceholder height="400px" />,
});

const PressStrip = dynamic(() => import("@/components/sections/PressStrip"), {
  ssr: false,
  loading: () => null,
});

const InquiryRouter = dynamic(() => import("@/components/sections/InquiryRouter"), {
  ssr: false,
  loading: () => <SectionPlaceholder height="550px" />,
});

const MobileCTABar = dynamic(() => import("@/components/sections/MobileCTABar"), {
  ssr: false,
  loading: () => null,
});

const Footer = dynamic(() => import("@/components/sections/Footer"), {
  ssr: false,
  loading: () => <SectionPlaceholder height="250px" />,
});

export default function Home() {
  return (
    <div className="relative min-h-screen bg-brand-ink flex flex-col w-full text-brand-bone selection:bg-brand-ember selection:text-brand-ink">
      {/* 1. Sticky translucent black navbar */}
      <Navbar />

      <main className="flex-1 flex flex-col w-full relative">
        {/* Background base black canvas layer */}
        <div className="absolute inset-0 bg-brand-ink pointer-events-none -z-20" />

        {/* 2. Full-bleed cinematic Hero (Himanshu Soni Personal Brand) */}
        <Hero />

        {/* 3. Sponsors / Trusted By Strip -> Oppo and Hasselblad marquees */}
        <Clients />

        {/* 4. Services Arsenal (Consolidated 3 services) */}
        <Services />

        {/* 5. Flagship Cinematic Case Study (Zenagi Coffee) */}
        <CaseStudy />

        {/* 6. Podcast Hub ("The Unofficial Talks" Showcase) */}
        <Talks />

        {/* 7. Popular Instagram Reels Hub */}
        <InstagramReels />

        {/* 8. Founder Credibility Profile (Himanshu Soni) */}
        <Founder />

        {/* 9. Brand Testimonials */}
        <Testimonials />

        {/* Borrowed Credibility Press Strip */}
        <PressStrip />

        {/* 10. Smart Inquiry Router (Replaces 5 separate forms) */}
        <InquiryRouter />
      </main>

      {/* Persistent Bottom Mobile CTA bar */}
      <MobileCTABar />

      {/* 11. Stark Footer & Persistent WhatsApp Floating trigger */}
      <Footer />
    </div>
  );
}
