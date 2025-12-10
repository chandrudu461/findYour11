/**
 * Match Service
 * 
 * API functions for match-related operations using backend endpoints.
 */

import { apiRequest } from './authService';

/**
 * Match type definition
 */
export interface Match {
    match_id: string; // Backend
    id?: string; // Frontend
    title?: string; // Frontend derived
    name?: string; // Frontend derived

    turf_id?: string; // Backend
    turfId?: string; // Frontend
    turf_name?: string; // Backend
    turfName?: string; // Frontend
    location?: string; // Backend (location column from join)
    turfLocation?: string; // Frontend

    match_date: string; // Backend
    date?: string;
    match_time: string; // Backend
    time?: string;

    created_by?: number;
    format: string; // box_cricket, gully, etc.
    matchType?: 'Casual' | 'Tournament'; // Frontend

    players_joined?: number;
    playersPerTeam?: number;
    overs?: number;
    status: 'upcoming' | 'open' | 'live' | 'completed' | 'cancelled' | 'Full' | 'Open';

    team_a?: any[];
    team_b?: any[];
    teamA?: any;
    teamB?: any;
}

/**
 * Match creation data
 */
export interface CreateMatchData {
    name?: string;
    turfId: string;
    userId: number;
    date: string; // YYYY-MM-DD
    time: string; // HH:MM:SS
    format: string; // 'box_cricket' | 'gully'
}

/**
 * Match filters
 */
export interface MatchFilters {
    date?: string;
    city?: string;
    status?: string;
    matchType?: 'Casual' | 'Tournament';
}

/**
 * Create a new match
 */
export const createMatch = async (matchData: CreateMatchData): Promise<Match> => {
    const result = await apiRequest<any>(
        '/matches',
        'POST',
        {
            turf_id: parseInt(matchData.turfId),
            created_by: matchData.userId,
            match_date: matchData.date,
            match_time: matchData.time,
            format: matchData.format || 'box_cricket'
        },
        true // Auth required
    );

    // result contains match_id, status, message
    return {
        match_id: result.match_id,
        id: result.match_id,
        status: result.status,
        turf_id: matchData.turfId,
        match_date: matchData.date,
        match_time: matchData.time,
        format: matchData.format
    };
};

/**
 * Get list of matches with optional filters
 */
export const getMatches = async (filters?: MatchFilters): Promise<Match[]> => {
    let endpoint = '/matches';
    const params = new URLSearchParams();

    if (filters?.date) params.append('date', filters.date);
    if (filters?.city) params.append('city', filters.city);
    if (filters?.status) params.append('status', filters.status);

    if (params.toString()) {
        endpoint += `?${params.toString()}`;
    }

    const matches = await apiRequest<Match[]>(endpoint, 'GET');

    return matches.map(m => mapMatchToFrontend(m));
};

/**
 * Get match details by ID
 */
export const getMatchDetails = async (matchId: string): Promise<Match> => {
    const match = await apiRequest<Match>(`/matches/${matchId}`, 'GET');
    return mapMatchToFrontend(match);
};

/**
 * Helper to join a team
 */
export const joinTeam = async (matchId: string, team: 'A' | 'B', userId: number): Promise<Match> => {
    await apiRequest<any>(
        `/matches/${matchId}/join`,
        'POST',
        {
            user_id: userId,
            team: team
        },
        true
    );

    // Refresh match details
    return await getMatchDetails(matchId);
};

/**
 * Placeholder for leaving team (backend not implemented yet)
 */
export const leaveTeam = async (matchId: string): Promise<Match> => {
    return await getMatchDetails(matchId);
};

/**
 * Placeholder for update match
 */
export const updateMatch = async (matchId: string, data: any): Promise<Match> => {
    return await getMatchDetails(matchId);
};

/**
 * Placeholder for delete match
 */
export const deleteMatch = async (matchId: string): Promise<{ success: boolean }> => {
    return { success: true };
};

// Helper to map backend fields to frontend expected interfaces
function mapMatchToFrontend(m: Match): Match {
    return {
        ...m,
        id: m.match_id,
        title: `${m.format} Match @ ${m.turf_name}`,
        name: `${m.format} Match`,

        turfId: m.turf_id,
        turfName: m.turf_name,
        turfLocation: m.location || m.turfLocation, // Handle possible field names

        date: m.match_date,
        time: m.match_time,

        matchType: m.format === 'box_cricket' ? 'Casual' : 'Tournament',
        overs: m.format === 't20' ? 20 : 10,
        playersPerTeam: 11, // Estimate

        // Map players
        teamA: {
            players: m.team_a?.map((p: any) => p.user_name || 'Unknown') || []
        },
        teamB: {
            players: m.team_b?.map((p: any) => p.user_name || 'Unknown') || []
        },

        // Map status
        status: m.status === 'upcoming' ? 'Open' : (m.status === 'live' ? 'Full' : 'Open'),
    };
}
