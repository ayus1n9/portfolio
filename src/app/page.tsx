"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TerminalLab from "@/components/TerminalLab";
import Projects from "@/components/Projects";
import Arsenal from "@/components/Arsenal";
import SecurityNews from "@/components/SecurityNews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import GlitchCursor from "@/components/GlitchCursor";

export default function Home() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      if (!window.location.hash) {
        window.scrollTo(0, 0);
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-black text-amber-100 relative selection:bg-amber-400 selection:text-black">
      {/* Broken Computer Distorted Glitch Mouse Pointer */}
      <GlitchCursor />

      {/* Navigation */}
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* Hero Section */}
      <Hero />

      {/* Interactive Terminal Lab & Simulator */}
      <TerminalLab />

      {/* About Operator */}
      <About />

      {/* Featured Projects & Case Studies */}
      <Projects />

      {/* Security Arsenal & Skills Matrix */}
      <Arsenal />

      {/* Global Cybersecurity & Threat Wire */}
      <SecurityNews />

      {/* Contact & Transmission Channels */}
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Global Command Palette (Ctrl+K / ⌘K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </main>
  );
}
