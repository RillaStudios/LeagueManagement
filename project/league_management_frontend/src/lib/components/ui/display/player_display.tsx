'use client';

import { Player } from "@/lib/types/league/player";
import { useEffect, useState } from "react";
import TeamSelector from "../other/team_selector";
import { DataTable } from "../tables/stats/stat_table";
import { getPlayersByLeague } from "@/lib/service/league/player_service";
import { player_columns } from "../tables/players/player_columns";
import { getTeam } from "@/lib/service/league/team_service";

export interface PlayerDisplayProps {
    leagueId: number;
}

/* 
A component that displays a list of players for a given league.
It allows the user to filter players by team.

@Author: IFD
@Date: 2025-04-01
*/
const PlayerDisplay: React.FC<PlayerDisplayProps> = ({ leagueId }) => {

    // Original, unfiltered player data
    const [allPlayers, setAllPlayers] = useState<Player[]>([]);
    // Filtered player data for display
    const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);

    const [teamId, setTeamId] = useState<number | null>(null);

    useEffect(() => {
        const fetchPlayers = async () => {
            if (leagueId === null) return;

            try {
                const players = await getPlayersByLeague(leagueId);
                setAllPlayers(players);

                // Fetch team data for all games
                const enrichedPlayers = await Promise.all(players.map(async (player) => {
                    const team = await getTeam(leagueId, player.teamId);

                    return {
                        ...player,
                        teamName: team ? team.teamName : "Unknown Team",
                    };
                }));

                setFilteredPlayers(enrichedPlayers); // Initially show all players
            } catch (error) {
                console.error("Failed to fetch players:", error);
            }
        }

        fetchPlayers();
    }, [leagueId]);

    // Filter players when team selection changes
    useEffect(() => {
        if (teamId === null) {
            // If no team selected, show all players
            setFilteredPlayers(allPlayers);
        } else {
            // Filter players by team ID
            const filtered = allPlayers.filter(player => player.teamId === teamId);
            setFilteredPlayers(filtered);
        }
    }, [teamId, allPlayers]);

    const handleTeamChange = (teamId: string) => {
        setTeamId(parseInt(teamId));
    };


    return (
        <>
            <TeamSelector leagueId={leagueId} onTeamChange={handleTeamChange} />
            <DataTable columns={player_columns} data={filteredPlayers} />
        </>
    );

}

export default PlayerDisplay;