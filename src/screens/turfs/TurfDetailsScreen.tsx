/**
 * TurfDetailsScreen Component
 * 
 * Display turf details and book button.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TurfsStackParamList } from '../../navigation/types';
import { ScreenContainer, Spacer, HeaderBar } from '../../components/layout';
import { Card, PrimaryButton, Tag, SectionHeader } from '../../components/ui';
import { useTheme } from '../../theme';
import { getTurfDetails, Turf } from '../../services';
import { useAuth } from '../../context';

type TurfDetailsScreenNavigationProp = NativeStackNavigationProp<TurfsStackParamList, 'TurfDetails'>;
type TurfDetailsScreenRouteProp = RouteProp<TurfsStackParamList, 'TurfDetails'>;

export default function TurfDetailsScreen() {
    const navigation = useNavigation<TurfDetailsScreenNavigationProp>();
    const route = useRoute<TurfDetailsScreenRouteProp>();
    const theme = useTheme();

    const { turfId } = route.params;
    const [turf, setTurf] = useState<Turf | null>(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        fetchTurfDetails();
    }, [turfId]);

    const fetchTurfDetails = async () => {
        try {
            setLoading(true);
            const turfData = await getTurfDetails(turfId);
            setTurf(turfData);
        } catch (error) {
            console.error('Failed to fetch turf details:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading || !turf) {
        return (
            <ScreenContainer>
                <HeaderBar title="Turf Details" showBack onBackPress={() => navigation.goBack()} />
                <View style={styles.loadingContainer}>
                    <Text>Loading...</Text>
                </View>
            </ScreenContainer>
        );
    }

    return (
        <ScreenContainer>
            <HeaderBar title="Turf Details" showBack onBackPress={() => navigation.goBack()} />

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ padding: theme.spacing.md }}>
                    {/* Turf Image */}
                    <View
                        style={[
                            styles.turfImage,
                            {
                                backgroundColor: theme.colors.bgSoft,
                                borderRadius: theme.radii.md,
                                marginBottom: theme.spacing.md,
                            },
                        ]}
                    >
                        <Text style={{ fontSize: 80 }}>🏏</Text>
                    </View>

                    {/* Turf Header */}
                    <Text
                        style={[
                            styles.turfName,
                            {
                                color: theme.colors.textDark,
                                fontSize: theme.typography.h2.fontSize,
                                fontWeight: '600',
                                marginBottom: theme.spacing.xs,
                            },
                        ]}
                    >
                        {turf.name || 'Unnamed Turf'}
                    </Text>

                    <View style={styles.ratingRow}>
                        <Text style={{ color: theme.colors.textLight, fontSize: 16 }}>
                            ⭐ {turf.rating || '-'} • 📍 {turf.location || ''}, {turf.city || ''}
                        </Text>
                    </View>

                    <Spacer size="lg" />

                    {/* Details Card */}
                    <SectionHeader title="Details" />
                    <Spacer size="sm" />
                    <Card>
                        <View style={styles.detailRow}>
                            <Text style={{ color: theme.colors.textLight }}>Price</Text>
                            <Text
                                style={{
                                    color: theme.colors.primary,
                                    fontSize: 18,
                                    fontWeight: '600',
                                }}
                            >
                                ₹{turf.price || 0}/hr
                            </Text>
                        </View>
                        <Spacer size="sm" />
                        <View style={styles.detailRow}>
                            <Text style={{ color: theme.colors.textLight }}>Surface</Text>
                            <Tag label={turf.surface || 'Unknown'} variant="info" />
                        </View>
                        <Spacer size="sm" />
                        <View style={styles.detailRow}>
                            <Text style={{ color: theme.colors.textLight }}>Size</Text>
                            <Text style={{ color: theme.colors.textDark }}>{turf.size || 'N/A'}</Text>
                        </View>
                    </Card>

                    <Spacer size="md" />

                    {/* Description */}
                    <SectionHeader title="About" />
                    <Spacer size="sm" />
                    <Card>
                        <Text style={{ color: theme.colors.textDark, lineHeight: 22 }}>
                            {turf.description || 'No description available.'}
                        </Text>
                    </Card>

                    <Spacer size="md" />

                    {/* Amenities */}
                    <SectionHeader title="Amenities" />
                    <Spacer size="sm" />
                    <Card>
                        <View style={styles.amenitiesGrid}>
                            {(turf.amenities || []).map((amenity, index) => (
                                <View key={index} style={styles.amenityItem}>
                                    <Text style={{ fontSize: 20, marginBottom: 4 }}>✓</Text>
                                    <Text style={{ color: theme.colors.textDark }}>{amenity}</Text>
                                </View>
                            ))}
                        </View>
                    </Card>

                    <Spacer size="xl" />

                    {/* Conditional Button: Book for users, Manage for owners */}
                    {user && user.role === 'turf_owner' && turf.owner_id && String(turf.owner_id) === String(user.user_id) ? (
                        // Show Manage Slots button for turf owner viewing their own turf
                        <PrimaryButton
                            title="Manage Slots"
                            onPress={() => navigation.navigate('ManageSlots', {
                                turfId: turf.id!,
                                turfName: turf.name!
                            })}
                        />
                    ) : (
                        // Show Book Slot button for everyone else (including turf owners viewing other turfs)
                        <PrimaryButton
                            title="Book Slot"
                            onPress={() => navigation.navigate('TurfSlotsCalendar', {
                                turfId: turf.id!,
                                turfName: turf.name!,
                                price: turf.price || 0
                            })}
                        />
                    )}

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
    turfImage: {
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    turfName: {},
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    amenitiesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    amenityItem: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
});
