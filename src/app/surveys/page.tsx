"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CursorGradient from "@/components/CursorGradient";
import { ClipboardList, Palette } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function SurveysPage() {
  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <CursorGradient />
      <Header />
      
      <main className="flex-1 pt-16">
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-[#388087]/10 via-transparent to-[#6FB3B8]/10 animate-pulse-slow" />
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto space-y-8 relative">
              <div className="text-center space-y-4 mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#388087]/20 to-[#6FB3B8]/20 text-foreground text-sm font-medium backdrop-blur-sm">
                  <ClipboardList className="w-4 h-4" />
                  <span>Customer Feedback</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Share Your <span className="bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">Feedback</span>
                </h1>
                
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Help us improve our AI solutions by completing our quick survey. Your insights are valuable to us.
                </p>
              </div>

              {/* Google Form Embed */}
              <div className="bg-card rounded-lg shadow-xl overflow-hidden">
                <div className="w-full flex items-center justify-center p-4">
                  <iframe 
                    src="https://docs.google.com/forms/d/e/1FAIpQLSdzxAZRFW28PDI2AEf-kGaKPcRumNKwOeWwLbuInOi4WoaOXA/viewform?embedded=true" 
                    width="100%" 
                    height="800" 
                    frameBorder="0" 
                    marginHeight={0} 
                    marginWidth={0}
                    className="border-0"
                  >
                    Loading…
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}