import { Redirect, Stack } from 'expo-router';

import { useAuth } from '@/lib/auth-context';
import { isSupabaseConfigured } from '@/lib/supabase';

export default function AppLayout() {
  const { session } = useAuth();

  // Without a backend there's no session to check — let screens render
  // unguarded so the UI stays previewable while task #5 is pending.
  if (!session && isSupabaseConfigured) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
