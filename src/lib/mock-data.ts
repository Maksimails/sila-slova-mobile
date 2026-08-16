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

/**
 * Other people's public profiles, bets, and reports — powers the Feed,
 * Discover, and read-only person-profile screens. Same shape as the
 * current user's own MOCK_BETS/MOCK_REPORTS above.
 */

export type MockPersonProfile = {
  id: number;
  name: string;
  trustLevel: number;
  followersCount: number;
  followingCount: number;
};

export const MOCK_PEOPLE: MockPersonProfile[] = [
  { id: 2, name: 'Игорь', trustLevel: 74, followersCount: 128, followingCount: 56 },
  { id: 3, name: 'Настя', trustLevel: 91, followersCount: 340, followingCount: 120 },
  { id: 4, name: 'Дмитрий', trustLevel: 58, followersCount: 40, followingCount: 88 },
  { id: 5, name: 'Оля', trustLevel: 83, followersCount: 210, followingCount: 95 },
  { id: 6, name: 'Саша', trustLevel: 67, followersCount: 76, followingCount: 60 },
];

export const MOCK_OTHER_BETS: Bet[] = [
  { id: 101, userId: 3, mode: 'public', type: 'quit', goal: 'Бросить курить', durationDays: 90, startDate: '2026-05-01', status: 'active', stake: 5000, currency: 'RUB', reportedToday: true, dayN: 60, commentsCount: 22, supportCount: 87 },
  { id: 102, userId: 3, mode: 'public', type: 'habit', goal: 'Йога каждое утро', durationDays: 60, startDate: '2026-06-01', status: 'active', stake: 1500, currency: 'RUB', reportedToday: true, dayN: 30, commentsCount: 9, supportCount: 44 },
  { id: 103, userId: 3, mode: 'public', type: 'result', goal: 'Пробежать полумарафон', pointA: 'Не бегала', durationDays: 100, startDate: '2026-03-01', status: 'done', stake: 4000, currency: 'RUB', reportedToday: false, dayN: 100, commentsCount: 31, supportCount: 156 },
  { id: 104, userId: 2, mode: 'public', type: 'habit', goal: 'Спортзал 4 раза в неделю', durationDays: 45, startDate: '2026-07-10', status: 'active', stake: 2000, currency: 'RUB', reportedToday: false, dayN: 18, commentsCount: 5, supportCount: 29 },
  { id: 105, userId: 2, mode: 'public', type: 'quit', goal: 'Без фастфуда 60 дней', durationDays: 60, startDate: '2026-06-20', status: 'active', stake: 1000, currency: 'RUB', reportedToday: true, dayN: 39, commentsCount: 3, supportCount: 18 },
  { id: 106, userId: 5, mode: 'public', type: 'result', goal: 'Подтянуться 15 раз подряд', pointA: '0 раз', durationDays: 90, startDate: '2026-05-15', status: 'active', stake: 3000, currency: 'RUB', reportedToday: true, dayN: 63, commentsCount: 14, supportCount: 72 },
  { id: 107, userId: 5, mode: 'public', type: 'habit', goal: 'Читать 20 страниц в день', durationDays: 30, startDate: '2026-07-25', status: 'active', stake: 0, currency: 'RUB', reportedToday: false, dayN: 22, commentsCount: 2, supportCount: 11 },
  { id: 108, userId: 4, mode: 'public', type: 'quit', goal: 'Без алкоголя 30 дней', durationDays: 30, startDate: '2026-07-01', status: 'failed', stake: 1000, currency: 'RUB', reportedToday: false, dayN: 9, commentsCount: 6, supportCount: 8 },
  { id: 109, userId: 6, mode: 'public', type: 'result', goal: 'Скинуть 8 кг', pointA: '82 кг', durationDays: 80, startDate: '2026-05-20', status: 'active', stake: 2500, currency: 'RUB', reportedToday: true, dayN: 55, commentsCount: 19, supportCount: 63 },
];

export const MOCK_OTHER_REPORTS: Report[] = [
  { id: 301, betId: 101, day: 60, date: '2026-08-14', mediaType: 'photo', mediaUrl: 'https://picsum.photos/seed/nastya-quit-60/800/1000', content: '60 дней без сигарет. Держусь.' },
  { id: 302, betId: 102, day: 30, date: '2026-08-15', mediaType: 'photo', mediaUrl: 'https://picsum.photos/seed/nastya-yoga-30/800/1000' },
  { id: 303, betId: 103, day: 100, date: '2026-06-08', mediaType: 'photo', mediaUrl: 'https://picsum.photos/seed/nastya-run-100/800/1000', content: 'Финишная черта. Получилось.' },
  { id: 304, betId: 104, day: 18, date: '2026-07-28', mediaType: 'photo', mediaUrl: 'https://picsum.photos/seed/igor-gym-18/800/1000' },
  { id: 305, betId: 105, day: 39, date: '2026-08-15', mediaType: 'photo', mediaUrl: 'https://picsum.photos/seed/igor-food-39/800/1000', content: 'Ещё один день без фастфуда.' },
  { id: 306, betId: 106, day: 63, date: '2026-08-15', mediaType: 'photo', mediaUrl: 'https://picsum.photos/seed/olya-pullups-63/800/1000', content: '12 подтягиваний сегодня, почти у цели.' },
  { id: 307, betId: 107, day: 22, date: '2026-08-13', mediaType: 'photo', mediaUrl: 'https://picsum.photos/seed/olya-read-22/800/1000' },
  { id: 308, betId: 109, day: 55, date: '2026-08-15', mediaType: 'photo', mediaUrl: 'https://picsum.photos/seed/sasha-weight-55/800/1000', content: 'Минус 8 кг. Цель достигнута.' },
];

export type FeedItem = {
  id: number;
  personId: number;
  betId: number;
  reportId: number;
  reactions: { stars: number; biceps: number; hearts: number };
};

export const MOCK_FEED_ITEMS: FeedItem[] = [
  { id: 1, personId: 3, betId: 101, reportId: 301, reactions: { stars: 34, biceps: 41, hearts: 22 } },
  { id: 2, personId: 5, betId: 106, reportId: 306, reactions: { stars: 19, biceps: 28, hearts: 9 } },
  { id: 3, personId: 2, betId: 105, reportId: 305, reactions: { stars: 6, biceps: 12, hearts: 3 } },
  { id: 4, personId: 6, betId: 109, reportId: 308, reactions: { stars: 51, biceps: 37, hearts: 40 } },
  { id: 5, personId: 3, betId: 102, reportId: 302, reactions: { stars: 15, biceps: 9, hearts: 6 } },
  { id: 6, personId: 5, betId: 107, reportId: 307, reactions: { stars: 4, biceps: 5, hearts: 2 } },
];

export type OpenChallenge = {
  id: number;
  goal: string;
  type: 'result' | 'habit' | 'quit';
  durationDays: number;
  stake: number;
  currency: 'RUB' | 'XTR';
  creatorId: number;
};

export const MOCK_OPEN_CHALLENGES: OpenChallenge[] = [
  { id: 1, goal: '30 дней без сахара', type: 'quit', durationDays: 30, stake: 1000, currency: 'RUB', creatorId: 2 },
  { id: 2, goal: 'Пробежать 10 км без остановки', type: 'result', durationDays: 45, stake: 2000, currency: 'RUB', creatorId: 5 },
  { id: 3, goal: 'Читать 20 страниц каждый день', type: 'habit', durationDays: 60, stake: 500, currency: 'RUB', creatorId: 6 },
  { id: 4, goal: 'Холодный душ каждое утро', type: 'habit', durationDays: 21, stake: 0, currency: 'RUB', creatorId: 4 },
];
