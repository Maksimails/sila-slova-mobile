import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, View, type LayoutChangeEvent } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing } from '@/constants/theme';
import { MOCK_FEED_ITEMS, MOCK_OTHER_BETS, MOCK_OTHER_REPORTS, MOCK_PEOPLE } from '@/lib/mock-data';

const TYPE_LABELS = { result: 'Результат', habit: 'Привычка', quit: 'Аскеза' } as const;

type Reaction = 'stars' | 'biceps' | 'hearts';
const REACTION_GLYPHS: Record<Reaction, string> = { stars: '⭐', biceps: '💪', hearts: '❤️' };

function FeedCard({ item, height }: { item: (typeof MOCK_FEED_ITEMS)[number]; height: number }) {
  const person = MOCK_PEOPLE.find((p) => p.id === item.personId);
  const bet = MOCK_OTHER_BETS.find((b) => b.id === item.betId);
  const report = MOCK_OTHER_REPORTS.find((r) => r.id === item.reportId);
  const [myReaction, setMyReaction] = useState<Reaction | null>(null);
  const [counts, setCounts] = useState(item.reactions);

  if (!person || !bet || !report) return null;

  const toggleReaction = (reaction: Reaction) => {
    setCounts((prev) => {
      const next = { ...prev };
      if (myReaction === reaction) {
        next[reaction] -= 1;
      } else {
        if (myReaction) next[myReaction] -= 1;
        next[reaction] += 1;
      }
      return next;
    });
    setMyReaction((prev) => (prev === reaction ? null : reaction));
  };

  return (
    <View style={[styles.card, { height }]}>
      {report.mediaUrl ? (
        <Image source={{ uri: report.mediaUrl }} style={StyleSheet.absoluteFill} contentFit="cover" />
      ) : (
        <View style={[StyleSheet.absoluteFill, styles.noMedia]} />
      )}

      <View style={styles.topScrim}>
        <Pressable onPress={() => router.push(`/person/${person.id}`)} style={styles.personRow}>
          <View style={styles.avatar}>
            <ThemedText type="label" color="bg">
              {person.name.slice(0, 1)}
            </ThemedText>
          </View>
          <ThemedText type="label" color="bg">
            {person.name}
          </ThemedText>
        </Pressable>
      </View>

      <Pressable onPress={() => router.push(`/bet/${bet.id}`)} style={styles.bottomScrim}>
        <ThemedText type="small" color="bg" style={styles.metaLine}>
          {TYPE_LABELS[bet.type]} · день {bet.dayN} из {bet.durationDays}
        </ThemedText>
        <ThemedText type="subtitle" color="bg" style={styles.goal}>
          {bet.goal}
        </ThemedText>
        {report.content ? (
          <ThemedText type="body" color="bg" style={styles.caption}>
            {report.content}
          </ThemedText>
        ) : null}
      </Pressable>

      <View style={styles.rail}>
        {(Object.keys(REACTION_GLYPHS) as Reaction[]).map((reaction) => (
          <Pressable
            key={reaction}
            accessibilityRole="button"
            hitSlop={8}
            onPress={() => toggleReaction(reaction)}
            style={styles.railButton}
          >
            <ThemedText type="subtitle" style={myReaction === reaction && styles.railActive}>
              {REACTION_GLYPHS[reaction]}
            </ThemedText>
            <ThemedText type="small" color="bg">
              {counts[reaction]}
            </ThemedText>
          </Pressable>
        ))}
        <Pressable
          accessibilityRole="button"
          hitSlop={8}
          onPress={() => router.push(`/bet/${bet.id}/comments`)}
          style={styles.railButton}
        >
          <ThemedText type="subtitle">💬</ThemedText>
          <ThemedText type="small" color="bg">
            {bet.commentsCount ?? 0}
          </ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

export default function FeedScreen() {
  const [height, setHeight] = useState(0);

  const onLayout = (e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height;
    if (h > 0 && h !== height) setHeight(h);
  };

  return (
    <ThemedView style={styles.container} onLayout={onLayout}>
      {height > 0 ? (
        <FlatList
          data={MOCK_FEED_ITEMS}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <FeedCard item={item} height={height} />}
          pagingEnabled
          snapToInterval={height}
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          getItemLayout={(_, index) => ({ length: height, offset: height * index, index })}
        />
      ) : null}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: '100%',
    backgroundColor: Colors.text,
  },
  noMedia: {
    backgroundColor: Colors.text,
  },
  topScrim: {
    position: 'absolute',
    top: Spacing.four,
    left: Spacing.three,
    right: Spacing.three,
  },
  personRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(17,17,19,0.45)',
    borderRadius: 999,
    paddingVertical: Spacing.one,
    paddingRight: Spacing.three,
    paddingLeft: Spacing.one,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  bottomScrim: {
    position: 'absolute',
    left: 0,
    right: 76,
    bottom: 0,
    padding: Spacing.three,
    paddingBottom: Spacing.five,
    gap: Spacing.one,
    backgroundColor: 'rgba(17,17,19,0.4)',
  },
  metaLine: {
    opacity: 0.85,
  },
  goal: {
    marginTop: 2,
  },
  caption: {
    opacity: 0.9,
  },
  rail: {
    position: 'absolute',
    right: Spacing.two,
    bottom: Spacing.five,
    alignItems: 'center',
    gap: Spacing.three,
  },
  railButton: {
    alignItems: 'center',
    gap: 2,
  },
  railActive: {
    transform: [{ scale: 1.15 }],
  },
});
