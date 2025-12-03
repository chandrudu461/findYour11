import React from 'react';
import { View, Text, StyleSheet, Platform, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.title}>Welcome to FindYour11</Text>
                <Text style={styles.subtitle}>Your Ultimate Cricket Companion</Text>
            </View>

            {/* Platform Info Card */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>Platform Information</Text>
                </View>
                <View style={styles.cardContent}>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Running on:</Text>
                        <Text style={styles.value}>{Platform.OS}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Platform Version:</Text>
                        <Text style={styles.value}>
                            {Platform.Version?.toString() || 'N/A'}
                        </Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Screen Width:</Text>
                        <Text style={styles.value}>{Math.round(width)}px</Text>
                    </View>
                </View>
            </View>

            {/* Feature Cards */}
            <View style={styles.featuresContainer}>
                <View style={[styles.featureCard, styles.featureCard1]}>
                    <Text style={styles.featureIcon}>🏏</Text>
                    <Text style={styles.featureTitle}>Build Your Team</Text>
                    <Text style={styles.featureText}>Create your dream cricket team</Text>
                </View>

                <View style={[styles.featureCard, styles.featureCard2]}>
                    <Text style={styles.featureIcon}>📊</Text>
                    <Text style={styles.featureTitle}>Track Stats</Text>
                    <Text style={styles.featureText}>Monitor player performance</Text>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Cross-platform • React Native • Expo
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingHorizontal: 24,
        paddingBottom: 32,
        backgroundColor: '#1e293b',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#94a3b8',
        fontWeight: '500',
    },
    card: {
        marginHorizontal: 24,
        marginTop: 24,
        backgroundColor: '#1e293b',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    cardHeader: {
        backgroundColor: '#334155',
        paddingVertical: 16,
        paddingHorizontal: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#ffffff',
    },
    cardContent: {
        padding: 20,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#334155',
    },
    label: {
        fontSize: 15,
        color: '#94a3b8',
        fontWeight: '500',
    },
    value: {
        fontSize: 15,
        color: '#60a5fa',
        fontWeight: '600',
    },
    featuresContainer: {
        flexDirection: 'row',
        marginHorizontal: 24,
        marginTop: 24,
        gap: 16,
    },
    featureCard: {
        flex: 1,
        backgroundColor: '#1e293b',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    featureCard1: {
        borderLeftWidth: 4,
        borderLeftColor: '#3b82f6',
    },
    featureCard2: {
        borderLeftWidth: 4,
        borderLeftColor: '#8b5cf6',
    },
    featureIcon: {
        fontSize: 40,
        marginBottom: 12,
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: 6,
        textAlign: 'center',
    },
    featureText: {
        fontSize: 13,
        color: '#94a3b8',
        textAlign: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 20,
        alignItems: 'center',
        backgroundColor: '#1e293b',
    },
    footerText: {
        fontSize: 12,
        color: '#64748b',
        fontWeight: '500',
    },
});
