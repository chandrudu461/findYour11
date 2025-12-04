/**
 * Spacer Component
 * 
 * Flexible spacing component for consistent layout spacing.
 * Used to add vertical or horizontal spacing between elements.
 * 
 * Features:
 * - Vertical or horizontal spacing
 * - Uses theme spacing values
 * - Predefined size options (xs, sm, md, lg, xl, xxl)
 * - Simple, reusable API
 * 
 * @example
 * // Vertical spacing
 * <Spacer size="md" />
 * 
 * // Horizontal spacing
 * <Spacer size="lg" horizontal />
 * 
 * // Extra large vertical spacing
 * <Spacer size="xxl" />
 */

import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme, ThemeSpacing } from '../../theme';

type SpacerSize = keyof ThemeSpacing;

interface SpacerProps {
    /** Size of the spacing (corresponds to theme spacing values) */
    size?: SpacerSize;
    /** If true, creates horizontal spacing instead of vertical */
    horizontal?: boolean;
}

export const Spacer: React.FC<SpacerProps> = ({
    size = 'md',
    horizontal = false,
}) => {
    const theme = useTheme();

    const spacerStyle: ViewStyle = horizontal
        ? { width: theme.spacing[size] }
        : { height: theme.spacing[size] };

    return <View style={spacerStyle} />;
};
