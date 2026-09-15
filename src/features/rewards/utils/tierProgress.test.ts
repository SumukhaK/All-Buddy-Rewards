import { getTierProgress, TIER_THRESHOLDS } from './tierProgress';

describe('getTierProgress', () => {
  it('starts every new user at Bronze with 0 points', () => {
    const result = getTierProgress(0);
    expect(result.currentTier).toBe('bronze');
    expect(result.nextTier).toBe('silver');
    expect(result.pointsToNextTier).toBe(200);
    expect(result.progressToNextTier).toBe(0);
  });

  it('computes points remaining and fractional progress toward Silver', () => {
    const result = getTierProgress(120);
    expect(result.currentTier).toBe('bronze');
    expect(result.nextTier).toBe('silver');
    expect(result.pointsToNextTier).toBe(80);
    expect(result.progressToNextTier).toBeCloseTo(0.6);
  });

  it('advances to Silver exactly at the threshold', () => {
    const result = getTierProgress(200);
    expect(result.currentTier).toBe('silver');
    expect(result.nextTier).toBe('gold');
    expect(result.pointsToNextTier).toBe(300);
  });

  it('advances to Gold at the threshold and has no further tier', () => {
    const result = getTierProgress(500);
    expect(result.currentTier).toBe('gold');
    expect(result.nextTier).toBeNull();
    expect(result.pointsToNextTier).toBeNull();
    expect(result.progressToNextTier).toBe(1);
  });

  it('never reports negative points remaining just past a threshold', () => {
    const result = getTierProgress(199);
    expect(result.currentTier).toBe('bronze');
    expect(result.pointsToNextTier).toBe(1);
  });

  it('exposes thresholds in ascending point order', () => {
    const points = TIER_THRESHOLDS.map((t) => t.minPoints);
    expect(points).toEqual([...points].sort((a, b) => a - b));
  });
});
