/**
 * HeaderBar Component
 * 
 * Custom header component for screens.
 * Used to provide consistent navigation and branding across screens.
 * 
 * Features:
 * - Title text with themed styling
 * - Optional back button with navigation
 * - Optional right action button/icon
 * - Themed background (primary color)
 * - Safe area handling
 * - Accessible navigation
 * 
 * @example
 * // Simple header with title
 * <HeaderBar title="Match Details" />
 * 
 * // Header with back button
 * <HeaderBar 
 *   title="Edit Profile"
 *   showBack
 *   onBackPress={() => navigation.goBack()}
 * />
 * 
 * // Header with right action
 * <HeaderBar 
 *   title="Settings"
 *   rightAction={<SaveIcon />}
 *   onRightPress={handleSave}
 * />
 */

import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
    Platform,
} from 'react-native';
import { useTheme } from '../../theme';

interface HeaderBarProps {
    /** Title text to display */
    title: string;
    /** If true, shows back button */
    showBack?: boolean;
    /** Callback when back button is pressed */
    onBackPress?: () => void;
    /** Optional right-side action component */
    rightAction?: React.ReactNode;
    /** Callback when right action is pressed */
    onRightPress?: () => void;
    /** Custom style overrides */
    style?: ViewStyle;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
    title,
    showBack = false,
    onBackPress,
    rightAction,
    onRightPress,
    style,
}) => {
    const theme = useTheme();

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: theme.colors.primary,
                    paddingTop: Platform.OS === 'ios' ? theme.spacing.md : theme.spacing.sm,
                    paddingBottom: theme.spacing.md,
                    paddingHorizontal: theme.spacing.md,
                },
                style,
            ]}
        >
            {/* Left: Back button or spacer */}
            <View style={styles.leftContainer}>
                {showBack && onBackPress ? (
                    <TouchableOpacity
                        onPress={onBackPress}
                        style={styles.backButton}
                        accessibilityLabel="Go back"
                        accessibilityRole="button"
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                        <Text
                            style={[
                                styles.backIcon,
                                {
                                    color: theme.colors.white,
                                    fontSize: 24,
                                },
                            ]}
                        >
                            ‹
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.spacer} />
                )}
            </View>

            {/* Center: Title */}
            <View style={styles.titleContainer}>
                <Text
                    style={[
                        styles.title,
                        {
                            color: theme.colors.white,
                            fontSize: theme.typography.h4.fontSize,
                            fontWeight: theme.typography.h4.fontWeight,
                        },
                    ]}
                    numberOfLines={1}
                    accessibilityRole="header"
                >
                    {title}
                </Text>
            </View>

            {/* Right: Action button or spacer */}
            <View style={styles.rightContainer}>
                {rightAction && onRightPress ? (
                    <TouchableOpacity
                        onPress={onRightPress}
                        style={styles.actionButton}
                        accessibilityLabel="Action"
                        accessibilityRole="button"
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                        {rightAction}
                    </TouchableOpacity>
                ) : (
                    <View style={styles.spacer} />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 56,
    },
    leftContainer: {
        width: 40,
        alignItems: 'flex-start',
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 8,
    },
    rightContainer: {
        width: 40,
        alignItems: 'flex-end',
    },
    backButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    backIcon: {
        fontWeight: 'bold',
        lineHeight: 28,
    },
    title: {
        textAlign: 'center',
    },
    actionButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    spacer: {
        width: 40,
    },
});
