import { ArrowLeft, Bell, Lock, Eye, Heart, Shield, HelpCircle, LogOut, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [shareGPA, setShareGPA] = useState(false);
  const [gpa, setGPA] = useState("3.80");

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  const handleGPAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      const numValue = parseFloat(value);
      if (value === "" || (numValue >= 0 && numValue <= 4.0)) {
        setGPA(value);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/profile")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
      </div>

      {/* Settings Content */}
      <div className="max-w-2xl mx-auto px-6 py-6 space-y-6">
        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Account Settings
            </CardTitle>
            <CardDescription>
              Manage your account preferences and security
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive email updates about new matches
                </p>
              </div>
              <Switch id="email-notifications" defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about messages and matches
                </p>
              </div>
              <Switch id="push-notifications" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Privacy Settings
            </CardTitle>
            <CardDescription>
              Control who can see your profile and information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="show-age">Show Age</Label>
                <p className="text-sm text-muted-foreground">
                  Display your age on your profile
                </p>
              </div>
              <Switch id="show-age" defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="show-school">Show School</Label>
                <p className="text-sm text-muted-foreground">
                  Display your school on your profile
                </p>
              </div>
              <Switch id="show-school" defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="discoverable">Profile Visibility</Label>
                <p className="text-sm text-muted-foreground">
                  Allow others to discover your profile
                </p>
              </div>
              <Switch id="discoverable" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Academic Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Academic Information
            </CardTitle>
            <CardDescription>
              Control sharing of your academic information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5 flex-1">
                <Label htmlFor="share-gpa">Share My GPA</Label>
                <p className="text-sm text-muted-foreground">
                  Your GPA will only be visible to others who have also opted in to share their GPA
                </p>
              </div>
              <Switch 
                id="share-gpa" 
                checked={shareGPA}
                onCheckedChange={setShareGPA}
              />
            </div>
            
            {shareGPA && (
              <>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="gpa-value">Your GPA</Label>
                  <Input
                    id="gpa-value"
                    type="text"
                    placeholder="3.80"
                    value={gpa}
                    onChange={handleGPAChange}
                    className="max-w-xs"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter a value between 0.0 and 4.0
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Discovery Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Discovery Preferences
            </CardTitle>
            <CardDescription>
              Customize who you want to see
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="show-dating">Show Dating Mode</Label>
                <p className="text-sm text-muted-foreground">
                  See profiles in dating mode
                </p>
              </div>
              <Switch id="show-dating" defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="show-networking">Show Networking Mode</Label>
                <p className="text-sm text-muted-foreground">
                  See profiles in networking mode
                </p>
              </div>
              <Switch id="show-networking" defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="same-school">Same School Only</Label>
                <p className="text-sm text-muted-foreground">
                  Only show profiles from your school
                </p>
              </div>
              <Switch id="same-school" />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Choose what notifications you want to receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="new-matches">New Matches</Label>
                <p className="text-sm text-muted-foreground">
                  When you get a new match
                </p>
              </div>
              <Switch id="new-matches" defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="new-messages">New Messages</Label>
                <p className="text-sm text-muted-foreground">
                  When someone sends you a message
                </p>
              </div>
              <Switch id="new-messages" defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="likes">Profile Likes</Label>
                <p className="text-sm text-muted-foreground">
                  When someone likes your profile
                </p>
              </div>
              <Switch id="likes" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Additional Options */}
        <Card>
          <CardContent className="pt-6 space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => toast.info("Help & Support coming soon")}
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Help & Support
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => toast.info("About page coming soon")}
            >
              <Heart className="w-4 h-4 mr-2" />
              About CampusMatch
            </Button>
          </CardContent>
        </Card>

        {/* Save and Logout */}
        <div className="space-y-3">
          <Button onClick={handleSave} className="w-full">
            Save Settings
          </Button>
          
          <Button
            variant="outline"
            className="w-full text-destructive hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
