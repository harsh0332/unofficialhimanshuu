"use client";

import React, { useState } from "react";
import FormInput from "../ui/FormInput";
import Button from "../ui/Button";
import { submitLeadForm } from "@/lib/webhook";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Guest() {
  const [formData, setFormData] = useState({
    name: "",
    whatYouDo: "",
    socialHandle: "",
    email: "",
    whyGuest: "",
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
      whatYouDo: formData.whatYouDo,
      socialHandle: formData.socialHandle,
      email: formData.email,
      whyGuest: formData.whyGuest,
    };

    const result = await submitLeadForm("guest_application", payloadData);

    if (result.success) {
      setStatus({
        state: "success",
        message: result.error,
      });
      setFormData({
        name: "",
        whatYouDo: "",
        socialHandle: "",
        email: "",
        whyGuest: "",
      });
    } else {
      setStatus({
        state: "error",
        message: result.error || "Failed to transmit application. Please try again.",
      });
    }
  };

  return (
    <section id="guest" className="relative w-full py-24 md:py-32 bg-brand-black overflow-hidden z-20 border-t border-white/5">
      {/* Background ambient crimson highlight on right */}
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-brand-crimson/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Form Container */}
          <div className="lg:col-span-7 bg-brand-dark/40 border border-white/5 p-8 md:p-12 relative overflow-hidden order-2 lg:order-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-crimson/5 rounded-full blur-[40px] pointer-events-none" />
            
            <h3 className="font-syne font-extrabold text-lg md:text-xl uppercase tracking-wider text-white mb-8 text-left">
              APPLY AS A GUEST
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
                    Application Received
                  </h4>
                  <p className="font-inter text-xs text-brand-muted max-w-sm">
                    Awesome! Our editorial team reviews guest proposals weekly. If your background aligns with our upcoming episodes, we'll reach out to schedule a pre-interview.
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
                    Submit Another Application
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
                      label="Full Name"
                      name="name"
                      placeholder="e.g. Vicky Malhotra"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <FormInput
                      label="What You Do / Industry"
                      name="whatYouDo"
                      placeholder="e.g. Design Architect"
                      required
                      value={formData.whatYouDo}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="Social Handle (Instagram / LinkedIn)"
                      name="socialHandle"
                      placeholder="e.g. @vickymalhotra"
                      required
                      value={formData.socialHandle}
                      onChange={handleChange}
                    />
                    <FormInput
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="name@email.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <FormInput
                    label="Why would you be a great guest?"
                    name="whyGuest"
                    isTextArea
                    placeholder="Tell us about your story, key failures, milestones, and the core message you want to broadcast..."
                    required
                    value={formData.whyGuest}
                    onChange={handleChange}
                  />

                  <div className="mt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      disabled={status.state === "loading"}
                    >
                      {status.state === "loading" ? "Transmitting..." : "Apply Now"}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Pitch */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left order-1 lg:order-2">
            <span className="font-syne font-bold text-xs uppercase tracking-widest text-brand-crimson">
              // Guest Proposals
            </span>
            <h2 className="font-syne font-extrabold text-3xl md:text-5xl uppercase tracking-tight">
              STEP INTO <br />
              THE SPOTLIGHT
            </h2>
            <p className="font-inter text-sm md:text-base text-brand-muted leading-relaxed">
              We host industry leaders, disruptive builders, and raw creative powerhouses. If you have built something remarkable, overcome massive barriers, or possess specialized expertise that the world needs to hear, we want you on our set.
            </p>
            <p className="font-inter text-xs text-brand-muted leading-relaxed">
              *Note: We record high-end, multi-cam physical episodes in our premium studio. Remote options are available for selected international guests.*
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
