import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Gradients, Radius } from '@/constants/theme';

export function FloatingActionButton() {
  const insets = useSafeAreaInsets();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Дать слово"
      onPress={() => router.push('/new-bet/kind')}
      style={({ pressed }) => [styles.pressableBase, { top: insets.top + 12 }, pressed && styles.pressed]}
    >
      <LinearGradient colors={Gradients.red} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.fab}>
        <Ionicons name="add" size={28} color="#ffffff" />
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressableBase: {
    position: 'absolute',
    right: 20,
    borderRadius: Radius.pill,
    ...Platform.select({
      web: { boxShadow: '0 8px 20px rgba(122,14,14,0.35)' },
      default: {
        shadowColor: '#7A0E0E',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 8,
      },
    }),
  },
  fab: {
    width: 58,
    height: 58,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
});
