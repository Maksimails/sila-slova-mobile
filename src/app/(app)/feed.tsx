import { router } from 'expo-router';
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Radius, Spacing } from '@/constants/theme';

type FeedItem = {
  id: number;
  betId: number;
  name: string;
  goal: string;
  day: number;
  imageUrl?: string;
  caption: string;
};

const MOCK_FEED: FeedItem[] = [
  {
    id: 1,
    betId: 1,
    name: 'Максим',
    goal: 'Спортзал 4 раза в неделю',
    day: 24,
    imageUrl: 'https://picsum.photos/seed/feed1/600/800',
    caption: 'Ноги сегодня, тяжело но сделал',
  },
  {
    id: 2,
    betId: 3,
    name: 'Настя',
    goal: 'Бросить курить',
    day: 60,
    caption: '60 дней без сигарет. Держусь.',
  },
];

export default function FeedScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.title}>
          Лента
        </ThemedText>
        <FlatList
          data={MOCK_FEED}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable onPress={() => router.push(`/bet/${item.betId}`)} style={styles.card}>
              <View style={styles.cardHeader}>
                <ThemedText type="label">{item.name}</ThemedText>
                <ThemedText type="small" color="textSecondary">
                  день {item.day}
                </ThemedText>
              </View>
              <ThemedText type="small" color="textSecondary">
                {item.goal}
              </ThemedText>
              {item.imageUrl ? <Image source={{ uri: item.imageUrl }} style={styles.image} /> : null}
              <ThemedText type="body">{item.caption}</ThemedText>
            </Pressable>
          )}
          ListEmptyComponent={
            <ThemedText type="small" color="textSecondary">
              Публичных ставок пока нет.
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
    gap: Spacing.three,
    paddingBottom: Spacing.four,
  },
  card: {
    borderRadius: Radius.large,
    borderWidth: 1,
    borderColor: Colors.line,
    backgroundColor: Colors.bgElement,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: 260,
    borderRadius: Radius.medium,
  },
});
