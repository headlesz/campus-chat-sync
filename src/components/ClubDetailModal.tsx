import { X, Users, Clock, MapPin, ExternalLink, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ClubDetailModalProps {
  club: {
    id: string;
    name: string;
    type: string;
    members: number;
    image: string;
    description: string;
    matchReason: string;
    interests: string[];
    meetingTime: string;
    location: string;
  };
  onClose: () => void;
}

const ClubDetailModal = ({ club, onClose }: ClubDetailModalProps) => {
  const handleJoinClub = () => {
    // This is where I would use Campus Organizations API to get membership/join links
    window.open(`https://example.com/clubs/${club.id}/join`, '_blank');
  };

  const handleContactClub = () => {
    // This is where I would use the club's contact email or form
    window.location.href = `mailto:${club.name.toLowerCase().replace(/\s+/g, '')}@stanford.edu`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header Image */}
        <div className="relative h-64 w-full">
          <img
            src={club.image}
            alt={club.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          {/* Member Count Badge */}
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg">
            <div className="flex items-center gap-2 text-white">
              <Users className="w-5 h-5" />
              <span className="font-semibold">{club.members} members</span>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          {/* Title & Type */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">{club.name}</h2>
            <p className="text-sm font-medium text-muted-foreground">{club.type}</p>
          </div>

          {/* Match Reason */}
          <div className="bg-primary/10 rounded-lg px-4 py-3 mb-4">
            <p className="text-sm font-medium text-primary">
              💡 {club.matchReason}
            </p>
          </div>

          {/* Description */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {club.description}
            </p>
          </div>

          {/* Interests */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Focus Areas</h3>
            <div className="flex flex-wrap gap-2">
              {club.interests.map((interest, i) => (
                <Badge key={i} variant="secondary">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          {/* Meeting Details */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Meeting Time</p>
                <p className="text-sm text-muted-foreground">{club.meetingTime}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">{club.location}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleJoinClub}
              className="flex-1"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Join Club
            </Button>
            <Button
              variant="outline"
              onClick={handleContactClub}
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClubDetailModal;
