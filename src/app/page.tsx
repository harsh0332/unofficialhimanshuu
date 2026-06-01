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

// Lazy below-the-fold component split loads
const Talks = dynamic(() => import("@/components/sections/Talks"), {
  loading: () => <SectionPlaceholder height="600px" />,
});

const InstagramReels = dynamic(() => import("@/components/sections/InstagramReels"), {
  loading: () => <SectionPlaceholder height="600px" />,
});

const Clients = dynamic(() => import("@/components/sections/Clients"), {
  loading: () => <SectionPlaceholder height="120px" />,
});

const CaseStudy = dynamic(() => import("@/components/sections/CaseStudy"), {
  loading: () => <SectionPlaceholder height="700px" />,
});

const InquiryRouter = dynamic(() => import("@/components/sections/InquiryRouter"), {
  loading: () => <SectionPlaceholder height="550px" />,
});

const WhatsAppAutomation = dynamic(() => import("@/components/sections/WhatsAppAutomation"), {
  loading: () => <SectionPlaceholder height="450px" />,
});

const Footer = dynamic(() => import("@/components/sections/Footer"), {
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

        {/* 3. Podcast Hub ("The Unofficial Talks" Showcase) */}
        <Talks />

        {/* 3b. Popular Instagram Reels Hub */}
        <InstagramReels />

        {/* 6. Sponsors / Trusted By Strip -> Oppo and Hasselblad marquees */}
        <Clients />

        {/* Flagship Cinematic Case Study (Zenagi Coffee) */}
        <CaseStudy />

        {/* 7. Smart Inquiry Router (Replaces 5 separate forms) */}
        <InquiryRouter />

        {/* 10. WhatsApp Automation -> designed highlight & persist floating chat */}
        <WhatsAppAutomation />
      </main>

      {/* 17. Stark Footer & Persistent WhatsApp Floating trigger */}
      <Footer />
    </div>
  );
}
