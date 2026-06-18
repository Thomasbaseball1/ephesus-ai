"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowRight, Sparkles, RefreshCw, Send, Building2, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalendlyButton from "@/components/CalendlyButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// ─── Types ─────────────────────────────────────────────────────────────────
type Message = { role: "customer" | "ai"; text: string };

// ─── Parse the raw conversation text into message pairs ─────────────────────
function parseConversation(raw: string): Message[] {
  const messages: Message[] = [];
  const regex = /(CUSTOMER\s*\d+|AI\s*\d+)\s*:\s*([\s\S]*?)(?=(?:CUSTOMER\s*\d+|AI\s*\d+)\s*:|$)/gi;
  let match;
  while ((match = regex.exec(raw)) !== null) {
    const label = match[1].trim().toUpperCase();
    const text = match[2].trim();
    if (!text) continue;
    messages.push({ role: label.startsWith("CUSTOMER") ? "customer" : "ai", text });
  }
  return messages;
}

// ─── Typing animation hook (for YOU messages) ────────────────────────────────
function useTypingText(target: string, active: boolean, onDone: () => void) {
  const [displayed, setDisplayed] = useState("");
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active || !target) return;
    setDisplayed("");
    let i = 0;
    function tick() {
      const chunk = Math.floor(Math.random() * 3) + 3;
      i = Math.min(i + chunk, target.length);
      setDisplayed(target.slice(0, i));
      if (i < target.length) {
        frameRef.current = setTimeout(tick, 18 + Math.random() * 14);
      } else {
        onDone();
      }
    }
    frameRef.current = setTimeout(tick, 80);
    return () => { if (frameRef.current) clearTimeout(frameRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, active]);

  return displayed;
}

// ─── Message bubble ───────────────────────────────────────────────────────────
function MessageBubble({
  msg,
  active,
  onDone,
}: {
  msg: Message;
  active: boolean;
  onDone: () => void;
}) {
  const isAi = msg.role === "ai";

  // ── AI: fade-in ──────────────────────────────────────────────────────────
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!isAi || !active) return;
    const showT = setTimeout(() => setVisible(true), 40);
    const doneT = setTimeout(onDone, 1000);
    return () => { clearTimeout(showT); clearTimeout(doneT); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // ── Customer: typing ─────────────────────────────────────────────────────
  const displayed = useTypingText(msg.text, !isAi && active, onDone);

  if (!active) return null;

  // ── AI bubble (fade-in, gray iMessage style) ─────────────────────────────
  if (isAi) {
    return (
      <div
        className="flex items-end gap-2 flex-row"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(14px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] flex items-center justify-center flex-shrink-0 mb-1 shadow-sm">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div className="max-w-[75%] space-y-1">
          <span className="text-xs text-gray-400 pl-1">Your Business (Powered by Ephesus AI)</span>
          <div className="bg-[#E9E9EB] rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
            <p className="text-[#1C1C1E] text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
          </div>
        </div>
      </div>
    );
  }

  // ── Customer bubble (typing, iMessage blue) ──────────────────────────────
  return (
    <div className="flex items-end gap-2 flex-row-reverse">
      <div className="max-w-[75%] space-y-1 items-end flex flex-col">
        <span className="text-xs text-gray-400 pr-1">Customer</span>
        <div className="bg-[#0D9488] rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
          <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">
            {displayed}
            {displayed.length < msg.text.length && (
              <span
                className="inline-block w-0.5 h-3.5 bg-white ml-0.5 align-middle opacity-70"
                style={{ animation: "blink 0.9s step-end infinite" }}
              />
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────
function LoadingState() {
  return (
    <div className="space-y-5 py-4">
      <div className="flex items-center gap-3 text-white/40 text-sm">
        <div className="w-5 h-5 border-2 border-[#0D9488]/40 border-t-[#0D9488] rounded-full animate-spin" />
        Generating your conversation…
      </div>
      {[0, 1, 2].map((i) => (
        <div key={i} className={`flex items-start gap-3 ${i % 2 === 1 ? "flex-row-reverse" : ""}`}>
          <div className="w-9 h-9 rounded-full bg-white/10 flex-shrink-0 animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-white/10 rounded animate-pulse" style={{ width: `${40 + i * 15}%`, animationDelay: `${i * 150}ms` }} />
            <div className="h-16 bg-white/10 rounded-2xl animate-pulse" style={{ animationDelay: `${i * 150 + 75}ms` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Examples ────────────────────────────────────────────────────────────────
const EXAMPLES = [
  "I run a dental office in Austin, TX. We see about 30 patients a day.",
  "I own a real estate agency in Miami with 5 agents.",
  "I have a barbershop in Chicago — we get tons of walk-ins and calls.",
  "We're a small law firm specializing in personal injury cases.",
  "I run an HVAC company serving the greater Dallas area.",
];

// ─── Main page ────────────────────────────────────────────────────────────────
export default function DemoPage() {
  const [input, setInput] = useState("");
  const [stage, setStage] = useState<"idle" | "loading" | "playing" | "done">("idle");
  const [messages, setMessages] = useState<Message[]>([]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [businessLabel, setBusinessLabel] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fetchStartRef = useRef(0);

  useEffect(() => {
    if (visibleCount > 0) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }), 100);
    }
  }, [visibleCount]);

  function handleBubbleDone(index: number) {
    const nextIndex = index + 1;
    if (nextIndex < messages.length) {
      const delay = messages[index].role === "customer" ? 800 : 600;
      setTimeout(() => {
        setVisibleCount(nextIndex + 1);
        setActiveIndex(nextIndex);
      }, delay);
    } else {
      setActiveIndex(-1);
      setStage("done");
    }
  }

  async function runDemo(description: string) {
    if (!description.trim()) return;
    setBusinessLabel(description.trim());
    setStage("loading");
    setMessages([]);
    setVisibleCount(0);
    setActiveIndex(-1);
    setResponseTime(null);
    fetchStartRef.current = Date.now();

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessDescription: description.trim() }),
      });
      const data = await res.json();
      const parsed = parseConversation(data.conversation ?? "");
      const elapsed = Date.now() - fetchStartRef.current;

      if (!parsed.length) { setStage("idle"); return; }

      setResponseTime(elapsed);
      setMessages(parsed);
      setTimeout(() => {
        setStage("playing");
        setVisibleCount(1);
        setActiveIndex(0);
      }, 400);
    } catch (err) {
      console.error(err);
      setStage("idle");
    }
  }

  function reset() {
    setStage("idle");
    setInput("");
    setMessages([]);
    setVisibleCount(0);
    setActiveIndex(-1);
    setResponseTime(null);
    setBusinessLabel("");
    setTimeout(() => textareaRef.current?.focus(), 100);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); runDemo(input); }
  }

  return (
    <div className="min-h-screen flex flex-col demo-bg">
      <style jsx global>{`
        @keyframes blink { 50% { opacity: 0 } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.45s ease-out forwards; }
        @keyframes subtleShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .demo-bg {
          background: linear-gradient(
            135deg,
            #0F172A 0%,
            #111827 25%,
            #0f1f2e 50%,
            #13141f 75%,
            #0F172A 100%
          );
          background-size: 400% 400%;
          animation: subtleShift 12s ease infinite;
        }
      `}</style>

      <Header />

      <main className="flex-1 pt-16">

        {/* Hero */}
        <section className="relative overflow-hidden py-16 md:py-20 border-b border-[#0D9488]/20 bg-gradient-to-br from-[#0F172A] via-[#134E4A] to-[#0F172A]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#0D9488_0%,_transparent_60%)] opacity-20 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#2DD4BF_0%,_transparent_60%)] opacity-15 pointer-events-none" />
          <div className="container mx-auto px-6 relative text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-5 border border-white/20 bg-white/10 text-white/80">
              <Sparkles className="w-3.5 h-3.5 text-[#2DD4BF]" />
              Live AI Demo — Powered by Ephesus AI
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
              See AI Handle{" "}
              <span className="bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">
                Your Business
              </span>
            </h1>
            <p className="text-white/60 max-w-xl mx-auto text-lg">
              Describe your business and watch a real conversation unfold — how Ephesus AI handles your inbound inquiries from first contact to booking.
            </p>
          </div>
        </section>

        {/* Main area */}
        <section className="container mx-auto px-6 py-12 max-w-3xl">

          {/* ── Idle ── */}
          {stage === "idle" && (
            <div className="fade-up space-y-8">
              <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/5 backdrop-blur-sm">
                <div className="px-5 pt-5 pb-3">
                  <label className="block text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">
                    Describe your business
                  </label>
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g. I run a dental office in Austin, TX. We see about 30 patients a day..."
                    rows={3}
                    autoFocus
                    className="w-full bg-transparent text-white placeholder-white/20 text-base resize-none outline-none leading-relaxed"
                  />
                </div>
                <div className="px-5 pb-4 flex items-center justify-between border-t border-white/5 pt-3">
                  <p className="text-white/25 text-xs">Press Enter or click Run Demo</p>
                  <button
                    onClick={() => runDemo(input)}
                    disabled={!input.trim()}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0D9488] text-white text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#0F766E] transition-all duration-200 cursor-pointer shadow-md shadow-[#0D9488]/30"
                  >
                    <Send className="w-4 h-4" />
                    Run Demo
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-white/25 text-xs font-semibold uppercase tracking-widest text-center">Or try an example</p>
                <div className="flex flex-col gap-2">
                  {EXAMPLES.map((ex) => (
                    <button
                      key={ex}
                      onClick={() => { setInput(ex); runDemo(ex); }}
                      className="group text-left px-5 py-3.5 rounded-xl border border-white/8 bg-white/5 text-white/50 text-sm hover:text-white/90 hover:border-[#0D9488]/40 hover:bg-white/10 transition-all duration-200 cursor-pointer flex items-center gap-3"
                    >
                      <Building2 className="w-4 h-4 flex-shrink-0 text-white/20 group-hover:text-[#0D9488] transition-colors" />
                      {ex}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Loading ── */}
          {stage === "loading" && <LoadingState />}

          {/* ── Playing / Done ── */}
          {(stage === "playing" || stage === "done") && (
            <div className="fade-up space-y-4">
              <div className="flex items-center justify-between text-sm text-white/40 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-white/30" />
                  <span className="text-white/50 text-sm truncate max-w-xs">{businessLabel}</span>
                </div>
                <button
                  onClick={reset}
                  className="flex items-center gap-1 hover:text-white/70 transition-colors cursor-pointer text-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Try another
                </button>
              </div>

              {messages.slice(0, visibleCount).map((msg, i) => (
                <MessageBubble
                  key={i}
                  msg={msg}
                  active={i <= activeIndex || stage === "done"}
                  onDone={() => handleBubbleDone(i)}
                />
              ))}

              {responseTime !== null && stage === "done" && (
                <div className="flex justify-end fade-up">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    AI responded in {(responseTime / 1000).toFixed(1)}s
                  </div>
                </div>
              )}

              <div ref={bottomRef} />

              {stage === "done" && (
                <div className="fade-up pt-2">
                  <Card className="border-white/10 bg-white/5 backdrop-blur-sm p-8 text-center space-y-4">
                    <div className="text-xl font-bold text-white">
                      That&apos;s what your business gets —{" "}
                      <span className="bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">
                        every single inquiry.
                      </span>
                    </div>
                    <p className="text-white/50 text-sm max-w-md mx-auto">
                      Every call, email, and chat handled this way. 24 hours a day. No missed leads, no slow responses, no extra hiring.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                      <CalendlyButton>
                        <Button
                          size="lg"
                          className="gap-2 group bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-lg shadow-[#0D9488]/25 transition-all duration-300 cursor-pointer"
                        >
                          Get This For My Business
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </CalendlyButton>
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={reset}
                        className="gap-2 border-white/20 text-white/70 hover:bg-white/10 bg-transparent cursor-pointer"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Try a Different Business
                      </Button>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          )}

        </section>
      </main>

      <Footer />
    </div>
  );
}
