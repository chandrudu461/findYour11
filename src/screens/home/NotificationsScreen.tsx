/**
 * NotificationsScreen Component
 * 
 * Displays list of user notifications.
 * Shows empty state when no notifications exist.
 * 
 * All data is static placeholder for now (no backend).
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ScreenContainer, Spacer, HeaderBar } from '../../components/layout';
import { Card, SectionHeader } from '../../components/ui';
import { useTheme } from '../../theme';
import { useNavigation } from '@react-navigation/native';

/**
 * Static placeholder data for notifications
 */
const NOTIFICATIONS = [
    {
        id: '1',
        title: 'Booking Confirmed',
        message: 'Your turf booking at Green Valley Cricket Ground is confirmed for Dec 5, 2025.',
        time: '2 hours ago',
        read: false,
        type: 'success',
    },
    {
        id: '2',
        title: 'Match Starting Soon',
        message: 'Your match between Mumbai Indians vs Chennai Super Kings starts in 1 hour.',
        time: '5 hours ago',
        read: false,
        type: 'info',
    },
    {
        id: '3',
        title: 'New Match Invitation',
        message: 'You have been invited to join a match by Rahul Sharma.',
        time: '1 day ago',
        read: true,
        type: 'primary',
    },
    {
        id: '4',
        title: 'Payment Successful',
        message: 'Payment of ₹2,500 for turf booking completed successfully.',
        time: '2 days ago',
        read: true,
        type: 'success',
    },
    {
        id: '5',
        title: 'Score Updated',
        message: 'Final score for your last match has been updated. Check your stats!',
        time: '3 days ago',
        read: true,
        type: 'info',
    },
];

export default function NotificationsScreen() {
    const theme = useTheme();
    const navigation = useNavigation();

    /**
     * Get notification icon based on type
     */
    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'success':
                return '✅';
            case 'info':
                return 'ℹ️';
            case 'warning':
                return '⚠️';
            case 'error':
                return '❌';
            default:
                return '🔔';
        }
    };

    /**
     * Render empty state when no notifications
     */
    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <Text style={{ fontSize: 60, marginBottom: theme.spacing.md }}>🔔</Text>
            <Text
                style={[
                    styles.emptyTitle,
                    {
                        color: theme.colors.textDark,
                        fontSize: theme.typography.h3.fontSize,
                        fontWeight: '600',
                        marginBottom: theme.spacing.sm,
                    },
                ]}
            >
                No Notifications
            </Text>
            <Text
                style={[
                    styles.emptyMessage,
                    {
                        color: theme.colors.textLight,
                        fontSize: theme.typography.body.fontSize,
                        textAlign: 'center',
                    },
                ]}
            >
                You're all caught up! We'll notify you when something important happens.
            </Text>
        </View>
    );

    return (
        <ScreenContainer>
            <HeaderBar
                title="Notifications"
                showBack
                onBackPress={() => navigation.goBack()}
            />

            {NOTIFICATIONS.length === 0 ? (
                renderEmptyState()
            ) : (
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <View style={{ padding: theme.spacing.md }}>
                        <SectionHeader
                            title={`${NOTIFICATIONS.filter((n) => !n.read).length} Unread`}
                            subtitle="Stay updated with your activity"
                        />

                        <Spacer size="md" />

                        {NOTIFICATIONS.map((notification) => (
                            <Card
                                key={notification.id}
                                style={{
                                    marginBottom: theme.spacing.md,
                                    borderLeftWidth: 3,
                                    borderLeftColor: notification.read
                                        ? theme.colors.border
                                        : theme.colors.primary,
                                }}
                            >
                                <View style={styles.notificationHeader}>
                                    <Text style={{ fontSize: 24, marginRight: theme.spacing.sm }}>
                                        {getNotificationIcon(notification.type)}
                                    </Text>
                                    <View style={{ flex: 1 }}>
                                        <Text
                                            style={[
                                                styles.notificationTitle,
                                                {
                                                    color: theme.colors.textDark,
                                                    fontSize: theme.typography.body.fontSize,
                                                    fontWeight: '600',
                                                    marginBottom: theme.spacing.xs,
                                                },
                                            ]}
                                        >
                                            {notification.title}
                                        </Text>
                                    </View>
                                    {!notification.read && (
                                        <View
                                            style={[
                                                styles.unreadDot,
                                                {
                                                    backgroundColor: theme.colors.primary,
                                                    borderRadius: theme.radii.round,
                                                },
                                            ]}
                                        />
                                    )}
                                </View>

                                <Text
                                    style={[
                                        styles.notificationMessage,
                                        {
                                            color: theme.colors.textLight,
                                            fontSize: theme.typography.bodySmall.fontSize,
                                            marginTop: theme.spacing.sm,
                                            marginBottom: theme.spacing.xs,
                                        },
                                    ]}
                                >
                                    {notification.message}
                                </Text>

                                <Text
                                    style={[
                                        styles.notificationTime,
                                        {
                                            color: theme.colors.placeholder,
                                            fontSize: theme.typography.caption.fontSize,
                                            marginTop: theme.spacing.xs,
                                        },
                                    ]}
                                >
                                    {notification.time}
                                </Text>
                            </Card>
                        ))}

                        <Spacer size="lg" />
                    </View>
                </ScrollView>
            )}
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
    },
    emptyTitle: {
        textAlign: 'center',
    },
    emptyMessage: {
        // Theme-based styles applied inline
    },
    notificationHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    notificationTitle: {
        // Theme-based styles applied inline
    },
    notificationMessage: {
        // Theme-based styles applied inline
    },
    notificationTime: {
        // Theme-based styles applied inline
    },
    unreadDot: {
        width: 8,
        height: 8,
        marginTop: 6,
    },
});
