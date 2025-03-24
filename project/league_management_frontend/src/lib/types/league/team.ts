import { User } from "../user";

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