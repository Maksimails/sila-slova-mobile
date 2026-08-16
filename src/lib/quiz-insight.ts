import { type QuizAnswers } from '@/lib/onboarding-context';

// Paraphrased, not copied from the quiz option labels — this should read like
// someone listening and reflecting back, not an echo of what was tapped.
const WORD_MEANING_PHRASES: Record<NonNullable<QuizAnswers['wordMeaning']>, string> = {
  trivial: 'слова для тебя стираются быстро — сказал(-а) и забыл(-а)',
  unpleasant: 'оступиться неловко, но не смертельно',
  selfRespect: 'не сдержать обещание — значит подвести самого себя',
  worst: 'предать своё слово для тебя — самое дно',
};

const ABANDONS_GOALS_PHRASES: Record<NonNullable<QuizAnswers['abandonsGoals']>, string> = {
  always: 'при этом почти ничего из начатого не доходит до финиша',
  often: 'при этом большая часть начатого остаётся незаконченной',
  sometimes: 'при этом получается через раз — то доводишь, то нет',
  never: 'и обычно то, что начал(-а), заканчиваешь — редкость среди людей',
};

const NEEDS_PRESSURE_PHRASES: Record<NonNullable<QuizAnswers['needsPressure']>, string> = {
  always: 'Без толчка со стороны ты не сдвигаешься с места.',
  often: 'Чаще всего тебе нужен кто-то, кто не даст соскочить.',
  sometimes: 'Иногда справляешься сам(-а), иногда нужен пинок.',
  never: 'Внешнее давление тебе почти не требуется — редкая черта.',
};

export function buildQuizInsight(quiz: QuizAnswers): string {
  const wordPart = quiz.wordMeaning ? WORD_MEANING_PHRASES[quiz.wordMeaning] : null;
  const abandonsPart = quiz.abandonsGoals ? ABANDONS_GOALS_PHRASES[quiz.abandonsGoals] : null;
  const pressurePart = quiz.needsPressure ? NEEDS_PRESSURE_PHRASES[quiz.needsPressure] : null;

  const sentences: string[] = [];

  if (wordPart && abandonsPart) {
    sentences.push(
      `Смотри, что получается: ${wordPart}, ${abandonsPart}. Разрыв между тем, что слово для тебя значит, и тем, как ты с ним обращаешься, — это и есть то, с чем работает Сила Слова.`,
    );
  } else if (wordPart) {
    sentences.push(`Ты дал(-а) понять: ${wordPart}. Нужен способ сделать эту цену реальной, а не просто мыслью.`);
  } else if (abandonsPart) {
    sentences.push(`По твоим ответам: ${abandonsPart}. Ставка — это то, что закрывает этот разрыв.`);
  }

  if (pressurePart) {
    sentences.push(pressurePart);
  }

  if (sentences.length === 0) {
    return 'Слово стоит дорого только тогда, когда за ним что-то реальное. Мы для этого и здесь.';
  }

  sentences.push('Ставка делает цену слова осязаемой, а не абстрактной.');
  return sentences.join(' ');
}
