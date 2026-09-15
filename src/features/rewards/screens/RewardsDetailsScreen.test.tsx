import { fireEvent, render, screen } from '@testing-library/react-native';
import { RewardsDetailsScreen } from './RewardsDetailsScreen';
import type { RootStackParamList } from '../../../navigation/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'RewardsDetails'>;

async function renderScreen() {
  const navigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
  } as unknown as Props['navigation'];

  await render(<RewardsDetailsScreen navigation={navigation} route={{} as Props['route']} />);
  return { navigation };
}

describe('RewardsDetailsScreen', () => {
  it('renders the header, score, and current tier', async () => {
    await renderScreen();

    expect(screen.getByText('My Rewards')).toBeTruthy();
    expect(screen.getByText('120')).toBeTruthy();
    expect(screen.getByText('Bronze Tier')).toBeTruthy();
  });

  it('defaults to the In Progress tab, sorted nearest-to-completion first', async () => {
    await renderScreen();

    const list = screen.getByTestId('milestone-list');
    expect(list).toBeTruthy();
    expect(screen.getByText('Add 50 Contacts')).toBeTruthy();
    expect(screen.getByText('96%')).toBeTruthy();
    expect(screen.queryByText('First Login')).toBeNull();
  });

  it('switches to the Completed tab and shows earned milestones', async () => {
    await renderScreen();

    await fireEvent.press(screen.getByText('Completed'));

    expect(screen.getByText('First Login')).toBeTruthy();
    expect(screen.queryByText('Add 50 Contacts')).toBeNull();
  });

  it('calls goBack when the back button is tapped', async () => {
    const { navigation } = await renderScreen();

    await fireEvent.press(screen.getByLabelText('Back'));

    expect(navigation.goBack).toHaveBeenCalledTimes(1);
  });
});
