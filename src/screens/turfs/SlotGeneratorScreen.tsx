/**
 * SlotGeneratorScreen - Enhanced Slot Creation UX
 * 
 * Allows turf owners to bulk-generate slots with intuitive controls:
 * - Date range picker
 * - Operating hours selection
 * - Slot duration presets
 * - Visual preview before creation
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, Platform } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { TurfsStackParamList } from '../../navigation/types';
import { ScreenContainer, Spacer } from '../../components/layout';
import { PrimaryButton, InputField, SectionHeader, Card, SuccessAnimation, SimpleDatePicker } from '../../components/ui';
import { useTheme } from '../../theme';
import { createBulkSlots, getAvailableSlots, TimeSlot } from '../../services';

type SlotGeneratorScreenNavigationProp = NativeStackNavigationProp<TurfsStackParamList, 'ManageSlots'>;
type SlotGeneratorScreenRouteProp = RouteProp<TurfsStackParamList, 'ManageSlots'>;

interface SlotGeneratorScreenProps {
    navigation: SlotGeneratorScreenNavigationProp;
    route: SlotGeneratorScreenRouteProp;
}

interface GeneratedSlot {
    id: string;
    date: string;
    start_time: string;
    end_time: string;
    selected: boolean;
    existing?: boolean; // Mark if slot already exists
}

const SlotGeneratorScreen: React.FC<SlotGeneratorScreenProps> = ({ navigation, route }) => {
    const theme = useTheme();
    const { turfId, turfName } = route.params;

    // Form state
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dayStartTime, setDayStartTime] = useState('06:00');
    const [dayEndTime, setDayEndTime] = useState('22:00');
    const [slotDuration, setSlotDuration] = useState(60); // minutes

    // Generated slots
    const [generatedSlots, setGeneratedSlots] = useState<GeneratedSlot[]>([]);
    const [existingSlots, setExistingSlots] = useState<TimeSlot[]>([]);
    const [creating, setCreating] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successCount, setSuccessCount] = useState(0);

    useEffect(() => {
        // Set default dates (tomorrow to next week)
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const weekLater = new Date(tomorrow);
        weekLater.setDate(weekLater.getDate() + 6);

        setStartDate(formatDate(tomorrow));
        setEndDate(formatDate(weekLater));
    }, []);

    // Fetch existing slots when date range changes
    useEffect(() => {
        if (startDate && endDate) {
            fetchExistingSlots(startDate, endDate);
        }
    }, [startDate, endDate]);

    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const formatTime = (date: Date): string => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const parseTime = (time: Date | string): { hours: number; minutes: number } => {
        if (typeof time === 'string') {
            // Parse HH:MM format
            const [hours, minutes] = time.split(':').map(Number);
            return { hours, minutes };
        }
        // Handle Date object
        return { hours: time.getHours(), minutes: time.getMinutes() };
    };

    const addMinutes = (time: { hours: number; minutes: number }, mins: number) => {
        let totalMinutes = time.hours * 60 + time.minutes + mins;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return { hours: hours % 24, minutes };
    };

    const timeToString = (time: { hours: number; minutes: number }): string => {
        return `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:00`;
    };

    const fetchExistingSlots = async (start: string, end: string) => {
        if (!start || !end) return;

        const existing: TimeSlot[] = [];
        const startDate = new Date(start);
        const endDate = new Date(end);
        const currentDate = new Date(startDate);

        // Fetch slots for each date
        while (currentDate <= endDate) {
            const dateStr = formatDate(currentDate);
            try {
                const response = await getAvailableSlots(turfId, dateStr);
                existing.push(...response);
            } catch (error) {
                console.error('Error fetching existing slots:', error);
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        setExistingSlots(existing);
    };

    const generateSlots = () => {
        if (!startDate || !endDate) {
            Alert.alert('Error', 'Please select start and end dates');
            return;
        }

        const slots: GeneratedSlot[] = [];
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start > end) {
            Alert.alert('Error', 'Start date must be before end date');
            return;
        }

        let currentDate = new Date(start);
        let slotId = 0;

        while (currentDate <= end) {
            const dateStr = formatDate(currentDate);
            let currentTime = parseTime(dayStartTime);
            const endTime = parseTime(dayEndTime);

            while (currentTime.hours * 60 + currentTime.minutes < endTime.hours * 60 + endTime.minutes) {
                const slotStart = currentTime;
                const slotEnd = addMinutes(currentTime, slotDuration);

                // Check if slot end doesn't exceed day end time
                if (slotEnd.hours * 60 + slotEnd.minutes <= endTime.hours * 60 + endTime.minutes) {
                    const startTimeStr = timeToString(slotStart);
                    const endTimeStr = timeToString(slotEnd);

                    // Check if this slot already exists
                    const exists = existingSlots.some(
                        s => s.date === dateStr &&
                            s.start_time === startTimeStr &&
                            s.end_time === endTimeStr
                    );

                    slots.push({
                        id: `slot-${slotId++}`,
                        date: dateStr,
                        start_time: startTimeStr,
                        end_time: endTimeStr,
                        selected: !exists, // Don't select existing slots
                        existing: exists,
                    });
                }

                currentTime = slotEnd;
            }

            currentDate.setDate(currentDate.getDate() + 1);
        }

        setGeneratedSlots(slots);
        const newCount = slots.filter(s => !s.existing).length;
        const existingCount = slots.filter(s => s.existing).length;
        Alert.alert(
            'Slots Generated',
            `${newCount} new slots, ${existingCount} already exist`
        );
    };

    const toggleSlot = (id: string) => {
        setGeneratedSlots(prev =>
            prev.map(slot =>
                slot.id === id && !slot.existing ? { ...slot, selected: !slot.selected } : slot
            )
        );
    };

    const toggleSelectAll = () => {
        const allSelected = generatedSlots.every(s => s.selected);
        setGeneratedSlots(prev =>
            prev.map(slot => ({ ...slot, selected: !allSelected }))
        );
    };

    const createAllSlots = async () => {
        const selectedSlots = generatedSlots.filter(s => s.selected && !s.existing);

        if (selectedSlots.length === 0) {
            Alert.alert('Error', 'Please select at least one new slot');
            return;
        }

        setCreating(true);

        try {
            // Use bulk creation API
            const result = await createBulkSlots(turfId, selectedSlots.map(slot => ({
                date: slot.date,
                start_time: slot.start_time,
                end_time: slot.end_time,
            })));

            setSuccessCount(result.created);

            if (result.failed > 0 && result.errors) {
                console.log('Some slots failed:', result.errors);
            }

            setShowSuccess(true);
        } catch (error: any) {
            console.error('Failed to create slots:', error);
            Alert.alert('Error', error.message || 'Failed to create slots');
        } finally {
            setCreating(false);
        }
    };

    const selectedCount = generatedSlots.filter(s => s.selected).length;

    const handleAnimationComplete = () => {
        setShowSuccess(false);
        navigation.goBack();
    };

    return (
        <ScreenContainer>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ padding: theme.spacing.md }}>
                    <SectionHeader title={`Generate Slots - ${turfName}`} />
                    <Spacer size="md" />

                    {/* Date Range */}
                    <SimpleDatePicker
                        label="Start Date"
                        value={startDate}
                        mode="date"
                        onChange={setStartDate}
                    />

                    <SimpleDatePicker
                        label="End Date"
                        value={endDate}
                        mode="date"
                        onChange={setEndDate}
                    />

                    {/* Operating Hours */}
                    <Text style={[styles.label, { color: theme.colors.textDark }]}>
                        Operating Hours
                    </Text>
                    <View style={styles.row}>
                        <View style={{ flex: 1, marginRight: 8 }}>
                            <SimpleDatePicker
                                label="From"
                                value={dayStartTime}
                                mode="time"
                                onChange={setDayStartTime}
                            />
                        </View>
                        <View style={{ flex: 1, marginLeft: 8 }}>
                            <SimpleDatePicker
                                label="To"
                                value={dayEndTime}
                                mode="time"
                                onChange={setDayEndTime}
                            />
                        </View>
                    </View>
                    <Spacer size="md" />

                    {/* Slot Duration */}
                    <Text style={[styles.label, { color: theme.colors.textDark }]}>
                        Slot Duration
                    </Text>
                    <View style={styles.durationOptions}>
                        {[30, 60, 90, 120].map(mins => (
                            <TouchableOpacity
                                key={mins}
                                onPress={() => setSlotDuration(mins)}
                                style={[
                                    styles.durationButton,
                                    {
                                        backgroundColor:
                                            slotDuration === mins ? theme.colors.primary : theme.colors.white,
                                        borderColor: theme.colors.primary,
                                    },
                                ]}
                            >
                                <Text
                                    style={{
                                        color: slotDuration === mins ? theme.colors.white : theme.colors.primary,
                                        fontWeight: '600',
                                    }}
                                >
                                    {mins} min
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Spacer size="lg" />

                    <PrimaryButton
                        title="Generate Slots"
                        onPress={generateSlots}
                    />
                    <Spacer size="xl" />

                    {/* Preview */}
                    {generatedSlots.length > 0 && (
                        <>
                            <View style={styles.previewHeader}>
                                <SectionHeader title={`Preview (${generatedSlots.length} slots)`} />
                                <TouchableOpacity onPress={toggleSelectAll}>
                                    <Text style={{ color: theme.colors.primary, fontWeight: '600' }}>
                                        {generatedSlots.every(s => s.selected) ? 'Deselect All' : 'Select All'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Spacer size="sm" />

                            <ScrollView
                                style={styles.slotsList}
                                nestedScrollEnabled={true}
                                showsVerticalScrollIndicator={true}
                            >
                                {generatedSlots.map(slot => (
                                    <TouchableOpacity
                                        key={slot.id}
                                        onPress={() => toggleSlot(slot.id)}
                                        style={{ marginBottom: 8 }}
                                    >
                                        <Card
                                            style={{
                                                backgroundColor: slot.existing
                                                    ? theme.colors.bgSoft
                                                    : slot.selected
                                                        ? theme.colors.white
                                                        : theme.colors.bgSoft,
                                                opacity: slot.existing ? 0.6 : slot.selected ? 1 : 0.5,
                                                borderWidth: slot.existing ? 1 : 0,
                                                borderColor: slot.existing ? theme.colors.textLight : 'transparent',
                                            }}
                                        >
                                            <View style={styles.slotRow}>
                                                {!slot.existing && (
                                                    <View
                                                        style={[
                                                            styles.checkbox,
                                                            {
                                                                backgroundColor: slot.selected
                                                                    ? theme.colors.primary
                                                                    : theme.colors.white,
                                                                borderColor: theme.colors.primary,
                                                            },
                                                        ]}
                                                    >
                                                        {slot.selected && (
                                                            <Text style={{ color: theme.colors.white, fontWeight: 'bold' }}>
                                                                ✓
                                                            </Text>
                                                        )}
                                                    </View>
                                                )}
                                                <View style={{ flex: 1, marginLeft: slot.existing ? 0 : 12 }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                        <Text style={{ color: theme.colors.textDark, fontWeight: '600' }}>
                                                            {slot.date}
                                                        </Text>
                                                        {slot.existing && (
                                                            <View style={{ backgroundColor: theme.colors.textLight, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 }}>
                                                                <Text style={{ color: theme.colors.white, fontSize: 10, fontWeight: '600' }}>
                                                                    EXISTING
                                                                </Text>
                                                            </View>
                                                        )}
                                                    </View>
                                                    <Text style={{ color: theme.colors.textLight, fontSize: 12 }}>
                                                        {slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}
                                                    </Text>
                                                </View>
                                            </View>
                                        </Card>
                                    </TouchableOpacity>
                                ))}
                                {/* Bottom padding to ensure last items are visible */}
                                <View style={{ height: 100 }} />
                            </ScrollView>

                            <Spacer size="md" />

                            <PrimaryButton
                                title={creating ? 'Creating...' : `Create ${selectedCount} Selected Slots`}
                                onPress={createAllSlots}
                                disabled={creating || selectedCount === 0}
                            />
                            <Spacer size="xl" />
                        </>
                    )}
                </View>
            </ScrollView>

            {/* Success Animation */}
            <SuccessAnimation
                visible={showSuccess}
                message={`${successCount} Slots Created! 🎉`}
                onComplete={handleAnimationComplete}
            />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    durationOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    durationButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 2,
    },
    previewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    slotsList: {
        maxHeight: 400,
        marginBottom: 16,
    },
    slotRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SlotGeneratorScreen;
