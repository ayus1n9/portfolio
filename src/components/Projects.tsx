"use client";

import { useState } from "react";
import { Terminal, ExternalLink, Shield, Layers, FileCode, ArrowRight, Eye, Code2, CheckCircle2, AlertTriangle, Copy, Check } from "lucide-react";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const categories = [
    { id: "ALL", label: "ALL ARTIFACTS" },
    { id: "NETWORK_SEC", label: "NETWORK FORENSICS" },
    { id: "THREAT_INTEL", label: "THREAT INTEL & OSINT" },
    { id: "APP_SEC", label: "APPSEC & PHISHING" },
    { id: "BLUE_TEAM", label: "SOC & SIEM LABS" },
  ];

  const filteredProjects =
    selectedCategory === "ALL"
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter((p) => p.categoryTag === selectedCategory);

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const secondaryProjects = filteredProjects.filter((p) => !p.featured);

  const handleCopyCmd = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <section id="projects" className="py-24 border-t border-cyber-border/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="cartouche-badge mb-3">03 // FEATURED PROJECTS</div>
          <h2 className="text-3xl sm:text-5xl font-bold font-editorial text-white tracking-tight">
            Security Tooling & Investigative Code
          </h2>
          <p className="mt-4 text-cyber-muted max-w-2xl text-sm sm:text-base leading-relaxed font-sans">
            Engineered from real-world threat hunting methodologies, RFC standards, and offensive testing.
            Zero fictional metrics—every repository, CLI tool, and test suite is verifiable on GitHub.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded text-xs font-mono tracking-wider transition-all border ${
                selectedCategory === cat.id
                  ? "bg-cyber-green text-cyber-bg border-cyber-green font-bold shadow-md shadow-cyber-green/10"
                  : "bg-cyber-surface text-cyber-muted border-cyber-border hover:border-cyber-green/40 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Featured Projects: Editorial Magazine-Grade Deep Dives */}
        {featuredProjects.length > 0 && (
          <div className="space-y-12 mb-16">
            {featuredProjects.map((project, idx) => (
              <div
                key={project.id}
                className="bg-cyber-surface border border-cyber-border hover:border-cyber-green/50 rounded-xl overflow-hidden transition-all duration-300 shadow-xl group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  {/* Left Column: Narrative & Technical Storytelling */}
                  <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    <div>
                      {/* Top Header Identifier */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 font-mono">
                        <span className="text-xs font-bold text-cyber-green tracking-widest uppercase">
                          {project.identifier}
                        </span>
                        <span className="text-[11px] px-2.5 py-0.5 rounded bg-cyber-bg border border-cyber-border text-cyber-cyan">
                          {project.status}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-white mb-1 group-hover:text-cyber-green transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-mono text-cyber-cyan mb-5">
                        {project.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-sm text-cyber-muted leading-relaxed font-sans mb-6">
                        {project.description}
                      </p>

                      {/* Problem vs Engineered Solution */}
                      <div className="bg-cyber-bg/70 border border-cyber-border/80 p-4 rounded-lg space-y-2 mb-6">
                        <div className="text-[11px] font-mono text-cyber-amber font-bold tracking-wider flex items-center gap-1.5 uppercase">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>THE OPERATIONAL PROBLEM SOLVED:</span>
                        </div>
                        <p className="text-xs text-cyber-muted font-sans leading-relaxed">
                          {project.problem}
                        </p>
                      </div>

                      {/* Key Highlights */}
                      <div className="space-y-2 mb-6">
                        <div className="text-[10px] font-mono uppercase text-cyber-dim tracking-wider">
                          EVIDENCE & IMPLEMENTATION HIGHLIGHTS:
                        </div>
                        <ul className="space-y-1.5 text-xs text-cyber-muted font-sans">
                          {project.keyHighlights.slice(0, 3).map((highlight, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2">
                              <span className="text-cyber-green font-mono">▸</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Footer Actions & Stack */}
                    <div>
                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded bg-cyber-bg text-cyber-dim text-[11px] font-mono border border-cyber-border/70"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Buttons */}
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => setActiveModalProject(project)}
                          className="px-4 py-2.5 rounded bg-cyber-green/10 border border-cyber-green/40 hover:bg-cyber-green/20 text-cyber-green font-mono text-xs font-bold tracking-wider transition-all flex items-center gap-2"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>INSPECT ARCHITECTURE & SPECS</span>
                        </button>

                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 rounded bg-cyber-surface border border-cyber-border hover:border-cyber-muted text-cyber-text font-mono text-xs tracking-wider transition-all flex items-center gap-2 hover:bg-cyber-raised"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>SOURCE ON GITHUB</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Code & Architecture Terminal Card */}
                  <div className="lg:col-span-5 bg-cyber-raised p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-cyber-border flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-cyber-dim mb-3 pb-2 border-b border-cyber-border/60">
                        <span className="flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5 text-cyber-green" />
                          <span>PIPELINE TELEMETRY</span>
                        </span>
                        <span className="text-cyber-green font-semibold">VALIDATED</span>
                      </div>

                      {/* Copyable CLI Invocation */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-[10px] font-mono text-cyber-dim uppercase mb-1">
                          <span>CLI INVOCATION:</span>
                          <button
                            onClick={() => handleCopyCmd(project.cliCommand)}
                            className="hover:text-cyber-green flex items-center gap-1 transition-colors"
                          >
                            {copiedCmd === project.cliCommand ? (
                              <>
                                <Check className="w-3 h-3 text-cyber-green" />
                                <span className="text-cyber-green">COPIED</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>COPY</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div className="p-2.5 rounded bg-cyber-bg border border-cyber-border text-xs font-mono text-cyber-green overflow-x-auto">
                          $ {project.cliCommand}
                        </div>
                      </div>

                      {/* Real Sample Execution Output */}
                      {project.sampleOutput && (
                        <div>
                          <div className="text-[10px] font-mono text-cyber-dim uppercase mb-1">SAMPLE EXECUTION TELEMETRY:</div>
                          <pre className="p-3.5 rounded bg-black/80 border border-cyber-border text-[11px] font-mono text-cyber-muted leading-relaxed whitespace-pre-wrap overflow-x-auto max-h-48">
                            {project.sampleOutput}
                          </pre>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 mt-4 border-t border-cyber-border/40 text-[11px] font-mono text-cyber-dim flex items-center justify-between">
                      <span>AUDIT: RFC / ATT&CK ALIGNED</span>
                      <span className="text-cyber-cyan">TESTS PASSING</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Secondary Projects Grid (Asymmetric List/Cards) */}
        {secondaryProjects.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6 font-mono text-xs">
              <span className="font-bold text-cyber-dim tracking-wider uppercase">
                ADDITIONAL SECURITY IMPLEMENTATIONS & LABS:
              </span>
              <div className="h-px flex-1 bg-cyber-border/60" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {secondaryProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-cyber-surface/70 border border-cyber-border hover:border-cyber-green/40 p-6 rounded-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-cyber-dim mb-2">
                      <span className="text-cyber-green">{project.identifier}</span>
                      <span>{project.status}</span>
                    </div>

                    <h4 className="text-lg font-bold font-editorial text-white mb-1 group-hover:text-cyber-green transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-xs font-mono text-cyber-cyan mb-3">
                      {project.subtitle}
                    </p>

                    <p className="text-xs text-cyber-muted leading-relaxed font-sans mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-cyber-bg text-cyber-dim text-[10px] font-mono border border-cyber-border/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-cyber-border/50 flex items-center justify-between font-mono">
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="text-xs text-cyber-green hover:underline flex items-center gap-1"
                    >
                      <span>Details & Specs</span>
                      <span>→</span>
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyber-dim hover:text-white transition-colors"
                      aria-label={`${project.title} on GitHub`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View All Repositories on GitHub CTA */}
        <div className="mt-14 text-center">
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded bg-cyber-surface border border-cyber-border hover:border-cyber-green text-cyber-text hover:text-cyber-green font-mono text-xs font-bold tracking-wider transition-all"
          >
            <Code2 className="w-4 h-4 text-cyber-green" />
            <span>VIEW ALL REPOSITORIES ON GITHUB (@AYUS1N9)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Deep Inspection Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
