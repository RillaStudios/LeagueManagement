import { Division } from "./division";
import { League } from "./league";

export interface Conference {
    id: number;
    name?: string;
    league: League;
    divisions?: Division[];
}   