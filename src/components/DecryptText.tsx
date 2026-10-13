"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface DecryptTextProps {
  text: string;
  className?: string;
  triggerOnHover?: boolean;
  triggerOnView?: boolean;
  speed?: number;
  totalSteps?: number;
  as?: React.ElementType;
}

const GLYPHS = "01/\\_|X#*?%&+<>!$[]{}~";

export default function DecryptText({
  text,
  className = "",
  triggerOnHover = true,
  triggerOnView = true,
  speed = 35,
  totalSteps = 16,
  as: Component = "span",
}: DecryptTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const isRunningRef = useRef(false);
  const elementRef = useRef<HTMLElement>(null);

  const startDecrypt = useCallback(() => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;

    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / totalSteps;

      if (step >= totalSteps) {
        clearInterval(timer);
        setDisplayText(text);
        isRunningRef.current = false;
        return;
      }

      const scrambled = text
        .split("")
        .map((ch, idx) => {
          if (ch === " " || ch === "•" || ch === "&" || ch === "//") return ch;
          const threshold = (idx / text.length) * 0.75;
          if (progress >= threshold + 0.25) return ch;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");

      setDisplayText(scrambled);
    }, speed);
  }, [text, speed, totalSteps]);

  // Trigger on viewport intersection or mount
  useEffect(() => {
    if (!triggerOnView) {
      startDecrypt();
      return;
    }

    const el = elementRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      startDecrypt();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startDecrypt();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [startDecrypt, triggerOnView]);

  return (
    <Component
      ref={elementRef}
      onMouseEnter={triggerOnHover ? startDecrypt : undefined}
      className={className}
    >
      {displayText}
    </Component>
  );
}
