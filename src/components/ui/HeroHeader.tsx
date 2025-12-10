/**
 * HeroHeader Component
 * 
 * Premium animated hero section with logo, title, and cinematic entrance.
 * Features pulse animation, parallax effects, and elegant typography.
 * 
 * Inspired by Apple product pages and gaming splash screens.
 */

import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Easing,
    Platform,
} from 'react-native';

// Brand Colors
const COLORS = {
    primaryGreen: '#0A9E4B',
    accentOrange: '#FF8A00',
    softWhite: '#F9F9F9',
    textMuted: 'rgba(255, 255, 255, 0.6)',
};

interface HeroHeaderProps {
    title: string;
    subtitle?: string;
    showLogo?: boolean;
    animationDelay?: number;
    size?: 'large' | 'medium';
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({
    title,
    subtitle,
    showLogo = true,
    animationDelay = 0,
    size = 'large',
}) => {
    // Animation values
    const logoScale = useRef(new Animated.Value(0.5)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const logoPulse = useRef(new Animated.Value(1)).current;
    const logoGlow = useRef(new Animated.Value(0)).current;

    const titleOpacity = useRef(new Animated.Value(0)).current;
    const titleTranslateY = useRef(new Animated.Value(40)).current;

    const subtitleOpacity = useRef(new Animated.Value(0)).current;
    const subtitleTranslateY = useRef(new Animated.Value(30)).current;

    const lineWidth = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Cinematic entrance sequence
        Animated.sequence([
            // Logo entrance
            Animated.parallel([
                Animated.spring(logoScale, {
                    toValue: 1,
                    friction: 8,
                    tension: 40,
                    delay: animationDelay,
                    useNativeDriver: true,
                }),
                Animated.timing(logoOpacity, {
                    toValue: 1,
                    duration: 600,
                    delay: animationDelay,
                    useNativeDriver: true,
                }),
                Animated.timing(logoGlow, {
                    toValue: 1,
                    duration: 800,
                    delay: animationDelay + 200,
                    useNativeDriver: true,
                }),
            ]),
            // Title entrance
            Animated.parallel([
                Animated.timing(titleOpacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.spring(titleTranslateY, {
                    toValue: 0,
                    friction: 8,
                    tension: 40,
                    useNativeDriver: true,
                }),
            ]),
            // Subtitle entrance
            Animated.parallel([
                Animated.timing(subtitleOpacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.spring(subtitleTranslateY, {
                    toValue: 0,
                    friction: 8,
                    tension: 40,
                    useNativeDriver: true,
                }),
                Animated.spring(lineWidth, {
                    toValue: 1,
                    friction: 8,
                    tension: 40,
                    useNativeDriver: false,
                }),
            ]),
        ]).start();

        // Continuous logo pulse
        Animated.loop(
            Animated.sequence([
                Animated.timing(logoPulse, {
                    toValue: 1.08,
                    duration: 2000,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
                Animated.timing(logoPulse, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [animationDelay]);

    const lineWidthInterpolated = lineWidth.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '60%'],
    });

    return (
        <View style={[styles.container, size === 'medium' && styles.containerMedium]}>
            {/* Logo with pulse and glow */}
            {showLogo && (
                <Animated.View
                    style={[
                        styles.logoContainer,
                        {
                            opacity: logoOpacity,
                            transform: [
                                { scale: logoScale },
                                { scale: logoPulse },
                            ],
                        },
                    ]}
                >
                    {/* Glow effect behind logo */}
                    <Animated.View
                        style={[
                            styles.logoGlow,
                            { opacity: logoGlow },
                        ]}
                    />
                    <Text style={[styles.logo, size === 'medium' && styles.logoMedium]}>
                        🏏
                    </Text>
                </Animated.View>
            )}

            {/* Title */}
            <Animated.Text
                style={[
                    styles.title,
                    size === 'medium' && styles.titleMedium,
                    {
                        opacity: titleOpacity,
                        transform: [{ translateY: titleTranslateY }],
                    },
                ]}
            >
                {title}
            </Animated.Text>

            {/* Decorative line */}
            <Animated.View
                style={[
                    styles.decorativeLine,
                    { width: lineWidthInterpolated },
                ]}
            />

            {/* Subtitle */}
            {subtitle && (
                <Animated.Text
                    style={[
                        styles.subtitle,
                        size === 'medium' && styles.subtitleMedium,
                        {
                            opacity: subtitleOpacity,
                            transform: [{ translateY: subtitleTranslateY }],
                        },
                    ]}
                >
                    {subtitle}
                </Animated.Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 48,
    },
    containerMedium: {
        marginBottom: 36,
    },
    logoContainer: {
        position: 'relative',
        marginBottom: 24,
    },
    logoGlow: {
        position: 'absolute',
        top: -20,
        left: -20,
        right: -20,
        bottom: -20,
        borderRadius: 100,
        backgroundColor: COLORS.accentOrange,
        ...Platform.select({
            web: {
                filter: 'blur(40px)',
            },
        }),
        opacity: 0.3,
    },
    logo: {
        fontSize: 80,
        textAlign: 'center',
    },
    logoMedium: {
        fontSize: 56,
    },
    title: {
        fontSize: 42,
        fontWeight: '800',
        color: COLORS.softWhite,
        textAlign: 'center',
        letterSpacing: -1,
        marginBottom: 16,
        ...Platform.select({
            web: {
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            },
        }),
    },
    titleMedium: {
        fontSize: 32,
        marginBottom: 12,
    },
    decorativeLine: {
        height: 2,
        backgroundColor: COLORS.accentOrange,
        borderRadius: 1,
        marginBottom: 16,
        opacity: 0.6,
    },
    subtitle: {
        fontSize: 17,
        fontWeight: '500',
        color: COLORS.textMuted,
        textAlign: 'center',
        letterSpacing: 0.5,
        lineHeight: 24,
        maxWidth: 300,
    },
    subtitleMedium: {
        fontSize: 15,
        maxWidth: 280,
    },
});
