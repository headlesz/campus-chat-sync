import { MessageCircle, Heart, User, MapPin, Sparkles, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

const mockDatingMatches = [
  {
    id: "1",
    name: "Jamie",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    lastMessage: "I'd love to hear more about your projects!",
    time: "2:32 PM",
    unread: true,
    mode: "dating" as const,
  },
  {
    id: "2",
    name: "Morgan",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    lastMessage: "That sounds amazing!",
    time: "Yesterday",
    unread: false,
    mode: "dating" as const,
  },
];

const mockFriendsMatches = [
  {
    id: "3",
    name: "Alex Rivera",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    lastMessage: "Let's connect about the startup opportunity!",
    time: "1:15 PM",
    unread: true,
    mode: "friends" as const,
  },
  {
    id: "4",
    name: "Sam Chen",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
    lastMessage: "Thanks for the career advice!",
    time: "Yesterday",
    unread: false,
    mode: "friends" as const,
  },
];

const Matches = () => {
  const navigate = useNavigate();
  const { mode, setMode } = useUser();
  
  const mockMatches = mode === "dating" ? mockDatingMatches : mockFriendsMatches;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className={`px-6 py-4 sticky top-0 z-10 transition-colors duration-300 ${
        mode === "dating" ? "bg-primary/20" : "bg-accent/20"
      }`}>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-foreground">Messages</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mockMatches.length} match{mockMatches.length !== 1 ? "es" : ""}
          </p>
          
          {/* Sliding Toggle */}
          <div className="relative bg-white/20 backdrop-blur rounded-full p-1 w-[260px] mt-4">
            {/* Slider */}
            <div
              className={`absolute top-1 bottom-1 w-[126px] rounded-full transition-all duration-300 ${
                mode === "dating" ? "left-1 bg-primary" : "left-[131px] bg-accent"
              }`}
              style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.15)" }}
            />
            {/* Options */}
            <div className="relative grid grid-cols-2 gap-0">
              <button
                onClick={() => setMode("dating")}
                className={`z-10 flex items-center justify-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${
                  mode === "dating" ? "text-primary-foreground" : "text-foreground/80"
                }`}
              >
                <Heart className="w-4 h-4" />
                Dating
              </button>
              <button
                onClick={() => setMode("friends")}
                className={`z-10 flex items-center justify-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${
                  mode === "friends" ? "text-accent-foreground" : "text-foreground/80"
                }`}
              >
                <Users className="w-4 h-4" />
                Friends
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Matches List */}
      <div className="max-w-2xl mx-auto">
        {mockMatches.length > 0 ? (
          <div className="divide-y divide-border">
            {mockMatches.map((match) => (
              <button
                key={match.id}
                onClick={() => navigate(`/chat/${match.id}`)}
                className="w-full px-6 py-4 flex items-center gap-4 hover:bg-muted/50 transition-colors text-left"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-muted">
                    <img
                      src={match.photo}
                      alt={match.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {match.unread && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-background" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className={`font-semibold ${match.unread ? "text-foreground" : "text-muted-foreground"}`}>
                      {match.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">{match.time}</span>
                  </div>
                  <p className={`text-sm truncate ${
                    match.unread ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {match.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-6">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No matches yet</h3>
            <p className="text-muted-foreground">
              Start swiping to find your matches!
            </p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-around">
          <button
            onClick={() => navigate("/discover")}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Heart className="w-6 h-6" />
            <span className="text-xs font-medium">Discover</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-foreground">
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs font-medium">Matches</span>
          </button>
          <button
            onClick={() => navigate("/recommended")}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Sparkles className="w-6 h-6" />
            <span className="text-xs font-medium">Recommended</span>
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Matches;
