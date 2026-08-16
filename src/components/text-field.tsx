import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

type TextFieldProps = TextInputProps & {
  label: string;
  error?: string;
};

export function TextField({ label, error, style, ...rest }: TextFieldProps) {
  return (
    <View style={styles.container}>
      <ThemedText type="label" color="textSecondary">
        {label}
      </ThemedText>
      <TextInput
        placeholderTextColor={Colors.textSecondary}
        style={[styles.input, error && styles.inputError, style]}
        {...rest}
      />
      {error ? (
        <ThemedText type="small" color="crimson">
          {error}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.one,
  },
  input: {
    height: 52,
    borderRadius: Radius.medium,
    borderWidth: 1,
    borderColor: Colors.line,
    backgroundColor: Colors.bgElement,
    paddingHorizontal: Spacing.three,
    fontFamily: Fonts.rounded,
    fontWeight: '500',
    fontSize: 16,
    color: Colors.text,
  },
  inputError: {
    borderColor: Colors.crimson,
  },
});
