import { router, type Href } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Chip } from '@/components/chip';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { WizardScreen } from '@/components/wizard-screen';
import { Spacing } from '@/constants/theme';
import { type BetType, useBetWizard } from '@/lib/bet-wizard-context';

const EXAMPLES: Record<BetType, string[][]> = {
  result: [
    ['Скинуть 10 кг к 1 октября', 'Выйти на доход 300 000 ₽ к декабрю', 'Пробежать полумарафон за 2 часа'],
    ['Накопить 500 000 ₽', 'Сдать экзамен на 90+', 'Найти работу за 60 дней'],
  ],
  habit: [
    ['Спортзал 4 раза в неделю', 'Читать 30 минут каждый день', 'Вставать в 6 утра 40 дней'],
    ['Медитация каждый день', 'Без соцсетей до обеда', 'Дневник благодарности каждый вечер'],
  ],
  quit: [
    ['Бросить курить', 'Не пить алкоголь 90 дней', 'Отказаться от сахара'],
    ['Без игр 60 дней', 'Бросить фастфуд', 'Не материться 30 дней'],
  ],
};

const NEXT_ROUTE: Record<BetType, Href> = {
  result: '/new-bet/result-fields',
  habit: '/new-bet/habit-fields',
  quit: '/new-bet/quit-fields',
};

export default function GoalScreen() {
  const { draft, update } = useBetWizard();
  const type = draft.type ?? 'result';
  const [exampleSet, setExampleSet] = useState(0);

  const showDigitHint = type !== 'quit' && !!draft.goal && !/\d/.test(draft.goal);

  const examples = useMemo(() => EXAMPLES[type][exampleSet % EXAMPLES[type].length], [type, exampleSet]);

  const handleNext = () => {
    if (!draft.goal?.trim()) return;
    router.push(draft.kind === 'challenge' ? '/new-bet/opponent' : NEXT_ROUTE[type]);
  };

  return (
    <WizardScreen title="В чём цель?" onNext={handleNext} nextDisabled={!draft.goal?.trim()}>
      <TextField
        label="Цель"
        placeholder="Опиши, что именно ты обещаешь"
        multiline
        value={draft.goal ?? ''}
        onChangeText={(goal) => update({ goal })}
      />
      {showDigitHint ? (
        <ThemedText type="small" color="textSecondary">
          Число или дата помогут точно понять, что цель достигнута — но это необязательно.
        </ThemedText>
      ) : null}

      <View style={styles.chipRow}>
        {examples.map((example) => (
          <Chip key={example} label={example} onPress={() => update({ goal: example })} />
        ))}
      </View>
      <Chip label="Ещё примеры" onPress={() => setExampleSet((n) => n + 1)} />
    </WizardScreen>
  );
}

const styles = StyleSheet.create({
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
});
