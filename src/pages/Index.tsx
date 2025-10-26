import { Button } from "@/components/ui/button";
import { Heart, Users, MessageCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        
        <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-32">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-sm font-medium text-primary">
              <Sparkles className="w-4 h-4" />
              AI-Powered Campus Connections
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Find Your Match.
              <br />
              <span className="text-primary">Build Your Network.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              CampusMatch uses voice AI to help you create meaningful connections. 
              Whether you're looking for dating or networking, we've got you covered.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="h-14 px-8 text-lg font-semibold"
                onClick={() => navigate("/auth")}
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card rounded-2xl p-8 border border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Voice Onboarding</h3>
            <p className="text-muted-foreground leading-relaxed">
              Skip the boring forms. Just talk to our AI assistant and create your profile naturally.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 border border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Smart Matching</h3>
            <p className="text-muted-foreground leading-relaxed">
              Swipe through profiles tailored to your interests in dating or professional networking modes.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 border border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Easy Scheduling</h3>
            <p className="text-muted-foreground leading-relaxed">
              Coordinate meetups effortlessly with built-in calendar integration for real connections.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-primary to-primary-hover text-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to connect?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of students making meaningful connections on campus
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="h-14 px-8 text-lg font-semibold"
            onClick={() => navigate("/auth")}
          >
            Start Matching Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
