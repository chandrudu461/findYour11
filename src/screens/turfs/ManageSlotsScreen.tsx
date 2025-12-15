/**
 * ManageSlotsScreen Component
 * 
 * Allow turf owners to create and manage time slots for their turf.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { TurfsStackParamList } from '../../navigation/types';
import { ScreenContainer, Spacer } from '../../components/layout';
import { PrimaryButton, InputField, SectionHeader, Card } from '../../components/ui';
import { useTheme } from '../../theme';
import { createSlot, getAvailableSlots, TimeSlot } from '../../services';

type ManageSlotsScreenNavigationProp = NativeStackNavigationProp<TurfsStackParamList, 'ManageSlots'>;
type ManageSlotsScreenRouteProp = RouteProp<TurfsStackParamList, 'ManageSlots'>;

interface ManageSlotsScreenProps {
    navigation: ManageSlotsScreenNavigationProp;
    route: ManageSlotsScreenRouteProp;
}

const ManageSlotsScreen: React.FC<ManageSlotsScreenProps> = ({ navigation, route }) => {
    const theme = useTheme();
    const { turfId, turfName } = route.params;

    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [loading, setLoading] = useState(false);
    const [slots, setSlots] = useState<TimeSlot[]>([]);
    const [fetchingSlots, setFetchingSlots] = useState(false);

    useEffect(() => {
        // Set default date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const defaultDate = tomorrow.toISOString().split('T')[0];
        setDate(defaultDate);
    }, []);

    const fetchSlots = async () => {
        if (!date) return;

        setFetchingSlots(true);
        try {
            const fetchedSlots = await getAvailableSlots(turfId, date);
            setSlots(fetchedSlots);
            console.log('✅ FETCHED SLOTS:', fetchedSlots);
        } catch (error) {
            console.error('❌ FETCH SLOTS ERROR:', error);
        } finally {
            setFetchingSlots(false);
        }
    };

    useEffect(() => {
        if (date) {
            fetchSlots();
        }
    }, [date]);

    const handleCreateSlot = async () => {
        // Validation
        if (!date.trim()) {
            Alert.alert('Error', 'Please enter date (YYYY-MM-DD)');
            return;
        }
        if (!startTime.trim()) {
            Alert.alert('Error', 'Please enter start time (HH:MM:SS)');
            return;
        }
        if (!endTime.trim()) {
            Alert.alert('Error', 'Please enter end time (HH:MM:SS)');
            return;
        }

        // Basic format validation
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        const timeRegex = /^\d{2}:\d{2}:\d{2}$/;

        if (!dateRegex.test(date)) {
            Alert.alert('Error', 'Date must be in YYYY-MM-DD format');
            return;
        }
        if (!timeRegex.test(startTime)) {
            Alert.alert('Error', 'Start time must be in HH:MM:SS format');
            return;
        }
        if (!timeRegex.test(endTime)) {
            Alert.alert('Error', 'End time must be in HH:MM:SS format');
            return;
        }

        setLoading(true);
        try {
            const result = await createSlot(turfId, {
                date: date,
                start_time: startTime,
                end_time: endTime,
            });

            console.log('✅ CREATE SLOT SUCCESS:', result);

            Alert.alert('Success', 'Slot created successfully!');

            // Clear form
            setStartTime('');
            setEndTime('');

            // Refresh slots list
            await fetchSlots();
        } catch (error: any) {
            console.error('❌ CREATE SLOT ERROR:', error);
            Alert.alert('Error', error.message || 'Failed to create slot');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScreenContainer>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <SectionHeader title={`Manage Slots - ${turfName}`} />
                <Spacer size="md" />

                <Text style={[styles.label, { color: theme.colors.textDark }]}>
                    Date (YYYY-MM-DD) *
                </Text>
                <InputField
                    placeholder="e.g., 2025-12-17"
                    value={date}
                    onChangeText={setDate}
                />
                <Spacer size="sm" />

                <Text style={[styles.label, { color: theme.colors.textDark }]}>
                    Start Time (HH:MM:SS) *
                </Text>
                <InputField
                    placeholder="e.g., 09:00:00"
                    value={startTime}
                    onChangeText={setStartTime}
                />
                <Spacer size="sm" />

                <Text style={[styles.label, { color: theme.colors.textDark }]}>
                    End Time (HH:MM:SS) *
                </Text>
                <InputField
                    placeholder="e.g., 10:00:00"
                    value={endTime}
                    onChangeText={setEndTime}
                />
                <Spacer size="lg" />

                <PrimaryButton
                    title={loading ? 'Creating Slot...' : 'Add Slot'}
                    onPress={handleCreateSlot}
                    disabled={loading}
                />
                <Spacer size="xl" />

                <SectionHeader title="Created Slots" />
                <Spacer size="md" />

                {fetchingSlots ? (
                    <Text style={{ color: theme.colors.textLight, textAlign: 'center' }}>
                        Loading slots...
                    </Text>
                ) : slots.length === 0 ? (
                    <Text style={{ color: theme.colors.textLight, textAlign: 'center' }}>
                        No slots created yet
                    </Text>
                ) : (
                    slots.map((slot, index) => (
                        <View key={slot.slot_id || index} style={{ marginBottom: 12 }}>
                            <Card>
                                <View style={styles.slotRow}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ color: theme.colors.textDark, fontWeight: '600' }}>
                                            {slot.time || `${slot.start_time} - ${slot.end_time}`}
                                        </Text>
                                        <Text style={{ color: theme.colors.textLight, fontSize: 12 }}>
                                            Date: {slot.date}
                                        </Text>
                                    </View>
                                    <View
                                        style={[
                                            styles.statusBadge,
                                            {
                                                backgroundColor: slot.is_booked
                                                    ? '#FF4757'
                                                    : '#0A9E4B',
                                            },
                                        ]}
                                    >
                                        <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '600' }}>
                                            {slot.is_booked ? 'Booked' : 'Available'}
                                        </Text>
                                    </View>
                                </View>
                            </Card>
                        </View>
                    ))
                )}
                <Spacer size="md" />
            </ScrollView>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    slotRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
});

export default ManageSlotsScreen;
