/**
 * LearnHomeScreen Component
 * 
 * Grid of cricket lessons.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LearnStackParamList } from '../../navigation/types';
import { ScreenContainer, Spacer } from '../../components/layout';
import { Card, SectionHeader, Tag, InputField } from '../../components/ui';
import { useTheme } from '../../theme';
import { getLessons, Lesson } from '../../services';

type LearnHomeScreenNavigationProp = NativeStackNavigationProp<LearnStackParamList, 'LearnHome'>;

export default function LearnHomeScreen() {
    const navigation = useNavigation<LearnHomeScreenNavigationProp>();
    const theme = useTheme();

    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchLessons();
    }, []);

    const fetchLessons = async () => {
        try {
            setLoading(true);
            const data = await getLessons();
            setLessons(data);
        } catch (error) {
            console.error('Failed to fetch lessons:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredLessons = lessons.filter(lesson =>
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderLessonItem = ({ item }: { item: Lesson }) => (
        <TouchableOpacity
            style={styles.gridItem}
            onPress={() => navigation.navigate('LessonDetail', { lessonId: item.id })}
        >
            <Card style={styles.card}>
                {/* Video Thumbnail Placeholder */}
                <View style={[styles.thumbnail, { backgroundColor: theme.colors.bgSoft }]}>
                    <Text style={{ fontSize: 32 }}>▶️</Text>
                </View>

                <Spacer size="sm" />

                <View style={styles.cardContent}>
                    <Tag label={item.category} variant="info" style={{ alignSelf: 'flex-start', marginBottom: 4 }} />

                    <Text
                        style={[
                            styles.lessonTitle,
                            {
                                color: theme.colors.textDark,
                                fontSize: theme.typography.h4.fontSize,
                                fontWeight: '600'
                            }
                        ]}
                        numberOfLines={2}
                    >
                        {item.title}
                    </Text>

                    <Spacer size="xs" />

                    <Text style={{ color: theme.colors.textLight, fontSize: 12 }}>
                        ⏱ {item.duration} • {item.difficulty}
                    </Text>
                </View>
            </Card>
        </TouchableOpacity>
    );

    return (
        <ScreenContainer>
            <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
                <Text style={[styles.headerTitle, { color: theme.colors.white }]}>
                    Cricket Academy 🎓
                </Text>
                <Text style={{ color: theme.colors.white, opacity: 0.9 }}>
                    Master your game with pro tutorials
                </Text>
            </View>

            <View style={{ padding: theme.spacing.md, flex: 1 }}>
                <InputField
                    placeholder="Search lessons..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />

                <Spacer size="md" />

                <SectionHeader title="All Lessons" />
                <Spacer size="sm" />

                {loading ? (
                    <Text style={{ textAlign: 'center', marginTop: 20, color: theme.colors.textLight }}>
                        Loading lessons...
                    </Text>
                ) : (
                    <FlatList
                        data={filteredLessons}
                        renderItem={renderLessonItem}
                        keyExtractor={item => item.id}
                        numColumns={2}
                        columnWrapperStyle={styles.row}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: theme.spacing.xl }}
                        ListEmptyComponent={
                            <Text style={{ textAlign: 'center', marginTop: 20, color: theme.colors.textLight }}>
                                No lessons found.
                            </Text>
                        }
                    />
                )}
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    header: {
        padding: 24,
        paddingTop: 40,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    row: {
        justifyContent: 'space-between',
    },
    gridItem: {
        width: '48%',
        marginBottom: 16,
    },
    card: {
        padding: 12,
        height: '100%',
    },
    thumbnail: {
        height: 100,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContent: {
        flex: 1,
    },
    lessonTitle: {
        marginBottom: 4,
    },
});
