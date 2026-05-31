"use client";

import React, { useState } from "react";
import FormInput from "../ui/FormInput";
import Button from "../ui/Button";
import { submitLeadForm } from "@/lib/webhook";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Brands() {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    email: "",
    budget: "",
    message: "",
  });

  const [status, setStatus] = useState<{
    state: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ state: "idle" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ state: "loading" });

    const result = await submitLeadForm("brand_collaboration", formData);

    if (result.success) {
      setStatus({
        state: "success",
        message: result.error, // Will store mock warning if env variable is missing
      });
      setFormData({ name: "", brand: "", email: "", budget: "", message: "" });
    } else {
      setStatus({
        state: "error",
        message: result.error || "Failed to submit inquiry. Please try again.",
      });
    }
  };

  const budgetOptions = [
    "Under ₹50,000",
    "₹50,000 - ₹1,50,000",
    "₹1,50,000 - ₹3,00,000",
    "Over ₹3,00,000",
  ];

  return (
    <section id="brands" className="relative w-full py-24 md:py-32 bg-brand-black overflow-hidden z-20 border-t border-white/5">
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-brand-crimson/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Why Partner/Sponsorship Pitch */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <span className="font-syne font-bold text-xs uppercase tracking-widest text-brand-crimson">
              // Partnerships
            </span>
            <h2 className="font-syne font-extrabold text-3xl md:text-5xl uppercase tracking-tight">
              SCALED BRAND <br />
              COLLABORATIONS
            </h2>
            <p className="font-inter text-sm md:text-base text-brand-muted leading-relaxed">
              Accelerate your brand's presence in central India and beyond. Align your message with our premium audience of founders, high-earners, and tech decision-makers.
            </p>

            <ul className="flex flex-col gap-4 mt-4 font-inter text-xs md:text-sm text-white/80">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-crimson" />
                <span>**Native Audio/Video Sponsorship**: High-converting founder integrations.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-crimson" />
                <span>**Vertical Asset Takeover**: Custom reels engineered for reach.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-crimson" />
                <span>**Full Product Showcase**: Bespoke episodes dedicated to your tech.</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Interaction Form Container */}
          <div className="lg:col-span-7 bg-brand-dark/40 border border-white/5 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-crimson/5 rounded-full blur-[40px] pointer-events-none" />
            
            <h3 className="font-syne font-extrabold text-lg md:text-xl uppercase tracking-wider text-white mb-8 text-left">
              INQUIRE FOR COLLABORATION
            </h3>

            <AnimatePresence mode="wait">
              {status.state === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle2 size={48} className="text-brand-crimson mb-4" />
                  <h4 className="font-syne font-bold text-lg uppercase tracking-wider text-white mb-2">
                    Inquiry Transmitted
                  </h4>
                  <p className="font-inter text-xs text-brand-muted max-w-sm">
                    Thank you! Himanshu's management team will review your brand details and reach out via email within 24 hours.
                  </p>
                  {status.message && (
                    <span className="mt-4 px-3 py-1 bg-white/5 text-xxs font-mono text-brand-muted rounded">
                      {status.message}
                    </span>
                  )}
                  <button
                    onClick={() => setStatus({ state: "idle" })}
                    className="mt-8 font-syne font-bold text-xxs uppercase tracking-widest text-brand-crimson hover:text-white transition-colors duration-300 focus:outline-none"
                  >
                    Send Another Submission
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                >
                  {status.state === "error" && (
                    <div className="flex items-center gap-3 bg-brand-crimson/10 border border-brand-crimson/30 p-4 text-brand-crimson text-xs font-inter">
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{status.message}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="Your Name"
                      name="name"
                      placeholder="e.g. Himanshu"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <FormInput
                      label="Brand Name"
                      name="brand"
                      placeholder="e.g. TechCorp"
                      required
                      value={formData.brand}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="Business Email"
                      name="email"
                      type="email"
                      placeholder="name@company.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <FormInput
                      label="Budget Range"
                      name="budget"
                      placeholder="Select budget tier"
                      required
                      options={budgetOptions}
                      value={formData.budget}
                      onChange={handleChange}
                    />
                  </div>

                  <FormInput
                    label="Campaign Scope"
                    name="message"
                    isTextArea
                    placeholder="Describe your brand and the primary goals for this collaboration..."
                    required
                    value={formData.message}
                    onChange={handleChange}
                  />

                  <div className="mt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      disabled={status.state === "loading"}
                    >
                      {status.state === "loading" ? "Transmitting..." : "Send Proposal"}
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
