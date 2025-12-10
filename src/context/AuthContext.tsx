/**
 * Auth Context with Persistent Storage
 * 
 * Global authentication state management using React Context.
 * Persists auth state using AsyncStorage for session persistence.
 * 
 * Features:
 * - Login/logout state management
 * - User profile storage
 * - Token management with AsyncStorage
 * - Auto-login on app startup
 * - Auth status checking
 */

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthService from '../services/authService';

// Storage keys
const STORAGE_KEYS = {
    TOKEN: '@findmy11_token',
    USER: '@findmy11_user',
};

/**
 * Auth state interface
 */
interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    isInitializing: boolean; // True while checking stored auth on startup
    user: AuthService.UserProfile | null;
    token: string | null;
}

/**
 * Auth context interface
 */
interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
    loginWithPhone: (phone: string, password: string) => Promise<{ success: boolean; message?: string }>;
    register: (data: AuthService.RegisterRequest) => Promise<{ success: boolean; message?: string }>;
    logout: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

/**
 * Initial auth state
 */
const initialState: AuthState = {
    isAuthenticated: false,
    isLoading: false,
    isInitializing: true, // Start as true until we check stored auth
    user: null,
    token: null,
};

/**
 * Create auth context
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth provider props
 */
interface AuthProviderProps {
    children: ReactNode;
}

/**
 * Auth provider component
 * Wraps the app and provides auth state to all components
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [state, setState] = useState<AuthState>(initialState);

    /**
     * Check for stored authentication on app startup
     */
    useEffect(() => {
        const checkStoredAuth = async () => {
            try {
                const [storedToken, storedUserJson] = await Promise.all([
                    AsyncStorage.getItem(STORAGE_KEYS.TOKEN),
                    AsyncStorage.getItem(STORAGE_KEYS.USER),
                ]);

                if (storedToken && storedUserJson) {
                    const storedUser = JSON.parse(storedUserJson);

                    // Set the token in AuthService for API calls
                    AuthService.setAuthToken(storedToken);

                    setState({
                        isAuthenticated: true,
                        isLoading: false,
                        isInitializing: false,
                        user: storedUser,
                        token: storedToken,
                    });
                } else {
                    setState(prev => ({ ...prev, isInitializing: false }));
                }
            } catch (error) {
                console.error('Error checking stored auth:', error);
                setState(prev => ({ ...prev, isInitializing: false }));
            }
        };

        checkStoredAuth();
    }, []);

    /**
     * Save auth data to AsyncStorage
     */
    const saveAuthData = async (token: string, user: AuthService.UserProfile) => {
        try {
            await Promise.all([
                AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token),
                AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user)),
            ]);
        } catch (error) {
            console.error('Error saving auth data:', error);
        }
    };

    /**
     * Clear auth data from AsyncStorage
     */
    const clearAuthData = async () => {
        try {
            await Promise.all([
                AsyncStorage.removeItem(STORAGE_KEYS.TOKEN),
                AsyncStorage.removeItem(STORAGE_KEYS.USER),
            ]);
        } catch (error) {
            console.error('Error clearing auth data:', error);
        }
    };

    /**
     * Login with email and password
     */
    const login = useCallback(async (email: string, password: string) => {
        setState(prev => ({ ...prev, isLoading: true }));

        try {
            const response = await AuthService.login(email, password);

            const user = response.user || { name: '', email };

            // Save to AsyncStorage
            await saveAuthData(response.token, user);

            setState({
                isAuthenticated: true,
                isLoading: false,
                isInitializing: false,
                user,
                token: response.token,
            });

            return { success: true };
        } catch (error: any) {
            setState(prev => ({ ...prev, isLoading: false }));
            return {
                success: false,
                message: error.message || 'Login failed. Please try again.',
            };
        }
    }, []);

    /**
     * Login with phone and password
     */
    const loginWithPhone = useCallback(async (phone: string, password: string) => {
        setState(prev => ({ ...prev, isLoading: true }));

        try {
            const response = await AuthService.loginWithPhone(phone, password);

            const user = response.user || { name: '', email: '', phone };

            // Save to AsyncStorage
            await saveAuthData(response.token, user);

            setState({
                isAuthenticated: true,
                isLoading: false,
                isInitializing: false,
                user,
                token: response.token,
            });

            return { success: true };
        } catch (error: any) {
            setState(prev => ({ ...prev, isLoading: false }));
            return {
                success: false,
                message: error.message || 'Login failed. Please try again.',
            };
        }
    }, []);

    /**
     * Register new user
     */
    const register = useCallback(async (data: AuthService.RegisterRequest) => {
        setState(prev => ({ ...prev, isLoading: true }));

        try {
            const response = await AuthService.register(data);

            if (response.success) {
                // After successful registration, log them in
                const loginResult = await login(data.email, data.password);
                return loginResult;
            }

            setState(prev => ({ ...prev, isLoading: false }));

            return {
                success: response.success,
                message: response.message,
            };
        } catch (error: any) {
            setState(prev => ({ ...prev, isLoading: false }));
            return {
                success: false,
                message: error.message || 'Registration failed. Please try again.',
            };
        }
    }, [login]);

    /**
     * Logout user
     */
    const logout = useCallback(async () => {
        // Clear in-memory token
        AuthService.logout();

        // Clear persisted data
        await clearAuthData();

        // Reset state
        setState({
            ...initialState,
            isInitializing: false, // Don't show loading on logout
        });
    }, []);

    /**
     * Refresh user profile
     */
    const refreshProfile = useCallback(async () => {
        if (!state.isAuthenticated) return;

        try {
            const profile = await AuthService.getProfile();

            // Update in storage
            if (state.token) {
                await saveAuthData(state.token, profile);
            }

            setState(prev => ({ ...prev, user: profile }));
        } catch (error) {
            // If profile fetch fails, might need to re-authenticate
            console.error('Failed to refresh profile:', error);
        }
    }, [state.isAuthenticated, state.token]);

    const value: AuthContextType = {
        ...state,
        login,
        loginWithPhone,
        register,
        logout,
        refreshProfile,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Custom hook to use auth context
 * @throws Error if used outside of AuthProvider
 */
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};

/**
 * Export auth context for advanced use cases
 */
export { AuthContext };
