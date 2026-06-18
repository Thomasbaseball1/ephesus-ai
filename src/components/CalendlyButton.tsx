"use client";

const CALENDLY_URL = "https://calendly.com/d/cxqx-9wy-6ks/ephesus-ai-automation-consultation";

interface CalendlyButtonProps {
  children: React.ReactNode;
}

export default function CalendlyButton({ children }: CalendlyButtonProps) {
  const openCalendly = (e: React.MouseEvent) => {
    e.preventDefault();
    // @ts-ignore – Calendly is loaded via external script
    if (typeof Calendly !== "undefined") {
      // @ts-ignore
      Calendly.initPopupWidget({ url: CALENDLY_URL });
    } else {
      // Fallback: open in new tab if script hasn't loaded
      window.open(CALENDLY_URL, "_blank");
    }
  };

  return (
    <span onClick={openCalendly} style={{ cursor: "pointer", display: "contents" }}>
      {children}
    </span>
  );
}
