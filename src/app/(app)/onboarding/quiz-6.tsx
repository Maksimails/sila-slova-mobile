import { router } from 'expo-router';

import { QuizStep } from '@/components/quiz-step';
import { useOnboarding } from '@/lib/onboarding-context';

const OPTIONS = [
  { value: 'always', label: 'Только когда уже поздно откладывать' },
  { value: 'often', label: 'Обычно в последний момент' },
  { value: 'sometimes', label: 'Иногда заранее, иногда впритык' },
  { value: 'never', label: 'Начинаю сразу, без дедлайна' },
] as const;

export default function Quiz6Screen() {
  const { draft, updateQuiz } = useOnboarding();

  return (
    <QuizStep
      step={6}
      total={8}
      title="Когда ты на самом деле начинаешь действовать?"
      options={OPTIONS}
      selected={draft.quiz.onlyByDeadline}
      onSelect={(value) => updateQuiz({ onlyByDeadline: value })}
      onNext={() => router.push('/onboarding/quiz-7')}
      onSkip={() => router.push('/onboarding/quiz-7')}
    />
  );
}
