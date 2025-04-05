/* 
A TypeScript interface representing a news article in a league.

@Author: IFD
@Date: 2025-04-01
*/
export interface NewsLeague {
    leagueNewsId: number;
    createdAt: string;
    content: string;
    leagueId: number;
    createdBy: number;
}