import { X, Star, Clock, MapPin, Navigation } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface VenueDetailModalProps {
  venue: {
    id: string;
    name: string;
    type: string;
    distance: string;
    rating: number;
    image: string;
    description: string;
    matchReason: string;
    interests: string[];
    address: string;
    hours: string;
    priceLevel: string;
  };
  onClose: () => void;
}

const VenueDetailModal = ({ venue, onClose }: VenueDetailModalProps) => {
  const handleGetDirections = () => {
    // This is where I would use Google Maps API to open directions
    window.open(`https://maps.google.com/?q=${encodeURIComponent(venue.name + ' ' + venue.address)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header Image */}
        <div className="relative h-64 w-full">
          <img
            src={venue.image}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <CardContent className="p-6">
          {/* Title & Rating */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">{venue.name}</h2>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
              <span className="font-medium text-foreground">{venue.type}</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{venue.rating}</span>
              </div>
              <span>{venue.priceLevel}</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{venue.distance}</span>
              </div>
            </div>
          </div>

          {/* Match Reason */}
          <div className="bg-primary/10 rounded-lg px-4 py-3 mb-4">
            <p className="text-sm font-medium text-primary">
              💡 {venue.matchReason}
            </p>
          </div>

          {/* Description */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {venue.description}
            </p>
          </div>

          {/* Interests */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {venue.interests.map((interest, i) => (
                <Badge key={i} variant="secondary">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          {/* Details */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Address</p>
                <p className="text-sm text-muted-foreground">{venue.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Hours</p>
                <p className="text-sm text-muted-foreground">{venue.hours}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleGetDirections}
              className="flex-1"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Get Directions
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

export default VenueDetailModal;
