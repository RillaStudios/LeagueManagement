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
import { getAllUserTeams, getTeams } from "@/lib/service/league/team_service";
import { useAuth } from "@/lib/hooks/useAuth";
import { useUserData } from "@/lib/hooks/useUserData";

interface PlayerCardListProps {
    leagueId: number;
    teamId?: number; // Optional teamId prop
    coachEdit?: boolean; // Optional prop to indicate if the user is a coach
}

/* 
A list of player cards for a given league. It fetches the 
players from the server and displays them in a list.

@Author: IFD
@Date: 2025-03-22
*/
const PlayerCardList: React.FC<PlayerCardListProps> = ({ leagueId, teamId, coachEdit }) => {
    const { dialogState, openDialog, closeDialog } = useDialog();
    const [players, setPlayers] = useState<Player[]>([]);
    const [activePlayerId, setActivePlayerId] = useState<number | null>(null);
    const [teams, setTeams] = useState<Team[] | []>([]); // Add local state for team name
    const { accessToken } = useAuth();

    const { user } = useUserData();

    // Add local state for add dialog
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    /* 
    A function to fetch players from the server.

    @Author: IFD
    @Date: 2025-03-22
    */
    const fetchPlayers = async () => {
        try {
            // First, fetch teams based on conditions
            let teamsList: Team[] = [];

            if (user && coachEdit) {
                teamsList = await getAllUserTeams(accessToken!);
            } else if (leagueId) {
                teamsList = await getTeams(leagueId);
            }

            setTeams(teamsList);

            // Then fetch players and apply filtering
            if (leagueId) {
                const allPlayers = await getPlayersByLeague(leagueId);
                let filteredPlayers = allPlayers;

                if (teamId !== undefined && teamId !== null) {
                    // Filter by specific team if teamId is provided
                    filteredPlayers = filteredPlayers.filter(player => player.teamId === teamId);
                } else if (user && coachEdit) {
                    // Filter by coach's teams if coachEdit is true
                    const coachTeamIds = teamsList.map(team => team.teamId);
                    filteredPlayers = filteredPlayers.filter(player =>
                        coachTeamIds.includes(player.teamId)
                    );
                }

                setPlayers(filteredPlayers);
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: `Failed to fetch data: ${error.message}`,
                variant: "destructive",
                duration: 2000,
            });
        }
    };

    /* 
    A useEffect hook to fetch players when the
    component mounts or when the leagueId or teamId changes.

    @Author: IFD
    @Date: 2025-03-22
    */
    useEffect(() => {
        fetchPlayers();
    }, [leagueId, teamId, user]);

    /* 
    A function to handle editing a player.

    @Author: IFD
    @Date: 2025-03-22
    */
    const handleEdit = (playerId: number) => {
        setActivePlayerId(playerId); // Set the active team ID
        openDialog("editPlayer"); // Open the dialog
    };

    /* 
    A function to handle deleting a player.

    @Author: IFD
    @Date: 2025-03-22
    */
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

    /* 
    A function to handle updating a player.

    @Author: IFD
    @Date: 2025-03-22
    */
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
            <Button className="mb-8" onClick={() => setIsAddDialogOpen(true)}>
                Add Player
            </Button>

            {isAddDialogOpen && (
                <AddEditPlayerDialog
                    leagueId={leagueId}
                    isEdit={false}
                    onSave={handleUpdate}
                    onClose={() => setIsAddDialogOpen(false)} // Add this prop
                    coachEdit={coachEdit} // Pass coachEdit prop to the dialog

                />
            )}

            {
                players.length === 0 ? (
                    <BodySmall className="mt-4" text="No players found." />
                ) : (
                    players.map((player: Player) => (
                        <React.Fragment key={player.playerId}>
                            <PlayerCard
                                player={player}
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
                                    coachEdit={coachEdit}
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