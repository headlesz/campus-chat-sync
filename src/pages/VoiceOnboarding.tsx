import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const VoiceOnboarding = () => {
  const [isListening, setIsListening] = useState(false);
  const [conversation, setConversation] = useState<Array<{ role: "assistant" | "user"; text: string }>>([
    { role: "assistant", text: "Hello and welcome! I'm here to help you create your profile. First, could you tell me your name?" }
  ]);
  const navigate = useNavigate();

  const handleStartListening = () => {
    setIsListening(true);
    toast.success("Microphone activated");
    
    // Simulate voice interaction
    setTimeout(() => {
      setConversation(prev => [...prev, { role: "user", text: "My name is Alex" }]);
      setTimeout(() => {
        setConversation(prev => [...prev, { role: "assistant", text: "Nice to meet you, Alex! What school do you go to?" }]);
      }, 1000);
    }, 2000);
  };

  const handleSkip = () => {
    navigate("/onboarding/profile");
  };

  const handleComplete = () => {
    navigate("/onboarding/profile");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">Voice Profile Setup</h1>
          <Button variant="ghost" size="sm" onClick={handleSkip}>
            Use text instead
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-8">
          {/* Conversation Display */}
          <div className="space-y-4 mb-8">
            {conversation.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"} animate-slide-up`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                    message.role === "assistant"
                      ? "bg-muted text-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Voice Visualizer */}
          <div className="flex flex-col items-center justify-center py-12">
            <div className="relative">
              {/* Animated circles */}
              {isListening && (
                <>
                  <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                  <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse" 
                       style={{ animationDuration: '1.5s' }} />
                </>
              )}
              
              {/* Microphone button */}
              <button
                onClick={() => setIsListening(!isListening)}
                className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isListening
                    ? "bg-primary hover:bg-primary-hover scale-110"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {isListening ? (
                  <Mic className="w-10 h-10 text-primary-foreground" />
                ) : (
                  <MicOff className="w-10 h-10 text-muted-foreground" />
                )}
              </button>
            </div>

            {/* Status text */}
            <p className="mt-6 text-sm font-medium text-muted-foreground">
              {isListening ? "Listening..." : "Tap to start speaking"}
            </p>

            {/* Instructions */}
            {!isListening && conversation.length === 1 && (
              <div className="mt-8 text-center max-w-md">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our AI assistant will ask you a few questions to set up your profile. 
                  Just speak naturally and we'll take care of the rest.
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {conversation.length > 5 && (
            <div className="flex justify-center mt-8">
              <Button size="lg" onClick={handleComplete}>
                Continue to profile review
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Permission Notice */}
      {!isListening && conversation.length === 1 && (
        <div className="bg-muted/50 border-t border-border px-6 py-4">
          <div className="max-w-2xl mx-auto flex items-start gap-3">
            <Mic className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              CampusMatch needs microphone access to enable voice onboarding. 
              Your audio is processed securely and never stored.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceOnboarding;
