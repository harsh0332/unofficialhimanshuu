"use client";

import React, { useState } from "react";
import FormInput from "../ui/FormInput";
import Button from "../ui/Button";
import { submitLeadForm } from "@/lib/webhook";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    service: "",
    budget: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{
    state: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ state: "idle" });

  const servicesList = [
    "Podcast Production",
    "Reel & Short-Video Production",
    "Brand Collaborations / Sponsored Content",
    "Celebrity Interviews & Roasts",
    "Social Media Management",
    "Event Coverage / On-Ground Content",
  ];

  const budgetOptions = [
    "Under ₹50,000",
    "₹50,000 - ₹1,50,000",
    "₹1,50,000 - ₹3,00,000",
    "Over ₹3,00,000",
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
    if (!formData.company.trim()) newErrors.company = "Company name is required";
    if (!formData.service) newErrors.service = "Please select a service";
    
    const phoneClean = formData.phone.replace(/[^0-9+]/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (phoneClean.length < 10) {
      newErrors.phone = "Provide a valid phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Provide a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus({ state: "loading" });
    const result = await submitLeadForm("lead_generation", formData);

    if (result.success) {
      setStatus({
        state: "success",
        message: result.error,
      });
      setFormData({
        name: "",
        company: "",
        service: "",
        budget: "",
        phone: "",
        email: "",
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
    <section id="contact" className="relative w-full py-24 md:py-32 bg-brand-obsidian overflow-hidden z-20 border-t border-brand-border">
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-brand-gold/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-16 items-center">
          <span className="font-inter font-bold text-xs uppercase tracking-widest text-brand-gold">
            // High-Converting Pipeline
          </span>
          <h2 className="font-fraunces font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-brand-ivory">
            LET'S CREATE TOGETHER
          </h2>
          <p className="font-inter text-xs md:text-sm text-brand-muted max-w-sm mt-1">
            Skip the Instagram DMs. Tell us about your project requirements and let our studio engineer check availability slot!
          </p>
        </div>

        {/* Lead Form Container */}
        <div className="w-full bg-brand-surface border border-brand-border p-8 md:p-12 relative overflow-hidden text-left">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/4 rounded-full blur-[40px] pointer-events-none" />

          <AnimatePresence mode="wait">
            {status.state === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-12 text-center w-full"
              >
                <CheckCircle2 size={48} className="text-brand-gold mb-4" />
                <h3 className="font-fraunces font-bold text-lg uppercase tracking-wider text-brand-ivory mb-2">
                  Inquiry Registered
                </h3>
                <p className="font-inter text-xs text-brand-muted max-w-md">
                  Thank you! Himanshu Soni's technical engineer will verify your booking preference and respond via email or call within 24 hours.
                </p>
                {status.message && (
                  <span className="mt-4 px-3 py-1 bg-brand-obsidian border border-brand-border text-xxs font-mono text-brand-gold rounded block max-w-sm mx-auto">
                    {status.message}
                  </span>
                )}
                <button
                  onClick={() => setStatus({ state: "idle" })}
                  className="mt-8 font-inter font-bold text-xxs uppercase tracking-widest text-brand-gold hover:text-brand-ivory transition-colors duration-300 focus:outline-none"
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
                  <div className="flex items-center gap-3 bg-brand-gold/10 border border-brand-gold/30 p-4 text-brand-gold text-xs font-inter">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{status.message}</span>
                  </div>
                )}

                {/* Row 1: Name and Company */}
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
                    label="Company / Brand Name"
                    name="company"
                    placeholder="e.g. OPPO India"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    error={errors.company}
                  />
                </div>

                {/* Row 2: Service Dropdown and Budget Dropdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="Service Interested In"
                    name="service"
                    placeholder="Choose required service"
                    required
                    options={servicesList}
                    value={formData.service}
                    onChange={handleChange}
                    error={errors.service}
                  />
                  <FormInput
                    label="Budget Range"
                    name="budget"
                    placeholder="Select budget tier"
                    options={budgetOptions}
                    value={formData.budget}
                    onChange={handleChange}
                  />
                </div>

                {/* Row 3: Phone and Email */}
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

                {/* Message TextArea */}
                <FormInput
                  label="Brief About Your Project"
                  name="message"
                  isTextArea
                  placeholder="Describe your design aesthetics, duration preference, timeline, or broadcast goals..."
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

      </div>
    </section>
  );
}
