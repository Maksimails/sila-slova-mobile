import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors, Radius, Spacing } from '@/constants/theme';

type StatCardProps = {
  label: string;
  value: string;
  progress?: number; // 0..1
};

export function StatCard({ label, value, progress }: StatCardProps) {
  return (
    <View style={styles.card}>
      <ThemedText type="small" color="textSecondary">
        {label}
      </ThemedText>
      <ThemedText type="display" style={styles.value}>
        {value}
      </ThemedText>
      {progress !== undefined ? (
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${Math.round(Math.min(1, Math.max(0, progress)) * 100)}%` }]} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: Radius.large,
    borderWidth: 1,
    borderColor: Colors.line,
    backgroundColor: Colors.bgElement,
    padding: Spacing.three,
    gap: Spacing.one,
    minWidth: 140,
  },
  value: {
    fontSize: 32,
    lineHeight: 36,
  },
  track: {
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.line,
    overflow: 'hidden',
    marginTop: Spacing.one,
  },
  fill: {
    height: '100%',
    backgroundColor: Colors.gold,
  },
});
