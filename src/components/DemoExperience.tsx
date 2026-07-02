'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Building2, CheckCircle2, RefreshCw, Send, Sparkles } from 'lucide-react';
import CalendlyButton from '@/components/CalendlyButton';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Message = { role: 'customer' | 'ai'; text: string };

const EXAMPLES = [
  'I run a dental office in Austin, TX. We see about 30 patients a day.',
  'I own a real estate agency in Miami with 5 agents.',
  'I have a barbershop in Chicago - we get tons of walk-ins and calls.',
  "We're a small law firm specializing in personal injury cases.",
  'I run an HVAC company serving the greater Dallas area.',
];

function parseConversation(raw: string): Message[] {
  const messages: Message[] = [];
  const regex = /(CUSTOMER\s*\d+|AI\s*\d+)\s*:\s*([\s\S]*?)(?=(?:CUSTOMER\s*\d+|AI\s*\d+)\s*:|$)/gi;
  let match;

  while ((match = regex.exec(raw)) !== null) {
    const label = match[1].trim().toUpperCase();
    const text = match[2].trim();
    if (text) messages.push({ role: label.startsWith('CUSTOMER') ? 'customer' : 'ai', text });
  }

  return messages;
}

function useTypingText(target: string, active: boolean, onDone: () => void) {
  const [displayed, setDisplayed] = useState('');
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (!active || !target) return;

    setDisplayed('');
    let index = 0;

    function tick() {
      const chunk = Math.floor(Math.random() * 3) + 3;
      index = Math.min(index + chunk, target.length);
      setDisplayed(target.slice(0, index));

      if (index < target.length) {
        frameRef.current = setTimeout(tick, 18 + Math.random() * 14);
      } else {
        onDoneRef.current();
      }
    }

    frameRef.current = setTimeout(tick, 80);
    return () => {
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [target, active]);

  return displayed;
}

function MessageBubble({ msg, active, onDone }: { msg: Message; active: boolean; onDone: () => void }) {
  const isAi = msg.role === 'ai';
  const [visible, setVisible] = useState(false);
  const displayed = useTypingText(msg.text, !isAi && active, onDone);

  useEffect(() => {
    if (!isAi || !active) return;

    const showTimer = setTimeout(() => setVisible(true), 40);
    const doneTimer = setTimeout(onDone, 1000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(doneTimer);
    };
  }, [active, isAi, onDone]);

  if (!active) return null;

  if (isAi) {
    return (
      <div
        className="flex flex-row items-end gap-2"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(14px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <div className="mb-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] shadow-sm">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <div className="max-w-[82%] space-y-1 sm:max-w-[75%]">
          <span className="pl-1 text-xs text-slate-400">Your Business (Powered by Ephesus AI)</span>
          <div className="rounded-2xl rounded-tl-sm bg-[#E9E9EB] px-4 py-3 shadow-sm">
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#1C1C1E]">{msg.text}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row-reverse items-end gap-2">
      <div className="flex max-w-[82%] flex-col items-end space-y-1 sm:max-w-[75%]">
        <span className="pr-1 text-xs text-slate-400">Customer</span>
        <div className="rounded-2xl rounded-tr-sm bg-[#0D9488] px-4 py-3 shadow-sm">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-white">
            {displayed}
            {displayed.length < msg.text.length && (
              <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-white align-middle opacity-70" />
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-5 py-4">
      <div className="flex items-center gap-3 text-sm text-slate-400">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#0D9488]/40 border-t-[#0D9488]" />
        Generating your conversation...
      </div>
      {[0, 1, 2].map(index => (
        <div key={index} className={cn('flex items-start gap-3', index % 2 === 1 && 'flex-row-reverse')}>
          <div className="h-9 w-9 flex-shrink-0 animate-pulse rounded-full bg-slate-200/10" />
          <div className="flex-1 space-y-2">
            <div className="h-3 animate-pulse rounded bg-slate-200/10" style={{ width: `${40 + index * 15}%` }} />
            <div className="h-16 animate-pulse rounded-2xl bg-slate-200/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DemoExperience({ className, compact = false }: { className?: string; compact?: boolean }) {
  const [input, setInput] = useState('');
  const [stage, setStage] = useState<'idle' | 'loading' | 'playing' | 'done'>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [businessLabel, setBusinessLabel] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fetchStartRef = useRef(0);

  useEffect(() => {
    if (visibleCount > 0) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 100);
    }
  }, [visibleCount]);

  function handleBubbleDone(index: number) {
    const nextIndex = index + 1;

    if (nextIndex < messages.length) {
      const delay = messages[index].role === 'customer' ? 800 : 600;
      setTimeout(() => {
        setVisibleCount(nextIndex + 1);
        setActiveIndex(nextIndex);
      }, delay);
    } else {
      setActiveIndex(-1);
      setStage('done');
    }
  }

  async function runDemo(description: string) {
    if (!description.trim()) return;

    setBusinessLabel(description.trim());
    setStage('loading');
    setMessages([]);
    setVisibleCount(0);
    setActiveIndex(-1);
    setResponseTime(null);
    fetchStartRef.current = Date.now();

    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessDescription: description.trim() }),
      });
      const data = await res.json();
      const parsed = parseConversation(data.conversation ?? '');
      const elapsed = Date.now() - fetchStartRef.current;

      if (!parsed.length) {
        setStage('idle');
        return;
      }

      setResponseTime(elapsed);
      setMessages(parsed);
      setTimeout(() => {
        setStage('playing');
        setVisibleCount(1);
        setActiveIndex(0);
      }, 400);
    } catch (error) {
      console.error(error);
      setStage('idle');
    }
  }

  function reset() {
    setStage('idle');
    setInput('');
    setMessages([]);
    setVisibleCount(0);
    setActiveIndex(-1);
    setResponseTime(null);
    setBusinessLabel('');
    setTimeout(() => textareaRef.current?.focus(), 100);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      runDemo(input);
    }
  }

  return (
    <div className={cn('mx-auto w-full max-w-3xl', className)}>
      {stage === 'idle' && (
        <div className="space-y-6">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-2xl shadow-slate-950/20 backdrop-blur-sm">
            <div className="px-5 pb-3 pt-5">
              <label className="mb-3 block text-xs font-semibold uppercase tracking-widest text-slate-400">
                Describe your business
              </label>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={event => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g. I run a dental office in Austin, TX. We see about 30 patients a day..."
                rows={compact ? 3 : 4}
                autoFocus={!compact}
                className="w-full resize-none bg-transparent text-base leading-relaxed text-white outline-none placeholder:text-white/25"
              />
            </div>
            <div className="flex flex-col gap-3 border-t border-white/5 px-5 pb-4 pt-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-500">Press Enter or click Run Demo</p>
              <button
                onClick={() => runDemo(input)}
                disabled={!input.trim()}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#0D9488] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#0D9488]/30 transition-all duration-200 hover:bg-[#0F766E] disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Send className="h-4 w-4" />
                Run Demo
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-500">Or try an example</p>
            <div className="flex flex-col gap-2">
              {EXAMPLES.map(example => (
                <button
                  key={example}
                  onClick={() => {
                    setInput(example);
                    runDemo(example);
                  }}
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-5 py-3.5 text-left text-sm text-slate-400 transition-all duration-200 hover:border-[#0D9488]/40 hover:bg-white/10 hover:text-white"
                >
                  <Building2 className="h-4 w-4 flex-shrink-0 text-slate-500 transition-colors group-hover:text-[#0D9488]" />
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {stage === 'loading' && <LoadingState />}

      {(stage === 'playing' || stage === 'done') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 text-sm text-slate-400">
            <div className="flex min-w-0 items-center gap-2">
              <Building2 className="h-3.5 w-3.5 flex-shrink-0 text-slate-500" />
              <span className="truncate text-sm text-slate-300">{businessLabel}</span>
            </div>
            <button onClick={reset} className="flex flex-shrink-0 items-center gap-1 text-xs transition-colors hover:text-white">
              <RefreshCw className="h-3.5 w-3.5" /> Try another
            </button>
          </div>

          {messages.slice(0, visibleCount).map((msg, index) => (
            <MessageBubble
              key={`${msg.role}-${index}`}
              msg={msg}
              active={index <= activeIndex || stage === 'done'}
              onDone={() => handleBubbleDone(index)}
            />
          ))}

          {responseTime !== null && stage === 'done' && (
            <div className="flex justify-end">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="h-3 w-3" />
                AI responded in {(responseTime / 1000).toFixed(1)}s
              </div>
            </div>
          )}

          <div ref={bottomRef} />

          {stage === 'done' && (
            <Card className="space-y-4 border-white/10 bg-white/[0.06] p-6 text-center backdrop-blur-sm sm:p-8">
              <div className="text-xl font-bold text-white">
                That&apos;s what your business gets -{' '}
                <span className="bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">
                  every single inquiry.
                </span>
              </div>
              <p className="mx-auto max-w-md text-sm text-slate-400">
                Every call, email, and chat handled this way. 24 hours a day. No missed leads, no slow responses, no extra hiring.
              </p>
              <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
                <CalendlyButton>
                  <Button size="lg" className="group gap-2 bg-[#0D9488] text-white shadow-lg shadow-[#0D9488]/25 hover:bg-[#0F766E]">
                    Get This For My Business
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CalendlyButton>
                <Button size="lg" variant="outline" onClick={reset} className="gap-2 border-white/20 bg-transparent text-white/80 hover:bg-white/10">
                  <RefreshCw className="h-4 w-4" />
                  Try a Different Business
                </Button>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
