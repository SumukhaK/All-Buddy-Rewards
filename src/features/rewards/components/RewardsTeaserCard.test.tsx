import { fireEvent, render, screen } from '@testing-library/react-native';
import { RewardsTeaserCard } from './RewardsTeaserCard';

describe('RewardsTeaserCard', () => {
  it('shows the current tier, points, and points remaining to the next tier', async () => {
    await render(<RewardsTeaserCard points={120} onPress={jest.fn()} />);

    expect(screen.getByText('Bronze Tier')).toBeTruthy();
    expect(screen.getByText('120 pts')).toBeTruthy();
    expect(screen.getByText('80 pts to Silver')).toBeTruthy();
  });

  it('calls onPress when the arrow is tapped, to navigate to Rewards Details', async () => {
    const onPress = jest.fn();
    await render(<RewardsTeaserCard points={120} onPress={onPress} />);

    await fireEvent.press(screen.getByTestId('rewards-teaser-arrow'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('opens the "how rewards work" tooltip when the info icon is tapped', async () => {
    await render(<RewardsTeaserCard points={120} onPress={jest.fn()} />);

    expect(screen.queryByText('How rewards work')).toBeNull();

    await fireEvent.press(screen.getByTestId('rewards-teaser-info'));

    expect(screen.getByText('How rewards work')).toBeTruthy();
  });

  it('reports the top tier reached once Gold is hit', async () => {
    await render(<RewardsTeaserCard points={500} onPress={jest.fn()} />);

    expect(screen.getByText('Gold Tier')).toBeTruthy();
    expect(screen.getByText('Top tier reached')).toBeTruthy();
  });
});
