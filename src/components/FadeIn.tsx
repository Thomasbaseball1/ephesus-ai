"use client";

import { useEffect, useRef, ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;       // ms
  duration?: number;    // ms
  translateY?: number;  // px, starting offset
  className?: string;
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 600,
  translateY = 18,
  className = "",
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Small rAF ensures the browser has painted the initial opacity:0 state
    // before we start the transition — prevents any same-frame jumps
    const raf = requestAnimationFrame(() => {
      el.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
      el.style.transitionDelay = `${delay}ms`;
      el.style.opacity = "1";
      el.style.transform = "translateY(0px)";
    });
    return () => cancelAnimationFrame(raf);
  }, [delay, duration]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0, transform: `translateY(${translateY}px)` }}
    >
      {children}
    </div>
  );
}
