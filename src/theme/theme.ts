/**
 * Theme Configuration
 * 
 * Central theme configuration for FindYour11 app.
 * Includes colors, spacing, border radii, shadows, and typography.
 */

import { Theme } from './types';

export const theme: Theme = {
    /**
     * Color Palette
     * Primary brand colors and semantic colors
     */
    colors: {
        primary: '#0A9E4B',       // Primary Green - Main brand color
        primaryDark: '#066A32',   // Dark Green - Hover states, emphasis
        accent: '#FF8A00',        // Accent Orange - CTAs, highlights
        textDark: '#1E1E1E',      // Text Dark - Primary text color
        textLight: '#666666',     // Text Light - Secondary text color
        bgSoft: '#F4F4F4',        // Background Soft - Light background
        white: '#FFFFFF',         // White - Pure white
        black: '#000000',         // Black - Pure black
        error: '#E53E3E',         // Error - Error states
        success: '#38A169',       // Success - Success states
        warning: '#DD6B20',       // Warning - Warning states
        info: '#3182CE',          // Info - Informational messages
        border: '#E2E8F0',        // Border - Borders and dividers
        placeholder: '#A0AEC0',   // Placeholder - Input placeholders
    },

    /**
     * Spacing System
     * Based on 4px grid system for consistent spacing
     */
    spacing: {
        xs: 4,     // 4px - Tiny spacing
        sm: 8,     // 8px - Small spacing
        md: 16,    // 16px - Medium spacing (base unit)
        lg: 24,    // 24px - Large spacing
        xl: 32,    // 32px - Extra large spacing
        xxl: 48,   // 48px - Section spacing
    },

    /**
     * Border Radii
     * Consistent border radius values
     */
    radii: {
        xs: 2,      // 2px - Subtle rounding
        sm: 4,      // 4px - Small rounding
        md: 8,      // 8px - Medium rounding (cards, buttons)
        lg: 12,     // 12px - Large rounding
        xl: 16,     // 16px - Extra large rounding
        round: 999, // Full rounding (pills, avatars)
    },

    /**
     * Shadows
     * Platform-optimized shadow configurations
     */
    shadows: {
        small: {
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2, // Android elevation
        },
        medium: {
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
            elevation: 4, // Android elevation
        },
        large: {
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 8, // Android elevation
        },
    },

    /**
     * Typography Scale
     * Font sizes, weights, and line heights
     */
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
