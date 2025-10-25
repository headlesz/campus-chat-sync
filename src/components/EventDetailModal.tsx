import { X, Calendar, Clock, MapPin, Users, DollarSign, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface EventDetailModalProps {
  event: {
    id: string;
    name: string;
    type: string;
    date: string;
    time: string;
    image: string;
    description: string;
    matchReason: string;
    interests: string[];
    location: string;
    attendees: number;
    price: string;
  };
  onClose: () => void;
}

const EventDetailModal = ({ event, onClose }: EventDetailModalProps) => {
  const handleRSVP = () => {
    // This is where I would use Eventbrite API or campus calendar API to get registration/RSVP links
    toast.success("RSVP submitted! You'll receive a confirmation email.");
  };

  const handleAddToCalendar = () => {
    // This is where I would generate an ICS file or use Google Calendar API
    toast.success("Event added to your calendar!");
  };

  const handleShare = () => {
    // This is where I would use Web Share API or copy link to clipboard
    if (navigator.share) {
      navigator.share({
        title: event.name,
        text: `Check out ${event.name} on ${event.date}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header Image */}
        <div className="relative h-64 w-full">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          {/* Date Badge */}
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg">
            <div className="text-white">
              <p className="text-xs font-medium opacity-90">Event Date</p>
              <p className="font-bold">{event.date}</p>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          {/* Title & Type */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">{event.name}</h2>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="default">{event.type}</Badge>
              <Badge variant="outline">{event.price}</Badge>
            </div>
          </div>

          {/* Match Reason */}
          <div className="bg-primary/10 rounded-lg px-4 py-3 mb-4">
            <p className="text-sm font-medium text-primary">
              💡 {event.matchReason}
            </p>
          </div>

          {/* Description */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">About This Event</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Interests */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {event.interests.map((interest, i) => (
                <Badge key={i} variant="secondary">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          {/* Event Details */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Date & Time</p>
                <p className="text-sm text-muted-foreground">{event.date} at {event.time}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">{event.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Attendees</p>
                <p className="text-sm text-muted-foreground">{event.attendees} people going</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Price</p>
                <p className="text-sm text-muted-foreground">{event.price}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleRSVP}
              size="lg"
              className="w-full"
            >
              <Calendar className="w-4 h-4 mr-2" />
              RSVP to Event
            </Button>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleAddToCalendar}
                className="flex-1"
              >
                <Clock className="w-4 h-4 mr-2" />
                Add to Calendar
              </Button>
              <Button
                variant="outline"
                onClick={handleShare}
                className="flex-1"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
            
            <Button
              variant="ghost"
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

export default EventDetailModal;
