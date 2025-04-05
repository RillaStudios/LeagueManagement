import { Button } from "@/lib/components/shadcn/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/lib/components/shadcn/card";
import { TeamNews } from "@/lib/types/league/team_news";

/* 
A card component that displays the details of a news league.

@Author: IFD
@Date: 2025-03-22
*/
export function NewsTeamCard({ news, onDelete, onEdit }: { news: TeamNews, onDelete: () => void, onEdit: () => void }) {

    const newsContent = JSON.parse(news.content);

    const title = newsContent.title || "No Title";
    const content = newsContent.content || "No Content";

    return (
        <Card className="w-full mb-4">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>ID: #{news.teamNewsId}</CardDescription>
                <CardDescription>Posted On: {news.createdAt}</CardDescription>
            </CardHeader>
            <CardContent>
                <div>{content}</div></CardContent>
            <CardFooter className="flex justify-between">
                <Button variant={"default"} onClick={() => onEdit()}>Edit</Button>
                <Button variant="destructive" onClick={() => onDelete()}>Delete</Button>
            </CardFooter>
        </Card>
    );
}