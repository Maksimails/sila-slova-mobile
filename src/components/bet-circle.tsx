import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors, Spacing, type ThemeColor } from '@/constants/theme';
import { type Bet, type BetStatus } from '@/types/bet';

const RING_COLOR: Record<BetStatus, ThemeColor> = {
  pending_payment: 'textSecondary',
  active: 'teal',
  challenge_pending: 'gold',
  done: 'gold',
  failed: 'crimson',
  review: 'textSecondary',
  cancelled: 'textSecondary',
};

const SIZE = 84;

type BetCircleProps = {
  bet: Bet;
  coverUrl?: string;
  onPress: () => void;
};

export function BetCircle({ bet, coverUrl, onPress }: BetCircleProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.wrap}>
      <View style={[styles.ring, { borderColor: Colors[RING_COLOR[bet.status]] }]}>
        {coverUrl ? (
          <Image source={{ uri: coverUrl }} style={styles.photo} contentFit="cover" />
        ) : (
          <View style={[styles.photo, styles.noCover]}>
            <ThemedText type="label" color="gold">
              {bet.dayN}
            </ThemedText>
          </View>
        )}
      </View>
      <ThemedText type="small" numberOfLines={1} style={styles.label}>
        {bet.goal}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: SIZE + 8,
    alignItems: 'center',
    gap: Spacing.one,
  },
  ring: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: 3,
    padding: 3,
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: SIZE / 2,
  },
  noCover: {
    backgroundColor: Colors.bgElement,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
  },
});
