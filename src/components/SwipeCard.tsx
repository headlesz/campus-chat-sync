import { useState, useRef, useEffect } from "react";
import { X, Heart, MapPin, Briefcase, GraduationCap } from "lucide-react";

interface SwipeCardProps {
  profile: {
    id: string;
    name: string;
    age: number;
    school: string;
    major: string;
    bio: string;
    photo: string;
    interests: string[];
    gpa?: number;
    shareGPA?: boolean;
  };
  onSwipe: (direction: "left" | "right") => void;
  currentUserSharesGPA?: boolean;
}

const SwipeCard = ({ profile, onSwipe, currentUserSharesGPA = false }: SwipeCardProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  // Reset position when profile changes
  useEffect(() => {
    setPosition({ x: 0, y: 0 });
  }, [profile.id]);

  const handleDragStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    startPos.current = { x: clientX - position.x, y: clientY - position.y };
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    const newX = clientX - startPos.current.x;
    const newY = clientY - startPos.current.y;
    setPosition({ x: newX, y: newY });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    
    const threshold = 100;
    if (Math.abs(position.x) > threshold) {
      const direction = position.x > 0 ? "right" : "left";
      animateOut(direction);
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const animateOut = (direction: "left" | "right") => {
    const multiplier = direction === "right" ? 1 : -1;
    setPosition({ x: window.innerWidth * multiplier, y: position.y });
    setTimeout(() => onSwipe(direction), 300);
  };

  const handleButtonSwipe = (direction: "left" | "right") => {
    animateOut(direction);
  };

  const rotation = (position.x / 20);
  const likeOpacity = Math.min(Math.abs(position.x) / 100, 1);
  const isLike = position.x > 30;
  const isNope = position.x < -30;

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Card */}
      <div
        ref={cardRef}
        className="relative bg-card rounded-3xl overflow-hidden shadow-2xl border border-border select-none touch-none"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
          transition: isDragging ? "none" : "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
        onMouseMove={(e) => handleDragMove(e.clientX, e.clientY)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => {
          const touch = e.touches[0];
          handleDragStart(touch.clientX, touch.clientY);
        }}
        onTouchMove={(e) => {
          const touch = e.touches[0];
          handleDragMove(touch.clientX, touch.clientY);
        }}
        onTouchEnd={handleDragEnd}
      >
        {/* Like/Nope Overlay */}
        <div
          className={`swipe-overlay ${isLike ? "like" : ""} ${isNope ? "nope" : ""}`}
          style={{ opacity: likeOpacity }}
        >
          {isLike ? "LIKE" : isNope ? "NOPE" : ""}
        </div>

        {/* Photo */}
        <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
          <img
            src={profile.photo}
            alt={profile.name}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* Info Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 pt-24">
          <h2 className="text-3xl font-bold text-white mb-2">
            {profile.name}, {profile.age}
          </h2>
          
          <div className="flex items-center gap-2 text-white/90 mb-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{profile.school}</span>
          </div>
          
          <div className="flex items-center gap-2 text-white/90 mb-2">
            <Briefcase className="w-4 h-4" />
            <span className="text-sm">{profile.major}</span>
          </div>
          
          {/* GPA - Only show if both users opted in */}
          {currentUserSharesGPA && profile.shareGPA && profile.gpa && (
            <div className="flex items-center gap-2 text-white/90 mb-3">
              <GraduationCap className="w-4 h-4" />
              <span className="text-sm font-medium">GPA: {profile.gpa.toFixed(2)}</span>
            </div>
          )}
          
          {!currentUserSharesGPA && profile.shareGPA && profile.gpa && (
            <div className="mb-3" />
          )}
          
          <p className="text-sm text-white/80 line-clamp-2 mb-3">
            {profile.bio}
          </p>

          <div className="flex flex-wrap gap-2">
            {profile.interests.slice(0, 3).map((interest, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-6 mt-6">
        <button
          onClick={() => handleButtonSwipe("left")}
          className="w-16 h-16 rounded-full bg-card border-2 border-destructive text-destructive hover:bg-destructive hover:text-white transition-all duration-200 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95"
        >
          <X className="w-8 h-8" />
        </button>

        <button
          onClick={() => handleButtonSwipe("right")}
          className="w-16 h-16 rounded-full bg-primary border-2 border-primary text-white hover:bg-primary-hover transition-all duration-200 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95"
        >
          <Heart className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};

export default SwipeCard;
