import { Team } from "@/lib/types/league/team";

// The URL of the API
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* 
A function to get all the teams in the league

Returns:
- An array of teams

@Author: IFD
@Date: 2025-03-23
*/
export async function getTeams(leagueId: number): Promise<Team[]> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/teams/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch teams');
    }

    const text = await response.text();

    const teams: Team[] = text ? JSON.parse(text) : [];

    return teams;
}

/* 
A function to get a team by ID

Parameters:
- leagueId: The ID of the league
- teamId: The ID of the team

Returns:
- The team object

@Author: IFD
@Date: 2025-03-26
*/
export async function getTeam(leagueId: number, teamId: number): Promise<Team | null> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/teams/${teamId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch team');
    }

    const text = await response.text();

    const team: Team = text ? JSON.parse(text) : null;

    return team;
}

/* 
A function to create a team

Parameters:
- leagueId: The ID of the league
- team: The team object to create

Returns:
- The created team object

@Author: IFD
@Date: 2025-03-26
*/
export async function createTeam(leagueId: number, team: Partial<Team>): Promise<Team> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/teams/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store',
        body: JSON.stringify({ teamName: team.teamName, location: team.location, divisionId: team.divisionId, ownerId: team.ownerId }),
    });

    if (!response.ok) {
        const errorMessage = await response.text(); // Read error message from response
        console.error('Failed to create team:', errorMessage);
        throw new Error(`Failed to create team: ${errorMessage}`);
    }

    const text = await response.text();

    const newTeam: Team = text ? JSON.parse(text) : null;

    return newTeam;
}

/* 
A function to update a team

Parameters:
- leagueId: The ID of the league
- team: The team object to update

Returns:
- The updated team object

@Author: IFD
@Date: 2025-03-26
*/
export async function updateTeam(leagueId: number, team: Partial<Team>): Promise<Team> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/teams/${team.teamId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store',
        body: JSON.stringify(team),
    });

    if (!response.ok) {
        throw new Error('Failed to update team');
    }

    const text = await response.text();

    const updatedTeam: Team = text ? JSON.parse(text) : null;

    return updatedTeam;
}

/* 
A function to delete a team

Parameters:
- leagueId: The ID of the league
- teamId: The ID of the team

@Author: IFD
@Date: 2025-03-26
*/
export async function deleteTeam(leagueId: number, teamId: number): Promise<void> {
    const response = await fetch(`${API_URL}/leagues/${leagueId}/teams/${teamId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error('Failed to delete team');
    }
}
