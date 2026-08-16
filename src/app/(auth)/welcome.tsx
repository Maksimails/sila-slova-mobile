import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { isSupabaseConfigured } from '@/lib/supabase';

export default function WelcomeScreen() {
  const handleStart = () => {
    // No backend yet (task #5) — phone sign-in can't actually authenticate,
    // so skip straight into the onboarding/quiz sequence instead of
    // dead-ending on a code that will never arrive. Once Supabase is wired
    // this goes through real sign-in like it should.
    router.push(isSupabaseConfigured ? '/(auth)/sign-in' : '/onboarding/welcome');
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="label" color="gold" style={styles.wordmark}>
          СИЛА СЛОВА
        </ThemedText>

        <ThemedView style={styles.content}>
          <ThemedText type="display" style={styles.title}>
            Дал слово —{'\n'}сдержи его.
          </ThemedText>
          <ThemedText type="body" color="textSecondary" style={styles.subtitle}>
            Одно сдержанное обещание меняет не день — оно меняет то, как ты к себе относишься.
          </ThemedText>
        </ThemedView>

        <Button title="Дать слово" onPress={handleStart} />
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
    justifyContent: 'space-between',
  },
  wordmark: {
    textAlign: 'center',
    letterSpacing: 2,
    marginTop: Spacing.three,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.three,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
});
