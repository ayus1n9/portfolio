"use client";

import { useState, useEffect } from "react";

interface NavbarProps {
  onOpenCommandPalette?: () => void;
}

export default function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Arsenal", href: "#arsenal" },
    { label: "Media", href: "#news" },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        {/* Centered Nav Links */}
        <nav className="flex items-center gap-6 sm:gap-8 justify-center" aria-label="Main Navigation">
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
      </div>
    </header>
  );
}
