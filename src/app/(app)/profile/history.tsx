import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StatusPill } from '@/components/status-pill';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { MOCK_BETS } from '@/lib/mock-data';

const TYPE_LABELS = { result: 'Результат', habit: 'Привычка', quit: 'Аскеза' } as const;

export default function HistoryScreen() {
  const finished = MOCK_BETS.filter((b) => b.status === 'done' || b.status === 'failed').sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.title}>
          История
        </ThemedText>
        <FlatList
          data={finished}
          keyExtractor={(bet) => String(bet.id)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable onPress={() => router.push(`/bet/${item.id}`)} style={styles.row}>
              <View style={styles.rowHeader}>
                <ThemedText type="small" color="textSecondary">
                  {TYPE_LABELS[item.type]} · {item.durationDays} дн.
                </ThemedText>
                <StatusPill status={item.status} />
              </View>
              <ThemedText type="body">{item.goal}</ThemedText>
              {item.stake > 0 ? (
                <ThemedText type="small" color="gold">
                  {item.stake} ₽
                </ThemedText>
              ) : null}
            </Pressable>
          )}
          ListEmptyComponent={
            <ThemedText type="small" color="textSecondary">
              Пока нет завершённых ставок.
            </ThemedText>
          }
        />
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
  title: {
    paddingVertical: Spacing.three,
  },
  list: {
    gap: Spacing.two,
    paddingBottom: Spacing.four,
  },
  row: {
    borderRadius: Radius.medium,
    borderWidth: 1,
    borderColor: Colors.line,
    backgroundColor: Colors.bgElement,
    padding: Spacing.three,
    gap: Spacing.one,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
