"use client";

import { useEffect, useRef, useState } from "react";

interface TrailPoint {
  x: number;
  y: number;
  opacity: number;
  size: number;
  color: string;
}

export default function GlitchCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Position references to bypass React re-renders on every mouse move
  const mousePos = useRef({ x: -100, y: -100 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  // Glitch trails state
  const trailsRef = useRef<TrailPoint[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Only activate for devices with an actual mouse / pointer
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    let animId: number;
    let frameCount = 0;
    const glitchLabels = ["ERR::0x7F", "SYS//FAIL", "VRAM_LEAK", "CORRUPT", "0x000000", "FAULT::IO"];
    let currentLabel = glitchLabels[0];

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      // Add to glitch trails periodically
      if (frameCount % 3 === 0) {
        const colors = ["#4dff88", "#00f0ff", "#ff0055", "#ffffff"];
        const chosenColor = colors[Math.floor(Math.random() * colors.length)];
        trailsRef.current.push({
          x: e.clientX + (Math.random() * 8 - 4),
          y: e.clientY + (Math.random() * 8 - 4),
          opacity: 0.9,
          size: Math.random() > 0.5 ? 3 : 2,
          color: chosenColor,
        });

        if (trailsRef.current.length > 8) {
          trailsRef.current.shift();
        }
      }

      // Check for hover state on interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest("a, button, [role='button'], input, textarea, select, .cursor-pointer");
        setIsHovered(!!interactive);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    // 60FPS Render Loop with hardware acceleration
    const render = () => {
      frameCount++;
      const { x, y } = mousePos.current;

      // Occasional random jitter simulating broken computer hardware clock
      let jitterX = 0;
      let jitterY = 0;
      if (Math.random() < 0.18) {
        jitterX = (Math.random() - 0.5) * 5;
        jitterY = (Math.random() - 0.5) * 5;
      }

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x + jitterX}px, ${y + jitterY}px, 0)`;
      }

      // Randomly cycle corrupted telemetry string every ~45 frames
      if (frameCount % 45 === 0 && labelRef.current) {
        currentLabel = glitchLabels[Math.floor(Math.random() * glitchLabels.length)];
        labelRef.current.textContent = currentLabel;
      }

      // Draw trailing glitch fragments on lightweight canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          trailsRef.current.forEach((p) => {
            p.opacity -= 0.035;
            if (p.opacity > 0) {
              ctx.fillStyle = p.color;
              ctx.globalAlpha = p.opacity;
              // Draw fragmented digital rectangles
              ctx.fillRect(p.x, p.y, p.size, p.size);
              // Occasional horizontal corrupted scanline glitch
              if (Math.random() < 0.08) {
                ctx.fillRect(p.x - 8, p.y, 16, 1);
              }
            }
          });
          trailsRef.current = trailsRef.current.filter((p) => p.opacity > 0);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // Canvas resize handling
    const resizeCanvas = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animId);
    };
  }, [visible]);

  if (!enabled || !visible) return null;

  return (
    <>
      {/* Glitch Particle Canvas Overlay */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
        aria-hidden="true"
      />

      {/* Main Glitch Broken Cursor Container */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] select-none will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
        aria-hidden="true"
      >
        <div className="relative">
          {/* Cyan Chromatic Aberration Ghost Layer */}
          <div
            className="absolute top-0 left-0 text-[#00f0ff] opacity-80"
            style={{
              transform: "translate(-2px, 1px)",
              animation: "glitchRgbSplitCyan 0.3s steps(2) infinite",
            }}
          >
            <CursorGraphic isHovered={isHovered} isClicking={isClicking} strokeColor="#00f0ff" />
          </div>

          {/* Red/Magenta Chromatic Aberration Ghost Layer */}
          <div
            className="absolute top-0 left-0 text-[#ff0055] opacity-80"
            style={{
              transform: "translate(2px, -1px)",
              animation: "glitchRgbSplitRed 0.3s steps(2) infinite",
            }}
          >
            <CursorGraphic isHovered={isHovered} isClicking={isClicking} strokeColor="#ff0055" />
          </div>

          {/* Core Broken Cursor Layer */}
          <div
            style={{
              animation: "brokenGlitchSlice 2.4s infinite, brokenGlitchTwitch 0.4s infinite",
            }}
          >
            <CursorGraphic isHovered={isHovered} isClicking={isClicking} strokeColor="#ffffff" />
          </div>

          {/* Digital Glitch Error Readout Badge */}
          <div
            className={`absolute left-5 top-5 px-1.5 py-0.5 rounded bg-black/90 border font-mono text-[9px] tracking-wider whitespace-nowrap transition-all ${
              isHovered
                ? "border-cyber-red text-cyber-red shadow-lg shadow-cyber-red/20 scale-105"
                : "border-cyber-green/60 text-cyber-green shadow-sm"
            }`}
            style={{ animation: "brokenGlitchTwitch 0.6s infinite" }}
          >
            <span ref={labelRef}>ERR::0x7F</span>
            {isHovered && <span className="ml-1 text-white animate-pulse">LOCK</span>}
          </div>

          {/* Click Glitch Distortion Burst Ring */}
          {isClicking && (
            <div className="absolute -top-3 -left-3 w-10 h-10 border border-cyber-red rounded-none animate-ping opacity-90 pointer-events-none" />
          )}
        </div>
      </div>
    </>
  );
}

// Broken Cybernetic / Malfunctioning Computer Cursor SVG
function CursorGraphic({
  isHovered,
  isClicking,
  strokeColor,
}: {
  isHovered: boolean;
  isClicking: boolean;
  strokeColor: string;
}) {
  if (isHovered) {
    // Distorted Broken Target / Bracket Lock-on when hovering buttons/links
    return (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="-translate-x-1/2 -translate-y-1/2"
      >
        {/* Fractured Bracket Corner Reticle */}
        <path d="M2 8V2H8" stroke={strokeColor} strokeWidth="2" strokeLinecap="square" />
        <path d="M20 2H26V8" stroke={strokeColor} strokeWidth="2" strokeLinecap="square" />
        <path d="M26 20V26H20" stroke={strokeColor} strokeWidth="2" strokeLinecap="square" />
        <path d="M8 26H2V20" stroke={strokeColor} strokeWidth="2" strokeLinecap="square" />
        {/* Broken inner cross with missing segment */}
        <line x1="14" y1="6" x2="14" y2="10" stroke={strokeColor} strokeWidth="1.5" />
        <line x1="14" y1="18" x2="14" y2="22" stroke={strokeColor} strokeWidth="1.5" />
        <line x1="6" y1="14" x2="10" y2="14" stroke={strokeColor} strokeWidth="1.5" />
        {/* Distorted center pip */}
        <rect x="12" y="12" width="4" height="4" fill={strokeColor} />
      </svg>
    );
  }

  // Default Broken Computer Jagged Pixel Pointer
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: isClicking ? "scale(0.85)" : "scale(1)",
        transition: "transform 0.05s",
      }}
    >
      {/* Broken Jagged Arrow with Stepped Digital Silhouette */}
      <path
        d="M2 1L2 17L6 13L10 21L13 19.5L9 11.5L15 11.5L2 1Z"
        fill="#07090b"
        stroke={strokeColor}
        strokeWidth="1.75"
        strokeLinejoin="miter"
      />
      {/* Internal Glitch Scanline Cuts */}
      <line x1="4" y1="6" x2="8" y2="6" stroke={strokeColor} strokeWidth="1" strokeDasharray="1 1" />
      <line x1="5" y1="9" x2="10" y2="9" stroke={strokeColor} strokeWidth="1" strokeDasharray="2 1" />
      {/* Distorted broken tip pip */}
      <circle cx="2" cy="1" r="1.5" fill={strokeColor} />
    </svg>
  );
}
