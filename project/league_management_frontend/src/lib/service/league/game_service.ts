import { Game } from "@/lib/types/league/game";

// The URL of the API
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* 
A function to get all games belonging to a specific season
in a specific league.

Parameters:
- leagueId: The ID of the league.
- seasonId: The ID of the season.

@Author: IFD
@Date: 2025-03-28
*/
export async function getGames(leagueId: number, seasonId: number): Promise<Game[]> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/seasons/${seasonId}/games/`);

    if (!response.ok) {
        throw new Error('Failed to fetch games');
    }

    const text = await response.text();
    const games: Game[] = text ? JSON.parse(text) : [];

    return games;
}

/* 
A method to get a specific game by its ID.

Parameters:
- leagueId: The ID of the league.
- seasonId: The ID of the season.
- gameId: The ID of the game.

@Author: IFD
@Date: 2025-03-28
*/
export async function getGame(leagueId: number, seasonId: number, gameId: number): Promise<Game> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/seasons/${seasonId}/games/${gameId}`);

    if (!response.ok) {
        throw new Error('Failed to fetch game');
    }

    const text = await response.text();
    const game: Game = text ? JSON.parse(text) : null;

    return game;
}

/* 
A method to create a new game in the database.

Parameters:
- leagueId: The ID of the league.
- seasonId: The ID of the season.
- game: The game object to be created.

@Author: IFD
@Date: 2025-03-28
*/
export async function createGame(leagueId: number, seasonId: number, game: Partial<Game>, accessToken: string): Promise<Game> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/seasons/${seasonId}/games/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
        body: JSON.stringify({
            homeTeamId: game.homeTeamId, awayTeamId: game.awayTeamId,
            seasonId: seasonId, venueId: game.venueId, gameDate: game.gameDate
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to create game');
    }

    const text = await response.text();
    const newGame: Game = text ? JSON.parse(text) : null;

    return newGame;
}

/* 
A method to update a game in the database.

Parameters:
- leagueId: The ID of the league.
- seasonId: The ID of the season.
- gameId: The ID of the game.

@Author: IFD
@Date: 2025-03-28
*/
export async function updateGame(leagueId: number, seasonId: number, gameId: number, game: Partial<Game>, accessToken: string): Promise<Game> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/seasons/${seasonId}/games/${gameId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(game),
    });

    if (!response.ok) {
        throw new Error('Failed to update game');
    }

    return response.json();
}

/* 
A method to delete a game from the database.

Parameters:
- leagueId: The ID of the league.
- seasonId: The ID of the season.
- gameId: The ID of the game.

@Author: IFD
@Date: 2025-03-28
*/
export async function deleteGame(leagueId: number, seasonId: number, gameId: number, accessToken: string): Promise<void> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/seasons/${seasonId}/games/${gameId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete game');
    }
}