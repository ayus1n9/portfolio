"use client";

import { useState, useEffect } from "react";
import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

const VERSES = [
  "der anfang ist das ende. und das ende ist der anfang.",
  "अंतः अस्ति प्रारंभः",
  "the end is the beginning. and the beginning is the end.",
];

export default function Footer() {
  const [verseIndex, setVerseIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!isHovered) {
      setIsFading(false);
      setVerseIndex(0);
      return;
    }

    let isMounted = true;
    let timerId: NodeJS.Timeout;

    // Display durations for each verse while hovered:
    // German (initial hover): 300ms before starting translation
    // Hindi: 1800ms
    // English: 2200ms
    const displayDurations = [300, 1800, 2200];

    const triggerNext = (currentIdx: number) => {
      if (!isMounted) return;
      setIsFading(true);
      timerId = setTimeout(() => {
        if (!isMounted) return;
        const nextIdx = (currentIdx + 1) % VERSES.length;
        setVerseIndex(nextIdx);
        setIsFading(false);

        // When looping back to German, give it 1800ms to be read
        const nextDuration = nextIdx === 0 ? 1800 : displayDurations[nextIdx];

        timerId = setTimeout(() => {
          triggerNext(nextIdx);
        }, nextDuration);
      }, 200);
    };

    timerId = setTimeout(() => {
      triggerNext(0);
    }, displayDurations[0]);

    return () => {
      isMounted = false;
      clearTimeout(timerId);
    };
  }, [isHovered]);

  return (
    <footer className="border-t border-cyber-border/60 bg-cyber-bg py-12 relative z-10 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-cyber-border/40">
          {/* Identity */}
          <div className="flex items-center gap-3">
            <div>
              <div className="font-bold text-white tracking-widest text-sm">
                ayush singh
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
              className="hover:text-cyber-red transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" />
              <span>EMAIL</span>
            </a>
          </div>
        </div>

        {/* Bottom Credits, ASCII Sculpture & Interactive Motto */}
        <div className="pt-8 relative flex flex-col lg:flex-row items-center lg:items-end justify-between gap-6 text-cyber-dim text-[11px] min-h-[120px] lg:min-h-[440px]">
          {/* Left: Copyright */}
          <div className="order-2 lg:order-1 text-center lg:text-left whitespace-nowrap lg:pb-3 select-none relative z-10 flex-1">
            © {new Date().getFullYear()} Ayush Singh. All rights reserved.
          </div>

          {/* Center: ASCII Sculpture - Absolutely centered on desktop to guarantee zero layout shifts */}
          <div className="order-1 lg:order-2 lg:absolute lg:left-1/2 lg:bottom-0 lg:-translate-x-1/2 flex items-center justify-center select-none pointer-events-none z-0">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] flex items-center justify-center">
              <img
                src="/ascii-fate.gif"
                alt="Cyber ASCII Sculpture"
                className="w-full h-full object-contain mix-blend-screen pointer-events-none select-none"
                draggable={false}
              />
            </div>
          </div>

          {/* Right: Interactive Multilingual Motto / Return to Top Button */}
          <div className="order-3 lg:order-3 relative z-10 flex-1 flex justify-center lg:justify-end lg:pb-3">
            <button
              type="button"
              onClick={scrollToTop}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onTouchStart={() => setIsHovered(true)}
              onTouchEnd={() => setTimeout(() => setIsHovered(false), 3000)}
              onFocus={() => setIsHovered(true)}
              onBlur={() => setIsHovered(false)}
              className="group cursor-pointer focus:outline-none transition-all duration-300 min-h-[2.5rem] w-full sm:w-auto min-w-[280px] sm:min-w-[380px] lg:min-w-[430px] flex items-center justify-center lg:justify-end px-3 py-1.5 rounded-lg hover:bg-cyber-surface/40 select-none"
              title="Click to return to top"
              aria-label="Return to top"
            >
              <span
                className={`inline-flex items-center gap-2 font-mono tracking-widest transition-all duration-300 pointer-events-none ${
                  isHovered
                    ? "footer-motto-active"
                    : "text-cyber-red/80 hover:text-cyber-red"
                } ${
                  isFading
                    ? "opacity-0 blur-[2px] transform translate-y-0.5"
                    : "opacity-100 blur-0 transform translate-y-0"
                }`}
              >
                <span>{VERSES[verseIndex]}</span>
                <ArrowUp
                  className={`w-3.5 h-3.5 transition-all duration-300 flex-shrink-0 ${
                    isHovered
                      ? "opacity-100 text-cyber-green -translate-y-0.5"
                      : "opacity-0 text-cyber-red/40 translate-y-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
