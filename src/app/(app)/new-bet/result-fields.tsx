import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Chip } from '@/components/chip';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { WizardScreen } from '@/components/wizard-screen';
import { Spacing } from '@/constants/theme';
import { useBetWizard } from '@/lib/bet-wizard-context';

const DEADLINE_OPTIONS = [
  { label: 'Неделя', days: 7 },
  { label: '2 недели', days: 14 },
  { label: 'Месяц', days: 30 },
];

export default function ResultFieldsScreen() {
  const { draft, update } = useBetWizard();

  const canProceed = !!draft.motivation?.trim() && !!draft.durationDays;

  const handleNext = () => {
    if (!canProceed) return;
    router.push('/new-bet/video');
  };

  return (
    <WizardScreen title="Точка А и дедлайн" onNext={handleNext} nextDisabled={!canProceed}>
      <TextField
        label="Точка А (где ты сейчас)"
        placeholder="Например: 93 кг"
        value={draft.pointA ?? ''}
        onChangeText={(pointA) => update({ pointA })}
      />
      <TextField
        label="Ради чего (обязательно)"
        placeholder="Что ты вспомнишь, когда станет тяжело"
        multiline
        value={draft.motivation ?? ''}
        onChangeText={(motivation) => update({ motivation })}
      />
      <View style={styles.deadline}>
        <ThemedText type="label" color="textSecondary">
          Срок
        </ThemedText>
        <View style={styles.chipRow}>
          {DEADLINE_OPTIONS.map((option) => (
            <Chip
              key={option.days}
              label={option.label}
              selected={draft.durationDays === option.days}
              onPress={() => update({ durationDays: option.days })}
            />
          ))}
        </View>
      </View>
    </WizardScreen>
  );
}

const styles = StyleSheet.create({
  deadline: {
    gap: Spacing.two,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
});
