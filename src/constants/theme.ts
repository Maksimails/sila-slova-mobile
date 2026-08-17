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
  screenDark: '#0E0E10',
  textOnDark: 'rgba(255,255,255,0.55)',
} as const;

export type ThemeColor = keyof typeof Colors;

/**
 * Bright diagonal gradients — the "Unleash" shop-tile language forked into
 * this app: vivid at the top-left, deep/dark of the same hue at the
 * bottom-right. Used for quiz answers, bet circles, and anywhere a page
 * needs a jolt of color against the white base.
 */
export const Gradients = {
  orange: ['#FF9142', '#8B3A0E'],
  gold: ['#FFD84D', '#8A6100'],
  teal: ['#33E6A0', '#0B3D2E'],
  purple: ['#B968FF', '#3D1466'],
  red: ['#FF5C5C', '#7A0E0E'],
  blue: ['#4DA3FF', '#0B2E66'],
  pink: ['#FF7AC6', '#5E0B3D'],
  cyan: ['#33D9E6', '#0B4D66'],
} as const;

export type GradientName = keyof typeof Gradients;
export const GradientOrder: GradientName[] = ['orange', 'teal', 'purple', 'gold', 'pink', 'blue', 'red', 'cyan'];

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
