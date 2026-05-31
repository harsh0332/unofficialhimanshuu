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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{
    state: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ state: "idle" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Your name is required";
    if (!formData.contactInfo.trim()) newErrors.contactInfo = "Phone or email is required";
    if (!formData.preferredDate.trim()) newErrors.preferredDate = "Preferred date is required";
    if (!formData.purpose.trim()) newErrors.purpose = "Purpose of booking is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus({ state: "loading" });

    const payloadData = {
      name: formData.name,
      purpose: formData.purpose,
      preferredDate: formData.preferredDate,
      contactInfo: formData.contactInfo,
    };

    // Submitting under the exact required formType: "studio-booking"
    const result = await submitLeadForm("studio-booking", payloadData);

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
      setErrors({});
    } else {
      setStatus({
        state: "error",
        message: result.error || "Failed to submit booking inquiry. Please try again.",
      });
    }
  };

  return (
    <section
      id="studio-booking"
      className="relative w-full py-24 md:py-32 bg-brand-ink overflow-hidden z-20 border-b border-brand-border-hairline"
    >
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-brand-ember-glow rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Studio Booking Pitch */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <span className="font-inter font-bold text-xs uppercase tracking-widest text-brand-ember">
              // Studio Hire
            </span>
            <h2 className="font-fraunces font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-brand-bone">
              BOOK INDORE'S <br />
              ELITE SET
            </h2>
            <p className="font-inter text-sm md:text-base text-brand-bone-secondary leading-relaxed">
              Great content demands an environment that honors it. Our physical production HQ in Indore is designed as a creative sanctuary. It is an acoustically isolated, beautifully lit space calibrated for the modern creator economy. Equipped with state-of-the-art multi-camera 4K setups, high-fidelity broadcasting audio capture, and customizable high-contrast editorial backdrops, we provide the exact technical backbone you need to make your production look and sound like a world-class broadcast.
            </p>

            <p className="font-inter text-sm md:text-base text-brand-bone-secondary leading-relaxed mt-2">
              Don't compromise on audio reflections or flat lighting. Lock in a slot to experience premium, worry-free media engineering under the supervision of our dedicated technical staff.
            </p>

            <ul className="flex flex-col gap-4 mt-4 font-inter text-xs md:text-sm text-brand-bone-secondary border-t border-brand-border-hairline pt-6">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-ember shrink-0" />
                <span><strong className="font-bold text-brand-bone">Acoustic Sanctuary</strong>: Zero external echo and premium sound-absorbent walls for pristine dialogue.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-ember shrink-0" />
                <span><strong className="font-bold text-brand-bone">Cinema Grade Sets</strong>: Custom depth-of-field lighting arrangements and 4K Blackmagic setups.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-ember shrink-0" />
                <span><strong className="font-bold text-brand-bone">Engineer Support</strong>: Dedicated sound and video engineer on site for full session operations.</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Interaction Form Container */}
          <div className="lg:col-span-7 bg-brand-surface border border-brand-border-hairline p-5 sm:p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-ember-glow rounded-full blur-[40px] pointer-events-none" />
            
            <h3 className="font-fraunces font-extrabold text-lg md:text-xl uppercase tracking-wider text-brand-bone mb-8 text-left">
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
                  <CheckCircle2 size={48} className="text-brand-ember mb-4" />
                  <h4 className="font-fraunces font-bold text-lg uppercase tracking-wider text-brand-bone mb-2">
                    Request Received
                  </h4>
                  <p className="font-inter text-xs text-brand-bone-secondary max-w-sm">
                    Perfect! Our studio engineer will verify the slot availability on your preferred date and contact you directly via phone or email to finalize your booking.
                  </p>
                  {status.message && (
                    <span className="mt-4 px-3 py-1 bg-brand-ink border border-brand-border-hairline text-xxs font-mono text-brand-ember rounded">
                      {status.message}
                    </span>
                  )}
                  <button
                    onClick={() => setStatus({ state: "idle" })}
                    className="mt-8 font-inter font-bold text-xxs uppercase tracking-widest text-brand-ember hover:text-brand-bone transition-colors duration-300 focus:outline-none"
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
                  noValidate
                >
                  {status.state === "error" && (
                    <div className="flex items-center gap-3 bg-brand-ember/10 border border-brand-ember/30 p-4 text-brand-ember text-xs font-inter">
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
                      error={errors.name}
                    />
                    <FormInput
                      label="Phone / Email Address"
                      name="contactInfo"
                      placeholder="name@email.com / +91"
                      required
                      value={formData.contactInfo}
                      onChange={handleChange}
                      error={errors.contactInfo}
                    />
                  </div>

                  <FormInput
                    label="Preferred Date"
                    name="preferredDate"
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={handleChange}
                    error={errors.preferredDate}
                  />

                  <FormInput
                    label="Purpose of Booking"
                    name="purpose"
                    isTextArea
                    placeholder="Describe your session goals (e.g. Podcasting, Product Shoot, Corporate Interview, etc.)..."
                    required
                    value={formData.purpose}
                    onChange={handleChange}
                    error={errors.purpose}
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
