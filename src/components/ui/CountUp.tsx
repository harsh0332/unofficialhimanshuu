"use client";

import React, { useEffect, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";

interface CountUpProps {
  to: number;
  duration?: number;
  suffix?: string;
}

export default function CountUp({ to, duration = 2.0, suffix = "+" }: CountUpProps) {
  const [count, setCount] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(to);
      return;
    }

    const controls = animate(0, to, {
      duration: duration,
      ease: "easeOut",
      onUpdate: (value) => {
        setCount(Math.floor(value));
      },
    });

    return () => controls.stop();
  }, [to, duration, shouldReduceMotion]);

  // Premium editorial number styling (e.g. 208,000)
  const formattedCount = count.toLocaleString("en-US");

  return (
    <span>
      {formattedCount}
      {suffix}
    </span>
  );
}
