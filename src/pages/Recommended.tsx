import { Coffee, BookOpen, Utensils, Music, Dumbbell, Heart, MessageCircle, User, MapPin, Star, Clock, ExternalLink, Users, Calendar, Sparkles, Briefcase, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock venue data - In a real app, this would come from API calls
// This is where I would use Google Places API or Yelp API with search queries based on user interests
const mockVenues = [
  {
    id: "1",
    name: "Blue Bottle Coffee",
    type: "Coffee Shop",
    icon: Coffee,
    distance: "0.3 mi",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600",
    description: "Artisanal coffee and cozy atmosphere perfect for study dates",
    matchReason: "Both you and Jamie love coffee",
    interests: ["Coffee", "Studying"],
    address: "123 Campus Ave",
    hours: "7:00 AM - 8:00 PM",
    priceLevel: "$$",
  },
  {
    id: "2",
    name: "Green Library Study Room",
    type: "Study Space",
    icon: BookOpen,
    distance: "On Campus",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600",
    description: "Quiet study space with natural lighting and reservable rooms",
    matchReason: "Perfect for your Computer Science study session",
    interests: ["Studying", "Academic"],
    address: "Stanford Campus",
    hours: "24/7",
    priceLevel: "Free",
  },
  {
    id: "3",
    name: "Coupa Café",
    type: "Café & Restaurant",
    icon: Utensils,
    distance: "0.5 mi",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600",
    description: "Venezuelan cuisine and great coffee, student favorite",
    matchReason: "Popular spot matching both your food interests",
    interests: ["Food", "Coffee", "Casual Dining"],
    address: "538 Ramona St",
    hours: "7:00 AM - 10:00 PM",
    priceLevel: "$$",
  },
  {
    id: "4",
    name: "Frost Amphitheater",
    type: "Outdoor Venue",
    icon: Music,
    distance: "0.8 mi",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600",
    description: "Beautiful outdoor venue for concerts and events",
    matchReason: "You both listed music as an interest",
    interests: ["Music", "Events", "Outdoor"],
    address: "351 Lasuen St",
    hours: "Varies by event",
    priceLevel: "Varies",
  },
  {
    id: "5",
    name: "The Dish Trail",
    type: "Outdoor Activity",
    icon: Dumbbell,
    distance: "1.2 mi",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600",
    description: "Scenic hiking trail with panoramic views, great for active dates",
    matchReason: "Jamie mentioned loving hiking",
    interests: ["Hiking", "Nature", "Fitness"],
    address: "Stanford Foothills",
    hours: "Sunrise - Sunset",
    priceLevel: "Free",
  },
  {
    id: "6",
    name: "Tressider Union Food Court",
    type: "Food Court",
    icon: Utensils,
    distance: "On Campus",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600",
    description: "Variety of food options in a casual campus setting",
    matchReason: "Convenient on-campus meeting spot",
    interests: ["Food", "Casual", "Student Life"],
    address: "459 Lagunita Dr",
    hours: "7:00 AM - 11:00 PM",
    priceLevel: "$",
  },
];

// Mock clubs data - This is where I would use a Campus Organizations API or Student Life database
const mockClubs = [
  {
    id: "1",
    name: "AI & Machine Learning Club",
    type: "Academic Club",
    icon: Sparkles,
    members: 245,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600",
    description: "Learn about cutting-edge AI research and build ML projects with fellow enthusiasts",
    matchReason: "Matches your Computer Science major and AI interests",
    interests: ["AI", "Machine Learning", "Technology"],
    meetingTime: "Tuesdays 6:00 PM",
    location: "Gates Building, Room 104",
  },
  {
    id: "2",
    name: "Stanford Hiking Club",
    type: "Outdoor & Recreation",
    icon: Dumbbell,
    members: 532,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600",
    description: "Weekly hikes exploring Bay Area trails, from beginner to advanced levels",
    matchReason: "You and Jamie both love hiking",
    interests: ["Hiking", "Nature", "Fitness", "Outdoor"],
    meetingTime: "Saturdays 8:00 AM",
    location: "White Plaza",
  },
  {
    id: "3",
    name: "Photography Society",
    type: "Arts & Media",
    icon: Music,
    members: 178,
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600",
    description: "Capture campus life and explore photography techniques together",
    matchReason: "Aligns with your photography interest",
    interests: ["Photography", "Art", "Media"],
    meetingTime: "Thursdays 5:30 PM",
    location: "Art Building",
  },
  {
    id: "4",
    name: "Entrepreneurship Club",
    type: "Professional Development",
    icon: Users,
    members: 423,
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600",
    description: "Network with founders, learn startup skills, and pitch your ideas",
    matchReason: "Great for networking mode connections",
    interests: ["Business", "Startups", "Networking"],
    meetingTime: "Wednesdays 7:00 PM",
    location: "GSB Campus",
  },
];

// Mock events data - This is where I would use Eventbrite API, campus events calendar, or local event aggregators
const mockEvents = [
  {
    id: "1",
    name: "Tech Career Fair",
    type: "Career & Networking",
    icon: Briefcase,
    date: "Nov 15, 2024",
    time: "10:00 AM - 4:00 PM",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600",
    description: "Meet recruiters from top tech companies and explore internship opportunities",
    matchReason: "Perfect for CS students seeking networking opportunities",
    interests: ["Networking", "Career", "Technology"],
    location: "Tressider Union",
    attendees: 1200,
    price: "Free",
  },
  {
    id: "2",
    name: "Coffee & Code Meetup",
    type: "Social Event",
    icon: Coffee,
    date: "Nov 8, 2024",
    time: "2:00 PM - 5:00 PM",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600",
    description: "Casual coding session at Blue Bottle - bring your laptop and projects",
    matchReason: "Combines your love for coffee and coding",
    interests: ["Coffee", "Coding", "Social"],
    location: "Blue Bottle Coffee",
    attendees: 45,
    price: "Free (buy your own coffee)",
  },
  {
    id: "3",
    name: "Frost Music Festival",
    type: "Entertainment",
    icon: Music,
    date: "Nov 20, 2024",
    time: "6:00 PM - 10:00 PM",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600",
    description: "Live performances featuring student bands and special guests",
    matchReason: "You both listed music as an interest",
    interests: ["Music", "Entertainment", "Social"],
    location: "Frost Amphitheater",
    attendees: 800,
    price: "$15 students",
  },
  {
    id: "4",
    name: "Startup Pitch Night",
    type: "Competition",
    icon: Sparkles,
    date: "Nov 12, 2024",
    time: "7:00 PM - 9:00 PM",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600",
    description: "Watch student founders pitch their startups to investors and win prizes",
    matchReason: "Great for aspiring entrepreneurs",
    interests: ["Startups", "Business", "Networking"],
    location: "Memorial Auditorium",
    attendees: 250,
    price: "Free",
  },
  {
    id: "5",
    name: "Photography Walk: Golden Hour",
    type: "Workshop",
    icon: Camera,
    date: "Nov 10, 2024",
    time: "5:00 PM - 7:00 PM",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600",
    description: "Learn golden hour photography techniques while exploring campus landmarks",
    matchReason: "Perfect for photography enthusiasts",
    interests: ["Photography", "Art", "Outdoor"],
    location: "Main Quad (meeting point)",
    attendees: 30,
    price: "Free",
  },
];

const Recommended = () => {
  const navigate = useNavigate();

  const handleVenueClick = (venueId: string) => {
    // This is where I would use Google Places API or Yelp API to get detailed venue information
    // For now, just show a toast or navigate to a detail view
    console.log(`Venue ${venueId} clicked`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-1">Recommended for You</h1>
          <p className="text-sm text-muted-foreground">
            Venues, clubs, and events tailored to your interests
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        {/* Info Banner */}
        <Card className="mb-6 bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm mb-1">AI-Powered Suggestions</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Personalized recommendations for venues, clubs, and events based on your interests, matches' preferences, and chat history!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Venues, Clubs, Events */}
        <Tabs defaultValue="venues" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="venues" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Venues
            </TabsTrigger>
            <TabsTrigger value="clubs" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Clubs
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Events
            </TabsTrigger>
          </TabsList>

          {/* Venues Tab */}
          <TabsContent value="venues">
        {/* Venue Grid */}
        <div className="grid gap-4">
          {mockVenues.map((venue) => {
            const Icon = venue.icon;
            return (
              <Card
                key={venue.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleVenueClick(venue.id)}
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="sm:w-48 h-48 sm:h-auto flex-shrink-0 bg-muted">
                    <img
                      src={venue.image}
                      alt={venue.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <CardContent className="flex-1 p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="w-5 h-5 text-primary" />
                          <h3 className="font-bold text-lg">{venue.name}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{venue.type}</p>
                      </div>
                      
                      <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950 px-2 py-1 rounded-lg">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="text-sm font-semibold">{venue.rating}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">
                      {venue.description}
                    </p>

                    {/* Match Reason */}
                    <div className="bg-primary/10 rounded-lg px-3 py-2 mb-3">
                      <p className="text-xs font-medium text-primary flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {venue.matchReason}
                      </p>
                    </div>

                    {/* Interests */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {venue.interests.map((interest, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>

                    {/* Details */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{venue.distance}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{venue.hours}</span>
                      </div>
                      <div>
                        <span className="font-medium">{venue.priceLevel}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-4 pt-4 border-t border-border">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          // This is where I would use Google Maps API to open directions
                          // or link to the venue's website/booking page
                          console.log(`Get directions to ${venue.name}`);
                        }}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Empty State (if no venues) */}
        {mockVenues.length === 0 && (
          <Card>
            <CardContent className="pt-20 pb-20 text-center">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No recommendations yet</h3>
              <p className="text-muted-foreground">
                Start matching and chatting to get personalized venue suggestions!
              </p>
            </CardContent>
          </Card>
        )}
          </TabsContent>

          {/* Clubs Tab */}
          <TabsContent value="clubs">
            <div className="grid gap-4">
              {mockClubs.map((club) => {
                const Icon = club.icon;
                return (
                  <Card
                    key={club.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => console.log(`Club ${club.id} clicked`)}
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Image */}
                      <div className="sm:w-48 h-48 sm:h-auto flex-shrink-0 bg-muted">
                        <img
                          src={club.image}
                          alt={club.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <CardContent className="flex-1 p-6">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Icon className="w-5 h-5 text-primary" />
                              <h3 className="font-bold text-lg">{club.name}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">{club.type}</p>
                          </div>
                          
                          <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-lg">
                            <Users className="w-4 h-4 text-primary" />
                            <span className="text-sm font-semibold">{club.members}</span>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">
                          {club.description}
                        </p>

                        {/* Match Reason */}
                        <div className="bg-primary/10 rounded-lg px-3 py-2 mb-3">
                          <p className="text-xs font-medium text-primary flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {club.matchReason}
                          </p>
                        </div>

                        {/* Interests */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {club.interests.map((interest, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                        </div>

                        {/* Details */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{club.meetingTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{club.location}</span>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-4 pt-4 border-t border-border">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto"
                            onClick={(e) => {
                              e.stopPropagation();
                              // This is where I would use a Campus Organizations API to get membership/join links
                              console.log(`Join ${club.name}`);
                            }}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Learn More
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                );
              })}
            </div>

            {mockClubs.length === 0 && (
              <Card>
                <CardContent className="pt-20 pb-20 text-center">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No clubs yet</h3>
                  <p className="text-muted-foreground">
                    Check back soon for personalized club recommendations!
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events">
            <div className="grid gap-4">
              {mockEvents.map((event) => {
                const Icon = event.icon;
                return (
                  <Card
                    key={event.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => console.log(`Event ${event.id} clicked`)}
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Image */}
                      <div className="sm:w-48 h-48 sm:h-auto flex-shrink-0 bg-muted">
                        <img
                          src={event.image}
                          alt={event.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <CardContent className="flex-1 p-6">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Icon className="w-5 h-5 text-primary" />
                              <h3 className="font-bold text-lg">{event.name}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">{event.type}</p>
                          </div>
                          
                          <Badge variant="default" className="text-xs">
                            {event.date}
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">
                          {event.description}
                        </p>

                        {/* Match Reason */}
                        <div className="bg-primary/10 rounded-lg px-3 py-2 mb-3">
                          <p className="text-xs font-medium text-primary flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {event.matchReason}
                          </p>
                        </div>

                        {/* Interests */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {event.interests.map((interest, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                        </div>

                        {/* Details */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{event.attendees} going</span>
                          </div>
                          <div>
                            <span className="font-medium">{event.price}</span>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-4 pt-4 border-t border-border">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto"
                            onClick={(e) => {
                              e.stopPropagation();
                              // This is where I would use Eventbrite API or campus calendar API to get registration/RSVP links
                              console.log(`RSVP to ${event.name}`);
                            }}
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            RSVP
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                );
              })}
            </div>

            {mockEvents.length === 0 && (
              <Card>
                <CardContent className="pt-20 pb-20 text-center">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No upcoming events</h3>
                  <p className="text-muted-foreground">
                    Check back soon for exciting campus events!
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
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
          <button
            onClick={() => navigate("/matches")}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs font-medium">Matches</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-foreground">
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

export default Recommended;
