"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { getWhatsAppLink } from "@/lib/whatsapp";

export default function WhatsAppButton() {
  const shouldReduceMotion = useReducedMotion();
  
  // Clean default pre-filled greeting
  const whatsappUrl = getWhatsAppLink("Hi The Unofficial Studios, I'd like to collaborate!");

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 md:bottom-8 right-6 md:right-8 z-50 bg-brand-ember hover:bg-brand-ember-deep text-brand-ink p-3.5 md:p-4 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ember focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink ${
        shouldReduceMotion 
          ? "shadow-[0_4px_20px_rgba(0,0,0,0.5)]" 
          : "shadow-[0_4px_20px_rgba(226,73,46,0.3)] hover:shadow-[0_4px_30px_rgba(226,73,46,0.5)] animate-pulse-glow"
      }`}
      aria-label="Chat with us on WhatsApp"
      style={{ minWidth: "48px", minHeight: "48px" }}
    >
      <MessageCircle size={20} className="fill-current text-brand-ink transition-transform duration-300 group-hover:rotate-6" />
      
      {/* Hover Slide out label for Desktop only */}
      <span className="max-w-0 overflow-hidden font-inter font-bold uppercase tracking-widest text-[9px] group-hover:max-w-[120px] group-hover:ml-2 transition-all duration-500 ease-out whitespace-nowrap hidden md:inline-block text-brand-ink">
        Chat With Us
      </span>
    </a>
  );
}
