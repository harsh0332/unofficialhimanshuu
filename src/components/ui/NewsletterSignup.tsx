"use client";

import React, { useState } from "react";
import { submitLeadForm } from "@/lib/webhook";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<{
    state: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ state: "idle" });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email address is required");
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Provide a valid email address");
      return;
    }

    setStatus({ state: "loading" });

    const result = await submitLeadForm("newsletter", { email });

    if (result.success) {
      setStatus({
        state: "success",
        message: result.error,
      });
      setEmail("");
    } else {
      setStatus({
        state: "error",
        message: result.error || "Failed to subscribe to our newsletter. Please try again.",
      });
    }
  };

  return (
    <div className="w-full max-w-md text-left font-inter">
      <AnimatePresence mode="wait">
        {status.state === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center gap-3 bg-brand-surface border border-brand-border-hairline p-4 rounded-none w-full"
          >
            <CheckCircle2 className="text-brand-ember shrink-0 w-5 h-5" />
            <div>
              <span className="font-fraunces font-bold text-xs text-brand-bone uppercase block">
                Subscribed Successfully
              </span>
              <p className="font-inter text-[10px] text-brand-bone-secondary leading-normal mt-0.5">
                Welcome to our weekly creator broadcast list.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubscribe}
            className="flex flex-col gap-2 w-full"
            noValidate
          >
            {/* Visible Accessibility Label */}
            <label htmlFor="newsletter-email" className="font-inter font-bold uppercase tracking-wider text-[10px] text-brand-bone-secondary flex justify-between items-center">
              <span>Business Email Address <span className="text-brand-ember">*</span></span>
              {error && <span className="text-brand-ember text-[9px] font-inter tracking-normal normal-case font-medium">{error}</span>}
            </label>
            
            <div className="flex flex-col sm:flex-row items-stretch gap-2 w-full">
              <div className="relative flex-1">
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="name@email.com"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  className={`w-full h-11 px-4 bg-brand-surface border text-brand-bone font-inter text-xs rounded-none placeholder-brand-bone-muted focus:outline-none focus:ring-1 focus:ring-brand-ember focus:border-brand-ember transition-all duration-300 ${
                    error ? "border-brand-ember" : "border-brand-border-hairline"
                  }`}
                  aria-invalid={!!error}
                  aria-describedby={error ? "newsletter-error" : undefined}
                />
              </div>

              <button
                type="submit"
                disabled={status.state === "loading"}
                className="h-11 px-6 bg-brand-ember hover:bg-brand-ember-deep text-brand-ink font-inter font-bold text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-50 min-h-[44px]"
                aria-label="Subscribe to newsletter"
              >
                <Send size={10} className="shrink-0 text-brand-ink" />
                <span>{status.state === "loading" ? "Joining..." : "Join"}</span>
              </button>
            </div>

            {status.state === "error" && (
              <div id="newsletter-error" className="flex items-center gap-2 bg-brand-ember/10 border border-brand-ember/30 p-2 text-brand-ember text-[10px] font-inter mt-3">
                <AlertCircle size={10} className="shrink-0" />
                <span>{status.message}</span>
              </div>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
