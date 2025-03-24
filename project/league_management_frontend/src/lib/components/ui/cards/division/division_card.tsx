import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../shadcn/card";
import { Button } from "../../../shadcn/button";
import { Division } from "@/lib/types/league/division";

export function DivisionCard({ division, onDelete, onEdit }: { division: Division, onDelete: () => void, onEdit: () => void }) {

    return (
        <Card className="w-full mb-4">
            <CardHeader>
                <CardTitle>{division.divisionName}</CardTitle>
                <CardDescription>ID: #{division.id}</CardDescription>
            </CardHeader>
            <CardContent>
                <div>League: {division.leagueName ? (typeof division.leagueName === 'string' ? division.leagueName : division.leagueName) : "N/A"}</div>
                <div>Conference: {division.conferenceName ? (typeof division.conferenceName === 'string' ? division.conferenceName : division.conferenceName) : "N/A"}</div>      </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant={"default"} onClick={() => onEdit()}>Edit</Button>
                <Button variant="destructive" onClick={() => onDelete()}>Delete</Button>
            </CardFooter>
        </Card>
    );
}