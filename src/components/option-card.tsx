import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors, Radius, Spacing } from '@/constants/theme';

type OptionCardProps = {
  title: string;
  description?: string;
  selected?: boolean;
  onPress: () => void;
  number?: number;
};

export function OptionCard({ title, description, selected, onPress, number }: OptionCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: !!selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        number !== undefined && styles.cardRow,
        selected && styles.cardSelected,
        pressed && styles.pressed,
      ]}
    >
      {number !== undefined ? (
        <View style={[styles.badge, selected && styles.badgeSelected]}>
          <ThemedText type="label" color={selected ? 'bg' : 'textSecondary'}>
            {number}
          </ThemedText>
        </View>
      ) : null}
      <View style={styles.body}>
        <ThemedText type="subtitle" color={selected ? 'gold' : 'text'}>
          {title}
        </ThemedText>
        {description ? (
          <ThemedText type="small" color="textSecondary" style={styles.description}>
            {description}
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
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  cardSelected: {
    borderColor: Colors.gold,
  },
  pressed: {
    opacity: 0.85,
  },
  body: {
    flex: 1,
  },
  description: {
    marginTop: Spacing.one,
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bg,
  },
  badgeSelected: {
    backgroundColor: Colors.gold,
  },
});
