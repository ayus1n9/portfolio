"use client";

import { useState, useEffect } from "react";
import { Terminal, FileText, Menu, X, Command, ShieldCheck } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export default function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Security Lab", href: "#lab" },
    { label: "Arsenal", href: "#arsenal" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cyber-bg/90 backdrop-blur-md border-b border-cyber-border/80 shadow-lg shadow-black/40 py-3"
          : "bg-transparent border-b border-cyber-border/30 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Identity */}
        <a
          href="#"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-1 focus-visible:ring-cyber-green rounded"
          aria-label="Ayush Singh Home"
        >
          <div className="w-8 h-8 rounded bg-cyber-surface border border-cyber-border flex items-center justify-center text-cyber-green group-hover:border-cyber-green/50 transition-colors">
            <ShieldCheck className="w-4 h-4 text-cyber-green" />
          </div>
          <div>
            <div className="font-mono text-sm sm:text-base font-bold tracking-wider text-cyber-text group-hover:text-cyber-green transition-colors flex items-center gap-2">
              <span>AYUS1N9</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
            </div>
            <div className="text-[10px] font-mono text-cyber-dim tracking-tight hidden sm:block">
              SEC_RESEARCH // VIT-AP
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs uppercase font-mono tracking-wider text-cyber-muted hover:text-cyber-green transition-colors py-1 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-green transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-cyber-surface border border-cyber-border hover:border-cyber-green/40 text-cyber-muted hover:text-cyber-green text-xs font-mono transition-all"
            title="Open Command Palette (Ctrl+K or ⌘K)"
            aria-label="Open Command Palette"
          >
            <Command className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ctrl+K</span>
          </button>

          {/* Résumé CTA */}
          <a
            href={PORTFOLIO_DATA.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-cyber-green/10 border border-cyber-green/40 hover:bg-cyber-green/20 text-cyber-green text-xs font-mono font-semibold tracking-wider transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>RÉSUMÉ</span>
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded md:hidden text-cyber-muted hover:text-cyber-text bg-cyber-surface border border-cyber-border"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-cyber-green" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cyber-bg/95 border-b border-cyber-border px-4 py-4 backdrop-blur-lg">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono uppercase tracking-wider text-cyber-muted hover:text-cyber-green py-2 border-b border-cyber-border/30 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-cyber-dim text-xs">→</span>
              </a>
            ))}
            <div className="pt-2 flex justify-between items-center text-xs font-mono text-cyber-dim">
              <span>STATUS: READY</span>
              <span>VIT-AP 2023-2027</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
