import { Button } from "@/lib/components/shadcn/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/lib/components/shadcn/card";
import { Conference } from "@/lib/types/league/conference";

/* 
A card component that displays information about a conference.

@Author: IFD
@Date: 2025-03-22
*/
export function ConferenceCard({ conference, onDelete, onEdit }: { conference: Conference, onDelete: () => void, onEdit: () => void }) {
    return (
        <Card className="w-full mb-4">
            <CardHeader>
                <CardTitle>{conference.name}</CardTitle>
                <CardDescription>ID: #{conference.id}</CardDescription>
            </CardHeader>
            <CardContent>
                <div>League: {conference.leagueName ? (typeof conference.leagueName === 'string' ? conference.leagueName : conference.leagueName) : "N/A"}</div>
                <div>Divisions: {conference.divisions ? conference.divisions.join(", ") : "N/A"}</div></CardContent>
            <CardFooter className="flex justify-between">
                <Button variant={"default"} onClick={() => onEdit()}>Edit</Button>
                <Button variant="destructive" onClick={() => onDelete()}>Delete</Button>
            </CardFooter>
        </Card>
    );
}