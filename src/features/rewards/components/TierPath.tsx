import { Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TierMedal } from '../../../components/TierMedal';
import { colors, fontFamily, fontSize, spacing } from '../../../theme';
import { TIER_THRESHOLDS } from '../utils/tierProgress';
import { TierId } from '../types';

type TierPathProps = {
  currentTier: TierId;
  /** 0-1 progress along the segment from currentTier to the next tier. */
  progressToNextTier: number;
};

const DOT_SIZE = 38;

export function TierPath({ currentTier, progressToNextTier }: TierPathProps) {
  const currentIndex = TIER_THRESHOLDS.findIndex((t) => t.tier === currentTier);

  return (
    <View>
      <View style={styles.row}>
        {TIER_THRESHOLDS.map((threshold, index) => {
          const isCurrent = index === currentIndex;
          const isNext = index === currentIndex + 1;
          const state = isCurrent || index < currentIndex ? 'active' : isNext ? 'next' : 'locked';

          return (
            <Fragment key={threshold.tier}>
              <TierMedal tier={threshold.tier} size={DOT_SIZE} state={state} />
              {index < TIER_THRESHOLDS.length - 1 && (
                <View style={styles.line}>
                  {index === currentIndex && (
                    <View style={[styles.lineFill, { width: `${progressToNextTier * 100}%` }]} />
                  )}
                </View>
              )}
            </Fragment>
          );
        })}
      </View>

      <View style={styles.row}>
        {TIER_THRESHOLDS.map((threshold, index) => (
          <Fragment key={threshold.tier}>
            <Text style={[styles.label, index > currentIndex && styles.labelMuted]}>
              {threshold.label}
            </Text>
            {index < TIER_THRESHOLDS.length - 1 && <View style={styles.labelSpacer} />}
          </Fragment>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  line: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#EDEAE4',
    marginHorizontal: spacing.sm,
    overflow: 'hidden',
  },
  lineFill: {
    height: '100%',
    backgroundColor: colors.magenta,
    borderRadius: 2,
  },
  label: {
    width: DOT_SIZE,
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xs,
    color: colors.ink,
    textAlign: 'center',
  },
  labelMuted: {
    color: colors.muted,
  },
  labelSpacer: {
    flex: 1,
    marginHorizontal: spacing.sm,
  },
});
