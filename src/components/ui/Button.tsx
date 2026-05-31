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
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyle =
    "relative inline-flex items-center justify-center font-inter font-bold uppercase tracking-wider text-[10px] px-6 py-3.5 rounded-none overflow-hidden transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const variantStyles = {
    primary:
      "bg-brand-gold text-brand-obsidian hover:bg-brand-gold-deep shadow-[0_0_15px_rgba(201,168,106,0.22)] hover:shadow-[0_0_25px_rgba(201,168,106,0.45)]",
    secondary:
      "bg-brand-ivory text-brand-obsidian hover:bg-transparent hover:text-brand-ivory border border-brand-ivory hover:border-brand-gold",
    outline:
      "bg-transparent text-brand-ivory border border-brand-gold/30 hover:border-brand-gold hover:bg-brand-gold/5",
    ghost:
      "bg-transparent text-brand-ivory hover:text-brand-gold",
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
        <Link href={href} className={`${baseStyle} ${variantStyles[variant]} ${className}`}>
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
