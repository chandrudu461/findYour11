/**
 * Theme Type Definitions
 * 
 * Defines TypeScript types for the theme system to ensure type safety
 * throughout the application.
 */

export interface ThemeColors {
    primary: string;
    primaryDark: string;
    accent: string;
    textDark: string;
    textLight: string;
    bgSoft: string;
    white: string;
    black: string;
    error: string;
    success: string;
    warning: string;
    info: string;
    border: string;
    placeholder: string;
}

export interface ThemeSpacing {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
}

export interface ThemeRadii {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    round: number;
}

export interface ThemeShadows {
    small: {
        shadowColor: string;
        shadowOffset: { width: number; height: number };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
    };
    medium: {
        shadowColor: string;
        shadowOffset: { width: number; height: number };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
    };
    large: {
        shadowColor: string;
        shadowOffset: { width: number; height: number };
        shadowOpacity: number;
        shadowRadius: number;
        elevation: number;
    };
}

export interface ThemeTypography {
    h1: {
        fontSize: number;
        fontWeight: '700' | '600' | '500' | '400';
        lineHeight: number;
    };
    h2: {
        fontSize: number;
        fontWeight: '700' | '600' | '500' | '400';
        lineHeight: number;
    };
    h3: {
        fontSize: number;
        fontWeight: '700' | '600' | '500' | '400';
        lineHeight: number;
    };
    h4: {
        fontSize: number;
        fontWeight: '700' | '600' | '500' | '400';
        lineHeight: number;
    };
    body: {
        fontSize: number;
        fontWeight: '700' | '600' | '500' | '400';
        lineHeight: number;
    };
    bodySmall: {
        fontSize: number;
        fontWeight: '700' | '600' | '500' | '400';
        lineHeight: number;
    };
    caption: {
        fontSize: number;
        fontWeight: '700' | '600' | '500' | '400';
        lineHeight: number;
    };
}

export interface Theme {
    colors: ThemeColors;
    spacing: ThemeSpacing;
    radii: ThemeRadii;
    shadows: ThemeShadows;
    typography: ThemeTypography;
}
