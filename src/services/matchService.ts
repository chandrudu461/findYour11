/**
 * Match Service
 * 
 * Placeholder API functions for match-related operations.
 * In a real app, these would call backend APIs.
 * 
 * All functions simulate network delay and return mock data.
 */

/**
 * Match type definition
 */
export interface Match {
    id: string;
    title: string; // Added title property
    name?: string; // Optional for backward compatibility
    date: string;
    time: string;
    turfId?: string;
    turfName?: string;
    turfLocation?: string;
    location?: string;
    matchType?: 'Casual' | 'Tournament';
    price?: number;
    overs: number;
    playersPerTeam: number;
    spots?: number;
    spotsFilled?: number;
    organizer?: string;
    teamA?: {
        players: string[];
        captain?: string;
    };
    teamB?: {
        players: string[];
        captain?: string;
    };
    status: 'Open' | 'Full' | 'Completed' | 'Cancelled';
    createdBy?: string;
}

/**
 * Match creation data
 */
export interface CreateMatchData {
    name: string;
    date: string;
    time: string;
    turfId: string;
    matchType: 'Casual' | 'Tournament';
    overs: number;
    playersPerTeam: number;
}

/**
 * Match filters
 */
export interface MatchFilters {
    date?: string;
    matchType?: 'Casual' | 'Tournament';
    location?: string;
    status?: string;
}

/**
 * Create a new match
 * @param matchData - Match creation data
 * @returns Promise with created match
 */
export const createMatch = async (matchData: CreateMatchData): Promise<Match> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock API response
    const newMatch: Match = {
        id: `match_${Date.now()}`,
        title: matchData.name,
        name: matchData.name,
        date: matchData.date,
        time: matchData.time,
        turfId: matchData.turfId,
        turfName: 'Green Valley Cricket Ground', // Mock turf name
        turfLocation: 'Bangalore, Karnataka',
        matchType: matchData.matchType,
        overs: matchData.overs,
        playersPerTeam: matchData.playersPerTeam,
        teamA: { players: [] },
        teamB: { players: [] },
        status: 'Open',
        createdBy: 'current_user', // Mock current user
    };

    console.log('[matchService] Match created:', newMatch);
    return newMatch;
};

/**
 * Get list of matches with optional filters
 * @param filters - Optional filters
 * @returns Promise with array of matches
 */
export const getMatches = async (filters?: MatchFilters): Promise<Match[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock matches data
    const mockMatches: Match[] = [
        {
            id: '1',
            title: 'Weekend Cricket Match',
            name: 'Weekend Cricket Match',
            date: '2025-12-10',
            time: '10:00 AM',
            turfId: 'turf_1',
            turfName: 'Green Valley Cricket Ground',
            turfLocation: 'Bangalore, Karnataka',
            matchType: 'Casual',
            overs: 20,
            playersPerTeam: 11,
            teamA: { players: ['Player 1', 'Player 2'], captain: 'Player 1' },
            teamB: { players: ['Player 3'], captain: 'Player 3' },
            status: 'Open',
            createdBy: 'user_1',
        },
        {
            id: '2',
            title: 'Friday Evening Match',
            name: 'Friday Evening Match',
            date: '2025-12-08',
            time: '6:00 PM',
            turfId: 'turf_2',
            turfName: 'Champions Cricket Arena',
            turfLocation: 'Mumbai, Maharashtra',
            matchType: 'Tournament',
            overs: 50,
            playersPerTeam: 11,
            teamA: { players: Array(11).fill('Player') },
            teamB: { players: Array(11).fill('Player') },
            status: 'Full',
            createdBy: 'user_2',
        },
    ];

    console.log('[matchService] Fetched matches with filters:', filters);
    return mockMatches;
};

/**
 * Get match details by ID
 * @param matchId - Match ID
 * @returns Promise with match details
 */
export const getMatchDetails = async (matchId: string): Promise<Match> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock match details
    const mockMatch: Match = {
        id: matchId,
        title: 'Weekend Cricket Match',
        name: 'Weekend Cricket Match',
        date: '2025-12-10',
        time: '10:00 AM',
        turfId: 'turf_1',
        turfName: 'Green Valley Cricket Ground',
        turfLocation: 'Bangalore, Karnataka',
        matchType: 'Casual',
        overs: 20,
        playersPerTeam: 11,
        teamA: {
            players: ['Virat Kohli', 'Rohit Sharma', 'KL Rahul'],
            captain: 'Virat Kohli',
        },
        teamB: {
            players: ['MS Dhoni', 'Hardik Pandya'],
            captain: 'MS Dhoni',
        },
        status: 'Open',
        createdBy: 'user_1',
    };

    console.log('[matchService] Fetched match details:', matchId);
    return mockMatch;
};

/**
 * Join a team in a match
 * @param matchId - Match ID
 * @param team - Team to join ('A' or 'B')
 * @returns Promise with updated match
 */
export const joinTeam = async (matchId: string, team: 'A' | 'B'): Promise<Match> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(`[matchService] Joined Team ${team} in match:`, matchId);

    // Return  mock updated match
    return await getMatchDetails(matchId);
};

/**
 * Leave a team in a match
 * @param matchId - Match ID
 * @returns Promise with updated match
 */
export const leaveTeam = async (matchId: string): Promise<Match> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log('[matchService] Left team in match:', matchId);

    // Return mock updated match
    return await getMatchDetails(matchId);
};

/**
 * Update match details
 * @param matchId - Match ID
 * @param data - Updated match data
 * @returns Promise with updated match
 */
export const updateMatch = async (
    matchId: string,
    data: Partial<CreateMatchData>
): Promise<Match> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    console.log('[matchService] Updated match:', matchId, data);

    // Return mock updated match
    return await getMatchDetails(matchId);
};

/**
 * Delete a match
 * @param matchId - Match ID
 * @returns Promise with success status
 */
export const deleteMatch = async (matchId: string): Promise<{ success: boolean }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log('[matchService] Deleted match:', matchId);

    return { success: true };
};
