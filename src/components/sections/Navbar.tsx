"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Button from "../ui/Button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navLinks = [
    { name: "About", href: "#hero" },
    { name: "Podcast", href: "#podcast" },
    { name: "Work", href: "#work" },
    { name: "Apply", href: "#inquiry" },
    { name: "Sponsor", href: "#inquiry" },
    { name: "Booking", href: "#inquiry" },
    { name: "What's next", href: "/roadmap" },
    { name: "Contact", href: "#inquiry" },
  ];

  // Handle transparent to solid transitions on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 55) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle active section tracking on scroll
  useEffect(() => {
    const sections = navLinks.map((link) => document.querySelector(link.href));

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // triggers when section covers center part of screen
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  // Lock background scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-brand-ink/90 backdrop-blur-md border-b border-brand-border-hairline py-3 md:py-4"
            : "bg-transparent py-4 md:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between gap-4 xl:gap-8">
          {/* Logo */}
          <a
            href="#"
            className="font-fraunces font-extrabold text-[15px] xs:text-base sm:text-lg md:text-xl tracking-tight uppercase flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ember focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink"
            aria-label="The Unofficial Studios Home"
          >
            <span className="text-brand-bone">The</span>
            <span className="text-brand-ember">Unofficial</span>
            <span className="text-brand-bone">Studios</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-4 xl:gap-5 2xl:gap-8" aria-label="Desktop navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`font-inter text-[11px] 2xl:text-xs uppercase tracking-wider transition-colors duration-300 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ember focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink px-1.5 2xl:px-2 py-1 ${
                    isActive ? "text-brand-ember" : "text-brand-bone-secondary hover:text-brand-ember"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden xl:block">
            <Button href="#inquiry" variant="primary">
              Get In Touch
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 text-brand-bone hover:text-brand-ember transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ember focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-brand-ink flex flex-col justify-start sm:justify-center items-center overflow-y-auto py-16 sm:py-8 transition-all duration-500 ease-in-out xl:hidden ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Subtle ember radial glow for mobile overlay */}
        <div className="absolute inset-0 radial-glow opacity-20 pointer-events-none" />

        <nav className="relative z-10 flex flex-col items-center gap-8 text-center" aria-label="Mobile navigation">
          {navLinks.map((link, idx) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-fraunces font-bold text-xl md:text-2xl uppercase tracking-widest transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ember focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink px-4 py-2 ${
                  isActive ? "text-brand-ember" : "text-brand-bone-secondary hover:text-brand-bone"
                }`}
                style={{
                  transitionDelay: `${idx * 50}ms`,
                  transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transitionProperty: "transform, opacity",
                }}
              >
                {link.name}
              </a>
            );
          })}
          <div
            className="mt-6"
            style={{
              transitionDelay: `${navLinks.length * 50}ms`,
              transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
              opacity: isMobileMenuOpen ? 1 : 0,
              transitionProperty: "transform, opacity",
            }}
          >
            <Button
              href="#inquiry"
              variant="primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get In Touch
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}
