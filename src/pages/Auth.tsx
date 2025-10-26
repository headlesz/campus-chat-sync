import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { supabase, isEduEmail } from "@/lib/supabase";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [step, setStep] = useState<"signup" | "link-sent">("signup");
  const [loading, setLoading] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);
  const navigate = useNavigate();
  const { draft } = useOnboarding();

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) navigate("/post-auth");
    };
    checkSession();
  }, [navigate]);

  const handleSendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate .edu email
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    if (!isEduEmail(email)) {
      toast.error("Please use a valid .edu email address");
      return;
    }

    // Validate name and age for new users
    if (isNewUser) {
      if (!name.trim()) {
        toast.error("Please enter your name");
        return;
      }
      if (!age || parseInt(age) < 18 || parseInt(age) > 100) {
        toast.error("Please enter a valid age (18-100)");
        return;
      }
    }

    setLoading(true);
    
    try {
      // Send Magic Link via Supabase
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: isNewUser,
          emailRedirectTo: `${window.location.origin}/post-auth`,
          data: { name, age: parseInt(age) },
        },
      });

      if (error) throw error;

      setStep("link-sent");
      toast.success(`Magic link sent to ${email}`);
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      toast.error(error.message || "Failed to send magic link");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: isNewUser,
          emailRedirectTo: `${window.location.origin}/post-auth`,
        },
      });

      if (error) throw error;
      toast.success("Magic link re-sent!");
    } catch (error: any) {
      console.error("Error resending Magic Link:", error);
      toast.error(error.message || "Failed to resend link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">CampusMatch</h1>
          <p className="text-muted-foreground">Connect, network, and find your match</p>
        </div>

        {/* Auth Form Card */}
        <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
          {step === "signup" ? (
            <form onSubmit={handleSendLink} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12"
                    disabled={loading}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Must be a valid .edu email address
                  </p>
                </div>

                {isNewUser && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-12"
                        disabled={loading}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="age" className="text-sm font-medium">
                        Age
                      </Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="21"
                        min="18"
                        max="100"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="h-12"
                        disabled={loading}
                        required
                      />
                    </div>
                  </>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold"
                disabled={loading}
              >
                {loading
                  ? (isNewUser ? "Sending sign-up link..." : "Sending sign-in link...")
                  : (isNewUser ? "Send sign-up link" : "Send sign-in link")}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsNewUser(!isNewUser)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isNewUser ? "Already have an account? Sign in" : "New user? Sign up"}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setStep("signup")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
                >
                  ← Change email
                </button>
                <h2 className="text-lg font-semibold">Check your email</h2>
                <p className="text-sm text-muted-foreground">
                  We've sent a sign-in link to <span className="font-medium text-foreground">{email}</span>.
                  Open it on this device to continue.
                </p>
              </div>

              <Button
                type="button"
                className="w-full h-12 text-base font-semibold"
                disabled={loading}
                onClick={handleResendCode}
              >
                {loading ? "Resending..." : "Resend link"}
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Auth;
