import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BetGridTile } from '@/components/bet-grid-tile';
import { Button } from '@/components/button';
import { StatCard } from '@/components/stat-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { MOCK_OTHER_BETS, MOCK_OTHER_REPORTS, MOCK_PEOPLE } from '@/lib/mock-data';

const GRID_COLUMNS = 3;
const GRID_GAP = Spacing.half;

export default function PersonProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const person = MOCK_PEOPLE.find((p) => String(p.id) === id);
  const bets = MOCK_OTHER_BETS.filter((b) => String(b.userId) === id).sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );

  const [isFollowing, setIsFollowing] = useState(false);
  const [gridWidth, setGridWidth] = useState(0);
  const onGridLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (w > 0 && w !== gridWidth) setGridWidth(w);
  };
  const tileSize = gridWidth > 0 ? (gridWidth - GRID_GAP * (GRID_COLUMNS - 1)) / GRID_COLUMNS : 0;

  if (!person) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <ThemedText type="body" color="textSecondary">
            Пользователь не найден.
          </ThemedText>
        </SafeAreaView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <ThemedText type="subtitle">← Назад</ThemedText>
        </Pressable>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <View style={styles.avatarPlaceholder}>
              <ThemedText type="title" color="gold">
                {person.name.slice(0, 1)}
              </ThemedText>
            </View>
            <ThemedText type="title">{person.name}</ThemedText>
          </View>

          <View style={styles.followRow}>
            <View style={styles.followStat}>
              <ThemedText type="title">{person.followersCount}</ThemedText>
              <ThemedText type="small" color="textSecondary">
                Подписчики
              </ThemedText>
            </View>
            <View style={styles.followStat}>
              <ThemedText type="title">{person.followingCount}</ThemedText>
              <ThemedText type="small" color="textSecondary">
                Подписки
              </ThemedText>
            </View>
            <View style={styles.followStat}>
              <ThemedText type="title">{bets.length}</ThemedText>
              <ThemedText type="small" color="textSecondary">
                Ставок
              </ThemedText>
            </View>
          </View>

          <StatCard label="Доверие" value={`${person.trustLevel}%`} progress={person.trustLevel / 100} />

          <Button
            title={isFollowing ? 'Вы подписаны' : 'Подписаться'}
            variant={isFollowing ? 'secondary' : 'primary'}
            onPress={() => setIsFollowing((v) => !v)}
          />

          {bets.length > 0 ? (
            <View style={styles.section}>
              <ThemedText type="label" color="textSecondary">
                Ставки
              </ThemedText>
              <View style={styles.grid} onLayout={onGridLayout}>
                {tileSize > 0
                  ? bets.map((bet) => {
                      const betReports = MOCK_OTHER_REPORTS.filter((r) => r.betId === bet.id);
                      const cover = [...betReports].reverse().find((r) => r.mediaUrl)?.mediaUrl;
                      return (
                        <BetGridTile
                          key={bet.id}
                          bet={bet}
                          coverUrl={cover}
                          size={tileSize}
                          onPress={() => router.push(`/bet/${bet.id}`)}
                        />
                      );
                    })
                  : null}
              </View>
            </View>
          ) : (
            <ThemedText type="small" color="textSecondary">
              Публичных ставок пока нет.
            </ThemedText>
          )}
        </ScrollView>
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
  back: {
    paddingTop: Spacing.three,
    paddingBottom: Spacing.one,
  },
  scrollContent: {
    paddingTop: Spacing.two,
    paddingBottom: Spacing.six,
    gap: Spacing.three,
  },
  header: {
    alignItems: 'center',
    gap: Spacing.one,
    marginBottom: Spacing.two,
  },
  avatarPlaceholder: {
    width: 88,
    height: 88,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.line,
    marginBottom: Spacing.two,
  },
  followRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: Radius.large,
    borderWidth: 1,
    borderColor: Colors.line,
    backgroundColor: Colors.bgElement,
    paddingVertical: Spacing.three,
  },
  followStat: {
    alignItems: 'center',
    gap: 2,
  },
  section: {
    gap: Spacing.two,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
  },
});
