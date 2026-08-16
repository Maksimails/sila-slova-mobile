import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors, Radius } from '@/constants/theme';
import { type Bet } from '@/types/bet';

type BetGridTileProps = {
  bet: Bet;
  coverUrl?: string;
  size: number;
  onPress: () => void;
};

export function BetGridTile({ bet, coverUrl, size, onPress }: BetGridTileProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.tile, { width: size, height: size }, pressed && styles.pressed]}
    >
      {coverUrl ? (
        <Image source={{ uri: coverUrl }} style={StyleSheet.absoluteFill} contentFit="cover" />
      ) : (
        <View style={[StyleSheet.absoluteFill, styles.noCover]}>
          <ThemedText type="small" color="textSecondary" numberOfLines={3} style={styles.goalText}>
            {bet.goal}
          </ThemedText>
        </View>
      )}
      <View style={styles.dayBadge}>
        <ThemedText type="small" color="bg">
          {bet.dayN} дн
        </ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    borderRadius: Radius.small,
    overflow: 'hidden',
    backgroundColor: Colors.bgElement,
  },
  pressed: {
    opacity: 0.85,
  },
  noCover: {
    padding: 8,
    justifyContent: 'flex-end',
  },
  goalText: {
    lineHeight: 15,
  },
  dayBadge: {
    position: 'absolute',
    left: 6,
    bottom: 6,
    backgroundColor: 'rgba(17,17,19,0.55)',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
});
