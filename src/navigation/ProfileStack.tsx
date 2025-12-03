/**
 * Profile Stack Navigator
 * 
 * Handles profile and settings screens: ProfileMain, EditProfile, Settings, MyMatches, MyBookings
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackParamList } from './types';
import { useTheme } from '../theme';

// Import screens (placeholders for now - will be created in next phase)
// import ProfileMainScreen from '../screens/profile/ProfileMainScreen';
// import EditProfileScreen from '../screens/profile/EditProfileScreen';
// import SettingsScreen from '../screens/profile/SettingsScreen';
// import MyMatchesScreen from '../screens/profile/MyMatchesScreen';
// import MyBookingsScreen from '../screens/profile/MyBookingsScreen';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

/**
 * Placeholder screens - to be replaced with actual screens
 */
const PlaceholderScreen = () => null;

export const ProfileStack: React.FC = () => {
    const theme = useTheme();

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.primary,
                },
                headerTintColor: theme.colors.white,
                headerTitleStyle: {
                    fontWeight: '600',
                },
            }}
        >
            <Stack.Screen
                name="ProfileMain"
                component={PlaceholderScreen}
                options={{ title: 'Profile' }}
            />
            <Stack.Screen
                name="EditProfile"
                component={PlaceholderScreen}
                options={{ title: 'Edit Profile' }}
            />
            <Stack.Screen
                name="Settings"
                component={PlaceholderScreen}
                options={{ title: 'Settings' }}
            />
            <Stack.Screen
                name="MyMatches"
                component={PlaceholderScreen}
                options={{ title: 'My Matches' }}
            />
            <Stack.Screen
                name="MyBookings"
                component={PlaceholderScreen}
                options={{ title: 'My Bookings' }}
            />
        </Stack.Navigator>
    );
};
