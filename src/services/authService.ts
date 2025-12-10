/**
 * Authentication Service
 * 
 * Handles all authentication-related API calls:
 * - Login with email/password
 * - Register new user
 * - Get user profile
 * - Refresh token
 * 
 * API Base URL: https://3ogqoj3opa.execute-api.ap-south-1.amazonaws.com
 */

// API Configuration
const API_BASE_URL = 'https://3ogqoj3opa.execute-api.ap-south-1.amazonaws.com';

/**
 * User profile interface
 */
export interface UserProfile {
    id?: string;
    name: string;
    email: string;
    phone?: string;
    role?: string;
    avatarUrl?: string;
    createdAt?: string;
}

/**
 * Login request payload
 */
export interface LoginRequest {
    email: string;
    password: string;
}

/**
 * Login response
 */
export interface LoginResponse {
    token: string;
    user?: UserProfile;
    message?: string;
}

/**
 * Register request payload
 */
export interface RegisterRequest {
    name: string;
    email: string;
    phone: string;
    password: string;
}

/**
 * Register response
 */
export interface RegisterResponse {
    success: boolean;
    message: string;
    user?: UserProfile;
    token?: string;
}

/**
 * API Error interface
 */
export interface ApiError {
    message: string;
    statusCode?: number;
}

/**
 * Token storage - In-memory for now
 * In production, use SecureStore (Expo) or AsyncStorage
 */
let authToken: string | null = null;

/**
 * Set the auth token
 */
export const setAuthToken = (token: string | null): void => {
    authToken = token;
};

/**
 * Get the current auth token
 */
export const getAuthToken = (): string | null => {
    return authToken;
};

/**
 * Clear auth token (logout)
 */
export const clearAuthToken = (): void => {
    authToken = null;
};

/**
 * Make authenticated API request
 */
const apiRequest = async <T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: object,
    requiresAuth: boolean = false
): Promise<T> => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (requiresAuth && authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }

    const config: RequestInit = {
        method,
        headers,
    };

    if (body && (method === 'POST' || method === 'PUT')) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

        const data = await response.json();

        if (!response.ok) {
            throw {
                message: data.message || 'Request failed',
                statusCode: response.status,
            } as ApiError;
        }

        return data as T;
    } catch (error: any) {
        // Network error or parsing error
        if (error.message === 'Network request failed') {
            throw {
                message: 'Network error. Please check your connection.',
                statusCode: 0,
            } as ApiError;
        }
        throw error;
    }
};

/**
 * Login with email and password
 * 
 * @param email - User's email address
 * @param password - User's password
 * @returns Promise with token and user data
 */
export const login = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await apiRequest<LoginResponse>(
        '/auth/login',
        'POST',
        { email, password }
    );

    // Store token if received
    if (response.token) {
        setAuthToken(response.token);
    }

    return response;
};

/**
 * Register a new user
 * 
 * @param data - Registration data (name, email, phone, password)
 * @returns Promise with success status and message
 */
export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await apiRequest<RegisterResponse>(
        '/users/register',
        'POST',
        data
    );

    // Store token if received
    if (response.token) {
        setAuthToken(response.token);
    }

    return response;
};

/**
 * Get current user's profile
 * Requires authentication
 * 
 * @returns Promise with user profile data
 */
export const getProfile = async (): Promise<UserProfile> => {
    return apiRequest<UserProfile>(
        '/auth/profile',
        'GET',
        undefined,
        true // requires auth
    );
};

/**
 * Refresh the authentication token
 * Requires authentication
 * 
 * @returns Promise with new token
 */
export const refreshToken = async (): Promise<{ token: string }> => {
    const response = await apiRequest<{ token: string }>(
        '/auth/refresh',
        'POST',
        undefined,
        true // requires auth
    );

    // Update stored token
    if (response.token) {
        setAuthToken(response.token);
    }

    return response;
};

/**
 * Logout - Clear stored token
 */
export const logout = (): void => {
    clearAuthToken();
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
    return authToken !== null;
};
