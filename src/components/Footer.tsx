"use client";

import { ArrowUp, ShieldCheck, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-cyber-border/60 bg-cyber-bg py-12 relative z-10 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-cyber-border/40">
          {/* Identity */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-cyber-surface border border-cyber-border flex items-center justify-center text-cyber-green">
              <ShieldCheck className="w-4 h-4 text-cyber-green" />
            </div>
            <div>
              <div className="font-bold text-white tracking-widest text-sm">
                AYUSH SINGH // AYUS1N9
              </div>
              <div className="text-[11px] text-cyber-dim">
                CYBERSECURITY RESEARCH & TOOLMAKING
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6 text-cyber-muted">
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyber-green transition-colors flex items-center gap-1.5"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GITHUB</span>
            </a>
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyber-cyan transition-colors flex items-center gap-1.5"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LINKEDIN</span>
            </a>
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="hover:text-cyber-green transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" />
              <span>EMAIL</span>
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-cyber-surface border border-cyber-border hover:border-cyber-green text-cyber-dim hover:text-cyber-green transition-all"
            aria-label="Back to top of page"
          >
            <span>RETURN TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Credits & Motto */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-cyber-dim text-[11px]">
          <div>
            © {new Date().getFullYear()} Ayush Singh. All rights reserved. B.Tech Cybersecurity, VIT-AP University.
          </div>
          <div className="tracking-widest text-cyber-green/80">
            NON EST AD ASTRA MOLLIS E TERRIS VIA
          </div>
        </div>
      </div>
    </footer>
  );
}
