/**
 * ScoreSummaryScreen
 * 
 * Display score summary in a clean card.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScoringStackParamList } from '../../navigation/types';
import { ScreenContainer, Spacer } from '../../components/layout';
import { Card, PrimaryButton, SecondaryButton, SectionHeader } from '../../components/ui';
import { useTheme } from '../../theme';

type ScoreSummaryScreenNavigationProp = NativeStackNavigationProp<ScoringStackParamList, 'ScoreHistory'>;
type ScoreSummaryScreenRouteProp = RouteProp<ScoringStackParamList, 'ScoreHistory'>;

export default function ScoreSummaryScreen() {
    const navigation = useNavigation<ScoreSummaryScreenNavigationProp>();
    const route = useRoute<ScoreSummaryScreenRouteProp>();
    const theme = useTheme();

    const { matchId, teamName, runs, wickets, overs } = route.params;

    return (
        <ScreenContainer>
            <View style={{ flex: 1, padding: theme.spacing.md }}>
                {/* Success Icon */}
                <View style={styles.successContainer}>
                    <Text style={{ fontSize: 80, marginBottom: theme.spacing.md }}>📊</Text>
                    <Text
                        style={{
                            color: theme.colors.success,
                            fontSize: theme.typography.h2.fontSize,
                            fontWeight: '600',
                            marginBottom: theme.spacing.sm,
                        }}
                    >
                        Score Submitted!
                    </Text>
                    <Text
                        style={{
                            color: theme.colors.textLight,
                            fontSize: theme.typography.body.fontSize,
                            textAlign: 'center',
                        }}
                    >
                        Score has been recorded successfully
                    </Text>
                </View>

                <Spacer size="xl" />

                {/* Score Summary */}
                <SectionHeader title="Score Summary" />
                <Spacer size="sm" />

                <Card>
                    {/* Team Name */}
                    <View style={styles.summaryRow}>
                        <Text style={{ color: theme.colors.textLight }}>Team</Text>
                        <Text
                            style={{
                                color: theme.colors.textDark,
                                fontSize: 18,
                                fontWeight: '600',
                            }}
                        >
                            {teamName}
                        </Text>
                    </View>

                    <Spacer size="md" />

                    {/* Score Display */}
                    <View style={[styles.scoreDisplay, { backgroundColor: theme.colors.primary + '10' }]}>
                        <View style={styles.scoreItem}>
                            <Text
                                style={{
                                    color: theme.colors.primary,
                                    fontSize: 36,
                                    fontWeight: '600',
                                }}
                            >
                                {runs}
                            </Text>
                            <Text style={{ color: theme.colors.textLight, marginTop: 4 }}>Runs</Text>
                        </View>

                        <Text style={{ color: theme.colors.textLight, fontSize: 24 }}>/</Text>

                        <View style={styles.scoreItem}>
                            <Text
                                style={{
                                    color: theme.colors.primary,
                                    fontSize: 36,
                                    fontWeight: '600',
                                }}
                            >
                                {wickets}
                            </Text>
                            <Text style={{ color: theme.colors.textLight, marginTop: 4 }}>Wickets</Text>
                        </View>
                    </View>

                    <Spacer size="md" />

                    {/* Overs */}
                    <View style={styles.summaryRow}>
                        <Text style={{ color: theme.colors.textLight }}>Overs</Text>
                        <Text
                            style={{
                                color: theme.colors.textDark,
                                fontSize: 18,
                                fontWeight: '600',
                            }}
                        >
                            {overs}
                        </Text>
                    </View>

                    <Spacer size="sm" />

                    {/* Run Rate */}
                    <View style={styles.summaryRow}>
                        <Text style={{ color: theme.colors.textLight }}>Run Rate</Text>
                        <Text
                            style={{
                                color: theme.colors.textDark,
                                fontSize: 18,
                                fontWeight: '600',
                            }}
                        >
                            {(runs / overs).toFixed(2)}
                        </Text>
                    </View>

                    <Spacer size="md" />

                    {/* Match ID */}
                    <View style={styles.summaryRow}>
                        <Text style={{ color: theme.colors.textLight, fontSize: 12 }}>Match ID</Text>
                        <Text
                            style={{
                                color: theme.colors.textLight,
                                fontSize: 12,
                                fontFamily: 'monospace',
                            }}
                        >
                            {matchId}
                        </Text>
                    </View>
                </Card>

                <Spacer size="xl" />

                {/* Action Buttons */}
                <PrimaryButton
                    title="Back to Home"
                    onPress={() => navigation.navigate('ScoringHome')}
                />

                <Spacer size="md" />

                <SecondaryButton
                    title="View All Scores"
                    onPress={() => navigation.navigate('ScoreHistory', route.params)}
                />

                <Spacer size="lg" />
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    successContainer: {
        alignItems: 'center',
        paddingVertical: 32,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    scoreDisplay: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        borderRadius: 12,
        gap: 16,
    },
    scoreItem: {
        alignItems: 'center',
    },
});
