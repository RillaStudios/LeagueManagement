export interface TeamStats {
    id: number;
    teamName: string;
    seasonId: number;
    wins: number;
    losses: number;
    ties: number;
    pointsFor: number;
    pointsAgainst: number;
}