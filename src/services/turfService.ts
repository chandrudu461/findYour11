/**
 * Turf Service
 * 
 * API functions for turf operations using backend endpoints.
 */

import { apiRequest } from './authService';

/**
 * Turf type definition
 */
export interface Turf {
    turf_id: string; // Backend uses turf_id
    id?: string; // Frontend compatibility
    turf_name: string; // Backend uses turf_name
    name?: string; // Frontend compatibility
    location: string;
    city: string;
    price_per_hour: number; // Backend uses price_per_hour
    price?: number; // Frontend compatibility
    rating?: number;
    surface?: string;
    size?: string;
    amenities?: string[];
    description?: string;
    imageUrl?: string;
    is_active?: boolean;
}

/**
 * Time slot type
 */
export interface TimeSlot {
    slot_id: string; // Backend uses slot_id
    id?: string; // Frontend compatibility
    date: string;
    start_time: string;
    end_time: string;
    is_booked: boolean | number;
    available?: boolean; // Frontend compatibility
    price?: number;
    time?: string; // Frontend compatibility
}

/**
 * Booking type
 */
export interface Booking {
    booking_id: string;
    id?: string;
    turf_id?: string;
    turfId?: string;
    turfName?: string;
    date: string;
    slot_id: string;
    slotId?: string;
    total_amount: number;
    totalPrice?: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    booked_by: number;
    created_at?: string;
}

/**
 * Turf filters
 */
export interface TurfFilters {
    city?: string;
    maxPrice?: number;
    surface?: string;
}

/**
 * Get list of turfs with optional filters
 */
export const getTurfs = async (filters?: TurfFilters): Promise<Turf[]> => {
    let endpoint = '/turfs';
    const params = new URLSearchParams();

    if (filters?.city) {
        params.append('city', filters.city);
    }

    if (params.toString()) {
        endpoint += `?${params.toString()}`;
    }

    const turfs = await apiRequest<Turf[]>(endpoint, 'GET');

    // Map backend fields to frontend interface if needed
    return turfs.map(t => ({
        ...t,
        id: t.turf_id, // Map turf_id to id
        name: t.turf_name, // Map turf_name to name
        price: t.price_per_hour, // Map price_per_hour to price
        // Add defaults for UI-only fields
        rating: 4.5,
        surface: 'Artificial Turf',
        size: 'Standard',
        amenities: ['Floodlights', 'Parking', 'Change Room'],
    }));
};

/**
 * Get turf details by ID
 */
export const getTurfDetails = async (turfId: string): Promise<Turf> => {
    const turf = await apiRequest<Turf>(`/turfs/${turfId}`, 'GET');

    return {
        ...turf,
        id: turf.turf_id,
        name: turf.turf_name,
        price: turf.price_per_hour,
        rating: 4.8,
        surface: 'Premium Grass',
        size: 'Tournament Size',
        amenities: ['Floodlights', 'Pavilion', 'Parking', 'Cafe'],
        description: `Experience professional cricket at ${turf.turf_name}. Located in ${turf.city}, this ground offers premium facilities.`,
    };
};

/**
 * Get available time slots for a turf on a specific date
 */
export const getAvailableSlots = async (
    turfId: string,
    date: string
): Promise<TimeSlot[]> => {
    const slots = await apiRequest<TimeSlot[]>(
        `/turfs/${turfId}/slots?date=${date}`,
        'GET'
    );

    return slots.map(s => ({
        ...s,
        id: s.slot_id,
        time: `${s.start_time} - ${s.end_time}`,
        available: !s.is_booked, // Convert 0/1 or false/true to available boolean
        price: 2000,
    }));
};

/**
 * Create a new booking
 */
export const createBooking = async (bookingData: {
    turfId: string;
    date: string;
    slotId: string;
    userId: number;
    amount: number;
}): Promise<Booking> => {
    const booking = await apiRequest<Booking>(
        '/bookings',
        'POST',
        {
            slot_id: parseInt(bookingData.slotId),
            booked_by: bookingData.userId,
            total_amount: bookingData.amount
        },
        true
    );

    // Clean up response for frontend consumption
    return {
        ...booking,
        id: booking.booking_id,
        status: 'confirmed', // Assuming auto-confirm for now or pending based on backend
        totalPrice: booking.total_amount,
        turfId: bookingData.turfId
    };
};

/**
 * Get user's bookings
 * Note: Backend endpoint for 'my bookings' is not yet implemented in provided list.
 * Returning empty for now or mock.
 */
export const getBookings = async (): Promise<Booking[]> => {
    // Placeholder until GET /bookings is implemented for users
    // await new Promise(r => setTimeout(r, 500));
    return [];
};
