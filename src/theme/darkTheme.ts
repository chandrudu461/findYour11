/**
 * Dark Theme Configuration
 * 
 * Dark mode colors for FindYour11 app.
 */

import { Theme } from './types';

export const darkTheme: Theme = {
    colors: {
        primary: '#10B462',           // Brighter green for dark mode
        primaryDark: '#0A9E4B',       // Standard green
        accent: '#FFA033',            // Brighter orange
        textDark: '#F5F5F5',          // Light text for dark backgrounds
        textLight: '#B0B0B0',         // Dimmed light text
        bgSoft: '#1A1A1A',            // Dark background
        white: '#121212',             // Dark surface (not pure black for OLED)
        black: '#FFFFFF',             // Inverted for dark mode
        error: '#FF6B6B',             // Softer red for dark
        success: '#4ADE80',           // Brighter green
        warning: '#FCA311',           // Brighter warning
        info: '#60A5FA',              // Brighter blue
        border: '#2A2A2A',            // Dark border
        placeholder: '#666666',       // Darker placeholder
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
    },
    radii: {
        xs: 2,
        sm: 4,
        md: 8,
        lg: 12,
        xl: 16,
        round: 999,
    },
    shadows: {
        small: {
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.3,
            shadowRadius: 2,
            elevation: 2,
        },
        medium: {
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 4,
            elevation: 4,
        },
        large: {
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 8,
            elevation: 8,
        },
    },
    typography: {
        h1: {
            fontSize: 32,
            fontWeight: '700',
            lineHeight: 40,
        },
        h2: {
            fontSize: 28,
            fontWeight: '700',
            lineHeight: 36,
        },
        h3: {
            fontSize: 24,
            fontWeight: '600',
            lineHeight: 32,
        },
        h4: {
            fontSize: 20,
            fontWeight: '600',
            lineHeight: 28,
        },
        body: {
            fontSize: 16,
            fontWeight: '400',
            lineHeight: 24,
        },
        bodySmall: {
            fontSize: 14,
            fontWeight: '400',
            lineHeight: 20,
        },
        caption: {
            fontSize: 12,
            fontWeight: '400',
            lineHeight: 16,
        },
    },
};
