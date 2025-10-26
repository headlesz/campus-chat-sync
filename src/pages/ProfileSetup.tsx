import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Camera, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "Alex",
    age: "21",
    school: "Stanford University",
    major: "Computer Science",
    interests: "AI, hiking, photography",
    bio: "Passionate about technology and making meaningful connections.",
  });
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
        toast.success("Photo uploaded!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!formData.name || !photoUrl) {
      toast.error("Please add a name and photo");
      return;
    }
    
    toast.success("Profile saved!");
    navigate("/discover");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-xl font-bold">Review Your Profile</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Make any changes before continuing
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="bg-card rounded-2xl border border-border p-8 space-y-8">
          {/* Photo Upload */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div className={`w-32 h-32 rounded-full overflow-hidden border-4 border-border ${
                photoUrl ? "" : "bg-muted flex items-center justify-center"
              }`}>
                {photoUrl ? (
                  <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-16 h-16 text-muted-foreground" />
                )}
              </div>
              
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="w-8 h-8 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>
            
            <p className="text-sm text-muted-foreground mt-3">
              {photoUrl ? "Click to change photo" : "Add a profile photo"}
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Age</label>
                <Input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="Age"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">School</label>
                <Input
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                  placeholder="University"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Major</label>
              <Input
                value={formData.major}
                onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                placeholder="Field of study"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Interests</label>
              <Input
                value={formData.interests}
                onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                placeholder="Comma-separated interests"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Bio</label>
              <Textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell us about yourself..."
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                You can edit these details later in settings
              </p>
            </div>
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            size="lg"
            className="w-full font-semibold"
            disabled={!formData.name || !photoUrl}
          >
            Save profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
