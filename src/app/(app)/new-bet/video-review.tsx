import { router } from 'expo-router';
import { VideoView, useVideoPlayer } from 'expo-video';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useBetWizard } from '@/lib/bet-wizard-context';

export default function VideoReviewScreen() {
  const { draft, update } = useBetWizard();
  const player = useVideoPlayer(draft.videoUri ?? null, (p) => {
    p.loop = true;
    p.play();
  });

  const handleRetake = () => {
    update({ videoUri: undefined });
    router.back();
  };

  const handleNext = () => {
    router.push('/new-bet/stake');
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.title}>
          Проверь клятву
        </ThemedText>
        <VideoView player={player} style={styles.video} contentFit="cover" />
        <View style={styles.actions}>
          <Button title="Всё хорошо, дальше" onPress={handleNext} />
          <Button title="Переснять" variant="secondary" onPress={handleRetake} />
        </View>
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
  title: {
    textAlign: 'center',
  },
  video: {
    flex: 1,
    borderRadius: Spacing.three,
  },
  actions: {
    gap: Spacing.two,
  },
});
