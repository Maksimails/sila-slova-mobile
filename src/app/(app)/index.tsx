import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BetCard } from '@/components/bet-card';
import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing } from '@/constants/theme';
import { MOCK_BETS } from '@/lib/mock-data';
import { isSupabaseConfigured } from '@/lib/supabase';

export default function HomeScreen() {
  const bets = isSupabaseConfigured ? [] : MOCK_BETS;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <ThemedText type="title">Сила Слова</ThemedText>
          <View style={styles.headerIcons}>
            <Pressable accessibilityRole="button" onPress={() => router.push('/dev-menu')}>
              <ThemedText type="subtitle">🛠</ThemedText>
            </Pressable>
            <Pressable accessibilityRole="button" onPress={() => router.push('/notifications')}>
              <ThemedText type="subtitle">🔔</ThemedText>
            </Pressable>
            <Pressable accessibilityRole="button" onPress={() => router.push('/profile')}>
              <ThemedText type="subtitle">👤</ThemedText>
            </Pressable>
          </View>
        </View>

        {bets.length === 0 ? (
          <View style={styles.empty}>
            <ThemedText type="subtitle" style={styles.emptyTitle}>
              Слов пока не давал(-а)
            </ThemedText>
            <ThemedText type="body" color="textSecondary" style={styles.emptyBody}>
              Есть честь? Докажи.
            </ThemedText>
          </View>
        ) : (
          <FlatList
            data={bets}
            keyExtractor={(bet) => String(bet.id)}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <BetCard bet={item} onPress={() => router.push(`/bet/${item.id}`)} />
            )}
          />
        )}

        <Button title="Дать слово" onPress={() => router.push('/new-bet/kind')} style={styles.cta} />
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
    paddingHorizontal: Spacing.four,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.three,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  emptyTitle: {
    textAlign: 'center',
  },
  emptyBody: {
    textAlign: 'center',
  },
  list: {
    gap: Spacing.three,
    paddingBottom: Spacing.four,
  },
  cta: {
    marginVertical: Spacing.three,
    borderColor: Colors.line,
  },
});
