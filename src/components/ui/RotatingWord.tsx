"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface RotatingWordProps {
  words: string[];
  intervalMs?: number;
}

export default function RotatingWord({ words, intervalMs = 2200 }: RotatingWordProps) {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [words.length, intervalMs, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return <span className="text-brand-ember">{words[0]}</span>;
  }

  return (
    <span className="inline-block relative h-[1.2em] min-w-[200px] text-left overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{
            y: { type: "spring", stiffness: 120, damping: 15 },
            opacity: { duration: 0.2 },
          }}
          className="absolute left-0 top-0 text-brand-ember font-extrabold italic"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
