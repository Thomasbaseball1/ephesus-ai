"use client";

import { ReactNode, useEffect, useRef } from "react";

interface DigitalLoomBackgroundProps {
  children: ReactNode;
  className?: string;
  threadColor?: string;
  threadCount?: number;
}

// Adapted from DigitalLoomBackground by @dhiluxui on 21st.dev.
// This version is container-sized, high-DPI aware, and respects reduced motion.
export default function DigitalLoomBackground({
  children,
  className = "",
  threadColor = "76, 232, 207",
  threadCount = 22,
}: DigitalLoomBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    class Thread {
      y = Math.random();
      amplitude = 5 + Math.random() * 18;
      frequency = 0.0035 + Math.random() * 0.006;
      phase = Math.random() * Math.PI * 2;
      velocity = 0.0015 + Math.random() * 0.0035;
      opacity = 0.05 + Math.random() * 0.13;

      draw() {
        const baseY = this.y * height;
        ctx.beginPath();
        for (let x = -16; x <= width + 16; x += 5) {
          const wave = Math.sin(x * this.frequency + this.phase) * this.amplitude;
          const secondary = Math.sin(x * this.frequency * 0.37 - this.phase) * 3;
          if (x === -16) ctx.moveTo(x, baseY + wave + secondary);
          else ctx.lineTo(x, baseY + wave + secondary);
        }
        ctx.strokeStyle = `rgba(${threadColor}, ${this.opacity})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      update() {
        this.phase += this.velocity;
      }
    }

    const threads = Array.from({ length: threadCount }, () => new Thread());

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      threads.forEach((thread) => {
        thread.draw();
        if (!reducedMotion) thread.update();
      });
    };

    const animate = () => {
      draw();
      animationFrame = requestAnimationFrame(animate);
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();
    if (!reducedMotion) animate();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [threadColor, threadCount]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
