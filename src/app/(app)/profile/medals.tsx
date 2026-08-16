import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Radius, Spacing } from '@/constants/theme';

const MOCK_MEDALS = [
  { code: 'first_bet', name: 'Первая ставка', earned: true },
  { code: 'first_kept', name: 'Первое сдержанное слово', earned: true },
  { code: 'streak_7', name: 'Серия 7 дней', earned: true },
  { code: 'streak_30', name: 'Серия 30 дней', earned: false },
  { code: 'streak_100', name: 'Серия 100 дней', earned: false },
  { code: 'public_bet', name: 'Публичная ставка', earned: true },
  { code: 'extreme_bet', name: 'Экстремальная ставка', earned: false },
  { code: 'night_owl', name: 'Ночная сова', earned: true },
];

export default function MedalsScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.title}>
          Медали
        </ThemedText>
        <FlatList
          data={MOCK_MEDALS}
          keyExtractor={(m) => m.code}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={[styles.medal, !item.earned && styles.medalLocked]}>
              <ThemedText type="display">{item.earned ? '🏅' : '🔒'}</ThemedText>
              <ThemedText type="small" color={item.earned ? 'text' : 'textSecondary'} style={styles.medalName}>
                {item.name}
              </ThemedText>
            </View>
          )}
          ListFooterComponent={
            <ThemedText type="small" color="textSecondary" style={styles.hidden}>
              +3 скрытых медали — условия неизвестны
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
    paddingBottom: Spacing.four,
  },
  row: {
    gap: Spacing.three,
  },
  medal: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.one,
    borderRadius: Radius.large,
    borderWidth: 1,
    borderColor: Colors.line,
    backgroundColor: Colors.bgElement,
    padding: Spacing.four,
    marginBottom: Spacing.three,
  },
  medalLocked: {
    opacity: 0.5,
  },
  medalName: {
    textAlign: 'center',
  },
  hidden: {
    textAlign: 'center',
    marginTop: Spacing.two,
  },
});
