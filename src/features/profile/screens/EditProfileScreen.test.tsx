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

type JsonNode = { type: string; children?: (JsonNode | string)[] | null };

function countHostComponentsOfType(node: JsonNode | JsonNode[] | null, type: string): number {
  if (node == null) return 0;
  if (Array.isArray(node)) {
    return node.reduce((sum, child) => sum + countHostComponentsOfType(child, type), 0);
  }
  const own = node.type === type ? 1 : 0;
  const childNodes = (node.children ?? []).filter((c): c is JsonNode => typeof c !== 'string');
  return own + countHostComponentsOfType(childNodes, type);
}

describe('EditProfileScreen', () => {
  it('renders the header, name fields, and the rewards teaser', async () => {
    await renderScreen();

    expect(screen.getByText('Edit Profile')).toBeTruthy();
    expect(screen.getByText('sumukha')).toBeTruthy();
    expect(screen.getByText('Bronze Tier')).toBeTruthy();
  });

  it('navigates to Rewards Details when the rewards card arrow is tapped', async () => {
    const { navigation } = await renderScreen();

    await fireEvent.press(screen.getByTestId('rewards-teaser-arrow'));

    expect(navigation.navigate).toHaveBeenCalledWith('RewardsDetails');
  });

  it('has no text inputs anywhere outside the rewards card, so nothing can pop the keyboard', async () => {
    // Regression test: a stray tap during device testing previously landed on the
    // Phone field and opened the keyboard. Only the rewards teaser is meant to be
    // interactive here - everything else is plain read-only display.
    await renderScreen();

    const tree = screen.toJSON() as JsonNode | JsonNode[] | null;
    expect(countHostComponentsOfType(tree, 'TextInput')).toBe(0);
  });

  it('shows contact details as static text, including placeholder copy for empty fields', async () => {
    await renderScreen();

    expect(screen.getByText('9164959501')).toBeTruthy();
    expect(screen.getByText('linkedin.com/in/username')).toBeTruthy();
    expect(screen.getByText('x.com/username')).toBeTruthy();
  });

  it('confirms when Save Changes is pressed', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    await renderScreen();

    await fireEvent.press(screen.getByTestId('save-changes-button'));

    expect(alertSpy).toHaveBeenCalledWith('Profile saved');
    alertSpy.mockRestore();
  });
});
