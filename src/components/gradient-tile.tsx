import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Gradients, Radius, Spacing, type GradientName } from '@/constants/theme';

type GradientTileProps = {
  gradient: GradientName;
  label: string;
  description?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  selected?: boolean;
  onPress: () => void;
  number?: number;
};

// Tilted, raised-on-the-right card — the label and icon are children of the
// rotated container so they angle with it for free, no separate transform.
const TILT = '-5deg';

export function GradientTile({ gradient, label, description, icon, selected, onPress, number }: GradientTileProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: !!selected }}
      onPress={onPress}
      style={({ pressed }) => [styles.wrap, pressed && styles.pressed]}
    >
      <LinearGradient
        colors={Gradients[gradient]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.tile, selected && styles.tileSelected, description && styles.tileWithDescription]}
      >
        {number !== undefined ? (
          <View style={styles.badge}>
            <ThemedText type="label" color="bg">
              {number}
            </ThemedText>
          </View>
        ) : null}
        <ThemedText
          type="subtitle"
          color="bg"
          style={[styles.label, description && styles.labelWithDescription]}
          numberOfLines={2}
          adjustsFontSizeToFit
        >
          {label}
        </ThemedText>
        {description ? (
          <ThemedText type="small" color="bg" style={styles.description} numberOfLines={3}>
            {description}
          </ThemedText>
        ) : null}
        {icon ? <Ionicons name={icon} size={30} color="#ffffff" style={styles.icon} /> : null}
        {selected ? (
          <View style={styles.check}>
            <Ionicons name="checkmark" size={16} color="#111113" />
          </View>
        ) : null}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: Radius.large,
    transform: [{ rotate: TILT }],
    ...Platform.select({
      web: { boxShadow: '0 10px 22px rgba(0,0,0,0.45)' },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 14,
        elevation: 10,
      },
    }),
  },
  pressed: {
    opacity: 0.88,
  },
  tile: {
    borderRadius: Radius.large,
    padding: Spacing.four,
    minHeight: 88,
    justifyContent: 'center',
  },
  tileWithDescription: {
    justifyContent: 'flex-start',
    paddingTop: Spacing.five,
  },
  tileSelected: {
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  badge: {
    position: 'absolute',
    top: Spacing.three,
    left: Spacing.three,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  label: {
    maxWidth: '76%',
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  labelWithDescription: {
    maxWidth: '100%',
  },
  description: {
    marginTop: Spacing.one,
    maxWidth: '92%',
    opacity: 0.92,
  },
  icon: {
    position: 'absolute',
    right: Spacing.four,
    bottom: Spacing.three,
    opacity: 0.95,
  },
  check: {
    position: 'absolute',
    top: Spacing.three,
    right: Spacing.three,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
});
