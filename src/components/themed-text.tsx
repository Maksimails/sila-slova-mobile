import { StyleSheet, Text, type TextProps } from 'react-native';

import { Colors, Fonts, ThemeColor } from '@/constants/theme';

export type ThemedTextProps = TextProps & {
  type?: 'display' | 'title' | 'subtitle' | 'body' | 'label' | 'small';
  color?: ThemeColor;
};

export function ThemedText({ style, type = 'body', color = 'text', ...rest }: ThemedTextProps) {
  return (
    <Text
      style={[{ color: Colors[color], fontFamily: Fonts.rounded }, styles[type], style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  display: {
    fontWeight: '800',
    fontSize: 40,
    lineHeight: 46,
    letterSpacing: -0.4,
  },
  title: {
    fontWeight: '700',
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 26,
  },
  body: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
  },
  small: {
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
  },
});
