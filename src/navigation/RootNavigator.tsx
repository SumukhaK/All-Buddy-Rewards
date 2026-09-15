import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EditProfileScreen } from '../features/profile/screens/EditProfileScreen';
import { RewardsDetailsScreen } from '../features/rewards/screens/RewardsDetailsScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen
        name="RewardsDetails"
        component={RewardsDetailsScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
}
