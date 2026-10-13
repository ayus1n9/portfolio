"use client";

import { useState } from "react";
import { Flag, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function Arsenal() {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [activeView, setActiveView] = useState<"skills" | "ctf">("skills");

  return (
    <section id="arsenal" className="py-24 border-t border-cyber-border/40 relative overflow-hidden">
      {/* Cyber Green ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyber-green/5 blur-[160px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="cartouche-badge mb-3 select-none text-cyber-green">04 // SECURITY ARSENAL</div>
          <h2 className="text-3xl sm:text-5xl font-bold font-editorial text-white tracking-tight">
            Offensive & Defensive Tooling Matrix
          </h2>
        </div>

        {/* View Switcher Controls (Left = Skills Matrix, Right = CTF Platforms) */}
        <div className="flex items-center justify-between gap-4 mb-8 max-w-4xl mx-auto font-mono text-xs">
          <div className="flex items-center gap-2 select-none">
            <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
            <span className="text-cyber-green font-bold tracking-wider uppercase text-[11px] sm:text-xs">
              {activeView === "skills"
                ? "01 // DOMAIN SKILLS MATRIX"
                : "02 // CTF PLATFORMS & LAB WARGAMES"}
            </span>
          </div>

          {/* Left and Right Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView("skills")}
              aria-label="Show Domain Skills Matrix"
              title="Domain Skills Matrix"
              className={`w-8 h-8 rounded border flex items-center justify-center transition-all shadow-sm ${
                activeView === "skills"
                  ? "border-cyber-green text-cyber-green bg-cyber-surface shadow-md shadow-cyber-green/10"
                  : "border-cyber-border bg-cyber-surface/80 hover:border-cyber-green/50 text-cyber-muted hover:text-white cursor-pointer"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveView("ctf")}
              aria-label="Show CTF Platforms & Labs"
              title="CTF Platforms & Labs"
              className={`w-8 h-8 rounded border flex items-center justify-center transition-all shadow-sm ${
                activeView === "ctf"
                  ? "border-cyber-green text-cyber-green bg-cyber-surface shadow-md shadow-cyber-green/10"
                  : "border-cyber-border bg-cyber-surface/80 hover:border-cyber-green/50 text-cyber-muted hover:text-white cursor-pointer"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Left View (Default): Domain Skills Matrix */}
        {activeView === "skills" && (
          <div className="animate-fadeIn">
            {/* Category Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-10 max-w-4xl mx-auto">
              {PORTFOLIO_DATA.skills.map((cat, idx) => (
                <button
                  key={cat.code}
                  onClick={() => setActiveCategory(idx)}
                  className={`p-3 rounded font-mono text-xs text-left transition-all border flex flex-col justify-between ${
                    activeCategory === idx
                      ? "bg-cyber-surface border-cyber-green text-white shadow-md shadow-cyber-green/10"
                      : "bg-cyber-bg border-cyber-border text-cyber-muted hover:border-cyber-border-bright hover:bg-cyber-raised"
                  }`}
                >
                  <div className="text-[10px] text-cyber-dim font-bold">{cat.code}</div>
                  <div className={`font-bold mt-1 ${activeCategory === idx ? "text-cyber-green" : "text-cyber-text"}`}>
                    {cat.title}
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Category Skill Matrix */}
            <div className="bg-cyber-surface border border-cyber-border rounded-xl p-6 sm:p-8 shadow-xl max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-cyber-border/60 gap-2">
                <div>
                  <span className="text-xs font-mono text-cyber-dim tracking-wider uppercase">DOMAIN FOCUS:</span>
                  <h3 className="text-xl font-bold font-mono text-white mt-1">
                    {PORTFOLIO_DATA.skills[activeCategory].title}
                  </h3>
                </div>
                <p className="text-xs text-cyber-muted font-mono max-w-md">
                  {PORTFOLIO_DATA.skills[activeCategory].description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {PORTFOLIO_DATA.skills[activeCategory].skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="bg-cyber-bg/80 border border-cyber-border/70 hover:border-cyber-green/40 p-4 rounded-lg transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold font-mono text-cyber-text group-hover:text-cyber-green transition-colors">
                        {skill.name}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          skill.level === "Core Competency"
                            ? "bg-cyber-green/10 border-cyber-green/40 text-cyber-green"
                            : skill.level === "Practical Lab"
                            ? "bg-cyber-cyan/10 border-cyber-cyan/40 text-cyber-cyan"
                            : "bg-cyber-raised border-cyber-border text-cyber-dim"
                        }`}
                      >
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-xs text-cyber-muted font-sans leading-snug">
                      {skill.context}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Right View: CTF Platforms & Lab Wargames */}
        {activeView === "ctf" && (
          <div className="animate-fadeIn max-w-5xl mx-auto">
            <div className="bg-cyber-raised border border-cyber-border rounded-xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <Flag className="w-5 h-5 text-cyber-green" />
                <h3 className="text-lg font-bold font-mono text-white">
                  CTF Platforms, Wargames & Hands-On Security Labs
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {PORTFOLIO_DATA.ctfPlatforms.map((ctf, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded bg-cyber-bg border border-cyber-border font-mono text-xs space-y-1.5 hover:border-cyber-green/40 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-cyber-text font-bold text-sm">{ctf.platform}</span>
                      <span className="text-[10px] text-cyber-cyan px-2 py-0.5 rounded bg-cyber-surface border border-cyber-border">
                        {ctf.type}
                      </span>
                    </div>
                    <div className="text-cyber-muted text-[11px]">{ctf.scope}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-cyber-border/50 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-cyber-dim">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyber-green" />
                  <span>PRACTICAL EXPLOITATION & FORENSIC CHALLENGES VERIFIED</span>
                </div>
                <span>HACK THE BOX • TRYHACKME • PORTSWIGGER</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
