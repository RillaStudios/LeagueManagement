/* 
A interface that defines the structure of a division object

@Author: IFD
@Date: 2025-03-26
*/
export interface Division {
    id: number;
    divisionName?: string;
    leagueName: string;
    conferenceName: string;
    conferenceId: number;
    leagueId: number;
}