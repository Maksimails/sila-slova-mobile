import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { useBetWizard } from '@/lib/bet-wizard-context';

const MAX_DURATION_SECONDS = 120;

export default function VideoScreen() {
  const { draft, update } = useBetWizard();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  const goToReview = (uri: string) => {
    update({ videoUri: uri });
    router.push('/new-bet/video-review');
  };

  const handleRecordPress = async () => {
    if (isRecording) {
      cameraRef.current?.stopRecording();
      return;
    }
    setIsRecording(true);
    const result = await cameraRef.current?.recordAsync({ maxDuration: MAX_DURATION_SECONDS });
    setIsRecording(false);
    if (result?.uri) {
      goToReview(result.uri);
    }
  };

  const handlePickFile = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['videos'],
      videoMaxDuration: MAX_DURATION_SECONDS,
    });
    if (!result.canceled && result.assets[0]) {
      goToReview(result.assets[0].uri);
    }
  };

  const hasCameraAccess = cameraPermission?.granted && microphonePermission?.granted;

  if (!hasCameraAccess) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.permissionContainer}>
          <ThemedText type="title">Нужен доступ к камере</ThemedText>
          <ThemedText type="body" color="textSecondary" style={styles.permissionBody}>
            Видео-клятва записывается прямо в приложении — «Я даю слово, что {draft.goal ?? '...'}».
          </ThemedText>
          <Button
            title="Разрешить камеру и микрофон"
            onPress={async () => {
              await requestCameraPermission();
              await requestMicrophonePermission();
            }}
            style={styles.permissionButton}
          />
          <Button title="Выбрать видео из галереи" variant="secondary" onPress={handlePickFile} />
        </SafeAreaView>
      </ThemedView>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing="front" mode="video" />
      <SafeAreaView style={styles.overlay}>
        {draft.mode === 'public' ? (
          <View style={styles.warningBanner}>
            <ThemedText type="small" style={styles.onCameraText}>
              Это видео попадёт в публичную ленту — отправка означает согласие на публикацию.
            </ThemedText>
          </View>
        ) : null}

        <View style={styles.oathCard}>
          <ThemedText type="body" style={styles.onCameraText}>
            «Я даю слово, что {draft.goal ?? '...'}»
          </ThemedText>
        </View>

        <View style={styles.controls}>
          <Pressable
            accessibilityRole="button"
            onPress={handleRecordPress}
            style={[styles.recordButton, isRecording && styles.recordButtonActive]}
          />
          <ThemedText type="small" style={styles.onCameraText}>
            {isRecording ? 'Идёт запись — до 2 минут' : 'Нажми, чтобы начать запись'}
          </ThemedText>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  permissionBody: {
    marginBottom: Spacing.two,
  },
  permissionButton: {
    marginBottom: Spacing.one,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    padding: Spacing.four,
  },
  warningBanner: {
    backgroundColor: 'rgba(192,57,47,0.85)',
    borderRadius: Radius.medium,
    padding: Spacing.three,
  },
  oathCard: {
    backgroundColor: 'rgba(17,17,19,0.75)',
    borderRadius: Radius.medium,
    padding: Spacing.three,
  },
  // Camera chrome sits on a live viewfinder, not the app's light background —
  // always light text/controls here regardless of app theme, like any native
  // camera UI.
  onCameraText: {
    color: '#ffffff',
  },
  controls: {
    alignItems: 'center',
    gap: Spacing.two,
  },
  recordButton: {
    width: 72,
    height: 72,
    borderRadius: Radius.pill,
    borderWidth: 4,
    borderColor: '#ffffff',
    backgroundColor: Colors.crimson,
  },
  recordButtonActive: {
    borderRadius: Radius.small,
    backgroundColor: '#8f261d',
  },
});
