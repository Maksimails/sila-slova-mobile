import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type Gender = 'm' | 'f';

export type QuizAnswers = {
  wordMeaning?: 'trivial' | 'unpleasant' | 'selfRespect' | 'worst';
  abandonsGoals?: 'always' | 'often' | 'sometimes' | 'never';
  loseFocusAlone?: 'always' | 'often' | 'sometimes' | 'never';
  needsPressure?: 'always' | 'often' | 'sometimes' | 'never';
  helpsIfKnown?: 'always' | 'often' | 'sometimes' | 'never';
  onlyByDeadline?: 'always' | 'often' | 'sometimes' | 'never';
  reviewer?: 'human' | 'ai' | 'either';
  source?: string;
};

export type OnboardingDraft = {
  name?: string;
  birthDate?: string;
  gender?: Gender;
  avatarUri?: string;
  legalAccepted?: boolean;
  pdConsent?: boolean;
  publicConsent?: boolean;
  quiz: QuizAnswers;
  seriousnessScore?: number;
};

type OnboardingContextValue = {
  draft: OnboardingDraft;
  update: (patch: Partial<OnboardingDraft>) => void;
  updateQuiz: (patch: Partial<QuizAnswers>) => void;
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<OnboardingDraft>({ quiz: {} });

  const value = useMemo<OnboardingContextValue>(
    () => ({
      draft,
      update: (patch) => setDraft((prev) => ({ ...prev, ...patch })),
      updateQuiz: (patch) => setDraft((prev) => ({ ...prev, quiz: { ...prev.quiz, ...patch } })),
    }),
    [draft],
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return ctx;
}
