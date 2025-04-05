import { TeamNews } from "@/lib/types/league/team_news";

// The URL of the API
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* 
A function to get all the team news in the team

@Author: IFD
@Date: 2025-03-26
*/
export const getAllTeamNews = async (leagueId: number, teamId: number): Promise<TeamNews[] | []> => {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/teams/${teamId}/news/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    if (!response.ok) {
        return [];
    }

    return response.json();
}

/* 
A function to get team news by its ID

@Author: IFD
@Date: 2025-03-26
*/
export const getTeamNewsById = async (leagueId: number, teamId: number, newsId: number): Promise<TeamNews | null> => {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/teams/${teamId}/news/${newsId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    if (!response.ok) {
        return null;
    }

    return response.json();
}

/* 
A function to create a news league

@Author: IFD
@Date: 2025-03-26
*/
export const createNewsTeam = async (leagueId: number, teamId: number, news: Partial<TeamNews>, accessToken: string): Promise<TeamNews | null> => {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/teams/${teamId}/news/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(news),
    });

    if (!response.ok) {
        return null;
    }

    return response.json();
}

/* 
A function to update a news league

@Author: IFD
@Date: 2025-03-26
*/
export const updateNewsTeam = async (leagueId: number, teamId: number, newsId: number, news: Partial<TeamNews>, accessToken: string): Promise<TeamNews | null> => {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/teams/${teamId}/news/${newsId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(news),
    });

    if (!response.ok) {
        return null;
    }

    return response.json();
}

/* 
A function to delete a news league

@Author: IFD
@Date: 2025-03-26
*/
export const deleteNewsTeam = async (leagueId: number, teamId: number, newsId: number, accessToken: string): Promise<void> => {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/teams/${teamId}/news/${newsId}`, {
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