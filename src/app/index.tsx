import { Redirect } from 'expo-router';

import { useAuth } from '@/lib/auth-context';

export default function Index() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  // Always show the real landing page first — the (auth)/welcome screen
  // itself decides where "Дать слово" goes next (skipping the dead-end
  // phone sign-in specifically when there's no backend, see task #5),
  // rather than this route skipping the whole welcome+quiz sequence.
  return <Redirect href={session ? '/(app)' : '/(auth)/welcome'} />;
}
