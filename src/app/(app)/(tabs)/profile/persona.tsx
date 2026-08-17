import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GradientTile } from '@/components/gradient-tile';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing, type GradientName } from '@/constants/theme';
import { type PersonaKey, PERSONAS } from '@/lib/personas';

const PERSONA_STYLE: Record<PersonaKey, { gradient: GradientName; icon: 'leaf-outline' | 'barbell-outline' | 'sparkles-outline' | 'heart-outline' }> = {
  confucius: { gradient: 'teal', icon: 'leaf-outline' },
  arnold: { gradient: 'red', icon: 'barbell-outline' },
  zina: { gradient: 'purple', icon: 'sparkles-outline' },
  angela: { gradient: 'pink', icon: 'heart-outline' },
};

export default function PersonaPickerScreen() {
  const [selected, setSelected] = useState<PersonaKey | undefined>();

  return (
    <ThemedView bg="screenDark" style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" color="bg">
          Выбери наставника
        </ThemedText>
        <ThemedText type="body" color="textOnDark" style={styles.subtitle}>
          Персонаж закрепляется за конкретной ставкой и может быть изменён в любой момент.
        </ThemedText>
        {PERSONAS.map((persona) => (
          <GradientTile
            key={persona.key}
            gradient={PERSONA_STYLE[persona.key].gradient}
            icon={PERSONA_STYLE[persona.key].icon}
            label={persona.nsfw ? `${persona.name} (18+)` : persona.name}
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
