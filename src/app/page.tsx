"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TerminalLab from "@/components/TerminalLab";
import Projects from "@/components/Projects";
import Arsenal from "@/components/Arsenal";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";

export default function Home() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <main className="min-h-screen bg-cyber-bg text-cyber-text relative selection:bg-cyber-green selection:text-cyber-bg">
      {/* Navigation */}
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* Hero Section */}
      <Hero />

      {/* About Operator */}
      <About />

      {/* Interactive Terminal Lab & Simulator */}
      <TerminalLab />

      {/* Featured Projects & Case Studies */}
      <Projects />

      {/* Security Arsenal & Skills Matrix */}
      <Arsenal />

      {/* Experience, Education & Certifications */}
      <Experience />

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
