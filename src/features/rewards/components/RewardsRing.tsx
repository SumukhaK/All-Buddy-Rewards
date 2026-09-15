import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors, fontFamily, fontSize } from '../../../theme';

type RewardsRingProps = {
  points: number;
  /** 0-1 progress toward the next tier. */
  progress: number;
  size?: number;
  strokeWidth?: number;
};

export function RewardsRing({ points, progress, size = 168, strokeWidth = 12 }: RewardsRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * Math.max(0, Math.min(1, progress));

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors.magentaTint}
          strokeWidth={strokeWidth}
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors.magenta}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          origin={`${size / 2}, ${size / 2}`}
          rotation={-90}
        />
      </Svg>
      <View style={styles.center} pointerEvents="none">
        <Text style={styles.score}>{points}</Text>
        <Text style={styles.label}>points</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    fontFamily: fontFamily.extraBold,
    fontSize: fontSize.display,
    color: colors.ink,
    lineHeight: fontSize.display,
  },
  label: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.sm,
    color: colors.muted,
    marginTop: 3,
  },
});
