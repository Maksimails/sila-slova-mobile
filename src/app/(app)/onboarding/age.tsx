import { router } from 'expo-router';
import { useState } from 'react';

import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { WizardScreen } from '@/components/wizard-screen';
import { useOnboarding } from '@/lib/onboarding-context';

export default function AgeScreen() {
  const { update } = useOnboarding();
  const [ageText, setAgeText] = useState('');
  const [blocked, setBlocked] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleNext = () => {
    const age = parseInt(ageText, 10);
    if (!age || age < 5 || age > 100) {
      setError('Введи возраст от 5 до 100');
      return;
    }
    if (age < 18) {
      setBlocked(true);
      return;
    }
    setError(undefined);
    update({ birthDate: String(age) });
    router.push('/onboarding/gender');
  };

  if (blocked) {
    return (
      <WizardScreen title="Пока рано" onNext={() => {}} nextDisabled>
        <ThemedText type="body" color="textSecondary">
          Сила Слова работает с реальными ставками и деньгами, поэтому доступна только с 18 лет.
          Возвращайся, когда исполнится.
        </ThemedText>
      </WizardScreen>
    );
  }

  return (
    <WizardScreen title="Сколько тебе лет?" onNext={handleNext} nextDisabled={!ageText}>
      <TextField
        label="Возраст"
        placeholder="25"
        keyboardType="number-pad"
        value={ageText}
        onChangeText={setAgeText}
        error={error}
      />
    </WizardScreen>
  );
}
