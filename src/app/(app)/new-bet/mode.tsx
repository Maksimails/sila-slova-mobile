import { router } from 'expo-router';

import { GradientTile } from '@/components/gradient-tile';
import { WizardScreen } from '@/components/wizard-screen';
import { type BetMode, useBetWizard } from '@/lib/bet-wizard-context';

export default function ModeScreen() {
  const { draft, update } = useBetWizard();

  const choose = (mode: BetMode) => update({ mode });

  const handleNext = () => {
    if (!draft.mode) return;
    router.push('/new-bet/type');
  };

  return (
    <WizardScreen title="Публично или лично?" onNext={handleNext} nextDisabled={!draft.mode} variant="dark">
      <GradientTile
        gradient="orange"
        icon="globe-outline"
        label="Публично"
        description="Видео-клятва и отчёты идут в общую ленту."
        selected={draft.mode === 'public'}
        onPress={() => choose('public')}
      />
      <GradientTile
        gradient="blue"
        icon="lock-closed-outline"
        label="Лично"
        description="Видно только тебе."
        selected={draft.mode === 'private'}
        onPress={() => choose('private')}
      />
    </WizardScreen>
  );
}
