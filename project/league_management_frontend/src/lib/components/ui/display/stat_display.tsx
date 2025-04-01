'use client'

import { getSeasonStats } from "@/lib/service/league/season_service";
import SeasonSelector from "../other/season_selector";
import { useEffect, useState } from "react";
import { TeamStats } from "@/lib/types/league/team_stats";
import { stat_columns } from "../tables/stats/stat_columns";
import { DataTable } from "../tables/stats/stat_table";

export interface StatDisplayProps {
    leagueId: number;
}

/* 
A component that displays the stats for a league.

@Author: IFD
@Date: 2025-04-01
*/
const StatDisplay: React.FC<StatDisplayProps> = ({ leagueId }) => {

    const [seasonStats, setSeasonStats] = useState<TeamStats[]>([]);
    const [seasonId, setSeasonId] = useState<number | null>(null);

    const handleSeasonChange = (seasonId: string) => {
        setSeasonId(parseInt(seasonId));
    };

    useEffect(() => {
        const fetchStats = async () => {
            if (seasonId === null) return;

            try {
                const stats = await getSeasonStats(leagueId, seasonId);
                setSeasonStats(stats);
            } catch (error) {
                console.error("Failed to fetch stats:", error);
            }
        }

        fetchStats();
    }, [leagueId, seasonId]);

    return (
        <div className="w-full">
            <div className="w-1/3"><SeasonSelector leagueId={leagueId} onSeasonChange={handleSeasonChange} /></div>
            <div className="my-4"></div>
            <DataTable columns={stat_columns} data={seasonStats} />
        </div>
    );

};

export default StatDisplay;