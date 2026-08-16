import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Chip } from '@/components/chip';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { MOCK_FOLLOWERS, MOCK_FOLLOWING } from '@/lib/mock-data';

type Tab = 'followers' | 'following';

export default function FollowersScreen() {
  const params = useLocalSearchParams<{ tab?: string }>();
  const [tab, setTab] = useState<Tab>(params.tab === 'following' ? 'following' : 'followers');

  const people = tab === 'followers' ? MOCK_FOLLOWERS : MOCK_FOLLOWING;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.title}>
          Люди
        </ThemedText>
        <View style={styles.chipRow}>
          <Chip label="Подписчики" selected={tab === 'followers'} onPress={() => setTab('followers')} />
          <Chip label="Подписки" selected={tab === 'following'} onPress={() => setTab('following')} />
        </View>
        <FlatList
          data={people}
          keyExtractor={(person) => String(person.id)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={styles.avatarPlaceholder}>
                <ThemedText type="label" color="gold">
                  {item.name.slice(0, 1)}
                </ThemedText>
              </View>
              <ThemedText type="body" style={styles.name}>
                {item.name}
              </ThemedText>
              {item.mutual ? (
                <ThemedText type="small" color="textSecondary">
                  Взаимно
                </ThemedText>
              ) : null}
            </View>
          )}
          ListEmptyComponent={
            <ThemedText type="small" color="textSecondary">
              Пока никого нет.
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
  chipRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    paddingVertical: Spacing.three,
  },
  list: {
    gap: Spacing.two,
    paddingBottom: Spacing.four,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    borderRadius: Radius.medium,
    borderWidth: 1,
    borderColor: Colors.line,
    backgroundColor: Colors.bgElement,
    padding: Spacing.three,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.line,
  },
  name: {
    flex: 1,
  },
});
