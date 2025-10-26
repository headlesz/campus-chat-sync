import { useState } from "react";
import SwipeCard from "@/components/SwipeCard";
import MatchModal from "@/components/MatchModal";
import { Heart, MessageCircle, User, MapPin, Sparkles, Users } from "lucide-react";
import { Heart, Users, MessageCircle, User, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";

type Mode = "dating" | "friends";

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

const Discover = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<typeof mockProfiles[0] | null>(null);
  const navigate = useNavigate();
  const { shareGPA, mode, setMode } = useUser();
  const isDating = mode === "dating";
  const mockCurrentUser = { shareGPA: false };

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
      <div
        className={`px-6 py-4 sticky top-0 z-10 transition-colors duration-300 ${
          isDating ? "bg-pink-300" : "bg-blue-300"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black">CampusMatch</h1>

          {/* Sliding Toggle */}
          <div className="relative bg-white/20 backdrop-blur rounded-full p-1 w-[260px]">
            {/* Slider */}
            <div
              className={`absolute top-1 bottom-1 w-[126px] rounded-full transition-all duration-300 ${
                isDating ? "left-1 bg-pink-500" : "left-[131px] bg-blue-500"
              }`}
              style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.15)" }}
            />
            {/* Options */}
            <div className="relative grid grid-cols-2 gap-0">
              <button
                onClick={() => setMode("dating")}
                className={`z-10 flex items-center justify-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${
                  isDating ? "text-white" : "text-black/80"
                }`}
              >
                <Heart className="w-4 h-4" />
                Dating
              </button>
              <button
                onClick={() => setMode("friends")}
                className={`z-10 flex items-center justify-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${
                  !isDating ? "text-white" : "text-black/80"
                }`}
              >
                <Users className="w-4 h-4" />
                Friends
              </button>
            </div>
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
              mode={mode}
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
      <div
        className={`fixed bottom-0 left-0 right-0 px-6 py-4 transition-colors duration-300 ${
          isDating ? "bg-pink-300" : "bg-blue-300"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-around text-black">
          <button className="flex flex-col items-center gap-1 text-black/90 hover:text-black transition-colors">
            <Heart className="w-6 h-6" />
            <span className="text-xs font-medium">Discover</span>
          </button>
          <button
            onClick={() => navigate("/matches")}
            className="flex flex-col items-center gap-1 text-black/90 hover:text-black transition-colors"
          >
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
            className="flex flex-col items-center gap-1 text-black/90 hover:text-black transition-colors"
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
