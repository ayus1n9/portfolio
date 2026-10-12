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
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-cyber-surface border border-cyber-border rounded-xl shadow-2xl overflow-hidden font-mono flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
      >
        {/* Search Input Bar */}
        <div className="p-4 bg-cyber-raised border-b border-cyber-border flex items-center gap-3">
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
            className="w-full bg-transparent border-none outline-none text-cyber-text placeholder:text-cyber-dim text-sm focus:ring-0 p-0"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-cyber-dim hover:text-white"
            aria-label="Close command palette"
          >
            <X className="w-4 h-4" />
          </button>
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
                  className={`w-full text-left p-3 rounded-lg flex items-center justify-between text-xs transition-all ${
                    isSelected
                      ? "bg-cyber-raised border border-cyber-green/50 text-white"
                      : "text-cyber-muted hover:bg-cyber-bg border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded flex items-center justify-center ${
                        isSelected ? "bg-cyber-green/10 text-cyber-green" : "bg-cyber-bg text-cyber-dim"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`font-bold ${isSelected ? "text-cyber-green" : "text-cyber-text"}`}>
                        {item.title}
                      </div>
                      <div className="text-[11px] text-cyber-dim">{item.subtitle}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-cyber-dim uppercase tracking-wider px-2 py-0.5 rounded bg-cyber-bg border border-cyber-border">
                      {item.category}
                    </span>
                    {isSelected && <ArrowRight className="w-3.5 h-3.5 text-cyber-green" />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-cyber-bg border-t border-cyber-border text-[11px] text-cyber-dim flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span className="text-cyber-green">AYUS1N9 COMMAND DISPATCHER</span>
        </div>
      </div>
    </div>
  );
}
