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
  
  // PATH A: HIRE THE STUDIO
  projectType: string;
  hireBudget: string;
  timeline: string;
  outcome: string;
  
  // PATH B: BE A GUEST
  profession: string;
  socialHandle: string;
  reach: string;
  story: string;
  guestGoal: string;
  topic: string;
  
  // PATH C: SPONSOR A SHOW
  brandName: string;
  category: string;
  sponsorBudget: string;
  sponsorGoal: string;
  targetAudience: string;
  
  // Optional message
  message: string;
}

const HIRE_OUTCOMES = ["More reach/views", "Brand trust/positioning", "Leads/sales", "Hiring/employer brand", "Other"];
const GUEST_GOALS = ["Reach a new audience", "Build authority", "Promote something", "Just love the conversation"];
const SPONSOR_GOALS = ["Brand awareness", "Product launch", "Lead gen", "Founder positioning"];

export default function InquiryRouter() {
  const [step, setStep] = useState<number>(0);
  const [intent, setIntent] = useState<Intent | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    hireBudget: "",
    timeline: "",
    outcome: "",
    profession: "",
    socialHandle: "",
    reach: "",
    story: "",
    guestGoal: "",
    topic: "",
    brandName: "",
    category: "",
    sponsorBudget: "",
    sponsorGoal: "",
    targetAudience: "",
    message: "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{
    state: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ state: "idle" });

  // Listen for custom trigger events from other components (like Services cards)
  React.useEffect(() => {
    const handleTrigger = (e: Event) => {
      const customEvent = e as CustomEvent<{ intent: Intent; projectType?: string }>;
      if (customEvent.detail) {
        setIntent(customEvent.detail.intent);
        setFormData((prev) => ({
          ...prev,
          projectType: customEvent.detail.projectType || prev.projectType,
        }));
        setStep(1); // Skip Step 0 and go straight to Step 1
        setErrors({}); // Reset error boundaries
        setStatus({ state: "idle" }); // Reset status states
      }
    };

    window.addEventListener("unofficial-inquiry-trigger", handleTrigger);
    return () => {
      window.removeEventListener("unofficial-inquiry-trigger", handleTrigger);
    };
  }, []);

  // WhatsApp helper to prefill chat based on intent and collected data
  const getWhatsAppUrl = () => {
    let text = "Hi The Unofficial Studios, I'd like to collaborate!";
    
    if (intent === "hire") {
      const typeStr = formData.projectType ? ` for a ${formData.projectType}` : " project";
      const budgetStr = formData.hireBudget ? `, budget: ${formData.hireBudget}` : "";
      text = `Hi, I want to hire The Unofficial Studios for ${typeStr}${budgetStr}.`;
    } else if (intent === "guest") {
      const profStr = formData.profession ? `I'm a ${formData.profession}` : "I'm a creator/expert";
      const reachStr = formData.reach ? ` with a reach of ${formData.reach}` : "";
      text = `Hi, I'd like to apply as a guest on The Unofficial Talks. ${profStr}${reachStr} audience.`;
    } else if (intent === "sponsor") {
      const brandStr = formData.brandName ? ` Brand: ${formData.brandName}` : "";
      const budgetStr = formData.sponsorBudget ? `, budget: ${formData.sponsorBudget}` : "";
      text = `Hi, I want to discuss sponsoring a show.${brandStr}${budgetStr}.`;
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
        if (!formData.hireBudget) newErrors.hireBudget = "Select an estimated budget";
        if (!formData.timeline) newErrors.timeline = "Select a project timeline";
      } else if (intent === "guest") {
        if (!formData.profession.trim()) newErrors.profession = "Professional role is required";
        if (!formData.socialHandle.trim()) newErrors.socialHandle = "Primary handle is required";
        if (!formData.reach) newErrors.reach = "Select your audience scale";
      } else if (intent === "sponsor") {
        if (!formData.brandName.trim()) newErrors.brandName = "Brand / Company name is required";
        if (!formData.category) newErrors.category = "Select a brand category";
        if (!formData.sponsorBudget) newErrors.sponsorBudget = "Select a sponsorship budget";
      }
    } else if (currentStep === 3) {
      if (intent === "hire") {
        if (!formData.outcome) newErrors.outcome = "Select a primary outcome target";
      } else if (intent === "guest") {
        if (!formData.story.trim()) newErrors.story = "Let us know why your story belongs on air";
        if (!formData.topic.trim()) newErrors.topic = "Please propose a focus topic";
      } else if (intent === "sponsor") {
        if (!formData.sponsorGoal) newErrors.sponsorGoal = "Select a primary sponsorship goal";
        if (!formData.targetAudience.trim()) newErrors.targetAudience = "Target audience profile is required";
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
    };

    if (intent === "hire") {
      submissionData.projectType = formData.projectType;
      submissionData.budget = formData.hireBudget;
      submissionData.timeline = formData.timeline;
      submissionData.outcome = formData.outcome;
      submissionData.message = formData.message;
    } else if (intent === "guest") {
      submissionData.profession = formData.profession;
      submissionData.socialHandle = formData.socialHandle;
      submissionData.reach = formData.reach;
      submissionData.story = formData.story;
      submissionData.goal = formData.guestGoal;
      submissionData.topic = formData.topic;
    } else if (intent === "sponsor") {
      submissionData.brandName = formData.brandName;
      submissionData.category = formData.category;
      submissionData.budget = formData.sponsorBudget;
      submissionData.goal = formData.sponsorGoal;
      submissionData.targetAudience = formData.targetAudience;
      submissionData.message = formData.message;
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

  // Determine if budget is "Not sure yet" or "Need a rate card" to nudge WhatsApp
  const showDirectWhatsAppNudge = 
    (intent === "hire" && formData.hireBudget === "Not sure yet") ||
    (intent === "sponsor" && formData.sponsorBudget === "Need a rate card");

  const getSuccessWhatsAppLink = () => {
    let message = "Hi, I just submitted an inquiry on the website!";
    if (showDirectWhatsAppNudge) {
      message = `Hi, I just submitted an inquiry to ${
        intent === "hire" ? "Hire the Studio" : "Sponsor a Show"
      } and picked '${
        intent === "hire" ? "Not sure yet" : "Need a rate card"
      }'. Let's figure out the right package on a quick call!`;
    } else {
      message = `Hi, I just submitted an inquiry to ${
        intent === "hire" ? "Hire the Studio" : intent === "guest" ? "Be a Guest" : "Sponsor a Show"
      } on the website and would like a faster response!`;
    }
    return getWhatsAppLink(message);
  };

  const getSuccessMessage = () => {
    if (intent === "hire") {
      return "We'll send a tailored approach + sample work.";
    } else if (intent === "guest") {
      return "If it's a fit, we'll reach out to schedule.";
    } else if (intent === "sponsor") {
      return "We'll send relevant show options + audience data.";
    }
    return "Thank you! Your request has been transmitted securely.";
  };

  const getStorylineIntro = () => {
    if (intent === "hire") {
      return "Tell us what you're building. We'll tell you how we'd film it.";
    } else if (intent === "guest") {
      return "Great stories don't wait for permission. Tell us why yours belongs on the mic.";
    } else if (intent === "sponsor") {
      return "Put your brand inside stories people actually finish watching.";
    }
    return "";
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
        <div className="w-full max-w-xl bg-brand-ink border border-brand-border-hairline p-6 sm:p-10 relative overflow-hidden text-left flex flex-col min-h-[460px] justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-ember-glow rounded-full blur-[50px] pointer-events-none opacity-30" />

          <AnimatePresence mode="wait">
            {status.state === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="flex flex-col items-center justify-center py-6 text-center flex-1"
              >
                <CheckCircle2 size={48} className="text-brand-ember mb-4 animate-bounce" />
                <h3 className="font-fraunces font-extrabold text-lg md:text-xl text-brand-bone uppercase mb-2">
                  Submission Successful
                </h3>
                <p className="font-inter text-xs text-brand-bone-secondary max-w-md leading-relaxed mb-4">
                  Thank you! Your request has been transmitted securely. {getSuccessMessage()}
                </p>

                {showDirectWhatsAppNudge && (
                  <div className="bg-brand-ember/5 border border-brand-border-accent p-4 my-2 text-center w-full max-w-sm rounded-none">
                    <span className="font-mono text-[8px] uppercase tracking-widest text-brand-ember font-bold block mb-1">
                      // RECOMMENDED ACTION
                    </span>
                    <p className="font-inter text-[11px] text-brand-bone-secondary leading-relaxed">
                      Let's figure out the right package on a quick call. Tap below to chat instantly.
                    </p>
                  </div>
                )}

                <a
                  href={getSuccessWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 h-11 px-6 bg-brand-ember hover:bg-brand-ember-deep text-brand-ink font-inter font-bold text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shrink-0 cursor-pointer min-h-[44px]"
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
                      timeline: "",
                      outcome: "",
                      profession: "",
                      socialHandle: "",
                      reach: "",
                      story: "",
                      guestGoal: "",
                      topic: "",
                      brandName: "",
                      category: "",
                      sponsorBudget: "",
                      sponsorGoal: "",
                      targetAudience: "",
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

                  {/* Storyteller Intro Line (Fraunces) */}
                  <div className="text-left py-1">
                    <p className="font-fraunces font-bold text-sm md:text-base leading-snug text-brand-ember-bright italic">
                      "{getStorylineIntro()}"
                    </p>
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
                          {errors.name && <span className="text-brand-ember-bright text-[9px] font-inter tracking-normal normal-case font-medium" aria-live="polite">{errors.name}</span>}
                        </label>
                        <input
                          id="inquiry-name"
                          type="text"
                          required
                          autoComplete="name"
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
                          {errors.email && <span className="text-brand-ember-bright text-[9px] font-inter tracking-normal normal-case font-medium" aria-live="polite">{errors.email}</span>}
                        </label>
                        <input
                          id="inquiry-email"
                          type="email"
                          required
                          autoComplete="email"
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
                          {errors.phone && <span className="text-brand-ember-bright text-[9px] font-inter tracking-normal normal-case font-medium" aria-live="polite">{errors.phone}</span>}
                        </label>
                        <input
                          id="inquiry-phone"
                          type="tel"
                          required
                          autoComplete="tel"
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
                              {errors.projectType && <span className="text-brand-ember-bright text-[9px] font-inter tracking-normal normal-case font-medium" aria-live="polite">{errors.projectType}</span>}
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
                                <option value="Podcast Series" className="bg-brand-surface text-brand-bone">Podcast Series</option>
                                <option value="Brand Reels / Short-Form" className="bg-brand-surface text-brand-bone">Brand Reels / Short-Form</option>
                                <option value="Brand Film / Ad" className="bg-brand-surface text-brand-bone">Brand Film / Ad</option>
                                <option value="Event Coverage" className="bg-brand-surface text-brand-bone">Event Coverage</option>
                                <option value="Full Content Engine (retainer)" className="bg-brand-surface text-brand-bone">Full Content Engine (retainer)</option>
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
                              {errors.hireBudget && <span className="text-brand-ember-bright text-[9px] font-inter tracking-normal normal-case font-medium" aria-live="polite">{errors.hireBudget}</span>}
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
                                <option value="Under ₹50K" className="bg-brand-surface text-brand-bone">Under ₹50K</option>
                                <option value="₹50K–1.5L" className="bg-brand-surface text-brand-bone">₹50K–1.5L</option>
                                <option value="₹1.5L–5L" className="bg-brand-surface text-brand-bone">₹1.5L–5L</option>
                                <option value="₹5L+" className="bg-brand-surface text-brand-bone">₹5L+</option>
                                <option value="Not sure yet" className="bg-brand-surface text-brand-bone">Not sure yet (Need to consult)</option>
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-bone-secondary">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                              </div>
                            </div>
                          </div>

                          {/* Timeline */}
                          <div className="flex flex-col gap-2">
                            <label htmlFor="inquiry-timeline" className="font-inter font-bold uppercase tracking-wider text-[10px] text-brand-bone-secondary flex justify-between items-center">
                              <span>Timeline <span className="text-brand-ember">*</span></span>
                              {errors.timeline && <span className="text-brand-ember-bright text-[9px] font-inter tracking-normal normal-case font-medium" aria-live="polite">{errors.timeline}</span>}
                            </label>
                            <div className="relative">
                              <select
                                id="inquiry-timeline"
                                required
                                value={formData.timeline}
                                onChange={(e) => {
                                  setFormData({ ...formData, timeline: e.target.value });
                                  if (errors.timeline) setErrors({ ...errors, timeline: "" });
                                }}
                                className={`w-full h-12 px-4 bg-brand-surface border text-brand-bone font-inter text-xs rounded-none appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-ember focus:border-brand-ember transition-all duration-300 ${
                                  errors.timeline ? "border-brand-ember" : "border-brand-border-hairline"
                                }`}
                              >
                                <option value="" disabled className="bg-brand-surface text-brand-bone-muted/40">Select a project timeline</option>
                                <option value="This month" className="bg-brand-surface text-brand-bone">This month</option>
                                <option value="1–3 months" className="bg-brand-surface text-brand-bone">1–3 months</option>
                                <option value="Just exploring" className="bg-brand-surface text-brand-bone">Just exploring</option>
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
                              <span>What you do <span className="text-brand-ember">*</span></span>
                              {errors.profession && <span className="text-brand-ember-bright text-[9px] font-inter tracking-normal normal-case font-medium" aria-live="polite">{errors.profession}</span>}
                            </label>
                            <input
                              id="inquiry-profession"
                              type="text"
                              required
                              autoComplete="organization-title"
                              placeholder="e.g. founder / creator / expert / public figure"
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
                              <span>Primary platform + handle <span className="text-brand-ember">*</span></span>
                              {errors.socialHandle && <span className="text-brand-ember-bright text-[9px] font-inter tracking-normal normal-case font-medium" aria-live="polite">{errors.socialHandle}</span>}
                            </label>
                            <input
                              id="inquiry-social"
                              type="text"
                              required
                              autoComplete="username"
                              placeholder="e.g. Instagram @handle or LinkedIn URL"
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

                          {/* Audience size / reach */}
                          <div className="flex flex-col gap-2">
                            <label htmlFor="inquiry-reach" className="font-inter font-bold uppercase tracking-wider text-[10px] text-brand-bone-secondary flex justify-between items-center">
                              <span>Audience size / reach <span className="text-brand-ember">*</span></span>
                              {errors.reach && <span className="text-brand-ember-bright text-[9px] font-inter tracking-normal normal-case font-medium" aria-live="polite">{errors.reach}</span>}
                            </label>
                            <div className="relative">
                              <select
                                id="inquiry-reach"
                                required
                                value={formData.reach}
                                onChange={(e) => {
                                  setFormData({ ...formData, reach: e.target.value });
                                  if (errors.reach) setErrors({ ...errors, reach: "" });
                                }}
                                className={`w-full h-12 px-4 bg-brand-surface border text-brand-bone font-inter text-xs rounded-none appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-ember focus:border-brand-ember transition-all duration-300 ${
                                  errors.reach ? "border-brand-ember" : "border-brand-border-hairline"
                                }`}
                              >
                                <option value="" disabled className="bg-brand-surface text-brand-bone-muted/40">Select audience scale</option>
                                <option value="Under 10K" className="bg-brand-surface text-brand-bone">Under 10K</option>
                                <option value="10–100K" className="bg-brand-surface text-brand-bone">10–100K</option>
                                <option value="100K–1M" className="bg-brand-surface text-brand-bone">100K–1M</option>
                                <option value="1M+" className="bg-brand-surface text-brand-bone">1M+</option>
                                <option value="Just starting" className="bg-brand-surface text-brand-bone">Just starting</option>
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

                      {/* Intent Path: SPONSOR */}
                      {intent === "sponsor" && (
                        <>
                          {/* Brand Name */}
                          <div className="flex flex-col gap-2">
                            <label htmlFor="inquiry-brandName" className="font-inter font-bold uppercase tracking-wider text-[10px] text-brand-bone-secondary flex justify-between items-center">
                              <span>Brand / Company Name <span className="text-brand-ember">*</span></span>
                              {errors.brandName && <span className="text-brand-ember-bright text-[9px] font-inter tracking-normal normal-case font-medium" aria-live="polite">{errors.brandName}</span>}
                            </label>
                            <input
                              id="inquiry-brandName"
                              type="text"
                              required
                              autoComplete="organization"
                              placeholder="e.g. Indy Skincare"
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

                          {/* Brand Category */}
                          <div className="flex flex-col gap-2">
                            <label htmlFor="inquiry-category" className="font-inter font-bold uppercase tracking-wider text-[10px] text-brand-bone-secondary flex justify-between items-center">
                              <span>Category <span className="text-brand-ember">*</span></span>
                              {errors.category && <span className="text-brand-ember-bright text-[9px] font-inter tracking-normal normal-case font-medium" aria-live="polite">{errors.category}</span>}
                            </label>
                            <div className="relative">
                              <select
                                id="inquiry-category"
                                required
                                value={formData.category}
                                onChange={(e) => {
                                  setFormData({ ...formData, category: e.target.value });
                                  if (errors.category) setErrors({ ...errors, category: "" });
                                }}
                                className={`w-full h-12 px-4 bg-brand-surface border text-brand-bone font-inter text-xs rounded-none appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-ember focus:border-brand-ember transition-all duration-300 ${
                                  errors.category ? "border-brand-ember" : "border-brand-border-hairline"
                                }`}
                              >
                                <option value="" disabled className="bg-brand-surface text-brand-bone-muted/40">Select a brand category</option>
                                <option value="D2C" className="bg-brand-surface text-brand-bone">D2C</option>
                                <option value="SaaS/Tech" className="bg-brand-surface text-brand-bone">SaaS/Tech</option>
                                <option value="Finance" className="bg-brand-surface text-brand-bone">Finance</option>
                                <option value="Education" className="bg-brand-surface text-brand-bone">Education</option>
                                <option value="Real Estate" className="bg-brand-surface text-brand-bone">Real Estate</option>
                                <option value="Other" className="bg-brand-surface text-brand-bone">Other</option>
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-bone-secondary">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                              </div>
                            </div>
                          </div>

                          {/* Sponsor budget range */}
                          <div className="flex flex-col gap-2">
                            <label htmlFor="inquiry-sponsorBudget" className="font-inter font-bold uppercase tracking-wider text-[10px] text-brand-bone-secondary flex justify-between items-center">
                              <span>Budget range <span className="text-brand-ember">*</span></span>
                              {errors.sponsorBudget && <span className="text-brand-ember-bright text-[9px] font-inter tracking-normal normal-case font-medium" aria-live="polite">{errors.sponsorBudget}</span>}
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
                                <option value="Under ₹1L" className="bg-brand-surface text-brand-bone">Under ₹1L</option>
                                <option value="₹1–5L" className="bg-brand-surface text-brand-bone">₹1–5L</option>
                                <option value="₹5–15L" className="bg-brand-surface text-brand-bone">₹5–15L</option>
                                <option value="₹15L+" className="bg-brand-surface text-brand-bone">₹15L+</option>
                                <option value="Need a rate card" className="bg-brand-surface text-brand-bone">Need a rate card</option>
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
                      {/* Intent Path: HIRE */}
                      {intent === "hire" && (
                        <>
                          {/* Outcome Chips */}
                          <div className="flex flex-col gap-2">
                            <label className="font-inter font-bold uppercase tracking-wider text-[10px] text-brand-bone-secondary flex justify-between items-center">
                              <span>What outcome matters most? <span className="text-brand-ember">*</span></span>
                              {errors.outcome && <span className="text-brand-ember-bright text-[9px] font-inter tracking-normal normal-case font-medium" aria-live="polite">{errors.outcome}</span>}
                            </label>
                            <div className="flex flex-wrap gap-2 pt-1">
                              {HIRE_OUTCOMES.map((option) => {
                                const isSelected = formData.outcome === option;
                                return (
                                  <button
                                    key={option}
                                    type="button"
                                    onClick={() => {
                                      setFormData({ ...formData, outcome: option });
                                      if (errors.outcome) setErrors({ ...errors, outcome: "" });
                                    }}
                                    className={`py-2 px-3 border font-inter text-xs font-semibold cursor-pointer transition-all duration-300 min-h-[44px] flex items-center justify-center ${
                                      isSelected
                                        ? "bg-brand-ember border-brand-ember text-brand-ink font-bold"
                                        : "bg-brand-surface border-brand-border-hairline text-brand-bone-secondary hover:border-brand-ember/40 hover:text-brand-bone"
                                    }`}
                                  >
                                    {option}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Brief textarea */}
                          <div className="flex flex-col gap-2">
                            <label htmlFor="inquiry-hire-brief" className="font-inter font-bold uppercase tracking-wider text-[10px] text-brand-bone-secondary">
                              Brief about your brand & goal
                            </label>
                            <textarea
                              id="inquiry-hire-brief"
                              rows={4}
                              placeholder="e.g. We're a D2C skincare brand in Indore, want a founder-led podcast to build trust before we scale ads."
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              className="w-full bg-brand-surface border border-brand-border-hairline text-brand-bone px-4 py-3 rounded-none font-inter text-xs transition-all duration-300 placeholder:text-brand-bone-secondary/30 focus:outline-none focus:ring-1 focus:ring-brand-ember focus:border-brand-ember resize-none min-h-[100px]"
                            />
                          </div>
                        </>
                      )}

                      {/* Intent Path: GUEST */}
                      {intent === "guest" && (
                        <>
                          {/* Why on Talks textarea */}
                          <div className="flex flex-col gap-2">
                            <label htmlFor="inquiry-guest-story" className="font-inter font-bold uppercase tracking-wider text-[10px] text-brand-bone-secondary flex justify-between items-center">
                              <span>Why should you be on The Unofficial Talks? <span className="text-brand-ember">*</span></span>
                              {errors.story && <span className="text-brand-ember-bright text-[9px] font-inter tracking-normal normal-case font-medium" aria-live="polite">{errors.story}</span>}
                            </label>
                            <textarea
                              id="inquiry-guest-story"
                              rows={3}
                              placeholder="What's the one story, lesson, or contrarian take only you can tell?"
                              value={formData.story}
                              onChange={(e) => {
                                setFormData({ ...formData, story: e.target.value });
                                if (errors.story) setErrors({ ...errors, story: "" });
                              }}
                              className={`w-full bg-brand-surface border text-brand-bone px-4 py-3 rounded-none font-inter text-xs transition-all duration-300 placeholder:text-brand-bone-secondary/30 focus:outline-none focus:ring-1 focus:ring-brand-ember focus:border-brand-ember resize-none min-h-[80px] ${
                                errors.story ? "border-brand-ember" : "border-brand-border-hairline"
                              }`}
                            />
                          </div>

                          {/* Guest Goals Chips */}
                          <div className="flex flex-col gap-2">
                            <label className="font-inter font-bold uppercase tracking-wider text-[10px] text-brand-bone-secondary">
                              What do you hope to get out of it?
                            </label>
                            <div className="flex flex-wrap gap-2 pt-1">
                              {GUEST_GOALS.map((option) => {
                                const isSelected = formData.guestGoal === option;
                                return (
                                  <button
                                    key={option}
                                    type="button"
                                    onClick={() => {
                                      setFormData({ ...formData, guestGoal: option });
                                    }}
                                    className={`py-2 px-3 border font-inter text-xs font-semibold cursor-pointer transition-all duration-300 min-h-[44px] flex items-center justify-center ${
                                      isSelected
                                        ? "bg-brand-ember border-brand-ember text-brand-ink font-bold"
                                        : "bg-brand-surface border-brand-border-hairline text-brand-bone-secondary hover:border-brand-ember/40 hover:text-brand-bone"
                                    }`}
                                  >
                                    {option}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Focus Topic */}
                          <div className="flex flex-col gap-2">
                            <label htmlFor="inquiry-guest-topic" className="font-inter font-bold uppercase tracking-wider text-[10px] text-brand-bone-secondary flex justify-between items-center">
                              <span>Topic you'd own <span className="text-brand-ember">*</span></span>
                              {errors.topic && <span className="text-brand-ember-bright text-[9px] font-inter tracking-normal normal-case font-medium" aria-live="polite">{errors.topic}</span>}
                            </label>
                            <input
                              id="inquiry-guest-topic"
                              type="text"
                              required
                              placeholder="e.g. Building a D2C brand from a tier-2 city"
                              value={formData.topic}
                              onChange={(e) => {
                                setFormData({ ...formData, topic: e.target.value });
                                if (errors.topic) setErrors({ ...errors, topic: "" });
                              }}
                              className={`w-full h-12 px-4 bg-brand-surface border text-brand-bone font-inter text-xs rounded-none placeholder-brand-bone-secondary/30 focus:outline-none focus:ring-1 focus:ring-brand-ember focus:border-brand-ember transition-all duration-300 ${
                                errors.topic ? "border-brand-ember" : "border-brand-border-hairline"
                              }`}
                            />
                          </div>
                        </>
                      )}

                      {/* Intent Path: SPONSOR */}
                      {intent === "sponsor" && (
                        <>
                          {/* Sponsor Goals Chips */}
                          <div className="flex flex-col gap-2">
                            <label className="font-inter font-bold uppercase tracking-wider text-[10px] text-brand-bone-secondary flex justify-between items-center">
                              <span>What's the goal of this sponsorship? <span className="text-brand-ember">*</span></span>
                              {errors.sponsorGoal && <span className="text-brand-ember-bright text-[9px] font-inter tracking-normal normal-case font-medium" aria-live="polite">{errors.sponsorGoal}</span>}
                            </label>
                            <div className="flex flex-wrap gap-2 pt-1">
                              {SPONSOR_GOALS.map((option) => {
                                const isSelected = formData.sponsorGoal === option;
                                return (
                                  <button
                                    key={option}
                                    type="button"
                                    onClick={() => {
                                      setFormData({ ...formData, sponsorGoal: option });
                                      if (errors.sponsorGoal) setErrors({ ...errors, sponsorGoal: "" });
                                    }}
                                    className={`py-2 px-3 border font-inter text-xs font-semibold cursor-pointer transition-all duration-300 min-h-[44px] flex items-center justify-center ${
                                      isSelected
                                        ? "bg-brand-ember border-brand-ember text-brand-ink font-bold"
                                        : "bg-brand-surface border-brand-border-hairline text-brand-bone-secondary hover:border-brand-ember/40 hover:text-brand-bone"
                                    }`}
                                  >
                                    {option}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Target audience */}
                          <div className="flex flex-col gap-2">
                            <label htmlFor="inquiry-sponsor-target" className="font-inter font-bold uppercase tracking-wider text-[10px] text-brand-bone-secondary flex justify-between items-center">
                              <span>Target audience you want to reach <span className="text-brand-ember">*</span></span>
                              {errors.targetAudience && <span className="text-brand-ember-bright text-[9px] font-inter tracking-normal normal-case font-medium" aria-live="polite">{errors.targetAudience}</span>}
                            </label>
                            <input
                              id="inquiry-sponsor-target"
                              type="text"
                              required
                              placeholder="e.g. 25–40 Hindi-speaking founders & SMB owners in tier-2 India"
                              value={formData.targetAudience}
                              onChange={(e) => {
                                setFormData({ ...formData, targetAudience: e.target.value });
                                if (errors.targetAudience) setErrors({ ...errors, targetAudience: "" });
                              }}
                              className={`w-full h-12 px-4 bg-brand-surface border text-brand-bone font-inter text-xs rounded-none placeholder-brand-bone-secondary/30 focus:outline-none focus:ring-1 focus:ring-brand-ember focus:border-brand-ember transition-all duration-300 ${
                                errors.targetAudience ? "border-brand-ember" : "border-brand-border-hairline"
                              }`}
                            />
                          </div>

                          {/* Sponsor Ideas textarea */}
                          <div className="flex flex-col gap-2">
                            <label htmlFor="inquiry-sponsor-ideas" className="font-inter font-bold uppercase tracking-wider text-[10px] text-brand-bone-secondary">
                              Anything specific you have in mind? (Optional)
                            </label>
                            <textarea
                              id="inquiry-sponsor-ideas"
                              rows={3}
                              placeholder="Describe any campaign ideas, shows, or specific requests..."
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              className="w-full bg-brand-surface border border-brand-border-hairline text-brand-bone px-4 py-3 rounded-none font-inter text-xs transition-all duration-300 placeholder:text-brand-bone-secondary/30 focus:outline-none focus:ring-1 focus:ring-brand-ember focus:border-brand-ember resize-none min-h-[80px]"
                            />
                          </div>
                        </>
                      )}
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
                      <MessageSquare size={12} className="text-brand-ember animate-pulse" />
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
                        className="flex-1 h-11 bg-brand-ember hover:bg-brand-ember-deep text-brand-ink font-inter font-bold text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
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
