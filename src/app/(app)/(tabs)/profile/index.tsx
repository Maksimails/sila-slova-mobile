import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BetCircle } from '@/components/bet-circle';
import { StatusPill } from '@/components/status-pill';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Gradients, Radius, Spacing } from '@/constants/theme';
import { MOCK_BETS, MOCK_FOLLOWERS, MOCK_FOLLOWING, MOCK_REPORTS } from '@/lib/mock-data';

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

const QUICK_STATS = (p: typeof MOCK_PROFILE) => [
  { label: `Доверие ${p.trustLevel}%`, gradient: 'orange' as const },
  { label: `Драйв ${p.driveLevel}/5`, gradient: 'teal' as const },
  { label: `Серия ${p.currentStreak}`, gradient: 'purple' as const },
];

export default function ProfileScreen() {
  const p = MOCK_PROFILE;

  const finishedBets = MOCK_BETS.filter((b) => b.status === 'done' || b.status === 'failed').sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );

  const betsWithReports = MOCK_BETS.filter((bet) => MOCK_REPORTS.some((r) => r.betId === bet.id)).sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.topBar}>
            <ThemedText type="title">Профиль</ThemedText>
            <Pressable accessibilityRole="button" onPress={() => router.push('/settings/account')}>
              <LinearGradient colors={Gradients.blue} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gearButton}>
                <Ionicons name="settings-outline" size={20} color="#ffffff" />
              </LinearGradient>
            </Pressable>
          </View>

          <View style={styles.header}>
            <LinearGradient
              colors={Gradients.orange}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.avatar}
            >
              <ThemedText type="display" color="bg">
                {p.name.slice(0, 1)}
              </ThemedText>
            </LinearGradient>
            <ThemedText type="title">{p.name}</ThemedText>
            <View style={styles.levelRow}>
              <Ionicons name="flash-outline" size={14} color={Colors.textSecondary} />
              <ThemedText type="small" color="textSecondary">
                Уровень {p.level} · {p.xp} / {p.xpForNextLevel} XP
              </ThemedText>
            </View>
          </View>

          <View style={styles.pillRow}>
            {QUICK_STATS(p).map((stat) => (
              <LinearGradient
                key={stat.label}
                colors={Gradients[stat.gradient]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.pill}
              >
                <ThemedText type="small" color="bg">
                  {stat.label}
                </ThemedText>
              </LinearGradient>
            ))}
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
                Завершено
              </ThemedText>
            </View>
          </View>

          {betsWithReports.length > 0 ? (
            <View style={styles.section}>
              <ThemedText type="label" color="textSecondary">
                Мои ставки
              </ThemedText>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.circleRow}
              >
                {betsWithReports.map((bet) => {
                  const betReports = MOCK_REPORTS.filter((r) => r.betId === bet.id);
                  const cover = [...betReports].reverse().find((r) => r.mediaUrl)?.mediaUrl;
                  return (
                    <BetCircle
                      key={bet.id}
                      bet={bet}
                      coverUrl={cover}
                      onPress={() => router.push(`/bet/${bet.id}`)}
                    />
                  );
                })}
              </ScrollView>
            </View>
          ) : null}

          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <ThemedText type="label" color="textSecondary">
                История
              </ThemedText>
              <Pressable
                accessibilityRole="button"
                onPress={() => router.push('/profile/history')}
                style={styles.arrowButton}
              >
                <Ionicons name="arrow-forward" size={16} color="#ffffff" />
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
            <View style={styles.linkLabel}>
              <LinearGradient colors={Gradients.gold} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.linkIcon}>
                <Ionicons name="medal-outline" size={18} color="#ffffff" />
              </LinearGradient>
              <ThemedText type="body">Медали</ThemedText>
            </View>
            <ThemedText type="small" color="textSecondary">
              {p.medalsCount} получено · +{p.hiddenMedalsCount} скрытых
            </ThemedText>
          </Pressable>
          <Pressable onPress={() => router.push('/profile/bonds')} style={styles.linkRow}>
            <View style={styles.linkLabel}>
              <LinearGradient colors={Gradients.purple} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.linkIcon}>
                <Ionicons name="people-circle-outline" size={18} color="#ffffff" />
              </LinearGradient>
              <ThemedText type="body">Бонды с персонажами</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
          </Pressable>
          <Pressable onPress={() => router.push('/settings/account')} style={[styles.linkRow, styles.signOut]}>
            <View style={styles.linkLabel}>
              <LinearGradient colors={Gradients.blue} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.linkIcon}>
                <Ionicons name="settings-outline" size={18} color="#ffffff" />
              </LinearGradient>
              <ThemedText type="body">Настройки и аккаунт</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
          </Pressable>
          <Pressable onPress={() => router.push('/dev-menu')} style={styles.linkRow}>
            <View style={styles.linkLabel}>
              <LinearGradient colors={Gradients.teal} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.linkIcon}>
                <Ionicons name="construct-outline" size={18} color="#ffffff" />
              </LinearGradient>
              <ThemedText type="body">Все экраны (QA)</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
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
    paddingTop: Spacing.two,
    paddingBottom: Spacing.six,
    gap: Spacing.three,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gearButton: {
    width: 40,
    height: 40,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bgElement,
  },
  header: {
    alignItems: 'center',
    gap: Spacing.one,
    marginBottom: Spacing.two,
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.two,
  },
  pillRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  pill: {
    flex: 1,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.two,
    alignItems: 'center',
  },
  followRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Spacing.three,
  },
  followStat: {
    alignItems: 'center',
    gap: 2,
  },
  section: {
    gap: Spacing.two,
  },
  circleRow: {
    gap: Spacing.three,
    paddingVertical: Spacing.one,
    paddingRight: Spacing.three,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowButton: {
    width: 32,
    height: 32,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gold,
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
  linkLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  linkIcon: {
    width: 32,
    height: 32,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOut: {
    marginTop: Spacing.three,
  },
});
