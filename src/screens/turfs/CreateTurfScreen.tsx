/**
 * CreateTurfScreen Component
 * 
 * Allow turf owners to create a new turf/ground.
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, TouchableOpacity, View, Text, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { TurfsStackParamList } from '../../navigation/types';
import { ScreenContainer, Spacer } from '../../components/layout';
import { PrimaryButton, InputField, SectionHeader, SuccessAnimation } from '../../components/ui';
import { useTheme } from '../../theme';
import { createTurf } from '../../services';
import { useAuth } from '../../context';

type CreateTurfScreenNavigationProp = NativeStackNavigationProp<TurfsStackParamList, 'CreateTurf'>;
type CreateTurfScreenRouteProp = RouteProp<TurfsStackParamList, 'CreateTurf'>;

interface CreateTurfScreenProps {
    navigation: CreateTurfScreenNavigationProp;
    route: CreateTurfScreenRouteProp;
}

const CreateTurfScreen: React.FC<CreateTurfScreenProps> = ({ navigation, route }) => {
    const theme = useTheme();
    const { user } = useAuth();

    const [turfName, setTurfName] = useState('');
    const [location, setLocation] = useState('');
    const [city, setCity] = useState('');
    const [pricePerHour, setPricePerHour] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [createdTurfId, setCreatedTurfId] = useState<string>('');

    // Handle location selection from LocationPicker
    useEffect(() => {
        if (route.params?.selectedLocation) {
            const { address, city: selectedCity } = route.params.selectedLocation;
            setLocation(address);
            setCity(selectedCity);
            // Clear the params after using them
            navigation.setParams({ selectedLocation: undefined } as any);
        }
    }, [route.params?.selectedLocation]);

    const handleCreateTurf = async () => {
        // Validation
        if (!turfName.trim()) {
            Alert.alert('Error', 'Please enter turf name');
            return;
        }
        if (!location.trim()) {
            Alert.alert('Error', 'Please enter location');
            return;
        }
        if (!city.trim()) {
            Alert.alert('Error', 'Please enter city');
            return;
        }
        if (!pricePerHour || parseFloat(pricePerHour) <= 0) {
            Alert.alert('Error', 'Please enter valid price per hour');
            return;
        }

        if (!user?.user_id) {
            Alert.alert('Error', 'User not authenticated');
            return;
        }

        setLoading(true);
        try {
            const result = await createTurf({
                owner_id: user.user_id,
                turf_name: turfName,
                location: location,
                city: city,
                price_per_hour: parseFloat(pricePerHour),
            });

            console.log('✅ CREATE TURF SUCCESS:', result);

            // Store turf ID and show animation
            setCreatedTurfId(result.turf_id.toString());
            setShowSuccess(true);
        } catch (error: any) {
            console.error('❌ CREATE TURF ERROR:', error);
            Alert.alert('Error', error.message || 'Failed to create turf');
        } finally {
            setLoading(false);
        }
    };

    const handleAnimationComplete = () => {
        setShowSuccess(false);
        navigation.navigate('ManageSlots', {
            turfId: createdTurfId,
            turfName: turfName,
        });
    };

    return (
        <ScreenContainer>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: theme.spacing.md }}>
                <SectionHeader title="Create New Turf" />
                <Text style={[styles.subtitle, { color: theme.colors.textLight }]}>
                    Fill in the details to list your cricket ground
                </Text>
                <Spacer size="lg" />

                {/* Turf Name */}
                <Text style={[styles.label, { color: theme.colors.textDark }]}>
                    Turf Name *
                </Text>
                <InputField
                    placeholder="e.g., Champions Cricket Ground"
                    value={turfName}
                    onChangeText={setTurfName}
                />
                <Spacer size="md" />

                {/* Location Selection with Map */}
                <Text style={[styles.label, { color: theme.colors.textDark }]}>
                    Location *
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('LocationPicker')}
                    style={styles.locationButton}
                >
                    <View pointerEvents="none">
                        <InputField
                            label=""
                            value={location}
                            onChangeText={() => { }} // Disabled as it's read-only
                            placeholder="Tap to select location on map 📍"
                            editable={false}
                        />
                    </View>
                </TouchableOpacity>
                <Spacer size="md" />

                {/* City */}
                <Text style={[styles.label, { color: theme.colors.textDark }]}>
                    City *
                </Text>
                <InputField
                    label=""
                    value={city}
                    onChangeText={setCity}
                    placeholder="Auto-filled from map"
                />
                <Spacer size="md" />

                {/* Price */}
                <Text style={[styles.label, { color: theme.colors.textDark }]}>
                    Price per Hour (₹) *
                </Text>
                <InputField
                    label=""
                    placeholder="e.g., 2000"
                    value={pricePerHour}
                    onChangeText={setPricePerHour}
                    keyboardType="numeric"
                />
                <Spacer size="xl" />

                <PrimaryButton
                    title={loading ? 'Creating Turf...' : 'Create Turf'}
                    onPress={handleCreateTurf}
                    disabled={loading}
                />
                <Spacer size="lg" />
            </ScrollView>

            {/* Success Animation */}
            <SuccessAnimation
                visible={showSuccess}
                message="Turf Created Successfully! 🎉"
                onComplete={handleAnimationComplete}
            />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    subtitle: {
        fontSize: 14,
        marginTop: 5,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 8,
    },
    locationButton: {
        marginBottom: 0,
    },
});

export default CreateTurfScreen;
