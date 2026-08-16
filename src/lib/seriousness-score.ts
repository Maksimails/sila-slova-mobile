import { type QuizAnswers } from '@/lib/onboarding-context';
import { type HabitTier } from '@/lib/bet-wizard-context';

/**
 * Follow-through signal from the onboarding quiz — 0-100, higher means more
 * likely to keep a promise once given. Only questions that measure actual
 * follow-through behavior feed the score (wordMeaning, abandonsGoals,
 * loseFocusAlone, onlyByDeadline). needsPressure/helpsIfKnown/reviewer are
 * product-fit preferences, not reliability signals, so they're excluded —
 * conflating "needs a witness" with "untrustworthy" would be wrong.
 *
 * Advisory only: this must never gate or block bet creation, only suggest a
 * sane default (see recommendedHabitTier below), same spirit as the
 * non-blocking digit hint on the goal screen.
 */

const FREQUENCY_SCALE: Record<'always' | 'often' | 'sometimes' | 'never', number> = {
  always: 20,
  often: 45,
  sometimes: 75,
  never: 100,
};

const WORD_MEANING_SCALE: Record<NonNullable<QuizAnswers['wordMeaning']>, number> = {
  trivial: 20,
  unpleasant: 45,
  selfRespect: 75,
  worst: 100,
};

const NEUTRAL_DEFAULT = 60;

export function computeSeriousnessScore(quiz: QuizAnswers): number {
  const values: number[] = [];

  if (quiz.wordMeaning) values.push(WORD_MEANING_SCALE[quiz.wordMeaning]);
  if (quiz.abandonsGoals) values.push(FREQUENCY_SCALE[quiz.abandonsGoals]);
  if (quiz.loseFocusAlone) values.push(FREQUENCY_SCALE[quiz.loseFocusAlone]);
  if (quiz.onlyByDeadline) values.push(FREQUENCY_SCALE[quiz.onlyByDeadline]);

  if (values.length === 0) return NEUTRAL_DEFAULT;

  const sum = values.reduce((acc, v) => acc + v, 0);
  return Math.round(sum / values.length);
}

/** Advisory suggestion only — the user can always pick a stricter or looser tier themselves. */
export function recommendedHabitTier(score: number): HabitTier {
  if (score >= 80) return 'best_self';
  if (score >= 50) return 'normie';
  return 'light';
}
