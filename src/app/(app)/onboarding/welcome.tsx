import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

const SLIDES = [
  {
    title: 'Почему мы бросаем начатое?',
    body: 'Мотивации хватает на неделю. Потом — тишина, оправдания, и снова «начну с понедельника».',
  },
  {
    title: 'Создай условия, где сложнее слиться',
    body: 'Запиши видео-обещание. Поставь на кон что-то стоящее. И доведи дело до конца.',
  },
  {
    title: 'Слово снова начинает что-то значить',
    body: 'А это фундамент уважения и успеха.',
  },
];

export default function WelcomeScreen() {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];
  const isLast = index === SLIDES.length - 1;

  const handleNext = () => {
    if (isLast) {
      router.push('/onboarding/quiz-1');
      return;
    }
    setIndex((i) => i + 1);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.dots}>
          {SLIDES.map((s, i) => (
            <ThemedView key={s.title} bg={i === index ? 'gold' : 'line'} style={styles.dot} />
          ))}
        </ThemedView>
        <ThemedView style={styles.content}>
          <ThemedText type="display" style={styles.title}>
            {slide.title}
          </ThemedText>
          <ThemedText type="body" color="textSecondary" style={styles.body}>
            {slide.body}
          </ThemedText>
        </ThemedView>
        <Button title={isLast ? 'Начать' : 'Дальше'} onPress={handleNext} />
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
    justifyContent: 'space-between',
  },
  dots: {
    flexDirection: 'row',
    gap: Spacing.one,
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.two,
  },
  title: {
    textAlign: 'center',
  },
  body: {
    textAlign: 'center',
  },
});
