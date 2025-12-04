/**
 * SectionHeader Component
 * 
 * Section title component with optional subtitle and action button.
 * Used to separate and label different sections of content.
 * 
 * Features:
 * - Title text with themed typography
 * - Optional subtitle
 * - Optional action button (e.g., "See All")
 * - Flexible layout
 * - Accessible
 * 
 * @example
 * // Simple header
 * <SectionHeader title="Upcoming Matches" />
 * 
 * // Header with subtitle
 * <SectionHeader 
 *   title="Featured Turfs"
 *   subtitle="Book your favorite cricket ground"
 * />
 * 
 * // Header with action
 * <SectionHeader 
 *   title="Recent Matches"
 *   actionText="See All"
 *   onActionPress={handleSeeAll}
 * />
 */

import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';

interface SectionHeaderProps {
    /** Main title text */
    title: string;
    /** Optional subtitle text */
    subtitle?: string;
    /** Optional action button text */
    actionText?: string;
    /** Callback when action button is pressed */
    onActionPress?: () => void;
    /** Custom style overrides */
    style?: ViewStyle;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    subtitle,
    actionText,
    onActionPress,
    style,
}) => {
    const theme = useTheme();

    return (
        <View
            style={[
                styles.container,
                {
                    marginBottom: theme.spacing.md,
                },
                style,
            ]}
        >
            {/* Left side: Title and subtitle */}
            <View style={styles.titleContainer}>
                <Text
                    style={[
                        styles.title,
                        {
                            color: theme.colors.textDark,
                            fontSize: theme.typography.h3.fontSize,
                            fontWeight: theme.typography.h3.fontWeight,
                            lineHeight: theme.typography.h3.lineHeight,
                        },
                    ]}
                    accessibilityRole="header"
                >
                    {title}
                </Text>

                {subtitle && (
                    <Text
                        style={[
                            styles.subtitle,
                            {
                                color: theme.colors.textLight,
                                fontSize: theme.typography.bodySmall.fontSize,
                                marginTop: theme.spacing.xs,
                            },
                        ]}
                    >
                        {subtitle}
                    </Text>
                )}
            </View>

            {/* Right side: Action button */}
            {actionText && onActionPress && (
                <TouchableOpacity
                    onPress={onActionPress}
                    accessibilityLabel={actionText}
                    accessibilityRole="button"
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                    <Text
                        style={[
                            styles.actionText,
                            {
                                color: theme.colors.primary,
                                fontSize: theme.typography.bodySmall.fontSize,
                                fontWeight: '600',
                            },
                        ]}
                    >
                        {actionText}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        // Theme-based styles applied inline
    },
    subtitle: {
        // Theme-based styles applied inline
    },
    actionText: {
        // Theme-based styles applied inline
    },
});
