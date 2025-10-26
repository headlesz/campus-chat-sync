import { Button } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";

interface MatchModalProps {
  match: {
    name: string;
    photo: string;
  };
  onMessage: () => void;
  onKeepSwiping: () => void;
}

const MatchModal = ({ match, onMessage, onKeepSwiping }: MatchModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-card rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl animate-scale-in">
        {/* Celebration Header */}
        <div className="text-center mb-8">
          <div className="inline-block animate-bounce mb-4">
            <Heart className="w-16 h-16 text-success fill-success" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            It's a Match!
          </h2>
          <p className="text-muted-foreground">
            You and {match.name} have liked each other
          </p>
        </div>

        {/* Profile Photos */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200"
                alt="Your profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="text-primary animate-pulse">
            <Heart className="w-8 h-8 fill-primary" />
          </div>

          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary shadow-lg">
              <img
                src={match.photo}
                alt={match.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={onMessage}
            size="lg"
            className="w-full font-semibold"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Send a message
          </Button>

          <Button
            onClick={onKeepSwiping}
            variant="ghost"
            size="lg"
            className="w-full"
          >
            Keep swiping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MatchModal;
