"use client";

import React from "react";
import { Mail, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NewsletterSignup from "../ui/NewsletterSignup";

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
  const pathname = usePathname() || "/";

  // WhatsApp click-to-chat environment variable fallback
  const whatsappUrl =
    process.env.NEXT_PUBLIC_WHATSAPP_URL ||
    "https://wa.me/918827736537?text=Hi%20The%20Unofficial%20Studios,%20I'd%20like%20to%20collaborate!";

  const footerLinks = [
    { name: "About", href: pathname === "/" ? "#hero" : "/#hero" },
    { name: "Podcast Hub", href: pathname === "/" ? "#talks" : "/podcast" },
    { name: "Apply Guest", href: pathname === "/" ? "#inquiry" : "/contact" },
    { name: "Sponsor Inquiry", href: pathname === "/" ? "#inquiry" : "/contact" },
    { name: "Studio Booking", href: pathname === "/" ? "#inquiry" : "/contact" },
    { name: "What's next →", href: "/roadmap" },
    { name: "Contact System", href: pathname === "/" ? "#inquiry" : "/contact" },
  ];

  return (
    <footer className="relative w-full bg-brand-ink border-t border-brand-border-hairline pt-16 pb-28 md:py-16 overflow-hidden z-20 font-inter">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col w-full gap-12">
        
        {/* Top Row: Newsletter Signup */}
        <div className="border-b border-brand-border-hairline pb-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 w-full">
          <div className="max-w-md text-left">
            <h3 className="font-fraunces font-extrabold text-lg md:text-xl uppercase tracking-wider text-brand-bone">
              Newsletter Insights
            </h3>
            <p className="font-inter text-xs text-brand-bone-secondary leading-relaxed mt-1">
              Receive unreleased creator algorithms, camera crew equipment setups, and monthly sponsor analysis.
            </p>
          </div>
          <div className="w-full lg:w-auto flex justify-start lg:justify-end">
            <NewsletterSignup />
          </div>
        </div>

        {/* Bottom Row: Main Footer Content */}
        <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-8 text-center lg:text-left w-full">
          
          {/* Logo / Brand Name */}
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              className="font-fraunces font-extrabold text-md md:text-lg uppercase tracking-tight flex justify-center lg:justify-start items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ember focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink px-1"
              aria-label="The Unofficial Studios Home"
            >
              <span className="text-brand-bone">The</span>
              <span className="text-brand-ember">Unofficial</span>
              <span className="text-brand-bone">Studios</span>
            </Link>
            <span className="font-inter text-xxs text-brand-bone-muted uppercase tracking-widest">
              Indore, India — Cinematic Media Headquarters
            </span>
          </div>

          {/* Footer Anchors navigation */}
          <nav className="flex items-center gap-6 md:gap-8 flex-wrap justify-center" aria-label="Footer Navigation">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-inter text-xs uppercase tracking-wider text-brand-bone-secondary hover:text-brand-ember transition-colors duration-300 font-semibold focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-ember"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Contact Details & Social Handles */}
          <div className="flex flex-col items-center lg:items-end gap-2 w-full max-w-full lg:max-w-none px-4">
            <a
              href="mailto:work.unofficialhimanshu@gmail.com"
              className="inline-flex items-center gap-2 font-inter font-bold text-[9px] xs:text-[10px] sm:text-xs text-brand-bone hover:text-brand-ember transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-ember py-2.5 min-h-[44px] break-all [overflow-wrap:anywhere] w-full justify-center lg:justify-end"
            >
              <Mail size={14} className="text-brand-ember shrink-0" />
              <span className="lowercase break-all [overflow-wrap:anywhere]">work.unofficialhimanshu@gmail.com</span>
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
                <span className="lowercase break-all [overflow-wrap:anywhere]">@unofficialhimanshu</span>
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
                <span className="lowercase break-all [overflow-wrap:anywhere]">@the_unofficial_studios</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright strip */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-brand-border-hairline flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] xs:text-[10px] sm:text-xxs text-brand-bone-muted font-inter uppercase tracking-wide md:tracking-widest w-full text-center">
        <span className="break-words [overflow-wrap:anywhere] max-w-full">&copy; {currentYear} The Unofficial Studios. All rights reserved.</span>
        <span className="break-words [overflow-wrap:anywhere] max-w-full">Crafted in the "Ink & Bone / Ember" cinematic design system.</span>
      </div>
    </footer>
  );
}
