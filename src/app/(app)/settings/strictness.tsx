import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GradientTile } from '@/components/gradient-tile';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

type StrictnessLevel = 'honor' | 'harsh';

export default function StrictnessScreen() {
  const [level, setLevel] = useState<StrictnessLevel>('honor');

  return (
    <ThemedView bg="screenDark" style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" color="bg">
          Уровень строгости
        </ThemedText>
        <ThemedText type="body" color="textOnDark" style={styles.subtitle}>
          Как персонажи и приложение говорят с тобой о провалах. Можно сменить в любой момент.
        </ThemedText>

        <GradientTile
          gradient="teal"
          icon="shield-checkmark-outline"
          label="Уважение"
          description="По умолчанию. Прямо, но без стыда и угроз — провал это данные, не приговор."
          selected={level === 'honor'}
          onPress={() => setLevel('honor')}
        />
        <GradientTile
          gradient="red"
          icon="flame-outline"
          label="Жёстко"
          description="Более жёсткий тон и более заметные последствия провала. Включаешь сам(-а), выключаешь тоже сам(-а)."
          selected={level === 'harsh'}
          onPress={() => setLevel('harsh')}
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
    padding: Spacing.four,
    gap: Spacing.three,
  },
  subtitle: {
    marginBottom: Spacing.one,
  },
});
