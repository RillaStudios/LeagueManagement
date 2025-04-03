'use client'

import { useDialog } from "@/lib/components/providers/dialog_provider";
import React, { useEffect, useState } from "react";
import { PlayerCard } from "./player_card";
import { toast } from "@/hooks/use-toast";
import { BodySmall } from "@/lib/components/layout/typography";
import { Button } from "@/lib/components/shadcn/button";
import { Player } from "@/lib/types/league/player";
import { deletePlayer, getPlayersByLeague } from "@/lib/service/league/player_service";
import AddEditPlayerDialog from "../../dialogs/league/player/add_player";
import { Team } from "@/lib/types/league/team";
import { getTeams } from "@/lib/service/league/team_service";
import { useAuth } from "@/lib/hooks/useAuth";

interface PlayerCardListProps {
    leagueId: number;
}

const PlayerCardList: React.FC<PlayerCardListProps> = ({ leagueId }) => {
    const { dialogState, openDialog, closeDialog } = useDialog();
    const [players, setPlayers] = useState<Player[]>([]);
    const [activePlayerId, setActivePlayerId] = useState<number | null>(null);
    const [teams, setTeams] = useState<Team[] | null>(null); // Add local state for team name
    const { accessToken } = useAuth();

    // Add local state for add dialog
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    const fetchPlayers = async () => {
        await getPlayersByLeague(leagueId).then((response) => {
            setPlayers(response); // Set the teams in the state
        }
        ).catch((error) => {

            toast({
                title: "Error",
                description: `Failed to fetch players: ${error.message}`,
                variant: "destructive",
                duration: 2000,
            });

        });

        await getTeams(leagueId).then((response) => {
            setTeams(response); // Set the teams in the state
        }
        ).catch((error) => {

            toast({
                title: "Error",
                description: `Failed to fetch teams: ${error.message}`,
                variant: "destructive",
                duration: 2000,
            });

        });
    };

    useEffect(() => {
        fetchPlayers();
    }
        , [leagueId]);

    const handleEdit = (playerId: number) => {
        setActivePlayerId(playerId); // Set the active team ID
        openDialog("editPlayer"); // Open the dialog
    };

    const handleDelete = (playerId: number) => {
        const player = players.find((player) => player.playerId === playerId);

        if (player) {
            deletePlayer(leagueId, player.teamId, player.playerId, accessToken!).then(() => {
                // Successfully deleted the team
                toast({
                    title: "Success",
                    description: "Player deleted successfully.",
                    variant: "default",
                    duration: 2000,
                });

                // Remove the team from the list
                setPlayers(players.filter((player) => player.playerId !== playerId));

            }).catch(() => {
                toast({
                    title: "Error",
                    description: `Failed to delete player.`,
                    variant: "destructive",
                    duration: 2000,
                });
            });
        }
    };

    const handleUpdate = (updatedPlayer: Player) => {
        setPlayers((prevPlayers) => {
            const playerExists = prevPlayers.some((player) => player.playerId === updatedPlayer.playerId);
            if (playerExists) {
                // Update the existing player
                return prevPlayers.map((player) =>
                    player.playerId === updatedPlayer.playerId ? updatedPlayer : player
                );
            } else {
                // Add the new player
                return [...prevPlayers, updatedPlayer];
            }
        });

        // Close dialogs based on which one is open
        if (dialogState['editPlayer']) {
            closeDialog('editPlayer');
        }
        // Use local state for add dialog
        if (isAddDialogOpen) {
            setIsAddDialogOpen(false);
        }
    };
    return (
        <>
            <Button onClick={() => setIsAddDialogOpen(true)}>
                Add Player
            </Button>

            {isAddDialogOpen && (
                <AddEditPlayerDialog
                    leagueId={leagueId}
                    isEdit={false}
                    onSave={handleUpdate}
                    onClose={() => setIsAddDialogOpen(false)} // Add this prop
                />
            )}

            {
                players.length === 0 ? (
                    <BodySmall text="No players found." />
                ) : (
                    players.map((player: Player) => (
                        <React.Fragment key={player.playerId}>
                            <PlayerCard
                                player={player}
                                leagueId={leagueId}
                                teamName={teams?.find((team) => team.teamId === player.teamId)?.teamName || "N/A"}
                                onDelete={() => handleDelete(player.playerId)}
                                onEdit={() => handleEdit(player.playerId)}
                                displayEdit
                            />
                            {dialogState['editPlayer'] && activePlayerId === player.playerId && (
                                <AddEditPlayerDialog
                                    leagueId={leagueId}
                                    playerId={player.playerId}
                                    isEdit={true}
                                    onSave={handleUpdate}
                                />
                            )}
                        </React.Fragment>
                    ))
                )
            }
        </>
    );

}

export default PlayerCardList;