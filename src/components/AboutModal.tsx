"use client";

import { useEffect } from "react";
import { X, CheckCircle2, Shield, Calendar, Award } from "lucide-react";

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

  const Icon = card.icon;
  const trackName = card.identifier.includes("//")
    ? card.identifier.split("//")[1].trim()
    : "DOSSIER";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      {/* Modal Dialog */}
      <div
        className="bg-cyber-surface border border-cyber-border rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col font-mono text-cyber-text"
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-10 px-6 py-4 bg-cyber-raised border-b border-cyber-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs text-cyber-green font-bold tracking-widest uppercase flex items-center gap-2">
              <Icon className="w-3.5 h-3.5" />
              {card.identifier}
            </span>
            <span className="text-cyber-dim text-xs">|</span>
            <span className="text-xs text-cyber-cyan">{trackName}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded text-cyber-muted hover:text-white hover:bg-cyber-surface transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-7">
          {/* Title & Subtitle */}
          <div>
            <h2 id="about-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white font-editorial mb-2">
              {card.title}
            </h2>
            <p className="text-sm sm:text-base text-cyber-cyan font-mono font-medium">
              {card.subtitle}
            </p>
          </div>

          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-cyber-bg border border-cyber-border text-xs text-cyber-green font-bold">
              <Calendar className="w-3.5 h-3.5" />
              <span>TIMELINE: {card.period}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-cyber-bg border border-cyber-border text-xs text-cyber-dim">
              <Award className="w-3.5 h-3.5 text-cyber-amber" />
              <span>CATEGORY: {trackName}</span>
            </div>
          </div>

          {/* Executive Summary / Focus Area */}
          <div className="bg-cyber-bg p-5 rounded-lg border border-cyber-border space-y-2">
            <div className="flex items-center gap-2 text-cyber-green text-xs font-bold tracking-wider uppercase">
              <Shield className="w-4 h-4 text-cyber-green" />
              <span>OPERATIONAL FOCUS & OVERVIEW</span>
            </div>
            <p className="text-xs sm:text-sm text-cyber-muted font-sans leading-relaxed">
              {card.summary}
            </p>
          </div>

          {/* Key Accomplishments & Evidence */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-cyber-text text-xs font-bold tracking-wider uppercase">
              <CheckCircle2 className="w-4 h-4 text-cyber-green" />
              <span>KEY HIGHLIGHTS & TECHNICAL ACHIEVEMENTS</span>
            </div>
            <ul className="grid grid-cols-1 gap-3 text-xs">
              {card.highlights.map((highlight, idx) => (
                <li
                  key={idx}
                  className="p-3.5 rounded bg-cyber-bg/70 border border-cyber-border/70 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyber-green shrink-0 mt-0.5" />
                  <span className="text-cyber-muted font-sans text-xs sm:text-sm leading-relaxed">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies & Domain Tags */}
          <div className="pt-4 border-t border-cyber-border space-y-2.5">
            <div className="text-xs text-cyber-dim uppercase tracking-wider">
              CORE DOMAINS & TECHNOLOGIES:
            </div>
            <div className="flex flex-wrap gap-2">
              {card.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded bg-cyber-raised text-cyber-cyan text-xs border border-cyber-border font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
