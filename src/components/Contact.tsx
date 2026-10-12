"use client";

import { FileText, ShieldCheck } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-cyber-border/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="cartouche-badge mb-3 select-none">06 // TRANSMISSION CHANNEL</div>
          <h2 className="text-3xl sm:text-5xl font-bold font-editorial text-white tracking-tight">
            Initiate Contact & Collaboration
          </h2>
        </div>

        {/* Contact Matrix Card */}
        <div className="max-w-4xl mx-auto bg-cyber-surface border border-cyber-border rounded-xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle decorative accent */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyber-green/5 blur-3xl pointer-events-none" />

          <div className="items-center">
            {/* Direct Communication Channels */}
            <div className="space-y-6 font-mono text-xs">
              <div className="flex items-center pb-5 gap-2 text-cyber-green text-sm font-bold tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>OPERATIONAL COMMUNICATION ENDPOINTS</span>
              </div>
            </div>

            {/* External Presence & Résumé */}
            <div className="space-y-4">
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
