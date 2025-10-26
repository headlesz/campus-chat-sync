import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Heart, Search, MessageSquare, Settings, LogOut, Edit } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { getProfile } from "@/lib/profile";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserAndProfile();
  }, []);

  const loadUserAndProfile = async () => {
    try {
      // Get authenticated user
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) {
        navigate("/auth");
        return;
      }

      setUser(authUser);

      // Get profile data
      const profileData = await getProfile();
      setProfile(profileData);
    } catch (error) {
      console.error("Error loading profile:", error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
    toast.success("Logged out successfully");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const userName = user?.user_metadata?.name || "User";
  const userEmail = user?.email || "";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">CampusMatch</h1>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {userName}! 👋</h2>
          <p className="text-muted-foreground">Your dating profile is set up and ready to go.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Your Profile</CardTitle>
                  <CardDescription>{userEmail}</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("/profile/settings")}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Interests */}
              <div>
                <h3 className="font-semibold mb-2 text-sm text-muted-foreground">YOUR INTERESTS</h3>
                <div className="flex flex-wrap gap-2">
                  {profile?.interests && profile.interests.length > 0 ? (
                    profile.interests.map((interest: string, i: number) => (
                      <Badge key={i} variant="secondary">
                        {interest}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No interests added yet</p>
                  )}
                </div>
              </div>

              {/* Looking For */}
              <div>
                <h3 className="font-semibold mb-2 text-sm text-muted-foreground">LOOKING FOR</h3>
                <Badge variant="default">
                  {profile?.partner_gender || "Not specified"}
                </Badge>
              </div>

              {/* Partner Interests */}
              <div>
                <h3 className="font-semibold mb-2 text-sm text-muted-foreground">IDEAL MATCH INTERESTS</h3>
                <div className="flex flex-wrap gap-2">
                  {profile?.partner_interests && profile.partner_interests.length > 0 ? (
                    profile.partner_interests.map((interest: string, i: number) => (
                      <Badge key={i} variant="outline">
                        {interest}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No preferences specified</p>
                  )}
                </div>
              </div>

              {/* Desired Qualities */}
              <div>
                <h3 className="font-semibold mb-2 text-sm text-muted-foreground">DESIRED QUALITIES</h3>
                <div className="flex flex-wrap gap-2">
                  {profile?.qualities && profile.qualities.length > 0 ? (
                    profile.qualities.map((quality: string, i: number) => (
                      <Badge key={i} variant="outline">
                        {quality}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No qualities specified</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="space-y-4">
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => navigate("/discover")}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Search className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Discover</CardTitle>
                    <CardDescription>Find new matches</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => navigate("/matches")}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-pink-500/10 rounded-lg">
                    <Heart className="w-5 h-5 text-pink-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Matches</CardTitle>
                    <CardDescription>View your matches</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => navigate("/recommended")}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <MessageSquare className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Recommended</CardTitle>
                    <CardDescription>AI-picked for you</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => navigate("/profile")}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <User className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">My Profile</CardTitle>
                    <CardDescription>View full profile</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => navigate("/profile/settings")}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-500/10 rounded-lg">
                    <Settings className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Settings</CardTitle>
                    <CardDescription>Manage preferences</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
