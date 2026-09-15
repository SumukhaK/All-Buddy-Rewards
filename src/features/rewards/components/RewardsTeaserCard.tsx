import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Card } from '../../../components/Card';
import { InfoTooltip } from '../../../components/InfoTooltip';
import { ProgressBar } from '../../../components/ProgressBar';
import { TierMedal } from '../../../components/TierMedal';
import { ChevronRightIcon } from '../../../components/icons';
import { colors, fontFamily, fontSize, radii, spacing } from '../../../theme';
import { getTierProgress, TIER_THRESHOLDS } from '../utils/tierProgress';

type RewardsTeaserCardProps = {
  points: number;
  onPress: () => void;
};

const tierLabel: Record<string, string> = Object.fromEntries(
  TIER_THRESHOLDS.map((t) => [t.tier, t.label]),
);

/** Compact rewards summary shown on Edit Profile, right below the name fields. */
export function RewardsTeaserCard({ points, onPress }: RewardsTeaserCardProps) {
  const { currentTier, nextTier, pointsToNextTier, progressToNextTier } = getTierProgress(points);

  return (
    <Card style={styles.card}>
      <TierMedal tier={currentTier} size={48} />

      <View style={styles.mid}>
        <View style={styles.topRow}>
          <View style={styles.nameWrap}>
            <Text style={styles.tierName}>{tierLabel[currentTier]} Tier</Text>
            <InfoTooltip
              variant="question"
              title="How rewards work"
              description="Earn points every day you log in, each time you add a new contact, and when a contact you added is marked Helpful by your manager. Collect enough to move from Bronze to Silver to Gold."
              accessibilityLabel="What are rewards?"
              testID="rewards-teaser-info"
            />
          </View>
          <Text style={styles.points}>{points} pts</Text>
        </View>

        <ProgressBar progress={progressToNextTier * 100} />

        {nextTier ? (
          <Text style={styles.caption}>
            {pointsToNextTier} pts to {tierLabel[nextTier]}
          </Text>
        ) : (
          <Text style={styles.caption}>Top tier reached</Text>
        )}
      </View>

      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel="View rewards details"
        testID="rewards-teaser-arrow"
        style={({ pressed }) => [styles.arrow, pressed && styles.arrowPressed]}
      >
        <ChevronRightIcon size={17} color={colors.white} />
      </Pressable>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md + 2,
  },
  mid: {
    flex: 1,
    minWidth: 0,
    gap: 6,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  nameWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    flexShrink: 1,
  },
  tierName: {
    fontFamily: fontFamily.extraBold,
    fontSize: fontSize.lg,
    color: colors.ink,
  },
  points: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.sm,
    color: colors.muted,
  },
  caption: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.xs,
    color: colors.muted,
  },
  arrow: {
    width: 38,
    height: 38,
    borderRadius: radii.pill,
    backgroundColor: colors.magenta,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowPressed: {
    opacity: 0.85,
  },
});
