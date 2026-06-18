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

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    const reveal = () => {
      el.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
      el.style.transitionDelay = `${delay}ms`;
      el.style.opacity = "1";
      el.style.transform = "translateY(0px)";
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
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
