import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BetCircle } from '@/components/bet-circle';
import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, GradientOrder, Gradients, Radius, Spacing } from '@/constants/theme';
import { MOCK_OTHER_BETS, MOCK_OTHER_REPORTS, MOCK_PEOPLE } from '@/lib/mock-data';

export default function PersonProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const person = MOCK_PEOPLE.find((p) => String(p.id) === id);
  const bets = MOCK_OTHER_BETS.filter((b) => String(b.userId) === id).sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );

  const [isFollowing, setIsFollowing] = useState(false);

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

  const gradient = GradientOrder[person.id % GradientOrder.length];

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Ionicons name="chevron-back" size={20} color={Colors.text} />
          <ThemedText type="subtitle">Назад</ThemedText>
        </Pressable>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <LinearGradient
              colors={Gradients[gradient]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.avatar}
            >
              <ThemedText type="display" color="bg">
                {person.name.slice(0, 1)}
              </ThemedText>
            </LinearGradient>
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

          <View style={styles.pillRow}>
            <LinearGradient colors={Gradients.orange} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.pill}>
              <ThemedText type="small" color="bg">
                Доверие {person.trustLevel}%
              </ThemedText>
            </LinearGradient>
          </View>

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
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.circleRow}
              >
                {bets.map((bet) => {
                  const betReports = MOCK_OTHER_REPORTS.filter((r) => r.betId === bet.id);
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
    flexDirection: 'row',
    alignItems: 'center',
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
  avatar: {
    width: 96,
    height: 96,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.two,
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
  section: {
    gap: Spacing.two,
  },
  circleRow: {
    gap: Spacing.three,
    paddingVertical: Spacing.one,
    paddingRight: Spacing.three,
  },
});
