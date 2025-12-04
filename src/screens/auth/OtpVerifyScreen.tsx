/**
 * OtpVerifyScreen Component
 * 
 * OTP verification screen.
 * Users enter the OTP sent to their phone number.
 * 
 * Flow: Enter OTP → Navigate to Onboarding
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { ScreenContainer, Spacer } from '../../components/layout';
import { InputField, PrimaryButton, SecondaryButton } from '../../components/ui';
import { useTheme } from '../../theme';

type OtpVerifyScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'OtpVerify'>;
type OtpVerifyScreenRouteProp = RouteProp<AuthStackParamList, 'OtpVerify'>;

/**
 * Mock API: Simulate OTP verification
 * In real app, this would validate OTP with backend
 */
const mockVerifyOTP = async (phoneNumber: string, otp: string): Promise<{ success: boolean; message: string }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock validation - accept any 4-6 digit OTP
    if (otp.length >= 4 && otp.length <= 6) {
        return { success: true, message: 'OTP verified successfully!' };
    }

    return { success: false, message: 'Invalid OTP. Please try again.' };
};

/**
 * Mock API: Simulate resending OTP
 */
const mockResendOTP = async (phoneNumber: string): Promise<{ success: boolean; message: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true, message: 'OTP resent successfully!' };
};

export default function OtpVerifyScreen() {
    const navigation = useNavigation<OtpVerifyScreenNavigationProp>();
    const route = useRoute<OtpVerifyScreenRouteProp>();
    const theme = useTheme();

    const { phoneNumber } = route.params;

    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [error, setError] = useState('');

    /**
     * Handle OTP verification
     */
    const handleVerifyOTP = async () => {
        // Clear previous errors
        setError('');

        // Validate OTP
        if (!otp.trim()) {
            setError('Please enter OTP');
            return;
        }

        if (otp.length < 4) {
            setError('OTP must be at least 4 digits');
            return;
        }

        try {
            setLoading(true);

            // Call mock API
            const result = await mockVerifyOTP(phoneNumber, otp);

            if (result.success) {
                // Navigate to onboarding screen
                navigation.navigate('Onboarding');
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('Verification failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handle resend OTP
     */
    const handleResendOTP = async () => {
        try {
            setResending(true);
            setError('');

            // Call mock API
            const result = await mockResendOTP(phoneNumber);

            if (result.success) {
                // Show success feedback (in real app, might show toast/alert)
                setError(''); // Clear any errors
                setOtp(''); // Clear OTP field
            }
        } catch (err) {
            setError('Failed to resend OTP');
        } finally {
            setResending(false);
        }
    };

    return (
        <ScreenContainer scrollable>
            <View style={[styles.container, { padding: theme.spacing.lg }]}>
                {/* Header */}
                <View style={styles.header}>
                    <Text
                        style={[
                            styles.title,
                            {
                                color: theme.colors.textDark,
                                fontSize: theme.typography.h2.fontSize,
                                fontWeight: theme.typography.h2.fontWeight,
                                marginBottom: theme.spacing.sm,
                            },
                        ]}
                    >
                        Verify OTP
                    </Text>
                    <Text
                        style={[
                            styles.subtitle,
                            {
                                color: theme.colors.textLight,
                                fontSize: theme.typography.body.fontSize,
                            },
                        ]}
                    >
                        We've sent a verification code to{'\n'}
                        <Text style={{ color: theme.colors.primary, fontWeight: '600' }}>
                            {phoneNumber}
                        </Text>
                    </Text>
                </View>

                <Spacer size="xxl" />

                {/* OTP Input */}
                <InputField
                    label="Enter OTP"
                    value={otp}
                    onChangeText={setOtp}
                    placeholder="Enter 4-6 digit code"
                    keyboardType="number-pad"
                    maxLength={6}
                    error={error}
                    autoFocus
                />

                <Spacer size="lg" />

                {/* Verify Button */}
                <PrimaryButton
                    title="Verify & Continue"
                    onPress={handleVerifyOTP}
                    loading={loading}
                    disabled={loading || resending}
                />

                <Spacer size="md" />

                {/* Resend OTP Button */}
                <SecondaryButton
                    title="Resend OTP"
                    onPress={handleResendOTP}
                    loading={resending}
                    disabled={loading || resending}
                />

                <Spacer size="lg" />

                {/* Help text */}
                <Text
                    style={[
                        styles.helpText,
                        {
                            color: theme.colors.textLight,
                            fontSize: theme.typography.bodySmall.fontSize,
                            textAlign: 'center',
                        },
                    ]}
                >
                    Didn't receive the code?{'\n'}
                    Please check your phone or try resending.
                </Text>
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        marginTop: 40,
    },
    title: {
        // Theme-based styles applied inline
    },
    subtitle: {
        lineHeight: 24,
    },
    helpText: {
        // Theme-based styles applied inline
    },
});
