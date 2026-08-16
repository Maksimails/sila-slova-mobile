import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { type Bet } from '@/types/bet';

const TYPE_LABELS = { result: 'Результат', habit: 'Привычка', quit: 'Аскеза' } as const;

type BetPostCardProps = {
  bet: Bet;
  coverUrl?: string;
  reportsCount: number;
  onPress: () => void;
  onComment: () => void;
};

export function BetPostCard({ bet, coverUrl, reportsCount, onPress, onComment }: BetPostCardProps) {
  const [supported, setSupported] = useState(false);
  const supportCount = (bet.supportCount ?? 0) + (supported ? 1 : 0);

  return (
    <View style={styles.card}>
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [styles.pressableContent, pressed && styles.pressed]}
      >
        <View style={styles.header}>
          <ThemedText type="label" color="textSecondary">
            {TYPE_LABELS[bet.type]}
          </ThemedText>
          <ThemedText type="label" color="textSecondary">
            день {bet.dayN} · {reportsCount} отчётов
          </ThemedText>
        </View>

        {coverUrl ? <Image source={{ uri: coverUrl }} style={styles.cover} contentFit="cover" /> : null}

        <ThemedText type="subtitle" style={styles.goal}>
          {bet.goal}
        </ThemedText>
      </Pressable>

      <View style={styles.footer}>
        <Pressable accessibilityRole="button" hitSlop={8} onPress={() => setSupported((s) => !s)} style={styles.statButton}>
          <ThemedText type="small" color={supported ? 'crimson' : 'textSecondary'}>
            💪 {supportCount}
          </ThemedText>
        </Pressable>
        <Pressable accessibilityRole="button" hitSlop={8} onPress={onComment} style={styles.statButton}>
          <ThemedText type="small" color="textSecondary">
            💬 {bet.commentsCount ?? 0}
          </ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.large,
    borderWidth: 1,
    borderColor: Colors.line,
    backgroundColor: Colors.bgElement,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  pressableContent: {
    gap: Spacing.two,
  },
  pressed: {
    opacity: 0.9,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cover: {
    width: '100%',
    aspectRatio: 4 / 5,
    borderRadius: Radius.medium,
    backgroundColor: Colors.bgSelected,
  },
  goal: {
    marginTop: 2,
  },
  footer: {
    flexDirection: 'row',
    gap: Spacing.four,
  },
  statButton: {
    paddingVertical: Spacing.half,
  },
});
