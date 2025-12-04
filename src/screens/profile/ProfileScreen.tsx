/**
 * ProfileScreen Component
 * 
 * User profile overview with stats and quick links.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../navigation/types';
import { ScreenContainer, Spacer, HeaderBar } from '../../components/layout';
import { Card, SectionHeader, PrimaryButton, SecondaryButton } from '../../components/ui';
import { useTheme } from '../../theme';

type ProfileScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'ProfileMain'>;

export default function ProfileScreen() {
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const theme = useTheme();

    // Mock user data
    const user = {
        name: 'Rahul Sharma',
        role: 'Batsman',
        matches: 24,
        runs: 850,
        wickets: 12,
    };

    const menuItems = [
        { id: 'edit', title: 'Edit Profile', icon: '✏️', route: 'EditProfile' },
        { id: 'settings', title: 'Settings', icon: '⚙️', route: 'Settings' },
        { id: 'matches', title: 'My Matches', icon: '🏏', route: 'MyMatches' },
        { id: 'bookings', title: 'My Bookings', icon: '📅', route: 'MyBookings' },
    ];

    return (
        <ScreenContainer>
            <HeaderBar title="Profile" />

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ padding: theme.spacing.md }}>
                    {/* Profile Header */}
                    <View style={styles.profileHeader}>
                        <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
                            <Text style={{ fontSize: 40, color: theme.colors.white }}>RS</Text>
                        </View>
                        <Spacer size="md" />
                        <Text style={[styles.userName, { color: theme.colors.textDark }]}>
                            {user.name}
                        </Text>
                        <Text style={{ color: theme.colors.textLight }}>
                            {user.role}
                        </Text>
                    </View>

                    <Spacer size="lg" />

                    {/* Stats Cards */}
                    <View style={styles.statsRow}>
                        <Card style={styles.statsCard}>
                            <Text style={[styles.statsValue, { color: theme.colors.primary }]}>
                                {user.matches}
                            </Text>
                            <Text style={{ color: theme.colors.textLight, fontSize: 12 }}>Matches</Text>
                        </Card>
                        <Card style={styles.statsCard}>
                            <Text style={[styles.statsValue, { color: theme.colors.primary }]}>
                                {user.runs}
                            </Text>
                            <Text style={{ color: theme.colors.textLight, fontSize: 12 }}>Runs</Text>
                        </Card>
                        <Card style={styles.statsCard}>
                            <Text style={[styles.statsValue, { color: theme.colors.primary }]}>
                                {user.wickets}
                            </Text>
                            <Text style={{ color: theme.colors.textLight, fontSize: 12 }}>Wickets</Text>
                        </Card>
                    </View>

                    <Spacer size="xl" />

                    {/* Menu Items */}
                    <SectionHeader title="Menu" />
                    <Spacer size="sm" />

                    <Card style={{ padding: 0 }}>
                        {menuItems.map((item, index) => (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    styles.menuItem,
                                    index < menuItems.length - 1 && { borderBottomWidth: 1, borderBottomColor: theme.colors.border }
                                ]}
                                onPress={() => navigation.navigate(item.route as any)}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20, marginRight: 12 }}>{item.icon}</Text>
                                    <Text style={{ color: theme.colors.textDark, fontSize: 16 }}>{item.title}</Text>
                                </View>
                                <Text style={{ color: theme.colors.textLight }}>›</Text>
                            </TouchableOpacity>
                        ))}
                    </Card>

                    <Spacer size="xl" />

                    <SecondaryButton
                        title="Log Out"
                        onPress={() => {
                            // Handle logout
                            console.log('Logout pressed');
                        }}
                    />

                    <Spacer size="lg" />
                </View>
            </ScrollView>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    profileHeader: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statsCard: {
        width: '31%',
        alignItems: 'center',
        padding: 12,
    },
    statsValue: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
});
