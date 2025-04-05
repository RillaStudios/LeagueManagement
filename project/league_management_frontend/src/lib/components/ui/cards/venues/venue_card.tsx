import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../shadcn/card";
import { Button } from "../../../shadcn/button";
import { Venue } from "@/lib/types/league/venue";

/* 
A component that displays a card for a venue in a league.

@Author: IFD
@Date: 2025-03-22
*/
export function VenueCard({ venue, onDelete, onEdit }: { venue: Venue, onDelete: () => void, onEdit: () => void }) {

    return (
        <Card className="w-full mb-4">
            <CardHeader>
                <CardTitle>League Venue</CardTitle>
                <CardDescription>ID: #{venue.venueId}</CardDescription>
            </CardHeader>
            <CardContent>
                <div>Address: {venue.address ? (typeof venue.address === 'string' ? venue.address : venue.address) : "N/A"}</div>
                <div>Link: {venue.link ? (typeof venue.link === 'string' ? venue.link : venue.link) : "N/A"}</div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant={"default"} onClick={() => onEdit()}>Edit</Button>
                <Button variant="destructive" onClick={() => onDelete()}>Delete</Button>
            </CardFooter>
        </Card>
    );
}