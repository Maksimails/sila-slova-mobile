import { type ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

type WizardScreenProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onNext: () => void;
  nextTitle?: string;
  nextDisabled?: boolean;
};

export function WizardScreen({
  title,
  subtitle,
  children,
  onNext,
  nextTitle = 'Далее',
  nextDisabled,
}: WizardScreenProps) {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <ThemedText type="title">{title}</ThemedText>
          {subtitle ? (
            <ThemedText type="body" color="textSecondary" style={styles.subtitle}>
              {subtitle}
            </ThemedText>
          ) : null}
          <View style={styles.content}>{children}</View>
        </ScrollView>
        <View style={styles.footer}>
          <Button title={nextTitle} onPress={onNext} disabled={nextDisabled} />
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
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
  },
  subtitle: {
    marginTop: Spacing.one,
  },
  content: {
    marginTop: Spacing.four,
    gap: Spacing.three,
  },
  footer: {
    padding: Spacing.four,
  },
});
