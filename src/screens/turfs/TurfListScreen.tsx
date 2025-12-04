/**
 * TurfListScreen Component
 * 
 * Browse available turfs with search and filters.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TurfsStackParamList } from '../../navigation/types';
import { ScreenContainer, Spacer } from '../../components/layout';
import { Card, InputField, Tag, SectionHeader } from '../../components/ui';
import { useTheme } from '../../theme';
import { getTurfs, Turf } from '../../services';

type TurfListScreenNavigationProp = NativeStackNavigationProp<TurfsStackParamList, 'TurfsList'>;

export default function TurfListScreen() {
    const navigation = useNavigation<TurfListScreenNavigationProp>();
    const theme = useTheme();

    const [turfs, setTurfs] = useState<Turf[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchTurfs();
    }, []);

    const fetchTurfs = async () => {
        try {
            setLoading(true);
            const turfsData = await getTurfs();
            setTurfs(turfsData);
        } catch (error) {
            console.error('Failed to fetch turfs:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredTurfs = turfs.filter((turf) =>
        turf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        turf.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <ScreenContainer>
            {/* Header */}
            <View
                style={[
                    styles.header,
                    {
                        backgroundColor: theme.colors.primary,
                        paddingTop: theme.spacing.lg,
                        paddingBottom: theme.spacing.md,
                        paddingHorizontal: theme.spacing.md,
                    },
                ]}
            >
                <Text
                    style={[
                        styles.headerTitle,
                        {
                            color: theme.colors.white,
                            fontSize: theme.typography.h3.fontSize,
                            fontWeight: theme.typography.h3.fontWeight,
                        },
                    ]}
                >
                    Book a Turf 🏟️
                </Text>
            </View>

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ padding: theme.spacing.md }}>
                    {/* Search */}
                    <InputField
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholder="Search by name or city..."
                    />

                    <Spacer size="lg" />

                    {/* Turfs List */}
                    <SectionHeader title={`${filteredTurfs.length} Turfs Available`} />
                    <Spacer size="sm" />

                    {loading ? (
                        <Text style={{ textAlign: 'center', color: theme.colors.textLight }}>
                            Loading turfs...
                        </Text>
                    ) : filteredTurfs.length === 0 ? (
                        <View style={styles.emptyState}>
                            <Text style={{ fontSize: 60, marginBottom: theme.spacing.md }}>🏏</Text>
                            <Text
                                style={{
                                    color: theme.colors.textDark,
                                    fontSize: theme.typography.h3.fontSize,
                                    fontWeight: '600',
                                    marginBottom: theme.spacing.sm,
                                }}
                            >
                                No Turfs Found
                            </Text>
                        </View>
                    ) : (
                        filteredTurfs.map((turf) => (
                            <TouchableOpacity
                                key={turf.id}
                                onPress={() => navigation.navigate('TurfDetails', { turfId: turf.id })}
                            >
                                <Card style={{ marginBottom: theme.spacing.md }}>
                                    {/* Turf Image Placeholder */}
                                    <View
                                        style={[
                                            styles.turfImage,
                                            {
                                                backgroundColor: theme.colors.bgSoft,
                                                borderRadius: theme.radii.sm,
                                                marginBottom: theme.spacing.sm,
                                            },
                                        ]}
                                    >
                                        <Text style={{ fontSize: 48 }}>🏏</Text>
                                    </View>

                                    <Text
                                        style={[
                                            styles.turfName,
                                            {
                                                color: theme.colors.textDark,
                                                fontSize: theme.typography.h4.fontSize,
                                                fontWeight: '600',
                                                marginBottom: theme.spacing.xs,
                                            },
                                        ]}
                                    >
                                        {turf.name}
                                    </Text>

                                    <Text
                                        style={{
                                            color: theme.colors.textLight,
                                            fontSize: theme.typography.bodySmall.fontSize,
                                            marginBottom: theme.spacing.sm,
                                        }}
                                    >
                                        📍 {turf.location}, {turf.city}
                                    </Text>

                                    <View style={styles.turfFooter}>
                                        <View>
                                            <Text
                                                style={{
                                                    color: theme.colors.primary,
                                                    fontSize: theme.typography.h4.fontSize,
                                                    fontWeight: '600',
                                                }}
                                            >
                                                ₹{turf.price}/hr
                                            </Text>
                                            <Text style={{ color: theme.colors.textLight, fontSize: 12 }}>
                                                ⭐ {turf.rating}
                                            </Text>
                                        </View>
                                        <Tag label={turf.surface} variant="info" />
                                    </View>

                                    <Spacer size="sm" />

                                    {/* Amenities */}
                                    <View style={styles.amenities}>
                                        {turf.amenities.slice(0, 3).map((amenity, index) => (
                                            <Tag
                                                key={index}
                                                label={amenity}
                                                variant="primary"
                                                style={{ marginRight: 6, marginBottom: 6 }}
                                            />
                                        ))}
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        ))
                    )}

                    <Spacer size="lg" />
                </View>
            </ScrollView>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    header: {},
    headerTitle: {},
    emptyState: {
        alignItems: 'center',
        padding: 32,
    },
    turfImage: {
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    turfName: {},
    turfFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    amenities: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});
