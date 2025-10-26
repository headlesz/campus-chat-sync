import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useEffect, useMemo, useState } from "react";
import { getProfile } from "@/lib/profile";

const Dashboard = () => {
  const { draft, setDraft } = useOnboarding();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const p = await getProfile();
        if (mounted && p) {
          setDraft({
            name: p.name || draft.name,
            age: p.age || draft.age,
            bio: p.bio || draft.bio,
            major: p.major || draft.major,
            year: p.year || draft.year,
            interests: p.interests || draft.interests,
            partnerGender: (p.partner_gender as any) ?? draft.partnerGender,
            partnerInterests: p.partner_interests || draft.partnerInterests,
            qualities: p.qualities || draft.qualities,
          });
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const incomplete = useMemo(() => {
    return (draft.interests?.length ?? 0) === 0 || draft.partnerGender == null || (draft.qualities?.length ?? 0) === 0;
  }, [draft]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate("/profile")}>View Profile</Button>
            <Button onClick={() => navigate("/discover")}>Discover</Button>
          </div>
        </div>

        {incomplete && (
          <Card className="p-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Build your profile</h2>
              <p className="text-sm text-muted-foreground">Finish setting up your interests and preferences to get better matches.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate("/onboarding/voice")}>Start with Voice</Button>
              <Button onClick={() => navigate("/profile")}>Open Profile</Button>
            </div>
          </Card>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6 space-y-3">
            <h3 className="font-semibold">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {(draft.interests ?? []).length ? (
                draft.interests.map((i, idx) => (
                  <span key={idx} className="px-2 py-1 rounded-full text-xs bg-muted text-foreground border border-border">{i}</span>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">Add some interests in your profile</span>
              )}
            </div>
          </Card>

          <Card className="p-6 space-y-3">
            <h3 className="font-semibold">Partner Preferences</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <div><span className="font-medium text-foreground">Gender:</span> {draft.partnerGender ?? "—"}</div>
              <div className="flex flex-wrap gap-2">
                {(draft.partnerInterests ?? []).length ? (
                  draft.partnerInterests.map((i, idx) => (
                    <span key={idx} className="px-2 py-1 rounded-full text-xs bg-muted text-foreground border border-border">{i}</span>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">Add partner interests</span>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-3 md:col-span-2">
            <h3 className="font-semibold">Qualities</h3>
            <div className="flex flex-wrap gap-2">
              {(draft.qualities ?? []).length ? (
                draft.qualities.map((q, idx) => (
                  <span key={idx} className="px-2 py-1 rounded-full text-xs bg-muted text-foreground border border-border">{q}</span>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">Add qualities you value</span>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
