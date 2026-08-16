import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Radius, Spacing } from '@/constants/theme';

const MOCK_REQUEST = {
  requesterName: 'Максим',
  goal: 'Бросить курить',
  deadline: '2026-10-30',
};

export default function WitnessAcceptScreen() {
  useLocalSearchParams<{ token: string }>();
  const req = MOCK_REQUEST;
  const [decision, setDecision] = useState<'accepted' | 'declined' | null>(null);

  if (decision) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.centered}>
          <ThemedText type="title" style={styles.center}>
            {decision === 'accepted' ? 'Свидетель подтверждён ✅' : 'Ты отказался(-ась)'}
          </ThemedText>
          {decision === 'accepted' ? (
            <ThemedText type="body" color="textSecondary" style={styles.center}>
              Раз в неделю мы спросим тебя, держится ли {req.requesterName}.
            </ThemedText>
          ) : null}
          <Button title="На главную" onPress={() => router.replace('/')} />
        </SafeAreaView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title">{req.requesterName} просит тебя быть свидетелем</ThemedText>
        <View style={styles.card}>
          <ThemedText type="body">
            {req.requesterName} отказывается от «{req.goal}» до {req.deadline}.
          </ThemedText>
          <ThemedText type="small" color="textSecondary">
            Твоя задача — раз в неделю честно сказать, держится ли он(-а).
          </ThemedText>
        </View>
        <View style={styles.actions}>
          <Button title="Согласен(-на)" onPress={() => setDecision('accepted')} />
          <Button title="Нет" variant="secondary" onPress={() => setDecision('declined')} />
        </View>
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
  card: {
    borderRadius: Radius.large,
    borderWidth: 1,
    borderColor: Colors.line,
    backgroundColor: Colors.bgElement,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  actions: {
    gap: Spacing.two,
    marginTop: Spacing.three,
  },
});
