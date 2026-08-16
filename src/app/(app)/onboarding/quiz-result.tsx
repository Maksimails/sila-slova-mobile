import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useOnboarding } from '@/lib/onboarding-context';
import { buildQuizInsight } from '@/lib/quiz-insight';
import { computeSeriousnessScore } from '@/lib/seriousness-score';

export default function QuizResultScreen() {
  const { draft, update } = useOnboarding();
  const insight = buildQuizInsight(draft.quiz);

  // Internal signal only — never shown as a raw number to the user, that
  // would read as judging them. Stored now so it's ready to sync once
  // Supabase is wired (see the Trello card on the Backend list).
  useEffect(() => {
    update({ seriousnessScore: computeSeriousnessScore(draft.quiz) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="label" color="gold">
          РАЗБОР
        </ThemedText>
        <ThemedText type="title" style={styles.title}>
          Вот что мы поняли
        </ThemedText>
        <ThemedText type="body" color="textSecondary" style={styles.body}>
          {insight}
        </ThemedText>
        <Button title="Дальше" onPress={() => router.push('/onboarding/name')} style={styles.button} />
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
    justifyContent: 'center',
    gap: Spacing.two,
  },
  title: {
    marginBottom: Spacing.two,
  },
  body: {
    marginBottom: Spacing.four,
  },
  button: {
    marginTop: Spacing.two,
  },
});
