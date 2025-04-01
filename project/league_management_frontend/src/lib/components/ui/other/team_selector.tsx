'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../shadcn/select";
import { useEffect, useState } from "react";
import { Team } from "@/lib/types/league/team";
import { getTeams } from "@/lib/service/league/team_service";


/* 
A team selector component for the app.

@Author: IFD
@Date: 2025-04-01
*/
const TeamSelector: React.FC<{ leagueId: number; onTeamChange: (teamId: string) => void }> = ({ leagueId, onTeamChange }) => {
    const [teams, setTeams] = useState<Team[] | null>(null);
    const [selectedTeam, setSelectedTeam] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchTeams = async () => {
            const teams = await getTeams(leagueId);
            setTeams(teams);
        };
        fetchTeams();
    }, [leagueId]);

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