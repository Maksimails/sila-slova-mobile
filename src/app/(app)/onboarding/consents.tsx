import { router } from 'expo-router';

import { CheckboxRow } from '@/components/checkbox-row';
import { ExternalLink } from '@/components/external-link';
import { ThemedText } from '@/components/themed-text';
import { WizardScreen } from '@/components/wizard-screen';
import { useOnboarding } from '@/lib/onboarding-context';

export default function ConsentsScreen() {
  const { draft, update } = useOnboarding();

  const canProceed = !!draft.legalAccepted && !!draft.pdConsent;

  const handleNext = () => {
    if (!canProceed) return;
    router.push('/onboarding/avatar');
  };

  return (
    <WizardScreen
      title="Формальности"
      subtitle="Прежде чем начать, подтверди — это займёт секунду."
      onNext={handleNext}
      nextDisabled={!canProceed}
    >
      <CheckboxRow
        label="Принимаю публичную оферту и правила сервиса"
        checked={!!draft.legalAccepted}
        onToggle={() => update({ legalAccepted: !draft.legalAccepted })}
      />
      <CheckboxRow
        label="Согласен(-на) на обработку персональных данных"
        checked={!!draft.pdConsent}
        onToggle={() => update({ pdConsent: !draft.pdConsent })}
      />
      <CheckboxRow
        label="Согласен(-на), что публичные ставки видны другим пользователям (необязательно, можно включить позже)"
        checked={!!draft.publicConsent}
        onToggle={() => update({ publicConsent: !draft.publicConsent })}
      />
      <ExternalLink href="https://silaslova.tech/legal/">
        <ThemedText type="small" color="gold">
          Читать документы на silaslova.tech
        </ThemedText>
      </ExternalLink>
    </WizardScreen>
  );
}
