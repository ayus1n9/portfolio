import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ayush Singh | Cybersecurity Researcher & Toolmaker",
  description:
    "Cybersecurity researcher and toolmaker specializing in Red Teaming, VAPT, SOC threat intelligence automation, and network threat forensics.",
  keywords: [
    "Cybersecurity",
    "Pentesting",
    "Cloud Security",
    "DevSecOps",
    "Red Teaming",
    "VAPT",
    "Network Forensics",
    "Threat Hunting",
    "SOC Analyst",
    "Application Security",
  ],
  authors: [{ name: "Ayush Singh", url: "https://github.com/ayus1n9" }],
  openGraph: {
    title: "Ayush Singh | Cybersecurity Portfolio",
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
      <head />
      <body className="bg-cyber-bg text-cyber-text antialiased selection:bg-cyber-green selection:text-cyber-bg min-h-screen">
        <div className="scanlines-ambient" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
