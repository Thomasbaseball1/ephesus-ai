"use client";

import { useEffect, useState, useRef } from "react";
import { Phone, PhoneOff, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const VapiDemo = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callStatus, setCallStatus] = useState<string>("Ready to call");
  const vapiRef = useRef<any>(null);

  useEffect(() => {
    // Dynamically import Vapi to avoid SSR issues
    const initVapi = async () => {
      const { default: Vapi } = await import("@vapi-ai/web");
      
      const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
      if (!publicKey) {
        console.error("Vapi public key not found");
        return;
      }

      vapiRef.current = new Vapi(publicKey);

      // Event listeners
      vapiRef.current.on("call-start", () => {
        setIsCallActive(true);
        setCallStatus("Call connected");
      });

      vapiRef.current.on("call-end", () => {
        setIsCallActive(false);
        setIsMuted(false);
        setCallStatus("Call ended");
      });

      vapiRef.current.on("speech-start", () => {
        setCallStatus("Listening...");
      });

      vapiRef.current.on("speech-end", () => {
        setCallStatus("Processing...");
      });

      vapiRef.current.on("message", (message: any) => {
        if (message.type === "transcript" && message.transcriptType === "final") {
          setCallStatus("Speaking...");
        }
      });

      vapiRef.current.on("error", (error: any) => {
        console.error("Vapi error:", error);
        setCallStatus("Error occurred");
        setIsCallActive(false);
      });
    };

    initVapi();

    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
    };
  }, []);

  const startCall = async () => {
    try {
      const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
      if (!assistantId) {
        console.error("Assistant ID not found");
        return;
      }

      setCallStatus("Connecting...");
      await vapiRef.current?.start(assistantId);
    } catch (error) {
      console.error("Failed to start call:", error);
      setCallStatus("Failed to connect");
    }
  };

  const endCall = () => {
    vapiRef.current?.stop();
    setIsCallActive(false);
    setCallStatus("Ready to call");
  };

  const toggleMute = () => {
    if (vapiRef.current) {
      const newMutedState = !isMuted;
      vapiRef.current.setMuted(newMutedState);
      setIsMuted(newMutedState);
    }
  };

  return (
    <Card className="p-8 space-y-6 gradient-border bg-gradient-to-br from-[#388087]/5 to-[#6FB3B8]/5">
      <div className="text-center space-y-4">
        <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg animate-float">
          <Phone className="w-10 h-10 text-white" />
        </div>
        
        <div>
          <h3 className="text-2xl font-bold mb-2">Try Our AI Receptionist</h3>
          <p className="text-muted-foreground">
            Experience a live demo of our AI voice assistant. Click below to start a conversation.
          </p>
        </div>

        <div className="py-4">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            isCallActive 
              ? "bg-green-500/20 text-green-700 dark:text-green-400" 
              : "bg-muted text-muted-foreground"
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              isCallActive ? "bg-green-500 animate-pulse" : "bg-gray-400"
            }`} />
            {callStatus}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {!isCallActive ? (
            <Button 
              size="lg" 
              onClick={startCall}
              className="gap-2 group bg-gradient-to-r from-[#388087] to-[#6FB3B8] hover:from-[#2d6b72] hover:to-[#5a9fa4] text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <Phone className="w-5 h-5" />
              Start Demo Call
            </Button>
          ) : (
            <>
              <Button 
                size="lg"
                variant="outline"
                onClick={toggleMute}
                className="gap-2 cursor-pointer"
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                {isMuted ? "Unmute" : "Mute"}
              </Button>
              
              <Button 
                size="lg" 
                onClick={endCall}
                className="gap-2 bg-destructive hover:bg-destructive/90 text-white cursor-pointer"
              >
                <PhoneOff className="w-5 h-5" />
                End Call
              </Button>
            </>
          )}
        </div>

        <p className="text-xs text-muted-foreground pt-4">
          Note: This demo requires microphone access. Please allow permissions when prompted.
        </p>
      </div>
    </Card>
  );
};