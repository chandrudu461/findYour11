/**
 * BookingConfirmationScreen Component
 * 
 * Display booking confirmation and details.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TurfsStackParamList } from '../../navigation/types';
import { ScreenContainer, Spacer } from '../../components/layout';
import { Card, PrimaryButton, SecondaryButton, SectionHeader } from '../../components/ui';
import { useTheme } from '../../theme';

type BookingConfirmationScreenNavigationProp = NativeStackNavigationProp<
    TurfsStackParamList,
    'BookingConfirmation'
>;
type BookingConfirmationScreenRouteProp = RouteProp<TurfsStackParamList, 'BookingConfirmation'>;

export default function BookingConfirmationScreen() {
    const navigation = useNavigation<BookingConfirmationScreenNavigationProp>();
    const route = useRoute<BookingConfirmationScreenRouteProp>();
    const theme = useTheme();

    const { bookingId, turfName, date, slot, price } = route.params;

    return (
        <ScreenContainer>
            <View style={{ flex: 1, padding: theme.spacing.md }}>
                {/* Success Icon */}
                <View style={styles.successContainer}>
                    <Text style={{ fontSize: 80, marginBottom: theme.spacing.md }}>✅</Text>
                    <Text
                        style={[
                            styles.successTitle,
                            {
                                color: theme.colors.success,
                                fontSize: theme.typography.h2.fontSize,
                                fontWeight: '600',
                                marginBottom: theme.spacing.sm,
                            },
                        ]}
                    >
                        Booking Confirmed!
                    </Text>
                    <Text
                        style={{
                            color: theme.colors.textLight,
                            fontSize: theme.typography.body.fontSize,
                            textAlign: 'center',
                        }}
                    >
                        Your turf has been successfully booked
                    </Text>
                </View>

                <Spacer size="xl" />

                {/* Booking Details */}
                <SectionHeader title="Booking Details" />
                <Spacer size="sm" />
                <Card>
                    <View style={styles.detailRow}>
                        <Text style={{ color: theme.colors.textLight }}>Booking ID</Text>
                        <Text
                            style={{
                                color: theme.colors.textDark,
                                fontWeight: '600',
                                fontFamily: 'monospace',
                            }}
                        >
                            {bookingId}
                        </Text>
                    </View>

                    <Spacer size="md" />

                    <View style={styles.detailRow}>
                        <Text style={{ color: theme.colors.textLight }}>Turf</Text>
                        <Text style={{ color: theme.colors.textDark, fontWeight: '600' }}>
                            {turfName}
                        </Text>
                    </View>

                    <Spacer size="sm" />

                    <View style={styles.detailRow}>
                        <Text style={{ color: theme.colors.textLight }}>Date</Text>
                        <Text style={{ color: theme.colors.textDark, fontWeight: '600' }}>{date}</Text>
                    </View>

                    <Spacer size="sm" />

                    <View style={styles.detailRow}>
                        <Text style={{ color: theme.colors.textLight }}>Time Slot</Text>
                        <Text style={{ color: theme.colors.textDark, fontWeight: '600' }}>{slot}</Text>
                    </View>

                    <Spacer size="md" />

                    <View style={[styles.detailRow, styles.totalRow]}>
                        <Text style={{ color: theme.colors.textDark, fontWeight: '600', fontSize: 16 }}>
                            Total Amount
                        </Text>
                        <Text
                            style={{
                                color: theme.colors.success,
                                fontWeight: '600',
                                fontSize: 24,
                            }}
                        >
                            ₹{price}
                        </Text>
                    </View>
                </Card>

                <Spacer size="xl" />

                {/* Action Buttons */}
                <PrimaryButton
                    title="View My Bookings"
                    onPress={() => {
                        // Navigate to Profile > My Bookings
                        navigation.navigate('TurfsList');
                    }}
                />

                <Spacer size="md" />

                <SecondaryButton
                    title="Back to Home"
                    onPress={() => {
                        // Navigate to home
                        navigation.navigate('TurfsList');
                    }}
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
    successTitle: {
        textAlign: 'center',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalRow: {
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
});
