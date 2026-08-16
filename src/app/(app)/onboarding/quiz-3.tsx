import { router } from 'expo-router';

import { QuizStep } from '@/components/quiz-step';
import { useOnboarding } from '@/lib/onboarding-context';

const OPTIONS = [
  { value: 'always', label: 'Расслабляюсь и забиваю' },
  { value: 'often', label: 'Держусь первое время, потом сдуваюсь' },
  { value: 'sometimes', label: 'Справляюсь, но через силу' },
  { value: 'never', label: 'Не важно, видит кто-то или нет' },
] as const;

export default function Quiz3Screen() {
  const { draft, updateQuiz } = useOnboarding();

  return (
    <QuizStep
      step={3}
      total={8}
      title="Что происходит, когда никто не видит?"
      options={OPTIONS}
      selected={draft.quiz.loseFocusAlone}
      onSelect={(value) => updateQuiz({ loseFocusAlone: value })}
      onNext={() => router.push('/onboarding/quiz-4')}
      onSkip={() => router.push('/onboarding/quiz-4')}
    />
  );
}
