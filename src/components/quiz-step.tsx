import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GradientTile } from '@/components/gradient-tile';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, GradientOrder, Spacing } from '@/constants/theme';

type QuizOption<T extends string> = {
  value: T;
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
};

type QuizStepProps<T extends string> = {
  step: number;
  total: number;
  title: string;
  options: readonly QuizOption<T>[];
  selected?: T;
  onSelect: (value: T) => void;
  onNext: () => void;
  onSkip: () => void;
};

export function QuizStep<T extends string>({
  step,
  total,
  title,
  options,
  selected,
  onSelect,
  onNext,
  onSkip,
}: QuizStepProps<T>) {
  return (
    <ThemedView bg="screenDark" style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable accessibilityRole="button" onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color="#ffffff" />
          </Pressable>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${(step / total) * 100}%` }]} />
          </View>
        </View>

        <ThemedText type="small" color="textOnDark" style={styles.stepLabel}>
          Вопрос {step} из {total}
        </ThemedText>
        <ThemedText type="title" color="bg" style={styles.title}>
          {title}
        </ThemedText>

        <View style={styles.options}>
          {options.map((option, index) => (
            <GradientTile
              key={option.value}
              gradient={GradientOrder[index % GradientOrder.length]}
              number={index + 1}
              icon={option.icon}
              label={option.label}
              selected={selected === option.value}
              onPress={() => {
                onSelect(option.value);
                onNext();
              }}
            />
          ))}
        </View>

        <Pressable accessibilityRole="button" onPress={onSkip} style={styles.skip}>
          <ThemedText type="small" color="textOnDark">
            Пропустить вопрос
          </ThemedText>
        </Pressable>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  track: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.15)',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: Colors.gold,
  },
  stepLabel: {
    marginTop: Spacing.four,
  },
  title: {
    marginTop: Spacing.one,
    marginBottom: Spacing.five,
  },
  options: {
    gap: Spacing.four,
  },
  skip: {
    marginTop: Spacing.five,
    alignSelf: 'center',
  },
});
