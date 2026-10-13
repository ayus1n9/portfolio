"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Terminal as TerminalIcon, RotateCcw, Copy, Check, Volume2, VolumeX } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { playKeyBlip, playCommandSuccess, playAlertBuzzer, toggleSound, isSoundEnabled } from "@/utils/audio";

interface HistoryEntry {
  command: string;
  output: string;
  type?: "standard" | "alert" | "success" | "json";
}

export default function TerminalLab() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: "welcome",
      output: `======================================================================
  Target Environment: Linux (x86_64) | Active Host: us3r@home
  All simulated routines strictly mirror actual repository logic.
======================================================================
Type 'help' to inspect available security tool simulations.
Try: 'whoami', 'nettrace', 'toposec', 'email-analyzer', 'threatlens'`,
      type: "standard",
    },
  ]);
  const [commandIndex, setCommandIndex] = useState<number>(-1);
  const [savedCommands, setSavedCommands] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const terminalScreenRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    // Only scroll the internal terminal container, never the window
    if (terminalScreenRef.current) {
      terminalScreenRef.current.scrollTop = terminalScreenRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    setSavedCommands((prev) => [...prev, trimmed]);
    setCommandIndex(-1);

    const parts = trimmed.split(" ");
    const primary = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ");

    let response = "";
    let resType: "standard" | "alert" | "success" | "json" = "standard";

    switch (primary) {
      case "help":
        response = `AVAILABLE COMMANDS:
  whoami            - Display operator background & academic credentials
  threatlens [ioc]  - Run ThreatLens IOC enrichment pipeline (e.g. threatlens 185.220.101.5)
  nettrace          - Run NetTrace PCAP analysis & Suricata rule matching
  toposec           - Run TopoSec 6-rule network architecture validation
  email-analyzer    - Run Email-Analyzer phishing header dissection & defanging
  arsenal           - List offensive & defensive tooling competencies
  clear             - Flush terminal buffer
  contact           - Display communication channels`;
        break;

      case "whoami":
        response = `OPERATOR IDENTITY:
  Name:           ${PORTFOLIO_DATA.personal.name}
  Handle:         ${PORTFOLIO_DATA.personal.handle}
  University:     VIT-AP University (B.Tech Computer Science, Cybersecurity Specialization 2023-2027)
  Experience:     Vectr (Web Developer – AppSec & API Hardening, 2023-2026)
  Focus Areas:    Red Teaming, Network Forensics, SOC Enrichment Automation, AI Security & Red Teaming, API Security, Cloud Security, DevSecOps
  Location:       ${PORTFOLIO_DATA.personal.location}
  GitHub:         ${PORTFOLIO_DATA.personal.github}`;
        resType = "success";
        break;

      case "threatlens":
        const targetIoc = arg || "185.220.101.5";
        // Check RFC 1918 simulation
        if (targetIoc.startsWith("192.168.") || targetIoc.startsWith("10.") || targetIoc.startsWith("127.")) {
          response = `[VALIDATOR] Scoping target: ${targetIoc}
[ERROR] BLOCKED BY RFC 1918 SAFETY POLICY:
  Target IP falls within private non-routable address space.
  ThreatLens pre-flight filter prevented internal topology leak to external threat APIs.
  Verdict: LOCAL_RECON_ONLY (No external query executed).`;
          resType = "alert";
        } else {
          response = `[VALIDATOR] Scoping target IP: ${targetIoc} (Public Routable IPv4) -> OK
[CACHE] Checking local SQLite persistent cache... Cache miss.
[PROVIDER: VIRUSTOTAL v3] Querying endpoint /api/v3/ip_addresses/${targetIoc}...
  - Malicious engines detected: 43 / 74
  - ASN: AS16276 (OVH SAS)
[PROVIDER: ABUSEIPDB v2] Querying endpoint /api/v2/check...
  - Abuse Confidence Score: 98%
  - Total Reports: 1,280 within last 30 days
[NORMALIZER] Consensus Analysis:
  - Consensus Verdict: CRITICAL_RISK_SUSPECTED_C2
  - Warning Caveats: Active Tor Exit Node / Proxy observed in past 72h.
[OUTPUT] Triage record saved to reports/triage_${targetIoc.replace(/\./g, "_")}.json (Audit ready)`;
          resType = "alert";
        }
        break;

      case "nettrace":
        response = `[STAGE 1: INTAKE & INTEGRITY]
  Loading capture: /evidence/malware_samples/session_2026_03.pcap
  Cryptographic Hash (SHA-256): 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
  Forensic Header Verification: PCAP-TCPDUMP Magic (0xa1b2c3d4) -> VALID (Immutable)

[STAGE 2: METADATA & FLOW EXTRACTION]
  - Dissected L4 5-Tuples: 2,140 bidirectional connections
  - DNS Queries Resolved: 47 unique domains
  - TLS Handshakes Extracted: 31 SNI records (Payload encrypted; metadata logged)

[STAGE 3: SURICATA IDS OFFLINE EVALUATION]
  - [ALERT] ET TROJAN RedLine Stealer Initial Checkin Attempt (SID: 2034912)
  - [ALERT] Suspicious Dynamic DNS Query: api.cloud-sync-update[.]top

[STAGE 4: INDICATOR DEFANGING & UTC TIMELINE]
  - Defanged IOC: hxxps://185.220.101[.]5:443/api/payload.bin
  - Defanged Domain: cloud-sync-update[.]top
  - Timeline correlation unified to ISO-8601 UTC across flows & alerts.
[COMPLETE] Executive Incident Report generated: incident-report.md (ATT&CK T1071.001)`;
        resType = "success";
        break;

      case "toposec":
        response = `[TOPOSEC ENGINE v1.2] Executing 6 Core Architecture Rules against 'prod_topology.yaml':
  ✔ RULE 1 [DMZ Segregation]: Public services isolated in VLAN 20 -> PASS
  ✔ RULE 2 [Perimeter Firewall]: Ingress ports restricted to 443/80 -> PASS
  ✖ RULE 3 [Admin Interface Isolation]: SSH (port 22) exposed from DMZ to Core Database! -> VIOLATION
  ✔ RULE 4 [Egress Filtering]: Outbound direct SMB (port 445) dropped -> PASS
  ✔ RULE 5 [Subnet Masking]: No flat routing detected across tenant zones -> PASS
  ✔ RULE 6 [WAF Placement]: Ingress traffic routes through Reverse Proxy -> PASS

[SIMULATION ENGINE] Packet traversal test from untrusted ingress:
  Path: Ingress -> FW-01 -> DMZ-Web -> [EXPLOIT TRAVERSAL] -> DB-Internal (BLOCKED BY POLICY CHECK)
[RESULT] 5 Rules Passed, 1 Architectural Violation Found. Audit Score: 83.3%`;
        resType = "alert";
        break;

      case "email-analyzer":
        response = `[EML DISSECTION ENGINE] Parsing sample_phish.eml:
  Envelope From:  security-alert@micros0ft-security-auth.com
  Sender Display: "Microsoft Office 365 Support"
  Header SPF:     SoftFail (Originating IP 194.26.29.112 not in SPF record)
  Header DKIM:    None (No cryptographic signature)
  Header DMARC:   Fail (Domain alignment mismatch detected)
  Hop Analysis:   Originated in external autonomous system AS49453 (Suspicious hosting provider)

[INDICATOR DEFANGING]
  Target link:    hxxps://micros0ft-security-auth[.]com/verify?token=d8392
  Payload file:   invoice_oct2026.pdf.exe (MIME mismatch: application/x-dosexec disguised as PDF)

[RISK VERDICT]
  Calculated Threat Score: 92/100 -> CRITICAL SPEAR-PHISHING`;
        resType = "success";
        break;

      case "arsenal":
        response = `CYBERSECURITY ARSENAL & PRACTICAL CAPABILITIES:
  - Offensive Security:     Metasploit, Burp Suite, Nmap, Kali Linux, BloodHound, Mimikatz
  - Malware & Forensics:    Wireshark, TShark, Suricata, Volatility, Autopsy, REMnux, Any.Run
  - Programming & SecDev:   Python (Red Team tooling), Bash, REST APIs, SQLite, Docker, CI/CD
  - Detection & Systems:    Linux, Windows Event Logs, Sysmon XML rules, Wazuh SIEM
  - Platforms & Labs:       Hack The Box (AD & Pro Labs), TryHackMe, PortSwigger Web Academy`;
        break;

      case "ls":
        response = `total 48
drwxr-xr-x 4 ayush sec 4096 Oct 12 18:00 cases/
drwxr-xr-x 2 ayush sec 4096 Oct 12 17:30 evidence/pcap/
-rw-r--r-- 1 ayush sec 9314 Oct 12 17:27 NetTrace.py
-rw-r--r-- 1 ayush sec 12753 Oct 12 17:27 ThreatLens.py
-rw-r--r-- 1 ayush sec 8420 Oct 12 17:20 toposec.py
-rw-r--r-- 1 ayush sec 6240 Oct 12 17:15 email_analyzer.py
-rw-r--r-- 1 ayush sec 16384 Oct 12 17:00 .soc_intel_cache.db
-rw-r--r-- 1 ayush sec 4120 Oct 12 16:50 incident-report.md`;
        break;

      case "cat":
        if (arg.includes("incident") || arg.includes("report")) {
          response = `# SOC INCIDENT REPORT // INC-2026-001
Target Sample:      malware_c2_traffic.pcap
Cryptographic Hash: 4a2f8b91c... (SHA-256 Header Validated)
Identified Malware: RedLine Stealer Check-in
Mapped ATT&CK Techniques:
  - T1071.001 (Application Layer Protocol: Web Protocols)
  - T1059.001 (Command and Scripting Interpreter: PowerShell)
  - T1003 (OS Credential Dumping)
Containment Directives:
  1. Null-route remote IP 185.220.101[.]5 at border gateway.
  2. Revoke active browser session tokens for compromised workstation.
  3. Deploy tuned Suricata rule SID 2034912 to enterprise sensor pool.`;
          resType = "success";
        } else {
          response = `Usage: cat incident-report.md (or other simulated file)`;
        }
        break;

      case "status":
        response = `WORKBENCH DIAGNOSTICS & TELEMETRY:
  Workstation:        Linux (Debian-based x86_64) | Kernel: 6.8.0-generic
  ThreatLens Engine:  ONLINE (SQLite TTL Cache: 1,420 entries active)
  NetTrace Sensor:    READY (Suricata eve.json pipe active)
  TopoSec Engine:     ACTIVE (6 Rules Enforcing Perimeter DMZ Segregation)
  Defensive Posture:  OPTIMAL (RFC 1918 Guardrails Enforced)`;
        resType = "success";
        break;

      case "mitre":
        response = `MITRE ATT&CK ENTERPRISE LAB COVERAGE:
  [TA0001 Initial Access]        -> T1566 Phishing (.eml parsing in Email-Analyzer)
  [TA0006 Credential Access]     -> T1003 Credential Dumping (Lab testing with Sysmon)
  [TA0007 Discovery]             -> T1046 Network Service Discovery (Nmap & TopoSec)
  [TA0011 Command & Control]     -> T1071 Application Layer Protocol (NetTrace PCAP)`;
        resType = "success";
        break;

      case "matrix":
        response = `01000001 01011001 01010101 01010011 01001000 00100000 01010011 01001001 01001110 01000111 01001000
[PHOSPHOR STREAM ACTIVE]
  "There is no spoon." — Dissecting adversarial abstractions down to raw packets.
  Defense-in-depth decoded. Ready for operational triage.`;
        resType = "success";
        break;

      case "contact":
        response = `COMMUNICATION CHANNELS:
  Email:    ${PORTFOLIO_DATA.personal.email}
  GitHub:   ${PORTFOLIO_DATA.personal.github}
  Status:   Open for Cybersecurity Internships, Red Team & SOC Analyst Roles`;
        resType = "success";
        break;

      case "clear":
        setHistory([]);
        return;

      default:
        response = `Command not recognized: '${trimmed}'. Type 'help' to inspect available simulations.`;
        resType = "alert";
        break;
    }

    if (resType === "alert") {
      playAlertBuzzer();
    } else {
      playCommandSuccess();
    }

    setHistory((prev) => [
      ...prev,
      {
        command: trimmed,
        output: response,
        type: resType,
      },
    ]);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (savedCommands.length > 0) {
        const nextIdx = commandIndex + 1;
        if (nextIdx < savedCommands.length) {
          setCommandIndex(nextIdx);
          setInput(savedCommands[savedCommands.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandIndex > 0) {
        const nextIdx = commandIndex - 1;
        setCommandIndex(nextIdx);
        setInput(savedCommands[savedCommands.length - 1 - nextIdx]);
      } else if (commandIndex === 0) {
        setCommandIndex(-1);
        setInput("");
      }
    }
  };

  const copyTerminalOutput = () => {
    const text = history.map((h) => `$ ${h.command}\n${h.output}`).join("\n\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="lab" className="py-24 border-t border-cyber-border/40 relative overflow-hidden">
      {/* Cyber Green ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyber-green/5 blur-[150px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Cyber Green Cartouche */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="cartouche-badge mb-3 select-none text-cyber-green">01 // CLI</div>
        </div>

        {/* Terminal Window Frame */}
        <div className="bg-black/90 border border-cyber-border rounded-lg shadow-2xl overflow-hidden font-mono max-w-5xl mx-auto">
          {/* Title Bar */}
          <div className="px-4 py-3 bg-cyber-raised border-b border-cyber-border flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-cyber-green/80" />
              </div>
              <span className="text-xs text-cyber-muted font-bold tracking-wider ml-2 flex items-center gap-2">
                <TerminalIcon className="w-3.5 h-3.5 text-cyber-green" />
                us3r@home:~$ bash
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  toggleSound();
                  setHistory((prev) => [
                    ...prev,
                    {
                      command: "audio_toggle",
                      output: `Audio feedback: ${isSoundEnabled() ? "ENABLED (Web Audio Synth)" : "MUTED"}`,
                      type: "standard",
                    },
                  ]);
                }}
                className="p-1 rounded text-cyber-dim hover:text-cyber-green transition-colors"
                title="Toggle terminal sound feedback"
                aria-label="Toggle terminal audio"
              >
                {isSoundEnabled() ? <Volume2 className="w-3.5 h-3.5 text-cyber-green" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={copyTerminalOutput}
                className="p-1 rounded text-cyber-dim hover:text-cyber-green transition-colors"
                title="Copy terminal session"
                aria-label="Copy terminal text"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-cyber-green" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setHistory([])}
                className="p-1 rounded text-cyber-dim hover:text-cyber-muted transition-colors"
                title="Reset terminal"
                aria-label="Reset terminal"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Terminal Screen Body */}
          <div
            ref={terminalScreenRef}
            className="p-4 sm:p-6 min-h-[380px] max-h-[520px] overflow-y-auto space-y-4 text-xs sm:text-sm text-cyber-text"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-cyber-muted">
                  <span className="text-cyber-green font-bold">us3r@home:~$</span>
                  <span className="text-white font-semibold">{item.command}</span>
                </div>
                <pre
                  className={`whitespace-pre-wrap font-mono leading-relaxed pl-4 border-l ${
                    item.type === "alert"
                      ? "text-cyber-amber border-cyber-amber/40"
                      : item.type === "success"
                      ? "text-cyber-green border-cyber-green/40"
                      : "text-cyber-muted border-cyber-border"
                  }`}
                >
                  {item.output}
                </pre>
              </div>
            ))}

            {/* Live Command Line Input */}
            <div className="flex items-center gap-2 text-cyber-muted pt-2">
              <span className="text-cyber-green font-bold shrink-0">us3r@home:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  playKeyBlip();
                }}
                onKeyDown={handleKeyDown}
                placeholder="type 'help' or any command..."
                className="w-full bg-transparent border-0 border-none outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 shadow-none focus:shadow-none text-cyber-text font-mono text-xs sm:text-sm placeholder:text-cyber-dim/50 caret-cyber-green p-0"
                style={{ outline: "none", border: "none", boxShadow: "none" }}
                aria-label="Terminal command prompt"
              />
            </div>
          </div>

          {/* Terminal Footer Bar */}
          <div className="px-4 py-2 bg-cyber-surface/80 border-t border-cyber-border text-[11px] text-cyber-dim flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyber-green" />
              <span>TERMINAL SANDBOX ISOLATION: ACTIVE</span>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <span>UP/DOWN FOR COMMAND HISTORY</span>
              <span className="text-cyber-green">TYPE &apos;HELP&apos; FOR DIRECTORY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
