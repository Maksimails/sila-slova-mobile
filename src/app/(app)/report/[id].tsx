import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { Chip } from '@/components/chip';
import { OptionCard } from '@/components/option-card';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing } from '@/constants/theme';
import { isSupabaseConfigured } from '@/lib/supabase';

type ProofKind = 'photo' | 'video' | 'text' | 'self' | 'gps';

const KIND_LABELS: Record<ProofKind, string> = {
  photo: 'Фото',
  video: 'Видео',
  text: 'Текст',
  self: 'Самоотчёт',
  gps: 'GPS-отметка',
};

export default function ReportScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [kind, setKind] = useState<ProofKind>('photo');
  const [text, setText] = useState('');
  const [mediaUri, setMediaUri] = useState<string | undefined>();
  const [selfConfirmed, setSelfConfirmed] = useState<boolean | undefined>();
  const [coords, setCoords] = useState<Location.LocationObjectCoords | undefined>();
  const [locationError, setLocationError] = useState<string | undefined>();
  const [locating, setLocating] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit =
    kind === 'text'
      ? text.trim().length > 0
      : kind === 'self'
        ? selfConfirmed !== undefined
        : kind === 'gps'
          ? !!coords
          : !!mediaUri;

  const handlePickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: kind === 'video' ? ['videos'] : ['images'],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setMediaUri(result.assets[0].uri);
    }
  };

  const handleCheckIn = async () => {
    setLocating(true);
    setLocationError(undefined);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setLocating(false);
      setLocationError('Нужен доступ к геопозиции для отметки.');
      return;
    }
    const position = await Location.getCurrentPositionAsync({});
    setCoords(position.coords);
    setLocating(false);
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.centeredSafeArea}>
          <ThemedText type="title" style={styles.centerText}>
            Отчёт принят
          </ThemedText>
          <ThemedText type="body" color="textSecondary" style={styles.centerText}>
            Увидимся завтра.
          </ThemedText>
          <Button title="К ставке" onPress={() => router.replace(`/bet/${id}`)} />
        </SafeAreaView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title">Отчёт за сегодня</ThemedText>

        <View style={styles.chipRow}>
          {(Object.keys(KIND_LABELS) as ProofKind[]).map((k) => (
            <Chip key={k} label={KIND_LABELS[k]} selected={kind === k} onPress={() => setKind(k)} />
          ))}
        </View>

        {kind === 'text' && (
          <TextField
            label="Что сегодня сделал(-а)"
            placeholder="Коротко опиши"
            multiline
            value={text}
            onChangeText={setText}
          />
        )}

        {(kind === 'photo' || kind === 'video') && (
          <View style={styles.mediaSection}>
            {mediaUri && kind === 'photo' ? (
              <Image source={{ uri: mediaUri }} style={styles.preview} />
            ) : (
              <ThemedText type="small" color="textSecondary">
                {mediaUri ? 'Видео выбрано' : 'Пруф не выбран'}
              </ThemedText>
            )}
            <Button
              title={mediaUri ? 'Выбрать другое' : `Выбрать ${kind === 'photo' ? 'фото' : 'видео'}`}
              variant="secondary"
              onPress={handlePickMedia}
            />
          </View>
        )}

        {kind === 'self' && (
          <View style={styles.mediaSection}>
            <ThemedText type="small" color="textSecondary">
              Без фото и видео — просто скажи честно. Свидетель и история дней всё равно видны другим.
            </ThemedText>
            <OptionCard title="Да, сделал(-а)" selected={selfConfirmed === true} onPress={() => setSelfConfirmed(true)} />
            <OptionCard title="Нет, не сделал(-а)" selected={selfConfirmed === false} onPress={() => setSelfConfirmed(false)} />
          </View>
        )}

        {kind === 'gps' && (
          <View style={styles.mediaSection}>
            <ThemedText type="small" color="textSecondary">
              Отметься на месте, чтобы подтвердить, что ты там был(-а).
            </ThemedText>
            {coords ? (
              <View style={styles.coordsCard}>
                <ThemedText type="label" color="teal">
                  Отметка получена
                </ThemedText>
                <ThemedText type="small" color="textSecondary">
                  {coords.latitude.toFixed(5)}, {coords.longitude.toFixed(5)}
                </ThemedText>
              </View>
            ) : null}
            {locationError ? (
              <ThemedText type="small" color="crimson">
                {locationError}
              </ThemedText>
            ) : null}
            <Button
              title={coords ? 'Отметиться заново' : 'Отметиться на месте'}
              variant="secondary"
              onPress={handleCheckIn}
              loading={locating}
            />
          </View>
        )}

        {!isSupabaseConfigured ? (
          <ThemedText type="small" color="crimson">
            Backend ещё не подключён — отчёт пока не сохранится по-настоящему.
          </ThemedText>
        ) : null}

        <Button title="Отправить" onPress={handleSubmit} disabled={!canSubmit} style={styles.submit} />
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
  centeredSafeArea: {
    flex: 1,
    padding: Spacing.four,
    justifyContent: 'center',
    gap: Spacing.two,
  },
  centerText: {
    textAlign: 'center',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  mediaSection: {
    gap: Spacing.two,
  },
  preview: {
    width: '100%',
    height: 280,
    borderRadius: Radius.medium,
  },
  coordsCard: {
    borderRadius: Radius.medium,
    borderWidth: 1,
    borderColor: 'rgba(47,181,135,0.4)',
    backgroundColor: 'rgba(47,181,135,0.08)',
    padding: Spacing.three,
    gap: Spacing.half,
  },
  submit: {
    marginTop: Spacing.two,
  },
});
