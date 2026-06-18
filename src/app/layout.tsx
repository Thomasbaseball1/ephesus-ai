import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import VapiWrapper from "@/components/VapiWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ephesus AI Solutions - Transform Your Business with AI Intelligence",
  description: "Strategic AI consulting, implementation, and training services to help organizations harness the power of artificial intelligence.",
  keywords: ["AI consulting", "artificial intelligence", "AI implementation", "AI training", "business AI solutions", "AI voice receptionist", "custom AI development"],
  authors: [{ name: "Ephesus AI Solutions" }],
  icons: {
    icon: [
      {
        url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Ephesus-AI-Favicon-1762660286103.png?width=8000&height=8000&resize=contain",
        type: "image/png",
      },
    ],
    shortcut: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Ephesus-AI-Favicon-1762660286103.png?width=8000&height=8000&resize=contain",
    apple: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Ephesus-AI-Favicon-1762660286103.png?width=8000&height=8000&resize=contain",
  },
  openGraph: {
    title: "Ephesus AI Solutions - Transform Your Business with AI Intelligence",
    description: "Transform your business with AI intelligence. Strategic consulting, implementation, and training services.",
    url: "https://ephesusai.com",
    siteName: "Ephesus AI Solutions",
    images: [
      {
        url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/012aedf7-7f54-474b-b9df-37d694d8ba5a/generated_images/single-bold-letter-e-logo-in-modern-roun-3069783e-20251109033000.jpg",
        width: 1200,
        height: 630,
        alt: "Ephesus AI Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ephesus AI Solutions - Transform Your Business with AI Intelligence",
    description: "Transform your business with AI intelligence. Strategic consulting, implementation, and training services.",
    images: ["https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/012aedf7-7f54-474b-b9df-37d694d8ba5a/generated_images/single-bold-letter-e-logo-in-modern-roun-3069783e-20251109033000.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased font-sans">
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="012aedf7-7f54-474b-b9df-37d694d8ba5a"
        />
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
        <Toaster />
        <VapiWrapper />
        {/* Calendly popup widget */}
        <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
        />
        <VisualEditsMessenger />
      </body>
    </html>
  );
}