/**
 * Auth Stack Navigator
 * 
 * Handles authentication flow screens: Login, Signup, ForgotPassword
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './types';
import { useTheme } from '../theme';

// Import screens (placeholders for now - will be created in next phase)
// import LoginScreen from '../screens/auth/LoginScreen';
// import SignupScreen from '../screens/auth/SignupScreen';
// import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

/**
 * Placeholder screens - to be replaced with actual screens
 */
const PlaceholderScreen = () => null;

export const AuthStack: React.FC = () => {
    const theme = useTheme();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false, // Hide header for auth screens
                contentStyle: {
                    backgroundColor: theme.colors.white,
                },
            }}
        >
            <Stack.Screen
                name="Login"
                component={PlaceholderScreen}
                options={{ title: 'Login' }}
            />
            <Stack.Screen
                name="Signup"
                component={PlaceholderScreen}
                options={{ title: 'Sign Up' }}
            />
            <Stack.Screen
                name="ForgotPassword"
                component={PlaceholderScreen}
                options={{ title: 'Forgot Password' }}
            />
        </Stack.Navigator>
    );
};
