"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  baseOpacity: number;
  swaySpeed: number;
  swayOffset: number;
}

export default function StudioBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  
  // Track mouse coordinates for subtle particle/beam parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetMousePos, setTargetMousePos] = useState({ x: 0, y: 0 });
  
  // Detect mobile viewport
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Resize and DPI-awareness setup
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track mouse move for interactive parallax drift
  useEffect(() => {
    if (shouldReduceMotion || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize coordinate offset to range [-0.5, 0.5]
      const nx = (e.clientX / window.innerWidth) - 0.5;
      const ny = (e.clientY / window.innerHeight) - 0.5;
      setTargetMousePos({ x: nx, y: ny });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion, isMobile]);

  // Smooth mouse interpolation (lerp)
  useEffect(() => {
    if (shouldReduceMotion || isMobile) return;

    let animId: number;
    const lerpMouse = () => {
      setMousePos((prev) => {
        const dx = targetMousePos.x - prev.x;
        const dy = targetMousePos.y - prev.y;
        return {
          x: prev.x + dx * 0.08,
          y: prev.y + dy * 0.08,
        };
      });
      animId = requestAnimationFrame(lerpMouse);
    };

    animId = requestAnimationFrame(lerpMouse);
    return () => cancelAnimationFrame(animId);
  }, [targetMousePos, shouldReduceMotion, isMobile]);

  // IntersectionObserver to pause loop when scrolled out of view
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  // Main Canvas animation engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxParticles = isMobile ? 0 : 45; // Turn off particles on mobile
    
    // Waveform setup variables
    const numBars = 32;
    let barHeights = Array(numBars).fill(2);
    let targetBarHeights = Array(numBars).fill(2);
    let waveNoiseTimer = 0;

    // Adjust canvas resolution dynamically for crisp high-DPI displays
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particles = [];
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      for (let i = 0; i < maxParticles; i++) {
        const baseOpacity = Math.random() * 0.25 + 0.05;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.8 + 0.6, // sizes range 0.6px to 2.4px
          speedY: -(Math.random() * 0.25 + 0.1), // floating upward
          speedX: Math.random() * 0.08 - 0.04,
          opacity: baseOpacity,
          baseOpacity: baseOpacity,
          swaySpeed: Math.random() * 0.005 + 0.002,
          swayOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    initParticles();

    // Tab visibility events to sleep the loops
    let isTabVisible = true;
    const handleVisibilityChange = () => {
      isTabVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Animation Loop
    const render = () => {
      // Pause completely if tab is hidden, element is offscreen, or motion is reduced
      if (!isVisible || !isTabVisible || shouldReduceMotion) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);

      // --- LAYER 1: Floating Dust Particles (Canvas) ---
      if (!isMobile) {
        particles.forEach((p) => {
          // Horizontal sway based on sine wave
          p.swayOffset += p.swaySpeed;
          const currentSway = Math.sin(p.swayOffset) * 0.15;

          // Parallax calculation relative to mouse normalized drift
          const parallaxX = mousePos.x * 18 * (p.size / 2);
          const parallaxY = mousePos.y * 18 * (p.size / 2);

          p.y += p.speedY;
          p.x += p.speedX + currentSway;

          // Wrap boundaries
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          // Subtle breathing opacity flicker
          p.opacity = p.baseOpacity + Math.sin(p.swayOffset * 2) * 0.03;

          ctx.beginPath();
          ctx.arc(p.x + parallaxX, p.y + parallaxY, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(226, 73, 46, ${Math.max(0.01, p.opacity)})`;
          ctx.shadowBlur = p.size > 1.5 ? 4 : 0;
          ctx.shadowColor = "#E2492E";
          ctx.fill();
        });
        ctx.shadowBlur = 0; // reset shadow
      }

      // --- LAYER 2: Reactive Podcast Waveform (Canvas) ---
      if (!isMobile) {
        waveNoiseTimer += 0.015;
        const barWidth = 3;
        const barGap = 6;
        const totalWaveWidth = (numBars * barWidth) + ((numBars - 1) * barGap);
        const startX = (width - totalWaveWidth) / 2;
        const baseY = height - 12; // Anchored subtly low

        // Update pseudo-random podcast soundwave target heights
        for (let i = 0; i < numBars; i++) {
          if (Math.random() < 0.05) {
            // High-aesthetic dynamic grouping (middle bars taller than edges)
            const edgeMultiplier = Math.sin((i / numBars) * Math.PI);
            const rawNoise = Math.sin(waveNoiseTimer + i * 0.15) * 12 + Math.cos(waveNoiseTimer * 0.5 - i * 0.3) * 8;
            targetBarHeights[i] = Math.max(3, (Math.random() * 22 + 4 + rawNoise) * edgeMultiplier);
          }

          // Smooth height interpolation (lerping)
          barHeights[i] += (targetBarHeights[i] - barHeights[i]) * 0.075;

          // Set drawing styles
          const currentHeight = barHeights[i];
          const x = startX + i * (barWidth + barGap) + mousePos.x * 12; // subtle mouse drift
          const y = baseY - currentHeight;

          // Draw rounded audio waveform bars
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, currentHeight, 2);
          
          // Double gradient fade (ember gold transitioning to a quiet brand tone)
          const grad = ctx.createLinearGradient(x, y, x, baseY);
          grad.addColorStop(0, `rgba(226, 73, 46, 0.28)`); // Ember top glow
          grad.addColorStop(1, `rgba(242, 239, 233, 0.03)`); // Bone fade bottom
          
          ctx.fillStyle = grad;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, isMobile, mousePos, shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 select-none"
    >
      {/* Dynamic 3D Volumetric Light Beams (CSS Layer) */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 w-full h-full opacity-[0.09] md:opacity-[0.13]">
          {/* Spotlight Cone 1 */}
          <motion.div
            animate={{
              rotate: [-32, -28, -32],
              x: [-15, 10, -15],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              transformOrigin: "top left",
              background: "linear-gradient(135deg, rgba(226, 73, 46, 0.35) 0%, transparent 60%)",
            }}
            className="absolute top-[-10%] left-[-10%] w-[120%] h-[150%] pointer-events-none"
          />

          {/* Spotlight Cone 2 */}
          <motion.div
            animate={{
              rotate: [48, 44, 48],
              x: [10, -15, 10],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              transformOrigin: "top right",
              background: "linear-gradient(225deg, rgba(242, 239, 233, 0.15) 0%, transparent 60%)",
            }}
            className="absolute top-[-15%] right-[-15%] w-[110%] h-[140%] pointer-events-none"
          />
        </div>
      )}

      {/* Reduced-motion static fallback for spotlights */}
      {shouldReduceMotion && (
        <div className="absolute inset-0 w-full h-full opacity-[0.1] pointer-events-none">
          <div
            style={{
              transform: "rotate(-30deg) translate(-10%, -10%)",
              transformOrigin: "top left",
              background: "linear-gradient(135deg, rgba(226, 73, 46, 0.35) 0%, transparent 60%)",
            }}
            className="absolute top-0 left-0 w-[120%] h-[150%]"
          />
          <div
            style={{
              transform: "rotate(45deg) translate(10%, -15%)",
              transformOrigin: "top right",
              background: "linear-gradient(225deg, rgba(242, 239, 233, 0.15) 0%, transparent 60%)",
            }}
            className="absolute top-0 right-0 w-[110%] h-[140%]"
          />
        </div>
      )}

      {/* Cinematic Film Grain & Minimal Scanline Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(rgba(18,18,20,0.3)_50%,rgba(0,0,0,0)_50%)] bg-[size:100%_4px]"
      />
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Soft Breathing Ember Radial Glow - Breathing motion */}
      <motion.div
        animate={shouldReduceMotion ? {} : {
          scale: [1, 1.05, 1],
          opacity: [0.15, 0.22, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-brand-ember-glow rounded-full blur-[140px] pointer-events-none"
      />

      {/* High-Performance Interactive Canvas Element */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-[0.7] md:opacity-[0.85] pointer-events-none"
      />
    </div>
  );
}
