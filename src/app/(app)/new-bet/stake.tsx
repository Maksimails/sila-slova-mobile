import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Chip } from '@/components/chip';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { WizardScreen } from '@/components/wizard-screen';
import { Spacing } from '@/constants/theme';
import { useBetWizard } from '@/lib/bet-wizard-context';

const STAKE_PRESETS = [0, 100, 1000, 10000];
const MAX_STAKE = 10000;

export default function StakeScreen() {
  const { draft, update } = useBetWizard();

  const handleNext = () => {
    router.push('/new-bet/review');
  };

  return (
    <WizardScreen
      title="Ставка"
      subtitle="Реальные выплаты пока не подключены — это черновик суммы."
      onNext={handleNext}
    >
      <View style={styles.chipRow}>
        {STAKE_PRESETS.map((amount) => (
          <Chip
            key={amount}
            label={amount === 0 ? 'Без ставки' : String(amount)}
            selected={draft.stake === amount}
            onPress={() => update({ stake: amount })}
          />
        ))}
      </View>
      <TextField
        label="Своя сумма (макс. 10 000)"
        placeholder="0"
        keyboardType="number-pad"
        value={draft.stake ? String(draft.stake) : ''}
        onChangeText={(text) => {
          const parsed = Math.min(MAX_STAKE, Math.max(0, parseInt(text, 10) || 0));
          update({ stake: parsed });
        }}
      />
      <ThemedText type="small" color="textSecondary">
        Ставка — это залог за исполнение слова, а не приз за победу.
      </ThemedText>
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
