"use client";

import { useState } from "react";
import { Briefcase, GraduationCap, Award, Users } from "lucide-react";

export default function About() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const cards = [
    {
      identifier: "EXP-01 // PRODUCTION APPSEC",
      icon: Briefcase,
      period: "Sept 2023 – Jan 2026",
      title: "Vectr • Application Security & Dev",
      subtitle: "Software Developer • Hyderabad, Telangana",
      summary:
        "Bridged software engineering and application security by conducting vulnerability assessments on REST APIs, integrating secure code review into CI/CD pipelines, and maintaining production software.",
      highlights: [
        "Conducted vulnerability assessments on FastAPI & Docker REST APIs, mitigating OWASP Top 10 risks prior to deployment.",
        "Hardened Git CI/CD pipelines with automated security reviews and code scanning to prevent production exploits.",
        "Maintained and secured community plugin with 2,000+ active downloads via continuous threat modeling.",
      ],
      tags: ["FastAPI", "Docker", "OWASP Top 10", "CI/CD Review", "Threat Modeling", "2K+ Users"],
    },
    {
      identifier: "EDU-01 // ACADEMIC SPECIALIZATION",
      icon: GraduationCap,
      period: "2023 – 2027",
      title: "VIT-AP University • B.Tech CSE",
      subtitle: "Cybersecurity Specialization • Amaravati, India",
      summary:
        "Engineering rigorous computer science foundations paired with offensive security labs, network defense protocols, and security tool engineering.",
      highlights: [
        "Core coursework in Network Security, Operating Systems, Data Structures & Algorithms, and DBMS.",
        "Building and testing open-source security tool suites with 100+ passing offline automated tests.",
        "Hands-on adversary emulation, network forensics, and packet capture investigations.",
      ],
      tags: ["Network Security", "Operating Systems", "Data Structures", "Forensics Labs", "DBMS"],
    },
    {
      identifier: "CERT-01 // VERIFIED CREDENTIALS",
      icon: Award,
      period: "Verified Credentials",
      title: "Industry Certifications & Training",
      subtitle: "Cisco Networking Academy & NPTEL",
      summary:
        "Certified foundations in networking architecture, perimeter security, defensive protocols, and modern threat landscapes.",
      highlights: [
        "Cisco Introduction to Cybersecurity — Cisco Networking Academy credential in fundamental network defense.",
        "NPTEL Cybersecurity — Government-accredited program covering cryptographic foundations and security architecture.",
        "Active laboratory practice across Hack The Box, TryHackMe, and PortSwigger Web Security Academy.",
      ],
      tags: ["Cisco Academy", "NPTEL Certified", "Network Protocols", "Perimeter Defense", "Lab Labs"],
    },
    {
      identifier: "LEAD-01 // CAMPUS INITIATIVES",
      icon: Users,
      period: "Active Leadership",
      title: "Technical Leadership & Co-curricular",
      subtitle: "Founder & Co-Founder Roles • Campus Ecosystem",
      summary:
        "Spearheading entrepreneurship and technology initiatives, managing operational budgets, and organizing student technical tracks.",
      highlights: [
        "Founding Partner & Treasurer of Entrepreneurship Club, VIT-AP: managed club operations, sponsorships, and tech events.",
        "Co-Founder of VITAURA Technical Fest: led technical event coordination, student outreach, and hackathon logistics.",
        "Mentored peers in technical workshops and open-source contribution workflows.",
      ],
      tags: ["VITAURA Co-Founder", "E-Club Treasurer", "Tech Operations", "Event Leadership"],
    },
  ];

  return (
    <section id="experience" className="py-24 border-t border-cyber-border/40 relative">
      {/* Anchor for backwards compatibility */}
      <div id="about" className="absolute -top-12 left-0" />

      {/* Cyber Green ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyber-green/5 blur-[150px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="cartouche-badge mb-3 select-none text-cyber-green">02 // EDUCATION & EXPERIENCE</div>
          <h2 className="text-3xl sm:text-5xl font-bold font-editorial text-white tracking-tight">
            Academic Grounding & Industry Practice
          </h2>
        </div>

        {/* Compact Cards Grid matching Featured Projects styling */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {cards.map((card, i) => {
            const Icon = card.icon;
            const isExpanded = expandedIndex === i;
            return (
              <div
                key={i}
                tabIndex={0}
                role="region"
                aria-label={card.title}
                onClick={() => setExpandedIndex(isExpanded ? null : i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setExpandedIndex(isExpanded ? null : i);
                  }
                }}
                className={`bg-cyber-surface/70 border ${
                  isExpanded ? "border-cyber-green/60 bg-cyber-surface shadow-cyber-green/5" : "border-cyber-border"
                } hover:border-cyber-green/40 p-6 sm:p-7 rounded-xl transition-all duration-300 flex flex-col justify-between group hover:bg-cyber-surface shadow-lg cursor-pointer focus:outline-none`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between text-[11px] font-mono mb-3">
                    <span className="text-cyber-green font-bold flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5" />
                      {card.identifier}
                    </span>
                    <span className="text-cyber-dim px-2 py-0.5 rounded bg-cyber-bg border border-cyber-border/60">
                      {card.period}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h4 className="text-lg sm:text-xl font-bold font-editorial text-white mb-1 group-hover:text-cyber-green transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-xs font-mono text-cyber-cyan mb-3">
                    {card.subtitle}
                  </p>

                  {/* Tech / Skill Badges */}
                  <div className="flex flex-wrap gap-1.5 font-mono mb-3">
                    {card.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-cyber-bg text-cyber-dim group-hover:text-cyber-text text-[10px] font-mono border border-cyber-border/60 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Collapsible Details: Summary & Highlights */}
                  <div className={`dossier-collapse ${isExpanded ? "is-expanded" : ""}`}>
                    <div>
                      <div className="pt-3 pb-1 border-t border-cyber-border/40 my-2">
                        {/* Concise summary */}
                        <p className="text-xs text-cyber-muted font-sans leading-relaxed mb-3">
                          {card.summary}
                        </p>

                        {/* Key Highlights */}
                        <ul className="space-y-2 mb-2 font-sans text-xs text-cyber-muted">
                          {card.highlights.map((item, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2">
                              <span className="text-cyber-green font-mono text-xs mt-0.5 select-none">▸</span>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Hint / Action Bar matching Featured Projects */}
                <div className="pt-3.5 border-t border-cyber-border/50 flex items-center justify-between font-mono text-xs mt-auto">
                  <div className="text-cyber-green flex items-center gap-1.5 font-bold text-[11px] sm:text-xs">
                    <span>Details & Highlights</span>
                    <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </div>
                  <span className="text-[10px] font-mono text-cyber-dim group-hover:text-cyber-cyan transition-colors">
                    <span className={isExpanded ? "hidden" : "group-hover:hidden"}>
                      {card.highlights.length} KEY HIGHLIGHTS
                    </span>
                    <span className={isExpanded ? "inline text-cyber-cyan" : "hidden group-hover:inline"}>
                      EXPANDED
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
