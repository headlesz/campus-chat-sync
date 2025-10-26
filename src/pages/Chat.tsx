import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Calendar } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import AvailabilityModal from "@/components/AvailabilityModal";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";

// Mock match data - in a real app this would come from a backend API
const allMatches = [
  {
    id: "1",
    name: "Jamie",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    mode: "dating",
    initialMessages: [
      { id: "1", role: "them" as const, text: "Hey! Great to match with you! 👋", time: "2:30 PM" },
      { id: "2", role: "me" as const, text: "Hi! Thanks for connecting!", time: "2:31 PM" },
      { id: "3", role: "them" as const, text: "I saw you're into AI and hiking. I'd love to hear more about your projects!", time: "2:32 PM" },
    ]
  },
  {
    id: "2",
    name: "Morgan",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    mode: "dating",
    initialMessages: [
      { id: "1", role: "them" as const, text: "Love your profile! Let's grab coffee sometime?", time: "Yesterday" },
      { id: "2", role: "me" as const, text: "That sounds amazing! I know a great spot near campus.", time: "Yesterday" },
    ]
  },
  {
    id: "3",
    name: "Alex Rivera",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    mode: "friends",
    initialMessages: [
      { id: "1", role: "them" as const, text: "Hi! I saw your background in CS. I'm working on a startup and looking for co-founders.", time: "1:00 PM" },
      { id: "2", role: "me" as const, text: "That's exciting! I'd love to learn more about it.", time: "1:10 PM" },
      { id: "3", role: "them" as const, text: "Let's connect about the startup opportunity! Are you free this week?", time: "1:15 PM" },
    ]
  },
  {
    id: "4",
    name: "Sam Chen",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
    mode: "friends",
    initialMessages: [
      { id: "1", role: "them" as const, text: "Hey! I saw you're in my field. Would love to get your perspective on career paths.", time: "Yesterday" },
      { id: "2", role: "me" as const, text: "Happy to help! What specifically are you curious about?", time: "Yesterday" },
      { id: "3", role: "them" as const, text: "Thanks for the career advice! Really appreciate your insights.", time: "Yesterday" },
    ]
  },
];

const Chat = () => {
  const navigate = useNavigate();
  const { matchId } = useParams();
  const [message, setMessage] = useState("");
  const [showAvailability, setShowAvailability] = useState(false);
  const { calendarConnected } = useUser();
  
  // Find the match data based on matchId
  const matchData = allMatches.find(m => m.id === matchId) || allMatches[0];
  const [messages, setMessages] = useState(matchData.initialMessages);

  const handleSend = () => {
    if (!message.trim()) return;
    
    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        role: "me",
        text: message,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center gap-4">
        <button
          onClick={() => navigate("/matches")}
          className="p-2 hover:bg-muted rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/20">
            <img
              src={matchData.photo}
              alt={matchData.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-semibold">{matchData.name}</h2>
            <p className="text-xs text-muted-foreground">Active now</p>
          </div>
        </div>

        <button 
          className="p-2 hover:bg-muted rounded-full transition-colors"
          onClick={() => {
            if (calendarConnected) {
              setShowAvailability(true);
            } else {
              toast.error("Connect your calendar in Settings to view availability");
            }
          }}
        >
          <Calendar className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "me" ? "justify-end" : "justify-start"} animate-slide-up`}
          >
            <div className="max-w-[75%]">
              <div
                className={`rounded-2xl px-4 py-3 ${
                  msg.role === "me"
                    ? matchData.mode === "dating" 
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-accent-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1 px-1">
                {msg.time}
              </p>
            </div>
          </div>
        ))}

        {/* Schedule Prompt */}
        <div className="bg-card border border-border rounded-2xl p-4 max-w-md mx-auto my-6">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-full ${
              matchData.mode === "dating" 
                ? "bg-primary/10" 
                : "bg-accent/10"
            }`}>
              <Calendar className={`w-5 h-5 ${
                matchData.mode === "dating" 
                  ? "text-primary" 
                  : "text-accent"
              }`} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm mb-1">
                {matchData.mode === "dating" ? "Ready to meet up?" : "Ready to connect?"}
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                {matchData.mode === "dating" 
                  ? "Plan a date and coordinate your schedules"
                  : "Schedule a time to discuss opportunities"}
              </p>
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  if (calendarConnected) {
                    setShowAvailability(true);
                  } else {
                    toast.error("Connect your calendar in Settings to view availability");
                  }
                }}
              >
                {matchData.mode === "dating" ? "Schedule a meetup" : "Schedule a meeting"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="bg-card border-t border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!message.trim()}
            size="icon"
            className="shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Availability Modal */}
      {showAvailability && (
        <AvailabilityModal
          matchName={matchData.name}
          mode={matchData.mode as "dating" | "friends"}
          onClose={() => setShowAvailability(false)}
        />
      )}
    </div>
  );
};

export default Chat;
