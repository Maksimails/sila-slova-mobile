import { router } from 'expo-router';

import { GradientTile } from '@/components/gradient-tile';
import { WizardScreen } from '@/components/wizard-screen';
import { type BetType, useBetWizard } from '@/lib/bet-wizard-context';

export default function TypeScreen() {
  const { draft, update } = useBetWizard();
  const isChallenge = draft.kind === 'challenge';

  const choose = (type: BetType) => update({ type });

  const handleNext = () => {
    if (!draft.type) return;
    router.push('/new-bet/goal');
  };

  return (
    <WizardScreen title="Какой тип ставки?" onNext={handleNext} nextDisabled={!draft.type} variant="dark">
      <GradientTile
        gradient="gold"
        icon="flag-outline"
        label="Результат"
        description="Дойти до конкретной цели к дедлайну."
        selected={draft.type === 'result'}
        onPress={() => choose('result')}
      />
      <GradientTile
        gradient="teal"
        icon="repeat-outline"
        label="Привычка"
        description="Повторять каждый день минимум N дней."
        selected={draft.type === 'habit'}
        onPress={() => choose('habit')}
      />
      {!isChallenge && (
        <GradientTile
          gradient="red"
          icon="ban-outline"
          label="Аскеза"
          description="Отказ от чего-то — под контролем свидетеля."
          selected={draft.type === 'quit'}
          onPress={() => choose('quit')}
        />
      )}
    </WizardScreen>
  );
}
