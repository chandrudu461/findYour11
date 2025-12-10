/**
 * AnimatedInput Component
 * 
 * Enhanced input field with floating label animation and glow effects.
 * Creates a premium feel for authentication forms.
 * 
 * Features:
 * - Float-up label animation on focus
 * - Glow border effect on focus
 * - Shake animation on error
 * - Icon support (left icon)
 * - Error state with message
 */

import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Animated,
    TouchableWithoutFeedback,
    Platform,
    TextInputProps,
} from 'react-native';
import { useTheme } from '../../theme';

interface AnimatedInputProps extends TextInputProps {
    label: string;
    icon?: string;
    error?: string;
    animationDelay?: number;
}

export const AnimatedInput: React.FC<AnimatedInputProps> = ({
    label,
    icon,
    error,
    value,
    onFocus,
    onBlur,
    animationDelay = 0,
    ...textInputProps
}) => {
    const theme = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<TextInput>(null);

    // Animation values
    const labelPosition = useRef(new Animated.Value(value ? 1 : 0)).current;
    const borderOpacity = useRef(new Animated.Value(0)).current;
    const shakeAnimation = useRef(new Animated.Value(0)).current;
    const entranceOpacity = useRef(new Animated.Value(0)).current;
    const entranceTranslateY = useRef(new Animated.Value(20)).current;

    // Entrance animation
    useEffect(() => {
        Animated.parallel([
            Animated.timing(entranceOpacity, {
                toValue: 1,
                duration: 400,
                delay: animationDelay,
                useNativeDriver: true,
            }),
            Animated.timing(entranceTranslateY, {
                toValue: 0,
                duration: 400,
                delay: animationDelay,
                useNativeDriver: true,
            }),
        ]).start();
    }, [animationDelay]);

    // Error shake animation
    useEffect(() => {
        if (error) {
            Animated.sequence([
                Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
            ]).start();
        }
    }, [error]);

    const handleFocus = (e: any) => {
        setIsFocused(true);
        Animated.parallel([
            Animated.timing(labelPosition, {
                toValue: 1,
                duration: 200,
                useNativeDriver: false,
            }),
            Animated.timing(borderOpacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: false,
            }),
        ]).start();
        onFocus?.(e);
    };

    const handleBlur = (e: any) => {
        setIsFocused(false);
        if (!value) {
            Animated.timing(labelPosition, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start();
        }
        Animated.timing(borderOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
        onBlur?.(e);
    };

    const labelTop = labelPosition.interpolate({
        inputRange: [0, 1],
        outputRange: [18, -10],
    });

    const labelFontSize = labelPosition.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 12],
    });

    const labelColor = labelPosition.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(255, 255, 255, 0.5)', '#FF8A00'],
    });

    const borderColor = borderOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(255, 255, 255, 0.2)', '#FF8A00'],
    });

    const iconMap: { [key: string]: string } = {
        phone: '📱',
        email: '✉️',
        user: '👤',
        lock: '🔒',
    };

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    opacity: entranceOpacity,
                    transform: [
                        { translateY: entranceTranslateY },
                        { translateX: shakeAnimation },
                    ],
                },
            ]}
        >
            <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
                <Animated.View
                    style={[
                        styles.inputContainer,
                        {
                            borderColor: error ? theme.colors.error : borderColor,
                            borderWidth: 1.5,
                        },
                    ]}
                >
                    {/* Icon */}
                    {icon && (
                        <Text style={styles.icon}>{iconMap[icon] || '📝'}</Text>
                    )}

                    {/* Floating Label */}
                    <Animated.Text
                        style={[
                            styles.label,
                            {
                                top: labelTop,
                                fontSize: labelFontSize,
                                color: error ? theme.colors.error : labelColor,
                                left: icon ? 48 : 16,
                            },
                        ]}
                    >
                        {label}
                    </Animated.Text>

                    {/* Input */}
                    <TextInput
                        ref={inputRef}
                        style={[
                            styles.input,
                            {
                                paddingLeft: icon ? 48 : 16,
                                color: '#FFFFFF',
                            },
                        ]}
                        value={value}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholderTextColor="rgba(255, 255, 255, 0.3)"
                        selectionColor="#FF8A00"
                        {...textInputProps}
                    />

                    {/* Focus glow effect */}
                    {isFocused && (
                        <View style={styles.glowEffect} />
                    )}
                </Animated.View>
            </TouchableWithoutFeedback>

            {/* Error Message */}
            {error && (
                <Animated.Text
                    style={[
                        styles.errorText,
                        { color: theme.colors.error },
                    ]}
                >
                    {error}
                </Animated.Text>
            )}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    inputContainer: {
        position: 'relative',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        minHeight: 56,
        justifyContent: 'center',
    },
    icon: {
        position: 'absolute',
        left: 16,
        fontSize: 18,
        zIndex: 1,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'transparent',
        paddingHorizontal: 4,
        zIndex: 1,
        fontWeight: '500',
    },
    input: {
        flex: 1,
        paddingVertical: 16,
        paddingRight: 16,
        fontSize: 16,
        minHeight: 56,
    },
    glowEffect: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'rgba(255, 138, 0, 0.3)',
        ...Platform.select({
            web: {
                boxShadow: '0 0 20px rgba(255, 138, 0, 0.2)',
            },
        }),
    },
    errorText: {
        marginTop: 6,
        fontSize: 12,
        marginLeft: 4,
    },
});
