/**
 * SettingsScreen Component
 * 
 * App settings and preferences.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer, Spacer, HeaderBar } from '../../components/layout';
import { Card, SectionHeader } from '../../components/ui';
import { useTheme } from '../../theme';

export default function SettingsScreen() {
    const navigation = useNavigation();
    const theme = useTheme();

    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [location, setLocation] = useState(true);

    const renderSettingItem = (title: string, value: boolean, onValueChange: (val: boolean) => void) => (
        <View style={[styles.settingItem, { borderBottomColor: theme.colors.border }]}>
            <Text style={{ color: theme.colors.textDark, fontSize: 16 }}>{title}</Text>
            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor={theme.colors.white}
            />
        </View>
    );

    return (
        <ScreenContainer>
            <HeaderBar title="Settings" showBack onBackPress={() => navigation.goBack()} />

            <ScrollView style={{ flex: 1 }}>
                <View style={{ padding: theme.spacing.md }}>
                    <SectionHeader title="Preferences" />
                    <Spacer size="sm" />

                    <Card style={{ padding: 0 }}>
                        {renderSettingItem('Push Notifications', notifications, setNotifications)}
                        {renderSettingItem('Dark Mode', darkMode, setDarkMode)}
                        {renderSettingItem('Location Services', location, setLocation)}
                    </Card>

                    <Spacer size="lg" />

                    <SectionHeader title="Support" />
                    <Spacer size="sm" />

                    <Card style={{ padding: 0 }}>
                        <TouchableOpacity style={[styles.linkItem, { borderBottomColor: theme.colors.border }]}>
                            <Text style={{ color: theme.colors.textDark }}>Help Center</Text>
                            <Text style={{ color: theme.colors.textLight }}>›</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.linkItem, { borderBottomColor: theme.colors.border }]}>
                            <Text style={{ color: theme.colors.textDark }}>Privacy Policy</Text>
                            <Text style={{ color: theme.colors.textLight }}>›</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.linkItem}>
                            <Text style={{ color: theme.colors.textDark }}>Terms of Service</Text>
                            <Text style={{ color: theme.colors.textLight }}>›</Text>
                        </TouchableOpacity>
                    </Card>

                    <Spacer size="xl" />

                    <Text style={{ textAlign: 'center', color: theme.colors.textLight }}>
                        Version 1.0.0
                    </Text>
                </View>
            </ScrollView>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
    },
    linkItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
    },
});
