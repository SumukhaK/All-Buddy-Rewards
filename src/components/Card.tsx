import { PropsWithChildren } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors, radii } from '../theme';

type CardProps = PropsWithChildren<{
  style?: ViewStyle;
  testID?: string;
}>;

/** Base white rounded surface used for every card in the app, matching the profile card language. */
export function Card({ children, style, testID }: CardProps) {
  return (
    <View style={[styles.card, style]} testID={testID}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.xl,
    shadowColor: '#1E140F',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
});
