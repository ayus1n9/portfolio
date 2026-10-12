"use client";

import { useState } from "react";
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

  return (
    <main className="min-h-screen bg-cyber-bg text-cyber-text relative selection:bg-cyber-green selection:text-cyber-bg">
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
