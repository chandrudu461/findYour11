/**
 * MyTurfsScreen - Turf Owner Dashboard
 * 
 * Shows all turfs owned by the logged-in turf owner
 * Allows navigation to slot management for each turf
 */

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TurfsStackParamList } from '../../navigation/types';
import { ScreenContainer, Spacer } from '../../components/layout';
import { Card, PrimaryButton, SectionHeader } from '../../components/ui';
import { useTheme } from '../../theme';
import { getTurfs, Turf } from '../../services';

type MyTurfsScreenNavigationProp = NativeStackNavigationProp<TurfsStackParamList, 'MyTurfs'>;

const MyTurfsScreen: React.FC = () => {
    const navigation = useNavigation<MyTurfsScreenNavigationProp>();
    const theme = useTheme();

    const [turfs, setTurfs] = useState<Turf[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchMyTurfs = async () => {
        try {
            setLoading(true);
            // TODO: Replace with getMyTurfs once service is added
            const data = await getTurfs();
            console.log('✅ MY TURFS FETCHED:', data);
            setTurfs(data);
        } catch (error: any) {
            console.error('❌ FETCH MY TURFS ERROR:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // Fetch turfs when screen gains focus (to refresh after creating new turf)
    useFocusEffect(
        useCallback(() => {
            fetchMyTurfs();
        }, [])
    );

    const onRefresh = () => {
        setRefreshing(true);
        fetchMyTurfs();
    };

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
                    My Turfs 🏟️
                </Text>
            </View>

            <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={{ padding: theme.spacing.md }}>
                    {/* Create New Turf Button */}
                    <PrimaryButton
                        title="+ Create New Turf"
                        onPress={() => navigation.navigate('CreateTurf')}
                    />
                    <Spacer size="lg" />

                    {/* My Turfs List */}
                    <SectionHeader title={`${turfs.length} Turfs`} />
                    <Spacer size="sm" />

                    {loading && turfs.length === 0 ? (
                        <Text style={{ textAlign: 'center', color: theme.colors.textLight }}>
                            Loading your turfs...
                        </Text>
                    ) : turfs.length === 0 ? (
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
                                No Turfs Yet
                            </Text>
                            <Text
                                style={{
                                    color: theme.colors.textLight,
                                    textAlign: 'center',
                                }}
                            >
                                Create your first turf to start managing slots
                            </Text>
                        </View>
                    ) : (
                        turfs.map((turf) => (
                            <TouchableOpacity
                                key={turf.id}
                                onPress={() =>
                                    navigation.navigate('ManageSlots', {
                                        turfId: turf.id || '0',
                                        turfName: turf.name || 'Turf',
                                    })
                                }
                            >
                                <Card style={{ marginBottom: theme.spacing.md }}>
                                    {/* Turf Icon */}
                                    <View
                                        style={[
                                            styles.turfIcon,
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
                                        <Text
                                            style={{
                                                color: theme.colors.primary,
                                                fontSize: theme.typography.h4.fontSize,
                                                fontWeight: '600',
                                            }}
                                        >
                                            ₹{turf.price}/hr
                                        </Text>
                                        <View
                                            style={[
                                                styles.manageButton,
                                                {
                                                    backgroundColor: theme.colors.primary + '20',
                                                    paddingVertical: 8,
                                                    paddingHorizontal: 16,
                                                    borderRadius: theme.radii.sm,
                                                },
                                            ]}
                                        >
                                            <Text
                                                style={{
                                                    color: theme.colors.primary,
                                                    fontWeight: '600',
                                                }}
                                            >
                                                Manage Slots →
                                            </Text>
                                        </View>
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
};

const styles = StyleSheet.create({
    header: {},
    headerTitle: {},
    emptyState: {
        alignItems: 'center',
        padding: 32,
    },
    turfIcon: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    turfName: {},
    turfFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    manageButton: {},
});

export default MyTurfsScreen;
