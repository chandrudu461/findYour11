/**
 * Authentication Service
 * 
 * Handles all authentication-related API calls:
 * - Login with email/password or phone/password
 * - Register new user
 * - Get user profile
 * - Refresh token
 * - Logout
 * 
 * API Base URL: https://3ogqoj3opa.execute-api.ap-south-1.amazonaws.com
 */

// API Configuration
const API_BASE_URL = 'https://3ogqoj3opa.execute-api.ap-south-1.amazonaws.com';

/**
 * User profile interface
 */
export interface UserProfile {
    user_id?: number;
    id?: string;
    name?: string;
    full_name?: string;
    email: string;
    phone?: string;
    role?: string;
    skill_level?: string;
    avatarUrl?: string;
    createdAt?: string;
}

/**
 * Login request payload
 */
export interface LoginRequest {
    email?: string;
    phone?: string;
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
    role?: 'player' | 'turf_owner'; // Optional role for future backend support
}

/**
 * Register response
 */
export interface RegisterResponse {
    success: boolean;
    message: string;
    data?: {
        user_id: number;
        message: string;
    };
}

/**
 * API Response wrapper
 */
interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
}

/**
 * API Error interface
 */
export interface ApiError {
    message: string;
    statusCode?: number;
}

/**
 * Token storage - In-memory (AsyncStorage handled by AuthContext)
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
export const apiRequest = async <T>(
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

        // Handle wrapped responses (all backend responses are wrapped in success/data/message)
        // If T is requested as is, return data.data if it exists, otherwise return data
        // This is a bit tricky with Typescript generics, so we'll trust the caller handles the structure or we unwrap here if it matches standard response
        if (data.success !== undefined && data.data !== undefined) {
            return data.data as T;
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
 */
export const login = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
        throw { message: data.message || 'Login failed' } as ApiError;
    }

    // Backend returns success: true, data: { token, user }
    const { token, user } = data.data;

    if (token) {
        setAuthToken(token);
    }

    return { token, user };
};

/**
 * Login with phone and password
 */
export const loginWithPhone = async (phone: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
        throw { message: data.message || 'Login failed' } as ApiError;
    }

    const { token, user } = data.data;

    if (token) {
        setAuthToken(token);
    }

    return { token, user };
};

/**
 * Register a new user
 */
export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
        return {
            success: false,
            message: result.message || 'Registration failed'
        };
    }

    return {
        success: true,
        message: result.message || 'Registration successful',
        data: result.data
    };
};

/**
 * Get current user's profile (requires auth)
 */
export const getProfile = async (): Promise<UserProfile> => {
    return apiRequest<UserProfile>(
        '/auth/profile',
        'GET',
        undefined,
        true
    );
};

/**
 * Refresh the authentication token (requires auth)
 */
export const refreshToken = async (): Promise<{ token: string }> => {
    const data = await apiRequest<{ token: string }>(
        '/auth/refresh',
        'POST',
        undefined,
        true
    );

    if (data.token) {
        setAuthToken(data.token);
    }

    return data;
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
