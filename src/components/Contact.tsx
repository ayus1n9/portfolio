"use client";

import { useState } from "react";
import { Mail, FileText, Phone, Copy, Check, Send, ShieldCheck } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-24 border-t border-cyber-border/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="cartouche-badge mb-3">06 // TRANSMISSION CHANNEL</div>
          <h2 className="text-3xl sm:text-5xl font-bold font-editorial text-white tracking-tight">
            Initiate Contact & Collaboration
          </h2>
          <p className="mt-4 text-cyber-muted max-w-2xl text-sm sm:text-base leading-relaxed font-sans">
            Actively seeking Cybersecurity Internships, Junior Threat Hunter, Red Team, and SOC Analyst
            opportunities. Open to collaborating on open-source defensive and offensive tooling.
          </p>
        </div>

        {/* Contact Matrix Card */}
        <div className="max-w-4xl mx-auto bg-cyber-surface border border-cyber-border rounded-xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle decorative accent */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyber-green/5 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Column: Direct Communication Channels */}
            <div className="space-y-6 font-mono text-xs">
              <div className="flex items-center gap-2 text-cyber-green text-sm font-bold tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>OPERATIONAL COMMUNICATION ENDPOINTS</span>
              </div>

              {/* Email Endpoint */}
              <div className="p-4 rounded-lg bg-cyber-bg border border-cyber-border space-y-2">
                <div className="flex items-center justify-between text-cyber-dim">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyber-green" />
                    PRIMARY EMAIL
                  </span>
                  <button
                    onClick={() => copyToClipboard(PORTFOLIO_DATA.personal.email, "email")}
                    className="hover:text-cyber-green flex items-center gap-1 transition-colors"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3 h-3 text-cyber-green" />
                        <span className="text-cyber-green">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>
                <a
                  href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                  className="text-sm font-bold text-white hover:text-cyber-green block transition-colors"
                >
                  {PORTFOLIO_DATA.personal.email}
                </a>
              </div>

              {/* Phone Endpoint */}
              <div className="p-4 rounded-lg bg-cyber-bg border border-cyber-border space-y-2">
                <div className="flex items-center justify-between text-cyber-dim">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-cyber-cyan" />
                    TELEPHONE
                  </span>
                  <button
                    onClick={() => copyToClipboard(PORTFOLIO_DATA.personal.phone, "phone")}
                    className="hover:text-cyber-cyan flex items-center gap-1 transition-colors"
                  >
                    {copiedPhone ? (
                      <>
                        <Check className="w-3 h-3 text-cyber-cyan" />
                        <span className="text-cyber-cyan">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>
                <a
                  href={`tel:${PORTFOLIO_DATA.personal.phone}`}
                  className="text-sm font-bold text-white hover:text-cyber-cyan block transition-colors"
                >
                  {PORTFOLIO_DATA.personal.phone}
                </a>
              </div>
            </div>

            {/* Right Column: External Presence & Résumé */}
            <div className="space-y-4">
              <div className="text-xs font-mono text-cyber-dim uppercase tracking-wider mb-2">
                REPOSITORIES & PROFESSIONAL PROFILES
              </div>

              {/* GitHub Link */}
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg bg-cyber-raised border border-cyber-border hover:border-cyber-green/50 flex items-center justify-between font-mono text-xs transition-all group"
              >
                <div className="flex items-center gap-3">
                  <GithubIcon className="w-5 h-5 text-cyber-green group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="font-bold text-white group-hover:text-cyber-green transition-colors">
                      GitHub Profile
                    </div>
                    <div className="text-cyber-dim text-[11px]">github.com/ayus1n9</div>
                  </div>
                </div>
                <span className="text-cyber-dim group-hover:text-white transition-colors">↗</span>
              </a>

              {/* LinkedIn Link */}
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg bg-cyber-raised border border-cyber-border hover:border-cyber-cyan/50 flex items-center justify-between font-mono text-xs transition-all group"
              >
                <div className="flex items-center gap-3">
                  <LinkedinIcon className="w-5 h-5 text-cyber-cyan group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="font-bold text-white group-hover:text-cyber-cyan transition-colors">
                      LinkedIn Connection
                    </div>
                    <div className="text-cyber-dim text-[11px]">linkedin.com/in/ayus1n9</div>
                  </div>
                </div>
                <span className="text-cyber-dim group-hover:text-white transition-colors">↗</span>
              </a>

              {/* Download Résumé Button */}
              <a
                href={PORTFOLIO_DATA.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-lg bg-cyber-green text-cyber-bg font-mono font-bold text-xs tracking-wider hover:bg-cyber-green-bright transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyber-green/10"
              >
                <FileText className="w-4 h-4" />
                <span>DOWNLOAD OFFICIAL RÉSUMÉ (PDF)</span>
              </a>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-8 pt-6 border-t border-cyber-border/60 text-center font-mono text-xs text-cyber-dim">
            <span>PGP/SSH SIGNED SESSIONS • AUDIT READY • TIMEZONE: IST (UTC+05:30)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
