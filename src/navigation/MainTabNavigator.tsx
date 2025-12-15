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
import { useAuth } from '../context';
import { PlayerTabNavigator } from './PlayerTabNavigator';
import { TurfOwnerTabNavigator } from './TurfOwnerTabNavigator';
import { View, ActivityIndicator } from 'react-native';

export const MainTabNavigator: React.FC = () => {
    const { user, isInitializing } = useAuth();

    if (isInitializing) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    // Role-based navigation
    if (user?.role === 'turf_owner') {
        return <TurfOwnerTabNavigator />;
    }

    // Default to Player navigation
    return <PlayerTabNavigator />;
};
