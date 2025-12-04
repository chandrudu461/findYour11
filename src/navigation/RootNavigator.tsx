/**
 * Root Navigator
 * 
 * Top-level navigator that handles authentication flow.
 * Both Auth and Main screens are registered so navigation can transition between them.
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { AuthStack } from './AuthStack';
import { MainTabNavigator } from './MainTabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Auth"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Auth" component={AuthStack} />
                <Stack.Screen name="Main" component={MainTabNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
