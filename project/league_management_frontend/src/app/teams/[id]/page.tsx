import Column from "@/lib/components/layout/column";
import Container from "@/lib/components/layout/container";
import Page from "@/lib/components/layout/page";
import RowColumn from "@/lib/components/layout/row_column";
import { DisplayMedium, HeadlineMedium } from "@/lib/components/layout/typography";
import { Button } from "@/lib/components/shadcn/button";
import { Card, CardTitle } from "@/lib/components/shadcn/card";
import { Separator } from "@/lib/components/shadcn/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/lib/components/shadcn/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/lib/components/shadcn/tabs";
import { PlayerCard } from "@/lib/components/ui/cards/player/player_card";
import { PlayerView } from "@/lib/components/ui/display/player_view";
import Footer from "@/lib/components/ui/layout/footer/footer";
import Header from "@/lib/components/ui/layout/header/header";
import { getPlayersByTeam } from "@/lib/service/league/player_service";
import { getTeamById } from "@/lib/service/league/team_service";
import Link from "next/link";

export default async function TeamPage({ params }: { params: Promise<{ id: number }> }) {

    const { id } = await params;

    const team = await getTeamById(id);

    const players = await getPlayersByTeam(team?.leagueId!, id);

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
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="info">Info</TabsTrigger>
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
                    {/* Player Info */}
                    <TabsContent value="players" className="mt-8">
                        <Column expanded gap="8">
                            <DisplayMedium
                                text={"Player Info"}
                            />
                            <Separator className="w-full" />
                            <RowColumn gap="8" expanded>
                                <PlayerView leagueId={team.leagueId} players={players} teamName={team.teamName} />
                            </RowColumn>
                        </Column>
                    </TabsContent>
                </Tabs>
            </Container>
        </Page>
    );
}