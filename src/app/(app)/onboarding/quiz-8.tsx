import { router } from 'expo-router';

import { QuizStep } from '@/components/quiz-step';
import { useOnboarding } from '@/lib/onboarding-context';

const OPTIONS = [
  { value: 'Друг', label: 'Друг' },
  { value: 'Telegram', label: 'Telegram' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'TikTok', label: 'TikTok' },
  { value: 'Google', label: 'Google' },
  { value: 'Другое', label: 'Другое' },
] as const;

export default function Quiz8Screen() {
  const { draft, updateQuiz } = useOnboarding();

  return (
    <QuizStep
      step={8}
      total={8}
      title="Откуда узнал(-а) о Силе Слова?"
      options={OPTIONS}
      selected={draft.quiz.source}
      onSelect={(value) => updateQuiz({ source: value })}
      onNext={() => router.push('/onboarding/quiz-loading')}
      onSkip={() => router.push('/onboarding/quiz-loading')}
    />
  );
}
