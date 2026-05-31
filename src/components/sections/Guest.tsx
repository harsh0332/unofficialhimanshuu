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
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.whatYouDo.trim()) newErrors.whatYouDo = "This field is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Provide a valid email address";
    }
    if (!formData.whyGuest.trim()) newErrors.whyGuest = "Please tell us about your story";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus({ state: "loading" });

    const payloadData = {
      name: formData.name,
      whatYouDo: formData.whatYouDo,
      socialHandle: formData.socialHandle,
      email: formData.email,
      whyGuest: formData.whyGuest,
    };

    // Submitting under the exact required formType: "guest"
    const result = await submitLeadForm("guest", payloadData);

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
      setErrors({});
    } else {
      setStatus({
        state: "error",
        message: result.error || "Failed to transmit application. Please try again.",
      });
    }
  };

  return (
    <section
      id="guest"
      className="relative w-full py-24 md:py-32 bg-brand-ink overflow-hidden z-20 border-b border-brand-border-hairline"
    >
      {/* Background ambient ember highlight on right */}
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-brand-ember-glow rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Form Container */}
          <div className="lg:col-span-7 bg-brand-surface border border-brand-border-hairline p-5 sm:p-8 md:p-12 relative overflow-hidden order-2 lg:order-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-ember-glow rounded-full blur-[40px] pointer-events-none" />
            
            <h3 className="font-fraunces font-extrabold text-lg md:text-xl uppercase tracking-wider text-brand-bone mb-8 text-left">
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
                  <CheckCircle2 size={48} className="text-brand-ember mb-4" />
                  <h4 className="font-fraunces font-bold text-lg uppercase tracking-wider text-brand-bone mb-2">
                    Application Received
                  </h4>
                  <p className="font-inter text-xs text-brand-bone-secondary max-w-sm">
                    Awesome! Our editorial team reviews guest proposals weekly. If your background aligns with our upcoming episodes, we'll reach out to schedule a pre-interview.
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
                      label="Full Name"
                      name="name"
                      placeholder="e.g. Vicky Malhotra"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                    />
                    <FormInput
                      label="What You Do / Industry"
                      name="whatYouDo"
                      placeholder="e.g. Design Architect"
                      required
                      value={formData.whatYouDo}
                      onChange={handleChange}
                      error={errors.whatYouDo}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="Social Handle (Instagram / LinkedIn)"
                      name="socialHandle"
                      placeholder="e.g. @vickymalhotra"
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
                      error={errors.email}
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
                    error={errors.whyGuest}
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
            <span className="font-inter font-bold text-xs uppercase tracking-widest text-brand-ember">
              // Guest Curations
            </span>
            <h2 className="font-fraunces font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-brand-bone">
              STEP INTO <br />
              THE SPOTLIGHT
            </h2>
            <p className="font-inter text-sm md:text-base text-brand-bone-secondary leading-relaxed">
              We don't do promotional puff pieces or scripted PR runs. Our show belongs to the builders who have gotten their hands dirty—the ones who have scaled companies, challenged traditional medical systems, built thriving community spaces, or disrupted industries. 
            </p>
            <p className="font-inter text-sm md:text-base text-brand-bone-secondary leading-relaxed">
              If your journey carries the scars of real struggle and the insights of genuine success, Himanshu Soni's team wants to hear from you. Let's document your legacy with the premium, broadcast-grade production it deserves.
            </p>
            <p className="font-inter text-xs text-brand-bone-secondary leading-relaxed border-t border-brand-border-hairline pt-4">
              *Note: Physical recordings are held in our state-of-the-art Indore studio, providing a cinematic look. Specialized remote feeds can be configured for international builders.*
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
