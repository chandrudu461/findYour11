/**
 * HomeScreen Component
 * 
 * Main dashboard screen showing:
 * - Quick action buttons
 * - Suggested turfs
 * - Upcoming matches
 * 
 * All data is static placeholder for now (no backend).
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/types';
import { ScreenContainer, Spacer } from '../../components/layout';
import { Card, SectionHeader, PrimaryButton, Tag } from '../../components/ui';
import { useTheme } from '../../theme';

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Dashboard'>;

/**
 * Static placeholder data for turfs
 */
const SUGGESTED_TURFS = [
    {
        id: '1',
        name: 'Green Valley Cricket Ground',
        location: 'Bangalore, Karnataka',
        price: '₹2,500/hour',
        rating: '4.8',
        available: true,
    },
    {
        id: '2',
        name: 'Champions Cricket Arena',
        location: 'Mumbai, Maharashtra',
        price: '₹3,000/hour',
        rating: '4.9',
        available: true,
    },
    {
        id: '3',
        name: 'City Sports Complex',
        location: 'Hyderabad, Telangana',
        price: '₹2,000/hour',
        rating: '4.6',
        available: false,
    },
];

/**
 * Static placeholder data for matches
 */
const UPCOMING_MATCHES = [
    {
        id: '1',
        team1: 'Mumbai Indians',
        team2: 'Chennai Super Kings',
        date: 'Dec 5, 2025',
        time: '7:30 PM',
        venue: 'Wankhede Stadium',
        status: 'upcoming',
    },
    {
        id: '2',
        team1: 'Royal Challengers',
        team2: 'Delhi Capitals',
        date: 'Dec 7, 2025',
        time: '3:30 PM',
        venue: 'M. Chinnaswamy Stadium',
        status: 'upcoming',
    },
];

export default function HomeScreen() {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const theme = useTheme();

    /**
     * Handle quick action button press
     * In real app, would navigate to respective screens
     */
    const handleQuickAction = (action: string) => {
        console.log('Quick action pressed:', action);
        // TODO: Navigate to respective screens when implemented
    };

    /**
     * Handle view turf details
     */
    const handleViewTurf = (turfId: string) => {
        console.log('View turf:', turfId);
        // TODO: Navigate to turf details when implemented
    };

    /**
     * Handle view match details
     */
    const handleViewMatch = (matchId: string) => {
        console.log('View match:', matchId);
        // TODO: Navigate to match details when implemented
    };

    return (
        <ScreenContainer>
            {/* Header */}
            <View
                style={[
                    styles.header,
                    {
                        backgroundColor: theme.colors.primary,
                        paddingTop: theme.spacing.lg,
                        paddingBottom: theme.spacing.md,
                        paddingHorizontal: theme.spacing.md,
                    },
                ]}
            >
                <Text
                    style={[
                        styles.greeting,
                        {
                            color: theme.colors.white,
                            fontSize: theme.typography.h3.fontSize,
                            fontWeight: theme.typography.h3.fontWeight,
                        },
                    ]}
                >
                    Welcome back! 🏏
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Notifications')}
                    style={styles.notificationButton}
                >
                    <Text style={{ color: theme.colors.white, fontSize: 24 }}>🔔</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ padding: theme.spacing.md }}>
                    {/* Quick Actions Section */}
                    <SectionHeader title="Quick Actions" />
                    <Spacer size="sm" />

                    <View style={styles.quickActionsGrid}>
                        <TouchableOpacity
                            style={[
                                styles.quickActionCard,
                                {
                                    backgroundColor: theme.colors.white,
                                    borderRadius: theme.radii.md,
                                    padding: theme.spacing.md,
                                    ...theme.shadows.small,
                                },
                            ]}
                            onPress={() => handleQuickAction('book-turf')}
                        >
                            <Text style={styles.quickActionIcon}>🏟️</Text>
                            <Text
                                style={[
                                    styles.quickActionText,
                                    {
                                        color: theme.colors.textDark,
                                        fontSize: theme.typography.bodySmall.fontSize,
                                        fontWeight: '600',
                                    },
                                ]}
                            >
                                Book Turf
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.quickActionCard,
                                {
                                    backgroundColor: theme.colors.white,
                                    borderRadius: theme.radii.md,
                                    padding: theme.spacing.md,
                                    ...theme.shadows.small,
                                },
                            ]}
                            onPress={() => handleQuickAction('find-match')}
                        >
                            <Text style={styles.quickActionIcon}>🔍</Text>
                            <Text
                                style={[
                                    styles.quickActionText,
                                    {
                                        color: theme.colors.textDark,
                                        fontSize: theme.typography.bodySmall.fontSize,
                                        fontWeight: '600',
                                    },
                                ]}
                            >
                                Find Match
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.quickActionCard,
                                {
                                    backgroundColor: theme.colors.white,
                                    borderRadius: theme.radii.md,
                                    padding: theme.spacing.md,
                                    ...theme.shadows.small,
                                },
                            ]}
                            onPress={() => handleQuickAction('view-stats')}
                        >
                            <Text style={styles.quickActionIcon}>📊</Text>
                            <Text
                                style={[
                                    styles.quickActionText,
                                    {
                                        color: theme.colors.textDark,
                                        fontSize: theme.typography.bodySmall.fontSize,
                                        fontWeight: '600',
                                    },
                                ]}
                            >
                                View Stats
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.quickActionCard,
                                {
                                    backgroundColor: theme.colors.white,
                                    borderRadius: theme.radii.md,
                                    padding: theme.spacing.md,
                                    ...theme.shadows.small,
                                },
                            ]}
                            onPress={() => handleQuickAction('learn-rules')}
                        >
                            <Text style={styles.quickActionIcon}>📚</Text>
                            <Text
                                style={[
                                    styles.quickActionText,
                                    {
                                        color: theme.colors.textDark,
                                        fontSize: theme.typography.bodySmall.fontSize,
                                        fontWeight: '600',
                                    },
                                ]}
                            >
                                Learn Rules
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Spacer size="xl" />

                    {/* Suggested Turfs Section */}
                    <SectionHeader
                        title="Suggested Turfs"
                        actionText="See All"
                        onActionPress={() => console.log('See all turfs')}
                    />
                    <Spacer size="sm" />

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {SUGGESTED_TURFS.map((turf) => (
                            <Card
                                key={turf.id}
                                onPress={() => handleViewTurf(turf.id)}
                                style={{ width: 280, marginRight: theme.spacing.md }}
                            >
                                {/* Turf Icon/Image Placeholder */}
                                <View
                                    style={[
                                        styles.turfImagePlaceholder,
                                        {
                                            backgroundColor: theme.colors.bgSoft,
                                            borderRadius: theme.radii.sm,
                                            marginBottom: theme.spacing.sm,
                                        },
                                    ]}
                                >
                                    <Text style={{ fontSize: 40 }}>🏏</Text>
                                </View>

                                <Text
                                    style={[
                                        styles.turfName,
                                        {
                                            color: theme.colors.textDark,
                                            fontSize: theme.typography.body.fontSize,
                                            fontWeight: '600',
                                            marginBottom: theme.spacing.xs,
                                        },
                                    ]}
                                >
                                    {turf.name}
                                </Text>

                                <Text
                                    style={[
                                        styles.turfLocation,
                                        {
                                            color: theme.colors.textLight,
                                            fontSize: theme.typography.bodySmall.fontSize,
                                            marginBottom: theme.spacing.sm,
                                        },
                                    ]}
                                >
                                    📍 {turf.location}
                                </Text>

                                <View style={styles.turfFooter}>
                                    <Text
                                        style={[
                                            styles.turfPrice,
                                            {
                                                color: theme.colors.primary,
                                                fontSize: theme.typography.body.fontSize,
                                                fontWeight: '600',
                                            },
                                        ]}
                                    >
                                        {turf.price}
                                    </Text>
                                    <Tag
                                        label={turf.available ? 'Available' : 'Booked'}
                                        variant={turf.available ? 'success' : 'error'}
                                    />
                                </View>
                            </Card>
                        ))}
                    </ScrollView>

                    <Spacer size="xl" />

                    {/* Upcoming Matches Section */}
                    <SectionHeader
                        title="Upcoming Matches"
                        actionText="View All"
                        onActionPress={() => console.log('View all matches')}
                    />
                    <Spacer size="sm" />

                    {UPCOMING_MATCHES.map((match) => (
                        <Card
                            key={match.id}
                            onPress={() => handleViewMatch(match.id)}
                            style={{ marginBottom: theme.spacing.md }}
                        >
                            <View style={styles.matchHeader}>
                                <Text
                                    style={[
                                        styles.matchTeams,
                                        {
                                            color: theme.colors.textDark,
                                            fontSize: theme.typography.h4.fontSize,
                                            fontWeight: '600',
                                            flex: 1,
                                        },
                                    ]}
                                >
                                    {match.team1} vs {match.team2}
                                </Text>
                                <Tag label={match.status} variant="info" />
                            </View>

                            <Spacer size="sm" />

                            <View style={styles.matchDetails}>
                                <Text
                                    style={[
                                        styles.matchDetail,
                                        {
                                            color: theme.colors.textLight,
                                            fontSize: theme.typography.bodySmall.fontSize,
                                        },
                                    ]}
                                >
                                    📅 {match.date} • {match.time}
                                </Text>
                                <Text
                                    style={[
                                        styles.matchDetail,
                                        {
                                            color: theme.colors.textLight,
                                            fontSize: theme.typography.bodySmall.fontSize,
                                            marginTop: theme.spacing.xs,
                                        },
                                    ]}
                                >
                                    📍 {match.venue}
                                </Text>
                            </View>

                            <Spacer size="md" />

                            <PrimaryButton title="View Details" onPress={() => handleViewMatch(match.id)} />
                        </Card>
                    ))}

                    <Spacer size="lg" />
                </View>
            </ScrollView>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    greeting: {
        flex: 1,
    },
    notificationButton: {
        padding: 8,
    },
    quickActionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    quickActionCard: {
        width: '48%',
        alignItems: 'center',
        marginBottom: 12,
        minHeight: 100,
        justifyContent: 'center',
    },
    quickActionIcon: {
        fontSize: 32,
        marginBottom: 8,
    },
    quickActionText: {
        textAlign: 'center',
    },
    turfImagePlaceholder: {
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
    },
    turfName: {
        // Theme-based styles applied inline
    },
    turfLocation: {
        // Theme-based styles applied inline
    },
    turfFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    turfPrice: {
        // Theme-based styles applied inline
    },
    matchHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    matchTeams: {
        // Theme-based styles applied inline
    },
    matchDetails: {
        // Theme-based styles applied inline
    },
    matchDetail: {
        // Theme-based styles applied inline
    },
});
