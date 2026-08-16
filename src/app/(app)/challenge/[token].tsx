import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Radius, Spacing } from '@/constants/theme';

const MOCK_INVITE = {
  creatorName: 'Игорь',
  goal: '30 отжиманий каждый день',
  type: 'Привычка',
  durationDays: 30,
  stake: 500,
};

export default function ChallengeInviteScreen() {
  useLocalSearchParams<{ token: string }>();
  const invite = MOCK_INVITE;
  const [decision, setDecision] = useState<'accepted' | 'declined' | null>(null);

  if (decision === 'declined') {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.centered}>
          <ThemedText type="title" style={styles.center}>
            Вызов отклонён
          </ThemedText>
          <Button title="На главную" onPress={() => router.replace('/(app)')} />
        </SafeAreaView>
      </ThemedView>
    );
  }

  if (decision === 'accepted') {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.centered}>
          <ThemedText type="title" style={styles.center}>
            ⚔️ Вызов принят!
          </ThemedText>
          <ThemedText type="body" color="textSecondary" style={styles.center}>
            Осталось записать свою видео-клятву.
          </ThemedText>
          <Button title="Записать клятву" onPress={() => router.push('/new-bet/video')} />
        </SafeAreaView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title">{invite.creatorName} вызывает тебя на дуэль</ThemedText>

        <View style={styles.card}>
          <ThemedText type="small" color="textSecondary">
            {invite.type} · {invite.durationDays} дн.
          </ThemedText>
          <ThemedText type="subtitle">{invite.goal}</ThemedText>
          {invite.stake > 0 ? (
            <ThemedText type="body" color="gold">
              Ставка: {invite.stake} ₽ с каждой стороны
            </ThemedText>
          ) : null}
        </View>

        <ThemedText type="small" color="textSecondary">
          Посмотри видео-клятву {invite.creatorName} перед тем, как решать.
        </ThemedText>

        <View style={styles.actions}>
          <Button title="Принять вызов" onPress={() => setDecision('accepted')} />
          <Button title="Отклонить" variant="secondary" onPress={() => setDecision('declined')} />
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
    gap: Spacing.one,
  },
  actions: {
    gap: Spacing.two,
    marginTop: Spacing.three,
  },
});
