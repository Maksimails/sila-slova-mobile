import { router, type Href } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';

import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { WizardScreen } from '@/components/wizard-screen';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { type BetType, useBetWizard } from '@/lib/bet-wizard-context';

const NEXT_ROUTE: Record<BetType, Href> = {
  result: '/new-bet/result-fields',
  habit: '/new-bet/habit-fields',
  quit: '/new-bet/quit-fields',
};

const MOCK_USERS = [
  { id: 2, name: 'Игорь' },
  { id: 3, name: 'Настя' },
  { id: 4, name: 'Дмитрий' },
];

export default function OpponentScreen() {
  const { draft, update } = useBetWizard();
  const [query, setQuery] = useState(draft.opponentName ?? '');

  const results = useMemo(
    () => (query.trim() ? MOCK_USERS.filter((u) => u.name.toLowerCase().includes(query.toLowerCase())) : []),
    [query],
  );

  const handleNext = () => {
    if (!query.trim()) return;
    update({ opponentName: query.trim() });
    router.push(NEXT_ROUTE[draft.type ?? 'result']);
  };

  return (
    <WizardScreen
      title="Кого вызываешь?"
      subtitle="Найди по имени или впиши, если человека ещё нет в приложении — перешлёшь ему ссылку сам(а)."
      onNext={handleNext}
      nextDisabled={!query.trim()}
    >
      <TextField label="Имя или @username" placeholder="Начни вводить..." value={query} onChangeText={setQuery} />
      {results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(u) => String(u.id)}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                setQuery(item.name);
                update({ opponentName: item.name, opponentUserId: item.id });
              }}
              style={styles.result}
            >
              <ThemedText type="body">{item.name}</ThemedText>
            </Pressable>
          )}
        />
      ) : null}
    </WizardScreen>
  );
}

const styles = StyleSheet.create({
  result: {
    borderRadius: Radius.medium,
    borderWidth: 1,
    borderColor: Colors.line,
    backgroundColor: Colors.bgElement,
    padding: Spacing.three,
    marginTop: Spacing.two,
  },
});
