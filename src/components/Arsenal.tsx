"use client";

import { useState } from "react";
import { Flag, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function Arsenal() {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  return (
    <section id="arsenal" className="py-24 border-t border-cyber-border/40 relative overflow-hidden">
      {/* Cobalt Airgap ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-sky-500/5 blur-[160px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="cartouche-badge mb-3 select-none text-sky-400">04 // SECURITY ARSENAL</div>
          <h2 className="text-3xl sm:text-5xl font-bold font-editorial text-white tracking-tight">
            Offensive & Defensive Tooling Matrix
          </h2>
        </div>

        {/* Category Tabs - Cobalt Tactical HUD Theme */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-10 max-w-4xl mx-auto">
          {PORTFOLIO_DATA.skills.map((cat, idx) => (
            <button
              key={cat.code}
              onClick={() => setActiveCategory(idx)}
              className={`p-3 rounded font-mono text-xs text-left transition-all border flex flex-col justify-between ${
                activeCategory === idx
                  ? "bg-[#0c182c] border-sky-400/80 text-white shadow-md shadow-sky-500/20"
                  : "bg-[#070d18] border-sky-950/70 text-slate-400 hover:border-sky-800 hover:bg-[#0c1424]"
              }`}
            >
              <div className="text-[10px] text-sky-500/70 font-bold">{cat.code}</div>
              <div className={`font-bold mt-1 ${activeCategory === idx ? "text-sky-300" : "text-slate-200"}`}>
                {cat.title}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Category Skill Matrix */}
        <div className="bg-[#060e1b]/90 border border-sky-950/80 rounded-xl p-6 sm:p-8 mb-16 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-sky-900/40 gap-2">
            <div>
              <span className="text-xs font-mono text-sky-400/70 tracking-wider uppercase">DOMAIN FOCUS:</span>
              <h3 className="text-xl font-bold font-mono text-white mt-1">
                {PORTFOLIO_DATA.skills[activeCategory].title}
              </h3>
            </div>
            <p className="text-xs text-slate-300 font-mono max-w-md">
              {PORTFOLIO_DATA.skills[activeCategory].description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTFOLIO_DATA.skills[activeCategory].skills.map((skill, sIdx) => (
              <div
                key={sIdx}
                className="bg-[#071324]/80 border border-sky-950/70 hover:border-sky-400/50 p-4 rounded-lg transition-all group hover:bg-[#0b1c36]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold font-mono text-slate-100 group-hover:text-sky-300 transition-colors">
                    {skill.name}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      skill.level === "Core Competency"
                        ? "bg-sky-500/15 border-sky-400/40 text-sky-300"
                        : skill.level === "Practical Lab"
                        ? "bg-cyan-500/15 border-cyan-400/40 text-cyan-300"
                        : "bg-slate-900/80 border-slate-750 text-slate-400"
                    }`}
                  >
                    {skill.level}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-sans leading-snug">
                  {skill.context}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTFs & Lab Platforms Section */}
        <div className="bg-[#050c17] border border-sky-950/80 rounded-xl p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <Flag className="w-5 h-5 text-sky-400" />
            <h3 className="text-lg font-bold font-mono text-white">
              CTF Platforms, Wargames & Hands-On Security Labs
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTFOLIO_DATA.ctfPlatforms.map((ctf, idx) => (
              <div
                key={idx}
                className="p-4 rounded bg-[#071324] border border-sky-950/70 font-mono text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-slate-100 font-bold text-sm">{ctf.platform}</span>
                  <span className="text-[10px] text-cyan-300 px-2 py-0.5 rounded bg-[#050e1c] border border-sky-900/60">
                    {ctf.type}
                  </span>
                </div>
                <div className="text-slate-400 text-[11px]">{ctf.scope}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-sky-950/60 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
              <span>PRACTICAL EXPLOITATION & FORENSIC CHALLENGES VERIFIED</span>
            </div>
            <span className="text-sky-300/80">HACK THE BOX • TRYHACKME • PORTSWIGGER</span>
          </div>
        </div>
      </div>
    </section>
  );
}
