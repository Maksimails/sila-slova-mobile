import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Radius, Spacing } from '@/constants/theme';

type Comment = { id: number; name: string; text: string };

const MOCK_COMMENTS: Comment[] = [
  { id: 1, name: 'Игорь', text: 'Красавчик, так держать' },
  { id: 2, name: 'Настя', text: 'А сколько подходов сегодня?' },
];

export default function CommentsScreen() {
  const { id, day } = useLocalSearchParams<{ id: string; day: string }>();
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    setComments((prev) => [...prev, { id: Date.now(), name: 'Ты', text: text.trim() }]);
    setText('');
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.title}>
          {day === '0' ? 'Комментарии к видео-клятве' : `Комментарии к дню ${day}`}
        </ThemedText>
        <FlatList
          data={comments}
          keyExtractor={(c) => String(c.id)}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.comment}>
              <ThemedText type="label">{item.name}</ThemedText>
              <ThemedText type="body">{item.text}</ThemedText>
            </View>
          )}
          ListEmptyComponent={
            <ThemedText type="small" color="textSecondary">
              Комментариев пока нет — id ставки {id}.
            </ThemedText>
          }
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.composer}
        >
          <TextField label="" placeholder="Написать комментарий" value={text} onChangeText={setText} />
          <Button title="Отправить" onPress={handleSend} disabled={!text.trim()} />
        </KeyboardAvoidingView>
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
    paddingHorizontal: Spacing.four,
  },
  title: {
    paddingVertical: Spacing.three,
  },
  list: {
    flex: 1,
  },
  listContent: {
    gap: Spacing.two,
  },
  comment: {
    borderRadius: Radius.medium,
    borderWidth: 1,
    borderColor: Colors.line,
    backgroundColor: Colors.bgElement,
    padding: Spacing.three,
    gap: Spacing.half,
  },
  composer: {
    gap: Spacing.two,
    paddingVertical: Spacing.three,
  },
});
