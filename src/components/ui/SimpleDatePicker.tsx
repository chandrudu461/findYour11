/**
 * SimpleDatePicker Component
 * 
 * Cross-platform date/time picker with inline calendar view
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useTheme } from '../../theme';

interface SimpleDatePickerProps {
    label: string;
    value: string;
    mode: 'date' | 'time';
    onChange: (value: string) => void;
}

export const SimpleDatePicker: React.FC<SimpleDatePickerProps> = ({
    label,
    value,
    mode,
    onChange,
}) => {
    const theme = useTheme();
    const [showPicker, setShowPicker] = useState(false);

    const handleDateSelect = (day: any) => {
        onChange(day.dateString);
        setShowPicker(false);
    };

    const getDisplayValue = () => {
        if (!value) {
            return mode === 'date' ? 'Select Date' : 'Select Time';
        }
        if (mode === 'date') {
            try {
                const date = new Date(value);
                return date.toLocaleDateString('en-IN', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                });
            } catch {
                return value;
            }
        }
        return value;
    };

    // On web, use native HTML5 inputs
    if (Platform.OS === 'web') {
        const inputType = mode === 'date' ? 'date' : 'time';
        return (
            <View style={styles.container}>
                <Text style={[styles.label, { color: theme.colors.textDark }]}>{label}</Text>
                <input
                    type={inputType}
                    value={value}
                    onChange={(e: any) => onChange(e.target.value)}
                    style={{
                        padding: 14,
                        fontSize: 16,
                        borderRadius: 8,
                        border: `1px solid ${theme.colors.border}`,
                        backgroundColor: theme.colors.white,
                        color: theme.colors.textDark,
                        width: '100%',
                        fontFamily: 'inherit',
                    }}
                />
            </View>
        );
    }

    // For time mode on mobile, use text input
    if (mode === 'time') {
        return (
            <View style={styles.container}>
                <Text style={[styles.label, { color: theme.colors.textDark }]}>{label}</Text>
                <TextInput
                    style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.textDark, backgroundColor: theme.colors.white }]}
                    value={value}
                    onChangeText={onChange}
                    placeholder="HH:MM (e.g., 14:30)"
                    placeholderTextColor={theme.colors.placeholder}
                />
            </View>
        );
    }

    // For date mode on mobile, use inline calendar
    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color: theme.colors.textDark }]}>{label}</Text>
            <TouchableOpacity
                style={[styles.pickerButton, { backgroundColor: theme.colors.white, borderColor: theme.colors.border }]}
                onPress={() => setShowPicker(!showPicker)}
            >
                <Text style={[styles.pickerText, { color: value ? theme.colors.textDark : theme.colors.placeholder }]}>
                    {getDisplayValue()}
                </Text>
                <Text style={{ fontSize: 18 }}>
                    {showPicker ? '📅 ▲' : '📅 ▼'}
                </Text>
            </TouchableOpacity>

            {showPicker && (
                <View style={styles.calendarContainer}>
                    <Calendar
                        onDayPress={handleDateSelect}
                        markedDates={{
                            [value]: { selected: true, selectedColor: theme.colors.primary }
                        }}
                        theme={{
                            backgroundColor: '#ffffff',
                            calendarBackground: '#ffffff',
                            textSectionTitleColor: theme.colors.textLight,
                            selectedDayBackgroundColor: theme.colors.primary,
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: theme.colors.primary,
                            dayTextColor: theme.colors.textDark,
                            textDisabledColor: '#d9e1e8',
                            monthTextColor: theme.colors.textDark,
                            arrowColor: theme.colors.primary,
                        }}
                        minDate={mode === 'date' ? new Date().toISOString().split('T')[0] : undefined}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    pickerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 14,
        borderRadius: 8,
        borderWidth: 1,
    },
    pickerText: {
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 14,
        fontSize: 16,
    },
    calendarContainer: {
        marginTop: 8,
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
});
