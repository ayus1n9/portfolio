"use client";

import { useEffect } from "react";
import { ExternalLink, Terminal, Shield, CheckCircle2, AlertTriangle, Layers } from "lucide-react";
import { Project } from "@/data/portfolioData";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      {/* Retro Window Dialog */}
      <div
        className="bg-[#0c121e] border-2 border-white text-white font-mono w-full max-w-4xl max-h-[92vh] overflow-hidden shadow-[12px_12px_0px_#000000] relative flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
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
              {project.identifier} // {project.title}
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            <button
              onClick={onClose}
              className="px-2 py-0.5 bg-[#c0c0c0] hover:bg-red-600 hover:text-white text-black text-xs font-bold border border-black shadow-[1.5px_1.5px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              aria-label="Close project modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* 3. Scrollable Window Body */}
        <div className="p-4 sm:p-6 sm:p-8 space-y-7 overflow-y-auto flex-1 font-mono">
          {/* Title & Subtitle banner */}
          <div className="bg-black/70 p-4 border-2 border-black shadow-[3px_3px_0px_#000000]">
            <h2 id="modal-title" className="text-xl sm:text-2xl font-bold font-editorial text-white uppercase tracking-tight mb-1">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-cyber-cyan font-mono">
              {project.subtitle}
            </p>
          </div>

          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <div className="px-3 py-1.5 bg-black text-cyber-green border border-cyber-border shadow-[2px_2px_0px_#000000]">
              STATUS: {project.status}
            </div>
            <div className="px-3 py-1.5 bg-black text-cyber-dim border border-cyber-border shadow-[2px_2px_0px_#000000]">
              CATEGORY: {project.category}
            </div>
          </div>

          {/* Operational Problem Statement */}
          <div className="bg-black/80 p-4 sm:p-5 border-2 border-black shadow-[4px_4px_0px_#000000] space-y-2">
            <div className="flex items-center gap-2 text-cyber-amber text-xs font-bold tracking-wider uppercase">
              <AlertTriangle className="w-4 h-4" />
              <span>THE OPERATIONAL PROBLEM</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-200 font-sans leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Architecture Pipeline */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-cyber-green text-xs font-bold tracking-wider uppercase">
              <Layers className="w-4 h-4" />
              <span>SYSTEM ARCHITECTURE & PIPELINE FLOW</span>
            </div>

            {/* Visual SVG / Flow Diagram */}
            <div className="p-4 bg-black/90 border-2 border-black shadow-[4px_4px_0px_#000000] overflow-x-auto">
              {project.id === "nettrace" ? (
                <div className="min-w-[620px] py-2">
                  <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-mono">
                    <div className="p-3 bg-cyber-raised border border-cyber-border shadow-[2px_2px_0px_#000000]">
                      <div className="text-cyber-green font-bold">1. INTAKE</div>
                      <div className="text-cyber-dim mt-1">SHA-256 & Header Magic</div>
                    </div>
                    <div className="p-3 bg-cyber-raised border border-cyber-border shadow-[2px_2px_0px_#000000]">
                      <div className="text-cyber-cyan font-bold">2. DISSECT</div>
                      <div className="text-cyber-dim mt-1">L4 Tuples, DNS & TLS</div>
                    </div>
                    <div className="p-3 bg-cyber-raised border border-cyber-border shadow-[2px_2px_0px_#000000]">
                      <div className="text-cyber-green font-bold">3. SURICATA</div>
                      <div className="text-cyber-dim mt-1">Rule & Beacon Detection</div>
                    </div>
                    <div className="p-3 bg-cyber-raised border border-cyber-border shadow-[2px_2px_0px_#000000]">
                      <div className="text-cyber-cyan font-bold">4. DEFANG</div>
                      <div className="text-cyber-dim mt-1">Defanging (1.1.1[.]1)</div>
                    </div>
                    <div className="p-3 bg-cyber-raised border border-cyber-green/50 shadow-[2px_2px_0px_#000000]">
                      <div className="text-white font-bold">5. ATT&CK</div>
                      <div className="text-cyber-green mt-1">Incident Report</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-6 mt-2 text-cyber-green/60 text-xs">
                    <span>─────►</span>
                    <span>─────►</span>
                    <span>─────►</span>
                    <span>─────►</span>
                  </div>
                </div>
              ) : project.id === "threatlens" ? (
                <div className="min-w-[620px] py-2">
                  <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-mono">
                    <div className="p-3 bg-cyber-raised border border-cyber-border shadow-[2px_2px_0px_#000000]">
                      <div className="text-cyber-green font-bold">1. ANALYST REQ</div>
                      <div className="text-cyber-dim mt-1">IP/Domain Intake</div>
                    </div>
                    <div className="p-3 bg-cyber-raised border border-cyber-amber/50 shadow-[2px_2px_0px_#000000]">
                      <div className="text-cyber-amber font-bold">2. RFC 1918 GATE</div>
                      <div className="text-cyber-dim mt-1">Private IP Shield</div>
                    </div>
                    <div className="p-3 bg-cyber-raised border border-cyber-border shadow-[2px_2px_0px_#000000]">
                      <div className="text-cyber-cyan font-bold">3. SQLITE CACHE</div>
                      <div className="text-cyber-dim mt-1">TTL Quota Guard</div>
                    </div>
                    <div className="p-3 bg-cyber-raised border border-cyber-border shadow-[2px_2px_0px_#000000]">
                      <div className="text-cyber-green font-bold">4. API ROUTER</div>
                      <div className="text-cyber-dim mt-1">VT v3 + AbuseIPDB</div>
                    </div>
                    <div className="p-3 bg-cyber-raised border border-cyber-green/50 shadow-[2px_2px_0px_#000000]">
                      <div className="text-white font-bold">5. CONSENSUS</div>
                      <div className="text-cyber-green mt-1">Threat Verdict</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-6 mt-2 text-cyber-green/60 text-xs">
                    <span>─────►</span>
                    <span>─────►</span>
                    <span>─────►</span>
                    <span>─────►</span>
                  </div>
                </div>
              ) : project.id === "toposec" ? (
                <div className="min-w-[620px] py-2">
                  <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-mono">
                    <div className="p-3 bg-cyber-raised border border-cyber-border shadow-[2px_2px_0px_#000000]">
                      <div className="text-cyber-green font-bold">1. GRAPH CONFIG</div>
                      <div className="text-cyber-dim mt-1">YAML Subnets</div>
                    </div>
                    <div className="p-3 bg-cyber-raised border border-cyber-border shadow-[2px_2px_0px_#000000]">
                      <div className="text-cyber-cyan font-bold">2. MODEL PARSER</div>
                      <div className="text-cyber-dim mt-1">Topology Mesh</div>
                    </div>
                    <div className="p-3 bg-cyber-raised border border-cyber-border shadow-[2px_2px_0px_#000000]">
                      <div className="text-cyber-green font-bold">3. 6 CORE RULES</div>
                      <div className="text-cyber-dim mt-1">Boundary Verification</div>
                    </div>
                    <div className="p-3 bg-cyber-raised border border-cyber-border shadow-[2px_2px_0px_#000000]">
                      <div className="text-cyber-cyan font-bold">4. SIMULATOR</div>
                      <div className="text-cyber-dim mt-1">Path Traversal</div>
                    </div>
                    <div className="p-3 bg-cyber-raised border border-cyber-green/50 shadow-[2px_2px_0px_#000000]">
                      <div className="text-white font-bold">5. SCORECARD</div>
                      <div className="text-cyber-green mt-1">Audit Verdict</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-6 mt-2 text-cyber-green/60 text-xs">
                    <span>─────►</span>
                    <span>─────►</span>
                    <span>─────►</span>
                    <span>─────►</span>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-cyber-raised border border-cyber-border text-xs text-cyber-cyan/90 leading-relaxed font-mono">
                  {project.architecture}
                </div>
              )}
            </div>

            <div className="p-3 bg-black/60 border border-cyber-border text-xs text-cyber-cyan/90 whitespace-pre-wrap leading-relaxed overflow-x-auto shadow-[2px_2px_0px_#000000]">
              <span className="text-cyber-dim text-[11px] block mb-1">PIPELINE SPECIFICATION:</span>
              {project.architecture}
            </div>
          </div>

          {/* Key Defensive Highlights */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white text-xs font-bold tracking-wider uppercase">
              <Shield className="w-4 h-4 text-cyber-green" />
              <span>EVIDENCE & TECHNICAL HIGHLIGHTS</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {project.keyHighlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-black/70 border border-cyber-border shadow-[2px_2px_0px_#000000] flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyber-green shrink-0 mt-0.5" />
                  <span className="text-gray-300 font-sans leading-snug">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CLI Syntax & Output */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-400 text-xs font-bold tracking-wider uppercase">
              <Terminal className="w-4 h-4 text-cyber-cyan" />
              <span>CLI SYNTAX & REAL OUTPUT SPECIFICATION</span>
            </div>
            <div className="p-3 bg-black border border-cyber-border text-xs text-cyber-green shadow-[2px_2px_0px_#000000]">
              $ {project.cliCommand}
            </div>
            {project.sampleOutput && (
              <pre className="p-4 bg-black border-2 border-black text-[11px] sm:text-xs text-gray-300 whitespace-pre-wrap overflow-x-auto leading-relaxed shadow-[4px_4px_0px_#000000]">
                {project.sampleOutput}
              </pre>
            )}
          </div>

          {/* Tech Stack Tags */}
          <div className="pt-3 border-t border-cyber-border space-y-2">
            <div className="text-[11px] text-gray-400 uppercase tracking-wider">TECHNOLOGIES IMPLEMENTED:</div>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-black text-cyber-cyan text-xs border border-cyber-border shadow-[2px_2px_0px_#000000]"
                >
                  {tech}
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

            {/* White Button: "View on GitHub" (Image 3 "I'm good") */}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 bg-white hover:bg-gray-200 text-black font-bold font-mono text-xs uppercase border-2 border-black shadow-[4px_4px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000000] transition-all"
            >
              <span>View on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="text-[11px] font-mono text-cyber-dim hidden sm:inline">
            SYSTEM_STATUS: COMPILED_OK
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
