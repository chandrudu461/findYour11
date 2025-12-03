/**
 * Main Tab Navigator
 * 
 * Bottom tab navigation with 5 main sections:
 * - Home (Dashboard)
 * - Matches (Match management)
 * - Turfs (Turf booking)
 * - Learn (Tutorials and rules)
 * - Profile (User profile and settings)
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import { useTheme } from '../theme';
import { Platform } from 'react-native';

// Import stack navigators
import { MatchesStack } from './MatchesStack';
import { TurfsStack } from './TurfsStack';
import { LearnStack } from './LearnStack';
import { ProfileStack } from './ProfileStack';

// Placeholder for Home stack (will be created similar to others)
const HomeStack = () => null;

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator: React.FC = () => {
    const theme = useTheme();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false, // Hide header as each stack has its own header
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
                component={HomeStack}
                options={{
                    title: 'Home',
                    // tabBarIcon: ({ color, size }) => <HomeIcon color={color} size={size} />
                }}
            />

            <Tab.Screen
                name="Matches"
                component={MatchesStack}
                options={{
                    title: 'Matches',
                    // tabBarIcon: ({ color, size }) => <MatchIcon color={color} size={size} />
                }}
            />

            <Tab.Screen
                name="Turfs"
                component={TurfsStack}
                options={{
                    title: 'Turfs',
                    // tabBarIcon: ({ color, size }) => <TurfIcon color={color} size={size} />
                }}
            />

            <Tab.Screen
                name="Learn"
                component={LearnStack}
                options={{
                    title: 'Learn',
                    // tabBarIcon: ({ color, size }) => <LearnIcon color={color} size={size} />
                }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    title: 'Profile',
                    // tabBarIcon: ({ color, size }) => <ProfileIcon color={color} size={size} />
                }}
            />
        </Tab.Navigator>
    );
};
