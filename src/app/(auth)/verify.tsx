import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { supabase } from '@/lib/supabase';

export default function VerifyScreen() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleVerify = async () => {
    if (code.trim().length < 4) {
      setError('Введи код из смс');
      return;
    }
    setError(undefined);
    setLoading(true);
    const { error: verifyError } = await supabase.auth.verifyOtp({
      phone,
      token: code.trim(),
      type: 'sms',
    });
    setLoading(false);
    if (verifyError) {
      setError(verifyError.message);
      return;
    }
    // AuthProvider picks up the new session via onAuthStateChange;
    // the (auth) layout redirects to /(app) automatically.
  };

  const handleResend = async () => {
    setResending(true);
    setError(undefined);
    const { error: resendError } = await supabase.auth.signInWithOtp({ phone });
    setResending(false);
    if (resendError) {
      setError(resendError.message);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.form}
        >
          <ThemedText type="title">Код из смс</ThemedText>
          <ThemedText type="body" color="textSecondary" style={styles.subtitle}>
            Отправили код на {phone}
          </ThemedText>

          <TextField
            label="Код"
            placeholder="123456"
            keyboardType="number-pad"
            autoComplete="sms-otp"
            textContentType="oneTimeCode"
            value={code}
            onChangeText={setCode}
            error={error}
          />

          <Button title="Подтвердить" onPress={handleVerify} loading={loading} style={styles.submit} />
          <Button
            title="Отправить код ещё раз"
            variant="secondary"
            onPress={handleResend}
            loading={resending}
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
  submit: {
    marginTop: Spacing.two,
  },
});
