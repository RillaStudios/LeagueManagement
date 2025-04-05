/* 
An interface representing a game in a league

@Author: IFD
@Date: 2025-04-01
*/
export interface Game {
    gameId: number;
    seasonId: number;
    homeTeamId: number;
    awayTeamId: number;
    gameDate: string;
    venueId: number;
    teamGameStatsIds: number[] | null;
}