/**
 * Learn Stack Navigator
 * 
 * Handles learning/tutorial screens: LearnHome, LessonDetail, CricketRules
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LearnStackParamList } from './types';
import { useTheme } from '../theme';

// Import screens
import LearnHomeScreen from '../screens/learn/LearnHomeScreen';
import LessonDetailScreen from '../screens/learn/LessonDetailScreen';
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
            initialRouteName="LearnHome"
            screenOptions={{
                headerShown: false, // Using custom headers in screens
                contentStyle: {
                    backgroundColor: theme.colors.bgSoft,
                },
            }}
        >
            <Stack.Screen
                name="LearnHome"
                component={LearnHomeScreen}
                options={{ title: 'Learn Cricket' }}
            />
            <Stack.Screen
                name="LessonDetail"
                component={LessonDetailScreen}
                options={{ title: 'Lesson' }}
            />
            <Stack.Screen
                name="CricketRules"
                component={PlaceholderScreen}
                options={{ title: 'Cricket Rules' }}
            />
        </Stack.Navigator>
    );
};
