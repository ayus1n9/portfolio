"use client";

import { Shield, Search, Terminal, Lock, Cpu, CheckCircle2, Award } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function About() {
  const pillars = [
    {
      icon: Search,
      title: "Threat Hunting & PCAP Forensics",
      desc: "Dissecting malicious packet flows, extracting TLS handshakes, defanging IOCs, and correlating unified UTC timelines using Suricata, Zeek, and Wireshark.",
      tag: "OFFLINE FORENSICS",
    },
    {
      icon: Shield,
      title: "Threat Intel & SOC Automation",
      desc: "Building multi-source enrichment tools that synthesize VirusTotal and AbuseIPDB intelligence with strict RFC 1918 leak prevention and local TTL caching.",
      tag: "SOC ENRICHMENT",
    },
    {
      icon: Lock,
      title: "Application Security & API Hardening",
      desc: "Mitigating OWASP Top 10 vulnerabilities across FastAPI and Docker environments, integrating security linting into CI/CD pipelines, and conducting threat modeling.",
      tag: "VECTR PRODUCTION EXP",
    },
    {
      icon: Terminal,
      title: "Offensive Security & Red Teaming",
      desc: "Practicing adversary emulation, Active Directory exploitation (BloodHound, Mimikatz), and web testing across Hack The Box, TryHackMe, and PortSwigger labs.",
      tag: "ADVERSARY EMULATION",
    },
  ];

  return (
    <section id="about" className="py-24 border-t border-cyber-border/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="cartouche-badge mb-3">01 // OPERATOR PROFILE</div>
          <h2 className="text-3xl sm:text-5xl font-bold font-editorial text-white tracking-tight">
            Engineering Defenses Through Adversarial Curiosity
          </h2>
          <p className="mt-4 text-cyber-muted max-w-2xl text-sm sm:text-base leading-relaxed font-sans">
            A computer science student and security toolmaker combining software development
            experience with hands-on red team methodologies and forensic analysis.
          </p>
        </div>

        {/* Narrative & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
          {/* Main Narrative */}
          <div className="lg:col-span-7 bg-cyber-surface border border-cyber-border p-6 sm:p-8 rounded-lg space-y-5">
            <h3 className="text-xl font-bold font-mono text-cyber-green flex items-center gap-2">
              <Terminal className="w-5 h-5 text-cyber-green" />
              <span>THE PHILOSOPHY: EVIDENCE OVER SPECULATION</span>
            </h3>

            {PORTFOLIO_DATA.personal.bio.map((paragraph, index) => (
              <p key={index} className="text-sm sm:text-base text-cyber-muted leading-relaxed">
                {paragraph}
              </p>
            ))}

            <div className="pt-4 border-t border-cyber-border/60 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyber-green shrink-0 mt-0.5" />
                <div>
                  <span className="text-cyber-text font-bold block">Strict Forensic Integrity</span>
                  <span className="text-cyber-dim">Immutable SHA-256 evidence hashing in all tool pipelines.</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyber-green shrink-0 mt-0.5" />
                <div>
                  <span className="text-cyber-text font-bold block">Zero Topology Leakage</span>
                  <span className="text-cyber-dim">RFC 1918 pre-flight blocking prevents internal reconnaissance leaks.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Context Card */}
          <div className="lg:col-span-5 bg-cyber-raised border border-cyber-border p-6 sm:p-8 rounded-lg flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-cyber-dim uppercase tracking-wider mb-2">
                ACADEMIC & INDUSTRY POSITIONING
              </div>
              <h4 className="text-lg font-bold font-mono text-white mb-4">
                VIT-AP University & Vectr Experience
              </h4>
              <ul className="space-y-3.5 text-xs font-mono text-cyber-muted">
                <li className="flex items-start gap-2.5">
                  <span className="text-cyber-green mt-0.5">▸</span>
                  <span>
                    <strong className="text-cyber-text">B.Tech CSE (Cybersecurity):</strong> Enrolled 2023–2027 at VIT-AP Amaravati. Coursework in Network Security, OS, DBMS, DSA.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-cyber-green mt-0.5">▸</span>
                  <span>
                    <strong className="text-cyber-text">Application Security at Vectr:</strong> Hardened REST APIs, mitigated OWASP Top 10 vulnerabilities, and secured a community plugin with 2,000+ users.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-cyber-green mt-0.5">▸</span>
                  <span>
                    <strong className="text-cyber-text">Certified Foundations:</strong> Cisco Introduction to Cybersecurity & NPTEL Cybersecurity certifications.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-cyber-border font-mono text-[11px] text-cyber-dim flex items-center justify-between">
              <span>LOCATION: AMARAVATI, INDIA</span>
              <span className="text-cyber-green">STATUS: READY FOR INTERNSHIPS</span>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="bg-cyber-surface/60 border border-cyber-border hover:border-cyber-green/50 p-5 rounded-lg transition-all hover:bg-cyber-surface group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded bg-cyber-bg border border-cyber-border flex items-center justify-center text-cyber-green group-hover:border-cyber-green/40 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-cyber-dim group-hover:text-cyber-cyan transition-colors">
                    {pillar.tag}
                  </span>
                </div>
                <h4 className="text-sm font-bold font-mono text-white mb-2 group-hover:text-cyber-green transition-colors">
                  {pillar.title}
                </h4>
                <p className="text-xs text-cyber-muted leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
