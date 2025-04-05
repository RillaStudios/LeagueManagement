/* 
A TypeScript interface representing the game statistics of a team in a league.

@Author: IFD
@Date: 2025-04-01
*/
export interface GameStats {
    id: number;
    teamId: number;
    pointsFor: number;
    pointsAgainst: number;
    gameId: number;
}