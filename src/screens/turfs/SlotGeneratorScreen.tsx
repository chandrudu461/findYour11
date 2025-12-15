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
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { TurfsStackParamList } from '../../navigation/types';
import { ScreenContainer, Spacer } from '../../components/layout';
import { PrimaryButton, InputField, SectionHeader, Card } from '../../components/ui';
import { useTheme } from '../../theme';
import { createSlot } from '../../services';

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
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        // Set default dates (next 7 days)
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const weekLater = new Date(tomorrow);
        weekLater.setDate(weekLater.getDate() + 6);

        setStartDate(formatDate(tomorrow));
        setEndDate(formatDate(weekLater));
    }, []);

    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const parseTime = (timeStr: string): { hours: number; minutes: number } => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return { hours, minutes };
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
                    slots.push({
                        id: `slot-${slotId++}`,
                        date: dateStr,
                        start_time: timeToString(slotStart),
                        end_time: timeToString(slotEnd),
                        selected: true,
                    });
                }

                currentTime = slotEnd;
            }

            currentDate.setDate(currentDate.getDate() + 1);
        }

        setGeneratedSlots(slots);
        Alert.alert('Success', `Generated ${slots.length} slots!`);
    };

    const toggleSlot = (id: string) => {
        setGeneratedSlots(prev =>
            prev.map(slot =>
                slot.id === id ? { ...slot, selected: !slot.selected } : slot
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
        const selectedSlots = generatedSlots.filter(s => s.selected);

        if (selectedSlots.length === 0) {
            Alert.alert('Error', 'Please select at least one slot');
            return;
        }

        setCreating(true);
        let successCount = 0;
        let errorCount = 0;

        try {
            for (const slot of selectedSlots) {
                try {
                    await createSlot(turfId, {
                        date: slot.date,
                        start_time: slot.start_time,
                        end_time: slot.end_time,
                    });
                    successCount++;
                } catch (error) {
                    console.error('Failed to create slot:', error);
                    errorCount++;
                }
            }

            Alert.alert(
                'Slots Created',
                `Successfully created ${successCount} slots${errorCount > 0 ? `. Failed: ${errorCount}` : ''}`,
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack(),
                    },
                ]
            );
        } finally {
            setCreating(false);
        }
    };

    const selectedCount = generatedSlots.filter(s => s.selected).length;

    return (
        <ScreenContainer>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ padding: theme.spacing.md }}>
                    <SectionHeader title={`Generate Slots - ${turfName}`} />
                    <Spacer size="md" />

                    {/* Date Range */}
                    <Text style={[styles.label, { color: theme.colors.textDark }]}>
                        Start Date (YYYY-MM-DD)
                    </Text>
                    <InputField
                        value={startDate}
                        onChangeText={setStartDate}
                        placeholder="2025-12-17"
                    />
                    <Spacer size="sm" />

                    <Text style={[styles.label, { color: theme.colors.textDark }]}>
                        End Date (YYYY-MM-DD)
                    </Text>
                    <InputField
                        value={endDate}
                        onChangeText={setEndDate}
                        placeholder="2025-12-24"
                    />
                    <Spacer size="md" />

                    {/* Operating Hours */}
                    <Text style={[styles.label, { color: theme.colors.textDark }]}>
                        Operating Hours
                    </Text>
                    <View style={styles.row}>
                        <View style={{ flex: 1, marginRight: 8 }}>
                            <Text style={{ color: theme.colors.textLight, fontSize: 12, marginBottom: 4 }}>
                                From (HH:MM)
                            </Text>
                            <InputField
                                value={dayStartTime}
                                onChangeText={setDayStartTime}
                                placeholder="06:00"
                            />
                        </View>
                        <View style={{ flex: 1, marginLeft: 8 }}>
                            <Text style={{ color: theme.colors.textLight, fontSize: 12, marginBottom: 4 }}>
                                To (HH:MM)
                            </Text>
                            <InputField
                                value={dayEndTime}
                                onChangeText={setDayEndTime}
                                placeholder="22:00"
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

                            <View style={styles.slotsList}>
                                {generatedSlots.map(slot => (
                                    <TouchableOpacity
                                        key={slot.id}
                                        onPress={() => toggleSlot(slot.id)}
                                        style={{ marginBottom: 8 }}
                                    >
                                        <Card
                                            style={{
                                                backgroundColor: slot.selected
                                                    ? theme.colors.white
                                                    : theme.colors.bgSoft,
                                                opacity: slot.selected ? 1 : 0.5,
                                            }}
                                        >
                                            <View style={styles.slotRow}>
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
                                                <View style={{ flex: 1, marginLeft: 12 }}>
                                                    <Text style={{ color: theme.colors.textDark, fontWeight: '600' }}>
                                                        {slot.date}
                                                    </Text>
                                                    <Text style={{ color: theme.colors.textLight, fontSize: 12 }}>
                                                        {slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}
                                                    </Text>
                                                </View>
                                            </View>
                                        </Card>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <Spacer size="lg" />

                            <PrimaryButton
                                title={creating ? 'Creating...' : `Create ${selectedCount} Selected Slots`}
                                onPress={createAllSlots}
                                disabled={creating || selectedCount === 0}
                            />
                            <Spacer size="md" />
                        </>
                    )}
                </View>
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
        maxHeight: 300,
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
