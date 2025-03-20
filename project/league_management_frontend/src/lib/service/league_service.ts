import { Conference } from "../types/league/conference";
import { Division } from "../types/league/division";
import { League } from "../types/league/league";

// The URL of the API
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* 
A function that gets all the leagues

@returns an array of league objects

@Author: IFD
@Since: 2025-03-06
*/
export async function getAllLeagues(): Promise<League[]> {

    // Send a GET request to the API to get all the leagues
    const response = await fetch(`${API_URL}/leagues/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // If the response is not ok, throw an error
    if (!response.ok) {
        throw new Error('Failed to fetch leagues');
    }

    // Parse the response as JSON
    const leagues: League[] = await response.json();

    // Return the leagues
    return leagues;
}

/* 
A function that gets a league by its ID

@param id: the ID of the league

@returns the league object

@Author: IFD
@Since: 2025-03-06
*/
export async function getLeague(id: number): Promise<League | null> {

    // Send a GET request to the API to get the league by its ID
    const response = await fetch(`${API_URL}/leagues/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store',
    });

    // If the response is not ok, return null
    if (!response.ok) {

        return null;

    }

    // Parse the response as JSON
    const league: League = await response.json();

    // Return the league
    return league;
}

/* 
A function that gets all the leagues that a user owns

@param accessToken: the access token of the user

@Author: IFD
@Since: 2025-03-06
*/
export async function getAllUserLeagues(accessToken: string): Promise<League[] | null> {

    // Send a GET request to the API to get all the leagues that a user owns
    const response = await fetch(`${API_URL}/account/leagues`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    // If the response is not ok, throw an error
    if (!response.ok) {
        return null;
    }

    // Parse the response as JSON
    const leagues: League[] = await response.json();

    // Return the leagues
    return leagues;
}


/* 
A function that adds a league to the database

@param accessToken: the access token of the user
@param league: the league object to be added to the database

@returns void

@Author: IFD
@Since: 2025-03-06
*/
export async function addLeague(accessToken: string, league: Partial<League>): Promise<void> {

    // Send a POST request to the API to add the league to the database
    const response = await fetch(`${API_URL}/leagues/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ leagueName: league.name, gameType: league.gameType, leagueDescription: league.description, location: league.location }),
    });

    // If the response is not ok, throw an error
    if (!response.ok) {
        throw new Error('Failed to create league');
    }
}

/* 
A 
*/
export async function getDivisions(leagueId: number): Promise<Division[]> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/divisions/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch divisions');
    }

    const divisions: Division[] = await response.json();

    return divisions;
}

export async function addDivision(leagueId: number, division: Partial<Division>): Promise<void> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/divisions/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(division),
    });

    if (!response.ok) {
        throw new Error('Failed to add division');
    }
}

export async function getConferences(leagueId: number): Promise<Conference[]> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/conferences/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch conferences');
    }

    const text = await response.text();
    const conferences: Conference[] = text ? JSON.parse(text) : [];

    return conferences;
}