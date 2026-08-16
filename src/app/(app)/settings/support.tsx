import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

export default function SupportScreen() {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.centered}>
          <ThemedText type="title" style={styles.center}>
            Сообщение отправлено
          </ThemedText>
          <ThemedText type="body" color="textSecondary" style={styles.center}>
            Ответим в ближайшее время.
          </ThemedText>
        </SafeAreaView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title">Поддержка</ThemedText>
        <ThemedText type="body" color="textSecondary">
          Опиши проблему — ответим напрямую.
        </ThemedText>
        <TextField
          label="Сообщение"
          placeholder="Что случилось?"
          multiline
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Отправить" onPress={() => setSent(true)} disabled={!message.trim()} />
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
  centered: {
    flex: 1,
    padding: Spacing.four,
    justifyContent: 'center',
    gap: Spacing.two,
  },
  center: {
    textAlign: 'center',
  },
});
