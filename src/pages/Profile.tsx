import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useEffect, useMemo, useRef, useState } from "react";

const Profile = () => {
  const { draft, setDraft } = useOnboarding();
  const navigate = useNavigate();

  const [name, setName] = useState(draft.name || "");
  const [age, setAge] = useState(draft.age?.toString() || "");
  const [bio, setBio] = useState(draft.bio || "");
  const [major, setMajor] = useState(draft.major || "");
  const [year, setYear] = useState(draft.year || "");
  const [interests, setInterests] = useState(draft.interests.join(", "));
  const [partnerGender, setPartnerGender] = useState(draft.partnerGender || null);
  const [partnerInterests, setPartnerInterests] = useState(draft.partnerInterests.join(", "));
  const [qualities, setQualities] = useState(draft.qualities.join(", "));
  const [avatar, setAvatar] = useState<string | undefined>(draft.avatarDataUrl);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const save = () => {
    const parseList = (v: string) => v.split(/\s*,\s*/).map(s => s.trim()).filter(Boolean);
    setDraft({
      name: name.trim() || undefined,
      age: age ? Math.max(18, Math.min(100, parseInt(age))) : undefined,
      bio: bio.trim() || undefined,
      major: major.trim() || undefined,
      year: year.trim() || undefined,
      interests: parseList(interests),
      partnerGender: partnerGender as any,
      partnerInterests: parseList(partnerInterests),
      qualities: parseList(qualities),
      avatarDataUrl: avatar,
    });
  };

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Edit Profile</h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
            <Button onClick={() => navigate("/discover")}>Discover</Button>
          </div>
        </div>

        <Card className="p-6 space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-muted border border-border">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No photo</div>
              )}
            </div>
            <div className="flex gap-2">
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPick} />
              <Button variant="secondary" onClick={() => fileRef.current?.click()}>Upload Photo</Button>
              {avatar && (
                <Button variant="ghost" onClick={() => setAvatar(undefined)}>Remove</Button>
              )}
            </div>
          </div>

          {/* Basics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" min={18} max={100} value={age} onChange={(e) => setAge(e.target.value)} placeholder="21" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="A short intro about you" rows={4} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="major">Major</Label>
              <Input id="major" value={major} onChange={(e) => setMajor(e.target.value)} placeholder="Computer Science" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input id="year" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Junior" />
            </div>
          </div>

          {/* Preferences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="interests">Your Interests</Label>
              <Input id="interests" value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="e.g., hiking, basketball, hackathons" />
            </div>
            <div className="space-y-2">
              <Label>Preferred Partner Gender</Label>
              <div className="flex flex-wrap gap-2">
                {(["male","female","non-binary","no-preference"] as const).map((g) => (
                  <Button key={g} type="button" variant={partnerGender === g ? "default" : "outline"} onClick={() => setPartnerGender(g)}>
                    {g}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="partnerInterests">Partner Interests</Label>
              <Input id="partnerInterests" value={partnerInterests} onChange={(e) => setPartnerInterests(e.target.value)} placeholder="e.g., music, fitness, reading" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="qualities">Qualities You Value</Label>
              <Input id="qualities" value={qualities} onChange={(e) => setQualities(e.target.value)} placeholder="e.g., kind, ambitious, funny" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => navigate("/dashboard")}>Cancel</Button>
            <Button onClick={save}>Save Changes</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
