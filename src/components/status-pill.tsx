import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors, Radius, Spacing, type ThemeColor } from '@/constants/theme';
import { type BetStatus } from '@/types/bet';

const STATUS_META: Record<BetStatus, { label: string; color: ThemeColor }> = {
  pending_payment: { label: 'Ожидает оплаты', color: 'textSecondary' },
  active: { label: 'Активна', color: 'teal' },
  challenge_pending: { label: 'Ждём соперника', color: 'gold' },
  done: { label: 'Слово сдержано', color: 'gold' },
  failed: { label: 'Слово не сдержано', color: 'crimson' },
  review: { label: 'На проверке', color: 'textSecondary' },
  cancelled: { label: 'Отменена', color: 'textSecondary' },
};

export function StatusPill({ status }: { status: BetStatus }) {
  const meta = STATUS_META[status];
  return (
    <View style={styles.pill}>
      <View style={[styles.dot, { backgroundColor: Colors[meta.color] }]} />
      <ThemedText type="small" color={meta.color}>
        {meta.label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: Radius.pill,
    backgroundColor: Colors.bgElement,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
