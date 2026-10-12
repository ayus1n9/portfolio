export interface MediaCard {
  id: string;
  outlet: string;
  accentColor: string; // for top border highlight
  bannerType: "wordmark" | "image";
  bannerWordmark?: {
    text: string;
    fontFamily: string;
    color: string;
    glow: string;
    bgGradient: string;
  };
  bannerImage?: {
    src: string;
    alt: string;
    overlayLabel: string;
  };
  badges: string[]; // e.g. ["TIME", "FEATURE"], ["BBC", "VIDEO"]
  title: string;
  actionText: "READ →" | "WATCH →";
  url: string;
  dateStr: string;
  summary: string;
}

// Master pool of media news stories for daily rotation
export const MEDIA_STORIES_POOL = [
  // TIME
  {
    outlet: "TIME",
    accentColor: "#ef4444",
    bannerType: "wordmark" as const,
    bannerWordmark: {
      text: "TIME",
      fontFamily: "font-serif tracking-widest text-3xl font-bold",
      color: "#ef4444",
      glow: "0 0 25px rgba(239, 68, 68, 0.65), 0 0 50px rgba(239, 68, 68, 0.35)",
      bgGradient: "linear-gradient(135deg, #180909 0%, #2b0d0d 50%, #0d0404 100%)",
    },
    badges: ["TIME", "FEATURE"],
    title: "Pliny the Liberator — TIME100 AI 2025",
    actionText: "READ →" as const,
    url: "https://time.com/",
    summary: "How adversarial curiosity and borderless red teaming propelled frontier model jailbreakers into the global AI spotlight.",
  },
  // BBC
  {
    outlet: "BBC",
    accentColor: "#61e7ff",
    bannerType: "image" as const,
    bannerImage: {
      src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      alt: "Cybersecurity broadcast telemetry",
      overlayLabel: "BBC",
    },
    badges: ["BBC", "VIDEO"],
    title: "AI Decoded: The World's Most Prolific AI Jailbreaker",
    actionText: "WATCH →" as const,
    url: "https://www.bbc.com/news/technology",
    summary: "BBC Technology investigates how researchers and adversarial prompters navigate bug bounties and defense systems in a fast-moving AI landscape.",
  },
  // DECRYPT
  {
    outlet: "DECRYPT",
    accentColor: "#8b5cf6",
    bannerType: "wordmark" as const,
    bannerWordmark: {
      text: "DECRYPT",
      fontFamily: "font-mono font-black tracking-widest text-2xl",
      color: "#a78bfa",
      glow: "0 0 25px rgba(139, 92, 246, 0.7), 0 0 45px rgba(139, 92, 246, 0.4)",
      bgGradient: "linear-gradient(135deg, #0f0a1c 0%, #1e1138 50%, #0a0714 100%)",
    },
    badges: ["ARTICLE"],
    title: "AI Jailbreaker Pliny: Banned, Then Celebrated by Tech Giants",
    actionText: "READ →" as const,
    url: "https://decrypt.co/",
    summary: "From shadow Discord servers to global keynote stages: the untold story of unlocking frontier language models through pure adversarial logic.",
  },
  // BT6 / BLACK HAT
  {
    outlet: "BT6",
    accentColor: "#ef4444",
    bannerType: "image" as const,
    bannerImage: {
      src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
      alt: "Black Hat conference presentation stage",
      overlayLabel: "BT6",
    },
    badges: ["BT6", "BLACK HAT"],
    title: "Kinetic Prompt Injection: Agent Compromise With a Physical Blast Radius",
    actionText: "WATCH →" as const,
    url: "https://www.blackhat.com/",
    summary: "Demonstrating how multi-modal vision and actuator agents can be coerced into unsafe physical movements via steganographic audio and optical patterns.",
  },
  // REUTERS
  {
    outlet: "REUTERS",
    accentColor: "#f97316",
    bannerType: "wordmark" as const,
    bannerWordmark: {
      text: "REUTERS",
      fontFamily: "font-sans font-black tracking-wider text-2xl",
      color: "#fb923c",
      glow: "0 0 20px rgba(249, 115, 22, 0.65), 0 0 40px rgba(249, 115, 22, 0.3)",
      bgGradient: "linear-gradient(135deg, #180d04 0%, #2f1705 50%, #0d0602 100%)",
    },
    badges: ["REUTERS", "INVESTIGATION"],
    title: "Global Critical Infrastructure Targeted in Living-Off-the-Land Cyber Campaigns",
    actionText: "READ →" as const,
    url: "https://www.reuters.com/technology/cybersecurity/",
    summary: "Government agencies warn that state-sponsored actors are maintaining multi-year stealth access into power grids without dropping executable malware.",
  },
  // WIRED
  {
    outlet: "WIRED",
    accentColor: "#ffb000",
    bannerType: "wordmark" as const,
    bannerWordmark: {
      text: "WIRED",
      fontFamily: "font-mono font-black tracking-widest text-3xl",
      color: "#ffb000",
      glow: "0 0 25px rgba(255, 176, 0, 0.7), 0 0 45px rgba(255, 176, 0, 0.35)",
      bgGradient: "linear-gradient(135deg, #140d04 0%, #241607 50%, #0d0802 100%)",
    },
    badges: ["WIRED", "THREAT LEVEL"],
    title: "Microarchitectural Ghosts: Why Modern CPU Speculative Branches Refuse to Stay Closed",
    actionText: "READ →" as const,
    url: "https://www.wired.com/category/threat-level/",
    summary: "Hardware researchers expose cross-tenant microcode leaks that allow unprivileged containers to read raw cryptographic keys across virtual boundaries.",
  },
  // BLEEPINGCOMPUTER
  {
    outlet: "BLEEPING",
    accentColor: "#38bdf8",
    bannerType: "wordmark" as const,
    bannerWordmark: {
      text: "BLEEPINGCOMPUTER",
      fontFamily: "font-mono font-bold tracking-normal text-lg",
      color: "#38bdf8",
      glow: "0 0 20px rgba(56, 189, 248, 0.65), 0 0 40px rgba(56, 189, 248, 0.3)",
      bgGradient: "linear-gradient(135deg, #05141e 0%, #0a2538 50%, #030d14 100%)",
    },
    badges: ["BLEEPING", "RANSOMWARE"],
    title: "Ransomware Cartels Standardize on Hypervisor ESXi ELF Payloads to Evade EDR",
    actionText: "READ →" as const,
    url: "https://www.bleepingcomputer.com/",
    summary: "Threat groups bypass traditional Windows endpoint sensors by running directly on bare-metal virtualization layers to rapidly encrypt shared storage volumes.",
  },
  // CISA
  {
    outlet: "CISA",
    accentColor: "#facc15",
    bannerType: "image" as const,
    bannerImage: {
      src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      alt: "CISA cyber defense operations radar",
      overlayLabel: "CISA",
    },
    badges: ["CISA", "DIRECTIVE"],
    title: "CISA Issues Binding Operational Directive on Edge VPN Appliance Zero-Days",
    actionText: "READ →" as const,
    url: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
    summary: "Civilian executive agencies ordered to isolate or patch remote code execution vulnerabilities exploited within 48 hours of public advisory.",
  },
];

/**
 * Returns daily rotating media cards based on the calendar day.
 * Rotates every 24 hours at 00:00 UTC / Local time so the news updates once a day.
 */
export function getDailyMediaNews(targetDate: Date = new Date()): {
  cards: MediaCard[];
  dayKey: string;
  lastUpdatedFormatted: string;
} {
  const yyyy = targetDate.getFullYear();
  const mm = String(targetDate.getMonth() + 1).padStart(2, "0");
  const dd = String(targetDate.getDate()).padStart(2, "0");
  const dayKey = `${yyyy}-${mm}-${dd}`;

  // Deterministic daily seed based on Julian day or day of the year
  const startOfYear = new Date(targetDate.getFullYear(), 0, 0);
  const diff = targetDate.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  const total = MEDIA_STORIES_POOL.length;
  const cards: MediaCard[] = [];

  // Rotate order each day so the leading card changes every 24 hours
  for (let i = 0; i < total; i++) {
    const poolIndex = (dayOfYear + i) % total;
    const item = MEDIA_STORIES_POOL[poolIndex];
    cards.push({
      id: `media-${dayKey}-${item.outlet.toLowerCase()}-${i}`,
      outlet: item.outlet,
      accentColor: item.accentColor,
      bannerType: item.bannerType,
      bannerWordmark: item.bannerWordmark,
      bannerImage: item.bannerImage,
      badges: item.badges,
      title: item.title,
      actionText: item.actionText,
      url: item.url,
      dateStr: dayKey,
      summary: item.summary,
    });
  }

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const formattedDate = `${monthNames[targetDate.getMonth()]} ${targetDate.getDate()}, ${targetDate.getFullYear()}`;

  return {
    cards,
    dayKey,
    lastUpdatedFormatted: formattedDate,
  };
}
