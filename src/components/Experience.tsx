"use client";

import { Briefcase, GraduationCap, Award, Users, CheckCircle2, Calendar, MapPin } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function Experience() {
  return (
    <section id="experience" className="py-24 border-t border-cyber-border/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="cartouche-badge mb-3">05 // EXPERIENCE & EDUCATION</div>
          <h2 className="text-3xl sm:text-5xl font-bold font-editorial text-white tracking-tight">
            Industry Practice & Academic Grounding
          </h2>
          <p className="mt-4 text-cyber-muted max-w-2xl text-sm sm:text-base leading-relaxed font-sans">
            Software development experience directly reinforces my security engineering: understanding how
            systems are built is essential to discovering how they can be breached and hardened.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Work Experience Timeline */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-2.5 pb-3 border-b border-cyber-border/80">
              <Briefcase className="w-5 h-5 text-cyber-green" />
              <h3 className="text-xl font-bold font-mono text-white">
                Professional Experience
              </h3>
            </div>

            <div className="space-y-8">
              {PORTFOLIO_DATA.experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="bg-cyber-surface border border-cyber-border p-6 sm:p-7 rounded-xl shadow-lg relative group hover:border-cyber-green/40 transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2 font-mono">
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-cyber-green/10 text-cyber-green border border-cyber-green/30">
                      APPLICATION SECURITY & DEV
                    </span>
                    <span className="text-xs text-cyber-dim flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold font-mono text-white mt-2">
                    {exp.role}
                  </h4>

                  <div className="flex items-center gap-2 text-xs font-mono text-cyber-cyan mb-4">
                    <span>{exp.company}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-cyber-dim">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-cyber-muted font-sans leading-relaxed mb-5">
                    {exp.summary}
                  </p>

                  <ul className="space-y-3 font-sans text-xs text-cyber-muted">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <span className="text-cyber-green font-mono mt-0.5">▸</span>
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Leadership & Co-curricular */}
            <div className="pt-6">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-cyber-border/80">
                <Users className="w-4 h-4 text-cyber-cyan" />
                <h4 className="text-base font-bold font-mono text-white">
                  Leadership & University Initiatives
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PORTFOLIO_DATA.leadership.map((lead, lIdx) => (
                  <div
                    key={lIdx}
                    className="p-4 rounded-lg bg-cyber-raised border border-cyber-border font-mono text-xs space-y-1.5"
                  >
                    <div className="text-cyber-green font-bold text-sm">{lead.title}</div>
                    <div className="text-cyber-cyan text-[11px]">{lead.organization}</div>
                    <p className="text-cyber-muted text-xs font-sans pt-1 leading-snug">
                      {lead.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Education & Certifications */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-2.5 pb-3 border-b border-cyber-border/80">
              <GraduationCap className="w-5 h-5 text-cyber-cyan" />
              <h3 className="text-xl font-bold font-mono text-white">
                Education & Specialization
              </h3>
            </div>

            {/* University Card */}
            {PORTFOLIO_DATA.education.map((edu, idx) => (
              <div
                key={idx}
                className="bg-cyber-surface border border-cyber-border p-6 rounded-xl shadow-lg space-y-4"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyber-green font-bold">DEGREE PROGRAM</span>
                  <span className="text-cyber-dim">{edu.period}</span>
                </div>

                <div>
                  <h4 className="text-lg font-bold font-mono text-white">
                    {edu.degree}
                  </h4>
                  <div className="text-xs font-mono text-cyber-cyan mt-1 flex items-center gap-2">
                    <span>{edu.institution}</span>
                    <span>•</span>
                    <span className="text-cyber-dim">{edu.location}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-cyber-border/60">
                  <div className="text-[10px] font-mono text-cyber-dim uppercase mb-2">
                    RELEVANT TECHNICAL COURSEWORK:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.coursework.map((course, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-2 py-0.5 rounded bg-cyber-bg text-cyber-text text-[11px] font-mono border border-cyber-border"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-cyber-muted font-sans leading-relaxed pt-2">
                  {edu.details}
                </p>
              </div>
            ))}

            {/* Certifications Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-cyber-border/80">
                <Award className="w-4 h-4 text-cyber-green" />
                <h4 className="text-base font-bold font-mono text-white">
                  Verified Certifications
                </h4>
              </div>

              <div className="space-y-3">
                {PORTFOLIO_DATA.certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-cyber-surface border border-cyber-border flex items-center justify-between font-mono text-xs"
                  >
                    <div>
                      <div className="text-cyber-text font-bold">{cert.title}</div>
                      <div className="text-cyber-dim text-[11px]">{cert.issuer}</div>
                    </div>
                    <span className="text-[10px] text-cyber-green font-bold px-2 py-1 rounded bg-cyber-green/10 border border-cyber-green/30">
                      {cert.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
