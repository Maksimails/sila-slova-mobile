import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing } from '@/constants/theme';

export default function QuizLoadingScreen() {
  useEffect(() => {
    const timer = setTimeout(() => router.replace('/onboarding/quiz-result'), 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color={Colors.gold} />
        <ThemedText type="subtitle" style={styles.text}>
          Смотрим, что тебя останавливает
        </ThemedText>
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
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
  },
  text: {
    textAlign: 'center',
  },
});
