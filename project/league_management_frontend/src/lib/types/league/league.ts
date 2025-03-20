import { Conference } from "./conference";
import { Division } from "./division";

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