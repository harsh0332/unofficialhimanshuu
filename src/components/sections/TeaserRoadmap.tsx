"use client";

import React, { useState } from "react";
import FormInput from "../ui/FormInput";
import Button from "../ui/Button";
import { submitLeadForm } from "@/lib/webhook";
import { CheckCircle2, AlertCircle, Sparkles, Send, Users, ShieldAlert, Award, PlayCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TeaserRoadmap() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<{
    state: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ state: "idle" });

  const roadmapModules = [
    {
      icon: Users,
      title: "EXCLUSIVE COMMUNITY",
      description: "Direct messaging groups and networking channels connecting Indian content builders.",
    },
    {
      icon: ShieldAlert,
      title: "STUDIO MEMBERSHIP",
      description: "Priority physical set bookings, camera crew packages, and monthly editing hours.",
    },
    {
      icon: Award,
      title: "CREATOR COURSE",
      description: "Himanshu Soni's technical playbook on editing vertical content and scaling audio setups.",
    },
    {
      icon: PlayCircle,
      title: "PREMIUM CONTENT",
      description: "Exclusive unreleased guest interviews, raw behind-the-scenes, and sound effects library.",
    },
  ];

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
    <section
      id="roadmap"
      className="relative w-full py-24 md:py-32 bg-brand-surface overflow-hidden z-20 border-b border-brand-border-hairline"
    >
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-brand-ember-glow rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Roadmap Teaser */}
          <div className="lg:col-span-7 flex flex-col gap-8 text-left">
            <div className="flex flex-col gap-3">
              <span className="font-inter font-bold text-xs uppercase tracking-widest text-brand-ember">
                // Studio Ecosystem
              </span>
              <h2 className="font-fraunces font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-brand-bone leading-tight">
                THE ROADMAP
              </h2>
              <p className="font-inter text-sm text-brand-bone-secondary max-w-xl">
                We are building the complete digital headquarters for creators and brands. Here is a sneak peek at what is launching next inside the Unofficial network.
              </p>
            </div>

            {/* Teaser Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              {roadmapModules.map((mod, idx) => {
                const Icon = mod.icon;
                return (
                  <div
                    key={idx}
                    className="group relative bg-brand-ink border border-brand-border-hairline p-6 hover:border-brand-ember/30 transition-colors duration-500 flex flex-col justify-between"
                  >
                    {/* Top edge gold ember line on hover */}
                    <div className="absolute top-0 left-0 w-0 h-[2px] bg-brand-ember group-hover:w-full transition-all duration-500 ease-out" />
                    
                    <div>
                      {/* Top Header & Coming Soon tag */}
                      <div className="flex justify-between items-start gap-4 mb-6">
                        <div className="w-8 h-8 rounded-none bg-brand-ember/5 border border-brand-ember/15 flex items-center justify-center text-brand-ember">
                          <Icon size={14} />
                        </div>
                        <span className="font-mono text-[7px] text-brand-ember bg-brand-ember/5 border border-brand-ember/20 px-2 py-0.5 tracking-widest uppercase">
                          Coming Soon
                        </span>
                      </div>

                      <h3 className="font-fraunces font-extrabold text-sm uppercase tracking-wider text-brand-bone mb-3">
                        {mod.title}
                      </h3>
                      
                      <p className="font-inter text-xxs text-brand-bone-secondary leading-relaxed">
                        {mod.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Functional Newsletter Form */}
          <div className="lg:col-span-5 bg-brand-ink border border-brand-border-hairline p-5 sm:p-8 md:p-10 relative overflow-hidden flex flex-col gap-6 text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-ember-glow rounded-full blur-[40px] pointer-events-none" />

            <div className="flex flex-col gap-2">
              <span className="font-inter font-bold text-xs uppercase tracking-widest text-brand-ember">
                // Creator Broadcast
              </span>
              <h3 className="font-fraunces font-extrabold text-lg md:text-xl uppercase tracking-wider text-brand-bone">
                NEWSLETTER INSIGHTS
              </h3>
              <p className="font-inter text-xs text-brand-bone-secondary leading-relaxed mt-1">
                Receive unreleased creator algorithms, camera crew equipment setups, and monthly sponsor analysis directly in your inbox.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {status.state === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center py-6 text-center w-full"
                >
                  <CheckCircle2 size={40} className="text-brand-ember mb-3" />
                  <span className="font-fraunces font-bold text-md text-brand-bone uppercase">
                    Subscribed Successfully
                  </span>
                  <p className="font-inter text-[11px] text-brand-bone-secondary max-w-xs mt-2 leading-relaxed">
                    Thank you! You have joined our exclusive creator list. We'll send our high-aesthetic playbooks weekly.
                  </p>
                  {status.message && (
                    <span className="mt-4 px-3 py-1 bg-brand-surface border border-brand-border-hairline text-[8px] font-mono text-brand-ember rounded block">
                      {status.message}
                    </span>
                  )}
                  <button
                    onClick={() => setStatus({ state: "idle" })}
                    className="mt-6 font-inter font-bold text-[9px] uppercase tracking-widest text-brand-ember hover:text-brand-bone transition-colors"
                  >
                    Subscribe Another Email
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubscribe}
                  className="flex flex-col gap-4"
                  noValidate
                >
                  {status.state === "error" && (
                    <div className="flex items-center gap-2 bg-brand-ember/10 border border-brand-ember/30 p-3 text-brand-ember text-xxs font-inter">
                      <AlertCircle size={12} className="shrink-0" />
                      <span>{status.message}</span>
                    </div>
                  )}

                  <FormInput
                    label="Business Email"
                    name="email"
                    type="email"
                    placeholder="name@email.com"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    error={error}
                  />

                  <div className="mt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full flex items-center justify-center gap-2"
                      disabled={status.state === "loading"}
                    >
                      <Send size={12} className="shrink-0" />
                      <span>{status.state === "loading" ? "Subscribing..." : "Join Broadcast"}</span>
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
