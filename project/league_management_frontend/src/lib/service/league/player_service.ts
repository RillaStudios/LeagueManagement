import { Player } from "@/lib/types/league/player";

// The URL of the API
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getPlayersByLeague(leagueId: number): Promise<Player[]> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/players/`);

    if (!response.ok) {
        throw new Error(`Error fetching players: ${response.statusText}`);
    }

    const text = await response.text();

    const players: Player[] = text ? JSON.parse(text) : [];

    return players;
}

export async function getPlayersByTeam(leagueId: number, teamId: number): Promise<Player[]> {

    const response = await fetch(`${API_URL}/leagues/${leagueId}/players/team/${teamId}/`);

    if (!response.ok) {
        throw new Error(`Error fetching players: ${response.statusText}`);
    }

    const text = await response.text();

    const players: Player[] = text ? JSON.parse(text) : [];

    return players;
}

export async function getPlayer(leagueId: number, playerId: number): Promise<Player> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/players/${playerId}`);

    if (!response.ok) {
        throw new Error(`Error fetching player: ${response.statusText}`);
    }

    const text = await response.text();

    const player: Player = text ? JSON.parse(text) : null;

    return player;
}

export async function createPlayer(leagueId: number, player: Partial<Player>): Promise<Player> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/players/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(player),
    });

    if (!response.ok) {
        throw new Error(`Error creating player: ${response.statusText}`);
    }

    const text = await response.text();

    const playerRes: Player = text ? JSON.parse(text) : null;

    return playerRes;
}

export async function updatePlayer(leagueId: number, playerId: number, player: Partial<Player>): Promise<Player> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/players/${playerId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(player),
    });

    if (!response.ok) {
        throw new Error(`Error updating player: ${response.statusText}`);
    }

    const text = await response.text();

    const playerRes: Player = text ? JSON.parse(text) : null;

    return playerRes;
}

export async function deletePlayer(leagueId: number, playerId: number): Promise<void> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/players/${playerId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`Error deleting player: ${response.statusText}`);
    }
}