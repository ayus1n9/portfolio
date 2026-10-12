import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ayush Singh (ayus1n9) | Cybersecurity Researcher & Toolmaker",
  description:
    "Cybersecurity researcher and toolmaker specializing in Red Teaming, VAPT, SOC threat intelligence automation, and network threat forensics. Creator of NetTrace, ThreatLens, and toposec.",
  keywords: [
    "Ayush Singh",
    "ayus1n9",
    "Cybersecurity",
    "Red Teaming",
    "VAPT",
    "NetTrace",
    "ThreatLens",
    "toposec",
    "Network Forensics",
    "Threat Hunting",
    "SOC Analyst",
    "Application Security",
  ],
  authors: [{ name: "Ayush Singh", url: "https://github.com/ayus1n9" }],
  openGraph: {
    title: "Ayush Singh (ayus1n9) | Cybersecurity Portfolio & Lab",
    description:
      "Building practical security tools. Investigating network threats. Engineering defensive and offensive architectures.",
    url: "https://github.com/ayus1n9",
    siteName: "Ayush Singh Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛡️</text></svg>" />
      </head>
      <body className="bg-cyber-bg text-cyber-text antialiased selection:bg-cyber-green selection:text-cyber-bg min-h-screen">
        <div className="scanlines-ambient" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
