/**
 * Turf Owner Tab Navigator
 * 
 * Simplified navigation for turf owners:
 * - My Turfs (Manage Turfs & Slots)
 * - Profile (Account Settings)
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import { useTheme } from '../theme';
import { Platform } from 'react-native';

// Import stack navigators
// We need to create a MyTurfsStack if it doesn't exist, or reuse TurfsStack but pointing to MyTurfs
import { MyTurfsStack } from './MyTurfsStack';
import { ProfileStack } from './ProfileStack';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const TurfOwnerTabNavigator: React.FC = () => {
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
                name="Turfs"
                component={MyTurfsStack}
                options={{
                    title: 'My Turfs',
                    tabBarLabel: 'My Turfs',
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
