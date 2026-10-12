# Ayush Singh — Cybersecurity Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-15.1.7-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A production-grade, highly interactive personal cybersecurity research portfolio and lab workbench for **Ayush Singh**.

---

## ⚡ Highlights

- **Monumental Editorial Visual Identity**: Deep obsidian theme (`#07090b`), phosphor neon green sweeps (`#4dff88`), restrained scanlines, ambient constellation lattice, and cartouche ornamentation.
- **Interactive Security Lab & Terminal Simulator**: Working browser CLI running verified project routines:
  - `threatlens [ioc]`: Multi-source OSINT enrichment across VirusTotal v3 & AbuseIPDB v2 with SQLite caching.
  - `threatlens 192.168.1.1`: Demonstrates RFC 1918 pre-flight blocking preventing private IP leaks.
  - `nettrace`: Offline PCAP malware forensics with SHA-256 integrity, L4 dissection, and Suricata offline alerting.
  - `toposec`: 6-rule network architecture & DMZ segmentation validator.
  - `email-analyzer`: EML header spoofing parser & URL defanger.
  - Developer commands: `ls`, `cat incident-report.md`, `status`, `mitre`, `matrix`, `whoami`.
  - Built-in Web Audio API retro telemetry synthesizer with a live mute/unmute toggle.
- **Developer Command Palette (`Ctrl+K` / `⌘K`)**: Full-text search across sections, actions, direct repo links, and résumé download.
- **Deep Technical Case Studies**: Inspect architecture pipelines, problem statements, real CLI options, and sample execution outputs.
- **Verified Background**: Grounded in genuine B.Tech Cybersecurity studies at VIT-AP University, application security experience at Vectr, and active GitHub security tooling.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Runtime**: React 19 / TypeScript 5.7
- **Styling**: Tailwind CSS 3.4
- **Typography**: Cinzel (Editorial Display), JetBrains Mono (Technical Labels/CLI), Inter (Readable Body)
- **Icons**: Lucide React + Custom brand SVGs
- **Audio Synthesizer**: Web Audio API (zero external assets)

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/ayus1n9/portfolio.git
cd portfolio
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build

```bash
npm run build
npm run start -- -p 3000
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
