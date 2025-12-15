/**
 * Player Tab Navigator
 * 
 * Main navigation for players:
 * - Find Turfs
 * - Matches
 * - My Bookings
 * - Learn
 * - Profile
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import { useTheme } from '../theme';
import { Platform } from 'react-native';

// Import stack navigators
import { HomeStack } from './HomeStack'; // Or TurfsStack? HomeStack usually has Home -> ...
import { MatchesStack } from './MatchesStack';
import { TurfsStack } from './TurfsStack'; // This is "Find Turfs"
import { LearnStack } from './LearnStack';
import { ProfileStack } from './ProfileStack';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const PlayerTabNavigator: React.FC = () => {
    const theme = useTheme();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.textLight,
                tabBarStyle: {
                    backgroundColor: theme.colors.white,
                    borderTopColor: theme.colors.border,
                    borderTopWidth: 1,
                    height: Platform.OS === 'ios' ? 88 : 60,
                    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStack} // Keep dashboard as main home? Or make Turfs the home?
                options={{
                    title: 'Home',
                }}
            />

            <Tab.Screen
                name="Turfs"
                component={TurfsStack}
                options={{
                    title: 'Find Turfs',
                }}
            />

            <Tab.Screen
                name="Matches"
                component={MatchesStack}
                options={{
                    title: 'Matches',
                }}
            />

            <Tab.Screen
                name="Learn"
                component={LearnStack}
                options={{
                    title: 'Learn',
                }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    title: 'Profile',
                }}
            />
        </Tab.Navigator>
    );
};
