import React from "react";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Talks from "@/components/sections/Talks";
import Guest from "@/components/sections/Guest";
import Brands from "@/components/sections/Brands";
import Clients from "@/components/sections/Clients";
import LeadForm from "@/components/sections/LeadForm";
import BookStudio from "@/components/sections/BookStudio";
import EventBooking from "@/components/sections/EventBooking";
import PaymentGateway from "@/components/sections/PaymentGateway";
import WhatsAppAutomation from "@/components/sections/WhatsAppAutomation";
import TeaserRoadmap from "@/components/sections/TeaserRoadmap";
import Footer from "@/components/sections/Footer";

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

        {/* 10. Payment Gateway -> designed Coming Soon placeholder */}
        <PaymentGateway />

        {/* 11. WhatsApp Automation -> designed highlight & persist floating chat */}
        <WhatsAppAutomation />

        {/* 12-16. Teaser Roadmap area + 14. Newsletter (functional) -> webhook type: "newsletter" */}
        <TeaserRoadmap />
      </main>

      {/* 17. Stark Footer & Persistent WhatsApp Floating trigger */}
      <Footer />
    </div>
  );
}
