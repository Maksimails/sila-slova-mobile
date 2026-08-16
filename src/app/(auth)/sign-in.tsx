import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { isPlausiblePhone, normalizePhone } from '@/lib/phone';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

export default function SignInScreen() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!isPlausiblePhone(phone)) {
      setError('Проверь номер телефона');
      return;
    }
    setError(undefined);
    setLoading(true);
    const normalized = normalizePhone(phone);
    const { error: signInError } = await supabase.auth.signInWithOtp({ phone: normalized });
    setLoading(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    router.push({ pathname: '/(auth)/verify', params: { phone: normalized } });
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.form}
        >
          <ThemedText type="title">Вход</ThemedText>
          <ThemedText type="body" color="textSecondary" style={styles.subtitle}>
            Номер телефона для входа
          </ThemedText>

          {!isSupabaseConfigured && (
            <ThemedText type="small" color="crimson" style={styles.notConfigured}>
              Backend ещё не подключён (EXPO_PUBLIC_SUPABASE_URL/ANON_KEY пусты в .env)
            </ThemedText>
          )}

          <TextField
            label="Телефон"
            placeholder="+7 999 123-45-67"
            keyboardType="phone-pad"
            autoComplete="tel"
            textContentType="telephoneNumber"
            value={phone}
            onChangeText={setPhone}
            error={error}
          />

          <Button
            title="Получить код"
            onPress={handleSubmit}
            loading={loading}
            disabled={!isSupabaseConfigured}
            style={styles.submit}
          />
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
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
  },
  form: {
    gap: Spacing.three,
  },
  subtitle: {
    marginBottom: Spacing.two,
  },
  notConfigured: {
    marginBottom: Spacing.two,
  },
  submit: {
    marginTop: Spacing.two,
  },
});
