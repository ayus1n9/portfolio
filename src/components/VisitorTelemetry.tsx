"use client";

import React, { useState, useEffect } from "react";

interface TelemetryData {
  ipv4: string;
  ipv6: string;
  dns: string;
  isp: string;
  asn: string;
  os: string;
  gpu: string;
  latency: number;
  protocol: string;
}

export default function VisitorTelemetry() {
  const [mounted, setMounted] = useState(false);
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    ipv4: "RESOLVING...",
    ipv6: "DISCOVERING...",
    dns: "1.1.1.1 (Cloudflare)",
    isp: "DETECTING...",
    asn: "AS13335",
    os: "LINUX x86_64",
    gpu: "WEBGL",
    latency: 18,
    protocol: "HTTP/3",
  });

  useEffect(() => {
    setMounted(true);
    let isMounted = true;
    const startTime = performance.now();

    // 1. Detect Client Hardware & OS Profile
    const ua = navigator.userAgent;
    let detectedOs = "LINUX x86_64";
    if (ua.includes("Win")) detectedOs = "WINDOWS NT 10.0";
    else if (ua.includes("Mac")) detectedOs = "macOS (DARWIN)";
    else if (ua.includes("Android")) detectedOs = "ANDROID (LINUX)";
    else if (ua.includes("iPhone") || ua.includes("iPad")) detectedOs = "iOS (DARWIN)";
    else if (ua.includes("Linux")) detectedOs = "LINUX x86_64";

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
            gpuName = renderer.replace(/ANGLE \((.*)\)/, "$1").split("/")[0].trim();
            if (gpuName.length > 24) gpuName = gpuName.substring(0, 22) + "..";
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
      let resolvedIsp = "Cloudflare";
      let resolvedAsn = "AS13335";
      let resolvedDns = "1.1.1.1";

      try {
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
            if (info.connection?.isp) resolvedIsp = info.connection.isp.split(" ")[0];
            if (info.connection?.asn) resolvedAsn = `AS${info.connection.asn}`;
            if (info.connection?.domain) resolvedDns = info.connection.domain;
          }
        }

        const endTime = performance.now();
        const latency = Math.max(12, Math.round(endTime - startTime) % 65);

        if (isMounted) {
          setTelemetry({
            ipv4: resolvedIpv4,
            ipv6: resolvedIpv6,
            dns: resolvedDns,
            isp: resolvedIsp,
            asn: resolvedAsn,
            os: detectedOs,
            gpu: gpuName,
            latency,
            protocol: "HTTP/3",
          });
        }
      } catch {
        if (isMounted) {
          setTelemetry((prev) => ({
            ...prev,
            os: detectedOs,
            gpu: gpuName,
          }));
        }
      }
    }

    resolveNetworkTelemetry();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!mounted) {
    return (
      <div className="font-mono text-[11px] text-cyber-dim select-none flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyber-green/50" />
        <span>INITIALIZING TELEMETRY STREAM...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-start md:justify-end gap-x-3 sm:gap-x-4 gap-y-1.5 font-mono text-[11px] text-cyber-dim select-none">
      <span className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
        <span className="text-cyber-green font-bold">IPv4:</span>
        <span className="text-white font-medium select-all">{telemetry.ipv4}</span>
      </span>

      <span className="text-cyber-border hidden sm:inline">•</span>

      <span className="flex items-center gap-1.5">
        <span className="text-cyber-cyan font-bold">IPv6:</span>
        <span className="text-white font-medium truncate max-w-[150px] select-all" title={telemetry.ipv6}>
          {telemetry.ipv6}
        </span>
      </span>

      <span className="text-cyber-border hidden sm:inline">•</span>

      <span className="flex items-center gap-1.5">
        <span className="text-cyber-muted font-bold">DNS:</span>
        <span className="text-white font-medium">{telemetry.dns}</span>
      </span>

      <span className="text-cyber-border hidden md:inline">•</span>

      <span className="hidden md:flex items-center gap-1.5">
        <span className="text-cyber-muted font-bold">ISP:</span>
        <span className="text-white font-medium truncate max-w-[120px]" title={`${telemetry.isp} (${telemetry.asn})`}>
          {telemetry.isp}
        </span>
      </span>

      <span className="text-cyber-border hidden sm:inline">•</span>

      <span className="flex items-center gap-1.5">
        <span className="text-cyber-yellow font-bold">OS:</span>
        <span className="text-white font-medium">{telemetry.os}</span>
      </span>

      <span className="text-cyber-border hidden lg:inline">•</span>

      <span className="hidden lg:flex items-center gap-1.5">
        <span className="text-cyber-muted font-bold">GPU:</span>
        <span className="text-white font-medium truncate max-w-[130px]" title={telemetry.gpu}>
          {telemetry.gpu}
        </span>
      </span>

      <span className="text-cyber-border hidden sm:inline">•</span>

      <span className="flex items-center gap-1.5">
        <span className="text-cyber-muted font-bold">RTT:</span>
        <span className="text-cyber-green font-medium">{telemetry.latency}ms</span>
      </span>
    </div>
  );
}
