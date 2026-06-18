"use client";

import { useEffect, useState } from "react";
import { PhoneCall, Mail, MessageSquare } from "lucide-react";

// ─── Odometer digit ──────────────────────────────────────────────────────────
// Renders two digits stacked in a clipped container.
// When the value changes the strip slides upward, revealing the new digit below.
function OdometerDigit({ digit }: { digit: string }) {
  const [from, setFrom] = useState(digit);   // top of strip (exits)
  const [to,   setTo]   = useState(digit);   // bottom of strip (enters)
  const [rolling, setRolling] = useState(false);

  useEffect(() => {
    if (digit === to) return;

    // Put current "to" at top, incoming digit at bottom, then animate up
    setFrom(to);
    setTo(digit);
    setRolling(true);

    const timer = setTimeout(() => {
      // Snap-reset without animation: both halves now show the same digit
      setFrom(digit);
      setRolling(false);
    }, 700); // must match transition duration below

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digit]);

  // Commas / separators — no animation needed
  if (digit === ",") {
    return (
      <span style={{ display: "inline-block", width: "0.3em", color: "rgba(255,255,255,0.25)" }}>
        ,
      </span>
    );
  }

  return (
    <span
      style={{
        display: "inline-block",
        overflow: "hidden",
        height: "1.15em",
        width: "0.65em",
        verticalAlign: "bottom",
        position: "relative",
      }}
    >
      {/* Strip: [from] on top, [to] on bottom — slides up when rolling */}
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          // When not rolling snap back instantly (no transition) so reset is invisible
          transition: rolling ? "transform 700ms cubic-bezier(0.4, 0, 0.2, 1)" : "none",
          transform: rolling ? "translateY(-50%)" : "translateY(0%)",
          height: "200%",
        }}
      >
        <span
          style={{
            height: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {from}
        </span>
        <span
          style={{
            height: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {to}
        </span>
      </span>
    </span>
  );
}

function OdometerNumber({ value, className }: { value: number; className?: string }) {
  const formatted = value.toLocaleString();
  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "flex-end" }}>
      {formatted.split("").map((ch, i) => (
        <OdometerDigit key={i} digit={ch} />
      ))}
    </span>
  );
}

// ─── Activity feed ────────────────────────────────────────────────────────────
const TEMPLATES = [
  { icon: PhoneCall, color: "text-[#0D9488]", bg: "bg-[#0D9488]/10",
    msg: () => "Inbound call to your business answered instantly" },
  { icon: Mail, color: "text-[#2DD4BF]", bg: "bg-[#2DD4BF]/10",
    msg: () => "Email inquiry to your team responded to" },
  { icon: MessageSquare, color: "text-[#5EEAD4]", bg: "bg-[#5EEAD4]/10",
    msg: () => "Website chat for your business resolved" },
  { icon: PhoneCall, color: "text-[#0D9488]", bg: "bg-[#0D9488]/10",
    msg: () => "After-hours call for your company handled" },
  { icon: Mail, color: "text-[#2DD4BF]", bg: "bg-[#2DD4BF]/10",
    msg: () => "Lead captured via email for your business" },
  { icon: MessageSquare, color: "text-[#5EEAD4]", bg: "bg-[#5EEAD4]/10",
    msg: () => "Appointment booked through your website chat" },
  { icon: PhoneCall, color: "text-[#0D9488]", bg: "bg-[#0D9488]/10",
    msg: () => "Pricing inquiry answered on behalf of your team" },
  { icon: Mail, color: "text-[#2DD4BF]", bg: "bg-[#2DD4BF]/10",
    msg: () => "Follow-up sent automatically for your business" },
];

let uid = 0;
type FeedItem = {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
  msg: string;
  age: number; // seconds ago
};

function makeItem(): FeedItem {
  const t = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
  return { id: uid++, icon: t.icon, color: t.color, bg: t.bg, msg: t.msg(), age: 0 };
}

const AGE_LABELS = ["just now", "3s ago", "7s ago", "12s ago", "18s ago"];

// ─── Channel config ───────────────────────────────────────────────────────────
const CHANNELS = [
  { key: "voice", icon: PhoneCall, label: "Calls Answered",   color: "text-[#0D9488]", bg: "bg-[#0D9488]/10", base: 312847 },
  { key: "email", icon: Mail,      label: "Emails Handled",   color: "text-[#2DD4BF]", bg: "bg-[#2DD4BF]/10", base: 589134 },
  { key: "chat",  icon: MessageSquare, label: "Chats Resolved", color: "text-[#5EEAD4]", bg: "bg-[#5EEAD4]/10", base: 428652 },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function LiveCounter() {
  const [counts, setCounts] = useState<Record<string, number>>({
    voice: CHANNELS[0].base,
    email: CHANNELS[1].base,
    chat:  CHANNELS[2].base,
  });

  const [feed, setFeed] = useState<FeedItem[]>([]);

  // Populate feed only on client to avoid SSR/client hydration mismatch
  useEffect(() => {
    setFeed(Array.from({ length: 5 }, (_, i) => ({ ...makeItem(), age: i })));
  }, []);

  // Tick every 2.2 s — slow and clean
  useEffect(() => {
    const interval = setInterval(() => {
      const ch = CHANNELS[Math.floor(Math.random() * CHANNELS.length)];
      const inc = Math.floor(Math.random() * 2) + 1;

      setCounts(prev => ({ ...prev, [ch.key]: prev[ch.key] + inc }));

      setFeed(prev => {
        const aged = prev.map((item, i) => ({ ...item, age: i + 1 }));
        return [makeItem(), ...aged].slice(0, 5);
      });
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  const total = counts.voice + counts.email + counts.chat;

  return (
    <section className="dark-panel relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#0D9488_0%,_transparent_70%)] opacity-10 pointer-events-none" />

      <div className="container mx-auto px-6 relative">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            Live — See What Your Business Gains
          </div>
          <h2 className="text-4xl font-medium tracking-[-0.045em] text-white md:text-6xl">
            Inquiries Your Business{" "}
            <span className="font-display font-normal italic text-[#8ff5e3]">
              Never Misses
            </span>
          </h2>
          <p className="text-white/50 mt-3 max-w-lg mx-auto text-sm">
            Every one of these would have gone unanswered without AI. Your business keeps every lead.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">

          {/* Left — total + channel breakdown */}
          <div className="space-y-4">
            {/* Big odometer */}
            <div className="premium-card rounded-3xl p-6 text-center">
              <div className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-3">
                Total Handled For Your Business
              </div>
              <div className="text-5xl md:text-6xl text-white leading-none">
                <OdometerNumber value={total} />
              </div>
            </div>

            {/* Per-channel rows */}
            {CHANNELS.map(({ key, icon: Icon, label, color, bg }) => (
              <div
                key={key}
                className="premium-card flex items-center gap-4 rounded-2xl px-5 py-4"
              >
                <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <div className="flex-1 text-xs text-white/40 font-medium">{label}</div>
                <div className={`text-xl tabular-nums ${color}`}>
                  <OdometerNumber value={counts[key]} />
                </div>
              </div>
            ))}
          </div>

          {/* Right — live activity feed */}
          <div className="premium-card overflow-hidden rounded-3xl">
            <div className="px-5 py-3 border-b border-white/10 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="text-xs font-semibold text-white/60 uppercase tracking-widest">
                Your Business — Live Activity
              </span>
            </div>

            <div className="divide-y divide-white/5">
              {feed.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 px-5 py-4"
                    style={{ opacity: Math.max(1 - i * 0.18, 0.25) }}
                  >
                    <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white/80 leading-snug">{item.msg}</p>
                      <p className="text-xs text-white/30 mt-1">{AGE_LABELS[Math.min(item.age, AGE_LABELS.length - 1)]}</p>
                    </div>
                    {i === 0 && (
                      <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full flex-shrink-0">
                        New
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
