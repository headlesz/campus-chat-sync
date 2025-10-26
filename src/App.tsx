import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { AuthProvider } from "./contexts/AuthContext";
import { OnboardingProvider } from "./contexts/OnboardingContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import VoiceOnboarding from "./pages/VoiceOnboarding";
import ProfileSetup from "./pages/ProfileSetup";
import CalendarOnboarding from "./pages/CalendarOnboarding";
import Discover from "./pages/Discover";
import Matches from "./pages/Matches";
import Recommended from "./pages/Recommended";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import ProfileSettings from "./pages/ProfileSettings";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <OnboardingProvider>
          <UserProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/onboarding/voice" element={<VoiceOnboarding />} />
              <Route path="/onboarding/profile" element={<ProfileSetup />} />
              <Route path="/onboarding/calendar" element={<CalendarOnboarding />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/recommended" element={<Recommended />} />
              <Route path="/chat/:matchId" element={<Chat />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/settings" element={<ProfileSettings />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            </TooltipProvider>
          </UserProvider>
        </OnboardingProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
