import { StyleSheet, View } from 'react-native';
import { colors, radii } from '../theme';

type ProgressBarProps = {
  /** 0-100 */
  progress: number;
  height?: number;
  testID?: string;
};

/** Slim pill progress track, magenta fill on a light pink track — the same visual language as the app's own "digital card" progress bar. */
export function ProgressBar({ progress, height = 6, testID }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, progress));
  return (
    <View
      style={[styles.track, { height }]}
      testID={testID}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(clamped) }}
    >
      <View style={[styles.fill, { width: `${clamped}%`, height }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    borderRadius: radii.pill,
    backgroundColor: colors.magentaTint,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: radii.pill,
    backgroundColor: colors.magenta,
  },
});
