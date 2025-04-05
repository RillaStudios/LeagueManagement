import { Conference } from "@/lib/types/league/conference";

// The URL of the API
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* 
A function that gets all the divisions in a league

@param leagueId: the ID of the league

@returns an array of division objects

@Author: IFD
@Since: 2025-03-06
*/
export async function getConferences(leagueId: number): Promise<Conference[] | []> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/conferences/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store',
    });

    if (!response.ok) {
        return [];
    }

    const text = await response.text();
    const conferences: Conference[] = text ? JSON.parse(text) : [];

    return conferences;
}

/* 
A function that gets a conference by its ID

@param leagueId: the ID of the league
@param conferenceId: the ID of the conference

@returns the conference object

@Author: IFD
@Since: 2025-03-06
*/
export async function getConference(leagueId: number, conferenceId: number): Promise<Conference | null> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/conferences/${conferenceId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store',
    });

    if (!response.ok) {
        return null;
    }

    const text = await response.text();
    const conference: Conference = text ? JSON.parse(text) : null;

    return conference;
}

/* 
A function that adds a conference to a league

@param leagueId: the ID of the league
@param conference: the conference object to be added to the league

@returns void

@Author: IFD
@Since: 2025-03-06
*/
export async function addConference(leagueId: number, conference: Partial<Conference>, accessToken: string): Promise<Conference | null> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/conferences/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
        body: JSON.stringify(conference),
    });

    if (!response.ok) {
        return null;
    }

    const text = await response.text();
    const newConference: Conference = text ? JSON.parse(text) : null;

    return newConference;
}

/* 
A function that updates a conference in a league

@param leagueId: the ID of the league
@param conferenceId: the ID of the conference
@param conference: the conference object to be updated

@returns void

@Author: IFD
@Since: 2025-03-06
*/
export async function updateConference(leagueId: number, conferenceId: number, conference: Partial<Conference>, accessToken: string): Promise<Conference | null> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/conferences/${conferenceId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
        body: JSON.stringify(conference),
    });

    if (!response.ok) {
        return null;
    }

    const text = await response.text();
    const updatedConference: Conference = text ? JSON.parse(text) : null;

    return updatedConference;
}

/* 
A function that deletes a conference from a league

@param leagueId: the ID of the league
@param conferenceId: the ID of the conference

@returns void

@Author: IFD
@Since: 2025-03-06
*/
export async function deleteConference(leagueId: number, conferenceId: number, accessToken: string): Promise<void> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/conferences/${conferenceId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Failed to delete conference: ' + await response.text());
    }
}