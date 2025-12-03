/**
 * Card Component
 * 
 * Container card with shadow and rounded corners.
 * Used to group related content and make it stand out.
 * 
 * Features:
 * - Themed background and borders
 * - Elevation/shadow from theme
 * - Optional press functionality
 * - Rounded corners
 * - Flexible content via children
 * - Accessible press states
 * 
 * @example
 * // Non-pressable card
 * <Card>
 *   <Text>Card Content</Text>
 * </Card>
 * 
 * // Pressable card
 * <Card onPress={handlePress}>
 *   <Text>Tap me!</Text>
 * </Card>
 */

import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';

interface CardProps {
    /** Content to display inside the card */
    children: React.ReactNode;
    /** Optional press handler (makes card pressable) */
    onPress?: () => void;
    /** Custom style overrides */
    style?: ViewStyle;
    /** Accessibility label for screen readers */
    accessibilityLabel?: string;
}

export const Card: React.FC<CardProps> = ({
    children,
    onPress,
    style,
    accessibilityLabel,
}) => {
    const theme = useTheme();

    const cardStyle: ViewStyle = {
        backgroundColor: theme.colors.white,
        borderRadius: theme.radii.lg,
        padding: theme.spacing.md,
        ...theme.shadows.medium,
    };

    // If onPress is provided, use TouchableOpacity
    if (onPress) {
        return (
            <TouchableOpacity
                style={[cardStyle, style]}
                onPress={onPress}
                activeOpacity={0.7}
                accessibilityLabel={accessibilityLabel}
                accessibilityRole="button"
            >
                {children}
            </TouchableOpacity>
        );
    }

    // Otherwise, use a regular View
    return (
        <View
            style={[cardStyle, style]}
            accessibilityLabel={accessibilityLabel}
        >
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    // Styles are applied inline from theme
});
