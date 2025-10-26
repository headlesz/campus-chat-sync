import { createContext, useContext, useMemo, useState, ReactNode } from 'react';

export type PartnerGender = 'male' | 'female' | 'non-binary' | 'no-preference';

export interface DraftProfile {
  interests: string[];
  partnerGender: PartnerGender | null;
  partnerInterests: string[];
  qualities: string[];
  name?: string;
  age?: number;
  bio?: string;
  major?: string;
  year?: string;
  avatarDataUrl?: string; // client-only for now
}

interface OnboardingContextType {
  draft: DraftProfile;
  setDraft: (u: Partial<DraftProfile>) => void;
  reset: () => void;
}

const defaultDraft: DraftProfile = {
  interests: [],
  partnerGender: null,
  partnerInterests: [],
  qualities: [],
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [draft, setDraftState] = useState<DraftProfile>(() => {
    try {
      const raw = localStorage.getItem('campusmatch-draft');
      return raw ? { ...defaultDraft, ...JSON.parse(raw) } : defaultDraft;
    } catch {
      return defaultDraft;
    }
  });

  const setDraft = (u: Partial<DraftProfile>) => setDraftState((d) => {
    const next = { ...d, ...u };
    try { localStorage.setItem('campusmatch-draft', JSON.stringify(next)); } catch {}
    return next;
  });
  const reset = () => setDraftState(defaultDraft);

  const value = useMemo(() => ({ draft, setDraft, reset }), [draft]);

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
};

export const useOnboarding = () => {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error('useOnboarding must be used within an OnboardingProvider');
  return ctx;
};
