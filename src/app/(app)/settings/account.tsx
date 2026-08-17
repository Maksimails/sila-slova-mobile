import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Gradients, Radius, Spacing, type GradientName } from '@/constants/theme';
import { supabase } from '@/lib/supabase';

const ROWS: { label: string; icon: keyof typeof Ionicons.glyphMap; gradient: GradientName; onPress?: () => void }[] = [
  { label: 'Уровень строгости', icon: 'options-outline', gradient: 'purple', onPress: () => router.push('/settings/strictness') },
  { label: 'Поддержка', icon: 'help-buoy-outline', gradient: 'teal', onPress: () => router.push('/settings/support') },
  { label: 'Уведомления', icon: 'notifications-outline', gradient: 'gold' },
  { label: 'Документы', icon: 'document-text-outline', gradient: 'blue' },
];

export default function AccountScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title">Аккаунт</ThemedText>

        <View style={styles.section}>
          {ROWS.map((row) => (
            <Pressable key={row.label} style={styles.row} onPress={row.onPress}>
              <LinearGradient
                colors={Gradients[row.gradient]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.iconChip}
              >
                <Ionicons name={row.icon} size={18} color="#ffffff" />
              </LinearGradient>
              <ThemedText type="body">{row.label}</ThemedText>
            </Pressable>
          ))}
        </View>

        <Button title="Выйти" variant="secondary" onPress={() => supabase.auth.signOut()} />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    padding: Spacing.four,
    gap: Spacing.four,
  },
  section: {
    borderRadius: Radius.large,
    borderWidth: 1,
    borderColor: Colors.line,
    backgroundColor: Colors.bgElement,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
  iconChip: {
    width: 36,
    height: 36,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
