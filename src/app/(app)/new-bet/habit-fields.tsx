import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Chip } from '@/components/chip';
import { OptionCard } from '@/components/option-card';
import { ThemedText } from '@/components/themed-text';
import { WizardScreen } from '@/components/wizard-screen';
import { Spacing } from '@/constants/theme';
import { type HabitTier, type SkipMode, useBetWizard } from '@/lib/bet-wizard-context';

const DURATION_OPTIONS = [21, 40, 100, 365];

const TIERS: { value: HabitTier; title: string; description: string }[] = [
  { value: 'light', title: 'Лайт', description: 'Можно пропускать до 2 дней в неделю.' },
  { value: 'normie', title: 'Норм', description: '1 пропуск в месяц.' },
  { value: 'best_self', title: 'Лучшая Версия Себя', description: 'Ноль пропусков — любой промах проваливает ставку.' },
];

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export default function HabitFieldsScreen() {
  const { draft, update } = useBetWizard();

  const needsSkipMode = draft.habitTier === 'light' || draft.habitTier === 'normie';
  const needsWeekdayPicker = needsSkipMode && draft.skipMode === 'predeclared';

  const canProceed =
    !!draft.durationDays &&
    !!draft.habitTier &&
    (!needsSkipMode || !!draft.skipMode) &&
    (!needsWeekdayPicker || (draft.allowedSkipWeekdays?.length ?? 0) > 0);

  const chooseTier = (habitTier: HabitTier) => {
    if (habitTier === 'best_self') {
      update({ habitTier, skipMode: undefined, allowedSkipWeekdays: undefined });
    } else {
      update({ habitTier });
    }
  };

  const chooseSkipMode = (skipMode: SkipMode) => {
    update({ skipMode, allowedSkipWeekdays: skipMode === 'flexible' ? undefined : draft.allowedSkipWeekdays });
  };

  const toggleWeekday = (day: number) => {
    const current = draft.allowedSkipWeekdays ?? [];
    const next = current.includes(day) ? current.filter((d) => d !== day) : [...current, day];
    update({ allowedSkipWeekdays: next });
  };

  const handleNext = () => {
    if (!canProceed) return;
    router.push('/new-bet/video');
  };

  return (
    <WizardScreen title="Срок и уровень" onNext={handleNext} nextDisabled={!canProceed}>
      <View style={styles.section}>
        <ThemedText type="label" color="textSecondary">
          Срок (минимум 21 день)
        </ThemedText>
        <View style={styles.chipRow}>
          {DURATION_OPTIONS.map((days) => (
            <Chip
              key={days}
              label={`${days} дн.`}
              selected={draft.durationDays === days}
              onPress={() => update({ durationDays: days })}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText type="label" color="textSecondary">
          Уровень
        </ThemedText>
        {TIERS.map((tier) => (
          <OptionCard
            key={tier.value}
            title={tier.title}
            description={tier.description}
            selected={draft.habitTier === tier.value}
            onPress={() => chooseTier(tier.value)}
          />
        ))}
      </View>

      {needsSkipMode && (
        <View style={styles.section}>
          <ThemedText type="label" color="textSecondary">
            Режим пропусков
          </ThemedText>
          <OptionCard
            title="Заранее"
            description="Выбери день недели, который всегда можно пропустить."
            selected={draft.skipMode === 'predeclared'}
            onPress={() => chooseSkipMode('predeclared')}
          />
          <OptionCard
            title="По ситуации"
            description="Пропуск засчитывается автоматически, когда случится."
            selected={draft.skipMode === 'flexible'}
            onPress={() => chooseSkipMode('flexible')}
          />
        </View>
      )}

      {needsWeekdayPicker && (
        <View style={styles.section}>
          <ThemedText type="label" color="textSecondary">
            Разрешённые дни пропуска
          </ThemedText>
          <View style={styles.chipRow}>
            {WEEKDAYS.map((label, index) => (
              <Chip
                key={label}
                label={label}
                selected={(draft.allowedSkipWeekdays ?? []).includes(index)}
                onPress={() => toggleWeekday(index)}
              />
            ))}
          </View>
        </View>
      )}
    </WizardScreen>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: Spacing.two,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
});
