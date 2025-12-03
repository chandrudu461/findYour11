/**
 * Turfs Stack Navigator
 * 
 * Handles turf booking screens: TurfsList, TurfDetails, BookTurf
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TurfsStackParamList } from './types';
import { useTheme } from '../theme';

// Import screens (placeholders for now - will be created in next phase)
// import TurfsListScreen from '../screens/turfs/TurfsListScreen';
// import TurfDetailsScreen from '../screens/turfs/TurfDetailsScreen';
// import BookTurfScreen from '../screens/turfs/BookTurfScreen';

const Stack = createNativeStackNavigator<TurfsStackParamList>();

/**
 * Placeholder screens - to be replaced with actual screens
 */
const PlaceholderScreen = () => null;

export const TurfsStack: React.FC = () => {
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
                name="TurfsList"
                component={PlaceholderScreen}
                options={{ title: 'Turfs' }}
            />
            <Stack.Screen
                name="TurfDetails"
                component={PlaceholderScreen}
                options={{ title: 'Turf Details' }}
            />
            <Stack.Screen
                name="BookTurf"
                component={PlaceholderScreen}
                options={{ title: 'Book Turf' }}
            />
        </Stack.Navigator>
    );
};
