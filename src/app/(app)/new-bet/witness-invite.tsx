import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Share, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useBetWizard } from '@/lib/bet-wizard-context';

// Placeholder token — real token comes back from the server once task #5 lands.
const INVITE_LINK = 'https://silaslova.tech/witness/preview-token';
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(INVITE_LINK)}`;

export default function WitnessInviteScreen() {
  const { draft } = useBetWizard();

  const handleShare = () => {
    Share.share({ message: `Будь моим свидетелем в «${draft.goal ?? 'моей ставке'}»: ${INVITE_LINK}` });
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.center}>
          Позови свидетеля
        </ThemedText>
        <ThemedText type="body" color="textSecondary" style={styles.center}>
          Он будет раз в неделю подтверждать, что ты держишься.
        </ThemedText>

        <Image source={{ uri: QR_URL }} style={styles.qr} contentFit="contain" />

        <Button title="Поделиться ссылкой" onPress={handleShare} />
        <Button title="Готово" variant="secondary" onPress={() => router.replace('/')} />
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
    justifyContent: 'center',
    gap: Spacing.three,
  },
  center: {
    textAlign: 'center',
  },
  qr: {
    width: 240,
    height: 240,
    alignSelf: 'center',
    marginVertical: Spacing.three,
  },
});
