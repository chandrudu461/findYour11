/**
 * My Turfs Stack - For Turf Owners
 * 
 * Screens:
 * - MyTurfs (Dashboard)
 * - CreateTurf
 * - ManageSlots
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TurfsStackParamList } from './types';
import MyTurfsScreen from '../screens/turfs/MyTurfsScreen';
import CreateTurfScreen from '../screens/turfs/CreateTurfScreen';
import SlotGeneratorScreen from '../screens/turfs/SlotGeneratorScreen';
import LocationPickerScreen from '../screens/turfs/LocationPickerScreen';

const Stack = createNativeStackNavigator<TurfsStackParamList>();

export const MyTurfsStack: React.FC = () => {
    return (
        <Stack.Navigator
            initialRouteName="MyTurfs"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#FFFFFF',
                },
                headerTintColor: '#0F0F0F',
                headerTitleStyle: {
                    fontWeight: '600',
                },
            }}
        >
            <Stack.Screen
                name="MyTurfs"
                component={MyTurfsScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CreateTurf"
                component={CreateTurfScreen}
                options={{ title: 'Create New Turf' }}
            />
            <Stack.Screen
                name="ManageSlots"
                component={SlotGeneratorScreen}
                options={{ title: 'Generate Slots' }}
            />
            <Stack.Screen
                name="LocationPicker"
                component={LocationPickerScreen}
                options={{ title: 'Select Location' }}
            />
        </Stack.Navigator>
    );
};
