import { Venue } from "@/lib/types/league/venue";

// The URL of the API
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* 
A function to get all the venues in the league

Parameters:
- leagueId: The ID of the league

Returns:
- An array of venues

@Author: IFD
@Date: 2025-03-26
*/
export async function getVenues(leagueId: number): Promise<Venue[]> {
    const res = await fetch(`${API_URL}/leagues/${leagueId}/venues/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch venues');
    }

    const text = await res.text();

    const venue: Venue[] = text ? JSON.parse(text) : [];

    return venue;
}

/* 
A function to get a venue by ID

Parameters:
- leagueId: The ID of the league
- venueId: The ID of the venue

Returns:
- The venue object

@Author: IFD
@Date: 2025-03-26
*/
export async function getVenue(leagueId: number, venueId: number): Promise<Venue> {
    const res = await fetch(`${API_URL}/leagues/${leagueId}/venues/${venueId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch venue');
    }

    const venue: Venue = await res.json();

    return venue;
}

/* 
A function to add a venue to the league

Parameters:
- leagueId: The ID of the league
- venue: The venue object to add

Returns:
- The new venue object

@Author: IFD
@Date: 2025-03-26
*/
export async function addVenue(leagueId: number, venue: Partial<Venue>, accessToken: string): Promise<Venue> {
    const res = await fetch(`${API_URL}/leagues/${leagueId}/venues/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
        cache: 'no-store',
        body: JSON.stringify(venue),
    });

    if (!res.ok) {
        throw new Error('Failed to add venue');
    }

    const newVenue: Venue = await res.json();

    return newVenue;
}


/* 
A function to update a venue

Parameters:
- leagueId: The ID of the league
- venueId: The ID of the venue

Returns:
- The updated venue object

@Author: IFD
@Date: 2025-03-26
*/
export async function updateVenue(leagueId: number, venueId: number, venue: Partial<Venue>, accessToken: string): Promise<Venue> {
    const res = await fetch(`${API_URL}/leagues/${leagueId}/venues/${venueId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
        cache: 'no-store',
        body: JSON.stringify(venue),
    });

    if (!res.ok) {
        throw new Error('Failed to update venue');
    }

    const newVenue: Venue = await res.json();

    return newVenue;
}


/* 
A function to delete a venue

Parameters:
- leagueId: The ID of the league
- venueId: The ID of the venue

@Author: IFD
@Date: 2025-03-26
*/
export async function deleteVenue(leagueId: number, venueId: number, accessToken: string): Promise<void> {
    const res = await fetch(`${API_URL}/leagues/${leagueId}/venues/${venueId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to delete venue');
    }
}