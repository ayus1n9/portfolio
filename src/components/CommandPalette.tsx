"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { Search, X, Terminal, FileText, Mail, Shield, BookOpen, Layers, Briefcase, ExternalLink, ArrowRight } from "lucide-react";
import { GithubIcon } from "./Icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  action: () => void;
  category: "NAVIGATION" | "ACTIONS" | "EXTERNAL";
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const navigateTo = (selector: string) => {
    onClose();
    const el = document.querySelector(selector);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    onClose();
    alert(`Email copied to clipboard: ${PORTFOLIO_DATA.personal.email}`);
  };

  const commands: CommandItem[] = [
    {
      id: "nav-about",
      title: "About Me",
      subtitle: "Read academic background and security philosophy",
      icon: Shield,
      category: "NAVIGATION",
      action: () => navigateTo("#about"),
    },
    {
      id: "nav-projects",
      title: "Featured Projects",
      subtitle: "Inspect NetTrace, ThreatLens, and toposec",
      icon: Layers,
      category: "NAVIGATION",
      action: () => navigateTo("#projects"),
    },
    {
      id: "nav-lab",
      title: "Interactive Terminal Lab",
      subtitle: "Execute simulated security tool routines",
      icon: Terminal,
      category: "NAVIGATION",
      action: () => navigateTo("#lab"),
    },
    {
      id: "nav-arsenal",
      title: "Security Arsenal",
      subtitle: "Review offensive, forensic, and programming capabilities",
      icon: BookOpen,
      category: "NAVIGATION",
      action: () => navigateTo("#arsenal"),
    },
    {
      id: "nav-experience",
      title: "Experience & Education",
      subtitle: "Review Vectr experience and VIT-AP coursework",
      icon: Briefcase,
      category: "NAVIGATION",
      action: () => navigateTo("#experience"),
    },
    {
      id: "nav-contact",
      title: "Contact & Transmission",
      subtitle: "Initiate contact with Ayush Singh",
      icon: Mail,
      category: "NAVIGATION",
      action: () => navigateTo("#contact"),
    },
    {
      id: "act-resume",
      title: "Download Official Résumé",
      subtitle: "Open PDF resume in a new tab",
      icon: FileText,
      category: "ACTIONS",
      action: () => {
        onClose();
        window.open(PORTFOLIO_DATA.personal.resumeUrl, "_blank");
      },
    },
    {
      id: "act-copy-email",
      title: "Copy Email Address",
      subtitle: PORTFOLIO_DATA.personal.email,
      icon: Mail,
      category: "ACTIONS",
      action: copyEmail,
    },
    {
      id: "ext-github",
      title: "Open GitHub Profile",
      subtitle: "Visit github.com/ayus1n9",
      icon: GithubIcon,
      category: "EXTERNAL",
      action: () => {
        onClose();
        window.open(PORTFOLIO_DATA.personal.github, "_blank");
      },
    },
    {
      id: "ext-nettrace",
      title: "Inspect NetTrace Repository",
      subtitle: "Network threat hunting and malware traffic hunt",
      icon: ExternalLink,
      category: "EXTERNAL",
      action: () => {
        onClose();
        window.open("https://github.com/ayus1n9/NetTrace", "_blank");
      },
    },
    {
      id: "ext-threatlens",
      title: "Inspect ThreatLens Repository",
      subtitle: "Automated OSINT & SOC alert enrichment",
      icon: ExternalLink,
      category: "EXTERNAL",
      action: () => {
        onClose();
        window.open("https://github.com/ayus1n9/ThreatLens", "_blank");
      },
    },
  ];

  const filtered = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleKeyDownInInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === "Enter" && filtered.length > 0) {
      e.preventDefault();
      filtered[selectedIndex]?.action();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-3 sm:px-4 bg-black/85 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#0c121e] border-2 border-white shadow-[12px_12px_0px_#000000] overflow-hidden font-mono flex flex-col max-h-[82vh]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
      >
        {/* 1. Retro Menu Bar (from Image 3) */}
        <div className="bg-[#c0c0c0] text-[#07090b] px-3 py-1 text-[11px] font-mono border-b border-black flex items-center gap-4 select-none shrink-0">
          <span><strong className="underline">F</strong>ile</span>
          <span><strong className="underline">C</strong>ommands</span>
          <span><strong className="underline">H</strong>elp</span>
          <span className="ml-auto text-[10px] text-gray-700 hidden sm:inline">RETRO_DISPATCH v3.1</span>
        </div>

        {/* 2. White Retro Title Bar (from Image 3) */}
        <div className="bg-white text-black px-3 py-1.5 border-b-2 border-black flex items-center justify-between select-none shrink-0">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="px-1.5 py-0.2 bg-black text-white text-[10px] font-bold">■</span>
            <span className="font-bold text-xs sm:text-sm tracking-wider uppercase truncate">
              COMMAND_PALETTE.EXE // QUICK_NAV
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-2 py-0.5 bg-[#c0c0c0] hover:bg-red-600 hover:text-white text-black text-xs font-bold border border-black shadow-[1.5px_1.5px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            aria-label="Close command palette"
          >
            ✕
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="p-3 sm:p-4 bg-black/80 border-b-2 border-black flex items-center gap-3">
          <Search className="w-5 h-5 text-cyber-green shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDownInInput}
            placeholder="Search commands, sections, or projects..."
            autoComplete="off"
            spellCheck={false}
            className="w-full bg-transparent border-0 border-none outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 shadow-none focus:shadow-none text-cyber-text placeholder:text-cyber-dim text-sm p-0"
            style={{ outline: "none", border: "none", boxShadow: "none" }}
          />
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-cyber-dim">
              No matching commands found for &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((item, index) => {
              const Icon = item.icon;
              const isSelected = selectedIndex === index;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left p-3 flex items-center justify-between text-xs transition-all ${
                    isSelected
                      ? "bg-black text-white border-2 border-cyber-green shadow-[2px_2px_0px_#000000]"
                      : "text-gray-300 hover:bg-black/50 border-2 border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 flex items-center justify-center border border-black ${
                        isSelected ? "bg-cyber-green text-black font-bold" : "bg-black text-cyber-green"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`font-bold ${isSelected ? "text-cyber-green" : "text-white"}`}>
                        {item.title}
                      </div>
                      <div className="text-[11px] text-cyber-dim">{item.subtitle}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-cyber-dim uppercase tracking-wider px-2 py-0.5 bg-black border border-cyber-border shadow-[1px_1px_0px_#000000]">
                      {item.category}
                    </span>
                    {isSelected && <ArrowRight className="w-3.5 h-3.5 text-cyber-green" />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Bottom Cyan Command/Status Line (from Image 3) */}
        <div className="bg-[#00aaaa] text-black px-3 py-1 font-mono text-[11px] font-bold flex items-center justify-between select-none shrink-0 border-t-2 border-black">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span className="hidden sm:inline">RETRO_NAV // AYUS1N9</span>
        </div>
      </div>
    </div>
  );
}
