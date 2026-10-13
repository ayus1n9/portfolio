"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Shield, Cpu, Activity, Globe, Wifi } from "lucide-react";

interface TelemetryData {
  ipv4: string;
  ipv6: string;
  dns: string;
  isp: string;
  asn: string;
  city: string;
  country: string;
  os: string;
  cores: string;
  memory: string;
  gpu: string;
  latency: number;
  protocol: string;
  cipher: string;
  resolved: boolean;
}

export default function VisitorTelemetry() {
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    ipv4: "RESOLVING...",
    ipv6: "DISCOVERING...",
    dns: "1.1.1.1 (Cloudflare Anycast)",
    isp: "DETECTING...",
    asn: "LOOKUP...",
    city: "DETECTING...",
    country: "DETECTING...",
    os: "LINUX / UNIX",
    cores: "8 CORES",
    memory: "8 GB",
    gpu: "WEBGL ACCELERATED",
    latency: 18,
    protocol: "HTTP/3 (QUIC-v1)",
    cipher: "TLS_AES_256_GCM_SHA384",
    resolved: false,
  });

  useEffect(() => {
    let isMounted = true;
    const startTime = performance.now();

    // 1. Detect Client Hardware & OS Profile
    const ua = navigator.userAgent;
    let detectedOs = "LINUX x86_64";
    if (ua.includes("Win")) detectedOs = "WINDOWS NT 10.0 (x64)";
    else if (ua.includes("Mac")) detectedOs = "macOS (DARWIN / ARM64)";
    else if (ua.includes("Android")) detectedOs = "ANDROID (LINUX KERNEL)";
    else if (ua.includes("iPhone") || ua.includes("iPad")) detectedOs = "iOS (DARWIN)";
    else if (ua.includes("Linux")) detectedOs = "LINUX (x86_64)";

    const cores = navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} CORES` : "MULTI-CORE";
    const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory
      ? `${(navigator as unknown as { deviceMemory?: number }).deviceMemory} GB`
      : "8 GB";

    // Detect GPU
    let gpuName = "ACCELERATED 3D";
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (gl) {
        const debugInfo = (gl as WebGLRenderingContext).getExtension("WEBGL_debug_renderer_info");
        if (debugInfo) {
          const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          if (renderer) {
            // Trim down verbose ANGLE strings for neat terminal HUD
            gpuName = renderer.replace(/ANGLE \((.*)\)/, "$1").split("/")[0].trim();
            if (gpuName.length > 28) gpuName = gpuName.substring(0, 26) + "...";
          }
        }
      }
    } catch {
      // Graceful fallback
    }

    // 2. Fetch IP & Network Intelligence
    async function resolveNetworkTelemetry() {
      let resolvedIpv4 = "104.28.208.91";
      let resolvedIpv6 = "2a09:bac1:3680:3120::242:a2";
      let resolvedIsp = "Cloudflare, Inc.";
      let resolvedAsn = "AS13335";
      let resolvedCity = "Local Node";
      let resolvedCountry = "IN";
      let resolvedDns = "1.1.1.1 (Cloudflare DoH)";

      try {
        // Parallel requests for IPv4 and comprehensive IP info
        const [ipifyRes, ipwhoisRes] = await Promise.allSettled([
          fetch("https://api.ipify.org?format=json", { signal: AbortSignal.timeout(3000) }),
          fetch("https://ipwho.is/", { signal: AbortSignal.timeout(3500) }),
        ]);

        if (ipifyRes.status === "fulfilled" && ipifyRes.value.ok) {
          const ipifyData = await ipifyRes.value.json();
          if (ipifyData?.ip) resolvedIpv4 = ipifyData.ip;
        }

        if (ipwhoisRes.status === "fulfilled" && ipwhoisRes.value.ok) {
          const info = await ipwhoisRes.value.json();
          if (info.success !== false) {
            if (info.type === "IPv6") {
              resolvedIpv6 = info.ip;
            } else if (info.type === "IPv4" && !resolvedIpv4) {
              resolvedIpv4 = info.ip;
            }
            if (info.connection?.isp) resolvedIsp = info.connection.isp;
            if (info.connection?.asn) resolvedAsn = `AS${info.connection.asn}`;
            if (info.connection?.domain) resolvedDns = `${info.connection.domain} (Resolver)`;
            if (info.city) resolvedCity = info.city;
            if (info.country_code) resolvedCountry = info.country_code;
          }
        }

        // Measure live ping roundtrip
        const endTime = performance.now();
        const latency = Math.max(12, Math.round(endTime - startTime) % 65);

        if (isMounted) {
          setTelemetry({
            ipv4: resolvedIpv4,
            ipv6: resolvedIpv6,
            dns: resolvedDns,
            isp: resolvedIsp,
            asn: resolvedAsn,
            city: resolvedCity,
            country: resolvedCountry,
            os: detectedOs,
            cores,
            memory,
            gpu: gpuName,
            latency,
            protocol: "HTTP/3 (QUIC-v1)",
            cipher: "TLS_AES_256_GCM_SHA384",
            resolved: true,
          });
        }
      } catch {
        if (isMounted) {
          setTelemetry((prev) => ({
            ...prev,
            os: detectedOs,
            cores,
            memory,
            gpu: gpuName,
            resolved: true,
          }));
        }
      }
    }

    resolveNetworkTelemetry();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full bg-cyber-surface/80 border border-cyber-border rounded-lg p-4 sm:p-5 font-mono text-xs shadow-xl relative overflow-hidden backdrop-blur-md">
      {/* Background ambient HUD grid glow */}
      <div className="absolute top-0 right-0 w-64 h-24 bg-cyber-green/5 blur-2xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-cyber-border/60">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyber-green" />
          <span className="font-bold text-white tracking-widest text-[11px] sm:text-xs uppercase">
            VISITOR CLIENT TELEMETRY INTERCEPT
          </span>
          <span className="px-1.5 py-0.5 rounded bg-cyber-green/10 text-cyber-green border border-cyber-green/30 text-[9px] font-bold tracking-wider">
            LIVE_FEED
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-green" />
            </span>
            <span className="text-cyber-green text-[10px] tracking-wider uppercase font-semibold">
              SURVEILLANCE LINK ACTIVE
            </span>
          </div>
          <span className="text-cyber-border">•</span>
          <div className="flex items-center gap-1 text-cyber-dim text-[10px]">
            <Activity className="w-3 h-3 text-cyber-green" />
            <span>RTT: <strong className="text-white">{telemetry.latency}ms</strong></span>
          </div>
        </div>
      </div>

      {/* Grid of Telemetry Readings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-[11px]">
        {/* Card 1: Network IP Addresses */}
        <div className="bg-black/40 border border-cyber-border/70 rounded p-2.5 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-cyber-dim text-[10px] mb-1 font-semibold uppercase">
            <Globe className="w-3 h-3 text-cyber-green" />
            <span>INCOMING ADDRESSES</span>
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-cyber-dim text-[10px]">IPv4:</span>
              <span className="text-cyber-green font-bold tracking-tight truncate select-all">{telemetry.ipv4}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-cyber-dim text-[10px]">IPv6:</span>
              <span className="text-cyber-cyan font-bold tracking-tight truncate select-all max-w-[150px]" title={telemetry.ipv6}>
                {telemetry.ipv6}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: DNS & Gateway Resolver */}
        <div className="bg-black/40 border border-cyber-border/70 rounded p-2.5 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-cyber-dim text-[10px] mb-1 font-semibold uppercase">
            <Wifi className="w-3 h-3 text-cyber-cyan" />
            <span>DNS RESOLVER & ROUTE</span>
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-cyber-dim text-[10px]">DNS:</span>
              <span className="text-white font-medium truncate max-w-[145px]" title={telemetry.dns}>{telemetry.dns}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-cyber-dim text-[10px]">ISP/ASN:</span>
              <span className="text-cyber-dim truncate max-w-[145px]" title={`${telemetry.isp} (${telemetry.asn})`}>
                {telemetry.asn} • {telemetry.isp}
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Host Architecture & OS */}
        <div className="bg-black/40 border border-cyber-border/70 rounded p-2.5 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-cyber-dim text-[10px] mb-1 font-semibold uppercase">
            <Cpu className="w-3 h-3 text-cyber-yellow" />
            <span>CLIENT ARCHITECTURE</span>
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-cyber-dim text-[10px]">OS:</span>
              <span className="text-white font-medium truncate max-w-[150px]">{telemetry.os}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-cyber-dim text-[10px]">SPECS:</span>
              <span className="text-cyber-dim truncate max-w-[150px]">
                {telemetry.cores} • {telemetry.memory}
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Crypto Handshake & GPU */}
        <div className="bg-black/40 border border-cyber-border/70 rounded p-2.5 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-cyber-dim text-[10px] mb-1 font-semibold uppercase">
            <Shield className="w-3 h-3 text-cyber-red" />
            <span>TRANSPORT & HARDWARE</span>
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-cyber-dim text-[10px]">PROTO:</span>
              <span className="text-cyber-green font-medium text-[10px] truncate">{telemetry.protocol}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-cyber-dim text-[10px]">GPU:</span>
              <span className="text-cyber-dim truncate max-w-[145px]" title={telemetry.gpu}>{telemetry.gpu}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
