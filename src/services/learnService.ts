/**
 * Learn Service
 * 
 * Placeholder API for educational content.
 */

export interface Lesson {
    id: string;
    title: string;
    category: 'Batting' | 'Bowling' | 'Fielding' | 'Strategy';
    duration: string;
    thumbnailUrl?: string; // Placeholder for now
    videoUrl?: string; // Placeholder
    description: string;
    instructions: string[];
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

/**
 * Get all lessons
 */
export const getLessons = async (): Promise<Lesson[]> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    return [
        {
            id: 'lesson_1',
            title: 'Perfect Cover Drive',
            category: 'Batting',
            duration: '5:30',
            description: 'Master the most elegant shot in cricket. Learn footwork, balance, and timing.',
            instructions: [
                'Stand with a balanced stance.',
                'Lean forward with your front foot towards the pitch of the ball.',
                'Keep your head over the ball.',
                'Swing the bat through the line of the ball.',
                'Hold the pose for balance.'
            ],
            difficulty: 'Intermediate',
        },
        {
            id: 'lesson_2',
            title: 'Basic Bowling Action',
            category: 'Bowling',
            duration: '4:15',
            description: 'Learn the fundamentals of a safe and effective bowling action.',
            instructions: [
                'Grip the ball across the seam.',
                'Run up smoothly.',
                'Gather your momentum at the crease.',
                'Rotate your arm fully.',
                'Follow through across your body.'
            ],
            difficulty: 'Beginner',
        },
        {
            id: 'lesson_3',
            title: 'High Catching Technique',
            category: 'Fielding',
            duration: '3:45',
            description: 'How to safely take high catches under pressure.',
            instructions: [
                'Keep your eyes on the ball.',
                'Position yourself underneath the ball.',
                'Cup your hands together (reverse cup).',
                'Call for the catch loud and clear.',
                'Cushion the ball as it hits your hands.'
            ],
            difficulty: 'Beginner',
        },
        {
            id: 'lesson_4',
            title: 'Setting a Field',
            category: 'Strategy',
            duration: '6:00',
            description: 'Understand field placements for different bowling styles.',
            instructions: [
                'Analyze the batsman\'s strengths.',
                'Consider the bowler\'s line and length.',
                'Protect the boundaries.',
                'Set attacking fields for new batsmen.',
            ],
            difficulty: 'Advanced',
        },
    ];
};

/**
 * Get lesson by ID
 */
export const getLessonDetails = async (lessonId: string): Promise<Lesson | null> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const lessons = await getLessons();
    return lessons.find(l => l.id === lessonId) || null;
};
