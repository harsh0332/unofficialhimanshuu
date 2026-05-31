"use client";

import React, { useState } from "react";
import FormInput from "../ui/FormInput";
import Button from "../ui/Button";
import { submitLeadForm } from "@/lib/webhook";
import { CheckCircle2, AlertCircle, Mail, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Custom inline brand SVGs for perfect compiler safety and lightweight footprint
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{
    state: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ state: "idle" });

  const subjectOptions = [
    "Podcast Sponsorship / Brands",
    "Studio Rental / Session Booking",
    "Event Coverage & Cinematics",
    "Short-Form Video Production",
    "Guest Pitch Inquiry",
    "Other Collaboration",
  ];

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

    if (!formData.name.trim()) newErrors.name = "Name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Provide a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.replace(/[^0-9+]/g, "").length < 10) {
      newErrors.phone = "Provide a valid phone number";
    }

    if (!formData.subject) newErrors.subject = "Please select a subject";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus({ state: "loading" });

    // Submitting under the exact required formType: "contact"
    const result = await submitLeadForm("contact", formData);

    if (result.success) {
      setStatus({
        state: "success",
        message: result.error,
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setErrors({});
    } else {
      setStatus({
        state: "error",
        message: result.error || "Failed to submit lead proposal. Please try again.",
      });
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full py-24 md:py-32 bg-brand-ink overflow-hidden z-20 border-b border-brand-border-hairline"
    >
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-brand-ember-glow rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-16 text-left">
          <span className="font-inter font-bold text-xs uppercase tracking-widest text-brand-ember">
            // High-Converting Pipeline
          </span>
          <h2 className="font-fraunces font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-brand-bone">
            LET'S CREATE TOGETHER
          </h2>
          <p className="font-inter text-xs md:text-sm text-brand-bone-secondary max-w-md mt-1">
            Skip the Instagram DMs. Drop your project requirements directly into our technical queue and we'll check availability within 24 hours.
          </p>
        </div>

        {/* Dual Grid: Contact Form Left, Direct Info Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Contact Form Card */}
          <div className="lg:col-span-8 bg-brand-surface border border-brand-border-hairline p-5 sm:p-8 md:p-12 relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-ember-glow rounded-full blur-[40px] pointer-events-none" />

            <AnimatePresence mode="wait">
              {status.state === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center py-12 text-center w-full"
                >
                  <CheckCircle2 size={48} className="text-brand-ember mb-4" />
                  <h3 className="font-fraunces font-bold text-lg uppercase tracking-wider text-brand-bone mb-2">
                    Inquiry Registered
                  </h3>
                  <p className="font-inter text-xs text-brand-bone-secondary max-w-md">
                    Thank you! Himanshu Soni's technical manager will verify your message and respond via email or call within 24 hours.
                  </p>
                  {status.message && (
                    <span className="mt-4 px-3 py-1 bg-brand-ink border border-brand-border-hairline text-xxs font-mono text-brand-ember rounded block max-w-sm mx-auto">
                      {status.message}
                    </span>
                  )}
                  <button
                    onClick={() => setStatus({ state: "idle" })}
                    className="mt-8 font-inter font-bold text-xxs uppercase tracking-widest text-brand-ember hover:text-brand-bone transition-colors duration-300 focus:outline-none"
                  >
                    Send Another Inquiry
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

                  {/* Row 1: Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="Your Name"
                      name="name"
                      placeholder="e.g. Himanshu"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                    />
                    <FormInput
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="name@company.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                    />
                  </div>

                  {/* Row 2: Phone and Subject */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      placeholder="+91 / Mobile Number"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      error={errors.phone}
                    />
                    <FormInput
                      label="Subject / Interest"
                      name="subject"
                      placeholder="Choose required department"
                      required
                      options={subjectOptions}
                      value={formData.subject}
                      onChange={handleChange}
                      error={errors.subject}
                    />
                  </div>

                  {/* Message TextArea */}
                  <FormInput
                    label="Brief Description / Message"
                    name="message"
                    isTextArea
                    placeholder="Describe your design aesthetics, campaign scope, duration preference, timeline, or broadcast goals..."
                    value={formData.message}
                    onChange={handleChange}
                  />

                  {/* Submit button */}
                  <div className="mt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      disabled={status.state === "loading"}
                    >
                      {status.state === "loading" ? "Transmitting Leads..." : "Let's Create Together"}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Direct Contacts */}
          <div className="lg:col-span-4 flex flex-col gap-8 text-left bg-brand-surface border border-brand-border-hairline p-5 sm:p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-ember-glow rounded-full blur-[40px] pointer-events-none" />

            <div className="flex flex-col gap-3">
              <span className="font-inter font-bold text-xs uppercase tracking-widest text-brand-ember">
                // Direct Routes
              </span>
              <h3 className="font-fraunces font-extrabold text-xl md:text-2xl uppercase tracking-tight text-brand-bone">
                FAST TRACKS
              </h3>
            </div>

            {/* Email Contact */}
            <div className="flex flex-col gap-2">
              <span className="font-inter font-bold text-[8px] uppercase tracking-widest text-brand-bone-muted">
                Studio Communications
              </span>
              <a
                href="mailto:work.unofficialhimanshu@gmail.com"
                className="flex items-center gap-3 font-fraunces font-bold text-xs md:text-sm uppercase tracking-wider text-brand-bone hover:text-brand-ember transition-colors duration-300"
              >
                <Mail size={16} className="text-brand-ember shrink-0" />
                <span>work.unofficialhimanshu@gmail.com</span>
              </a>
            </div>

            {/* Instagram Contact */}
            <div className="flex flex-col gap-2 border-t border-brand-border-hairline pt-6">
              <span className="font-inter font-bold text-[8px] uppercase tracking-widest text-brand-bone-muted">
                Social Networks
              </span>
              <div className="flex flex-col gap-4 mt-2">
                <a
                  href="https://instagram.com/unofficialhimanshu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-inter font-semibold text-xs text-brand-bone-secondary hover:text-brand-ember transition-colors duration-300"
                >
                  <InstagramIcon className="w-4 h-4 text-brand-ember shrink-0" />
                  <span>@unofficialhimanshu</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-inter font-semibold text-xs text-brand-bone-secondary hover:text-brand-ember transition-colors duration-300"
                >
                  <InstagramIcon className="w-4 h-4 text-brand-ember shrink-0" />
                  <span>@the_unofficial_studios</span>
                </a>
              </div>
            </div>

            {/* Pitch Text */}
            <div className="border-t border-brand-border-hairline pt-6">
              <p className="font-inter text-xs text-brand-bone-muted leading-relaxed">
                Looking for quick rates or specialized custom partnerships? Drop us an email or connect via social. Our team responds within 1 business day.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
