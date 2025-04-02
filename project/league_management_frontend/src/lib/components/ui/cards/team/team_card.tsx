import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../shadcn/card";
import { Button } from "../../../shadcn/button";
import { Team } from "@/lib/types/league/team";
import { useUserData } from "@/lib/hooks/useUserData";

export function TeamCard({ team, onDelete, onEdit, leagueOwnerId }: { team: Team, onDelete?: () => void, onEdit?: () => void, leagueOwnerId?: number }) {

    const { user } = useUserData();

    return (
        <Card className="w-full mb-4">
            <CardHeader>
                <CardTitle>{team.teamName}</CardTitle>
                <CardDescription>ID: #{team.teamId}</CardDescription>
            </CardHeader>
            <CardContent>
                <div>Location: {team.location ? (typeof team.location === 'string' ? team.location : team.location) : "N/A"}</div>
                <div>Conference: {team.conferenceName ? (typeof team.conferenceName === 'string' ? team.conferenceName : team.conferenceName) : "N/A"}</div>
                <div>Division: {team.divisionName ? (typeof team.divisionName === 'string' ? team.divisionName : team.divisionName) : "N/A"}</div>
                <div>Owner: {team.teamOwnerName ? (typeof team.teamOwnerName === 'string' ? team.teamOwnerName : team.teamOwnerName) : "N/A"}</div>
            </CardContent>
            <CardFooter className="flex justify-between">
                {((user && user.id === team.ownerId) || (user && user.id === leagueOwnerId)) && <>
                    <Button variant={"default"} onClick={() => onEdit!()}>Edit</Button>
                    <Button variant="destructive" onClick={() => onDelete!()}>Delete</Button>
                </>}
            </CardFooter>
        </Card>
    );
}