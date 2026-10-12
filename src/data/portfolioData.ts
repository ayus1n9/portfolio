export interface Project {
  id: string;
  identifier: string;
  title: string;
  subtitle: string;
  category: string;
  categoryTag: "RED_TEAM" | "THREAT_INTEL" | "NETWORK_SEC" | "APP_SEC" | "BLUE_TEAM";
  description: string;
  technologies: string[];
  githubUrl: string;
  status: string;
  problem: string;
  architecture: string;
  cliCommand: string;
  keyHighlights: string[];
  featured: boolean;
  sampleOutput?: string;
}

export interface SkillCategory {
  title: string;
  code: string;
  description: string;
  skills: {
    name: string;
    level: "Core Competency" | "Practical Lab" | "Familiar";
    context: string;
  }[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Ayush Singh",
    handle: "ayus1n9",
    roleTitle: "Cyber Security Researcher & Toolmaker",
    statusText: "OPERATIONAL // SECURITY TOOLMAKING & DEFENSE",
    location: "Amaravati, India",
    email: "ayusingh0416@gmail.com",
    phone: "+91-6206149614",
    github: "https://github.com/ayus1n9",
    linkedin: "https://linkedin.com/in/ayus1n9",
    resumeUrl: "/resume.pdf",
    headline: "Building tools. Investigating threats. Engineering security.",
    bio: [
      "I am a Computer Science student at VIT-AP University specializing in Cybersecurity. My work focuses on building practical security tools, investigating malicious network traffic, threat intelligence automation, and application security hardening.",
      "Rather than relying on abstract theories, I build hands-on offensive instrumentation and defensive triage pipelines—from offline PCAP malware analysis in NetTrace to RFC 1918-safe OSINT enrichment in ThreatLens and architectural rule validation in toposec.",
      "With hands-on experience in API hardening and CI/CD security at Vectr, I bridge the gap between how systems are built and how adversaries attempt to exploit them."
    ],
    quickStats: [
      { label: "SECURITY TOOLS", value: "5+ Built" },
      { label: "OFFLINE TESTS", value: "100+ Passing" },
      { label: "COMMUNITY USERS", value: "2,000+ Plugin" },
      { label: "SPECIALIZATION", value: "B.Tech Cyber" },
    ],
  },

  projects: [
    {
      id: "nettrace",
      identifier: "SEC-01 // PCAP FORENSICS",
      title: "NetTrace",
      subtitle: "Malware Traffic & Network Threat Hunting Pipeline",
      category: "Network Forensics & Threat Hunting",
      categoryTag: "NETWORK_SEC",
      description:
        "A repeatable, evidence-grounded investigative pipeline for dissecting malware network traffic in packet captures (PCAPs). Automates SHA-256 header validation, L4 5-tuple flow indexing, DNS/HTTP/TLS SNI extraction, Suricata offline rule evaluation, and unified UTC timeline generation mapped to MITRE ATT&CK.",
      technologies: [
        "Python 3.10+",
        "Wireshark / TShark",
        "Suricata IDS",
        "Zeek",
        "MITRE ATT&CK",
        "Pydantic",
        "Pytest",
      ],
      githubUrl: "https://github.com/ayus1n9/NetTrace",
      status: "v1.0.0 Stable / Documented",
      problem:
        "SOC analysts often face fragmented PCAP files and ad-hoc filtering when evaluating malware infections. NetTrace ensures strict forensic chain of custody, offline safety with zero live execution hazards, and automated indicator defanging.",
      architecture:
        "PCAP Intake -> SHA-256 Checksum -> L4 / DNS / TLS Dissection -> Candidate Defanging -> Suricata Offline Alerts -> ATT&CK Mapping -> Markdown SOC Incident Report",
      cliCommand: "nettrace report capture.pcap --case-id PCAP-2026-001 --output-dir cases/example/",
      keyHighlights: [
        "Strictly offline analysis guaranteeing zero network connection to live C2 infrastructure",
        "Cryptographic evidence immutability verifying capture headers and SHA-256 signatures",
        "Automated IOC defanging (e.g. 1.1.1[.]1, evil[.]com, hxxps://) to prevent accidental execution",
        "Normalized UTC event correlation correlating DNS queries, TCP flows, and IDS alerts",
        "ATT&CK technique tagging with structured executive containment playbooks",
      ],
      featured: true,
      sampleOutput: `[INFO] Case Intake: Verifying capture.pcap (SHA-256: 4a2f8b... verified)
[INFO] Dissected 1,429 flows | Extracted 38 DNS queries | 14 TLS SNI handshakes
[ALERT] Suricata Rule Match: ET MALWARE RedLine Stealer C2 Checkin (SID: 2034912)
[REPORT] Generated incident-report.md with ATT&CK T1071.001 (Web Protocols)`,
    },
    {
      id: "threatlens",
      identifier: "SEC-02 // THREAT INTEL",
      title: "ThreatLens",
      subtitle: "Automated SOC Threat Intelligence & IOC Enrichment",
      category: "Threat Intelligence & SOC Automation",
      categoryTag: "THREAT_INTEL",
      description:
        "Automated threat intelligence enrichment tool built in Python. Ingests suspicious IOCs (IPv4, IPv6, MD5, SHA-1, SHA-256), enriches them across VirusTotal v3 and AbuseIPDB v2, normalizes multi-source evidence, and generates transparent, audit-ready triage assessments for SOC analysts.",
      technologies: [
        "Python",
        "VirusTotal v3 API",
        "AbuseIPDB v2 API",
        "SQLite Caching",
        "Pydantic",
        "Pytest (60 Tests)",
      ],
      githubUrl: "https://github.com/ayus1n9/ThreatLens",
      status: "Active Tool / 60 Tests Passed",
      problem:
        "Analysts querying public threat APIs risk leaking internal infrastructure while dealing with alert fatigue. ThreatLens enforces strict RFC 1918 pre-flight blocking, local TTL caching, and multi-source consensus scoring.",
      architecture:
        "Analyst Input -> RFC 1918 Validation -> SQLite TTL Cache -> VirusTotal & AbuseIPDB APIs -> Normalized Multi-Source Consensus -> Terminal / JSON / CSV / Webhook Alert",
      cliCommand: "soc-intel enrich --ip 1.1.1.1 --format json --output reports/triage.json",
      keyHighlights: [
        "Internal topology leak prevention blocking RFC 1918, loopback, and private IPs before query",
        "'Absence of evidence is not evidence of safety' heuristic to avoid novel threat false negatives",
        "Persistent SQLite caching with configurable TTL to prevent API quota depletion",
        "Resilient to external API rate limits (HTTP 429) and outages (HTTP 500) via graceful degradation",
        "Comprehensive 60-test automated test suite running 100% offline with respx API mocking",
      ],
      featured: true,
      sampleOutput: `[VALIDATOR] Scoping IP 185.220.101.5... Passed (Public Routable IPv4)
[CACHE] Miss: Querying VirusTotal v3 & AbuseIPDB v2...
[CONSENSUS] Malicious Engines: 42/72 | Abuse Confidence: 100% | Verdict: HIGH_RISK
[NOTICE] Caveat: Tor Exit Node observed in last 24h. Generating triage_report.json`,
    },
    {
      id: "toposec",
      identifier: "SEC-03 // ARCHITECTURE DEFENSE",
      title: "Network Topology Validator",
      subtitle: "Architectural Rule Violation & Segmentation Validator",
      category: "Network Security & DevSecOps",
      categoryTag: "NETWORK_SEC",
      description:
        "A Python security analysis package (published on PyPI as `toposec` and Docker) that parses and validates enterprise network architectures against 6 fundamental security rules. Detects exposed management interfaces, improper DMZ boundaries, and uninspected ingress vectors with a live simulation engine.",
      technologies: [
        "Python",
        "PyPI Package (toposec)",
        "Docker",
        "Bandit",
        "GitHub CodeQL",
        "CI/CD Workflows",
      ],
      githubUrl: "https://github.com/ayus1n9/network-topology-validator",
      status: "PyPI Package & Docker Image",
      problem:
        "Architectural flaws such as missing DMZ isolation or exposed administrative ports create trivial lateral movement paths for adversaries. toposec codifies network defenses as automated policy checks.",
      architecture:
        "Topology Graph Config -> Network Object Parsing -> 6 Rule Checker Engines -> Packet Traversal Simulator -> Compliance Report",
      cliCommand: "toposec validate --config topology.yaml --rules strict-pci",
      keyHighlights: [
        "6 core security validation rules enforcing strict perimeter and DMZ segmentation",
        "Live network packet simulator testing traversal routes and firewall inspection hops",
        "DevSecOps CI pipeline integrating Bandit Python SAST and GitHub CodeQL",
        "Multi-channel distribution as PyPI library and containerized Docker image",
      ],
      featured: true,
      sampleOutput: `[INFO] Parsing network graph: 14 subnets, 4 firewalls, 38 nodes...
[CHECK 1/6] DMZ Isolation Rule: PASS
[CHECK 2/6] Management Port Exposure (SSH/RDP): VIOLATION - Subnet 10.0.4.0/24 directly accessible
[SIMULATOR] Packet traversal path blocked at Core-FW-01
[RESULT] 5 Passed, 1 Violation. Score: 83.3% - Exit code 1`,
    },
    {
      id: "email-analyzer",
      identifier: "SEC-04 // PHISHING ANALYSIS",
      title: "Email & Phishing Analyzer",
      subtitle: "Header Spoofing & Malicious URL Defanger",
      category: "Application Security & Anti-Phishing",
      categoryTag: "APP_SEC",
      description:
        "Security-focused Python and Flask application that inspects raw `.eml` email files to detect phishing campaigns, spoofed sender domains, and malicious URLs. Checks SPF, DKIM, and DMARC alignment, traces hops via `Received` headers, and safely defangs IOCs.",
      technologies: [
        "Python",
        "Flask",
        "REST API",
        "OSINT",
        "MIME Parsing",
        "DevSecOps CI",
      ],
      githubUrl: "https://github.com/ayus1n9/Email-Analyzer",
      status: "CLI, REST API & Web Dashboard",
      problem:
        "Spear-phishing emails frequently use obfuscated redirect links and spoofed envelope headers that slip through legacy filters. This analyzer breaks down header hops and defangs dangerous URLs for safe analyst triage.",
      architecture:
        "EML Intake -> Header Dissection -> SPF/DKIM/DMARC Verification -> Hop IP Extraction -> URL Defanger -> Attachment MIME Verification -> Risk Score Matrix",
      cliCommand: "python3 email-analyzer.py -f sample.eml --defang --headers",
      keyHighlights: [
        "Evaluates SPF, DKIM, and DMARC alignment to detect display-name and domain spoofing",
        "Traces message hops backwards through Received headers to reveal originating IP",
        "Automated URL defanging (hxxps://, [.]) for safe evidence documentation",
        "Attachment inspection checking MIME types against file extensions to catch disguised payloads",
        "Multi-modal interface supporting interactive CLI, REST API endpoint, and web UI",
      ],
      featured: false,
      sampleOutput: `[EML PARSER] Subject: 'Urgent: Account Verification Required'
[AUTH] SPF: SoftFail | DKIM: None | DMARC: Fail (Domain Alignment Mismatch)
[HOP 1] Received from 194.26.29.112 (Autonomous System: AS49453)
[URLS] Defanged 3 suspicious links: hxxps://secure-verify-auth[.]xyz/login
[RISK] Composite Threat Score: 85/100 (HIGH RISK PHISHING)`,
    },
    {
      id: "security-monitor",
      identifier: "SEC-05 // RED/BLUE OPERATIONS",
      title: "Security-Monitor & Attack Lab",
      subtitle: "NIST-Aligned Firewall & Server Log Analyzer",
      category: "Security Operations & Detection Engineering",
      categoryTag: "BLUE_TEAM",
      description:
        "A blue-team firewall and server log analyzer aligned with NIST incident response frameworks. Evaluated in a virtualized lab environment running simulated attacks (credential dumping, brute-force, lateral movement) to map offensive techniques to Windows Sysmon and Wazuh detection rules.",
      technologies: [
        "Python",
        "Sysmon",
        "Wazuh SIEM",
        "MITRE ATT&CK",
        "VirtualBox / VMware",
        "Linux / Windows Event Logs",
      ],
      githubUrl: "https://github.com/ayus1n9/Security-Monitor",
      status: "Lab Validated / MITRE ATT&CK Mapped",
      problem:
        "Validating SOC detection alerts requires controlled, repeatable adversarial simulation. This project bridges offensive techniques with corresponding log telemetry to build reliable detections.",
      architecture:
        "Adversary Simulation -> Telemetry Generation -> Sysmon & Wazuh Rule Matching -> Security-Monitor CLI Parser -> NIST IR Documentation",
      cliCommand: "security-monitor analyze --logfile auth.log --rule-set nist-800-61",
      keyHighlights: [
        "Simulated credential dumping and brute-force attacks in virtualized testbed",
        "Mapped offensive techniques directly to MITRE ATT&CK framework",
        "Evaluated detection coverage across Windows Sysmon events and Wazuh rules",
        "Built CLI workflows with automated security tests and structured Markdown reports",
      ],
      featured: false,
      sampleOutput: `[INGEST] Reading 12,400 log lines from /var/log/auth.log...
[DETECTION] Brute-force threshold exceeded: 140 failed SSH logins from 45.142.122.9
[CORRELATION] Event matches MITRE ATT&CK T1110.001 (Password Guessing)
[NIST IR] Automated Incident Record generated: INC-2026-088.md`,
    },
    {
      id: "password-analyzer",
      identifier: "SEC-06 // CREDENTIAL DEFENSE",
      title: "Password Strength & Breach Analyzer",
      subtitle: "Entropy Modeling & Breach Resilience",
      category: "Defensive Security Tools",
      categoryTag: "APP_SEC",
      description:
        "An advanced password resilience evaluation tool built with Shannon entropy modeling, dictionary pattern detection, and breached database lookup simulations.",
      technologies: ["Python", "Cryptographic Hashing", "Entropy Modeling", "CLI UI"],
      githubUrl: "https://github.com/ayus1n9/Password-Analyzer",
      status: "Open Source",
      problem:
        "Simple character-count metrics give users a false sense of security against modern GPU-accelerated hashcat rule attacks. This tool evaluates true informational entropy.",
      architecture:
        "Candidate Input -> Entropy & Character Distribution -> Dictionary & Levenshtein Checks -> Breach Exposure Model -> Hardening Recommendations",
      cliCommand: "python3 password_analyzer.py --audit",
      keyHighlights: [
        "Shannon entropy modeling evaluating bit-strength against automated wordlist rules",
        "Detection of common leetspeak substitutions and keyboard sequence walks",
        "Zero cleartext exposure architecture with memory-scrubbing primitives",
      ],
      featured: false,
    },
  ] as Project[],

  skills: [
    {
      title: "OFFENSIVE SECURITY & VAPT",
      code: "RED-OPS",
      description: "Penetration testing methodologies, vulnerability discovery, and offensive tooling.",
      skills: [
        { name: "Metasploit Framework", level: "Practical Lab", context: "Payload generation, handler configurations, multi-stage delivery" },
        { name: "Burp Suite", level: "Core Competency", context: "Repeater workflows, Intruder attacks, proxy interception, web API testing" },
        { name: "Nmap", level: "Core Competency", context: "NSE scripting, service versioning, evasion techniques, banner grabbing" },
        { name: "Kali Linux", level: "Core Competency", context: "Primary offensive security evaluation and testing OS" },
        { name: "BloodHound & Mimikatz", level: "Practical Lab", context: "Active Directory attack path enumeration & credential harvesting lab tests" },
        { name: "OWASP Juice Shop / DVWA", level: "Practical Lab", context: "SQL injection, cross-site scripting (XSS), broken authentication labs" },
      ],
    },
    {
      title: "MALWARE ANALYSIS & FORENSICS",
      code: "FOR-MAL",
      description: "Investigating indicators of compromise, packet captures, and artifact preservation.",
      skills: [
        { name: "Wireshark & TShark", level: "Core Competency", context: "Deep packet inspection, flow dissection, malware traffic hunt (NetTrace)" },
        { name: "Suricata", level: "Core Competency", context: "Offline IDS rule evaluation, signature authoring, eve.json alert parsing" },
        { name: "Volatility", level: "Practical Lab", context: "Memory image acquisition, process injection detection, artifact extraction" },
        { name: "Autopsy", level: "Practical Lab", context: "Disk image examination, file system timeline reconstruction, carved files" },
        { name: "REMnux & Any.Run", level: "Practical Lab", context: "Isolated behavioral sandboxing, dynamic malware telemetry extraction" },
        { name: "PEStudio & Ghidra", level: "Familiar", context: "Static binary inspection, import table analysis, basic decompilation" },
      ],
    },
    {
      title: "PROGRAMMING & AUTOMATION",
      code: "DEV-SEC",
      description: "Custom security instrumentation, scripting, and pipeline hardening.",
      skills: [
        { name: "Python", level: "Core Competency", context: "Primary language: built NetTrace, ThreatLens, toposec, and CLI scanners" },
        { name: "Bash Scripting", level: "Core Competency", context: "Linux server automation, log parsing, reconnaissance scripting" },
        { name: "REST APIs & JSON", level: "Core Competency", context: "VirusTotal v3, AbuseIPDB v2, FastAPI integrations, custom endpoints" },
        { name: "SQL & SQLite", level: "Core Competency", context: "Database queries, persistent threat cache design, event filtering" },
        { name: "JavaScript / TypeScript", level: "Practical Lab", context: "Frontend development, web API integration, secure UI implementations" },
        { name: "C / C++ & Java", level: "Familiar", context: "Academic computer science foundations, memory management understanding" },
      ],
    },
    {
      title: "SYSTEMS, SOC & INFRASTRUCTURE",
      code: "SYS-SOC",
      description: "Operating systems defense, containerization, and enterprise logging.",
      skills: [
        { name: "Linux Administration", level: "Core Competency", context: "Debian, Ubuntu, Kali, file permissions, daemon hardening" },
        { name: "Windows Event Logs & Sysmon", level: "Practical Lab", context: "Event ID correlation, Sysmon XML rules, MITRE ATT&CK mapping" },
        { name: "Wazuh SIEM", level: "Practical Lab", context: "Agent telemetry, rule customization, alert triage in attack lab" },
        { name: "Docker", level: "Core Competency", context: "Containerized deployment for toposec, sandboxed service isolation" },
        { name: "Git / GitHub & CI/CD", level: "Core Competency", context: "Version control, automated security testing, Bandit & CodeQL pipelines" },
        { name: "VirtualBox / VMware", level: "Core Competency", context: "Virtualized threat hunting and attack simulation labs" },
      ],
    },
  ] as SkillCategory[],

  ctfPlatforms: [
    { platform: "Hack The Box", scope: "Active Directory & Pro Labs", type: "Offensive Security" },
    { platform: "TryHackMe", scope: "Offensive Pentesting Learning Path", type: "Penetration Testing" },
    { platform: "PortSwigger Web Security Academy", scope: "OWASP Top 10 Web Exploitation Labs", type: "Web Security" },
    { platform: "VulnHub", scope: "Kioptrix, MRobot Box Exploitations", type: "Host Pentesting" },
    { platform: "OverTheWire", scope: "Bandit Linux Wargames & Privilege Escalation", type: "Linux Internals" },
  ],

  experience: [
    {
      role: "Web Developer – Application Security & API Hardening",
      company: "Vectr",
      location: "Hyderabad, Telangana",
      period: "Sept. 2023 – Jan. 2026",
      summary:
        "Bridged software development and application security by conducting vulnerability assessments on REST APIs, integrating secure code review into CI/CD pipelines, and maintaining production software.",
      bullets: [
        "Conducted vulnerability assessments on FastAPI and Docker-based REST APIs, implementing security controls to mitigate OWASP Top 10 risks (injection, broken authentication, improper access controls) prior to deployment.",
        "Hardened Git-based CI/CD pipelines by integrating secure code review practices, proactively identifying and remediating application-level security flaws to prevent potential exploitation.",
        "Maintained and secured a production community plugin with 2,000+ active downloads, performing continuous threat modeling and applying security patches to ensure safe usage for a global user base.",
      ],
    },
  ],

  education: [
    {
      institution: "VIT-AP University",
      degree: "B.Tech in Computer Science Engineering – Cybersecurity Specialization",
      location: "Amaravati, India",
      period: "2023 – 2027",
      coursework: [
        "Network Security",
        "Operating Systems",
        "Data Structures and Algorithms",
        "DBMS",
        "Software Engineering",
      ],
      details:
        "Actively developing offensive security lab skills and maintaining GitHub projects involving Python scripting, custom attack simulations, and vulnerability assessment.",
    },
  ],

  certifications: [
    { title: "Cisco Introduction to Cybersecurity", issuer: "Cisco Networking Academy", year: "Certified" },
    { title: "NPTEL Cybersecurity", issuer: "NPTEL / National Programme on Technology Enhanced Learning", year: "Certified" },
  ],

  leadership: [
    {
      title: "Founding Partner & Treasurer",
      organization: "Entrepreneurship Club, VIT-AP",
      details: "Supported club operations, budgeting, sponsorship, and technical event coordination.",
    },
    {
      title: "Co-Founder",
      organization: "VITAURA Technical Fest",
      details: "Contributed to technical event planning, team coordination, and student outreach across technical tracks.",
    },
  ],
};
