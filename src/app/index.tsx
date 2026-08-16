import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';

import { LoadingScreen } from '@/components/loading-screen';
import { useAuth } from '@/lib/auth-context';

// A deliberate minimum splash beat, like a native app's launch screen —
// without it, static web rendering paints the destination page instantly
// and the loading screen never has a chance to be seen.
const MIN_BOOT_MS = 1400;

export default function Index() {
  const { session, isLoading: isAuthLoading } = useAuth();
  const [bootDelayDone, setBootDelayDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setBootDelayDone(true), MIN_BOOT_MS);
    return () => clearTimeout(timer);
  }, []);

  if (isAuthLoading || !bootDelayDone) {
    return <LoadingScreen />;
  }

  // Always show the real landing page first — the (auth)/welcome screen
  // itself decides where "Дать слово" goes next (skipping the dead-end
  // phone sign-in specifically when there's no backend, see task #5),
  // rather than this route skipping the whole welcome+quiz sequence.
  // '/' is this very file — redirecting to it would be a self-redirect
  // no-op, so the signed-in path must target the fully-qualified nested
  // tabs route instead.
  return <Redirect href={session ? '/(app)/(tabs)' : '/(auth)/welcome'} />;
}
