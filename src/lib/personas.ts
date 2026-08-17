export type PersonaKey = 'confucius' | 'arnold' | 'zina' | 'angela';

export const PERSONAS: { key: PersonaKey; name: string; voice: string; nsfw?: boolean }[] = [
  { key: 'confucius', name: 'Конфуций', voice: 'Мудрец-самурай. Спокойный, метафоры клинка и воды.' },
  { key: 'arnold', name: 'Физрук Арнольд', voice: 'Качок-дворовый авторитет. Прямой, без мата.' },
  { key: 'zina', name: 'Баба Зина', voice: 'Бабушка-йода. Сарказм, инверсия слов.', nsfw: true },
  { key: 'angela', name: 'Анжела Фокс', voice: 'Страстная и преданная. Тон зависит от твоего пола.' },
];
