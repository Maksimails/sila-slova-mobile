import { router } from 'expo-router';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Colors, Radius } from '@/constants/theme';

export function FloatingActionButton() {
  const insets = useSafeAreaInsets();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Дать слово"
      onPress={() => router.push('/new-bet/kind')}
      style={({ pressed }) => [styles.fab, { top: insets.top + 12 }, pressed && styles.pressed]}
    >
      <ThemedText type="title" color="bg" style={styles.plus}>
        +
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    width: 58,
    height: 58,
    borderRadius: Radius.pill,
    backgroundColor: Colors.text,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { boxShadow: '0 8px 20px rgba(17,17,19,0.28)' },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.28,
        shadowRadius: 12,
        elevation: 8,
      },
    }),
  },
  pressed: {
    opacity: 0.85,
  },
  plus: {
    lineHeight: 30,
    marginTop: -2,
  },
});
