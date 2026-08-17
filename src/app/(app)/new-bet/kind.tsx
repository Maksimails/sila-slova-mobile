import { router } from 'expo-router';

import { GradientTile } from '@/components/gradient-tile';
import { WizardScreen } from '@/components/wizard-screen';
import { type BetKind, useBetWizard } from '@/lib/bet-wizard-context';

export default function KindScreen() {
  const { draft, update } = useBetWizard();

  const choose = (kind: BetKind) => update({ kind });

  const handleNext = () => {
    if (!draft.kind) return;
    // Challenges are always private and skip straight to type (§2.1).
    router.push(draft.kind === 'solo' ? '/new-bet/mode' : '/new-bet/type');
  };

  return (
    <WizardScreen title="Соло или вызов?" onNext={handleNext} nextDisabled={!draft.kind} variant="dark">
      <GradientTile
        gradient="teal"
        icon="person-outline"
        label="Соло"
        description="Только ты и твоё слово."
        selected={draft.kind === 'solo'}
        onPress={() => choose('solo')}
      />
      <GradientTile
        gradient="purple"
        icon="people-outline"
        label="Вызов"
        description="Позови конкретного человека — оба дают слово, оба отчитываются."
        selected={draft.kind === 'challenge'}
        onPress={() => choose('challenge')}
      />
    </WizardScreen>
  );
}
