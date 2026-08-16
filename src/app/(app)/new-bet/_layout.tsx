import { Stack } from 'expo-router';

import { Colors } from '@/constants/theme';
import { BetWizardProvider } from '@/lib/bet-wizard-context';

export default function NewBetLayout() {
  return (
    <BetWizardProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.bg },
        }}
      />
    </BetWizardProvider>
  );
}
