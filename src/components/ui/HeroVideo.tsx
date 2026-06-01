"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const [canPlayVideo, setCanPlayVideo] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [hasIntersected, setHasIntersected] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);

  // Run environmental check to confirm if loading the video is safe
  useEffect(() => {
    const checkConstraints = () => {
      // 1. Prefers-reduced-motion check
      if (shouldReduceMotion) {
        return false;
      }

      // 2. Connection bandwidth diagnosis
      if (typeof navigator !== "undefined") {
        const conn =
          (navigator as any).connection ||
          (navigator as any).mozConnection ||
          (navigator as any).webkitConnection;
        
        if (conn) {
          if (conn.saveData === true) {
            return false;
          }
          const type = conn.effectiveType;
          if (type === "2g" || type === "slow-2g") {
            return false;
          }
        }
      }

      return true;
    };

    setCanPlayVideo(checkConstraints());

    // Re-check constraints if viewport undergoes resizing
    const handleResize = () => {
      setCanPlayVideo(checkConstraints());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [shouldReduceMotion]);

  // Observer to pause playback when video goes off-screen
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Listen to browser tab visibility switches to pause video
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Defer video element loading until after page has fully painted (LCP protector)
  useEffect(() => {
    if (shouldReduceMotion) return;
    
    const timer = setTimeout(() => {
      setHasIntersected(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [shouldReduceMotion]);

  // Trigger HTML5 play/pause methods based on screen/tab visibility and manual controls
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !canPlayVideo || !hasIntersected || isManuallyPaused) return;

    if (isVisible && isTabVisible) {
      video.play().catch((err) => {
        console.warn("Autoplay block or interruption: ", err);
      });
    } else {
      video.pause();
    }
  }, [isVisible, isTabVisible, canPlayVideo, hasIntersected, isManuallyPaused]);

  // Handle manual video playback toggle
  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
      setIsManuallyPaused(false);
    } else {
      video.pause();
      setIsManuallyPaused(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 select-none"
    >
      {/* 1. Next.js Priority Preloaded Poster Image */}
      <Image
        src="/hero-poster.jpg"
        alt="The Unofficial Studios Cinematic Backdrop Fallback"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-10 transition-opacity duration-1000"
        style={{
          opacity: videoLoaded && canPlayVideo && hasIntersected && !isManuallyPaused ? 0 : 1,
        }}
      />

      {/* 2. Premium loop video element (H.264/VP9 sources) - Lazy mounted after 1500ms */}
      {canPlayVideo && hasIntersected && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          onCanPlayThrough={() => setVideoLoaded(true)}
          onLoadedData={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0 transition-opacity duration-1000"
          style={{
            opacity: videoLoaded && !isManuallyPaused ? 1 : 0,
          }}
        >
          <source src="/hero.webm" type="video/webm" />
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      )}

      {/* 3. Dark gradient overlay + vignette blend to guarantee text contrast */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-brand-ink via-brand-ink/75 to-brand-ink/35"
      />
      <div 
        className="absolute inset-0 z-25 pointer-events-none bg-[radial-gradient(circle,transparent_30%,rgba(10,10,11,0.85)_100%)]"
      />

      {/* 4. Visible Pause/Play Control Button - z-30 and pointer-events-auto to bypass container's pointer-events-none */}
      {canPlayVideo && hasIntersected && (
        <div className="absolute bottom-6 right-6 z-30 pointer-events-auto flex items-center justify-end">
          <button
            onClick={togglePlayPause}
            className="flex items-center gap-2 bg-brand-ink/85 border border-brand-border-accent text-brand-bone px-3.5 py-2 font-inter text-[9px] uppercase tracking-widest transition-all duration-350 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ember hover:bg-brand-ember hover:text-brand-ink min-h-[36px] min-w-[120px] justify-center cursor-pointer select-none"
            aria-label={isManuallyPaused ? "Play background cinematic video loop" : "Pause background cinematic video loop"}
          >
            {isManuallyPaused ? (
              <>
                <svg className="w-2.5 h-2.5 fill-current text-brand-ember shrink-0" viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>Video Paused</span>
              </>
            ) : (
              <>
                <svg className="w-2.5 h-2.5 fill-current text-brand-ember shrink-0" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
                <span>Pause video</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
