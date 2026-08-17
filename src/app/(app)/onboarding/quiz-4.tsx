import { router } from 'expo-router';

import { QuizStep } from '@/components/quiz-step';
import { useOnboarding } from '@/lib/onboarding-context';

const OPTIONS = [
  { value: 'always', label: 'Только если кто-то в курсе и спросит', icon: 'eye-outline' },
  { value: 'often', label: 'Дедлайн или чужие ожидания', icon: 'alarm-outline' },
  { value: 'sometimes', label: 'Иногда сам(-а), иногда нужен пинок', icon: 'hand-left-outline' },
  { value: 'never', label: 'Своей головы хватает', icon: 'bulb-outline' },
] as const;

export default function Quiz4Screen() {
  const { draft, updateQuiz } = useOnboarding();

  return (
    <QuizStep
      step={4}
      total={8}
      title="Что реально заставляет тебя действовать?"
      options={OPTIONS}
      selected={draft.quiz.needsPressure}
      onSelect={(value) => updateQuiz({ needsPressure: value })}
      onNext={() => router.push('/onboarding/quiz-5')}
      onSkip={() => router.push('/onboarding/quiz-5')}
    />
  );
}
