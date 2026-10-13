"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Terminal, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

const ASCII_HERO_DESKTOP = `    ___   __  __  __  __   _____   __  __       _____   ____   _   __  ______   __  __
   /   |  \\ \\/ / / / / /  / ___/  / / / /      / ___/  /  _/  / | / / / ____/  / / / /
  / /| |   \\  / / / / /   \\__ \\  / /_/ /       \\__ \\   / /   /  |/ / / / __   / /_/ / 
 / ___ |   / / / /_/ /   ___/ / / __  /       ___/ / _/ /   / /|  / / /_/ /  / __  /  
/_/  |_|  /_/  \\____/   /____/ /_/ /_/       /____/ /___/  /_/ |_/  \\____/  /_/ /_/   `;

const ASCII_HERO_MOBILE = `    ___   __  __  __  __   _____   __  __
   /   |  \\ \\/ / / / / /  / ___/  / / / /
  / /| |   \\  / / / / /   \\__ \\  / /_/ / 
 / ___ |   / / / /_/ /   ___/ / / __  /  
/_/  |_|  /_/  \\____/   /____/ /_/ /_/   

   _____   ____   _   __  ______   __  __
  / ___/  /  _/  / | / / / ____/  / / / /
  \\__ \\   / /   /  |/ / / / __   / /_/ / 
 ___/ / _/ /   / /|  / / /_/ /  / __  /  
/____/ /___/  /_/ |_/  \\____/  /_/ /_/   `;

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bannerRef.current) return;
    const rect = bannerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsHovered(true);
  };

  // Subtle ambient constellation particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const count = Math.min(28, Math.floor((width * height) / 28000));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.8,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(77, 255, 136, ${(1 - dist / 110) * 0.12})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden">
      {/* Constellation Canvas Overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-75" />

      {/* Radial glow background */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-cyber-green/5 blur-[140px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        {/* Tactical Status Pill */}
        <div className="cartouche-badge mb-6 text-xs sm:text-sm select-none text-cyber-green">
          0_0
        </div>

        {/* Monumental Name Banner in Pure Terminal ASCII Art (Option 3: Hacker Glyph Decrypt / Scramble) */}
        <h1 className="mb-6 select-none flex justify-center items-center w-full">
          <span className="sr-only">AYUSH SINGH</span>
          <div
            ref={bannerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative px-3 py-2 sm:px-6 sm:py-3 rounded-2xl bg-black/25 backdrop-blur-md max-w-full overflow-hidden cursor-crosshair group"
          >
            {/* Ambient soft glow behind letters */}
            <div className="absolute inset-0 bg-cyber-green/[0.04] blur-2xl rounded-full pointer-events-none -z-10" />

            {/* Option 4: Interactive Mouse Spotlight Ambient Glow */}
            <div
              className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 -z-10"
              style={{
                opacity: isHovered ? 1 : 0,
                background: `radial-gradient(240px circle at ${mousePos.x}px ${mousePos.y}px, rgba(77, 255, 136, 0.22), rgba(97, 231, 255, 0.08) 40%, transparent 80%)`,
              }}
            />

            {/* Option 4: Character Highlight Spotlight Overlay */}
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-150 z-10"
              style={{
                opacity: isHovered ? 1 : 0,
                background: `radial-gradient(130px circle at ${mousePos.x}px ${mousePos.y}px, rgba(186, 255, 217, 0.5), rgba(77, 255, 136, 0.15) 50%, transparent 75%)`,
                mixBlendMode: "screen",
              }}
            />

            {/* Desktop & Tablet Banner (86 cols) */}
            <pre
              aria-hidden="true"
              className="hidden md:block font-mono text-[9px] lg:text-[11px] xl:text-[12px] leading-[1.18] text-cyber-green font-bold text-left select-none tracking-normal overflow-x-auto no-scrollbar drop-shadow-[0_0_12px_rgba(77,255,136,0.45)]"
            >
              {ASCII_HERO_DESKTOP}
            </pre>
            {/* Mobile & Small Tablet Banner (46 cols) */}
            <pre
              aria-hidden="true"
              className="block md:hidden font-mono text-[7px] xs:text-[8.5px] sm:text-[10px] leading-[1.2] text-cyber-green font-bold text-left select-none tracking-normal overflow-x-auto no-scrollbar drop-shadow-[0_0_12px_rgba(77,255,136,0.45)]"
            >
              {ASCII_HERO_MOBILE}
            </pre>
          </div>
        </h1>

        {/* Tagline Row */}
        <div className="font-mono text-xs sm:text-sm md:text-base font-semibold tracking-widest text-cyber-green uppercase mb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <span>INVESTIGATING THREATS</span>
          <span className="text-cyber-dim">•</span>
          <span>BUILDING TOOLS</span>
          <span className="text-cyber-dim">•</span>
          <span>ENGINEERING SECURITY</span>
        </div>

        {/* Refined CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-16 w-full font-mono text-xs">
          <a
            href="#cli"
            className="px-5 py-3.5 rounded bg-cyber-surface border border-cyber-border hover:border-cyber-green/50 text-cyber-green tracking-wider transition-all flex items-center gap-2 hover:bg-cyber-raised"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>whoami</span>
          </a>

          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3.5 rounded bg-cyber-surface border border-cyber-border hover:border-cyber-muted text-cyber-muted hover:text-white tracking-wider transition-all flex items-center gap-1.5"
          >
            <span>GITHUB</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
