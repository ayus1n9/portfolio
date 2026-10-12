"use client";

import { useEffect } from "react";
import { X, ExternalLink, Terminal, GitBranch, Shield, CheckCircle2, AlertTriangle, Layers } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Modal Dialog */}
      <div
        className="bg-cyber-surface border border-cyber-border rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col font-mono text-cyber-text"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-10 px-6 py-4 bg-cyber-raised border-b border-cyber-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs text-cyber-green font-bold tracking-widest uppercase">
              {project.identifier}
            </span>
            <span className="text-cyber-dim text-xs">|</span>
            <span className="text-xs text-cyber-dim">{project.status}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded text-cyber-muted hover:text-white hover:bg-cyber-surface transition-colors"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Title & Subtitle */}
          <div>
            <h2 id="modal-title" className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-cyber-cyan font-sans font-medium">
              {project.subtitle}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-cyber-green text-cyber-bg font-bold text-xs tracking-wider hover:bg-cyber-green-bright transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>VIEW REPOSITORY ON GITHUB</span>
            </a>
            <div className="text-xs text-cyber-dim px-3 py-2 rounded bg-cyber-bg border border-cyber-border">
              CATEGORY: {project.category}
            </div>
          </div>

          {/* Problem Statement */}
          <div className="bg-cyber-bg p-5 rounded-lg border border-cyber-border space-y-2">
            <div className="flex items-center gap-2 text-cyber-amber text-xs font-bold tracking-wider uppercase">
              <AlertTriangle className="w-4 h-4" />
              <span>THE OPERATIONAL PROBLEM</span>
            </div>
            <p className="text-xs sm:text-sm text-cyber-muted font-sans leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Architecture Pipeline */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-cyber-green text-xs font-bold tracking-wider uppercase">
              <Layers className="w-4 h-4" />
              <span>SYSTEM ARCHITECTURE & PIPELINE FLOW</span>
            </div>

            {/* Visual SVG Diagram */}
            <div className="p-4 rounded-lg bg-cyber-bg border border-cyber-border overflow-x-auto">
              {project.id === "nettrace" ? (
                <div className="min-w-[620px] py-2">
                  <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-mono">
                    <div className="p-3 rounded bg-cyber-raised border border-cyber-border">
                      <div className="text-cyber-green font-bold">1. INTAKE</div>
                      <div className="text-cyber-dim mt-1">SHA-256 & Header Magic Check</div>
                    </div>
                    <div className="p-3 rounded bg-cyber-raised border border-cyber-border">
                      <div className="text-cyber-cyan font-bold">2. DISSECT</div>
                      <div className="text-cyber-dim mt-1">L4 5-Tuples, DNS & TLS SNI</div>
                    </div>
                    <div className="p-3 rounded bg-cyber-raised border border-cyber-border">
                      <div className="text-cyber-green font-bold">3. SURICATA</div>
                      <div className="text-cyber-dim mt-1">Offline Rule & Beacon Detection</div>
                    </div>
                    <div className="p-3 rounded bg-cyber-raised border border-cyber-border">
                      <div className="text-cyber-cyan font-bold">4. DEFANG</div>
                      <div className="text-cyber-dim mt-1">Safe Defanging (1.1.1[.]1)</div>
                    </div>
                    <div className="p-3 rounded bg-cyber-raised border border-cyber-green/50 shadow-sm shadow-cyber-green/20">
                      <div className="text-white font-bold">5. ATT&CK</div>
                      <div className="text-cyber-green mt-1">UTC Incident Report & Triage</div>
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
                    <div className="p-3 rounded bg-cyber-raised border border-cyber-border">
                      <div className="text-cyber-green font-bold">1. ANALYST REQ</div>
                      <div className="text-cyber-dim mt-1">IP / Domain / Hash Intake</div>
                    </div>
                    <div className="p-3 rounded bg-cyber-raised border border-cyber-amber/50">
                      <div className="text-cyber-amber font-bold">2. RFC 1918 GATE</div>
                      <div className="text-cyber-dim mt-1">Blocks Private IP Leakage</div>
                    </div>
                    <div className="p-3 rounded bg-cyber-raised border border-cyber-border">
                      <div className="text-cyber-cyan font-bold">3. SQLITE CACHE</div>
                      <div className="text-cyber-dim mt-1">TTL Expiry & Quota Shield</div>
                    </div>
                    <div className="p-3 rounded bg-cyber-raised border border-cyber-border">
                      <div className="text-cyber-green font-bold">4. API ROUTER</div>
                      <div className="text-cyber-dim mt-1">VirusTotal v3 + AbuseIPDB</div>
                    </div>
                    <div className="p-3 rounded bg-cyber-raised border border-cyber-green/50 shadow-sm shadow-cyber-green/20">
                      <div className="text-white font-bold">5. CONSENSUS</div>
                      <div className="text-cyber-green mt-1">Normalized Threat Verdict</div>
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
                    <div className="p-3 rounded bg-cyber-raised border border-cyber-border">
                      <div className="text-cyber-green font-bold">1. GRAPH CONFIG</div>
                      <div className="text-cyber-dim mt-1">YAML Subnets & Firewalls</div>
                    </div>
                    <div className="p-3 rounded bg-cyber-raised border border-cyber-border">
                      <div className="text-cyber-cyan font-bold">2. MODEL PARSER</div>
                      <div className="text-cyber-dim mt-1">Builds Node Topology Mesh</div>
                    </div>
                    <div className="p-3 rounded bg-cyber-raised border border-cyber-border">
                      <div className="text-cyber-green font-bold">3. 6 CORE RULES</div>
                      <div className="text-cyber-dim mt-1">DMZ & Boundary Verification</div>
                    </div>
                    <div className="p-3 rounded bg-cyber-raised border border-cyber-border">
                      <div className="text-cyber-cyan font-bold">4. SIMULATOR</div>
                      <div className="text-cyber-dim mt-1">Packet Path Traversal Test</div>
                    </div>
                    <div className="p-3 rounded bg-cyber-raised border border-cyber-green/50 shadow-sm shadow-cyber-green/20">
                      <div className="text-white font-bold">5. SCORECARD</div>
                      <div className="text-cyber-green mt-1">Security Audit Pass/Fail</div>
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
                <div className="p-3 rounded bg-cyber-raised border border-cyber-border text-xs text-cyber-cyan/90 leading-relaxed font-mono">
                  {project.architecture}
                </div>
              )}
            </div>

            <div className="p-3 rounded bg-cyber-raised/60 border border-cyber-border text-xs text-cyber-cyan/90 whitespace-pre-wrap leading-relaxed overflow-x-auto">
              <span className="text-cyber-dim text-[11px] block mb-1">PIPELINE SPECIFICATION:</span>
              {project.architecture}
            </div>
          </div>

          {/* Key Defensive Highlights */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-cyber-text text-xs font-bold tracking-wider uppercase">
              <Shield className="w-4 h-4 text-cyber-green" />
              <span>EVIDENCE & TECHNICAL HIGHLIGHTS</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {project.keyHighlights.map((highlight, idx) => (
                <li
                  key={idx}
                  className="p-3 rounded bg-cyber-bg/60 border border-cyber-border/70 flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyber-green shrink-0 mt-0.5" />
                  <span className="text-cyber-muted font-sans leading-snug">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CLI Syntax & Sample Output */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-cyber-muted text-xs font-bold tracking-wider uppercase">
              <Terminal className="w-4 h-4 text-cyber-cyan" />
              <span>CLI SYNTAX & REAL OUTPUT SPECIFICATION</span>
            </div>
            <div className="p-3 rounded bg-cyber-bg border border-cyber-border text-xs text-cyber-green">
              $ {project.cliCommand}
            </div>
            {project.sampleOutput && (
              <pre className="p-4 rounded bg-black/90 border border-cyber-border/80 text-[11px] sm:text-xs text-cyber-muted whitespace-pre-wrap overflow-x-auto leading-relaxed">
                {project.sampleOutput}
              </pre>
            )}
          </div>

          {/* Tech Stack Tags */}
          <div className="pt-4 border-t border-cyber-border space-y-2">
            <div className="text-xs text-cyber-dim uppercase tracking-wider">TECHNOLOGIES IMPLEMENTED:</div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded bg-cyber-raised text-cyber-cyan text-xs border border-cyber-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
