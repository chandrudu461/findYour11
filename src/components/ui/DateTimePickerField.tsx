/**
 * DateTimePickerField Component
 * 
 * Reusable date/time picker with a button trigger
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../../theme';

interface DateTimePickerFieldProps {
    label: string;
    value: Date;
    mode: 'date' | 'time';
    onChange: (date: Date) => void;
    show: boolean;
    onPress: () => void;
}

export const DateTimePickerField: React.FC<DateTimePickerFieldProps> = ({
    label,
    value,
    mode,
    onChange,
    show,
    onPress,
}) => {
    const theme = useTheme();

    const formatValue = () => {
        if (mode === 'date') {
            return value.toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            });
        } else {
            return value.toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
            });
        }
    };

    const handleChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
            onPress(); // Close picker on Android
        }
        if (selectedDate) {
            onChange(selectedDate);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color: theme.colors.textDark }]}>{label}</Text>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.colors.white, borderColor: theme.colors.border }]}
                onPress={onPress}
            >
                <Text style={[styles.buttonText, { color: theme.colors.textDark }]}>
                    {formatValue()}
                </Text>
                <Text style={{ fontSize: 18 }}>
                    {mode === 'date' ? '📅' : '🕐'}
                </Text>
            </TouchableOpacity>

            {show && (
                <DateTimePicker
                    value={value}
                    mode={mode}
                    is24Hour={true}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleChange}
                    minimumDate={mode === 'date' ? new Date() : undefined}
                />
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
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 14,
        borderRadius: 8,
        borderWidth: 1,
    },
    buttonText: {
        fontSize: 16,
    },
});
