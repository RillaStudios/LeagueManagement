'use client';

import { Card, CardTitle } from "../../shadcn/card";
import { PlayerCard } from "../cards/player/player_card";
import { Player } from "@/lib/types/league/player";

// Define props interface with required fields
interface PlayerViewProps {
    players: Player[];
    teamName: string;
}

/* 
A component that displays a list of player

@Author: IFD
@Date: 2025-04-03
*/
export const PlayerView: React.FC<PlayerViewProps> = ({ players, teamName }) => {
    return (
        <>
            {players && players.length > 0 ? (
                <div className="w-1/2">
                    {players.map((player) => (
                        <PlayerCard key={player.playerId} player={player} teamName={teamName} displayEdit={false} />
                    ))}
                </div>
            ) : (
                <Card className="p-4 w-full text-center">
                    <CardTitle className="mb-4">No Players</CardTitle>
                    <p>This team doesn't have any players yet.</p>
                </Card>
            )}
        </>
    );
}