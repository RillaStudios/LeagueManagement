'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../shadcn/select";
import { useEffect, useState } from "react";
import { Team } from "@/lib/types/league/team";
import { getAllUserTeams, getTeams } from "@/lib/service/league/team_service";
import { useUserData } from "@/lib/hooks/useUserData";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/hooks/useAuth";


/* 
A team selector component for the app.

@Author: IFD
@Date: 2025-04-01
*/
const TeamSelector: React.FC<{ leagueId: number; onTeamChange: (teamId: string) => void, userTeams?: boolean }> = ({ leagueId, onTeamChange, userTeams }) => {
    const [teams, setTeams] = useState<Team[] | null>(null);
    const [selectedTeam, setSelectedTeam] = useState<string | undefined>(undefined);
    const { accessToken } = useAuth();
    const { user } = useUserData();

    useEffect(() => {
        const fetchTeams = async () => {

            if (!leagueId || userTeams) {
                await getAllUserTeams(accessToken!).then((response) => {
                    setTeams(response);
                }).catch((error) => {
                    toast({
                        title: "Error",
                        description: `Failed to fetch teams: ${error.message}`,
                        variant: "destructive",
                        duration: 2000,
                    });
                });
                return;
            }

            const teams = await getTeams(leagueId);
            setTeams(teams);
        };
        fetchTeams();
    }, [leagueId, user]);

    const handleTeamChange = (teamId: string) => {
        setSelectedTeam(teamId);
        onTeamChange(teamId); // Notify parent component of the change
    };

    return (
        <Select onValueChange={handleTeamChange} value={selectedTeam}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a team" />
            </SelectTrigger>
            <SelectContent>
                {teams?.map((team) => (
                    <SelectItem key={team.teamId} value={team.teamId.toString()}>
                        {team.location + " " + team.teamName}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default TeamSelector;