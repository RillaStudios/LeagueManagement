'use client'

import { getSeasons } from "@/lib/service/league/season_service";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../shadcn/select";
import { useEffect, useState } from "react";
import { Season } from "@/lib/types/league/season";


/* 
A season selector component for the app.

@Author: IFD
@Date: 2025-04-01
*/
const SeasonSelector: React.FC<{ leagueId: number; onSeasonChange: (seasonId: string) => void }> = ({ leagueId, onSeasonChange }) => {
    const [seasons, setSeasons] = useState<Season[] | null>(null);
    const [selectedSeason, setSelectedSeason] = useState<string | undefined>(undefined); // Changed from null to undefined

    useEffect(() => {
        const fetchSeasons = async () => {
            const seasons = await getSeasons(leagueId);
            setSeasons(seasons);
        };
        fetchSeasons();
    }, [leagueId]);

    const handleSeasonChange = (seasonId: string) => {
        setSelectedSeason(seasonId);
        onSeasonChange(seasonId); // Notify parent component of the change
    };

    return (
        <Select onValueChange={handleSeasonChange} value={selectedSeason}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a season" />
            </SelectTrigger>
            <SelectContent>
                {seasons?.map((season) => (
                    <SelectItem key={season.id} value={season.id.toString()}>
                        {season.startDate} - {season.endDate}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SeasonSelector;