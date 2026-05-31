"use client";

import React from "react";
import { CreditCard, Shield, Sparkles, Check } from "lucide-react";

export default function PaymentGateway() {
  const paymentFeatures = [
    "Zero-fee Indian UPI integration",
    "Instant digital session invoices",
    "Secured bank-grade transactions",
    "Custom milestone escrow payments",
  ];

  return (
    <section
      id="payments"
      className="relative w-full py-24 md:py-32 bg-brand-surface overflow-hidden z-20 border-b border-brand-border-hairline"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-brand-ember-glow rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        
        {/* Coming Soon Badge */}
        <div className="inline-flex items-center gap-2 border border-brand-ember/30 bg-brand-ember/5 px-4 py-1.5 rounded-none mb-6">
          <Sparkles size={10} className="text-brand-ember animate-pulse" />
          <span className="font-inter font-bold text-[9px] uppercase tracking-widest text-brand-ember">
            Coming Soon — Studio Payments
          </span>
        </div>

        {/* Section Header */}
        <h2 className="font-fraunces font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-brand-bone mb-6">
          CINEMATIC BILLING GATEWAY
        </h2>
        <p className="max-w-2xl font-inter text-sm md:text-base text-brand-bone-secondary leading-relaxed mb-12">
          We are engineering an ultra-secured, high-end payments pipeline. Soon, you will be able to lock session slots, complete sponsor milestones, and commission cinematically raw cuts in one tap.
        </p>

        {/* Dashboard Mockup Layout */}
        <div className="w-full max-w-3xl border border-brand-border-hairline bg-brand-ink p-5 sm:p-8 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center text-left">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-ember-glow rounded-full blur-[40px] pointer-events-none" />

          {/* Left Block: Payment Vector Mockup */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <div className="bg-brand-surface border border-brand-border-hairline p-6 relative overflow-hidden flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <CreditCard size={28} className="text-brand-ember" />
                <span className="font-mono text-[7px] text-brand-bone-muted tracking-widest uppercase">
                  UNOFFICIAL SECURED
                </span>
              </div>
              <div>
                <span className="block font-mono text-[9px] text-brand-bone-muted tracking-wider uppercase mb-1">
                  Card Holder
                </span>
                <span className="block font-fraunces font-bold text-sm text-brand-bone uppercase">
                  HIMANSHU SONI
                </span>
              </div>
              <div className="flex justify-between items-end border-t border-brand-border-hairline pt-4">
                <div>
                  <span className="block font-mono text-[8px] text-brand-bone-muted">•••• •••• •••• 2080</span>
                  <span className="block font-mono text-[7px] text-brand-bone-muted mt-1">Exp 12/28</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-brand-ember/20 border border-brand-ember/40 flex items-center justify-center">
                  <Shield size={10} className="text-brand-ember" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: Feature Lists */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <h3 className="font-fraunces font-extrabold text-md uppercase tracking-wider text-brand-bone">
              UPCOMING PAYMENTS ARCHITECTURE
            </h3>
            
            <ul className="flex flex-col gap-3 font-inter text-xs text-brand-bone-secondary">
              {paymentFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-brand-ember/10 border border-brand-ember/20 flex items-center justify-center shrink-0">
                    <Check size={10} className="text-brand-ember" />
                  </div>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div className="bg-brand-surface border border-brand-border-hairline p-3 font-mono text-[9px] text-brand-bone-muted select-none">
              <span className="text-brand-ember block font-bold tracking-widest uppercase mb-1">// SECURED VIA STRIPE & UPI</span>
              Ready to deploy. Real sandbox credentials will be configured during Phase 3 launch.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
