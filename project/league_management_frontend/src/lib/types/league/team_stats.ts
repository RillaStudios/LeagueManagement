/* 
A interface to represent team stats

@Author: IFD
@Date: 2025-03-26
*/
export interface TeamStats {
    id: number;
    teamName: string;
    seasonId: number;
    wins: number;
    losses: number;
    ties: number;
    pointsFor: number;
    pointsAgainst: number;
}