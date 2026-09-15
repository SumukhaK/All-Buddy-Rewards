import { TierId } from '../../theme';

export type { TierId };

export type TierThreshold = {
  tier: TierId;
  /** Points needed to *enter* this tier. */
  minPoints: number;
  label: string;
};

export type MilestoneStatus = 'completed' | 'in-progress';

export type MilestoneIconKind = 'people' | 'flame' | 'thumbsUp';

export type Milestone = {
  id: string;
  title: string;
  icon: MilestoneIconKind;
  points: number;
  status: MilestoneStatus;
  /** e.g. "48 of 50 contacts added" */
  subtitle: string;
  /** How to actually finish this task — shown in the milestone's info tooltip. */
  howTo: string;
  /** Required for in-progress milestones. */
  progressCurrent?: number;
  progressTarget?: number;
  /** Required for completed milestones, ISO date string. */
  completedOn?: string;
};

export type RewardsProfile = {
  points: number;
  milestones: Milestone[];
};
