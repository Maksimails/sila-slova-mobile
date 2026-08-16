import { router } from 'expo-router';

import { OptionCard } from '@/components/option-card';
import { WizardScreen } from '@/components/wizard-screen';
import { type Gender, useOnboarding } from '@/lib/onboarding-context';

export default function GenderScreen() {
  const { draft, update } = useOnboarding();

  const choose = (gender: Gender) => update({ gender });

  const handleNext = () => {
    if (!draft.gender) return;
    router.push('/onboarding/consents');
  };

  return (
    <WizardScreen
      title="Ты мужчина или женщина?"
      subtitle="Нужно только для правильного склонения — «дал слово» / «дала слово»."
      onNext={handleNext}
      nextDisabled={!draft.gender}
    >
      <OptionCard title="Я мужчина" selected={draft.gender === 'm'} onPress={() => choose('m')} />
      <OptionCard title="Я женщина" selected={draft.gender === 'f'} onPress={() => choose('f')} />
    </WizardScreen>
  );
}
