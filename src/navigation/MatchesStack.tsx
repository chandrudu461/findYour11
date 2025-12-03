/**
 * Matches Stack Navigator
 * 
 * Handles match-related screens: MatchesList, MatchDetails, CreateMatch
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MatchesStackParamList } from './types';
import { useTheme } from '../theme';

// Import screens (placeholders for now - will be created in next phase)
// import MatchesListScreen from '../screens/matches/MatchesListScreen';
// import MatchDetailsScreen from '../screens/matches/MatchDetailsScreen';
// import CreateMatchScreen from '../screens/matches/CreateMatchScreen';

const Stack = createNativeStackNavigator<MatchesStackParamList>();

/**
 * Placeholder screens - to be replaced with actual screens
 */
const PlaceholderScreen = () => null;

export const MatchesStack: React.FC = () => {
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
                name="MatchesList"
                component={PlaceholderScreen}
                options={{ title: 'Matches' }}
            />
            <Stack.Screen
                name="MatchDetails"
                component={PlaceholderScreen}
                options={{ title: 'Match Details' }}
            />
            <Stack.Screen
                name="CreateMatch"
                component={PlaceholderScreen}
                options={{ title: 'Create Match' }}
            />
        </Stack.Navigator>
    );
};
