/**
 * InputField Component
 * 
 * Reusable text input component with label and error states.
 * Used for all text input needs (login, signup, forms, etc.).
 * 
 * Features:
 * - Label with optional styling
 * - Placeholder text support
 * - Error state with error message
 * - Secure text entry for passwords
 * - Multiline support
 * - Themed styling
 * - Fully accessible with proper labels
 * - Focus states
 * 
 * @example
 * <InputField 
 *   label="Email"
 *   value={email}
 *   onChangeText={setEmail}
 *   placeholder="Enter your email"
 *   error={emailError}
 *   keyboardType="email-address"
 * />
 */

import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ViewStyle,
    TextInputProps,
} from 'react-native';
import { useTheme } from '../../theme';

interface InputFieldProps extends TextInputProps {
    /** Label text displayed above input */
    label?: string;
    /** Error message displayed below input */
    error?: string;
    /** Custom container style */
    containerStyle?: ViewStyle;
}

export const InputField: React.FC<InputFieldProps> = ({
    label,
    error,
    containerStyle,
    style,
    ...textInputProps
}) => {
    const theme = useTheme();

    const hasError = !!error;

    return (
        <View style={[styles.container, containerStyle]}>
            {/* Label */}
            {label && (
                <Text
                    style={[
                        styles.label,
                        {
                            color: theme.colors.textDark,
                            fontSize: theme.typography.bodySmall.fontSize,
                            fontWeight: '600',
                            marginBottom: theme.spacing.xs,
                        },
                    ]}
                >
                    {label}
                </Text>
            )}

            {/* Input Field */}
            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: theme.colors.white,
                        borderWidth: 1,
                        borderColor: hasError ? theme.colors.error : theme.colors.border,
                        borderRadius: theme.radii.md,
                        paddingVertical: theme.spacing.md,
                        paddingHorizontal: theme.spacing.md,
                        fontSize: theme.typography.body.fontSize,
                        color: theme.colors.textDark,
                    },
                    style,
                ]}
                placeholderTextColor={theme.colors.placeholder}
                accessibilityLabel={label || textInputProps.placeholder}
                accessibilityHint={error}
                {...textInputProps}
            />

            {/* Error Message */}
            {hasError && (
                <Text
                    style={[
                        styles.errorText,
                        {
                            color: theme.colors.error,
                            fontSize: theme.typography.caption.fontSize,
                            marginTop: theme.spacing.xs,
                        },
                    ]}
                    accessibilityLiveRegion="polite"
                    accessibilityRole="alert"
                >
                    {error}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    label: {
        // Theme-based styles applied inline
    },
    input: {
        minHeight: 48, // Minimum touch target size for accessibility
    },
    errorText: {
        // Theme-based styles applied inline
    },
});
