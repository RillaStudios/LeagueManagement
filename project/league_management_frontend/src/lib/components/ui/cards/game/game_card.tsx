import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../shadcn/card";
import { Button } from "../../../shadcn/button";
import { Game } from "@/lib/types/league/game";
import { Team } from "@/lib/types/league/team";
import { Venue } from "@/lib/types/league/venue";
import Row from "@/lib/components/layout/row";
import Column from "@/lib/components/layout/column";
import { HeadlineMedium } from "@/lib/components/layout/typography";
import { Separator } from "@/lib/components/shadcn/separator";
import { GameStats } from "@/lib/types/league/game_stats";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { getGameStats } from "@/lib/service/league/game_stats_service";
import { useDialog } from "@/lib/components/providers/dialog_provider";
import AddEditGameResultDialog from "../../dialogs/league/game_results/add_game_result";

interface GameResult {
    score: string;
    winner: string;
    loser: string;
    draw?: boolean;
}

/* 
A card component that displays the details of a game.

@Author: IFD
@Date: 2025-03-22
*/
export function GameCard({ leagueId, game, onDelete, onEdit, handleUpdate, handleStatUpdate, homeTeam, awayTeam, venue }: {
    leagueId: number,  // League ID
    game: Game, onDelete: () => void, onEdit: () => void, handleUpdate: (game: Game) => void, handleStatUpdate: (gameStats: GameStats[]) => void,
    homeTeam: Team, awayTeam: Team, venue: Venue,
}) {

    const [gameStats, setGameStats] = useState<GameStats[]>([]); // State to hold the game stats
    const [gameResult, setGameResult] = useState<GameResult>();
    const { dialogState, openDialog } = useDialog();

    useEffect(() => {
        const fetchGameStats = async () => {
            try {
                const response = await getGameStats(leagueId, game.seasonId, game.gameId);

                if (response.length === 0) {
                    toast({
                        title: "No Game Stats",
                        description: "No game stats found for the selected game.",
                        variant: "destructive",
                        duration: 2000,
                    });

                    setGameResult({
                        score: "No Result Yet",
                        winner: "N/A",
                        loser: "N/A",
                        draw: false,
                    });
                } else {
                    setGameStats(response);

                    if (new Date(game.gameDate) > new Date() && response[0].pointsFor === 0 && response[1].pointsFor === 0) {
                        setGameResult({
                            score: "No Result Yet",
                            winner: "N/A",
                            loser: "N/A",
                            draw: false,
                        });
                        return;
                    }

                    setGameResult({
                        score: `${response[0].pointsFor} - ${response[1].pointsFor}`,
                        winner: response[0].pointsFor > response[1].pointsFor ? homeTeam.teamName : awayTeam.teamName,
                        loser: response[0].pointsFor < response[1].pointsFor ? homeTeam.teamName : awayTeam.teamName,
                        draw: response[0].pointsFor === response[1].pointsFor,
                    });
                }
            } catch (error) {
                console.error("Error fetching game stats:", error);

                setGameResult({
                    score: "Error fetching results",
                    winner: "N/A",
                    loser: "N/A",
                    draw: false,
                });
            }
        };

        fetchGameStats();
    }, [game.gameId, leagueId, game.seasonId, homeTeam.teamName, awayTeam.teamName]);

    return (
        <Card className="w-full mb-4">
            <CardHeader>
                <CardTitle>Game ID: #{game.gameId}</CardTitle>
                <CardDescription>Season ID: #{game.seasonId}</CardDescription>
            </CardHeader>
            <CardContent>
                <Row gap="4">
                    <Column gap="4" expanded>
                        <HeadlineMedium text="Game Details" />
                        <Separator className="my-2" />
                        <div>Date: {game.gameDate ? new Date(game.gameDate).toISOString().split('T')[0] : "N/A"}</div>
                        <div>Time: {game.gameDate ? new Date(game.gameDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A"}</div>
                        <div>Home Team: {homeTeam.teamName ? (typeof homeTeam.teamName === 'string' ? homeTeam.teamName : homeTeam.teamName) : "N/A"}</div>
                        <div>Away Team: {awayTeam.teamName ? (typeof awayTeam.teamName === 'string' ? awayTeam.teamName : awayTeam.teamName) : "N/A"}</div>
                        <div>Venue: {venue.address ? (typeof venue.address === 'string' ? venue.address : venue.address) : "N/A"}</div>
                    </Column>
                    <Column gap="4" expanded>
                        <HeadlineMedium text="Game Results" />
                        <Separator className="my-2" />
                        <div>Score: {gameResult?.score}</div>
                        <div>Winner: {!gameResult?.draw ? gameResult?.winner : "Draw"}</div>
                        <div>Loser: {!gameResult?.draw ? gameResult?.loser : "Draw"}</div>
                        <Button variant={"default"} onClick={() => openDialog(`editGameScore-${game.gameId}`)}>
                            Edit Results</Button>
                        {dialogState[`editGameScore-${game.gameId}`] && game.gameId && (
                            <AddEditGameResultDialog
                                gameStats={gameStats}
                                leagueId={leagueId}
                                gameId={game.gameId}
                                homeTeam={homeTeam}
                                awayTeam={awayTeam}
                                seasonId={game.seasonId}
                                onSave={handleStatUpdate}
                            />
                        )}
                    </Column>
                </Row>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant={"default"} onClick={() => onEdit()}>Edit</Button>
                <Button variant="destructive" onClick={() => onDelete()}>Delete</Button>
            </CardFooter>
        </Card>
    );
}