import { router } from 'expo-router';

import { QuizStep } from '@/components/quiz-step';
import { useOnboarding } from '@/lib/onboarding-context';

const OPTIONS = [
  { value: 'always', label: 'Начинаю с огнём, гасну через неделю' },
  { value: 'often', label: 'Дохожу до половины и сливаюсь' },
  { value: 'sometimes', label: 'Иногда дожимаю, иногда нет' },
  { value: 'never', label: 'Обычно довожу до конца' },
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
