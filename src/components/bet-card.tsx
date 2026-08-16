import { Pressable, StyleSheet, View } from 'react-native';

import { StatusPill } from '@/components/status-pill';
import { ThemedText } from '@/components/themed-text';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { type Bet } from '@/types/bet';

const TYPE_LABELS = { result: 'Результат', habit: 'Привычка', quit: 'Аскеза' } as const;

type BetCardProps = {
  bet: Bet;
  onPress: () => void;
};

export function BetCard({ bet, onPress }: BetCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.header}>
        <ThemedText type="label" color="textSecondary">
          {TYPE_LABELS[bet.type]} · день {bet.dayN} из {bet.durationDays}
        </ThemedText>
        <StatusPill status={bet.status} />
      </View>
      <ThemedText type="subtitle">{bet.goal}</ThemedText>
      <View style={styles.footer}>
        {bet.status === 'active' ? (
          <View style={[styles.reportBadge, bet.reportedToday && styles.reportBadgeDone]}>
            <ThemedText type="small" color={bet.reportedToday ? 'teal' : 'textSecondary'}>
              {bet.reportedToday ? '✓ Сегодня отчитался(-ась)' : 'Ждём отчёт сегодня'}
            </ThemedText>
          </View>
        ) : null}
        {bet.stake > 0 ? (
          <ThemedText type="small" color="gold">
            {bet.stake} {bet.currency === 'RUB' ? '₽' : '⭐'}
          </ThemedText>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.large,
    borderWidth: 1,
    borderColor: Colors.line,
    backgroundColor: Colors.bgElement,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  pressed: {
    opacity: 0.85,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.one,
  },
  reportBadge: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: Radius.pill,
    backgroundColor: Colors.bg,
  },
  reportBadgeDone: {
    backgroundColor: 'rgba(47,181,135,0.12)',
  },
});
