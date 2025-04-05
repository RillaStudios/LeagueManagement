import { Division } from "@/lib/types/league/division";

// The URL of the API
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* 
A method to get all divisions for a league

@param leagueId: number
@returns Division[]

@Author: IFD
@Since: 2025-03-22
*/
export async function getDivisions(leagueId: number): Promise<Division[] | []> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/divisions/`, {
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

    const divisions: Division[] = await response.json();

    return divisions;
}

/* 
A method to get a division by ID

@param leagueId: number
@param divisionId: number
@returns Division

@Author: IFD
@Since: 2025-03-22
*/
export async function getDivision(leagueId: number, divisionId: number): Promise<Division | null> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/divisions/${divisionId}`, {
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

    const division: Division = await response.json();

    return division;
}

/* 
A method to add a division to a league

@param leagueId: number
@param division: Partial<Division>
@returns void

@Author: IFD
@Since: 2025-03-22
*/
export async function addDivision(leagueId: number, division: Partial<Division>, accessToken: string): Promise<Division | null> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/divisions/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
        cache: 'no-store',
        body: JSON.stringify(division),
    });

    if (!response.ok) {
        return null;
    }

    const newDivision: Division = await response.json();

    return newDivision;
}

/* 
A method to update a division

@param leagueId: number
@param divisionId: number
@param division: Partial<Division>
@returns void

@Author: IFD
@Since: 2025-03-22
*/
export async function updateDivision(leagueId: number, divisionId: number, division: Partial<Division>, accessToken: string): Promise<Division | null> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/divisions/${divisionId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
        cache: 'no-store',
        body: JSON.stringify({ divisionName: division.divisionName, conferenceId: division.conferenceId }),
    });

    if (!response.ok) {
        return null;
    }

    const updatedDivision: Division = await response.json();

    return updatedDivision;
}

/* 
A method to delete a division

@param leagueId: number
@param divisionId: number
@returns void

@Author: IFD
@Since: 2025-03-22
*/
export async function deleteDivision(leagueId: number, divisionId: number, accessToken: string): Promise<void> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/divisions/${divisionId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error('Failed to delete division');
    }
}