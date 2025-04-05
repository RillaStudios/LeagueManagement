'use client'

import SeasonSelector from "../other/season_selector";
import { useEffect, useState } from "react";
import { DataTable } from "../tables/stats/stat_table";
import { getGames } from "@/lib/service/league/game_service";
import { Game } from "@/lib/types/league/game";
import { DatePicker } from "../../shadcn/input_date";
import { schedule_columns } from "../tables/schedule/schedule_columns";
import { Tabs, TabsList, TabsTrigger } from "../../shadcn/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { getTeam } from "@/lib/service/league/team_service";
import { getVenue } from "@/lib/service/league/venue_service";

export interface ScheduleDisplayProps {
    leagueId: number;
}

/* 
A component that displays the schedule for a league.

@Author: IFD
@Date: 2025-04-01
*/
const ScheduleDisplay: React.FC<ScheduleDisplayProps> = ({ leagueId }) => {

    // Original, unfiltered schedule data
    const [allSeasonSchedule, setAllSeasonSchedule] = useState<Game[]>([]);
    // Filtered schedule data for display
    const [filteredSchedule, setFilteredSchedule] = useState<Game[]>([]);
    const [seasonId, setSeasonId] = useState<number | null>(null);

    const handleSeasonChange = (seasonId: string) => {
        setSeasonId(parseInt(seasonId));
    };

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

    const handleDateChange = (date: Date | undefined) => {
        setSelectedDate(date);
    }

    // Apply filtering when date or all schedule data changes
    useEffect(() => {
        if (allSeasonSchedule.length > 0 && selectedDate) {
            const filteredSchedule = allSeasonSchedule.filter((game) =>
                new Date(game.gameDate).toDateString() === selectedDate.toDateString()
            );
            setFilteredSchedule(filteredSchedule);
        } else {
            setFilteredSchedule(allSeasonSchedule);
        }
    }, [selectedDate, allSeasonSchedule]);

    useEffect(() => {
        const fetchStats = async () => {
            if (seasonId === null) return;

            try {
                const schedule = await getGames(leagueId, seasonId);

                // Fetch team data for all games
                const enrichedSchedule = await Promise.all(schedule.map(async (game) => {
                    const homeTeam = await getTeam(leagueId, game.homeTeamId);
                    const awayTeam = await getTeam(leagueId, game.awayTeamId);
                    const venue = await getVenue(leagueId, game.venueId);

                    return {
                        ...game,
                        homeTeamName: homeTeam ? homeTeam.teamName : "Unknown Home Team",
                        awayTeamName: awayTeam ? awayTeam.teamName : "Unknown Away Team",
                        venueName: venue ? venue.address : "Unknown Venue",
                    };
                }));

                setAllSeasonSchedule(enrichedSchedule);

            } catch (error) {
            }
        }

        fetchStats();
    }, [leagueId, seasonId]);

    return (
        <Tabs defaultValue="full-schedule" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="full-schedule">Full Schedule</TabsTrigger>
                <TabsTrigger value="news">By Date</TabsTrigger>
            </TabsList>
            <div className="my-8"></div>
            <TabsContent value="full-schedule" className="w-full">
                <SeasonSelector leagueId={leagueId} onSeasonChange={handleSeasonChange} />
                <div className="my-8"></div>
                <DataTable columns={schedule_columns} data={allSeasonSchedule} />
            </TabsContent>
            <TabsContent value="news" className="w-full">
                <SeasonSelector leagueId={leagueId} onSeasonChange={handleSeasonChange} />
                <div className="my-8"></div>
                <DatePicker value={selectedDate} onChange={handleDateChange} />
                <div className="my-8"></div>
                <DataTable columns={schedule_columns} data={filteredSchedule} />
            </TabsContent>
        </Tabs>
    );

};

export default ScheduleDisplay;