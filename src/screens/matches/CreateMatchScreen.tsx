/**
 * CreateMatchScreen Component
 * 
 * Form screen for creating a new cricket match.
 * 
 * Features:
 * - Match details form (name, date, time, turf, type, overs, players)
 * - Validation
 * - Calls matchService.createMatch()
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MatchesStackParamList } from '../../navigation/types';
import { ScreenContainer, Spacer, HeaderBar } from '../../components/layout';
import { InputField, PrimaryButton, SecondaryButton } from '../../components/ui';
import { useTheme } from '../../theme';
import { createMatch } from '../../services';
import { useAuth } from '../../context';

type CreateMatchScreenNavigationProp = NativeStackNavigationProp<MatchesStackParamList, 'CreateMatch'>;

export default function CreateMatchScreen() {
    const navigation = useNavigation<CreateMatchScreenNavigationProp>();
    const theme = useTheme();
    const { user } = useAuth();

    // Form state
    const [matchName, setMatchName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [turfId, setTurfId] = useState('1'); // Needs to be dynamic later
    const [matchType, setMatchType] = useState<'Casual' | 'Tournament'>('Casual');
    const [overs, setOvers] = useState('20');
    const [playersPerTeam, setPlayersPerTeam] = useState('11');

    // Form errors
    const [errors, setErrors] = useState({
        matchName: '',
        date: '',
        time: '',
        overs: '',
        playersPerTeam: '',
    });

    const [loading, setLoading] = useState(false);

    /**
     * Validate form inputs
     */
    const validateForm = (): boolean => {
        const newErrors = {
            matchName: '',
            date: '',
            time: '',
            overs: '',
            playersPerTeam: '',
        };

        if (!matchName.trim()) {
            newErrors.matchName = 'Match name is required';
        }

        if (!date.trim()) {
            newErrors.date = 'Date is required';
        }

        if (!time.trim()) {
            newErrors.time = 'Time is required';
        }

        const oversNum = parseInt(overs);
        if (!overs || isNaN(oversNum) || oversNum < 1 || oversNum > 50) {
            newErrors.overs = 'Overs must be between 1 and 50';
        }

        const playersNum = parseInt(playersPerTeam);
        if (!playersPerTeam || isNaN(playersNum) || playersNum < 5 || playersNum > 11) {
            newErrors.playersPerTeam = 'Players must be between 5 and 11';
        }

        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error !== '');
    };

    /**
     * Handle form submission
     */
    const handleCreateMatch = async () => {
        if (!validateForm()) {
            return;
        }

        if (!user || (!user.user_id && !user.id)) {
            Alert.alert('Error', 'You must be logged in to create a match');
            return;
        }

        const userId = user.user_id || (user.id ? parseInt(user.id) : 0);
        if (!userId) {
            Alert.alert('Error', 'Invalid user session');
            return;
        }

        try {
            setLoading(true);

            // Call API service
            const newMatch = await createMatch({
                name: matchName,
                date,
                time,
                turfId,
                userId: userId,
                format: matchType === 'Casual' ? 'box_cricket' : 't20',
            });

            Alert.alert(
                'Success',
                'Match created successfully!',
                [
                    {
                        text: 'View Details',
                        onPress: () => navigation.replace('MatchDetails', { matchId: newMatch.id || newMatch.match_id }),
                    },
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack(),
                    },
                ]
            );
        } catch (error: any) {
            console.error(error);
            Alert.alert('Error', 'Failed to create match. ' + (error.message || ''));
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScreenContainer>
            <HeaderBar
                title="Create Match"
                showBack
                onBackPress={() => navigation.goBack()}
            />

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ padding: theme.spacing.md }}>
                    <Text
                        style={[
                            styles.description,
                            {
                                color: theme.colors.textLight,
                                fontSize: theme.typography.body.fontSize,
                                marginBottom: theme.spacing.lg,
                            },
                        ]}
                    >
                        Fill in the details below to create a new cricket match.
                    </Text>

                    {/* Match Name */}
                    <InputField
                        label="Match Name"
                        value={matchName}
                        onChangeText={setMatchName}
                        placeholder="e.g., Weekend Cricket Match"
                        error={errors.matchName}
                    />

                    <Spacer size="md" />

                    {/* Date */}
                    <InputField
                        label="Date"
                        value={date}
                        onChangeText={setDate}
                        placeholder="YYYY-MM-DD (e.g., 2025-12-10)"
                        error={errors.date}
                    />

                    <Spacer size="md" />

                    {/* Time */}
                    <InputField
                        label="Time"
                        value={time}
                        onChangeText={setTime}
                        placeholder="HH:MM:SS (e.g., 10:00:00)"
                        error={errors.time}
                    />

                    <Spacer size="md" />

                    {/* Match Type Selector */}
                    <Text
                        style={[
                            styles.label,
                            {
                                color: theme.colors.textDark,
                                fontSize: theme.typography.bodySmall.fontSize,
                                fontWeight: '600',
                                marginBottom: theme.spacing.xs,
                            },
                        ]}
                    >
                        Match Type
                    </Text>
                    <View style={styles.typeSelector}>
                        <SecondaryButton
                            title="Casual"
                            onPress={() => setMatchType('Casual')}
                            style={
                                matchType === 'Casual'
                                    ? {
                                        ...styles.typeButton,
                                        backgroundColor: theme.colors.primary + '20',
                                        borderColor: theme.colors.primary,
                                    }
                                    : styles.typeButton
                            }
                        />
                        <Spacer size="sm" horizontal />
                        <SecondaryButton
                            title="Tournament"
                            onPress={() => setMatchType('Tournament')}
                            style={
                                matchType === 'Tournament'
                                    ? {
                                        ...styles.typeButton,
                                        backgroundColor: theme.colors.primary + '20',
                                        borderColor: theme.colors.primary,
                                    }
                                    : styles.typeButton
                            }
                        />
                    </View>

                    <Spacer size="md" />

                    {/* Overs */}
                    <InputField
                        label="Number of Overs (Mock)"
                        value={overs}
                        onChangeText={setOvers}
                        placeholder="e.g., 20"
                        keyboardType="number-pad"
                        error={errors.overs}
                    />

                    <Spacer size="md" />

                    {/* Players Per Team */}
                    <InputField
                        label="Players Per Team (Mock)"
                        value={playersPerTeam}
                        onChangeText={setPlayersPerTeam}
                        placeholder="e.g., 11"
                        keyboardType="number-pad"
                        error={errors.playersPerTeam}
                    />

                    <Spacer size="xl" />

                    {/* Submit Button */}
                    <PrimaryButton
                        title="Create Match"
                        onPress={handleCreateMatch}
                        loading={loading}
                        disabled={loading}
                    />

                    <Spacer size="md" />

                    {/* Cancel Button */}
                    <SecondaryButton
                        title="Cancel"
                        onPress={() => navigation.goBack()}
                        disabled={loading}
                    />

                    <Spacer size="lg" />
                </View>
            </ScrollView>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    description: {
        // Theme-based styles applied inline
    },
    label: {
        // Theme-based styles applied inline
    },
    typeSelector: {
        flexDirection: 'row',
    },
    typeButton: {
        flex: 1,
    },
});
