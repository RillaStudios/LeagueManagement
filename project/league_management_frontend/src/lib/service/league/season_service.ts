import { Season } from "@/lib/types/league/season";
import { TeamStats } from "@/lib/types/league/team_stats";

// The URL of the API
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* 
A method that fetches all seasons for a league

Parameters:
- leagueId: The ID of the league

Returns:
- A promise that resolves to an array of seasons

@Author: IFD
@Date: 2025-03-26
*/
export async function getSeasons(leagueId: number): Promise<Season[] | []> {
    const res = await fetch(`${API_URL}/leagues/${leagueId}/seasons/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store',
    });

    if (!res.ok) {
        return [];
    }

    const text = await res.text();

    const seasons: Season[] = text ? JSON.parse(text) : [];

    return seasons;
}

/* 
A method that fetches a season for a league

Parameters:
- leagueId: The ID of the league
- seasonId: The ID of the season

Returns:
- A promise that resolves to a season

@Author: IFD
@Date: 2025-03-26
*/
export async function getSeason(leagueId: number, seasonId: number): Promise<Season | null> {
    const res = await fetch(`${API_URL}/leagues/${leagueId}/seasons/${seasonId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store',
    });

    if (!res.ok) {
        return null;
    }

    const season: Season = await res.json();

    return season;
}

/* 
A method that creates a season for a league

Parameters:
- leagueId: The ID of the league
- season: The season object

Returns:
- A promise that resolves to the created season

@Author: IFD
@Date: 2025-03-26
*/
export async function createSeason(leagueId: number, season: Partial<Season>, accessToken: string): Promise<Season | null> {
    const res = await fetch(`${API_URL}/leagues/${leagueId}/seasons/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
        cache: 'no-store',
        body: JSON.stringify({ startDate: season.startDate, endDate: season.endDate }),
    });

    if (!res.ok) {
        return null;
    }

    const text = await res.text();

    const newSeason: Season = text ? JSON.parse(text) : [];

    return newSeason;
}

/* 
A method that updates a season for a league

Parameters:
- leagueId: The ID of the league
- seasonId: The ID of the season

Returns:
- A promise that resolves to the updated season

@Author: IFD
@Date: 2025-03-26
*/
export async function updateSeason(leagueId: number, seasonId: number, season: Partial<Season>, accessToken: string): Promise<Season | null> {
    const res = await fetch(`${API_URL}/leagues/${leagueId}/seasons/${seasonId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
        cache: 'no-store',
        body: JSON.stringify({ startDate: season.startDate, endDate: season.endDate }),
    });

    if (!res.ok) {
        return null;
    }

    const text = await res.text();

    const newSeason: Season = text ? JSON.parse(text) : [];

    return newSeason;
}

/* 
A method that deletes a season for a league

Parameters:
- leagueId: The ID of the league
- seasonId: The ID of the season

Returns:
- A promise that resolves to void

@Author: IFD
@Date: 2025-03-26
*/
export async function deleteSeason(leagueId: number, seasonId: number, accessToken: string): Promise<void> {
    const res = await fetch(`${API_URL}/leagues/${leagueId}/seasons/${seasonId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to delete season');
    }
}


/* 
A method that fetches the stats for a season

Parameters:
- leagueId: The ID of the league
- seasonId: The ID of the season

Returns:
- A promise that resolves to an array of team stats

@Author: IFD
@Date: 2025-03-26
*/
export async function getSeasonStats(leagueId: number, seasonId: number): Promise<TeamStats[] | []> {
    const res = await fetch(`${API_URL}/leagues/${leagueId}/seasons/stats/${seasonId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store',
    });

    if (!res.ok) {
        return [];
    }

    const text = await res.text();

    const stats = text ? JSON.parse(text) : [];

    return stats;
}