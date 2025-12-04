/**
 * SplashScreen Component
 * 
 * Initial screen displayed when app launches.
 * Shows app branding and automatically navigates to login after a delay.
 * 
 * Flow: Auto-navigates to Login after 2 seconds
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { ScreenContainer } from '../../components/layout';
import { Loader } from '../../components/ui';
import { useTheme } from '../../theme';

type SplashScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Splash'>;

export default function SplashScreen() {
    const navigation = useNavigation<SplashScreenNavigationProp>();
    const theme = useTheme();

    // Auto-navigate to Login after 2 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <ScreenContainer style={styles.container}>
            <View style={styles.content}>
                {/* App Logo/Icon */}
                <View
                    style={[
                        styles.logoContainer,
                        {
                            backgroundColor: theme.colors.primary,
                            borderRadius: theme.radii.xl,
                            padding: theme.spacing.xl,
                        },
                    ]}
                >
                    <Text style={[styles.logoIcon, { color: theme.colors.white }]}>
                        🏏
                    </Text>
                </View>

                {/* App Name */}
                <Text
                    style={[
                        styles.appName,
                        {
                            color: theme.colors.textDark,
                            fontSize: theme.typography.h1.fontSize,
                            fontWeight: theme.typography.h1.fontWeight,
                            marginTop: theme.spacing.lg,
                        },
                    ]}
                >
                    FindYour11
                </Text>

                {/* Tagline */}
                <Text
                    style={[
                        styles.tagline,
                        {
                            color: theme.colors.textLight,
                            fontSize: theme.typography.body.fontSize,
                            marginTop: theme.spacing.sm,
                        },
                    ]}
                >
                    Your Cricket Companion
                </Text>

                {/* Loading Indicator */}
                <View style={{ marginTop: theme.spacing.xxl }}>
                    <Loader size="large" color={theme.colors.primary} />
                </View>
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
        height: 120,
    },
    logoIcon: {
        fontSize: 60,
    },
    appName: {
        textAlign: 'center',
    },
    tagline: {
        textAlign: 'center',
    },
});
