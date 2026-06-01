export interface ProjectData {
  slug: string;
  brandName: string;
  service: string;
  year: string;
  problem: string;
  approach: string;
  result: string;
  metric: string;
  metricLabel: string;
  secondaryMetric: string;
  secondaryMetricLabel: string;
  videoUrl: string;
  posterUrl: string;
  stills: { src: string; caption: string }[];
  backstage: {
    technicalBreakdown?: string;
    designRationale?: string;
    challengesSolutions?: string;
  };
}

export const PROJECTS: ProjectData[] = [
  {
    slug: "zenagi-coffee",
    brandName: "Zenagi Coffee",
    service: "Cinematic Brand Storytelling & Social Strategy",
    year: "2024",
    problem: "Zenagi Specialty Coffee needed to establish their identity as Indore's premium artisanal specialty roastery while competing against aggressive commercial cafe chains.",
    approach: "We produced a high-end cinematic documentary-style story covering their bean-to-cup philosophy, pairing it with atmospheric visual micro-reels highlighting the roasting process.",
    result: "The campaign delivered a +180% growth in cafe footfall and generated 450,000+ organic video views within 30 days of launch.",
    metric: "+180%",
    metricLabel: "Footfall Growth",
    secondaryMetric: "450K+",
    secondaryMetricLabel: "Organic Views",
    videoUrl: "/case1.mp4",
    posterUrl: "/case1-poster.jpg",
    stills: [
      { src: "/collab1.jpg", caption: "Atmospheric Lighting Setup" },
      { src: "/collab2.jpg", caption: "Macro Close-Up Roaster Capture" },
      { src: "/collab3.jpg", caption: "Behind-the-Scenes Monitoring" }
    ],
    backstage: {
      technicalBreakdown: "Shot entirely on location in Indore using RED Cine cameras & anamorphic prime lenses. Calibrated ambient warm lighting to sync cleanly with the roasting steam, preserving organic bean textures in a 60fps dynamic container.",
      designRationale: "We avoided generic product shots, focusing instead on macro roasting sensory cues and artisanal bean-to-cup movement to create an editorial, premium cafe aura.",
      challengesSolutions: "The cafe has mixed lighting. We controlled visual spill by flag-mounting diffuse key lights and color grading natively matching the brand's Ink & Bone aesthetic."
    }
  },
  {
    slug: "indore-tech-summit",
    brandName: "Indore Tech Summit",
    service: "Event Coverage & Keynote Storytelling",
    year: "2024",
    problem: "Indore's premiere tech summit wanted to break out of the boring corporate event mold and represent Central India's growing software ecosystem with highly emotional, dynamic visual recaps.",
    approach: "We deployed a 4-man multi-cam unit capturing high-energy interactions, keynote presentations, and spontaneous hallway interviews, delivering same-day teaser trailers that trended locally.",
    result: "Helped drive a record 15,000+ attendee registrations and yielded over 1.2 Million digital impressions across professional networks.",
    metric: "15K+",
    metricLabel: "Live Attendees",
    secondaryMetric: "1.2M+",
    secondaryMetricLabel: "Social Impressions",
    videoUrl: "/case1.mp4",
    posterUrl: "/collab3.jpg",
    stills: [
      { src: "/collab1.jpg", caption: "Multi-Camera Keynote Setup" },
      { src: "/collab2.jpg", caption: "Rapid Post-Production Desk" },
      { src: "/collab3.jpg", caption: "Hallway Interview Curation" }
    ],
    backstage: {
      technicalBreakdown: "Utilized wireless video links (Teradek) to send raw feeds directly to a mobile editing station, cutting 60-second teasers under a strict 2-hour turnaround time.",
      designRationale: "Ditched slow static corporate slide transitions for high-tempo visual cuts, heavy bass sound design, and quick-hitting dialogue segments to capture live energy.",
      challengesSolutions: "The venue's massive LED backdrop caused high frequency vertical camera banding. We resolved this dynamically by tuning exact physical shutter angles on our camera kits."
    }
  },
  {
    slug: "green-wed-solutions",
    brandName: "Green Wed Solutions",
    service: "D2C Brand Launch & Content Campaign",
    year: "2024",
    problem: "Green Wed Solutions sought to launch their organic eco-friendly products directly to Indian urban consumers but struggled to capture consumer attention against commercial chemical brands.",
    approach: "We designed a series of authentic narrative-driven reels focusing on consumer micro-habits and the local sourcing origin stories of their raw natural extracts.",
    result: "Generated a +220% growth in customer inbound queries and crossed 800,000+ organic video views across social platforms.",
    metric: "+220%",
    metricLabel: "Inbound Growth",
    secondaryMetric: "800K+",
    secondaryMetricLabel: "Organic Reel Views",
    videoUrl: "/case1.mp4",
    posterUrl: "/collab1.jpg",
    stills: [
      { src: "/collab1.jpg", caption: "Macro Extract Sourcing Capture" },
      { src: "/collab2.jpg", caption: "Indore Community Focus Group" },
      { src: "/collab3.jpg", caption: "Product Placement Under Diffuse" }
    ],
    backstage: {
      technicalBreakdown: "Captured high-speed macro detail passes (120fps) of extract condensation using custom probe lenses to highlight raw pure natural textures.",
      designRationale: "Avoided sleek sterile lab backdrops. We shot in rich organic outdoor sunlight, capturing honest raw textures and warm natural highlights.",
      challengesSolutions: "Shooting natural extract textures outdoors presents dynamic wind and shadow variations. We utilized heavy diffuse scrims to control high contrast glare."
    }
  }
];
