"use client";

import React, { useState, useEffect } from "react";

interface VisitorInfo {
  ip: string;
  dns: string;
  isp: string;
  loaded: boolean;
}

export default function VisitorTelemetry() {
  const [info, setInfo] = useState<VisitorInfo>({
    ip: "FETCHING...",
    dns: "RESOLVING...",
    isp: "DETECTING...",
    loaded: false,
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchVisitorIntelligence() {
      try {
        // Direct live client-side fetch from the visiting client's browser
        const res = await fetch("https://ipwho.is/", {
          signal: AbortSignal.timeout(4000),
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.success !== false) {
            const detectedIp = data.ip || "UNKNOWN";
            const detectedDns = data.connection?.domain || "1.1.1.1";
            const detectedIsp = data.connection?.isp || data.connection?.org || "DIRECT_CARRIER";

            if (isMounted) {
              setInfo({
                ip: detectedIp,
                dns: detectedDns,
                isp: detectedIsp,
                loaded: true,
              });
              return;
            }
          }
        }
      } catch {
        // Fallback if primary timed out
      }

      try {
        const ipRes = await fetch("https://api.ipify.org?format=json", {
          signal: AbortSignal.timeout(3000),
        });
        if (ipRes.ok) {
          const ipData = await ipRes.json();
          if (isMounted && ipData?.ip) {
            setInfo({
              ip: ipData.ip,
              dns: "1.1.1.1",
              isp: "GATEWAY",
              loaded: true,
            });
            return;
          }
        }
      } catch {
        // Fallback default
      }

      if (isMounted) {
        setInfo({
          ip: "127.0.0.1",
          dns: "1.1.1.1",
          isp: "LOCAL_HOST",
          loaded: true,
        });
      }
    }

    fetchVisitorIntelligence();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-3 sm:gap-x-4 gap-y-1.5 font-mono text-[11px] text-cyber-dim select-none max-w-full text-center md:text-right">
      <span className="flex items-center gap-1.5">
        <span className={`w-1.5 h-1.5 rounded-full bg-cyber-green ${info.loaded ? "animate-pulse" : "animate-ping"}`} />
        <span className="text-cyber-green font-bold">IP:</span>
        <span className="text-white font-medium select-all">{info.ip}</span>
      </span>

      <span className="text-cyber-border">•</span>

      <span className="flex items-center gap-1.5">
        <span className="text-cyber-cyan font-bold">DNS:</span>
        <span className="text-white font-medium">{info.dns}</span>
      </span>

      <span className="text-cyber-border">•</span>

      <span className="flex items-center gap-1.5">
        <span className="text-cyber-yellow font-bold">ISP:</span>
        <span className="text-white font-medium truncate max-w-[220px]" title={info.isp}>
          {info.isp}
        </span>
      </span>
    </div>
  );
}
