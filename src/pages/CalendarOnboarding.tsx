import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";

const CalendarOnboarding = () => {
  const navigate = useNavigate();
  const { setCalendarConnected } = useUser();

  const handleConnectCalendar = () => {
    // This is where I would use Google Calendar API OAuth flow
    // For now, simulate the connection
    toast.success("Calendar connected successfully!");
    setCalendarConnected(true);
    navigate("/discover");
  };

  const handleSkip = () => {
    navigate("/discover");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <Calendar className="w-12 h-12 text-primary" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">When are you free?</h1>
          <p className="text-muted-foreground leading-relaxed">
            Connect your calendar to automatically find times when you and your matches are both available. 
            Make scheduling meetups effortless!
          </p>
        </div>

        {/* Main Button */}
        <Button
          onClick={handleConnectCalendar}
          size="lg"
          className="w-full h-14 text-lg"
        >
          <Calendar className="w-5 h-5 mr-2" />
          Connect to Google Calendar
        </Button>

        {/* Benefits */}
        <div className="bg-card border border-border rounded-lg p-6 text-left space-y-3">
          <p className="font-semibold text-sm">Why connect your calendar?</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>See mutual availability with your matches instantly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>Schedule meetups without the back-and-forth</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>Your calendar data stays private and secure</span>
            </li>
          </ul>
        </div>

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};

export default CalendarOnboarding;
