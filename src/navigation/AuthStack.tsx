/**
 * Auth Stack Navigator
 * 
 * Handles authentication flow screens
 * Flow: Splash → Login → OTP Verify → Onboarding
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './types';
import { useTheme } from '../theme';

// Import auth screens
import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import OtpVerifyScreen from '../screens/auth/OtpVerifyScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack: React.FC = () => {
    const theme = useTheme();

    return (
        <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
                headerShown: false, // Hide header for auth screens
                contentStyle: {
                    backgroundColor: theme.colors.white,
                },
            }}
        >
            <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{ title: 'FindYour11' }}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ title: 'Login' }}
            />
            <Stack.Screen
                name="OtpVerify"
                component={OtpVerifyScreen}
                options={{ title: 'Verify OTP' }}
            />
            <Stack.Screen
                name="Onboarding"
                component={OnboardingScreen}
                options={{ title: 'Welcome' }}
            />
        </Stack.Navigator>
    );
};
