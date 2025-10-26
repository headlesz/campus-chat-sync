import { Settings, Edit2, LogOut, Heart, MessageCircle, User, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/contexts/UserContext";

// Mock user data - in a real app this would come from authentication/database
const mockUser = {
  name: "Alex Chen",
  age: 21,
  school: "Stanford University",
  major: "Computer Science",
  bio: "Passionate about building meaningful connections and exploring new technologies. When I'm not coding, you'll find me hiking or trying out new coffee spots around campus.",
  photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
  interests: ["Technology", "Hiking", "Coffee", "Photography", "Music", "Travel"],
  photos: [
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
  ],
};

const Profile = () => {
  const navigate = useNavigate();
  const { shareGPA, gpa } = useUser();

  const handleEditProfile = () => {
    // In a real app, this would navigate to an edit profile page
    navigate("/onboarding/profile");
  };

  const handleSettings = () => {
    navigate("/profile/settings");
  };

  const handleLogout = () => {
    // In a real app, this would handle logout logic
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Profile</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSettings}
              className="text-muted-foreground hover:text-foreground"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-2xl mx-auto px-6 py-6 space-y-6">
        {/* Profile Header Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="w-32 h-32 mb-4">
                <AvatarImage src={mockUser.photo} alt={mockUser.name} />
                <AvatarFallback>{mockUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              
              <h2 className="text-2xl font-bold mb-1">
                {mockUser.name}, {mockUser.age}
              </h2>
              
              <p className="text-muted-foreground mb-2">{mockUser.school}</p>
              <p className="text-sm text-muted-foreground mb-4">{mockUser.major}</p>
              
              <Button onClick={handleEditProfile} className="w-full max-w-xs">
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bio Section */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3">About Me</h3>
            <p className="text-muted-foreground leading-relaxed">{mockUser.bio}</p>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Academic Information
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">GPA</span>
                <span className="font-medium">{parseFloat(gpa).toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sharing Status:</span>
                {shareGPA ? (
                  <Badge variant="default" className="text-xs">
                    Visible to others who opted in
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-xs">
                    Not sharing
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interests Section */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {mockUser.interests.map((interest, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {interest}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Photos Section */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3">Photos</h3>
            <div className="grid grid-cols-3 gap-3">
              {mockUser.photos.map((photo, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden bg-muted"
                >
                  <img
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardContent className="pt-6 space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleSettings}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings & Preferences
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </CardContent>
        </Card>
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
          <button
            onClick={() => navigate("/recommended")}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Sparkles className="w-6 h-6" />
            <span className="text-xs font-medium">Recommended</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-foreground">
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
