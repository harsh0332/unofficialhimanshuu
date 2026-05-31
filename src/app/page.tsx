import React from "react";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Talks from "@/components/sections/Talks";
import Clients from "@/components/sections/Clients";
import Testimonials from "@/components/sections/Testimonials";
import LeadForm from "@/components/sections/LeadForm";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-brand-obsidian flex flex-col w-full text-brand-ivory selection:bg-brand-gold selection:text-brand-obsidian">
      {/* 1. Sticky translucent black navbar */}
      <Navbar />

      <main className="flex-1 flex flex-col w-full relative">
        {/* Background base black canvas layer */}
        <div className="absolute inset-0 bg-brand-obsidian pointer-events-none -z-20" />

        {/* 2. Full-bleed cinematic Hero */}
        <Hero />

        {/* 3. Pull-quote About Section with verified stats */}
        <About />

        {/* 4. Six Services Grid */}
        <Services />

        {/* 5. Work / Portfolio Grid of 6 Embed Slots */}
        <Work />

        {/* 6. Signature Flagship Talks highlight */}
        <Talks />

        {/* 7. Trusted By Clients logo strip */}
        <Clients />

        {/* 8. Testimonials carousel reviews */}
        <Testimonials />

        {/* 9. Let's Create Together Lead Form */}
        <LeadForm />
      </main>

      {/* 10. Social Footer & persistent circular floating WhatsApp button */}
      <Footer />
    </div>
  );
}
