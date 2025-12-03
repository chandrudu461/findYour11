/**
 * Loader Component
 * 
 * Loading spinner component with optional overlay.
 * Used to indicate loading states throughout the app.
 * 
 * Features:
 * - Customizable size (small, large)
 * - Customizable color
 * - Optional fullscreen overlay mode
 * - Themed default colors
 * - Accessible loading announcement
 * 
 * @example
 * // Simple loader
 * <Loader />
 * 
 * // Large loader with custom color
 * <Loader size="large" color="#FF8A00" />
 * 
 * // Fullscreen overlay loader
 * <Loader overlay />
 */

import React from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';

interface LoaderProps {
    /** Size of the loading spinner */
    size?: 'small' | 'large';
    /** Color of the loading spinner */
    color?: string;
    /** If true, shows fullscreen overlay with centered loader */
    overlay?: boolean;
    /** Custom style overrides */
    style?: ViewStyle;
}

export const Loader: React.FC<LoaderProps> = ({
    size = 'small',
    color,
    overlay = false,
    style,
}) => {
    const theme = useTheme();

    const loaderColor = color || theme.colors.primary;

    if (overlay) {
        return (
            <View
                style={[
                    styles.overlay,
                    { backgroundColor: 'rgba(0, 0, 0, 0.3)' },
                ]}
                accessibilityLabel="Loading"
                accessibilityLiveRegion="polite"
            >
                <View
                    style={[
                        styles.overlayContent,
                        {
                            backgroundColor: theme.colors.white,
                            borderRadius: theme.radii.lg,
                            padding: theme.spacing.xl,
                        },
                    ]}
                >
                    <ActivityIndicator size={size} color={loaderColor} />
                </View>
            </View>
        );
    }

    return (
        <View
            style={[styles.container, style]}
            accessibilityLabel="Loading"
            accessibilityLiveRegion="polite"
        >
            <ActivityIndicator size={size} color={loaderColor} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
    },
    overlayContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
