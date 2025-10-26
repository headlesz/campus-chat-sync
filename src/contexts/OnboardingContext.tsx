import { createContext, useContext, useState, ReactNode } from 'react';

interface OnboardingContextType {
  draft: any;
  setDraft: (data: any) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [draft, setDraft] = useState<any>(null);

  return (
    <OnboardingContext.Provider value={{ draft, setDraft }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
