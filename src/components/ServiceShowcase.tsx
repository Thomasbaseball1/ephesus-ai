"use client";

import { useState, useEffect, useRef } from "react";
import { PhoneCall, Mail, MessageSquare, RefreshCw, CheckCircle, Send, Dot, Instagram } from "lucide-react";

/* ─── Types ─── */
type TabId = "voice" | "email" | "chatbot" | "instagram" | "revival";

/* ─── Voice Panel ─── */
const CALL_LINES = [
  { role: "caller", text: "Hi, I'd like to schedule an appointment." },
  { role: "ai",     text: "Of course! I'm the Ephesus AI assistant. What day works best for you?" },
  { role: "caller", text: "How about Thursday afternoon?" },
  { role: "ai",     text: "Thursday at 2:00 PM works great. Can I get your name and email?" },
  { role: "caller", text: "Sure — Michael Torres, michael@example.com." },
  { role: "ai",     text: "Perfect, Michael! You're booked for Thursday at 2 PM. A confirmation is on its way." },
];

function VoicePanel({ started }: { started: boolean }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isRinging, setIsRinging] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleCount]);

  useEffect(() => {
    if (!started) return;
    const ringTimeout = setTimeout(() => setIsRinging(false), 850);
    return () => clearTimeout(ringTimeout);
  }, [started]);

  useEffect(() => {
    if (!started) return;
    if (isRinging) return;
    if (visibleCount >= CALL_LINES.length) return;
    timerRef.current = setTimeout(() => setVisibleCount((c) => c + 1), 900);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [visibleCount, isRinging, started]);

  return (
    <div className="flex flex-col h-full">
      {/* Phone header */}
      <div className="flex items-center gap-3 p-4 bg-[#0F172A] rounded-t-2xl border-b border-white/10">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isRinging ? "animate-pulse bg-green-500/30" : "bg-green-500/20"}`}>
          <PhoneCall className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <div className="text-sm font-semibold text-white">
            {isRinging ? "Incoming Call…" : visibleCount >= CALL_LINES.length ? "Call Complete" : "Call in Progress"}
          </div>
          <div className="text-xs text-white/50">{isRinging ? "AI Receptionist answering" : "00:42"}</div>
        </div>
        <div className={`ml-auto w-2.5 h-2.5 rounded-full ${isRinging ? "bg-amber-300 animate-pulse" : "bg-[#77ead6]"}`} />
      </div>

      {/* Transcript */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#111827] rounded-b-2xl">
        {isRinging ? (
          <div className="flex items-center justify-center h-full gap-2 text-white/40 text-sm">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-green-400 animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-green-400 animate-bounce" />
          </div>
        ) : (
          CALL_LINES.slice(0, visibleCount).map((line, i) => (
            <div
              key={i}
              className={`flex gap-2 items-start transition-all duration-500 ${line.role === "ai" ? "" : "flex-row-reverse"}`}
              style={{ animation: "fadeSlideIn 0.4s ease forwards" }}
            >
              <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold ${line.role === "ai" ? "bg-gradient-to-br from-[#0D9488] to-[#2DD4BF]" : "bg-white/20"}`}>
                {line.role === "ai" ? "AI" : "C"}
              </div>
              <div className={`max-w-[75%] px-3 py-2 rounded-xl text-xs leading-relaxed ${line.role === "ai" ? "bg-white/10 text-white/80 rounded-tl-sm" : "bg-[#0D9488]/20 text-[#99F6E4] rounded-tr-sm"}`}>
                {line.text}
              </div>
            </div>
          ))
        )}
        {!isRinging && visibleCount >= CALL_LINES.length && (
          <div className="flex justify-center pt-2">
            <span className="text-xs text-green-400 bg-green-400/10 px-3 py-1 rounded-full flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> Appointment booked automatically
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Email Panel ─── */
type EmailStep = "idle" | "arriving" | "analyzing" | "drafting" | "sent";

const DRAFT_TEXT = "Hi Sarah, thanks for reaching out! We'd love to connect. Our team typically responds within the hour, but I can already share that we offer a free 30-minute consultation. Would Thursday at 2 PM or Friday at 10 AM work for you? — Ephesus AI";

function EmailPanel({ started }: { started: boolean }) {
  const [step, setStep] = useState<EmailStep>("idle");
  const [draftIndex, setDraftIndex] = useState(0);

  useEffect(() => {
    if (!started) return;
    const seq: [EmailStep, number][] = [
      ["arriving", 650],
      ["analyzing", 950],
      ["drafting", 1700],
      ["sent", 0],
    ];
    let t: NodeJS.Timeout;
    let si = 0;

    const run = () => {
      if (si >= seq.length) return;
      const [s, delay] = seq[si++];
      setStep(s);
      if (delay > 0) t = setTimeout(run, delay);
      else run();
    };

    t = setTimeout(run, 600);
    return () => clearTimeout(t);
  }, [started]);

  useEffect(() => {
    if (step !== "drafting") return;
    if (draftIndex >= DRAFT_TEXT.length) return;
    const t = setTimeout(() => setDraftIndex((d) => d + 2), 18);
    return () => clearTimeout(t);
  }, [step, draftIndex]);

  return (
    <div className="flex flex-col h-full bg-[#111827] rounded-2xl overflow-hidden">
      {/* Inbox header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#0F172A] border-b border-white/10">
        <Mail className="w-4 h-4 text-[#0D9488]" />
        <span className="text-white text-sm font-medium">Inbox — support@ephesusai.com</span>
        {step === "arriving" && (
          <span className="ml-auto text-[10px] bg-[#0D9488] text-white px-2 py-0.5 rounded-full animate-pulse">1 new</span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Incoming email */}
        {(step === "arriving" || step === "analyzing" || step === "drafting" || step === "sent") && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-1.5 transition-all duration-500">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white">Sarah Johnson &lt;sarah@acme.co&gt;</span>
              <span className="text-[10px] text-white/40">just now</span>
            </div>
            <div className="text-xs font-medium text-white/70">Quick question about your AI services</div>
            <div className="text-[11px] text-white/40 leading-relaxed">Hey, I came across your website and I'm curious about how your AI chatbot works. Could someone reach out?</div>
          </div>
        )}

        {/* AI analyzing */}
        {(step === "analyzing") && (
          <div className="flex items-center gap-2 text-xs text-[#0D9488] animate-pulse">
            <div className="w-4 h-4 border-2 border-[#0D9488] border-t-transparent rounded-full animate-spin" />
            AI is reading and categorizing this email…
          </div>
        )}

        {/* Draft / sent */}
        {(step === "drafting" || step === "sent") && (
          <div className={`bg-[#0D9488]/10 border ${step === "sent" ? "border-green-500/30" : "border-[#0D9488]/20"} rounded-xl p-3 space-y-2 transition-all duration-500`}>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] flex items-center justify-center text-[9px] font-bold text-white">AI</div>
              <span className="text-xs text-white/60">AI Draft Response</span>
              {step === "sent" && <span className="ml-auto text-[10px] text-green-400 flex items-center gap-1"><CheckCircle className="w-3 h-3" />Sent</span>}
            </div>
            <p className="text-[11px] text-white/70 leading-relaxed">
              {step === "sent" ? DRAFT_TEXT : DRAFT_TEXT.slice(0, draftIndex)}
              {step === "drafting" && draftIndex < DRAFT_TEXT.length && <span className="inline-block w-0.5 h-3 bg-[#0D9488] ml-0.5 animate-pulse" />}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Chatbot Panel ─── */
type ChatMsg = { role: "visitor" | "ai"; text: string };

const CHAT_SCRIPT: ChatMsg[] = [
  { role: "visitor", text: "What does your AI chatbot actually do?" },
  { role: "ai",      text: "Great question! It lives on your website, answers visitor questions 24/7, captures leads, and books calls — all without you lifting a finger." },
  { role: "visitor", text: "How long does setup take?" },
  { role: "ai",      text: "Usually under 48 hours. We handle everything — just drop one line of code on your site and you're live." },
  { role: "visitor", text: "Can it book a demo for me right now?" },
  { role: "ai",      text: "Absolutely! I've opened the scheduling page for you. Pick a time and we'll walk you through everything live. 🎉" },
];

function ChatbotPanel({ started }: { started: boolean }) {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [typing, setTyping] = useState(false);
  const [step, setStep] = useState(0);
  const ref = useRef<NodeJS.Timeout | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  useEffect(() => {
    if (!started) return;
    if (step >= CHAT_SCRIPT.length) return;
    const line = CHAT_SCRIPT[step];
    if (line.role === "ai") {
      setTyping(true);
      ref.current = setTimeout(() => {
        setTyping(false);
        setMessages((m) => [...m, line]);
        setStep((s) => s + 1);
      }, 1050);
    } else {
      ref.current = setTimeout(() => {
        setMessages((m) => [...m, line]);
        setStep((s) => s + 1);
      }, step === 0 ? 650 : 850);
    }
    return () => { if (ref.current) clearTimeout(ref.current); };
  }, [step, started]);

  return (
    <div className="flex flex-col h-full bg-[#111827] rounded-2xl overflow-hidden">
      {/* Chat header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#0F172A] border-b border-white/10">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] flex items-center justify-center text-white text-xs font-bold">AI</div>
        <div>
          <div className="text-sm font-semibold text-white">Ephesus AI Assistant</div>
          <div className="flex items-center gap-1 text-[10px] text-green-400"><Dot className="w-3 h-3" />Online — typically replies instantly</div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "visitor" ? "justify-end" : "justify-start"}`} style={{ animation: "fadeSlideIn 0.3s ease forwards" }}>
            <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${msg.role === "visitor" ? "bg-[#0D9488] text-white rounded-tr-sm" : "bg-white/10 text-white/80 rounded-tl-sm"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
              {[0, 150, 300].map((d) => (
                <div key={d} className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: `${d}ms` }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-t border-white/10">
        <div className="flex-1 bg-white/10 rounded-full px-4 py-2 text-xs text-white/30">Type a message…</div>
        <button className="w-7 h-7 rounded-full bg-[#0D9488] flex items-center justify-center">
          <Send className="w-3 h-3 text-white" />
        </button>
      </div>
    </div>
  );
}

/* ─── Lead Revival Panel ─── */
const LEADS = [
  { name: "Acme Corp", contact: "james@acme.co", lastContact: "67 days ago", status: "cold" },
  { name: "Riverstone LLC", contact: "dana@riverstone.io", lastContact: "43 days ago", status: "cold" },
  { name: "BluePeak Media", contact: "tom@bluepeak.com", lastContact: "31 days ago", status: "cold" },
  { name: "NovaTech", contact: "priya@novatech.co", lastContact: "55 days ago", status: "cold" },
];

type LeadState = "cold" | "emailed" | "opened" | "replied";

function RevivalPanel({ started }: { started: boolean }) {
  const [leadStates, setLeadStates] = useState<LeadState[]>(["cold", "cold", "cold", "cold"]);
  const [campaignActive, setCampaignActive] = useState(false);
  const [emailsSent, setEmailsSent] = useState(0);

  useEffect(() => {
    if (!started) return;
    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => setCampaignActive(true), 600));
    timers.push(setTimeout(() => { setLeadStates(["emailed", "cold", "cold", "cold"]); setEmailsSent(1); }, 1400));
    timers.push(setTimeout(() => { setLeadStates(["emailed", "emailed", "cold", "cold"]); setEmailsSent(2); }, 2200));
    timers.push(setTimeout(() => { setLeadStates(["emailed", "emailed", "emailed", "cold"]); setEmailsSent(3); }, 3000));
    timers.push(setTimeout(() => { setLeadStates(["emailed", "emailed", "emailed", "emailed"]); setEmailsSent(4); }, 3800));
    timers.push(setTimeout(() => { setLeadStates(["opened", "emailed", "emailed", "emailed"]); }, 4800));
    timers.push(setTimeout(() => { setLeadStates(["replied", "emailed", "opened", "emailed"]); }, 6000));
    return () => timers.forEach(clearTimeout);
  }, [started]);

  const stateLabel: Record<LeadState, { label: string; cls: string }> = {
    cold:    { label: "Cold",     cls: "text-white/40 bg-white/5 border-white/10" },
    emailed: { label: "Emailed",  cls: "text-[#0D9488] bg-[#0D9488]/10 border-[#0D9488]/20" },
    opened:  { label: "Opened",   cls: "text-[#2DD4BF] bg-[#2DD4BF]/10 border-[#2DD4BF]/20" },
    replied: { label: "Replied ✓", cls: "text-green-400 bg-green-400/10 border-green-400/30" },
  };

  return (
    <div className="flex flex-col h-full bg-[#111827] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#0F172A] border-b border-white/10">
        <RefreshCw className={`w-4 h-4 text-[#2DD4BF] ${campaignActive ? "animate-spin" : ""}`} />
        <span className="text-sm font-medium text-white">Lead Revival Campaign</span>
        <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full border ${campaignActive ? "text-green-400 bg-green-400/10 border-green-400/20 animate-pulse" : "text-white/30 bg-white/5 border-white/10"}`}>
          {campaignActive ? "● Active" : "Idle"}
        </span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 px-4 pt-3 pb-1">
        {[
          { label: "Emails Sent", val: emailsSent },
          { label: "Opened", val: leadStates.filter(s => s === "opened" || s === "replied").length },
          { label: "Replied", val: leadStates.filter(s => s === "replied").length },
        ].map(({ label, val }) => (
          <div key={label} className="bg-white/5 rounded-lg px-2 py-2 text-center">
            <div className="text-lg font-black text-white">{val}</div>
            <div className="text-[9px] text-white/40 uppercase tracking-wider">{label}</div>
          </div>
        ))}
      </div>

      {/* Lead rows */}
      <div className="flex-1 px-4 py-2 space-y-2 overflow-y-auto">
        {LEADS.map((lead, i) => {
          const state = leadStates[i];
          const { label, cls } = stateLabel[state];
          return (
            <div
              key={lead.name}
              className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all duration-500 ${state === "replied" ? "bg-green-400/5 border-green-400/20" : "bg-white/3 border-white/8"}`}
            >
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/60 flex-shrink-0">
                {lead.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-white truncate">{lead.name}</div>
                <div className="text-[10px] text-white/30 truncate">{lead.contact}</div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${cls} transition-all duration-300`}>{label}</span>
                <span className="text-[9px] text-white/25">{lead.lastContact}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Instagram DM Panel ─── */
type DmStep = "idle" | "followed" | "sending" | "sent" | "replied";

const DM_REPLY = "Wow, this is exactly what I need! Can we hop on a call?";

function InstagramPanel({ started }: { started: boolean }) {
  const [step, setStep] = useState<DmStep>("idle");
  const [replyIndex, setReplyIndex] = useState(0);

  useEffect(() => {
    if (!started) return;
    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => setStep("followed"), 700));
    timers.push(setTimeout(() => setStep("sending"), 1800));
    timers.push(setTimeout(() => setStep("sent"), 3200));
    timers.push(setTimeout(() => setStep("replied"), 5000));
    return () => timers.forEach(clearTimeout);
  }, [started]);

  useEffect(() => {
    if (step !== "replied") return;
    if (replyIndex >= DM_REPLY.length) return;
    const t = setTimeout(() => setReplyIndex((i) => i + 1), 28);
    return () => clearTimeout(t);
  }, [step, replyIndex]);

  const DM_MESSAGE = "Hey @jsmith 👋 Thanks so much for the follow! We help businesses automate their communications with AI — saving hours every week. Want to see a free demo? Just reply 'YES' and I'll get you set up! 🚀";

  return (
    <div className="flex flex-col h-full rounded-2xl overflow-hidden" style={{ background: '#0d0814' }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10"
        style={{ background: 'rgba(225,48,108,0.08)' }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #f09433, #dc2743, #bc1888)' }}>
          <Instagram className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Instagram DM Automation</div>
          <div className="text-[10px] text-white/40">n8n workflow · live</div>
        </div>
        <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full border transition-all duration-500 ${step !== "idle" ? "text-green-400 bg-green-400/10 border-green-400/20 animate-pulse" : "text-white/30 bg-white/5 border-white/10"}`}>
          {step !== "idle" ? "● Active" : "Watching"}
        </span>
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {/* New follower event */}
        {step !== "idle" && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all duration-500"
            style={{ background: 'rgba(225,48,108,0.08)', border: '1px solid rgba(225,48,108,0.2)', animation: 'fadeSlideIn 0.4s ease forwards' }}>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0">J</div>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}><span style={{ color: '#f472b6', fontWeight: 600 }}>@jsmith</span> just followed your account</span>
            <span className="ml-auto text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>now</span>
          </div>
        )}

        {/* Workflow trigger */}
        {(step === "sending" || step === "sent" || step === "replied") && (
          <div className="flex items-center gap-2 text-xs" style={{ color: '#0D9488', animation: 'fadeSlideIn 0.4s ease forwards' }}>
            <div className="w-4 h-4 border-2 border-[#0D9488] border-t-transparent rounded-full animate-spin" />
            n8n workflow triggered — composing DM…
          </div>
        )}

        {/* Outgoing DM */}
        {(step === "sent" || step === "replied") && (
          <div style={{ animation: 'fadeSlideIn 0.5s ease forwards' }}>
            <div className="flex gap-2 items-end flex-row-reverse">
              <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #E1306C, #833AB4)' }}>AI</div>
              <div className="max-w-[80%] px-3 py-2.5 rounded-2xl rounded-br-sm text-xs leading-relaxed text-white"
                style={{ background: 'linear-gradient(135deg, rgba(225,48,108,0.5), rgba(131,58,180,0.5))', border: '1px solid rgba(225,48,108,0.3)' }}>
                {DM_MESSAGE}
              </div>
            </div>
            <div className="flex justify-end mt-1 mr-9">
              <span className="text-[10px] flex items-center gap-1" style={{ color: '#E1306C' }}>
                <CheckCircle className="w-3 h-3" /> Delivered
              </span>
            </div>
          </div>
        )}

        {/* Incoming reply */}
        {step === "replied" && (
          <div className="flex gap-2 items-end" style={{ animation: 'fadeSlideIn 0.4s ease forwards' }}>
            <div className="w-7 h-7 rounded-full flex-shrink-0 bg-white/20 flex items-center justify-center text-[9px] font-bold text-white">J</div>
            <div className="max-w-[80%] px-3 py-2.5 rounded-2xl rounded-bl-sm text-xs leading-relaxed"
              style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.85)' }}>
              {DM_REPLY.slice(0, replyIndex)}
              {replyIndex < DM_REPLY.length && <span className="inline-block w-0.5 h-3 ml-0.5 animate-pulse" style={{ background: '#E1306C' }} />}
            </div>
          </div>
        )}

        {/* Stats */}
        {(step === "sent" || step === "replied") && (
          <div className="grid grid-cols-3 gap-2 pt-1" style={{ animation: 'fadeSlideIn 0.5s ease forwards' }}>
            {[
              { label: "DMs Sent", val: "47" },
              { label: "Reply Rate", val: "34%" },
              { label: "Demos Booked", val: "12" },
            ].map(({ label, val }) => (
              <div key={label} className="text-center p-2 rounded-xl"
                style={{ background: 'rgba(225,48,108,0.06)', border: '1px solid rgba(225,48,108,0.12)' }}>
                <div className="text-base font-black" style={{ background: 'linear-gradient(135deg, #E1306C, #833AB4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{val}</div>
                <div className="text-[9px] mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
const TABS: { id: TabId; label: string; icon: typeof PhoneCall; desc: string }[] = [
  {
    id: "voice",
    label: "Voice Receptionist",
    icon: PhoneCall,
    desc: "AI picks up every call, handles the conversation, and books appointments — automatically.",
  },
  {
    id: "email",
    label: "Email Automation",
    icon: Mail,
    desc: "Inbound emails are read, categorized, and replied to by AI — in seconds, not hours.",
  },
  {
    id: "chatbot",
    label: "Website Chatbot",
    icon: MessageSquare,
    desc: "Visitors get instant answers and warm handoffs — your site converts 24/7 without you.",
  },
  {
    id: "instagram",
    label: "Instagram Suite",
    icon: Instagram,
    desc: "Every new follower gets a personalized welcome DM the instant they follow — automatically.",
  },
  {
    id: "revival",
    label: "Lead Revival",
    icon: RefreshCw,
    desc: "Cold leads get re-engaged with personalized campaigns that fire on autopilot.",
  },
];

export default function ServiceShowcase() {
  const [active, setActive] = useState<TabId>("voice");
  const [inView, setInView] = useState(false);
  // Track which tabs have been started so switching tabs replays if not yet started,
  // but keeps the final state if they were already triggered.
  const [startedTabs, setStartedTabs] = useState<Set<TabId>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  // Observe when section enters viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // only need to trigger once
        }
      },
      { threshold: 0.15 } // start when 15% of the section is visible
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // When the section comes into view, mark the active tab as started
  useEffect(() => {
    if (inView) {
      setStartedTabs((prev) => new Set([...prev, active]));
    }
  }, [inView, active]);

  // When user switches tabs (after section is in view), start that tab too
  const handleTabClick = (id: TabId) => {
    setActive(id);
    if (inView) {
      setStartedTabs((prev) => new Set([...prev, id]));
    }
  };

  const activeTab = TABS.find((t) => t.id === active)!;

  return (
    <section ref={sectionRef} className="dark-panel relative overflow-hidden py-24 md:py-32">
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#0D9488_0%,_transparent_60%)] opacity-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_#2DD4BF_0%,_transparent_60%)] opacity-10" />

      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            See It In Action
          </div>
          <h2 className="text-4xl font-medium tracking-[-0.045em] text-white md:text-6xl">
            Watch the AI{" "}
            <span className="font-display font-normal italic text-[#8ff5e3]">
              Work in Real Time
            </span>
          </h2>
          <p className="text-white/60 mt-4 max-w-xl mx-auto">
            Click any service below to see a live simulation of how Ephesus AI handles it — automatically.
          </p>
        </div>

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleTabClick(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 border cursor-pointer ${
                active === id
                  ? "border-[#77ead6]/30 bg-[#77ead6]/12 text-[#9af3e3] shadow-[0_10px_30px_rgba(94,234,212,0.08)]"
                  : "border-white/10 bg-white/[0.025] text-white/50 hover:bg-white/[0.055] hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Main showcase */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: description */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#77ead6]/20 bg-[#77ead6]/10 shadow-[0_16px_40px_rgba(94,234,212,0.1)]">
              <activeTab.icon className="w-7 h-7 text-[#8ff5e3]" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{activeTab.label}</h3>
              <p className="text-white/60 leading-relaxed">{activeTab.desc}</p>
            </div>
            <ul className="space-y-3">
              {active === "voice" && ["Answers every call in under 2 seconds", "Handles FAQs, routing & scheduling", "Natural conversation — no scripts needed", "Sends booking confirmations automatically"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/70"><CheckCircle className="w-4 h-4 text-[#0D9488] flex-shrink-0" />{f}</li>
              ))}
              {active === "email" && ["Reads and categorizes inbound emails instantly", "Drafts and sends AI responses in seconds", "Escalates complex issues to your team", "Learns your tone and brand voice"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/70"><CheckCircle className="w-4 h-4 text-[#2DD4BF] flex-shrink-0" />{f}</li>
              ))}
              {active === "chatbot" && ["Engages every visitor the moment they land", "Qualifies leads before your team talks to them", "Books calls directly from the chat", "Embedded with a single line of code"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/70"><CheckCircle className="w-4 h-4 text-[#14B8A6] flex-shrink-0" />{f}</li>
              ))}
              {active === "instagram" && ["Fires instantly when someone follows your account", "Personalized DMs — not generic copy-paste", "Runs 24/7 via n8n workflow integration", "Track reply rates and demo bookings live"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/70"><CheckCircle className="w-4 h-4 flex-shrink-0 text-[#77ead6]" />{f}</li>
              ))}
              {active === "revival" && ["Sends personalized drip sequences automatically", "Tracks email opens and link clicks in real time", "Fires follow-ups when leads re-engage", "Surfaces replies directly to your inbox"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/70"><CheckCircle className="w-4 h-4 text-[#2DD4BF] flex-shrink-0" />{f}</li>
              ))}
            </ul>
          </div>

          {/* Right: animated panel */}
          <div className="showcase-panel h-[520px] overflow-hidden rounded-[26px]" key={active}>
            {active === "voice"     && <VoicePanel     started={startedTabs.has("voice")}     />}
            {active === "email"     && <EmailPanel     started={startedTabs.has("email")}     />}
            {active === "chatbot"   && <ChatbotPanel   started={startedTabs.has("chatbot")}   />}
            {active === "instagram" && <InstagramPanel started={startedTabs.has("instagram")} />}
            {active === "revival"   && <RevivalPanel   started={startedTabs.has("revival")}   />}
          </div>
        </div>
      </div>
    </section>
  );
}
