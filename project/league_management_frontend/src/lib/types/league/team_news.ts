/* 
A TypeScript interface representing a news article in a team.

@Author: IFD
@Date: 2025-04-01
*/
export interface TeamNews {
    teamNewsId: number;
    createdAt: string;
    content: string;
    teamId: number;
    createdBy: number;
}