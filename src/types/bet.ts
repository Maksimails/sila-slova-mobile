export type BetStatus = 'pending_payment' | 'active' | 'challenge_pending' | 'done' | 'failed' | 'review' | 'cancelled';

export type Bet = {
  id: number;
  userId: number;
  mode: 'public' | 'private';
  type: 'result' | 'habit' | 'quit';
  goal: string;
  pointA?: string;
  durationDays: number;
  startDate: string;
  status: BetStatus;
  stake: number;
  currency: 'XTR' | 'RUB';
  persona?: string;
  videoUrl?: string;
  challengeId?: number;
  reportedToday: boolean;
  dayN: number;
  commentsCount?: number;
  supportCount?: number;
};

export type Report = {
  id: number;
  betId: number;
  day: number;
  date: string;
  content?: string;
  mediaUrl?: string;
  mediaType?: 'photo' | 'video';
};

export type ChallengeSide = {
  userId: number;
  name: string;
  avatarUrl?: string;
  betId: number;
  reportedToday: boolean;
  videoUrl?: string;
};

export type Challenge = {
  id: number;
  goal: string;
  type: 'result' | 'habit';
  durationDays: number;
  startDate: string;
  status: 'proposed' | 'active' | 'declined' | 'cancelled' | 'completed';
  stake: number;
  sides: [ChallengeSide, ChallengeSide];
};
