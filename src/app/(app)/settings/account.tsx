import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { supabase } from '@/lib/supabase';

export default function AccountScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title">Аккаунт</ThemedText>

        <View style={styles.section}>
          <Pressable style={styles.row} onPress={() => router.push('/settings/strictness')}>
            <ThemedText type="body">Уровень строгости</ThemedText>
          </Pressable>
          <Pressable style={styles.row} onPress={() => router.push('/settings/support')}>
            <ThemedText type="body">Поддержка</ThemedText>
          </Pressable>
          <Pressable style={styles.row}>
            <ThemedText type="body">Уведомления</ThemedText>
          </Pressable>
          <Pressable style={styles.row}>
            <ThemedText type="body">Документы</ThemedText>
          </Pressable>
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
    padding: Spacing.three,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
});
