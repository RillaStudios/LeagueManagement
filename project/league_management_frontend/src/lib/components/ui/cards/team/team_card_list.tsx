'use client'

import { useDialog } from "@/lib/components/providers/dialog_provider";
import React, { useState } from "react";
import { Team } from "@/lib/types/league/team";
import { TeamCard } from "./team_card";
import AddEditTeamDialog from "../../dialogs/league/team/add_team";
import { deleteTeam } from "@/lib/service/league/team_service";

interface TeamCardListProps {
    teams: Team[];
}

const TeamCardList: React.FC<TeamCardListProps> = ({ teams: initialTeams }) => {
    const { dialogState, openDialog, closeDialog } = useDialog();
    const [teams, setTeams] = useState<Team[]>(initialTeams);
    const [activeTeamId, setActiveTeamId] = useState<number | null>(null);

    const handleEdit = (teamId: number) => {
        setActiveTeamId(teamId); // Set the active team ID
        openDialog("editTeam"); // Open the dialog
    };

    const handleDelete = (teamId: number) => {
        const team = teams.find((team) => team.teamId === teamId);

        // Remove the team from the list
        setTeams(teams.filter((team) => team.teamId !== teamId));

        if (team) {
            deleteTeam(team.leagueId, teamId); // Delete the team
        }
    };

    const handleUpdate = (updatedTeam: Team) => {
        // Update the division in the list
        setTeams(teams.map((team) =>
            team.teamId === updatedTeam.teamId ? updatedTeam : team
        ));

        closeDialog("editTeam"); // Close the dialog
    };

    return (
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
    );

}

export default TeamCardList;