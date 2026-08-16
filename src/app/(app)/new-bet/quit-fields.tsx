import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Chip } from '@/components/chip';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { WizardScreen } from '@/components/wizard-screen';
import { Spacing } from '@/constants/theme';
import { useBetWizard } from '@/lib/bet-wizard-context';

const DURATION_OPTIONS = [30, 90, 180, 365];
const CHECKIN_TIMES = ['09:00', '12:00', '19:00', '22:00'];

export default function QuitFieldsScreen() {
  const { draft, update } = useBetWizard();

  const canProceed = !!draft.durationDays && !!draft.witnessTg?.trim() && !!draft.witnessCheckinTime;

  const handleNext = () => {
    if (!canProceed) return;
    router.push('/new-bet/video');
  };

  return (
    <WizardScreen title="Срок и свидетель" onNext={handleNext} nextDisabled={!canProceed}>
      <View style={styles.section}>
        <ThemedText type="label" color="textSecondary">
          Срок (минимум 30 дней)
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

      <TextField
        label="Свидетель — имя или @username"
        placeholder="Кто будет проверять, что ты держишься"
        value={draft.witnessTg ?? ''}
        onChangeText={(witnessTg) => update({ witnessTg })}
      />
      <TextField
        label="Телефон свидетеля (необязательно)"
        placeholder="+7 999 123-45-67"
        keyboardType="phone-pad"
        value={draft.witnessPhone ?? ''}
        onChangeText={(witnessPhone) => update({ witnessPhone })}
      />

      <View style={styles.section}>
        <ThemedText type="label" color="textSecondary">
          Время еженедельного чек-ина
        </ThemedText>
        <View style={styles.chipRow}>
          {CHECKIN_TIMES.map((time) => (
            <Chip
              key={time}
              label={time}
              selected={draft.witnessCheckinTime === time}
              onPress={() => update({ witnessCheckinTime: time })}
            />
          ))}
        </View>
      </View>
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
