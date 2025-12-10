/**
 * SlotBookingScreen Component
 * 
 * Select date and time slot for booking.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TurfsStackParamList } from '../../navigation/types';
import { ScreenContainer, Spacer, HeaderBar } from '../../components/layout';
import { Card, PrimaryButton, InputField, SectionHeader } from '../../components/ui';
import { useTheme } from '../../theme';
import { getAvailableSlots, createBooking, TimeSlot } from '../../services';
import { useAuth } from '../../context';

type SlotBookingScreenNavigationProp = NativeStackNavigationProp<TurfsStackParamList, 'BookTurf'>;
type SlotBookingScreenRouteProp = RouteProp<TurfsStackParamList, 'BookTurf'>;

export default function SlotBookingScreen() {
    const navigation = useNavigation<SlotBookingScreenNavigationProp>();
    const route = useRoute<SlotBookingScreenRouteProp>();
    const theme = useTheme();
    const { user } = useAuth();

    const { turfId } = route.params;

    const [date, setDate] = useState('');
    const [slots, setSlots] = useState<TimeSlot[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
    const [loading, setLoading] = useState(false);
    const [booking, setBooking] = useState(false);

    useEffect(() => {
        if (date && date.length === 10) { // Simple validation YYYY-MM-DD
            fetchSlots();
        }
    }, [date]);

    const fetchSlots = async () => {
        try {
            setLoading(true);
            const slotsData = await getAvailableSlots(turfId, date);
            setSlots(slotsData);
        } catch (error) {
            console.error('Failed to fetch slots:', error);
            Alert.alert('Error', 'Failed to fetch slots. Please ensure format YYYY-MM-DD');
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = async () => {
        if (!date) {
            Alert.alert('Error', 'Please select a date');
            return;
        }
        if (!selectedSlot) {
            Alert.alert('Error', 'Please select a time slot');
            return;
        }

        if (!user || (!user.user_id && !user.id)) {
            Alert.alert('Error', 'You must be logged in to book a slot');
            return;
        }

        const userId = user.user_id || (user.id ? parseInt(user.id) : 0);
        if (!userId) {
            Alert.alert('Error', 'Invalid user session');
            return;
        }

        try {
            setBooking(true);
            const bookingData = await createBooking({
                turfId,
                date,
                slotId: selectedSlot.id || selectedSlot.slot_id,
                userId: userId,
                amount: selectedSlot.price || 2000,
            });

            // Navigate to confirmation
            navigation.replace('BookingConfirmation', {
                bookingId: bookingData.id || bookingData.booking_id,
                turfName: bookingData.turfName || 'Turf',
                date: bookingData.date,
                slot: selectedSlot.time || `${selectedSlot.start_time}`,
                price: bookingData.totalPrice || bookingData.total_amount,
            });
        } catch (error) {
            Alert.alert('Error', 'Failed to create booking');
        } finally {
            setBooking(false);
        }
    };

    return (
        <ScreenContainer>
            <HeaderBar title="Book Slot" showBack onBackPress={() => navigation.goBack()} />

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ padding: theme.spacing.md }}>
                    {/* Date Selection */}
                    <SectionHeader title="Select Date" />
                    <Spacer size="sm" />
                    <InputField
                        label="Date"
                        value={date}
                        onChangeText={setDate}
                        placeholder="YYYY-MM-DD (e.g., 2025-12-10)"
                    />

                    <Spacer size="lg" />

                    {/* Time Slots */}
                    {date && (
                        <>
                            <SectionHeader title="Available Time Slots" />
                            <Spacer size="sm" />

                            {loading ? (
                                <Text style={{ textAlign: 'center', color: theme.colors.textLight }}>
                                    Loading slots...
                                </Text>
                            ) : slots.length === 0 ? (
                                <Text style={{ textAlign: 'center', color: theme.colors.textLight }}>
                                    {date.length === 10 ? 'No slots available for this date' : 'Enter a valid date'}
                                </Text>
                            ) : (
                                <View style={styles.slotsGrid}>
                                    {slots.map((slot) => (
                                        <TouchableOpacity
                                            key={slot.id}
                                            onPress={() => slot.available && setSelectedSlot(slot)}
                                            disabled={!slot.available}
                                        >
                                            <Card
                                                style={{
                                                    marginBottom: theme.spacing.sm,
                                                    backgroundColor:
                                                        selectedSlot?.id === slot.id
                                                            ? theme.colors.primary + '20'
                                                            : !slot.available
                                                                ? theme.colors.bgSoft
                                                                : theme.colors.white,
                                                    borderWidth: 2,
                                                    borderColor:
                                                        selectedSlot?.id === slot.id
                                                            ? theme.colors.primary
                                                            : theme.colors.border,
                                                    opacity: !slot.available ? 0.5 : 1,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: slot.available ? theme.colors.textDark : theme.colors.textLight,
                                                        fontWeight: '600',
                                                        marginBottom: 4,
                                                    }}
                                                >
                                                    {slot.time}
                                                </Text>
                                                <Text
                                                    style={{
                                                        color: theme.colors.primary,
                                                        fontWeight: '600',
                                                        fontSize: 16,
                                                    }}
                                                >
                                                    ₹{slot.price || 2000}
                                                </Text>
                                                {!slot.available && (
                                                    <Text style={{ color: theme.colors.error, fontSize: 12, marginTop: 4 }}>
                                                        Booked
                                                    </Text>
                                                )}
                                            </Card>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </>
                    )}

                    {selectedSlot && (
                        <>
                            <Spacer size="lg" />

                            {/* Booking Summary */}
                            <SectionHeader title="Booking Summary" />
                            <Spacer size="sm" />
                            <Card>
                                <View style={styles.summaryRow}>
                                    <Text style={{ color: theme.colors.textLight }}>Date</Text>
                                    <Text style={{ color: theme.colors.textDark, fontWeight: '600' }}>{date}</Text>
                                </View>
                                <Spacer size="sm" />
                                <View style={styles.summaryRow}>
                                    <Text style={{ color: theme.colors.textLight }}>Time</Text>
                                    <Text style={{ color: theme.colors.textDark, fontWeight: '600' }}>
                                        {selectedSlot.time}
                                    </Text>
                                </View>
                                <Spacer size="sm" />
                                <View style={styles.summaryRow}>
                                    <Text style={{ color: theme.colors.textLight }}>Total Amount</Text>
                                    <Text
                                        style={{
                                            color: theme.colors.primary,
                                            fontWeight: '600',
                                            fontSize: 18,
                                        }}
                                    >
                                        ₹{selectedSlot.price || 2000}
                                    </Text>
                                </View>
                            </Card>
                        </>
                    )}

                    <Spacer size="xl" />

                    {/* Confirm Button */}
                    <PrimaryButton
                        title="Confirm Booking"
                        onPress={handleBooking}
                        loading={booking}
                        disabled={!selectedSlot || booking}
                    />

                    <Spacer size="lg" />
                </View>
            </ScrollView>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    slotsGrid: {
        // Slots displayed in a list
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    // The previous implementation used a grid but React Native View doesn't have grid props,
    // assuming valid Flexbox layout or inherited container styles
});
