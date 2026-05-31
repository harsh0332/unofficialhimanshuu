"use client";

import React from "react";
import { MessageSquare, Sparkles, MessageCircle, Send } from "lucide-react";
import Button from "../ui/Button";

export default function WhatsAppAutomation() {
  const whatsappUrl =
    process.env.NEXT_PUBLIC_WHATSAPP_URL ||
    "https://wa.me/918827736537?text=Hi%20The%20Unofficial%20Studios,%20I'd%20like%20to%20collaborate!";

  return (
    <section
      id="whatsapp-automation"
      className="relative w-full py-24 md:py-32 bg-brand-ink overflow-hidden z-20 border-b border-brand-border-hairline"
    >
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-brand-ember-glow rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Tech Feature Highlight */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 border border-brand-ember/30 bg-brand-ember/5 px-4 py-1.5 rounded-none w-fit">
              <Sparkles size={10} className="text-brand-ember animate-pulse" />
              <span className="font-inter font-bold text-[9px] uppercase tracking-widest text-brand-ember">
                Creator-to-Brand Hotline
              </span>
            </div>

            <h2 className="font-fraunces font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-brand-bone leading-tight">
              CONNECT INSTANTLY: <br />
              DIRECT WHATSAPP PIPELINE
            </h2>
            
            <p className="font-inter text-sm md:text-base text-brand-bone-secondary leading-relaxed">
              In a fast-moving digital ecosystem, coordination shouldn't be a bottleneck. By launching a direct 1-on-1 pipeline, we bypass the noise of email queues. Whether you are a brand manager requesting an immediate rate card, a potential sponsor exploring audience analytics, or a creator looking to lock down a recording slot, our direct route gets you answers in real-time. We are actively bridging the gap between raw ideation and high-production execution.
            </p>

            <div className="bg-brand-surface border border-brand-border-hairline p-5 font-mono text-[10px] text-brand-bone-secondary flex flex-col gap-2">
              <span className="text-brand-ember font-bold uppercase tracking-wider">// Real-Time Creator Workflows</span>
              <div className="flex flex-col gap-1.5 text-brand-bone-muted mt-2">
                <span>• Instant Response: Connect directly with Himanshu Soni's technical management team.</span>
                <span>• Zero Friction: Skip the endless coordination loops and get direct booking approvals.</span>
                <span>• Dynamic Delivery: Receive custom production catalog items directly on your phone.</span>
              </div>
            </div>

            <div className="mt-4">
              <Button href={whatsappUrl} variant="primary">
                <MessageCircle size={14} className="mr-2 fill-current shrink-0" />
                Chat With Us Now
              </Button>
            </div>
          </div>

          {/* Right Column: Dynamic Chat Flow Mockup */}
          <div className="lg:col-span-6 w-full max-w-md mx-auto border border-brand-border-hairline bg-brand-surface p-4 sm:p-6 relative overflow-hidden text-left flex flex-col gap-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-ember-glow rounded-full blur-[40px] pointer-events-none" />

            <div className="flex items-center justify-between border-b border-brand-border-hairline pb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-ember/15 border border-brand-ember/35 flex items-center justify-center text-brand-ember font-fraunces font-bold text-sm">
                  U
                </div>
                <div>
                  <span className="block font-fraunces font-extrabold text-xs text-brand-bone uppercase leading-none">
                    UNOFFICIAL ASSISTANT
                  </span>
                  <span className="block font-inter text-[7px] text-brand-ember uppercase tracking-widest mt-1">
                    System Automated
                  </span>
                </div>
              </div>
              <span className="font-mono text-[7px] text-brand-bone-muted">ONLINE</span>
            </div>

            {/* Simulated Chat Dialogue */}
            <div className="flex flex-col gap-4 font-inter text-[11px] max-h-[220px] overflow-y-auto pr-2">
              {/* Brand bubble */}
              <div className="self-end bg-brand-ember text-brand-ink px-4 py-2.5 max-w-[80%] rounded-none">
                <span className="block font-bold mb-0.5">Brand / OPPO India:</span>
                Hi Unofficial! I want to view Himanshu's latest sponsor reels.
              </div>

              {/* System response */}
              <div className="self-start bg-brand-card border border-brand-border-hairline text-brand-bone-secondary px-4 py-2.5 max-w-[80%] rounded-none flex flex-col gap-1.5">
                <span className="block font-bold text-brand-ember">Unofficial Studios:</span>
                <span>Connecting verified catalog... Here is our latest Hasselblad / OPPO showcase still:</span>
                <span className="text-[10px] text-brand-bone font-bold block underline">catalog_optics_showcase.mov</span>
              </div>

              {/* System typing */}
              <div className="self-start bg-brand-card border border-brand-border-hairline text-brand-bone-muted px-4 py-2.5 rounded-none animate-pulse">
                Assistant is checking next podcast set availability...
              </div>
            </div>

            {/* Mock Chat input */}
            <div className="border-t border-brand-border-hairline pt-4 flex gap-3">
              <div className="flex-1 bg-brand-ink border border-brand-border-hairline text-brand-bone-muted px-3 py-2 text-[10px] flex items-center justify-between">
                <span>Coming Soon: Automating feeds in chat...</span>
                <Send size={12} className="text-brand-bone-muted/40" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
