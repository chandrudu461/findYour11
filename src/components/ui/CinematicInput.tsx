/**
 * CinematicInput Component
 * 
 * Premium glass-morphism input with floating labels, glow effects, and micro-interactions.
 * Inspired by Apple's design language and luxury tech interfaces.
 * 
 * Features:
 * - Floating label that animates on focus
 * - Glass-morphism background with blur
 * - Glow border effect on focus
 * - Icon support with subtle animations
 * - Error state with shake animation
 * - Premium typography
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

// Brand Colors
const COLORS = {
    primaryGreen: '#0A9E4B',
    darkGreen: '#066A32',
    accentOrange: '#FF8A00',
    softWhite: '#F9F9F9',
    pureBlack: '#000000',
    glassWhite: 'rgba(255, 255, 255, 0.08)',
    glassBorder: 'rgba(255, 255, 255, 0.12)',
    textMuted: 'rgba(255, 255, 255, 0.5)',
    errorRed: '#FF4757',
};

interface CinematicInputProps extends TextInputProps {
    label: string;
    icon?: string;
    error?: string;
    animationDelay?: number;
}

export const CinematicInput: React.FC<CinematicInputProps> = ({
    label,
    icon,
    error,
    value,
    onFocus,
    onBlur,
    animationDelay = 0,
    secureTextEntry,
    ...textInputProps
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<TextInput>(null);

    // Animation values
    const labelPosition = useRef(new Animated.Value(value ? 1 : 0)).current;
    const glowOpacity = useRef(new Animated.Value(0)).current;
    const glowScale = useRef(new Animated.Value(0.98)).current;
    const shakeAnimation = useRef(new Animated.Value(0)).current;
    const entranceOpacity = useRef(new Animated.Value(0)).current;
    const entranceTranslateY = useRef(new Animated.Value(30)).current;
    const iconScale = useRef(new Animated.Value(1)).current;

    // Entrance animation - cinematic slide up
    useEffect(() => {
        Animated.parallel([
            Animated.timing(entranceOpacity, {
                toValue: 1,
                duration: 600,
                delay: animationDelay,
                useNativeDriver: true,
            }),
            Animated.spring(entranceTranslateY, {
                toValue: 0,
                friction: 8,
                tension: 40,
                delay: animationDelay,
                useNativeDriver: true,
            }),
        ]).start();
    }, [animationDelay]);

    // Error shake animation
    useEffect(() => {
        if (error) {
            Animated.sequence([
                Animated.timing(shakeAnimation, { toValue: 12, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnimation, { toValue: -12, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnimation, { toValue: 8, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnimation, { toValue: -8, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
            ]).start();
        }
    }, [error]);

    const handleFocus = (e: any) => {
        setIsFocused(true);

        // Animate label up
        Animated.spring(labelPosition, {
            toValue: 1,
            friction: 8,
            tension: 60,
            useNativeDriver: false,
        }).start();

        // Glow effect
        Animated.parallel([
            Animated.timing(glowOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.spring(glowScale, {
                toValue: 1,
                friction: 6,
                tension: 100,
                useNativeDriver: true,
            }),
            Animated.spring(iconScale, {
                toValue: 1.1,
                friction: 6,
                useNativeDriver: true,
            }),
        ]).start();

        onFocus?.(e);
    };

    const handleBlur = (e: any) => {
        setIsFocused(false);

        if (!value) {
            Animated.spring(labelPosition, {
                toValue: 0,
                friction: 8,
                tension: 60,
                useNativeDriver: false,
            }).start();
        }

        Animated.parallel([
            Animated.timing(glowOpacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.spring(glowScale, {
                toValue: 0.98,
                friction: 6,
                tension: 100,
                useNativeDriver: true,
            }),
            Animated.spring(iconScale, {
                toValue: 1,
                friction: 6,
                useNativeDriver: true,
            }),
        ]).start();

        onBlur?.(e);
    };

    // Label animations
    const labelTop = labelPosition.interpolate({
        inputRange: [0, 1],
        outputRange: [20, -8],
    });

    const labelFontSize = labelPosition.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 11],
    });

    const labelColor = labelPosition.interpolate({
        inputRange: [0, 1],
        outputRange: [COLORS.textMuted, COLORS.accentOrange],
    });

    const labelLetterSpacing = labelPosition.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1.5],
    });

    // Icon map
    const iconMap: { [key: string]: string } = {
        phone: '📱',
        email: '✉️',
        user: '👤',
        lock: '🔐',
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
                <View style={styles.inputWrapper}>
                    {/* Glow effect layer */}
                    <Animated.View
                        style={[
                            styles.glowLayer,
                            {
                                opacity: glowOpacity,
                                transform: [{ scale: glowScale }],
                                borderColor: error ? COLORS.errorRed : COLORS.accentOrange,
                            },
                        ]}
                    />

                    {/* Glass background */}
                    <View style={[
                        styles.glassBackground,
                        {
                            borderColor: error
                                ? `${COLORS.errorRed}40`
                                : isFocused
                                    ? `${COLORS.accentOrange}40`
                                    : COLORS.glassBorder,
                        },
                    ]}>
                        {/* Icon */}
                        {icon && (
                            <Animated.Text
                                style={[
                                    styles.icon,
                                    { transform: [{ scale: iconScale }] },
                                ]}
                            >
                                {iconMap[icon] || '✏️'}
                            </Animated.Text>
                        )}

                        {/* Floating Label */}
                        <Animated.Text
                            style={[
                                styles.label,
                                {
                                    top: labelTop,
                                    fontSize: labelFontSize,
                                    color: error ? COLORS.errorRed : labelColor,
                                    letterSpacing: labelLetterSpacing,
                                    left: icon ? 52 : 20,
                                },
                            ]}
                        >
                            {label.toUpperCase()}
                        </Animated.Text>

                        {/* Text Input */}
                        <TextInput
                            ref={inputRef}
                            style={[
                                styles.input,
                                { paddingLeft: icon ? 52 : 20 },
                            ]}
                            value={value}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            placeholderTextColor="transparent"
                            selectionColor={COLORS.accentOrange}
                            secureTextEntry={secureTextEntry}
                            {...textInputProps}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>

            {/* Error Message */}
            {error && (
                <Animated.Text style={styles.errorText}>
                    {error}
                </Animated.Text>
            )}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    inputWrapper: {
        position: 'relative',
    },
    glowLayer: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 16,
        borderWidth: 2,
        ...Platform.select({
            web: {
                boxShadow: '0 0 30px rgba(255, 138, 0, 0.3)',
            },
        }),
    },
    glassBackground: {
        backgroundColor: COLORS.glassWhite,
        borderRadius: 16,
        borderWidth: 1,
        minHeight: 64,
        justifyContent: 'center',
        ...Platform.select({
            web: {
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
            },
        }),
    },
    icon: {
        position: 'absolute',
        left: 18,
        fontSize: 20,
        zIndex: 1,
    },
    label: {
        position: 'absolute',
        fontWeight: '600',
        zIndex: 1,
        backgroundColor: 'transparent',
    },
    input: {
        flex: 1,
        paddingVertical: 20,
        paddingRight: 20,
        paddingTop: 28,
        fontSize: 17,
        fontWeight: '500',
        color: COLORS.softWhite,
        letterSpacing: 0.3,
        minHeight: 64,
    },
    errorText: {
        color: COLORS.errorRed,
        fontSize: 12,
        fontWeight: '500',
        marginTop: 8,
        marginLeft: 4,
        letterSpacing: 0.3,
    },
});
