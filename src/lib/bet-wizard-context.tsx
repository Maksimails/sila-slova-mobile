import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type BetKind = 'solo' | 'challenge';
export type BetMode = 'public' | 'private';
export type BetType = 'result' | 'habit' | 'quit';
export type HabitTier = 'light' | 'normie' | 'best_self';
export type SkipMode = 'predeclared' | 'flexible';

export type BetDraft = {
  kind?: BetKind;
  mode?: BetMode;
  type?: BetType;
  goal?: string;
  // Result-specific
  pointA?: string;
  motivation?: string;
  durationDays?: number;
  // Habit-specific
  habitTier?: HabitTier;
  skipMode?: SkipMode;
  allowedSkipWeekdays?: number[];
  // Quit-specific
  witnessTg?: string;
  witnessPhone?: string;
  witnessCheckinTime?: string;
  // Challenge-specific
  opponentName?: string;
  opponentUserId?: number;
  // Shared tail
  videoUri?: string;
  stake?: number;
};

type BetWizardContextValue = {
  draft: BetDraft;
  update: (patch: Partial<BetDraft>) => void;
  reset: () => void;
};

const BetWizardContext = createContext<BetWizardContextValue | null>(null);

export function BetWizardProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<BetDraft>({});

  const value = useMemo<BetWizardContextValue>(
    () => ({
      draft,
      update: (patch) => setDraft((prev) => ({ ...prev, ...patch })),
      reset: () => setDraft({}),
    }),
    [draft],
  );

  return <BetWizardContext.Provider value={value}>{children}</BetWizardContext.Provider>;
}

export function useBetWizard() {
  const ctx = useContext(BetWizardContext);
  if (!ctx) {
    throw new Error('useBetWizard must be used within a BetWizardProvider');
  }
  return ctx;
}
