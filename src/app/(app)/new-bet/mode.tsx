import { router } from 'expo-router';

import { OptionCard } from '@/components/option-card';
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
    <WizardScreen title="Публично или лично?" onNext={handleNext} nextDisabled={!draft.mode}>
      <OptionCard
        title="Публично"
        description="Видео-клятва и отчёты идут в общую ленту."
        selected={draft.mode === 'public'}
        onPress={() => choose('public')}
      />
      <OptionCard
        title="Лично"
        description="Видно только тебе."
        selected={draft.mode === 'private'}
        onPress={() => choose('private')}
      />
    </WizardScreen>
  );
}
