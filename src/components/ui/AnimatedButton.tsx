/**
 * AnimatedButton Component
 * 
 * Premium button with gradient background and press animations.
 * Used for primary CTAs in authentication screens.
 * 
 * Features:
 * - Gradient background
 * - Scale press animation
 * - Loading state with animated dots
 * - Success ripple effect
 * - Entrance animation
 */

import React, { useRef, useEffect, useState } from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    Animated,
    View,
    Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../theme';

interface AnimatedButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
    variant?: 'primary' | 'secondary';
    animationDelay?: number;
}

/**
 * Animated loading dots
 */
const LoadingDots: React.FC = () => {
    const dot1 = useRef(new Animated.Value(0)).current;
    const dot2 = useRef(new Animated.Value(0)).current;
    const dot3 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animateDot = (dot: Animated.Value, delay: number) => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(dot, {
                        toValue: 1,
                        duration: 300,
                        delay,
                        useNativeDriver: true,
                    }),
                    Animated.timing(dot, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        };

        animateDot(dot1, 0);
        animateDot(dot2, 150);
        animateDot(dot3, 300);
    }, []);

    const dotStyle = (anim: Animated.Value) => ({
        opacity: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.3, 1],
        }),
        transform: [{
            scale: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1.2],
            }),
        }],
    });

    return (
        <View style={styles.loadingContainer}>
            <Animated.View style={[styles.dot, dotStyle(dot1)]} />
            <Animated.View style={[styles.dot, dotStyle(dot2)]} />
            <Animated.View style={[styles.dot, dotStyle(dot3)]} />
        </View>
    );
};

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
    title,
    onPress,
    disabled = false,
    loading = false,
    variant = 'primary',
    animationDelay = 0,
}) => {
    const theme = useTheme();
    const scaleAnim = useRef(new Animated.Value(1)).current;
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

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            friction: 5,
            tension: 100,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 5,
            tension: 100,
            useNativeDriver: true,
        }).start();
    };

    const isDisabled = disabled || loading;

    const gradientColors = variant === 'primary'
        ? ['#FF8A00', '#FF6B00', '#E55D00'] as const
        : ['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.1)'] as const;

    return (
        <Animated.View
            style={[
                {
                    opacity: entranceOpacity,
                    transform: [
                        { translateY: entranceTranslateY },
                        { scale: scaleAnim },
                    ],
                },
            ]}
        >
            <TouchableOpacity
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={isDisabled}
                activeOpacity={1}
                style={[
                    styles.button,
                    isDisabled && styles.disabled,
                ]}
            >
                <LinearGradient
                    colors={gradientColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradient}
                >
                    {loading ? (
                        <LoadingDots />
                    ) : (
                        <View style={styles.contentContainer}>
                            <Text style={[
                                styles.text,
                                variant === 'secondary' && styles.secondaryText,
                            ]}>
                                {title}
                            </Text>
                            {variant === 'primary' && (
                                <Text style={styles.arrow}>→</Text>
                            )}
                        </View>
                    )}
                </LinearGradient>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 14,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: '#FF8A00',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.4,
                shadowRadius: 16,
            },
            android: {
                elevation: 8,
            },
            web: {
                boxShadow: '0 8px 24px rgba(255, 138, 0, 0.35)',
            },
        }),
    },
    gradient: {
        paddingVertical: 18,
        paddingHorizontal: 32,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 56,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    secondaryText: {
        fontWeight: '600',
    },
    arrow: {
        color: '#FFFFFF',
        fontSize: 18,
        marginLeft: 8,
        fontWeight: '700',
    },
    disabled: {
        opacity: 0.5,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 22,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FFFFFF',
        marginHorizontal: 4,
    },
});
