/* 
A TypeScript interface representing a player in a league.

@Author: IFD
@Date: 2025-04-01
*/
export interface Player {
    playerId: number;
    name: string;
    height: number; // in inches
    weight: number; // in lbs
    skillLevel: string;
    dob: Date; // date of birth
    teamId: number; // team ID
}