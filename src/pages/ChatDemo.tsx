import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, X, Calendar } from "lucide-react";
import { chatWithClaude } from "@/lib/claude";
import { toast } from "sonner";
import { useGoogleLogin } from '@react-oauth/google';
import {
  setAccessToken,
  getCalendarEventsOAuth,
  findCommonFreeSlots,
  CalendarEvent,
} from "@/lib/calendar-oauth";

type Message = {
  id: string;
  sender: "me" | "them" | "claude";
  content: string;
  timestamp: Date;
};

type ClaudeMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const ChatDemo = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "them",
      content: "Hey! How's it going?",
      timestamp: new Date(Date.now() - 120000),
    },
  ]);
  const [input, setInput] = useState("");
  const [claudeChatOpen, setClaudeChatOpen] = useState(false);
  const [claudeMessages, setClaudeMessages] = useState<ClaudeMessage[]>([]);
  const [claudeInput, setClaudeInput] = useState("");
  const [isClaudeThinking, setIsClaudeThinking] = useState(false);
  const [showMentionDropdown, setShowMentionDropdown] = useState(false);
  const [isFetchingSuggestion, setIsFetchingSuggestion] = useState(false);
  const [isCalendarConnected, setIsCalendarConnected] = useState(false);
  const [myCalendarEvents, setMyCalendarEvents] = useState<CalendarEvent[]>([]);
  const [theirCalendarEvents, setTheirCalendarEvents] = useState<CalendarEvent[]>([]);

  // Mock profile data for context
  const myProfile = {
    name: "Alex",
    interests: ["hiking", "photography", "cooking"],
  };

  const theirProfile = {
    name: "Jordan",
    interests: ["hiking", "reading", "traveling"],
    dislikes: ["cats (allergic)"],
  };

  const connectCalendars = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setAccessToken(tokenResponse.access_token);
        setIsCalendarConnected(true);
        toast.success("Google Calendar connected!");
        
        // Fetch both calendars
        const myEvents = await getCalendarEventsOAuth('primary');
        const theirEvents = await getCalendarEventsOAuth(import.meta.env.VITE_AI_DATE_CALENDAR_ID);
        
        setMyCalendarEvents(myEvents);
        setTheirCalendarEvents(theirEvents);
        
        console.log('My calendar events:', myEvents);
        console.log('Their calendar events:', theirEvents);
      } catch (error) {
        console.error('Calendar fetch error:', error);
        toast.error("Error fetching calendar data");
      }
    },
    onError: () => {
      toast.error("Failed to connect calendar");
    },
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
  });

  const sendMessage = async () => {
    if (!input.trim()) return;

    const messageContent = input;
    setInput("");

    // Check if message is directed at Claude
    if (messageContent.toLowerCase().includes("@claude")) {
      // User is asking Claude something in the chat
      const userMsg: Message = {
        id: Date.now().toString(),
        sender: "me",
        content: messageContent,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);

      // Extract the request (remove @claude)
      const claudeRequest = messageContent.replace(/@claude/gi, "").trim();
      
      // Call Claude to respond in the main chat
      await handleClaudeRequest(claudeRequest);
      return;
    }

    // Check message with Claude for insensitive content
    try {
      const moderationPrompt = `You are a dating conversation moderator. Analyze this message for insensitive, inappropriate, or potentially offensive content:

"${messageContent}"

If the message contains:
- Offensive language
- Inappropriate sexual content
- Discriminatory remarks
- Overly aggressive or rude tone
- Anything that could make someone uncomfortable

Respond with: "WARNING: [brief explanation of what's wrong]"

If the message is fine, respond with: "OK"`;

      const moderationResult = await chatWithClaude(
        [{ role: "user", content: moderationPrompt }],
        "You are a helpful content moderator for dating conversations."
      );

      if (moderationResult.startsWith("WARNING:")) {
        // Show Claude's warning as popup only
        const warningText = moderationResult.replace("WARNING:", "").trim();
        toast.error(`Claude says: Hey, that might not be appropriate. ${warningText}`, { 
          duration: 6000,
          style: { maxWidth: '500px' }
        });
        return; // Don't send the message
      }
    } catch (error) {
      console.error("Moderation check failed:", error);
      // Continue anyway if moderation fails
    }

    // Message is OK, send it
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "me",
      content: messageContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulate their response - they might send multiple messages
    const sendTheirResponse = async () => {
      // Build context for natural response
      const recentChat = [...messages, newMessage]
        .slice(-4)
        .map((m) => `${m.sender === "me" ? myProfile.name : theirProfile.name}: ${m.content}`)
        .join("\n");

      const responsePrompt = `You are ${theirProfile.name} chatting with ${myProfile.name} on a dating app.

Your interests: ${theirProfile.interests.join(", ")}
Your dislikes: ${theirProfile.dislikes.join(", ")}
Their interests: ${myProfile.interests.join(", ")}

Recent conversation:
${recentChat}

IMPORTANT: You are ALLERGIC to cats and don't like them. If ${myProfile.name} mentions cats positively:
- React with genuine disappointment/sadness
- Express how you feel about it (allergies, can't be around them)
- DO NOT immediately try to change the topic or ask a new question
- Let the awkwardness sit - they need to figure out how to recover
- Send 1-2 messages expressing your feelings, then STOP

For other topics, respond naturally with 1-3 messages and be engaging.

Format: If sending multiple messages, separate them with " ||| "
Example for cats: "Oh... I'm actually really allergic to cats 😔 ||| As much as I'd love to, even being near them makes me super sneezy"
Example for good topics: "Oh that's awesome! ||| I actually tried that last summer ||| How did you get into it?"

Respond now:`;

      try {
        const response = await chatWithClaude(
          [{ role: "user", content: responsePrompt }],
          "You are a friendly person on a dating app having a natural conversation."
        );

        if (response) {
          // Split by ||| for multiple messages
          const messageParts = response.split("|||").map((m) => m.trim()).filter((m) => m);
          
          // Send each message with a delay
          messageParts.forEach((msgContent, index) => {
            setTimeout(() => {
              setMessages((prev) => [
                ...prev,
                {
                  id: `${Date.now()}-${index}`,
                  sender: "them",
                  content: msgContent,
                  timestamp: new Date(),
                },
              ]);
            }, 1500 + index * 1200); // Stagger messages naturally
          });
        }
      } catch (error) {
        console.error("Failed to generate response:", error);
        // Fallback to simple response
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              sender: "them",
              content: "That's interesting! Tell me more",
              timestamp: new Date(),
            },
          ]);
        }, 1500);
      }
    };

    sendTheirResponse();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    // No dropdown needed anymore
    setShowMentionDropdown(false);
  };

  const handleClaudeRequest = async (request: string) => {
    // Claude responds to direct requests in the main chat
    try {
      const conversationHistory = messages
        .filter((m) => m.sender !== "claude")
        .slice(-8)
        .map((m) => `${m.sender === "me" ? myProfile.name : theirProfile.name}: ${m.content}`)
        .join("\n");

      // Get real calendar availability
      let calendarInfo = "Calendar not connected yet. Connect calendars to see availability.";
      
      if (isCalendarConnected && myCalendarEvents.length >= 0 && theirCalendarEvents.length >= 0) {
        const freeSlots = findCommonFreeSlots(myCalendarEvents, theirCalendarEvents, 60);
        
        // Build detailed calendar summary
        const myBusyTimes = myCalendarEvents.map(e => `${e.summary} (${new Date(e.start).toLocaleString('en-US', {weekday: 'short', hour: 'numeric', minute: '2-digit'})})`).join(', ');
        const theirBusyTimes = theirCalendarEvents.map(e => `${e.summary} (${new Date(e.start).toLocaleString('en-US', {weekday: 'short', hour: 'numeric', minute: '2-digit'})})`).join(', ');
        
        if (freeSlots.length > 0) {
          calendarInfo = `I checked both calendars!

Your busy times: ${myBusyTimes || 'None'}
Their busy times: ${theirBusyTimes || 'None'}

You're BOTH FREE at:
${freeSlots
            .slice(0, 3)
            .map((slot) => `- ${slot.dayName} at ${slot.timeString}`)
            .join('\n')}`;
        } else {
          calendarInfo = `I checked your calendars:

Your busy times: ${myBusyTimes || 'None'}
Their busy times: ${theirBusyTimes || 'None'}

Unfortunately, couldn't find common free slots in the next week. You might need to adjust your schedules!`;
        }
      }

      const prompt = `You are Claude, an AI assistant helping ${myProfile.name} and ${theirProfile.name} plan their date.

${myProfile.name}'s interests: ${myProfile.interests.join(", ")}
${theirProfile.name}'s interests: ${theirProfile.interests.join(", ")}
${theirProfile.name}'s dislikes: ${theirProfile.dislikes.join(", ")}

Their conversation:
${conversationHistory}

Calendar availability:
${calendarInfo}

${myProfile.name} asked you: "${request}"

Respond helpfully:
- If they ask you to find places/activities, suggest 2-3 specific options based on their interests
- Mention the specific calendar times from above
- Offer to make reservations
- Be enthusiastic and helpful!

Keep response under 60 words and natural.`;

      const claudeResponse = await chatWithClaude(
        [{ role: "user", content: prompt }],
        "You are Claude, a helpful AI dating assistant."
      );

      if (claudeResponse) {
        const claudeMsg: Message = {
          id: Date.now().toString(),
          sender: "claude",
          content: claudeResponse,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, claudeMsg]);
      }
    } catch (error) {
      console.error("Claude request error:", error);
      toast.error("Claude couldn't respond");
    }
  };

  const claudeJoinsConversation = async () => {
    // Claude analyzes conversation and proactively suggests meeting up
    try {
      const conversationHistory = messages
        .filter((m) => m.sender !== "claude") // Exclude Claude's own messages
        .slice(-8)
        .map((m) => `${m.sender === "me" ? myProfile.name : theirProfile.name}: ${m.content}`)
        .join("\n");

      // Mock calendar data
      const mockCalendarAvailability = "Saturday at 2pm or Sunday at 11am";

      const prompt = `You are Claude, an AI assistant helping ${myProfile.name} and ${theirProfile.name} plan their date.

${myProfile.name}'s interests: ${myProfile.interests.join(", ")}
${theirProfile.name}'s interests: ${theirProfile.interests.join(", ")}

Their conversation:
${conversationHistory}

Calendar availability (both are free): ${mockCalendarAvailability}

Analyze their conversation and proactively suggest:
1. A specific place/activity based on their interests and conversation
2. Mention you checked their calendars and they're both free at specific times
3. Offer to make a reservation

Be enthusiastic and helpful! Format like:
"Hey! I've been following your chat - sounds like you both love [topic]! There's this great [place] nearby. I checked your calendars and you're both free on [day] at [time]. Want me to get you a reservation?"

Keep it under 50 words and natural.`;

      const claudeResponse = await chatWithClaude(
        [{ role: "user", content: prompt }],
        "You are Claude, a proactive AI dating assistant who joins conversations to help plan dates."
      );

      if (claudeResponse) {
        // Add Claude's message to the chat
        const claudeMsg: Message = {
          id: Date.now().toString(),
          sender: "claude",
          content: claudeResponse,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, claudeMsg]);
        toast.success("Claude joined the conversation!", { icon: "✨" });
      }
    } catch (error) {
      console.error("Claude join error:", error);
    }
  };

  const handleClaudeMention = () => {
    setShowMentionDropdown(false);
    claudeJoinsConversation();
  };

  const askClaude = async () => {
    if (!claudeInput.trim() || isClaudeThinking) return;

    const userQuestion = claudeInput;
    setClaudeInput("");
    
    // Add user message to Claude chat
    const userMsg: ClaudeMessage = {
      id: Date.now().toString(),
      role: "user",
      content: userQuestion,
    };
    setClaudeMessages((prev) => [...prev, userMsg]);
    setIsClaudeThinking(true);

    try {
      // Build conversation context
      const conversationHistory = messages
        .slice(-6)
        .map((m) => `${m.sender === "me" ? myProfile.name : theirProfile.name}: ${m.content}`)
        .join("\n");

      const systemPrompt = `You are Claude, a helpful dating conversation coach. ${myProfile.name} is chatting with ${theirProfile.name} and needs your advice.

Context:
${myProfile.name}'s interests: ${myProfile.interests.join(", ")}
${theirProfile.name}'s interests: ${theirProfile.interests.join(", ")}
${theirProfile.name}'s dislikes: ${theirProfile.dislikes.join(", ")}

Recent conversation:
${conversationHistory}

Give friendly, practical advice. If they made a mistake or hit a sensitive topic:
- Acknowledge the awkwardness
- Suggest how to gracefully change topics
- Recommend shared interests to pivot to
- Give specific example phrases they can use

Keep responses under 60 words and be empathetic.`;

      const response = await chatWithClaude(
        [{ role: "user", content: userQuestion }],
        systemPrompt
      );

      if (response) {
        const assistantMsg: ClaudeMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response,
        };
        setClaudeMessages((prev) => [...prev, assistantMsg]);
      }
    } catch (error) {
      console.error("Claude chat error:", error);
      toast.error("Failed to get Claude's response");
    } finally {
      setIsClaudeThinking(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{theirProfile.name}</h1>
            <p className="text-sm text-muted-foreground">
              {theirProfile.interests.join(" • ")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => connectCalendars()}
              variant={isCalendarConnected ? "default" : "outline"}
              size="sm"
              className="gap-2"
              disabled={isCalendarConnected}
            >
              <Calendar className="w-4 h-4" />
              {isCalendarConnected ? "Calendar Connected" : "Connect Calendar"}
            </Button>
            <Button
              onClick={() => setClaudeChatOpen(!claudeChatOpen)}
              variant={claudeChatOpen ? "default" : "outline"}
              size="sm"
              className="gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Claude
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-8 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "claude"
                  ? "justify-center"
                  : msg.sender === "me"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`${
                  msg.sender === "claude" ? "max-w-[85%]" : "max-w-[70%]"
                } rounded-2xl px-4 py-3 ${
                  msg.sender === "me"
                    ? "bg-primary text-primary-foreground"
                    : msg.sender === "claude"
                    ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-2 border-purple-500/30"
                    : "bg-muted"
                }`}
              >
                {msg.sender === "claude" && (
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    <p className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                      Claude AI Assistant
                    </p>
                  </div>
                )}
                <p className="text-sm">{msg.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="bg-card border-t border-border px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <Input
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message... (use @claude to ask Claude)"
              className="flex-1"
            />
            <Button onClick={sendMessage} size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Claude Side Chat */}
      {claudeChatOpen && (
        <div className="fixed right-0 top-0 h-full w-96 bg-card border-l border-border shadow-2xl flex flex-col z-50">
          {/* Claude Chat Header */}
          <div className="bg-primary text-primary-foreground px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <h2 className="font-bold">Chat with Claude</h2>
            </div>
            <Button
              onClick={() => setClaudeChatOpen(false)}
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Claude Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {claudeMessages.length === 0 && (
              <div className="text-center text-muted-foreground text-sm mt-8">
                <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="font-medium mb-2">Ask Claude for conversation advice!</p>
                <div className="text-xs space-y-1 mt-3">
                  <p>💬 "What should I ask her?"</p>
                  <p>😰 "I messed up, how do I recover?"</p>
                  <p>🔄 "How do I change the topic?"</p>
                  <p>💡 "I'm stuck, help!"</p>
                </div>
              </div>
            )}
            {claudeMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-4 py-2 ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
            {isClaudeThinking && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-4 py-2">
                  <p className="text-sm text-muted-foreground">Claude is thinking...</p>
                </div>
              </div>
            )}
          </div>

          {/* Claude Input */}
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-2">
              <Input
                value={claudeInput}
                onChange={(e) => setClaudeInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && askClaude()}
                placeholder="Ask Claude for advice..."
                disabled={isClaudeThinking}
              />
              <Button onClick={askClaude} size="icon" disabled={isClaudeThinking}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatDemo;
