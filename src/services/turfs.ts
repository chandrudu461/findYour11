/**
 * Turfs Service
 * 
 * Handles turf listing, details, and booking.
 */

import { callLambda } from './awsLambdaClient';
import { Turf, TimeSlot, Booking } from './turfService'; // Reusing types from existing service

/**
 * List available turfs
 */
export const listTurfs = async (filters?: any): Promise<Turf[]> => {
    // Mock API call
    await callLambda('/turfs', 'GET', filters);

    return [
        {
            id: 'turf_1',
            name: 'Green Valley Cricket Ground',
            location: 'Koramangala',
            city: 'Bangalore',
            price: 2500,
            rating: 4.8,
            surface: 'Natural Grass',
            size: '90m x 60m',
            amenities: ['Floodlights', 'Changing Rooms', 'Parking'],
            description: 'Premium cricket ground.',
        },
        {
            id: 'turf_2',
            name: 'Champions Arena',
            location: 'Indiranagar',
            city: 'Bangalore',
            price: 3000,
            rating: 4.9,
            surface: 'Artificial Turf',
            size: '80m x 50m',
            amenities: ['Floodlights', 'Cafe'],
            description: 'Modern arena for night matches.',
        },
    ];
};

/**
 * Get details of a specific turf
 */
export const getTurfDetails = async (turfId: string): Promise<Turf> => {
    // Mock API call
    await callLambda(`/turfs/${turfId}`, 'GET');

    return {
        id: turfId,
        name: 'Green Valley Cricket Ground',
        location: 'Koramangala',
        city: 'Bangalore',
        price: 2500,
        rating: 4.8,
        surface: 'Natural Grass',
        size: '90m x 60m',
        amenities: ['Floodlights', 'Changing Rooms', 'Parking', 'Refreshments'],
        description: 'Premium cricket ground with natural grass surface and modern facilities.',
    };
};

/**
 * Book a time slot
 */
export const bookSlot = async (turfId: string, date: string, slotId: string): Promise<Booking> => {
    // Mock API call
    await callLambda('/bookings', 'POST', { turfId, date, slotId });

    return {
        id: `booking_${Date.now()}`,
        turfId,
        turfName: 'Green Valley Cricket Ground',
        date,
        slot: {
            id: slotId,
            time: '06:00 PM - 08:00 PM',
            available: false,
            price: 2500,
        },
        totalPrice: 2500,
        status: 'Confirmed',
        bookingDate: new Date().toISOString(),
    };
};
