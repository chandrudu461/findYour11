/**
 * EditProfileScreen Component
 * 
 * Form to edit user profile details.
 */

import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer, Spacer, HeaderBar } from '../../components/layout';
import { InputField, PrimaryButton } from '../../components/ui';
import { useTheme } from '../../theme';

export default function EditProfileScreen() {
    const navigation = useNavigation();
    const theme = useTheme();

    const [name, setName] = useState('Rahul Sharma');
    const [email, setEmail] = useState('rahul.sharma@example.com');
    const [phone, setPhone] = useState('+91 98765 43210');
    const [role, setRole] = useState('Batsman');
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            Alert.alert('Success', 'Profile updated successfully', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        }, 1000);
    };

    return (
        <ScreenContainer>
            <HeaderBar title="Edit Profile" showBack onBackPress={() => navigation.goBack()} />

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ padding: theme.spacing.md }}>
                    <InputField
                        label="Full Name"
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter your name"
                    />

                    <Spacer size="md" />

                    <InputField
                        label="Email Address"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter your email"
                        keyboardType="email-address"
                    />

                    <Spacer size="md" />

                    <InputField
                        label="Phone Number"
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="Enter your phone number"
                        keyboardType="phone-pad"
                    />

                    <Spacer size="md" />

                    <InputField
                        label="Player Role"
                        value={role}
                        onChangeText={setRole}
                        placeholder="e.g. Batsman, Bowler, All-rounder"
                    />

                    <Spacer size="xl" />

                    <PrimaryButton
                        title="Save Changes"
                        onPress={handleSave}
                        loading={loading}
                        disabled={loading}
                    />
                </View>
            </ScrollView>
        </ScreenContainer>
    );
}
