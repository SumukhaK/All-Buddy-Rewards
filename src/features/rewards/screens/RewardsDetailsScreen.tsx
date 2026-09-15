import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BackIcon, StarIcon } from '../../../components/icons';
import { colors, fontFamily, fontSize, maxContentWidth, radii, spacing } from '../../../theme';
import { RootStackParamList } from '../../../navigation/types';
import { RewardsRing } from '../components/RewardsRing';
import { TierPath } from '../components/TierPath';
import { MilestoneCard } from '../components/MilestoneCard';
import { mockRewardsProfile, sortByProgress, sortByRecency } from '../data/mockRewardsData';
import { getTierProgress, TIER_THRESHOLDS } from '../utils/tierProgress';

type Props = NativeStackScreenProps<RootStackParamList, 'RewardsDetails'>;

type TabKey = 'completed' | 'in-progress';

const tierLabel: Record<string, string> = Object.fromEntries(
  TIER_THRESHOLDS.map((t) => [t.tier, t.label]),
);

export function RewardsDetailsScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>('in-progress');

  const { points, milestones } = mockRewardsProfile;
  const { currentTier, progressToNextTier } = getTierProgress(points);

  const inProgress = useMemo(() => sortByProgress(milestones), [milestones]);
  const completed = useMemo(() => sortByRecency(milestones), [milestones]);
  const visible = activeTab === 'in-progress' ? inProgress : completed;

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Back"
          hitSlop={8}
          style={styles.backButton}
        >
          <BackIcon size={20} color={colors.white} />
        </Pressable>
        <Text style={styles.headerTitle}>My Rewards</Text>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.centerColumn}>
          <View style={styles.hero}>
            <RewardsRing points={points} progress={progressToNextTier} />
            <View style={styles.tierChip}>
              <View style={styles.tierChipDot}>
                <StarIcon size={9} color={colors.white} />
              </View>
              <Text style={styles.tierChipLabel}>{tierLabel[currentTier]} Tier</Text>
            </View>
          </View>

          <View style={styles.tierPathWrap}>
            <TierPath currentTier={currentTier} progressToNextTier={progressToNextTier} />
          </View>

          <View style={styles.tabs}>
            <Tab
              label="Completed"
              active={activeTab === 'completed'}
              onPress={() => setActiveTab('completed')}
            />
            <Tab
              label="In Progress"
              active={activeTab === 'in-progress'}
              onPress={() => setActiveTab('in-progress')}
            />
          </View>

          <View style={styles.list} testID="milestone-list">
            {visible.map((milestone) => (
              <MilestoneCard key={milestone.id} milestone={milestone} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function Tab({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      style={[styles.tab, active && styles.tabActive]}
    >
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.magentaDeep,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: colors.white,
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xl,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl,
  },
  centerColumn: {
    width: '100%',
    maxWidth: maxContentWidth,
    alignSelf: 'center',
  },
  hero: {
    alignItems: 'center',
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.xl,
  },
  tierChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: colors.magentaTint,
    paddingLeft: 6,
    paddingRight: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
    marginTop: spacing.sm,
  },
  tierChipDot: {
    width: 18,
    height: 18,
    borderRadius: radii.pill,
    backgroundColor: colors.magenta,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tierChipLabel: {
    fontFamily: fontFamily.extraBold,
    fontSize: fontSize.sm,
    color: colors.magenta,
  },
  tierPathWrap: {
    paddingHorizontal: spacing.xxl + spacing.xs,
    paddingTop: spacing.xl,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.chip,
    borderRadius: radii.pill,
    padding: 4,
    marginHorizontal: spacing.xl,
    marginTop: spacing.xxl,
    marginBottom: spacing.lg,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: radii.pill,
  },
  tabActive: {
    backgroundColor: colors.white,
    shadowColor: '#1E1423',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  tabLabel: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.md,
    color: colors.muted,
  },
  tabLabelActive: {
    color: colors.magenta,
  },
  list: {
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
});
