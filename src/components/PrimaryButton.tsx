import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, fontFamily, fontSize, radii } from '../theme';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  testID?: string;
};

export function PrimaryButton({ label, onPress, testID }: PrimaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      testID={testID}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: radii.pill,
    backgroundColor: colors.magenta,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    color: colors.white,
    fontFamily: fontFamily.bold,
    fontSize: fontSize.lg + 0.5,
  },
});
