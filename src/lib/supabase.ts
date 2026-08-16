import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

/**
 * True once .env has real Supabase credentials. Until the branch-vs-prod
 * decision in app-handoff/06-OPEN-DECISIONS.md is made, this stays false and
 * screens should show a "not connected" state instead of calling `supabase`.
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// AsyncStorage's web backend reads `window.localStorage`, which doesn't exist
// during Expo Router's server-side render — no-op there so `createClient()`
// doesn't crash the SSR pass.
const ssrSafeStorage = {
  getItem: (key: string) => (typeof window === 'undefined' ? Promise.resolve(null) : AsyncStorage.getItem(key)),
  setItem: (key: string, value: string) =>
    typeof window === 'undefined' ? Promise.resolve() : AsyncStorage.setItem(key, value),
  removeItem: (key: string) => (typeof window === 'undefined' ? Promise.resolve() : AsyncStorage.removeItem(key)),
};

export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder', {
  auth: {
    storage: ssrSafeStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
