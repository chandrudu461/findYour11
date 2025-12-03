/**
 * Learn Stack Navigator
 * 
 * Handles learning/tutorial screens: LearnHome, Tutorial, CricketRules
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LearnStackParamList } from './types';
import { useTheme } from '../theme';

// Import screens (placeholders for now - will be created in next phase)
// import LearnHomeScreen from '../screens/learn/LearnHomeScreen';
// import TutorialScreen from '../screens/learn/TutorialScreen';
// import CricketRulesScreen from '../screens/learn/CricketRulesScreen';

const Stack = createNativeStackNavigator<LearnStackParamList>();

/**
 * Placeholder screens - to be replaced with actual screens
 */
const PlaceholderScreen = () => null;

export const LearnStack: React.FC = () => {
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
                name="LearnHome"
                component={PlaceholderScreen}
                options={{ title: 'Learn Cricket' }}
            />
            <Stack.Screen
                name="Tutorial"
                component={PlaceholderScreen}
                options={{ title: 'Tutorial' }}
            />
            <Stack.Screen
                name="CricketRules"
                component={PlaceholderScreen}
                options={{ title: 'Cricket Rules' }}
            />
        </Stack.Navigator>
    );
};
