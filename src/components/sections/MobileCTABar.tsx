"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Sparkles } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { getWhatsAppLink } from "@/lib/whatsapp";

export default function MobileCTABar() {
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // prefilled WhatsApp message greeting
  const whatsappUrl = getWhatsAppLink("Hi, I'd like to book a call with The Unofficial Studios.");

  // Visibility tracking on scroll past Hero and hides at Footer
  useEffect(() => {
    const hero = document.getElementById("hero");
    const footer = document.querySelector("footer");

    if (!hero || !footer) return;

    let heroVisible = true;
    let footerVisible = false;

    const updateVisibility = () => {
      // Bar is visible strictly if scrolled past Hero AND Footer is not visible
      setIsVisible(!heroVisible && !footerVisible);
    };

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroVisible = entry.isIntersecting;
        updateVisibility();
      },
      { threshold: 0.1 }
    );

    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        footerVisible = entry.isIntersecting;
        updateVisibility();
      },
      { threshold: 0.05 }
    );

    heroObserver.observe(hero);
    footerObserver.observe(footer);

    return () => {
      heroObserver.unobserve(hero);
      footerObserver.unobserve(footer);
    };
  }, []);

  // Broadcast toggle events to sync floating WhatsApp button height offsets
  useEffect(() => {
    const event = new CustomEvent("unofficial-mobile-cta-toggle", {
      detail: { visible: isVisible }
    });
    window.dispatchEvent(event);
  }, [isVisible]);

  // Click smooth scroll trigger for Inquiry Router
  const handleHireClick = () => {
    const el = document.getElementById("inquiry");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: shouldReduceMotion ? 0 : 80, opacity: shouldReduceMotion ? 1 : 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: shouldReduceMotion ? 0 : 80, opacity: shouldReduceMotion ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-brand-ink/95 backdrop-blur-md border-t border-brand-border-hairline p-4 pb-safe flex gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] md:hidden"
        >
          {/* Action 1: Book a Call (WhatsApp) */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 h-12 border border-brand-border-hairline hover:border-brand-ember text-brand-bone hover:bg-brand-ember/5 font-inter font-bold text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer min-h-[48px] focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-ember"
            aria-label="Book a call on WhatsApp"
          >
            <MessageSquare size={12} className="text-brand-ember" />
            <span>Book a Call</span>
          </a>

          {/* Action 2: Hire the Studio (Scroll to Inquiry Router) */}
          <button
            onClick={handleHireClick}
            className="flex-1 h-12 bg-brand-ember hover:bg-brand-ember-deep text-brand-ink font-inter font-bold text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer min-h-[48px] focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-ember shadow-[0_0_15px_rgba(226,73,46,0.2)] hover:scale-[1.02]"
            aria-label="Hire the Studio"
          >
            <Sparkles size={12} className="text-brand-ink fill-current animate-pulse" />
            <span>Hire Studio</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
