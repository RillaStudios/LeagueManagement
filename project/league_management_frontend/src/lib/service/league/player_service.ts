import { Player } from "@/lib/types/league/player";

// The URL of the API
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* 
A function to get all the players in the league

@Author: IFD
@Date: 2025-03-23
*/
export async function getPlayersByLeague(leagueId: number): Promise<Player[] | []> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/players/`);

    if (!response.ok) {
        return [];
    }

    const text = await response.text();

    const players: Player[] = text ? JSON.parse(text) : [];

    return players;
}

/* 
A function to get all the players by team id

@Author: IFD
@Date: 2025-03-23
*/
export async function getPlayersByTeam(leagueId: number, teamId: number): Promise<Player[] | null> {

    const response = await fetch(`${API_URL}/leagues/${leagueId}/players/team/${teamId}`);

    if (!response.ok) {
        return null;
    }

    const text = await response.text();

    const players: Player[] = text ? JSON.parse(text) : [];

    return players;
}

/* 
A function to get a player by id

@Author: IFD
@Date: 2025-03-23
*/
export async function getPlayer(leagueId: number, playerId: number): Promise<Player | null> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/players/${playerId}`);

    if (!response.ok) {
        return null;
    }

    const text = await response.text();

    const player: Player = text ? JSON.parse(text) : null;

    return player;
}

/* 
A function to create a player

@Author: IFD
@Date: 2025-03-23
*/
export async function createPlayer(leagueId: number, player: Partial<Player>, accessToken: string): Promise<Player | null> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/players/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(player),
    });

    if (!response.ok) {
        return null;
    }

    const text = await response.text();

    const playerRes: Player = text ? JSON.parse(text) : null;

    return playerRes;
}

/* 
A function to update a player

@Author: IFD
@Date: 2025-03-23
*/
export async function updatePlayer(leagueId: number, playerId: number, player: Partial<Player>, accessToken: string): Promise<Player | null> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/players/${playerId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(player),
    });

    if (!response.ok) {
        return null;
    }

    const text = await response.text();

    const playerRes: Player = text ? JSON.parse(text) : null;

    return playerRes;
}

/* 
A function to delete a player

@Author: IFD
@Date: 2025-03-23
*/
export async function deletePlayer(leagueId: number, teamId: number, playerId: number, accessToken: string): Promise<void> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/players/${playerId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(teamId),
    });

    if (!response.ok) {
        throw new Error(`Error deleting player: ${response.statusText}`);
    }
}