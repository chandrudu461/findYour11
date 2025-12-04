/**
 * ScreenContainer Component
 * 
 * Base screen wrapper component with safe area handling.
 * Used as the root container for all screen components.
 * 
 * Features:
 * - Safe area insets (handles notches, status bars)
 * - Keyboard avoiding behavior
 * - Optional scroll support
 * - Themed background
 * - Flexible content via children
 * 
 * @example
 * // Basic screen
 * <ScreenContainer>
 *   <Text>Screen Content</Text>
 * </ScreenContainer>
 * 
 * // Scrollable screen
 * <ScreenContainer scrollable>
 *   <Text>Long content...</Text>
 * </ScreenContainer>
 */

import React from 'react';
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../theme';

interface ScreenContainerProps {
    /** Content to display inside the container */
    children: React.ReactNode;
    /** If true, wraps children in ScrollView */
    scrollable?: boolean;
    /** Custom style overrides */
    style?: ViewStyle;
    /** Custom content container style (for ScrollView) */
    contentContainerStyle?: ViewStyle;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
    children,
    scrollable = false,
    style,
    contentContainerStyle,
}) => {
    const theme = useTheme();

    const containerStyle: ViewStyle = {
        flex: 1,
        backgroundColor: theme.colors.bgSoft,
    };

    // Content wrapper based on scrollable prop
    const ContentWrapper = scrollable ? ScrollView : View;
    const contentProps = scrollable
        ? {
            contentContainerStyle: [
                styles.scrollContent,
                contentContainerStyle,
            ],
            showsVerticalScrollIndicator: false,
            keyboardShouldPersistTaps: 'handled' as 'handled',
        }
        : {
            style: [styles.content, contentContainerStyle],
        };

    return (
        <SafeAreaView style={[containerStyle, style]} edges={['top', 'left', 'right']}>
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
                <ContentWrapper {...contentProps}>
                    {children}
                </ContentWrapper>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    keyboardView: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
});
