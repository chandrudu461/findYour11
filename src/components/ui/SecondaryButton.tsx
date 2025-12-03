/**
 * SecondaryButton Component
 * 
 * Secondary action button with DarkGreen outline.
 * Used for secondary actions like "Cancel", "Skip", "Learn More", etc.
 * 
 * Features:
 * - DarkGreen outline from theme
 * - Transparent background with colored text
 * - Press states with background color change
 * - Disabled state with reduced opacity
 * - Loading state with spinner
 * - Fully accessible with proper labels
 * - Responsive sizing
 * 
 * @example
 * <SecondaryButton 
 *   title="Cancel"
 *   onPress={handlePress}
 *   disabled={false}
 *   loading={false}
 * />
 */

import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';

interface SecondaryButtonProps {
    /** Button label text */
    title: string;
    /** Callback function when button is pressed */
    onPress: () => void;
    /** Disables button interaction */
    disabled?: boolean;
    /** Shows loading spinner and disables interaction */
    loading?: boolean;
    /** Custom style overrides */
    style?: ViewStyle;
    /** Accessibility label for screen readers */
    accessibilityLabel?: string;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
    title,
    onPress,
    disabled = false,
    loading = false,
    style,
    accessibilityLabel,
}) => {
    const theme = useTheme();

    const isDisabled = disabled || loading;

    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderColor: theme.colors.primaryDark,
                    paddingVertical: theme.spacing.md - 2, // Adjust for border
                    paddingHorizontal: theme.spacing.lg - 2,
                    borderRadius: theme.radii.md,
                    opacity: isDisabled ? 0.5 : 1,
                },
                style,
            ]}
            onPress={onPress}
            disabled={isDisabled}
            activeOpacity={0.7}
            accessibilityLabel={accessibilityLabel || title}
            accessibilityRole="button"
            accessibilityState={{ disabled: isDisabled }}
        >
            {loading ? (
                <ActivityIndicator color={theme.colors.primaryDark} size="small" />
            ) : (
                <Text
                    style={[
                        styles.text,
                        {
                            color: theme.colors.primaryDark,
                            fontSize: theme.typography.body.fontSize,
                            fontWeight: '600',
                        },
                    ]}
                >
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 48, // Minimum touch target size for accessibility
    },
    text: {
        textAlign: 'center',
    },
});
