import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
      toast.success(`Code sent to ${email}`);
    }, 1000);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit code");
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Welcome to CampusMatch!");
      navigate("/onboarding/voice");
    }, 1000);
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
          {step === "email" ? (
            <form onSubmit={handleSendCode} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                  disabled={loading}
                />
                <p className="text-xs text-muted-foreground">
                  We'll send you a verification code
                </p>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold"
                disabled={loading}
              >
                {loading ? "Sending code..." : "Send code"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
                >
                  ← Change email
                </button>
                
                <label htmlFor="otp" className="text-sm font-medium text-foreground">
                  Verification code
                </label>
                <p className="text-sm text-muted-foreground mb-3">
                  We've sent a 6-digit code to <span className="font-medium text-foreground">{email}</span>
                </p>
                <Input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="h-12 text-center text-2xl tracking-widest font-semibold"
                  disabled={loading}
                  autoComplete="one-time-code"
                />
                <p className="text-xs text-muted-foreground">
                  Code expires in 5 minutes
                </p>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold"
                disabled={loading || otp.length !== 6}
              >
                {loading ? "Verifying..." : "Verify code"}
              </Button>

              <button
                type="button"
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => {
                  toast.success("New code sent!");
                }}
              >
                Didn't receive a code? Resend
              </button>
            </form>
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
