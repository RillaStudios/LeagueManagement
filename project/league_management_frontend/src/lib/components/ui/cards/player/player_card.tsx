import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../shadcn/card";
import { Button } from "../../../shadcn/button";
import { Player } from "@/lib/types/league/player";

export function PlayerCard({ leagueId, player, onDelete, onEdit, teamName, displayEdit }: { displayEdit?: boolean, leagueId: number, player: Player, onDelete?: () => void, onEdit?: () => void, teamName: string }) {

    return (
        <Card className="w-full mb-4">
            <CardHeader>
                <CardTitle>{player.name}</CardTitle>
                <CardDescription>ID: #{player.playerId}</CardDescription>
            </CardHeader>
            <CardContent>
                <div>Weight: {player.weight ? (typeof player.weight === 'string' ? player.weight : player.weight) : "N/A"}</div>
                <div>Height: {player.height ? (typeof player.height === 'string' ? player.height : player.height) : "N/A"}</div>
                <div>DOB: {player.dob ? (typeof player.dob === 'string' ? player.dob : player.dob.toLocaleDateString()) : "N/A"}</div>
                <div>Skill Level: {player.skillLevel ? (typeof player.skillLevel === 'string' ? player.skillLevel : player.skillLevel) : "N/A"}</div>
                <div>Team Name: {teamName ? (typeof teamName === 'string' ? teamName : teamName) : "N/A"}</div>
            </CardContent>
            {displayEdit && (
                <CardFooter className="flex justify-between">
                    <Button variant={"default"} onClick={() => onEdit!()}>Edit</Button>
                    <Button variant="destructive" onClick={() => onDelete!()}>Delete</Button>
                </CardFooter>
            )}
        </Card>
    );
}