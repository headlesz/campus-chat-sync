import { useState } from "react";
import SwipeCard from "@/components/SwipeCard";
import MatchModal from "@/components/MatchModal";
import { Briefcase, Heart, MessageCircle, User, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Mode = "dating" | "networking";

const mockProfiles = [
  {
    id: "1",
    name: "Jamie",
    age: 21,
    school: "Stanford University",
    major: "AI & Machine Learning",
    bio: "Passionate about technology and making meaningful connections. Love hiking and exploring new cafes.",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600",
    interests: ["AI", "Hiking", "Photography"],
    gpa: 3.9,
    shareGPA: true,
  },
  {
    id: "2",
    name: "Morgan",
    age: 22,
    school: "UC Berkeley",
    major: "Product Design",
    bio: "Designer by day, chef by night. Always looking for the next great adventure or coffee shop.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
    interests: ["Design", "Cooking", "Travel"],
    gpa: 3.7,
    shareGPA: true,
  },
  {
    id: "3",
    name: "Taylor",
    age: 20,
    school: "MIT",
    major: "Computer Science",
    bio: "Building the future one line of code at a time. When I'm not coding, you'll find me at the climbing gym.",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600",
    interests: ["Coding", "Rock Climbing", "Music"],
    gpa: 3.85,
    shareGPA: false, // This user hasn't opted in to share
  },
];

// Mock current user data - in a real app this would come from authentication
const mockCurrentUser = {
  shareGPA: true, // Current user has opted in to share GPA
};

const Discover = () => {
  const [mode, setMode] = useState<Mode>("dating");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<typeof mockProfiles[0] | null>(null);
  const navigate = useNavigate();

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      // Simulate match (20% chance for demo)
      const isMatch = Math.random() > 0.8;
      if (isMatch && mockProfiles[currentIndex]) {
        setMatchedProfile(mockProfiles[currentIndex]);
        setShowMatch(true);
      } else {
        toast("Liked!", { icon: "❤️" });
      }
    }

    // Move to next profile
    setTimeout(() => {
      if (currentIndex < mockProfiles.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        toast.success("You're all caught up! Check back later for new people.");
        setCurrentIndex(0);
      }
    }, 300);
  };

  const handleMessage = () => {
    setShowMatch(false);
    navigate("/chat/1");
  };

  const handleKeepSwiping = () => {
    setShowMatch(false);
    if (currentIndex < mockProfiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const currentProfile = mockProfiles[currentIndex];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with Mode Toggle */}
      <div className="bg-card border-b border-border px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">CampusMatch</h1>
          
          <div className="flex items-center gap-2 bg-muted rounded-full p-1">
            <button
              onClick={() => setMode("dating")}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
                mode === "dating"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Heart className="w-4 h-4" />
              Dating
            </button>
            <button
              onClick={() => setMode("networking")}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
                mode === "networking"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Networking
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {currentProfile ? (
          <div className="relative">
            {/* Background cards for depth */}
            {mockProfiles.slice(currentIndex + 1, currentIndex + 3).map((_, index) => (
              <div
                key={index}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card rounded-3xl shadow-lg"
                style={{
                  zIndex: -index - 1,
                  transform: `translate(-50%, ${(index + 1) * 8}px) scale(${1 - (index + 1) * 0.03})`,
                  opacity: 1 - (index + 1) * 0.3,
                }}
              />
            ))}

            {/* Active card */}
            <SwipeCard
              key={currentProfile.id}
              profile={currentProfile}
              onSwipe={handleSwipe}
              currentUserSharesGPA={mockCurrentUser.shareGPA}
            />
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No more profiles to show right now
            </p>
          </div>
        )}
      </div>

      {/* Match Modal */}
      {showMatch && matchedProfile && (
        <MatchModal
          match={matchedProfile}
          onMessage={handleMessage}
          onKeepSwiping={handleKeepSwiping}
        />
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-around">
          <button className="flex flex-col items-center gap-1 text-foreground">
            <Heart className="w-6 h-6" />
            <span className="text-xs font-medium">Discover</span>
          </button>
          <button
            onClick={() => navigate("/matches")}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs font-medium">Matches</span>
          </button>
          <button
            onClick={() => navigate("/recommended")}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <MapPin className="w-6 h-6" />
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

export default Discover;
