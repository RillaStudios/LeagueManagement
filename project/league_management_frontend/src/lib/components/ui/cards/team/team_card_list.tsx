'use client'

import { useDialog } from "@/lib/components/providers/dialog_provider";
import React, { useEffect, useState } from "react";
import { Team } from "@/lib/types/league/team";
import { TeamCard } from "./team_card";
import AddEditTeamDialog from "../../dialogs/league/team/add_team";
import { deleteTeam, getTeams, getAllUserTeams } from "@/lib/service/league/team_service";
import { toast } from "@/hooks/use-toast";
import { BodySmall } from "@/lib/components/layout/typography";
import { Button } from "@/lib/components/shadcn/button";
import { useAuth } from "@/lib/hooks/useAuth";
import { useUserData } from "@/lib/hooks/useUserData";
import { League } from "@/lib/types/league/league";
import { getLeague } from "@/lib/service/league/league_service";

interface TeamCardListProps {
    leagueId?: number;
    useOwner?: boolean;
}

/* 
A list of team cards for a given league. It fetches the 
teams from the server and displays them in a list.

@Author: IFD
@Date: 2025-03-22
*/
const TeamCardList: React.FC<TeamCardListProps> = ({ leagueId, useOwner }) => {
    const { dialogState, openDialog, closeDialog } = useDialog();
    const [teams, setTeams] = useState<Team[]>([]);
    const [activeTeamId, setActiveTeamId] = useState<number | null>(null);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [league, setLeague] = useState<League>(); // Add local state for league name
    const { accessToken } = useAuth();

    const { user } = useUserData();

    /* 
    A function to fetch teams from the server.

    @Author: IFD
    @Date: 2025-03-22
    */
    const fetchTeams = async () => {
        if (!leagueId && !useOwner) {
            return;
        }

        setIsLoading(true);
        try {

            let fetchedTeams: Team[] = [];

            if (leagueId) {
                fetchedTeams = await getTeams(leagueId) || [];
            } else if (useOwner && accessToken) {
                const userTeams = await getAllUserTeams(accessToken);
                fetchedTeams = userTeams || [];
            }

            // Ensure we have an array of teams
            if (!Array.isArray(fetchedTeams)) {
                fetchedTeams = [];
            }

            setTeams(fetchedTeams);
        } catch (error: any) {
            toast({
                title: "Error",
                description: `Failed to fetch teams: ${error.message}`,
                variant: "destructive",
                duration: 2000,
            });
            setTeams([]);
        } finally {
            setIsLoading(false);
        }
    };

    /* 
    A useEffect hook to fetch teams when the
    component mounts or when the leagueId or useOwner changes.

    @Author: IFD
    @Date: 2025-03-22
    */
    useEffect(() => {

        fetchTeams();
    }, [leagueId, useOwner, accessToken, user]);

    /*
    A function to handle editing a team.

    @Author: IFD
    @Date: 2025-03-22
    */
    const handleEdit = (teamId: number) => {
        setActiveTeamId(teamId);
        openDialog("editTeam");
    };

    /* 
    A function to handle deleting a team.

    @Author: IFD
    @Date: 2025-03-22
    */
    const handleDelete = (teamId: number) => {
        const team = teams.find((team) => team.teamId === teamId);

        if (team) {
            deleteTeam(team.leagueId, teamId, accessToken!).then(() => {
                toast({
                    title: "Success",
                    description: "Team deleted successfully.",
                    variant: "default",
                    duration: 2000,
                });

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

    /* 
    A function to handle updating a team.

    @Author: IFD
    @Date: 2025-03-22
    */
    const handleUpdate = (updatedTeam: Team) => {

        setTeams((prevTeams) => {
            const divExists = prevTeams.some((team) => team.teamId === updatedTeam.teamId);
            if (divExists) {
                return prevTeams.map((team) =>
                    team.teamId === updatedTeam.teamId ? updatedTeam : team
                );
            } else {
                return [...prevTeams, updatedTeam];
            }
        });

        if (dialogState['editTeam']) {
            closeDialog('editTeam');
        }
        if (isAddDialogOpen) {
            setIsAddDialogOpen(false);
        }
    };

    return (
        <>
            {/* Only show Add Team button when viewing by league */}
            {leagueId && (
                <Button onClick={() => setIsAddDialogOpen(true)}>
                    Add Team
                </Button>
            )}

            {leagueId && isAddDialogOpen && (
                <AddEditTeamDialog
                    leagueId={leagueId}
                    isEdit={false}
                    onSave={handleUpdate}
                    onClose={() => setIsAddDialogOpen(false)}
                />
            )}

            {isLoading ? (
                <BodySmall text="Loading teams..." />
            ) : teams.length === 0 ? (
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
            )}
        </>
    );
}

export default TeamCardList;