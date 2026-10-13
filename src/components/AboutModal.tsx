"use client";

import { useEffect } from "react";
import { CheckCircle2, Shield, Calendar, Award } from "lucide-react";

export interface AboutCardData {
  identifier: string;
  icon: React.ComponentType<{ className?: string }>;
  period: string;
  title: string;
  subtitle: string;
  summary: string;
  highlights: string[];
  tags: string[];
}

interface AboutModalProps {
  card: AboutCardData | null;
  onClose: () => void;
}

export default function AboutModal({ card, onClose }: AboutModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (card) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [card, onClose]);

  if (!card) return null;

  const trackName = card.identifier.includes("//")
    ? card.identifier.split("//")[1].trim()
    : "DOSSIER";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      {/* Retro Window Dialog */}
      <div
        className="bg-[#0c121e] border-2 border-white text-white font-mono w-full max-w-3xl max-h-[92vh] overflow-hidden shadow-[12px_12px_0px_#000000] relative flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Retro Menu Bar (from Image 3) */}
        <div className="bg-[#c0c0c0] text-[#07090b] px-3 py-1 text-[11px] font-mono border-b border-black flex items-center gap-4 select-none shrink-0">
          <span><strong className="underline">F</strong>ile</span>
          <span><strong className="underline">E</strong>dit</span>
          <span><strong className="underline">V</strong>iew</span>
          <span><strong className="underline">U</strong>tilities</span>
          <span><strong className="underline">W</strong>indow</span>
          <span><strong className="underline">H</strong>elp</span>
          <span className="ml-auto text-[10px] text-gray-700 hidden sm:inline">RETRO_DOS v3.1</span>
        </div>

        {/* 2. White Retro Title Bar (from Image 3) */}
        <div className="bg-white text-black px-3 py-1.5 border-b-2 border-black flex items-center justify-between select-none shrink-0">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="px-1.5 py-0.2 bg-black text-white text-[10px] font-bold">■</span>
            <span className="font-bold text-xs sm:text-sm tracking-wider uppercase truncate">
              {card.identifier} // {card.title}
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            <button
              onClick={onClose}
              className="px-2 py-0.5 bg-[#c0c0c0] hover:bg-red-600 hover:text-white text-black text-xs font-bold border border-black shadow-[1.5px_1.5px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              aria-label="Close dialog"
            >
              ✕
            </button>
          </div>
        </div>

        {/* 3. Scrollable Window Body */}
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1">
          {/* Title & Subtitle banner */}
          <div className="bg-black/70 p-4 border-2 border-black shadow-[3px_3px_0px_#000000]">
            <h2 id="about-modal-title" className="text-xl sm:text-2xl font-bold font-editorial text-white uppercase tracking-tight mb-1">
              {card.title}
            </h2>
            <p className="text-xs sm:text-sm text-cyber-cyan font-mono">
              {card.subtitle}
            </p>
          </div>

          {/* Retro Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black text-cyber-green border border-cyber-border shadow-[2px_2px_0px_#000000]">
              <Calendar className="w-3.5 h-3.5" />
              <span>TIMELINE: {card.period}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black text-cyber-amber border border-cyber-border shadow-[2px_2px_0px_#000000]">
              <Award className="w-3.5 h-3.5" />
              <span>TRACK: {trackName}</span>
            </div>
          </div>

          {/* Executive Summary / Focus Area */}
          <div className="bg-black/80 p-4 sm:p-5 border-2 border-black shadow-[4px_4px_0px_#000000] space-y-2">
            <div className="flex items-center gap-2 text-cyber-green text-xs font-bold tracking-wider uppercase font-mono">
              <Shield className="w-4 h-4 text-cyber-green" />
              <span>OPERATIONAL FOCUS & OVERVIEW</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-200 font-sans leading-relaxed">
              {card.summary}
            </p>
          </div>

          {/* Key Accomplishments & Evidence */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white text-xs font-bold tracking-wider uppercase font-mono">
              <CheckCircle2 className="w-4 h-4 text-cyber-green" />
              <span>KEY HIGHLIGHTS & TECHNICAL ACHIEVEMENTS</span>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {card.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-black/70 border border-cyber-border shadow-[2px_2px_0px_#000000] flex items-start gap-2.5"
                >
                  <span className="text-cyber-green font-bold text-xs mt-0.5 select-none">▸</span>
                  <span className="text-gray-300 font-sans text-xs sm:text-sm leading-relaxed">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies & Domain Tags */}
          <div className="pt-3 border-t border-cyber-border/80 space-y-2">
            <div className="text-[11px] text-gray-400 uppercase tracking-wider font-mono">
              CORE DOMAINS & TECHNOLOGIES:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {card.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-black text-cyber-cyan text-xs border border-cyber-border shadow-[2px_2px_0px_#000000] font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Retro Buttons Bar (from Image 3) */}
        <div className="p-3 sm:p-4 bg-[#080d16] border-t-2 border-black flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            {/* Yellow Button: "Say no more" */}
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#ffff55] hover:bg-[#ffff77] text-black font-bold font-mono text-xs uppercase border-2 border-black shadow-[4px_4px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000000] transition-all"
            >
              Say no more
            </button>

            {/* White Button: "I'm good" */}
            <button
              onClick={onClose}
              className="px-5 py-2 bg-white hover:bg-gray-200 text-black font-bold font-mono text-xs uppercase border-2 border-black shadow-[4px_4px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000000] transition-all"
            >
              I&apos;m good
            </button>
          </div>

          <div className="text-[11px] font-mono text-cyber-dim hidden sm:inline">
            DOSSIER_STATUS: 200_OK
          </div>
        </div>

        {/* 5. Bottom Cyan Command/Status Line (from Image 3) */}
        <div className="bg-[#00aaaa] text-black px-3 py-1 font-mono text-[11px] font-bold flex items-center justify-between select-none shrink-0">
          <span>Ln1, Col1 • UTF-8</span>
          <span className="hidden sm:inline">Press ESC or click [✕] to return to workspace</span>
        </div>
      </div>
    </div>
  );
}
