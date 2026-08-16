import { router } from 'expo-router';

import { TextField } from '@/components/text-field';
import { WizardScreen } from '@/components/wizard-screen';
import { useOnboarding } from '@/lib/onboarding-context';

export default function NameScreen() {
  const { draft, update } = useOnboarding();

  const handleNext = () => {
    if (!draft.name?.trim()) return;
    router.push('/onboarding/age');
  };

  return (
    <WizardScreen title="Как тебя зовут?" onNext={handleNext} nextDisabled={!draft.name?.trim()}>
      <TextField
        label="Имя"
        placeholder="Твоё имя"
        maxLength={40}
        value={draft.name ?? ''}
        onChangeText={(name) => update({ name })}
      />
    </WizardScreen>
  );
}
