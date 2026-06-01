"use client";

import React from "react";

interface PressOutlet {
  id: number;
  outletName: string;
  articleUrl: string;
  logoComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

// --- MONOCHROME EDITABLE PRESS VECTOR ASSETS ---
const FreePressLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 160 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="158" height="38" x="1" y="1" rx="2" strokeDasharray="3 3" />
    <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" className="font-fraunces font-black tracking-widest text-[9px] fill-current stroke-none">
      FREE PRESS JOURNAL
    </text>
  </svg>
);

const PatrikaLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 160 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="20" cy="20" r="12" strokeDasharray="2 2" />
    <text x="20" y="20" dominantBaseline="middle" textAnchor="middle" className="font-fraunces font-extrabold text-xs fill-current stroke-none">
      P
    </text>
    <text x="45" y="20" dominantBaseline="middle" className="font-inter font-bold tracking-widest text-[10px] fill-current stroke-none">
      PATRIKA
    </text>
  </svg>
);

const NaiduniaLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 160 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M10 10 L25 10 L25 30 L10 30 Z" strokeDasharray="4 2" />
    <text x="17.5" y="20" dominantBaseline="middle" textAnchor="middle" className="font-mono font-bold text-xxs fill-current stroke-none">
      ND
    </text>
    <text x="35" y="20" dominantBaseline="middle" className="font-inter font-extrabold tracking-wider text-[10px] fill-current stroke-none">
      NAIDUNIA
    </text>
  </svg>
);

// --- EDITABLE OUTLETS REGISTRY ---
// CRITICAL: In accordance with our Truthfulness & Credibility Policy, this array is kept completely 
// empty to avoid fabricating press listings. It will evaluate to null and render absolutely nothing on the page.
// To activate, uncomment the items below once verified article links are ready.
const PRESS_OUTLETS: PressOutlet[] = [
  /*
  {
    id: 1,
    outletName: "Free Press Journal Indore",
    articleUrl: "https://www.freepressjournal.in/indore/verified-article-link-goes-here",
    logoComponent: FreePressLogo,
  },
  {
    id: 2,
    outletName: "Patrika MP",
    articleUrl: "https://www.patrika.com/indore-news/verified-article-link-goes-here",
    logoComponent: PatrikaLogo,
  },
  {
    id: 3,
    outletName: "Naidunia",
    articleUrl: "https://www.naidunia.com/madhya-pradesh/indore-verified-article-link-goes-here",
    logoComponent: NaiduniaLogo,
  },
  */
];

export default function PressStrip() {
  // If no press outlets are configured, safely render null to avoid layout clutter or false credibility claims
  if (PRESS_OUTLETS.length === 0) {
    return null;
  }

  return (
    <section 
      id="press" 
      className="relative w-full py-12 bg-brand-ink overflow-hidden border-t border-brand-border-hairline z-20 flex flex-col items-center justify-center gap-6"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center gap-6 w-full text-center">
        {/* Supporting Small monochrome Label */}
        <span className="font-inter font-bold text-[9px] uppercase tracking-[0.25em] text-brand-bone-secondary/40 select-none">
          // As featured in
        </span>

        {/* Row of Outlet Logos */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 w-full">
          {PRESS_OUTLETS.map((outlet) => {
            const Logo = outlet.logoComponent;
            return (
              <a
                key={outlet.id}
                href={outlet.articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group focus:outline-none transition-all duration-300"
                aria-label={`Read coverage about Himanshu Soni on ${outlet.outletName}`}
              >
                <Logo 
                  className="w-32 h-8 text-brand-bone-secondary/40 group-hover:text-brand-ember group-focus-visible:text-brand-ember group-hover:scale-103 transition-all duration-350 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ember"
                />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
