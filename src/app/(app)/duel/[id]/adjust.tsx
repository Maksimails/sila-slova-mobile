import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { Chip } from '@/components/chip';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

const START_OPTIONS = [
  { label: 'Сегодня', days: 0 },
  { label: 'Завтра', days: 1 },
  { label: '+3 дня', days: 3 },
  { label: '+1 неделя', days: 7 },
];

export default function AdjustChallengeScreen() {
  useLocalSearchParams<{ id: string }>();
  const [startOffset, setStartOffset] = useState<number | undefined>();
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.centered}>
          <ThemedText type="title" style={styles.center}>
            Предложение отправлено
          </ThemedText>
          <ThemedText type="body" color="textSecondary" style={styles.center}>
            Ждём ответа соперника.
          </ThemedText>
          <Button title="Назад к дуэли" onPress={() => router.back()} />
        </SafeAreaView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title">Пересогласовать дуэль</ThemedText>
        <ThemedText type="body" color="textSecondary">
          Можно сдвинуть дату старта, пока дуэль ещё не началась. Ставка не меняется.
        </ThemedText>

        <View style={styles.chipRow}>
          {START_OPTIONS.map((option) => (
            <Chip
              key={option.days}
              label={option.label}
              selected={startOffset === option.days}
              onPress={() => setStartOffset(option.days)}
            />
          ))}
        </View>

        <Button title="Предложить" onPress={() => setSent(true)} disabled={startOffset === undefined} />
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
    gap: Spacing.three,
  },
  centered: {
    flex: 1,
    padding: Spacing.four,
    justifyContent: 'center',
    gap: Spacing.two,
  },
  center: {
    textAlign: 'center',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
});
