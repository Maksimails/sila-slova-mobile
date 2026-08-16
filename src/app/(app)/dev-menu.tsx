import { router, type Href } from 'expo-router';
import { Pressable, SectionList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Radius, Spacing } from '@/constants/theme';

type Row = { label: string; href: Href };

const SECTIONS: { title: string; data: Row[] }[] = [
  {
    title: 'Auth',
    data: [
      { label: 'Приветствие (лендинг)', href: '/(auth)/welcome' },
      { label: 'Вход', href: '/(auth)/sign-in' },
      { label: 'Код из смс', href: { pathname: '/(auth)/verify', params: { phone: '+79991234567' } } },
    ],
  },
  {
    title: 'Онбординг',
    data: [
      { label: 'Приветствие', href: '/onboarding/welcome' },
      { label: 'Имя', href: '/onboarding/name' },
      { label: 'Возраст', href: '/onboarding/age' },
      { label: 'Пол', href: '/onboarding/gender' },
      { label: 'Согласия', href: '/onboarding/consents' },
      { label: 'Аватар', href: '/onboarding/avatar' },
      { label: 'Квиз 1', href: '/onboarding/quiz-1' },
      { label: 'Квиз (загрузка)', href: '/onboarding/quiz-loading' },
      { label: 'Квиз (разбор)', href: '/onboarding/quiz-result' },
    ],
  },
  {
    title: 'Главный экран',
    data: [
      { label: 'Лента', href: '/' },
      { label: 'Открытые вызовы', href: '/discover' },
      { label: 'Уведомления', href: '/notifications' },
      { label: 'Профиль другого пользователя', href: { pathname: '/person/[id]', params: { id: '3' } } },
    ],
  },
  {
    title: 'Мастер ставки',
    data: [
      { label: 'Соло / Вызов', href: '/new-bet/kind' },
      { label: 'Публично / Лично', href: '/new-bet/mode' },
      { label: 'Тип ставки', href: '/new-bet/type' },
      { label: 'Цель', href: '/new-bet/goal' },
      { label: 'Поля Результата', href: '/new-bet/result-fields' },
      { label: 'Поля Привычки', href: '/new-bet/habit-fields' },
      { label: 'Поля Аскезы', href: '/new-bet/quit-fields' },
      { label: 'Соперник', href: '/new-bet/opponent' },
      { label: 'Видео-клятва', href: '/new-bet/video' },
      { label: 'Просмотр видео', href: '/new-bet/video-review' },
      { label: 'Ставка', href: '/new-bet/stake' },
      { label: 'Проверка и отправка', href: '/new-bet/review' },
      { label: 'Приглашение свидетеля', href: '/new-bet/witness-invite' },
    ],
  },
  {
    title: 'Ставка / Дуэль',
    data: [
      { label: 'Детали ставки (соло)', href: '/bet/1' },
      { label: 'Отчёт', href: '/report/1' },
      { label: 'Комментарии', href: { pathname: '/bet/[id]/comments', params: { id: '1', day: '23' } } },
      { label: 'Детали дуэли', href: '/duel/1' },
      { label: 'Пересогласовать дуэль', href: '/duel/1/adjust' },
      { label: 'Приглашение на дуэль', href: { pathname: '/challenge/[token]', params: { token: 'demo' } } },
      { label: 'Приглашение свидетелю', href: { pathname: '/witness/[token]', params: { token: 'demo' } } },
    ],
  },
  {
    title: 'Профиль',
    data: [
      { label: 'Статистика', href: '/profile' },
      { label: 'Медали', href: '/profile/medals' },
      { label: 'Персонаж-наставник', href: '/profile/persona' },
      { label: 'Бонды', href: '/profile/bonds' },
      { label: 'Подписчики / Подписки', href: '/profile/followers' },
      { label: 'История ставок', href: '/profile/history' },
    ],
  },
  {
    title: 'Настройки',
    data: [
      { label: 'Аккаунт', href: '/settings/account' },
      { label: 'Уровень строгости', href: '/settings/strictness' },
      { label: 'Поддержка', href: '/settings/support' },
    ],
  },
];

export default function DevMenuScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.title}>
          Все экраны
        </ThemedText>
        <SectionList
          sections={SECTIONS}
          keyExtractor={(item) => item.label}
          contentContainerStyle={styles.list}
          stickySectionHeadersEnabled={false}
          renderSectionHeader={({ section }) => (
            <ThemedText type="label" color="gold" style={styles.sectionHeader}>
              {section.title}
            </ThemedText>
          )}
          renderItem={({ item }) => (
            <Pressable onPress={() => router.push(item.href)} style={styles.row}>
              <ThemedText type="body">{item.label}</ThemedText>
            </Pressable>
          )}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
  },
  title: {
    paddingVertical: Spacing.three,
  },
  list: {
    paddingBottom: Spacing.six,
  },
  sectionHeader: {
    marginTop: Spacing.three,
    marginBottom: Spacing.one,
  },
  row: {
    borderRadius: Radius.medium,
    borderWidth: 1,
    borderColor: Colors.line,
    backgroundColor: Colors.bgElement,
    padding: Spacing.three,
    marginBottom: Spacing.two,
  },
});
