'use client'

import { useDialog } from "@/lib/components/providers/dialog_provider";
import React, { useEffect, useState } from "react";
import { Team } from "@/lib/types/league/team";
import { TeamCard } from "./team_card";
import AddEditTeamDialog from "../../dialogs/league/team/add_team";
import { deleteTeam, getTeams } from "@/lib/service/league/team_service";
import { toast } from "@/hooks/use-toast";
import { BodySmall } from "@/lib/components/layout/typography";
import { Button } from "@/lib/components/shadcn/button";

interface TeamCardListProps {
    leagueId: number;
}

const TeamCardList: React.FC<TeamCardListProps> = ({ leagueId }) => {
    const { dialogState, openDialog, closeDialog } = useDialog();
    const [teams, setTeams] = useState<Team[]>([]);
    const [activeTeamId, setActiveTeamId] = useState<number | null>(null);

    // Add local state for add dialog
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    const fetchTeams = async () => {
        await getTeams(leagueId).then((response) => {
            setTeams(response); // Set the teams in the state
        }
        ).catch((error) => {

            toast({
                title: "Error",
                description: `Failed to fetch conferences: ${error.message}`,
                variant: "destructive",
                duration: 2000,
            });

        });
    };

    useEffect(() => {
        fetchTeams();
    }
        , [leagueId]);

    const handleEdit = (teamId: number) => {
        setActiveTeamId(teamId); // Set the active team ID
        openDialog("editTeam"); // Open the dialog
    };

    const handleDelete = (teamId: number) => {
        const team = teams.find((team) => team.teamId === teamId);

        if (team) {
            deleteTeam(team.leagueId, teamId).then(() => {
                // Successfully deleted the team
                toast({
                    title: "Success",
                    description: "Team deleted successfully.",
                    variant: "default",
                    duration: 2000,
                });

                // Remove the team from the list
                setTeams(teams.filter((team) => team.teamId !== teamId));

            }).catch(() => {
                toast({
                    title: "Error",
                    description: `Failed to delete team: It is possible players are still assigned to this team.`,
                    variant: "destructive",
                    duration: 2000,
                });
            });
        }
    };

    const handleUpdate = (updatedTeam: Team) => {
        // Update the division in the list
        setTeams(teams.map((team) =>
            team.teamId === updatedTeam.teamId ? updatedTeam : team
        ));

        // Close dialogs based on which one is open
        if (dialogState['editTeam']) {
            closeDialog('editTeam');
        }
        // Use local state for add dialog
        if (isAddDialogOpen) {
            setIsAddDialogOpen(false);
        }
    };

    return (
        <>
            <Button onClick={() => setIsAddDialogOpen(true)}>
                Add Team
            </Button>

            {isAddDialogOpen && (
                <AddEditTeamDialog
                    leagueId={leagueId}
                    isEdit={false}
                    onSave={handleUpdate}
                    onClose={() => setIsAddDialogOpen(false)} // Add this prop
                />
            )}

            {
                teams.length === 0 ? (
                    <BodySmall text="No teams found." />
                ) : (
                    teams.map((team: Team) => (
                        <React.Fragment key={team.teamId}>
                            <TeamCard
                                team={team}
                                onDelete={() => handleDelete(team.teamId)}
                                onEdit={() => handleEdit(team.teamId)}
                            />
                            {dialogState['editTeam'] && activeTeamId === team.teamId && (
                                <AddEditTeamDialog
                                    leagueId={team.leagueId}
                                    teamId={team.teamId}
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

export default TeamCardList;