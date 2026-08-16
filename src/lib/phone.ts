/** Normalizes common Russian phone input into E.164 (e.g. "8 (999) 123-45-67" -> "+79991234567"). */
export function normalizePhone(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, '');

  if (digits.startsWith('+')) {
    return digits;
  }
  if (digits.startsWith('8') && digits.length === 11) {
    return `+7${digits.slice(1)}`;
  }
  if (digits.startsWith('7') && digits.length === 11) {
    return `+${digits}`;
  }
  if (digits.length === 10) {
    return `+7${digits}`;
  }
  return `+${digits}`;
}

export function isPlausiblePhone(raw: string): boolean {
  return /^\+\d{10,15}$/.test(normalizePhone(raw));
}
