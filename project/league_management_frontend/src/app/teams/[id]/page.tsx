import Column from "@/lib/components/layout/column";
import Container from "@/lib/components/layout/container";
import Page from "@/lib/components/layout/page";
import RowColumn from "@/lib/components/layout/row_column";
import { BodyMedium, DisplayMedium, HeadlineMedium } from "@/lib/components/layout/typography";
import { Button } from "@/lib/components/shadcn/button";
import { Card, CardTitle } from "@/lib/components/shadcn/card";
import { Separator } from "@/lib/components/shadcn/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/lib/components/shadcn/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/lib/components/shadcn/tabs";
import { PlayerView } from "@/lib/components/ui/display/player_view";
import Footer from "@/lib/components/ui/layout/footer/footer";
import Header from "@/lib/components/ui/layout/header/header";
import { getAllTeamNews } from "@/lib/service/league/news_team_service";
import { getPlayersByTeam } from "@/lib/service/league/player_service";
import { getTeamById } from "@/lib/service/league/team_service";
import Link from "next/link";

/* 
A page that displays the team information and the players in the team.

@Author: IFD
@Date: 2025-04-01
*/
export default async function TeamPage({ params }: { params: Promise<{ id: number }> }) {

    const { id } = await params;

    const team = await getTeamById(id);

    const players = await getPlayersByTeam(team?.leagueId!, id);

    const news = await getAllTeamNews(team?.leagueId!, id);

    if (!team) {
        return (
            <Page header={<Header />} footer={<Footer />}>
                <div className="h-[calc(100vh-8rem)]">
                    <Column
                        mainAxisAlign="center"
                        crossAxisAlign="center"
                        gap="4"
                        expanded
                    >
                        <HeadlineMedium text="Team not found." />
                        <Link href="/" passHref><Button>Go Back</Button></Link>
                    </Column>
                </div>
            </Page>
        );
    }

    return (
        <Page header={<Header />} footer={<Footer />}>
            <Container height="h-full" className="p-8">
                <Tabs defaultValue="info" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="info">Info</TabsTrigger>
                        <TabsTrigger value="news">News</TabsTrigger>
                        <TabsTrigger value="players">Players</TabsTrigger>
                    </TabsList>
                    {/* Team Info */}
                    <TabsContent value="info" className="mt-8">
                        <Column expanded gap="8">
                            <DisplayMedium
                                text={"Team Info"}
                            />
                            <Separator className="w-full" />
                            <RowColumn gap="8" expanded>
                                <Column
                                    expanded
                                    width="full"
                                >
                                    <Card className="p-4 bg-card w-full">
                                        <CardTitle>Team Info</CardTitle>
                                        <Separator className="my-4 w-full" />
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Team Id</TableHead>
                                                    <TableHead>Team Name</TableHead>
                                                    <TableHead>Team Location</TableHead>
                                                    <TableHead>Team Owner</TableHead>
                                                    <TableHead>Conference</TableHead>
                                                    <TableHead>Division</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow key={team.teamId}>
                                                    <TableCell>#{team.teamId}</TableCell>
                                                    <TableCell>{team.teamName}</TableCell>
                                                    <TableCell>{team.location}</TableCell>
                                                    <TableCell>{team.teamOwnerName}</TableCell>
                                                    <TableCell>{team.conferenceName}</TableCell>
                                                    <TableCell>{team.divisionName}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </Card>
                                </Column>
                            </RowColumn>
                        </Column>
                    </TabsContent>
                    {/* Team News */}
                    <TabsContent value="news" className="mt-8">
                        <Column expanded gap="8">
                            <DisplayMedium
                                text={"News Posts"}
                            />
                            <Separator className="w-full" />
                            <RowColumn gap="8" expanded>
                                {Array.isArray(news) && news.length > 0 ? (
                                    news.map((newsPost) => {
                                        const content = JSON.parse(newsPost.content);
                                        return (
                                            <Card key={newsPost.teamNewsId} className="p-4 bg-card w-full">
                                                <CardTitle>{content.title}</CardTitle>
                                                <Separator className="my-4 w-full" />
                                                <BodyMedium text={content.content} />
                                                <div className="mt-4 text-sm text-muted-foreground">
                                                    Posted on {new Date(newsPost.createdAt).toLocaleDateString()}
                                                </div>
                                            </Card>
                                        );
                                    })
                                ) : (
                                    <Card className="p-4 bg-card w-full">
                                        <BodyMedium text="No news posts available for this team." />
                                    </Card>
                                )}
                            </RowColumn>
                        </Column>
                    </TabsContent>
                    {/* Player Info */}
                    <TabsContent value="players" className="mt-8">
                        <Column width="w-full" expanded gap="8">
                            <DisplayMedium
                                text={"Player Info"}
                            />
                            <Separator className="w-full" />
                            <PlayerView players={players!} teamName={team.teamName} />
                        </Column>
                    </TabsContent>
                </Tabs>
            </Container>
        </Page>
    );
}