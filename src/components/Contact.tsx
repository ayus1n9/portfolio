"use client";

import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function Contact() {
  const contactLinks = [
    {
      name: "GitHub",
      href: PORTFOLIO_DATA.personal.github,
      icon: GithubIcon,
      target: "_blank",
      rel: "noopener noreferrer",
      handle: "github.com/ayus1n9",
      accent: "hover:border-cyber-green/70 hover:shadow-[0_0_30px_rgba(0,255,102,0.25)] text-cyber-green",
      borderColor: "border-cyber-border",
    },
    {
      name: "Email",
      href: `mailto:${PORTFOLIO_DATA.personal.email}`,
      icon: Mail,
      target: undefined,
      rel: undefined,
      handle: PORTFOLIO_DATA.personal.email,
      accent: "hover:border-cyber-green/70 hover:shadow-[0_0_30px_rgba(0,255,102,0.25)] text-cyber-green",
      borderColor: "border-cyber-border",
    },
    {
      name: "LinkedIn",
      href: PORTFOLIO_DATA.personal.linkedin,
      icon: LinkedinIcon,
      target: "_blank",
      rel: "noopener noreferrer",
      handle: "linkedin.com/in/ayus1n9",
      accent: "hover:border-cyber-cyan/70 hover:shadow-[0_0_30px_rgba(0,229,255,0.25)] text-cyber-cyan",
      borderColor: "border-cyber-border",
    },
  ];

  return (
    <section id="contact" className="py-24 border-t border-cyber-border/40 relative overflow-hidden">
      {/* Phosphor Signal ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyber-green/5 blur-[160px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="cartouche-badge mb-3 select-none text-cyber-green">06 // TRANSMISSION CHANNEL</div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-editorial text-[#07090b] bg-cyber-green px-4 sm:px-6 py-1.5 sm:py-2.5 tracking-tight inline-block uppercase select-none shadow-[4px_4px_0px_#000000]">
            Initiate Contact & Collaboration
          </h2>
        </div>

        {/* Contact Matrix - Three Large Icons Only */}
        <div className="max-w-3xl mx-auto bg-cyber-surface/90 border border-cyber-border rounded-xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle decorative accent */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyber-green/5 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {contactLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.target}
                  rel={item.rel}
                  aria-label={item.name}
                  className={`group relative bg-cyber-raised/60 border ${item.borderColor} ${item.accent} rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 transform hover:-translate-y-1.5`}
                >
                  <div className="p-4 rounded-xl bg-black/40 border border-cyber-border/60 group-hover:border-cyber-green/40 transition-colors mb-4 flex items-center justify-center">
                    <Icon className="w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <span className="font-mono text-sm font-bold tracking-widest text-white group-hover:text-cyber-green transition-colors uppercase">
                    {item.name}
                  </span>
                  <span className="font-mono text-[10px] text-cyber-dim group-hover:text-cyber-muted transition-colors mt-1 truncate max-w-[180px]">
                    {item.handle}
                  </span>
                  <span className="absolute top-3 right-3 text-cyber-dim group-hover:text-white transition-colors text-xs font-mono">
                    ↗
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
