export interface Game {
    gameId: number;
    seasonId: number;
    homeTeamId: number;
    awayTeamId: number;
    gameDate: string;
    venueId: number;
    teamGameStatsIds: number[] | null;
}