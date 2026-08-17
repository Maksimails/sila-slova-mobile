import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams } from 'expo-router';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { MOCK_CHALLENGE } from '@/lib/mock-data';
import { type ChallengeSide } from '@/types/bet';

function SideCard({ side }: { side: ChallengeSide }) {
  return (
    <View style={styles.side}>
      <View style={styles.avatarPlaceholder}>
        <ThemedText type="subtitle" color="gold">
          {side.name.slice(0, 1).toUpperCase()}
        </ThemedText>
      </View>
      <ThemedText type="label">{side.name}</ThemedText>
      <View style={[styles.reportBadge, side.reportedToday && styles.reportBadgeDone]}>
        <Ionicons
          name={side.reportedToday ? 'checkmark-circle-outline' : 'ellipse-outline'}
          size={13}
          color={side.reportedToday ? Colors.teal : Colors.textSecondary}
        />
        <ThemedText type="small" color={side.reportedToday ? 'teal' : 'textSecondary'}>
          {side.reportedToday ? 'отчитался(-ась)' : 'ещё нет'}
        </ThemedText>
      </View>
    </View>
  );
}

export default function DuelDetailScreen() {
  useLocalSearchParams<{ id: string }>();
  const challenge = MOCK_CHALLENGE;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <ThemedText type="title" style={styles.title}>
            {challenge.goal}
          </ThemedText>
          <ThemedText type="small" color="textSecondary" style={styles.subtitle}>
            День {Math.min(challenge.durationDays, 11)} из {challenge.durationDays}
            {challenge.stake > 0 ? ` · ставка ${challenge.stake} ₽ с каждой стороны` : ''}
          </ThemedText>

          <View style={styles.vsRow}>
            <SideCard side={challenge.sides[0]} />
            <ThemedView bg="bgElement" style={styles.vsBadge}>
              <ThemedText type="label" color="crimson">
                VS
              </ThemedText>
            </ThemedView>
            <SideCard side={challenge.sides[1]} />
          </View>

          <ThemedText type="small" color="textSecondary" style={styles.judgeHint}>
            Как участник дуэли, ты видишь отчёты соперника — это честный суд.
          </ThemedText>
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
    paddingTop: Spacing.three,
    paddingBottom: Spacing.four,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginTop: Spacing.one,
    marginBottom: Spacing.four,
  },
  vsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  side: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.two,
    borderRadius: Radius.large,
    backgroundColor: Colors.bgElement,
    paddingVertical: Spacing.four,
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
  avatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.line,
  },
  vsBadge: {
    width: 40,
    height: 40,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: -Spacing.one,
    borderWidth: 1,
    borderColor: Colors.crimson,
    zIndex: 1,
  },
  reportBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.half,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: Radius.pill,
    backgroundColor: Colors.bg,
  },
  reportBadgeDone: {
    backgroundColor: 'rgba(47,181,135,0.12)',
  },
  judgeHint: {
    textAlign: 'center',
    marginTop: Spacing.four,
  },
});
