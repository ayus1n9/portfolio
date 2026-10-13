"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { getDailyMediaNews, MediaCard } from "@/data/mediaNewsData";

export default function SecurityNews() {
  const [dailyData, setDailyData] = useState(() => getDailyMediaNews());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch from the 24h-cached API route to ensure daily freshness
  useEffect(() => {
    async function loadFreshDailyNews() {
      try {
        const res = await fetch("/api/news");
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.length > 0) {
            setDailyData({
              cards: json.data,
              dayKey: json.dateKey || dailyData.dayKey,
              lastUpdatedFormatted: json.lastUpdated || dailyData.lastUpdatedFormatted,
            });
          }
        }
      } catch {
        // Graceful fallback to client-computed deterministic daily seed
      }
    }

    loadFreshDailyNews();
  }, []);

  // Smooth continuous auto-scrolling with pause on hover
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animId: number;
    const speed = 0.65; // Smooth cinematic ticker speed

    const step = () => {
      if (!isPaused && container) {
        container.scrollLeft += speed;
        // When scrolled past the first set, wrap seamlessly
        const halfWidth = container.scrollWidth / 2;
        if (halfWidth > 0 && container.scrollLeft >= halfWidth) {
          container.scrollLeft -= halfWidth;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, dailyData.cards]);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/news?t=" + Date.now());
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setDailyData({
            cards: json.data,
            dayKey: json.dateKey,
            lastUpdatedFormatted: json.lastUpdated,
          });
        }
      }
    } catch {
      // Ignore error
    } finally {
      setTimeout(() => setIsRefreshing(false), 600);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  // Duplicate cards for seamless infinite looping
  const infiniteCards = [...dailyData.cards, ...dailyData.cards];

  return (
    <section id="news" className="py-20 border-t border-cyber-border/40 relative overflow-hidden">
      {/* Anchor for media navigation */}
      <div id="media" className="absolute -top-12 left-0" />

      {/* Background radial gradient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[350px] bg-cyber-green/5 blur-[160px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Pliny/Media Cartouche Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="cartouche-badge mb-3 select-none text-cyber-green">
            05 // MEDIA
          </div>
          <h2 className="text-xl sm:text-4xl md:text-5xl font-bold font-editorial text-[#07090b] bg-cyber-green px-3 sm:px-6 py-1.5 sm:py-2.5 tracking-tight inline-block uppercase select-none shadow-[4px_4px_0px_#000000] mb-3 max-w-full text-center">
            Live Cyber Threat Dispatch
          </h2>

          {/* Daily Refresh Telemetry Subtitle */}
          <div className="mt-3 flex items-center gap-2 font-mono text-[11px] text-cyber-dim select-none">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
            <span className="text-cyber-muted">{dailyData.lastUpdatedFormatted}</span>
            <span>•</span>
            <button
              onClick={handleManualRefresh}
              title="Sync latest 24h dispatch"
              className="inline-flex items-center gap-1 text-cyber-dim hover:text-cyber-green transition-colors ml-1"
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshing ? "animate-spin text-cyber-green" : ""}`} />
              <span className="text-[10px]">SYNC</span>
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Container - Invisible scrollbar, smooth auto-scroll, pauses on hover */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex gap-5 overflow-x-auto pb-4 no-scrollbar focus:outline-none -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {infiniteCards.map((card, idx) => (
            <a
              key={`${card.id}-loop-${idx}`}
              href={card.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${card.outlet}: ${card.title}`}
              className="flex-none w-[285px] sm:w-[310px] md:w-[325px] bg-[#0a0d13] border border-cyber-border/80 hover:border-cyber-green/50 rounded-xl overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-cyber-green/10 cursor-pointer block text-inherit no-underline select-none"
            >
              {/* Top Accent Rim */}
              <div
                className="h-[2px] w-full"
                style={{ backgroundColor: card.accentColor }}
              />

              {/* Banner Area */}
              <div className="relative h-[155px] w-full overflow-hidden select-none bg-black flex items-center justify-center">
                {card.bannerType === "wordmark" && card.bannerWordmark ? (
                  <div
                    className="w-full h-full flex items-center justify-center relative p-4 transition-transform duration-500 group-hover:scale-105"
                    style={{ background: card.bannerWordmark.bgGradient }}
                  >
                    {/* Subtle grid pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />

                    <span
                      className={card.bannerWordmark.fontFamily}
                      style={{
                        color: card.bannerWordmark.color,
                        textShadow: card.bannerWordmark.glow,
                      }}
                    >
                      {card.bannerWordmark.text}
                    </span>
                  </div>
                ) : card.bannerImage ? (
                  <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
                    {/* Background photo */}
                    <img
                      src={card.bannerImage.src}
                      alt={card.bannerImage.alt}
                      className="w-full h-full object-cover brightness-[0.7] contrast-[1.1]"
                      loading="lazy"
                    />
                    {/* Gradient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d13] via-transparent to-transparent opacity-80" />

                    {/* Stamped outlet badge overlay at bottom-left */}
                    <div className="absolute bottom-3 left-3">
                      <span className="font-editorial text-xl font-black tracking-wider text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                        {card.bannerImage.overlayLabel}
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Content Area */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Badges Row */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-3 font-mono">
                    {card.badges.map((badge, bIdx) => (
                      <span
                        key={bIdx}
                        className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-cyber-bg text-cyber-green border border-cyber-green/30"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Headline */}
                  <h4 className="text-[15px] sm:text-base font-sans font-bold text-white group-hover:text-cyber-green transition-colors leading-snug line-clamp-3">
                    {card.title}
                  </h4>
                </div>

                {/* Bottom Action Link */}
                <div className="pt-6">
                  <span className="inline-block font-mono text-xs font-bold tracking-widest text-cyber-green group-hover:underline group-hover:text-white transition-colors">
                    {card.actionText}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
