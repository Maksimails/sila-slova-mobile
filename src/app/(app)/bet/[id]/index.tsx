import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { FlatList, Image, Platform, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { StatusPill } from '@/components/status-pill';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { MOCK_BETS, MOCK_REPORTS } from '@/lib/mock-data';

const TYPE_LABELS = { result: 'Результат', habit: 'Привычка', quit: 'Аскеза' } as const;

export default function BetDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const bet = MOCK_BETS.find((b) => String(b.id) === id) ?? MOCK_BETS[0];
  const reports = MOCK_REPORTS.filter((r) => r.betId === bet.id).sort((a, b) => b.day - a.day);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <FlatList
          data={reports}
          keyExtractor={(r) => String(r.id)}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            <View style={styles.header}>
              <View style={styles.headerTop}>
                <ThemedText type="label" color="textSecondary">
                  {TYPE_LABELS[bet.type]} · день {bet.dayN} из {bet.durationDays}
                </ThemedText>
                <StatusPill status={bet.status} />
              </View>
              <ThemedText type="title">{bet.goal}</ThemedText>
              {bet.pointA ? (
                <ThemedText type="small" color="textSecondary">
                  Точка А: {bet.pointA}
                </ThemedText>
              ) : null}
              {bet.stake > 0 ? (
                <View style={styles.stakeRow}>
                  <ThemedText type="body" color="gold">
                    Ставка: {bet.stake}
                  </ThemedText>
                  {bet.currency === 'RUB' ? (
                    <ThemedText type="body" color="gold">
                      ₽
                    </ThemedText>
                  ) : (
                    <Ionicons name="star" size={16} color={Colors.gold} />
                  )}
                </View>
              ) : null}

              {bet.status === 'active' && !bet.reportedToday ? (
                <Button
                  title="Отправить отчёт"
                  onPress={() => router.push(`/report/${bet.id}`)}
                  style={styles.reportButton}
                />
              ) : null}

              <Pressable onPress={() => router.push(`/bet/${bet.id}/comments?day=0`)} style={styles.commentLink}>
                <Ionicons name="chatbubble-outline" size={16} color={Colors.gold} />
                <ThemedText type="small" color="gold">
                  комментарии к видео-клятве
                </ThemedText>
              </Pressable>

              <ThemedText type="label" color="textSecondary" style={styles.historyTitle}>
                История отчётов
              </ThemedText>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.reportRow}>
              <View style={styles.reportRowHeader}>
                <ThemedText type="label">День {item.day}</ThemedText>
                <ThemedText type="small" color="textSecondary">
                  {item.date}
                </ThemedText>
              </View>
              {item.mediaUrl ? (
                <Image source={{ uri: item.mediaUrl }} style={styles.reportImage} />
              ) : null}
              {item.content ? <ThemedText type="body">{item.content}</ThemedText> : null}
              <Pressable
                onPress={() => router.push(`/bet/${bet.id}/comments?day=${item.day}`)}
                style={styles.commentLink}
              >
                <Ionicons name="chatbubble-outline" size={16} color={Colors.gold} />
                <ThemedText type="small" color="gold">
                  комментарии
                </ThemedText>
              </Pressable>
            </View>
          )}
          ListEmptyComponent={
            <ThemedText type="small" color="textSecondary">
              Отчётов пока нет.
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
  list: {
    paddingBottom: Spacing.four,
    gap: Spacing.three,
  },
  header: {
    gap: Spacing.two,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.two,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportButton: {
    marginTop: Spacing.two,
  },
  stakeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  commentLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  historyTitle: {
    marginTop: Spacing.three,
  },
  reportRow: {
    borderRadius: Radius.medium,
    backgroundColor: Colors.bgElement,
    padding: Spacing.three,
    gap: Spacing.two,
    ...Platform.select({
      web: { boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
      },
    }),
  },
  reportRowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reportImage: {
    width: '100%',
    height: 220,
    borderRadius: Radius.small,
  },
});
