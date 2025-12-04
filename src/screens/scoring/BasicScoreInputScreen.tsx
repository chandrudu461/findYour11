/**
 * BasicScoreInputScreen
 * 
 * Simple score input with runs, wickets, overs.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScoringStackParamList } from '../../navigation/types';
import { ScreenContainer, Spacer, HeaderBar } from '../../components/layout';
import { InputField, PrimaryButton, Card, SectionHeader } from '../../components/ui';
import { useTheme } from '../../theme';
import { submitScore } from '../../services';

type BasicScoreInputScreenNavigationProp = NativeStackNavigationProp<ScoringStackParamList, 'ScoringHome'>;

export default function BasicScoreInputScreen() {
    const navigation = useNavigation<BasicScoreInputScreenNavigationProp>();
    const theme = useTheme();

    const [matchId] = useState('match_123'); // Mock match ID
    const [teamName, setTeamName] = useState('');
    const [runs, setRuns] = useState('');
    const [wickets, setWickets] = useState('');
    const [overs, setOvers] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        // Validation
        if (!teamName.trim()) {
            Alert.alert('Error', 'Please enter team name');
            return;
        }
        if (!runs || !wickets || !overs) {
            Alert.alert('Error', 'Please enter all score details');
            return;
        }

        try {
            setLoading(true);
            const scoreData = await submitScore({
                matchId,
                teamName: teamName.trim(),
                runs: parseInt(runs),
                wickets: parseInt(wickets),
                overs: parseFloat(overs),
            });

            // Navigate to summary
            navigation.navigate('ScoreHistory', {
                matchId: scoreData.matchId,
                teamName: scoreData.teamName,
                runs: scoreData.runs,
                wickets: scoreData.wickets,
                overs: scoreData.overs,
            });
        } catch (error) {
            Alert.alert('Error', 'Failed to submit score');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScreenContainer>
            <HeaderBar title="Score Input" />

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ padding: theme.spacing.md }}>
                    <SectionHeader title="Enter Match Score" subtitle="Simple scoring - MVP" />

                    <Spacer size="lg" />

                    {/* Team Name */}
                    <InputField
                        label="Team Name"
                        value={teamName}
                        onChangeText={setTeamName}
                        placeholder="e.g., Mumbai Indians"
                    />

                    <Spacer size="md" />

                    {/* Runs */}
                    <InputField
                        label="Runs"
                        value={runs}
                        onChangeText={setRuns}
                        placeholder="e.g., 185"
                        keyboardType="number-pad"
                    />

                    <Spacer size="md" />

                    {/* Wickets */}
                    <InputField
                        label="Wickets"
                        value={wickets}
                        onChangeText={setWickets}
                        placeholder="e.g., 6"
                        keyboardType="number-pad"
                    />

                    <Spacer size="md" />

                    {/* Overs */}
                    <InputField
                        label="Overs"
                        value={overs}
                        onChangeText={setOvers}
                        placeholder="e.g., 20 or 19.4"
                        keyboardType="decimal-pad"
                    />

                    <Spacer size="xl" />

                    {/* Info Card */}
                    <Card style={{ backgroundColor: theme.colors.bgSoft }}>
                        <Text style={{ color: theme.colors.textLight, fontSize: 14 }}>
                            💡 This is a basic MVP score input. Ball-by-ball scoring will be added later.
                        </Text>
                    </Card>

                    <Spacer size="xl" />

                    {/* Submit Button */}
                    <PrimaryButton
                        title="Continue"
                        onPress={handleSubmit}
                        loading={loading}
                        disabled={loading}
                    />

                    <Spacer size="lg" />
                </View>
            </ScrollView>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    // Styles if needed
});
