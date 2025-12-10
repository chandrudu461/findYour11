/**
 * LoginScreen - Premium Cinematic Design with API Integration
 * 
 * Apple-inspired premium login experience with email/password authentication.
 * Integrated with FindYour11 authentication API.
 * 
 * API: POST /auth/login
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

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

// Brand Colors
const COLORS = {
    accentOrange: '#FF8A00',
    softWhite: '#F9F9F9',
    textMuted: 'rgba(255, 255, 255, 0.5)',
    glassBorder: 'rgba(255, 255, 255, 0.1)',
    errorRed: '#FF4757',
};

export default function LoginScreen() {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const { login, loginWithPhone, isLoading, isAuthenticated } = useAuth();
    const { width } = Dimensions.get('window');

    const [identifier, setIdentifier] = useState(''); // Email or Phone
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ identifier?: string; password?: string; form?: string }>({});

    // Fade in animation for bottom section
    const bottomFade = useRef(new Animated.Value(0)).current;
    const bottomTranslate = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        // Delayed entrance for bottom section
        Animated.parallel([
            Animated.timing(bottomFade, {
                toValue: 1,
                duration: 800,
                delay: 1200,
                useNativeDriver: true,
            }),
            Animated.spring(bottomTranslate, {
                toValue: 0,
                friction: 8,
                tension: 40,
                delay: 1200,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    // Navigate to main app when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            // Navigate to main app - using replace to prevent going back to login
            navigation.reset({
                index: 0,
                routes: [{ name: 'Onboarding' }], // Or directly to Main if onboarding is complete
            });
        }
    }, [isAuthenticated, navigation]);

    /**
     * Validate form inputs
     */
    const validateForm = (): boolean => {
        const newErrors: typeof errors = {};
        const trimmedIdentifier = identifier.trim();

        if (!trimmedIdentifier) {
            newErrors.identifier = 'Email or Phone is required';
        } else {
            const isEmail = trimmedIdentifier.includes('@');
            const isPhone = /^\d{10,15}$/.test(trimmedIdentifier);

            if (!isEmail && !isPhone) {
                newErrors.identifier = 'Enter a valid email or phone number';
            }
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
     * Handle login button press
     */
    const handleLogin = async () => {
        setErrors({});

        if (!validateForm()) return;

        const trimmedIdentifier = identifier.trim();
        const isPhone = /^\d+$/.test(trimmedIdentifier);

        let result;
        if (isPhone) {
            result = await loginWithPhone(trimmedIdentifier, password);
        } else {
            result = await login(trimmedIdentifier, password);
        }

        if (!result.success) {
            setErrors({ form: result.message || 'Login failed. Please check your credentials.' });
        }
    };

    /**
     * Navigate to Sign Up screen
     */
    const handleSignUp = () => {
        navigation.navigate('SignUp' as any);
    };

    const isWideScreen = width > 768;

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
                    {/* Hero Header with animated logo */}
                    <HeroHeader
                        title="FindYour11"
                        subtitle="Step into the ultimate cricket experience. Build your dream team."
                        showLogo={true}
                        animationDelay={200}
                    />

                    {/* Form Container */}
                    <View style={[styles.formContainer, isWideScreen && styles.formContainerWide]}>
                        {/* Form Error */}
                        {errors.form && (
                            <View style={styles.formError}>
                                <Text style={styles.formErrorText}>{errors.form}</Text>
                            </View>
                        )}

                        {/* Email/Phone Input */}
                        <CinematicInput
                            label="Email or Phone"
                            icon="email" // Use abstract user icon ideally, keeping email for now
                            value={identifier}
                            onChangeText={(text) => {
                                setIdentifier(text);
                                setErrors(prev => ({ ...prev, identifier: '', form: '' }));
                            }}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                            error={errors.identifier}
                            animationDelay={800}
                        />

                        {/* Password Input */}
                        <CinematicInput
                            label="Password"
                            icon="lock"
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                setErrors(prev => ({ ...prev, password: '', form: '' }));
                            }}
                            secureTextEntry
                            autoComplete="password"
                            error={errors.password}
                            animationDelay={900}
                        />

                        {/* Login Button */}
                        <View style={styles.buttonContainer}>
                            <PremiumButton
                                title="Sign In"
                                onPress={handleLogin}
                                loading={isLoading}
                                disabled={isLoading}
                                variant="primary"
                                animationDelay={1000}
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

                        {/* Create Account */}
                        <Animated.View
                            style={{
                                opacity: bottomFade,
                                transform: [{ translateY: bottomTranslate }],
                            }}
                        >
                            <PremiumButton
                                title="Create New Account"
                                onPress={handleSignUp}
                                variant="secondary"
                                animationDelay={1100}
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
                        By continuing, you agree to our{' '}
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
        paddingVertical: 60,
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
    buttonContainer: {
        marginTop: 8,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 32,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.glassBorder,
    },
    dividerText: {
        color: COLORS.textMuted,
        paddingHorizontal: 20,
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    terms: {
        color: COLORS.textMuted,
        fontSize: 13,
        textAlign: 'center',
        marginTop: 40,
        lineHeight: 20,
        maxWidth: 320,
    },
    termsLink: {
        color: COLORS.accentOrange,
        fontWeight: '500',
    },
});
