import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BetGridTile } from '@/components/bet-grid-tile';
import { StatCard } from '@/components/stat-card';
import { StatusPill } from '@/components/status-pill';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { MOCK_BETS, MOCK_FOLLOWERS, MOCK_FOLLOWING, MOCK_REPORTS } from '@/lib/mock-data';

const GRID_COLUMNS = 3;
const GRID_GAP = Spacing.half;

const MOCK_PROFILE = {
  name: 'Максим',
  trustLevel: 82,
  driveLevel: 4,
  xp: 640,
  level: 3,
  xpForNextLevel: 900,
  bestStreak: 24,
  currentStreak: 24,
  medalsCount: 8,
  hiddenMedalsCount: 3,
};

const TYPE_LABELS = { result: 'Результат', habit: 'Привычка', quit: 'Аскеза' } as const;

export default function ProfileScreen() {
  const p = MOCK_PROFILE;
  const [gridWidth, setGridWidth] = useState(0);
  const onGridLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (w > 0 && w !== gridWidth) setGridWidth(w);
  };
  const tileSize = gridWidth > 0 ? (gridWidth - GRID_GAP * (GRID_COLUMNS - 1)) / GRID_COLUMNS : 0;

  const finishedBets = MOCK_BETS.filter((b) => b.status === 'done' || b.status === 'failed').sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );
  const craziestBet = [...MOCK_BETS]
    .filter((b) => b.status === 'done')
    .sort((a, b) => b.stake * b.durationDays - a.stake * a.durationDays)[0];

  const betsWithReports = MOCK_BETS.filter((bet) => MOCK_REPORTS.some((r) => r.betId === bet.id)).sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <View style={styles.avatarPlaceholder}>
              <ThemedText type="title" color="gold">
                {p.name.slice(0, 1)}
              </ThemedText>
            </View>
            <ThemedText type="title">{p.name}</ThemedText>
            <ThemedText type="small" color="textSecondary">
              Уровень {p.level} · {p.xp} / {p.xpForNextLevel} XP
            </ThemedText>
          </View>

          <View style={styles.followRow}>
            <Pressable
              style={styles.followStat}
              onPress={() => router.push({ pathname: '/profile/followers', params: { tab: 'followers' } })}
            >
              <ThemedText type="title">{MOCK_FOLLOWERS.length}</ThemedText>
              <ThemedText type="small" color="textSecondary">
                Подписчики
              </ThemedText>
            </Pressable>
            <Pressable
              style={styles.followStat}
              onPress={() => router.push({ pathname: '/profile/followers', params: { tab: 'following' } })}
            >
              <ThemedText type="title">{MOCK_FOLLOWING.length}</ThemedText>
              <ThemedText type="small" color="textSecondary">
                Подписки
              </ThemedText>
            </Pressable>
            <View style={styles.followStat}>
              <ThemedText type="title">{finishedBets.length}</ThemedText>
              <ThemedText type="small" color="textSecondary">
                Ставок завершено
              </ThemedText>
            </View>
          </View>

          <View style={styles.statsGrid}>
            <StatCard label="Доверие" value={`${p.trustLevel}%`} progress={p.trustLevel / 100} />
            <StatCard label="Драйв" value={`${p.driveLevel}/5`} progress={p.driveLevel / 5} />
          </View>
          <View style={styles.statsGrid}>
            <StatCard label="Лучшая серия" value={String(p.bestStreak)} />
            <StatCard label="Текущая серия" value={String(p.currentStreak)} />
          </View>

          {craziestBet ? (
            <Pressable onPress={() => router.push(`/bet/${craziestBet.id}`)} style={styles.crazyCard}>
              <ThemedText type="label" color="crimson">
                🔥 Самая безумная ставка
              </ThemedText>
              <ThemedText type="subtitle" style={styles.crazyGoal}>
                {craziestBet.goal}
              </ThemedText>
              <ThemedText type="small" color="textSecondary">
                {TYPE_LABELS[craziestBet.type]} · {craziestBet.durationDays} дн. · {craziestBet.stake} ₽
              </ThemedText>
            </Pressable>
          ) : null}

          {betsWithReports.length > 0 ? (
            <View style={styles.section}>
              <ThemedText type="label" color="textSecondary">
                Ставки
              </ThemedText>
              <View style={styles.grid} onLayout={onGridLayout}>
                {tileSize > 0
                  ? betsWithReports.map((bet) => {
                      const betReports = MOCK_REPORTS.filter((r) => r.betId === bet.id);
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
          ) : null}

          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <ThemedText type="label" color="textSecondary">
                История
              </ThemedText>
              <Pressable onPress={() => router.push('/profile/history')}>
                <ThemedText type="small" color="gold">
                  Смотреть всё
                </ThemedText>
              </Pressable>
            </View>
            {finishedBets.slice(0, 3).map((bet) => (
              <Pressable key={bet.id} onPress={() => router.push(`/bet/${bet.id}`)} style={styles.historyRow}>
                <View style={styles.historyBody}>
                  <ThemedText type="body">{bet.goal}</ThemedText>
                  <ThemedText type="small" color="textSecondary">
                    {TYPE_LABELS[bet.type]} · {bet.durationDays} дн.
                  </ThemedText>
                </View>
                <StatusPill status={bet.status} />
              </Pressable>
            ))}
          </View>

          <Pressable onPress={() => router.push('/profile/medals')} style={styles.linkRow}>
            <ThemedText type="body">🏅 Медали</ThemedText>
            <ThemedText type="small" color="textSecondary">
              {p.medalsCount} получено · +{p.hiddenMedalsCount} скрытых
            </ThemedText>
          </Pressable>
          <Pressable onPress={() => router.push('/profile/bonds')} style={styles.linkRow}>
            <ThemedText type="body">🤝 Бонды с персонажами</ThemedText>
            <ThemedText type="small" color="textSecondary">
              →
            </ThemedText>
          </Pressable>
          <Pressable onPress={() => router.push('/settings/account')} style={[styles.linkRow, styles.signOut]}>
            <ThemedText type="body">⚙️ Настройки и аккаунт</ThemedText>
            <ThemedText type="small" color="textSecondary">
              →
            </ThemedText>
          </Pressable>
          <Pressable onPress={() => router.push('/dev-menu')} style={styles.linkRow}>
            <ThemedText type="body">🛠 Все экраны (QA)</ThemedText>
            <ThemedText type="small" color="textSecondary">
              →
            </ThemedText>
          </Pressable>
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
  scrollContent: {
    paddingTop: Spacing.four,
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
  statsGrid: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  crazyCard: {
    borderRadius: Radius.large,
    borderWidth: 1,
    borderColor: Colors.crimson,
    backgroundColor: 'rgba(225,75,63,0.08)',
    padding: Spacing.four,
    gap: Spacing.one,
  },
  crazyGoal: {
    marginTop: 2,
  },
  section: {
    gap: Spacing.two,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: Radius.medium,
    borderWidth: 1,
    borderColor: Colors.line,
    backgroundColor: Colors.bgElement,
    padding: Spacing.three,
  },
  historyBody: {
    flex: 1,
    gap: 2,
    marginRight: Spacing.two,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: Radius.medium,
    borderWidth: 1,
    borderColor: Colors.line,
    backgroundColor: Colors.bgElement,
    padding: Spacing.three,
  },
  signOut: {
    marginTop: Spacing.three,
  },
});
