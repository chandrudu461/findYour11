/**
 * AnimatedBackground Component
 * 
 * Cricket-themed animated background with gradient sky and floating elements.
 * Provides immersive backdrop for authentication screens.
 * 
 * Features:
 * - Gradient sky (green to teal)
 * - Floating cricket ball elements
 * - Animated particles
 * - Responsive positioning
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
import { useTheme } from '../../theme';

interface FloatingElementProps {
    size: number;
    startX: number;
    startY: number;
    duration: number;
    delay: number;
}

/**
 * Individual floating cricket ball element
 */
const FloatingElement: React.FC<FloatingElementProps> = ({
    size,
    startX,
    startY,
    duration,
    delay,
}) => {
    const translateY = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        // Fade in
        Animated.timing(opacity, {
            toValue: 0.6,
            duration: 1000,
            delay,
            useNativeDriver: true,
        }).start();

        // Floating Y animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(translateY, {
                    toValue: -30,
                    duration: duration,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 30,
                    duration: duration,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Floating X animation (slower)
        Animated.loop(
            Animated.sequence([
                Animated.timing(translateX, {
                    toValue: 15,
                    duration: duration * 1.3,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
                Animated.timing(translateX, {
                    toValue: -15,
                    duration: duration * 1.3,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Scale pulse
        Animated.loop(
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1,
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
                styles.floatingElement,
                {
                    width: size,
                    height: size,
                    left: startX,
                    top: startY,
                    opacity,
                    transform: [
                        { translateX },
                        { translateY },
                        { scale },
                    ],
                },
            ]}
        >
            {/* Cricket ball design */}
            <View style={[styles.cricketBall, { width: size, height: size, borderRadius: size / 2 }]}>
                <View style={styles.cricketBallSeam} />
            </View>
        </Animated.View>
    );
};

/**
 * Animated particle for subtle background effect
 */
const Particle: React.FC<{ delay: number; startX: number }> = ({ delay, startX }) => {
    const translateY = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animate = () => {
            translateY.setValue(Dimensions.get('window').height + 20);
            opacity.setValue(0);

            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: -50,
                    duration: 8000 + Math.random() * 4000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.sequence([
                    Animated.timing(opacity, {
                        toValue: 0.4,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                    Animated.delay(4000),
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
                    transform: [{ translateY }],
                },
            ]}
        />
    );
};

interface AnimatedBackgroundProps {
    children?: React.ReactNode;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ children }) => {
    const theme = useTheme();
    const { width, height } = Dimensions.get('window');

    // Generate floating elements positions
    const floatingElements = [
        { size: 45, startX: width * 0.1, startY: height * 0.15, duration: 3000, delay: 0 },
        { size: 35, startX: width * 0.75, startY: height * 0.1, duration: 3500, delay: 500 },
        { size: 25, startX: width * 0.85, startY: height * 0.35, duration: 2800, delay: 1000 },
        { size: 40, startX: width * 0.05, startY: height * 0.55, duration: 3200, delay: 300 },
        { size: 30, startX: width * 0.65, startY: height * 0.7, duration: 2600, delay: 800 },
        { size: 20, startX: width * 0.35, startY: height * 0.08, duration: 4000, delay: 1200 },
    ];

    // Generate particles
    const particles = Array.from({ length: 12 }, (_, i) => ({
        delay: i * 800,
        startX: (width / 12) * i + Math.random() * 30,
    }));

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#0A4D2E', '#064A3A', '#042E2E', '#021A1A']}
                locations={[0, 0.3, 0.7, 1]}
                style={styles.gradient}
            />

            {/* Cricket pitch pattern overlay */}
            <View style={styles.pitchOverlay}>
                <View style={[styles.pitchLine, { width: width * 0.4 }]} />
                <View style={[styles.pitchCircle, { width: width * 0.2, height: width * 0.2, borderRadius: width * 0.1 }]} />
            </View>

            {/* Floating cricket balls */}
            {floatingElements.map((el, index) => (
                <FloatingElement key={index} {...el} />
            ))}

            {/* Subtle particles */}
            {particles.map((p, index) => (
                <Particle key={index} {...p} />
            ))}

            {/* Animated glow orbs */}
            <View style={[styles.glowOrb, styles.glowOrb1]} />
            <View style={[styles.glowOrb, styles.glowOrb2]} />

            {/* Content */}
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    pitchOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.08,
    },
    pitchLine: {
        height: 2,
        backgroundColor: '#FFFFFF',
        marginBottom: 40,
    },
    pitchCircle: {
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    floatingElement: {
        position: 'absolute',
    },
    cricketBall: {
        backgroundColor: '#C41E3A',
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#C41E3A',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.5,
                shadowRadius: 8,
            },
            android: {
                elevation: 8,
            },
            web: {
                boxShadow: '0 4px 16px rgba(196, 30, 58, 0.4)',
            },
        }),
    },
    cricketBallSeam: {
        width: '80%',
        height: 2,
        backgroundColor: '#FFFFFF',
        opacity: 0.7,
        borderRadius: 1,
    },
    particle: {
        position: 'absolute',
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#FFFFFF',
    },
    glowOrb: {
        position: 'absolute',
        borderRadius: 200,
        opacity: 0.15,
    },
    glowOrb1: {
        width: 400,
        height: 400,
        backgroundColor: '#0A9E4B',
        top: -100,
        right: -100,
    },
    glowOrb2: {
        width: 300,
        height: 300,
        backgroundColor: '#FF8A00',
        bottom: -50,
        left: -50,
    },
    content: {
        flex: 1,
        zIndex: 10,
    },
});
