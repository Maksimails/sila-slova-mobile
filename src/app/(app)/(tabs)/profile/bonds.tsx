import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { PERSONAS } from '@/lib/personas';

const MOCK_BONDS: Record<string, { xp: number; level: number }> = {
  arnold: { xp: 240, level: 5 },
  zina: { xp: 90, level: 2 },
  confucius: { xp: 40, level: 1 },
  angela: { xp: 0, level: 1 },
};

export default function BondsScreen() {
  const ranked = [...PERSONAS].sort((a, b) => MOCK_BONDS[b.key].xp - MOCK_BONDS[a.key].xp);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.title}>
          Бонды с персонажами
        </ThemedText>
        <FlatList
          data={ranked}
          keyExtractor={(p) => p.key}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const bond = MOCK_BONDS[item.key];
            return (
              <View style={styles.row}>
                <View style={styles.avatarPlaceholder}>
                  <ThemedText type="label" color="gold">
                    {item.name.slice(0, 1)}
                  </ThemedText>
                </View>
                <View style={styles.rowBody}>
                  <ThemedText type="label">{item.name}</ThemedText>
                  <ThemedText type="small" color="textSecondary">
                    Уровень {bond.level} · {bond.xp} XP
                  </ThemedText>
                </View>
              </View>
            );
          }}
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
    alignItems: 'center',
    gap: Spacing.three,
    borderRadius: Radius.medium,
    borderWidth: 1,
    borderColor: Colors.line,
    backgroundColor: Colors.bgElement,
    padding: Spacing.three,
  },
  avatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.line,
  },
  rowBody: {
    gap: 2,
  },
});
