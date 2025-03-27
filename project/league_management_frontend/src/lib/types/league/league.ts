import { Conference } from "./conference";
import { Division } from "./division";

/* 
A interface to represent a league

@Author: IFD
@Date: 2025-03-26
*/
export interface League {
    id: number;
    name?: string;
    gameType?: string;
    createdAt: string;
    description?: string;
    location?: string;
    currentSeasonId?: number;
    conferences?: Conference[];
    divisions?: Division[];
    createdBy: number;
}