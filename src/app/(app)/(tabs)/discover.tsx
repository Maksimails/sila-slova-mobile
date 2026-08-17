import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { FlatList, Platform, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Gradients, Radius, Spacing, type GradientName } from '@/constants/theme';
import { MOCK_OPEN_CHALLENGES, MOCK_PEOPLE } from '@/lib/mock-data';

type BetType = 'result' | 'habit' | 'quit';

const TYPE_LABELS = { result: 'Результат', habit: 'Привычка', quit: 'Аскеза' } as const;
const TYPE_GRADIENT: Record<BetType, GradientName> = { result: 'gold', habit: 'teal', quit: 'red' };

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
            const gradient = TYPE_GRADIENT[item.type];
            return (
              <Pressable
                onPress={() => router.push({ pathname: '/challenge/[token]', params: { token: String(item.id) } })}
                style={styles.cardWrap}
              >
                <LinearGradient
                  colors={Gradients[gradient]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.accent}
                />
                <View style={styles.card}>
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
                      <LinearGradient
                        colors={Gradients[gradient]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.avatar}
                      >
                        <ThemedText type="small" color="bg">
                          {creator?.name.slice(0, 1)}
                        </ThemedText>
                      </LinearGradient>
                      <ThemedText type="small" color="textSecondary">
                        {creator?.name} ищет соперника
                      </ThemedText>
                    </View>
                    <Button title="Принять" style={styles.joinButton} />
                  </View>
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
  cardWrap: {
    flexDirection: 'row',
    borderRadius: Radius.large,
    overflow: 'hidden',
    backgroundColor: Colors.bgElement,
    ...Platform.select({
      web: { boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
      },
    }),
  },
  accent: {
    width: 6,
  },
  card: {
    flex: 1,
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
  },
  joinButton: {
    height: 40,
    paddingHorizontal: Spacing.three,
  },
});
