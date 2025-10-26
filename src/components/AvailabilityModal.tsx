import { X, Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface AvailabilityModalProps {
  matchName: string;
  mode: "dating" | "friends";
  onClose: () => void;
}

// Mock availability data - In a real app this would come from Google Calendar API
const mockAvailableSlots = [
  {
    id: "1",
    day: "Tomorrow",
    date: "Oct 26",
    slots: [
      { time: "2:00 PM - 3:00 PM", duration: "1 hour" },
      { time: "4:30 PM - 5:30 PM", duration: "1 hour" },
    ]
  },
  {
    id: "2",
    day: "Sunday",
    date: "Oct 27",
    slots: [
      { time: "10:00 AM - 12:00 PM", duration: "2 hours" },
      { time: "3:00 PM - 4:00 PM", duration: "1 hour" },
    ]
  },
  {
    id: "3",
    day: "Monday",
    date: "Oct 28",
    slots: [
      { time: "1:00 PM - 2:00 PM", duration: "1 hour" },
    ]
  },
];

const AvailabilityModal = ({ matchName, mode, onClose }: AvailabilityModalProps) => {
  const handleSchedule = (day: string, time: string) => {
    // This is where I would use Google Calendar API to create calendar event
    toast.success(`Meetup scheduled for ${day} at ${time}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Find a time with {matchName}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Times when you're both available
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <CardContent className="p-6">
          {mockAvailableSlots.length > 0 ? (
            <div className="space-y-4">
              {mockAvailableSlots.map((daySlot) => (
                <div key={daySlot.id} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <h3 className="font-semibold">{daySlot.day}</h3>
                    <span className="text-sm text-muted-foreground">{daySlot.date}</span>
                  </div>
                  
                  <div className="grid gap-2 pl-6">
                    {daySlot.slots.map((slot, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-4 border border-border rounded-lg transition-all group ${
                          mode === "dating" 
                            ? "hover:border-primary/50 hover:bg-muted/50" 
                            : "hover:border-accent/50 hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{slot.time}</p>
                            <p className="text-xs text-muted-foreground">{slot.duration}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleSchedule(daySlot.day, slot.time)}
                          className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                            mode === "dating" 
                              ? "bg-primary hover:bg-primary-hover text-primary-foreground" 
                              : "bg-accent hover:bg-accent/90 text-accent-foreground"
                          }`}
                        >
                          Schedule
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">No mutual availability found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Try suggesting a specific time to {matchName}
              </p>
              <Button variant="outline" onClick={onClose}>
                Back to chat
              </Button>
            </div>
          )}

          {/* Venue Suggestion */}
          {mockAvailableSlots.length > 0 && (
            <div className={`mt-6 p-4 border rounded-lg ${
              mode === "dating" 
                ? "bg-primary/5 border-primary/20" 
                : "bg-accent/5 border-accent/20"
            }`}>
              <div className="flex items-start gap-3">
                <MapPin className={`w-5 h-5 mt-0.5 ${
                  mode === "dating" ? "text-primary" : "text-accent"
                }`} />
                <div className="flex-1">
                  <p className="font-semibold text-sm mb-1">Suggested meetup spot</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    Blue Bottle Coffee - 0.3 mi away
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    Based on mutual interests
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AvailabilityModal;
