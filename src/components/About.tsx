"use client";

import { Shield, Search, Terminal, Lock } from "lucide-react";

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
          <div className="cartouche-badge mb-3">02 // OPERATOR PROFILE</div>
          <h2 className="text-3xl sm:text-5xl font-bold font-editorial text-white tracking-tight">
            Engineering Defenses Through Adversarial Curiosity
          </h2>
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
