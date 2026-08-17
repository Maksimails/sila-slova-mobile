import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Radius, Spacing } from '@/constants/theme';

type NotificationType = 'comment' | 'opponent_report' | 'challenge_activated' | 'challenge_accepted' | 'challenge_declined';

const MOCK_NOTIFICATIONS: { id: number; type: NotificationType; message: string; isRead: boolean; betId?: number }[] = [
  { id: 1, type: 'opponent_report', message: 'Игорь отчитался за день 11 по «30 отжиманий каждый день» — теперь твоя очередь!', isRead: false },
  { id: 2, type: 'comment', message: 'Игорь прокомментировал твой отчёт за день 23: «Красавчик»', isRead: false, betId: 1 },
  { id: 3, type: 'challenge_accepted', message: 'Игорь принял твой вызов «30 отжиманий каждый день»', isRead: true },
];

const ICONS: Record<NotificationType, keyof typeof Ionicons.glyphMap> = {
  comment: 'chatbubble-outline',
  opponent_report: 'flash-outline',
  challenge_activated: 'flame-outline',
  challenge_accepted: 'checkmark-circle-outline',
  challenge_declined: 'close-circle-outline',
};

export default function NotificationsScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.title}>
          Уведомления
        </ThemedText>
        <FlatList
          data={MOCK_NOTIFICATIONS}
          keyExtractor={(n) => String(n.id)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => (item.betId ? router.push(`/bet/${item.betId}`) : undefined)}
              style={[styles.row, !item.isRead && styles.rowUnread]}
            >
              <Ionicons name={ICONS[item.type]} size={22} color={Colors.text} />
              <ThemedText type="body" style={styles.message}>
                {item.message}
              </ThemedText>
            </Pressable>
          )}
          ListEmptyComponent={
            <ThemedText type="small" color="textSecondary">
              Пока тихо.
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
    flexDirection: 'row',
    gap: Spacing.three,
    alignItems: 'flex-start',
    borderRadius: Radius.medium,
    borderWidth: 1,
    borderColor: Colors.line,
    backgroundColor: Colors.bgElement,
    padding: Spacing.three,
  },
  rowUnread: {
    borderColor: Colors.gold,
  },
  message: {
    flex: 1,
  },
});
