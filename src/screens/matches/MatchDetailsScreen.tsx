/**
 * MatchDetailsScreen Component
 * 
 * Display match details and allow users to join/leave teams.
 * 
 * Features:
 * - Match header (teams, date, venue)
 * - Turf information card
 * - Team A & Team B sections with player lists
 * - Join/Leave team buttons
 * - Match status display
 * - Edit/Delete buttons (for match creator)
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MatchesStackParamList } from '../../navigation/types';
import { ScreenContainer, Spacer, HeaderBar } from '../../components/layout';
import { Card, PrimaryButton, SecondaryButton, Tag, SectionHeader } from '../../components/ui';
import { useTheme } from '../../theme';
import { getMatchDetails, joinTeam, leaveTeam, Match } from '../../services';
import { useAuth } from '../../context';

type MatchDetailsScreenNavigationProp = NativeStackNavigationProp<MatchesStackParamList, 'MatchDetails'>;
type MatchDetailsScreenRouteProp = RouteProp<MatchesStackParamList, 'MatchDetails'>;

export default function MatchDetailsScreen() {
    const navigation = useNavigation<MatchDetailsScreenNavigationProp>();
    const route = useRoute<MatchDetailsScreenRouteProp>();
    const theme = useTheme();
    const { user } = useAuth(); // Get authenticated user

    const { matchId } = route.params;

    const [match, setMatch] = useState<Match | null>(null);
    const [loading, setLoading] = useState(true);
    const [joining, setJoining] = useState(false);
    const [userTeam, setUserTeam] = useState<'A' | 'B' | null>(null);

    /**
     * Fetch match details on mount
     */
    useEffect(() => {
        fetchMatchDetails();
    }, [matchId]);

    const fetchMatchDetails = async () => {
        try {
            setLoading(true);
            const matchData = await getMatchDetails(matchId);
            setMatch(matchData);

            // Check if user is already in a team
            if (user?.full_name) {
                const inTeamA = matchData.teamA.players.includes(user.full_name);
                const inTeamB = matchData.teamB.players.includes(user.full_name);
                if (inTeamA) setUserTeam('A');
                else if (inTeamB) setUserTeam('B');
                else setUserTeam(null);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to load match details');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handle joining a team
     */
    const handleJoinTeam = async (team: 'A' | 'B') => {
        if (!match) return;
        if (!user || (!user.user_id && !user.id)) {
            Alert.alert('Error', 'You must be logged in to join a match');
            return;
        }

        const userId = user.user_id || (user.id ? parseInt(user.id) : 0);
        if (!userId) {
            Alert.alert('Error', 'Invalid user ID');
            return;
        }

        try {
            setJoining(true);
            const updatedMatch = await joinTeam(matchId, team, userId);
            setMatch(updatedMatch);
            setUserTeam(team);
            Alert.alert('Success', `You joined Team ${team}!`);
        } catch (error) {
            Alert.alert('Error', 'Failed to join team');
        } finally {
            setJoining(false);
        }
    };

    /**
     * Handle leaving a team
     */
    const handleLeaveTeam = async () => {
        if (!match || !userTeam) return;

        try {
            setJoining(true);
            const updatedMatch = await leaveTeam(matchId);
            setMatch(updatedMatch);
            setUserTeam(null);
            Alert.alert('Success', 'You left the team');
        } catch (error) {
            Alert.alert('Error', 'Failed to leave team');
        } finally {
            setJoining(false);
        }
    };

    if (loading || !match) {
        return (
            <ScreenContainer>
                <HeaderBar title="Match Details" showBack onBackPress={() => navigation.goBack()} />
                <View style={styles.loadingContainer}>
                    <Text>Loading match details...</Text>
                </View>
            </ScreenContainer>
        );
    }

    return (
        <ScreenContainer>
            <HeaderBar
                title="Match Details"
                showBack
                onBackPress={() => navigation.goBack()}
            />

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ padding: theme.spacing.md }}>
                    {/* Match Header */}
                    <Card>
                        <View style={styles.matchHeader}>
                            <Text
                                style={[
                                    styles.matchName,
                                    {
                                        color: theme.colors.textDark,
                                        fontSize: theme.typography.h3.fontSize,
                                        fontWeight: '600',
                                        marginBottom: theme.spacing.sm,
                                    },
                                ]}
                            >
                                {match.name}
                            </Text>
                            <Tag label={match.status} variant={match.status === 'Open' ? 'success' : 'info'} />
                        </View>

                        <Spacer size="sm" />

                        <Text style={{ color: theme.colors.textLight, fontSize: theme.typography.body.fontSize }}>
                            📅 {match.date} • {match.time}
                        </Text>
                        <Text style={{ color: theme.colors.textLight, fontSize: theme.typography.body.fontSize, marginTop: 4 }}>
                            🏏 {match.matchType} • {match.overs} Overs
                        </Text>
                    </Card>

                    <Spacer size="md" />

                    {/* Turf Info */}
                    <SectionHeader title="Venue Information" />
                    <Spacer size="sm" />
                    <Card>
                        <View style={styles.turfInfo}>
                            <Text style={styles.turfIcon}>🏟️</Text>
                            <View style={{ flex: 1 }}>
                                <Text
                                    style={[
                                        styles.turfName,
                                        {
                                            color: theme.colors.textDark,
                                            fontSize: theme.typography.body.fontSize,
                                            fontWeight: '600',
                                            marginBottom: 4,
                                        },
                                    ]}
                                >
                                    {match.turfName}
                                </Text>
                                <Text style={{ color: theme.colors.textLight, fontSize: theme.typography.bodySmall.fontSize }}>
                                    📍 {match.turfLocation}
                                </Text>
                            </View>
                        </View>
                    </Card>

                    <Spacer size="md" />

                    {/* Team A */}
                    <SectionHeader title="Team A" subtitle={`${match.teamA.players.length}/${match.playersPerTeam || 11} Players`} />
                    <Spacer size="sm" />
                    <Card>
                        {match.teamA.players.length > 0 ? (
                            match.teamA.players.map((player: string, index: number) => (
                                <View key={index} style={styles.playerRow}>
                                    <Text style={{ color: theme.colors.textDark }}>
                                        {index + 1}. {player}
                                    </Text>
                                    {match.teamA.captain === player && (
                                        <Tag label="Captain" variant="primary" style={{ marginLeft: 8 }} />
                                    )}
                                </View>
                            ))
                        ) : (
                            <Text style={{ color: theme.colors.textLight, textAlign: 'center' }}>No players yet</Text>
                        )}

                        <Spacer size="md" />

                        {userTeam === 'A' ? (
                            <SecondaryButton
                                title="Leave Team A"
                                onPress={handleLeaveTeam}
                                loading={joining}
                                disabled={joining}
                            />
                        ) : match.teamA.players.length < (match.playersPerTeam || 11) && !userTeam ? (
                            <PrimaryButton
                                title="Join Team A"
                                onPress={() => handleJoinTeam('A')}
                                loading={joining}
                                disabled={joining}
                            />
                        ) : null}
                    </Card>

                    <Spacer size="md" />

                    {/* Team B */}
                    <SectionHeader title="Team B" subtitle={`${match.teamB.players.length}/${match.playersPerTeam || 11} Players`} />
                    <Spacer size="sm" />
                    <Card>
                        {match.teamB.players.length > 0 ? (
                            match.teamB.players.map((player: string, index: number) => (
                                <View key={index} style={styles.playerRow}>
                                    <Text style={{ color: theme.colors.textDark }}>
                                        {index + 1}. {player}
                                    </Text>
                                    {match.teamB.captain === player && (
                                        <Tag label="Captain" variant="primary" style={{ marginLeft: 8 }} />
                                    )}
                                </View>
                            ))
                        ) : (
                            <Text style={{ color: theme.colors.textLight, textAlign: 'center' }}>No players yet</Text>
                        )}

                        <Spacer size="md" />

                        {userTeam === 'B' ? (
                            <SecondaryButton
                                title="Leave Team B"
                                onPress={handleLeaveTeam}
                                loading={joining}
                                disabled={joining}
                            />
                        ) : match.teamB.players.length < (match.playersPerTeam || 11) && !userTeam ? (
                            <PrimaryButton
                                title="Join Team B"
                                onPress={() => handleJoinTeam('B')}
                                loading={joining}
                                disabled={joining}
                            />
                        ) : null}
                    </Card>

                    <Spacer size="lg" />
                </View>
            </ScrollView>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    matchHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    matchName: {
        flex: 1,
    },
    turfInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    turfIcon: {
        fontSize: 32,
        marginRight: 12,
    },
    turfName: {
        // Theme-based styles applied inline
    },
    playerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
});
