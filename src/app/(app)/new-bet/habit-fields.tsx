import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Chip } from '@/components/chip';
import { GradientTile } from '@/components/gradient-tile';
import { ThemedText } from '@/components/themed-text';
import { WizardScreen } from '@/components/wizard-screen';
import { Spacing, type GradientName } from '@/constants/theme';
import { type HabitTier, type SkipMode, useBetWizard } from '@/lib/bet-wizard-context';

const DURATION_OPTIONS = [21, 40, 100, 365];

const TIERS: { value: HabitTier; title: string; description: string; gradient: GradientName; icon: 'leaf-outline' | 'flash-outline' | 'flame-outline' }[] = [
  { value: 'light', title: 'Лайт', description: 'Можно пропускать до 2 дней в неделю.', gradient: 'teal', icon: 'leaf-outline' },
  { value: 'normie', title: 'Норм', description: '1 пропуск в месяц.', gradient: 'gold', icon: 'flash-outline' },
  { value: 'best_self', title: 'Лучшая Версия Себя', description: 'Ноль пропусков — любой промах проваливает ставку.', gradient: 'red', icon: 'flame-outline' },
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
    <WizardScreen title="Срок и уровень" onNext={handleNext} nextDisabled={!canProceed} variant="dark">
      <View style={styles.section}>
        <ThemedText type="label" color="textOnDark">
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
        <ThemedText type="label" color="textOnDark">
          Уровень
        </ThemedText>
        {TIERS.map((tier) => (
          <GradientTile
            key={tier.value}
            gradient={tier.gradient}
            icon={tier.icon}
            label={tier.title}
            description={tier.description}
            selected={draft.habitTier === tier.value}
            onPress={() => chooseTier(tier.value)}
          />
        ))}
      </View>

      {needsSkipMode && (
        <View style={styles.section}>
          <ThemedText type="label" color="textOnDark">
            Режим пропусков
          </ThemedText>
          <GradientTile
            gradient="purple"
            icon="calendar-outline"
            label="Заранее"
            description="Выбери день недели, который всегда можно пропустить."
            selected={draft.skipMode === 'predeclared'}
            onPress={() => chooseSkipMode('predeclared')}
          />
          <GradientTile
            gradient="blue"
            icon="shuffle-outline"
            label="По ситуации"
            description="Пропуск засчитывается автоматически, когда случится."
            selected={draft.skipMode === 'flexible'}
            onPress={() => chooseSkipMode('flexible')}
          />
        </View>
      )}

      {needsWeekdayPicker && (
        <View style={styles.section}>
          <ThemedText type="label" color="textOnDark">
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
