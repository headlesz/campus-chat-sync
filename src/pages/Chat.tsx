import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Calendar } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const { matchId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: "1", role: "them" as const, text: "Hey! Great to match with you! 👋", time: "2:30 PM" },
    { id: "2", role: "me" as const, text: "Hi! Thanks for connecting!", time: "2:31 PM" },
    { id: "3", role: "them" as const, text: "I saw you're into AI and hiking. I'd love to hear more about your projects!", time: "2:32 PM" },
  ]);

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
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200"
              alt="Jamie"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-semibold">Jamie</h2>
            <p className="text-xs text-muted-foreground">Active now</p>
          </div>
        </div>

        <button className="p-2 hover:bg-muted rounded-full transition-colors">
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
                    ? "bg-primary text-primary-foreground"
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
            <div className="p-2 bg-primary/10 rounded-full">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm mb-1">Ready to meet up?</h3>
              <p className="text-xs text-muted-foreground mb-3">
                Plan a date and coordinate your schedules
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Schedule a meetup
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
    </div>
  );
};

export default Chat;
