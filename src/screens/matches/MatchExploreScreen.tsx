/**
 * MatchExploreScreen Component
 * 
 * Browse and search available matches.
 * 
 * Features:
 * - Search bar
 * - Filter UI (date, type, location)
 * - Match list cards
 * - Empty state
 * - Create match button
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MatchesStackParamList } from '../../navigation/types';
import { ScreenContainer, Spacer } from '../../components/layout';
import { Card, InputField, Tag, SectionHeader, PrimaryButton, SecondaryButton } from '../../components/ui';
import { useTheme } from '../../theme';
import { getMatches, Match, MatchFilters } from '../../services';

type MatchExploreScreenNavigationProp = NativeStackNavigationProp<MatchesStackParamList, 'MatchesList'>;

export default function MatchExploreScreen() {
    const navigation = useNavigation<MatchExploreScreenNavigationProp>();
    const theme = useTheme();

    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<MatchFilters>({});
    const [showFilters, setShowFilters] = useState(false);

    /**
     * Fetch matches on mount
     */
    useEffect(() => {
        fetchMatches();
    }, [filters]);

    const fetchMatches = async () => {
        try {
            setLoading(true);
            const matchesData = await getMatches(filters);
            setMatches(matchesData);
        } catch (error) {
            console.error('Failed to fetch matches:', error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handle match card press
     */
    const handleMatchPress = (matchId: string) => {
        navigation.navigate('MatchDetails', { matchId });
    };

    /**
     * Filter matches by search query
     */
    const filteredMatches = matches.filter((match) =>
        (match.name || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    /**
     * Render empty state
     */
    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <Text style={{ fontSize: 60, marginBottom: theme.spacing.md }}>🏏</Text>
            <Text
                style={[
                    styles.emptyTitle,
                    {
                        color: theme.colors.textDark,
                        fontSize: theme.typography.h3.fontSize,
                        fontWeight: '600',
                        marginBottom: theme.spacing.sm,
                    },
                ]}
            >
                No Matches Found
            </Text>
            <Text
                style={[
                    styles.emptyMessage,
                    {
                        color: theme.colors.textLight,
                        fontSize: theme.typography.body.fontSize,
                        textAlign: 'center',
                        marginBottom: theme.spacing.lg,
                    },
                ]}
            >
                Be the first to create a match!
            </Text>
            <PrimaryButton title="Create Match" onPress={() => navigation.navigate('CreateMatch')} />
        </View>
    );

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
                        styles.headerTitle,
                        {
                            color: theme.colors.white,
                            fontSize: theme.typography.h3.fontSize,
                            fontWeight: theme.typography.h3.fontWeight,
                        },
                    ]}
                >
                    Explore Matches 🏏
                </Text>
            </View>

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ padding: theme.spacing.md }}>
                    {/* Search Bar */}
                    <InputField
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholder="Search matches..."
                    />

                    <Spacer size="md" />

                    {/* Filters Toggle */}
                    <SecondaryButton
                        title={showFilters ? 'Hide Filters' : 'Show Filters'}
                        onPress={() => setShowFilters(!showFilters)}
                    />

                    {showFilters && (
                        <>
                            <Spacer size="md" />
                            <Card>
                                <Text
                                    style={[
                                        styles.filterTitle,
                                        {
                                            color: theme.colors.textDark,
                                            fontSize: theme.typography.body.fontSize,
                                            fontWeight: '600',
                                            marginBottom: theme.spacing.md,
                                        },
                                    ]}
                                >
                                    Filter Matches
                                </Text>

                                {/* Match Type Filter */}
                                <View style={styles.filterRow}>
                                    <TouchableOpacity
                                        style={[
                                            styles.filterChip,
                                            {
                                                backgroundColor:
                                                    filters.matchType === 'Casual'
                                                        ? theme.colors.primary + '20'
                                                        : theme.colors.bgSoft,
                                                borderColor:
                                                    filters.matchType === 'Casual'
                                                        ? theme.colors.primary
                                                        : theme.colors.border,
                                                borderWidth: 1,
                                                borderRadius: theme.radii.round,
                                                paddingVertical: theme.spacing.sm,
                                                paddingHorizontal: theme.spacing.md,
                                                marginRight: theme.spacing.sm,
                                            },
                                        ]}
                                        onPress={() =>
                                            setFilters({
                                                ...filters,
                                                matchType: filters.matchType === 'Casual' ? undefined : 'Casual',
                                            })
                                        }
                                    >
                                        <Text
                                            style={{
                                                color:
                                                    filters.matchType === 'Casual'
                                                        ? theme.colors.primary
                                                        : theme.colors.textDark,
                                                fontWeight: '600',
                                            }}
                                        >
                                            Casual
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.filterChip,
                                            {
                                                backgroundColor:
                                                    filters.matchType === 'Tournament'
                                                        ? theme.colors.primary + '20'
                                                        : theme.colors.bgSoft,
                                                borderColor:
                                                    filters.matchType === 'Tournament'
                                                        ? theme.colors.primary
                                                        : theme.colors.border,
                                                borderWidth: 1,
                                                borderRadius: theme.radii.round,
                                                paddingVertical: theme.spacing.sm,
                                                paddingHorizontal: theme.spacing.md,
                                            },
                                        ]}
                                        onPress={() =>
                                            setFilters({
                                                ...filters,
                                                matchType: filters.matchType === 'Tournament' ? undefined : 'Tournament',
                                            })
                                        }
                                    >
                                        <Text
                                            style={{
                                                color:
                                                    filters.matchType === 'Tournament'
                                                        ? theme.colors.primary
                                                        : theme.colors.textDark,
                                                fontWeight: '600',
                                            }}
                                        >
                                            Tournament
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <Spacer size="sm" />

                                <SecondaryButton
                                    title="Clear Filters"
                                    onPress={() => setFilters({})}
                                />
                            </Card>
                        </>
                    )}

                    <Spacer size="lg" />

                    {/* Matches List */}
                    <SectionHeader
                        title={`${filteredMatches.length} ${filteredMatches.length === 1 ? 'Match' : 'Matches'}`}
                        actionText="Create New"
                        onActionPress={() => navigation.navigate('CreateMatch')}
                    />

                    <Spacer size="sm" />

                    {loading ? (
                        <Text style={{ textAlign: 'center', color: theme.colors.textLight }}>
                            Loading matches...
                        </Text>
                    ) : filteredMatches.length === 0 ? (
                        renderEmptyState()
                    ) : (
                        filteredMatches.map((match) => (
                            <Card
                                key={match.id}
                                onPress={() => handleMatchPress(match.id!)}
                                style={{ marginBottom: theme.spacing.md }}
                            >
                                <View style={styles.matchCard}>
                                    <View style={{ flex: 1 }}>
                                        <Text
                                            style={[
                                                styles.matchName,
                                                {
                                                    color: theme.colors.textDark,
                                                    fontSize: theme.typography.h4.fontSize,
                                                    fontWeight: '600',
                                                    marginBottom: theme.spacing.xs,
                                                },
                                            ]}
                                        >
                                            {match.name}
                                        </Text>

                                        <Text
                                            style={{
                                                color: theme.colors.textLight,
                                                fontSize: theme.typography.bodySmall.fontSize,
                                            }}
                                        >
                                            📅 {match.date} • {match.time}
                                        </Text>
                                        <Text
                                            style={{
                                                color: theme.colors.textLight,
                                                fontSize: theme.typography.bodySmall.fontSize,
                                                marginTop: 2,
                                            }}
                                        >
                                            📍 {match.turfLocation}
                                        </Text>

                                        <Spacer size="sm" />

                                        <View style={styles.matchTags}>
                                            <Tag label={match.matchType || 'Match'} variant="primary" />
                                            <Tag
                                                label={`${match.overs} Overs`}
                                                variant="info"
                                                style={{ marginLeft: 8 }}
                                            />
                                            <Tag
                                                label={match.status}
                                                variant={match.status === 'Open' ? 'success' : 'info'}
                                                style={{ marginLeft: 8 }}
                                            />
                                        </View>
                                    </View>
                                </View>

                                <Spacer size="sm" />

                                <View style={styles.teamInfo}>
                                    <Text style={{ color: theme.colors.textDark, fontSize: 12 }}>
                                        Team A: {match.teamA.players.length}/{match.playersPerTeam}
                                    </Text>
                                    <Text style={{ color: theme.colors.textDark, fontSize: 12 }}>
                                        Team B: {match.teamB.players.length}/{match.playersPerTeam}
                                    </Text>
                                </View>
                            </Card>
                        ))
                    )}

                    <Spacer size="lg" />
                </View>
            </ScrollView>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    header: {
        // Theme-based styles applied inline
    },
    headerTitle: {
        // Theme-based styles applied inline
    },
    filterTitle: {
        // Theme-based styles applied inline
    },
    filterRow: {
        flexDirection: 'row',
    },
    filterChip: {
        // Theme-based styles applied inline
    },
    emptyState: {
        alignItems: 'center',
        padding: 32,
    },
    emptyTitle: {
        textAlign: 'center',
    },
    emptyMessage: {
        // Theme-based styles applied inline
    },
    matchCard: {
        flexDirection: 'row',
    },
    matchName: {
        // Theme-based styles applied inline
    },
    matchTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    teamInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
