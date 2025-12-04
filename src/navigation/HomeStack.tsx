/**
 * Home Stack Navigator
 * 
 * Handles home-related screens: Dashboard (HomeScreen), Notifications
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParamList } from './types';
import { useTheme } from '../theme';

// Import home screens
import HomeScreen from '../screens/home/HomeScreen';
import NotificationsScreen from '../screens/home/NotificationsScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStack: React.FC = () => {
    const theme = useTheme();

    return (
        <Stack.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
                headerShown: false, // Hide header for home screens (using custom headers)
                contentStyle: {
                    backgroundColor: theme.colors.bgSoft,
                },
            }}
        >
            <Stack.Screen
                name="Dashboard"
                component={HomeScreen}
                options={{ title: 'Home' }}
            />
            <Stack.Screen
                name="Notifications"
                component={NotificationsScreen}
                options={{ title: 'Notifications' }}
            />
        </Stack.Navigator>
    );
};
