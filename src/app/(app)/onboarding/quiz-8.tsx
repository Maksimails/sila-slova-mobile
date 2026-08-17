import { router } from 'expo-router';

import { QuizStep } from '@/components/quiz-step';
import { useOnboarding } from '@/lib/onboarding-context';

const OPTIONS = [
  { value: 'Друг', label: 'Друг', icon: 'people-outline' },
  { value: 'Telegram', label: 'Telegram', icon: 'paper-plane-outline' },
  { value: 'Instagram', label: 'Instagram', icon: 'camera-outline' },
  { value: 'TikTok', label: 'TikTok', icon: 'musical-notes-outline' },
  { value: 'Google', label: 'Google', icon: 'search-outline' },
  { value: 'Другое', label: 'Другое', icon: 'sparkles-outline' },
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
