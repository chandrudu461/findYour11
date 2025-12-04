/**
 * Tag Component
 * 
 * Label/badge component for categories, status indicators, and labels.
 * Used to display categorization, status, or metadata.
 * 
 * Features:
 * - Multiple variants (primary, success, warning, error, info)
 * - Themed colors for each variant
 * - Optional remove/close button
 * - Compact, pill-shaped design
 * - Accessible
 * 
 * @example
 * // Basic tag
 * <Tag label="Cricket" variant="primary" />
 * 
 * // Removable tag
 * <Tag 
 *   label="Selected" 
 *   variant="success" 
 *   onRemove={handleRemove}
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

type TagVariant = 'primary' | 'success' | 'warning' | 'error' | 'info';

interface TagProps {
    /** Text to display in the tag */
    label: string;
    /** Visual variant of the tag */
    variant?: TagVariant;
    /** Callback when remove button is pressed */
    onRemove?: () => void;
    /** Custom style overrides */
    style?: ViewStyle;
}

export const Tag: React.FC<TagProps> = ({
    label,
    variant = 'primary',
    onRemove,
    style,
}) => {
    const theme = useTheme();

    // Get colors based on variant
    const getVariantColors = () => {
        switch (variant) {
            case 'primary':
                return {
                    bg: theme.colors.primary + '20', // 20% opacity
                    text: theme.colors.primary,
                };
            case 'success':
                return {
                    bg: theme.colors.success + '20',
                    text: theme.colors.success,
                };
            case 'warning':
                return {
                    bg: theme.colors.warning + '20',
                    text: theme.colors.warning,
                };
            case 'error':
                return {
                    bg: theme.colors.error + '20',
                    text: theme.colors.error,
                };
            case 'info':
                return {
                    bg: theme.colors.info + '20',
                    text: theme.colors.info,
                };
            default:
                return {
                    bg: theme.colors.primary + '20',
                    text: theme.colors.primary,
                };
        }
    };

    const colors = getVariantColors();

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.bg,
                    borderRadius: theme.radii.round,
                    paddingVertical: theme.spacing.xs,
                    paddingHorizontal: theme.spacing.sm,
                },
                style,
            ]}
            accessibilityLabel={`${label} tag`}
            accessibilityRole="text"
        >
            <Text
                style={[
                    styles.label,
                    {
                        color: colors.text,
                        fontSize: theme.typography.caption.fontSize,
                        fontWeight: '600',
                    },
                ]}
            >
                {label}
            </Text>

            {/* Remove button */}
            {onRemove && (
                <TouchableOpacity
                    style={[
                        styles.removeButton,
                        { marginLeft: theme.spacing.xs },
                    ]}
                    onPress={onRemove}
                    accessibilityLabel={`Remove ${label}`}
                    accessibilityRole="button"
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                    <Text
                        style={[
                            styles.removeIcon,
                            {
                                color: colors.text,
                                fontSize: 14,
                            },
                        ]}
                    >
                        ×
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start', // Don't stretch to full width
    },
    label: {
        // Theme-based styles applied inline
    },
    removeButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    removeIcon: {
        fontWeight: 'bold',
        lineHeight: 16,
    },
});
