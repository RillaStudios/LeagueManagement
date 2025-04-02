'use client'

import { getSeasons } from "@/lib/service/league/season_service";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../shadcn/select";
import { useEffect, useState } from "react";
import { Season } from "@/lib/types/league/season";
import { League } from "@/lib/types/league/league";
import { getAllLeagues } from "@/lib/service/league/league_service";


/* 
A season selector component for the app.

@Author: IFD
@Date: 2025-04-01
*/
const LeagueSelector: React.FC<{ onLeagueChange: (leagueId: string) => void }> = ({ onLeagueChange }) => {
    const [leagues, setLeagues] = useState<League[] | null>(null);
    const [selectedLeague, setSelectedLeague] = useState<string | undefined>(undefined); // Changed from null to undefined

    useEffect(() => {
        const fetchLeagues = async () => {
            const leagues = await getAllLeagues();
            setLeagues(leagues);
        };
        fetchLeagues();
    }, []);

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