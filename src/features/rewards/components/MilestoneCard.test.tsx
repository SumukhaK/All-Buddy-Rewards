import { fireEvent, render, screen } from '@testing-library/react-native';
import { MilestoneCard } from './MilestoneCard';
import { Milestone } from '../types';

const inProgress: Milestone = {
  id: 'contacts-marked-helpful-10',
  title: '10 Contacts Marked Helpful',
  icon: 'thumbsUp',
  points: 100,
  status: 'in-progress',
  subtitle: '6 of 10 marked helpful',
  howTo: 'Ask your manager to mark a contact as Helpful.',
  progressCurrent: 6,
  progressTarget: 10,
};

const completed: Milestone = {
  id: 'first-login',
  title: 'First Login',
  icon: 'flame',
  points: 10,
  status: 'completed',
  subtitle: 'Welcome bonus',
  howTo: 'Awarded automatically the first time you sign in.',
  completedOn: '2026-09-15',
};

describe('MilestoneCard', () => {
  it('renders an in-progress milestone with its computed percentage and points reward', async () => {
    await render(<MilestoneCard milestone={inProgress} />);

    expect(screen.getByText('10 Contacts Marked Helpful')).toBeTruthy();
    expect(screen.getByText('6 of 10 marked helpful')).toBeTruthy();
    expect(screen.getByText('60%')).toBeTruthy();
    expect(screen.getByText('+100 pts')).toBeTruthy();
  });

  it('opens the task-specific "how to complete this" tooltip for in-progress milestones', async () => {
    await render(<MilestoneCard milestone={inProgress} />);

    await fireEvent.press(screen.getByTestId(`milestone-info-${inProgress.id}`));

    expect(screen.getByText('How to complete this')).toBeTruthy();
    expect(screen.getByText(inProgress.howTo)).toBeTruthy();
  });

  it('renders a completed milestone with a Completed tag and date, and no info affordance', async () => {
    await render(<MilestoneCard milestone={completed} />);

    expect(screen.getByText('First Login')).toBeTruthy();
    expect(screen.getByText('Completed')).toBeTruthy();
    expect(screen.getByText('Sep 15, 2026')).toBeTruthy();
    expect(screen.queryByTestId(`milestone-info-${completed.id}`)).toBeNull();
  });
});
