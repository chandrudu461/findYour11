/**
 * Root Navigator
 * 
 * Top-level navigation that handles switching between:
 * - Auth flow (login/signup)
 * - Main app flow (tab navigator)
 * 
 * In a real app, this would check authentication state
 * and conditionally render Auth or Main navigator.
 */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

// Import navigators
import { AuthStack } from './AuthStack';
import { MainTabNavigator } from './MainTabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
    /**
     * TODO: Replace with actual authentication state management
     * For now, we'll default to showing the Main navigator
     * 
     * In a real app, you would:
     * 1. Check AsyncStorage for auth token
     * 2. Validate token with backend
     * 3. Show Auth stack if not authenticated, Main if authenticated
     */
    const [isAuthenticated] = useState(true); // Change to false to test Auth flow

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isAuthenticated ? (
                    // Main app flow (authenticated users)
                    <Stack.Screen name="Main" component={MainTabNavigator} />
                ) : (
                    // Auth flow (non-authenticated users)
                    <Stack.Screen name="Auth" component={AuthStack} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
