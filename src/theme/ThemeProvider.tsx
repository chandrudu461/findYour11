/**
 * Theme Provider
 * 
 * React Context provider for global theme access throughout the app.
 * Provides theme object to all child components via useTheme hook.
 * Automatically detects and applies system color scheme (light/dark).
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { theme as lightTheme } from './theme';
import { darkTheme } from './darkTheme';
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
 * Automatically switches between light and dark themes based on system settings.
 * 
 * @example
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

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
 * Returns the appropriate theme (light or dark) based on system settings.
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
