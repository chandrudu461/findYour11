/**
 * Turf Service
 * 
 * Placeholder API functions for turf booking operations.
 * In a real app, these would call backend APIs.
 */

/**
 * Turf type definition
 */
export interface Turf {
    id: string;
    name: string;
    location: string;
    city: string;
    price: number;
    rating: number;
    surface: string;
    size: string;
    amenities: string[];
    description: string;
    imageUrl?: string;
}

/**
 * Time slot type
 */
export interface TimeSlot {
    id: string;
    time: string;
    available: boolean;
    price: number;
}

/**
 * Booking type
 */
export interface Booking {
    id: string;
    turfId: string;
    turfName: string;
    date: string;
    slot: TimeSlot;
    totalPrice: number;
    status: 'Confirmed' | 'Pending' | 'Cancelled';
    bookingDate: string;
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
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockTurfs: Turf[] = [
        {
            id: 'turf_1',
            name: 'Green Valley Cricket Ground',
            location: 'Koramangala',
            city: 'Bangalore',
            price: 2500,
            rating: 4.8,
            surface: 'Natural Grass',
            size: '90m x 60m',
            amenities: ['Floodlights', 'Changing Rooms', 'Parking', 'Refreshments'],
            description: 'Premium cricket ground with natural grass surface and modern facilities.',
        },
        {
            id: 'turf_2',
            name: 'Champions Cricket Arena',
            location: 'Andheri West',
            city: 'Mumbai',
            price: 3000,
            rating: 4.9,
            surface: 'Artificial Turf',
            size: '100m x 70m',
            amenities: ['Floodlights', 'Changing Rooms', 'Parking', 'Cafe', 'Scoreboard'],
            description: 'State-of-the-art cricket arena perfect for tournaments.',
        },
        {
            id: 'turf_3',
            name: 'City Sports Complex',
            location: 'Hitech City',
            city: 'Hyderabad',
            price: 2000,
            rating: 4.6,
            surface: 'Hybrid Turf',
            size: '85m x 65m',
            amenities: ['Floodlights', 'Changing Rooms', 'Parking'],
            description: 'Affordable cricket ground with hybrid turf surface.',
        },
    ];

    console.log('[turfService] Fetched turfs with filters:', filters);
    return mockTurfs;
};

/**
 * Get turf details by ID
 */
export const getTurfDetails = async (turfId: string): Promise<Turf> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const mockTurf: Turf = {
        id: turfId,
        name: 'Green Valley Cricket Ground',
        location: 'Koramangala',
        city: 'Bangalore',
        price: 2500,
        rating: 4.8,
        surface: 'Natural Grass',
        size: '90m x 60m',
        amenities: ['Floodlights', 'Changing Rooms', 'Parking', 'Refreshments', 'First Aid'],
        description: 'Premium cricket ground with natural grass surface and modern facilities. Perfect for professional matches and training sessions.',
    };

    console.log('[turfService] Fetched turf details:', turfId);
    return mockTurf;
};

/**
 * Get available time slots for a turf on a specific date
 */
export const getAvailableSlots = async (
    turfId: string,
    date: string
): Promise<TimeSlot[]> => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const mockSlots: TimeSlot[] = [
        { id: 'slot_1', time: '06:00 AM - 08:00 AM', available: true, price: 2000 },
        { id: 'slot_2', time: '08:00 AM - 10:00 AM', available: true, price: 2000 },
        { id: 'slot_3', time: '10:00 AM - 12:00 PM', available: false, price: 2500 },
        { id: 'slot_4', time: '12:00 PM - 02:00 PM', available: true, price: 2500 },
        { id: 'slot_5', time: '02:00 PM - 04:00 PM', available: true, price: 2500 },
        { id: 'slot_6', time: '04:00 PM - 06:00 PM', available: false, price: 3000 },
        { id: 'slot_7', time: '06:00 PM - 08:00 PM', available: true, price: 3000 },
        { id: 'slot_8', time: '08:00 PM - 10:00 PM', available: true, price: 3000 },
    ];

    console.log('[turfService] Fetched slots for:', turfId, date);
    return mockSlots;
};

/**
 * Create a new booking
 */
export const createBooking = async (bookingData: {
    turfId: string;
    date: string;
    slotId: string;
}): Promise<Booking> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const mockBooking: Booking = {
        id: `booking_${Date.now()}`,
        turfId: bookingData.turfId,
        turfName: 'Green Valley Cricket Ground',
        date: bookingData.date,
        slot: {
            id: bookingData.slotId,
            time: '06:00 PM - 08:00 PM',
            available: false,
            price: 3000,
        },
        totalPrice: 3000,
        status: 'Confirmed',
        bookingDate: new Date().toISOString(),
    };

    console.log('[turfService] Created booking:', mockBooking);
    return mockBooking;
};

/**
 * Get user's bookings
 */
export const getBookings = async (): Promise<Booking[]> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const mockBookings: Booking[] = [
        {
            id: 'booking_1',
            turfId: 'turf_1',
            turfName: 'Green Valley Cricket Ground',
            date: '2025-12-15',
            slot: {
                id: 'slot_7',
                time: '06:00 PM - 08:00 PM',
                available: false,
                price: 3000,
            },
            totalPrice: 3000,
            status: 'Confirmed',
            bookingDate: '2025-12-01T10:30:00Z',
        },
    ];

    console.log('[turfService] Fetched bookings');
    return mockBookings;
};
