import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../shadcn/card";
import { Button } from "../../../shadcn/button";
import { Season } from "@/lib/types/league/season";

/* 
A card component to display season information.

@Author: IFD
@Date: 2025-03-22
*/
export function SeasonCard({ season, onDelete, onEdit }: { season: Season, onDelete: () => void, onEdit: () => void }) {

    return (
        <Card className="w-full mb-4">
            <CardHeader>
                <CardTitle>ID: #{season.id}</CardTitle>
                <CardDescription>Season Info</CardDescription>
            </CardHeader>
            <CardContent>
                <div>Start Date: {season.startDate ? (typeof season.startDate === 'string' ? season.startDate : season.startDate) : "N/A"}</div>
                <div>End Date: {season.endDate ? (typeof season.endDate === 'string' ? season.endDate : season.endDate) : "N/A"}</div>      </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant={"default"} onClick={() => onEdit()}>Edit</Button>
                <Button variant="destructive" onClick={() => onDelete()}>Delete</Button>
            </CardFooter>
        </Card>
    );
}