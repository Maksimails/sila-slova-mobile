import { router } from 'expo-router';

import { QuizStep } from '@/components/quiz-step';
import { useOnboarding } from '@/lib/onboarding-context';

const OPTIONS = [
  { value: 'trivial', label: 'Забуду через час' },
  { value: 'unpleasant', label: 'Кольнёт, но переживу' },
  { value: 'selfRespect', label: 'Перестаю себе доверять' },
  { value: 'worst', label: 'Это предательство себя' },
] as const;

export default function Quiz1Screen() {
  const { draft, updateQuiz } = useOnboarding();

  return (
    <QuizStep
      step={1}
      total={8}
      title="Что для тебя значит нарушить своё слово?"
      options={OPTIONS}
      selected={draft.quiz.wordMeaning}
      onSelect={(value) => updateQuiz({ wordMeaning: value })}
      onNext={() => router.push('/onboarding/quiz-2')}
      onSkip={() => router.push('/onboarding/quiz-2')}
    />
  );
}
