/**
 * LessonDetailScreen Component
 * 
 * Detailed view of a lesson with video placeholder and instructions.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LearnStackParamList } from '../../navigation/types';
import { ScreenContainer, Spacer, HeaderBar } from '../../components/layout';
import { Card, SectionHeader, Tag, PrimaryButton } from '../../components/ui';
import { useTheme } from '../../theme';
import { getLessonDetails, Lesson } from '../../services';

type LessonDetailScreenNavigationProp = NativeStackNavigationProp<LearnStackParamList, 'LessonDetail'>;
type LessonDetailScreenRouteProp = RouteProp<LearnStackParamList, 'LessonDetail'>;

export default function LessonDetailScreen() {
    const navigation = useNavigation<LessonDetailScreenNavigationProp>();
    const route = useRoute<LessonDetailScreenRouteProp>();
    const theme = useTheme();

    const { lessonId } = route.params;
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLessonDetails();
    }, [lessonId]);

    const fetchLessonDetails = async () => {
        try {
            setLoading(true);
            const data = await getLessonDetails(lessonId);
            setLesson(data);
        } catch (error) {
            console.error('Failed to fetch lesson details:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading || !lesson) {
        return (
            <ScreenContainer>
                <HeaderBar title="Lesson" showBack onBackPress={() => navigation.goBack()} />
                <View style={styles.center}>
                    <Text>Loading...</Text>
                </View>
            </ScreenContainer>
        );
    }

    return (
        <ScreenContainer>
            <HeaderBar title={lesson.category} showBack onBackPress={() => navigation.goBack()} />

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                {/* Video Placeholder */}
                <View style={[styles.videoPlaceholder, { backgroundColor: theme.colors.black }]}>
                    <Text style={{ fontSize: 60 }}>▶️</Text>
                    <Text style={{ color: theme.colors.white, marginTop: 16 }}>Video Player Placeholder</Text>
                </View>

                <View style={{ padding: theme.spacing.md }}>
                    <View style={styles.titleRow}>
                        <Tag label={lesson.difficulty} variant="warning" />
                        <Text style={{ color: theme.colors.textLight }}>⏱ {lesson.duration}</Text>
                    </View>

                    <Spacer size="sm" />

                    <Text
                        style={[
                            styles.title,
                            {
                                color: theme.colors.textDark,
                                fontSize: theme.typography.h2.fontSize,
                                fontWeight: theme.typography.h2.fontWeight
                            }
                        ]}
                    >
                        {lesson.title}
                    </Text>

                    <Spacer size="md" />

                    <Text style={{ color: theme.colors.textDark, lineHeight: 24, fontSize: 16 }}>
                        {lesson.description}
                    </Text>

                    <Spacer size="lg" />

                    <SectionHeader title="Instructions" />
                    <Spacer size="sm" />

                    <Card>
                        {lesson.instructions.map((instruction, index) => (
                            <View key={index} style={styles.instructionRow}>
                                <View style={[styles.numberBadge, { backgroundColor: theme.colors.primary }]}>
                                    <Text style={{ color: theme.colors.white, fontWeight: 'bold' }}>{index + 1}</Text>
                                </View>
                                <Text style={[styles.instructionText, { color: theme.colors.textDark }]}>
                                    {instruction}
                                </Text>
                            </View>
                        ))}
                    </Card>

                    <Spacer size="xl" />

                    <PrimaryButton
                        title="Mark as Completed"
                        onPress={() => navigation.goBack()}
                    />

                    <Spacer size="lg" />
                </View>
            </ScrollView>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    videoPlaceholder: {
        height: 240,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        marginBottom: 8,
    },
    instructionRow: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'flex-start',
    },
    numberBadge: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        marginTop: 2,
    },
    instructionText: {
        flex: 1,
        fontSize: 15,
        lineHeight: 22,
    },
});
