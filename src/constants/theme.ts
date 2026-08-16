import { Platform } from 'react-native';

/**
 * Light, black-and-white base with gold used sparingly as the one accent —
 * Forfeit/Apple direction, not the old dark Duel palette (see git history
 * for that version if it's ever needed again).
 */
export const Colors = {
  bg: '#ffffff',
  bgElement: '#f5f5f6',
  bgSelected: '#ececed',
  text: '#111113',
  textSecondary: '#6c6f78',
  gold: '#b8860f',
  goldSoft: '#f7ecd3',
  crimson: '#c0392f',
  teal: '#1f8f6c',
  line: '#e3e3e5',
} as const;

export type ThemeColor = keyof typeof Colors;

/**
 * Native system "rounded" font design — ships with the OS, no license to
 * manage. iOS: San Francisco Rounded via the `ui-rounded` design token.
 * Android: the "sans-serif-rounded" system alias. Weight is set per-Text via
 * fontWeight, same family throughout.
 */
export const Fonts = {
  rounded:
    Platform.select({
      ios: 'ui-rounded',
      android: 'sans-serif-rounded',
      default: 'system-ui',
    }) ?? 'System',
  mono: 'ui-monospace',
} as const;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radius = {
  small: 10,
  medium: 16,
  large: 26,
  pill: 999,
} as const;

export const MaxContentWidth = 480;
