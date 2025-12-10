/**
 * Root Navigator
 * 
 * Top-level navigator that handles authentication flow.
 * Automatically navigates based on auth state:
 * - Shows Auth screens when not logged in
 * - Shows Main app when logged in
 * - Shows loading screen while checking stored auth
 */

import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { AuthStack } from './AuthStack';
import { MainTabNavigator } from './MainTabNavigator';
import { useAuth } from '../context';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Loading screen shown while checking stored auth state
 */
const LoadingScreen: React.FC = () => (
    <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF8A00" />
    </View>
);

export const RootNavigator: React.FC = () => {
    const { isAuthenticated, isInitializing } = useAuth();

    // Show loading screen while checking stored auth
    if (isInitializing) {
        return <LoadingScreen />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
            >
                {isAuthenticated ? (
                    // User is logged in - show Main app
                    <Stack.Screen name="Main" component={MainTabNavigator} />
                ) : (
                    // User is not logged in - show Auth screens
                    <Stack.Screen name="Auth" component={AuthStack} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0F0F0F',
    },
});
