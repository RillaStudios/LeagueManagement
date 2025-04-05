'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../shadcn/select";
import { useEffect, useState } from "react";
import { League } from "@/lib/types/league/league";
import { getAllLeagues } from "@/lib/service/league/league_service";
import { useAuth } from "@/lib/hooks/useAuth";
import { getAllUserTeams } from "@/lib/service/league/team_service";
import { useUserData } from "@/lib/hooks/useUserData";


/* 
A season selector component for the app.

@Author: IFD
@Date: 2025-04-01
*/
const LeagueSelector: React.FC<{ onLeagueChange: (leagueId: string) => void, userLeagues?: boolean }> = ({ onLeagueChange, userLeagues }) => {
    const [leagues, setLeagues] = useState<League[] | []>([]);
    const [selectedLeague, setSelectedLeague] = useState<string | undefined>(undefined); // Changed from null to undefined
    const { accessToken } = useAuth(); // Get the access token from the auth context
    const { user } = useUserData(); // Get the user from the auth context

    useEffect(() => {
        const fetchLeagues = async () => {
            let leagueList: League[] = [];

            if (userLeagues) {

                if (!user) {
                    setLeagues([]); // No leagues available for the user
                    return;
                }

                let fetchedLeagues = await getAllLeagues();

                if (!fetchedLeagues || fetchedLeagues.length === 0) {
                    setLeagues([]); // No leagues available for the user
                    return;
                }

                for (const league of fetchedLeagues) {
                    if (league.createdBy == user?.id) {
                        leagueList.push(league);
                    }
                }

                const teams = await getAllUserTeams(accessToken!);

                for (const team of teams) {
                    const league = fetchedLeagues.find(league => league.id === team.leagueId);
                    if (league && !leagueList.includes(league)) {
                        leagueList.push(league);
                    }
                }
            } else {
                let fetchedLeagues = await getAllLeagues();

                if (!fetchedLeagues) {
                    setLeagues([]); // No leagues available for the user
                    return;
                }

                leagueList = fetchedLeagues;
            }

            setLeagues(leagueList);
        };
        fetchLeagues();
    }, [userLeagues, accessToken, user]);

    const handleLeagueChange = (leagueId: string) => {
        setSelectedLeague(leagueId);
        onLeagueChange(leagueId); // Notify parent component of the change
    };

    return (
        <Select onValueChange={handleLeagueChange} value={selectedLeague}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a league" />
            </SelectTrigger>
            <SelectContent>
                {leagues?.map((league) => (
                    <SelectItem key={league.id} value={league.id.toString()}>
                        {league.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default LeagueSelector;