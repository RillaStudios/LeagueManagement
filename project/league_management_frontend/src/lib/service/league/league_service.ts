import { League } from "../../types/league/league";

// The URL of the API
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* 
A function that gets all the leagues

@returns an array of league objects

@Author: IFD
@Since: 2025-03-06
*/
export async function getAllLeagues(): Promise<League[] | []> {

    // Send a GET request to the API to get all the leagues
    const response = await fetch(`${API_URL}/leagues/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // If the response is not ok, throw an error
    if (!response.ok) {
        return [];
    }

    const text = await response.text();

    const leagues: League[] = text ? JSON.parse(text) : [];

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

    const text = await response.text();

    const leagues: League[] = text ? JSON.parse(text) : [];

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
A function that updates a league in the database

@param accessToken: the access token of the user
@param league: the league object to be updated in the database

@returns void

@Author: IFD
@Since: 2025-03-22
*/
export async function updateLeague(accessToken: string, league: Partial<League>): Promise<void> {
    await fetch(`${API_URL}/leagues/${league.id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ leagueName: league.name, gameType: league.gameType, leagueDescription: league.description, location: league.location }),
    });
}

/* 
A function that deletes a league from the database

@param accessToken: the access token of the user
@param leagueId: the ID of the league to be deleted

@returns void

@Author: IFD
@Since: 2025-03-22
*/
export async function deleteLeague(leagueId: number, accessToken: string): Promise<void> {
    await fetch(`${API_URL}/leagues/${leagueId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
    }).catch((err) => {
        console.log(err);
    });
}
