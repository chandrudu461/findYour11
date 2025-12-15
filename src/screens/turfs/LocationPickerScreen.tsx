import React, { useState } from 'react';
import { View, StyleSheet, TextInput, FlatList, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { PrimaryButton, Card, SectionHeader } from '../../components/ui';
import { ScreenContainer, Spacer } from '../../components/layout';
import { useTheme } from '../../theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TurfsStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<TurfsStackParamList, 'LocationPicker'>;

interface LocationResult {
    place_id: number;
    display_name: string;
    lat: string;
    lon: string;
    address?: {
        city?: string;
        town?: string;
        village?: string;
        state?: string;
    };
}

const LocationPickerScreen: React.FC<Props> = ({ navigation, route }) => {
    const { onSelectLocation } = route.params || {};
    const theme = useTheme();

    const [query, setQuery] = useState('');
    const [results, setResults] = useState<LocationResult[]>([]);
    const [loading, setLoading] = useState(false);

    const [selectedLocation, setSelectedLocation] = useState<any>(null);

    // Search using Nominatim (OSM)
    const searchPlaces = async (text: string) => {
        setQuery(text);
        if (text.length < 3) return;

        try {
            setLoading(true);
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(text)}&addressdetails=1&countrycodes=in&limit=5`,
                {
                    headers: {
                        'User-Agent': 'FindYour11/1.0'
                    }
                }
            );
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectPlace = (place: LocationResult) => {
        const lat = parseFloat(place.lat);
        const lon = parseFloat(place.lon);

        const city = place.address?.city || place.address?.town || place.address?.village || place.address?.state || '';

        setSelectedLocation({
            address: place.display_name,
            city: city,
            latitude: lat,
            longitude: lon,
        });

        setResults([]);
        setQuery(place.display_name.split(',').slice(0, 2).join(',')); // Shorten display
    };

    const handleConfirm = () => {
        if (selectedLocation) {
            // Navigate back with the selected location data
            navigation.navigate('CreateTurf', {
                selectedLocation: selectedLocation
            });
        }
    };

    return (
        <View style={styles.container}>
            <ScreenContainer>
                <Spacer size="md" />
                <SectionHeader title="Select Location" />
                <Text style={{ color: theme.colors.textLight, marginBottom: 20 }}>
                    Search for your turf's location
                </Text>

                {/* Search Input */}
                <View style={[styles.searchContainer, { backgroundColor: theme.colors.white }]}>
                    <TextInput
                        style={[styles.searchInput, { color: theme.colors.textDark }]}
                        placeholder="Search location (e.g. MG Road, Bangalore)"
                        placeholderTextColor={theme.colors.textLight}
                        value={query}
                        onChangeText={searchPlaces}
                    />
                    {loading && <ActivityIndicator style={styles.loader} color={theme.colors.primary} />}

                    {results.length > 0 && (
                        <View style={[styles.resultsList, { backgroundColor: theme.colors.white }]}>
                            <FlatList
                                data={results}
                                keyExtractor={(item) => item.place_id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={[styles.resultItem, { borderBottomColor: theme.colors.border }]}
                                        onPress={() => handleSelectPlace(item)}
                                    >
                                        <Text numberOfLines={2} style={{ color: theme.colors.textDark }}>
                                            {item.display_name}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    )}
                </View>

                <Spacer size="lg" />

                {/* Selected Location Display */}
                {selectedLocation && (
                    <>
                        <Card>
                            <Text style={{ color: theme.colors.textLight, fontSize: 12, marginBottom: 5 }}>
                                Selected Location:
                            </Text>
                            <Text style={{ color: theme.colors.textDark, fontWeight: '600', marginBottom: 10 }}>
                                📍 {selectedLocation.address}
                            </Text>
                            <Text style={{ color: theme.colors.textLight, fontSize: 12 }}>
                                City: {selectedLocation.city}
                            </Text>
                        </Card>
                        <Spacer size="md" />
                    </>
                )}

                {/* Confirm Button */}
                <PrimaryButton
                    title={selectedLocation ? "Confirm Location" : "Search for a location"}
                    disabled={!selectedLocation}
                    onPress={handleConfirm}
                />
            </ScreenContainer>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchContainer: {
        borderRadius: 8,
        padding: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        marginBottom: 10,
    },
    searchInput: {
        fontSize: 16,
        minHeight: 40,
    },
    loader: {
        position: 'absolute',
        right: 15,
        top: 15,
    },
    resultsList: {
        maxHeight: 300,
        marginTop: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    resultItem: {
        padding: 15,
        borderBottomWidth: 1,
    },
});

export default LocationPickerScreen;
