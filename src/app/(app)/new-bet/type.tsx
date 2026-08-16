import { router } from 'expo-router';

import { OptionCard } from '@/components/option-card';
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
    <WizardScreen title="Какой тип ставки?" onNext={handleNext} nextDisabled={!draft.type}>
      <OptionCard
        title="Результат"
        description="Дойти до конкретной цели к дедлайну."
        selected={draft.type === 'result'}
        onPress={() => choose('result')}
      />
      <OptionCard
        title="Привычка"
        description="Повторять каждый день минимум N дней."
        selected={draft.type === 'habit'}
        onPress={() => choose('habit')}
      />
      {!isChallenge && (
        <OptionCard
          title="Аскеза"
          description="Отказ от чего-то — под контролем свидетеля."
          selected={draft.type === 'quit'}
          onPress={() => choose('quit')}
        />
      )}
    </WizardScreen>
  );
}
