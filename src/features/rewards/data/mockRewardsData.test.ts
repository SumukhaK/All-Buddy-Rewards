import { mockRewardsProfile, sortByProgress, sortByRecency } from './mockRewardsData';

describe('sortByProgress', () => {
  it('returns only in-progress milestones, nearest completion first', () => {
    const sorted = sortByProgress(mockRewardsProfile.milestones);

    expect(sorted.every((m) => m.status === 'in-progress')).toBe(true);

    const percentages = sorted.map((m) => (m.progressCurrent ?? 0) / (m.progressTarget ?? 1));
    const descending = [...percentages].sort((a, b) => b - a);
    expect(percentages).toEqual(descending);

    expect(sorted[0].id).toBe('add-50-contacts');
  });
});

describe('sortByRecency', () => {
  it('returns only completed milestones', () => {
    const sorted = sortByRecency(mockRewardsProfile.milestones);
    expect(sorted.length).toBeGreaterThan(0);
    expect(sorted.every((m) => m.status === 'completed')).toBe(true);
  });
});
