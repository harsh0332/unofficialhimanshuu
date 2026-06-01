"use client";

import React, { useState } from "react";
import { Sparkles, Video, Users, Coins, ArrowRight, ArrowLeft, Send, CheckCircle2, AlertCircle, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { submitLeadForm } from "@/lib/webhook";
import { getWhatsAppLink } from "@/lib/whatsapp";

type Intent = "hire" | "guest" | "sponsor";

interface FormData {
  name: string;
  email: string;
  phone: string;
  // Hire path details
  projectType: string;
  hireBudget: string;
  // Guest path details
  profession: string;
  socialHandle: string;
  // Sponsor path details
  brandName: string;
  sponsorBudget: string;
  // Optional message
  message: string;
}

export default function InquiryRouter() {
  const [step, setStep] = useState<number>(0);
  const [intent, setIntent] = useState<Intent | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    hireBudget: "",
    profession: "",
    socialHandle: "",
    brandName: "",
    sponsorBudget: "",
    message: "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{
    state: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ state: "idle" });

  // WhatsApp helper to prefill chat based on intent and collected data
  const getWhatsAppUrl = () => {
    let text = "Hi The Unofficial Studios, I'd like to collaborate!";
    
    if (intent === "hire") {
      const typeStr = formData.projectType ? ` for a ${formData.projectType}` : "";
      text = `Hi The Unofficial Studios, I'd like to hire the studio${typeStr}!`;
    } else if (intent === "guest") {
      const handleStr = formData.socialHandle ? ` (@${formData.socialHandle.replace("@", "")})` : "";
      text = `Hi The Unofficial Studios, I'd like to apply as a guest on The Unofficial Talks${handleStr}!`;
    } else if (intent === "sponsor") {
      const brandStr = formData.brandName ? ` from ${formData.brandName}` : "";
      text = `Hi The Unofficial Studios, I'd like to discuss sponsorship options${brandStr}!`;
    }
    
    return getWhatsAppLink(text);
  };

  // Validation routines per step
  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = "Full name is required";
      
      if (!formData.email.trim()) {
        newErrors.email = "Email address is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Enter a valid email address";
      }

      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\+?[0-9\s-]{10,14}$/.test(formData.phone.replace(/[\s-]/g, ""))) {
        newErrors.phone = "Enter a valid phone number (10-12 digits)";
      }
    } else if (currentStep === 2) {
      if (intent === "hire") {
        if (!formData.projectType) newErrors.projectType = "Select a project type";
        if (!formData.hireBudget) newErrors.hireBudget = "Select a budget range";
      } else if (intent === "guest") {
        if (!formData.profession.trim()) newErrors.profession = "Let us know what you do";
        if (!formData.socialHandle.trim()) newErrors.socialHandle = "Social handle is required";
      } else if (intent === "sponsor") {
        if (!formData.brandName.trim()) newErrors.brandName = "Brand / Company name is required";
        if (!formData.sponsorBudget) newErrors.sponsorBudget = "Select a budget range";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep((prev) => prev - 1);
  };

  const handleIntentSelect = (selectedIntent: Intent) => {
    setIntent(selectedIntent);
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    setStatus({ state: "loading" });

    // Pack correct payload fields depending on intent path
    const submissionData: Record<string, string> = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    if (intent === "hire") {
      submissionData.projectType = formData.projectType;
      submissionData.budget = formData.hireBudget;
    } else if (intent === "guest") {
      submissionData.profession = formData.profession;
      submissionData.socialHandle = formData.socialHandle;
    } else if (intent === "sponsor") {
      submissionData.brandName = formData.brandName;
      submissionData.budget = formData.sponsorBudget;
    }

    // Submit using the central webhook helper with correct intent formType
    const result = await submitLeadForm(intent!, submissionData);

    if (result.success) {
      setStatus({ state: "success" });
    } else {
      setStatus({
        state: "error",
        message: result.error || "A transmission error occurred. Please try again.",
      });
    }
  };

  return (
    <section
      id="inquiry"
      className="relative w-full py-24 md:py-32 bg-brand-surface border-b border-brand-border-hairline overflow-hidden z-20 font-inter"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-ember-glow rounded-full blur-[130px] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        
        {/* Title / Honest Subtitle */}
        <div className="flex items-center gap-2 justify-center mb-4">
          <Sparkles size={12} className="text-brand-ember animate-pulse" />
          <span className="font-inter font-bold text-[10px] md:text-xs uppercase tracking-widest text-brand-bone-secondary">
            LET'S WORK TOGETHER
          </span>
          <Sparkles size={12} className="text-brand-ember animate-pulse" />
        </div>
        <h2 className="font-fraunces font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-brand-bone mb-6">
          SMART INQUIRY HUB
        </h2>
        <p className="max-w-2xl font-inter text-sm text-brand-bone-secondary leading-relaxed mb-12">
          Pick your intent below to connect with our Indore studio crew. Fill out a simple multi-step form to start high-end conversion-driven productions.
        </p>

        {/* Wizard Container Card */}
        <div className="w-full max-w-xl bg-brand-ink border border-brand-border-hairline p-6 sm:p-10 relative overflow-hidden text-left flex flex-col min-h-[380px] justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-ember-glow rounded-full blur-[50px] pointer-events-none opacity-30" />

          <AnimatePresence mode="wait">
            {status.state === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="flex flex-col items-center justify-center py-10 text-center flex-1"
              >
                <CheckCircle2 size={48} className="text-brand-ember mb-4 animate-bounce" />
                <h3 className="font-fraunces font-extrabold text-lg md:text-xl text-brand-bone uppercase mb-2">
                  Submission Successful
                </h3>
                <p className="font-inter text-xs text-brand-bone-secondary max-w-md leading-relaxed">
                  Thank you! Your request has been transmitted securely. The Unofficial crew will analyze your payload and reach out to you within 24 hours.
                </p>
                <a
                  href={getWhatsAppLink(`Hi, I just submitted an inquiry to ${intent === "hire" ? "Hire the Studio" : intent === "guest" ? "Be a Guest" : intent === "sponsor" ? "Sponsor a Show" : "collaborate"} on the website and would like a faster response!`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 h-11 px-6 bg-brand-ember hover:bg-brand-ember-deep text-brand-ink font-inter font-bold text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shrink-0 cursor-pointer min-h-[44px]"
                >
                  <MessageSquare size={12} className="text-brand-ink" />
                  <span>Faster Reply on WhatsApp</span>
                </a>
                <button
                  onClick={() => {
                    setStep(0);
                    setIntent(null);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      projectType: "",
                      hireBudget: "",
                      profession: "",
                      socialHandle: "",
                      brandName: "",
                      sponsorBudget: "",
                      message: "",
                    });
                    setStatus({ state: "idle" });
                  }}
                  className="mt-3 h-11 px-6 border border-brand-border-hairline hover:border-brand-ember text-brand-bone hover:bg-brand-ember/5 font-inter font-bold text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center shrink-0 cursor-pointer min-h-[44px]"
                >
                  Start New Inquiry
                </button>
              </motion.div>
            ) : step === 0 ? (
              <motion.div
                key="step0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-6 flex-1 justify-center"
              >
                <h3 className="font-fraunces font-extrabold text-xs uppercase tracking-wider text-brand-bone-secondary border-l-2 border-brand-ember pl-3 mb-2">
                  Select your primary inquiry intent:
                </h3>
                
                <div className="flex flex-col gap-4">
                  {/* Option 1: Hire */}
                  <button
                    onClick={() => handleIntentSelect("hire")}
                    className="flex items-center gap-4 border border-brand-border-hairline bg-brand-surface p-4 hover:border-brand-ember/40 hover:shadow-[0_0_15px_rgba(226,73,46,0.06)] transition-all duration-500 text-left group cursor-pointer min-h-[48px]"
                  >
                    <div className="w-10 h-10 bg-brand-ember/5 border border-brand-ember/20 flex items-center justify-center text-brand-ember group-hover:bg-brand-ember group-hover:text-brand-ink transition-colors duration-500 shrink-0">
                      <Video size={16} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-fraunces font-bold text-sm text-brand-bone uppercase leading-none mb-1.5 group-hover:text-brand-ember transition-colors duration-300">
                        Hire the Studio
                      </h4>
                      <p className="font-inter text-xxs text-brand-bone-secondary leading-normal">
                        Launch a high-end podcast, cinematic reels, or convert-driven brand film.
                      </p>
                    </div>
                    <ArrowRight size={14} className="text-brand-bone-muted group-hover:text-brand-ember group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                  </button>

                  {/* Option 2: Guest */}
                  <button
                    onClick={() => handleIntentSelect("guest")}
                    className="flex items-center gap-4 border border-brand-border-hairline bg-brand-surface p-4 hover:border-brand-ember/40 hover:shadow-[0_0_15px_rgba(226,73,46,0.06)] transition-all duration-500 text-left group cursor-pointer min-h-[48px]"
                  >
                    <div className="w-10 h-10 bg-brand-ember/5 border border-brand-ember/20 flex items-center justify-center text-brand-ember group-hover:bg-brand-ember group-hover:text-brand-ink transition-colors duration-500 shrink-0">
                      <Users size={16} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-fraunces font-bold text-sm text-brand-bone uppercase leading-none mb-1.5 group-hover:text-brand-ember transition-colors duration-300">
                        Be a Guest
                      </h4>
                      <p className="font-inter text-xxs text-brand-bone-secondary leading-normal">
                        Pitch your disruption story to get featured on The Unofficial Talks podcast.
                      </p>
                    </div>
                    <ArrowRight size={14} className="text-brand-bone-muted group-hover:text-brand-ember group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                  </button>

                  {/* Option 3: Sponsor */}
                  <button
                    onClick={() => handleIntentSelect("sponsor")}
                    className="flex items-center gap-4 border border-brand-border-hairline bg-brand-surface p-4 hover:border-brand-ember/40 hover:shadow-[0_0_15px_rgba(226,73,46,0.06)] transition-all duration-500 text-left group cursor-pointer min-h-[48px]"
                  >
                    <div className="w-10 h-10 bg-brand-ember/5 border border-brand-ember/20 flex items-center justify-center text-brand-ember group-hover:bg-brand-ember group-hover:text-brand-ink transition-colors duration-500 shrink-0">
                      <Coins size={16} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-fraunces font-bold text-sm text-brand-bone uppercase leading-none mb-1.5 group-hover:text-brand-ember transition-colors duration-300">
                        Sponsor a Show
                      </h4>
                      <p className="font-inter text-xxs text-brand-bone-secondary leading-normal">
                        Collaborate and expose your product to Himanshu's 207K+ creator audience.
                      </p>
                    </div>
                    <ArrowRight size={14} className="text-brand-bone-muted group-hover:text-brand-ember group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key={step}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 flex-1 justify-between"
                noValidate
              >
                {/* Step content wrapper */}
                <div className="flex flex-col gap-5">
                  {/* Step Title Header */}
                  <div className="flex justify-between items-center border-b border-brand-border-hairline pb-3">
                    <span className="font-fraunces font-bold text-xs uppercase tracking-wider text-brand-bone flex items-center gap-1.5">
                      {intent === "hire" ? "Hire the Studio" : intent === "guest" ? "Apply Guest" : "Sponsor Show"} 
                      <span className="text-[10px] text-brand-bone-muted font-mono lowercase tracking-normal font-normal">
                        (step {step} of 3)
                      </span>
                    </span>
                    {/* Progress dots */}
                    <div className="flex gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${step >= 1 ? "bg-brand-ember" : "bg-brand-bone-muted/40"}`} />
                      <span className={`w-1.5 h-1.5 rounded-full ${step >= 2 ? "bg-brand-ember" : "bg-brand-bone-muted/40"}`} />
                      <span className={`w-1.5 h-1.5 rounded-full ${step >= 3 ? "bg-brand-ember" : "bg-brand-bone-muted/40"}`} />
                    </div>
                  </div>

                  {status.state === "error" && (
                    <div className="flex items-center gap-2 bg-brand-ember/10 border border-brand-ember/30 p-2.5 text-brand-ember text-xxs font-inter">
                      <AlertCircle size={12} className="shrink-0" />
                      <span>{status.message}</span>
                    </div>
                  )}

                  {/* Step 1 Form Fields */}
                  {step === 1 && (
                    <div className="flex flex-col gap-4">
                      {/* Name */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="inquiry-name" className="font-inter font-bold uppercase tracking-wider text-[10px] text-brand-bone-secondary flex justify-between items-center">
                          <span>Full Name <span className="text-brand-ember">*</span></span>
                          {errors.name && <span className="text-brand-ember text-[9px] font-inter tracking-normal normal-case font-medium">{errors.name}</span>}
                        </label>
                        <input
                          id="inquiry-name"
                          type="text"
                          required
                          placeholder="Himanshu Soni"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (errors.name) setErrors({ ...errors, name: "" });
                          }}
                          className={`w-full h-12 px-4 bg-brand-surface border text-brand-bone font-inter text-xs rounded-none placeholder-brand-bone-secondary/30 focus:outline-none focus:ring-1 focus:ring-brand-ember focus:border-brand-ember transition-all duration-300 ${
                            errors.name ? "border-brand-ember" : "border-brand-border-hairline"
                          }`}
                        />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="inquiry-email" className="font-inter font-bold uppercase tracking-wider text-[10px] text-brand-bone-secondary flex justify-between items-center">
                          <span>Business Email <span className="text-brand-ember">*</span></span>
                          {errors.email && <span className="text-brand-ember text-[9px] font-inter tracking-normal normal-case font-medium">{errors.email}</span>}
                        </label>
                        <input
                          id="inquiry-email"
                          type="email"
                          required
                          placeholder="name@email.com"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: "" });
                          }}
                          className={`w-full h-12 px-4 bg-brand-surface border text-brand-bone font-inter text-xs rounded-none placeholder-brand-bone-secondary/30 focus:outline-none focus:ring-1 focus:ring-brand-ember focus:border-brand-ember transition-all duration-300 ${
                            errors.email ? "border-brand-ember" : "border-brand-border-hairline"
                          }`}
                        />
                      </div>

                      {/* Phone */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="inquiry-phone" className="font-inter font-bold uppercase tracking-wider text-[10px] text-brand-bone-secondary flex justify-between items-center">
                          <span>Phone Number (India Format) <span className="text-brand-ember">*</span></span>
                          {errors.phone && <span className="text-brand-ember text-[9px] font-inter tracking-normal normal-case font-medium">{errors.phone}</span>}
                        </label>
                        <input
                          id="inquiry-phone"
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (errors.phone) setErrors({ ...errors, phone: "" });
                          }}
                          className={`w-full h-12 px-4 bg-brand-surface border text-brand-bone font-inter text-xs rounded-none placeholder-brand-bone-secondary/30 focus:outline-none focus:ring-1 focus:ring-brand-ember focus:border-brand-ember transition-all duration-300 ${
                            errors.phone ? "border-brand-ember" : "border-brand-border-hairline"
                          }`}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2 Form Fields */}
                  {step === 2 && (
                    <div className="flex flex-col gap-4">
                      {/* Intent Path: HIRE */}
                      {intent === "hire" && (
                        <>
                          {/* Project type */}
                          <div className="flex flex-col gap-2">
                            <label htmlFor="inquiry-projectType" className="font-inter font-bold uppercase tracking-wider text-[10px] text-brand-bone-secondary flex justify-between items-center">
                              <span>Project Type <span className="text-brand-ember">*</span></span>
                              {errors.projectType && <span className="text-brand-ember text-[9px] font-inter tracking-normal normal-case font-medium">{errors.projectType}</span>}
                            </label>
                            <div className="relative">
                              <select
                                id="inquiry-projectType"
                                required
                                value={formData.projectType}
                                onChange={(e) => {
                                  setFormData({ ...formData, projectType: e.target.value });
                                  if (errors.projectType) setErrors({ ...errors, projectType: "" });
                                }}
                                className={`w-full h-12 px-4 bg-brand-surface border text-brand-bone font-inter text-xs rounded-none appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-ember focus:border-brand-ember transition-all duration-300 ${
                                  errors.projectType ? "border-brand-ember" : "border-brand-border-hairline"
                                }`}
                              >
                                <option value="" disabled className="bg-brand-surface text-brand-bone-muted/40">Select a project type</option>
                                <option value="Podcast" className="bg-brand-surface text-brand-bone">Flagship Podcast Show</option>
                                <option value="Reels" className="bg-brand-surface text-brand-bone">Cinematic Vertical Reels</option>
                                <option value="Brand Film" className="bg-brand-surface text-brand-bone">Premium D2C Brand Film</option>
                                <option value="Event Coverage" className="bg-brand-surface text-brand-bone">Indore Event Production</option>
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-bone-secondary">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                              </div>
                            </div>
                          </div>

                          {/* Budget range */}
                          <div className="flex flex-col gap-2">
                            <label htmlFor="inquiry-hireBudget" className="font-inter font-bold uppercase tracking-wider text-[10px] text-brand-bone-secondary flex justify-between items-center">
                              <span>Estimated Budget <span className="text-brand-ember">*</span></span>
                              {errors.hireBudget && <span className="text-brand-ember text-[9px] font-inter tracking-normal normal-case font-medium">{errors.hireBudget}</span>}
                            </label>
                            <div className="relative">
                              <select
                                id="inquiry-hireBudget"
                                required
                                value={formData.hireBudget}
                                onChange={(e) => {
                                  setFormData({ ...formData, hireBudget: e.target.value });
                                  if (errors.hireBudget) setErrors({ ...errors, hireBudget: "" });
                                }}
                                className={`w-full h-12 px-4 bg-brand-surface border text-brand-bone font-inter text-xs rounded-none appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-ember focus:border-brand-ember transition-all duration-300 ${
                                  errors.hireBudget ? "border-brand-ember" : "border-brand-border-hairline"
                                }`}
                              >
                                <option value="" disabled className="bg-brand-surface text-brand-bone-muted/40">Select a budget range</option>
                                <option value="Under ₹50k" className="bg-brand-surface text-brand-bone">Under ₹50k (Local / Reels Only)</option>
                                <option value="₹50k - ₹1L" className="bg-brand-surface text-brand-bone">₹50k - ₹1L (Standard Podcast)</option>
                                <option value="₹1L - ₹2.5L" className="bg-brand-surface text-brand-bone">₹1L - ₹2.5L (Premium Brand Campaign)</option>
                                <option value="₹2.5L+" className="bg-brand-surface text-brand-bone">₹2.5L+ (Enterprise Films)</option>
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-bone-secondary">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Intent Path: GUEST */}
                      {intent === "guest" && (
                        <>
                          {/* What you do */}
                          <div className="flex flex-col gap-2">
                            <label htmlFor="inquiry-profession" className="font-inter font-bold uppercase tracking-wider text-[10px] text-brand-bone-secondary flex justify-between items-center">
                              <span>What you do (Founder, Creator, Disruptor) <span className="text-brand-ember">*</span></span>
                              {errors.profession && <span className="text-brand-ember text-[9px] font-inter tracking-normal normal-case font-medium">{errors.profession}</span>}
                            </label>
                            <input
                              id="inquiry-profession"
                              type="text"
                              required
                              placeholder="D2C Brand Founder"
                              value={formData.profession}
                              onChange={(e) => {
                                setFormData({ ...formData, profession: e.target.value });
                                if (errors.profession) setErrors({ ...errors, profession: "" });
                              }}
                              className={`w-full h-12 px-4 bg-brand-surface border text-brand-bone font-inter text-xs rounded-none placeholder-brand-bone-secondary/30 focus:outline-none focus:ring-1 focus:ring-brand-ember focus:border-brand-ember transition-all duration-300 ${
                                errors.profession ? "border-brand-ember" : "border-brand-border-hairline"
                              }`}
                            />
                          </div>

                          {/* Social profile handle */}
                          <div className="flex flex-col gap-2">
                            <label htmlFor="inquiry-social" className="font-inter font-bold uppercase tracking-wider text-[10px] text-brand-bone-secondary flex justify-between items-center">
                              <span>Instagram or LinkedIn Handle <span className="text-brand-ember">*</span></span>
                              {errors.socialHandle && <span className="text-brand-ember text-[9px] font-inter tracking-normal normal-case font-medium">{errors.socialHandle}</span>}
                            </label>
                            <input
                              id="inquiry-social"
                              type="text"
                              required
                              placeholder="@unofficialhimanshu"
                              value={formData.socialHandle}
                              onChange={(e) => {
                                setFormData({ ...formData, socialHandle: e.target.value });
                                if (errors.socialHandle) setErrors({ ...errors, socialHandle: "" });
                              }}
                              className={`w-full h-12 px-4 bg-brand-surface border text-brand-bone font-inter text-xs rounded-none placeholder-brand-bone-secondary/30 focus:outline-none focus:ring-1 focus:ring-brand-ember focus:border-brand-ember transition-all duration-300 ${
                                errors.socialHandle ? "border-brand-ember" : "border-brand-border-hairline"
                              }`}
                            />
                          </div>
                        </>
                      )}

                      {/* Intent Path: SPONSOR */}
                      {intent === "sponsor" && (
                        <>
                          {/* Brand Name */}
                          <div className="flex flex-col gap-2">
                            <label htmlFor="inquiry-brandName" className="font-inter font-bold uppercase tracking-wider text-[10px] text-brand-bone-secondary flex justify-between items-center">
                              <span>Brand / Company Name <span className="text-brand-ember">*</span></span>
                              {errors.brandName && <span className="text-brand-ember text-[9px] font-inter tracking-normal normal-case font-medium">{errors.brandName}</span>}
                            </label>
                            <input
                              id="inquiry-brandName"
                              type="text"
                              required
                              placeholder="Indore D2C Inc."
                              value={formData.brandName}
                              onChange={(e) => {
                                setFormData({ ...formData, brandName: e.target.value });
                                if (errors.brandName) setErrors({ ...errors, brandName: "" });
                              }}
                              className={`w-full h-12 px-4 bg-brand-surface border text-brand-bone font-inter text-xs rounded-none placeholder-brand-bone-secondary/30 focus:outline-none focus:ring-1 focus:ring-brand-ember focus:border-brand-ember transition-all duration-300 ${
                                errors.brandName ? "border-brand-ember" : "border-brand-border-hairline"
                              }`}
                            />
                          </div>

                          {/* Budget range */}
                          <div className="flex flex-col gap-2">
                            <label htmlFor="inquiry-sponsorBudget" className="font-inter font-bold uppercase tracking-wider text-[10px] text-brand-bone-secondary flex justify-between items-center">
                              <span>Collaboration Budget <span className="text-brand-ember">*</span></span>
                              {errors.sponsorBudget && <span className="text-brand-ember text-[9px] font-inter tracking-normal normal-case font-medium">{errors.sponsorBudget}</span>}
                            </label>
                            <div className="relative">
                              <select
                                id="inquiry-sponsorBudget"
                                required
                                value={formData.sponsorBudget}
                                onChange={(e) => {
                                  setFormData({ ...formData, sponsorBudget: e.target.value });
                                  if (errors.sponsorBudget) setErrors({ ...errors, sponsorBudget: "" });
                                }}
                                className={`w-full h-12 px-4 bg-brand-surface border text-brand-bone font-inter text-xs rounded-none appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-ember focus:border-brand-ember transition-all duration-300 ${
                                  errors.sponsorBudget ? "border-brand-ember" : "border-brand-border-hairline"
                                }`}
                              >
                                <option value="" disabled className="bg-brand-surface text-brand-bone-muted/40">Select a budget range</option>
                                <option value="Under ₹1L" className="bg-brand-surface text-brand-bone">Under ₹1L (Single Reel Placement)</option>
                                <option value="₹1L - ₹3L" className="bg-brand-surface text-brand-bone">₹1L - ₹3L (Flagship Episode Integration)</option>
                                <option value="₹3L - ₹5L" className="bg-brand-surface text-brand-bone">₹3L - ₹5L (Multi-Episode Series Sponsor)</option>
                                <option value="₹5L+" className="bg-brand-surface text-brand-bone">₹5L+ (Ecosystem Partnership)</option>
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-bone-secondary">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Step 3 Form Fields */}
                  {step === 3 && (
                    <div className="flex flex-col gap-4">
                      {/* Message optional */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="inquiry-message" className="font-inter font-bold uppercase tracking-wider text-[10px] text-brand-bone-secondary">
                          Additional details / Project Brief (Optional)
                        </label>
                        <textarea
                          id="inquiry-message"
                          rows={4}
                          placeholder="Briefly describe your requirements or vision..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-brand-surface border border-brand-border-hairline text-brand-bone px-4 py-3 rounded-none font-inter text-xs transition-all duration-300 placeholder:text-brand-bone-secondary/30 focus:outline-none focus:ring-1 focus:ring-brand-ember focus:border-brand-ember resize-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Back / Next / Submit buttons row */}
                <div className="flex flex-col gap-4 border-t border-brand-border-hairline pt-6 mt-4">
                  
                  {/* Persistent WhatsApp option on every step */}
                  <div className="text-center">
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-inter font-semibold text-[10px] uppercase tracking-widest text-brand-bone-secondary hover:text-brand-ember transition-colors py-2 min-h-[44px]"
                    >
                      <MessageSquare size={12} className="text-brand-ember" />
                      <span>Prefer chat? Continue on WhatsApp</span>
                    </a>
                  </div>

                  {/* Directional Triggers */}
                  <div className="flex justify-between items-center gap-3">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="h-11 px-5 border border-brand-border-hairline hover:border-brand-ember text-brand-bone hover:bg-brand-ember/5 font-inter font-bold text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer min-h-[44px] shrink-0"
                    >
                      <ArrowLeft size={10} />
                      <span>Back</span>
                    </button>

                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="flex-1 h-11 bg-brand-ember hover:bg-brand-ember-deep text-brand-ink font-inter font-bold text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer min-h-[44px] sticky bottom-0"
                      >
                        <span>Next</span>
                        <ArrowRight size={10} className="text-brand-ink" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={status.state === "loading"}
                        className="flex-1 h-11 bg-brand-ember hover:bg-brand-ember-deep text-brand-ink font-inter font-bold text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer min-h-[44px] disabled:opacity-50"
                      >
                        <Send size={10} className="text-brand-ink" />
                        <span>{status.state === "loading" ? "Transmitting..." : "Submit Inquiry"}</span>
                      </button>
                    )}
                  </div>
                </div>

              </motion.form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
