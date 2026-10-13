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
      hoverIconColor: "group-hover:text-white group-hover:drop-shadow-[0_0_24px_rgba(255,255,255,0.95)]",
      glowBg: "bg-white/25",
      glowHalo: "bg-white/10",
    },
    {
      name: "Email",
      href: `mailto:${PORTFOLIO_DATA.personal.email}`,
      icon: Mail,
      target: undefined,
      rel: undefined,
      hoverIconColor: "group-hover:text-[#ff4444] group-hover:drop-shadow-[0_0_24px_rgba(255,68,68,0.95)]",
      glowBg: "bg-red-500/25",
      glowHalo: "bg-red-500/10",
    },
    {
      name: "LinkedIn",
      href: PORTFOLIO_DATA.personal.linkedin,
      icon: LinkedinIcon,
      target: "_blank",
      rel: "noopener noreferrer",
      hoverIconColor: "group-hover:text-[#0a66c2] group-hover:drop-shadow-[0_0_24px_rgba(10,102,194,0.95)]",
      glowBg: "bg-[#0a66c2]/30",
      glowHalo: "bg-[#0a66c2]/15",
    },
  ];

  return (
    <section id="contact" className="py-24 border-t border-cyber-border/40 relative overflow-hidden">
      {/* Phosphor Signal ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] h-[350px] bg-cyber-green/5 blur-[160px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="cartouche-badge mb-3 select-none text-cyber-green">06 // TRANSMISSION CHANNEL</div>
          <h2 className="text-xl sm:text-4xl md:text-5xl font-bold font-editorial text-[#07090b] bg-cyber-green px-3 sm:px-6 py-1.5 sm:py-2.5 tracking-tight inline-block uppercase select-none shadow-[4px_4px_0px_#000000] max-w-full text-center">
            Initiate Contact & Collaboration
          </h2>
        </div>

        {/* Contact Icons Only - No Boxes, Glowing Background on Hover */}
        <div className="flex items-center justify-center gap-6 sm:gap-16 md:gap-20 py-8">
          {contactLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                target={item.target}
                rel={item.rel}
                aria-label={item.name}
                className="group relative p-4 sm:p-5 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-115 focus:outline-none"
              >
                {/* Radial Blurred Ambient Glow on Hover */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-0 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${item.glowBg}`}
                />
                {/* Soft Core Backing Glow on Hover */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${item.glowHalo}`}
                />
                {/* Icon */}
                <Icon
                  className={`w-14 h-14 sm:w-16 sm:h-16 text-white/70 ${item.hoverIconColor} relative z-10 transition-all duration-300`}
                />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
