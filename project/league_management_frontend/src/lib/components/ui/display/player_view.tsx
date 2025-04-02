'use client';

import Column from "../../layout/column";
import { Card, CardTitle } from "../../shadcn/card";
import { PlayerCard } from "../cards/player/player_card";
import { Player } from "@/lib/types/league/player";

// Define props interface with required fields
interface PlayerViewProps {
    players: Player[];
    leagueId: number;
    teamName: string;
}

export const PlayerView: React.FC<PlayerViewProps> = ({ players, leagueId, teamName }) => {
    return (
        <Column
            expanded
            width="full"
        >
            {players && players.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {players.map((player) => (
                        <PlayerCard key={player.playerId} player={player} leagueId={leagueId} teamName={teamName} displayEdit={false} />
                    ))}
                </div>
            ) : (
                <Card className="p-4 w-full text-center">
                    <CardTitle className="mb-4">No Players</CardTitle>
                    <p>This team doesn't have any players yet.</p>
                </Card>
            )}
        </Column>
    );
}