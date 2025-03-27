/* 
A interface that defines the structure of a conference object

@Author: IFD
@Date: 2025-03-26
*/
export interface Conference {
    id: number;
    name?: string;
    leagueName: string;
    divisions?: String[];
    leagueId: number;
}   