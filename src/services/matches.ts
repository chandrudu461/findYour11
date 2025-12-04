/**
 * Matches Service
 * 
 * Handles match creation, joining, and listing.
 */

import { callLambda } from './awsLambdaClient';
import { Match } from './matchService'; // Reusing types

/**
 * Create a new match
 */
export const createMatch = async (matchData: any): Promise<Match> => {
    // Mock API call
    await callLambda('/matches', 'POST', matchData);

    return {
        id: `match_${Date.now()}`,
        title: matchData.title || 'Friendly Match',
        date: matchData.date || '2025-12-10',
        time: matchData.time || '07:00 AM',
        location: matchData.location || 'Green Valley Ground',
        price: matchData.price || 500,
        spots: matchData.spots || 22,
        spotsFilled: 1,
        organizer: 'You',
        status: 'Open',
        overs: matchData.overs || 20,
        playersPerTeam: matchData.playersPerTeam || 11,
        matchType: matchData.matchType || 'Casual',
        turfId: matchData.turfId || 'turf_1',
        teamA: { players: [] },
        teamB: { players: [] },
    };
};

/**
 * Join an existing match
 */
export const joinMatch = async (matchId: string, team: 'A' | 'B'): Promise<{ success: boolean }> => {
    // Mock API call
    await callLambda(`/matches/${matchId}/join`, 'POST', { team });

    return { success: true };
};

/**
 * Get match details
 */
export const getMatchDetails = async (matchId: string): Promise<Match> => {
    // Mock API call
    await callLambda(`/matches/${matchId}`, 'GET');

    return {
        id: matchId,
        title: 'Sunday League Match',
        date: '2025-12-10',
        time: '07:00 AM',
        location: 'Green Valley Ground',
        price: 500,
        spots: 22,
        spotsFilled: 14,
        organizer: 'Rahul Sharma',
        status: 'Open',
        overs: 20,
        playersPerTeam: 11,
        matchType: 'Casual',
        turfId: 'turf_1',
        turfName: 'Green Valley Ground',
        turfLocation: 'Bangalore',
        teamA: {
            players: ['Virat Kohli', 'Rohit Sharma', 'KL Rahul'],
            captain: 'Virat Kohli',
        },
        teamB: {
            players: ['MS Dhoni', 'Hardik Pandya'],
            captain: 'MS Dhoni',
        },
    };
};

/**
 * List all matches
 */
export const listMatches = async (filters?: any): Promise<Match[]> => {
    // Mock API call
    await callLambda('/matches', 'GET', filters);

    return [
        {
            id: 'match_1',
            title: 'Sunday League Match',
            date: '2025-12-10',
            time: '07:00 AM',
            location: 'Green Valley Ground',
            price: 500,
            spots: 22,
            spotsFilled: 14,
            organizer: 'Rahul Sharma',
            status: 'Open',
            overs: 20,
            playersPerTeam: 11,
            matchType: 'Casual',
            turfId: 'turf_1',
            turfName: 'Green Valley Ground',
            turfLocation: 'Bangalore',
            teamA: { players: ['Player 1', 'Player 2'], captain: 'Player 1' },
            teamB: { players: ['Player 3'], captain: 'Player 3' },
        },
        {
            id: 'match_2',
            title: 'Evening Friendly',
            date: '2025-12-11',
            time: '06:00 PM',
            location: 'Champions Arena',
            price: 300,
            spots: 14,
            spotsFilled: 8,
            organizer: 'Amit Singh',
            status: 'Open',
            overs: 10,
            playersPerTeam: 7,
            matchType: 'Casual',
            turfId: 'turf_2',
            turfName: 'Champions Arena',
            turfLocation: 'Bangalore',
            teamA: { players: Array(11).fill('Player') },
            teamB: { players: Array(11).fill('Player') },
        },
    ];
};
