import { League } from "./league";

/* 
A interface to represent a season in a league

@Author: IFD
@Date: 2025-03-26
*/
export interface Season {
    id: number;
    leagueId: number;
    startDate: string;
    endDate: string;
}