'use client';

import { useState } from "react";
import PlayerCardList from "../cards/player/player_card_list";
import LeagueSelector from "../other/league_selector";
import TeamSelector from "../other/team_selector";

/* 
A component that displays a list of player 
cards for a given league and team.

@Author: IFD
@Date: 2025-04-03
*/
const AccountPlayerListDisplay = () => {

    const [leagueId, setLeagueId] = useState<number | null>(null);
    const [teamId, setTeamId] = useState<number | null>(null);

    const handleLeagueChange = (leagueId: string) => {
        setLeagueId(parseInt(leagueId));
    };

    const handleTeamChange = (teamId: string) => {
        setTeamId(parseInt(teamId));
    };

    return (
        <>
            <LeagueSelector userLeagues onLeagueChange={handleLeagueChange} />
            <div className="my-4"></div>
            <TeamSelector leagueId={leagueId!} userTeams onTeamChange={handleTeamChange} />
            <div className="my-4"></div>
            <PlayerCardList leagueId={leagueId!} teamId={teamId!} coachEdit={true} />
        </>
    );
}

export default AccountPlayerListDisplay;