'use client';

import { useState } from "react";
import PlayerCardList from "../cards/player/player_card_list";
import LeagueSelector from "../other/league_selector";

const AccountPlayerListDisplay = () => {

    const [leagueId, setLeagueId] = useState<number | null>(null);

    const handleLeagueChange = (leagueId: string) => {
        setLeagueId(parseInt(leagueId));
    };

    return (
        <>
            <LeagueSelector userLeagues onLeagueChange={handleLeagueChange} />
            <PlayerCardList leagueId={leagueId!} />
        </>
    );
}

export default AccountPlayerListDisplay;