import { type Bet, type Challenge, type Report } from '@/types/bet';

/**
 * Placeholder data so screens are testable before task #5 (Supabase wiring)
 * lands. Shaped to match the live `bets`/`reports`/`challenges` schema —
 * swapping this for real queries later is mechanical, not a redesign.
 */

export const MOCK_BETS: Bet[] = [
  {
    id: 1,
    userId: 1,
    mode: 'public',
    type: 'habit',
    goal: 'Спортзал 4 раза в неделю',
    durationDays: 40,
    startDate: '2026-07-15',
    status: 'active',
    stake: 1000,
    currency: 'RUB',
    persona: 'arnold',
    reportedToday: false,
    dayN: 24,
    commentsCount: 6,
    supportCount: 31,
  },
  {
    id: 2,
    userId: 1,
    mode: 'private',
    type: 'result',
    goal: 'Скинуть 10 кг к 1 октября',
    pointA: '93 кг',
    durationDays: 60,
    startDate: '2026-07-01',
    status: 'active',
    stake: 0,
    currency: 'RUB',
    persona: 'zina',
    reportedToday: true,
    dayN: 38,
  },
  {
    id: 3,
    userId: 1,
    mode: 'private',
    type: 'quit',
    goal: 'Бросить курить',
    durationDays: 90,
    startDate: '2026-05-01',
    status: 'done',
    stake: 5000,
    currency: 'RUB',
    persona: 'confucius',
    reportedToday: false,
    dayN: 90,
    commentsCount: 14,
    supportCount: 58,
  },
  {
    id: 4,
    userId: 1,
    mode: 'public',
    type: 'quit',
    goal: 'Не пить алкоголь 90 дней',
    durationDays: 90,
    startDate: '2026-04-01',
    status: 'failed',
    stake: 3000,
    currency: 'RUB',
    persona: 'zina',
    reportedToday: false,
    dayN: 12,
  },
  {
    id: 5,
    userId: 1,
    mode: 'private',
    type: 'habit',
    goal: '30 отжиманий каждый день',
    durationDays: 30,
    startDate: '2026-07-20',
    status: 'active',
    stake: 500,
    currency: 'RUB',
    persona: 'arnold',
    challengeId: 1,
    reportedToday: true,
    dayN: 11,
    commentsCount: 2,
    supportCount: 9,
  },
  {
    id: 6,
    userId: 1,
    mode: 'public',
    type: 'result',
    goal: 'Пробежать марафон без остановки',
    pointA: '0 км без остановки',
    durationDays: 120,
    startDate: '2026-02-01',
    status: 'done',
    stake: 10000,
    currency: 'RUB',
    persona: 'confucius',
    reportedToday: false,
    dayN: 120,
    commentsCount: 27,
    supportCount: 143,
  },
];

export const MOCK_REPORTS: Report[] = [
  { id: 1, betId: 1, day: 22, date: '2026-08-06', content: 'Ноги сегодня, тяжело но сделал' },
  { id: 2, betId: 1, day: 23, date: '2026-08-07', mediaType: 'photo', mediaUrl: 'https://picsum.photos/seed/report23/600/800' },
  { id: 3, betId: 1, day: 24, date: '2026-08-08', mediaType: 'photo', mediaUrl: 'https://picsum.photos/seed/report24/600/800' },
  { id: 4, betId: 6, day: 118, date: '2026-05-28', mediaType: 'photo', mediaUrl: 'https://picsum.photos/seed/marathon1/600/800' },
  { id: 5, betId: 6, day: 119, date: '2026-05-29', mediaType: 'photo', mediaUrl: 'https://picsum.photos/seed/marathon2/600/800' },
  { id: 6, betId: 6, day: 120, date: '2026-05-30', mediaType: 'photo', mediaUrl: 'https://picsum.photos/seed/marathon3/600/800' },
  { id: 7, betId: 3, day: 88, date: '2026-07-27', mediaType: 'photo', mediaUrl: 'https://picsum.photos/seed/quit1/600/800' },
  { id: 8, betId: 5, day: 10, date: '2026-07-30', mediaType: 'photo', mediaUrl: 'https://picsum.photos/seed/pushups/600/800' },
];

export const MOCK_CHALLENGE: Challenge = {
  id: 1,
  goal: '30 отжиманий каждый день',
  type: 'habit',
  durationDays: 30,
  startDate: '2026-07-20',
  status: 'active',
  stake: 500,
  sides: [
    { userId: 1, name: 'Ты', betId: 5, reportedToday: true },
    { userId: 2, name: 'Игорь', betId: 7, reportedToday: false },
  ],
};

export type MockPerson = { id: number; name: string; mutual: boolean };

export const MOCK_FOLLOWERS: MockPerson[] = [
  { id: 2, name: 'Игорь', mutual: true },
  { id: 3, name: 'Настя', mutual: true },
  { id: 4, name: 'Дмитрий', mutual: false },
  { id: 5, name: 'Оля', mutual: true },
];

export const MOCK_FOLLOWING: MockPerson[] = [
  { id: 2, name: 'Игорь', mutual: true },
  { id: 3, name: 'Настя', mutual: true },
  { id: 6, name: 'Саша', mutual: false },
];
