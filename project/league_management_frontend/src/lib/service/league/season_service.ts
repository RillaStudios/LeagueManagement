import { Season } from "@/lib/types/league/season";

// The URL of the API
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getSeasons(leagueId: number): Promise<Season[]> {
    const res = await fetch(`${API_URL}/leagues/${leagueId}/seasons/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch seasons');
    }

    const text = await res.text();

    const seasons: Season[] = text ? JSON.parse(text) : [];

    return seasons;
}

export async function getSeason(leagueId: number, seasonId: number): Promise<Season> {
    const res = await fetch(`${API_URL}/leagues/${leagueId}/seasons/${seasonId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch division');
    }

    const season: Season = await res.json();

    return season;
}

export async function createSeason(leagueId: number, season: Partial<Season>): Promise<Season> {

    const res = await fetch(`${API_URL}/leagues/${leagueId}/seasons/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store',
        body: JSON.stringify({ startDate: season.startDate, endDate: season.endDate }),
    });

    if (!res.ok) {
        throw new Error('Failed to create season');
    }

    const newSeason: Season = JSON.parse(await res.json());

    return newSeason;
}

export async function updateSeason(leagueId: number, seasonId: number, season: Partial<Season>): Promise<Season> {
    const res = await fetch(`${API_URL}/leagues/${leagueId}/seasons/${seasonId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store',
        body: JSON.stringify(season),
    });

    if (!res.ok) {
        throw new Error('Failed to update season');
    }

    const updatedSeason: Season = await res.json();

    return updatedSeason;
}

export async function deleteSeason(leagueId: number, seasonId: number): Promise<void> {
    const res = await fetch(`${API_URL}/leagues/${leagueId}/seasons/${seasonId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to delete season');
    }
}