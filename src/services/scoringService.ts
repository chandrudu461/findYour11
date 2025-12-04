/**
 * Scoring Service
 * 
 * Placeholder API for scoring operations.
 */

export interface ScoreData {
    matchId: string;
    teamName: string;
    runs: number;
    wickets: number;
    overs: number;
    createdAt: string;
}

/**
 * Submit score
 */
export const submitScore = async (scoreData: Omit<ScoreData, 'createdAt'>): Promise<ScoreData> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const result: ScoreData = {
        ...scoreData,
        createdAt: new Date().toISOString(),
    };

    console.log('[scoringService] Score submitted:', result);
    return result;
};

/**
 * Get match score
 */
export const getMatchScore = async (matchId: string): Promise<ScoreData | null> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const mockScore: ScoreData = {
        matchId,
        teamName: 'Mumbai Indians',
        runs: 185,
        wickets: 6,
        overs: 20,
        createdAt: new Date().toISOString(),
    };

    console.log('[scoringService] Fetched score:', mockScore);
    return mockScore;
};
