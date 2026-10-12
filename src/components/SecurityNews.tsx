"use client";

import { useState } from "react";
import { Globe, Radio, ExternalLink, ShieldAlert, Cpu, Lock, Terminal, Filter } from "lucide-react";

interface NewsItem {
  id: string;
  source: string;
  sourceType: string;
  title: string;
  summary: string;
  category: "all" | "zeroday" | "ransomware" | "supplychain" | "infrastructure";
  categoryBadge: string;
  timeAgo: string;
  url: string;
  cveOrTag?: string;
}

const NEWS_DATA: NewsItem[] = [
  {
    id: "reuters-infra",
    source: "Reuters",
    sourceType: "Global Media",
    title: "Critical Infrastructure Targeted in Multi-Vector Energy & Water Cyber Probes",
    summary:
      "CISA, FBI, and international intelligence partners publish urgent guidance on living-off-the-land techniques weaponized against operational technology.",
    category: "infrastructure",
    categoryBadge: "CRITICAL INFRASTRUCTURE",
    timeAgo: "03H AGO",
    url: "https://www.reuters.com/technology/cybersecurity/",
    cveOrTag: "Nation-State APT",
  },
  {
    id: "bleeping-esxi",
    source: "BleepingComputer",
    sourceType: "Threat Wire",
    title: "Ransomware Syndicates Shift Focus to Hypervisor-Level ESXi Virtualization Hosts",
    summary:
      "Threat actors deploy specialized Linux ELF binaries directly against hypervisors to bypass endpoint protection and rapidly encrypt multi-tenant datastores.",
    category: "ransomware",
    categoryBadge: "RANSOMWARE TTPs",
    timeAgo: "07H AGO",
    url: "https://www.bleepingcomputer.com/",
    cveOrTag: "ESXi / Linux ELF",
  },
  {
    id: "thn-supplychain",
    source: "The Hacker News",
    sourceType: "Cyber Journalism",
    title: "Zero-Day Exploits Weaponized in Open-Source Registry & CI/CD Pipeline Attacks",
    summary:
      "Automated repository telemetry reveals coordinated typosquatting campaigns deploying stealth credential harvesters and memory-resident reverse shells.",
    category: "supplychain",
    categoryBadge: "SUPPLY CHAIN SECURITY",
    timeAgo: "14H AGO",
    url: "https://thehackernews.com/",
    cveOrTag: "PyPI / npm Poisoning",
  },
  {
    id: "cisa-kev",
    source: "CISA US-CERT",
    sourceType: "Defense Directive",
    title: "CISA Adds Active Edge Appliance Remote Code Execution Flaws to KEV Catalog",
    summary:
      "Federal agencies mandated to remediate critical authentication bypass and command injection vulnerabilities observed in active exploitation.",
    category: "zeroday",
    categoryBadge: "KNOWN EXPLOITED (KEV)",
    timeAgo: "1D AGO",
    url: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
    cveOrTag: "Emergency Directive",
  },
  {
    id: "darkreading-cloud",
    source: "Dark Reading",
    sourceType: "Enterprise Sec",
    title: "Synthetic Identity Attacks & Token Theft Surge Across Enterprise Cloud Tenants",
    summary:
      "Attackers leverage Adversary-in-the-Middle (AiTM) phishing frameworks to bypass traditional MFA mechanisms via stolen session cookie replays.",
    category: "supplychain",
    categoryBadge: "CLOUD & IDENTITY",
    timeAgo: "1D AGO",
    url: "https://www.darkreading.com/",
    cveOrTag: "OAuth / AiTM Bypass",
  },
  {
    id: "krebs-takedown",
    source: "Krebs on Security",
    sourceType: "Investigative Media",
    title: "Multinational Law Enforcement Coalition Disrupts RedLine Stealer Infrastructure",
    summary:
      "Global operation seizes primary C2 coordination servers, neutralizing major credential theft distribution networks and releasing victim remediation data.",
    category: "infrastructure",
    categoryBadge: "CRIMECRYPT TAKEDOWN",
    timeAgo: "2D AGO",
    url: "https://krebsonsecurity.com/",
    cveOrTag: "Operation Magnus",
  },
  {
    id: "cyberscoop-crypto",
    source: "CyberScoop",
    sourceType: "Defense Intelligence",
    title: "Defense Agencies Accelerate Post-Quantum Cryptographic Standard Migration",
    summary:
      "NIST finalizes initial quantum-resilient algorithms (ML-KEM and ML-DSA) as intelligence organizations mandate migration timelines against store-now-decrypt-later vectors.",
    category: "zeroday",
    categoryBadge: "POST-QUANTUM CRYPTO",
    timeAgo: "3D AGO",
    url: "https://cyberscoop.com/",
    cveOrTag: "NIST FIPS 203/204",
  },
  {
    id: "wired-hardware",
    source: "Wired",
    sourceType: "Tech Media",
    title: "Speculative Execution Side-Channel Flaws Found in Modern Processor Microcode",
    summary:
      "Researchers demonstrate cross-core microarchitectural leakage capable of extracting cryptographic secrets across hardware privilege boundaries.",
    category: "zeroday",
    categoryBadge: "HARDWARE VULNERABILITY",
    timeAgo: "3D AGO",
    url: "https://www.wired.com/category/threat-level/",
    cveOrTag: "CPU Branch Leak",
  },
];

export default function SecurityNews() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredNews =
    activeFilter === "all"
      ? NEWS_DATA
      : NEWS_DATA.filter((item) => item.category === activeFilter);

  const filters = [
    { id: "all", label: "ALL DISPATCHES" },
    { id: "zeroday", label: "ZERO-DAY & DIRECTIVES" },
    { id: "ransomware", label: "RANSOMWARE & APT" },
    { id: "supplychain", label: "SUPPLY CHAIN" },
    { id: "infrastructure", label: "CRITICAL INFRA" },
  ];

  return (
    <section id="news" className="py-24 border-t border-cyber-border/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="cartouche-badge mb-3 select-none">05 // GLOBAL THREAT WIRE</div>
          <h2 className="text-3xl sm:text-5xl font-bold font-editorial text-white tracking-tight">
            Global Cybersecurity & Threat Wire
          </h2>
          <p className="text-xs sm:text-sm font-mono text-cyber-muted mt-3 max-w-2xl">
            Curated intelligence telemetry from premier cybersecurity publications, emergency directives, and investigative media worldwide.
          </p>
        </div>

        {/* Telemetry Status Bar */}
        <div className="mb-8 p-3 rounded-lg bg-cyber-surface/80 border border-cyber-border flex flex-wrap items-center justify-between gap-3 font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-green" />
            </span>
            <span className="text-cyber-green font-bold tracking-wider">
              TELEMETRY RADAR: ACTIVE
            </span>
            <span className="text-cyber-dim">•</span>
            <span className="text-cyber-muted">8 MONITORED GLOBAL OUTLETS</span>
          </div>

          <div className="flex items-center gap-2 text-cyber-dim">
            <Radio className="w-3.5 h-3.5 text-cyber-cyan" />
            <span>SOURCES: REUTERS // BLEEPINGCOMPUTER // THN // CISA // KREBS // WIRED</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 font-mono text-xs">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-3 py-1.5 rounded transition-all tracking-wider text-[11px] ${
                activeFilter === filter.id
                  ? "bg-cyber-green/15 text-cyber-green border border-cyber-green/50 shadow-sm"
                  : "bg-cyber-surface border border-cyber-border text-cyber-dim hover:text-cyber-text hover:border-cyber-muted"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredNews.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cyber-surface/70 border border-cyber-border hover:border-cyber-green/50 p-5 rounded-lg transition-all flex flex-col justify-between group hover:bg-cyber-surface shadow-md"
            >
              <div>
                {/* Source & Timestamp */}
                <div className="flex items-center justify-between text-[10px] font-mono mb-2.5">
                  <span className="text-cyber-cyan font-semibold flex items-center gap-1.5">
                    <Globe className="w-3 h-3 text-cyber-green" />
                    {item.source}
                  </span>
                  <span className="text-cyber-dim font-bold">{item.timeAgo}</span>
                </div>

                {/* Category Badge */}
                <div className="mb-2.5">
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyber-bg text-cyber-green border border-cyber-green/30 tracking-wider">
                    {item.categoryBadge}
                  </span>
                </div>

                {/* Headline (Small Title) */}
                <h4 className="text-sm font-bold font-editorial text-white mb-2 group-hover:text-cyber-green transition-colors leading-snug">
                  {item.title}
                </h4>

                {/* Brief context */}
                <p className="text-xs text-cyber-muted font-sans leading-relaxed mb-4">
                  {item.summary}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-cyber-border/40 flex items-center justify-between font-mono text-[10px] text-cyber-dim">
                <span className="text-cyber-dim">{item.cveOrTag}</span>
                <span className="text-cyber-muted group-hover:text-cyber-green flex items-center gap-1 transition-colors">
                  <span>DISPATCH</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
