import { GameStats } from "@/lib/types/league/game_stats";

// The URL of the API
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* 
A method to get game stats by game ID

@Author: IFD
@Date: 2025-03-28
*/
export async function getGameStats(leagueId: number, seasonId: number, gameId: number): Promise<GameStats[]> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/seasons/${seasonId}/games/${gameId}/stats`);

    if (!response.ok) {
        throw new Error('Failed to fetch game stats');
    }

    const text = await response.text();
    const gameStats: GameStats[] = text ? JSON.parse(text) : [];

    return gameStats;
}

/* 
A method to get game stats by game ID and team ID

@Author: IFD
@Date: 2025-03-28
*/
export async function getGameStatsByTeam(leagueId: number, seasonId: number, gameId: number, teamId: number): Promise<GameStats[]> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/seasons/${seasonId}/games/${gameId}/teams/${teamId}/stats/`);

    if (!response.ok) {
        throw new Error('Failed to fetch game stats');
    }

    const text = await response.text();
    const gameStats: GameStats[] = text ? JSON.parse(text) : [];

    return gameStats;
}

/* 
A method to get all game stats by team ID

@Author: IFD
@Date: 2025-03-28
*/
export async function getAllGameStats(leagueId: number, seasonId: number, accessToken: string): Promise<GameStats[]> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/seasons/${seasonId}/games/stats`);

    if (!response.ok) {
        throw new Error('Failed to fetch game stats');
    }

    const text = await response.text();
    const gameStats: GameStats[] = text ? JSON.parse(text) : [];

    return gameStats;
}

/* 
A method to update game stats by game ID and team ID

@Author: IFD
@Date: 2025-03-28
*/
export async function updateGameStats(leagueId: number, seasonId: number, gameId: number, gameStats: Partial<GameStats>[], accessToken: string): Promise<GameStats> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/seasons/${seasonId}/games/${gameId}/stats`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(gameStats),
    });

    if (!response.ok) {
        throw new Error('Failed to update game stats');
    }

    const text = await response.text();
    const updatedGameStats: GameStats = text ? JSON.parse(text) : {};

    return updatedGameStats;
}