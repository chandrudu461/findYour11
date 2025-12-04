/**
 * User Service
 * 
 * Handles user authentication and profile management.
 */

import { callLambda } from './awsLambdaClient';

export interface UserProfile {
    id: string;
    name: string;
    phoneNumber: string;
    email?: string;
    role?: string;
    avatarUrl?: string;
}

/**
 * Initiate login with phone number
 */
export const login = async (phoneNumber: string): Promise<{ success: boolean; message: string }> => {
    // Mock API call
    await callLambda('/auth/login', 'POST', { phoneNumber });

    return {
        success: true,
        message: 'OTP sent successfully',
    };
};

/**
 * Verify OTP and authenticate user
 */
export const verifyOtp = async (phoneNumber: string, otp: string): Promise<{ token: string; user: UserProfile }> => {
    // Mock API call
    await callLambda('/auth/verify', 'POST', { phoneNumber, otp });

    return {
        token: 'mock-jwt-token-12345',
        user: {
            id: 'user_1',
            name: 'Rahul Sharma',
            phoneNumber: '+91 98765 43210',
            role: 'Batsman',
        },
    };
};

/**
 * Get current user profile
 */
export const getProfile = async (): Promise<UserProfile> => {
    // Mock API call
    await callLambda('/user/profile', 'GET');

    return {
        id: 'user_1',
        name: 'Rahul Sharma',
        phoneNumber: '+91 98765 43210',
        email: 'rahul.sharma@example.com',
        role: 'Batsman',
        avatarUrl: 'https://example.com/avatar.jpg',
    };
};

/**
 * Update user profile
 */
export const updateProfile = async (data: Partial<UserProfile>): Promise<UserProfile> => {
    // Mock API call
    await callLambda('/user/profile', 'PUT', data);

    return {
        id: 'user_1',
        name: data.name || 'Rahul Sharma',
        phoneNumber: '+91 98765 43210',
        email: data.email || 'rahul.sharma@example.com',
        role: data.role || 'Batsman',
        avatarUrl: 'https://example.com/avatar.jpg',
    };
};
