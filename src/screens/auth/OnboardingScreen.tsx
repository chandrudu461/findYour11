/**
 * OnboardingScreen Component
 * 
 * Welcome and app introduction screen.
 * Shows key features and benefits before entering the main app.
 * 
 * Flow: Get Started → Navigate to Main (Home)
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { ScreenContainer, Spacer } from '../../components/layout';
import { PrimaryButton, Card, SectionHeader } from '../../components/ui';
import { useTheme } from '../../theme';

type OnboardingScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Onboarding'>;

export default function OnboardingScreen() {
    const navigation = useNavigation<OnboardingScreenNavigationProp>();
    const theme = useTheme();

    /**
     * Complete onboarding and navigate to main app
     * In a real app, this might:
     * - Save onboarding completion status
     * - Set auth token
     * - Navigate to main app
     */
    const handleGetStarted = () => {
        // Reset navigation stack to Main app
        // This removes the Auth stack from history
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Main' as never }],
            })
        );
    };

    return (
        <ScreenContainer scrollable>
            <View style={[styles.container, { padding: theme.spacing.lg }]}>
                {/* Welcome Header */}
                <View style={styles.header}>
                    <Text
                        style={[
                            styles.title,
                            {
                                color: theme.colors.textDark,
                                fontSize: theme.typography.h1.fontSize,
                                fontWeight: theme.typography.h1.fontWeight,
                                marginBottom: theme.spacing.sm,
                            },
                        ]}
                    >
                        Welcome! 🎉
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
                        Let's get you started with FindYour11
                    </Text>
                </View>

                <Spacer size="xxl" />

                {/* Features Section */}
                <SectionHeader
                    title="What You Can Do"
                    subtitle="Everything you need for cricket"
                />

                <Spacer size="md" />

                {/* Feature Cards */}
                <Card style={{ marginBottom: theme.spacing.md }}>
                    <View style={styles.featureCard}>
                        <Text style={styles.featureIcon}>🏏</Text>
                        <View style={styles.featureContent}>
                            <Text
                                style={[
                                    styles.featureTitle,
                                    {
                                        color: theme.colors.textDark,
                                        fontSize: theme.typography.h4.fontSize,
                                        fontWeight: '600',
                                        marginBottom: theme.spacing.xs,
                                    },
                                ]}
                            >
                                Build Your Team
                            </Text>
                            <Text
                                style={[
                                    styles.featureDescription,
                                    {
                                        color: theme.colors.textLight,
                                        fontSize: theme.typography.bodySmall.fontSize,
                                    },
                                ]}
                            >
                                Create and manage your dream cricket team with ease
                            </Text>
                        </View>
                    </View>
                </Card>

                <Card style={{ marginBottom: theme.spacing.md }}>
                    <View style={styles.featureCard}>
                        <Text style={styles.featureIcon}>🏟️</Text>
                        <View style={styles.featureContent}>
                            <Text
                                style={[
                                    styles.featureTitle,
                                    {
                                        color: theme.colors.textDark,
                                        fontSize: theme.typography.h4.fontSize,
                                        fontWeight: '600',
                                        marginBottom: theme.spacing.xs,
                                    },
                                ]}
                            >
                                Book Turfs
                            </Text>
                            <Text
                                style={[
                                    styles.featureDescription,
                                    {
                                        color: theme.colors.textLight,
                                        fontSize: theme.typography.bodySmall.fontSize,
                                    },
                                ]}
                            >
                                Find and book cricket grounds near you instantly
                            </Text>
                        </View>
                    </View>
                </Card>

                <Card style={{ marginBottom: theme.spacing.md }}>
                    <View style={styles.featureCard}>
                        <Text style={styles.featureIcon}>📊</Text>
                        <View style={styles.featureContent}>
                            <Text
                                style={[
                                    styles.featureTitle,
                                    {
                                        color: theme.colors.textDark,
                                        fontSize: theme.typography.h4.fontSize,
                                        fontWeight: '600',
                                        marginBottom: theme.spacing.xs,
                                    },
                                ]}
                            >
                                Track Matches
                            </Text>
                            <Text
                                style={[
                                    styles.featureDescription,
                                    {
                                        color: theme.colors.textLight,
                                        fontSize: theme.typography.bodySmall.fontSize,
                                    },
                                ]}
                            >
                                Keep score and track all your match statistics
                            </Text>
                        </View>
                    </View>
                </Card>

                <Card>
                    <View style={styles.featureCard}>
                        <Text style={styles.featureIcon}>📚</Text>
                        <View style={styles.featureContent}>
                            <Text
                                style={[
                                    styles.featureTitle,
                                    {
                                        color: theme.colors.textDark,
                                        fontSize: theme.typography.h4.fontSize,
                                        fontWeight: '600',
                                        marginBottom: theme.spacing.xs,
                                    },
                                ]}
                            >
                                Learn Cricket
                            </Text>
                            <Text
                                style={[
                                    styles.featureDescription,
                                    {
                                        color: theme.colors.textLight,
                                        fontSize: theme.typography.bodySmall.fontSize,
                                    },
                                ]}
                            >
                                Master the game with tutorials and cricket rules
                            </Text>
                        </View>
                    </View>
                </Card>

                <Spacer size="xxl" />

                {/* Get Started Button */}
                <PrimaryButton
                    title="Get Started"
                    onPress={handleGetStarted}
                />

                <Spacer size="lg" />
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        marginTop: 20,
    },
    title: {
        textAlign: 'center',
    },
    subtitle: {
        textAlign: 'center',
    },
    featureCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    featureIcon: {
        fontSize: 40,
        marginRight: 16,
    },
    featureContent: {
        flex: 1,
    },
    featureTitle: {
        // Theme-based styles applied inline
    },
    featureDescription: {
        // Theme-based styles applied inline
    },
});
