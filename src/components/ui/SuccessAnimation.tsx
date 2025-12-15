/**
 * SuccessAnimation Component
 * 
 * Reusable success animation overlay
 */

import React, { useEffect } from 'react';
import { View, StyleSheet, Modal, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '../../theme';

interface SuccessAnimationProps {
    visible: boolean;
    message: string;
    onComplete?: () => void;
    duration?: number;
}

export const SuccessAnimation: React.FC<SuccessAnimationProps> = ({
    visible,
    message,
    onComplete,
    duration = 2000,
}) => {
    const theme = useTheme();

    useEffect(() => {
        if (visible && onComplete) {
            const timer = setTimeout(() => {
                onComplete();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [visible, onComplete, duration]);

    if (!visible) return null;

    return (
        <Modal transparent visible={visible} animationType="none">
            <View style={styles.overlay}>
                <Animatable.View
                    animation="zoomIn"
                    duration={500}
                    style={[styles.container, { backgroundColor: theme.colors.white }]}
                >
                    <Animatable.View
                        animation="bounceIn"
                        delay={200}
                        style={[styles.iconContainer, { backgroundColor: theme.colors.success }]}
                    >
                        <Animatable.Text
                            animation="pulse"
                            iterationCount="infinite"
                            style={styles.checkmark}
                        >
                            ✓
                        </Animatable.Text>
                    </Animatable.View>

                    <Animatable.Text
                        animation="fadeInUp"
                        delay={400}
                        style={[styles.message, { color: theme.colors.textDark }]}
                    >
                        {message}
                    </Animatable.Text>
                </Animatable.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        padding: 30,
        borderRadius: 20,
        alignItems: 'center',
        minWidth: 250,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkmark: {
        fontSize: 50,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    message: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
});
