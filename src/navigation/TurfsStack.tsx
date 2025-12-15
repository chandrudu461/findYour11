/**
 * Turfs Stack Navigator
 * 
 * Handles turf booking screens
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TurfsStackParamList } from './types';
import { useTheme } from '../theme';

// Import turf screens
import TurfListScreen from '../screens/turfs/TurfListScreen';
import TurfDetailsScreen from '../screens/turfs/TurfDetailsScreen';
import SlotBookingScreen from '../screens/turfs/SlotBookingScreen';
import BookingConfirmationScreen from '../screens/turfs/BookingConfirmationScreen';
import CreateTurfScreen from '../screens/turfs/CreateTurfScreen';
import ManageSlotsScreen from '../screens/turfs/ManageSlotsScreen';

const Stack = createNativeStackNavigator<TurfsStackParamList>();

export const TurfsStack: React.FC = () => {
    const theme = useTheme();

    return (
        <Stack.Navigator
            initialRouteName="TurfsList"
            screenOptions={{
                headerShown: false, // Hide headers (using custom HeaderBar in screens)
                contentStyle: {
                    backgroundColor: theme.colors.bgSoft,
                },
            }}
        >
            <Stack.Screen
                name="TurfsList"
                component={TurfListScreen}
                options={{ title: 'Turfs' }}
            />
            <Stack.Screen
                name="TurfDetails"
                component={TurfDetailsScreen}
                options={{ title: 'Turf Details' }}
            />
            <Stack.Screen
                name="BookTurf"
                component={SlotBookingScreen}
                options={{ title: 'Book Slot' }}
            />
            <Stack.Screen
                name="BookingConfirmation"
                component={BookingConfirmationScreen}
                options={{ title: 'Booking Confirmed' }}
            />
            <Stack.Screen
                name="CreateTurf"
                component={CreateTurfScreen}
                options={{ title: 'Create Turf' }}
            />
            <Stack.Screen
                name="ManageSlots"
                component={ManageSlotsScreen}
                options={{ title: 'Manage Slots' }}
            />
        </Stack.Navigator>
    );
};
