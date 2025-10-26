import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, MicOff, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { upsertProfile } from "@/lib/profile";
import { chatWithClaude } from "@/lib/claude";

type Msg = { role: "assistant" | "user"; content: string };

declare global {
  interface Window {
    webkitSpeechRecognition?: any;
    SpeechRecognition?: any;
  }
}

const VoiceOnboarding = () => {
  const [isListening, setIsListening] = useState(false);
  const [micReady, setMicReady] = useState<boolean | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState<string>("there");
  const [collectedData, setCollectedData] = useState<any>({});
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();
  const { setDraft } = useOnboarding();
  const recogRef = useRef<any>(null);
  const recognizingRef = useRef<boolean>(false);
  const shouldContinueRef = useRef<boolean>(false);
  const isProcessingRef = useRef<boolean>(false);

  useEffect(() => {
    // Load name from Supabase user metadata
    supabase.auth.getUser().then(({ data }) => {
      const n = (data.user?.user_metadata as any)?.name;
      if (n) setName(n);
    });
  }, []);

  useEffect(() => {
    // Probe microphone permission once
    (async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicReady(true);
      } catch (e) {
        setMicReady(false);
        console.warn('Microphone permission denied or unavailable', e);
      }
    })();
  }, []);

  useEffect(() => {
    // Initial greeting
    if (messages.length === 0 && name) {
      const greeting = `Hi ${name}! I'm here to help set up your dating profile. Let's start - what are some hobbies or activities you enjoy?`;
      pushAssistant(greeting, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const SpeechRecognition = useMemo(
    () => window.SpeechRecognition || window.webkitSpeechRecognition,
    []
  );

  // TTS voice selection with a more expressive tone
  const voicesRef = useRef<SpeechSynthesisVoice[] | null>(null);
  const pickVoice = () => {
    const voices = (voicesRef.current ||= window.speechSynthesis.getVoices());
    if (!voices || voices.length === 0) return null;
    // Try some common, more natural voices by preference order
    const preferred = [
      /Google US English/i,
      /Google UK English Female/i,
      /Samantha/i,
      /Victoria/i,
      /Serena/i,
      /Allison/i,
    ];
    for (const p of preferred) {
      const v = voices.find((v) => p.test(v.name));
      if (v) return v;
    }
    // Fallback: first English voice
    const en = voices.find((v) => /en[-_]/i.test(v.lang));
    return en || voices[0];
  };

  useEffect(() => {
    const handler = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };
    window.speechSynthesis.addEventListener?.('voiceschanged', handler as any);
    // Prime voices list in some browsers
    window.speechSynthesis.getVoices();
    return () => {
      window.speechSynthesis.removeEventListener?.('voiceschanged', handler as any);
    };
  }, []);

  const speak = (text: string) => {
    try {
      const u = new SpeechSynthesisUtterance(text);
      const v = pickVoice();
      if (v) u.voice = v;
      // Slightly warm, engaging tone
      u.pitch = 1.12;
      u.rate = 0.98;
      u.volume = 1.0;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch {}
  };

  const pushAssistant = (content: string, say = false) => {
    setMessages((m) => [...m, { role: "assistant", content }]);
    if (say) speak(content);
  };

  const pushUser = (content: string) => setMessages((m) => [...m, { role: "user", content }]);

  const SYSTEM_PROMPT = `You are a dating app onboarding assistant for ${name}.

STRICT SEQUENCE - Ask questions in this exact order:
1. Their interests → ALREADY ASKED in first message
2. Partner gender preference → Ask: "What gender are you interested in dating?"
3. Partner's interests → Ask: "What interests/hobbies should your ideal match have?"
4. Qualities → Ask: "What personality qualities do you value most?"

CRITICAL RULES:
- Read the conversation history carefully
- Count how many questions have been answered (not asked)
- If user answered question 2, move to question 3
- If user answered question 3, move to question 4
- NEVER ask the same question twice
- Keep responses under 20 words

When you have ALL 4 answers, respond ONLY with:
COMPLETE: {"interests": ["x","y"], "partnerGender": "male/female/non-binary/no-preference", "partnerInterests": ["x","y"], "qualities": ["x","y"]}

Otherwise, acknowledge their answer briefly and ask the NEXT unanswered question.`;

  const handleProcessText = async (text: string) => {
    if (!text.trim() || isProcessingRef.current) return;
    
    isProcessingRef.current = true;
    pushUser(text);

    try {
      // Build conversation history for Claude
      const history = [...messages, { role: 'user' as const, content: text }];
      
      const response = await chatWithClaude(history, SYSTEM_PROMPT);
      
      if (!response) {
        pushAssistant("Sorry, I didn't catch that. Could you try again?", true);
        return;
      }

      // Check if Claude signals completion
      if (response.startsWith('COMPLETE:')) {
        try {
          const dataStr = response.replace('COMPLETE:', '').trim();
          console.log('📋 Claude completion response:', dataStr);
          const data = JSON.parse(dataStr);
          console.log('✅ Parsed data:', data);
          setCollectedData(data);
          setIsComplete(true);
          
          // Save to backend
          await upsertProfile({
            interests: data.interests,
            partner_gender: data.partnerGender,
            partner_interests: data.partnerInterests,
            qualities: data.qualities,
          });
          
          setDraft(data);
          pushAssistant("Perfect! I've got everything. Taking you to your dashboard now.", true);
          setTimeout(() => navigate("/dashboard"), 1500);
        } catch (e) {
          console.error('❌ Failed to parse completion data:', e);
          console.error('Raw response:', response);
          pushAssistant(response, true);
        }
      } else {
        // Continue conversation
        pushAssistant(response, true);
      }
    } catch (error) {
      console.error('Conversation error:', error);
      pushAssistant("Sorry, something went wrong. Could you repeat that?", true);
    } finally {
      isProcessingRef.current = false;
    }
  };

  const startBrowserSTT = () => {
    if (recognizingRef.current) {
      // Already recognizing; avoid duplicate start that triggers 'Another request is started'
      return;
    }
    if (!SpeechRecognition) {
      toast.error("Speech recognition is not supported in this browser.");
      return;
    }
    try {
      const rec = new SpeechRecognition();
      rec.lang = "en-US";
      rec.interimResults = true;
      // Keep listening across pauses
      rec.continuous = true as any;
      rec.maxAlternatives = 1;
      rec.onstart = () => {
        recognizingRef.current = true;
      };
      rec.onresult = (e: any) => {
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const res = e.results[i];
          if (res.isFinal) {
            const transcript = res[0]?.transcript as string;
            if (transcript && !isProcessingRef.current) {
              handleProcessText(transcript);
            }
          }
        }
      };
      rec.onerror = (err: any) => {
        // 'aborted' happens if start() called while active; ignore soft aborts
        if (err?.error !== 'aborted') {
          if (!shouldContinueRef.current) setIsListening(false);
          toast.error("Microphone error. Try another browser or allow mic access.");
          console.error("STT error", err);
        }
      };
      rec.onend = () => {
        // Auto-restart if user hasn't pressed stop
        recognizingRef.current = false;
        if (shouldContinueRef.current) {
          // Debounce restart to avoid overlap with internal end
          setTimeout(() => {
            if (shouldContinueRef.current && !recognizingRef.current) {
              try { rec.start(); recognizingRef.current = true; } catch (e) { /* swallow */ }
            }
          }, 250);
        } else {
          setIsListening(false);
        }
      };
      recogRef.current = rec;
      shouldContinueRef.current = true;
      setIsListening(true);
      // Guard against double start
      if (!recognizingRef.current) {
        rec.start();
        recognizingRef.current = true;
      }
      toast.success("Listening...");
    } catch (e) {
      setIsListening(false);
      toast.error("Could not start microphone.");
      console.error(e);
    }
  };

  const startListening = () => {
    startBrowserSTT();
  };

  const stopListening = () => {
    shouldContinueRef.current = false;
    try {
      recogRef.current?.abort?.();
      recogRef.current?.stop?.();
    } catch {}
    recognizingRef.current = false;
    setIsListening(false);
  };

  const handleContinue = () => {
    if (!isComplete) {
      pushAssistant("We haven't finished yet. You can continue or skip to dashboard.");
    }
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">Voice Profile Setup</h1>
          <Button variant="ghost" size="sm" onClick={handleContinue}>
            Skip for now
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-8">
          <div className="space-y-4 mb-8">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "assistant" ? "justify-start" : "justify-end"} animate-slide-up`}>
                <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${m.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground"}`}>
                  <p className="text-sm leading-relaxed">{m.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              {isListening && (
                <>
                  <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                  <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse" style={{ animationDuration: "1.5s" }} />
                </>
              )}
              <button
                onClick={() => (isListening ? stopListening() : startListening())}
                className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isListening ? "bg-primary hover:bg-primary-hover" : "bg-muted hover:bg-muted/80"
                }`}
                aria-label={isListening ? "Stop listening" : "Start listening"}
              >
                {isListening ? <Mic className="w-5 h-5 text-primary-foreground" /> : <MicOff className="w-5 h-5 text-muted-foreground" />}
              </button>
            </div>

            {micReady === false && (
              <span className="text-xs text-destructive">Mic blocked. Allow mic access in browser settings.</span>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const t = input.trim();
                if (!t) return;
                setInput("");
                handleProcessText(t);
              }}
              className="flex-1 flex items-center gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your response..."
              />
              <Button type="submit" variant="secondary" className="h-10 px-4">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>

          {isComplete && (
            <div className="flex justify-center mt-8">
              <Button size="lg" onClick={handleContinue}>
                Continue to profile review
              </Button>
            </div>
          )}
        </div>
      </div>

      {messages.length === 0 && (
        <div className="bg-muted/50 border-t border-border px-6 py-4">
          <div className="max-w-2xl mx-auto flex items-start gap-3">
            <Mic className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              CampusMatch needs microphone access to enable voice onboarding. Your audio is processed locally and not stored.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceOnboarding;
