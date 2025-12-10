/**
 * PremiumButton Component
 * 
 * Cupertino-inspired premium button with gradient, glow ripple, and spring animations.
 * Features cinematic press feedback and loading states.
 * 
 * Features:
 * - Gradient background (orange for primary, glass for secondary)
 * - Spring bounce on press
 * - Glow ripple effect
 * - Loading state with animated dots
 * - Subtle shine animation
 */

import React, { useRef, useEffect } from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    Animated,
    View,
    Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Brand Colors
const COLORS = {
    primaryGreen: '#0A9E4B',
    darkGreen: '#066A32',
    accentOrange: '#FF8A00',
    accentOrangeLight: '#FF9F2E',
    accentOrangeDark: '#E67600',
    softWhite: '#F9F9F9',
    pureBlack: '#000000',
    glassWhite: 'rgba(255, 255, 255, 0.1)',
    glassBorder: 'rgba(255, 255, 255, 0.15)',
};

interface PremiumButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
    variant?: 'primary' | 'secondary' | 'ghost';
    animationDelay?: number;
    icon?: string;
}

/**
 * Animated loading dots with premium feel
 */
const LoadingDots: React.FC = () => {
    const dots = [
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current,
    ];

    useEffect(() => {
        dots.forEach((dot, index) => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(dot, {
                        toValue: 1,
                        duration: 400,
                        delay: index * 150,
                        useNativeDriver: true,
                    }),
                    Animated.timing(dot, {
                        toValue: 0,
                        duration: 400,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        });
    }, []);

    return (
        <View style={styles.loadingContainer}>
            {dots.map((dot, index) => (
                <Animated.View
                    key={index}
                    style={[
                        styles.loadingDot,
                        {
                            opacity: dot.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.4, 1],
                            }),
                            transform: [{
                                scale: dot.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.8, 1.3],
                                }),
                            }, {
                                translateY: dot.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, -4],
                                }),
                            }],
                        },
                    ]}
                />
            ))}
        </View>
    );
};

export const PremiumButton: React.FC<PremiumButtonProps> = ({
    title,
    onPress,
    disabled = false,
    loading = false,
    variant = 'primary',
    animationDelay = 0,
    icon,
}) => {
    const scale = useRef(new Animated.Value(1)).current;
    const glowOpacity = useRef(new Animated.Value(0)).current;
    const shinePosition = useRef(new Animated.Value(-1)).current;
    const entranceOpacity = useRef(new Animated.Value(0)).current;
    const entranceTranslateY = useRef(new Animated.Value(30)).current;

    // Entrance animation
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

        // Occasional shine animation for primary button
        if (variant === 'primary') {
            const runShine = () => {
                Animated.sequence([
                    Animated.delay(3000),
                    Animated.timing(shinePosition, {
                        toValue: 1,
                        duration: 600,
                        useNativeDriver: true,
                    }),
                    Animated.timing(shinePosition, {
                        toValue: -1,
                        duration: 0,
                        useNativeDriver: true,
                    }),
                ]).start(() => runShine());
            };
            runShine();
        }
    }, []);

    const handlePressIn = () => {
        Animated.parallel([
            Animated.spring(scale, {
                toValue: 0.96,
                friction: 5,
                tension: 300,
                useNativeDriver: true,
            }),
            Animated.timing(glowOpacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handlePressOut = () => {
        Animated.parallel([
            Animated.spring(scale, {
                toValue: 1,
                friction: 5,
                tension: 300,
                useNativeDriver: true,
            }),
            Animated.timing(glowOpacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const isDisabled = disabled || loading;

    const getGradientColors = (): readonly [string, string, string] => {
        switch (variant) {
            case 'primary':
                return [COLORS.accentOrangeLight, COLORS.accentOrange, COLORS.accentOrangeDark];
            case 'secondary':
                return ['rgba(255, 255, 255, 0.12)', 'rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.05)'];
            case 'ghost':
                return ['transparent', 'transparent', 'transparent'];
            default:
                return [COLORS.accentOrangeLight, COLORS.accentOrange, COLORS.accentOrangeDark];
        }
    };

    const shineTranslate = shinePosition.interpolate({
        inputRange: [-1, 1],
        outputRange: [-200, 400],
    });

    return (
        <Animated.View
            style={[
                styles.wrapper,
                {
                    opacity: entranceOpacity,
                    transform: [
                        { translateY: entranceTranslateY },
                        { scale },
                    ],
                },
            ]}
        >
            {/* Glow effect */}
            {variant === 'primary' && (
                <Animated.View
                    style={[
                        styles.glowEffect,
                        { opacity: glowOpacity },
                    ]}
                />
            )}

            <TouchableOpacity
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={isDisabled}
                activeOpacity={1}
                style={[
                    styles.button,
                    variant === 'ghost' && styles.ghostButton,
                    isDisabled && styles.disabled,
                ]}
            >
                <LinearGradient
                    colors={getGradientColors()}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[
                        styles.gradient,
                        variant === 'secondary' && styles.secondaryGradient,
                    ]}
                >
                    {/* Shine effect */}
                    {variant === 'primary' && !loading && (
                        <Animated.View
                            style={[
                                styles.shine,
                                { transform: [{ translateX: shineTranslate }] },
                            ]}
                        />
                    )}

                    {loading ? (
                        <LoadingDots />
                    ) : (
                        <View style={styles.contentContainer}>
                            {icon && <Text style={styles.icon}>{icon}</Text>}
                            <Text
                                style={[
                                    styles.text,
                                    variant === 'ghost' && styles.ghostText,
                                ]}
                            >
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
    wrapper: {
        position: 'relative',
    },
    glowEffect: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 16,
        ...Platform.select({
            web: {
                boxShadow: '0 10px 40px rgba(255, 138, 0, 0.5)',
            },
            ios: {
                shadowColor: COLORS.accentOrange,
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.5,
                shadowRadius: 20,
            },
            android: {
                elevation: 15,
            },
        }),
    },
    button: {
        borderRadius: 16,
        overflow: 'hidden',
        ...Platform.select({
            web: {
                boxShadow: '0 8px 30px rgba(255, 138, 0, 0.35)',
            },
            ios: {
                shadowColor: COLORS.accentOrange,
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.35,
                shadowRadius: 15,
            },
            android: {
                elevation: 10,
            },
        }),
    },
    ghostButton: {
        ...Platform.select({
            web: { boxShadow: 'none' },
            ios: { shadowOpacity: 0 },
            android: { elevation: 0 },
        }),
    },
    gradient: {
        paddingVertical: 20,
        paddingHorizontal: 32,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 60,
        overflow: 'hidden',
    },
    secondaryGradient: {
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
    },
    shine: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        transform: [{ skewX: '-20deg' }],
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        fontSize: 18,
        marginRight: 10,
    },
    text: {
        color: COLORS.softWhite,
        fontSize: 17,
        fontWeight: '700',
        letterSpacing: 0.8,
    },
    ghostText: {
        color: COLORS.accentOrange,
        fontWeight: '600',
    },
    arrow: {
        color: COLORS.softWhite,
        fontSize: 20,
        marginLeft: 10,
        fontWeight: '300',
    },
    disabled: {
        opacity: 0.5,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 20,
    },
    loadingDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.softWhite,
        marginHorizontal: 4,
    },
});
