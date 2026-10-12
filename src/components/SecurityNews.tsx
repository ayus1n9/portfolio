"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, RefreshCw, ExternalLink } from "lucide-react";
import { getDailyMediaNews, MediaCard } from "@/data/mediaNewsData";

export default function SecurityNews() {
  const [dailyData, setDailyData] = useState(() => getDailyMediaNews());
  const [isRefreshing, setIsRefreshing] = useState(false);
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

  return (
    <section id="news" className="py-20 border-t border-cyber-border/40 relative overflow-hidden">
      {/* Anchor for media navigation */}
      <div id="media" className="absolute -top-12 left-0" />

      {/* Background radial gradient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-cyber-green/5 blur-[160px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Pliny/Media Cartouche Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="cartouche-badge text-sm sm:text-base select-none tracking-widest text-cyber-green font-mono">
            MEDIA
          </div>

          {/* Daily Refresh Telemetry Subtitle */}
          <div className="mt-3 flex items-center gap-2 font-mono text-[11px] text-cyber-dim select-none">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
            <span>DAILY INTELLIGENCE CYCLE</span>
            <span>•</span>
            <span className="text-cyber-muted">{dailyData.lastUpdatedFormatted}</span>
            <span>•</span>
            <button
              onClick={handleManualRefresh}
              title="Sync latest 24h dispatch"
              className="inline-flex items-center gap-1 text-cyber-dim hover:text-cyber-green transition-colors ml-1"
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshing ? "animate-spin text-cyber-green" : ""}`} />
              <span className="text-[10px]">24H SYNC</span>
            </button>
          </div>
        </div>

        {/* Carousel Navigation Controls */}
        <div className="flex items-center justify-end gap-2 mb-4">
          <button
            onClick={scrollLeft}
            aria-label="Previous stories"
            className="w-8 h-8 rounded border border-cyber-border bg-cyber-surface/80 hover:border-cyber-green/50 text-cyber-muted hover:text-white flex items-center justify-center transition-all shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={scrollRight}
            aria-label="Next stories"
            className="w-8 h-8 rounded border border-cyber-border bg-cyber-surface/80 hover:border-cyber-green/50 text-cyber-muted hover:text-white flex items-center justify-center transition-all shadow-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Horizontal Carousel Container */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-6 scrollbar-thin scroll-smooth snap-x snap-mandatory focus:outline-none -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: "thin" }}
        >
          {dailyData.cards.map((card) => (
            <div
              key={card.id}
              className="flex-none w-[285px] sm:w-[310px] md:w-[325px] snap-start bg-[#0a0d13] border border-cyber-border/80 hover:border-cyber-green/40 rounded-xl overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-cyber-green/5"
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
                  <a
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block font-mono text-xs font-bold tracking-widest text-cyber-green hover:underline hover:text-white transition-colors"
                  >
                    {card.actionText}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
