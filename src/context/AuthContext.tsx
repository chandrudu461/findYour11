/**
 * Auth Context
 * 
 * Global authentication state management using React Context.
 * Provides auth state and methods to all components.
 * 
 * Features:
 * - Login/logout state management
 * - User profile storage
 * - Token management
 * - Auth status checking
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import * as AuthService from '../services/authService';

/**
 * Auth state interface
 */
interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: AuthService.UserProfile | null;
    token: string | null;
}

/**
 * Auth context interface
 */
interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
    register: (data: AuthService.RegisterRequest) => Promise<{ success: boolean; message?: string }>;
    logout: () => void;
    refreshProfile: () => Promise<void>;
}

/**
 * Initial auth state
 */
const initialState: AuthState = {
    isAuthenticated: false,
    isLoading: false,
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
     * Login with email and password
     */
    const login = useCallback(async (email: string, password: string) => {
        setState(prev => ({ ...prev, isLoading: true }));

        try {
            const response = await AuthService.login(email, password);

            setState({
                isAuthenticated: true,
                isLoading: false,
                user: response.user || { name: '', email },
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

            if (response.success && response.token) {
                setState({
                    isAuthenticated: true,
                    isLoading: false,
                    user: response.user || { name: data.name, email: data.email },
                    token: response.token,
                });
            } else {
                setState(prev => ({ ...prev, isLoading: false }));
            }

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
    }, []);

    /**
     * Logout user
     */
    const logout = useCallback(() => {
        AuthService.logout();
        setState(initialState);
    }, []);

    /**
     * Refresh user profile
     */
    const refreshProfile = useCallback(async () => {
        if (!state.isAuthenticated) return;

        try {
            const profile = await AuthService.getProfile();
            setState(prev => ({ ...prev, user: profile }));
        } catch (error) {
            // If profile fetch fails, might need to re-authenticate
            console.error('Failed to refresh profile:', error);
        }
    }, [state.isAuthenticated]);

    const value: AuthContextType = {
        ...state,
        login,
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
