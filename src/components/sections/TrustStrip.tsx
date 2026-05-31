"use client";

import React from "react";
import Marquee from "../ui/Marquee";

const TRUST_LABELS = [
  "PODCAST PRODUCTION",
  "CELEBRITY INTERVIEWS",
  "BRAND PARTNERSHIPS",
  "STUDIO BOOKINGS",
  "200M+ VIEWS GENERATED",
  "HIGH-OCTANE REELS",
  "INDORE'S MEDIA HUB",
  "CINEMATIC STORYTELLING",
];

export default function TrustStrip() {
  return (
    <section className="bg-brand-black overflow-hidden relative z-20">
      <Marquee items={TRUST_LABELS} speed="medium" />
    </section>
  );
}
