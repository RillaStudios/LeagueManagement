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
import { getAllGameStats, getGameStats } from "@/lib/service/league/game_stats_service";
import { GameStats } from "@/lib/types/league/game_stats";

interface GameCardListProps {
    leagueId: number;
}

const GameCardList: React.FC<GameCardListProps> = ({ leagueId }) => {

    const { dialogState, openDialog, closeDialog } = useDialog();
    const [games, setGames] = useState<Game[]>([]); // State to hold the divisions
    const [activeGameId, setActiveGameId] = useState<number | null>(null);
    const [seasonId, setSeasonId] = useState<number | null>(null);
    const [teams, setTeams] = useState<Team[]>([]); // State to hold the teams
    const [venues, setVenues] = useState<Venue[]>([]); // State to hold the venues

    const fetchGames = async () => {
        if (seasonId === null) return; // If no season is selected, do not fetch games

        await getGames(leagueId, seasonId).then(async (response) => {

            if (response.length === 0) {
                toast({
                    title: "No Games",
                    description: "No games found for the selected season.",
                    variant: "destructive",
                    duration: 2000,
                });
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

    useEffect(() => {
        fetchGames();
    }, [leagueId, seasonId]);

    const handleEdit = (gameId: number) => {
        setActiveGameId(gameId); // Set the active game ID
        openDialog("editGame"); // Open the dialog
    };

    const handleDelete = (gameId: number) => {
        const game = games.find((g) => g.gameId === gameId);

        if (game) {
            deleteGame(leagueId, seasonId!, gameId).then(() => {
                // Successfully deleted the game
                toast({
                    title: "Success",
                    description: "Game deleted successfully.",
                    variant: "default",
                    duration: 2000,
                });

                // Remove the game from the list
                setGames(games.filter((game) => game.gameId !== gameId));
            }).catch(() => {
                // Handle error if needed
                toast({
                    title: "Error",
                    description: `Failed to delete game: ${gameId}.`,
                    variant: "destructive",
                    duration: 2000,
                });
            });
        }
    };

    const handleUpdate = (updatedGame: Game) => {
        setGames((prevGames) => {
            const gameExists = prevGames.some((game) => game.gameId === updatedGame.gameId);
            if (gameExists) {
                // Update the existing game
                return prevGames.map((game) =>
                    game.gameId === updatedGame.gameId ? updatedGame : game
                );
            } else {
                // Add the new game
                return [...prevGames, updatedGame];
            }
        });

        closeDialog("editGame"); // Close the dialog
    };


    const handleStatUpdate = (updatedGameStats: GameStats[]) => {

        // Update the game stats in the list
        setGames(games.map((game) => {
            const gameStats = updatedGameStats.filter(stat => stat.gameId === game.gameId);
            if (gameStats.length > 0) {
                return {
                    ...game,
                    gameStatsIds: gameStats.map(stat => stat.id)
                };
            }
            return game;
        }));

        closeDialog("editGame"); // Close the dialog
    };

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