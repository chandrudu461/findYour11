/**
 * Matches Stack Navigator
 * 
 * Handles match-related screens: MatchesList, MatchDetails, CreateMatch
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MatchesStackParamList } from './types';
import { useTheme } from '../theme';

// Import match screens
import MatchExploreScreen from '../screens/matches/MatchExploreScreen';
import MatchDetailsScreen from '../screens/matches/MatchDetailsScreen';
import CreateMatchScreen from '../screens/matches/CreateMatchScreen';

const Stack = createNativeStackNavigator<MatchesStackParamList>();

export const MatchesStack: React.FC = () => {
    const theme = useTheme();

    return (
        <Stack.Navigator
            initialRouteName="MatchesList"
            screenOptions={{
                headerShown: false, // Hide headers (using custom HeaderBar in screens)
                contentStyle: {
                    backgroundColor: theme.colors.bgSoft,
                },
            }}
        >
            <Stack.Screen
                name="MatchesList"
                component={MatchExploreScreen}
                options={{ title: 'Matches' }}
            />
            <Stack.Screen
                name="MatchDetails"
                component={MatchDetailsScreen}
                options={{ title: 'Match Details' }}
            />
            <Stack.Screen
                name="CreateMatch"
                component={CreateMatchScreen}
                options={{ title: 'Create Match' }}
            />
        </Stack.Navigator>
    );
};

