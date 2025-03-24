import { League } from "./league";

export interface Season {
    id: number;
    leagueId: number;
    startDate: string;
    endDate: string;
}