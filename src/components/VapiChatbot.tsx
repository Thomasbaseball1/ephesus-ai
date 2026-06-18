"use client";

import { useEffect, useState } from "react";
import { Bot, Phone } from "lucide-react";
import Vapi from "@vapi-ai/web";

export default function VapiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<Vapi | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get credentials from environment variables
    const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
    const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;

    if (!publicKey) {
      console.error("Missing NEXT_PUBLIC_VAPI_PUBLIC_KEY");
      setError("Vapi public key not configured");
      return;
    }

    if (!assistantId) {
      console.error("Missing NEXT_PUBLIC_VAPI_ASSISTANT_ID");
      setError("Vapi assistant ID not configured");
      return;
    }

    // Initialize Vapi instance with PUBLIC KEY
    const vapi = new Vapi(publicKey);
    
    // Set up event listeners
    vapi.on("call-start", () => {
      console.log("Call started");
      setIsCallActive(true);
      setIsOpen(true);
      setError(null);
    });

    vapi.on("call-end", () => {
      console.log("Call ended");
      setIsCallActive(false);
      setIsOpen(false);
    });

    vapi.on("message", (message) => {
      console.log("Message:", message);
    });

    vapi.on("error", (error) => {
      console.error("Vapi error:", error);
      setError("Call error occurred");
    });

    setVapiInstance(vapi);

    return () => {
      // Cleanup on unmount
      if (vapi) {
        vapi.stop();
      }
    };
  }, []);

  const handleToggle = async () => {
    if (!vapiInstance) {
      setError("Vapi not initialized");
      return;
    }

    const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
    if (!assistantId) {
      setError("Assistant ID not configured");
      return;
    }

    try {
      if (isCallActive) {
        // End the call
        await vapiInstance.stop();
        setIsCallActive(false);
        setIsOpen(false);
      } else {
        // Start the call with ASSISTANT ID
        await vapiInstance.start(assistantId);
        setIsCallActive(true);
        setIsOpen(true);
      }
    } catch (error) {
      console.error("Error toggling call:", error);
      setError("Failed to start call");
    }
  };

  // Don't show button if there's a configuration error
  if (error && !isCallActive) {
    return null;
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={handleToggle}
        className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 transition-all duration-300 hover:scale-105 cursor-pointer ${
          isCallActive
            ? "bg-red-500 hover:bg-red-600 animate-pulse"
            : "bg-gradient-to-r from-[#388087] to-[#6FB3B8] hover:from-[#2d6b72] hover:to-[#5a9fa4]"
        }`}
        aria-label={isCallActive ? "End Call" : "Talk with AI"}
      >
        {isCallActive ? (
          <>
            <Phone className="w-6 h-6 text-white" />
            <span className="text-white font-semibold text-base">End Call</span>
          </>
        ) : (
          <>
            <Bot className="w-6 h-6 text-white" />
            <span className="text-white font-semibold text-base">Talk with AI</span>
          </>
        )}
      </button>

      {/* Call Status Indicator */}
      {isCallActive && (
        <div className="fixed bottom-24 right-6 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span>Connected with Charlie</span>
          </div>
        </div>
      )}
    </>
  );
}