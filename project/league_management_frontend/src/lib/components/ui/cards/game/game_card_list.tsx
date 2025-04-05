'use client'

import { useDialog } from "@/lib/components/providers/dialog_provider";
import React, { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { BodySmall } from "@/lib/components/layout/typography";
import { Game } from "@/lib/types/league/game";
import { deleteGame, getGames } from "@/lib/service/league/game_service";
import AddEditGameDialog from "../../dialogs/league/game/add_game";
import { GameCard } from "./game_card";
import SeasonSelector from "../../other/season_selector";
import { getTeams } from "@/lib/service/league/team_service";
import { Team } from "@/lib/types/league/team";
import { Venue } from "@/lib/types/league/venue";
import { getVenues } from "@/lib/service/league/venue_service";
import Row from "@/lib/components/layout/row";
import { Button } from "@/lib/components/shadcn/button";
import { GameStats } from "@/lib/types/league/game_stats";
import { useAuth } from "@/lib/hooks/useAuth";

interface GameCardListProps {
    leagueId: number;
}

/* 
A list of game cards for a given league. It fetches 
the games from the server and displays them in a list.

@Author: IFD
@Date: 2025-03-22
*/
const GameCardList: React.FC<GameCardListProps> = ({ leagueId }) => {

    const { dialogState, openDialog, closeDialog } = useDialog();
    const [games, setGames] = useState<Game[]>([]);
    const [activeGameId, setActiveGameId] = useState<number | null>(null);
    const [seasonId, setSeasonId] = useState<number | null>(null);
    const [teams, setTeams] = useState<Team[]>([]);
    const [venues, setVenues] = useState<Venue[]>([]);
    const { accessToken } = useAuth();

    /* 
    A function to fetch games from the server.

    @Author: IFD
    @Date: 2025-03-22
    */
    const fetchGames = async () => {
        if (seasonId === null) return; // If no season is selected, do not fetch games

        await getGames(leagueId, seasonId).then(async (response) => {

            if (response.length === 0) {
                return;
            }

            setGames(response);

        }
        ).catch((error) => {

            toast({
                title: "Error",
                description: `Failed to fetch games: ${error.message}`,
                variant: "destructive",
                duration: 2000,
            });

        }
        );
    };

    /* 
    A useEffect hook to fetch games when the
    component mounts or when the leagueId or seasonId changes.

    @Author: IFD
    @Date: 2025-03-22
    */
    useEffect(() => {
        const fetchGameInfo = async () => {
            try {

                const response = await getTeams(leagueId); // Fetch teams from the API
                if (response) {
                    setTeams(response); // Convert single team to array
                }

                const venueResponse = await getVenues(leagueId); // Fetch venues from the API
                if (venueResponse) {
                    setVenues(venueResponse); // Convert single venue to array
                }

            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
                toast({
                    title: "Error",
                    description: `Failed to fetch teams: ${errorMessage}`,
                    variant: "destructive",
                    duration: 2000,
                });
            }
        };
        fetchGameInfo(); // Fetch teams when the component mounts
    }, [leagueId]);

    /* 
    A useEffect hook to fetch games when the
    component mounts or when the leagueId or seasonId changes.

    @Author: IFD
    @Date: 2025-03-22
    */
    useEffect(() => {
        fetchGames();
    }, [leagueId, seasonId]);

    /* 
    A function to handle editing a game.

    @Author: IFD
    @Date: 2025-03-22
    */
    const handleEdit = (gameId: number) => {
        setActiveGameId(gameId);
        openDialog("editGame");
    };

    /* 
    A function to handle deleting a game.

    @Author: IFD
    @Date: 2025-03-22
    */
    const handleDelete = (gameId: number) => {
        const game = games.find((g) => g.gameId === gameId);

        if (game) {
            deleteGame(leagueId, seasonId!, gameId, accessToken!).then(() => {
                toast({
                    title: "Success",
                    description: "Game deleted successfully.",
                    variant: "default",
                    duration: 2000,
                });

                // Use functional update pattern
                setGames(prevGames => prevGames.filter(game => game.gameId !== gameId));
            }).catch(() => {
                toast({
                    title: "Error",
                    description: `Failed to delete game: ${gameId}.`,
                    variant: "destructive",
                    duration: 2000,
                });
            });
        }
    };

    /* 
    A function to handle updating a game.

    @Author: IFD
    @Date: 2025-03-22
    */
    const handleUpdate = (updatedGame: Game) => {
        setGames((prevGames) => {
            const gameExists = prevGames.some((game) => game.gameId === updatedGame.gameId);
            if (gameExists) {
                return prevGames.map((game) =>
                    game.gameId === updatedGame.gameId ? updatedGame : game
                );
            } else {
                return [...prevGames, updatedGame];
            }
        });

        closeDialog("editGame");
    };

    /* 
    A function to handle updating game stats.

    @Author: IFD
    @Date: 2025-03-22
    */
    const handleStatUpdate = (updatedGameStats: GameStats[]) => {
        // Use functional update pattern
        setGames(prevGames => prevGames.map((game) => {
            const gameStats = updatedGameStats.filter(stat => stat.gameId === game.gameId);
            if (gameStats.length > 0) {
                return {
                    ...game,
                    gameStatsIds: gameStats.map(stat => stat.id)
                };
            }
            return game;
        }));

        closeDialog("editGame");
    };

    /* 
    A function to handle season change.

    @Author: IFD
    @Date: 2025-03-22
    */
    const handleSeasonChange = (seasonId: string) => {
        setSeasonId(parseInt(seasonId));
    };

    return (
        <>
            <SeasonSelector leagueId={leagueId} onSeasonChange={handleSeasonChange} />
            {seasonId !== null && (
                <Row expanded>
                    <Button
                        variant="default"
                        className="w-1/3 my-4"
                        onClick={() => openDialog("addGame")}
                    >
                        Add Game
                    </Button>
                    {dialogState['addGame'] && (
                        <AddEditGameDialog
                            leagueId={leagueId}
                            seasonId={seasonId!}
                            onSave={handleUpdate} // Pass the update handler to the dialog
                        />
                    )}
                </Row>
            )}
            {games.length === 0 ? (
                <BodySmall text="No games found." />
            ) : (
                games.map((game: Game) => (

                    <React.Fragment key={game.gameId}>
                        <GameCard
                            leagueId={leagueId}
                            game={game}
                            onDelete={() => handleDelete(game.gameId)} // Handle delete
                            homeTeam={teams.find(team => team.teamId === game.homeTeamId)!} // Find home team by ID
                            awayTeam={teams.find(team => team.teamId === game.awayTeamId)!} // Find away team by ID
                            venue={venues.find(venue => venue.venueId === game.venueId)!} // Find venue by ID
                            onEdit={() => handleEdit(game.gameId)}
                            handleUpdate={handleUpdate}
                            handleStatUpdate={handleStatUpdate}
                        />
                        {dialogState['editGame'] && activeGameId === game.gameId && (
                            <AddEditGameDialog
                                leagueId={leagueId}
                                gameId={game.gameId}
                                seasonId={seasonId!}
                                isEdit={true}
                                onSave={handleUpdate} // Pass the update handler to the dialog
                            />
                        )}
                    </React.Fragment>
                ))
            )}
        </>
    );
}

export default GameCardList;