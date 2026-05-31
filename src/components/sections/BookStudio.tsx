"use client";

import React, { useState } from "react";
import FormInput from "../ui/FormInput";
import Button from "../ui/Button";
import { submitLeadForm } from "@/lib/webhook";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BookStudio() {
  const [formData, setFormData] = useState({
    name: "",
    purpose: "",
    preferredDate: "",
    contactInfo: "",
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

    // Map fields matching user specifications
    const payloadData = {
      name: formData.name,
      purpose: formData.purpose,
      preferredDate: formData.preferredDate,
      contactInfo: formData.contactInfo,
    };

    const result = await submitLeadForm("studio_booking", payloadData);

    if (result.success) {
      setStatus({
        state: "success",
        message: result.error,
      });
      setFormData({
        name: "",
        purpose: "",
        preferredDate: "",
        contactInfo: "",
      });
    } else {
      setStatus({
        state: "error",
        message: result.error || "Failed to submit booking inquiry. Please try again.",
      });
    }
  };

  return (
    <section id="book-studio" className="relative w-full py-24 md:py-32 bg-brand-black overflow-hidden z-20 border-t border-white/5">
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-brand-crimson/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Studio Booking Pitch */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <span className="font-syne font-bold text-xs uppercase tracking-widest text-brand-crimson">
              // Studio Hire
            </span>
            <h2 className="font-syne font-extrabold text-3xl md:text-5xl uppercase tracking-tight">
              BOOK INDORE'S <br />
              ELITE SET
            </h2>
            <p className="font-inter text-sm md:text-base text-brand-muted leading-relaxed">
              Elevate your podcasts, high-contrast interviews, and commercial visual projects. Rent out our fully acoustically treated media space featuring state-of-the-art 4K multicar cameras, Shure broadcasting microphones, and high-end cinematic setups.
            </p>

            <ul className="flex flex-col gap-4 mt-4 font-inter text-xs md:text-sm text-white/80">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-crimson" />
                <span>**Broadcast Quality**: Multi-camera 4K recording capabilities.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-crimson" />
                <span>**Acoustic Treat**: High-end insulation for perfect audio capture.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-crimson" />
                <span>**Pro Staff**: Technical engineer on site for full session support.</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Interaction Form Container */}
          <div className="lg:col-span-7 bg-brand-dark/40 border border-white/5 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-crimson/5 rounded-full blur-[40px] pointer-events-none" />
            
            <h3 className="font-syne font-extrabold text-lg md:text-xl uppercase tracking-wider text-white mb-8 text-left">
              STUDIO BOOKING REQUEST
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
                    Request Received
                  </h4>
                  <p className="font-inter text-xs text-brand-muted max-w-sm">
                    Perfect! Our studio engineer will verify the slot availability on your preferred date and contact you directly via phone or email to finalize your booking.
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
                    Submit Another Inquiry
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
                      placeholder="e.g. Kabir Khan"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <FormInput
                      label="Contact Details (Email or Phone)"
                      name="contactInfo"
                      placeholder="name@email.com / +91"
                      required
                      value={formData.contactInfo}
                      onChange={handleChange}
                    />
                  </div>

                  <FormInput
                    label="Preferred Date"
                    name="preferredDate"
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={handleChange}
                  />

                  <FormInput
                    label="Purpose of Booking"
                    name="purpose"
                    isTextArea
                    placeholder="Describe your session goals (e.g. Podcasting, Product Shoot, Corporate Interview, etc.)..."
                    required
                    value={formData.purpose}
                    onChange={handleChange}
                  />

                  <div className="mt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      disabled={status.state === "loading"}
                    >
                      {status.state === "loading" ? "Verifying slot..." : "Check Availability"}
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
