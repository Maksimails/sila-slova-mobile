import { Stack } from 'expo-router';

import { Colors } from '@/constants/theme';
import { OnboardingProvider } from '@/lib/onboarding-context';

export default function OnboardingLayout() {
  return (
    <OnboardingProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.bg },
        }}
      />
    </OnboardingProvider>
  );
}
