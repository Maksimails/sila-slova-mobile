import { router } from 'expo-router';

import { GradientTile } from '@/components/gradient-tile';
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
      <GradientTile
        gradient="blue"
        icon="man-outline"
        label="Я мужчина"
        selected={draft.gender === 'm'}
        onPress={() => choose('m')}
      />
      <GradientTile
        gradient="pink"
        icon="woman-outline"
        label="Я женщина"
        selected={draft.gender === 'f'}
        onPress={() => choose('f')}
      />
    </WizardScreen>
  );
}
