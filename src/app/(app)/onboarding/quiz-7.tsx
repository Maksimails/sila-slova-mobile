import { router } from 'expo-router';

import { QuizStep } from '@/components/quiz-step';
import { useOnboarding } from '@/lib/onboarding-context';

const OPTIONS = [
  { value: 'human', label: 'Человек — живой свидетель', icon: 'person-outline' },
  { value: 'ai', label: 'ИИ — быстро и без эмоций', icon: 'hardware-chip-outline' },
  { value: 'either', label: 'Всё равно, главное честно', icon: 'thumbs-up-outline' },
] as const;

export default function Quiz7Screen() {
  const { draft, updateQuiz } = useOnboarding();

  return (
    <QuizStep
      step={7}
      total={8}
      title="Кому ты доверишь решать, сдержал(-а) ли ты слово?"
      options={OPTIONS}
      selected={draft.quiz.reviewer}
      onSelect={(value) => updateQuiz({ reviewer: value })}
      onNext={() => router.push('/onboarding/quiz-8')}
      onSkip={() => router.push('/onboarding/quiz-8')}
    />
  );
}
