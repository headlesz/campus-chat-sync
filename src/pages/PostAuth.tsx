import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useOnboarding } from "@/contexts/OnboardingContext";

const PostAuth = () => {
  const navigate = useNavigate();
  const { draft } = useOnboarding();

  useEffect(() => {
    const run = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth", { replace: true });
        return;
      }
      // Decide onboarding completeness
      const complete = (
        (draft.interests?.length ?? 0) > 0 &&
        draft.partnerGender != null &&
        (draft.qualities?.length ?? 0) > 0
      );
      navigate(complete ? "/dashboard" : "/onboarding/voice", { replace: true });
    };
    run();
  }, [navigate, draft]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Preparing your experience…</div>
    </div>
  );
};

export default PostAuth;
