/* 
A interface that defines the structure of a team object

@Author: IFD
@Date: 2025-03-26
*/
export interface Team {
    teamId: number;
    teamName: string;
    location: string;
    leagueName: string;
    divisionName?: string;
    conferenceName?: string;
    teamOwnerName: string;
    ownerId: number;
    leagueId: number;
    divisionId?: number;
    conferenceId?: number;
}