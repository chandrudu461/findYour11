/**
 * GlassCard Component
 * 
 * Glassmorphism container for auth forms with frosted glass effect.
 * Creates a premium, modern appearance floating over backgrounds.
 * 
 * Features:
 * - Semi-transparent background with blur
 * - Subtle border glow
 * - Shadow effects for depth
 * - Entrance animation
 * - Responsive sizing
 */

import React, { useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    Dimensions,
    Platform,
    ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';

interface GlassCardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    animationDelay?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({
    children,
    style,
    animationDelay = 0,
}) => {
    const theme = useTheme();
    const { width } = Dimensions.get('window');

    // Animation values
    const translateY = useRef(new Animated.Value(50)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0.95)).current;

    // Responsive width
    const cardWidth = width > 600 ? 450 : width > 400 ? width - 48 : width - 32;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: 0,
                duration: 600,
                delay: animationDelay,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500,
                delay: animationDelay,
                useNativeDriver: true,
            }),
            Animated.spring(scale, {
                toValue: 1,
                friction: 8,
                tension: 40,
                delay: animationDelay,
                useNativeDriver: true,
            }),
        ]).start();
    }, [animationDelay]);

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    width: cardWidth,
                    opacity,
                    transform: [
                        { translateY },
                        { scale },
                    ],
                },
                style,
            ]}
        >
            {/* Glass background */}
            <View style={styles.glassBackground} />

            {/* Border glow */}
            <View style={styles.borderGlow} />

            {/* Content */}
            <View style={[styles.content, { padding: theme.spacing.xl }]}>
                {children}
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        borderRadius: 24,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: '#000000',
                shadowOffset: { width: 0, height: 20 },
                shadowOpacity: 0.25,
                shadowRadius: 40,
            },
            android: {
                elevation: 20,
            },
            web: {
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            },
        }),
    },
    glassBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        ...Platform.select({
            web: {
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
            },
        }),
    },
    borderGlow: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
    },
    content: {
        position: 'relative',
        zIndex: 1,
    },
});
