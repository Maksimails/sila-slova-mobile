import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { MOCK_OPEN_CHALLENGES, MOCK_PEOPLE } from '@/lib/mock-data';

const TYPE_LABELS = { result: 'Результат', habit: 'Привычка', quit: 'Аскеза' } as const;

export default function DiscoverScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.title}>
          Открытые вызовы
        </ThemedText>
        <ThemedText type="small" color="textSecondary" style={styles.subtitle}>
          Присоединись к чужому слову и держите его вместе
        </ThemedText>

        <FlatList
          data={MOCK_OPEN_CHALLENGES}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const creator = MOCK_PEOPLE.find((p) => p.id === item.creatorId);
            return (
              <Pressable
                onPress={() => router.push({ pathname: '/challenge/[token]', params: { token: String(item.id) } })}
                style={styles.card}
              >
                <View style={styles.cardHeader}>
                  <ThemedText type="label" color="textSecondary">
                    {TYPE_LABELS[item.type]} · {item.durationDays} дн.
                  </ThemedText>
                  {item.stake > 0 ? (
                    <ThemedText type="small" color="gold">
                      {item.stake} ₽
                    </ThemedText>
                  ) : null}
                </View>
                <ThemedText type="subtitle" style={styles.goal}>
                  {item.goal}
                </ThemedText>
                <View style={styles.cardFooter}>
                  <View style={styles.creatorRow}>
                    <View style={styles.avatar}>
                      <ThemedText type="small" color="gold">
                        {creator?.name.slice(0, 1)}
                      </ThemedText>
                    </View>
                    <ThemedText type="small" color="textSecondary">
                      {creator?.name} ищет соперника
                    </ThemedText>
                  </View>
                  <Button title="Принять" style={styles.joinButton} />
                </View>
              </Pressable>
            );
          }}
          ListEmptyComponent={
            <ThemedText type="small" color="textSecondary">
              Открытых вызовов пока нет.
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
    paddingTop: Spacing.three,
  },
  subtitle: {
    marginTop: 2,
    marginBottom: Spacing.three,
  },
  list: {
    gap: Spacing.three,
    paddingBottom: Spacing.six,
  },
  card: {
    borderRadius: Radius.large,
    borderWidth: 1,
    borderColor: Colors.line,
    backgroundColor: Colors.bgElement,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goal: {
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  creatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    flex: 1,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.line,
  },
  joinButton: {
    height: 40,
    paddingHorizontal: Spacing.three,
  },
});
