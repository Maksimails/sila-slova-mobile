import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { OptionCard } from '@/components/option-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { type PersonaKey, PERSONAS } from '@/lib/personas';

export default function PersonaPickerScreen() {
  const [selected, setSelected] = useState<PersonaKey | undefined>();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title">Выбери наставника</ThemedText>
        <ThemedText type="body" color="textSecondary" style={styles.subtitle}>
          Персонаж закрепляется за конкретной ставкой и может быть изменён в любой момент.
        </ThemedText>
        {PERSONAS.map((persona) => (
          <OptionCard
            key={persona.key}
            title={persona.nsfw ? `${persona.name} (18+)` : persona.name}
            description={persona.voice}
            selected={selected === persona.key}
            onPress={() => setSelected(persona.key)}
          />
        ))}
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
    padding: Spacing.four,
    gap: Spacing.three,
  },
  subtitle: {
    marginBottom: Spacing.one,
  },
});
