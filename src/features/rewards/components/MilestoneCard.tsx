import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../../../components/Card';
import { InfoTooltip } from '../../../components/InfoTooltip';
import { ProgressBar } from '../../../components/ProgressBar';
import { CheckIcon, FlameIcon, PeopleIcon, ThumbsUpIcon } from '../../../components/icons';
import { colors, fontFamily, fontSize, radii, spacing } from '../../../theme';
import { Milestone } from '../types';

type MilestoneCardProps = {
  milestone: Milestone;
};

const iconByKind = {
  people: PeopleIcon,
  flame: FlameIcon,
  thumbsUp: ThumbsUpIcon,
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function MilestoneCard({ milestone }: MilestoneCardProps) {
  const Icon = iconByKind[milestone.icon];
  const isCompleted = milestone.status === 'completed';
  const percent =
    !isCompleted && milestone.progressTarget
      ? Math.round(((milestone.progressCurrent ?? 0) / milestone.progressTarget) * 100)
      : 0;

  return (
    <Card style={styles.card} testID={`milestone-card-${milestone.id}`}>
      <View style={styles.top}>
        <View style={styles.iconWrap}>
          <Icon size={20} color={colors.magenta} />
          {isCompleted && (
            <View style={styles.checkBadge}>
              <CheckIcon size={9} color={colors.white} />
            </View>
          )}
        </View>

        <View style={styles.textCol}>
          <View style={styles.titleRow}>
            <View style={styles.titleWrap}>
              <Text style={styles.title} numberOfLines={1}>
                {milestone.title}
              </Text>
              {!isCompleted && (
                <InfoTooltip
                  variant="info"
                  title="How to complete this"
                  description={milestone.howTo}
                  accessibilityLabel={`How to complete ${milestone.title}`}
                  testID={`milestone-info-${milestone.id}`}
                />
              )}
            </View>
            <Text style={styles.points}>+{milestone.points} pts</Text>
          </View>
          <Text style={styles.subtitle}>{milestone.subtitle}</Text>
        </View>
      </View>

      {isCompleted ? (
        <View style={styles.meta}>
          <Text style={styles.completedTag}>Completed</Text>
          {milestone.completedOn && <Text style={styles.date}>{formatDate(milestone.completedOn)}</Text>}
        </View>
      ) : (
        <View style={styles.progressRow}>
          <ProgressBar progress={percent} />
          <Text style={styles.percent}>{percent}%</Text>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.md + 2,
    gap: spacing.sm + 2,
  },
  top: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    backgroundColor: colors.chip,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: radii.pill,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  textCol: {
    flex: 1,
    minWidth: 0,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    flexShrink: 1,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.md,
    color: colors.ink,
    flexShrink: 1,
  },
  points: {
    fontFamily: fontFamily.extraBold,
    fontSize: fontSize.xs,
    color: colors.magenta,
    backgroundColor: colors.magentaTint,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: radii.pill,
    overflow: 'hidden',
  },
  subtitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.sm,
    color: colors.muted,
    marginTop: 3,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginLeft: 56,
  },
  percent: {
    fontFamily: fontFamily.extraBold,
    fontSize: fontSize.xs,
    color: colors.magenta,
    width: 34,
    textAlign: 'right',
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginLeft: 56,
  },
  completedTag: {
    fontFamily: fontFamily.extraBold,
    fontSize: 10.5,
    color: colors.success,
    backgroundColor: colors.successTint,
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: radii.pill,
    overflow: 'hidden',
  },
  date: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.xs,
    color: colors.muted,
  },
});
