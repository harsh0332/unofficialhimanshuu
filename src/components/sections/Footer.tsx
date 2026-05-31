"use client";

import React from "react";
import { Mail, MessageCircle } from "lucide-react";

// Custom inline brand SVGs for perfect compiler safety and lightweight footprint
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // WhatsApp click-to-chat environment variable fallback
  const whatsappUrl =
    process.env.NEXT_PUBLIC_WHATSAPP_URL ||
    "https://wa.me/918827736537?text=Hi%20The%20Unofficial%20Studios,%20I'd%20like%20to%20collaborate!";

  const footerLinks = [
    { name: "About", href: "#hero" },
    { name: "Podcast Hub", href: "#podcast" },
    { name: "Apply Guest", href: "#guest" },
    { name: "Sponsor Inquiry", href: "#sponsor" },
    { name: "Studio Booking", href: "#studio-booking" },
    { name: "Roadmap Teaser", href: "#roadmap" },
    { name: "Contact System", href: "#contact" },
  ];

  return (
    <>
      <footer className="relative w-full bg-brand-ink border-t border-brand-border-hairline py-12 md:py-16 overflow-hidden z-20 font-inter">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          
          {/* Logo / Brand Name */}
          <div className="flex flex-col gap-2">
            <a
              href="#"
              className="font-fraunces font-extrabold text-md md:text-lg uppercase tracking-tight flex justify-center md:justify-start items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ember focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink px-1"
              aria-label="The Unofficial Studios Home"
            >
              <span className="text-brand-bone">The</span>
              <span className="text-brand-ember">Unofficial</span>
              <span className="text-brand-bone">Studios</span>
            </a>
            <span className="font-inter text-xxs text-brand-bone-muted uppercase tracking-widest">
              Indore, India — Cinematic Media Headquarters
            </span>
          </div>

          {/* Footer Anchors navigation */}
          <nav className="flex items-center gap-6 md:gap-8 flex-wrap justify-center" aria-label="Footer Navigation">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-inter text-xs uppercase tracking-wider text-brand-bone-secondary hover:text-brand-ember transition-colors duration-300 font-semibold focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-ember"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Contact Details & Social Handles */}
          <div className="flex flex-col items-center md:items-end gap-2 w-full max-w-xs md:max-w-none">
            <a
              href="mailto:work.unofficialhimanshu@gmail.com"
              className="inline-flex items-center gap-2 font-inter font-bold text-[10px] sm:text-xs text-brand-bone hover:text-brand-ember transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-ember py-2.5 min-h-[44px] break-all [overflow-wrap:anywhere]"
            >
              <Mail size={14} className="text-brand-ember shrink-0" />
              <span className="lowercase">work.unofficialhimanshu@gmail.com</span>
            </a>

            {/* Social Icons Strip */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xxs font-mono uppercase tracking-widest text-brand-bone-secondary w-full justify-center sm:justify-end">
              <a
                href="https://instagram.com/unofficialhimanshu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-brand-bone transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-ember py-2.5 min-h-[44px] break-all [overflow-wrap:anywhere]"
                aria-label="Himanshu Soni Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-brand-ember shrink-0" />
                <span className="lowercase">@unofficialhimanshu</span>
              </a>
              <span className="hidden sm:inline-block text-white/5">|</span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-brand-bone transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-ember py-2.5 min-h-[44px] break-all [overflow-wrap:anywhere]"
                aria-label="The Unofficial Studios Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-brand-ember shrink-0" />
                <span className="lowercase">@the_unofficial_studios</span>
              </a>
            </div>
          </div>

        </div>

        {/* Copyright strip */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-brand-border-hairline flex flex-col sm:flex-row items-center justify-between gap-4 text-xxs text-brand-bone-muted font-inter uppercase tracking-widest">
          <span>&copy; {currentYear} The Unofficial Studios. All rights reserved.</span>
          <span>Crafted in the "Ink & Bone / Ember" cinematic design system.</span>
        </div>
      </footer>

      {/* Persistent Floating WhatsApp "Chat with us" Button (Ember Re-theming) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 md:bottom-8 right-6 md:right-8 z-50 bg-brand-ember hover:bg-brand-ember-deep text-brand-ink p-3.5 md:p-4 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(226,73,46,0.3)] hover:shadow-[0_4px_30px_rgba(226,73,46,0.5)] transition-all duration-300 hover:scale-105 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ember focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink"
        aria-label="Chat with us on WhatsApp"
        style={{ minWidth: "48px", minHeight: "48px" }}
      >
        <MessageCircle size={20} className="fill-current text-brand-ink transition-transform duration-300 group-hover:rotate-6" />
        
        {/* Hover Slide out label for Desktop only */}
        <span className="max-w-0 overflow-hidden font-inter font-bold uppercase tracking-widest text-[9px] group-hover:max-w-[120px] group-hover:ml-2 transition-all duration-500 ease-out whitespace-nowrap hidden md:inline-block text-brand-ink">
          Chat With Us
        </span>
      </a>
    </>
  );
}
