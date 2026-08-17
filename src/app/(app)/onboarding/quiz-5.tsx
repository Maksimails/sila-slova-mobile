import { router } from 'expo-router';

import { QuizStep } from '@/components/quiz-step';
import { useOnboarding } from '@/lib/onboarding-context';

const OPTIONS = [
  { value: 'always', label: 'Да, это единственное, что реально работает', icon: 'people-outline' },
  { value: 'often', label: 'Обычно да, стыдно облажаться на глазах', icon: 'alert-circle-outline' },
  { value: 'sometimes', label: 'Иногда помогает, иногда давит', icon: 'swap-horizontal-outline' },
  { value: 'never', label: 'Нет, справляюсь сам(-а)', icon: 'walk-outline' },
] as const;

export default function Quiz5Screen() {
  const { draft, updateQuiz } = useOnboarding();

  return (
    <QuizStep
      step={5}
      total={8}
      title="Если бы друг знал о твоей цели — было бы легче?"
      options={OPTIONS}
      selected={draft.quiz.helpsIfKnown}
      onSelect={(value) => updateQuiz({ helpsIfKnown: value })}
      onNext={() => router.push('/onboarding/quiz-6')}
      onSkip={() => router.push('/onboarding/quiz-6')}
    />
  );
}
