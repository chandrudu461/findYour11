/**
 * LoginScreen Component
 * 
 * Phone number login screen.
 * Users enter their phone number to receive an OTP.
 * 
 * Flow: Enter phone → Navigate to OTP Verify
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { ScreenContainer, Spacer } from '../../components/layout';
import { InputField, PrimaryButton, SecondaryButton } from '../../components/ui';
import { useTheme } from '../../theme';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

/**
 * Mock API: Simulate sending OTP
 * In real app, this would call backend API
 */
const mockSendOTP = async (phoneNumber: string): Promise<{ success: boolean; message: string }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock validation
    if (phoneNumber.length < 10) {
        return { success: false, message: 'Please enter a valid phone number' };
    }

    return { success: true, message: 'OTP sent successfully!' };
};

export default function LoginScreen() {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const theme = useTheme();

    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    /**
     * Handle login button press
     * Validates phone and navigates to OTP screen
     */
    const handleLogin = async () => {
        // Clear previous errors
        setError('');

        // Validate phone number
        if (!phoneNumber.trim()) {
            setError('Phone number is required');
            return;
        }

        try {
            setLoading(true);

            // Call mock API
            const result = await mockSendOTP(phoneNumber);

            if (result.success) {
                // Navigate to OTP verification screen
                navigation.navigate('OtpVerify', { phoneNumber });
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
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
                        Welcome to FindYour11
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
                        Enter your phone number to get started
                    </Text>
                </View>

                <Spacer size="xxl" />

                {/* Phone Number Input */}
                <InputField
                    label="Phone Number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder="Enter 10-digit mobile number"
                    keyboardType="phone-pad"
                    maxLength={10}
                    error={error}
                    autoFocus
                />

                <Spacer size="lg" />

                {/* Login Button */}
                <PrimaryButton
                    title="Send OTP"
                    onPress={handleLogin}
                    loading={loading}
                    disabled={loading}
                />

                <Spacer size="md" />

                {/* Skip for now button (development only) */}
                <SecondaryButton
                    title="Skip to Home (Dev Only)"
                    onPress={() => {
                        // This is just for development/testing
                        // In production, this would be removed
                        Alert.alert('Info', 'This button is for development testing only');
                    }}
                />

                <Spacer size="xxl" />

                {/* Terms and conditions */}
                <Text
                    style={[
                        styles.terms,
                        {
                            color: theme.colors.textLight,
                            fontSize: theme.typography.caption.fontSize,
                            textAlign: 'center',
                        },
                    ]}
                >
                    By continuing, you agree to our Terms of Service and Privacy Policy
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
        // Theme-based styles applied inline
    },
    terms: {
        // Theme-based styles applied inline
    },
});
