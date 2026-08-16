import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { useBetWizard } from '@/lib/bet-wizard-context';
import { isSupabaseConfigured } from '@/lib/supabase';

const TYPE_LABELS = { result: 'Результат', habit: 'Привычка', quit: 'Аскеза' } as const;

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <ThemedText type="small" color="textSecondary">
        {label}
      </ThemedText>
      <ThemedText type="body">{value}</ThemedText>
    </View>
  );
}

export default function ReviewScreen() {
  const { draft, reset } = useBetWizard();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (draft.type === 'quit') {
      router.push('/new-bet/witness-invite');
      return;
    }
    setSubmitted(true);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title">Проверь и вперёд</ThemedText>

        <View style={styles.card}>
          <SummaryRow label="Тип" value={draft.kind === 'challenge' ? 'Вызов' : 'Соло'} />
          {draft.mode ? (
            <SummaryRow label="Видимость" value={draft.mode === 'public' ? 'Публично' : 'Лично'} />
          ) : null}
          <SummaryRow label="Формат" value={draft.type ? TYPE_LABELS[draft.type] : '—'} />
          <SummaryRow label="Цель" value={draft.goal ?? '—'} />
          {draft.durationDays ? <SummaryRow label="Срок" value={`${draft.durationDays} дн.`} /> : null}
          {draft.motivation ? <SummaryRow label="Ради чего" value={draft.motivation} /> : null}
          {draft.witnessTg ? <SummaryRow label="Свидетель" value={draft.witnessTg} /> : null}
          <SummaryRow label="Ставка" value={draft.stake ? String(draft.stake) : 'Без ставки'} />
          <SummaryRow label="Видео-клятва" value={draft.videoUri ? 'записана' : 'нет'} />
        </View>

        {!isSupabaseConfigured ? (
          <ThemedText type="small" color="crimson">
            Backend ещё не подключён — отправка пока ничего не сохраняет.
          </ThemedText>
        ) : null}

        {submitted ? (
          <ThemedText type="body" color="gold">
            Черновик готов. Как только backend будет подключён, это создаст настоящую ставку.
          </ThemedText>
        ) : (
          <Button title="Дать слово" onPress={handleSubmit} />
        )}
        {submitted ? <Button title="Начать заново" variant="secondary" onPress={reset} /> : null}
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
  card: {
    borderRadius: Radius.large,
    borderWidth: 1,
    borderColor: Colors.line,
    backgroundColor: Colors.bgElement,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
});
