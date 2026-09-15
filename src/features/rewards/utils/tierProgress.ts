import { TierId, TierThreshold } from '../types';

/**
 * Points needed to *enter* each tier. Every new user starts Bronze; crossing a threshold
 * advances the tier automatically — there's no separate "promotion" step.
 */
export const TIER_THRESHOLDS: TierThreshold[] = [
  { tier: 'bronze', minPoints: 0, label: 'Bronze' },
  { tier: 'silver', minPoints: 200, label: 'Silver' },
  { tier: 'gold', minPoints: 500, label: 'Gold' },
];

export type TierProgress = {
  currentTier: TierId;
  /** undefined once the top tier (Gold) is reached — there's nothing further to climb toward. */
  nextTier: TierId | null;
  pointsToNextTier: number | null;
  /** 0-1 progress from the current tier's own floor toward the next tier's floor. */
  progressToNextTier: number;
};

export function getTierProgress(points: number): TierProgress {
  const sorted = [...TIER_THRESHOLDS].sort((a, b) => a.minPoints - b.minPoints);
  const currentIndex = sorted.reduce(
    (acc, threshold, index) => (points >= threshold.minPoints ? index : acc),
    0,
  );
  const current = sorted[currentIndex];
  const next = sorted[currentIndex + 1] ?? null;

  if (!next) {
    return {
      currentTier: current.tier,
      nextTier: null,
      pointsToNextTier: null,
      progressToNextTier: 1,
    };
  }

  const span = next.minPoints - current.minPoints;
  const progress = span > 0 ? (points - current.minPoints) / span : 0;

  return {
    currentTier: current.tier,
    nextTier: next.tier,
    pointsToNextTier: Math.max(0, next.minPoints - points),
    progressToNextTier: Math.max(0, Math.min(1, progress)),
  };
}
