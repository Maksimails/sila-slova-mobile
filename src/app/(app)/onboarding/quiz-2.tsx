import { router } from 'expo-router';

import { QuizStep } from '@/components/quiz-step';
import { useOnboarding } from '@/lib/onboarding-context';

const OPTIONS = [
  { value: 'always', label: 'Начинаю с огнём, гасну через неделю', icon: 'flame-outline' },
  { value: 'often', label: 'Дохожу до половины и сливаюсь', icon: 'arrow-undo-outline' },
  { value: 'sometimes', label: 'Иногда дожимаю, иногда нет', icon: 'swap-horizontal-outline' },
  { value: 'never', label: 'Обычно довожу до конца', icon: 'flag-outline' },
] as const;

export default function Quiz2Screen() {
  const { draft, updateQuiz } = useOnboarding();

  return (
    <QuizStep
      step={2}
      total={8}
      title="Как обычно заканчиваются твои цели?"
      options={OPTIONS}
      selected={draft.quiz.abandonsGoals}
      onSelect={(value) => updateQuiz({ abandonsGoals: value })}
      onNext={() => router.push('/onboarding/quiz-3')}
      onSkip={() => router.push('/onboarding/quiz-3')}
    />
  );
}
