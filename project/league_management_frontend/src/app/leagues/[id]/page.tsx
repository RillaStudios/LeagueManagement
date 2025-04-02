import Column from "@/lib/components/layout/column";
import Container from "@/lib/components/layout/container";
import Page from "@/lib/components/layout/page";
import Row from "@/lib/components/layout/row";
import RowColumn from "@/lib/components/layout/row_column";
import { BodyMedium, DisplayMedium, HeadlineMedium } from "@/lib/components/layout/typography";
import { Button } from "@/lib/components/shadcn/button";
import { Card, CardTitle } from "@/lib/components/shadcn/card";
import { Separator } from "@/lib/components/shadcn/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/lib/components/shadcn/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/lib/components/shadcn/tabs";
import LeagueManagerRow from "@/lib/components/ui/buttons/league_button";
import PlayerDisplay from "@/lib/components/ui/display/player_display";
import ScheduleDisplay from "@/lib/components/ui/display/schedule_display";
import StatDisplay from "@/lib/components/ui/display/stat_display";
import TeamList from "@/lib/components/ui/display/team_list";
import TeamListByLeague from "@/lib/components/ui/display/team_list_by_league";
import Footer from "@/lib/components/ui/layout/footer/footer";
import Header from "@/lib/components/ui/layout/header/header";
import { getLeague } from "@/lib/service/league/league_service";
import { getNewsLeagues } from "@/lib/service/league/news_league_service";
import { getTeams } from "@/lib/service/league/team_service";
import Link from "next/link";

export default async function LeaguePage({ params }: { params: Promise<{ id: number }> }) {

    const { id } = await params;

    const league = await getLeague(id);

    const newsPosts = await getNewsLeagues(id);

    const teams = await getTeams(id);

    if (!league) {
        return (
            <Page header={<Header />} footer={<Footer />}>
                <div className="h-[calc(100vh-8rem)]">
                    <Column
                        mainAxisAlign="center"
                        crossAxisAlign="center"
                        gap="4"
                        expanded
                    >
                        <HeadlineMedium text="League not found." />
                        <Link href="/" passHref><Button>Go Back</Button></Link>
                    </Column>
                </div>
            </Page>
        );
    }

    return (
        <Page header={<Header />} footer={<Footer />}>
            <Container height="h-full" className="p-8">
                <Row expanded mainAxisAlign="end">
                    <LeagueManagerRow league={league} />
                </Row>
                <Tabs defaultValue="league" className="w-full">
                    <TabsList className="grid w-full grid-cols-6">
                        <TabsTrigger value="league">League</TabsTrigger>
                        <TabsTrigger value="teams">Teams</TabsTrigger>
                        <TabsTrigger value="news">News</TabsTrigger>
                        <TabsTrigger value="schedule">Schedule</TabsTrigger>
                        <TabsTrigger value="standings">Standings</TabsTrigger>
                        <TabsTrigger value="players">Players</TabsTrigger>
                    </TabsList>
                    {/* League Info */}
                    <TabsContent value="league" className="mt-8">
                        <Column expanded gap="8">
                            <DisplayMedium
                                text={"League Info"}
                            />
                            <Separator className="w-full" />
                            <RowColumn gap="8" expanded>
                                <Column
                                    expanded
                                    width="full"
                                >
                                    <Card className="p-4 bg-card w-full">
                                        <CardTitle>Basic Info</CardTitle>
                                        <Separator className="my-4 w-full" />
                                        <Column expanded gap="4">
                                            <BodyMedium text={"Name: " + league.name} />
                                            <BodyMedium text={"Description: " + (league.description ?? "N/A")} />
                                            <BodyMedium text={"Created At: " + new Date(league.createdAt).toLocaleDateString()} />
                                            <BodyMedium text={"League ID: " + league.id} />
                                        </Column>
                                    </Card>
                                </Column>
                                <Column expanded width="full">
                                    <Card className="p-4 bg-card w-full">
                                        <CardTitle>Conference & Division Info</CardTitle>
                                        <Separator className="my-4 w-full" />
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Conference</TableHead>
                                                    <TableHead>Divisions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {league.conferences?.map((conference) => (
                                                    <TableRow key={conference.name}>
                                                        <TableCell>{conference.name}</TableCell>
                                                        <TableCell>{conference.divisions?.join(", ")}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </Card>
                                </Column>
                            </RowColumn>
                            <RowColumn gap="8" expanded>
                                <Column
                                    expanded
                                    width="full"
                                >
                                    <Separator className="w-full mb-8" />
                                    <Card className="p-4 bg-card w-full">
                                        <CardTitle>Teams Info</CardTitle>
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
                                                    <TableHead>Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {teams?.map((team) => (
                                                    <TableRow key={team.teamId}>
                                                        <TableCell>#{team.teamId}</TableCell>
                                                        <TableCell>{team.teamName}</TableCell>
                                                        <TableCell>{team.location}</TableCell>
                                                        <TableCell>{team.teamOwnerName}</TableCell>
                                                        <TableCell>{team.conferenceName}</TableCell>
                                                        <TableCell>{team.divisionName}</TableCell>
                                                        <TableCell>
                                                            <Link href={`/teams/${team.teamId}`} passHref>
                                                                <Button variant="default">View</Button>
                                                            </Link>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </Card>
                                </Column>

                            </RowColumn>
                        </Column>
                    </TabsContent>
                    {/* League Info */}
                    <TabsContent value="teams" className="mt-8">
                        <Column expanded gap="8">
                            <DisplayMedium
                                text={"League Info"}
                            />
                            <Separator className="w-full" />
                            <RowColumn gap="8" expanded>
                                <TeamListByLeague accountTeams={false} league={league} />
                            </RowColumn>
                        </Column>
                    </TabsContent>
                    {/* News Info */}
                    <TabsContent value="news" className="mt-8">
                        <Column expanded gap="8">
                            <DisplayMedium
                                text={"News Posts"}
                            />
                            <Separator className="w-full" />
                            <RowColumn gap="8" expanded>
                                {newsPosts?.map((newsPost) => {
                                    const content = JSON.parse(newsPost.content);
                                    return (
                                        <Card key={newsPost.leagueNewsId} className="p-4 bg-card w-full">
                                            <CardTitle>{content.title}</CardTitle>
                                            <Separator className="my-4 w-full" />
                                            <BodyMedium text={content.content} />
                                            <div className="mt-4 text-sm text-muted-foreground">
                                                Posted on {new Date(newsPost.createdAt).toLocaleDateString()}
                                            </div>
                                        </Card>
                                    );
                                })}
                            </RowColumn>
                        </Column>
                    </TabsContent>
                    {/* News Info */}
                    <TabsContent value="schedule" className="mt-8">
                        <Column expanded gap="8">
                            <DisplayMedium
                                text={"Schedule"}
                            />
                            <Separator className="w-full" />
                            <ScheduleDisplay leagueId={id} />
                        </Column>
                    </TabsContent>
                    {/* Standings Info */}
                    <TabsContent value="standings" className="mt-8">
                        <Column expanded gap="8">
                            <DisplayMedium
                                text={"Standings"}
                            />
                            <Separator className="w-full" />
                            <StatDisplay leagueId={id} />
                        </Column>
                    </TabsContent>
                    {/* Players Info */}
                    <TabsContent value="players" className="mt-8">
                        <Column expanded gap="8">
                            <DisplayMedium
                                text={"Players"}
                            />
                            <Separator className="w-full" />
                            <PlayerDisplay leagueId={id} />
                        </Column>
                    </TabsContent>
                </Tabs>
            </Container>
        </Page>
    );
}
