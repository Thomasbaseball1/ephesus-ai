import {
  Activity,
  Bot,
  Instagram,
  Mail,
  MessageSquare,
  PhoneCall,
  RefreshCw,
} from "lucide-react";

const channels = [
  { label: "Voice", icon: PhoneCall, position: "left-[5%] top-[12%]", status: "3 calls" },
  { label: "Email", icon: Mail, position: "right-[5%] top-[12%]", status: "12 handled" },
  { label: "Chat", icon: MessageSquare, position: "left-[2%] bottom-[13%]", status: "8 active" },
  { label: "Instagram", icon: Instagram, position: "right-[2%] bottom-[13%]", status: "4 replies" },
];

export default function HeroControlRoom() {
  return (
    <div className="hero-console" aria-label="Live Ephesus AI communications overview">
      <div className="hero-console__header">
        <div>
          <p className="hero-console__eyebrow">Ephesus command center</p>
          <p className="hero-console__title">Every channel, one intelligence.</p>
        </div>
        <div className="hero-console__status">
          <span className="hero-console__pulse" />
          Live
        </div>
      </div>

      <div className="hero-network">
        <svg aria-hidden="true" className="hero-network__lines" viewBox="0 0 600 400" preserveAspectRatio="none">
          <path d="M300 200 L92 72" />
          <path d="M300 200 L508 72" />
          <path d="M300 200 L88 330" />
          <path d="M300 200 L512 330" />
        </svg>

        <div className="hero-network__core">
          <div className="hero-network__core-ring">
            <Bot className="h-7 w-7" />
          </div>
          <span>AI orchestration</span>
          <small>Responding in 1.8s</small>
        </div>

        {channels.map(({ label, icon: Icon, position, status }) => (
          <div className={`hero-network__node ${position}`} key={label}>
            <span className="hero-network__icon"><Icon className="h-4 w-4" /></span>
            <span>
              <strong>{label}</strong>
              <small>{status}</small>
            </span>
          </div>
        ))}
      </div>

      <div className="hero-console__footer">
        <div className="hero-console__event">
          <span className="hero-console__event-icon"><Activity className="h-4 w-4" /></span>
          <span><strong>New lead qualified</strong><small>Website chat / just now</small></span>
        </div>
        <div className="hero-console__metric">
          <RefreshCw className="h-3.5 w-3.5" />
          99.9% uptime
        </div>
      </div>
    </div>
  );
}
