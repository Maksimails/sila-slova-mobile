import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { useOnboarding } from '@/lib/onboarding-context';

export default function AvatarScreen() {
  const { draft, update } = useOnboarding();

  const initials = (draft.name ?? '?').trim().slice(0, 1).toUpperCase();

  const handlePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      update({ avatarUri: result.assets[0].uri });
    }
  };

  const handleDone = () => {
    router.replace('/(app)');
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title">Фото профиля</ThemedText>
        <ThemedText type="body" color="textSecondary">
          Можно позже — пока просто инициалы.
        </ThemedText>

        <ThemedView style={styles.avatarWrap}>
          {draft.avatarUri ? (
            <Image source={{ uri: draft.avatarUri }} style={styles.avatarImage} />
          ) : (
            <ThemedView bg="bgElement" style={styles.avatarPlaceholder}>
              <ThemedText type="display" color="gold">
                {initials}
              </ThemedText>
            </ThemedView>
          )}
        </ThemedView>

        <Button title="Загрузить фото" variant="secondary" onPress={handlePick} />
        <Button title="Готово" onPress={handleDone} />
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
  avatarWrap: {
    alignItems: 'center',
    marginVertical: Spacing.five,
  },
  avatarImage: {
    width: 128,
    height: 128,
    borderRadius: Radius.pill,
  },
  avatarPlaceholder: {
    width: 128,
    height: 128,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.line,
  },
});
