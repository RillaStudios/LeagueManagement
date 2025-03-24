import { Division } from "./division";

export interface Conference {
    id: number;
    name?: string;
    leagueName: string;
    divisions?: String[];
    leagueId: number;
}   