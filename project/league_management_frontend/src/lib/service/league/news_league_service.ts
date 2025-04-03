import { NewsLeague } from "@/lib/types/league/news_league";
import { access } from "fs";

// The URL of the API
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getNewsLeagues = async (leagueId: number): Promise<NewsLeague[]> => {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/news/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch news leagues');
    }

    return response.json();
}

export const getNewsLeague = async (leagueId: number, newsId: number): Promise<NewsLeague> => {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/news/${newsId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch news league');
    }

    return response.json();
}

export const createNewsLeague = async (leagueId: number, news: Partial<NewsLeague>, accessToken: string): Promise<NewsLeague> => {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/news/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(news),
    });

    if (!response.ok) {
        throw new Error('Failed to create news league');
    }

    return response.json();
}

export const updateNewsLeague = async (leagueId: number, newsId: number, news: Partial<NewsLeague>, accessToken: string): Promise<NewsLeague> => {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/news/${newsId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(news),
    });

    if (!response.ok) {
        throw new Error('Failed to update news league');
    }

    return response.json();
}

export const deleteNewsLeague = async (leagueId: number, newsId: number, accessToken: string): Promise<void> => {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/news/${newsId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete news league');
    }
}