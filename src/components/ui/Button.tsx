"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  target?: string;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
  target,
}: ButtonProps) {
  const baseStyle =
    "relative inline-flex items-center justify-center font-inter font-bold uppercase tracking-wider text-[10px] px-6 py-3.5 rounded-none overflow-hidden transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const variantStyles = {
    primary:
      "bg-brand-ember text-brand-ink hover:bg-brand-ember-deep shadow-[0_0_15px_rgba(226,73,46,0.20)] hover:shadow-[0_0_25px_rgba(226,73,46,0.40)]",
    secondary:
      "bg-brand-bone text-brand-ink hover:bg-transparent hover:text-brand-bone border border-brand-bone hover:border-brand-ember",
    outline:
      "bg-transparent text-brand-bone border border-brand-ember/30 hover:border-brand-ember hover:bg-brand-ember/5",
    ghost:
      "bg-transparent text-brand-bone hover:text-brand-ember",
  };

  const buttonContent = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  const motionProps = {
    whileHover: { scale: disabled ? 1 : 1.02, y: disabled ? 0 : -1 },
    whileTap: { scale: disabled ? 1 : 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 15 },
  } as const;

  if (href) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} className={`${baseStyle} ${variantStyles[variant]} ${className}`}>
          {buttonContent}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...motionProps}
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
    >
      {buttonContent}
    </motion.button>
  );
}
