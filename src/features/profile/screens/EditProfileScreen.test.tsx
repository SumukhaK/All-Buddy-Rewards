import { Alert } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { EditProfileScreen } from './EditProfileScreen';
import type { RootStackParamList } from '../../../navigation/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

async function renderScreen() {
  const navigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
  } as unknown as Props['navigation'];

  await render(<EditProfileScreen navigation={navigation} route={{} as Props['route']} />);
  return { navigation };
}

describe('EditProfileScreen', () => {
  it('renders the header, name fields, and the rewards teaser', async () => {
    await renderScreen();

    expect(screen.getByText('Edit Profile')).toBeTruthy();
    expect(screen.getByDisplayValue('sumukha')).toBeTruthy();
    expect(screen.getByText('Bronze Tier')).toBeTruthy();
  });

  it('navigates to Rewards Details when the rewards card arrow is tapped', async () => {
    const { navigation } = await renderScreen();

    await fireEvent.press(screen.getByTestId('rewards-teaser-arrow'));

    expect(navigation.navigate).toHaveBeenCalledWith('RewardsDetails');
  });

  it('updates the first name field as the user types', async () => {
    await renderScreen();

    const input = screen.getByDisplayValue('sumukha');
    await fireEvent.changeText(input, 'Sumukha');

    expect(screen.getByDisplayValue('Sumukha')).toBeTruthy();
  });

  it('confirms when Save Changes is pressed', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    await renderScreen();

    await fireEvent.press(screen.getByTestId('save-changes-button'));

    expect(alertSpy).toHaveBeenCalledWith('Profile saved');
    alertSpy.mockRestore();
  });
});
