/**
 * TurfSlotsCalendarScreen
 * 
 * Enhanced slot booking interface with calendar view.
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Alert, ActivityIndicator, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TurfsStackParamList } from '../../navigation/types';
import { ScreenContainer, Spacer } from '../../components/layout';
import { Card, SectionHeader, PrimaryButton, SuccessAnimation } from '../../components/ui';
import { useTheme } from '../../theme';
import { getAvailableSlots, TimeSlot, createBooking } from '../../services';
import { useAuth } from '../../context';

type Props = NativeStackScreenProps<TurfsStackParamList, 'TurfSlotsCalendar'>;

const TurfSlotsCalendarScreen: React.FC<Props> = ({ navigation, route }) => {
    const { turfId, turfName, price } = route.params;
    const theme = useTheme();
    const { user } = useAuth();

    // State
    const [selectedDate, setSelectedDate] = useState('');
    const [slots, setSlots] = useState<TimeSlot[]>([]);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [bookingSlot, setBookingSlot] = useState<TimeSlot | null>(null);
    const [processing, setProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Initial load: Select today
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setSelectedDate(today);
        fetchSlots(today);
    }, []);

    const fetchSlots = async (date: string) => {
        setLoadingSlots(true);
        try {
            const data = await getAvailableSlots(turfId, date);
            setSlots(data);
        } catch (error) {
            console.error('Error fetching slots:', error);
        } finally {
            setLoadingSlots(false);
        }
    };

    const handleDateSelect = (day: any) => {
        setSelectedDate(day.dateString);
        fetchSlots(day.dateString);
        setBookingSlot(null); // Reset selection
    };

    const handleBookSlot = async () => {
        if (!bookingSlot) return;

        if (!user) {
            Alert.alert('Login Required', 'Please login to book a slot');
            return;
        }

        setProcessing(true);
        try {
            // Using backend API to create booking
            const result = await createBooking({
                turfId,
                date: selectedDate,
                slotId: bookingSlot.id || bookingSlot.slot_id || '',
                userId: parseInt(user.user_id ? String(user.user_id) : '0'),
                amount: price
            });

            // Show success animation
            setShowSuccess(true);
        } catch (error: any) {
            Alert.alert('Booking Failed', error.message || 'Could not book slot');
        } finally {
            setProcessing(false);
        }
    };

    const handleAnimationComplete = () => {
        setShowSuccess(false);
        navigation.goBack();
    };

    return (
        <ScreenContainer>
            <ScrollView style={{ flex: 1 }}>
                <SectionHeader title={turfName} />
                <Text style={{ color: theme.colors.textLight, marginBottom: 10 }}>
                    Select a date to view available slots
                </Text>

                {/* Calendar */}
                <Calendar
                    onDayPress={handleDateSelect}
                    markedDates={{
                        [selectedDate]: { selected: true, selectedColor: theme.colors.primary }
                    }}
                    theme={{
                        backgroundColor: '#ffffff',
                        calendarBackground: '#ffffff',
                        textSectionTitleColor: theme.colors.textLight,
                        selectedDayBackgroundColor: theme.colors.primary,
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: theme.colors.primary,
                        dayTextColor: theme.colors.textDark,
                        textDisabledColor: '#d9e1e8',
                        monthTextColor: theme.colors.textDark,
                        arrowColor: theme.colors.primary,
                    }}
                    minDate={new Date().toISOString().split('T')[0]}
                />

                <Spacer size="lg" />

                {/* Slots Section */}
                {loadingSlots ? (
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                ) : (
                    <View>
                        <SectionHeader title={`Slots for ${selectedDate}`} />
                        <Spacer size="sm" />

                        {slots.length === 0 ? (
                            <Text style={{ color: theme.colors.textLight, textAlign: 'center', marginTop: 20 }}>
                                No slots available for this date.
                            </Text>
                        ) : (
                            <View style={styles.grid}>
                                {slots.map((slot) => {
                                    // Handle slot ID compatibility (backend has slot_id, frontend mapped usually has id)
                                    const slotId = slot.id || slot.slot_id;
                                    const bookingSlotId = bookingSlot?.id || bookingSlot?.slot_id;
                                    const isSelected = bookingSlotId === slotId;
                                    const isAvailable = slot.available !== undefined ? slot.available : !slot.is_booked;

                                    return (
                                        <TouchableOpacity
                                            key={slotId}
                                            style={[
                                                styles.slotCard,
                                                {
                                                    backgroundColor: isSelected
                                                        ? theme.colors.primary
                                                        : isAvailable
                                                            ? '#ffffff'
                                                            : theme.colors.bgSoft,
                                                    borderColor: isSelected
                                                        ? theme.colors.primary
                                                        : theme.colors.border,
                                                    minHeight: !isAvailable && slot.booking_details ? 80 : 60,
                                                }
                                            ]}
                                            onPress={() => isAvailable && setBookingSlot(slot)}
                                            disabled={!isAvailable}
                                        >
                                            <Text style={[
                                                styles.slotTime,
                                                { color: isSelected ? '#FFF' : theme.colors.textDark }
                                            ]}>
                                                {slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}
                                            </Text>
                                            {!isAvailable && (
                                                <>
                                                    <Text style={{ fontSize: 10, color: theme.colors.error, marginTop: 2 }}>BOOKED</Text>
                                                    {slot.booking_details && (
                                                        <View style={{ marginTop: 4 }}>
                                                            <Text style={{ fontSize: 9, color: theme.colors.textLight }}>
                                                                {slot.booking_details.user_name}
                                                            </Text>
                                                            {slot.booking_details.user_phone && (
                                                                <Text style={{ fontSize: 8, color: theme.colors.textLight }}>
                                                                    {slot.booking_details.user_phone}
                                                                </Text>
                                                            )}
                                                        </View>
                                                    )}
                                                </>
                                            )}
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        )}
                    </View>
                )}

                <Spacer size="xl" />
            </ScrollView>

            {/* Bottom Booking Button */}
            {
                bookingSlot && (
                    <View style={[styles.footer, { backgroundColor: '#ffffff' }]}>
                        <View>
                            <Text style={{ color: theme.colors.textLight }}>Total Amount</Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.colors.textDark }}>
                                ₹{price}
                            </Text>
                        </View>
                        <View style={{ width: 150 }}>
                            <PrimaryButton
                                title={processing ? "Booking..." : "Book Now"}
                                onPress={handleBookSlot}
                                disabled={processing}
                            />
                        </View>
                    </View>
                )
            }

            {/* Success Animation */}
            <SuccessAnimation
                visible={showSuccess}
                message="Slot Booked Successfully! 🎉"
                onComplete={handleAnimationComplete}
            />
        </ScreenContainer >
    );
};

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    slotCard: {
        width: '30%',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    slotTime: {
        fontWeight: '600',
        fontSize: 12,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 10,
    }
});

export default TurfSlotsCalendarScreen;
