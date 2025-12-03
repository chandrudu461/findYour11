/**
 * Theme Provider
 * 
 * React Context provider for global theme access throughout the app.
 * Provides theme object to all child components via useTheme hook.
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { theme } from './theme';
import { Theme } from './types';

// Create theme context
const ThemeContext = createContext<Theme | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

/**
 * ThemeProvider Component
 * 
 * Wraps the app and provides theme context to all children.
 * 
 * @example
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};

/**
 * useTheme Hook
 * 
 * Custom hook to access theme values in any component.
 * Must be used within ThemeProvider.
 * 
 * @returns Theme object with colors, spacing, radii, shadows, and typography
 * 
 * @example
 * const theme = useTheme();
 * 
 * <View style={{ backgroundColor: theme.colors.primary }}>
 *   <Text style={{ fontSize: theme.typography.h1.fontSize }}>
 *     Hello World
 *   </Text>
 * </View>
 */
export const useTheme = (): Theme => {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
};
