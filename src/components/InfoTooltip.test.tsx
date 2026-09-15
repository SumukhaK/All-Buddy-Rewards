import { fireEvent, render, screen } from '@testing-library/react-native';
import { InfoTooltip } from './InfoTooltip';

async function renderTooltip() {
  await render(
    <InfoTooltip
      title="How rewards work"
      description="Earn points every day you log in."
      accessibilityLabel="What are rewards?"
      testID="info-tooltip"
    />,
  );
}

describe('InfoTooltip', () => {
  it('is closed until the trigger is pressed', async () => {
    await renderTooltip();
    expect(screen.queryByText('How rewards work')).toBeNull();
  });

  it('shows the title and description once opened', async () => {
    await renderTooltip();

    await fireEvent.press(screen.getByLabelText('What are rewards?'));

    expect(screen.getByText('How rewards work')).toBeTruthy();
    expect(screen.getByText('Earn points every day you log in.')).toBeTruthy();
  });

  it('closes when the close button is pressed', async () => {
    await renderTooltip();

    await fireEvent.press(screen.getByLabelText('What are rewards?'));
    expect(screen.getByText('How rewards work')).toBeTruthy();

    await fireEvent.press(screen.getByLabelText('Close'));

    expect(screen.queryByText('How rewards work')).toBeNull();
  });

  it('closes when the backdrop is pressed', async () => {
    await renderTooltip();

    await fireEvent.press(screen.getByLabelText('What are rewards?'));
    await fireEvent.press(screen.getByTestId('info-tooltip-backdrop'));

    expect(screen.queryByText('How rewards work')).toBeNull();
  });
});
