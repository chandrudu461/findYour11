/**
 * SignUpScreen (CreateAccountScreen) - Premium Design with API Integration
 * 
 * Apple-inspired premium registration experience.
 * Integrated with FindYour11 user registration API.
 * 
 * API: POST /users/register
 */

import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import {
    PremiumBackground,
    CinematicInput,
    PremiumButton,
    HeroHeader,
} from '../../components/ui';
import { useAuth } from '../../context';

type SignUpScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'SignUp'>;

// Brand Colors
const COLORS = {
    primaryGreen: '#0A9E4B',
    accentOrange: '#FF8A00',
    softWhite: '#F9F9F9',
    textMuted: 'rgba(255, 255, 255, 0.5)',
    glassBorder: 'rgba(255, 255, 255, 0.1)',
    errorRed: '#FF4757',
    successGreen: '#0A9E4B',
    warningOrange: '#FF8A00',
};

/**
 * Password strength calculator
 */
const getPasswordStrength = (password: string): {
    strength: number;
    label: string;
    color: string;
} => {
    if (!password) return { strength: 0, label: '', color: 'transparent' };

    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;

    if (strength <= 25) return { strength, label: 'Weak', color: COLORS.errorRed };
    if (strength <= 50) return { strength, label: 'Fair', color: COLORS.warningOrange };
    if (strength <= 75) return { strength, label: 'Good', color: COLORS.primaryGreen };
    return { strength, label: 'Strong', color: COLORS.successGreen };
};

export default function SignUpScreen() {
    const navigation = useNavigation<SignUpScreenNavigationProp>();
    const { register, isLoading, isAuthenticated } = useAuth();
    const { width } = Dimensions.get('window');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Password strength animation
    const strengthAnim = useRef(new Animated.Value(0)).current;
    const passwordStrength = getPasswordStrength(password);

    // Bottom section animations
    const bottomFade = useRef(new Animated.Value(0)).current;
    const bottomTranslate = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(bottomFade, {
                toValue: 1,
                duration: 800,
                delay: 1400,
                useNativeDriver: true,
            }),
            Animated.spring(bottomTranslate, {
                toValue: 0,
                friction: 8,
                tension: 40,
                delay: 1400,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    useEffect(() => {
        Animated.timing(strengthAnim, {
            toValue: passwordStrength.strength,
            duration: 400,
            useNativeDriver: false,
        }).start();
    }, [passwordStrength.strength]);

    // Navigate when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Onboarding' }],
            });
        }
    }, [isAuthenticated, navigation]);

    /**
     * Validate form inputs
     */
    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!name.trim()) {
            newErrors.name = 'Full name is required';
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!email.includes('@') || !email.includes('.')) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (phone.length < 10) {
            newErrors.phone = 'Please enter a valid 10-digit number';
        }

        if (!password.trim()) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Handle registration
     */
    const handleSignUp = async () => {
        setErrors({});

        if (!validateForm()) return;

        const result = await register({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            password,
        });

        if (result.success) {
            // Show success message and navigate
            Alert.alert(
                'Account Created!',
                result.message || 'Welcome to FindYour11!',
                [{ text: 'Continue', onPress: () => { } }]
            );
        } else {
            setErrors({ form: result.message || 'Registration failed. Please try again.' });
        }
    };

    /**
     * Navigate to Login screen
     */
    const handleLogin = () => {
        navigation.navigate('Login');
    };

    const isWideScreen = width > 768;

    const strengthWidth = strengthAnim.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    });

    return (
        <PremiumBackground>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={[
                        styles.scrollContent,
                        isWideScreen && styles.wideScreenContent,
                    ]}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Hero Header */}
                    <HeroHeader
                        title="Join the Game"
                        subtitle="Create your account to unlock the full cricket experience"
                        showLogo={true}
                        animationDelay={100}
                        size="medium"
                    />

                    {/* Form Container */}
                    <View style={[styles.formContainer, isWideScreen && styles.formContainerWide]}>
                        {/* Form Error */}
                        {errors.form && (
                            <View style={styles.formError}>
                                <Text style={styles.formErrorText}>{errors.form}</Text>
                            </View>
                        )}

                        {/* Full Name */}
                        <CinematicInput
                            label="Full Name"
                            icon="user"
                            value={name}
                            onChangeText={(text) => {
                                setName(text);
                                setErrors(prev => ({ ...prev, name: '', form: '' }));
                            }}
                            autoCapitalize="words"
                            autoComplete="name"
                            error={errors.name}
                            animationDelay={500}
                        />

                        {/* Email */}
                        <CinematicInput
                            label="Email Address"
                            icon="email"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                setErrors(prev => ({ ...prev, email: '', form: '' }));
                            }}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                            error={errors.email}
                            animationDelay={600}
                        />

                        {/* Phone */}
                        <CinematicInput
                            label="Phone Number"
                            icon="phone"
                            value={phone}
                            onChangeText={(text) => {
                                setPhone(text);
                                setErrors(prev => ({ ...prev, phone: '', form: '' }));
                            }}
                            keyboardType="phone-pad"
                            maxLength={10}
                            autoComplete="tel"
                            error={errors.phone}
                            animationDelay={700}
                        />

                        {/* Password */}
                        <CinematicInput
                            label="Password"
                            icon="lock"
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                setErrors(prev => ({ ...prev, password: '', form: '' }));
                            }}
                            secureTextEntry
                            autoComplete="password-new"
                            error={errors.password}
                            animationDelay={800}
                        />

                        {/* Password Strength Indicator */}
                        {password.length > 0 && (
                            <View style={styles.strengthContainer}>
                                <View style={styles.strengthBar}>
                                    <Animated.View
                                        style={[
                                            styles.strengthFill,
                                            {
                                                width: strengthWidth,
                                                backgroundColor: passwordStrength.color,
                                            },
                                        ]}
                                    />
                                </View>
                                <Text style={[styles.strengthLabel, { color: passwordStrength.color }]}>
                                    {passwordStrength.label}
                                </Text>
                            </View>
                        )}

                        {/* Create Account Button */}
                        <View style={styles.buttonContainer}>
                            <PremiumButton
                                title="Create Account"
                                onPress={handleSignUp}
                                loading={isLoading}
                                disabled={isLoading}
                                variant="primary"
                                animationDelay={900}
                            />
                        </View>

                        {/* Divider */}
                        <Animated.View
                            style={[
                                styles.divider,
                                {
                                    opacity: bottomFade,
                                    transform: [{ translateY: bottomTranslate }],
                                },
                            ]}
                        >
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>or</Text>
                            <View style={styles.dividerLine} />
                        </Animated.View>

                        {/* Login Button */}
                        <Animated.View
                            style={{
                                opacity: bottomFade,
                                transform: [{ translateY: bottomTranslate }],
                            }}
                        >
                            <PremiumButton
                                title="Already have an account? Sign In"
                                onPress={handleLogin}
                                variant="ghost"
                                animationDelay={1000}
                            />
                        </Animated.View>
                    </View>

                    {/* Terms */}
                    <Animated.Text
                        style={[
                            styles.terms,
                            {
                                opacity: bottomFade,
                                transform: [{ translateY: bottomTranslate }],
                            },
                        ]}
                    >
                        By creating an account, you agree to our{' '}
                        <Text style={styles.termsLink}>Terms of Service</Text>
                        {' '}and{' '}
                        <Text style={styles.termsLink}>Privacy Policy</Text>
                    </Animated.Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </PremiumBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 48,
        paddingHorizontal: 24,
    },
    wideScreenContent: {
        paddingHorizontal: 48,
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
    },
    formContainerWide: {
        maxWidth: 420,
    },
    formError: {
        backgroundColor: 'rgba(255, 71, 87, 0.15)',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 71, 87, 0.3)',
    },
    formErrorText: {
        color: COLORS.errorRed,
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },
    strengthContainer: {
        marginTop: -16,
        marginBottom: 24,
    },
    strengthBar: {
        height: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 2,
        overflow: 'hidden',
    },
    strengthFill: {
        height: '100%',
        borderRadius: 2,
    },
    strengthLabel: {
        fontSize: 12,
        fontWeight: '600',
        marginTop: 8,
        textAlign: 'right',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    buttonContainer: {
        marginTop: 8,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 28,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.glassBorder,
    },
    dividerText: {
        color: COLORS.textMuted,
        paddingHorizontal: 20,
        fontSize: 13,
        fontWeight: '500',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    terms: {
        color: COLORS.textMuted,
        fontSize: 12,
        textAlign: 'center',
        marginTop: 32,
        lineHeight: 18,
        maxWidth: 300,
    },
    termsLink: {
        color: COLORS.accentOrange,
        fontWeight: '500',
    },
});
