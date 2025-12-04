/**
 * Profile Stack Navigator
 * 
 * Handles profile and settings screens: ProfileMain, EditProfile, Settings, MyMatches, MyBookings
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackParamList } from './types';
import { useTheme } from '../theme';

// Import screens
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import TurfListScreen from '../screens/turfs/TurfListScreen'; // Reusing for My Bookings placeholder
import MatchExploreScreen from '../screens/matches/MatchExploreScreen'; // Reusing for My Matches placeholder

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileStack: React.FC = () => {
    const theme = useTheme();

    return (
        <Stack.Navigator
            initialRouteName="ProfileMain"
            screenOptions={{
                headerShown: false, // Using custom headers in screens
                contentStyle: {
                    backgroundColor: theme.colors.bgSoft,
                },
            }}
        >
            <Stack.Screen
                name="ProfileMain"
                component={ProfileScreen}
                options={{ title: 'Profile' }}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{ title: 'Edit Profile' }}
            />
            <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ title: 'Settings' }}
            />
            <Stack.Screen
                name="MyMatches"
                component={MatchExploreScreen}
                options={{ title: 'My Matches' }}
            />
            <Stack.Screen
                name="MyBookings"
                component={TurfListScreen}
                options={{ title: 'My Bookings' }}
            />
        </Stack.Navigator>
    );
};
