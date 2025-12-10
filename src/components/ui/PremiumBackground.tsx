/**
 * PremiumBackground Component
 * 
 * Cinematic, premium animated background inspired by Apple, Nothing.tech, and PlayStation.
 * Features parallax abstract shapes, soft gradients, glowing elements, and subtle particles.
 * 
 * Design: Deep green → dark green gradient with neon orange accents
 * Feel: Premium cricket universe entrance - sports energy meets luxury tech
 */

import React, { useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Animated,
    Easing,
    Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Brand Colors
const COLORS = {
    primaryGreen: '#0A9E4B',
    darkGreen: '#066A32',
    accentOrange: '#FF8A00',
    deepBlack: '#050A08',
    softWhite: '#F9F9F9',
};

/**
 * Animated Glow Orb - Creates floating ambient light
 */
interface GlowOrbProps {
    size: number;
    color: string;
    startX: number;
    startY: number;
    duration: number;
    delay: number;
    opacity: number;
}

const GlowOrb: React.FC<GlowOrbProps> = ({
    size,
    color,
    startX,
    startY,
    duration,
    delay,
    opacity: maxOpacity,
}) => {
    const translateY = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0.8)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Fade in
        Animated.timing(opacity, {
            toValue: maxOpacity,
            duration: 2000,
            delay,
            useNativeDriver: true,
        }).start();

        // Floating Y animation - smooth sine wave
        Animated.loop(
            Animated.sequence([
                Animated.timing(translateY, {
                    toValue: -40,
                    duration: duration,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 40,
                    duration: duration,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Floating X animation - slower
        Animated.loop(
            Animated.sequence([
                Animated.timing(translateX, {
                    toValue: 20,
                    duration: duration * 1.5,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
                Animated.timing(translateX, {
                    toValue: -20,
                    duration: duration * 1.5,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Pulsing scale
        Animated.loop(
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1.2,
                    duration: duration * 0.8,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: 0.8,
                    duration: duration * 0.8,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <Animated.View
            style={[
                styles.glowOrb,
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: color,
                    left: startX,
                    top: startY,
                    opacity,
                    transform: [{ translateX }, { translateY }, { scale }],
                },
            ]}
        />
    );
};

/**
 * Abstract Geometric Shape - Parallax effect
 */
interface AbstractShapeProps {
    type: 'circle' | 'hexagon' | 'line' | 'arc';
    size: number;
    x: number;
    y: number;
    rotation: number;
    color: string;
    delay: number;
}

const AbstractShape: React.FC<AbstractShapeProps> = ({
    type,
    size,
    x,
    y,
    rotation: initialRotation,
    color,
    delay,
}) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const rotation = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        // Entrance animation
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 0.15,
                duration: 1500,
                delay,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 1500,
                delay,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
        ]).start();

        // Slow rotation
        Animated.loop(
            Animated.timing(rotation, {
                toValue: 1,
                duration: 20000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const rotateInterpolate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: [`${initialRotation}deg`, `${initialRotation + 360}deg`],
    });

    const getShapeStyle = () => {
        switch (type) {
            case 'circle':
                return {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    borderWidth: 1,
                    borderColor: color,
                    backgroundColor: 'transparent',
                };
            case 'hexagon':
                return {
                    width: size,
                    height: size * 0.6,
                    borderWidth: 1,
                    borderColor: color,
                    backgroundColor: 'transparent',
                };
            case 'line':
                return {
                    width: size,
                    height: 1,
                    backgroundColor: color,
                };
            case 'arc':
                return {
                    width: size,
                    height: size / 2,
                    borderTopLeftRadius: size / 2,
                    borderTopRightRadius: size / 2,
                    borderWidth: 1,
                    borderColor: color,
                    borderBottomWidth: 0,
                    backgroundColor: 'transparent',
                };
            default:
                return {};
        }
    };

    return (
        <Animated.View
            style={[
                styles.abstractShape,
                getShapeStyle(),
                {
                    left: x,
                    top: y,
                    opacity,
                    transform: [
                        { translateY },
                        { rotate: rotateInterpolate },
                    ],
                },
            ]}
        />
    );
};

/**
 * Particle System - Subtle floating particles
 */
const Particle: React.FC<{ delay: number; startX: number }> = ({ delay, startX }) => {
    const translateY = useRef(new Animated.Value(SCREEN_HEIGHT + 50)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0.5)).current;

    useEffect(() => {
        const animate = () => {
            translateY.setValue(SCREEN_HEIGHT + 50);
            opacity.setValue(0);
            scale.setValue(0.5 + Math.random() * 0.5);

            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: -50,
                    duration: 10000 + Math.random() * 5000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.sequence([
                    Animated.timing(opacity, {
                        toValue: 0.6,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                    Animated.delay(6000),
                    Animated.timing(opacity, {
                        toValue: 0,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                ]),
            ]).start(() => animate());
        };

        const timeout = setTimeout(animate, delay);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <Animated.View
            style={[
                styles.particle,
                {
                    left: startX,
                    opacity,
                    transform: [{ translateY }, { scale }],
                },
            ]}
        />
    );
};

/**
 * Animated Gradient Background
 */
const AnimatedGradientOverlay: React.FC = () => {
    const gradientOpacity = useRef(new Animated.Value(0)).current;
    const gradientPosition = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Fade in gradient
        Animated.timing(gradientOpacity, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();

        // Subtle gradient shift
        Animated.loop(
            Animated.sequence([
                Animated.timing(gradientPosition, {
                    toValue: 1,
                    duration: 8000,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
                Animated.timing(gradientPosition, {
                    toValue: 0,
                    duration: 8000,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <Animated.View style={[styles.gradientOverlay, { opacity: gradientOpacity }]}>
            <LinearGradient
                colors={['transparent', 'rgba(255, 138, 0, 0.03)', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
            />
        </Animated.View>
    );
};

interface PremiumBackgroundProps {
    children?: React.ReactNode;
}

export const PremiumBackground: React.FC<PremiumBackgroundProps> = ({ children }) => {
    // Glow orbs configuration
    const glowOrbs = [
        { size: 400, color: COLORS.primaryGreen, startX: -100, startY: -50, duration: 6000, delay: 0, opacity: 0.15 },
        { size: 300, color: COLORS.accentOrange, startX: SCREEN_WIDTH - 100, startY: SCREEN_HEIGHT * 0.3, duration: 5000, delay: 500, opacity: 0.1 },
        { size: 250, color: COLORS.darkGreen, startX: SCREEN_WIDTH * 0.5, startY: SCREEN_HEIGHT - 150, duration: 7000, delay: 1000, opacity: 0.12 },
        { size: 350, color: COLORS.primaryGreen, startX: SCREEN_WIDTH * 0.7, startY: -100, duration: 5500, delay: 300, opacity: 0.08 },
    ];

    // Abstract shapes configuration
    const abstractShapes: AbstractShapeProps[] = [
        { type: 'circle', size: 120, x: SCREEN_WIDTH * 0.1, y: SCREEN_HEIGHT * 0.15, rotation: 0, color: COLORS.softWhite, delay: 200 },
        { type: 'arc', size: 80, x: SCREEN_WIDTH * 0.75, y: SCREEN_HEIGHT * 0.25, rotation: 45, color: COLORS.accentOrange, delay: 400 },
        { type: 'circle', size: 60, x: SCREEN_WIDTH * 0.85, y: SCREEN_HEIGHT * 0.6, rotation: 0, color: COLORS.primaryGreen, delay: 600 },
        { type: 'line', size: 100, x: SCREEN_WIDTH * 0.05, y: SCREEN_HEIGHT * 0.7, rotation: -30, color: COLORS.softWhite, delay: 800 },
        { type: 'arc', size: 150, x: SCREEN_WIDTH * 0.4, y: SCREEN_HEIGHT * 0.85, rotation: 180, color: COLORS.darkGreen, delay: 1000 },
    ];

    // Particles configuration
    const particles = Array.from({ length: 15 }, (_, i) => ({
        delay: i * 600,
        startX: (SCREEN_WIDTH / 15) * i + Math.random() * 20,
    }));

    return (
        <View style={styles.container}>
            {/* Base gradient - deep green to black */}
            <LinearGradient
                colors={[COLORS.deepBlack, '#041A12', '#031510', COLORS.deepBlack]}
                locations={[0, 0.3, 0.7, 1]}
                style={StyleSheet.absoluteFill}
            />

            {/* Secondary gradient overlay */}
            <LinearGradient
                colors={['rgba(10, 158, 75, 0.1)', 'transparent', 'rgba(6, 106, 50, 0.08)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
            />

            {/* Animated gradient shift */}
            <AnimatedGradientOverlay />

            {/* Glow orbs - ambient lighting */}
            {glowOrbs.map((orb, index) => (
                <GlowOrb key={`orb-${index}`} {...orb} />
            ))}

            {/* Abstract geometric shapes - parallax layer */}
            {abstractShapes.map((shape, index) => (
                <AbstractShape key={`shape-${index}`} {...shape} />
            ))}

            {/* Particle system */}
            {particles.map((p, index) => (
                <Particle key={`particle-${index}`} {...p} />
            ))}

            {/* Vignette effect */}
            <LinearGradient
                colors={['transparent', 'transparent', 'rgba(0, 0, 0, 0.4)']}
                locations={[0, 0.6, 1]}
                style={styles.vignette}
            />

            {/* Content */}
            <View style={styles.content}>{children}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: COLORS.deepBlack,
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    glowOrb: {
        position: 'absolute',
        ...Platform.select({
            web: {
                filter: 'blur(80px)',
            },
            default: {
                // Native blur handled by opacity
            },
        }),
    },
    abstractShape: {
        position: 'absolute',
    },
    particle: {
        position: 'absolute',
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: COLORS.softWhite,
    },
    vignette: {
        ...StyleSheet.absoluteFillObject,
        pointerEvents: 'none',
    },
    content: {
        flex: 1,
        zIndex: 10,
    },
});
