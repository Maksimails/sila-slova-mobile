import { View, type ViewProps } from 'react-native';

import { Colors, ThemeColor } from '@/constants/theme';

export type ThemedViewProps = ViewProps & {
  bg?: ThemeColor;
};

export function ThemedView({ style, bg = 'bg', ...rest }: ThemedViewProps) {
  return <View style={[{ backgroundColor: Colors[bg] }, style]} {...rest} />;
}
