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

const Guest = dynamic(() => import("@/components/sections/Guest"), {
  loading: () => <SectionPlaceholder height="500px" />,
});

const Brands = dynamic(() => import("@/components/sections/Brands"), {
  loading: () => <SectionPlaceholder height="500px" />,
});

const Clients = dynamic(() => import("@/components/sections/Clients"), {
  loading: () => <SectionPlaceholder height="120px" />,
});

const LeadForm = dynamic(() => import("@/components/sections/LeadForm"), {
  loading: () => <SectionPlaceholder height="600px" />,
});

const BookStudio = dynamic(() => import("@/components/sections/BookStudio"), {
  loading: () => <SectionPlaceholder height="500px" />,
});

const EventBooking = dynamic(() => import("@/components/sections/EventBooking"), {
  loading: () => <SectionPlaceholder height="500px" />,
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

        {/* 4. Guest Application form -> webhook type: "guest" */}
        <Guest />

        {/* 5. Sponsor / Brand Form -> webhook type: "sponsor" */}
        <Brands />

        {/* 6. Sponsors / Trusted By Strip -> Oppo and Hasselblad marquees */}
        <Clients />

        {/* 7. Contact System ("Let's Create Together") -> webhook type: "contact" */}
        <LeadForm />

        {/* 8. Studio Booking -> webhook type: "studio-booking" */}
        <BookStudio />

        {/* 9. Event Booking -> webhook type: "event-booking" */}
        <EventBooking />

        {/* 10. WhatsApp Automation -> designed highlight & persist floating chat */}
        <WhatsAppAutomation />
      </main>

      {/* 17. Stark Footer & Persistent WhatsApp Floating trigger */}
      <Footer />
    </div>
  );
}
