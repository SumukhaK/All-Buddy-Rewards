import { render, screen } from '@testing-library/react-native';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('exposes the given progress as an accessible value', async () => {
    await render(<ProgressBar progress={60} testID="bar" />);
    const bar = screen.getByTestId('bar');
    expect(bar.props.accessibilityValue).toEqual({ min: 0, max: 100, now: 60 });
  });

  it('clamps out-of-range progress into 0-100', async () => {
    await render(<ProgressBar progress={140} testID="over" />);
    expect(screen.getByTestId('over').props.accessibilityValue.now).toBe(100);

    await render(<ProgressBar progress={-20} testID="under" />);
    expect(screen.getByTestId('under').props.accessibilityValue.now).toBe(0);
  });
});
