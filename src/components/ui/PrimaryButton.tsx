/**
 * PrimaryButton Component
 * 
 * Primary call-to-action button with AccentOrange background.
 * Used for main actions like "Save", "Submit", "Continue", etc.
 * 
 * Features:
 * - AccentOrange background from theme
 * - Press states with opacity feedback
 * - Disabled state with reduced opacity
 * - Loading state with spinner
 * - Fully accessible with proper labels
 * - Responsive sizing
 * 
 * @example
 * <PrimaryButton 
 *   title="Get Started"
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
    TextStyle,
} from 'react-native';
import { useTheme } from '../../theme';

interface PrimaryButtonProps {
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

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
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
                    backgroundColor: theme.colors.accent,
                    paddingVertical: theme.spacing.md,
                    paddingHorizontal: theme.spacing.lg,
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
                <ActivityIndicator color={theme.colors.white} size="small" />
            ) : (
                <Text
                    style={[
                        styles.text,
                        {
                            color: theme.colors.white,
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
