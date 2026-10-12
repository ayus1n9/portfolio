"use client";

import { useState } from "react";
import { ExternalLink, Code2 } from "lucide-react";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const secondaryProjects = PORTFOLIO_DATA.projects;

  return (
    <section id="projects" className="py-24 border-t border-cyber-border/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="cartouche-badge mb-3 select-none">03 // FEATURED PROJECTS</div>
          <h2 className="text-3xl sm:text-5xl font-bold font-editorial text-white tracking-tight">
            Security Tooling & Investigative Code
          </h2>
        </div>

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
                    </div>

                    <h4 className="text-lg font-bold font-editorial text-white mb-1 group-hover:text-cyber-green transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-xs font-mono text-cyber-cyan mb-3">
                      {project.subtitle}
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
            <span>VIEW ALL REPOSITORIES ON GITHUB</span>
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
